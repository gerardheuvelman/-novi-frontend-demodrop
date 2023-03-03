# KNOWN BUGS: 

- Short pages are shorter than the height of the screen.
- 
# TODO:
- user profile must have a "auth" mode, viewable by other users. This mode must include a button "View all demo's" for this user.




# DemoDrop- a general purpose online music demo marketplace (front end web project)

## About

Welcome to DemoDrop. DemoDrop is a general purpose online marketplace where Misic producers can upload their material and sell the rights to DJ's and other parties that are interested in playing said music.

DemoDrop is being developed by Gerard Heuvelman, as the final assignment of the bootcamp Full Stack Dveloper of Novi University, Utrecht, The Netherlands

At this time, DemoDrop exists solely as a source-code only prototype, and as such still requires an IDE to run.

## Main usages
DemoDrop offers the following functionality:
- Uploading demos.
- Searching for demos
- Listening to a demo (online)
- Downloading a demo
- Sending a message to a demo owner
- Replying to received messages

## Installation guide
Steps below are only to install and deploy this (front end) portion of the Demo Drop Web application. You must also install and run the  back end project, which can be found at https://github.com/gerardheuvelman/novi-backend-demodrop.

Prerequisites:
- OS: Windows, MacOS or Linux.
- Node Package Manager (NPM). You can download it at https://nodejs.org/en/download/
- A modern web browser. Google Chrome and Microsoft Edge are both good options.

Installation steps:

1. first, install and run the backend portion of this application (see link above.)
2. Clone this project (front end)
3. load it into your IDE
4. In the console, type  "npm install" to install dependencies
5. In the .env file (located at the project root folder). fill in the following information:
   REACT_APP_SERVER_SCHEME=<http or https>
   REACT_APP_SERVER_DOMAIN=<eg: localhost>
   REACT_APP_SERVER_PORT=<eg: 8080, 80 or 443>
6. Once done, type "npm start" in the console. A browser window will open, showing the web app.