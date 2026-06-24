import { CookieOptions, Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";
import { catchAsync } from "../../shared/utils/catch-async";
import { cookieUtils } from "../../shared/utils/cookie";
import { sendResponse } from "../../shared/utils/send-response";
import { tokenUtils } from "../../shared/utils/token";
import { authService } from "./auth.service";
import { IRequestUser } from "./auth.type";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.registerUser(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});


const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await authService.loginUser(payload);
        const { accessToken, refreshToken, token, ...rest } = result

        if (!token) {
          throw new AppError(
            status.INTERNAL_SERVER_ERROR,
            "Session token is missing",
          );
        }

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token);

        sendResponse(res, {
          status: status.OK,
          success: true,
          message: "User logged in successfully",
          data: {
            token,
            accessToken,
            refreshToken,
            ...rest,
          },
        });
    }
)

// src/modules/auth/auth.controller.ts

const getMe = catchAsync(
    async (req: Request, res: Response) => {
      
        const user = req.user as IRequestUser; 

        if (!user) {
            throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
        }

        const result = await authService.getMe(user);

        sendResponse(res, {
          status: status.OK,
          success: true,
          message: "User profile fetched successfully",
          data: result,
        });
    }
);

const getNewToken = catchAsync(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;
        const betterAuthSessionToken = req.cookies["better-auth.session_token"];
        if (!refreshToken) {
            throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
        }
        const result = await authService.getNewToken(refreshToken, betterAuthSessionToken);

        const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

        sendResponse(res, {
          status: status.OK,
          success: true,
          message: "New tokens generated successfully",
          data: {
            accessToken,
            refreshToken: newRefreshToken,
            sessionToken,
          },
        });
    }
)

const changePassword = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const betterAuthSessionToken = req.cookies["better-auth.session_token"];

        const result = await authService.changePassword(payload, betterAuthSessionToken);

        const { accessToken, refreshToken, token } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token as string);

        sendResponse(res, {
          status: status.OK,
          success: true,
          message: "Password changed successfully",
          data: result,
        });
    }
)

const logoutUser = catchAsync(
    async (req: Request, res: Response) => {
        const betterAuthSessionToken = req.cookies["better-auth.session_token"];
        const result = await authService.logoutUser(betterAuthSessionToken);

        const isProduction = process.env.NODE_ENV === "production";

        const cookieOptions: CookieOptions = {
            httpOnly: false,
            secure: isProduction,
            sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
            path: "/",
        };

        cookieUtils.clearCookie(res, 'accessToken', cookieOptions);
        cookieUtils.clearCookie(res, 'refreshToken', cookieOptions);
        cookieUtils.clearCookie(res, 'better-auth.session_token', cookieOptions);

        sendResponse(res, {
          status: status.OK,
          success: true,
          message: "User logged out successfully",
          data: result,
        });
    }
)

const verifyEmail = catchAsync(
    async (req: Request, res: Response) => {
        const { email, otp } = req.body;
        await authService.verifyEmail(email, otp);

        sendResponse(res, {
          status: status.OK,
          success: true,
          message: "Email verified successfully",
        });
    }
)

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    
    await authService.forgetPassword(email);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Password reset link sent to email if the user exists and email is verified",
    });
});

// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//     const { token, newPassword } = req.body;

//     if (!token) {
//         throw new AppError(status.BAD_REQUEST, "Token is required!");
//     }

//     await authService.resetPassword(token, newPassword);

//     sendResponse(res, {
//         status: status.OK,
//         success: true,
//         message: "Password changed successfully",
//     });
// });


const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body; 

  if (!email || !otp || !newPassword) {
    throw new AppError(
      status.BAD_REQUEST,
      "Email, OTP and new password are required!",
    );
  }

  await authService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Password changed successfully",
  });
});
const googleLogin = catchAsync((req: Request, res: Response) => {
    const redirectPath = req.query.redirect || "/dashboard";

    const encodedRedirectPath = encodeURIComponent(redirectPath as string);

    const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;

    res.render("googleRedirect", {
        callbackURL : callbackURL,
        betterAuthUrl : envVars.BETTER_AUTH_URL,
    })
})


const handleOAuthError = catchAsync((req: Request, res: Response) => {
    const error = req.query.error as string || "oauth_failed";
    res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
})

export const authController = {
    registerUser,
    loginUser,
    getMe,
    getNewToken,
    changePassword,
    logoutUser,
    verifyEmail,
    forgetPassword,
    resetPassword,
    googleLogin,
    handleOAuthError,
};