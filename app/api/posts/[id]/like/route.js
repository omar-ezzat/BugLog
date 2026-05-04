import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Like from "@/models/like"
import Post from "@/models/post"

export async function GET(req, { params }) {
  try {
    await dbConnect()

    const { id: postId } = await params

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const likesCount = await Like.countDocuments({ postId })

    let likedByMe = false

    if (session) {
      const existingLike = await Like.findOne({
        postId,
        userId: session.user.id,
      })

      likedByMe = Boolean(existingLike)
    }

    return Response.json({
      likesCount,
      likedByMe,
    })
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    )
  }
}

export async function POST(req, { params }) {
  try {
    await dbConnect()

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: postId } = await params

    const existingLike = await Like.findOne({
      postId,
      userId: session.user.id,
    })

    if (existingLike) {
      return Response.json({ message: "Already liked" })
    }

    const like = await Like.create({
      postId,
      userId: session.user.id,
    })

    await Post.findByIdAndUpdate(postId, {
          $inc:{likesCount:1}
        })

    return Response.json(like)
  } catch (error) {
    return Response.json(
      { error: "Failed to like post" },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect()

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: postId } = await params

    await Like.findOneAndDelete({
      postId,
      userId: session.user.id,
    })

    await Post.findByIdAndUpdate(postId, {
          $inc:{likesCount:-1}
        })

    return Response.json({ message: "Like removed" })
  } catch (error) {
    return Response.json(
      { error: "Failed to unlike post" },
      { status: 500 }
    )
  }
}
