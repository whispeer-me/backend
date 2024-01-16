# Whispeer Backend 🚀

Welcome to the server-side of Whispeer, where we handle all the behind-the-scenes work to keep your chats secure and running smoothly. Our backend is powered by Node.js and PostgreSQL, ensuring reliability and performance.

## Contribute to the Project

Your ideas and contributions can help make Whispeer's backend even stronger. We're always open to contributions in various forms, be it code, design, or testing. For more information on how you can contribute, take a look at our [Contributing Guide](CONTRIBUTING.md).

### Getting Started
- **Installation:** To get started with the backend, first install all necessary dependencies:
  ```
  npm i
  ```

### Running the Server
- **For Development:** To see real-time changes:
  ```
  npm run dev
  ```
- **For Production:** Build the project with:
  ```
  npm run build
  ```

### Testing and Maintenance
- **Testing:** Ensure everything works as expected:
  ```
  npm run test
  ```
- **Linting:** Keep the code clean and tidy:
  ```
  npm run lint
  ```

## Database Setup

We use PostgreSQL for our database needs. Ensure it's set up and running. Follow these steps to prepare your database:

### Migration
- **Prepare the Database:** We use node-pg-migrate for database migrations:
  ```
  node-pg-migrate up
  ```

## Security Practices

Security is a top priority for us. We adhere to best practices and regularly update our dependencies to keep our system secure. We also actively monitor for any unusual activity to ensure the safety and privacy of all data.

## Environment Variables
- Create `.env` file in the root directory.
- Add `DATABASE_URL` in `.env` to point to your database.
- Add `CORS_ORIGIN` in `.env` to let backend know which origins are allowed to access the API.
