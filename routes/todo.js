// This is where we are going to have all our routes for the todo resource
// This file (module) will export a list of routes

// require Joi to be able to use it
const Joi = require('joi');

const todoList = [
    {
      title: 'Shopping  #1',
      dateCreated: 'Jan 21, 2018',
      list: [
        { text: 'Node.js Books', done: false },
        { text: 'MacBook', done: false },
        { text: 'Shoes', done: true },
      ]
    },
    {
      title: 'Places to visit  #2',
      dateCreated: 'Feb 12, 2018',
      list: [
        { text: 'Nairobi, Kenya', done: false },
        { text: 'Moscow, Russia', done: false },
      ]
    },
  ];
  

  module.exports = [
    {
      method: 'GET',
      path: '/todo',
      handler: (_request, h) => {
        return (todoList);
      },
    },

    {
      method: 'GET',
      path: '/todo/{id}',
      handler: (request, h) => {
        const id = request.params.id - 1; // since array is 0-based index
        // should return 404 error if item is not found
        if (todoList[id]) {
          return (todoList[id]);
        } else {
          return h.response({ message: 'Not found' }).code(404);
        }

      },
    },

    {
      method: 'POST',
      path: '/todo',
      handler: (request, h) => {
        const todo = request.payload;
        todoList.push(todo);
        return h.response ({ message: 'created' });
      },
      config: {
        validate: {
          payload: {
            title: Joi.string().required(),
          }
        }
      }
    },
  

    {
      method: 'PUT',
      path: '/todo/{id}',
      handler: (request, h) => {
        const index = request.params.id - 1;
        // replace the whole resource with the new one
        todoList[index] = request.payload;
        return h.response({ message: 'updated' });
      },
    },

    {
      method: 'PATCH',
      path: '/todo/{id}',
      handler: (request, h) => {
        const index = request.params.id - 1;
        // item to be patched
        const todo = todoList[index];
        // for each key provided, update on 
        // the resource
        Object.keys(request.payload).forEach(key => {
          if (key in todo) {
            todo[key] = request.payload[key];
          }
        });
        return h.response({ message: 'patched' });
      },
    },
    
    {
      method: 'DELETE',
      path: '/todo/{id}',
      handler: (request, reply) => {
        const index = request.params.id - 1;
        delete todoList[index]; // replaces with `undefined`
        return h.response({ message: 'deleted' });
      },
    },
    
  ];



















