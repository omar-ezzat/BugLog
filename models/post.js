import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    errorMessage: {
      type: String,
      default: "",
    },

    codeSnippet: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["open", "solved"],
      default: "open",
    },

    solution: {
      type: String,
      default: "",
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
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
