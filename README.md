# System Requirements
- node.js
- npm

# Installation
1. Go to app directory by `cd live_message`.
2. Make sure you already install [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) on your machine.
3. Install dependencies by `npm install`.
4. To run application type `node .` in your terminal.

# Running Application
1. To send message you can send post request to "http://localhost:1995/api/message/" and put on the body
    ```
    {"message": "Your Message Here"}
    ```
    make sure add header "Content-Type: application/json"
2. To retrieve all message you can send get request to "http://localhost:1995/api/retrieve/message/"
3. To see the live message you can open "http://localhost:1995/" on your browser