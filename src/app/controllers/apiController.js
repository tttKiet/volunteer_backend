import { apiUserService, apiPostService, apiWorkService } from "../../services";

class apiController {
  // [POST] /api/v1/login
  async handleLogin(req, res, next) {
    const { id, password } = req.body;
    const data = await apiUserService.authLogin(id, password);

    res.status(200).json(data);
  }

  // [GET] /api/v1/post
  async handleGetPost(req, res, next) {
    const id = req.query.id;
    const posts = await apiPostService.getPost(id);
    res.status(200).json(posts);
  }

  // [POST] /api/v1/post
  async handleUpPost(req, res, next) {
    const { userId, title, description } = req.body;
    if (!userId || !title || !description) {
      res.status(404).json({
        errCode: 3,
        errMessage: "Missing parameters!!",
      });
    }
    const data = { userId, title, description };
    const response = await apiPostService.upPost(data);
    res.status(200).json(response);
  }

  // [GET] /api/v1/work
  async handleGetWork(req, res, next) {
    const data = await apiWorkService.getWork();
    res.status(200).json(data);
  }

  // [PATCH]  /api/v1/work-browse
  async handleBrowse(req, res, next) {
    const idWork = req.body.id;
    if (!idWork) {
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing parameter: id !!",
      });
    }

    const response = await apiWorkService.workBrowse(idWork, 1);
    res.status(200).json(response);
  }

  // [GET]  /api/v1/work/get-name
  async handleGetNameWork(req, res, next) {
    const response = await apiWorkService.getNameWork("name");
    res.status(200).json(response);
  }

  // [GET]  /api/v1/work/browsed
  async handleGetWorkBrowsed(req, res, next) {
    const id = req.query.id;

    const response = await apiWorkService.getWork(1, id);
    res.status(200).json(response);
  }
}

export default new apiController();
