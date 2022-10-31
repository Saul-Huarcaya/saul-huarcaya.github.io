const d = document;
const $main = d.getElementById("main");
const $template = d.querySelector("template").content;
const fragmento = d.createDocumentFragment();

let search = d.getElementById("search");
let valor = "";
let card;

search.addEventListener("keypress", async e=>{

    if(e.target.matches(".input-movie")){
        if(e.key === "Enter" && e.target.value != ""){
            $main.innerHTML = "";

            try {
                let busqueda = e.target.value;
                let ruta = `http://www.omdbapi.com/?s=${busqueda}&type=movie&apikey=ce1d2ab9`;
                let res = await fetch(ruta);
                let json = await res.json();
                if(!res.ok) throw {status:res.status , statusText: res.statusText};

                if(json.Error){
                    $main.innerHTML = `<p class="error">No se pudo encontrar <mark>${busqueda}</marl></p>`;
                }else{
                    json.Search.forEach(el => {
                    $template.querySelector(".img").src = !(el.Poster==="N/A") ? el.Poster : "../proyectos/img/proy4/defecto.jpg";
                    $template.querySelector(".img").alt = el.Title;
                    $template.querySelector(".title").textContent = el.Title;
                    $template.querySelector(".year").textContent = el.Year; 
                    const clone = d.importNode($template,true);
                    fragmento.appendChild(clone);
                    })
                    $main.appendChild(fragmento);
                }

                        
            } catch (error) {
                console.log(error);
                const message = error.statusText || "Ocurrio un error";
                $main.innerHTML = `Error ${error.status}:${message}`;
            }
        }
    }
            
});
            
function inicio(){
    $main.innerHTML = `
        <article class="card">
            <div class="contenedor-img">
                <img class="img" src="img/proy4/jason_freddy.jpg"/>
            </div>
        
            <div class="contenedor-texto">
                <p class="title">Freddy vs. Jason</p>
                <p class="year">2003</p>
            </div>
        </article>
        
        <article class="card">
            <div class="contenedor-img">
                <img class="img" src="./img/proy4/avengers.jpg"/>
            </div>
        
            <div class="contenedor-texto">
                <p class="title">Los vengadores</p>
                <p class="year">2012</p>
            </div>
        </article>
        
        <article class="card">
            <div class="contenedor-img">
                <img class="img" src="./img/proy4/rambo.jpg"/>
            </div>
        
            <div class="contenedor-texto">
                <p class="title">Rambo</p>
                <p class="year">2008</p>
            </div>
        </article>
        
        <article class="card">
            <div class="contenedor-img">
                <img class="img" src="./img/proy4/deadpool.jpg"/>
            </div>
        
            <div class="contenedor-texto">
                <p class="title">DeadPool</p>
                <p class="year">2016</p>
            </div>
        </article>`;
    return $main;
}

d.addEventListener("DOMContentLoaded", inicio);
