import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config.js"
import configServer from "./config/configServer.js"


const main = express()

main.use(express.urlencoded({ extended: true }))
main.use(express.json())
main.use(cookieParser())
main.use(cors())


configServer(main)