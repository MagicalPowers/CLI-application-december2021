//this is a key storage file. It accesses the authorization token stored in our .env file.
exports.githubAuth = {
  authToken: process.env.TOKEN,
};
