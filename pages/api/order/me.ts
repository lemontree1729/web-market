import Order, { order } from "../../../models/Order";
import { Err, Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";

const handler = customHandler()
    .get(
        async (req, res) => {
            const { userno } = req.cookies
            const result = await Order.find({ userno })
            result.map(value => {
                const { no, productno, status } = value
                return { no, productno, status }
            })
            Ok(res, result)
        }
    )
    .post(
        async (req, res) => {
            const { productno, userno, status } = req.body
            const tokenUserNo = req.cookies.userno
            if (userno != tokenUserNo) {
                return Err(res, "not a valid userno")
            }
            const order: order = { productno, userno, status }
            await new Order(order).save()
            Ok(res, "success")
        }
    )


export default handler;