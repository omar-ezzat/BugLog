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
        solution: defaultValues?.solution || "",
    })

    const [error, setError] = useState({ title: "", description: "", tags: "" })
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

        setError({ title: "", description: "", tags: "" })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const validationErrors = validate()
        // if (Object.keys(validationErrors).length > 0) {
        //     setError({ title: validationErrors.title, description: validationErrors.description })
        //     return
        // }

        setLoading(true)
        const payload = {
            ...formData,
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            status: postId && formData.solution.trim() ? "solved" : "open",
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
        setLoading(false)

        const data = res.json()

        if (res.ok) {
            router.push("/")
            router.refresh()
        } else {
            if (data.errors) {
                const fieldErrors = {}

                data.errors.forEach((err) => {
                    fieldErrors[err.field] = err.message
                })
                setError(fieldErrors)
            } else {
                setError("Something went wrong")
            }
        }
    }


    // const validate = () => {
    //     const newErrors = {}

    //     if (!formData.title.trim()) {
    //         newErrors.title = "Title is required"
    //     } else if (formData.title.trim().lenght < 5) {
    //         newErrors.title = "Title must be at least 5 characters"
    //     }

    //     if (!formData.description.trim()) {
    //         newErrors.description = "Description is required"
    //     } else if (formData.description.trim().lenght < 5) {
    //         newErrors.description = "Description must be at least 5 characters"
    //     }

    //     return newErrors
    // }


    return (
        <>
            <form onSubmit={handleSubmit} className="w-full space-y-5">
                {!postId && (<div className="space-y-2">
                    <Label>Title</Label>
                    <Input name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Example: Cannot read properties of undefined" />

                    {error?.title && (
                        <p className="text-sm text-red-600"> {error.title}</p>
                    )}
                </div>)}

                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain the bug you faced..." />
                    {error?.description && (
                        <p className="text-sm text-red-600"> {error.description}</p>
                    )}
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
                    {error?.tags && (
                        <p className="text-sm text-red-600"> {error.tags}</p>
                    )}
                </div>


                {postId && (<div className="space-y-2">
                    <Label>Solution</Label>
                    <Textarea
                        name="solution"
                        value={formData.solution}
                        onChange={handleChange}
                        className="min-h-32"
                        placeholder="Write the solution if the bug is solved..."
                    />
                </div>)}


                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "saving..." : buttonText}
                </Button>
            </form>
        </>
    );
}

export default PostForm;
