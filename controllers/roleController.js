const Role = require("../models/role.model");

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Role Name is required" });
    }

    const result = await Role.createRole(name);
    res.status(201).json({
      statuscode: 0,
      Statusmessage: "Role created",
      RoleId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to create Role",
      details: error.message,
    });
  }
};

const getRolesById = async (req, res) => {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Role ID is required" });
    }

    const roles = await Role.getRoleByID(roleId);
    res.status(200).json({ statuscode: 0, statusmessage: "Success", roles });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to fetch roles",
      details: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Role ID is required" });
    }
    const { name } = req.body;
    await Role.updateRole(roleId, name);
    res.status(200).json({ statuscode: 0, Statusmessage: "Role updated" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to update Role",
      details: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      return res
        .status(400)
        .json({ statuscode: 1, Statusmessage: "Role ID is required" });
    }
    await Role.deleteRole(roleId);
    res.status(200).json({ statuscode: 0, Statusmessage: "Role deleted" });
  } catch (error) {
    res.status(500).json({
      statuscode: 1,
      error: "Failed to delete Role",
      details: error.message,
    });
  }
};

module.exports = {
  createRole,
  getRolesById,
  updateRole,
  deleteRole,
};
