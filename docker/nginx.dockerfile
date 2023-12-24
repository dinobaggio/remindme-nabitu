FROM nginx:stable-alpine

ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/html