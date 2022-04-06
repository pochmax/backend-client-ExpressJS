// https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var sudentSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  class: { type: String, required: true, enum: ["LP-DIM-FI", "LP-DIM-APP"] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  dateOfBirth: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
});

sudentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

sudentSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("client", sudentSchema);
