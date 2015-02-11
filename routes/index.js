var express = require('express');
var router = express.Router();
var methodOverride= require('method-override');
var mongoose= require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(methodOverride('_method'));

/* GET home page. */
// router.get('/', function(req, res) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

/* GET Search page. */
router.get('/search', function(req, res) {
    var api_key = 'SEM3058C32211AA06D660EC18BA45F50FDAD';
    var api_secret = 'ZDAxYzgyMDhkZTUwZTgwOWRmMWE4OWJiYWUxZTg3ZjM';
    var sem3 = require('semantics3-node')(api_key, api_secret);
    sem3.products.products_field("search", req.query.searchKey);
    // sem3.products.products_field("search", "Water Bottle");  

    sem3.products.get_products(
        function(err, products) {
            if (err) {
                console.log("Couldn't execute query: get_products" +  err);
                return;
            }
             console.log("Results of query:\n" + products);
            // console.log("Results of query:\n" + JSON.stringify(products));

            //mongo start
            MongoClient.connect("mongodb://localhost:27017/Search", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
  var collection = db.collection('Keyword');
            var data={'keyword':req.query.searchKey};
            collection.insert(data, {w:1}, function(err, result) {});
});

            

           // mongoose.connect('mongodb://localhost/Search');
        //     var keySchema= new mongoose.Schema({

        //     keyword: String
        // });

        // var KeyStore= mongoose.model('Keyword', keySchema);
        // var userKey= new KeyStore({ keyword: req.query.searchKey});
        // userKey.save(function(err) { if(err) console.log('Error Occured')});

//mongo end

            res.send(products)
        }

    );



    // res.render('search', {
    //     title: 'This is Search page'
    // })
});

module.exports = router;
