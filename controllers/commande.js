var Commande = require("../models/commande");
const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
  // Check validation
  // body("id")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape()
  //   .withMessage("Id must be specified.")
  //   .isNumeric()
  //   .withMessage("Id must be a number."),

  body("commande")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Command must be specified.")
    .isAlphanumeric()
    .withMessage("command has non-alphanumeric characters."),

  body("dateCommand", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body("dateCommandEnd", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create client object with escaped and trimmed data
    var commande = new Commande({
      _id: req.body.id,
      commande: req.body.commande,
      dateCommand: req.body.dateCommand,
      dateCommandEnd: req.body.dateCommandEnd,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      commande.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("client created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Commande.find()
    .populate("client")
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Commande.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];

// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Commande.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("client deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("commande")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Command must be specified.")
    .isAlphanumeric()
    .withMessage("command has non-alphanumeric characters."),

  body("dateCommand", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body("dateCommandEnd", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create client object with escaped and trimmed data
    var commande = new Commande({
      _id: req.body.id,
      commande: req.body.commande,
      dateCommand: req.body.dateCommand,
      dateCommandEnd: req.body.dateCommandEnd,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Commande.findByIdAndUpdate(req.params.id, client, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("client updated successfully !");
      });
    }
  },
];
