"use client";

import React, { memo, FC } from 'react';
import Link from "next/link";
import { Search, X } from "lucide-react";

interface SearchFormResetProps {

}

export const SearchFormReset: FC<SearchFormResetProps> = ({}) => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if (form) form.reset();
    };

    return <button
            type="reset"
            onClick={reset}
        >
            <Link href="/" className="search-btn text-white">
                <X className="size-5" />
            </Link>
        </button>;
};