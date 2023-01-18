import { accountServices, testService } from "../../services";

class adminController {
  // [GET] /admin/create-account
  async createAccount(req, res, next) {
    const accounts = await accountServices.getAccount();
    return res.render("create-account", { accounts });
  }

  // [GET] /admin/test/work-user
  async getWorkUser(req, res, next) {
    const test = await testService.getWorkUser("B2014754");
    return res.status(200).json(test);
  }
}

export default new adminController();
