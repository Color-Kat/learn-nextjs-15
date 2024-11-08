import React, { memo, FC } from 'react';
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar: FC = async ({}) => {
    const session = await auth();

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        height={30}
                        width={133}
                    />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user
                        ? <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden text-red-500"/>

                            </Link>

                            <form
                                className="flex items-center"
                                action={async () => {
                                    "use server";

                                    await signOut()
                                }}
                            >
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500"/>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                {/*<span>{session?.user?.name}</span>*/}
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || "https://placehold.co/48x48"}
                                        alt={session?.user?.name || ''}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                        : <form
                            action={async () => {
                                "use server";
                                await signIn('github')
                            }}
                        >
                            <button type="submit">
                                <span>Login</span>
                            </button>
                        </form>
                    }
                </div>

            </nav>
        </div>
    );
}