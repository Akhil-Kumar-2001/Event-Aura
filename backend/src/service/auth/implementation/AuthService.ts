import { STATUS_CODES } from "../../../constants/statusCode";
import { mapUserToDto } from "../../../mapper/user/userMapper";
import IAuthRepository from "../../../repository/auth/interface/IAuthRepository";
import { AuthResponse } from "../../../Types/IBasicType";
import { AppError } from "../../../utils/customError";
import PasswordUtils from "../../../utils/passwordUtility";
import { Token } from "../../../utils/tockenUtility";
import { SignupValidation } from "../../../validation/auth/signupValidation";
import IAuthService from "../interface/IAuthService";

class AuthService implements IAuthService {
    private _authRepository: IAuthRepository;
    constructor(authRepository: IAuthRepository) {
        this._authRepository = authRepository
    }

    async sigup(username: string, email: string, password: string, role: string): Promise<AuthResponse | null> {
        try {
            const validation = SignupValidation.safeParse({ username, email, password, role });
            if(!validation.success){
                console.log(validation.error.issues)
                throw new AppError(validation.error.issues[0]?.message!,400)
            }

            const existingUser = await this._authRepository.findByEmail(email);

            if (existingUser) {
                throw new AppError("User with this email already exists.", STATUS_CODES.BAD_REQUEST);
            }
            const hashpassword = await PasswordUtils.passwordHash(password);
            const newUser = await this._authRepository.create({ ...validation.data, password: hashpassword });
            if (newUser) {
                const tokenInstance = new Token();
                if (!newUser._id || !newUser.role) {
                    throw new AppError("User ID or role is missing.", STATUS_CODES.BAD_REQUEST);
                }
                const { accessToken, refreshToken } = tokenInstance.generatingTokens(newUser._id as string, newUser.role as string);
                const dto = mapUserToDto(newUser)
                return { user: dto, accessToken, refreshToken };
            }
            throw new AppError("User creation failed", STATUS_CODES.INTERNAL_SERVER_ERROR);
        } catch (error) {

            throw error;
        }
    }

    async signin(email: string, password: string, role: string): Promise<AuthResponse | null> {
        try {
            const user = await this._authRepository.findByEmail(email);
            if (!user) {
                throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
            }
            if (user.role !== role) {
                throw new AppError("Unauthorized access", STATUS_CODES.FORBIDDEN);
            }
            const isPasswordValid = await PasswordUtils.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new AppError("Invalid password", STATUS_CODES.UNAUTHORIZED);
            }
            const tokenInstance = new Token();
            const { accessToken, refreshToken } = tokenInstance.generatingTokens(user._id as string, user.role as string);
            return { user: mapUserToDto(user), accessToken, refreshToken };
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService