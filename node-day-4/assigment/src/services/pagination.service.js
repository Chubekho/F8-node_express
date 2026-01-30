class PaginationService {
  async apply(service) {
    if (!service.model) {
      throw new Error("Model is required for PaginationService");
    }
    service.pagination = async (page, condition) => {
      let limit = 20;
      if (condition.limit) {
        limit =
          parseInt(condition.limit) < 600 ? parseInt(condition.limit) : 500;
      }

      const offset = (page - 1) * limit;
      const rows = await service.model.findAll(offset, limit, condition);
      const count = await service.model.count();

      const pagination = {
        currentPage: page,
        total: count,
        per_page: limit,
      };

      if (rows.length) {
        pagination.from = offset + 1;
        pagination.to = offset + rows.length;
      }
      return {
        rows,
        pagination,
      };
    };
  }
}

module.exports = new PaginationService();
