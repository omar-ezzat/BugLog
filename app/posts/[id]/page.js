import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommentCard from "@/components/commentCard";
import CommentForm from "@/components/commentForm";

import React from "react";

const Page = async ({ params }) => {
  const { id: postId } = await params;

  console.log(postId);

  /**
   * dummy data
   */

  const post = {
    id: postId,
    title: "Cannot read properties of undefined in React",
    description:
      "I got this error while trying to map over data coming from an API. The page breaks before the data is loaded.",
    errorMessage:
      "TypeError: Cannot read properties of undefined (reading 'map')",
    codeSnippet: `data.map(item => item.name)`,
    language: "JavaScript",
    tags: ["React", "JavaScript", "API"],
    status: "open",
    authorName: "Omar",
    likes: 12,
    comments: 4,
    solution: "",
  };
  const comments = [
    {
      id: "1",
      authorName: "Ahmed",
      content:
        "This usually happens because the data is undefined before the API response finishes loading.",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      authorName: "Sara",
      content:
        "Try using optional chaining like data?.map or set the initial state to an empty array.",
      createdAt: "1 hour ago",
    },
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge>{post.status}</Badge>
            <span className="text-muted-foreground text-sm">
              by {post.authorName}
            </span>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <p>{post.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 font-mono text-sm bg-muted rounded-md">
            {post.errorMessage}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 font-mono text-sm bg-black text-white rounded-md overflow-auto">
            <pre>{post.codeSnippet}</pre>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {post.likes} likes · {post.comments} comments
          </span>

          <Button>Like</Button>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Comments</h2>

          <CommentForm />

          <div className="space-y-3">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
