import { accountServices } from "../../services";

class adminController {
  // [GET] /admin/create-account
  async createAccount(req, res, next) {
    const accounts = await accountServices.getAccount();
    return res.render("create-account", { accounts });
  }
}

export default new adminController();
