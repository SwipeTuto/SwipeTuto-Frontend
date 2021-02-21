export const likeUpdate = (cardId) => {
  const likedCardText = document.getElementById(`likesNumber${cardId}`);
  const heartEl = document.getElementById(`CardPreviewSmall__heart${cardId}`);
  const likesNumberPopupLogo = document.getElementById(`likesNumberPopupLogo${cardId}`)
  const likesNumberPopupNumber = document.getElementById(`likesNumberPopupNumber${cardId}`)
  if (heartEl && heartEl.classList.contains("active") && likedCardText) {
    likedCardText.textContent = parseInt(likedCardText.textContent) - 1;
    heartEl.classList.remove("active");
  } else if (heartEl && likedCardText) {
    likedCardText.textContent = parseInt(likedCardText.textContent) + 1;
    heartEl.classList.add("active");
  }

  if (likesNumberPopupLogo && likesNumberPopupLogo.classList.contains("active") && likesNumberPopupNumber) {
    likesNumberPopupNumber.textContent = parseInt(likesNumberPopupNumber.textContent) - 1;
    likesNumberPopupLogo.classList.remove("active");
    return
  } else if (likesNumberPopupLogo && likesNumberPopupNumber) {
    likesNumberPopupNumber.textContent = parseInt(likesNumberPopupNumber.textContent) + 1;
    likesNumberPopupLogo.classList.add("active");
  }
};