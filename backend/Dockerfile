FROM node:10-alpine

WORKDIR /app
RUN chown -R node /app

USER node
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY dist/ /app/dist
RUN cd /app && yarn --production

EXPOSE 3000

ENTRYPOINT [ "node", "dist/index.js" ]
