import GoogleButton from '@/components/forms/auth/google-button';
import Link from 'next/link';
import React from 'react';
import SignUpForm from '@/components/forms/auth/signup-form';
import Logo from '@/components/common/logo';

const page = () => {
	return (
		<div className='bg-white min-h-screen flex items-center justify-center p-4'>

			<div className="border-neutral-200 max-w-[400px] w-full p-[24px] border-[1px] rounded-[4px]">
				<div className="flex justify-center">
					<Logo className='' />
				</div>

				<h1 className="text-center text-neutral-900 leading-[24px] text-[16px] font-[500] my-4">Create an account</h1>
				<p className="text-center text-neutral-700 leading-5 text-[14px] font-[400]">
					Please sign up to get started
				</p>

				<GoogleButton action='Sign up' />

				<p className='text-center text-neutral-700 leading-5 text-[14px] font-[400]'>or</p>


				<SignUpForm />

				<p className="text-left text-neutral-700 leading-5 text-[14px] font-[400] mt-4">
					Already have an account? <Link href="/auth/login" className='underline'>Login</Link>
				</p>
				<p className="text-left text-neutral-700 leading-5 text-[14px] font-[400] mt-1">
					Forgot password?  <Link href="/auth/forgot-password" className='underline'>Reset</Link>
				</p>
			</div>
		</div>
	);
};

export default page;