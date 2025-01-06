import { z } from 'zod';

export const createUserSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string(),
	email: z.string().min(1, "Email is required").email("Please enter a valid email"),
	password: z.string().min(1, "Password is required"),
});