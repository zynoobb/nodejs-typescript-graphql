import { PostService } from "./post";
import database from "../../config";
import { Comment } from "@prisma/client";

export class CommentService {
  private readonly postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createComment(postId: string, content: string): Promise<Comment> {
    // postId 유효한지
    const post = await this.postService.findOneByPostId(postId);
    if (!post) throw { status: 404, message: "게시글이 존재하지 않습니다." };

    if (content.trim() === "")
      throw { status: 400, message: "공백은 입력할 수 없습니다." };

    const comment = await database.comment.create({
      data: {
        postId: post.id,
        content,
      },
    });

    return comment;
  }
}
