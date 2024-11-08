import React, { memo, FC } from 'react';
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_AUTHOR_QUERY } from "@/sanity/lib/query";
import { StartupCard, StartupCardType } from "@/components/StartupCard";
import { sleep } from "@/lib/utils";

export const UserStartups: FC<{ id: string }> = async ({ id }) => {
    const startups: StartupCardType[] = await client.fetch(STARTUP_QUERY_BY_AUTHOR_QUERY, { id });

    await sleep(1000);

    return (
        <>
            {startups.length > 0
                ? startups.map((startup: StartupCardType) => (
                    <StartupCard post={startup} key={startup._id} />
                ))

                : <p className="no-result">No posts yet</p>
            }
        </>
    );
}