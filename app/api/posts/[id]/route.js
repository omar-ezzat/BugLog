import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import { postSchema } from "@/lib/validators/post";

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

    const { id: postId } = await params;

    const body = await req.json();

    // console.log(body);

    const validator = postSchema.safeParse(body);

    // console.log(validator.error.issues);

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
      returnDocument:"after",
      runValidators: true,
    });
    if (!updatedPost) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    return Response.json(updatedPost);
  } catch (error) {
    return Response.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id: postId } = await params;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ message: "Post deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
