import {z} from 'zod';

export const usernameValidation = z  //creating valid username
.string()
.min(2, "Username must be 2 chars")
.max(20, "Username must be no more than 20 chars")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special chars")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 chars"})
})