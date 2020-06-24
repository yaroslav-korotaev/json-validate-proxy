# json-validate-proxy

JSON validate proxy.

A simple HTTP proxy that takes POST requests, validates JSON body against given JSON-schema and passes the request if it is valid. Invalid requests will be rejected with code 400 and detailed error message.

## Installation

### npm

```bash
npm install --global json-validate-proxy
```

### Docker

```bash
docker pull korotaevio/json-validate-proxy
```

## Usage

```bash
json-validate-proxy --help
json-validate-proxy --config config.yml
```

### Docker

```bash
docker run \
  --detach \
  --restart unless-stopped \
  --name json-validate-proxy \
  --publish 3000:3000 \
  --volume $(pwd)/config.yml:/opt/json-validate-proxy/config.yml \
  korotaevio/json-validate-proxy
```

When using the docker image you are supposed to mount a config file at `/opt/json-validate-proxy/config.yml`. Log format is defaults to json. You can override this behaviour by specifying custom command:

```bash
docker run \
  --detach \
  --restart unless-stopped \
  --name json-validate-proxy \
  --publish 3000:3000 \
  --volume $(pwd)/config.yml:/opt/json-validate-proxy/config.yml \
  korotaevio/json-validate-proxy \
  json-validate-proxy --log-format json --config /opt/json-validate-proxy/config.yml
```

## Configuration

Application is configured via environment variables, command line arguments and a config file.

### Environment Variables

`JSON_VALIDATE_PROXY_HTTP_LISTEN_HOST` – listen interface  
`JSON_VALIDATE_PROXY_HTTP_LISTEN_PORT` – listen port  

### Command line arguments

See built-in help via `--help` flag.

### Config file

Config file consists of schema list and routing table.

JSON schema refers to a [public standard](https://json-schema.org/), validation implemented with [Ajv](https://github.com/ajv-validator/ajv). So, any valid JSON schema is supported.

In a routing rule, `proxy.url` specifies exact URL where the request will be sent. Proxied request URL will not be modified in any way with original request URL parts.

```yaml
schemas: # array of JSON schema objects
  - $id: test # schema ID is required
    type: object
    properties:
      foo:
        type: string
        const: bar
    required: ["foo"]
routes:
  - route: /foo # location for this rule
    proxy:
      url: http://localhost:8080/bar # URL where to proxy to
      timeout: 1000 # upstream timeout in ms (optional, 5000 by default)
    schema: test # schema ID to use
```
