import { Post } from "@prisma/client";
import { PostService } from "./services/post";

class PostResolver {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  fetchPost(_, { id }: { id: string }): Promise<Post> {
    try {
      return this.postService.fetchPost(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const postResolver = new PostResolver();

const resolvers = {
  Query: {
    fetchPost: (_, args) => postResolver.fetchPost(_, args),
  },
  Mutation: {},
};

export default resolvers;
