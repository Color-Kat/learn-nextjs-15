import React, { memo, FC } from 'react';
import { Ping } from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/query";
import { writeClient } from "@/sanity/lib/write-client";

import {unstable_after as after} from "next/server";

interface ViewProps {
    id: string;
}

export const View: FC<ViewProps> = async ({ id }) => {
    const { views: totalViews } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

    // Runs code inside after the UI is rendered in the browser
    after(async() => {
        await writeClient
            .patch(id)
            .set({views: totalViews + 1})
            .commit();
    });

    return <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping />
        </div>

        <p className="view-text">
            <span className="font-black">
                Views: {totalViews}
            </span>
        </p>
    </div>;
};