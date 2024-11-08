import { defineQuery } from "groq";

export const STARTUP_QUERY = defineQuery(`
*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search ] | order(_createdAt desc) {
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
}`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
*[_type == "startup" && _id == $id][0] {
    _id,
    title,
    slug,
    _created_at,
    author -> {
      _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
*[_type == "startup" && _id == $id][0] {
    _id, views
}
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const STARTUP_QUERY_BY_AUTHOR_QUERY = defineQuery(`
*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _created_at,
    author -> {
      _id, name, image, bio
    },
    views,
    description,
    category,
    image
}`);