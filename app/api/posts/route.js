import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import { postSchema } from "@/lib/validators/post";

export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find().sort({ createdAt: -1 });

    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const validator = postSchema.safeParse(body);

    if (!validator.success) {
      return Response.json(
        {
          errors: validator.error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    const newPost = await Post.create({
      ...validator.data,
      authorId: "demo-user",
      authorName: "Omar",
    });

    return Response.json(newPost);
  } catch (error) {
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}
