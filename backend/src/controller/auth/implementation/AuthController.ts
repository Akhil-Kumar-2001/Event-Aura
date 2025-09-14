import { Request, Response } from "express";
import IAuthService from "../../../service/auth/interface/IAuthService";
import IAuthController from "../interface/IAuthController";
import { STATUS_CODES } from "../../../constants/statusCode";
import { AppError } from "../../../utils/customError";

class AuthController implements IAuthController {
    private _authService: IAuthService;

    constructor(authService: IAuthService) {
        this._authService = authService;
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, role } = req.body;
            console.log(req.body);
            const signupResponse = await this._authService.sigup(username, email, password, role);
            console.log(signupResponse);
            if (signupResponse) {
                const { user, accessToken, refreshToken } = signupResponse;
                if (accessToken && refreshToken) {
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        // domain: ".elevic.site",
                        // path: "/",
                        maxAge: 2 * 24 * 60 * 60 * 1000,
                    });
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        // domain: ".elevic.site",
                        // path: "/",
                        maxAge: 15 * 60 * 1000,
                    });
                    res
                        .status(STATUS_CODES.OK)
                        .json({
                            success: true, message: "Sign-in successful", data: { accessToken, user }
                        });
                    return;
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).json({
                        success: false, message: "Invalid credentials"
                    });
                    return;
                }
            } else {
                res.status(STATUS_CODES.UNAUTHORIZED).json({
                    success: false, message: "Invalid credentials"
                });
                return;
            }

        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

    async signin(req: Request, res: Response): Promise<void> {
        const { email, password, role } = req.body;
        try {
            let signinResponse = await this._authService.signin(email, password, role)
            if (signinResponse) {
                const { user, accessToken, refreshToken } = signinResponse;
                if (accessToken && refreshToken) {
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        // domain: ".elevic.site",
                        // path: "/",
                        maxAge: 2 * 24 * 60 * 60 * 1000,
                    });
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        // domain: ".elevic.site",
                        // path: "/",
                        maxAge: 15 * 60 * 1000,
                    });
                    res
                        .status(STATUS_CODES.OK)
                        .json({
                            success: true, message: "Sign-in successful", data: { accessToken, user: { email: user.email, id: user._id, name: user.username } }
                        });
                    return;
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).json({
                        success: false, message: "Invalid credentials"
                    });
                    return;
                }
            } else {
                res.status(STATUS_CODES.UNAUTHORIZED).json({
                    success: false, message: "Invalid credentials"
                });
                return;
            }

        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "No session found" });
                return;
            }

            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            res.status(STATUS_CODES.OK).json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

}

export default AuthController;
