import { PostService } from "./services/post";

class PostResolver {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }
}

const resolvers = {
  Query: {},
  Mutation: {},
};

export default resolvers;
