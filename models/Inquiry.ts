import mongoose, { model, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);


export interface inquiry {
    _id?: number,
    isClosed?: boolean,
    isPrivate?: boolean,
    qacategory: string,
    title: string,
    content: string,
    user_id: number,
    createdAt?: Date,
    parent?: number,
}

const inquirySchema = new Schema<inquiry>({
    _id: { type: Number },
    isClosed: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    qacategory: { type: String, required: true, }, //"교환", 환불, 배송, 상품문의, 주문취소, 주문/결제, 이벤트
    title: { type: String, required: true },
    content: { type: String, required: true },
    user_id: { type: Number, required: true, ref: "user" },
    createdAt: { type: Date, default: new Date() },
    parent: { type: Number, ref: "inquiry" }
}, { _id: false })

if (!mongoose.models["inquiry"]) {
    inquirySchema.plugin(AutoIncrement, { id: 'inquiry_seq' })
}

const Inquiry = mongoose.models['inquiry'] ? model<inquiry>('inquiry') : model<inquiry>('inquiry', inquirySchema, 'inquiry')
export default Inquiry