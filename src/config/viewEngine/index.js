import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import appRootPath from "app-root-path";

const configViewEngine = (app) => {
  // path
  const rootAppPath = path.join(appRootPath.path, "src", "resources", "views");
  const publicPath = path.join(appRootPath.path, "src", "public");

  //   config statis
  app.use(express.static(publicPath));

  //   config engine
  app.engine("hbs", engine({ extname: "hbs" }));
  app.set("view engine", "hbs");
  app.set("views", rootAppPath);
};

export default configViewEngine;
