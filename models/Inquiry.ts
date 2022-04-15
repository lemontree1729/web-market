import mongoose, { model, Schema } from 'mongoose';

export interface inquiry {
    _id?: mongoose.Types.ObjectId,
    isClosed?: boolean,
    isPrivate?: boolean,
    qacategory: string,
    title: string,
    content: string,
    user_id: mongoose.Types.ObjectId,
    createdAt?: Date,
    parent?: mongoose.Types.ObjectId,
}

const inquirySchema = new Schema<inquiry>({
    isClosed: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    qacategory: { type: String, required: true, }, //"교환", 환불, 배송, 상품문의, 주문취소, 주문/결제, 이벤트
    title: { type: String, required: true },
    content: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    createdAt: { type: Date, default: new Date() },
    parent: { type: Schema.Types.ObjectId, ref: "inquiry" }
})

const Inquiry = mongoose.models['inquiry'] ? model<inquiry>('inquiry') : model<inquiry>('inquiry', inquirySchema, 'inquiry')
export default Inquiry