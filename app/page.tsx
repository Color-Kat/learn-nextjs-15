import Image from "next/image";

export default async function Home() {

    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (!response.ok) throw new Error('Failed to fetch data')

    const albums = await response.json();

    console.log(albums);

    return (
        <div className="">
            {albums.map(album => (
                <div>{album.title}</div>
            ))}
        </div>
    );
}
