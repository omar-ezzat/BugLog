"use client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CommentForm = () => {
    return (
        <>
        <form className="space-y-3">
      <Textarea placeholder="Write your comment..." />
      <Button type="submit">Post Comment</Button>
    </form>
        </>
    );
}

export default CommentForm;
