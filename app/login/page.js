"use client"
import { authClient } from "@/lib/auth_client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  return (
    <>
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Welcome to BugLog</CardTitle>
            <CardDescription>
              Login to post bugs, comment, and like solutions.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline" onClick={()=>{
              authClient.signIn.social({
                provider:"github",
                callbackURL:"/",
              })
            }}>
              Continue with GitHub
            </Button>

            {/* <Button className="w-full bg-blue-600 hover:bg-blue-700 ">Continue with Facebook</Button> */}
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Page;
