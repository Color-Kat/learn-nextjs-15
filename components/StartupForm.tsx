'use client';

import React, { useActionState, memo, FC, useState } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, SendIcon } from "lucide-react";
import { fromSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

interface StartupFormProps {

}

export const StartupForm: FC<StartupFormProps> = ({}) => {
    const { toast } = useToast();
    const router = useRouter();

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [pitch, setPitch] = useState("");

    const handleFormSubmit = async (prev: any, formData: FormData) => {
        try {
            const formValues = {
                title      : formData.get("title") as string,
                description: formData.get("description") as string,
                category   : formData.get("category") as string,
                link       : formData.get("link") as string,
                pitch      : pitch
            }

            await fromSchema.parseAsync(formValues);

            console.log(formValues)


            // const result = await createIdea(prevState, formData, pitch);
            // console.log(result);

            if (result) {
                toast({
                    title      : "Success",
                    description: "Your startup pitch ahs been created successfully",
                });

                router.push(`/startup/${result.id}`);
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast({
                    title      : "Error",
                    description: "Please, check your inputs and try again",
                    variant    : "destructive",
                });

                return { ...prev, error: "Validation failed", status: "ERROR" };
            }

            toast({
                title      : "Error",
                description: "An unexpected error has occurred",
                variant    : "destructive",
            });

            return { ...prev, error: "An unexpected error has occurred", status: "ERROR" };
        }
    }

    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        {
            error : "",
            status: "INITIAL"
        },
    );

    return (
        <form
            action={formAction}
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

                {errors.title && <p className="startup-form_error">{errors.title}</p>}
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

                {errors.description && <p className="startup-form_error">{errors.description}</p>}
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

                {errors.category && <p className="startup-form_error">{errors.category}</p>}
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

                {errors.link && <p className="startup-form_error">{errors.link}</p>}
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
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}

                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? 'Submitting...' : 'Submit Your Pitch'}
                <Send className="size-6 ml-2" />
            </Button>

        </form>
    );
};