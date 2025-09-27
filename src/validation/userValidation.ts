import Joi from "joi";
import { ValidationErrorDetail, FormattedValidationError } from '../types/validation';

export const signupSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters long",
    "string.max": "Full name must be less than 100 characters",
    "any.required": "Full name is required",
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be no more than 64 characters long",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
      "any.required": "Password is required",
    }),

  userType: Joi.string()
    .valid("student", "teacher", "parent", "private tutor")
    .required()
    .messages({
      "string.empty": "User type is required",
      "any.only":
        "User type must be one of: student, teacher, parent, private tutor",
      "any.required": "User type is required",
    }),
});

export const formatValidationErrors = (
  error: Joi.ValidationError
): FormattedValidationError => {
  const errors: ValidationErrorDetail[] = error.details.map((detail) => ({
    field: detail.path.join("."),
    message: detail.message,
  }));

  return {
    error: "Validation failed",
    details: errors,
    fields: errors.map((err) => err.field),
  };
};
