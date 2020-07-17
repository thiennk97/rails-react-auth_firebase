FROM node:12.13.0

RUN mkdir /app
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
# install app dependencies
COPY package.json /app
RUN npm install --silent
RUN npm install --save firebase react-router react-router-dom

# add app
ADD . /app
