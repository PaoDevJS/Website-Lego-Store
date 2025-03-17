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
main.use(cors())


configServer(main)