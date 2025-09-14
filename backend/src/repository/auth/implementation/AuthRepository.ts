import User, { IUser } from "../../../model/userModel";
import { BaseRepository } from "../../base/implementation/BaseRepository";
import IAuthRepository from "../interface/IAuthRepository";

class AuthRepository extends BaseRepository<IUser> implements IAuthRepository {
    constructor() {
        super(User)
    }
}
export default AuthRepository