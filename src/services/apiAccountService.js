import db from "../app/models";

const authLogin = (user, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "User trống!",
        });
      } else if (!password) {
        resolve({
          errCode: 1,
          errMessage: "Password trống!",
        });
      }

      const userData = await db.Account.findOne({
        where: {
          user,
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
