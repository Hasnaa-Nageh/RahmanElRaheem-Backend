const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const zodErrors = result.error?.issues || []; 

    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: zodErrors.map(err => ({
        field: err.path.join(".") || "unknown",
        message: err.message,
      })),
    });
  }

  req.body = result.data; 
  next();
};

module.exports = validate;
