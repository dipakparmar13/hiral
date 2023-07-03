const { Organization } = require("../models");
const { profilePhoto } = require("../service/index");
const path = require("path");

const addOrganization = async (req, res, next) => {
  try {
    const { id } = req.user;
    let organizationData;
    let Organization_profile;
    const organizationExist = await Organization.findOne({ user_id: id });
    if (organizationExist) {
      await Organization.updateOne(
        { user_id: organizationExist.user_id },
        req.body,
        {
          useFindAndModify: false,
        }
      ).then((organization) => {
        if (!organization) {
          res.status(404).send({
            message: `not updated`,
          });
        } else {
          res.json({
            success: 200,
            message: "Organization add successfully.",
          });
        }
      });
    } else {
      if (req?.files?.logo) {
        Organization_profile = await profilePhoto.profilePhoto(
          req.files.logo[0],
          "organization"
        );
        organizationData = {
          ...req.body,
          logo: Organization_profile,
        };
      }
      const organization = new Organization({
        user_id: id,
        ...organizationData,
      });
      organization.save(organization).then((data) => {
        res.json({
          success: 200,
          message: "organization successfully created!",
        });
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateOrganization = async (req, res, next) => {
  try {
    const { id } = req.user;
    let body = { ...req.body };
    delete body["id"];
    if (req.files?.logo) {
      const Organization_profile = await profilePhoto.profilePhoto(
        req.files.logo[0],
        "organization"
      );
      body = { ...body, logo: Organization_profile };
    }
    await Organization.findByIdAndUpdate(
      { user_id: id, _id: req.body.id },
      body,
      {
        useFindAndModify: false,
      }
    ).then((organization) => {
      if (!organization) {
        res.status(404).send({
          message: `not updated`,
        });
      } else {
        res.json({
          success: 200,
          message: "Organization updated successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteOrganizationProfile = async (req, res, next) => {
  try {
    const { id } = req.query;
    await Organization.findByIdAndUpdate(
      { _id: id },
      { logo: null },
      {
        useFindAndModify: false,
      }
    ).then((organization) => {
      if (organization) {
        res.json({
          success: 200,
          message: "Organization delete successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrganization = async (req, res, next) => {
  try {
    const { id } = req.user;
    const organization = await Organization.findOne({ user_id: id });
    if (organization) {
      res.status(200).json({
        status: 200,
        message: "fetch organization successfully",
        organization,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Something Went wrong with Retrieving data",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getOrganizationLogo = async (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../uploads/organization/thumb/" + req.params.logo)
  );
};
module.exports = {
  addOrganization,
  updateOrganization,
  getOrganization,
  getOrganizationLogo,
  deleteOrganizationProfile,
};
