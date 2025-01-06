import Link from 'next/link';
import React from 'react';

import Logo from '@/components/common/logo';
import ResetPasswordForm from '@/components/forms/auth/reset-password-form';

const page = () => {
	return (
		<div className='bg-white min-h-screen flex items-center justify-center p-4'>

			<div className="border-neutral-200 max-w-[400px] w-full p-[24px] border-[1px] rounded-[4px]">
				<div className="flex justify-center">
					<Logo className='' />
				</div>

				<h1 className="text-center text-neutral-900 leading-[24px] text-[16px] font-[500] my-4">Password reset</h1>
				<p className="text-center text-neutral-700 leading-5 text-[14px] font-[400]">
					Enter and confirm your password.
				</p>

				<ResetPasswordForm />

				<p className="text-left text-neutral-700 leading-5 text-[14px] font-[400] mt-1">
					Back to  <Link href="/auth/login" className='underline'>Login</Link>
				</p>
			</div>
		</div>
	);
};

export default page;