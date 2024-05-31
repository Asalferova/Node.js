function checkParams(scheme) {
    return (req, res, next) => {
      const result = scheme.validate(req.params);
      if (result.error) {
        return res.status(400).send(result.error.details);
      }
      next();
    };
  }
  
  function checkBody(scheme) {
      return (req, res, next) => {
        const result = scheme.validate(req.body);
        if (result.error) {
          return res.status(400).send(result.error.details);
        }
        next();
      };
  }
  
  module.exports = { checkParams, checkBody };