import { apiUserService, apiPostService } from "../../services";

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
}

export default new apiController();
