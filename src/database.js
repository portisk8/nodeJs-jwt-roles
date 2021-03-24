import mongoose from "mongoose";

import config from "./config";
mongoose
  .connect(
    `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbServer}/${config.dbDatabase}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then((db) => {
    console.log("Database connected.");
  });
