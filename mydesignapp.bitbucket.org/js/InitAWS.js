var albumBucketName = 'beta.test.pdf';
var bucketRegion = 'us-west-2';
var IdentityPoolId = 'us-west-2:fed4d800-fd4f-4608-b4b1-dd2ab8e52ec1';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});


/*
 Sidenote:
	One way to organize S3 is for each class to be its own album. When a teacher creates a new class, a new album can be created. 
	Students can select a class, which will change the album selection. They can then upload to the correct album/class. 

	We need a album naming convenion that will prevent collisions. For the time being all of mydesign will use one album. 
 */

 