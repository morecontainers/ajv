# AJV JSON schema validator

"AJV JSON schema validator"-as-a-Microservice.

Place schema file(s) in the `schemas` directory on the host and start the service.

By default the AJV service comes with a simple `example.json` JSON schema.

The service comes with configuration options in config/default.json.

### Example

    $ CID=$(docker run --name=ajv -d --rm -p 80:80 morecontainers/ajv:20211203)
    a086faca55b1962fd45b4ac856329731095902d3b5e56e22a3075710d87e262b0
    $ docker logs $CID
    
    > ajv-json-schema-validator@1.0.0 start
    > node app/app.js
    
    Registering endpoint /example
    Upload a invoice JSON and the API will respond with status code 200 for a valid invoice; and 418 for an invalid invoice
    Server listening on port 80
    $ http localhost/example id=deadbeaf version=v1
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 2
    Content-Type: text/plain; charset=utf-8
    Date: Fri, 03 Dec 2021 21:10:17 GMT
    ETag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
    Keep-Alive: timeout=5
    X-Powered-By: Express
    
    OK
    $ docker kill $CID
    086faca55b1962fd45b4ac856329731095902d3b5e56e22a3075710d87e262b0
