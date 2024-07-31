# Build Stage
FROM node:latest as build-stage

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

EXPOSE 8081

EXPOSE 19000 19001

CMD ["npx", "react-native", "start"]