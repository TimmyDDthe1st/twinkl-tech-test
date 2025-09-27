export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface FormattedValidationError {
  error: string;
  details: ValidationErrorDetail[];
  fields: string[];
}
