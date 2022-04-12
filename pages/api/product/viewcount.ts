import { body } from "express-validator";
import Product from "../../../models/Product";
import { Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";
import { validateRequest } from "../../../utils/server/middleware";

const handler = customHandler()
    // how to make restful api with different permission?
    .patch(
        validateRequest([body(["no"]).exists()]),
        async (req, res) => {
            const { no } = req.body
            await Product.updateOne({ no }, { $inc: { viewcount: 1 } })
            return Ok(res, "success")
        }
    )

export default handler