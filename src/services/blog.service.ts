import { request, gql } from "graphql-request";
import { BlogsType } from "@/interfaces/blog.interface";
import { CategoryType } from "@/interfaces/categories.interface";
const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
export const BlogService = {
  async getAllBlogs() {
    const query = gql`
      query GetBlogs {
        blogs {
          excerpt
          id
          slug
          title
          createdAt
          image {
            url
          }
          author {
            ... on Author {
              id
              name
              avatar {
                url
              }
            }
          }
          description {
            html
            text
          }
        }
      }
    `;
    const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
    return result.blogs;
  },
  async getLatestBlog() {
    const query = gql`
      query GetLatestBlog {
        blogs(last: 2) {
          id
          slug
          title
          createdAt
          image {
            url
          }
          author {
            ... on Author {
              id
              name
              avatar {
                url
              }
            }
          }
          category {
            ... on Category {
              label
              slug
            }
          }
          description {
            text
          }
        }
      }
    `;
    const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
    return result.blogs;
  },
  async getCategories() {
    const query = gql`
      query GetCategories {
        categories {
          slug
          label
        }
      }
    `;
    const result = await request<{ categories: CategoryType[] }>(
      graphqlAPI,
      query
    );
    return result.categories;
  },
  async getDetailBlogs(slug: string) {
    const query = gql`
      query GetDetailBlog($slug: String!) {
        blog(where: { slug: $slug }) {
          excerpt
          id
          slug
          title
          createdAt
          image {
            url
          }
          author {
            ... on Author {
              id
              name
              avatar {
                url
              }
            }
          }
          description {
            html
            text
          }
        }
      }
    `;

    const result = await request<{ blog: BlogsType[] }>(graphqlAPI, query, {
      slug,
    }); // ✅ `slug` o‘zgaruvchisini qo‘shdik
    return result.blog;
  },
  async getDetailCategoriesBlog(slug: string) {
    const query = gql`
      query GetDetailCategoriesBlog($slug: String!) {
        category(where: { slug: $slug }) {
          blog {
            excerpt
            id
            slug
            title
            createdAt
            image {
              url
            }
            author {
              ... on Author {
                id
                name
                avatar {
                  url
                }
              }
            }
            description {
              html
              text
            }
          }
        }
      }
    `;

    const result = await request<{ category: { blog: BlogsType[] } }>(
      graphqlAPI,
      query,
      { slug }
    );
    return result.category.blog; // To'g'ridan-to'g'ri category ichidagi blog massivini qaytaramiz
  },
};
