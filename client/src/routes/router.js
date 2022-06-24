import DISPLAY from "../models/displayModel.js";
import PAGES from "../models/pageModel.js";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CREATE_PIC_PAGE,
  LOGIN_PAGE,
  ERROR_PAGE,
  SIGNUP_PAGE,
  ADD_PIC_LINK_CONTAINER,
  LOGIN_LINK_CONTAINER,
  LOGOUT_LINK_CONTAINER,
  NO_DATA_CONTAINER,
  DATA_CONTAINER,
  SLIDER_CONTAINER,
  TABLE_CONTAINER,
  CARDS_CONTAINER,
  EDIT_PIC_PAGE,
  SEARCHBAR_CONTAINER,
  EDIT_USER_PAGE,
  PIC_DETAILS_PAGE,
} from "../services/domService.js";
import { getItemFromLocalStorage } from "../services/localStorageService.js";

export const onChangePage = page => {
  HOME_PAGE.className = "d-none";
  ABOUT_PAGE.className = "d-none";
  CREATE_PIC_PAGE.className = "d-none";
  EDIT_PIC_PAGE.className = "d-none";
  PIC_DETAILS_PAGE.className = "d-none";
  SIGNUP_PAGE.className = "d-none";
  LOGIN_PAGE.className = "d-none";
  EDIT_USER_PAGE.className = "d-none";
  ERROR_PAGE.className = "d-none";

  if (page === PAGES.HOME) return (HOME_PAGE.className = "d-block");
  if (page === PAGES.ABOUT) return (ABOUT_PAGE.className = "d-block");
  if (page === PAGES.CREATE_PIC) return (CREATE_PIC_PAGE.className = "d-block");
  if (page === PAGES.EDIT_PIC) return (EDIT_PIC_PAGE.className = "d-block");
  if (page === PAGES.PIC_DETAILS)
    return (PIC_DETAILS_PAGE.className = "d-block");
  if (page === PAGES.SIGN_UP) return (SIGNUP_PAGE.className = "d-block");
  if (page === PAGES.EDIT_USER) return (EDIT_USER_PAGE.className = "d-block");
  if (page === PAGES.LOGIN) return (LOGIN_PAGE.className = "d-block");

  ERROR_PAGE.className = "d-block";
};

export const setNavDisplay = () => {
  ADD_PIC_LINK_CONTAINER.className = "d-none";
  const token = getItemFromLocalStorage("user");
  if (!token) {
    LOGIN_LINK_CONTAINER.className = "navbar-nav";
    LOGOUT_LINK_CONTAINER.className = "d-none";
    return;
  }
  LOGIN_LINK_CONTAINER.className = "d-none";
  LOGOUT_LINK_CONTAINER.className = "navbar-nav";

  const user = JSON.parse(token);

  if (user.isBusiness) return (ADD_PIC_LINK_CONTAINER.className = "nav-item");
};

export const onChangeDisplayMode = (display, pictures = []) => {
  NO_DATA_CONTAINER.className = "d-none";
  DATA_CONTAINER.className = "d-none";
  SLIDER_CONTAINER.className = "d-none";
  TABLE_CONTAINER.className = "d-none";
  CARDS_CONTAINER.className = "d-none";
  SEARCHBAR_CONTAINER.className = "d-none";

  if (!pictures.length) {
    SEARCHBAR_CONTAINER.className = "d-block";
    NO_DATA_CONTAINER.className = "d-block";
    return;
  }
  DATA_CONTAINER.className = "d-block";
  if (display === DISPLAY.SLIDER)
    return (SLIDER_CONTAINER.className = "d-block");
  if (display === DISPLAY.TABLE) {
    SEARCHBAR_CONTAINER.className = "d-block";
    TABLE_CONTAINER.className = "d-block";
    return;
  }
  if (display === DISPLAY.CARDS) return (CARDS_CONTAINER.className = "d-block");
};
