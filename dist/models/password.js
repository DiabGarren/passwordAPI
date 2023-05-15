"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const passwordSchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    service: { type: String },
    username: { type: String },
    password: { type: String }
});
module.exports = mongoose_1.default.model('Password', passwordSchema);
