import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


const CommentCard = ({ comment }) => {
    return (
        <>
            <Card>
                <CardContent className="p-4 flex gap-3">
                    <Avatar>
                        <AvatarFallback>
                            {comment.authorName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">{comment.authorName}</h4>
                            <span className="text-xs text-muted-foreground">
                                {comment.createdAt}
                            </span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {comment.content}
                        </p>

                        <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline">
                                Edit
                            </Button>
                            <Button size="sm" variant="destructive">
                                Delete
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </>
    );
}

export default CommentCard;
