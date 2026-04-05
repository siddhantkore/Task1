## Main Tech Stack

- MongoDB for database
- Express.js for backend APIs
- React.js for frontend UI
- Node.js runtime
- Recharts for the frontend bar chart

## High-Level Flow

1. Data is stored in `docs/reference_schema.json`.
2. Backend reads that file and seeds MongoDB.
3. Frontend calls backend APIs.
4. Backend returns category insights and vendor data.
5. Frontend shows:
   - category bar chart
   - selected category details
   - vendor/service list

## Backend Explanation

The backend is inside `backend/src`.

### 1. Config

#### `backend/src/config/dbConfig.js`

This file connects Express to MongoDB using Mongoose.

It:
- loads environment variables from `.env`
- reads `MONGODB_URI`
- connects to MongoDB
- exits the process if database connection fails

### 2. Models

Models define how data is stored in MongoDB.

#### `backend/src/models/categoryModel.js`

Stores category data.

#### `backend/src/models/subCategoryModel.js`

Stores subcategory data.

#### `backend/src/models/vendorModel.js`

Stores vendor/service data.

### 3. Utils

#### `backend/src/utils/slugify.js`

Converts text into URL-friendly slugs.

Example:
- `Travel & Accommodation` =>>>> `travel-and-accommodation`

#### `backend/src/utils/seedData.js`

This file reads the JSON from `docs/reference_schema.json` and saves it into MongoDB.

The seed process is simple:

1. save categories
2. save subcategories
3. save vendors/services

Why this order is used:
- subcategories need category ids
- vendors need both category ids and subcategory ids

### 4. Controllers

Controllers contain the main backend logic for each route.

#### `backend/src/controllers/seedController.js`

Calls the seed utility and returns a success response.

#### `backend/src/controllers/insightsController.js`

Builds the category insight response for the chart.

This is the main API used by the chart in the frontend.

#### `backend/src/controllers/categoryController.js`

Handles category-related APIs.

#### `backend/src/controllers/vendorController.js`

Handles vendor listing APIs.

### 5. Routes

Routes connect API paths to controllers.

Each one defines the endpoints for one part of the backend.

### 6. Server Entry

#### `backend/src/server.js`

This is the backend entry point.

It:
- connects to MongoDB
- creates the Express app
- enables CORS
- enables JSON parsing
- exposes `/health`
- mounts `/api/v1`
- starts the server on port `5000` by default

## Frontend Explanation

The frontend is inside `frontend/src`.

## How Frontend Data Loading Works

### First load

When the app opens:

1. `App.jsx` calls `getCategoryInsights()`
2. backend returns all category insights
3. frontend stores them in `insights`
4. first category is selected automatically

### When a category is selected

1. user clicks a chart bar or category button
2. `selectedSlug` changes
3. `App.jsx` calls `getCategoryVendors(selectedSlug)`
4. backend returns vendors for that category
5. frontend updates the service list