FROM node:18

WORKDIR /app

COPY package.json /folder/
COPY yarn.lock /folder/
WORKDIR /folder/
RUN yarn install
COPY . /folder/
COPY ./prisma/schema.prisma ./prisma/schema.prisma
COPY .env .

RUN yarn prisma generate
# RUN yarn prisma migrate dev
# RUN yarn prisma yarn ts-node prisma/seed.ts 방법 찾기

COPY . .
CMD  yarn start
