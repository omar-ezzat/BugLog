"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


const PostForm = ({ buttonText = "Create Post", defaultValues = null, postId = null }) => {


    const router = useRouter()

    const [formData, setFormData] = useState({
        title: defaultValues?.title || "",
        description: defaultValues?.description || "",
        errorMessage: defaultValues?.errorMessage || "",
        codeSnippet: defaultValues?.codeSnippet || "",
        language: defaultValues?.language || "",
        tags: defaultValues?.tags?.join(", ") || "",
    })


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map((tag) => tag.trim()),
        }

        const url = postId ? `/api/posts/${postId}` : "/api/posts"
        const method = postId ? "PUT" : "POST"

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        if (res.ok) {
            router.push("/")
            router.refresh()
        }
    }




    return (
        <>
            <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Example: Cannot read properties of undefined" />
                </div>

                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain the bug you faced..." />
                </div>

                <div className="space-y-2">
                    <Label>Error Message</Label>
                    <Textarea name="errorMessage"
                        value={formData.errorMessage}
                        onChange={handleChange}
                        placeholder="Paste the error message here..." />
                </div>

                <div className="space-y-2">
                    <Label>Code Snippet</Label>
                    <Textarea name="codeSnippet"
                        value={formData.codeSnippet}
                        onChange={handleChange}
                        placeholder="Paste the code that caused the issue..." />
                </div>

                <div className="space-y-2">
                    <Label>Language</Label>
                    <Input name="language"
                        value={formData.language}
                        onChange={handleChange}
                        placeholder="JavaScript, Next.js, React..." />
                </div>

                <div className="space-y-2">
                    <Label>Tags</Label>
                    <Input name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="React, API, MongoDB" />
                </div>

                <Button type="submit" className="w-full">
                    {buttonText}
                </Button>
            </form>
        </>
    );
}

export default PostForm;
