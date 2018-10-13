# Takeout Restaurant App NodeJs

This is a NodeJS application that I made to serve data about menu items for a hypothetical restaurant, and process credit card payments using the Stripe API. This project was made using NodeJs version 8. The purpose of this program was to earn a better understanding of the Stripe API.

### Features

* Credit card payments using Stripe API
* Serves menu item data from mongo database
* Store hours can be set so that orders cannot be made while the store is closed
* Uses Google API distance matrix to ensure delivery orders cannot be made outside a certain distance from the store
* Leverages Stripe API to send a receipt to the submitted email address after a successful order is placed

### Download and Deploy this project

1.  Download and extract the zip file for this project or download using git clone
2.  Install dependencies using `npm install`
3.  Create config.js file in the root folder which exports an object with keys for the mongo URI, Stripe secret key, and the restaurant location(address, city, province/state)
4.  Run the application using `npm run start`
