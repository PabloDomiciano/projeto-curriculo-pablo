document.addEventListener("DOMContentLoaded", () => {
  verificarTema();
  verificarLocalizacaoStorage();
});

function verificarLocalizacaoStorage() {
  const localizacao = localStorage.getItem("localizacao");
  console.log(localizacao);
  if (localizacao) {
    document.getElementById("localizacao").value = localizacao;
  } else {
    getLocalizacao();
  }
}

function getLocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
        .then((response) => response.json())
        .then((data) => {
          const localizacao = data.region || `${lat}, ${long}`;
          document.getElementById("localizacao").value = localizacao;
          localStorage.setItem("localizacao", localizacao);
        })
        .catch((error) => {
          console.error("Alguma coisa deu errado!", error);
        });
    });
  }
}

function verificarTema() {
  const temaArmazenado = localStorage.getItem("tema");
  if (temaArmazenado) {
    document.body.setAttribute("data-tema", temaArmazenado);
  }
}

function alterarTema() {
  const tema = document.body.getAttribute("data-tema");
  const novoTema = tema == "dark" ? "light" : "dark";
  document.body.setAttribute("data-tema", novoTema);
  localStorage.setItem("tema", novoTema);
}
