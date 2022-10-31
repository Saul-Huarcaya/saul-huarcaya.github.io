const d = document;
const $main = d.getElementById("main");
const btnIniciar = d.querySelector(".btn-iniciar");
let contenedor = [];
        
d.addEventListener("click",e =>{
    if(e.target === btnIniciar){
        e.target.textContent = "Reiniciar"
        IniciarJueago();
    }
});

async function IniciarJueago(){
    try {
        let url = "https://pokeapi.co/api/v2/pokemon/";
        let res = await fetch(url);
        let json = await res.json();
        if(!res.ok) throw {status:res.status, statusText:res.statusText}
                
        for(let i = 0; i < json.results.length; i++){
            let res = await fetch(json.results[i].url);
            let pokemon = await res.json();

            if(!res.ok) throw {status:res.status, statusText:res.statusText}
            contenedor.push(`${pokemon.sprites.front_default}`);                                
        }
        cargarPokemones();
    }catch (error) {
        let message = error.status || "Ocurrio un error";
        console.log(message);
        console.log(error);
        $main.innerHTML = `<p>Ejemplo ${error} ${message}</p>`;
    }
}

function cargarPokemones(){
    $main.innerHTML = `<img src="img/oval.svg" class="load"/>`;
    let tarjetas = [];
    /* let rutasImg = await imagenes.slice(); */
    for(let x = 0; x < 18; x++){

        tarjetas.push(`<div class="card" onclick="SeleccionarTarjeta(${x})" id="card${x}">
                                    <div class="cara" id="${x}">
                                        <img src="${contenedor[0]}"/>
                                    </div>
                                    <div class="espalda" id="trasera${x}">
                                        <img src="../proyectos/img/proy3/espalda.jpg">
                                    </div>
                                </div>`);
        if(x % 2 == 1){
            contenedor.splice(0,1);
        }
    }
                
    $main.innerHTML = tarjetas;
    tarjetas.sort(()=> Math.random() - 0.5); 
    $main.innerHTML = tarjetas.join(" ");
    
}
let selecciones = [];

function SeleccionarTarjeta(i){
    /* console.log(i); */
    let tarjeta = document.getElementById("card" + i);

    if(tarjeta.style.transform != "rotateY(180deg)"){
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if(selecciones.length == 2){
        deseleccionar(selecciones);
        selecciones = [];
    }
}

function deseleccionar(selecciones){
    setTimeout(()=>{
        /*padres*/
        let padre1 = document.getElementById("trasera" + selecciones[0]).parentNode;
        let padre2 = document.getElementById("trasera" + selecciones[1]).parentNode;
        /*url*/
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);
        /**/
        let  url1 = padre1.querySelector(".cara img").src;
        let  url2 = padre2.querySelector(".cara img").src;


        if(url1 !== url2){
            let tarjeta1 = document.getElementById("card" + selecciones[0]);
            let tarjeta2 = document.getElementById("card" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        }else{
            let cara1 = padre1.querySelector(".cara");
            let cara2 = padre2.querySelector(".cara");

            cara1.style.backgroundColor = "rgb(29, 31, 27)";
            cara1.style.boxShadow = "inset 0px 0px 0px 6px white"; 
                    
            cara2.style.backgroundColor = "rgb(29, 31, 27)";
            cara2.style.boxShadow = "inset 0px 0px 0px 6px white"; 
        }
    },1000);
}
