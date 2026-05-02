import React from "react";
import PostCard from "@/components/postCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

/**
 * dummy post
 */
const userPosts = [
  {
    id: "1",
    title: "Cannot read properties of undefined in React",
    description:
      "I got this error while trying to map over data coming from an API.",
    errorMessage:
      "TypeError: Cannot read properties of undefined (reading 'map')",
    tags: ["React", "JavaScript", "API"],
    status: "open",
    authorName: "Omar",
    likes: 12,
    comments: 4,
  },
  {
    id: "2",
    title: "Cannot read properties of undefined in React",
    description:
      "I got this error while trying to map over data coming from an API.",
    errorMessage:
      "TypeError: Cannot read properties of undefined (reading 'map')",
    tags: ["React", "JavaScript", "API"],
    status: "open",
    authorName: "Omar",
    likes: 12,
    comments: 4,
  },
];

const Page = () => {
  return (
    <>
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>O</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-bold">Omar</h1>
              <p className="text-muted-foreground">omar@example.com</p>
              <p className="text-sm text-muted-foreground mt-1">
                {userPosts.length} post created
              </p>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-bold mb-4">My Posts</h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
