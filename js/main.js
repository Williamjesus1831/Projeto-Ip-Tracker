// campos de interação do usuario
const inputIp = document.querySelector("form input");
const searchInputBtn = document.querySelector(".input-btn");
const containerDeDados = document.querySelector(".adress-info-container");

// campos preenchidos pelos dados

const enderecoIP = document.querySelector(".address-info-ip p");
const localizacao = document.querySelector(".address-info-location p");
const fusohorario = document.querySelector(".address-info-timezone p");
const provedor = document.querySelector(".address-info-isp p");

// funções

function exibirerro(error) {
  if (error === "vazio") {
    inputIp.classList.add("error");
  } else if (error === "fetchFalhou") {
  }
}

async function gerarMapaInicial() {
  const dados = await fetch("http://ip-api.com/json/163.172.70.225")
    .then((r) => r.json())
    .catch((error) => mensagemErro())
    .finally();

  enderecoIP.innerText = dados.query;
  localizacao.innerText = `${dados.city}, ${dados.countryCode}, ${dados.zip}`;
  fusohorario.innerText = dados.timezone;
  provedor.innerText = dados.isp;

  const map = L.map("map").setView([48.8714, 2.32141], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const icone = L.icon({
    iconUrl: "../img/icon-location.svg",
    iconSize: [46, 56],
    iconAnchor: [30, 55],
  });

  L.marker([48.8714, 2.32141], { icon: icone }).addTo(map);
}

function validarDigitos(e) {
  return e.replace(/[^0-9.]/g, "");
}

async function obterDadosIp(e) {
  if (e === "") {
    exibirerro("vazio");
  } else {
    containerDeDados.classList.replace("active", "colapse");
  }
}

// eventos

inputIp.addEventListener("focus", () => {
  inputIp.classList.remove("error");
});

inputIp.addEventListener("input", (e) => {
  const digitoPermitido = validarDigitos(e.target.value);
  e.target.value = digitoPermitido;
});

searchInputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  obterDadosIp(inputIp.value);
});

// execuções
gerarMapaInicial();
