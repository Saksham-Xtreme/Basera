# Basera

Basera is a full-stack property listing web application inspired by Airbnb.  
Users can create property listings, view listings, update them, delete them, and add reviews.

The project is built using **Node.js**, **Express**, **MongoDB**, and **EJS** with RESTful routing and server-side rendering.

---

## Features

- **Create property listings**
- **View all listings**
- **Edit and update listings**
- **Delete listings**
- **Add reviews to listings**
- **Delete reviews**
- **Flash messages for user actions**
- **Server-side validation**
- **Error handling (400 / 404 pages)**
- **RESTful routes**
- **MVC-style project structure**

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- EJS
- Bootstrap
- EJS-Mate (layout engine)

### Middleware
- method-override
- express-session
- connect-flash

---

## Project Structure

```
Basera
│
├── models
│   ├── listing.js
│   └── reviews.js
│
├── routes
│   ├── listing.js
│   └── review.js
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
├── schema.js
├── app.js
├── package.json
└── README.md
```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saksham-Xtreme/Basera.git
   ```

2. **Move into the project folder**
   ```bash
   cd Basera
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start MongoDB locally**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   node app.js
   ```

6. **Server will start at:**
   [http://localhost:8080](http://localhost:8080)

---

## Routes Overview

### Listings

| Method | Route                | Description              |
|--------|----------------------|--------------------------|
| GET    | `/listings`          | Show all listings        |
| GET    | `/listings/new`      | Form to create listing   |
| POST   | `/listings`          | Create listing           |
| GET    | `/listings/:id`      | Show single listing      |
| GET    | `/listings/:id/edit` | Edit listing             |
| PUT    | `/listings/:id`      | Update listing           |
| DELETE | `/listings/:id`      | Delete listing           |

### Reviews

| Method | Route                              | Description         |
|--------|------------------------------------|---------------------|
| POST   | `/listings/:id/reviews`           | Add review          |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review       |

---

## Flash Messages

The application uses **connect-flash** to show notifications for:

- Listing creation
- Listing update
- Listing deletion
- Review creation
- Review deletion

---

## Error Handling

Custom error pages implemented for:

- **400 Bad Request**
- **404 Page Not Found**
- **General server errors**

---

## Author

**Saksham Tripathi**

- **GitHub**: [https://github.com/Saksham-Xtreme](https://github.com/Saksham-Xtreme)
- **LinkedIn**: [https://linkedin.com/in/saksham-tripathi-7b25b0330](https://linkedin.com/in/saksham-tripathi-7b25b0330)
