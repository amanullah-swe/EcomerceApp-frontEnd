import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByIdAsync, selectSelectedProduct } from '../productListslice'
import { createCartItemAsync, fetchCartItemsByUserIdAsync, selectCartError, selectCartItems } from '../../cart/cartSlice'
import { fetchLoddInUserAsync, selectUserInfo } from '../../user/userSlice'
import 'react-toastify/dist/ReactToastify.css';
import { Apiconfig, BASE_URL } from '../../../api/ApiConfig'
import { notificationMsg, notifyError, notifySuccess } from '../../../utils/toastify'
import { handleSimpleGetCall, handleSimplePostCall } from '../../../api/ApiServicess'

const colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]
const sizes = [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
]
const highlights = [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
]
const breadcrumbs = [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
]

// const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetial() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(selectUserInfo);
    const items = useSelector(selectCartItems);

    const [product, setProduct] = useState(null)

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (items.findIndex(item => item.product.id === product.id) < 0) {
            const newItem = { product: product.id, quantity: 1, user: user.id };
            // Dispatch the action and wait for the API response
            // dispatch(createCartItemAsync(newItem));
            handleSimplePostCall(Apiconfig.ADD_TO_CART, JSON.stringify(newItem))
                .then((res) => {
                    if (res.success) {
                        notifySuccess("Product added.");
                        dispatch(fetchCartItemsByUserIdAsync());
                    }
                    else {
                        notifyError(res.message)
                    }
                })
        } else {
            notificationMsg("Item already exists in the cart")
        }
    };



    useEffect(() => {
        handleSimpleGetCall(Apiconfig.GET_PRODUCT_BY_ID + id)
            .then(res => {
                if (res.success) {
                    setProduct(res.data)
                } else {
                    notifyError(res.message)
                }
            })
            .catch(err => {
                notifyError(res.message)
            })
    }, [id]);

    return (
        <>{product &&
            <div className="bg-white">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            {/* {breadcrumbs.map((breadcrumb) => (
                                    <li key={breadcrumb.id}>
                                        <div className="flex items-center">
                                            <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                                {breadcrumb.name}
                                            </a>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="h-5 w-4 text-gray-300"
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                ))} */}
                            <li className="text-sm">
                                <a href='#' aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {product?.title}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            {product?.images[0] ?
                                <img
                                    src={BASE_URL + "/" + product?.images[0]}
                                    alt={product?.title}
                                    className="w-full object-contain object-center h-[415px]"
                                    onError={() => {
                                        setProduct(prev => {
                                            const images = [...prev.images]
                                            images[0] = false;
                                            return ({
                                                ...prev,
                                                images
                                            })
                                        })
                                    }}
                                />
                                : <div role="status" class="space-y-8 md:space-y-0  md:flex md:items-center">
                                    <div class="flex items-center justify-center w-full h-[415px] rounded sm:w-96 dark:bg-gray-700">
                                        <div class="flex items-center justify-center w-full h-full">
                                            <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                {
                                    product?.images[1] ?
                                        <img
                                            src={BASE_URL + "/" + product?.images[1]}
                                            alt={product?.title}
                                            className="h-48 w-full object-contain object-center"
                                            onError={() => {
                                                setProduct(prev => {
                                                    const images = [...prev.images]
                                                    images[1] = false;
                                                    return ({
                                                        ...prev,
                                                        images
                                                    })
                                                })
                                            }}
                                        />
                                        :
                                        <div role="status" class="space-y-8 md:space-y-0  md:flex md:items-center">
                                            <div class="flex items-center justify-center w-full h-48 rounded sm:w-96 dark:bg-gray-700">
                                                <div class="flex items-center justify-center w-full h-full">
                                                    <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                {
                                    product?.images[2] ?
                                        <img
                                            src={BASE_URL + "/" + product?.images[2]}
                                            alt={product?.title}
                                            className="h-48 w-full object-contain object-center"
                                            onError={() => {
                                                setProduct(prev => {
                                                    const images = [...prev.images]
                                                    images[2] = false;
                                                    return ({
                                                        ...prev,
                                                        images
                                                    })
                                                })
                                            }}
                                        />
                                        :
                                        <div role="status" class="space-y-8 md:space-y-0  md:flex md:items-center">
                                            <div class="flex items-center justify-center w-full h-48 rounded sm:w-96 dark:bg-gray-700">
                                                <div class="flex items-center justify-center w-full h-full">
                                                    <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            {
                                product?.images[3] ?
                                    <img
                                        src={BASE_URL + "/" + product?.images[3]}
                                        alt={product?.title}
                                        className=" w-full object-contain object-center h-[415px]"
                                        onError={() => {
                                            setProduct(prev => {
                                                const images = [...prev.images]
                                                images[3] = false;
                                                return ({
                                                    ...prev,
                                                    images
                                                })
                                            })
                                        }}
                                    />
                                    :
                                    <div role="status" class="space-y-8 md:space-y-0  md:flex md:items-center">
                                        <div class="flex items-center justify-center w-full h-[415px] rounded sm:w-96 dark:bg-gray-700">
                                            <div class="flex items-center justify-center w-full h-full">
                                                <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                            }
                        </div>
                    </div>



                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">₹ {product.price} </p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    Math.floor(product.rating) > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}

                                    </div>
                                    {/* <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a> */}
                                </div>
                            </div>

                            {/* Colors */}

                            {/* <form className="mt-10">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                               
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </a>
                                </div>

                                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        {sizes.map((size) => (
                                            <RadioGroup.Option
                                                key={size.name}
                                                value={size}
                                                disabled={!size.inStock}
                                                className={({ active }) =>
                                                    classNames(
                                                        size.inStock
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        active ? 'ring-2 ring-indigo-500' : '',
                                                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                    )
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                        {size.inStock ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'border' : 'border-2',
                                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                            >
                                                                <svg
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    stroke="currentColor"
                                                                >
                                                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                        </form> */}
                            <button
                                onClick={handleAddToCart}
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to cart
                            </button>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        }
        </>
    )
}
