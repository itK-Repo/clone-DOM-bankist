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



// * DOM Traversing
const h1 = document.querySelector('h1');
// Going downwards: child, -> h1의 자식요소만 탐색하여 가져온다.
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes) // NodeList -> text, comment, span.highlight... 모든 것을 가져온다.
console.log(h1.children) // HTMLCollection(3) span br span -> live update가 되는 자료구조이다.
h1.firstElementChild.style.color = "white" // 첫 번째 요소를 지칭 -> span을 화이트로.
h1.lastElementChild.style.color = "black";

// Going upwards: parents
console.log(h1.parentNode)
console.log(h1.parentElement)

h1.closest('.header').style.color = "orangered" //MEMO: querySelector와 반대로 작동, 얼마나 멀리 떨어져있던, '.header' 요소를 찾아 반환한다.
h1.closest('.h1').style.color = "blue" //MEMO:자기 자신이 반환된다.

// Going sideWays: siblings
console.log(h1.previousElementSibling); // null, 첫번째 자식 요소이기 때문
console.log(h1.nextElementSibling); // 다음 줄 요소를 가리킴

console.log(h1.parentElement.children); // 부모로 올라가서 child 모두(자기 자신도 포함됨)
[...h1.parentElement.children].forEach(el => { // HTMLCollection은 이터러블 -> 배열에 풀어서 배열 메서드를 사용할 수 있다.
  if (el !== h1) el.style.transform = 'scale(0.5)'
}); // 자기 자신을 제외한 모든 siblings 들을 작게 만든다.

// * DOM Lift Cycle
// DOMContentLoaded: HTML, javascript need to be loaded, not image, external resource
// body 마지막에 script를 불러오는 것으로 대체가 된다.
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('HTML parsed and DOM tree built!', e)
  // eventListener
})

// window.load: HTML, javascript + all the images and external resources like css files
window.addEventListener('load', (e) => {
  console.log('page fully loaded', e)
})

// beforeunload: 닫기 클릭 시, 
// 유저가 나가기 전, 팝업 띄우기 -> 글 쓰다가 나갈 때나 사용하자, 남용 시 사용성 저하
window.addEventListener('beforeunload', (e) => {
  // 몇몇 브라우저에서 필요함
  e.preventDefault();
  e.returnValue = ''; // 떠나시겠습니까 라는 팝업이 뜨게 된다. 무슨 문자열을 넣던 지 상관없이 같은 팝업을 띄움
})
