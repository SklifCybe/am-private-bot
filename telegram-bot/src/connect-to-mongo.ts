import mongoose from 'mongoose';

export const connectToMongo = async (uri: string) => {
    try {
        await mongoose.connect(uri);

        console.log('Successful database connection');
    } catch(error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
};
