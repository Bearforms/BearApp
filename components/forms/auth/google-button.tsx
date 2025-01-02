"use client";

import Image from 'next/image';

const GoogleButton = ({action="Login"}: {action?: string}) => {
	return (
		<button className="border-[#E5E5E5] w-full py-[8px] px-[12px] flex justify-center my-4 items-center gap-4 border-[1px] rounded-[4px]">
			<Image src="/google.png" width={24} height={24} alt="Google Icon" />
			<span>{action} with Google</span>
		</button>
	);
};

export default GoogleButton;