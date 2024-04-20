import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address') // Validation for the email format
    .required('Email is required'), // Validation for the required field
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters') // Minimum length validation
    .required('Password is required'), // Validation for the required field
});