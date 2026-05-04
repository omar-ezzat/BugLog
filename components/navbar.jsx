"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { authClient } from "@/lib/auth_client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export default function Navbar() {

    const [open, setOpen] = useState(false)

  const { data: session, isPending } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut()
    setOpen(false)
    window.location.href = "/"
  }
  

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          BugLog
        </Link>

        
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/">
            <Button variant="ghost">Posts</Button>
          </Link>

          {session && (
            <>
              <Link href="/create-post">
                <Button variant="outline">New Post</Button>
              </Link>

              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            </>
          )}

          {isPending ? null : session ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>
                  {session.user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>BugLog</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-3">
                <Link href="/" onClick={()=> setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start" >
                    Posts
                  </Button>
                </Link>

                {session && (
                  <>
                    <Link href="/create-post" onClick={()=> setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        New Post
                      </Button>
                    </Link>

                    <Link href="/profile" onClick={()=> setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                  </>
                )}

                {!isPending && !session && (
                  <Link href="/login" onClick={()=> setOpen(false)}>
                    <Button className="w-full">Login</Button>
                  </Link>
                )}

                {!isPending && session && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={session.user.image || ""} />
                        <AvatarFallback>
                          {session.user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{session.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
