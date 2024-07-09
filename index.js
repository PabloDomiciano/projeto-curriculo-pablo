document.addEventListener("DOMContentLoaded", () => {
  verificarTema();
  verificarLocalizacaoStorage();
  lerCurriculo();
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

function gerarCurriculo() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const localizacao = document.getElementById("localizacao").value;
  const experiencia = document.getElementById("experiencia").value;
  const habilidades = document.getElementById("habilidades").value;
  const curriculo = {
    nome,
    email,
    telefone,
    localizacao,
    experiencia,
    habilidades,
  };
  localStorage.setItem("curriculo", JSON.stringify(curriculo));
  apresentarCurriculo(curriculo);
}

function apresentarCurriculo(data) {
  const template = document
    .getElementById("templateCurriculo")
    .content.cloneNode(true);
  template.querySelector(".nome").textContent = data.nome;
  template.querySelector(".email").textContent = data.email;
  template.querySelector(".telefone").textContent = data.telefone;
  template.querySelector(".localizacao").textContent = data.localizacao;
  template.querySelector(".experiencia").textContent = data.experiencia;
  template.querySelector(".habilidades").textContent = data.habilidades;

  const mostrarCurriculo = document.getElementById("mostrarCurriculo");
  mostrarCurriculo.innerHTML = "";
  mostrarCurriculo.appendChild(template);
}

function lerCurriculo() {
  const curriculo = JSON.parse(localStorage.getItem(curriculo));
  if (curriculo) {
    apresentarCurriculo(curriculo);
  }
}

function copiar() {
  const curriculo = document.getElementById("mostrarCurriculo").textContent;
  navigator.clipboard
    .writeText(curriculo)
    .then(() => {
      alert("Conteúdo Copiado !");
    })
    .catch((error) => {
      console.error("erro ao copiar", error);
      alert("Erro ao copiar !");
    });
}
