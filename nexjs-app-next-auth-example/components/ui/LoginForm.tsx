'use client';
/***
 * https://github.com/wpcodevo/nextauth-nextjs13-prisma
 */
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';



export const LoginForm = ({csrfToken}: {csrfToken: string | undefined}) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  const { status } = useSession()

  React.useEffect(()=>{
    if (status  === 'authenticated') {
      router.push(callbackUrl);
  }
  },[status,router,callbackUrl])


  const [loading, setLoading] = useState({
    accLoading: false,
    googleLoading: false,
    facebookLoading: false
  });
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');



  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading({
        ...loading,
        accLoading: true,
      });
      setFormValues({ email: 'john@mail.com', password: 'changeme' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        csrfToken,
        callbackUrl,
      });

      setLoading({
        ...loading,
        accLoading: false,
      });

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading({
        ...loading,
        accLoading: false,
      });
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLoginProvider = async (provider: string) => {
    try {
      setLoading({
        ...loading,
        googleLoading: provider === 'google',
        facebookLoading: provider === 'facebook'
      });
      const res = await signIn(provider, {redirect: false,callbackUrl});
      console.log('handleLoginProvider',res);
      //TODO: add new user Account after then login Provider
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
  } catch (error: any) {
    setLoading({
      ...loading,
      googleLoading: false,
      facebookLoading: false
    });
    setError(error);
  }
   

    
  }

  return (
    <form onSubmit={onSubmit} className="text-center">
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <h2 className="text-2xl mb-3">Login Form</h2>
      {error && <p className="text-center bg-red-300 py-4 my-3 rounded">{error}</p>}
      <div className="mb-2">
        <input required type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email address" />
        <p className='text-left text-xs text-slate-500 my-1'>Email test: tungnt@softech.vn</p>
      </div>
      <div className="mb-2">
        <input required type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" />
        <p className='text-left text-xs text-slate-500 my-1'>Password test: 123456789</p>
      </div>
      <button className="w-full" type="submit" disabled={loading.accLoading}>
        {loading.accLoading ? 'loading...' : 'Sign In'}
      </button>
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center mx-4 mb-0">OR</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <button disabled={loading.googleLoading} type='button' className="btn w-full flex gap-x-2 justify-center" onClick={() => handleLoginProvider('google')} role="button">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg> {loading.googleLoading ? 'loading...' : 'Continue with Google'}
        </button>
      </div>

    </form>
  );
};
