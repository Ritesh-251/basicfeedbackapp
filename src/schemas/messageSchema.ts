import {z} from "zod"

export const messageSchema = z.object({
     content: z.string()
     .min(10,"content must be of 10 characters")
     .max(300,"content must not be of more than 300 characters")

})