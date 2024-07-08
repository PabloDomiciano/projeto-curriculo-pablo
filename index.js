document.addEventListener("DOMContentLoaded", () => {
  verificarTema();
  localizacao();
});

function localizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
        .then((response) => response.json())
        .then((data) => {
          const localizacao = data.region || `${lat}, ${long}`;
          document.getElementById("localizacao").value = localizacao;
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
