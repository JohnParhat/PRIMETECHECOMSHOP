const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
// const whiteList = ['http://localhost:3000'];
dotenv.config();

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection successful'))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!');
});
