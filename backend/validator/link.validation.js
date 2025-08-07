import z, { url } from "zod";

export const addLinkSchema = z.object({
    title:z.string().min(1).max(40),
    url:z.url(),
    tagsee:z.string().min(1).max(30)
})


