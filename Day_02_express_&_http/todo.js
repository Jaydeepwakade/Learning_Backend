
const express = require(`express`)
const app = express()
const fs = require("fs")

app.use(express.json())


app.get('/', (req, res) => {
    const data = fs.readFileSync('db.json', "utf-8")
    const parsedata = JSON.parse(data)
    res.send(parsedata)
})

app.post("/add-todo", (req, res) => {
    const data = fs.readFileSync('db.json', "utf-8")
    const parsedata = JSON.parse(data)
    const { title, description, completed, duedate } = req.body
    const newdata = {
        id: parsedata.todos.length + 1,
        title,
        description,
        completed,
        duedate
    }
    parsedata.todos.push(newdata)
    fs.writeFileSync("db.json", JSON.stringify(parsedata, null, 2))
    res.status(201).send(newdata)
})
app.patch("/update-status", (req, res) => {
    const data = fs.readFileSync('db.json', "utf-8")
    const parsedata = JSON.parse(data)
    parsedata.todos.forEach(todo => {
        if (todo.id % 2 === 0 && todo.completed === false) {
            todo.completed = true
        }
    })
    fs.writeFileSync("db.json", JSON.stringify(parsedata, null, 2))
    res.status(201).send(parsedata)
})

app.listen(3000, () => {
    console.log("Server is running")
})

app.delete("/delete-todo", (req, res) => {
    const data = fs.readFileSync('db.json', "utf-8")
    const parsedata = JSON.parse(data)
    const newdata = parsedata.todos.filter((todo) => todo.completed === false)
    parsedata.todos=newdata
    console.log(newdata)
    fs.writeFileSync("db.json", JSON.stringify(parsedata, null, 2))
    res.status(201).send(newdata)
})