import CommonForm from '@/components/common/Form';
import { loginFormControls } from '../../config/index';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import toast from 'react-hot-toast';


const initialState = {
  email: '',
  password: ''
};

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData))
    .then((data) => {
      if(data?.payload?.success) {
        console.log(data.payload);
        toast.success(data?.payload?.message);
        if(payload.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/shop/home');
        }
        
      } else {
        toast.error("Something went wrong!");
      }
      console.log(data);
    });
  }

  console.log(formData);

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
        <p className='mt-2'>
          Don't Have An Account?
          <Link to='/auth/register' className='text-primary hover:underline font-medium ml-2'>Signup</Link>
        </p>
      </div>
      <CommonForm 
        formControls={loginFormControls}
        buttonText={'Login'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin