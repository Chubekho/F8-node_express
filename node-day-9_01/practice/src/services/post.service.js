const prisma = require("@/libs/prisma");

class PostService {
  async getAll() {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return posts;
  }
}

module.exports = new PostService();
