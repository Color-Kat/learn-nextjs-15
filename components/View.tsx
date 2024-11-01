import React, { memo, FC } from 'react';
import { Ping } from "@/components/Ping";

interface ViewProps {
    id: string;
}

export const View: FC<ViewProps> = ({ id }) => {


    return <div className="view-container">
        <div className="absolute -top-2 -right-2">
             <Ping />
        </div>

        <p className="view-text">
            <span className="font-black">
                100 views
            </span>
        </p>
    </div>;
};