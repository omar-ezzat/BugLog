import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    authorId: {
      type: String,
      required: true,
    },

    authorName: {
      type: String,
      required: true,
    },

    authorImage: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema)

export default Comment
