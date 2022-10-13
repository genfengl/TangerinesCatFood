# TangerinesCatFood

Link to the app: [Tangerines Cat Food Catalogue](https://guarded-beach-28265.herokuapp.com/)

Using Node.js, Express, MongoDB, and Mongoose to create a CRUD app for a cat food catalogue
This app is a basic catalogue for cat foods. User is required to login to access the app beyond the welcome home page.

Demo account:
Username: Tangerine
Password: tangy123

## RESTful Routes

Upon accessing this app, the user is greeted by the home welcome page in home.ejs.
The user is then required to login to gain access to the remaining content.

### GET routes

User can access the product page in show.ejs by clicking on the image of the product. This is done via a get route.
findById() is used in mongoose to access items in the database using _id.

### CREATE (POST) routes 

Create routes are used for creating new item in the database when a user uploads a new item.

### PUT routes (overrides the POST route)

Update routes are used for editing an existing item in the database.
It is also used for adding a username into the favouritedBy array when a user adds the item to the favourite list.

### DELETE route (oerrides the POST route)

The DELETE route removes an item from the database.