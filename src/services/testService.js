import db from "../app/models";

const getWorkUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await db.ListUser.findAll({  
        raw: true,
        nest: true,
        exclude: ["id"],
        include: [
          {
            model: db.User,
            as: "userWork",
          },
          {
            model: db.VolunteerWork,
            as: "work",
          },
        ],
      });
      resolve(accounts);
    } catch (error) {
      reject(error);
    }
  });
};

export default { getWorkUser };
