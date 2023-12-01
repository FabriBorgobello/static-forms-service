import { Request } from 'express';

export function calculatePagination(req: Request, totalCount: number, limit: number, page: number) {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

  const nextUrl = page * limit < totalCount ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;
  const prevUrl = page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;

  return {
    count: totalCount,
    next: nextUrl,
    previous: prevUrl,
  };
}
