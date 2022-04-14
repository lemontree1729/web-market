import mongoose, { model, Schema } from 'mongoose';

export interface serverLog {
    _id?: mongoose.Types.ObjectId,
    path?: string
    referer?: string,
    jti?: string,
    role?: string,
    ip?: string,
    fingerprint?: string,
    createdAt?: Date,
}

const serverLogScheme = new Schema<serverLog>({
    path: { type: String, default: null },
    referer: { type: String, default: null },
    jti: { type: String, default: null },
    role: { type: String, default: null },
    ip: { type: String, default: null }, // add validate
    fingerprint: { type: String, default: null },
    createdAt: { type: Date, default: new Date(), expires: "30d" }
})

const ServerLog = mongoose.models['serverLog'] ? model<serverLog>('serverLog') : model<serverLog>('serverLog', serverLogScheme, 'serverLog')
export default ServerLog