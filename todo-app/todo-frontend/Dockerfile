FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api
RUN npm test
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
