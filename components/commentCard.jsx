
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth_client"

export default function CommentCard({ comment }) {
    const router = useRouter()
    const { data: session } = authClient.useSession()

    const [isEditing, setIsEditing] = useState(false)
    const [content, setContent] = useState(comment.content)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const isOwner = session?.user?.id === comment.authorId

    const handleDelete = async () => {
        setLoading(true)

        await fetch(`/api/comments/${comment._id}`, {
            method: "DELETE",
        })

        setLoading(false)
        router.refresh()
    }

    const handleUpdate = async () => {
        setError("")

        if (content.trim().length < 2) {
            setError("Comment must be at least 2 characters")
            return
        }

        setLoading(true)

        const res = await fetch(`/api/comments/${comment._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        })

        setLoading(false)

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || "Failed to update comment")
            return
        }

        setIsEditing(false)
        router.refresh()
    }


    return (
        <div className="w-full rounded-lg border p-4 space-y-3">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={comment.authorImage || ""} />
                    <AvatarFallback>
                        {comment.authorName?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <p className="font-medium">{comment.authorName}</p>
                </div>
            </div>

            {isEditing ? (
                <div className="space-y-2">
                    <Textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                            setError("")
                        }}
                        className="w-full"
                    />

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                </div>
            ) : (
                <p className="text-sm wrap-break-word">{comment.content}</p>
            )}


            {isOwner && (
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button size="sm" onClick={handleUpdate} disabled={loading}>
                                Save
                            </Button>

                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
