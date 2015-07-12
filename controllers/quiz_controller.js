var models = require('../models/models.js'); 

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
        function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else{ next(new Error('No existe quizId= ' + quizId));}
		}
		).catch(function(error) { next(error)});
}

// GET /quizes
exports.index = function(req, res) { 
	
//var search = '%'+req.query.search +'%';
	  models.Quiz.findAll().then(   
		//models.Quiz.findAll({where: ["pregunta like ?", search], order: "pregunta ASC"}).then(
		function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes, errors: []});
	}
	).catch(function(error) {next(error)});
  };


// GET /quizes/:id
exports.show = function(req, res) {
	//models.Quiz.find(req.params.quizId).then(function(quiz) {
 	res.render('quizes/show', { quiz: req.quiz, errors: []});
 //})
    };




//GET /quizes/:id/answer
exports.answer = function(req, res) {
     	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta)  {
		resultado = 'Correcto';
	}
	    res.render(
	    	'quizes/answer', 
	    	{ quiz: req.quiz, 
	    	  respuesta: resultado,
	    	  errors: []
	    	}
	    	);
	
	};

	// GET /quizes/new
	exports.new = function(req, res) {
		var quiz = models.Quiz.build( //crea objeto quiz
			{pregunta: "Pregunta", respuesta: "Respuesta"}
			);

		res.render('quizes/new', {quiz: quiz, errors: []});
	};

	// POST /quizes/create
	exports.create = function(req, res) {
		var quiz = models.Quiz.build( req.body.quiz );

		var errors = quiz.validate(); //Ya que el objeto errors no tiene then (
	    if (errors)
	    {

	    	var i=0; var errores=new Array();
	    	for (var prop in errors) errores[i++]={message: errors[prop]};
	    	res.render('quizes/new', {quiz: quiz, errors: errores});	
	   // }

	// guarda en DB los campos pregunta y respuesta de quiz
	//quiz
     //.validate()
     //.then(
     	//function(err){
     	//	if (err) {
          //      res.render('quizes/new', {quiz: quiz, errors: err.errors});
     			//for (var prop in errors) errores[i++]={message: errors[prop]};	
     	    } else {
     			quiz // save: guarda en DB campos pregunta y respuesta de quiz
     		    .save({fields: ["pregunta", "respuesta", "tema"]})
     		    .then(function(){ res.redirect('/quizes')})
	   //}	// res.redirect: Redireccion HTTP a la lista de preguntas
      }
	//);
};