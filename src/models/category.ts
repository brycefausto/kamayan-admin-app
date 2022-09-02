export interface Category {
  id: string;
  recipeName: string;
  favorite: string;
  tags: string[],
  contributor_id: string,
  contributor_name: string,
  imageUrl?: string
}
