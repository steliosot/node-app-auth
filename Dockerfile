FROM alpine
LABEL maintainer="steliosot@hotmail.com"
RUN apk add --update nodejs npm
COPY . /src
WORKDIR /src
RUN  npm install
RUN  npm install mongoose
RUN  npm install @hapi/joi bcryptjs jsonwebtoken
RUN  npm install jsonwebtoken
EXPOSE 3000
ENTRYPOINT ["node", "./app.js"]
