import { NextApiResponse } from "next";

export function Ok(res: NextApiResponse, result: any, statusCode?: number) {
    return res.status(statusCode || 200).json({ result })
}

export function errorToJson(err: Error): any {
    let { name, message, stack, cause } = err
    try {
        const stackList = stack?.split("\n    ")
        if (cause !== undefined && cause instanceof Error) {
            return { name, message, stack: stackList, cause: errorToJson(cause) }
        } else {
            return { name, message, stack: stackList, cause }
        }
    } catch (error) {
        return { name, message, stack, cause: error }
    }
}

export function commonErr(res: NextApiResponse, error: Error, statusCode?: number) {
    let body: any
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        body = errorToJson(error)
    } else {
        const { name, message } = error
        body = { name, message }
    }
    return res.status(statusCode || 400).json({ error: body })
}

export function Err(res: NextApiResponse, message: string, cause?: Error) {
    const error = new Error(message, { cause })
    error.name = "API_ERROR"
    return commonErr(res, error)
}

export function UncaughtErr(res: NextApiResponse, message: string, cause?: Error) {
    const error = new Error(message, { cause })
    error.name = "UNCAUGHT_API_ERROR"
    return commonErr(res, error)
}

export function AuthFailedErr(res: NextApiResponse, message: string, cause?: Error) {
    const error = new Error(message, { cause })
    error.name = "AUTH_FAILED_ERROR"
    return commonErr(res, error)
}

export function PageNotFoundErr(res: NextApiResponse, message: string, cause?: Error) {
    const error = new Error(message, { cause })
    error.name = "PAGE_NOT_FOUND_ERROR"
    return commonErr(res, error, 404)
}

export function exists(target: any, name: string) {
    if (target === undefined)
        throw { msg: "Invalid value", param: name, method: "exists" }
}

export function isEmpty(target: any, name: string) {
    if (!target) {
        throw { msg: "Invalid value", param: name, method: "isEmpty" }
    }
}

export function equals(target: any, compare: any, name: string) {
    if (target !== compare)
        throw { msg: "Invalid value", param: name, method: "equals" }
}
export function commonError(name: string, method: string) {
    return { msg: "Invalid value", param: name, method }
}

export function equalsError(name: string) {
    return commonError(name, "equals")
}
export function existsError(name: string) {
    return commonError(name, "exists")
}
export function isEmptyError(name: string) {
    return commonError(name, "isEmpty")
}
export function isInError(name: string) {
    return commonError(name, "isIn")
}
export function isStringError(name: string) {
    return commonError(name, "isString")
}
