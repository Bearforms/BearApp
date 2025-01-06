"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { createUserSchema } from '@/lib/validations/auth';
import { fetchApi } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {

	const router = useRouter();
	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		},
	});

	async function onSubmit(values: z.infer<typeof createUserSchema>) {
		const supabase = await createClient();
		const response = await fetchApi('/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify(values),
		});

		if (!response.success) {
			toast({
				title: 'Failed to sign up',
				description: response.error,
				variant: 'destructive'
			});
		} else {
			toast({
				title: 'Account created',
				description: 'Your account has been created successfully',
			});

			const { error } = await supabase.auth.signInWithPassword(values);

			console.log({error});

			if (error) {
				router.push('/auth/signin');
				return;
			}

			if (response?.data?.user?.workspace?.slug) {
				console.log('redirecting to workspace');
				// router.push(`/${response?.data?.user?.workspace?.slug}`);
				router.push('/');
			} else {
				console.log('redirecting to home');
				router.push('/');
			};

		}
	}

	return (
		<Form {...form} >
			<form className="my-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First name</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last name</FormLabel>
							<FormControl>
								<Input placeholder="Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input type='email' placeholder="john.doe@email.com" {...field} />
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
					Sign up {form.formState.isSubmitting && <Loader className='w-5 h-5 ml-2 animate-spin' />}
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
