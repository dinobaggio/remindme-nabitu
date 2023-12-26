#!/bin/bash

npm install

if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-progress --no-interaction
fi

composer update

if [ -f ".env.production" ]; then
    echo "Creating env file for env $APP_ENV"
    cp .env.production .env
else
    echo ".env.production file not exists."
    exit
fi

php artisan key:generate
php artisan migrate
# php artisan optimize:clear
# php artisan view:clear
# php artisan route:clear

php-fpm -D
nginx -g "daemon on;"
npm run build
php artisan config:cache
php artisan queue:work --sleep=3 --tries=5

