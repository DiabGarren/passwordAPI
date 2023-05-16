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
    },

    updatePassword: async (_, { _id, service, username, password }) => {
        try {
            const id = new mongoose.Types.ObjectId(_id);
            const newPassword = new Password({
                _id: id,
                service: service,
                username: username,
                password: password
            });
            await Password.replaceOne({ _id: id }, newPassword);
            return newPassword;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },

    deletePassword: async (_, { _id }) => {
        try {
            const id = new mongoose.Types.ObjectId(_id);
            await Password.deleteOne({ _id: id })
                .then((doc) => {
                    // console.log(err);
                    if (doc.acknowledged == true) {
                        if (doc.deletedCount > 0) {
                            console.log('Password deleted successfully');
                        } else {
                            console.log('Error deleting password');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    }
}