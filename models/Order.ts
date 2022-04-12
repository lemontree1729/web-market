import mongoose, { model, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface order {
    no?: number,
    productno: number,
    userno: number,
    status: string,
    createdAt: Date
}
const orderSchema = new Schema<order>({
    no: { type: Number, unique: true },
    productno: { type: Number, required: true },
    userno: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: new Date() }
})
if (!mongoose.models['order']) {
    orderSchema.plugin(AutoIncrement, { id: "orderno", inc_field: "no" })
}
const Order = mongoose.models['order'] ? model<order>('order') : model<order>('order', orderSchema, 'order')
export default Order