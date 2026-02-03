import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const auth = (...roles:string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(500).json({
                    message: "You are not allowed",
                    success: false
                })
            }
            const decode = jwt.verify(token, config.jwtsecret as string) as JwtPayload
            console.log({ decode })
            req.user = decode 


            if(roles.length && !roles.includes(decode.role as string)){
                return res.status(500).json({
                    error:"Unauthorized"
                })
            }


            next()
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                success: false
            })
        }
    }
}

export default auth