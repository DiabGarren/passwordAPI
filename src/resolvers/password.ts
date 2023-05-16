/* eslint-disable @typescript-eslint/no-explicit-any */
import User = require('../models/user');
import mongoose from 'mongoose';

export = {
    getAllUsers: async () => {
        try {
            const result = await User.find({});
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },
    getUserById: async (_, { _id }) => {
        try {
            const id = new mongoose.Types.ObjectId(_id);
            const result = await User.find({ _id: id });
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },
    getUserByUsername: async (_, { username }) => {
        try {
            const result = await User.find({ username: username });
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    }
}