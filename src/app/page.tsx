import Image from "next/image";
import Link from "next/link";
// import { useRouter } from 'next/navigation'; // For App Router

export default function Home() {
  // const router = useRouter();

  const handleClick = () => {
    // router.push('/about');

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        /> */}
        <Link className="flex w-half item-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 border shadow gap-4" href='/about'> Go to About</Link>

        <p> Ashok Next</p>
        {/* <button onClick={handleClick}>Go to Dashboard</button> */}
      </main>
    </div>
  );
}
