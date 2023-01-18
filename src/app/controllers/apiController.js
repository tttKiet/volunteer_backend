import { apiUserService, apiPostService } from "../../services";

class apiController {
  // [POST] /api/v1/login
  async handleLogin(req, res, next) {
    const { user, password } = req.body;
    console.log("user: ", user);
    console.log("password: ", password);
    const data = await apiUserService.authLogin(user, password);

    res.status(200).json(data);
  }

  // [GET] /api/v1/post
  async handleGetPost(req, res, next) {
    const id = req.query.id;
    const posts = await apiPostService.getPost(id);
    res.status(200).json(posts);
  }
}

export default new apiController();
