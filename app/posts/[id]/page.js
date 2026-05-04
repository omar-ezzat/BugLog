import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeletePostButton from "@/components/deletePostButton";
import CommentCard from "@/components/commentCard";
import CommentForm from "@/components/commentForm";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LikeButton from "@/components/likeButton";
import React from "react";

async function getPost(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

async function getComments(postId) {
  const res = await fetch(
    `http://localhost:3000/api/posts/${postId}/comments`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

const Page = async ({ params }) => {
  const { id: postId } = await params;

  const post = await getPost(postId);
  const comments = await getComments(postId);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isOwner = session?.user?.id === post.authorId;

  if (!post) {
    return <div className="p-6">Post not found</div>;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 space-y-6 w-full">
        <div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex gap-3 ">
              <Badge>{post.status}</Badge>
              <span className="text-muted-foreground text-sm">
                by {post.authorName}
              </span>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Link href={`/posts/${post._id}/edit`}>
                  <Button variant="outline">Edit Post</Button>
                </Link>

                <DeletePostButton postId={post._id} />
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <p>{post.description}</p>
          </CardContent>
        </Card>

        {post.errorMessage && (
          <Card>
            <CardContent className="p-6 font-mono text-sm bg-muted rounded-md">
              {post.errorMessage}
            </CardContent>
          </Card>
        )}

        {post.codeSnippet && (
          <Card>
            <CardContent className="p-6 font-mono text-sm bg-black text-white rounded-md overflow-auto">
              <pre>{post.codeSnippet}</pre>
            </CardContent>
          </Card>
        )}

        {post.solution && (
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-3 text-xl font-bold">Solution</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {post.solution}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {post.likesCount} likes · {post.commentsCount} comments
          </span>

          {session && <LikeButton postId={post._id}/>}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Comments</h2>

          {session ? (
            <CommentForm postId={post._id} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Login to write a comment.
            </p>
          )}

          <div className="space-y-3">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))
            ) : (
              <p className="text-muted-foreground">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
