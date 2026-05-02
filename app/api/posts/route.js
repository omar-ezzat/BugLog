import dbConnect from "@/lib/mongodb"
import Post from "@/models/post"

export async function GET() {
  try {
    await dbConnect()

    const posts = await Post.find().sort({ createdAt: -1 })

    return Response.json(posts)
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    
    await dbConnect()
    

    const body = await req.json()

    const newPost = await Post.create({
      ...body,
      authorId: "demo-user",
      authorName: "Omar",
    })

    return Response.json(newPost)
  } catch (error) {
    return Response.json(
      { error: "Failed to create post" },
      { status: 500 }
    )
  }
}

