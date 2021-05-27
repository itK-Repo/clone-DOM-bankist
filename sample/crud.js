// * selecting elements
console.log(document.documentElement); // 문서 전체
console.log(document.head)
console.log(document.body)

const header = document.querySelector(".header")
// NodeList(4) -> 할당 후 변경사항은 자동으로 반영되지 않음
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById('section--1');
// HTMLCollection(9) -> 할당 후 변경사항이 자동으로 반영된다. 삭제하면 9 -> 8
const allButtons = document.getElementsByTagName('button');
document.getElementsByClassName('btn');

// * creating and Inseting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use Cookied for Somthing Functionality \
<button class="btn">Got it!</button>'
// dom is unique, 한 곳에만 존재 가능
header.prepend(message)
header.append(message)
// dom이 이제 중복해서 존재할 수 있게 되었다. 
header.append(message.cloneNode(true))

// sibling으로 추가하기
header.before(message) // 이전 형제 노드로
header.after(message) // 다음 형제 노드로

// * delete
document.querySelector('.btn--close-cookkie').addEventListener("click", () => {
  message.remove(); // 최근의 방법
  // message.parentElement.removeChild(message) <-- 예전 방식
})

// * Styles
// inline style로 들어간다.
message.style.backgroundColor = '#35212e';
message.style.width = '120%'
console.log(message.style.height) // noting class에 지정되어 있는 css는 가져오지 못한다.

// page에 보이는 계산된 스타일을 가져온다. -> css에 정의되어 있지 않아도...
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
// css variable 변경하기 (documentElement === :root{})
document.documentElement.style.setProperty('--color-primary', 'orangered');

// * attribute
const logo = document.querySelector('.nav__logo')
console.log(logo.src); // ht tp://127.0.0.1:8080/img/logo.png
console.log(logo.alt)
console.log(logo.className)
logo.alt = "stacy"

// non-standard -> getAttribute()로 가져오기
// console.log(logo.designer)
console.log(logo.getAttribute('designer')) // jonas
logo.setAttribute('company', 'samsung')
console.log(logo.getAttribute('src')) // html에 정의된 그대로(상대경로)를 가져온다. img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http:// ~ /# (절대경로)
console.log(link.getAttribute('href')) // # (상대경로)

// data attribute
// data-version-number = 3.0 -> 속성은 calmel case로 변환된다.
console.log(logo.dataset.versionNumber);

// * Classes
logo.classList.add('c', 'j')
logo.classList.remove('c', 'j')
logo.classList.toggle('c')
logo.classList.contains('c')





