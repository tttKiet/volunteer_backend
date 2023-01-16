import { accountServices, apiAccountServices } from "../../services";

class apiController {
  // [GET] /api/v1/accounts
  async getAccount(req, res, next) {
    const accounts = await accountServices.getAccount();
    return res.status(200).json({
      accounts,
    });
  }

  // [POST] /api/v1/login
  async handleLogin(req, res, next) {
    const { user, password } = req.body;
    console.log("user: ", user);
    console.log("password: ", password);
    const data = await apiAccountServices.authLogin(user, password);

    res.status(200).json(data);
  }
}

export default new apiController();
