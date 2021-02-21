export const userHasLiked = (currentuserId, likesArray) => {
  if (currentuserId && likesArray && likesArray.some((likers) => likers === currentuserId)) return true;
};