const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user != null) {
        next(new ApiError('User already registered', 400));
      } else {
        user = new User({
          email: req.body.email,
          password: req.body.password
        });

        user
          .save()
          .then(() => {
            res.redirect('/login');
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              new ApiError(error.errors, 400);
            } else {
              next(error);
            }
          });
      }
    })
    .catch(error => next(error));
}