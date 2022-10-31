/*varibles*/
const d = document;
const w = window;
const $template = d.getElementById("template").content;
const $main = d.getElementById("main");
const $loader = d.querySelector(".loader");
const $input = d.querySelector(".input-character");
const fragmento = d.createDocumentFragment();
const btnTop = d.querySelector(".btnTop");
const bxIcon = d.querySelector(".btnTop .bx");
let numberPage = 1;



/*funcion para seleccionar todos los personajes y asignarlos al contenido princiapal(main)*/
function character(){
    /* $loader.style.display = "block"; */
    const url =  `https://rickandmortyapi.com/api/character?page=${numberPage}`;
    const respuesta = fetch(url);
    respuesta.then(res => (res.ok) ? res.json(): Promise.reject(res))
    .then(data =>{
        data.results.forEach(el => {
            /* console.log(el); */
            $template.querySelector(".imagen").src = el.image ? el.image:"img/respaldo.jpg";
            $template.querySelector(".imagen").alt = el.name;
            $template.querySelector(".name").innerHTML = el.name;
            $template.querySelector(".status").innerHTML = el.status;
            $template.querySelector(".species").innerHTML = el.species;
            let clone  = d.importNode($template,true);
            fragmento.appendChild(clone);
        });
        $main.appendChild(fragmento);
        /* $loader.style.display = "none"; */
    }) 
    .catch(error =>{
        const message = error.statusText || "Ocurrio un error";
        console.log(error);
        $main.innerHTML = `<p><mark>${error.status} ${message}</mark></p>`;
        $loader.style.display = "none";
    });
}



/*evento para llamar a la funcion de los personajes y cargarlo desde el inicio*/
d.addEventListener("DOMContentLoaded",e=>{
    character();
});


/*mediante el evento de scroll medir la venta y agregar nuevos personajes(scroll infinito)*/
w.addEventListener("scroll",e =>{
    const {scrollTop,clientHeight,scrollHeight} = d.documentElement;
    /* console.log(scrollTop,clientHeight,scrollHeight); */

    if(scrollTop + clientHeight >= scrollHeight){
        numberPage++;
        character();
    }

    const top = w.pageYOffset;
    if(top > 300){
        btnTop.classList.add("visible"); 
    }else{
        btnTop.classList.remove("visible");
    }
});


/*evento del teclado del input para saber que busqueda se esta haciendo*/
d.addEventListener("keyup",e=>{
    
    if(e.target === $input){
        window.scrollTo(0,0);
        let busqueda = e.target.value;
        const card = d.querySelectorAll("div.tarjeta");
        card.forEach(el =>{
            if(el.textContent.toLowerCase().includes(busqueda)|| el.textContent.includes(busqueda)){
                el.classList.remove("filter");
            }else{
                el.classList.add("filter");
            }
        })
    }
});

d.addEventListener("click",e =>{
    if(e.target === btnTop || e.target === bxIcon){
        w.scrollTo(0,0);
    }
});