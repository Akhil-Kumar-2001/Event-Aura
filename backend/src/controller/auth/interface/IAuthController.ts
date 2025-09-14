import { Request, Response } from "express";

interface IAuthController{
    signup(req:Request,res:Response): Promise<void>;
    signin(req:Request,res:Response): Promise<void>;
    logout(req:Request,res:Response): Promise<void>;
}
export default IAuthController;