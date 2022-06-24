import { SLIDER_IMAGE, SLIDER_CREDITS } from "../services/domService.js";

/********** הדפסה לדף הגולש **********/
export const renderSlider = (pictures, counter = 0) => {
  if (!pictures.length) return null;
  SLIDER_IMAGE.src = pictures[counter].url;
  SLIDER_IMAGE.alt = pictures[counter].alt;
  SLIDER_CREDITS.innerHTML = pictures[counter].credits;
};
