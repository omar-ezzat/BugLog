import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/comment";
import Post from "@/models/post";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id: postId } = await params;

    const comments = await Comment.find({ postId }).sort({
      createdAt: -1,
    });

    return Response.json(comments);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const body = await req.json();

    if (!body.content || body.content.trim().length < 2) {
      return Response.json(
        { error: "Comment must be at least 2 characters" },
        { status: 400 },
      );
    }

    const newComment = await Comment.create({
      postId,
      content: body.content,
      authorId: session.user.id,
      authorName: session.user.name,
      authorImage: session.user.image || "",
    });

    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    return Response.json(newComment);
  } catch (error) {
    return Response.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
