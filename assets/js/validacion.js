/*----------------Validacion del formulario---------------------*/
function contactForm(){
    const $form = d.querySelector(".contact__form");
    const $inputs = d.querySelectorAll(".contact__form [required]");
    /*Agregar y ocultar texto de error*/
    $inputs.forEach(input =>{
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error","none");
        input.insertAdjacentElement("beforebegin",$span);
    });
    /*mostrar el texto de error por teclado*/
    d.addEventListener("keyup", e=>{
        if(e.target.matches(".contact__form [required]")){
            let $input = e.target;
            let pattern = $input.pattern || $input.dataset.pattern;
            /* console.log($input,pattern); */
            if(pattern && $input.value !==""){
                /* console.log("el input con patron "); */
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add("is-active")
                    : d.getElementById($input.name).classList.remove("is-active");
            }
            if(!pattern){
                /* console.log("no tiene"); */
                return $input.value === ""
                    ? d.getElementById($input.name).classList.add("is-active")
                    : d.getElementById($input.name).classList.remove("is-active");
            }
        }
    });

    /*Envio del formulario*/
    d.addEventListener("submit", e=>{
        e.preventDefault();
        /* alert("Enviando Formulario"); */
        const $response = d.querySelector(".contact-form-response");
        const $loader = d.querySelector(".contact-form-loader");
        $loader.classList.remove("none");
        
        fetch("https://formsubmit.co/ajax/shuarcaya99@gmail.com",{
            method: "POST",
            body: new FormData(e.target)
        })
        .then(res=>res.ok?res.json():new Promise.reject(res))
        .then(json=>{
            console.log(json);
            $loader.classList.add("none");
            $response.classList.remove("none");
            $response.innerHTML = `<p>Los datos han sido enviados 😀</p>`;
            $form.reset();
        })
        .catch(err=>{
            console.log(err,message);
            let message = err.statusText||"Ocurrio un problema";
            $response.innerHTML = `<p>Error ${err.status}:${message}</p>`;
        }).finally(()=>{
            setTimeout(() => {
                $response.classList.add("none");
                $response.innerHTML = "";
            }, 2000);
            
        });

    })
}   
d.addEventListener("DOMContentLoaded",contactForm)  ;