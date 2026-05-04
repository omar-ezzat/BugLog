"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LikeButton({ postId }) {
  const router = useRouter()

  const [likedByMe, setLikedByMe] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getLikeStatus = async () => {
      const res = await fetch(`/api/posts/${postId}/like`)

      if (!res.ok) return

      const data = await res.json()
      setLikedByMe(data.likedByMe)
    }

    getLikeStatus()
  }, [postId])

  const handleToggleLike = async () => {
    setLoading(true)

    const res = await fetch(`/api/posts/${postId}/like`, {
      method: likedByMe ? "DELETE" : "POST",
    })

    setLoading(false)

    if (!res.ok) return

    setLikedByMe(!likedByMe)
    router.refresh()
  }

  return (
    <Button
      variant={likedByMe ? "default" : "outline"}
      onClick={handleToggleLike}
      disabled={loading}
    >
      {likedByMe ? "Liked" : "Like"}
    </Button>
  )
}
