import fs from "fs"
import path from "path"
import express from "express"
import config from "config"
import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)
const app = express()
app.use(express.json())
const port = config.get("port")
const schemaRoot = config.get("schemaRoot")

function load(root) {
  const myPromise = new Promise((resolve, reject) => {
    const schemas = {}
    fs.readdir(root, (e, items) => {
      items.forEach(item => {
        const filepath = path.join(root, item)
        const parts = path.parse(filepath)
        if (parts.ext == ".json") {
          const spec = JSON.parse(fs.readFileSync(filepath, {encoding: "utf-8", flag: "r"}))
          schemas[parts.name] = spec
        }
      })
      resolve(schemas)
    });
  });
  return myPromise;
}

function register(schemas) {
  for (const schema in schemas) {
    const endpoint = `/${schema}`
    console.log(`Registering endpoint ${endpoint}`)
    app.post(endpoint, function (req, res) {
      console.debug(req.body)
      if (!ajv.validate(schemas[schema], req.body)) {
        console.log(ajv.errors)
        res.contentType('text/plain')
        res.status(418).send(ajv.errors.map(o=>`${o.instancePath}: ${o.message}`).join("\n"));
      } else {
        res.sendStatus(200)
      }
    })
  }
}

app.listen(port, function(err) {
    if (err) {
      console.log(err)
    } else {
      load(schemaRoot)
        .then((schemas) => {
          register(schemas)
          console.error("Server listening on port", port)
          console.log("Upload a invoice JSON and the API will respond with status code 200 for a valid invoice; and 418 for an invalid invoice")
        })
    }
});

