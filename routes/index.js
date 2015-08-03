var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller'); //introducido fase primera pregunta
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

// Definición de rutas de sesión
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión


router.get('/author', function(req, res) {  //introducido fase quiz-5-modificaciones finales, lineas 14-17
  //res.render('author', {layout:false} );
  res.render('author', {errors:[]});
  });

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
