// import { beforeEach, describe, it } from "@jest/globals";
// import { UserService } from "../user";
// import { prismaMock } from "../../../common/prismaJest";

// describe("userService", () => {
//   let userService: UserService;

//   beforeEach(() => {
//     userService = new UserService();
//   });

//   describe("findOneByName", () => {
//     it("should find a user by name", async () => {
//       const mockedUser = {
//         id: "123",
//         email: "test@example.com",
//         password: "test",
//         name: "name",
//         createAt: new Date(),
//       };
//       prismaMock.user.findFirst.mockResolvedValueOnce(mockedUser);

//       const email = "test@example.com";
//       const result = await userService.findOneByName(email);

//       expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
//         where: { email },
//       });
//       expect(result).toEqual(mockedUser);
//     });
//   });
// });
