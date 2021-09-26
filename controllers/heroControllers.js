const { hero: service } = require("../services");
const fs = require("fs").promises;
const jimp = require("jimp");
const path = require("path");

const getAllHeroes = async (req, res, next) => {
  const query = req.params;
  try {
    const heroes = await service.getAllHeroes(query);
    res.json({
      code: 200,
      status: "success",
      data: {
        heroes,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getHero = async (req, res, next) => {
  const { heroId } = req.params;

  try {
    const hero = await service.getHero(heroId);
    if (hero) {
      return res.json({
        code: 200,
        status: "success",
        data: {
          hero,
        },
      });
    } else {
      return res.json({
        code: 404,
        status: "error",
        message: "Hero not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const addHero = async (req, res, next) => {
  const { body } = req;
  const nickname = body.nickname;

  try {
    const newHero = {
      nickname,
      real_name: body.real_name,
      origin_description: body.origin_description,
      superpower: body.superpower,
      catch_phrase: body.catch_phrase,
      // image: body.image,
    };

    if (req.file) {
      const uploadDir = path.join(process.cwd(), "public/img");
      const { path: tempName, originalname } = req.file;
      const imgName = path.join(
        uploadDir,
        nickname + Date.now() + "." + originalname.split(".").pop()
      );
      const img = await jimp.read(tempName);
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(tempName);
      await fs.rename(tempName, imgName);
      newHero.images = imgName;
    }

    const hero = await service.getAllHeroes({ nickname });
    if (hero.length) {
      return res.status(409).json({
        code: 409,
        status: "conflict",
        message: "This hero already exists",
      });
    }
    const createdHero = await service.addHero(newHero);
    res.json({
      code: 201,
      status: "created",
      data: {
        createdHero,
      },
    });
  } catch (error) {
    // await fs.unlink(tempName);
    next(error);
  }
};

const deleteHero = async (req, res, next) => {
  const { heroId } = req.params;
  try {
    const hero = await service.getHero(heroId);
    if (!hero) {
      return res.json({
        code: 404,
        status: "error",
        message: "Not found",
      });
    } else {
      const result = await service.deleteHero(heroId);
      // result.images.forEach(async (img) => {
      //   await fs.unlink(img);
      // });
      res.json({
        code: 201,
        status: "success",
        message: "hero deleted",
        data: { result },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateHero = async (req, res, next) => {
  const { heroId } = req.params;

  try {
    const result = await service.updateHero(heroId, req.body);
    if (!result) {
      return res.json({
        code: 404,
        status: "error",
        message: "Not found",
      });
    }
    res.json({
      code: 200,
      status: "success",
      message: "hero updated",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllHeroes, getHero, addHero, deleteHero, updateHero };
