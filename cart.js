import { data } from "./item.js";
import { currencyFormater } from "./util/currency-Formater.js";
const cartMain = document.querySelector("[cart-main-container]");
const cartMainWrapper = document.querySelector("[cart-main-wrapper]");
const cartMainTotal = document.querySelector("[cart-main-total]");
const cartTemplate = document.querySelector("[data-cart-template]");
const cartContainer = document.querySelector("#cart-item-container");
const cartTotal = document.querySelector("[data-cart-total-calc]");
const cartLogoNum = document.querySelector("[data-cart-logo-qt]");
let cartArray = JSON.parse(localStorage.getItem("shoppers-store")) || [];

const calculateTotalPrice = (cartArray) => {
  let total = 0;
  cartArray.forEach((i) => {
    total += i.price * i.quantity;
  });
  cartTotal.innerHTML = currencyFormater(total);
  return total;
};

const populateCart = (arr) => {
  cartContainer.innerHTML = "";
  const total = calculateTotalPrice(cartArray);
  if (total <= 0) {
    cartMain.classList.add("invisible");
  } else {
    cartMain.classList.remove("invisible");
  }
  cartLogoNum.innerHTML = cartArray.length;
  arr.forEach((i) => {
    const cartTemplateClone = cartTemplate.content.cloneNode(true);

    cartTemplateClone.querySelector("[data-cart-item]").id = i.id;
    cartTemplateClone.querySelector("[data-cart-item-name]").textContent =
      i.name;
    cartTemplateClone.querySelector("[data-cart-item-price]").textContent =
      currencyFormater(i.price);
    cartTemplateClone.querySelector(
      "[data-cart-item-showcase]"
    ).style.background = i.value;
    cartTemplateClone.querySelector("[data-cart-item-multiple]").innerHTML =
      i.quantity;

    cartContainer.appendChild(cartTemplateClone);
  });
};

document.addEventListener("load", populateCart(cartArray));
const AddToCart = (id) => {
  const obj = data.find((d) => d.id === id);

  if (cartArray.some((o) => o.id === id)) {
    const Cobj = cartArray.find((d) => d.id === id);
    cartArray = cartArray.filter((d) => d.id !== id);
    console.log(Cobj);
    cartArray.push({ ...Cobj, quantity: parseInt(Cobj.quantity + 1) });
    // console.log({ quantity: obj.quantity + 1, ...obj });
  } else {
    cartArray.push(obj);
  }

  populateCart(cartArray);
  localStorage.setItem("shoppers-store", JSON.stringify(cartArray));

  // const newArray = data.filter((d) => d.id === id);
};

const handleCartEvent = (e) => {
  if (e.target.classList[0] === "cart-logo") {
    cartMainWrapper.classList.toggle("invisible");
    cartMainTotal.classList.toggle("invisible");
  } else if (Array.from(e.target.classList).includes("store-item--add")) {
    AddToCart(parseInt(e.target.parentNode.id));
  } else if (Array.from(e.target.classList).includes("cart-item--img")) {
    const id = e.target.parentNode.id;
    cartArray = cartArray.filter((i) => i.id !== parseInt(id));
  }
  populateCart(cartArray);
};
document.addEventListener("click", handleCartEvent);

export const cart = () => {};
