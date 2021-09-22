// Variables
let arrayCrypto = [];
const contenedorDivisas = document.querySelector('.contenedor-divisas');
const selectDivisa = document.querySelector('#divisa');
const formulario = $('#myForm');
const risu = document.querySelector('.mos');


document.addEventListener('DOMContentLoaded', () => {
    consultarCriptoApi();
})

$(formulario).submit(function (e) { 
    e.preventDefault();
    validarFormulario();
});

function consultarCriptoApi(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then( data => {
            mostrarCripto(data.Data)
            llenarSelect(data.Data)
        })

}

function validarFormulario(){
    let hijos = $(formulario).children();
    const crypto = hijos[0].value;
    const monto = hijos[1].value;
    console.log(crypto)
    console.log(monto)


    if (crypto === "" || monto === "") {
        console.log("No ingreso nada");
        return;
    }
    
    convertirCrypto(crypto, monto);
}


function convertirCrypto(crypto,monto){

    const url = `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(valorCrypto => {
            
            mostrarResultado ( (monto / valorCrypto.USD).toFixed(2));
                                              
        })

}

function mostrarResultado(valorCrypto){
    
    limpiarHTML();

    console.log(valorCrypto)
    const resultado = document.createElement('h1');
    resultado.textContent = (`Usted obtentendra: ${valorCrypto} de la criptomoneda elegida`)
    
    risu.appendChild(resultado)
}

function limpiarHTML() {
    while(risu.firstChild) {
        risu.removeChild(risu.firstChild);
    }
}

function llenarSelect(arrayCrypto){
    arrayCrypto.forEach( crypto => {
        
        const option = document.createElement('option');
        option.textContent = crypto.CoinInfo.FullName;
        option.value = crypto.CoinInfo.Name
    
        selectDivisa.appendChild(option);
    })
}

function mostrarCripto(arrayCrypto){
    arrayCrypto.forEach( crypto => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        
        const titulo = document.createElement('h2');
        titulo.textContent = crypto.CoinInfo.FullName;
        titulo.classList.add('titulo');

        const precio = document.createElement('p');
        precio.innerText = `Valor actual: $ ${crypto.RAW.USD.PRICE}`;

        divCard.appendChild(titulo)
        divCard.appendChild(precio)

        contenedorDivisas.appendChild(divCard);
    })
}

localStorage.setItem("arregloMoneda", JSON.stringify (arrayCrypto))
localStorage.getItem("arregloMoneda", JSON.stringify (arrayCrypto))


