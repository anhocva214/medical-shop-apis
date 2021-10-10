import { connect } from 'mongoose';

export async function connectDB(): Promise<void> {
    await connect('mongodb://localhost:27017/medical-shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}