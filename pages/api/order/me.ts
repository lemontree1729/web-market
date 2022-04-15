import Order, { order } from "../../../models/Order";
import { Err, Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";

const handler = customHandler()
    .get(
        async (req, res) => {
            const { user_id } = req.cookies
            const result = await Order.find({ user_id })
            result.map(value => {
                const { _id, product_id, status } = value
                return { _id, product_id, status }
            })
            Ok(res, result)
        }
    )
    .post(
        async (req, res) => {
            const { product_id, user_id, status } = req.body
            const tokenUserNo = req.cookies.user_id
            if (user_id != tokenUserNo) {
                return Err(res, "not a valid user_id")
            }
            const order: order = { product_id, user_id, status }
            await new Order(order).save()
            Ok(res, "success")
        }
    )


export default handler;