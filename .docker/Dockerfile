FROM php:8.1-apache

RUN apt-get update \
    && apt-get install -y mariadb-client zip curl libpng-dev zlib1g-dev libxml2-dev libzip-dev libonig-dev libwebp-dev libjpeg62-turbo-dev libpng-dev libxpm-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql mysqli zip \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
    && . "/root/.nvm/nvm.sh" && nvm install 18.0.0 \
    && . "/root/.nvm/nvm.sh" && nvm use v18.0.0 \
    && . "/root/.nvm/nvm.sh" && nvm alias default v18.0.0 \
    && npm install -g npm@8.17.0

ENV PATH="/root/.nvm/versions/node/v18.18.0/bin/:${PATH}"

EXPOSE 80

COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite
