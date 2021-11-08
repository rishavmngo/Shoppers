import { data } from "./item.js";
import { currencyFormater } from "./util/currency-Formater.js";
const itemTemplate = document.querySelector("[data-store-item-template]");
const store = document.querySelector("[data-store]");
export const launchStore = () => {
  data.forEach((i) => buildElement(i));
};

const buildElement = (i) => {
  const itemTemplateClone = itemTemplate.content.cloneNode(true);

  itemTemplateClone.querySelector("[data-store-item]").id = i.id;
  itemTemplateClone.querySelector("[data-store-item-name]").textContent =
    i.name;
  itemTemplateClone.querySelector("[data-store-item-price]").textContent =
    currencyFormater(i.price);
  itemTemplateClone.querySelector(
    "[data-store-item-showcase]"
  ).style.background = i.value;

  store.appendChild(itemTemplateClone);
};
