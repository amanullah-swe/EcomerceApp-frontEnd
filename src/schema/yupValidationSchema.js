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

const productSchema = object({
    title: string().required(),
    description: string().required(),
    price: string().required(),
    discountPercentage: string().required(),
    rating: string().required(),
    stock: string().required(),
    brand: string().required(),
    category: string().required(),
    thumbnail: string().required(),
    image0: string().required(),
    image1: string().required(),
    image2: string().required(),
    image3: string().required(),
    image4: string().required(),
})
export { registerSchema, loginSchema, addressFormSchema, productSchema }