import { AuthResponse } from "../../../Types/IBasicType";

interface IAuthService {
    sigup(username: string, email: string, password: string, role: string): Promise<AuthResponse | null>;
    signin(email: string, password: string, role: string): Promise<AuthResponse | null>;

}
export default IAuthService;