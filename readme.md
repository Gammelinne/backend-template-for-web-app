# Backend template for web application

This project serves as a foundational backend template for web applications. Originally created to streamline the development process by eliminating the need to rewrite common functionalities for each project, it has evolved into a standalone project. Works perfectly with my frontend template project

## Project Overview

The template is specifically designed to handle user management, providing a robust system for user authentication and logging. Its modular structure, based on the [AdonisJS framework](https://adonisjs.com/), ensures scalability and ease of customization.

## Current Features

### Authentication and Security

1. **Middleware-based Authentication**

   - Implementation of a secure authentication system.

2. **Hashed Passwords**
   - Secure storage of passwords using hashing.

### Logging

1. **Automatic Log Rotation**

   - Implementation of a cron job that automatically removes old logs, ensuring efficient log management.

2. **Rate Limiting for Spam Prevention**
   - Integration of a rate limit mechanism to prevent spam. The global limiter is set to 10 requests per minute (configurable in ./limiter.ts).

### Testing

1. **Japa Automated Tests**
   - Integration of automated tests using Japa.

### Code Quality

1. **Prettier Integration**

   - Use of Prettier for automatic code formatting.

2. **Linting**
   - Integration of a linting tool to ensure code uniformity.

### Database Management

1. **Migration for Table Creation**

   - Creation of tables (users, posts, api_token) through migrations.

2. **Seeder for Local Testing**
   - Use of seeders with factories to facilitate local testing.

### Project Organization

1. **MVC Model and Validation Files**
   - Project organization based on the MVC model.
   - Validation files to ensure proper data types.
   - 
### Real-time Communication

1. **Socket.io Integration**
   - Implementation of WebSockets for real-time bidirectional communication.
## Routes

```typescript
/* User Routes */
Route.group(() => {
  Route.get('/users/me', 'UsersController.showMe')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')
  Route.post('/users/:id/avatar', 'UsersController.addAvatar')
}).middleware(['auth', 'throttle:global'])

/* Auth Routes */
Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/reset-password', 'AuthController.resetPassword')
  Route.post('/logout', 'AuthController.logout').middleware(['auth'])
}).middleware('throttle:global')

/* Mail Routes */
Route.group(() => {
  Route.get('/verify-email/:email', 'MailsController.verifyEmail').as('verifyEmail')
  Route.post('/resend-verification-email', 'MailsController.resendVerificationEmail')
  Route.post('/reset-password-email', 'MailsController.resetPasswordEmail')
}).middleware('throttle:global')

/* Post Routes */
Route.group(() => {
  Route.get('/posts', 'PostsandCommentsController.index')
  Route.get('/posts/:id', 'PostsandCommentsController.show')
  Route.post('/posts', 'PostsandCommentsController.store')
  Route.put('/posts/:id', 'PostsandCommentsController.update')
  Route.delete('/posts/:id', 'PostsandCommentsController.destroy')
}).middleware(['auth', 'throttle:global'])

/* Extern call */
Route.group(() => {
  Route.post('/google/redirect', 'AuthController.handleGoogleRedirect')
})
```

## Features in Development

### Localization

1. **I18n for Multilingual Responses**
   - Integration of language management for responses.
2. **Migration to AdonisJS v6 (Upcoming)**
   - Anticipating the release of AdonisJS v6 in the coming weeks.
   - Planned migration to AdonisJS v6 as soon as it is officially released, ensuring compatibility and taking advantage of the latest features.
## Configuration and Usage

_Refer to the AdonisJS doc for more information_

### Logging Configuration

1. **Automatic Log Cleanup:**

   - A cron job is set up to automatically remove old logs and ensure efficient log storage.

2. **Rate Limit Configuration:**

   - Global rate limiting is configured to 10 requests per minute to prevent spam. You can adjust this limit in the ./limiter.ts file.

### Add environnement variables and create database

1. **Setup Environment Variables:**

   - Create a `.env` file in the root of the project.
   - Replace the values in the `.env.example` file with the actual values.

2. **Database run migration of tables:**

```bash
node ace migration:run
```

3. **Database seeding**

```bash
node migration:fresh --seed
```

### Run project

#### Locally

**Starting the development server**

```bash
node ace serve --watch
```

#### Production

1. **Build project**

```bash
node ace build --production
```

2. **Run Project**

```bash
cd build
node server.js
```

## Hosting

For hosting, I recommend using [Cyclic.sh](https://cyclic.sh/), which offers a free plan. Visit their website for more information.

## Vulnerability Notice

The latest update of `@adonisjs/assembler` is version 9.5.6. However, it utilizes `cpy@8.1.2`, which has critical vulnerabilities affecting prototype pollution and regular expression denial of service (ReDoS). Attempting to change the `cpy` version as advised at the URL: [Snyk Report](https://snyk.io/test/github/adonisjs/assembler?targetFile=package.json) may not resolve the issue within the AdonisJS context. Nevertheless, I continue to keep the project up-to-date in anticipation of a future fix.
