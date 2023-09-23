import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, FaceSmileIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Cart from '../cart/Cart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemsLength } from '../cart/cartSlice'
import { selectUserInfo } from '../user/userSlice'


// const user = {
//     name: 'Tom Cook',
//     email: 'tom@example.com',
//     imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
const navigation = [
    {
        name: 'Home', href: '/', role: 'user'
    },
    {
        name: 'Admin', href: '/admin', role: 'admin'
    },
    {
        name: 'Orders', href: '/admin/orders', role: 'admin'
    }
]
const userNavigation = [
    { name: 'Your Profile', href: '/my-profile', 'user': true },
    { name: 'My Orders', href: '/my-orders', 'user': true },
    { name: 'Sign Out', href: '/logout', 'user': true },
    { name: 'Sign In', href: '/login', 'user': false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
    const tempUser = useSelector(selectUserInfo);
    const imageUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
    const user = { ...tempUser, imageUrl };
    const [open, setOpen] = useState(false);
    const itemCount = useSelector(selectCartItemsLength);
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <Link to={'/'}>
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-8 w-8"
                                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                    alt="Your Company"
                                                />
                                            </div>
                                        </Link>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    user.role == item.role && <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 mr-3 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                onClick={() => {
                                                    setOpen(true);
                                                }}
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                            {itemCount > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                {itemCount}
                                            </span>}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            tempUser.role && item.user ? < Menu.Item key={item.name} >
                                                                {({ active }) => (
                                                                    <Link
                                                                        to={item.href}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                                : user.role === '' && item.user === false && < Menu.Item key={item.name} >
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to={item.href}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        user.role == item.role && <Disclosure.Button
                                            key={item.name}
                                            as="a"

                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            <Link to={item.href}> {item.name}</Link>
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full mr-3 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            onClick={() => {
                                                setOpen(true);
                                            }}
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        {itemCount > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3  bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{itemCount}</span>}
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            tempUser.role && item.user ? <Disclosure.Button
                                                key={item.name}
                                                as="a"

                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                <Link to={item.href} replace={true}>
                                                    {item.name}
                                                </Link>
                                            </Disclosure.Button>
                                                : user.role === '' && item.user === false && <Disclosure.Button
                                                    key={item.name}
                                                    as="a"

                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    <Link to={item.href} replace={true}>
                                                        {item.name}
                                                    </Link>
                                                </Disclosure.Button>))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">E-comerce</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <Cart setOpen={setOpen} open={open} />
                        {children}
                    </div>
                </main>
            </div >
        </>
    )
}
