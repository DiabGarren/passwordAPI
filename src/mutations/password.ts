import Password = require('../models/password');
import mongoose from 'mongoose';

export = {
    createPassword: async (_, { service, username, password }, req) => {
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
}