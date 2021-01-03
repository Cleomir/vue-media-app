export const apiUrl = process.env.VUE_APP_API_URL || "http://localhost:3000";
export const cloudinaryListPicturesUrl = `${apiUrl}/api/cloudinary/`;
export const pexelsSearchUrl = `${apiUrl}/api/pexels/search`;
export const unsplashSearchUrl = `${apiUrl}/api/unsplash/search`;
export const uploadPictureUrl = `${apiUrl}/api/cloudinary/upload`;
