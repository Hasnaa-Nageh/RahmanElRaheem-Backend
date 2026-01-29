const { z } = require("zod");


const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
  }),
});

module.exports = {
  loginSchema,
};
