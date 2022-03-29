const selectedColor = document.querySelector('#selected-color')
const baseColorBar = document.querySelector('#base-color')
const colorScheme = document.querySelector('#color-scheme-selection')
const submitBtn = document.querySelector('#submit')
const hexValues = document.querySelector('.hex-results').children
const title = document.querySelector('#title')
console.log(title.style.background)
let baseColor = selectedColor.value
let scheme = colorScheme.value
let gradientArray = [baseColor]
let resultColors = []

window.onload = fetchColorData
// window.onload = changeTitleGrad

selectedColor.addEventListener('input', () => {
    baseColorBar.style.background = selectedColor.value
    baseColor = selectedColor.value
    fetchColorData()
    changeTitleGrad(gradientArray)
})

colorScheme.addEventListener('input', () => {
    scheme = colorScheme.value
    fetchColorData()
    changeTitleGrad(gradientArray)

})

const colorBars = document.querySelector('.bar-results').children
// console.log(colorBars)

// submitBtn.addEventListener('click', fetchColorData)

function getColor(hexValue) {
    return hexValue.replace('#', '')
}

function fetchColorData() {
    let mode = colorScheme.value
    let color = getColor(selectedColor.value)
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=4`)
        .then(response => response.json())
        .then(data => returnColors(data))
    changeTitleGrad(gradientArray)
}

function returnColors(data) {
    resultColors = data.colors
    for (let i = 0; i < colorBars.length - 1; i++) {
        colorBars[0].style.background = baseColor
        colorBars[i + 1].style.background = resultColors[i].hex.value
        hexValues[0].textContent = baseColor
        hexValues[i + 1].textContent = resultColors[i].hex.value
        gradientArray.push(resultColors[i].hex.value)
    }
}

function changeTitleGrad(arr) {
    // let colors = arr.join()
    // title.style.backgroundClip = 'text'
    title.style.color = baseColor
    // title.style.background = `-webkit-linear-gradient(45deg,${colors})`
    // console.log(title.style.background)
}
