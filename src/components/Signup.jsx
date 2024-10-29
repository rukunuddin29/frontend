import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import { Button,Input} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate=useNavigate();
    const [error,setError]=useState ('');
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();

    const create=async(data)=>{
        setError('')
        try {
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
      <div className='flex items-center justify-center'>
       <div>
        <div>logo</div>
        <h2>signup to create an account</h2>
        <p>Already have an account <Link to='/login' >sign in </Link></p>
        {error && <p className='text-red-600'>{error} </p>}

        <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label='Full Name'
                    placeholder='Enter Your Full Name'
                    {...register('name',{
                        required:true,
                        validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                    })}
                    />
                     <Input
                        label='password : '
                        type='password'
                        placeholder="enter Your password"
                        {...register('password',{
                            required:true,
                        })}
                     />
                     <Button type='submit'
                        className='w-full'>
                        
                     Create Account</Button>
                </div>
        </form>
       </div>

      </div>
  )
}

export default Signup