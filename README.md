
# Recipe App Backend

This is the backend for the Recipe App, which allows users to manage recipes, cooking directions, and user authentication. The backend is built using **Express.js**, **Prisma ORM**, and **PostgreSQL**. It also integrates with the OpenAI API for optional features.

## Features

- User authentication (signup, login, and profile management)
- CRUD operations for recipes and directions
- Public/private recipe visibility
- Recipe copying functionality
- Scalable Prisma schema with `Recipie_App_` prefixes for multi-database compatibility
- Optional OpenAI API integration for recipe-related suggestions or content generation

---

## Project Structure

```
.
├── prisma/
│   └── schema.prisma          # Prisma schema for the database
├── controllers/
│   ├── recipe.controller.js   # Recipe-related endpoints
│   └── user.controller.js     # User-related endpoints
├── routes/
│   ├── index.js               # Main router
│   ├── recipe.routes.js       # Recipe routes
│   └── user.routes.js         # User routes
├── services/
│   ├── recipe.service.js      # Business logic for recipes
│   └── user.service.js        # Business logic for users
├── utils/
│   └── openai.js              # OpenAI API helper
├── app.js                     # Express app configuration
├── server.js                  # Server startup
├── .env                       # Environment variables
└── README.md                  # Project documentation
```

---

## Requirements

- Node.js (v14 or later)
- PostgreSQL
- Prisma CLI

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/recipe-app-backend.git
   cd recipe-app-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   ```

4. Initialize the database:

   ```bash
   npx prisma migrate dev
   ```

---

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. API will be available at `http://localhost:3000/api`.

---

## API Endpoints

### User Endpoints

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | `/api/users/signup` | Create a new user         |
| POST   | `/api/users/login`  | Login a user              |
| GET    | `/api/users/profile`| Fetch user profile        |

### Recipe Endpoints

| Method | Endpoint                | Description                       |
|--------|-------------------------|-----------------------------------|
| GET    | `/api/recipes`          | Get all recipes (public or user's)|
| GET    | `/api/recipes/:id`      | Get a specific recipe by ID       |
| POST   | `/api/recipes`          | Create a new recipe               |
| PUT    | `/api/recipes/:id`      | Update an existing recipe         |
| DELETE | `/api/recipes/:id`      | Delete a recipe                   |
| POST   | `/api/recipes/:id/copy` | Copy a public recipe              |

---

## Dependencies

- **express**: Web framework
- **@prisma/client**: Prisma ORM client
- **prisma**: Prisma CLI
- **bcrypt**: Password hashing
- **dotenv**: Environment variables
- **openai**: OpenAI API integration (optional)

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bugs.

---

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [OpenAI](https://openai.com/)
