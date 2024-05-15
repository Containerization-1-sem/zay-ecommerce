# backend/Dockerfile
FROM node:14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Add migration and seeding commands
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm start"]
