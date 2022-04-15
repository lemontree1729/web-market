import mongoose, { model, Schema } from 'mongoose';

export interface loginToken {
    _id?: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    jti: string,
    ip: string,
    fingerprint: string,
    createdAt?: Date,
    expireAt: Date
}
const loginTokenSchema = new Schema<loginToken>({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    jti: { type: String, required: true, unique: true, index: true },
    ip: { type: String, required: true }, // add validate
    fingerprint: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    expireAt: { type: Date, required: true }
})

if (!mongoose.models['loginToken']) {
    loginTokenSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });
}
const LoginToken = mongoose.models['loginToken'] ? model<loginToken>('loginToken') : model<loginToken>('loginToken', loginTokenSchema, 'loginToken')
export default LoginToken