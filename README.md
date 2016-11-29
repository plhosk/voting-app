## Voting App
Paul Hoskinson (plhosk@gmail.com)

---

- [Github Repository](https://github.com/plhosk/voting-app)
- [Live version on Heroku](https://voting-app-plhosk.herokuapp.com/)

Inspired by AviranAbady's [react-boilerplate](https://github.com/AviranAbady/react-boilerplate).

### Main Technologies
- Server: Node/Express, Mongoose, Passport
- Client: React, Redux, React-Router v4, Material UI

### Development Instructions
- Install [Node.js](https://nodejs.org/en/)
- Clone or download git repository: `git clone https://github.com/plhosk/voting-app.git`
- Install node packages: `npm install`
- Rename the file ".env.example" in your project directory to ".env" and add the URI to your MongoDB database collection (example: `mongodb://localhost/voting-app`)
- Build the client bundle: `npm build` (or `npm prod` for production)
- Start the Node/Express server: `npm start`
- Visit the server URL in your web browser (default port 5000): [http://localhost:5000](http://localhost:5000)
