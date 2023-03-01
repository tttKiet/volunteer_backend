import { apiUserService, apiPostService, apiWorkService } from "../../services";
const cloudinary = require("cloudinary").v2;

class apiController {
  // [POST] /api/v1/login
  async handleLogin(req, res, next) {
    const { id, password } = req.body;
    const data = await apiUserService.authLogin(id, password);

    res.status(200).json(data);
  }

  // [GET] /api/v1/post
  async handleGetPost(req, res, next) {
    const userId = req.query.id;
    const posts = await apiPostService.getPost({ userId });
    res.status(200).json(posts);
  }

  // [GET] /api/v1/get-all-post
  async handleGetAllPost(req, res, next) {
    const limit = Number.parseInt(req.query.limit) || 8;
    const posts = await apiPostService.getPost({ limit });
    res.status(200).json(posts);
  }

  // [POST] /api/v1/post
  async handleUpPost(req, res, next) {
    const { userId, title, description } = req.body;
    const file = req.file ? req.file : req.body.image;

    console.log("body---------------------", req.body);
    console.log("file---------------------", req.file);
    if (!userId || !title || !description) {
      if (file) {
        cloudinary.uploader.destroy(file.filename);
      }
      return res.status(200).json({
        errCode: 3,
        errMessage: "Missing parameters!!",
      });
    }
    const data = { userId, title, description, file };
    const response = await apiPostService.upPost(data);
    return res.status(200).json(response);
  }

  // [GET] /api/v1/work
  async handleGetWork(req, res, next) {
    const workId = req.query.workId;
    const data = await apiWorkService.getWork({ id: workId });
    res.status(200).json(data);
  }

  // [GET] /api/v1/work/get-and-count-resquest
  async handleGetWorkAndCountResquest(req, res, next) {
    const data = await apiWorkService.getWorkAndCountResquest({});
    res.status(200).json(data);
  }

  // [GET] /api/v1/work-user
  async handleGetWorkUser(req, res, next) {
    const userId = req.query.userId;
    const isChecked = req.query.isChecked;

    if (!userId) {
      res.status(200).json({
        errCode: 3,
        errMessage: "User trống!",
      });
    }
    const data = await apiWorkService.getWork({
      isChecked: 1,
      userId,
      isChecked,
    });
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
    const response = await apiWorkService.getNameWork({ type: "name" });
    res.status(200).json(response);
  }

  // [GET]  /api/v1/work/get-all
  async handleGetAllWork(req, res, next) {
    const { workId, userId } = req.query;
    if (userId) {
      const response = await apiWorkService.getNameWork({
        userId,
        softByUser: 1,
      });
      return res.status(200).json(response);
    }

    const response = await apiWorkService.getNameWork({ workId });
    return res.status(200).json(response);
  }

  // [GET]  /api/v1/work/browsed
  async handleGetWorkBrowsed(req, res, next) {
    const id = req.query.id;

    const response = await apiWorkService.getWork({
      isChecked: 1,
      id,
    });
    res.status(200).json(response);
  }

  // [POST]  /api/v1/work/create
  async handleCreateWork(req, res, next) {
    const { name, startDate, maxStudent, pointPlus, workPlace, note } =
      req.body;
    if (!name || !startDate || !maxStudent || !pointPlus || !workPlace) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing input!",
      });
    }
    const response = await apiWorkService.createWork({
      name,
      startDate,
      maxStudent,
      pointPlus,
      workPlace,
      note,
    });

    return res.status(200).json(response);
  }

  // [POST]  /api/v1/work/register
  async handleRegisterWork(req, res, next) {
    const { workId, userId } = req.body;
    if (!workId || !userId) {
      return res.status(404).json({
        errCode: 4,
        errMessage: "Thiếu tham số hay truyền chưa đúng!",
      });
    }
    const response = await apiWorkService.registerWork(workId, userId);
    return res.status(200).json(response);
  }

  // [DELETE]  api/v1/listUser/delete
  async handleDeleteListUser(req, res, next) {
    const id = req.body.id;
    const response = await apiWorkService.deleteUserOfListWork(id);
    res.status(200).json(response);
  }

  // [GET] api/v1/work-user-register
  async handleGetWorkUserRegister(req, res, next) {
    const response = await apiWorkService.getWorkUserReg({
      userId: req.query.userId,
    });
    res.status(200).json(response);
  }
}

export default new apiController();
