const mongoose = require('mongoose');
const connectDB = async()=> {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
    const connection=mongoose.connection;
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;