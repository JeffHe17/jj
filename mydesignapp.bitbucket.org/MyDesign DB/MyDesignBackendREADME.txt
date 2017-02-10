MyDesign Backend README

Resources:
1) Main tutorial used to build backend:
  http://www.raywenderlich.com/61078/write-simple-node-jsmongodb-web-service-ios-app
  I followed this more or less step-by-step to build the first, most basic, iteration of the backend.
  This will explain the existence of any other files on the backend (I only touch on the major ones here)
2) MongoDB Documentation: http://docs.mongodb.org/manual/
3) Express.js Documentation: http://expressjs.com/4x/api.html
3) BCrypt Documentation: https://www.npmjs.com/package/bcrypt
4) Heroku Documentation: https://devcenter.heroku.com/categories/reference
  The part I used the most: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
  Changing the Heroku Domain: https://devcenter.heroku.com/articles/custom-domains
5) Node.js: http://nodejs.org/api/
  You'll need Node.js, as Express, Bcrypt, and other things I used are node packages. For the 
  most part, though, the Ray Wenderlich tutorial above covers what I needed to know about Node.

*****************
ARCHITECTURE
*****************
The MyDesign backend has three layers. From the lowest level:
1) Mongo database instance, which lives on a server (infinite-stream-2919.herokuapp.com in our case)
  MongoDB is a NoSQL database. Quick and dirty: instead of tables and rows, it has collections and 
  documents. Documents are JSON-like objects
2) collectionDriver.js: directly accesses/interacts with database. This element has functions written
  for specific database interactions (i.e. one function to do a search users by email, another to update
  a user document)
3) index.js: handles incoming HTTP requests to the server, uses Express to decide how to handle those 
  requests, does some pre-processing, then makes calls to the collectionDriver to actually alter the
  database.

*****************
MONGODB LAYER
*****************
The MongoDB lives on our Heroku app.

One note about MongoDB is the ObjectId type. Usually, object Id's can be treated as strings.
However, before passing these into query functions to the database (ie in a findOne({_id: ...})),
you MUST cast the string to an ObjectId with ObjectId(<string>). Otherwise, no such document will
be found by the query.

Accessing the database:
1) via the command line: use the following
  $ mongo ds031751.mongolab.com:31751/heroku_app33244793 -u mydesignadmin -p mydesign123
  see the MongoDB documentation for interacting with the database from the console
2) via MongoLab: go to 

Heroku:
Use the heroku documentation to download the heroku toolkit, which will let you interact with the heroku
app from the command line. For this part, you can think of Heroku as a git repo. To push code to Heroku,
just do: 
  $ git push heroku master
from the directory containing the backend. This will push index.js, collectionDriver.js, and anything 
else to the app.
This is done automatically on the push, but you can manually start the app with:
  $ heroku ps:scale web=1 db=1
This command tells the heroku app to run with 1 dyno running the web procedure, and 1 dyno running the db
procedure. These procedures are defined in the Procfile. The web dyno(s) will run "node index.js", i.e
they start the app server so that it can take incoming HTTP requests. The db dyno(s) run 
"mongod --dbpath ./data/db", ie they start an instance of the database.

You can also view the Heroku logs with:
  $heroku logs --tail
Anything printed to the console originating from index.js will show up here.

*****************
collectionDriver.js
*****************
An example collectionDriver.js function:

1 CollectionDriver.prototype.get = function(collectionName, id, callback) {
2  this.getCollection(collectionName, function(error, collection) {
3    if (error) {
4      callback(error);
5    } else {
6      var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
7      if (!checkForHexRegExp.test(id)) {
8        callback({error : "invalid id"});
9      } else {
10        collection.findOne({'_id' : ObjectID(id)}, function(error, document) {
11         if (error) {
12            callback(error);
13          } else {
14            callback(null, document);
15          }
16        });
17      }
18    }
19  });
20 };

This function is called when there is a call to CollectionDriver.get() from index.js.
It takes three arguments: the collectionName from which to do a get, the id of the object
(as a string) to be get'ed, and a callback function. 
Line 1: prototype just means that this is a class method
Line 2 pulls up the collection specified by the collectionName argument.
Lines 3-4 check for an error in pulling up the collection and return an error if there is one.
Lines 5 onward are done if there is no error. The collectionDriver checks that the id passed in is 
valid, then finds a single object in the collection with the corresponding ObjectId. If no error occurs,
the found document is returned to the caller.

Most functions in collectionDriver have a similar structure. For the most part, these functions should be 
as simple as possible; business logic should be implemented in index.js.

*****************
index.js
*****************
This file is the topmost layer on the heroku app. It is a Node.js app that uses the Express module to handle incoming HTTP requests to access the database.

Some general notes:
1)Line 27 allows for the use of jade to build simply-templated html pages as HTTP responses. This was 
  nice in the early stages, but not really necessary once direct access to node app for database access
  is eliminated (all database access should go through the frontend, or through direct access from the 
  command line or MongoLab).

2) Lines 33-37 allow for CORS. For simplicity, this is currently set to allow requests from anywhere, 
  but in production, this should really just be limited to mydesign domains.

3) The url on line 48 is pulled from our MongoLab. Changing the HerokuApp name might call for a change 
  here

The usual function definition for express apps looks like this:
  app.post('/users', function(req, res) {
Breakdown:
-"app" is an instance of Express (see line 24)
-".post" signifies that this function will handle POST requests
-the first argument '/users' signifies that this function handles requests with the param /users
  together with .post, this function will handle POST requests to the server with URL: 
  "https://infinite-stream-2919.herokuapp.com/users"
-the second argument is a callback function
-the first callback argument is the HTTP request itself. You can access its fields with:
  req.params: access URL params (ie things that show up in the URL, see (4) below)
  req.body: access HTTP request body
-the second callback argument is the HTTP response. Set its fields then send it back to the 
  requester (eg Line 72: res.status(400).send(error) sends a 400 code and an error)

Some things that are usually in these functions:
1) MongoClient.connect(): connects to the database
  Don't forget to call database.close() when the function is done
2) A collectionDriver instantiation: index.js implements business logic on the HTTP request, 
  then uses a collectionDriver to do actual databse access
3) When passing documents to the collectionDriver (or anywhere really), construct a JSON object,
  then pass that object (can be seen on lines 96-104)
4) See the Express documentation and first tutorial links for more information on Express syntax.
  Function definitions like: app.get('/projects/:authorId', function(req, res) {
  mean that the function is called on GETs to
  https:/infinite-stream-2919.herokuapp.com/projects/<some authorId>. The authorId can be accessed
  with: req.params.authorId

*****************
TO-DOs
*****************
1) User/project creation inconsistency?
2) Finish debugging user login by username or password
3) Create HTTP route for marking projects as completed
4) Limit CORS origins that are acceptable
5) Implement teams on projects (probably best to create a new field in project creation that is an array 
  of collaborating users)
6) Implement users with more than 1 type (change accountType to an array)