import React, { memo, FC } from 'react';
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

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
                                <span>Create</span>
                            </Link>

                            <form
                                action={async () => {
                                    "use server";

                                    await signOut()
                                }}
                            >
                                <button type="submit">
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
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