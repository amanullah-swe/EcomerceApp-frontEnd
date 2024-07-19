import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import { Link } from 'react-router-dom';
import { Pegination } from '../../../components/Pagination';
import ProductSkeleton from '../../../components/ProductSkeleton';
import { Apiconfig, BASE_URL } from '../../../api/ApiConfig';
import { handleSimpleGetCall } from '../../../api/ApiServicess';
import { selectAllBrands, selectAllCategories, selectProductsStatus } from '../productListslice';

const sortOptions = [
  { name: 'Best Rating', order: 'desc', sort: 'rating', current: false },
  { name: 'Price: Low to High', order: 'asc', sort: 'price', current: false },
  { name: 'Price: High to Low', order: 'desc', sort: 'price', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(0)
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const [loading, setLoading] = useState(false);


  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);

  const handleFilter = (e, index, optionIndex, option) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const newFilters = [...prevFilters];
      const filter = { ...newFilters[index] };
      const options = [...filter.options];
      const option = { ...options[optionIndex], checked: e.target.checked };

      options[optionIndex] = option;
      filter.options = options;
      newFilters[index] = filter;

      return newFilters;
    });
  }


  const handleSort = (e, option) => {
    e.stopPropagation()
    setSort({
      _sort: option.sort,
      _order: option.order
    })
  }

  const handlePage = (e, page) => {
    e.stopPropagation()
    setPage(page);
  }
  useEffect(() => {
    let queryString = '';

    filters.forEach(filter => {
      filter.options.forEach(option => {
        if (option.checked) {
          queryString += `${filter.id}=${option.value}&`;
        }
      });
    });
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    if (!loading) {
      fetchAllProducts(queryString);
    }

  }, [filters, sort, page]);

  const fetchAllProducts = (queryString = "") => {
    setLoading(true);
    handleSimpleGetCall(Apiconfig.GET_PRODUCTLIST + "?" + queryString + "&_limit=9" + "&_page=" + page)
      .then((res) => {
        if (res.success) {
          setProductList(res.data);
          setTotalItems(res.totalItems)
        } else {
          setProductList([]);
          setTotalItems(0)
        }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    setFilters([
      {
        id: 'brand',
        name: 'Brand',
        options: brands
      },
      {
        id: 'category',
        name: 'Category',
        options: categories
      },
    ])
  }, [categories, brands])
  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <MobileFilter handleFilter={handleFilter} setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen} filters={filters} />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                  )}
                                  onClick={e => handleSort(e, option)}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <DesktopFilters handleFilter={handleFilter} filters={filters} />

                  {/* Product grid */}
                  <ProductGrid products={productList} loading={loading} />

                </div>
              </section>

              {/* pagination component  */}
              <Pegination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems} />
            </main>
          </div>
        </div>
      </div>
    </div>

  );
}



function DesktopFilters({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block max-h-[600px] scroll-smooth overflow-y-auto direction-rlt ">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section, index) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6 ml-4 direction-ltr ">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}- ${optionIdx} `}
                        name={section.id}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, index, optionIdx, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter - ${section.id} -${optionIdx} `}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  )
}
function MobileFilter({ handleFilter, setMobileFiltersOpen, mobileFiltersOpen, filters }) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileFiltersOpen(false)
                  }}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section, index) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter - mobile - ${section.id} -${optionIdx} `}
                                  name={section.id}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) => { handleFilter(e, index, optionIdx, option) }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter - mobile - ${section.id} -${optionIdx} `}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

  );
}

function ProductGrid({ products, loading }) {

  const [imageError, setImageError] = useState(Array.from({ length: products.length }).map(() => true));
  useEffect(() => {
    setImageError(Array.from({ length: products.length }).map(() => true))
  }, [products])
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
            {loading ? (
              Array.from({ length: 6 }).map((el, index) => {
                return (
                  <ProductSkeleton key={index} />
                )
              })
            ) :
              (products && products.map((product, index) => (
                <Link to={`/product-details/${product.id}`} key={product.id}>
                  <div className="group relative border-solid border-gray-300 border-2 p-2">

                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-60">
                      {
                        imageError[index] ?
                          <img
                            src={BASE_URL + "/" + product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            onError={(e) => setImageError(prev => {
                              const data = [...prev]
                              data[index] = false;
                              return data;
                            })
                            }
                          />
                          :
                          <div role="status" class="space-y-8 md:space-y-0  md:flex h-full  md:items-center">
                            <div class="flex items-center justify-center w-full h-full rounded sm:w-96 dark:bg-gray-700">
                              <div class="flex items-center justify-center w-full h-full">
                                <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                      }
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <p href={product.thumbnail}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.title}
                          </p>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 flex align-center">
                          <StarIcon className='w-5 inline mr-1'></StarIcon><span className=''>{product.rating}</span></p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">₹ {Math.floor(product.price - product.price * (product.discountPercentage) / 100)}</p>
                        <p className="text-sm font-medium text-gray-400 line-through">₹ {product.price}</p>
                      </div>

                    </div>

                  </div>
                </Link>
              )))
            }
          </div>
        </div>
        {/* end of product list*/}
      </div>
    </div>
  )
}