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

export default { getWork, workBrowse, getNameWork, createWork };
