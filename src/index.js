import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import configurations from "./configs/index.js";
import allTask from "./routes/index.js";
import documentation from "../doc/openai.json" assert {type:"json"}
import swaggerUi from "swagger-ui-express";
import ErrorHandler from "./middlewares/ErrorHandler.js";
const corsOptions = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET", "POST", "UPDATE" ],
    origin: ["http://192.168.1.150:8080", "//https://contact-app-client-xbck.onrender.com/"],
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api_doc',swaggerUi.serve);
app.use('/api_doc',swaggerUi.setup(documentation));
app.use('/api/v1', allTask);

mongoose.connect(configurations.MONGODB_CONNECTION_STRING)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log(err);
})

app.listen(configurations.PORT, () => {
    console.log(`Server is running on port ${configurations.PORT}`);
})

app.use(ErrorHandler);