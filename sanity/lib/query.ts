import { defineQuery } from "groq";

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _created_at,
    authoru -> {
      _id, name, image, bio
    },
    views,
    description,
    category,
    image
}`)