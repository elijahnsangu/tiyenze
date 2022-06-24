import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
dotenv.config();

// express app
const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

//route
app.use('/api/v1', (req, res) => {
  res.json({
    data: 'Building the backend server',
  });
});

const startServer = async () => {
  // connect to mongoDB
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB');
    app
      .listen(process.env.PORT || 4000, () =>
        console.log(`Server started at http://localhost:${process.env.PORT}`)
      )
      .on('error', (err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.log(err.message);
  }
};

startServer();
