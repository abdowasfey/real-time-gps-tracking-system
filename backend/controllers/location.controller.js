const { Location } = require("../models");
const base = require("./base.controller");

exports.getAll = base.getAll(Location, ["name"], {
  ownerField: "user_id",
});

exports.getOne = base.getOne(Location, {
  ownerField: "user_id",
});

exports.create = base.create(Location, {
  ownerField: "user_id",
});

exports.update = base.update(Location, {
  ownerField: "user_id",
});

exports.remove = base.remove(Location, {
  ownerField: "user_id",
});
