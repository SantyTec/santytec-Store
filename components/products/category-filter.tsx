import CategoryFilterClient from '@/components/products/category-filter-client';
import { getRootCategories } from '@/lib/controller/categories';

export default async function CategoryFilter() {
  const { data: categories } = await getRootCategories();
  if (!categories) return <></>
  
  return(<CategoryFilterClient categories={categories} />) 
}
