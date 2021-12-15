# CLI-application-december2021
- This is a sample CLI application that queries the GitHub REST API. 
- This application can create a new issue for a repository or provide a list of the current issue titles.

### Organization
This node.js app uses the inquirer module to present a list to the user and, depending on the user's choice, executes either a POST to create a new issue or a GET to retrieve a list of the current issues. If a user chooses to create a new issue, they will be prompted for a title and a message body.

### How-to operate
- After cloning the repository, npm install to load all required third-party software. 
- Following installation the user can initiate the program by entering 'node app.js'
- The user will be prompted with explanatory information and will be given choices to proceed.

### Link to Github Repository
Please clone and install to run.
https://github.com/MagicalPowers/CLI-application-december2021

### Technologies Used
- node.js
- node filesystem
- dotenv module
- inquirer module
- Octokit module

