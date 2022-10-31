const d = document;
const $error = d.querySelector(".contenedor-error");
const main = d.querySelector("main");
const $template = d.querySelector(".contenedor-paises").content;
const $loader = d.querySelector(".loader");
const $fragmento = d.createDocumentFragment();
const $region = d.getElementById("region");
const $search = d.querySelector(".search");

d.addEventListener("DOMContentLoaded", e=>{
    Paises();
});
d.addEventListener("keyup", e=>{
    if(e.target === $search){
        window.scrollTo(0,0);
        let busqueda = e.target.value;
        const card = d.querySelectorAll("div.card");
        card.forEach(el =>{
            if(el.textContent.toLowerCase().includes(busqueda)|| el.textContent.includes(busqueda)){
                $error.classList.remove("visible");
                el.classList.remove("filter");
            }else{
                el.classList.add("filter");
            }
        })
    }
});
/*------------------------funcion para cargar todos los paises-----------------*/
async function Paises(){
    try {
        $loader.style.display = "block";
        $error.classList.remove("visible");
        main.classList.add("transicion");
        main.innerHTML = "";
        let url = `https://restcountries.com/v3.1/all`;    
        let query = await fetch(url);
        let json  = await query.json();
        
        if(!query.ok) throw {status:query.status , statusText: query.statusText}

        json.forEach(el => {
            $template.querySelector(".img-bandera").src = el.flags.svg;
            $template.querySelector(".img-bandera").alt = el.name.common;
            $template.querySelector(".title-pais").textContent = el.name.common;
            $template.querySelector(".cantidad-poblacion").textContent = el.population;
            $template.querySelector(".title-capital").textContent = (el.capital === undefined)?"No cuenta":el.capital.join(" ");
            $template.querySelector(".title-region").textContent = el.subregion;
                
            const clone = $template.cloneNode(true);
            $fragmento.appendChild(clone);                
        });
        $loader.style.display = "none";
        main.classList.remove("transicion");
        main.appendChild($fragmento);
        }
    catch (error) {
        $loader.style.display = "none";
        let message = error.statusText || "Ocurrio un error";
        main.classList.remove("transicion");
        $error.classList.add("visible");
        $error.innerHTML = `<p class="error-all">Error ${error.status} ${message} 😐</p>`;
        
    }
}
/*------------------------funcion para cargar todos los Continentes-----------------*/
async function Regiones(region){
    try {
        $loader.style.display = "block";
        $error.classList.remove("visible");
        main.classList.add("transicion");
        main.innerHTML = "";
        let url = `https://restcountries.com/v3.1/region/${region}`;       
        let query = await fetch(url);
        let json  = await query.json();
                
        if(!query.ok) throw {status: query.status, statusText : query.statusText};
        
        json.forEach(el => {
            $template.querySelector(".img-bandera").src = el.flags.svg;
            $template.querySelector(".img-bandera").alt = el.name.common;
            $template.querySelector(".title-pais").textContent = el.name.common;
            $template.querySelector(".cantidad-poblacion").textContent = el.population;
            $template.querySelector(".title-capital").textContent = (el.capital === undefined)?"No cuenta":el.capital.join(" ");
            $template.querySelector(".title-region").textContent = el.subregion;
            const clone = $template.cloneNode(true);
            $fragmento.appendChild(clone);
        });
        $loader.style.display = "none";
        main.classList.remove("transicion");
        main.appendChild($fragmento);
    } catch (error) {
        $loader.style.display = "none";
        let message = error.statusText || "Ocurrio un error";
        $error.classList.add("visible");
        $error.innerHTML = `<p class="error-all">Error ${error.status} ${message} 😐</p>`;
    }
}
$region.addEventListener("change", e =>{
    const opcion = e.target.value;
    if(opcion === "all"){
        Paises();
    } 
    if(e.target.value !== "all"){
        Regiones(e.target.value);
    } 
});