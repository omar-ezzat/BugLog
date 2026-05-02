import PostForm from "@/components/postForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

const Page = async ({params}) => {
    const {id:postId} = await params
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
                <CardTitle className="text-xl font-semibold">Editing Post #{postId}</CardTitle>
              </CardHeader>

              <CardContent>
                <PostForm buttonText="Update Post" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
