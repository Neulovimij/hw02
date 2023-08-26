import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";


const errorFormater = ({msg, path}: any) => {
    return {
        message: msg,
        field: path
    }
}

export const inputValidatorMiddlevare = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({onlyFirstError: true}).map (e => errorFormater(e))
        res.status(400).json({errorsMessages})
    }else {
        next()
    }
}