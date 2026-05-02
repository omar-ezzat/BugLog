import PostForm from "@/components/postForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <>
      <main className="w-full px-6 lg:px-20 py-10">
        <Card className="max-w-3xl mx-auto shadow-sm border">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create New Bug Post
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-2">
              Share your issue with the community and get help.
            </p>
          </CardHeader>

          <CardContent>
            <PostForm buttonText="Create Post"/>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Page;
