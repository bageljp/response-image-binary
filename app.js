const fs = require('fs');
const express = require('express');
const app = express();
const azure = require('azure-storage');

/* ----------------------------------------------------------
  Environment
---------------------------------------------------------- */
const port = 3000;
const blobSvc = azure.createBlobService();
const azureContainerName = 'blob-private';
const azureFilePath = 'test.png';

/* ----------------------------------------------------------
  Response static resource
---------------------------------------------------------- */
app.use('/static', express.static('public'));

/* ----------------------------------------------------------
  Hello World
---------------------------------------------------------- */
app.get('/', function (req, res) {
  res.send('Hello World!');
});

/* ----------------------------------------------------------
  Response content
---------------------------------------------------------- */
// response images
app.get('/assets/test.png', function (req, res) {
  fs.readFile('./assets/test.png', 'binary', 
    function (err, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data, 'binary');
      res.end();
    }
  );
});

// response html
app.get('/assets/iframe.html', function (req, res) {
  fs.readFile('./assets/iframe.html', 'UTF-8', 
    function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  );
});

// response stylesheets
app.get('/assets/style.css', function (req, res) {
  fs.readFile('./assets/style.css', 'UTF-8', 
    function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    }
  );
});

// response javascripts
app.get('/assets/test.js', function (req, res) {
  fs.readFile('./assets/test.js', 'UTF-8', 
    function (err, data) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(data);
      res.end();
    }
  );
});

/* ----------------------------------------------------------
  Azure Blob Storage
---------------------------------------------------------- */
// response images
app.get('/azure/test.png', function (req, res) {
  if (typeof(req.header('Authorization')) !== 'undefined') {
     console.log('HTTP Header: Authorization: ' + req.header('Authorization'));
  }
  blobSvc.getBlobProperties(azureContainerName, azureFilePath, 
    function (error, result, status) {
      if (error) {
        console.log('Error fetching blob file.');
      } else if (!status.isSuccessful) {
        console.log('File does not exist.');
      } else {
        //res.writeHead(200, {'Content-Type': 'image/png'});
        res.header('Content-Type', 'image/png');
        blobSvc.createReadStream(azureContainerName, azureFilePath).pipe(res);
      }
  });
});

/* ----------------------------------------------------------
  Listen
---------------------------------------------------------- */
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
