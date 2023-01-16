import siteRouter from "./siteRouter";
import adminRouter from "./adminRouter";
import apiRouter from "./apiRouter";

const route = (app) => {
  app.use("/api", apiRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
};

export default route;
