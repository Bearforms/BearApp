"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { createClient } from '@/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BASE_URL } from '@/constants';

const formSchema = z.object({
	email: z.string().min(1, "Email is required").email("Please enter a valid email"),
});

const ForgotPasswordForm = () => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const supabase = await createClient();

		const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
			redirectTo: `${BASE_URL}/auth/reset-password`
		});
		if (error) {
			toast({
				title: 'Failed to reset password',
				description: error.message,
				variant: 'destructive'
			});
			return;
		}

		toast({
			title: 'Password reset',
			description: 'An email has been sent to your email address with instructions to reset your password',
		});
	}

	return (
		<Form {...form} >
			<form className="my-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input placeholder="john.doe@email.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className='w-full' disabled={form.formState.isSubmitting}>
					Sign up {form.formState.isSubmitting && <Loader className='w-5 h-5 ml-2 animate-spin' />}
				</Button>
			</form>
		</Form>
	);
};

export default ForgotPasswordForm;
