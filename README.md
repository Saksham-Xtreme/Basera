# Basera : 🔗 https://basera-tijc.onrender.com/

Basera is a full-stack property listing web application inspired by platforms.
Users can create property listings, upload images, leave reviews, and manage their listings through a simple and intuitive interface.

The application follows a RESTful architecture with a Model–View–Controller (MVC) design pattern and uses server-side rendering with EJS.

Basera demonstrates key full-stack concepts including CRUD operations, middleware usage, image storage with Cloudinary, session management, and structured backend architecture with Express and MongoDB.

---

## Live Demonstration

This project is built as a portfolio demonstration of full-stack development skills.  

- Users can interact with listings, submit reviews, and simulate booking flows.  
- **No real payments or transactions are processed.**

---

## Features

### Property Listings
- Create new property listings
- Upload listing images
- View all available listings
- View individual listing details
- Edit existing listings
- Delete listings

### Reviews System
- Add reviews to listings
- Delete reviews
- Associate reviews with specific listings

### Booking Simulation
- Users can simulate booking a listing
- Booking confirmation page for demonstration
- **No real payment processing (portfolio feature)**
-  Authorization (listing ownership)

### Application Features
- Flash notifications for user actions
- Server-side validation using Joi
- Error handling (400 / 404 / general errors)
- RESTful routing structure
- MVC project architecture
- Image uploads with Cloudinary
- Clean and responsive UI with Bootstrap

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
- multer (file upload handling)
- multer-storage-cloudinary (Cloudinary storage integration)

### Media Storage
- Cloudinary (image hosting and optimization)

---

## Project Architecture

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

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saksham-Xtreme/Basera.git
   ```

2. **Move into the project directory**
   ```bash
   cd Basera
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment variables**

   Create a `.env` file in the root directory:
   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start MongoDB locally**
   ```bash
   mongod
   ```

   Or if using MongoDB Atlas, update the connection string inside `app.js`.

6. **Run the application**
   ```bash
   node app.js
   ```

7. **Open in browser**
   [http://localhost:8080](http://localhost:8080)

---

## API Routes

### Listings

| Method | Route                | Description              |
|--------|----------------------|--------------------------|
| GET    | `/listings`          | Show all listings        |
| GET    | `/listings/new`      | Form to create listing   |
| POST   | `/listings`          | Create listing           |
| GET    | `/listings/:id`      | Show listing details     |
| GET    | `/listings/:id/edit` | Edit listing             |
| PUT    | `/listings/:id`      | Update listing           |
| DELETE | `/listings/:id`      | Delete listing           |

### Reviews

| Method | Route                              | Description         |
|--------|------------------------------------|---------------------|
| POST   | `/listings/:id/reviews`           | Create review       |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review       |

### Booking (Demo Feature)

| Method | Route                | Description              |
|--------|----------------------|--------------------------|
| GET    | `/listings/:id/book` | Booking form             |
| POST   | `/listings/:id/book` | Submit booking           |

---

## Flash Messages

The application uses **connect-flash** to display notifications for:

- Listing creation
- Listing updates
- Listing deletion
- Review creation
- Review deletion
- Booking confirmation

Flash messages improve user feedback and interaction flow.

---

## Error Handling

Custom error handling middleware is implemented for:

| Error Type | Description           |
|------------|-----------------------|
| 400        | Bad Request           |
| 404        | Page Not Found        |
| 500        | Internal Server Error |

All errors are routed to a centralized error page.

---

## Security Notes

- Sensitive credentials are stored using environment variables.
- `.env` is excluded via `.gitignore`.
- Cloudinary credentials are never exposed in the repository.

---

## Future Improvements

Possible enhancements:
- User authentication (Passport.js)
- Payment integration
- Map integration for property locations
- Advanced search and filters
- Image optimization and lazy loading
- User profile pages

---

## Author

**Saksham Tripathi**  
Full Stack Developer | MERN Stack Developer  
Computer Science Engineering Student  

- **GitHub**: [https://github.com/Saksham-Xtreme](https://github.com/Saksham-Xtreme)
- **LinkedIn**: [https://linkedin.com/in/saksham-tripathi-7b25b0330](https://linkedin.com/in/saksham-tripathi-7b25b0330)
