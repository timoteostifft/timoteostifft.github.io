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
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");

openModal.onclick = () => {
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
