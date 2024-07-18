
const express = require("express")
const server = express()
const port = 3000


const validation = (req, res, next) => {
    const body = req.body;
    const errors = []

    if (!body.ID || typeof body.ID !== "number") {
        const error = "number is not there"
        errors.push(error)

    }

    if (!body.Name || typeof body.Name !== "string") {
        const error = "Name must be in the string"
        errors.push(error)

    }
    if (!body.Rating || typeof body.Rating !== "number") {
        const error = "the Rating should be in the numbers"
        errors.push(error)

    }
    if (!body.Description || typeof body.Description !== "string") {
        const error = "description must be in the string"
        errors.push(error)

    }
    if (!body.Genre || typeof body.Genre !== "string") {
        const error = "Genre should be in the  string"
        errors.push(error)

    }
    if (!body.Cast || !Array.isArray(body.Cast) || !body.Cast.every(c => typeof c === "string")) {

        const error = "cast is not avalible or it is not an array of the string"
        errors.push(error)


    }
    if (errors.length > 0) {
        res.status(400).json({ message: "bad request. some data is incorrect", errors })
    }
    else {
        next()
    }

}
server.use(express.json())
server.use(validation)

server.post("/", (req, res) => {
    const parsedata = req.body
    console.log(parsedata)
    res.status(200).send("Data recieved")
})

server.listen(port, (req, res) => {
    console.log(`server is running on the port ${port}`)
})