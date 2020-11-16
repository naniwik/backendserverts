import { Request } from "express"

declare module "express" { 
  export interface Request {
    uid?: UID;
  }
}

export interface UID {
  uid: string;
  iat: number;
  exp: number;
}
