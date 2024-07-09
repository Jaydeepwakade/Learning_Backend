const path = require("path")
const fs = require("fs")

const operation = process.argv[2]
const file = process.argv[3]
const content = process.argv[4]
const newfilename = process.argv[4]

switch (operation) {
    case 'Read': const data = fs.readFileSync(file, "utf-8")
        console.log(data)
        break;
    case "append": fs.writeFileSync(file, content, "utf-8")
        console.log(`Content appended to ${file}`);
        break;

    case 'delete': fs.unlinkSync(file)
        console.log(`file ${file} deleted`)
        break;

    case 'create': fs.writeFileSync(file, content, "utf-8")
        console.log(`file ${file} created`)
        break;

    case "rename": fs.renameSync(file, newfilename)
        console.log(`file ${file} renamed to ${newfilename}`)
        break
    case "list": const files = fs.readdirSync(file)
        console.log(`files in ${file}`)
        files.forEach(element => {
            console.log(element)
        });
    default:
        break;
}