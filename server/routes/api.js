'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController'),
    ReprocessController = require('../controllers/reprocessController'),
    NodeMailController = require('../controllers/nodeMailer'),
    HubtelServiceController = require('../controllers/hubtel.service.controller'),
    ContactServiceController = require('../controllers/contact.service.controller'),
    SosServiceController = require('../controllers/sos.service.controller'),
    AgentController = require('../controllers/agent.service.controller'),
    DirectoryController = require('../controllers/directory.server.controller');


var APIRoutes = function(passport) {
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);
    router.post('/repr', ReprocessController.doMaker);
    // POST Routes.
    // router.post('/repr', passport.authenticate('jwt', { session: false}), allowOnly(config.accessLevels.user, ReprocessController.doMaker));
    router.post('/authorize', ReprocessController.doTransaction);
    router.post('/remove', ReprocessController.removeMaker);
    router.post('/mail', NodeMailController.doPost);
    router.post('/receive', HubtelServiceController.receiveMoney);
    router.post('/send', HubtelServiceController.sendMoney);
    router.post('/savecontacts', ContactServiceController.saveContacts);
    router.post('/share', SosServiceController.shareLocation);
    router.post('/onboard', AgentController.addAgent);
    router.post('/directory', DirectoryController.createDirectory);
    router.post('/business', DirectoryController.createBusiness);

    

    // GET Routes.
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));
    router.get('/makers', ReprocessController.doGetAllMaker);
    router.get('/status', HubtelServiceController.geTranStatus);
    router.get('/contacts', ContactServiceController.contacts);
    router.get('/contact/:userId', ContactServiceController.contact);
    router.get('/contact/email/:email', ContactServiceController.contactByEmail);
    router.get('/locations', SosServiceController.locations);
    router.get('/location/:userId', SosServiceController.location);
    router.get('/location/account/:account', SosServiceController.locationByAccount);

    router.get('/agents', AgentController.agents);
    router.get('/agent/:id', AgentController.agents);
    router.put('/agent/update/:id', AgentController.updateAgent);
    router.delete('/agent/remove/:id', AgentController.removeAgent);

    router.get('/directories', DirectoryController.getDirectories);
    router.get('/directory/:id', DirectoryController.getDirectory);
    router.put('/directory/update/:id', DirectoryController.updateDirectory);
    router.delete('/directory/remove/:id', DirectoryController.removeDirectory);

    router.get('/businessess', DirectoryController.getBusinessess);
    router.get('/business/:id', DirectoryController.getBusiness);
    router.put('/business/update/:id', DirectoryController.updateBusiness);
    router.delete('/business/remove/:id', DirectoryController.removeBusiness);


    return router;
};

module.exports = APIRoutes;
