// https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var sudentSchema = new mongoose.Schema({
  // _id: { type: Number, required: true },
  commande: { type: String, required: true },
  dateCommand: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
  dateCommandEnd: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
  client: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
  ],
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
module.exports = mongoose.model("commande", sudentSchema);
