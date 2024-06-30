import { useDispatch, useSelector } from 'react-redux'
import { createProductAsync, selectAllBrands, selectAllCategories, selectSelectedProduct, updateProductByIdAsync } from '../../products/productListslice'
import { useFormik } from 'formik'
import { productSchema } from '../../../schema/yupValidationSchema';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductByIdAsync } from '../adminSlice';
import { imageBreakImage } from '../../../assets/images';
import { array } from 'yup';
import { handlePatchMultipartRequest } from '../../../api/ApiServicess';
import { Apiconfig, BASE_URL } from '../../../api/ApiConfig';




export default function ProductForm() {
    const brands = useSelector(selectAllBrands);
    const categories = useSelector(selectAllCategories);
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector(selectSelectedProduct);



    const { handleChange, handleReset, handleBlur, setValues, resetForm, handleSubmit, setFieldValue, errors, touched, values } = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            rating: '',
            stock: '',
            brand: '',
            category: '',
            thumbnail: '',
            image0: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
        },
        validationSchema: productSchema,
        onSubmit: values => {
            const product = { ...values, stock: +values.stock, rating: +values.rating, discountPercentage: +values.discountPercentage, price: +values.price }
            const images = [values.image0, values.image1, values.image2, values.image3, values.image4];
            delete product.image0;
            delete product.image1;
            delete product.image2;
            delete product.image3;
            delete product.image4;
            delete product.images;
            if (id) {
                // dispatch(updateProductByIdAsync({ ...product, images, id }));
                // resetForm();
                const formData = new FormData();
                for (const key in product) {
                    if (product.hasOwnProperty(key)) {
                        // If the field is a file, append it directly
                        if (product[key] instanceof File) {
                            formData.append(key, product[key]);
                        } else if (Array.isArray(product[key])) {
                            // If the field is an array, append each element with the same key
                            product[key].forEach(item => formData.append(key, item));
                        } else {
                            // Otherwise, append the field as a string
                            formData.append(key, product[key]);
                        }
                    }
                }
                images.forEach((item, index) => {
                    formData.append("images", item);
                });
                // console.log({ ...product, images });
                handlePatchMultipartRequest(Apiconfig.UPDATE_PRODUCT_PATCH_REQUEST + product.id, formData).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
                return
            } else {
                dispatch(createProductAsync({ ...product, images }));
                resetForm();
                return;
            }
        },
    });

    const [formImages, setFormImages] = useState({});

    useEffect(() => {
        if (id) dispatch(fetchProductByIdAsync(id));
    }, [dispatch, id])

    useEffect(() => {
        if (id) {
            const images = {
                image0: product?.images[0],
                image1: product?.images[1],
                image2: product?.images[2],
                image3: product?.images[3],
                image4: product?.images[4],
            }
            setValues({ ...product, ...images });
        }
    }, [id, product]);


    const handleImageChange = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        setFieldValue(name, file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormImages(prev => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormImages(prev => ({ ...prev, [name]: null }));
        }
        // console.log(formImages);
        console.log("checking =================", values);
    };
    return (
        <form className='bg-white p-6' onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add new product</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-8 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2 col-span-full">
                                <div className="flex rounded-md shadow-sm ring-1 w-full ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block flex-1 border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    />
                                </div>
                            </div>
                            {errors.title && touched.title ? <p className='text-red-500'>{errors.title}</p> : null}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                            {errors.description && touched.description ? <p className='text-red-500'>{errors.description}</p> : null}

                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-0">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                        <div className="sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                />
                            </div>
                            {errors.price && touched.price ? <p className='text-red-500'>{errors.price}</p> : null}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                DiscountPercentage
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.discountPercentage}
                                    type="text"
                                    name="discountPercentage"
                                    id="discountPercentage"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.discountPercentage && touched.discountPercentage ? <p className='text-red-500'>{errors.discountPercentage}</p> : null}

                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                Rating
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.rating}
                                    id="rating"
                                    name="rating"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.rating && touched.rating ? <p className='text-red-500'>{errors.rating}</p> : null}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stock}
                                    id="stock"
                                    name="stock"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.stock && touched.stock ? <p className='text-red-500'>{errors.stock}</p> : null}
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.brand}
                                    id="brand"
                                    name="brand"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm -6"
                                >
                                    <option value=''>--Choose any brand</option>
                                    {
                                        brands.map((brand, index) => (
                                            <option key={index} value={brand.value}>{brand.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {errors.brand && touched.brand ? <p className='text-red-500'>{errors.brand}</p> : null}
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                category
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
                                    id="category"
                                    name="category"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value={''}>--Choose any category</option>
                                    {
                                        categories.map((category, index) => (
                                            <option key={index} value={category.value}>{category.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {errors.category && touched.category ? <p className='text-red-500'>{errors.category}</p> : null}

                        </div>

                        {/* thumbnail */}
                        <div className="col-span-full ">
                            <div className='flex justify-between'>
                                <p className="text-sm font-medium leading-6 text-gray-900 ">
                                    Thumbnail
                                </p>
                                <label
                                    htmlFor="thumbnail"
                                    className=' bg-purple-600 px-2 py-3 text-white rounded-md font-bold '
                                >Upload Thumbnail</label>
                            </div>

                            <input
                                accept="image/*"
                                multiple
                                // required
                                type="file"
                                // name='thumbnail'
                                id='thumbnail'
                                name="thumbnail"
                                className='sr-only'
                                // value={values.thumbnail}
                                onBlur={handleBlur}
                                onChange={handleImageChange}
                            />

                            {typeof (values.thumbnail) === "string" ?
                                <img
                                    src={values.thumbnail ? BASE_URL + values.thumbnail : imageBreakImage}
                                    alt='image'
                                    className='h-[200px]'
                                /> :
                                <img
                                    src={formImages?.thumbnail ? formImages?.thumbnail : imageBreakImage}
                                    alt='image'
                                    className='h-[200px]'
                                />
                            }
                            {errors.thumbnail && touched.thumbnail ? <p className='text-red-500'>{errors.thumbnail}</p> : null}
                        </div>

                        {
                            Array.apply(null, Array(4)).map((_, index) => (
                                <div className="col-span-full ">
                                    <div className='flex justify-between'>
                                        <p className="text-sm font-medium leading-6 text-gray-900 ">
                                            image {index}
                                        </p>
                                        <label
                                            htmlFor={"image" + index}
                                            className=' bg-purple-600 px-2 py-3 text-white rounded-md font-bold '
                                        >Upload {"Image " + index}</label>
                                    </div>

                                    <input
                                        accept="image/*"
                                        multiple
                                        // required
                                        type="file"
                                        id={"image" + index}
                                        name={"image" + index}
                                        className='sr-only'
                                        onBlur={handleBlur}
                                        onChange={handleImageChange}
                                    />

                                    {typeof (values["image" + index]) === "string" ?
                                        <img
                                            src={values["image" + index] ? BASE_URL + values["image" + index] : imageBreakImage}
                                            alt='image'
                                            className='h-[200px]'
                                        /> :
                                        <img
                                            src={formImages["image" + index] ? formImages["image" + index] : imageBreakImage}
                                            alt='image'
                                            className='h-[200px]'
                                        />
                                    }
                                    {/* <img
                                        src={formImages["image" + index] ? formImages["image" + index] : imageBreakImage}
                                        alt='image'
                                        className='h-[200px]'
                                    /> */}
                                    {errors["image" + index] && touched["image" + index] ? <p className='text-red-500'>{errors["image" + index]}</p> : null}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" onClick={handleReset} className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
