import { NextApiRequest, NextApiResponse } from "next"
import { PageNotFoundErr, UncaughtErr } from "./commonError"
import { ValidationChain, validationResult } from "express-validator"
import nextConnect from "next-connect"
import { checkDB } from "./middleware"
import authController from "./authController"


export function customHandler() {
    return nextConnect({
        onError: (err: Error, req: NextApiRequest, res: NextApiResponse, next: any) => {
            UncaughtErr(res, "uncaught api error occured", err)
        },
        onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
            PageNotFoundErr(res, "api page does not exist")
        },
    }).use(checkDB).use(authController)
}

export function validate(validations: ValidationChain[]) {
    return (req: NextApiRequest, res: NextApiResponse) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Promise.all(validations.map((validation) => validation.run(req)))
                const errors = validationResult(req)
                errors.isEmpty() ? resolve(errors.array()) : reject(errors.array())
            } catch (error) {
                reject(error)
            }
        })
    }
}