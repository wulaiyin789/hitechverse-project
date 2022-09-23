import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_API_URL);

        console.log(
            `MongoDB Connected: ${colors.bold.underline(db.connection.host)}`.cyan
        );
    } catch (err) {
        console.log(colors.bold.red.underline(`Error Occurred: ${err.message}`));
        process.exit(1);
    }
};

export default connectDB;
