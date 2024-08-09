FROM node:20-bookworm

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx -y playwright@1.46.0 install --with-deps

RUN npm run build

CMD ["npm", "run", "dev"]