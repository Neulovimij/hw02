import {Request, Response, NextFunction} from "express";


export const autorizationValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if (!auth) {
        return res.sendStatus(401)
    }
    if (auth !== 'Basic YWRtaW46cXdlcnR5') return res.sendStatus(401)
    return next()
}