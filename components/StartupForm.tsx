'use client';

import React, { memo, FC, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, SendIcon } from "lucide-react";

interface StartupFormProps {

}

export const StartupForm: FC<StartupFormProps> = ({}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const [pitch, setPitch] = useState("");

    const isPending = false;

    return (
        <form
            action={() => {
            }}
            className="startup-form"
        >
            <div>
                <label
                    htmlFor="title"
                    className="startup-form_label"
                >
                    Title
                </label>

                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />

                {errors.title && <p className="startup-form_arror">{errors.title}</p>}
            </div>


            <div>
                <label
                    htmlFor="description"
                    className="startup-form_label"
                >
                    Description
                </label>

                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />

                {errors.description && <p className="startup-form_arror">{errors.description}</p>}
            </div>

            <div>
                <label
                    htmlFor="category"
                    className="startup-form_label"
                >
                    Category
                </label>

                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education ...)"
                />

                {errors.category && <p className="startup-form_arror">{errors.category}</p>}
            </div>


            <div>
                <label
                    htmlFor="link"
                    className="startup-form_label"
                >
                    Image URL
                </label>

                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />

                {errors.link && <p className="startup-form_arror">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label
                    htmlFor="pitch"
                    className="startup-form_label"
                >
                    Pitch
                </label>

                <MDEditor
                    id="pitch"
                    height={300}
                    preview="edit"
                    style={{borderRadius: 20, overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}

                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                />

                {errors.pitch && <p className="startup-form_arror">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? 'Submitting...' : 'Submit Your Pitch'}
                <Send className="size-6 ml-2"/>
            </Button>

        </form>
    );
};