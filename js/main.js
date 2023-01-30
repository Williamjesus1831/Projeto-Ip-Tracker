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

async function gerarMapaInicial() {
  const dados = await fetch("http://ip-api.com/json/163.172.70.225")
    .then((r) => r.json())
    .catch((error) => mensagemErro())
    .finally();

  enderecoIP.innerText = dados.query;
  localizacao.innerText = `${dados.city}, ${dados.countryCode}, ${dados.zip}`;
  fusohorario.innerText = dados.timezone;
  provedor.innerText = dados.isp;

  containerDeDados.classList.toggle("active");

  const map = L.map("map").setView([48.8714, 2.32141], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([48.8714, 2.32141])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
}

gerarMapaInicial();
