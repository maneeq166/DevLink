import z, { url } from "zod";

const linkSchema = z.object({
    title:z.string().min(1).max(40),
    url:z.url()
    
})