import mongoose, { model, Schema } from 'mongoose';

export interface order {
    _id?: mongoose.Types.ObjectId,
    product_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    status: string,
    createdAt?: Date
}
const orderSchema = new Schema<order>({
    product_id: { type: Schema.Types.ObjectId, required: true, ref: "product" },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    status: { type: String, required: true },
    createdAt: { type: Date, default: new Date() }
})
const Order = mongoose.models['order'] ? model<order>('order') : model<order>('order', orderSchema, 'order')
export default Order