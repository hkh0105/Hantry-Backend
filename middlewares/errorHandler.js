const {
  TOKEN_DOES_NOT_EXIST,
  INVALID_TOKEN,
  UNAUTHORIZED_ACCESS,
  TOKEN_EXPIRED,
  INVALID_EMAIL,
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  NOT_LOGGED_IN,
} = require("../constants/errorConstants");

const errorHandler = (err, req, res, next) => {
  let error = { ...err, name: err.name, message: err.message };

  console.log(err.stack);

  switch (error.name) {
    case TOKEN_DOES_NOT_EXIST:
      return res.json({
        ok: false,
        status: 400,
        message: "인증 토큰이 존재하지 않습니다.",
      });
    case NOT_LOGGED_IN:
      return res.json({
        ok: false,
        status: 400,
        message: "로그인하지 않았습니다.",
      });
    case (INVALID_TOKEN, TOKEN_EXPIRED):
      return res.json({
        ok: false,
        status: 400,
        message: "유효하지 않은 인증 토큰입니다.",
      });
    case UNAUTHORIZED_ACCESS:
      return res.json({
        ok: false,
        status: 401,
        message: "미승인 유저입니다.",
      });
    case INVALID_EMAIL:
      return res.json({
        ok: false,
        status: 400,
        message: "이메일 양식이 올바르지 않습니다.",
      });
    case USER_DOES_NOT_EXIST:
      return res.json({
        ok: false,
        status: 400,
        message: "이메일 양식이 올바르지 않습니다.",
      });
    case FOUND_NO_FIELD:
      return res.json({
        ok: false,
        status: 400,
        message: "필드 이름이 없습니다.",
      });
    case FOUND_NO_DATA:
      return res.json({
        ok: false,
        status: 400,
        message: "업데이트할 데이터가 없습니다.",
      });
  }

  if (error.isOperational) {
    return res.json({
      ok: false,
      status: 400,
      message: error.name,
    });
  }

  res.json({
    ok: false,
    status: 500,
    message: "서버에 문제가 발생했습니다.",
  });
};

module.exports = errorHandler;
