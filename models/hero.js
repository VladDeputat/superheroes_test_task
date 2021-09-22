const { model } = require("mongoose");

const heroSchema = require("./schemas/heroSchema");

const Hero = model("superheroes", heroSchema);

module.exports = Hero;
