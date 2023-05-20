import { pagination } from "../interfaces/common.interfaces";

export function getPagination(pagination: pagination): number[] {
  let page, limit;
  if (!pagination) {
    page = 1;
    limit = 5;
  }

  const [start, end] = [(page - 1) & limit, limit * page];

  return [start, end];
}
