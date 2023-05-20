import { Post } from "@prisma/client";
import { pagination } from "../common/interfaces/common.interfaces";
import { ICreatePostArgs } from "./interfaces/post-service.interface";
import { PostService } from "./services/post";
import { GraphQLDateTime } from "graphql-scalars";
class PostResolver {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }
  createPost(
    _,
    {
      authorId,
      createPostInput,
    }: { authorId: string; createPostInput: ICreatePostArgs }
  ): Promise<Post> {
    try {
      return this.postService.createPost(authorId, createPostInput);
    } catch (error) {
      throw new Error(error);
    }
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
  DateTime: GraphQLDateTime,
  Query: {
    fetchPost: (_, args) => postResolver.fetchPost(_, args),
    fetchPosts: (_, args) => postResolver.fetchPosts(_, args),
  },
  Mutation: {
    createPost: (_, args) => postResolver.createPost(_, args),
  },
};

export default resolvers;
