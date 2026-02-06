const { z } = require("zod");

const visitSchema = z.object({
  date: z.coerce.date().optional(),

  doctorName: z
    .string()
    .min(3, "Doctor name must be at least 3 characters"),

  notes: z
    .string()
    .min(5, "Notes must be at least 5 characters")
    .max(500, "Notes must be less than 500 characters")
    .optional(),

  examType: z.enum(
    ["باطنه", "عظام", "نساء", "اطفال", "اسنان"],
    {
      errorMap: () => ({
        message: "Invalid exam type",
      }),
    }
  ),

  price: z
    .number()
    .nonnegative("Price must be positive"),
});

const patientSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters"),

  lastName: z
    .string()
    .min(3, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters"),

  phone: z
    .string()
    .regex(
      /^01[0-2,5]{1}[0-9]{8}$/,
      "Invalid Egyptian phone number"
    ),

  visits: z.array(visitSchema).optional(),
});

module.exports = { visitSchema, patientSchema };
