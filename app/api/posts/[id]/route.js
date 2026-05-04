import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import { postSchema } from "@/lib/validators/post";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Comment from "@/models/comment";
import Like from "@/models/like";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id: postId } = await params;

    const post = await Post.findById(postId);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    return Response.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    if (existingPost.authorId !== session.user.id) {
      return Response.json({ error: "Forbidden Not Authrized" }, { status: 403 });
    }

    const body = await req.json();

    const validator = postSchema.safeParse(body);

    if (!validator.success) {
      console.log("entered");
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

    const updatedPost = await Post.findByIdAndUpdate(postId, validator.data, {
      returnDocument: "after",
      runValidators: true,
    });
    return Response.json(updatedPost);
  } catch (error) {
    return Response.json({ error: "Failed to update post" }, { status: 500 });
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

    const { id: postId } = await params;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    if (existingPost.authorId !== session.user.id) {
      return Response.json({ error: "Forbidden Not Authrized" }, { status: 403 });
    }
    
    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({postId});
    await Like.deleteMany({postId});
    return Response.json({ message: "Post deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
