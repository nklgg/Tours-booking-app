# Tours-booking-app
Full stack app written in react and express using mongodb

![main](https://user-images.githubusercontent.com/12703649/100016624-02524a80-2dda-11eb-8efe-2fe437212c0b.PNG)

## Features

* Product and reviews rating
* Sign in and sign up
* Name, email and password change
* Book reviews via Stripe
* Leave review if you bought the tour
* Be able to view all booked tours
* Responsive

## Env variables

Create config.env in root directory with following variables

```javascript
NODE_ENV=development
PORT=5000
DATABASE = your mongo db uri
DATABASE_PASSWORD= your database password
JWT_SECRET= random string
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME = mailtrap username
EMAIL_PASSWORD = mailtrap password
HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_FROM = email which users will see
SENDGRID_USERNAME=apikey
SENDGRID_PASSWORD= yendgrid password
STRIPE_SECRET_KEY= your Stripe secret key
STRIPE_WEBHOOK_SECRET= your Stribe webhook secret
```

## Install Dependencies (frontend & backend)
```javascript
npm install
cd client
npm install
```

## Run in production
```javascript
npm run start:prod
cd client
npm start
```

## Run in development
```javascript
npm run start:dev
cd client
npm start
```
