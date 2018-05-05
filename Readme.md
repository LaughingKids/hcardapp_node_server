# Node Js Server for HcardApp

## Background
Implement a backend server with node js for HcardApp.

## Server Endpoint Structure
| Endpoint      | Action        | Response  |
| ------------- |:-------------:| -----:|
| /             | GET           | HTML(Render JS from server) and static files    |
| /submit       | POST          | Save whole profile object        |
| /update       | POST          | Save a single profile property   |


## Build Step
1. npm install
2. mongod [start local mongo server, if want to save detail in mongo db]
3. npm run file [store user profile into file]
4. npm run mongo [store user profile into mongo db, local server]

## Enviroment
1. node js version: v9.3.0
2. mongo db should be installed locally [port:27017 (default port)]
