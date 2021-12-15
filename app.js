//This requires the dotenv module and imports our authorization token, using a keys.js file as an intermediary.
require("dotenv").config();
const keys = require("./keys.js");
const token = keys.githubAuth.authToken;
//We are using the filesystem for loggin purposes.
const fs = require("fs");
//We are using the inquirer module for a user-friendly CLI.
const inquirer = require("inquirer");
//We are using the Octokit module to interact with the GitHub REST API.
const { Octokit } = require("@octokit/rest");

//Instantiating Octokit
const octokit = new Octokit({
  auth: token,
  userAgent: "sampleAppCLI v1.0",
  timeZone: "US/Eastern",
  baseUrl: "https://api.github.com",
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error,
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0,
  },
});

//This function retrieves a list of issues, and displays only the titles.
const issueGetList = async (req, res) => {
  await octokit
    .paginate(
      octokit.rest.issues.listForRepo,
      {
        owner: "MagicalPowers",
        repo: "CLI-application-december2021",
      },
      (response) => response.data.map((issue) => issue.title)
    )
    .then((issueTitles) => {
      console.log(issueTitles);
    });
};

//This function creates a new issue, using the title and body information gathered from the user.
const issueCreate = async (title, body) => {
  await octokit.rest.issues.create({
    owner: "MagicalPowers",
    repo: "CLI-application-december2021",
    title: title,
    body: body,
  });
};

//This is a prompt that lists possible commands.
const initialPrompt = {
  type: "list",
  name: "userCommand",
  message:
    "Would you like you create an issue or get a list of current issues?",
  choices: ["Create Issue", "Get List of Issues"],
};

//ask user for title and message body
const issueQuestions = [
  {
    type: "input",
    name: "issueTitle",
    message: "What is the title of this issue?",
  },
  {
    type: "input",
    name: "issueMessage",
    message: "Please describe the issue:",
  },
];

//This is the initial prompt, with results that depend upon the user choices.
function initialize() {
  inquirer.prompt(initialPrompt).then((answers) => {
    if (answers.userCommand === "Create Issue") {
      console.log(
        "Let's get started with an Issue Title, then, the Message Body."
      );
      inquirer.prompt(issueQuestions).then((answers) => {
        const title = answers.issueTitle;
        const body = answers.issueMessage;
        console.log(answers);
        issueCreate(title, body);
        console.log("Issue created.");
        initialize();
      });
    } else if (answers.userCommand === "Get List of Issues") {
      console.log("Okay, here is the list of issues that this repository has:");
      issueGetList();
      setTimeout(() => {
        initialize();
      }, 1000);
    } else {
      console.log("Let's try this again.");
      log("error ");
      initialize();
    }
  });
}

//Logging Function
function log() {
  fs.appendFile("log.txt", arg + "\n", function (err) {
    if (err) throw err;
    return console.log("Appended to log.");
  });
}

//main function
(() => {
  console.log(
    "Hello. This GitHub CLI application can be used to list the current issues, or create a new issue in a respository."
  );
  initialize();
})();
