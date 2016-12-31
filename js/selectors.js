function $ (selector, el) {
     if (!el) {el = document;}
     return el.querySelector(selector);
}

// ovo se kolje sa muu tuls
// function $$ (selector, el) {
//      if (!el) {el = document;}
//      return Array.prototype.slice.call(el.querySelectorAll(selector));
// }