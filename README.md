## Voting App
Paul Hoskinson (plhosk@gmail.com)

- Vote on user-submitted polls.
- Log in to submit your own poll.

---

- [Use the live version on Heroku](https://voting-app-plhosk.herokuapp.com/)
- [Github Repository](https://github.com/plhosk/voting-app)

Inspired by AviranAbady's [react-boilerplate](https://github.com/AviranAbady/react-boilerplate).

### Main Technologies
- Server: Node/Express, Mongoose, Passport
- Client: React, Redux, React-Router, Material UI

### Development Instructions
- Install [Node.js](https://nodejs.org/en/)
- Clone or download git repository: `git clone https://github.com/plhosk/voting-app.git`
- Enter project folder: `cd voting-app`
- Install node packages: `npm install`
- Rename the file ".env.example" in your project directory to ".env" and add the URI to your MongoDB database collection (example: `MONGO_URI=mongodb://localhost/voting-app`)
- If you plan to use the GitHub authentication feature, enter the client ID, client secret and callback URL to the .env file
- Build the client bundle with Webpack: `npm run build` (or `npm run prod` for production)
- Start the Node/Express web server: `npm run start`
- Visit the server URL in your web browser (default port 5000): [http://localhost:5000](http://localhost:5000)
