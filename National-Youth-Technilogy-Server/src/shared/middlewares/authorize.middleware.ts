import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";
import { AppError } from "../errors/app-error";
import { cookieUtils } from "../utils/cookie";
import { jwtUtils } from "../utils/jwt";
import { Role, UserStatus } from "@prisma/client";
import { prisma } from "../../database/prisma";

export const authorize = (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = cookieUtils.getCookie(req, "accessToken");

      if (!accessToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! No access token provided.",
        );
      }

      const verifiedToken = jwtUtils.verifyToken(
        accessToken,
        envVars.ACCESS_TOKEN_SECRET,
      );

      if (!verifiedToken.success) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! Invalid access token.",
        );
      }

      if (
        authRoles.length > 0 &&
        !authRoles.includes(verifiedToken.data!.role)
      ) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! You do not have permission to access this resource.",
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: verifiedToken.data!.userId },
      });

      if (!user) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User not found.",
        );
      }

      if (
        user.status === UserStatus.BLOCKED ||
        user.status === UserStatus.DELETED ||
        user.isDeleted
      ) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User is not active.",
        );
      }

      //  req.user set করো
      req.user = {
        id: user.id,
        name: user.name ?? "",
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error: unknown) {
      next(error);
    }
  };