import { accountServices } from "../../services";

class apiController {
  // [GET] /api/v1/accounts
  async getAccount(req, res, next) {
    const accounts = await accountServices.getAccount();
    return res.status(200).json({
      accounts,
    });
  }
}

export default new apiController();
