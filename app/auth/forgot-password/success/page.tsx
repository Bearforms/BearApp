import Link from 'next/link';
import React from 'react';
import Logo from '@/components/common/logo';
import { redirect } from 'next/navigation';

const page = ({ searchParams }: { searchParams: { email: string; }; }) => {

	if (!searchParams?.email) {
		redirect('/auth/forgot-password');
	}

	return (
		<div className='bg-white min-h-screen flex items-center justify-center p-4'>

			<div className="border-neutral-200 max-w-[400px] w-full p-[24px] border-[1px] rounded-[4px]">
				<div className="flex justify-center">
					<Logo className='' />
				</div>

				<h1 className="text-center text-neutral-900 leading-[24px] text-base font-medium my-4">Check your email</h1>
				<p className="text-center text-neutral-700 leading-5 text-sm font-normal">
					We sent an email to {searchParams?.email ?? ""}, which contains a link to reset your Bearforms password.
				</p>

				<p className="text-center text-neutral-700 leading-5 text-sm font-normal mt-4">
					Back to  <Link href="/auth/login" className='underline'>Login</Link>
				</p>
			</div>
		</div>
	);
};

export default page;