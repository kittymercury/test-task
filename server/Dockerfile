FROM node:lts-alpine
WORKDIR /src/test-task/server

COPY . ./
RUN yarn install

CMD [ "yarn", "start" ]
EXPOSE 2000