const CustomeError = require("../utils/CustomError");
const User = require("../model/User");
const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

const checkIsUser = async (name, email) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
    }).lean;
  }

  return user;
};

module.exports = { checkIsUser };
