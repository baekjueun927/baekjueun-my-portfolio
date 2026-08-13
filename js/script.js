AOS.init({ once:true });



// 스크롤바
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  const percent = (scrollTop / height) * 100;

  progressBar.style.width = percent + "%";
});


// 헤더
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// 스와이퍼


new Swiper(".mySwiper1", { 
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,

  autoplay: {
    delay: 3000, // 3초마다 슬라이드 이동
    disableOnInteraction: false, // 사용자 터치 후에도 자동 재생 유지
  },

  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});
new Swiper(".mySwiper2", { 
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,

  autoplay: {
    delay: 2000, // 3초마다 슬라이드 이동
    disableOnInteraction: false, // 사용자 터치 후에도 자동 재생 유지
  },

  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});


// 메뉴 이동 (버그 수정)
document.querySelectorAll(".gnb a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({behavior:"smooth"});
  });
});

// 햄버거
const gnb = document.querySelector(".gnb");
const hamburger = document.querySelector(".hamburger");

hamburger.onclick = ()=>{
  gnb.classList.toggle("active");
};

document.querySelectorAll(".gnb a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({behavior:"smooth"});

    gnb.classList.remove("active"); // 닫기
  });
});

// 스킬 애니메이션
const circles = document.querySelectorAll(".circle");

let animated = false;

window.addEventListener("scroll", ()=>{
  const trigger = document.querySelector("#skills").offsetTop;

  if(window.scrollY > trigger - 400 && !animated){
    animated = true;

    circles.forEach(circle=>{
      let percent = circle.dataset.percent;
      let progress = circle.querySelector(".progress");
      let text = circle.querySelector("strong");

      let offset = 314 - (314 * percent / 100);
      progress.style.strokeDashoffset = offset;

      // 숫자 애니메이션
      let count = 0;
      let interval = setInterval(()=>{
        if(count >= percent){
          clearInterval(interval);
        } else {
          count++;
          text.innerText = count + "%";
        }
      }, 15);
    });
  }
});


// 마우스커서

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

// 실제 마우스 위치
document.addEventListener("mousemove", e=>{
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// 부드럽게 따라오는 효과
function animate(){
  posX += (mouseX - posX) * 0.1;
  posY += (mouseY - posY) * 0.1;

  cursor2.style.left = posX + "px";
  cursor2.style.top = posY + "px";

  requestAnimationFrame(animate);
}

animate();



const links = document.querySelectorAll("a, button");

links.forEach(link=>{
  link.addEventListener("mouseenter", ()=>{
    cursor2.style.transform = "translate(-50%, -50%) scale(1.8)";
    cursor2.style.borderColor = "#FCA5F1";
  });

  link.addEventListener("mouseleave", ()=>{
    cursor2.style.transform = "translate(-50%, -50%) scale(1)";
    cursor2.style.borderColor = "#B5FFFF";
  });
});


// gnb 호버효과


// 탑버튼========

const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =========================
ARTWORK POPUP
========================= */

const artPopup = document.querySelector("#artPopup");

const popupImg = document.querySelector("#popupImg");
const popupTitle = document.querySelector("#popupTitle");
const popupDesc = document.querySelector("#popupDesc");

const artworkDescs = [
  "화장품 브랜드 마몽드 배너 디자인",
  "클리오 브랜드 SNS 콘텐츠 디자인"
];

document.querySelectorAll(".artwork-item").forEach((item, index) => {

  item.addEventListener("click", () => {

    const img = item.querySelector("img").src;

    popupImg.src = img;

    popupTitle.innerText = `Artwork 0${index + 1}`;

    popupDesc.innerText = artworkDescs[index];

    artPopup.classList.add("active");

  });

});


/* =========================
CARD NEWS POPUP
========================= */




/* =========================
닫기
========================= */

document.querySelectorAll(".popup-close").forEach(btn=>{

  btn.addEventListener("click", ()=>{

    btn.closest(".custom-popup")
    .classList.remove("active");

  });

});


/* 바깥 클릭시 닫기 */

document.querySelectorAll(".custom-popup").forEach(popup=>{

  popup.addEventListener("click", e=>{

    if(e.target === popup){

      popup.classList.remove("active");

    }

  });

});


/* =========================
CARD NEWS SWIPER
========================= */

const cardItems = document.querySelectorAll(".cardnews-item");
const popup = document.querySelector(".cardnews-popup");
const popupWrapper = document.querySelector(".cardPopupSwiper .swiper-wrapper");
const closePopup = document.querySelector(".close-popup");

let popupSwiper = null;

cardItems.forEach(item=>{

  item.addEventListener("click", ()=>{

    const images = JSON.parse(item.dataset.images);

    popupWrapper.innerHTML = "";

    images.forEach(img=>{

      popupWrapper.innerHTML += `
        <div class="swiper-slide">
          <img src="${img}" alt="">
        </div>
      `;

    });

    popup.classList.add("active");

    if(popupSwiper){
      popupSwiper.destroy(true, true);
    }

    popupSwiper = new Swiper(".cardPopupSwiper",{

      slidesPerView: 1,
      spaceBetween: 20,

      pagination:{
        el: ".swiper-pagination",
        clickable:true,
      },

    });

  });

});

closePopup.addEventListener("click", ()=>{

  popup.classList.remove("active");

});

