import React, { memo, FC } from 'react';
import Form from "next/form";
import { SearchFormReset } from "@/components/SearchFormReset";
import { Search } from "lucide-react";

interface SearchFormProps {
    query?: string;
}

export const SearchForm: FC<SearchFormProps> = ({ query }) => {
    return <Form
        action="/public"
        scroll={false}
        className="search-form"
    >
        <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Search Startups"
            className="search-input"
        />

        <div className="flex gap-2">
            {query && (<SearchFormReset />)}

            <button
                type="submit"
                className="search-btn text-white"
            >
                <Search className="size-5" />
            </button>
        </div>
    </Form>;
};