FROM node:lts-alpine

ENV PORT=50015

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]