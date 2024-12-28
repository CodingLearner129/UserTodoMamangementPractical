# User Todo Management Practical README

This is a Node JS project created to [briefly describe the project's purpose or goal].

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   [Node.js](https://nodejs.org) (^20.9.0)
-   [npm](https://www.npmjs.com) (^10.1.0)
-   [Database](#configure-database) (MongoDB)

## Getting Started

Follow these steps to get the project up and running:

1.  Clone this repository:

    ```bash
    git clone https://github.com/CodingLearner129/UserTodoManagementPractical.git
    ```

2.  Change into the project directory:

    ```bash
    cd UserTodoManagementPractical
    ```

3.  Install Node JS dependencies using Composer:

    ```bash
    npm install
    ```

4.  Create a copy of the .env.example file and rename it to .env:

    ```bash
    cp .env.example .env
    ```

5.  Configure your database in the .env file:

    ```bash
    MONGO_LOCAL=0.0.0.0:27017
    MONGO_DB=db_name
    MONGO_USER="user"
    MONGO_PASSWORD="password"
    MONGO_CLUSTER="mongo_cluster"
    MONGO_APPNAME="mongo_appname"
    MONGO_LOCAL_DB ="mongodb://${MONGO_LOCAL}/${MONGO_DB}"
    MONGO_CLUSTER_DB="mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority&appName=${MONGO_APPNAME}"
    ```
5.  Configure your jwt encription in the .env file:

    ```bash
    JWT_ENCRYPTION=your_secret_string
    ```

6.  Start the development server:

    ```bash
    npm run dev
    ```

7. Run seeder (run this in new tab of terminal):

    ```bash
    npm run seed:v1
    ```

8. Import Postman Collection:

-   Import the file "User Todo Management Practical.postman_collection.json" into Postman to access all API endpoints.

9. Import Environment:

-   Import the file "User Todo Management Practical.postman_environment.json" to configure the environment.

10. Select Environment:

-   In Postman, select the environment "User Todo Management Practical" from the environment dropdown to test the API seamlessly.