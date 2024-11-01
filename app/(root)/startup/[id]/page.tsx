import {NextPage} from 'next';
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/query";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const StartupPage: NextPage<{
    params: Promise<{ id: string }>
}> = async ({params}) => {

    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

    if(!post) return notFound();

    return (
        <div className="">
            {post.title}
        </div>
    );
};

export default StartupPage;