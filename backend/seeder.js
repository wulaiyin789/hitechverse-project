/*
 * Used for importing dummy data
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// Data
import users from './data/users.js';
import products from './data/products.js';

// Models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// DB
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(`Error Occurred: ${err.message}`.red.underline.inverse);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Deleted!'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(`Error Occurred: ${err.message}`.red.underline.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
