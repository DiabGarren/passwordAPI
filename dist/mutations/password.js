"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const Password = require("../models/password");
const mongoose_1 = __importDefault(require("mongoose"));
module.exports = {
    createPassword: (_, { service, username, password }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(service, username, password);
        try {
            const newPassword = new Password({
                _id: new mongoose_1.default.Types.ObjectId,
                service: service,
                username: username,
                password: password
            });
            const result = yield newPassword.save();
            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }
    })
};
