# full-stack-js-exercise
A very basic TDD exercise implementation using full stack Javascript

##Exercise Specification

###Scenario
The User receives a code via SMS and enters that code in a form to reset their password.

###Requirements:
Using a TDD approach and the JS frameworks of your choice implement a full stack JS application.

1.Create a basic html form with and input box and a submit button.
2.Validate the user input client side by accepting on a 6 digit code as valid input.   
3.POST the form data using the followig format {code: <input value>}
4.The Server side JS should always respond with the following JSON:
    { errorcode : 901, error: 'invalid code' }
5.The UI should display the same message as a failed client side validation notifying the user of the failure of the request.

##Implementation
I used Angular and Node for the implementation.

I used Yeoman (http://yeoman.io/) to bootstrap the project and create the app structure.

The tests are written using Jasmine (http://jasmine.github.io/)

I used SCSS as the CSS language of choice, located under app/styles there is only
one file main.scss where all the styling rules are stored.

The javascript code is under /app/scripts, 

    - app.js is the main file, the only thing it does is to configure the route and load the Main controller.
    - controllers/main.js is the main controller for the app.
    - directives/formValidator.js is a directive used to validate the form according to the input provided.
    - services/webService.js is a very basic service that makes the POST request to the server.

The /app/views/main.html file contains the markup for the main view
and the /app/index.html file is the markup for the entire page.

The server code is under app/server, it is a very basic HTTP server written in Node.js and I worked under the
assumption that it is the least important part of the test so I didn't invest too much time in structuring the code.
The files under app/server are:

    - app.js is the main file that starts the server.
    - server.js contains all the code for the server, all requests are handled here.
    I made this separation into two files instead of one as it allows me to start/stop the server from the tests.

###Tests
Jasmine was used for writing the tests.

###UI
The tests for the UI are under app/test/spec and the have the same names as the corresponding files they test:
    - /controllers/main.js
    - /directives/formValidator.js
    - /services/webService.js

I did not try to achieve 100% code coverage but I did try to cover everything 
included in the basic scenario and show some typical testing mechanisms in operation. 
All tests in the UI are unit tests and do not run the entire app but
initialize components and their dependencies, or mocks for them, to run the tests.

###Server
Again I used Jasmine but since the server is very basic I am running the server each time instead of splitting the code
into components and testing them.
There is only one file under app/server/spec/
     - server-spec.js starts and runs the server before running each test.

###Instructions
To start the UI run:
    grunt serve
in the main app/ directory this should start the Angular app.

To start the Server run:
    node app.js
in the app/server directory this should start the Angular app.

To run the UI tests:
    grunt test
in the /app folder

To run the server tests:
    jasmine-node spec --color
in the app/server folder
note: the server must not be running in order to run the server tests.
