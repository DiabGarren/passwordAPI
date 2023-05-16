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
    getPasswordById: async (_, { _id }) => {
        try {
            const id = new mongoose.Types.ObjectId(_id);
            const result = await Password.find({ _id: id });
            return result[0];
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },
    getPasswordByService: async (_, { service }) => {
        try {
            const result = await Password.find({ service: service });
            console.log(result);
            return result[0];
        } catch (err: any | unknown) {
            console.log(err);
            throw new Error(err);
        }
    },
    getPasswordByUsername: async (_, { username }) => {
        try {
            const result = await Password.find({ username: username });
            return result[0];
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    }
}