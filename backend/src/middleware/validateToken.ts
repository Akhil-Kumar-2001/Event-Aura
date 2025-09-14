// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
// import dotenv from "dotenv";
// import { STATUS_CODES } from "../constants/statusCode";
// import { Token } from "../utils/tockenUtility";
// import { AppError } from "../utils/customError";

// dotenv.config();

// declare module "express-serve-static-core" {
//   interface Request {
//     userId?: string;
//     role?: string;
//     email?: string;
//   }
// }

// export const validateToken = (requiredRole?: string) => {
//   return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const JWT_KEY = process.env.JWT_SECRET as string;
//       let accessToken = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

//       if (!accessToken) {
//         res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Access token not found, please log in" });
//         return;
//       }

//       jwt.verify(accessToken, JWT_KEY, async (err: unknown, data: JwtPayload | string | undefined) => {
//         if (err) {
//           console.log("acc", accessToken, err)
//           const refreshToken = req.cookies.refreshToken;

//           if (!refreshToken) {
//             res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Refresh token missing" });
//             return;
//           }
//           const tokenInstance = new Token();
//           const payload = tokenInstance.verifyToken(refreshToken, "refresh");
//           if (!payload) {
//             throw new AppError("Invalid refresh token", STATUS_CODES.UNAUTHORIZED);
//           }

//           const newAccessToken = tokenInstance.generatingTokens(payload.userId as string, payload.role as string).accessToken;

//             if (newAccessToken) {
//                 res.cookie("accessToken", newAccessToken, {
//                     httpOnly: true,
//                     secure: true,
//                     sameSite: "none",
//                     // domain: ".elevic.site",
//                     // path: "/",
//                     maxAge: 15 * 60 * 1000,
//                 });

//           return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid or expired token, please log in again." });
//         }

//         if (!data) {
//           return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid token structure." });
//         }

//         const { role, userId } = data as { role: string, userId: string }


//         // Check role
//         if (requiredRole && role !== requiredRole) {
//           return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Access denied: Insufficient permissions." });
//         }

//         console.log("Checking role of the user in middleware => ", role);

//         req.userId = userId;
//         req.role = role;
//         next();
//       });

//     } catch (error) {
//       console.log(error)
//       res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
//       return;
//     }
//   };
// };






import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { STATUS_CODES } from "../constants/statusCode";
import { Token } from "../utils/tockenUtility";
import { AppError } from "../utils/customError";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    role?: string;
  }
}

export const validateToken = (requiredRole?: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const JWT_KEY = process.env.JWT_SECRET as string;
      let accessToken = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

      if (!accessToken) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Access token not found, please log in" });
        return;
      }

      jwt.verify(accessToken, JWT_KEY, async (err: unknown, data: JwtPayload | string | undefined) => {
        if (err) {
          const refreshToken = req.cookies?.refreshToken;

          if (!refreshToken) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ 
              success: false, 
              message: "Refresh token missing" 
            });
          }

          try {
            const tokenInstance = new Token();
            const payload = tokenInstance.verifyToken(refreshToken, "refresh");
            
            if (!payload) {
              return res.status(STATUS_CODES.UNAUTHORIZED).json({ 
                success: false, 
                message: "Invalid refresh token" 
              });
            }

            const tokens = tokenInstance.generatingTokens(payload.userId as string, payload.role as string);
            const newAccessToken = tokens.accessToken;

            if (newAccessToken) {
              res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                // domain: ".elevic.site",
                // path: "/",
                maxAge: 15 * 60 * 1000,
              });

              if (requiredRole && payload.role !== requiredRole) {
                return res.status(STATUS_CODES.FORBIDDEN).json({ 
                  message: "Access denied: Insufficient permissions." 
                });
              }

              console.log("Token refreshed successfully for user:", payload.userId, "with role:", payload.role);

              req.userId = payload.userId as string;
              req.role = payload.role as string;
              
              return next();
            } else {
              return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
                success: false, 
                message: "Failed to generate new access token" 
              });
            }

          } catch (refreshError) {
            console.log("Refresh token error:", refreshError);
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ 
              success: false, 
              message: "Invalid or expired refresh token, please log in again." 
            });
          }
        } else {
          if (!data) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ 
              message: "Invalid token structure." 
            });
          }

          const { role, userId, email } = data as { role: string, userId: string, email?: string };

          if (requiredRole && role !== requiredRole) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ 
              message: "Access denied: Insufficient permissions." 
            });
          }

          console.log("Valid access token for user:", userId, "with role:", role);

          req.userId = userId;
          req.role = role;
          next();
        }
      });

    } catch (error) {
      console.log("Middleware error:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
        message: "Internal server error" 
      });
      return;
    }
  };
};