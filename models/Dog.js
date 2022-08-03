const { Schema, model } = require("mongoose");

const dogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    sex: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    for_sale: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Dog = model("dog", dogSchema);

module.exports = Dog;
