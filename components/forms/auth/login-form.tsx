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
	email: z.string().min(1, "Email is required").email("Please enter a valid email"),
	password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const supabase = await createClient();
		const { error } = await supabase.auth.signInWithPassword(values);
		if (error) {
			toast({
				title: 'Failed to sign in',
				description: error.message,
				variant: 'destructive'
			});
			return;
		}

		toast({
			title: 'Signed in',
			description: 'You have been signed in successfully',
		});
		router.replace('/');
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
								<Input autoComplete='no-email' placeholder="john.doe@email.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder="••••••••••" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className='w-full' disabled={form.formState.isSubmitting}>
					Login {form.formState.isSubmitting && <Loader className='w-5 h-5 ml-2 animate-spin' />}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
