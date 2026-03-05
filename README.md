# Basera

**Basera** is a full-stack property listing web application inspired by platforms like Airbnb.
Users can create property listings, upload images, leave reviews, and manage their listings through a simple and intuitive interface.

The application follows a **RESTful architecture** with a **Model–View–Controller (MVC)** structure and server-side rendering using EJS.

---

# Features

### Property Listings

* Create new property listings
* Upload listing images
* View all available listings
* View individual listing details
* Edit existing listings
* Delete listings

### Reviews System

* Add reviews to listings
* Delete reviews

### Application Features

* Flash notifications for user actions
* Server-side validation
* Error handling (400 / 404 / general errors)
* RESTful routing structure
* MVC project architecture

---

# Tech Stack

## Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

## Frontend

* **EJS**
* **Bootstrap**
* **EJS-Mate** (layout engine)

## Middleware

* method-override
* express-session
* connect-flash
* multer (file upload)
* multer-storage-cloudinary (Cloudinary image storage)

## Media Storage

* **Cloudinary** (image hosting)

---

# Project Architecture

```
Basera
│
├── controllers
│   └── listings.js
│
├── models
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
│
├── routes
│   ├── listings.js
│   └── reviews.js
│
├── utils
│   ├── ExpressErr.js
│   └── wrapAsync.js
│
├── views
│   ├── lists
│   ├── error
│   └── layouts
│
├── public
│   └── css
│
├── cloudConfig.js
├── schema.js
├── app.js
├── package.json
└── README.md
```

---

# Installation

### 1. Clone the repository

```bash
git clone https://github.com/Saksham-Xtreme/Basera.git
```

### 2. Move into the project directory

```bash
cd Basera
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the root directory:

```
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Start MongoDB locally

```bash
mongod
```

### 6. Run the application

```bash
node app.js
```

### 7. Open in browser

```
http://localhost:8080
```

---

# API Routes

## Listings

| Method | Route                | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/listings`          | Show all listings      |
| GET    | `/listings/new`      | Form to create listing |
| POST   | `/listings`          | Create listing         |
| GET    | `/listings/:id`      | Show listing           |
| GET    | `/listings/:id/edit` | Edit listing           |
| PUT    | `/listings/:id`      | Update listing         |
| DELETE | `/listings/:id`      | Delete listing         |

---

## Reviews

| Method | Route                             | Description   |
| ------ | --------------------------------- | ------------- |
| POST   | `/listings/:id/reviews`           | Create review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |

---

# Flash Messages

The application uses **connect-flash** to display notifications for:

* Listing creation
* Listing updates
* Listing deletion
* Review creation
* Review deletion

---

# Error Handling

Custom error handling is implemented for:

* **400 — Bad Request**
* **404 — Page Not Found**
* **General Server Errors**

---

# Security Notes

Sensitive credentials are stored in **environment variables** using `.env`.
The `.env` file is excluded from version control using `.gitignore`.

---

# Author

**Saksham Tripathi**

Full Stack Developer | MERN Stack

GitHub
https://github.com/Saksham-Xtreme

LinkedIn
https://linkedin.com/in/saksham-tripathi-7b25b0330
