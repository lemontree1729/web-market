import mongoose, { model, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface order {
    _id?: number,
    product_id: number,
    user_id: number,
    status: string,
    createdAt?: Date
}
const orderSchema = new Schema<order>({
    _id: { type: Number },
    product_id: { type: Number, required: true, ref: "product" },
    user_id: { type: Number, required: true, ref: "user" },
    status: { type: String, required: true },
    createdAt: { type: Date, default: new Date() }
}, { _id: false })

if (!mongoose.models["order"]) {
    orderSchema.plugin(AutoIncrement, { id: 'order_seq' })
}

const Order = mongoose.models['order'] ? model<order>('order') : model<order>('order', orderSchema, 'order')
export default Order