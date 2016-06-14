var express = require('express');
var router = express.Router();

//Including dependency
var Sequelize = require("sequelize");

var sequelize = new Sequelize('demo', 'root', 'mysql', {
	host: 'localhost',
  	dialect: 'mysql',
});


/* GET home page. */
router.get('/', function(req, res, next) {

	sequelize
	  .authenticate()
	  .then(function(err) {
	    console.log('Connection has been established successfully.');
	  })
	  .catch(function (err) {
	    console.log('Unable to connect to the database:', err);
	  });

	var User = sequelize.define('user', {
	  firstName: {
	    type: Sequelize.STRING,
	    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
	  },
	  lastName: {
	    type: Sequelize.STRING
	  }
	}, {
	  freezeTableName: true // Model tableName will be the same as the model name
	});

	User.sync({force: true}).then(function () {
	  // Table created
	  return User.create({
	    firstName: 'John',
	    lastName: 'Hancock'
	  });
	});

  res.render('index', { title: 'Express' });
});

router.get( '/usern', function(req, res, next) {

	var User = sequelize.define('user', {
		firstName: {
	    	type: Sequelize.STRING,
	    	field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
	  	},
	  	lastName: {
	    	type: Sequelize.STRING
	  	}
	}, {
		freezeTableName: true // Model tableName will be the same as the model name
	});

	var item1 = User.build({
		id:5,
		firstName: 'Juan',
		lastName: 'Choque'
	});

	item1.save().catch( function( err ) {
		if( err ) {
			console.log( 'Error inserting record ' + err.message );
		} else {
			console.log( 'Data successfully inserted' );
		}

	} );

	res.render('index', { title: 'Express' });
} );

module.exports = router;
