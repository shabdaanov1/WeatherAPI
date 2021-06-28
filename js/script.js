const API = 'http://api.openweathermap.org/data/2.5/weather?q='
const KEY = '&appid=25bc69460942d7d49cbe792abe290c53'

const city = document.getElementById('city')
const search = document.getElementById('search')
const output = document.getElementById('output')

const getWeather = async () => {
    const url = API + city.value + KEY
    const request = await fetch(url)
    const response = await request.json()
    console.log(response)
    render(response)
    getMap(response.coord)
}

const getMap = (coord) => {
    let divMap = document.createElement('div')
    divMap.id = 'map'
    divMap.style.cssText = 'width:500px; height:400px;'

    output.append(divMap)

    DG.then(function () {
        map = DG.map('map', {
            center: [coord.lat, coord.lon],
            zoom: 13
        });
    });
}

const render = (data) => {
    output.innerHTML = ''

    let h1 = document.createElement('h1')
    let h2 = document.createElement('h2')
    let h3 = document.createElement('h3')
    let h4 = document.createElement('h4')

    h1.innerHTML = data.name
    h2.innerHTML = data.sys.country
    h3.innerHTML = data.weather[0].main
    h4.innerHTML = (data.main.temp - 273.15).toFixed(2)

    output.append(h1, h2, h3, h4)
}



search.addEventListener('click', getWeather)
