'use strict';

// * Variable
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector('#section--1');
const nav = document.querySelector(".nav__links");
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = tabContainer.querySelectorAll(".btn");
const contents = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// * Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// * Scrolling 
// ? old verision window.scrollTo(요소의 절대좌표)
// MEMO: 절대좌표 = getBoundingClientRect().top + window.pageYOffset;

btnScrollTo.addEventListener("click", () => {

  // const sec1Coord = section1.getBoundingClientRect();
  // const absCoord = sec1Coord.top + window.pageYOffset;
  
  // window.scrollTo({
  //   left: 0,
  //   top: absCoord,
  //   behavior: "smooth"
  // });

  // ? modern javascript
  section1.scrollIntoView({behavior: "smooth"})

}) 


///////////////////////////////////////
// *  page navigation
nav.addEventListener("click", (e) => {
  // MEMO: a 태그의 기본 동작(href경로로 이동)을 막음 -> href는 데이터로서 사용하기 위함
  e.preventDefault();

  // MEMO: 이벤트 위임에는 Matching strategy가 필요하다.
  if (e.target.classList.contains("nav__link")) {
    // MEMO: href의 상대적 경로를 가져오기위해 getAttribute를 사용함.
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth"})
  }
})

///////////////////////////////////////
// * tab component
tabContainer.addEventListener("click", (e) => {
  //MEMO: 클릭된 것이 버튼안의 span 요소라면..?
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  
  tabs.forEach((btn) => {
    btn.classList.remove("operations__tab--active")
  })
  contents.forEach((btn) => {
    btn.classList.remove("operations__content--active")
  })

  // MEMO: button에 dataset을 content와 연관시키도록 하여 활용한다.
  clicked.classList.add("operations__tab--active")
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
  
})