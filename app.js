
// Tweet API busca tweets con un hashtag determinado y regresa 
// los 10 ultimos tweets 

  var Twitter = require('twitter');
  var config = require('./config.js');
  var express = require("express");
  var path    = require("path");
  var app = express();
  var T = new Twitter(config);
  
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

  app.get('/search', function(req, res) {
  
    // Configuracion de parametros de busqueda
    var params = {
      q: '#cetys',
      count: 10,
      result_type: 'recent',
    }

    // Iniciar la busqueda con los parametros definidos
    T.get('search/tweets', params, function(err, data, response) {
      // Si no hay errores, sigue
      if(!err){
        var twtret = [];
        // recorrer todos los tweets encontrados
        for(let i = 0; i < data.statuses.length; i++){
          let twt = data.statuses[i]
          // Tomar el Id  del tweet
          let id = twt.id_str 
          // Tomar el nombre del usuario
          let usr = twt.user.name 
          // Tomar la foto del usuario
          let usrpic = twt.user.profile_image_url 
          // Tomar el texto del tweet
          let txt = twt.text 
          //console.log(`Tweet [${i}] - ID: ${id} - UserName: ${usr} - UserPic: ${usrpic}- Tweet Text: ${txt}`)
          twtret[i] = {rID:id,rUSR:usr,rPIC:usrpic,rTXT:txt}
        }
        console.log(`Data OK`)
        res.json( { twtret } );
      } else {
        console.log(err);
        rres.json( { err } );
      }
  })
});

var PORT = process.env.port || 3000;

app.listen(PORT, function() {
  console.log(`App running in port ${PORT}`);
});