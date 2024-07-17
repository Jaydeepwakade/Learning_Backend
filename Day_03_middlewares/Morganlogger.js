
const express = require("express")
const app = express()
const fs = require("fs")
const port = 3001
const path = require("path")
const morgan = require("morgan")
const datapath = path.join(__dirname, "db.json")
const logDirectory = path.join(__dirname, 'src');
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });



app.use(morgan(':method :status :res[content-length] - :response-time ms :date :http-version :url\n', { stream: accessLogStream }));
app.use(express.json())

app.get('/', (req, res) => {
    const data = fs.readFileSync(datapath, "utf-8")

    res.status(200).send(data)

})

app.get("/get-users", (req, res) => {
    const data = fs.readFileSync(datapath, "utf-8")
    const parsedata = JSON.parse(data)
    res.status(201).send(parsedata)

})

app.put("/users/:id", (req, res) => {
    const { id } = req.params
    const data = fs.readFileSync(datapath, "utf-8")
    const parsedata = JSON.parse(data)
    const { title, description, completed, duedate } = req.body
    const usertoupdate = parsedata.todos.find(todo => todo.id === +id)
    console.log(usertoupdate)
    if (usertoupdate) {

        usertoupdate.title = title;
        usertoupdate.description = description;
        usertoupdate.completed = completed;
        usertoupdate.duedate = duedate
        fs.writeFileSync(datapath, JSON.stringify(parsedata, null, 2), "utf-8")
        res.status(201).send("update succesfull")
    }

})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    const data = fs.readFileSync(datapath, "utf-8")
    const parsedata = JSON.parse(data)

    const delteddata = parsedata.todos.filter(todo => todo.id !== +id)
    console.log(delteddata)
    parsedata.todos = delteddata
    fs.writeFileSync(datapath, JSON.stringify(parsedata, null, 2), "utf-8")
    res.status(201).send("deleted succesfully")

})

app.listen(port, () => {
    console.log(`server is running on the port ${port}`)
})