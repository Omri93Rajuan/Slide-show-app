import Picture from "../models/PictureModel.js";
import User from "../models/UserModel.js";

// const initialData = () => {
//   const data = {
//     pictures: [
//       {
//         url: "https://cdn.pixabay.com/photo/2022/03/12/19/14/sea-7064686_960_720.jpg",
//         alt: "sunset",
//         credits: "Gorge W Bosh",
//         price: 1_000,
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2021/12/21/08/29/owl-6884773_960_720.jpg",
//         alt: "owl",
//         credits: "Jessica Rabbit",
//         price: 5_000,
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2022/02/26/07/06/butterfly-7035308_960_720.jpg",
//         alt: "butterfly",
//         credits: "Tyra Banks",
//         price: 500,
//       },
//     ],
//     users: [
//       {
//         name: { first: "regular", last: "user" },
//         address: {
//           state: "USA",
//           country: "big",
//           city: "New York",
//           street: "52",
//           houseNumber: "109",
//           zip: 562145,
//         },
//         phone: "050-0000000",
//         email: "user@gmail.com",
//         password: "Aa1234!",
//         isBusiness: false,
//       },
//       {
//         name: { first: "bUsiness", last: "user" },
//         address: {
//           state: "USA",
//           country: "cal",
//           city: "New Jersey",
//           street: "bird",
//           houseNumber: "54",
//           zip: 123456,
//         },
//         phone: "050-0000000",
//         email: "business@gmail.com",
//         password: "Aa1234!",
//         isBusiness: true,
//         isAdmin: false,
//       },
//       {
//         name: { first: "admin", last: "user" },
//         address: {
//           state: "Israel",
//           country: "Israel",
//           city: "Tel Aviv",
//           street: "",
//           houseNumber: "",
//           zip: 0,
//         },
//         phone: "050-0000000",
//         email: "admin@gmail.com",
//         password: "Aa1234!",
//         isBusiness: true,
//         isAdmin: true,
//       },
//     ],
//   };

//   const pictures = data.pictures.map((picture, index, pictures) => {
//     return new Picture(picture, pictures);
//   });

//   const users = data.users.map((user, index, users) => {
//     return new User(user);
//   });

//   return { pictures, users };
// };

const initialData = async () => {
  try {
    const response = await fetch("../../../db/slideShow.json");
    let { pictures, users } = await response.json();

    pictures = pictures.map((picture, index, pictures) => {
      return new Picture(picture, pictures);
    });

    users = users.map(user => {
      return new User(user);
    });

    return { pictures, users };
  } catch (error) {
    console.log(error.message);
  }
};

export default initialData;
