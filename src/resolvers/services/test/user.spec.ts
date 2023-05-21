import { beforeEach, describe, it } from "@jest/globals";
import { UserService } from "../user";
import { prismaMock } from "../../../common/prismaJest";

describe("userService", () => {
  let userService: UserService;

  it("test", () => {
    const a = 1;
    expect(a).toBe(1);
  });
});
