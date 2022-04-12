import { body } from "express-validator";
import Product from "../../../models/Product";
import { Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";
import { validateRequest } from "../../../utils/server/middleware";

const handler = customHandler()
    // how to make restful api with different permission?
    .patch(
        validateRequest([body(["_id"]).exists()]),
        async (req, res) => {
            const { _id } = req.body
            await Product.updateOne({ _id }, { $inc: { viewcount: 1 } })
            return Ok(res, "success")
        }
    )

export default handler