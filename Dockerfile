FROM node:10

ENV IS_DOCKER=1
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .
RUN npm test

#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]