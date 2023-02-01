// campos de interação do usuario
const inputIp = document.querySelector("form input");
const searchInputBtn = document.querySelector(".input-btn");
const containerDeDados = document.querySelector(".adress-info-container");

// campos preenchidos pelos dados

const map = L.map("map");
const enderecoIP = document.querySelector(".address-info-ip p");
const localizacao = document.querySelector(".address-info-location p");
const fusohorario = document.querySelector(".address-info-timezone p");
const provedor = document.querySelector(".address-info-isp p");

// funções

function exibirError(error) {
  if (error === "vazio") {
    inputIp.classList.add("error");
  } else if (error === "fetchFalhou") {
  }
}

async function gerarMapa(ip) {
  if (ip === "") {
    exibirError("vazio");
    return;
  }

  const dados = await fetch(`http://ip-api.com/json/${ip}`)
    .then((r) => r.json())
    .catch((error) => exibirError())
    .finally();

  enderecoIP.innerText = dados.query;
  localizacao.innerText = `${dados.city}, ${dados.countryCode}, ${dados.zip}`;
  fusohorario.innerText = dados.timezone;
  if (dados.isp.length > 20) {
    console.log("sdsd");
    provedor.innerText = dados.isp.substr(0, 17) + "...";
  } else provedor.innerText = dados.isp;

  map.setView([`${dados.lat}`, `${dados.lon}`], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let icone = L.icon({
    iconUrl: "../img/icon-location.svg",
    iconSize: [46, 56],
    iconAnchor: [30, 55],
  });

  L.marker([`${dados.lat}`, `${dados.lon}`], { icon: icone }).addTo(map);
  containerDeDados.classList.replace("colapse", "active");
}

function validarDigitos(e) {
  return e.replace(/[^0-9.]/g, "");
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
  containerDeDados.classList.replace("active", "colapse");
  const ip = inputIp.value;
  setTimeout(() => {
    gerarMapa(ip);
  }, 100);
  inputIp.value = "";
});

// execuções
gerarMapa("163.172.70.225");
