# Car park manager
Application for parking spots and reservations management.

## Technologies:
* React+TS+Vite
* ExpressJS
* MongoDB+Mongoose ORM
* Styled components
* Storybook
* MUI

## Local setup

To setup project locally do following steps:
1. Fork repository,
2. Create Account on [clerk](https://clerk.com/) and [mongodb atlas](https://account.mongodb.com/account/login?n=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F664fb417c24a4f4ec489fad7&nextHash=%23overview%3FautomateSecurity%3Dtrue%26connectCluster%3DCluster0&signedOut=true)
3. create .env.local file in /client and .env file in /server
4. In .env.local paste CLERK_SECRET_KEY and VITE_CLERK_PUBLISHABLE_KEY 
5. In .env file place your MONGODB_URI and define PORT which will hold your app

Then run from both /client and /server directiory "npm install"
And from /client "npm run dev" and "npm start" from /server

Wualah

**Please not that this is the first iteration of the app and might be buggy, still in progress**
