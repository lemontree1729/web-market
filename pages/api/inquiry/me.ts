import { body, cookie, query } from "express-validator";
import mongoose from "mongoose";
import Inquiry, { inquiry } from "../../../models/Inquiry";
import { Err, Ok } from "../../../utils/server/commonError";
import { customHandler, validate } from "../../../utils/server/commonHandler";
import { validateRequest } from "../../../utils/server/middleware";


const handler = customHandler()
    .get( //기능: 유저 qna info 불러오기, 입력: 없음, 출력:유저의 qna info
        async (req, res) => {
            const { userno } = req.cookies
            const result = await Inquiry.find({ userno })
            return Ok(res, result)
        }
    )
    .post(//기능: 유저 qna 저장, 입력:userno, qacategory, title, content, 출력:저장 결과
        validateRequest([
            body("qacategory").isIn(["교환", "환불", "배송", "상품문의", "주문취소", "주문/결제", "이벤트"]),
            body("title").exists(),
            body("content").exists()]),
        async (req, res) => {
            const user_id = mongoose.Types.ObjectId(req.cookies.user_id)
            const { qacategory, title, content } = req.body
            const saveValue: inquiry = { user_id, qacategory, title, content, createdAt: new Date() }
            const result = await new Inquiry(saveValue).save()
            return Ok(res, result)
        }
    )
    .put(  //기능: 유저 qna 수정, 입력:no, qacategory, title, content, userno, 출력:수정 결과
        validateRequest([
            body("no").isNumeric(),
            body("qacategory").isIn(["교환", "환불", "배송", "상품문의", "주문취소", "주문/결제", "이벤트"]),
            body("title").exists(),
            body("content").exists()]),
        async (req, res) => {
            const { userno } = req.cookies
            const { no, qacategory, title, content } = req.body
            const target: inquiry | null = await Inquiry.findOne({ userno, no })
            if (!target) {
                return Err(res, target)
            }
            const result = await Inquiry.updateOne({ userno, no }, { $set: { qacategory, title, content, date: new Date() } })
            return Ok(res, result)
        }
    )
    .delete( //기능: 유저 qna 삭제, 입력:no, 출력:삭제 결과
        validateRequest([
            query("no").isNumeric()]),
        async (req, res) => {
            const { no } = req.query
            const target: inquiry | null = await Inquiry.findOne({ no })
            if (!target) {
                return Err(res, "qaboard not found")
            }
            await validate([cookie("userno").equals(target.userno.toString())])(req, res)
            const result = await Inquiry.deleteOne({ no })
            return Ok(res, result)
        }
    )

export default handler;