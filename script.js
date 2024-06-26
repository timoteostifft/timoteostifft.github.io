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
  const phone = document.getElementById("phone").value;

  if (phone.length < 7) {
    alert("Por favor, informe um número válido.");
    return;
  }

  if (name.length < 3) {
    alert("Por favor, informe seu nome.");
    return;
  }

  const message = `Olá%20Muniz,%20me%20chamo%20${name}%20e%20gostaria%20de%20conversar%20com%20um%20consultor.%20Telefone:%20${phone}`;

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
    const modal = document.getElementById("modal");
    const openModal1 = document.getElementById("open-modal1");
    const openModal2 = document.getElementById("open-modal2");
    const closeModal = document.getElementById("close-modal");

    const search = document.getElementById("search");

    search.addEventListener("input", (e) => {
      set(Object.keys(data), e.target.value);
    });

    openModal1.onclick = () => {
      set(Object.keys(data));
      modal.style.display = "flex";
      search.value = "";
    };

    openModal2.onclick = () => {
      set(Object.keys(data));
      modal.style.display = "flex";
      search.value = "";
    };

    closeModal.onclick = () => {
      modal.style.display = "none";
      search.value = "";
    };

    set(Object.keys(data));

    const tags = document.querySelectorAll(".tag");

    tags.forEach((tag) => {
      tag.addEventListener("click", () => {
        const value = tag.getAttribute("value");
        set([value]);
        modal.style.display = "flex";
      });
    });

    function set(states, query) {
      let items = document.getElementById("modal-items");

      items.innerHTML = "";

      for (let i = 0; i < states.length; i++) {
        if (query === undefined) {
          query = "";
        }

        const containQuery = data[states[i]].filter((item) =>
          item.cidade.toLowerCase().includes(query.toLowerCase())
        );

        if (!containQuery.length) continue;

        const span = document.createElement("span");
        span.textContent = states[i];
        items.appendChild(span);

        for (let j = 0; j < data[states[i]].length; j++) {
          if (
            !data[states[i]][j].cidade
              .toLowerCase()
              .includes(query.toLowerCase())
          )
            continue;

          const city = data[states[i]][j].cidade;
          const link = data[states[i]][j].link;

          const a = document.createElement("a");

          a.textContent = city;
          a.href = "http://" + link;
          a.style.color = "black";

          items.appendChild(a);
        }
      }
    }
  })
  .catch((error) => console.error("Erro ao consumir lojas: ", error));

fetch("./feedbacks.json")
  .then((response) => response.json())
  .then((data) => {
    const items = document.getElementById("feedback-items");

    const feedbacks = data.depoimentos;

    for (let i = 0; i < feedbacks.length; i++) {
      const li = document.createElement("li");
      const div1 = document.createElement("div");

      const img1 = document.createElement("img");
      img1.src = "../assets/" + feedbacks[i].foto;

      const div2 = document.createElement("div");

      const img2 = document.createElement("img");
      img2.src = "../assets/stars.svg";

      const span1 = document.createElement("span");
      span1.textContent = feedbacks[i].nome;

      const span2 = document.createElement("span");
      span2.textContent = feedbacks[i].origem;

      const p = document.createElement("p");
      p.textContent = feedbacks[i].comentario;

      if (i == 0) {
        li.setAttribute("data-active", "");
      }

      li.setAttribute("class", "slide");

      div2.appendChild(img2);
      div2.appendChild(span1);
      div2.appendChild(span2);
      div2.appendChild(p);

      div1.appendChild(img1);
      div1.appendChild(div2);

      li.appendChild(div1);
      items.appendChild(li);
    }
  })
  .catch((error) => console.error("Erro ao consumir depoimentos: ", error));
