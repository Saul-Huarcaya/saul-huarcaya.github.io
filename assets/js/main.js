const d = document;
/*movil*/
const navMenu = d.getElementById("nav-menu");
/*pc*/
const links = d.querySelectorAll(".nav__link");

/*btn-top*/
const btnTop = d.querySelector(".scroll-top");
const w = window;


d.addEventListener("click", e=>{
    /*Mostrar y ocultar el menu para movil*/
    
    if(e.target.matches(".bx-menu")){
        navMenu.classList.toggle("show");
    }
    if(e.target.matches(".nav__link")|| (e.target.matches(".bx-x"))){
        navMenu.classList.toggle("show");
    }
    /*Agregar el estilo al menu para pc*/
    if(e.target.matches(".nav__item *")){
        if(e.target){
            e.target.classList.add("activo");
        }else{
            for(let x = 0; x < links.length;x++){
                links[x].classList.remove("activo");
            }
        }
    }
    
    if(e.target.matches(".bxs-chevron-up") || e.target === btnTop){
        window.scrollTo(0,0);
    }
});

/*W----------------------------SCROLL DE REGRESO ANIMADO-----------------------------------*/
w.addEventListener("scroll",e=>{
    /*Visibilidad del btn*/
    let scrollTop = w.pageXOffset || d.documentElement.scrollTop;

    if(scrollTop > 300){
        btnTop.classList.remove("hidden");
    }else{
        btnTop.classList.add("hidden");
    }
})
/*----------------------------OBSERVADR DE SCROLL------------------------------------------*/
const secciones = d.querySelectorAll(".section");
const enlace = d.querySelector("a.nav__link[href='#home']");
console.log(enlace);
let options = {
    threshold: [0.5,0.75]
}

const cb = (entries) =>{
    entries.forEach((entry)=>{
        const id = entry.target.id;
        if(entry.isIntersecting){
            d.querySelector(`a.nav__link[href='#${id}']`).classList.add("activo");
        }else{
            d.querySelector(`a.nav__link[href='#${id}']`).classList.remove("activo");
        }
    });
    
}
const observador = new IntersectionObserver(cb,options);
secciones.forEach((el)=> observador.observe(el));



/*-------------------------------LIBRERIA SCROLLREVEAL------------------------------------*/
/*-----------------------------Animacion toda la pagina-----------------------------------*/
const sr = ScrollReveal({
    origin:"top",
    distance:"130px",
    duration:2000,
    reset:true
});
/*SCROLL HOME*/
sr.reveal(".home__data",{delay:100});
sr.reveal(".home__img",{delay:100});

/*SCROLL PROJECT*/
sr.reveal(".title_project",{origin:"left",delay:50,distance:"100px"});
sr.reveal(".container__projects",{origin:"left",delay:50,distance:"100px"});

/*SCROLL Skill*/
sr.reveal(".title_skill",{duration:1800,delay:150,origin:"left",distance:"140px"});
sr.reveal(".contenedor__skills",{duration:1800,delay:150,origin:"left",distance:"140px"});

/*SCROLL CONTACT */
sr.reveal(".title_contact",{duration:1800,delay:150,origin:"left",distance:"140px"});
sr.reveal(".contact__container",{duration:1800,delay:150,origin:"left",distance:"140px"});

