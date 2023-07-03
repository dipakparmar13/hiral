const express = require("express");
const {
  addOrganization,
  getOrganization,
  updateOrganization,
  getOrganizationLogo,
  deleteOrganizationProfile,
} = require("../controllers/organizationController");
const organizationValidation = require("../validations/organization.validation");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const organizationUpload = upload.fields([{ name: "logo" }]);

router
  .post(
    "",
    auth(),
    organizationUpload,
    // validate(organizationValidation.createOrganization),
    addOrganization
  )
  .patch(
    "",
    auth(),
    organizationUpload,
    // validate(organizationValidation.updateOrganization),
    updateOrganization
  )
  .get("", auth(), getOrganization);
router.get("/get/:logo", upload.none(), getOrganizationLogo);

router.delete(
  "/logo/delete",
  upload.none(),
  validate(organizationValidation.deleteOrganization),
  deleteOrganizationProfile
);

module.exports = {
  routes: router,
};
