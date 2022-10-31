const d = document;
const atras =  d.querySelector(".atras");
const siguiente = d.querySelector(".siguiente");
const elementos = d.querySelectorAll(".carrusel-img .item-carrusel");
const posicion = d.querySelectorAll(".contenedor-posicion .posicion");
let indice = 0;

/*--------------------------EVENTO DE PARA EL CARRUSEL----------------------------*/
d.addEventListener("click",e=>{
    if(e.target === atras){
        e.preventDefault();
        elementos[indice].classList.remove("activo");
        posicion[indice].classList.remove("posicion-activa");
        indice--;
        if(indice < 0){
            indice = elementos.length - 1;
        }
        elementos[indice].classList.add("activo");
        posicion[indice].classList.add("posicion-activa");
    }
    if(e.target === siguiente){
        e.preventDefault();
        elementos[indice].classList.remove("activo");
        posicion[indice].classList.remove("posicion-activa");
        indice++;
        if(indice >= elementos.length){
            indice = 0;
        }
        elementos[indice].classList.add("activo");
        posicion[indice].classList.add("posicion-activa");
    }
});