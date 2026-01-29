class PaginationService {
  async apply(service) {
    if (!service.model) {
      throw new Error("Model is required for PaginationService");
    }

    service.pagination = async (page, limit) => {
      const offset = (page - 1) * limit;

      const rows = await service.model.findAll(limit, offset);
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
