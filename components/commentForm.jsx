"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CommentForm = ({ postId }) => {

    const router = useRouter()

    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (content.trim().length < 2) {
            setError("Comment must be at least 2 characters")
            return
        }
        setLoading(true)

        const res = await fetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        })

        setLoading(false)

        if (!res.ok) {
            setError("Failed to add comment")
            return
        }

        setContent("")
        router.refresh()
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-3">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment..."
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" disabled={loading}>
                    {loading ? "Posting..." : "Post Comment"}
                </Button>
            </form>

        </>
    );
}

export default CommentForm;
