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
		function (quizes) {
		res.render('quizes/index.ejs', {quizes: quizes, errors: []});
	}
	).catch(function (error) {next(error)});
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
			{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema" }
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
	    //}
                //}
	// guarda en DB los campos pregunta y respuesta de quiz
	//quiz
     //.validate()
     //.then(
     	//function (err){
     		//if (err) {
            //res.render('quizes/new', {quiz: quiz, errors: err.errors});
     			//for (var prop in errors) errores[i++]={message: errors[prop]};	
     	    } else {
     	    	// save: guarda en DB campos pregunta y respuesta de quiz
     			quiz.save({fields: ["pregunta", "respuesta", "tema"]})
     			.then(function(){ res.redirect('/quizes')})
	   }	// res.redirect: Redireccion HTTP a la lista de preguntas
     // }
	//).catch(function(error){next(error)});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
 // Se crea una variable que contendrá el objeto quiz
  var quiz = req.quiz;

  // Se envía la vista edit que editará la pregunta actual
  res.render('quizes/edit', {quiz: quiz, errors: [] });
};

// PUT /quizes/:id
exports.update = function(req, res) {
  // Se cargan los datos que llegan del body
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

 // Para salvar el problema .then no existente en .validate
  var errors = req.quiz.validate();

  // Si hay errores, los tratamos
  if (errors) {
      // Se convierte errors en Array para poder tratarla con el código
      // propuesta en la práctica
      var errores = new Array();

      // Recorremos el nuevo Array de errores
      var i = 0;
      for (var prop in errors) errores[i++] = {message: errors[prop]};
      
      // Se reenvía la vista new con los errores encontrados
      res.render('quizes/new', {quiz: quiz, errors: errores});
  } else {
      // No hay error. Se guarda la pregunta en la DB
      // y se muestra la lista de preguntas actualizada
      req.quiz
      .save({fields: ["pregunta", "respuesta", "tema"]})
      .then( function() { res.redirect('/quizes')});
  }  
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function () {
  	res.redirect('/quizes');
  }).catch ( function(error){next(error)});
};








