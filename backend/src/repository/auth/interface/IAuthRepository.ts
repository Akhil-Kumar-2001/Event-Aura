import { IUser } from "../../../model/userModel";
import { IBaseRepository } from "../../base/interface/IBaseRepository";

interface IAuthRepository extends IBaseRepository<IUser> {

}
export default IAuthRepository