import { NextPage } from 'next';
import Link from "next/link";

const UsersPage: NextPage<{ params: { id: string } }> = ({ params }) => {
    const id = params.id;

    throw new Error('Some error');

    return (
        <div className="">
            <h1>Users</h1>

            <ul>
                <li><Link href="/users/1">User1</Link></li>
                <li><Link href="/users/2">User2</Link></li>
                <li><Link href="/users/3">User3</Link></li>
                <li><Link href="/users/4">User4</Link></li>
                <li><Link href="/users/5">User5</Link></li>
            </ul>

        </div>
    );
};

export default UsersPage;