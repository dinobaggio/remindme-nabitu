cd src
composer install
php artisan config:clear
php artisan config:cache
npm install
npm run build
cd ..
docker-compose build
docker-compose down
docker-compose up -d