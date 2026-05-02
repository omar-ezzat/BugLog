import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import PostCard from "@/components/postCard";

/**
 *
 * dummy data
 */
// const posts = [
//   {
//     id: "1",
//     title: "Cannot read properties of undefined in React",
//     description:
//       "I got this error while trying to map over data coming from an API. The page breaks before the data is loaded.",
//     errorMessage:
//       "TypeError: Cannot read properties of undefined (reading 'map')",
//     language: "JavaScript",
//     tags: ["React", "JavaScript", "API"],
//     status: "open",
//     authorName: "Omar",
//     likes: 12,
//     comments: 4,
//   },
//   {
//     id: "2",
//     title: "MongoDB connection works locally but fails on deployment",
//     description:
//       "The app connects fine on localhost, but after deploying it cannot connect to MongoDB Atlas.",
//     errorMessage:
//       "MongooseServerSelectionError: Could not connect to any servers",
//     language: "Node.js",
//     tags: ["MongoDB", "Next.js", "Deployment"],
//     status: "solved",
//     authorName: "Ahmed",
//     likes: 8,
//     comments: 6,
//   },
//   {
//     id: "3",
//     title: "Next.js dynamic route returns 404",
//     description:
//       "I created a dynamic route inside the app folder but the page keeps returning 404.",
//     errorMessage: "404 This page could not be found",
//     language: "Next.js",
//     tags: ["Next.js", "App Router"],
//     status: "open",
//     authorName: "Sara",
//     likes: 5,
//     comments: 2,
//   },
// ];

async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts");
    return res.json()
  } catch (err) {
    console.log("Error", err);
    return [];
  }
}

async function Home() {
  const posts = await getPosts();
  return (
    <>
      <main className="max-w-6xl mx-auto p-6">
        <section className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Latest Bug Posts
          </h1>
          <p className="text-muted-foreground mt-2">
            Read coding bugs, errors, and solutions shared by developers.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </section>
      </main>
    </>
  );
}

export default Home;
