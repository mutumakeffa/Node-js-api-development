const Hapi = require('hapi');
const good = require('good');

// require todo route module and register it 
// with our server using the server.route method
const routes = {};
routes.todo = require('./routes/todo');


// create a server with a host and port
const server = new Hapi.Server({
    host: 'localhost',
    port: process.argv[2] || 3000,
});


// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: (_request, h) => {
        return ({message :'testing if nodemon is working 4 !'});
    }
});

// load other routes
server.route(routes.todo);

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



// Let's create an options object where 
// we will set the interval of logging and how we will log:

const options = {
    ops: {
        interval: 10000
    },
    reporters: {
        console: [{
            module: 'good-console'
        }, 'stdout']
    }
};

// Let's register our plugin by first requiring good,
// We also have to register the options
// Start the server
const init = async () => {

    await server.register({
    plugin: good,
    options 
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();



// ---------------------- NOTES -----------------------//

// read this guide for Hapi v17 which has since changed to adopt async/await
// https://futurestud.io/tutorials/hapi-v17-upgrade-guide-your-move-to-async-await

// we will run our server using *nodemon <filename>* command. 
// this makes it possible for our server to automatically reload when we make changes to it,
// therefore avoiding the tediousness of stopping the server and starting it all over again

// ---------------------------------------------------//

// We start by requiring the Hapi.js framework as it is an external module
// then we create a server by initializing the Server class, hence a new
// Hapi.Server()
// we then bind that server on a specific host(localhost) and port(8000)
// After the setup is done, we then start the server using the server.start method
// this method accepts a closure(callback fxn) that is called once the server has started.
// in this fxn we can check if whether any errors occured while starting the server

// Run the server by running node server.js on the terminal
// we can only have one server running on a particular port of our host.
// we can fix this by changing the port number of our second server
// as best practice, other than keep changing the code, we can pass the port number as a terminal argument.
// i.e node server.js <port-number>
// then changing our code (in the port section) to,
// port: process.argv[2] || 8000
// we're saying that, if the port is provided as the forst argument of the script,
// use that. Otherwise, use port 8000 as the port number.
// for the process.argv array, index 0 is the program running the script (node)
// index 1 is the program being run, (server.js)
// arguments passed to the script are counted from index 2 onwards.
// Read more on process.argv

// ---------------- Logging --------------------------- //

// we need to install *good* and *good-console* packages to help with our logging
// Hapijs doesn't come with logging features but has a rich
// plugin ecosystem that we can utilize












