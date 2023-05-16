/* eslint-disable @typescript-eslint/no-explicit-any */
import Password = require('../models/password');
import mongoose from 'mongoose';
// import mongoose from 'mongoose';

export = {
    getAllPasswords: async () => {
        try {
            const result = await Password.find({});
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },
    getPasswordById: async (_, { id }) => {
        try {
            const _id = new mongoose.Types.ObjectId(id);
            const result = await Password.find({ _id: _id });
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    }
}