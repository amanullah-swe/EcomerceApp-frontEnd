import { useFormik } from 'formik';
import { registerSchema } from '../../../schema/yupValidationSchema';
import { useDispatch, } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Apiconfig } from '../../../api/ApiConfig';
import { handlePostMultipartRequest } from '../../../api/ApiServicess';
import { notifyError, notifySuccess } from '../../../utils/toastify';
function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const { handleChange, handleSubmit, handleBlur, errors, values } = useFormik({
        initialValues: { name: '', email: '', password: '', },
        validationSchema: registerSchema,
        onSubmit: values => {
            // dispatch(createUserAsync({ ...values, addresses: [], role: 'user' }));
            const formData = new FormData();
            formData.append("name", values.name)
            formData.append("email", values.email)
            formData.append("password", values.password)
            formData.append("profileImage", profileImage);
            handlePostMultipartRequest(Apiconfig.REGISTER_API, formData)
                .then((res) => {
                    if (res.success) {
                        navigate('/login');
                        notifySuccess(res.message);
                    } else {
                        notifyError(res.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        },
    });

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>


                <div className='flex flex-col items-center justify-center mt-3 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {
                        profileImage ? (
                            <div className='w-24 h-24 rounded-full overflow-hidden'>
                                <img
                                    src={URL.createObjectURL(profileImage)}
                                    className='w-full h-full object-cover'
                                    alt='Profile'
                                />
                            </div>
                        ) :
                            (
                                <div className=' w-[100px] h-[100px] rounded-full p-5 border-2'>
                                    <FontAwesomeIcon className='w-full h-full' icon={faUser} />
                                </div>
                            )
                    }
                    <input
                        type="file"
                        accept='.png,.jpeg, .jpg'
                        id='profilePic'
                        hidden
                        onChange={(e) => {
                            // console.log(e.target.files[0])
                            setProfileImage(e.target.files[0])
                        }}
                    />
                    <label htmlFor='profilePic' className='px-3 py-1 mb-1  mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-sm cursor-pointer'> Upload image</label>

                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.name ? <p className='text-red-500'>{errors.name}</p> : null}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email ? <p className='text-red-500'>{errors.email}</p> : null}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password ? <p className='text-red-500'>{errors.password}</p> : null}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        I have already account{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            sign in
                        </a>
                    </p>
                </div>
            </div></div >
    )
}

export default Register