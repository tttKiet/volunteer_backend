import db from "../app/models";

const authLogin = (id, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Id trống!",
        });
      } else if (!password) {
        resolve({
          errCode: 1,
          errMessage: "Password trống!",
        });
      }

      const userData = await db.User.findOne({
        where: {
          id,
          password,
        },
        raw: true,
      });
      if (!userData) {
        resolve({
          errCode: 2,
          errMessage: "Tên đăng nhập hoặc mật khẩu không đúng!",
        });
      }

      delete userData.password;
      resolve({
        errCode: 0,
        errMessage: "",
        userData: userData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default { authLogin };
