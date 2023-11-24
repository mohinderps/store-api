require("dotenv").config();
require("express-async-errors");
// async errors

const express = require("express");
const errorHandlerMiddlerware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes

// products routes
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddlerware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
