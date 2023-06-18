FROM node:18-alpine

EXPOSE 5000

RUN mkdir /app && chmod 777 /app

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN find . ! -path "./node_modules/*" -type f -exec chmod 777 {} \; && \
    find . ! -path "./node_modules/*" -type d -exec chmod 777 {} \;


ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_NAME=$DB_NAME
ENV DEFAULT_ROOM_NAME=$DEFAULT_ROOM_NAME
ENV JWT_KEY=$JWT_KEY

CMD node app.js