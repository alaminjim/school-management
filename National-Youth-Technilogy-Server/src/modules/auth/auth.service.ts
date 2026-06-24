/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { prisma } from "../../database/prisma";
import { auth } from "../../lib/auth";
import { AppError } from "../../shared/errors/app-error";
import { jwtUtils } from "../../shared/utils/jwt";
import { tokenUtils } from "../../shared/utils/token";
import {
    IChangePasswordPayload,
    ILoginUserPayload,
    IRegisterUserPayload,
    IRequestUser,
} from "./auth.type";
import { generateUniqueBranchId } from "./student-generator";

const registerUser = async (payload: IRegisterUserPayload) => {
  const { password, ...userData } = payload;

    if (userData.email) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (existingUser) {
        throw new AppError(status.CONFLICT, "Email already exists");
      }
    }

    const data = await auth.api.signUpEmail({
      body: {
        ...userData,
        password,
      },
    });
    console.log("userData:", userData);

  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to register user");
  }

   
   const branchId = await generateUniqueBranchId();
  await prisma.user.update({
    where: { id: data.user.id },
    data: {
         branchId,
         status: "PENDING", 
        },
  });


  try {
    const tokenPayload = {
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name, 
      email: data.user.email,
      status: data.user.status,
    };

    const accessToken = tokenUtils.getAccessToken(tokenPayload);
    const refreshToken = tokenUtils.getRefreshToken(tokenPayload);

    return {
      token: data.token,
      accessToken,
      refreshToken,
      user: { ...data.user, branchId },
      
    };
  } catch (error) {
    await prisma.user.delete({ where: { id: data.user.id } });
    throw error;
  }
};








// const loginUser = async (payload: ILoginUserPayload) => {
//     const { email, password } = payload;

//     const data = await auth.api.signInEmail({
//         body: {
//             email,
//             password,
//         }
//     })
   
//      if (data.user.status === "PENDING") {
//       throw new AppError(status.FORBIDDEN, "Your account is pending approval. Please wait for admin approval.");
//     }

//     if (data.user.status === "BLOCKED") {
//       throw new AppError(status.FORBIDDEN, "User is blocked");
//     }

//     if (data.user.isDeleted || data.user.status === "DELETED") {
//       throw new AppError(status.NOT_FOUND, "User is deleted");
//     }

//     const accessToken = tokenUtils.getAccessToken({
//         userId: data.user.id,
//         role: data.user.role,
//         name: data.user.name,
//         email: data.user.email,
//         status: data.user.status,
//         isDeleted: data.user.isDeleted,
//         emailVerified: data.user.emailVerified,
//     });

//     const refreshToken = tokenUtils.getRefreshToken({
//         userId: data.user.id,
//         role: data.user.role,
//         name: data.user.name,
//         email: data.user.email,
//         status: data.user.status,
//         isDeleted: data.user.isDeleted,
//         emailVerified: data.user.emailVerified,
//     });

//     return {
//       ...data,
//       accessToken,
//       refreshToken,
//     };
//   }


const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    if (existingUser.status === "PENDING") {
        throw new AppError(status.FORBIDDEN, "Your account is pending approval.");
    }

    if (existingUser.status === "BLOCKED") {
        throw new AppError(status.FORBIDDEN, "User is blocked");
    }

    if (existingUser.isDeleted || existingUser.status === "DELETED") {
        throw new AppError(status.NOT_FOUND, "User is deleted");
    }

    // login 
    const data = await auth.api.signInEmail({
        body: { email, password },
    });

    if (!data.user) {
        throw new AppError(status.BAD_REQUEST, "Failed to login");
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    return {
        ...data,
        accessToken,
        refreshToken,
    };
};











const getMe = async (user: IRequestUser) => {
    if (!user || !user.id) {
        throw new AppError(status.UNAUTHORIZED, "You are not logged in or session expired!");
    }

    const isUserExists = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
      
    });

    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, "This user no longer exists in our database!");
    }

    return isUserExists;
};

const getNewToken = async (refreshToken : string, sessionToken : string) => {
            const isSessionTokenExists = await prisma.session.findUnique({
        where : {
            token : sessionToken,
        },
        include : {
            user : true,
        }
    })
    
    

    if(!isSessionTokenExists){
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, envVars.REFRESH_TOKEN_SECRET)

    if(!verifiedRefreshToken.success && verifiedRefreshToken.error){
        throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
    }

    const data = verifiedRefreshToken.data as JwtPayload;

    const newAccessToken = tokenUtils.getAccessToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

            const { token } = await prisma.session.update({
        where : {
            token : sessionToken
        },
        data : {
            token : sessionToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
            updatedAt: new Date(),
        }
    })
    
    

    return {
        accessToken : newAccessToken,
        refreshToken : newRefreshToken,
        sessionToken : token,
    };
}

const changePassword = async (payload : IChangePasswordPayload, sessionToken : string) =>{
    const session = await auth.api.getSession({
        headers : new Headers({
            Authorization : `Bearer ${sessionToken}`
        })
    })

    if(!session){
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

    const {currentPassword, newPassword} = payload;

    const result = await auth.api.changePassword({
        body :{
            currentPassword,
            newPassword,
            revokeOtherSessions: true,
        },
        headers : new Headers({
            Authorization : `Bearer ${sessionToken}`
        })
    })

    if(session.user.needPasswordChange){
                await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                needPasswordChange: false,
            }
        })
        
        
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });
    

    return {
        ...result,
        accessToken,
        refreshToken,
    }
}
const logoutUser = async (sessionToken: string) => {
    const result = await auth.api.signOut({
        headers: {
            cookie: `better-auth.session_token=${sessionToken}`
        }
    });

    return result;
};

const verifyEmail = async (email: string, otp: any) => { 
  
  const otpString = String(otp).trim();

  if (!otpString || otpString.length !== 6) {
    throw new AppError(status.BAD_REQUEST, "OTP must be 6 digits");
  }

  const result = await auth.api.verifyEmailOTP({
    body: { email, otp: otpString }, 
  });

  if (!result?.user) {
    throw new AppError(status.BAD_REQUEST, "Invalid or expired OTP");
  }

  return result;
};


const forgetPassword = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified. Please verify your email first.");
  }

  try {
   
    // await (auth.api as any).sendVerificationEmail({
    //   body: {
    //     email,
    //     type: "forget-password",
    //   },

    await auth.api.sendVerificationOTP({
  body: { email, type: "forget-password" },
});
    ;

    console.log("✅ Password reset OTP sent successfully to:", email);
    
    return {
      success: true,
      message: "Password reset OTP has been sent to your email",
    };

  } catch (err: any) {
  
    console.error(" Forget Password Detailed Error:", err?.message || err);

    throw new AppError(
      status.INTERNAL_SERVER_ERROR, 
      "Email service failed. Please check your SMTP configuration."
    );
  }
};

const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError(status.NOT_FOUND, "User not found");
    }

    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(newPassword);

    await prisma.account.updateMany({
      where: {
        userId: user.id,
        providerId: "credential",
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: true, message: "Password reset successful" };
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    throw new AppError(status.BAD_REQUEST, "Something went wrong");
  }
};

export const authService = {
    registerUser: registerUser,
    loginUser,
    getMe,
    getNewToken,
    changePassword,
    logoutUser,
    verifyEmail,
    forgetPassword,
    resetPassword,
    // googleLoginSuccess,
};