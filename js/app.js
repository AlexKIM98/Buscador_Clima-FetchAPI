const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
   formulario.addEventListener('submit', buscarClima); 
})


function buscarClima(e){
    e.preventDefault();


    // VALIDAR
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === ''|| pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    //CONSULTAR LA API
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

  if(!alerta){

          // Crear un alerta
          const alerta = document.createElement('div');

          alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4','py-3', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
      
          alerta.innerHTML = `
              <strong class="font-bold">Error!</strong>
              <span class="block">${mensaje}</span> 
          `;
      
          container.appendChild(alerta);

          setTimeout(() => {
            alerta.remove();
          },3000);
  }   
}


function consultarAPI(ciudad, pais){

    const appID = '853d6f7b3890157b2dc58970deef52c8'; //API JKEY

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

 Spinner();

    fetch(url)
    .then( respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
        
        limpiarHTML()// Limpiar el HTML PREVIO
        if(datos.cod === '404'){
            mostrarError('Ciudad no encontrada')
            return;
        }

        // IMPRIMIR LA RESPUESTA EN PANTALLA
        mostrarClima(datos);
    })
}

function mostrarClima(datos){
    const {name, main:{ temp, temp_max, temp_min} } = datos; //DESTRUCTURIN DATOS DENTRO DEL API

    const centigrados = kelvinACentigrados(temp) //FIGURA COMO GRADOS KELVIN
    const Max = kelvinACentigrados(temp_max)
    const Min = kelvinACentigrados(temp_min)

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')
    
    const actual = document.createElement('p')
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `${Max} &#8451; Max`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `${Min} &#8451; Min`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);


    resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados){
    return parseInt(grados - 273.15)
}


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}
