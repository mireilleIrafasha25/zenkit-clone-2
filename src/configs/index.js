import dotenv from "dotenv";
dotenv.config();

const Configs = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://mireilleirafasha:Mugisha12345@cluster0.4bfpmyu.mongodb.net/zenkit",
    CLIENT_APP: process.env.CLIENT_APP || 'http://localhost:4000',
    PORT: process.env.PORT || 4000 ,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
}

export default Configs;