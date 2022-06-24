import { randomNumBetween } from "../utils/algoMethods.js";

class Picture {
  #id;
  url;
  alt;
  #createdBy;
  #price;
  createdAt;
  likes = [];

  constructor(picture, pictures = []) {
    const { url, alt, credits, price } = picture;
    this.url = url;
    this.alt = alt;
    this.#createdBy = credits;
    this.#price = price;
    this.createdAt = new Date();
    this.#id = this.generateId(pictures);
  }
  generateId(array) {
    const random = randomNumBetween(1_000_000, 9_999_999);
    const pic = array.findIndex(pic => pic._id === random);
    if (pic === -1) return (this.#id = random);
    this.generateId(array);
  }

  get _id() {
    return this.#id;
  }
  get credits() {
    return this.#createdBy;
  }
  set credits(credits) {
    this.#createdBy = credits;
  }
  get price() {
    return this.#price;
  }
  set price(price) {
    if (price <= 15) return console.log("Price is too low!");
    this.#price = price;
  }
}

export default Picture;
