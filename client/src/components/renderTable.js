import { TABLE_BODY } from "../services/domService.js";
// import { handleEditPic } from "../services/picService.js";

const renderTable = (pictures = []) => {
  TABLE_BODY.innerHTML = "";
  pictures.map((picture, index) => {
    const { _id, url, alt, credits } = picture;
    TABLE_BODY.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>
      <img
        style="max-width: 50px"
        src="${url}"
        alt="${alt}"
      />
    </td>
    <td>
      ${url}
    </td>
    <td>${alt}</td>
    <td>${credits}</td>
    <td><i class="bi bi-pencil-square cursor" id="edit${_id}"></i></td>
    <td><i class="bi bi-trash3-fill cursor" id="delete${_id}"></i></td>
  </tr>
            `;
  });
};

export default renderTable;
