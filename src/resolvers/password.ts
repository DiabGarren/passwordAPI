import Password = require('../models/password');
// import mongoose from 'mongoose';

export = {
    passwords: async () => {
        try {
            const result = await Password.find({});
            return result;
        } catch (err: any | unknown) {
            throw new Error(err.message);
        }
    }
}