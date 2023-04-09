import db from "../app/models";
import { Sequelize } from "../app/models";
import uploadClound from "../middleWare/cloundiary";

const getPost = ({ userId, limit = 8 }) => {
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
        limit: limit,
        order: [
          ["createdAt", "DESC"],
          // ["name", "ASC"],
        ],
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
const upPost = (data) => {
  return new Promise(async (resolve, reject) => {
    const isHaveUser = await checkUserData(data.userId);
    let image;
    if (data.file && data.file?.path) {
      image = data.file.path;
    } else {
      image = data.file;
    }

    if (!isHaveUser) {
      resolve({
        errCode: 1,
        errMessage: `Không có người dùng ${data.userId} trong hệ thống!`,
      });
    }

    try {
      const newPost = db.Post.create({
        userId: data.userId,
        title: data.title,
        description: data.description,
        linkImage: image ? image : "",
      });

      if (newPost) {
        resolve({
          errCode: 0,
          errMesagge: "",
        });
      }

      resolve({
        errCode: 2,
        errMesagge: "Thất bại",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserData = (userId) => {
  let isHaveUser = false;

  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        isHaveUser = true;
      }
      resolve(isHaveUser);
    } catch (err) {
      reject(err);
    }
  });
};

const getDataStatisticalPost = ({ userId }) => {
  if (!userId) {
    return {
      errCode: 1,
      errMessage: "Người dùng không tồn trại (UserId)!",
    };
  }
  return new Promise(async (resolve, reject) => {
    try {
      const dataUser = await db.Post.findAll({
        raw: true,
        nest: true,
        attributes: [[Sequelize.fn("COUNT", "*"), "count"]],
        include: [
          {
            model: db.User,
            as: "user",
            where: {
              id: userId,
            },
          },
        ],
      });

      const dataTotal = await db.Post.findAll({
        raw: true,
        nest: true,
        attributes: [[Sequelize.fn("COUNT", "*"), "count"]],
      });

      return resolve({
        errCode: 0,
        errMessage: "Succses!",
        data: [dataUser[0].count, dataTotal[0].count],
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deletePostById = ({ id }) => {
  if (!id) {
    return {
      errCode: 2,
      errMessage: "Err! Không có id truyền vào",
    };
  }
  // https://res.cloudinary.com/djvlxywoe/image/upload/v1681002913/nienluan_image-post/a4wuiwqxnceeornkw9hn.jpg
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findOne({ where: { id: id } });
      let imgLink;

      if (post) {
        imgLink = post.dataValues.linkImage;
        post.destroy();

        resolve({
          errCode: 0,
          errMessage: "Ok!",
          data: post,
        });

        // Lay ten anh
        const strArr = imgLink.split("/");
        const strSplipDot = strArr[strArr.length - 1].split(".");
        const nameImg = "nienluan_image-post/" + strSplipDot[0];

        return uploadClound.storage.cloudinary.uploader.destroy(
          nameImg,
          (err, result) => {
            console.log(result);
            console.log(err);
          }
        );
      }

      return resolve({
        errCode: 1,
        errMessage: "không tìm thấy bài post!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default { getPost, upPost, getDataStatisticalPost, deletePostById };
