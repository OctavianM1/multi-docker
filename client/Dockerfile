FROM node:16-alpine as dev

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "npm", "start" ]


FROM node:16-alpine as builder
WORKDIR /app
COPY --from=dev /app .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html