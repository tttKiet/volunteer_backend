import siteRouter from "./siteRouter";

const route = (app) => {
  app.use("/", siteRouter);
};

export default route;
