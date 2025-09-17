'use server'

import Link from "next/link";

export default async function Home() {
  
  return (
    <div className="">
      <Link className="bg-black text-white p-2 "  href={"/dashboard"}>Dashboard</Link>
    </div>
  );
}
