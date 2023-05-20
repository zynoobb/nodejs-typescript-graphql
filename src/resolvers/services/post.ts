import { Post } from "@prisma/client";
import database from "../../config";

export class PostService {
  async fetchPost(id: string): Promise<Post> {
    return database.post.findFirst({
      where: { id },
      include: {
        user: true,
        comments: true,
      },
    });
  }
}
