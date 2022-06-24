import {
  URL_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_ERROR,
  PRICE_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_ERROR,
  SUBMIT_CREATE_PIC_BTN,
  CANCELֹ_BTN,
  URL_EDIT_PIC_FIELD,
  ALT_EDIT_PIC_FIELD,
  CREDIT_EDIT_PIC_FIELD,
  PRICE_EDIT_PIC_FIELD,
  EDIT_IMAGE_DISPLAY,
  URL_EDIT_PIC_ERROR,
  SUBMIT_EDIT_PIC_BTN,
  ALT_EDIT_PIC_ERROR,
  CREDIT_EDIT_PIC_ERROR,
  PRICE_EDIT_PIC_ERROR,
  CANCELֹ_EDIT_BTN,
} from "./domService.js";

import Picture from "../models/PictureModel.js";
import useForm from "../services/formService.js";
import { onChangePage } from "../routes/router.js";
import PAGES from "../models/pageModel.js";
import { handleSubmitNewPic, onSubmitEditPic } from "../app.js";
import { renderPic } from "../components/renderPic.js";

window.pic = {};

const { onChangeInputField, onClearFormFields } = useForm();
/********* Create Picture **********/
export const handleCreatePic = () => {
  onChangePage(PAGES.CREATE_PIC);
  createPicFormFieldsListeners();
  CANCELֹ_BTN.addEventListener("click", handleCancelCreateNewPic);
  SUBMIT_CREATE_PIC_BTN.addEventListener("click", handleSubmitNewPic);
};

export const createPicFormFieldsListeners = () => {
  const schema = ["url", "alt", "credits", "price"];

  URL_CREATE_PIC_FIELD.addEventListener("input", e => {
    const validation = {
      min: 10,
      max: 256,
      lowerCase: true,
      regex: {
        regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
        message: "Please enter a valid url",
      },
    };

    const element = {
      input: e.target,
      errorSpan: URL_CREATE_PIC_ERROR,
      validation,
    };

    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN);
  });

  ALT_CREATE_PIC_FIELD.addEventListener("input", e => {
    const validation = {
      min: 2,
      max: 256,
    };

    const element = {
      input: e.target,
      errorSpan: ALT_CREATE_PIC_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN);
  });

  CREDIT_CREATE_PIC_FIELD.addEventListener("input", e => {
    const validation = {
      min: 2,
      max: 256,
    };

    const element = {
      input: e.target,
      errorSpan: CREDIT_CREATE_PIC_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN);
  });

  PRICE_CREATE_PIC_FIELD.addEventListener("input", e => {
    const validation = {
      min: 1,
      max: 256,
    };

    const element = {
      input: e.target,
      errorSpan: PRICE_CREATE_PIC_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN);
  });
};

export const handleCancelCreateNewPic = () => {
  const fields = [
    URL_CREATE_PIC_FIELD,
    ALT_CREATE_PIC_FIELD,
    CREDIT_CREATE_PIC_FIELD,
    PRICE_CREATE_PIC_FIELD,
  ];

  const errorSpans = [
    URL_CREATE_PIC_ERROR,
    ALT_CREATE_PIC_ERROR,
    CREDIT_CREATE_PIC_ERROR,
    PRICE_CREATE_PIC_ERROR,
  ];
  onClearFormFields(SUBMIT_CREATE_PIC_BTN, fields, errorSpans);
  onChangePage(PAGES.HOME);
};

export const onCreateNewPic = pictures => {
  try {
    let newArray = [...pictures];
    const pic = new Picture(
      {
        url: URL_CREATE_PIC_FIELD.value,
        alt: ALT_CREATE_PIC_FIELD.value,
        credits: CREDIT_CREATE_PIC_FIELD.value,
        price: +PRICE_CREATE_PIC_FIELD.value,
      },
      pictures
    );
    newArray.push(pic);
    return newArray;
  } catch (error) {
    console.error(error.message);
    PRICE_CREATE_PIC_ERROR.innerHTML = error.message;
  }
};

/********* Edit Picture **********/

const editPicListeners = () => {
  const schema = ["url", "alt", "credits", "price"];
  // ולידציה על שדה כתובת התמונה והצגת התמונה
  const handleUrlEditChange = e => {
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: URL_EDIT_PIC_ERROR,
        validation: {
          min: 10,
          max: 256,
          lowerCase: true,
          regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
        },
      },
      SUBMIT_EDIT_PIC_BTN
    );
    EDIT_IMAGE_DISPLAY.src = e.target.value;
  };

  // עריכת תמונה
  URL_EDIT_PIC_FIELD.addEventListener("input", e => handleUrlEditChange(e));

  ALT_EDIT_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: ALT_EDIT_PIC_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_EDIT_PIC_BTN
    )
  );

  CREDIT_EDIT_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: CREDIT_EDIT_PIC_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_EDIT_PIC_BTN
    )
  );

  PRICE_EDIT_PIC_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PRICE_EDIT_PIC_ERROR,
        validation: { min: 1 },
      },
      SUBMIT_EDIT_PIC_BTN
    )
  );
};

export const handleEditPic = (pictures, id) => {
  onChangePage(PAGES.EDIT_PIC);
  mapToModel(pictures, id);
  editPicListeners();
  SUBMIT_EDIT_PIC_BTN.addEventListener("click", () => onSubmitEditPic(id));
  CANCELֹ_EDIT_BTN.addEventListener("click", onCancelEditPic);
};

export const mapToModel = (pictures, id) => {
  pic = pictures.find(pic => pic._id === id);
  if (!pic) throw new Error("Opss... there is no picture with this id: " + id);
  const { url, alt, credits, price } = pic;
  data = { url, alt, credits, price };
  URL_EDIT_PIC_FIELD.value = url;
  ALT_EDIT_PIC_FIELD.value = alt;
  CREDIT_EDIT_PIC_FIELD.value = credits;
  PRICE_EDIT_PIC_FIELD.value = price;
  EDIT_IMAGE_DISPLAY.src = url;
  EDIT_IMAGE_DISPLAY.alt = alt;
};

export const onCancelEditPic = () => {
  const errorSpans = [
    ALT_EDIT_PIC_ERROR,
    CREDIT_EDIT_PIC_ERROR,
    PRICE_EDIT_PIC_ERROR,
    URL_EDIT_PIC_ERROR,
  ];
  onClearFormFields(SUBMIT_EDIT_PIC_BTN, [], errorSpans);
  onChangePage(PAGES.HOME);
};

export const onEditPic = pictures => {
  pic.url = URL_EDIT_PIC_FIELD.value;
  pic.alt = ALT_EDIT_PIC_FIELD.value;
  pic.credits = CREDIT_EDIT_PIC_FIELD.value;
  pic.price = PRICE_EDIT_PIC_FIELD.value;
  onCancelEditPic();
  return pictures;
};

/*********  Picture Details **********/
export const handlePicDetails = pic => {
  onChangePage(PAGES.PIC_DETAILS);
  renderPic(pic);
};
