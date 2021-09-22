const { Hero } = require("../models");

const getAllHeroes = (query) => {
  return Hero.find(query);
};

const getHero = (id) => {
  return Hero.findById(id);
};

const addHero = (body) => {
  return Hero.create(body);
};

const deleteHero = (id) => {
  return Hero.findByIdAndDelete(id);
};

const updateHero = (id, data) => {
  return Hero.findByIdAndUpdate(id, data);
};

module.exports = { getAllHeroes, getHero, addHero, deleteHero, updateHero };
