// Environment Variables
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '' as string;
export const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE || '' as string;
export const WEBSITE_LINK = process.env.NEXT_PUBLIC_WEBSITE_LINK || '' as string;
export const COMING_SOON  = (process.env.NEXT_PUBLIC_COMING_SOON || '') === 'true';
export const MAINTENANCE = (process.env.NEXT_PUBLIC_MAINTENANCE || '') === 'true';

// ImageKit Environment Variables
export const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '' as string;
export const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '' as string;
export const IMAGEKIT_AUTHENTICATION_PATH = process.env.NEXT_PUBLIC_IMAGEKIT_AUTHENTICATION_PATH || '' as string;
export const IMAGEKIT_APP_FOLDER_PATH = process.env.NEXT_PUBLIC_IMAGEKIT_APP_FOLDER_PATH || '' as string;

// Global Variables
export const LOGO_URL = '/kamayan-icon-192x192.png'
export const MAX_FILE_SIZE = 2000000
