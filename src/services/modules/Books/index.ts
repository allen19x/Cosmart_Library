import { api } from '../../api';

export type BooksParams = {
  works: any;
  offset: number;
  limit: number;
  subject: string;
  details: boolean;
};

export const booksAPI = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: build.query<BooksParams, any>({
      query: ({ subject, details }) =>
        `subjects/${subject.toLowerCase()}.json?details=${details}`,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyFetchOneQuery } = booksAPI;
