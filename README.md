# Online Sticker Shopping Back-End
A minimalistic sticker purchasing back-end with Express and MongoDB.

## Technologies used

- **Express.js** : A fast and minimalist web framework for Node.js, providing robust features for building web applications.

- **MongoDB** : A NoSQL database that uses a document-oriented data model, providing flexibility and scalability.

- **Mongoose** : An elegant MongoDB object modeling tool designed to work in an asynchronous environment.

- **Cloudinary**: A cloud-based image and video management service, used for storing and managing sticker images.

- **Google's OAuth** : Google's authentication system, utilized for secure and streamlined user authentication.

- **JWT (JSON Web Tokens)** : A compact, URL-safe means of representing claims between two parties, widely used for authentication.

- **Multer** : A middleware for handling multipart/form-data, primarily used for file uploads.

- **Pug** : A template engine for Node.js and browsers, used for rendering dynamic HTML views.

- **Docker** : A platform for developing, shipping, and running applications in containers, providing isolation and portability.

## Features

### Authentication

- **Register** : Users can register using email..
- **Login** : Authenticate users.
- **Verify Account** : Verify user accounts using email.

### Password Management

- **Recover Password** : Recover password with email.
- **Reset Password** : Update the password.

### Sticker Management

- **Upload Sticker** : Admin can add stickers to the database.
- **Get Sticker by ID** : Fetch details of a specific sticker.
- **Stickers by Tag** : Browse stickers by tag.

### Order Management:

- **Add to Cart** : Users can add stickers to their shopping cart.
- **Checkout**: View the total and initiate the checkout process.
- **Verify Payment** : Simulate payment verification for a given order.


