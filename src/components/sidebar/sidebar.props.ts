import { CategoryType } from "src/interfaces/categories.interface";
import { BlogsType } from "src/interfaces/blog.interface";

export interface SidebarProps {
  lastestBlogs: BlogsType[];
  categories: CategoryType[];
}
