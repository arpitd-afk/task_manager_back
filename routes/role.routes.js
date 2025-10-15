const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roleController");

router.post("/addrole", RoleController.createRole);
router.get("/rolebyid/:id", RoleController.getRolesById);
router.put("/updaterole/:id", RoleController.updateRole);
router.delete("/deleterole/:id", RoleController.deleteRole);

module.exports = router;
