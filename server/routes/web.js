const espacosController = require('../controllers/espacosController');
const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');

const guest = require('../middleware/guest');
const auth = require('../middleware/auth');

function initRoutes(app){
    app.get('/', mainController.homepage);
    app.get('/about', mainController.about);

    app.get('/espacos', espacosController.espacos);
    app.get('/espacos/item/:id', espacosController.espacosView);
    app.put('/espacos/item/:id', espacosController.espacosUpdate);
    app.get('/espacos/search', espacosController.espacosSearch);
    app.post('/espacos/search', espacosController.espacosSearchSubmit);

    app.get('/dashboard', auth, dashboardController.dashboard);
    app.get('/dashboard/item/:id', dashboardController.dashboardView);
    app.put('/dashboard/item/:id', dashboardController.dashboardUpdate);
    app.delete('/dashboard/item-delete/:id', dashboardController.dashboardDelete);
    app.get('/dashboard/add', dashboardController.dashboardAdd);
    app.post('/dashboard/add', dashboardController.dashboardAddSubmit);
    app.get('/dashboard/search', dashboardController.dashboardSearch);
    app.post('/dashboard/search', dashboardController.dashboardSearchSubmit);

    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)
}

module.exports = initRoutes;