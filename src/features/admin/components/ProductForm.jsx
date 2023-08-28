import { useDispatch, useSelector } from 'react-redux'
import { createProductAsync, selectAllBrands, selectAllCategories, selectSelectedProduct, updateProductByIdAsync } from '../../products/productListslice'
import { useFormik } from 'formik'
import { productSchema } from '../../../schema/yupValidationSchema';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProductByIdAsync } from '../adminSlice';



export default function ProductForm() {
    const brands = useSelector(selectAllBrands);
    const categories = useSelector(selectAllCategories);
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector(selectSelectedProduct);



    const { handleChange, handleReset, handleBlur, setValues, resetForm, handleSubmit, errors, touched, values } = useFormik({
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
            if (id) {
                dispatch(updateProductByIdAsync({ ...product, images, id }));
                resetForm();
                return
            } else {
                dispatch(createProductAsync({ ...product, images }));
                resetForm();
                return;
            }
        },
    });

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

                        <div className="col-span-full">
                            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.thumbnail}
                                    type="text"
                                    name="thumbnail"
                                    id="thumbnail"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.thumbnail && touched.thumbnail ? <p className='text-red-500'>{errors.thumbnail}</p> : null}

                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image0" className="block text-sm font-medium leading-6 text-gray-900">
                                image0
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.image0}
                                    type="text"
                                    name="image0"
                                    id="image0"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.image0 && touched.image0 ? <p className='text-red-500'>{errors.image0}</p> : null}

                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                image1
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.image1}
                                    type="text"
                                    name="image1"
                                    id="image1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.image1 && touched.image1 ? <p className='text-red-500'>{errors.image1}</p> : null}

                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                image2
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.image2}
                                    type="text"
                                    name="image2"
                                    id="image2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.image2 && touched.image2 ? <p className='text-red-500'>{errors.image2}</p> : null}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                image3
                            </label>
                            <div className="mt-3">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.image3}
                                    type="text"
                                    name="image3"
                                    id="image3"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.image3 && touched.image3 ? <p className='text-red-500'>{errors.image3}</p> : null}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                                image4
                            </label>
                            <div className="mt-3">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.images}
                                    type="text"
                                    name="image4"
                                    id="image4"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.image4 && touched.image4 ? <p className='text-red-500'>{errors.image4}</p> : null}
                        </div>
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
