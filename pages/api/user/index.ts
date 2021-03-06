import { body, cookie, query } from 'express-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import User, { user } from '../../../models/User';
import { encryptAuthNumber, encryptPassword } from '../../../utils/encrypt';
import { equals, Err, Ok } from '../../../utils/server/commonError';
import { customHandler } from '../../../utils/server/commonHandler';
import { filterObject, flattenObject } from '../../../utils/server/etc';
import { validateRequest } from '../../../utils/server/middleware';


const handler = customHandler()
    .get(
        async (req, res) => {
            // const { sort, display, byCategory, id: id } = req.query
            // result = await Product.aggregate([{ "$match": { id: parseInt(id as string) } }, { "$sample": { "size": maxResults } }])
            let { _id, id, required } = req.query
            const result = await User.find({ _id, id }).lean()
            let filter: string[]
            if (!required) {
                filter = []
            } else if (typeof required === "string") {
                filter = [required]
            } else {
                filter = required
            }
            const filteredResult = result.map(targetResult => filterObject(flattenObject(targetResult), filter))
            Ok(res, filteredResult)
        })
    .post(
        validateRequest([
            body("id").exists(),
            body("password").exists(),
            body("authnumber").exists(),
            cookie("authnumber").exists()]),
        async (req: NextApiRequest, res: NextApiResponse) => {
            let { id, password, name, email, gender, phonenumber, fulladdress }: user = req.body
            if (await User.findOne({ id })) {
                Err(res, "duplicate id")
            }
            const clientAuthNubmer = req.body.authnumber
            const serverAuthNumber = req.cookies.authnumber
            equals(encryptAuthNumber(clientAuthNubmer), serverAuthNumber, "authnumber")
            const result = await new User({ id, password: encryptPassword(password), name, email, gender, phonenumber, fulladdress, registerAt: new Date() }).save()
            const cookies = [`authnumber=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`]
            res.setHeader('Set-Cookie', cookies)
            Ok(res, result)
        }
    )
    .patch(
        validateRequest([body("_id").isArray(), body("role").isIn(["user", "admin"])]),
        async (req, res) => {
            const { _id, role } = req.body
            console.log("test", _id, role)
            const result = await User.updateMany({ _id: { $in: _id } }, { $set: { role } })
            Ok(res, result)
        })
    .delete(
        validateRequest([query("_id").exists()]),
        async (req, res) => {
            const { _id } = req.query
            const result = await User.deleteMany({ _id: { $in: _id } })
            Ok(res, result)
        })
export default handler