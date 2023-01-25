import db from "../app/models";

const getWork = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListUser.findAll({
        raw: true,
        nest: true,
        where: {
          status: 0,
        },
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

export default { getWork, workBrowse };
