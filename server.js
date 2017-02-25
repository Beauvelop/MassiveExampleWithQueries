var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var db = massive.connectSync({
  connectionString: 'postres://postgres:S3quence17@localhost/massive_demo3'
})

var app = express();
app.use(bodyParser.json());

var port = 8080;

app.get('/', function(req, res) {
  db.get_all_injuries(function(err, injuries) {
    res.send(injuries);
  })
});

app.get('/incidents', function(req, res) {
  var state = req.query.us_state;
  if (!state) {
    db.get_all_incidents(function(err, incidents) {
      res.send({
        incidents: incidents
      });
    });
  } else {
    db.get_incidents_by_state([state], function(err, incidents) {
      res.send({
        incidents: incidents
      })
    })
  }
});

app.post('/incidents', function(req, res) {
  // console.log("req.body", req.body);
  var incident = req.body;
  db.create_incident([
    incident.usState,
    incident.injuryID,
    incident.causeID
  ], function(err, result) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(result)
    }
  })
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
