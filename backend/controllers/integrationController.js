const Integration = require("../models/Integration");

const addIntegration = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { supplier_id, supplier_stores, store } = req.body;
    const getintegration = await Integration.findOne({ user_id: id });
    if (getintegration) {
      await Integration.findByIdAndUpdate(
        { user_id: id, _id: getintegration.id },
        req.body,
        {
          useFindAndModify: false,
        }
      ).then((integration) => {
        if (!integration) {
          res.status(404).send({
            message: `not updated`,
          });
        } else {
          res.json({
            success: 200,
            message: "integration updated successfully.",
          });
        }
      });
    } else {
      const integration = new Integration({
        supplier_id: supplier_id,
        store: store, //in array,
        supplier_stores: supplier_stores,
        user_id: id,
      });
      integration.save(integration).then((data) => {
        res.json({
          success: 200,
          message: "integration successfully created!",
        });
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const updateIntegration = async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     let body = { ...req.body };
//     await Integration.findByIdAndUpdate(
//       { user_id: id, _id: req.body.id },
//       body,
//       {
//         useFindAndModify: false,
//       }
//     ).then((integration) => {
//       if (!integration) {
//         res.status(404).send({
//           message: `not updated`,
//         });
//       } else {
//         res.json({
//           success: 200,
//           message: "integration updated successfully.",
//         });
//       }
//     });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

const getIntegration = async (req, res, next) => {
  try {
    const { id } = req.user
    const integration = await Integration.findOne({user_id: id});
    if (integration) {
      res.status(200).json({
        status: 200,
        message: "fetch integration successfully",
        integration,
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
const deleteIntegration = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Integration.findByIdAndDelete({ _id: id }).then((integration) => {
      if (!integration) {
        res.status(404).send({
          message: `not updated`,
        });
      } else {
        res.json({
          success: 200,
          message: "integration delete successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addIntegration,
  // updateIntegration,
  getIntegration,
  deleteIntegration,
};
