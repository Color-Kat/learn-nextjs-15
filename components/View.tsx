import React, { memo, FC } from 'react';
import { Ping } from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/query";

interface ViewProps {
    id: string;
}

export const View: FC<ViewProps> = async ({ id }) => {
    const { views: totalViews } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

    // TODO: Increase views

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