FROM node:16-alpine

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY prisma /app

RUN npx prisma generate

EXPOSE 3000

COPY start /app/start
RUN sed -i 's/\r$//g' /app/start
RUN chmod +x /app/start

CMD ["/app/start"]
