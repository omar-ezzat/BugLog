"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <>
            <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        BugLog
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Button variant="ghost">Posts</Button>
                        </Link>

                        <Link href="/create-post">
                            <Button variant="outline">New Post</Button>
                        </Link>

                        <Link href="/profile">
                            <Button variant="ghost">Profile</Button>
                        </Link>

                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                </div>
            </nav>

        </>

    )
}
