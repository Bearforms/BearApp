"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
	password: z.string().min(1, "Password is required"),
	confirmpassword: z.string().min(1, "Confirm Password is required"),
}).refine(data => data.password === data.confirmpassword, {
	message: "Passwords do not match",
	path: ["confirmpassword"]
});

const ResetPasswordForm = () => {

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			confirmpassword: "",
			password: ""
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const supabase = await createClient();
		const { error } = await supabase.auth.updateUser({password: values.password});
		if (error) {
			toast({
				title: 'Failed to update password',
				description: error.message,
				variant: 'destructive'
			});
			return;
		}

		toast({
			title: 'Success',
			description: 'Password has been updated successfully',
		});
		router.replace('/');
	}

	return (
		<Form {...form} >
			<form className="my-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder="**********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				
				<FormField
					control={form.control}
					name="confirmpassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input type='password' placeholder="**********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className='w-full' disabled={form.formState.isSubmitting}>
					Submit {form.formState.isSubmitting && <Loader className='w-5 h-5 ml-2 animate-spin' />}
				</Button>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
