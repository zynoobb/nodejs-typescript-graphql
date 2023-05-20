import { Post } from "@prisma/client";
import database from "../../config";
import { pagination } from "../../common/interfaces/common.interfaces";
import { getPagination } from "../../common/util/pagination";

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

  async fetchPosts(pagination: pagination) {
    const posts = await database.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });

    const [start, end] = getPagination(pagination);
    return posts.slice(start, end);
  }
}
