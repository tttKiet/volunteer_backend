import { v4 as uuidv4 } from "uuid";
import db from "../app/models";
import Sequelize from "sequelize";
const { Op } = require("sequelize");

const getWork = ({ isChecked, id, userId, limit, typeTimeWork = "Doing" }) => {
  const conditions = {
    where: {
      status: isChecked ? 1 : 0,
    },
  };
  if (userId) {
    conditions.where.userId = userId;
    if (limit) {
      conditions.limit = limit;
    }
  }
  const conditionWork = {};
  if (id) {
    conditionWork.where = {
      id,
    };
  }
  if (typeTimeWork === "Doing") {
    if (conditionWork?.where) {
      conditionWork.where.startDate = { [Op.gte]: new Date() };
    } else {
      conditionWork.where = {
        startDate: { [Op.gte]: new Date() },
      };
    }
  } else if (typeTimeWork === "Done") {
    // Lay cv da lam
  }

  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListUser.findAll({
        ...conditions,
        raw: true,
        nest: true,
        attributes: {
          // include: [
          //   [Sequelize.fn("COUNT", Sequelize.col("work.id")), "workCount"],
          // ],
          exclude: ["userId", "workId"],
        },

        separate: true,

        include: [
          {
            model: db.User,
            as: "userWork",
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.VolunteerWork,
            as: "work",
            ...conditionWork,
          },
        ],
        order: [
          [
            {
              model: db.work,
            },
            "startDate",
            "ASC",
          ],
        ],
      });

      if (data.length > 0) {
        resolve({
          errCode: 0,
          errMessage: "",
          works: data,
        });
      }

      resolve({
        errCode: 1,
        errMessage: "Không có bản ghi nào phù hợp!",
        works: [],
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getVolunteerWork = ({ workId }) => {
  if (!workId) {
    return {
      errCode: 1,
      errMessage: "Không có Work Id",
    };
  }
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.VolunteerWork.findOne({
        raw: true,
        where: {
          id: workId,
        },
      });

      if (data) {
        resolve({
          errcode: 0,
          errMessage: "Ok",
          data: data,
        });
      } else {
        resolve({
          errcode: 2,
          errMessage: `Không tìm thấy công việc có id= ${workId}`,
        });
      }
    } catch (error) {
      console.log("error in file apiWorkService: ", error);
      reject(error);
    }
  });
};

const getWorkAndCountResquest = ({ workId }) => {
  const conditions = {
    where: {
      status: 0,
    },
  };

  const conditionWork = {};
  if (workId) {
    conditionWork.where = {
      id: workId,
    };
  }

  if (conditionWork?.where) {
    conditionWork.where.startDate = { [Op.gte]: new Date() };
  } else {
    conditionWork.where = {
      startDate: { [Op.gte]: new Date() },
    };
  }

  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListUser.findAll({
        ...conditions,
        raw: true,
        nest: true,
        attributes: {
          include: [
            [Sequelize.fn("COUNT", Sequelize.col("userWork.id")), "workCount"],
          ],
          exclude: ["userId", "workId"],
        },
        group: ["work.id"],

        separate: true,

        include: [
          {
            model: db.User,
            as: "userWork",
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.VolunteerWork,
            as: "work",
            ...conditionWork,
          },
        ],
        order: [
          [
            {
              model: db.work,
            },
            "startDate",
            "ASC",
          ],
        ],
      });

      if (data) {
        resolve({
          errCode: 0,
          errMessage: "",
          works: data,
        });
      }

      resolve({
        errCode: 1,
        errMessage: "Error apiWorkServices at backend",
        works: [],
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getNameWork = async ({
  type = "all",
  typeTimeWork = "Doing",
  workId,
  userId,
  softByUser = 0,
}) => {
  const conditionWork = {};
  var order;

  if (workId) {
    conditionWork.where = {
      id: workId,
    };
  } else {
    if (softByUser === 1 && userId) {
      var array = await getWorkUserReg({ userId: userId });

      if (array.data.length > 0) {
        order = [
          [
            Sequelize.literal(
              `CASE WHEN id IN (${array.data
                .map((id) => `"${id}"`)
                .join(",")}) THEN 0 ELSE 1 END`
            ),
            "DESC",
          ],
          ["startDate", "ASC"],
        ];
      } else {
        order = [["startDate", "ASC"]];
      }
    } else {
      order = [["startDate", "ASC"]];
    }
  }
  if (typeTimeWork === "Doing") {
    if (conditionWork?.where) {
      conditionWork.where.startDate = { [Op.gte]: new Date() };
    } else {
      conditionWork.where = {
        startDate: { [Op.gte]: new Date() },
      };
    }
  }
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.VolunteerWork.findAll({
        raw: true,
        ...conditionWork,
        order: [...order],
      });

      if (data.length > 0) {
        switch (type) {
          case "name": {
            const output = data.map((data) => {
              return {
                id: data.id,
                name: data.name,
              };
            });
            resolve({
              errCode: 0,
              errMessage: "",
              workNames: output,
            });
          }
          default: {
            resolve({
              errCode: 0,
              errMessage: "",
              workNames: data,
            });
          }
        }
      }
      resolve({
        errCode: 1,
        errMessage: "Không tìm thấy bản ghi phù hợp!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const workBrowse = (id, req) => {
  //req === 1 ? duyet
  return new Promise(async (resolve, reject) => {
    try {
      const work = await db.ListUser.findOne({ where: { id } });
      if (!work) {
        resolve({
          errCode: 2,
          errMessage: "Không có công việc tình nguyện này!",
        });
      }

      await work.set({
        status: req,
      });

      const res = await work.save();
      if (res) {
        const volunteerWork = await db.VolunteerWork.findOne({
          where: { id: work.dataValues.workId },
        });

        if (!volunteerWork) {
          resolve({
            errCode: 3,
            errMessage:
              "Không có công việc tình nguyện này trong table VolunteerWork!",
          });
        }

        const resVolunteerWork = await volunteerWork.increment("curStudent", {
          by: 1,
        });
        if (resVolunteerWork) {
          resolve({
            errCode: 0,
            errMessage: "",
          });
        } else {
          resolve({
            errCode: 5,
            errMessage: "Lổi VolunteerWork",
          });
        }
      }
      resolve({
        errCode: 4,
        errMessage: "Lổi server 500 apiWorkService (file)!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createWork = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (new Date(data.startDate) <= new Date()) {
        return resolve({
          errCode: 2,
          errMessage: "Ngày bắt đầu công việc phải là ngày trong tương lai!",
        });
      }

      const work = await db.VolunteerWork.create({
        id: uuidv4(),
        name: data.name,
        startDate: data.startDate,
        maxStudent: data.maxStudent,
        pointPlus: data.pointPlus,
        workPlace: data.workPlace,
        note: data.note ? data.note : null,
      });
      if (work) {
        resolve({
          errCode: 0,
          errMessage: "Created!",
        });
      }
      resolve({
        errCode: 3,
        errMessage: "Lổi server!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const registerWork = (workId, userId) => {
  return new Promise(async (resolve, reject) => {
    // Kiểm tra công việc và người dùng có tồn tại hay không
    const work = db.VolunteerWork.findOne({
      raw: true,
      where: {
        id: workId,
      },
    });
    const user = db.User.findOne({
      raw: true,
      where: {
        id: userId,
      },
    });

    Promise.all([work, user])
      .then(([work, user]) => {
        if (!work) {
          resolve({
            errCode: 1,
            errMessage: "Công việc này hiện không tồn tại hay vừa bị xóa!",
          });
        } else if (!user) {
          resolve({
            errCode: 1,
            errMessage: "Người dùng này hiện không tồn tại hay vừa bị xóa!",
          });
        }
      })
      .catch(reject);

    try {
      // Tìm xem trong bản ghi listUser có đăng ký người này chưa, nếu có thì thoát luôn
      const exitsRegister = await db.ListUser.findOne({
        raw: true,
        where: {
          workId,
          userId,
        },
      });
      if (exitsRegister) {
        resolve({
          errCode: 3,
          errMessage: "Bạn đã đăng ký công việc này rồi!",
        });
      } else {
        // Đăng ký cho người dùng này công việc TN
        const addList = await db.ListUser.create({
          workId: workId,
          userId: userId,
        });

        if (addList) {
          resolve({
            errCode: 0,
            errMessage: "Đăng ký thành công.",
          });
        }
        resolve({
          errCode: 2,
          errMessage: "Đăng ký thất bại, lỗi server!.",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserOfListWork = ({ id, userId }) => {
  if (!id) {
    return {
      errCode: 1,
      errMessage: "Không có id",
    };
  }

  if (!userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const listUser = await db.ListUser.findByPk(id);
        if (!listUser) {
          resolve({
            errCode: 2,
            errMessage: "Không tìm thấy dòng này!",
          });
        }

        await listUser.destroy();
        resolve({
          errCode: 0,
          errMessage: "Xóa thành công!",
        });
      } catch (e) {
        reject(e);
      }
    });
  } else {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(new Date().getDate() + 3);

    return new Promise(async (resolve, reject) => {
      try {
        const listUser = await db.ListUser.findOne({
          nest: true,
          where: {
            id,
          },
          include: [
            {
              model: db.VolunteerWork,
              as: "work",

              where: {
                startDate: {
                  [Op.gt]: threeDaysAgo,
                },
              },
            },
          ],
        });

        if (!listUser) {
          resolve({
            errCode: 2,
            errMessage:
              "Không thể hủy tham gia công việc này trước 3 ngày! Vui lòng liên hệ các Admin nếu có trường hợp khẩn!",
          });
        } else {
          const idWork = listUser.dataValues.workId;
          const work = await db.VolunteerWork.findByPk(idWork);
          const resVolunteerWork = await work.decrement("curStudent", {
            by: 1,
          });

          if (resVolunteerWork) {
            await listUser.destroy();
          }
        }

        resolve({
          errCode: 0,
          errMessage: "Xóa thành công!",
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};

const getWorkUserReg = ({ userId }) => {
  if (!userId) {
    return {
      errCode: 1,
      errMessage: "Không có userId",
    };
  }
  return new Promise(async (resolve, reject) => {
    try {
      const listWork = await db.ListUser.findAll({
        raw: true,
        where: { userId: userId },
      });

      return resolve({
        errCode: 0,
        errMessage: "Succses!",
        data: listWork.map((work) => work.workId),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDataStatisticalParReq = ({ year = new Date().getFullYear() - 1 }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listWorkPar = await db.ListUser.findAll({
        raw: true,
        nest: true,
        attributes: [
          [Sequelize.fn("MONTH", Sequelize.col("startDate")), "month"],
          [Sequelize.fn("COUNT", "*"), "count"],
        ],
        where: {
          status: 1,
        },
        include: [
          {
            model: db.VolunteerWork,
            as: "work",
            where: {
              startDate: Sequelize.literal(`YEAR(startDate) = ${year}`),
            },
          },
        ],
        group: [Sequelize.fn("MONTH", Sequelize.col("startDate"))],
      });
      let datqaPar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      listWorkPar.forEach((month) => {
        datqaPar[month.month - 1] = month.count;
      });

      const listWorkReq = await db.ListUser.findAll({
        raw: true,
        nest: true,
        attributes: [
          [Sequelize.fn("MONTH", Sequelize.col("startDate")), "month"],
          [Sequelize.fn("COUNT", "*"), "count"],
        ],
        where: {
          status: 0,
        },
        include: [
          {
            model: db.VolunteerWork,
            as: "work",
            where: {
              startDate: Sequelize.literal(`YEAR(startDate) = ${year}`),
            },
          },
        ],
        group: [Sequelize.fn("MONTH", Sequelize.col("startDate"))],
      });
      let datqaReq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      listWorkReq.forEach((month) => {
        datqaReq[month.month - 1] = month.count;
      });

      return resolve({
        errCode: 0,
        errMessage: "Succses!",
        data: {
          Par: datqaPar,
          Req: datqaReq,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getWork,
  getWorkUserReg,
  workBrowse,
  getNameWork,
  createWork,
  registerWork,
  deleteUserOfListWork,
  getVolunteerWork,
  getWorkAndCountResquest,
  getDataStatisticalParReq,
};
