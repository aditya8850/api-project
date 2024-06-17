Ecommerce API
Overview
This is a comprehensive API for an ecommerce platform, built with Node.js and Express. It includes user management, product management, and cart functionality. The API also integrates JWT authentication, logging, error handling, and Swagger for API documentation.

Table of Contents
-Installation
-Usage
-Routes
-Middleware
-Error Handling
-Swagger Documentation
-Contributing
-License
Installation
To install the project, follow these steps:

Clone the repository:
bash
Copy code
git clone <repository_url>
cd <repository_name>
Install dependencies:
bash
Copy code
npm install
Set up environment variables in .env file:
makefile
Copy code
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
Usage
Start the server by running:

bash
Copy code
npm start
The server will be running on http://localhost:3000.

Routes
Product Routes
GET /api/products: Get all products
POST /api/products: Create a new product (requires JWT)
GET /api/products/:id: Get a product by ID
PUT /api/products/:id: Update a product by ID (requires JWT)
DELETE /api/products/:id: Delete a product by ID (requires JWT)
User Routes
POST /api/users/register: Register a new user
POST /api/users/login: User login
Cart Routes
GET /api/cartItems: Get all cart items (requires JWT)
POST /api/cartItems: Add an item to the cart (requires JWT)
DELETE /api/cartItems/:id: Remove an item from the cart (requires JWT)
Middleware
JWT Authentication: Protects routes that require authentication.
Logger Middleware: Logs details of incoming requests.
Error Handling Middleware: Handles application errors and 404 errors.
Error Handling
Custom ApplicationError is used for handling application-specific errors. Unhandled errors are caught by a global error handler.

Swagger Documentation
API documentation is available at http://localhost:3000/api-docs.

Contributing
Contributions are welcome! Please submit a pull request or open an issue for any features or bug fixes.

License
This project is licensed under the MIT License.

By following this README, you should be able to set up and use the ecommerce API effectively. For more details, refer to the source code and comments within the project files.