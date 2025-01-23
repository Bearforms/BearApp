
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

interface Data extends Record<string, any>{
	formId: string
}
export const updateForm = async ({ formId, ...data }:Data) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const supabase = await createClient();

	// check if form exists
	const { data: existingForm } = await supabase.from('forms').select('id').eq('id', formId).single();
	if (!existingForm) {
		throw new Error('Form not found');
	}

	const { data: formData, error: formError } = await supabase.from('forms').update({
		...data,
		updated_by: user.id,
		lastUpdated: new Date().toISOString()
	}).eq('id', formId).select().single();

	if (formError) {
		console.log('Update form error:', formError);
		
		throw formError;
	}

	return formData;
};