module.exports = (err = 'Something went wrong!', code = 400) => {
  const error = new Error(err);
  error.name = 'ykError';
  error.code = code;
  return error;
};
