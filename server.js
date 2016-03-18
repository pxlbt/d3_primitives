var express = require('express');
var app = express();
var ListenPort = process.env.$PORT || 3333

app.set('views', './public');
app.use(express.static('public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.use(function(req, res){
  res.sendfile('./public/index.html');
});

app.listen(ListenPort, function () {
  console.log('Server started on port ' + ListenPort);
});
