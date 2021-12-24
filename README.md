# AJV JSON schema validator

"AJV JSON schema validator"-as-a-Microservice.

Place schema file(s) in the `schemas` directory on the host and start the service.

By default the AJV service comes with a simple `example.json` JSON schema.

The service comes with configuration options in config/default.json.

### Example

    $ CID=$(docker run -d --rm -p 8080:80 morecontainers/ajv:v20211224)
    $ docker logs $CID

    > ajv-json-schema-validator@v20211224 start
    > node app/app.js

    Registering endpoint /example
    Upload a invoice JSON and the API will respond with status code 200 for a valid invoice; and 418 for an invalid invoice
    Server listening on port 80
    $ http localhost:8080/example version=v1
    HTTP/1.1 418 I'm a Teapot
    Connection: keep-alive
    Content-Length: 147
    Content-Type: application/json; charset=utf-8
    Date: Fri, 24 Dec 2021 21:47:50 GMT
    ETag: W/"93-t6oV3CyoxhwPx3031n8Ep5v0ltg"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    [
        {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'id'",
            "params": {
                "missingProperty": "id"
            },
            "schemaPath": "#/required"
        }
    ]

    $ http localhost:8080/example version=v1 id=deadbeef
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 32
    Content-Type: application/json; charset=utf-8
    Date: Fri, 24 Dec 2021 21:48:24 GMT
    ETag: W/"20-6mtzw6PVnC8jN0W5s2TdwzkPyZw"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    {
        "id": "deadbeef",
        "version": "v1"
    }

    $ docker kill $CID
    0c407891c6546ca9cab85ec0a0f1ab73207065c27fc7bed1fdab0d64ab748fbe
