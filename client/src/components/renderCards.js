import { CARDS_ROW } from "../services/domService.js";

const renderCards = (cards = []) => {
  CARDS_ROW.innerHTML = "";
  cards.map(card => {
    const { _id, url, alt, price, credits } = card;
    CARDS_ROW.innerHTML += `
        <div class="card col-12 col-md-6 col-xl-4 col-xxl-3 mb-2 px-0">
        <img
          src="${url}"
          alt="${alt}"
          class="card-img-top"
          id="pic${_id}"
        />
        <div class="card-body">
          <h5 class="card-title">${alt}</h5>
          <p>Credits: <span class="fw-bold">${credits}</span></p>
          <hr />
          <div class="justify-content-between d-flex">
            <div>Price: <span class="fw-bold">${price}</span>$</div>
            <div class="bi bi-cart cursor" id="like${_id}"></div>
          </div>
        </div>
      </div>
        `;
  });
};

export default renderCards;
