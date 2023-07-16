FROM node:18.16.1-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD  . .
RUN yarn build
CMD ["node", "./dist", "main.js"]