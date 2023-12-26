#!/bin/bash

npm install

if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-progress --no-interaction
fi

composer update

if [ -f ".env.dev" ]; then
    echo "Creating env file for env $APP_ENV"
    cp .env.dev .env
else
    echo ".env.dev file not exists."
    exit
fi

php artisan key:generate
php artisan migrate
# php artisan optimize:clear
# php artisan view:clear
# php artisan route:clear

php-fpm -D
nginx -g "daemon on;"

php artisan config:cache
php artisan queue:work --sleep=3 --tries=5 | npm run dev -- --host

