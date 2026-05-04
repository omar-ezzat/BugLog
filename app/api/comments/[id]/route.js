import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/comment";
import Post from "@/models/post";

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: commentId } = await params;
    const body = await req.json();

    if (!body.content || body.content.trim().length < 2) {
      return Response.json(
        { error: "Comment must be at least 2 characters" },
        { status: 400 },
      );
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.authorId !== session.user.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    comment.content = body.content;
    await comment.save();

    return Response.json(comment);
  } catch (error) {
    return Response.json(
      { error: "Failed to update comment" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: commentId } = await params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.authorId !== session.user.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await Comment.findByIdAndDelete(commentId);

    await Post.findByIdAndUpdate(comment.postId, {
      $inc:{commentsCount:-1}
    })

    return Response.json({ message: "Comment deleted" });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
