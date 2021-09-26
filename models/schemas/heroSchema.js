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
    default: "uknown origin",
  },
  superpower: {
    type: String,
    minLength: 2,
    default: "no superpower",
  },
  catch_phrase: {
    type: String,
    minLength: 2,
    default: "no catch phrase",
  },
  image: {
    type: [String],
    // default: function () {
    //   return gravatar.url(this.email, { s: 250 }, true);
    // },
    default:
      "https://cdn.pixabay.com/photo/2019/12/07/21/26/boom-4680150_1280.png",
  },
});

module.exports = heroSchema;

// {"nickname": "Robin",
//  "real_name": "Robin Hood",
//   "origin_description": "Good man with good heart",
//   "superpowers": ["speed", "power", "knowledge"],
//   "catch_phrase": "Newer look back"}
