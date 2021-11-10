# Guess the City

Guess the City is a fullstack web application that tests the user's knowledge of city skylines in the form of a fun and interactive quiz.

## How it Works

When it loads, the app pulls images of city skylines from the database and loads them into quiz format. Upon starting the quiz, the user is shown skyline images one at a time and must input their best guess as to what city is being shown. Throughout the quiz, statistics on their performance are compiled and used to determine their final score at the conclusion. Additionally, the app also supports CRUD (Create, Read, Update, Delete) functionality for all cities in the database, which can be accessed through the main menu.

## Tools Used

![MERN stack architecture diagram](/architecture_diagram.png)

To build this application, I used the MERN stack: more specifically, React for the frontend, Node.js and Express on the backend, and MongoDB as the database. Additional libraries and frameworks used were Redux to centralize the application's state globally, Mongoose to handle connections to the database asynchronously and model MongoDB objects, and Bootstrap for responsive buttons, dropdowns, alerts, and icons.

## Usage

The project is currently being hosted with Heroku for the backend and Netlify for the frontend. To try it out, just navigate to this [link](https://guess-the-city.netlify.app/) in your browser and you're all set! To host Guess the City on your local machine, clone into the repository and use the command: *nodemon index.js* to start the server, and the command: *npm start* to start the client.


## Contributing
Pull requests are always welcome. For major changes, please open an issue first to discuss what you would like to change.

