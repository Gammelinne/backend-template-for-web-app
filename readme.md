# Backend template for web application

This project serves as a foundational template for web applications. Originally created to streamline the development process by eliminating the need to rewrite common functionalities for each project, it has evolved into a standalone project.

## Project Overview

The template is specifically designed to handle user management, providing a robust system for user authentication and logging. Its modular structure, based on the AdonisJS framework, ensures scalability and ease of customization.

## Current Features

### Authentication and Security
1. **Middleware-based Authentication**
   - Implementation of a secure authentication system.

2. **Hashed Passwords**
   - Secure storage of passwords using hashing.

### Testing
3. **Cypress Automated Tests**
   - Integration of automated tests using Cypress.

### Code Quality
4. **Prettier Integration**
   - Use of Prettier for automatic code formatting.

5. **Linting**
   - Integration of a linting tool to ensure code uniformity.

### Database Management
6. **Migration for Table Creation**
   - Creation of tables (users, posts, api_token) through migrations.

7. **Seeder for Local Testing**
   - Use of seeders with factories to facilitate local testing.

### Project Organization
8. **MVC Model and Validation Files**
   - Project organization based on the MVC model.
   - Validation files to ensure proper data types.

## Features in Development

### Email Verification and Password Recovery
1. **Email Verification**
   - Implementation of email verification.

2. **Password Reset**
   - Addition of password recovery functionality.

### Localization
3. **I18n for Multilingual Responses**
   - Integration of language management for responses.

## Configuration and Usage

### Add environnement variables


### Run project
1. **Database Migration:**
   ```bash
     node ace migration:run
   ```
   
2. **Database seeding**
3. 
4. **Build project**
5. **Run Project Locally**
  

## How to Contribute

Provide guidelines on how people can contribute to your project, whether it's by reporting issues, suggesting features, or submitting pull requests.

## License

Specify the license under which your project is distributed.
