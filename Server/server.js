import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config.js"
import configServer from "./config/configServer.js"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = express()

main.use(express.static(path.join(__dirname, "public/images")));
main.use(express.urlencoded({ extended: true }))
main.use(express.json())
main.use(cookieParser())
main.use(cors({
    origin: ["http://localhost:5175", "http://localhost:5174", "http://localhost:5173"], // Đổi thành domain frontend
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Cho phép gửi cookies
  }))


configServer(main)