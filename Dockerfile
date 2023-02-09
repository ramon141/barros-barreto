FROM node:16-alpine3.15

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN mkdir -p /app/node_modules
RUN chown node:node /app/node_modules

RUN npm install

COPY . /app
CMD ["npm", "start"]
