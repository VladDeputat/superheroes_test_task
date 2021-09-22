const express = require("express");
const router = express.Router();
const controllers = require("../controllers/HeroControllers");
const upload = require("../helpers/imgUploader");

// const {
//   validateCreateHero,
//   validateUpdateHero,
// } = require("../helpers/validation");

router.get("/", controllers.getAllHeroes);

router.get("/:heroId", controllers.getHero);

router.post("/", upload.single("image"), controllers.addHero);

router.delete("/:heroId", controllers.deleteHero);

router.patch("/:heroId", upload.single("image"), controllers.updateHero);

// router.patch(
//   "/avatars",
//   upload.single("avatar"),
//   controllers.updateHeroImg
// );

module.exports = router;
