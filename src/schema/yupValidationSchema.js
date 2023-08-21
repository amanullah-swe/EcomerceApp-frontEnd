import { object, string, } from 'yup';
let registerSchema = object({
    name: string().required('Enter a name'),
    email: string().email().required('Enter a valide email'),
    password: string().min(8).max(16).required('Enter a valid password'),
});
let loginSchema = object({
    email: string().email().required('enter a valide email'),
    password: string().min(8).max(16).required('Enter a valid password'),
});

export { registerSchema, loginSchema }