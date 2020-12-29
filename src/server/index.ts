import express from 'express';
import mongoose from 'mongoose';
import baseRouter from './routes/baseRoute';

/*
import dotenv from 'dotenv'; dotenv.config();  //Reads in .env file

By requiring dotenv, it becomes a dependency. To make devdependency, remove runtime dependency by removing 
above line and preload dotenv.  To do that, update script
node -r dotenv/config index.js

const port = process.env.PORT;
Also, we used a technique to modularize env vars by creating a config file.  To access it, require it and get your values
*/

// const { port } = require('../../configenv');
import { env_vars } from '../configenv';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/test', (req, res) => {
//     res.send('running');
// });

app.use('/api', baseRouter);

mongoose
  .connect('mongodb://192.168.99.100:32768/gre', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected');
    app.listen(env_vars.port, () => {
      console.log('Express Connected');
    });
  })
  .catch(err => {
    console.log(err);
  });
