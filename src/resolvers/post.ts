import { Post } from "@prisma/client";
import { pagination } from "../common/interfaces/common.interfaces";
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

  fetchPosts(_, { pagination }: { pagination: pagination }) {
    try {
      return this.postService.fetchPosts(pagination);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const postResolver = new PostResolver();

const resolvers = {
  Query: {
    fetchPost: (_, args) => postResolver.fetchPost(_, args),
    fetchPosts: (_, args) => postResolver.fetchPosts(_, args),
  },
  Mutation: {},
};

export default resolvers;
