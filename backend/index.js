const express = require("express");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const cron = require("node-cron");
const { Order, VerifyOTP, Category } = require("./models");
const moment = require("moment");

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

const config = require("./utils/config");
const categories = require("./utils/categories.json");

const app = express();
const http = require("http").createServer(app);

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("routes"));

const port = config.port || 4001;
const basePath = process.env.isStaging === "Staging" ? "/" : "/api";
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.status().send(200);
});

app.get("/seeder", async function (req, res) {
  try {
    categories.forEach(async (element) => {
      const existingCategory = await Category.findOne({
        category_name: element.category_name,
      });
      if (!existingCategory) {
        element.created_date = new Date();
        await Category.create(element);
      }
    });
    return res.status(200).send("All categories added.");
  } catch (err) {
    console.error(err);
  }
});

const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const orderRoute = require("./routes/orderRoute");
const invitationRoute = require("./routes/invitationRoute");
const integrationRoute = require("./routes/integrationRoute");
const supplierRoute = require("./routes/supplierRoute");
const productRoute = require("./routes/productRoute");
const organizationRoute = require("./routes/organizationRoute");

// create for eta function
const cronJobRoute = require("./routes/cronJobRoute");

// create for swagger doc
const swaggerDocOptions = {
  explorer: true,
  definition: {
    swagger: "2.0",
    components: {
      securitySchema: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      title: "Neobox API",
      version: "1.0.0",
      description: "neobox API",
    },
    basePath: `${process.env.IS_STAGING === "Staging" ? "/api" : "/"}`,
    schemes: ["https", "http"],
    security: [
      {
        Bearer: [],
      },
    ],
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description:
          "Enter your bearer token in the format **Bearer &lt;token>**",
      },
    },
  },
  basedir: `${__dirname}`,
  apis: ["./routes/*.js", "./validations/*.js"],
};

const specs = swaggerJsdoc(swaggerDocOptions);

app.use("/auth", authRoute.routes);
app.use("/customer", customerRoute.routes);
app.use("/invitation", invitationRoute.routes);
app.use("/order", orderRoute.routes);
app.use("/product", productRoute.routes);
app.use("/integration", integrationRoute.routes);
app.use("/supplier", supplierRoute.routes);
app.use("/cron", cronJobRoute.routes);
app.use("/organization", organizationRoute.routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/images", express.static("templates/templateImages"));

// After 3 days no any progress then convert processing to Processed  Handle Function
cron.schedule("* 23 * * *", async function () {
  let d = new Date();
  const end = d.setDate(d.getDate() - 3);
  const order = await Order.find({
    created_at: { $lte: new Date(moment(end).format("YYYY-MM-DD")) },
  });
  order.map(async (item) => {
    if (item.order_status == "Processing" || item.user_paid_fees == 0) {
      await Order.findByIdAndUpdate(
        { _id: item._id },
        {
          shipment_order: [
            {
              address: item.shipment_order[0].address,
              bgcolor: "#E5F3FF",
              color: "#0085FF",
              label: "Processing",
              order_id: item._id,
              statusCode: 0,
              value: "Processing",
              createdAt: new Date(),
            },
            {
              address: item.shipment_order[0].address,
              bgcolor: "#E5F8EB",
              color: "#00BA34",
              label: "Ready to ship",
              order_id: item._id,
              statusCode: 1,
              value: "Ready to ship",
              createdAt: new Date(),
            },
            {
              address: item.shipment_order[0].address,
              bgcolor: "lightgray",
              color: "black",
              label: "Processed",
              order_id: item._id,
              statusCode: 2,
              value: "Processed",
              createdAt: new Date(),
            },
          ],
        },
        {
          useFindAndModify: false,
        }
      );
    }
  });
});

// Render every 24 hrs and delete 10 before OTPs
cron.schedule("* 23 * * *", async function () {
  let d = new Date();
  const end = d.setMinutes(d.getMinutes() - 10);
  const otps = await VerifyOTP.find({
    created_at: { $lt: end },
  });
  otps.map(async (item) => {
    VerifyOTP.deleteOne({ _id: item._id });
  });
});

http.listen(port, function (error) {
  if (error) throw error;
  console.log("Server created Successfully", port);
});
