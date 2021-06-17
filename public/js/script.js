console.log('Running from client side')

const body = document.querySelector('body')
const content = document.querySelectorAll('.content')
const inputLocation = document.querySelector('input')
const button = document.querySelector('#submit')
const contentLocation = document.querySelector('#message-location')
const contentImage = document.querySelector('#content-image')
const contentDescription = document.querySelector('#message-1')
const contentTemp = document.querySelector('#message-2')
const contentPrecip = document.querySelector('#message-4')

function init() {
  loading(content)
}

function loading(content) {
  content.forEach((element) => element.classList.add('skeleton'))
}

function loadingComplete(content) {
  content.forEach((element) => element.classList.remove('skeleton'))
}

function getIcon(description) {
  switch (description) {
    case 'Partly cloudy':
      return 'cloud'
    case 'Cloudy':
      return 'cloud'
    case 'Overcast':
      return 'cloud'
    case 'Sunny':
      return 'sun'
    case 'Patchy rain possible':
      return 'cloud-drizzle'
    case 'Light rain shower':
      return 'cloud-rain'
    default:
      return 'help-circle'
  }
}

function getBg(description) {
  switch (description) {
    case 'Partly cloudy':
      return 'bg-gradient-to-br from-blue-400 to-emerald-400'
    case 'Cloudy':
      return 'bg-gradient-to-br from-gray-400 to-gray-600 via-blue-800 '
    case 'Overcast':
      return 'bg-gradient-to-br from-gray-400 to-gray-600 via-blue-800 '
    case 'Sunny':
      return 'bg-gradient-to-br from-yellow-400 to-pink-500 via-red-400'
    case 'Patchy rain possible':
      return 'bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900'
    case 'Light rain shower':
      return 'bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900'
    default:
      return ''
  }
}

function setIcon(icon) {
  let iconContent = document.querySelector('#icon')
  let i = document.createElement('i')
  i.setAttribute('data-feather', icon)
  i.setAttribute('id', 'icon')
  i.setAttribute('class', 'w-16 h-16')
  iconContent.replaceWith(i)
  feather.replace()
}

init()
button.addEventListener('click', (e) => {
  loading(content)
  fetch('http://localhost:3000/getweather?city=' + inputLocation.value).then(
    (response) => {
      response.json().then((data) => {
        console.log(data)
        if (data.error) {
          contentDescription.textContent = data.error
        } else {
          let icon = getIcon(data.description)
          let bgColor = getBg(data.description)
          // contentImage.style.backgroundImage = 'url("/img/' + icon + '.jpg")'
          body.setAttribute('class', bgColor)
          setIcon(icon)
          contentLocation.textContent = inputLocation.value
          contentDescription.textContent = data.descriptionEs
          contentTemp.textContent = data.temp + 'ºC'
          contentPrecip.textContent = data.precip + '%'
          loadingComplete(content)
        }
      })
    }
  )
})
