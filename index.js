let data = []
/* let eventsApi = [] //array de todos los eventos
let eventsPast = [] //array de los eventos pasados
let eventsUpcoming = [] //array de los eventos presentes y futuros */
let categories = [] //array de categorías de eventos
let dataTime = undefined //fecha actual (para clasificar eventos pasados y futuros)
async function fetchApi(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await fetch(urlApi)
        let response = await fetchResponse.json()
        dataTime = response.currentDate
        eventsApi = response.events
        eventsPast = eventsApi.filter(each => {
            return (each.date < dataTime)
        })
        eventsUpcoming = eventsApi.filter(each => {
            return (each.date >= dataTime)
        })
        eventsApi.forEach(each => {
            if ( ! categories.includes(each.category) ) {
                categories.push(each.category)
            }    
        })
        data.push(dataTime)
        data.push(eventsApi)
        data.push(eventsPast)
        data.push(eventsUpcoming)
        return data
    } catch(error) {
        console.log(error)
    }
    console.log(categories)
}
fetchApi()


console.log(categories)
console.log(data)
console.log(data[0])


//Genero los checks
function printChecks(id_etiqueta, array_categories) {
    //defino la función que va a imprimir los checks con las categorias del array anterior en el contenedor que corresponda del html
    let container = document.querySelector(id_etiqueta) 
    console.log(array_categories)
    array_categories = array_categories.map(each => {
        console.log("que pasa???")
        console.log(array_categories)
        return `
        <fieldset>
            <label class="contact-label" for="${each}">${each}</label>
            <input onclick="captureData()" class="class_checks contact-input" type="checkbox" value="${each}" name="tipo" id="${each}">
        </fieldset>
        `;
    })
    console.log(array_categories)
    array_categories.push(`<input onkeyup="captureData()" id="id_search" class="contact-input" type="text" name="texto" placeholder="search">`)
    container.innerHTML = array_categories.join('')
}
printChecks('#table-checks', categories) //ejecuto la impresion de los checks en el html