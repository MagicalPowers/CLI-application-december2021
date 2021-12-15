require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const inquirer = require("inquirer");
const { Octokit } = require("@octokit/rest");
const token = keys.githubAuth.authToken;
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

// async (req, res) => {
//   await octokit.rest.issues.get({
//     owner: "MagicalPowers",
//     repo: "CLI-application-december2021",
//   });

//   console.log(res);
// };
//========================================================
const userCommand = process.argv[2];
const userRequest1 = "";

//For multiword requests
for (i = 3; process.argv[i]; i++) {
  userRequest1 += process.argv[i] + "+";
}
const userRequest = userRequest1.slice(0, -1);

//Switch for multiple functions
// const processInput = (userCommand, input) => {
//   switch (userCommand) {
//     case "create-issue":
//       issueCreate(input);
//       break;
//     case "get-issues":
//       issueGetList;
//       break;
//     default:
//       console.log("Not a recognized command.");
//       break;
//   }
// };
//ask user for command
const initialPrompt = {
  type: "list",
  name: "userCommand",
  message:
    "Hello. Would you like you Create an issue or Get a List of current issues?",
  choices: ["Create Issue", "Get List of Issues"],
};
const issueQuestions = [
  {
    type: "input",
    name: "issueTitle",
    message: "What is the Title of this Issue?",
  },
  {
    type: "input",
    name: "issueMessage",
    message: "Please describe the issue:",
  },
];

//Create an issue.
// const issueCreate = await octokit.rest.issues.create({
//     owner: "MagicalPowers",
//     repo: "CLI-application-december2021",
//     title: input,
//     body: "this issue is from the CLI",
// });

//Get a list of issues
// const issueGetList = await octokit.rest.issues.get({
//     owner: "MagicalPowers",
//     repo: "CLI-application-december2021",
// });

function initialize() {
  inquirer.prompt(initialPrompt).then((answers) => {
    if (answers.userCommand === "Create Issue") {
      console.log(
        "Let's get started with an Issue Title, then, the Message you'd like to send."
      );
      inquirer.prompt(issueQuestions).then((answers) => {
        const title = answers.issueTitle;
        const body = answers.issueMessage;
        console.log(answers);
        console.log(title, body);
        issueCreate(title, body);
      });
    } else if (answers.userCommand === "Get List of Issues") {
      console.log("Okay, here is the list of issues that this repository has:");
      issueGetList();
    } else {
      console.log("Let's try this again.");
      return;
    }
  });
}

// () => {
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "command",
//       message:
//         "Hello, would you like to Create an issue (create), or Get a List of current issues (get-list)?",
//     },
//   ]);
// };

//Execute the function switch
// processInput(userCommand, userRequest);

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
