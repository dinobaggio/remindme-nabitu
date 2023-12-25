docker-compose exec -it php php artisan route:clear
docker-compose exec -it php php artisan config:clear
docker-compose exec -it php php artisan cache:clear
docker-compose exec -it php php artisan migrate