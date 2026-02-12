// src/services/base.service.js
class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getPagination(page = 1, limit = 20, condition = {}) {
    const safeLimit =
      parseInt(limit) > 0 && parseInt(limit) < 600 ? parseInt(limit) : 20;

    const offset = (page - 1) * safeLimit;

    const [rows, total] = await Promise.all([
      this.model.findAll(offset, safeLimit, condition),
      this.model.count(condition),
    ]);

    const pagination = {
      currentPage: parseInt(page),
      total: total,
      per_page: safeLimit,
      total_pages: Math.ceil(total / safeLimit),
    };

    if (rows.length > 0) {
      pagination.from = offset + 1;
      pagination.to = offset + rows.length;
    }

    return {
      rows,
      pagination,
    };
  }
}

module.exports = BaseService;
