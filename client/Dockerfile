FROM node:lts-alpine
WORKDIR /src/test-task/client

COPY . ./
RUN yarn install

CMD [ "yarn", "start" ]
EXPOSE 3000