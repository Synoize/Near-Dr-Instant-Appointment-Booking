import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    toast.loading(`${state === 'Sign Up' ? 'User signing...' : 'User logging...'}`)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, phone, email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)

          toast.dismiss()
          toast.success('Successfully registered')
        } else {
          toast.dismiss()
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)

          toast.dismiss()
          toast.success('Login successfully')
        } else {
          toast.dismiss()
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.dismiss()
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 w-full sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book instant appointment</p>

        {state === 'Sign Up' && (
          <div className='flex flex-col gap-3 w-full'>
            <div className='w-full'>
              <label htmlFor='name'>Full Name</label>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className='w-full'>
              <label htmlFor='phone'>Phone</label>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='number'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </div>
          </div>
        )}

        <div className='w-full'>
          <label htmlFor='email'>Email</label>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className='w-full'>
          <label htmlFor='password'>Password</label>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-primary text-white w-full py-2 rounded-md text-base'
        >
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-primary underline cursor-pointer'
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-primary underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
