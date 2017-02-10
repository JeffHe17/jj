var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function(db) {
  this.db = db;
};

//get a single collection
CollectionDriver.prototype.getCollection = function(collectionName, callback) {
  this.db.collection(collectionName, function (error, collection) {
    if (error) {
      callback(error)
    } else {
      callback(null, collection);
    }
  });
};

//get all documents in a single collection
CollectionDriver.prototype.findAll = function (collectionName, callback) {
  this.getCollection(collectionName, function (error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.find().toArray(function (error, results) {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

//get a single document in a single collection
CollectionDriver.prototype.get = function(collectionName, id, callback) {
  this.getCollection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      if (!checkForHexRegExp.test(id)) {
        callback({error : "invalid id"});
      } else {
        collection.findOne({'_id' : ObjectID(id)}, function(error, document) {
          if (error) {
            callback(error);
          } else {
            callback(null, document);
          }
        });
      }
    }
  });
};

//get a single user that matches on email from users collection
CollectionDriver.prototype.getUserByEmail = function(email, callback) {
  this.getCollection("users", function(error, collection) {
    if (error) {
      callback(error);
    } else {
        collection.findOne({'email' : email}, function(error, document) {
          if (error) {
            console.log("findOne email error");
            callback(error);
          } else {
            callback(null, document);
          }
        });
    }
  });
};

//get a single user that matches on username from users collection
CollectionDriver.prototype.getUserByUsername = function(username, callback) {
  this.getCollection("users", function(error, collection) {
    if (error) {
      callback(error);
    } else {
        collection.findOne({'username' : username}, function(error, document) {
          if (error) {
            console.log("findOne username error");
            callback(error);
          } else {
            callback(null, document);
          }
        });
    }
  });
};

//audit logins (puts a record in loginAudit collection containing the userId, username, and time of login)
CollectionDriver.prototype.saveAuditUserLogin = function(userIdAudit, usernameAudit, callback) {
  this.getCollection("loginAudit", function(error, collection) {
    if (error) {
      callback(error);
    } else {
      var audit = {userId : userIdAudit,
                   username : usernameAudit,
                   loggedInAt : new Date()};
      collection.insert(audit, function() {
        callback(null, audit);
      });
    }
  });
}

//get all projects authored by user with objectId == authorId 
//(no cast of authorId to ObjectId because authorId field of doc is a string)
CollectionDriver.prototype.getProjectsByAuthor = function(authorId, callback) {
  this.getCollection("projects", function(error, collection) {
    if (error) {
      callback(error);
    } else {
      var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      if (!checkForHexRegExp.test(authorId)) {
        callback({error : "invalid AuthorId"});
      } else {
        collection.find({'authorId' : authorId}).toArray(function(error, documents) {
          if (error) {
            callback(error);
          } else {
            callback(null, documents);
          }
        });
      }
    }
  });
};

//get all finished (inProgress == false) projects authored by user with objectId == authorId 
CollectionDriver.prototype.getFinishedProjectsByAuthor = function(authorId, callback) {
  this.getCollection("projects", function(error, collection) {
    if (error) {
      callback(error);
    } else {
      var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      if (!checkForHexRegExp.test(authorId)) {
        callback({error : "invalid AuthorId"});
      } else {
        collection.find({'authorId' : authorId, 'inProgress' : false}).toArray(function(error, documents) {
          if (error) {
            callback(error);
          } else {
            callback(null, documents);
          }
        });
      }
    }
  });
};

//get all unfinished (inProgress == true) projects authored by user with objectId == authorId 
CollectionDriver.prototype.getUnfinishedProjectsByAuthor = function(authorId, callback) {
  this.getCollection("projects", function(error, collection) {
    if (error) {
      callback(error);
    } else {
      var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      if (!checkForHexRegExp.test(authorId)) {
        callback({error : "invalid AuthorId"});
      } else {
        collection.find({'authorId' : authorId, 'inProgress' : true}).toArray(function(error, documents) {
          if (error) {
            callback(error);
          } else {
            callback(null, documents);
          }
        });
      }
    }
  });
};

//put a single document into a collection
CollectionDriver.prototype.save = function(collectionName, obj, callback) {
  this.getCollection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      obj.created_at = new Date();
      collection.insert(obj, function() {
        callback(null, obj);
      });
    }
  });
};

//update a single document (delete and replace with obj) in a collection 
//Note that because it saves an object with an ObjectId that already exists in the collection,
//this will delete the old object!
CollectionDriver.prototype.update = function(collectionName, obj, entityId, callback) {
  this.getCollection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      obj._id = ObjectID(entityId);
      obj.updated_at = new Date();
      collection.save(obj, function(error, document) {
        if (error) {
          callback(error);
        } else {
          callback(null, obj);
        }
      });
    }
  });
};

//delete a single document from a collection
CollectionDriver.prototype.delete = function(collectionName, entityId, callback) {
  this.getCollection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.remove({'_id' : ObjectID(entityId)}, function (error, document) {
        if (error) {
          callback(error);
        } else {
          callback(null, document);
        }
      });
    }
  });
};

exports.CollectionDriver = CollectionDriver;