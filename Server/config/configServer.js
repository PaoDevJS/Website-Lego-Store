import router from "../router/router.js"
import connectionDB from "./db.js"


const configServer = (main) => {
    const port = process.env.PORT || 8080
    connectionDB()
    router(main)

    main.listen(port, () => {
        console.log(`Server running to port: http://localhost:` + port)
    })
}

export default configServer