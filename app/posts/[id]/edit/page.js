import PostForm from "@/components/postForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

async function getPost(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

const Page = async ({ params }) => {
  const post = await getPost(params.id);
  const { id: postId } = await params;

  if (!post) {
    return <div className="p-6">Post not found</div>;
  }

  return (
    <>
      <main className="w-full px-6 lg:px-20 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="hidden lg:block">
            <h1 className="text-3xl font-bold">Edit Bug Post</h1>
            <p className="text-muted-foreground mt-2">
              Update your bug details, error message, code snippet, or solution.
            </p>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-sm border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Editing Post #{postId}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <PostForm buttonText="Update Post" defaultValues={post} postId={post._id}/>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
