import {
  generateUniqNumber,
  makeFirstLetterCapital,
} from "../utils/algoMethods.js";

class User {
  #id;
  #name;
  address = {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  };
  #phone;
  #email;
  #password;
  #createdAt;
  #isAdmin = false;
  #isBusiness = false;

  constructor(user, users = []) {
    const {
      name: { first, last },
      address,
      phone,
      email,
      password,
      isBusiness,
      isAdmin = false,
    } = user;
    const { state, country, city, street, houseNumber, zip } = address;
    this.address = { state, country, city, street, houseNumber, zip };
    this.#id = generateUniqNumber(users, "_id");
    this.#name = this.setName(first, last);
    this.#phone = this.checkPhone(phone);
    this.#email = this.checkEmail(email, users);
    this.#password = this.checkPassword(password);
    this.#isBusiness = isBusiness;
    this.#isAdmin = isAdmin;
    this.#createdAt = new Date();
  }

  setName(first, last) {
    const firstName = makeFirstLetterCapital(first);
    const lastName = makeFirstLetterCapital(last);
    return `${firstName} ${lastName}`;
  }

  changeBusinessStatus(user) {
    if (!user.isAdmin) return null;
    this.#isBusiness = !this.#isBusiness;
  }

  checkPhone(phoneNumber) {
    if (
      phoneNumber.match(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g) ===
      null
    ) {
      throw new Error("Please enter a valid phone number!");
    }
    return phoneNumber;
  }

  checkPassword(password) {
    if (
      password.match(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g
      ) === null
    )
      throw new Error(
        "The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
    return password;
  }
  checkEmail(email, users = []) {
    if (email.match(/.+@.+\..{2,}/g) === null) {
      throw new Error("Please enter a standard email");
    }
    const user = users.findIndex(user => user.email === email);
    if (user !== -1) throw new Error("User is already registered!");
    return email;
  }
  get _id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get isAdmin() {
    return this.#isAdmin;
  }

  get isBusiness() {
    return this.#isBusiness;
  }
  get phone() {
    return this.#phone;
  }

  set phone(phone) {
    this.#phone = this.checkPhone(phone);
  }
  set isBusiness(biz) {
    this.#isBusiness === biz;
  }

  set name({ first, last }) {
    this.#name = this.setName(first, last);
  }
}

export default User;
