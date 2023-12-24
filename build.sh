cd src
composer install
npm install
npm run build
cd ..
docker-compose build
docker-compose down
docker-compose up -d