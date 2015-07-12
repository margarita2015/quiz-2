var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller'); //introducido fase primera pregunta

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId


router.get('/author', function(req, res) {  //introducido fase quiz-5-modificaciones finales, lineas 14-17
  //res.render('author', {layout:false} );
  res.render('author');
  });

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);

module.exports = router;
