import { PIC_DETAILS_PAGE } from "../services/domService.js";

export const renderPic = pic => {
  const { createdAt, credits, alt, price, _id, url, likes } = pic;
  PIC_DETAILS_PAGE.innerHTML = "";
  PIC_DETAILS_PAGE.innerHTML = `
  <div class="center mt-4">
  <div class="col-12 col-md-10 col-xl-8">
    <h1 class="text-center display-4">${alt}</h1>
    <h2 class="fs-5">Hear you can find details about the picture: ${alt}</h2>
    <hr />
  </div>
</div>
<div class="container">
  <div class="row mx-0">
    <div class="card col-12 col-md-6 col-xl-6 p-2 border-0">
      <div>Published At :<span class="fw-bold">${createdAt.toLocaleString()}</span></div>
      <div>Credits :<span class="fw-bold">${credits}</span></div>
      <div>Price :<span class="fw-bold">${price}</span>$</div>
      <div>Id :<span class="fw-bold">${_id}</span></div>
      <div>Likes :<span class="fw-bold">${likes.length}</span></div>
      <div>Url :<span class="fw-bold">${url}</span></div>
    </div>

    <div
      class="center col-12 col-md-6 col-xl-6  p-2  mb-2"
    >
      <img
        src="${url}"
        alt="${alt}"
        class="img-fluid"
      />
    </div>
  </div>
</div>
    `;
};
