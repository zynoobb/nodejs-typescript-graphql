import { Comment } from "@prisma/client";
import { CommentService } from "./services/comment";

class CommentResolver {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  createComment(
    _,
    { postId, content }: { postId: string; content: string }
  ): Promise<Comment> {
    return this.commentService.createComment(postId, content);
  }
}

const commentResolver = new CommentResolver();

const resolver = {
  Mutation: {
    createComment: (_, args) => commentResolver.createComment(_, args),
  },
};

export default resolver;
