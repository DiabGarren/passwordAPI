/* eslint-disable @typescript-eslint/no-explicit-any */
import Password = require('../models/password');
import mongoose from 'mongoose';

export = {
    createPassword: async (_, { service, username, password }) => {
        console.log(service, username, password);
        try {
            const newPassword = new Password({
                _id: new mongoose.Types.ObjectId,
                service: service,
                username: username,
                password: password
            });
            const result = await newPassword.save();
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    }

    // deletePassword: async (_, { id }) => {
    //     console.log(id);
    //     try {
    //         const newPassword = new Password({
    //             _id: new mongoose.Types.ObjectId(id),
    //         });
    //         const result = newPassword.deleteOne();
    //         return result;
    //     } catch (err: any | unknown) {
    //         throw new Error(err.message);
    //     }
    // }
}