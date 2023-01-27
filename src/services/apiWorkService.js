import { v4 as uuidv4 } from "uuid";
import db from "../app/models";

const getWork = (isChecked = 0, id) => {
  const conditions = {
    where: {
      status: isChecked ? 1 : 0,
    },
  };
  const conditionWork = {};
  if (id) {
    conditionWork.where = {
      id,
    };
  }
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListUser.findAll({
        raw: true,
        nest: true,
        ...conditions,
        attributes: {
          exclude: ["userId", "workId"],
        },
        order: [
          // ["status", "ASC"],
          // ["name", "ASC"],
        ],
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
            order: [["name", "ASC"]],
          },
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

const getNameWork = (type = "all") => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.VolunteerWork.findAll({ raw: true });
      if (data) {
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
            resolve(
              resolve({
                errCode: 0,
                errMessage: "",
                workNames: data,
              })
            );
          }
        }
      }
      resolve({
        errCode: 1,
        errMessage: "Lổi server apiWorkService!",
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
      const work = await db.VolunteerWork.create({
        id: uuidv4(),
        name: data.name,
        startDate: data.startDate,
        maxStudent: data.maxStudent,
        pointPlus: data.pointPlus,
        workPlace: data.workPlace,
      });
      if (work) {
        resolve({
          errCode: 0,
          errMessage: "Created!",
        });
      }
      resolve({
        errCode: 2,
        errMessage: "Lổi server!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const registerWork = (workId, userId) => {
  console.log("Register", workId, userId);

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

    // Tìm xem trong bản ghi listUser có đăng ký người này chưa, nếu có thì thoát luôn
    db.ListUser.findOne({
      raw: true,
      where: {
        workId,
        userId,
      },
    })
      .then((res) => {
        if (res) {
          resolve({
            errCode: 3,
            errMessage: "Bạn đã đăng ký công việc này rồi!",
          });
        }
      })
      .catch(reject);

    // Đăng ký cho người dùng này công việc TN
    try {
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
    } catch (e) {
      reject(e);
    }
  });
};

export default { getWork, workBrowse, getNameWork, createWork, registerWork };
