exports.catchAsync = fn => {
  return (req, res, next) => {
    /* A catch block that catches any errors thrown by the function and logs them. */
    fn(req, res, next).catch(error => {
      console.log(
        `User - ${
          JSON.stringify(req.user) || 'Anonymous'
        }, Headers - ${JSON.stringify(req.headers)}, Body - ${JSON.stringify(
          req.body
        )}, Error - ${JSON.stringify(error)}`
      );
      next(error);
    });
  };
};
