FROM node:14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve
EXPOSE 3001
CMD ["serve", "-l", "3001", "-s", "dist"]
