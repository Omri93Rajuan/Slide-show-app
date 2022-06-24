import PAGES from "./models/pageModel.js";
import { onChangePage, setNavDisplay } from "./routes/router.js";
import { renderSlider } from "./components/renderSlider.js";
import { setCounter } from "./services/sliderService.js";
import initialData from "./initialData/initialData.js";

import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  SIGNUP_PAGE_LINK,
  LOGOUT_LINK,
  TABLE_ICON,
  SLIDER_ICON,
  CARDS_ICON,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
  EDIT_USER_PAGE_LINK,
} from "./services/domService.js";
import {
  handleCancelCreateNewPic,
  handleCreatePic,
  onCancelEditPic,
  onCreateNewPic,
  onEditPic,
} from "./services/picService.js";
import {
  handleCancelSignup,
  handleEditUser,
  handleLogin,
  handleSignup,
  onCancelEditUser,
  onEditUser,
  onSignupNewUser,
} from "./services/userService.js";
import { removeItemFromLocalStorage } from "./services/localStorageService.js";
import DISPLAY from "./models/displayModel.js";
import { handleDisplayMode } from "./services/displayModeService.js";
import {
  filterArrayOfObjectsByTerm,
  sortArrayOfObject,
  sortReverseArrayOfObject,
} from "./utils/algoMethods.js";

let counter = 0;
export let pictures;
let users;

const getData = async () => {
  try {
    /********** יצירת משתנים גלובליים **********/
    const data = await initialData();
    users = data.users;
    pictures = data.pictures;

    /********** לוגיקה ***********/
    const handleSliderPicChange = (controller = "") => {
      counter = setCounter(pictures, counter, controller);
      renderSlider(pictures, counter);
    };

    /********** filter pictures **********/
    const handleFilterPictures = term => {
      const newPictures = filterArrayOfObjectsByTerm(term, pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, newPictures);
    };

    /********** האזנה לאירועים ***********/
    // ניתוב דפים
    HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
    ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
    CREATE_PIC_PAGE_LINK.addEventListener("click", handleCreatePic);
    SIGNUP_PAGE_LINK.addEventListener("click", handleSignup);
    LOGIN_PAGE_LINK.addEventListener("click", () => handleLogin(users));
    LOGOUT_LINK.addEventListener("click", () => {
      removeItemFromLocalStorage("user");
      setNavDisplay();
    });
    EDIT_USER_PAGE_LINK.addEventListener("click", () => handleEditUser(users));
    LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

    // מצגת תמונות
    SLIDER_PREV_BTN.addEventListener("click", () =>
      handleSliderPicChange("prev")
    );
    SLIDER_NEXT_BTN.addEventListener("click", () =>
      handleSliderPicChange("next")
    );

    // Display Mode
    TABLE_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.TABLE, pictures)
    );
    SLIDER_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.SLIDER, pictures)
    );
    CARDS_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.CARDS, pictures)
    );

    // Sorting
    SORT_DOWN_ICON.addEventListener("click", () => {
      pictures = sortArrayOfObject(pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, pictures);
    });

    SORT_UP_ICON.addEventListener("click", () => {
      pictures = sortReverseArrayOfObject(pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, pictures);
    });

    // שדה חיפוש
    SEARCH_BAR.addEventListener("input", e =>
      handleFilterPictures(e.target.value)
    );

    /********** אתחול ראשוני ***********/
    handleSliderPicChange();
    setNavDisplay();
    // onChangePage(PAGES.EDIT_USER);
    onChangePage(PAGES.HOME);
    handleDisplayMode(DISPLAY.SLIDER, pictures);
    // handleDisplayMode(DISPLAY.TABLE, pictures);
  } catch (error) {
    console.log(error);
  }
};

getData();

/********* Create Picture **********/
export const handleSubmitNewPic = () => {
  pictures = onCreateNewPic(pictures);
  handleCancelCreateNewPic();
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********* Delete Picture **********/
export const handleDeletePic = id => {
  pictures = pictures.filter(pic => pic._id !== id);
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********** Edit picture **********/
export const onSubmitEditPic = id => {
  pictures = onEditPic(pictures, id);
  onCancelEditPic();
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********** Signup new User **********/
export const handleSubmitSignup = () => {
  users = onSignupNewUser(users);
  handleCancelSignup();
  onChangePage(PAGES.HOME);
};

/********** Edit picture **********/
export const onSubmitEditUser = id => {
  users = onEditUser(users, id);
  onCancelEditUser();
  handleDisplayMode(DISPLAY.SLIDER, pictures);
};
