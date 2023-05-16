/* eslint-disable @typescript-eslint/no-explicit-any */
import User = require('../models/user');
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

export = {
    createUser: async (_, { username, password }) => {
        try {
            const newPassword = await hashPassword(password);
            const newUser = new User({
                _id: new mongoose.Types.ObjectId,
                username: username,
                password: newPassword
            });
            const result = await newUser.save();
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },

    updateUser: async (_, { _id, username, password }) => {
        try {
            const id = new mongoose.Types.ObjectId(_id);
            const newPassword = await hashPassword(password);
            const newUser = new User({
                _id: id,
                username: username,
                password: newPassword
            });
            await User.replaceOne({ _id: id }, newUser);
            return newUser;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    },

    deleteUser: async (_, { _id }) => {
        try {
            const id = new mongoose.Types.ObjectId(_id);
            await User.deleteOne({ _id: id })
                .then((doc) => {
                    if (doc.acknowledged == true) {
                        if (doc.deletedCount > 0) {
                            console.log('User deleted successfully');
                            return doc.acknowledged;
                        } else {
                            console.log('Error deleting user');
                            return doc.deletedCount;
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