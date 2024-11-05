import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/query";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // Create author record when register
        async signIn({ user, account, profile }) {
            const existingUser = await client
                .withConfig({useCdn: false})
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

            if (!existingUser) {
                await writeClient.create({
                    _type   : "author",
                    id      : profile?.id,
                    name    : user?.name,
                    username: profile?.login,
                    email   : user?.email,
                    image   : user?.image,
                    bio     : profile?.bio || ''
                });
            }

            return true;
        },
        // Fetch user id to jwt
        async jwt({token, account, profile}) {
            if(account && profile) {
                const user = await client
                    .withConfig({useCdn: false})
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

                token.id = user?._id;
            }

            return token;
        },
        async session({session, token}) {
            Object.assign(session, {
                id: token.id
            });

            return session;
        }
    }
});