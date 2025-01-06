
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

// Authentication sign in Sign out code 

const Navbar = async () => {
  const session = await auth(); // Fetch session on the server side.
  console.log('session = ',session)

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" }); // Redirect to home after logout
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
              
            </>
          ) : (
            <form action={async () => {
              "use server";
              await signIn("github", { callbackUrl: "/" }); // Redirect to home after login
            }}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
