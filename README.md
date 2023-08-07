# Express GraphQL Authentication Project

This is an example project demonstrating user authentication, password change, two-factor authentication, and a GraphQL API using Express.js and TypeScript.

## Features

- User registration and login with password
- Password change functionality
- Two-factor authentication with QR code generation
- GraphQL API for registration, login, password change, and two-factor authentication

# Usage
## Authentication Routes
  **POST /auth/register:** Register a new user. Send a JSON object with **name**, **email**, and **password**.
  
  **POST /auth/login:** Login with **email** and **password**. Send a JSON object with **email** and **password**.
  
  **POST /auth/change-password:** Change user password. Send a JSON object with **email**, **oldPassword**, and **newPassword**.
  
## Two-Factor Authentication Routes
  **POST /two-factor/generate-qr:** Generate QR code for two-factor authentication. Send a JSON object with **email**.
  
  **POST /two-factor/login-with-two-factor:** Login with two-factor authentication. Send a JSON object with **email**, **password**, and **otp**.
  

## GraphQL API
Access the GraphQL API at http://localhost:3000/graphql.

## Example GraphQL Queries/Mutations
```graphql
mutation RegisterUser {
  register(name: "John Doe", email: "john@example.com", password: "password") {
    id
    name
    email
  }
}

mutation LoginUser {
  login(email: "john@example.com", password: "password")
}

mutation ChangePassword {
  changePassword(email: "john@example.com", oldPassword: "password", newPassword: "newpassword")
}

mutation GenerateQRCode {
  generateQRCode(email: "john@example.com")
}

mutation LoginWithTwoFactor {
  loginWithTwoFactor(email: "john@example.com", password: "newpassword", otp: "123456")
}
```
