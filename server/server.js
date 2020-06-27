const express = require('express');
const morgan = require('morgan');

const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database Connected'))
  .catch(() => console.log('DB CONNECTION ERROR: '));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//import routes
const authRoutes = require('./routes/auth');

//app middlewares  - these middlewares need to be before the app middleware

app.use(morgan('dev'));
app.use(bodyParser.json()); // allows you to see request body in json
//app.use(cors()) // allows all origins

if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT} -${process.env.NODE_ENV}`);
});
