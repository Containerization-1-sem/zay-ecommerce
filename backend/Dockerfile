FROM node:14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000
RUN npm run db:reset
CMD ["npm", "start"]
