const carouselButtons = document.querySelectorAll("[data-carousel-button]");

for (const button of carouselButtons) {
  button.addEventListener("click", () => {
    const offeset = button.dataset.carouselButton === "next" ? 1 : -1;

    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSslide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSslide) + offeset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSslide.dataset.active;
  });
}

const modal = document.getElementById("modal");
const openModal1 = document.getElementById("open-modal1");
const openModal2 = document.getElementById("open-modal2");
const closeModal = document.getElementById("close-modal");

openModal1.onclick = () => {
  modal.style.display = "flex";
};

openModal2.onclick = () => {
  modal.style.display = "flex";
};

closeModal.onclick = () => {
  modal.style.display = "none";
};

function sendMail() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const body = `Nome: ${name} \n Telefone: ${phone}`;

  const link = "mailto:munizzfranquias@gmail.com?body=" + body;

  if (name.length < 3) {
    alert("Por favor, informe seu nome.");
    return;
  }

  if (phone.length < 7) {
    alert("Por favor, informe um número válido.");
    return;
  }

  window.open(link, "_blank");
}

function sendMessage() {
  const name = document.getElementById("name").value;
  const message = `Olá%20Muniz,%20me%20chamo%20${name}%20e%20gostaria%20de%20conversar%20com%20um%20consultor.`;

  if (name.length < 3) {
    alert("Por favor, informe seu nome.");
    return;
  }

  const link = `https://api.whatsapp.com/send?phone=44998363691&text=${message}`;

  window.open(link, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  if (!getCookie("cookieAccepted")) {
    document.getElementById("cookie-modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }
});

function acceptCookies() {
  setCookie("cookieAccepted", true, 30);
  document.getElementById("cookie-modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

fetch("./stores.json")
  .then((response) => response.json())
  .then((data) => {
    const states = Object.keys(data);

    const items = document.getElementById("modal-items");

    for (let i = 0; i < states.length; i++) {
      const span = document.createElement("span");
      span.textContent = states[i];
      items.appendChild(span);

      for (let j = 0; j < data[states[i]].length; j++) {
        const city = data[states[i]][j].cidade;
        const link = data[states[i]][j].link;

        const a = document.createElement("a");

        a.textContent = city;
        a.href = "http://" + link;
        a.style.color = "black";

        items.appendChild(a);
      }
    }
  })
  .catch((error) => console.error("Erro ao consumir lojas: ", error));
