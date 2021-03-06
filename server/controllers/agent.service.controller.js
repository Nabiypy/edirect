/**
 * Created by hanso on 01/06/2018.
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  Agent = require('../models/agent'),
  AgentController = {};


// create maker post
AgentController.addAgent = function (req, res) {
  var body = req.body;
  console.log("onboard agents request post >>>", body);

  db.sync().then(function () {
    var newPost = {
      userId: req.body.userId,
      gravatar: req.body.gravatar,
      firstName: req.body.firstName,
      otherNames: req.body.otherNames,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      mobile: req.body.mobile,
      email: req.body.email,
      education: req.body.education,
      region: req.body.region,
      city: req.body.city,
      town: req.body.town,      
      position: req.body.position,
      geolocation: req.body.geolocation
    };

    return Agent.create(newPost).then(function () {
      res.status(201).json({ message: 'Agent created successfully' });
    });
  }).catch(function (error) {
    console.log(error);
    res.status(403).json({ message: 'an error occured saving agent' });
  });
}
// get all agents post
AgentController.agents = function (req, res) {
    Agent.findAll()
    .then(function (agents) {
        res.status(200).json(agents);
        console.info('find all agents ~ ');
    })
    .catch(function (error) {
        res.status(500).json(error);
    });
}
//get agent by id
AgentController.agent = function (req, res) {
    Agent.findById(req.params.id)
    .then(function (agent) {
        res.status(200).json(agent);
        console.log('error: false ', 'message: get agent ~', agent);
    })
    .catch(function (error) {
        res.status(500).json(error);
    });
}

AgentController.updateAgent = (req, res) => {
    Agent.update(req.body, {
        where: { id: req.params.id }
    })
    .then(function (updatedRecords) {
        res.status(200).json(updatedRecords);
        console.log('updateRecords >>', updatedRecords)
    })
    .catch(function (error) {
        res.status(500).json(error);
    });
}
  //delete agent post
  AgentController.removeAgent = function (req, res) {
  Agent.destroy({
    where: { id: req.params.id }
  })
  .then(function (deletedRecords) {
    res.status(200).json(deletedRecords);
    console.log('error: false', 'message: deletedRecords ~ ', deletedRecords);
  })
  .catch(function (error) {
    res.status(500).json(error);
    console.log('error: true ', 'message: ', error)
  });
}

module.exports = AgentController;
