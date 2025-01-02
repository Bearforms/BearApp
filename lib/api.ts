import { BASE_URL } from '@/constants';


export async function fetchApi(url: string, options?: RequestInit) {
	try {
		const isBrowser = typeof window === "object";		
		const response = await fetch(`${isBrowser?'': BASE_URL}${url}`, {
			...options
		});


		if (!response.ok) {
			const text = await response.text();
			throw new Error(text);
		}

		const data = await response.json();

		return { success: true, data, error: null };

	} catch (error: any) {
		return { success: false, error: error.message ?? "Request failed. Please try again later!", data: null };
	}
}