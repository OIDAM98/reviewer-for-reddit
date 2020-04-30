# Reviewer-for-Reddit
Mock app for Mobile Applications made in React Native.

Application made as a project for LIS4071 Mobile Applications course.

Reddit viewer with the ability to save desired posts in order to view them offline.

## Running the application
1. In the root directory of the application:
```
// Load all the dependencies of the project
npm install
```
2. Run following script
```
sudo npm run web
/*
  This will execute a server that allows running the application without the need to install.
*/
```
3. Download **Expo** application from ***Google Play Store*** or the ***iOS App Store***
4. Scan the QR Code that appears in console with the Expo application
5. App is ready to be used!

The posts saved are stored in a **PostgreSQL** database stored in an aplication within the Heroku Environment.
Heroku was used to deploy the **Node.JS** server, which contains an *API* for the client to consume to connect to the database, and the database mentioned.
The URL for the database is [the following](https://reviewer-database.herokuapp.com), and accessing it will send back a JSON Response with the schema.
