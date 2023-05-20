import { Post } from "@prisma/client";
import database from "../../config";
import { pagination } from "../../common/interfaces/common.interfaces";
import { getPagination } from "../../common/util/pagination";
import { ICreatePostArgs } from "../interfaces/post-service.interface";
import { UserService } from "./user";

export class PostService {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  checkEmpty(text: string): void {
    if (text.trim() === "")
      throw { status: 400, message: "공백은 입력할 수 없습니다." };
  }

  async createPost(
    authorId: string,
    createPostInput: ICreatePostArgs
  ): Promise<Post> {
    const { title, content } = createPostInput;
    const user = await this.userService.findOneById(authorId);
    if (!user) throw { status: 404, message: "유저가 존재하지 않습니다." };

    // 공백을 확인하는 로직입니다.
    this.checkEmpty(title);
    this.checkEmpty(content);

    const post = await database.post.create({
      data: {
        authorId: user.id,
        ...createPostInput,
      },
    });

    return post;
  }

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

  async findOneByPostId(id: string): Promise<Post> {
    return database.post.findFirst({ where: { id } });
  }
}
