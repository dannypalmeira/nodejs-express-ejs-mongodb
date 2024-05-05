const mongoose = require('mongoose');
const connectDB = async()=> {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
<<<<<<< HEAD
    const connection=mongoose.connection;
=======
>>>>>>> 91f3ddd5ae7d750f4fb0f33f07a56fd7b622ff59
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;