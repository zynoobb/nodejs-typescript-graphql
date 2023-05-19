FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./prisma/schema.prisma ./prisma/schema.prisma
COPY .env .

RUN yarn prisma generate
# RUN yarn prisma migrate dev
# RUN yarn prisma yarn ts-node prisma/seed.ts 방법 찾기

COPY . .
CMD  yarn start
