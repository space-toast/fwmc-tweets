FROM node:14 as build
WORKDIR /app
ARG VITE_SERVER_HOSTNAME
ENV VITE_SERVER_HOSTNAME=$VITE_SERVER_HOSTNAME
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as stage
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
WORKDIR /etc/nginx/conf.d
RUN rm -rf *
COPY --from=build app/nginx.conf .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]