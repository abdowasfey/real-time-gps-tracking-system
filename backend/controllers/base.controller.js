const { Op } = require("sequelize");

/* ================= Ownership ================= */
const applyOwnership = (req, where, ownerField) => {
  if (!ownerField) return;
  if (req.user.role === "admin") return;

  where[ownerField] = req.user.id;
};

/* ================= GET ALL ================= */
exports.getAll = (Model, searchFields = [], options = {}) =>
  async (req, res) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search;

      const where = {};

      if (search && searchFields.length) {
        where[Op.or] = searchFields.map((f) => ({
          [f]: { [Op.like]: `%${search}%` },
        }));
      }

      applyOwnership(req, where, options.ownerField);

      const data = await Model.findAndCountAll({
        where,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      res.json({
        total: data.count,
        page,
        pages: Math.ceil(data.count / limit),
        data: data.rows,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

/* ================= GET ONE ================= */
exports.getOne = (Model, options = {}) =>
  async (req, res) => {
    try {
      const pk = Model.primaryKeyAttributes[0];
      const where = { [pk]: req.params.id };

      applyOwnership(req, where, options.ownerField);

      const item = await Model.findOne({ where });

      if (!item) return res.status(404).json({ message: "Not found" });

      res.json(item);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

/* ================= CREATE ================= */
exports.create = (Model, options = {}) =>
  async (req, res) => {
    try {
      if (options.ownerField && req.user.role !== "admin") {
        req.body[options.ownerField] = req.user.id;
      }

      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

/* ================= UPDATE ================= */
exports.update = (Model, options = {}) =>
  async (req, res) => {
    try {
      const pk = Model.primaryKeyAttributes[0];
      const where = { [pk]: req.params.id };

      applyOwnership(req, where, options.ownerField);

      const [updated] = await Model.update(req.body, { where });

      if (!updated) return res.status(404).json({ message: "Not found" });

      const item = await Model.findByPk(req.params.id);

      res.json(item);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

/* ================= DELETE ================= */
exports.remove = (Model, options = {}) =>
  async (req, res) => {
    try {
      const pk = Model.primaryKeyAttributes[0];
      const where = { [pk]: req.params.id };

      applyOwnership(req, where, options.ownerField);

      const deleted = await Model.destroy({ where });

      if (!deleted) return res.status(404).json({ message: "Not found" });

      res.json({ message: "Deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
