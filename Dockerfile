FROM node:12-alpine
WORKDIR /opt/json-validate-proxy
COPY . /opt/json-validate-proxy
RUN npm install --global
USER 1000
CMD json-validate-proxy --log-format json --config config.yml
