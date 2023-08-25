import { number, object, string, } from 'yup';
let registerSchema = object({
    name: string().required('Enter a name'),
    email: string().email().required('Enter a valide email'),
    password: string().min(8).max(16).required('Enter a valid password'),
});
let loginSchema = object({
    email: string().email().required('enter a valide email'),
    password: string().min(8).max(16).required('Enter a valid password'),
});

const addressFormSchema = object({
    firstName: string().required('Enter a name'),
    lastName: string().required('Enter a name'),
    email: string().email().required('Enter a valide email'),
    country: string().required('select a contory'),
    streetAddress: string().required('Enter a street address'),
    city: string().required('Enter a city'),
    pinCode: number().required('Enter a pincode'),
    region: string().required('enter state name'),
    phone: string().min(10).max(10).required('Enter Mobile number')
});
export { registerSchema, loginSchema, addressFormSchema }