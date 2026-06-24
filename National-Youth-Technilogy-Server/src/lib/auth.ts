/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth, } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, emailOTP } from "better-auth/plugins";
import { envVars } from "../config/env";
import { prisma } from "../database/prisma";
import { Role,  UserStatus } from "@prisma/client";
import { sendEmail } from "../shared/utils/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  trustedOrigins: [
    envVars.FRONTEND_URL || envVars.BETTER_AUTH_URL,
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      prompt: "select_account consent",
      mapProfileToUser: () => {
        return {
          role: Role.USER,
          status: UserStatus.ACTIVE,
          needPasswordChange: false,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null,
        };
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },

 user: {
  additionalFields: {
    username: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
      defaultValue: "USER", 
    },
    status: {
      type: "string",
      required: true,
      defaultValue: "ACTIVE",
    },

    // --- Applicant Personal Info ---
    instituteName: { type: "string", required: false },
    directorName: { type: "string", required: false },
    mobileNumber: { type: "string", required: false },
    gender: { type: "string", required: false },
    nationality: { type: "string", required: false },
    instituteAge: { type: "string", required: false },
    religion: { type: "string", required: false },

    // --- Address Details ---
    fullAddress: { type: "string", required: false },
    village: { type: "string", required: false },
    postOffice: { type: "string", required: false },
    thanaUpazila: { type: "string", required: false },
    district: { type: "string", required: false },

    // --- Parents & Course Details ---
    fatherName: { type: "string", required: false },
    motherName: { type: "string", required: false },
    courseName: { type: "string", required: false },
    duration: { type: "string", required: false },
    startYear: { type: "string", required: false },
    startMonth: { type: "string", required: false },
    endYear: { type: "string", required: false },
    endMonth: { type: "string", required: false },
    educationQualification: { type: "string", required: false },

    // --- Photos & Files ---
    directorPhoto: { type: "string", required: false },
    institutePhoto: { type: "string", required: false },
    nationalIdPhoto: { type: "string", required: false },
    signaturePhoto: { type: "string", required: false },

    // --- System Status ---
    needPasswordChange: {
      type: "boolean",
      required: true,
      defaultValue: true,
    },
    isDeleted: {
      type: "boolean",
      required: true,
      defaultValue: false,
    },
    deletedAt: {
      type: "date",
      required: false,
    },
  },
},

// --- Custom API Methods --- only for email OTP related operations ---
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.error(` User with email ${email} not found.`);
          return;
        }

        if (type === "email-verification") {
          if (user.role === Role.ADMIN) return;

          if (!user.emailVerified) {
            await sendEmail({ 
              to: email,
              subject: "Verify your email",
              templateName: "otp",
              templateData: {
                userName: user.name || user.username || "User",
                appName: envVars.APP_NAME,
                otp,
              },
            });
            console.log(` Verification OTP sent to: ${email}`);
          }
        } 
        
        else if (type === "forget-password") {
          await sendEmail({ 
            to: email,
            subject: "Password Reset OTP",
            templateName: "otp",
            templateData: {
              userName: user.name || user.username || "User",
              appName: envVars.APP_NAME,
              otp,
            },
          });
          console.log(` Password Reset OTP sent to: ${email}`);
        }
      },
      expiresIn: 5 * 60,
      otpLength: 6,     
    }),
  ],

 callbacks: {
  session: async ({ session, user }: any) => {
    return {
      ...session,
      user: {
        ...session.user,
        role: user.role, // Inject role into frontend session
      },
    };
  },
},



  session: {
    expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24, // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24, // 1 day in seconds
    },
  },
  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
  },

advanced: {
  useSecureCookies: false,
  crossSubdomainCookies: {
    enabled: true,
  },
  cookies: {
    state: {
      attributes: {
        sameSite: "lax",
        secure: false,
        httpOnly: false, 
        path: "/",
      },
    },
    sessionToken: {
      attributes: {
        sameSite: "lax",
        secure: false,
        httpOnly: false,
        path: "/",
      },
    },
  },
},

});
