
# To-Do App

## Overview
This is a simple To-Do List application built using Node.js and Express. The application allows users to add, remove, and check off tasks as completed. 

## Features
- Add new tasks to the list.
- Remove tasks from the list.
- Mark tasks as completed.

## Technologies Used
- HTML
- CSS
- JavaScript (Node.js)
- Express.js

## File Structure
```
/node-js
    /public
        styles.css
    /src
        index.js
        index.test.js
    /views
        index.ejs
    .dockerignore
    Dockerfile
    package-lock.json
    package.json
/README.md
```

## How to Run
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Docker Information
To containerize the application, a `Dockerfile` is provided in the project root. Here is an example of a simple Dockerfile for this application:

### Example Dockerfile
```dockerfile
# Start from the official Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
```

## HTML Structure
The main HTML file is structured as follows:
- The form allows users to input a new task and submit it.
- Tasks can be checked off as completed.
- Completed tasks are displayed separately.

### Example HTML
```html
<form action="/addtask" method="POST">
    <input type="text" name="newtask" placeholder="Add new task">
    <button> Add Task </button>
</form>
```

## Conclusion
This To-Do app is a simple way to manage daily tasks and can be extended with additional features like task editing, deadlines, and user authentication.

