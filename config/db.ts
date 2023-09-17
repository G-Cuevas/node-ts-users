import mongoose from "mongoose";

export const dbConnection = async () => {

    try {

        const mongoConnection = process.env.MONGODB_CNN || '';

        await mongoose.connect(mongoConnection);

        console.log('Database online');

    } catch (error) {
        console.log('Error starting database');
        throw error;
    }

}