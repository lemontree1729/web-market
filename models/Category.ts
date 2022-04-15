import mongoose, { model, Schema } from 'mongoose';

export interface category {
    _id?: mongoose.Types.ObjectId,
    category1: string,
    category2: Array<string>
}
const categorySchema = new Schema<category>({
    category1: { type: String, required: true },
    category2: { type: [String], required: true }
})

const Category = mongoose.models['category'] ? model<category>('category') : model<category>('category', categorySchema, 'category')
export default Category