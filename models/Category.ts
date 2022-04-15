import mongoose, { model, Schema } from 'mongoose';

export interface category {
    // _id?: number,
    category1: string,
    category2: Array<string>
}
const categorySchema = new Schema<category>({
    // _id: { type: Number },
    category1: { type: String, required: true },
    category2: { type: [String], required: true }
})

const Category = mongoose.models['category'] ? model<category>('category') : model<category>('category', categorySchema, 'category')
export default Category