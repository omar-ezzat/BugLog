import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import PostCard from "@/components/postCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  await dbConnect();

  const userPosts = await Post.find({
    authorId: session.user.id,
  }).sort({ createdAt: -1 });

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8 space-y-8">
      <Card className="w-full">
        <CardContent className="p-6 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>
              {session.user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold">{session.user.name}</h1>

            <p className="text-muted-foreground">{session.user.email}</p>

            <p className="text-sm text-muted-foreground mt-1">
              {userPosts.length} posts created
            </p>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-bold mb-4">My Posts</h2>

        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {userPosts.map((post) => (
              <PostCard
                key={post._id.toString()}
                post={JSON.parse(JSON.stringify(post))}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            You have not created any posts yet.
          </p>
        )}
      </section>
    </main>
  );
}
