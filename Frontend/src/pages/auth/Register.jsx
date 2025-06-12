import CommonForm from '@/components/common/Form';
import { registerFormControls } from '../../config/index';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import toast from 'react-hot-toast';


const initialState = {
  userName: '',
  email: '',
  password: ''
};

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData))
    .then((data) => {
      if(data?.payload?.success) {
        navigate('/auth/login')
        toast.success(data?.payload?.message);
      } else {
        toast.error("Something went wrong!")
      }
      console.log(data);
    });
  }

  // console.log(formData);

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>
          Already Have An Account?
          <Link to='/auth/login' className='text-primary hover:underline font-medium ml-2'>Login</Link>
        </p>
      </div>
      <CommonForm 
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister