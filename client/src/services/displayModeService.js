import DISPLAY from "../models/displayModel.js";
import { onChangeDisplayMode } from "../routes/router.js";
import renderTable from "../components/renderTable.js";
import renderCards from "./../components/renderCards.js";
import { handleDeletePic } from "../app.js";
import { handleEditPic, handlePicDetails } from "./picService.js";

export const handleDisplayMode = (display, pictures) => {
  onChangeDisplayMode(display, pictures);
  if (display === DISPLAY.TABLE) {
    renderTable(pictures);
    pictures.forEach(pic => {
      addOnDelete(pic._id);
      addOnEditPic(pictures, pic._id);
    });
  }
  if (display === DISPLAY.CARDS) {
    renderCards(pictures);
    pictures.forEach(pic => {
      // addOnLike(pic._id);
      addOnDetails(pic._id, pic);
    });
  }
};

// הוספת מאזין למחיקת תמונה
const addOnDelete = id => {
  document
    .getElementById("delete" + id)
    .addEventListener("click", () => handleDeletePic(id));
};
// הוספת מאזין לדף תמונה
export const addOnDetails = (id, pic) => {
  document
    .getElementById(`pic${id}`)
    .addEventListener("click", () => handlePicDetails(pic));
};

// הוספת מאזין לעריכת תמונה
export const addOnEditPic = (pictures, id) => {
  document
    .getElementById(`edit${id}`)
    .addEventListener("click", () => handleEditPic(pictures, id, new Date()));
};

// הוספת מאזין להוספת תמונה למועדפים
// const addOnLike = id => {
//   document
//     .getElementById("like" + id)
//     .addEventListener("click", () => handleLikePic(id));
// };
