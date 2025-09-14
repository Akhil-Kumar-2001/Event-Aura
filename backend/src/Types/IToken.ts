export interface IToken {
    generatingTokens(userId: string, role:string): {
        accessToken: string;
        refreshToken: string;
    };
}

export interface IAdminToken {
    generatingTokens(email:string):{
        accessToken: string;
        refreshToken: string;
    }
}
