import LoginForm from '@/components/forms/auth/login-form';
import GoogleButton from '@/components/forms/auth/google-button';
import Link from 'next/link';
import React from 'react';
import Logo from '@/components/common/logo';

const page = () => {
	return (
		<div className='bg-white min-h-screen flex items-center justify-center p-4'>

			<div className="border-neutral-500 max-w-[400px] w-full p-[24px] border-[1px] rounded-[4px]">
				<div className="flex justify-center">
					<Logo className='' />
				</div>

				<h1 className="text-center text-neutral-800 text-base font-medium my-4">Welcome back</h1>
				<p className="text-center text-[#404040] leading-[20px] text-[14px] font-[400]">
					Please login to get started
				</p>

				<GoogleButton />

				<p className='text-center text-[#404040] leading-[20px] text-[14px] font-[400]'>or</p>


				<LoginForm />

				<p className="text-left text-[#404040] leading-[20px] text-[14px] font-[400] mt-4">
					Don&apos;t have an account? <Link href="/auth/signup" className='underline'>Sign up</Link>
				</p>
				<p className="text-left text-[#404040] leading-[20px] text-[14px] font-[400] mt-1">
					Forgot password?  <Link href="/auth/forgot-password" className='underline'>Reset</Link>
				</p>
			</div>
		</div>
	);
};

export default page;