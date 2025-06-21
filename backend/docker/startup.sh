#!/bin/bash

# Set proper permissions
chown -R www-data:www-data /var/www
chmod -R 755 /var/www
chmod -R 777 /var/www/storage
chmod -R 777 /var/www/bootstrap/cache

# Generate application key if not exists
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.example /var/www/.env
fi

# Generate key if not set
if ! grep -q "APP_KEY=base64:" /var/www/.env; then
    php artisan key:generate --no-interaction
fi

# Clear and cache config
php artisan config:clear
php artisan config:cache

# Start PHP-FPM
php-fpm 