import express from 'express';
import mongoose from 'mongoose';
import baseRouter from './routes/baseRoute';

/*
import dotenv from 'dotenv'; dotenv.config();  //Reads in .env file

By requiring dotenv, it becomes a dependency. 
To make devdependency, remove runtime dependency by removing 
above line "import dotenv..." and preload dotenv.  To preload, update script
node -r dotenv/config index.js

const port = process.env.PORT;
Also, we used a technique to modularize env vars by creating a config file.  
To access it, require it and get your values
*/

import { envVars } from './configenv';

const app = express();

console.log('Node works');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.status(200).json({ success: 'true' });
//   console.log('route hit');
// });

app.use('/api', baseRouter);

app.listen(envVars.port || 3000, () => {
  console.log('Listening');
});

const mongoAtlasConnectionString = `mongodb+srv://${envVars.MONGOATLAS_USER}:${envVars.MONGOATLAS_PASSWORD}@cluster0-yznr0.mongodb.net/${envVars.MONGOATLAS_DB}?retryWrites=true&w=majority`;
const localUrl = 'mongodb://192.168.99.100:32768/gre';
const connOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(localUrl, connOptions)
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch(err => {
    console.log(err);
  });
