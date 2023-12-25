FROM php:8.1-fpm-alpine

# Set the working directory to /var/www/html
WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql sockets

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apk update && apk add supervisor && \
    mkdir -p /var/log/supervisor
    
COPY ./src /var/www/html

RUN composer install

COPY ./docker/worker.conf /etc/supervisor/conf.d/

# CMD ["/usr/bin/supervisord", "-n"]
# CMD ["php", "/var/www/html/artisan queue:work --sleep=3 --tries=3"]
# CMD php artisan queue:work --sleep=3 --tries=3