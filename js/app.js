const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => 
        `<p class="tipo ${type.type.name}">${type.type.name}</p>`
    );
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
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => {
    boton.addEventListener("click", (ev) => {
        const botonID = ev.currentTarget.id;

        listaPokemon.innerHTML = "";

        for (let i = 1; i <= 151; i++) {
            fetch(URL + i)
                .then((response) => response.json())
                .then(data => {

                    if (botonID === "ver-todos") {
                        mostrarPokemon(data);
                    } else {
                        const tipos = data.types.map(type => type.type.name);
                    
                        if (tipos.some(tipo => tipo.includes(botonID))) {
                            mostrarPokemon(data);
                        }
                    }
                });
        }
    });
});