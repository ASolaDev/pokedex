const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 251; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    const traducciones = {
        normal: "Normal",
        fighting: "Lucha",
        flying: "Volador",
        poison: "Veneno",
        ground: "Tierra",
        rock: "Roca",
        bug: "Bicho",
        ghost: "Fantasma",
        steel: "Acero",
        fire: "Fuego",
        water: "Agua",
        grass: "Planta",
        electric: "Eléctrico",
        psychic: "Psíquico",
        ice: "Hielo",
        dragon: "Dragón",
        dark: "Siniestro",
        fairy: "Hada"
    };

    let tipos = poke.types.map((type) => {
        const tipoEn = type.type.name;
        const tipoEs = traducciones[tipoEn] || tipoEn;
        return `<p class="tipo ${tipoEn}">${tipoEs}</p>`;
    });
    tipos = tipos.join("");

    let pokeID = poke.id.toString();

    if (pokeID.length === 1) {
        pokeID = "00" + pokeID;
    } else if (pokeID.length === 2) {
        pokeID = "0" + pokeID;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon-inner">
        <p class="pokemon-id-back">#${poke.id}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}"
                alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeID}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipo">${tipos}</div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}Kg</p>
            </div>
        </div>
    </div>
`;
    listaPokemon.append(div);
}

listaPokemon.addEventListener('click', function (e) {
    const card = e.target.closest('.pokemon');
    if (card) {
        card.classList.add('flip');
        setTimeout(() => card.classList.remove('flip'), 700);
    }
});

botonesHeader.forEach(boton => {
    boton.addEventListener("click", (ev) => {
        const botonID = ev.currentTarget.id;
        listaPokemon.innerHTML = "";

        if (botonID === "ver-todos") {
            let promesas = [];
            for (let i = 1; i <= 151; i++) {
                promesas.push(fetch(URL + i).then(res => res.json()));
            }
            Promise.all(promesas).then(pokemones => {
                pokemones.sort((a, b) => a.id - b.id);
                pokemones.forEach(poke => mostrarPokemon(poke));
            });
        } else {
            for (let i = 1; i <= 151; i++) {
                fetch(URL + i)
                    .then((response) => response.json())
                    .then(data => {
                        const tipos = data.types.map(type => type.type.name);
                        if (tipos.some(tipo => tipo.includes(botonID))) {
                            mostrarPokemon(data);
                        }
                    });
            }
        }
    });
});