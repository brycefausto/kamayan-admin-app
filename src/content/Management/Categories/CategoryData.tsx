import { Category } from "@/models/category";

export const favorites = {
    'Dishes': 'dishes',
    'Dessert': 'dessert',
    'Snack': 'snack',
    'Feast': 'feast',
    'Street Food': 'street food'
}

export const tags = [
    'dishes',
    'dessert',
    'snack',
    'feast',
    'street food',
    'soup',
    'sinigang',
    'pork sinigang',
]

export const categories: Category[] = [
    {
        id: '1',
        recipeName: 'Sinigang',
        favorite: 'dishes',
        tags: ['pork sinigang', 'sinigang', 'soup'],
        contributor_id: '1',
        contributor_name: 'Admin User',
    },
    {
        id: '2',
        recipeName: 'Sample recipe 1',
        favorite: 'dessert',
        tags: ['dessert'],
        contributor_id: '1',
        contributor_name: 'Admin User',
    },
    {
        id: '3',
        recipeName: 'Sample recipe 2',
        favorite: 'snack',
        tags: ['snack'],
        contributor_id: '1',
        contributor_name: 'Admin User',
    }
]
