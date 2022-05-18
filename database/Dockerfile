FROM node:lts-alpine
WORKDIR /src/test-task/database

COPY . ./
RUN yarn install

CMD [ "yarn", "start" ]