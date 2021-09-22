const { Schema } = require("mongoose");
const gravatar = require("gravatar");

const heroSchema = Schema({
  nickname: {
    type: String,
    minLength: 2,
    required: [true, "Set name for hero"],
  },
  real_name: {
    type: String,
    minLength: 2,
    required: [true, "Set real name for hero"],
  },
  origin_description: {
    type: String,
    minLength: 2,
    required: [true, "Set origin description for hero"],
  },
  superpowers: {
    type: [String],
    minLength: 2,
    required: [true, "Set superpowers for hero"],
  },
  catch_phrase: {
    type: String,
    minLength: 2,
    required: [true, "Set catch phrase for hero"],
  },
  images: {
    type: [String],
    default: function () {
      return gravatar.url(this.email, { s: 250 }, true);
    },
  },
});

module.exports = heroSchema;

// {"nickname": "Robin",
//  "real_name": "Robin Hood",
//   "origin_description": "Good man with good heart",
//   "superpowers": ["speed", "power", "knowledge"],
//   "catch_phrase": "Newer look back"}
