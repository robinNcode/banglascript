import mongoose from 'mongoose';

let dbHost: string = 'banglascript';
if (process.env.DEVELOPMENT_MODE !== 'true') {
  dbHost = process.env.MONGO_ATLAS_URI ?? 'banglascript';
}
else {
  dbHost = process.env.MONGO_LOCAL_URI ?? 'banglascript';
}
console.log(`Connecting to MongoDB at: ${dbHost}`);

const connectDB = async () => {
  try {
    await mongoose.connect(dbHost);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
