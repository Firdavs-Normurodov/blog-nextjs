import { CategoryType } from "@/interfaces/categories.interface";
import { BlogsType } from "@/interfaces/blog.interface";

export interface SidebarProps {
  lastestBlogs: BlogsType[];
  categories: CategoryType[];
}
