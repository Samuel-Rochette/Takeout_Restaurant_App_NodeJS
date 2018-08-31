const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Items = require("../models/menuitem");

const menuRouter = express.Router();

menuRouter
  .route("/")
  .options((req, res) => {
    res.sendStatus;
  })
  .get((req, res, next) => {
    Items.find({})
      .then(
        items => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(items);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /menu");
  })
  .post((req, res, next) => {
    Items.create(req.body)
      .then(
        item => {
          console.log("Menu Item Created ", item);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Items.remove({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

menuRouter
  .route("/:itemId")
  .get((req, res, next) => {
    Items.findById(req.params.itemId)
      .then(
        item => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /menu/" + req.params.itemId);
  })
  .put((req, res, next) => {
    Items.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        item => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Items.findByIdAndRemove(req.params.itemId)
      .then(
        item => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = menuRouter;
