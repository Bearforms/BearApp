"use client";

import { BASE_URL } from '@/constants';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@/supabase/client';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const GoogleButton = ({ action = "Login" }: { action?: string; }) => {

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	console.log('BASE_URL', BASE_URL);

	const handleContinueWithGoogle = async () => {
		const supabase = createClient();



		setIsLoading(true);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${BASE_URL}/api/auth/callback`,
			}
		});

		if (error) {
			setIsLoading(false);
			toast({
				title: 'Failed to sign in',
				description: error.message,
				variant: 'destructive'
			});
			return;
		}
	};

	return (
		<button disabled={isLoading} onClick={handleContinueWithGoogle} className="disabled:bg-opacity-80 disabled:cursor-not-allowed border-neutral-200 w-full py-2 px-3 flex justify-center my-4 items-center gap-4 border-[1px] rounded-[4px] text-sm leading-5">
			{
				isLoading ? <Loader className='w-6 h-6 animate-spin' /> :
					<Image src="/google.png" width={24} height={24} alt="Google Icon" />
			}
			<span>{action} with Google</span>
		</button>
	);
};

export default GoogleButton;