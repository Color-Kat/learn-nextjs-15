import { z } from "zod";

export const fromSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    category: z.string().min(2).max(20),
    link: z.string().url().refine(async (url) => {
        try {
            // Check if it's image (don't load body, just headers using HEAD method)
            const res = await fetch(url, {method: 'HEAD'});
            const contentType = res.headers.get("content-type");

            return !!contentType?.startsWith('image/');
        } catch (error) {
            return false;
        }
    }),
    pitch: z.string().min(10)
});