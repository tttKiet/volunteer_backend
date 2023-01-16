import db from "../app/models";

const getAccount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await db.Account.findAll({ raw: true });
      resolve(accounts);
    } catch (error) {
      reject(error);
    }
  });
};

export default { getAccount };
