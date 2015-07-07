var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller'); //introducido fase primera pregunta

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId


//router.get('/quizes/question', quizController.question); //introducido fase primera pregunta-quitado en autoload
//router.get('/quizes/answer',   quizController.answer);  //introducido fase primera pregunta-quitado en autoload

router.get('/author', function(req, res) {  //introducido fase quiz-5-modificaciones finales, lineas 14-17
  //res.render('author', {layout:false} );
  res.render('author');
  });-quitado en autoload

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
