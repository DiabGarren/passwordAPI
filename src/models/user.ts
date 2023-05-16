import mongoose from "mongoose";
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String },
    password: { type: String }
});

export = mongoose.model('Password', passwordSchema);