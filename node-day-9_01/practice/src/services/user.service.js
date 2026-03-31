const prisma = require("@/libs/prisma");

class UserService {
  async getById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        posts: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return users;
  }
}

module.exports = new UserService();
