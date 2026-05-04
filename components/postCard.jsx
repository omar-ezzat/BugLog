import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PostCard({ post }) {
  return (
    <Card className="hover:shadow-md transition flex h-full flex-col min-h-70">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl line-clamp-2">
            <Link href={`/posts/${post._id}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>

          <Badge variant={post.status === "solved" ? "default" : "secondary"}>
            {post.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col space-y-4">
        <p className="text-muted-foreground line-clamp-2 min-h-7">
          {post.description}
        </p>

        {post.errorMessage && (<div className="rounded-md bg-muted p-3 line-clamp-2 font-mono text-sm min-h-12">
          {post.errorMessage}
        </div>)}

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className=" flex items-end justify-between text-sm text-muted-foreground mt-auto">
          <span>By {post.authorName}</span>
          <span>{post.likesCount} likes · {post.commentsCount} comments</span>
        </div>

        <Link href={`/posts/${post._id}`}>
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
