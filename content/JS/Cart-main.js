const MyDom = {
  filter_container: document.querySelector(".filters-sm "),
  filter_btn: document.querySelector(".filter-btn"),
  slides: document.querySelectorAll(".box-top-slide"),
  header: document.querySelector("header"),
  Cart_icon: document.querySelector(".cart-icon"),
  Cart_container: document.querySelector(".cart-container"),
  Info: document.querySelector(".info"),
  Sign: document.querySelector(".sign-here"),
  LanguagePanelOnHover: document.querySelector(".hove_on"),
  LanguagePanelOnClick: document.querySelector(".click-on"),
  ClientRegion: document.querySelector(".Region"),
  lag: document.querySelector(".language "),
  cur: document.querySelector(".currency"),
  Region: document.querySelector(".country "),
};

MyDom.filter_btn.addEventListener("click", (e) => {
  e.preventDefault();
  MyDom.filter_container.classList.add("show");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.querySelector(".filters-sm-content").classList.add("pop");
  }, 100);
});

MyDom.filter_container.addEventListener("click", (e) => {
  if (e.target.className === "btn btn-close") {
    document.querySelector(".filters-sm-content").classList.remove("pop");

    setTimeout(() => {
      MyDom.filter_container.classList.remove("show");
      document.body.style.overflow = "auto";
    }, 500);
  }
  let li = e.target.closest(".cat-list-item");
  li.style.height = "auto";
  li.firstElementChild.lastElementChild.className = "fas fa-chevron-up";

  setTimeout(() => {
    li.style.height = "44px";
    li.firstElementChild.lastElementChild.className = "fas fa-chevron-down";
  }, 5000);
});

/////
let MaxSlides, currentSlide;
MaxSlides = MyDom.slides.length;
currentSlide = 0;
let GotoSlides = (slide) => {
  MyDom.slides.forEach(
    (el, i) => (el.style.transform = `translateY(${100 * (i - slide)}%)`)
  );
};
GotoSlides(0);

const nextSlide = () => {
  if (currentSlide === MaxSlides - 1) currentSlide = -1;
  else {
    currentSlide++;
    GotoSlides(currentSlide);
  }
};

setInterval(() => {
  nextSlide();
}, 2000);

document.querySelector(".up").addEventListener("click", function (e) {
  e.preventDefault();
  MyDom.header.scrollIntoView({ behavior: "smooth" });
});

let cartOpen;
MyDom.Cart_icon.addEventListener("click", function (e) {
  e.preventDefault();
  if (!cartOpen) {
    MyDom.Cart_container.style.transform = "translateY(0%)";
    document.body.style.overflow = "hidden";
    cartOpen = true;
  } else {
    MyDom.Cart_container.style.transform = "translateY(-200%)";
    document.body.style.overflow = "auto";
    cartOpen = false;
  }
});

const ActiveBar = function (el) {
  return function () {
    if (el.classList.contains("hide")) return el.classList.remove("hide");
    return el.classList.add("hide");
  };
};

////
MyDom.Sign.addEventListener("click", ActiveBar(MyDom.Info));
MyDom.lag.addEventListener("mouseover", ActiveBar(MyDom.LanguagePanelOnHover));
MyDom.lag.addEventListener("click", ActiveBar(MyDom.LanguagePanelOnClick));
MyDom.Region.addEventListener("click", ActiveBar(MyDom.ClientRegion));
