

const d = document;
const $ = (el) => d.querySelector(el);

/*************************** HEADER ANIMATION ***************************/

const updateHeader = () => {
  let $header = $(".am-header-wrap");
  $header.classList.add("active");
};

d.addEventListener("DOMContentLoaded", (e) => {
  updateHeader();
});

/*************************** CARD COMPONENT ***************************/
class CardWrapper extends HTMLElement {
  #img = null;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.classList.add("wrapper");
  }

  get style() {
    return `
        :host(.wrapper) {
          border: 3px solid #0f0e;
          background-color: #0f04;
          min-height: 300px;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          place-content: center;
          perspective: 1000px;
        }

        .am-card {
          width: 100%;
          height: 100%;
          background-color: transparent;
          position: relative;
          aspect-ratio: 16 / 9;
          perspective: 1000px;
          display: flex;
          flex-wrap: wrap;
          place-content: center;
        }

        .am-card * {
          pointer-events: none;
        }

        .am-card img {
          position: relative;
          width: 80%;
          height: 80%;
          object-fit: cover;
          object-position: center;
        }

      @media (width <= 500px) {
        :host {
          min-height: 200px;
          .am-card {
            
          }
        }
      }
    `;
  }

  connectedCallback() {
    this.#img = this.getAttribute("data-img");
    this.classList.add("wrapper");
    this.shadowRoot.innerHTML = `
      <style>${this.style}</style>
      <aside class="am-card">
        <img src="gallery/n${this.#img}.avif" alt="anImage">
      </aside>
    `;
  }
}

customElements.define("the-card", CardWrapper);

/*************************** CARD ANIMATION DESKTOP ***************************/

function moveCard(e) {
  if (e.target.matches(".wrapper")) {
    const { width, height } = $(".wrapper").getBoundingClientRect();
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    let { offsetX, offsetY } = e;

    e.target.shadowRoot.querySelector("img").style.transition = "none";

    let rotationX = ((offsetX - halfWidth) / halfWidth) * 30;
    let rotationY = ((offsetY - halfHeight) / halfHeight) * 30;

    e.target.shadowRoot.querySelector("img").style.transform = `
    rotateX(${rotationX}deg)
    rotateY(${rotationY}deg)
    `;
    return;
  }
}

function moveCardFinish(e) {
  if (e.target.matches(".wrapper")) {
    e.target.shadowRoot.querySelector("img").style.transition = "2s ease";
    e.target.shadowRoot.querySelector("img").style.transform = `
    rotateX(0deg)
    rotateY(0deg)`;
    return;
  }
}

d.addEventListener("mousemove", moveCard);

d.addEventListener("mouseout", moveCardFinish);

/*************************** CARD ANIMATION MOBILE ***************************/

d.addEventListener(
  "touchmove",
  (e) => {
    if (e.target.matches(".wrapper")) {
      d.removeEventListener("mousemove", moveCard);
      d.removeEventListener("mouseout", moveCardFinish);
    }
  },
  { passive: true }
);
