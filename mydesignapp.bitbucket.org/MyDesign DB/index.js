//////////////////////////
//GENERAL NOTES
//////////////////////////
/*
OK for testing, but important to find out if the line:
"res.header("Access-Control-Allow-Origin", "*");""
is secure for production!!!!
Origins to allow: www.mydesigncompany.org, www.umdmydesign.bitbucket.com
*/

//Require Node modules
var http = require('http'), //http requests
  express = require('express'), //for handling incoming HTTP requests
  path = require('path'), 
  MongoClient = require('mongodb').MongoClient, //connects to MongoDB
  assert = require('assert'), //error checking
  Server = require('mongodb').Server, //hosts MongoDB isntance
  CollectionDriver = require('./collectionDriver').CollectionDriver, //my Data Access Object
  bodyParser = require('body-parser'), //for receiving responses from server
  bcrypt = require('bcrypt'), //for data encryption before storing on server
  ObjectID = require('mongodb').ObjectID;; //for identifying MongoDB documents

//use express to generate http routes
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//use body parser to handle http responses
app.use(bodyParser.json());

//Enable CORS on this server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var collectionDriver;

//Params to connect to MyDesign's MongoDB database server
//var mongoHost = 'localhost'; //change when published
//var mongoPort = 27017; //change when published
//use this url when testing with local server
//var url = 'mongodb://' + mongoHost + ':' + mongoPort;

//use this url when testing on heroku server
//var url = 'mongodb://heroku_app33244793:h1mjp5ou1tbafcaoubjr5ql2tk@ds031751.mongolab.com:31751/heroku_app33244793'; //inifinite-stream-2919
var url = 'mongodb://heroku_app33670805:oa69oeeb9dh258s5m020q6p0sg@ds039441.mongolab.com:39441/heroku_app33670805'; //mydesigncompany

app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////
//USER FUNCTIONS
//////////////////////////
//Create a new user in Users db
/* req.body contents:
* lastName
* firstName
* username
* email
* password (will be hashed before entry to db)
* school
* accountType
*/
app.post('/users', function(req, res) {
  console.log("adding new user");
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var collection = "users";
    var body = req.body;
    var validData = true;

    //validate user input: see if there is already a user with same email
    collectionDriver.getUserByEmail(body.email, function(error, foundUser) {
      if (error) {
        database.close();
        console.log("error searching users collection by email");
        res.status(400).send(error);
        validData = false;
      } else if (foundUser !== null) {
        database.close();
        console.log("there is already a user with submitted email");
        res.status(400).send(error);
        validData = false;
      }
    });

    if (validData == true) { //only save if the data passes validation
      //put together data for new user into Document to store
      bcrypt.genSalt(10, function(error, salt) {
        if (error) {
          database.close();
          console.log("Disconnected from server, error generating salt");
        } else {
          bcrypt.hash(body.password, salt, function(error, hash) {
            if (error) {
              database.close();
              console.log(error);
              console.log("Disconnected from server, error hashing");
            } else {
              //user document to insert
              newUserDocument = { lastName : body.lastName,
                                  firstName: body.firstName,
                                  username: body.username,
                                  email : body.email, 
                                  passwordHash : hash,
                                  school: body.school,
                                  accountType: body.accountType,
                                };
              collectionDriver.save(collection, newUserDocument, function(error, documents) {
                if (error) {
                  res.status(400).send(error); //error
                } else {
                  res.status(200).send(documents); //success
                }

                database.close();
                console.log("Disconnected from server");
              });
            }
          });
        }
      });
    }
  });
});

//user login
/* req.body contents:
* username OR email
* password (will be hashed before checking db)
*/
app.post('/users/login', function(req, res) {
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var collection = "users";
    var email = req.body.email;
    var username = req.body.username;
    var submittedPassword = req.body.password;

    //use this function as callback from getting user by email or by username
    var getUserCallback = function(error, document) {
      if (error || document == null) {
        database.close();
        console.log("Disconnected from server, no user document with that email");
        res.status(400).send(error);
      } else {
        //compare submitted password against password hashed in user's document
        bcrypt.compare(submittedPassword, document.passwordHash, function(error, response) {
          if (error) {
            console.log("error comparing submission to pw hash in db");
            console.log("submitted password: " + submittedPassword);
            res.status(400).send(error);
          } else {
            console.log("checking passwords");
            if (response == true) {
              console.log("compare passed");

              //send login timestamp to loginAudit table
              collectionDriver.saveAuditUserLogin(document._id, document.username, function(error, auditResponse) {
                if (error || auditResponse == null) {
                  console.log("Error auditing login");
                  res.status(400).send(error);
                }
              });

              res.status(200).send(document)
            } else {
              console.log("compare failed");
              res.status(400).send(null);
            }
          }

          database.close();
          console.log("Disconnected from server, after comparison");
        });
      }
    }

    if (email) {
      //check if email exists in users collection
      collectionDriver.getUserByEmail(email, getUserCallback);
    } else if (username) {
      //check if username exists in users collection
      collectionDriver.getUserByUsername(username, getUserCallback);
    } else {
      console.log("Login requires email or username");
      res.status(400).send();
    }

    //Below is old code, prior to being able to login by email OR username
    //revert in case of major issues
    /*
    //first check if email exists in users collection
    collectionDriver.getUserByEmail(email, function(error, document) {
      if (error || document == null) {
        database.close();
        console.log("Disconnected from server, no user document with that email");
        res.status(400).send(error);
      } else {
        //compare submitted password against password hashed in user's document
        bcrypt.compare(submittedPassword, document.passwordHash, function(error, response) {
          if (error) {
            console.log("error comparing submission to pw hash in db");
            console.log("submitted password: " + submittedPassword);
            res.status(400).send(error);
          } else {
            console.log("checking passwords");
            if (response == true) {
              console.log("compare passed");

              //send login timestamp to loginAudit table
              collectionDriver.saveAuditUserLogin(document._id, document.username, function(error, auditResponse) {
                if (error || auditResponse == null) {
                  console.log("Error auditing login");
                  res.status(400).send(error);
                }
              });

              res.status(200).send(document)
            } else {
              console.log("compare failed");
              res.status(400).send(null);
            }
          }

          database.close();
          console.log("Disconnected from server, after comparison");
        });
      }
    });*/
  });
});

//////////////////////////
//PROJECT FUNCTIONS
//////////////////////////
//add a project
/* req.body contents:
* projectName
* authorId (string version of ObjectId of user creating project)
* projectType
* courseTitle
* instructor
* institution
* grade
* team
*/
app.post('/projects', function(req, res) {
  console.log("adding new project");
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var collection = "projects";
    var body = req.body;

    //data validation
    if (!body.projectName || !body.projectType) {
      res.status(400);
      database.close();
      console.log("Disconnected from database, invalid new project parameters");
    }

    var newProjectDocument = {ProjectName: body.projectName,
                              AuthorId: body.authorId,
                              ProjectType: body.projectType,
                              CourseTitle: body.courseTitle,
                              Instructor: body.instructor,
                              Institution: body.institution,
                              Grade: body.grade,
                              Team: body.team,
                              CurrentDesignStep: "1", //always starts at 1
                              InProgress: true //set to false on project completion (to be written)
                             };

    collectionDriver.save(collection, newProjectDocument, function(error, documents) {
      if (error) {
        res.status(400).send(error); //error
      } else {
        res.status(201).send(documents); //success
      }

      database.close();
      console.log("Disconnected from server in add project");
    });
  });
});

//update project's current design step
/* req.body contents:
* projecId (string version of objectId of project to be updated)
* step (step that project should be on now)
*/
app.post('/projects/update/step', function(req, res) {
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    //request body should contain a project ID and a step to update the project to
    var projectId = req.body.projectId;
    var updatedStep = req.body.step;

    //first get, the project to be updated
    collectionDriver.get("projects", projectId, function(error, document) {
      if (error) {
        database.close();
        console.log("Disconnected from server,error getting project with id sent");
        res.status(400).send(error);
      } else {
        //set CurrentDesignStep to updatedStep on the gotten document
        var updatedProject = document;
        updatedProject.CurrentDesignStep = updatedStep; 

        //send updated document back to db
        collectionDriver.update("projects", updatedProject, projectId, function(error, updatedDocument) {
          if (error) {
            console.log("error updating project");
            res.status(400).send(error);
          } else {
            console.log("project updated: " + updatedDocument);
            res.status(200).send(updatedDocument);
          }
          database.close();
          console.log("Disconnected from server");
        });
      }
    });
  });
});

//get all projects authored by a user
/* req.params
* authorId (string version of objectId of user who created project)
*/
app.get('/projects/:authorId', function(req, res) {
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var authorId = req.params.authorId;

    collectionDriver.getProjectsByAuthor(authorId, function(error, documents) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(201).send(documents);
      }

      database.close()
      console.log("Disconnected from server in getting projects by author id");
    });
  });
});

//get all unfinished projects by a user
/* req.params
* authorId (string version of objectId of user who created project)
*/
app.get('/finishedProjects/:authorId', function(req, res) {
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var authorId = req.params.authorId;

    collectionDriver.getFinishedProjectsByAuthor(authorId, function(error, documents) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(201).send(documents);
      }

      database.close()
      console.log("Disconnected from server in getting finished projects by author id");
    });
  });
});

//get all unfinished projects by a user
/* req.params
* authorId (string version of objectId of user who created project)
*/
app.get('/unfinishedProjects/:authorId', function(req, res) {
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var authorId = req.params.authorId;

    collectionDriver.getUnfinishedProjectsByAuthor(authorId, function(error, documents) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(documents);
      }

      database.close()
      console.log("Disconnected from server in getting unfinished projects by author id");
    });
  });
});

//////////////////////////
//GENERAL FUNCTIONS
//////////////////////////
//These are mostly leftovers from tutorial, good for development, probably best to remove in production

//get all objects in a collection
/* req.params
* collection (name of collection to get from)
*/
app.get('/:collection', function (req, res) {
  console.log("Request to get collection " + req.params.collection);
  MongoClient.connect(url, function(error, database) {
    assert.equal(null, error);
    console.log("Connected correctly to server");
    collectionDriver = new CollectionDriver(database);

    var params = req.params;

    console.log("query: " + req.query.callback);
    var callback = req.query.callback;

    collectionDriver.findAll(req.params.collection, function(error, objs) {
      if (error) {
        res.status(400).send(error);
      } else {
        console.log("objects requested from " + req.params.collection + " collection: ");
        console.log(objs);
        res.set('Content-Type', 'application/json');

        if (typeof callback !== 'undefined') {
          res.write(callback + '(' + objs + ')');
          res.end();
        } else {
          res.status(200).send(objs);
        }   
      }
      database.close()
      console.log("Disconnected from server");
    });
  });
});

//get single document form a collection
/* req.params
* collection (name of collection to get from)
* entity (string of objectId of document to get)
*/
app.get('/:collection/:entity', function(req, res) {
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;

  if (entity) {
    MongoClient.connect(url, function(error, database) {
      assert.equal(null, error);
      console.log("Connected correctly to server");
      collectionDriver = new CollectionDriver(database);

      collectionDriver.get(collection, entity, function(error, objs) {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send(objs);;
        }

        database.close();
        console.log("Disconnected from server");
      });
    });
  } else {
    res.status(400).send({error : 'bad url', url:req.url});
  }
});

//update single document form a collection
//as is, basically does a touch on the doc, no actual changes other than setting an "updatedAt" timestamp
/* req.params
* collection (name of collection to get from)
* entity (string of objectId of document to get)
*/
/*req.body contents
  match contents of document to be updated
*/
app.put('/:collection/:entity', function(req, res) {
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;

  if (entity) {
    MongoClient.connect(url, function(error, database) {
      assert.equal(null, error);
      console.log("Connected correctly to server");
      collectionDriver = new CollectionDriver(database);
      
      collectionDriver.update(collection, req.body, entity, function(error, objs) {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send(objs);;
        }

        database.close();
        console.log("Disconnected from server");
      });
    });
  } else {
    var error = {"message" : "Cannot PUT a whole collection"};
    res.status(400).send(error);
  }
});

//delete single document form a collection
/* req.params
* collection (name of collection to get from)
* entity (string of objectId of document to get)
*/
app.delete('/:collection/:entity', function(req, res) {
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;

  if (entity) {
    MongoClient.connect(url, function(error, database) {
      assert.equal(null, error);
      console.log("Connected correctly to server");
      collectionDriver = new CollectionDriver(database);

      collectionDriver.delete(collection, entity, function(error, objs) {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send(objs);;
        }

        database.close();
        console.log("Disconnected from server");
      });
    });
  } else {
    var error = {"message" : "Cannot DELETE a whole collection"};
    res.status(400).send(error);
  }
});

app.use(function (req, res) {
  res.render('404', {url:req.url});
});

//create server for incoming HTTP requests
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
