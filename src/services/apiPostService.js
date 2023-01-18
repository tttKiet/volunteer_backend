import db from "../app/models";

const getPost = (userId) => {
  let conditions = {};
  if (userId) {
    conditions = {
      where: {
        userId,
      },
    };
  }

  return new Promise(async (resolve, reject) => {
    try {
      const posts = await db.Post.findAll({
        ...conditions,
        raw: true,
        nest: true,
        attributes: {
          exclude: ["userId"],
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (posts) {
        resolve({
          errCode: 0,
          errMesagge: "",
          posts: posts,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default { getPost };
