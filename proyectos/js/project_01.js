        const d = document;

        /*-----------title---------------------------*/
        const title_piedra = d.querySelector(".title_piedra");
        const title_papel = d.querySelector(".title_papel");
        const title_tijera = d.querySelector(".title_tijera");
        
        /*-----------Botones-------------------------*/
        const btn_Piedra = d.getElementById("piedra");
        const btn_Papel = d.getElementById("papel");
        const btn_Tijera = d.getElementById("tijera");

        /*-----------Resultado-----------------------*/
        const resultado = d.getElementById("resultado");
        const btn_usuario = d.getElementById("jugada_usuario");
        const btn_maquina = d.getElementById("jugada_maquina");

        const ruta = "./img/proy1/";
        const opciones = ["Piedra","Papel","Tijera"];
        
        d.addEventListener("click", e=>{

            /*------------------------------BOTON PIEDRA------------------------------*/
            if(e.target === btn_Piedra || e.target === btn_Piedra.parentNode){
                //variables del valor de la pc y del rgb tipo texto para el color
                let valorPc = aleatorio();
                let prueba = color();

                //estilos para boton de papel y para el boton de la jugada (usuario)
                restablecerColores();
                btn_Piedra.parentNode.style.backgroundColor = prueba;

                btn_usuario.src = `${ruta}piedra.png`;
                btn_usuario.alt = `piedra`;
                btn_usuario.style.backgroundColor = prueba;
                title_piedra.style.color = prueba;
                btn_usuario.classList.add("derecha");

                comparacion(opciones[0],valorPc);
            }

            /*-------------------------------BOTON PAPEL-------------------------------*/
            if(e.target === btn_Papel || e.target === btn_Papel.parentNode){

                //variables del valor de la pc y del rgb tipo texto para el color
                let valorPc = aleatorio();
                let prueba = color();
                
                //estilos para boton de papel y para el boton de la jugada (usuario)
                restablecerColores();
                btn_Papel.parentNode.style.backgroundColor = prueba;

                btn_usuario.src = `${ruta}papel.png`;
                btn_usuario.alt = `papel`;
                btn_usuario.style.backgroundColor = prueba;
                title_papel.style.color = prueba;
                btn_usuario.classList.remove("derecha");

                comparacion(opciones[1],valorPc);
            }


            /*-------------------------------BOTON TIJERA-------------------------------*/
            if(e.target === btn_Tijera || e.target === btn_Tijera.parentNode){
                //variables del valor de la pc y del rgb tipo texto para el color
                let valorPc = aleatorio();
                let prueba = color();

                //estilos para boton de papel y para el boton de la jugada (usuario)
                restablecerColores();
                btn_Tijera.parentNode.style.backgroundColor = prueba;

                btn_usuario.src = `${ruta}tijera.png`;
                btn_usuario.alt = `tijera`;
                btn_usuario.style.backgroundColor = prueba;
                title_tijera.style.color = prueba;
                btn_usuario.classList.remove("derecha");
                
                comparacion(opciones[2],valorPc);
            }
        });

        const aleatorio = () =>{

            let num = Math.floor(Math.random() * ( 3 - 0) + 0);
            let jugada = opciones[num].toLowerCase();

            (jugada !==  "piedra")? btn_maquina.classList.add("derecha"):btn_maquina.classList.remove("derecha");

            btn_maquina.src = `${ruta}${jugada}.png`;
            btn_maquina.style.backgroundColor = color();
            return opciones[num];
        }

        const comparacion = (humano,pc)=>{
            let  resultado = humano + pc;
            switch(resultado){
                /*Gane*/
                case "PiedraTijera":
                case "PapelPiedra":
                case "TijeraPapel":
                    return resultados(1);
                /*Empate*/    
                case "PiedraPiedra":
                case "PapelPapel":
                case "TijeraTijera":
                    return resultados(2);
                /*Perdi*/
                case "PiedraPapel":
                case "PapelTijera":
                case "TijeraPiedra":
                    return resultados(3);
            }
        }

        const color = () =>{
            let cl  = Math.floor(Math.random()*(256 - 0) + 0).toString();
            let cl2 = Math.floor(Math.random()*(256 - 0) + 0).toString();
            let cl3 = Math.floor(Math.random()*(256 - 0) + 0).toString();

            let resultado = `rgb(${cl},${cl2},${cl3})`;
            return resultado;
        }

        const resultados = (valor) =>{
            resultado.classList.remove("oculto");
            if(valor === 1){
                resultado.textContent = `Ganas😃`;
            }
            if(valor === 2){
                resultado.textContent = `Empate😐`;
            }
            if(valor === 3){
                resultado.textContent = `Pierdes😢`;
            }
        }

    const restablecerColores = () => {
        const botones = d.querySelectorAll(".contenedor-opcion");
        const titles = d.querySelectorAll("h1 span");
        console.log(titles);
        for(let x = 0; x < botones.length;x++){
            botones[x].style.backgroundColor = "brown"; 
            titles[x].style.color = "white";
        }
    }
