"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import React from 'react';

const DeletePostButton = ({ postId }) => {

    const router = useRouter()

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this post?")

        if (!confirmDelete) return

        const res = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        })

        if (res.ok) {
            router.push("/")
            router.refresh()
        }
    }


    return (
        <>
            <Button variant="destructive" onClick={handleDelete}>
                Delete Post
            </Button>

        </>
    );
}

export default DeletePostButton;
