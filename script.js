const selectedColor = document.querySelector('#selected-color')
const baseColorBar = document.querySelector('#base-color')
const colorScheme = document.querySelector('#color-scheme-selection')
const submitBtn = document.querySelector('#submit')
let baseColor = selectedColor.value
let scheme = colorScheme.value
let resultColors = []

selectedColor.addEventListener('input', () => {
    baseColorBar.style.background = selectedColor.value
    baseColor = selectedColor.value
    console.log(baseColor)
})

colorScheme.addEventListener('input', () => {
    scheme = colorScheme.value
    console.log(scheme)
})

const colorBars = document.querySelector('.bar-results').children

console.log(colorBars)

submitBtn.addEventListener('click', () => {
    let mode = colorScheme.value
    let color = getColor(selectedColor.value)
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=4`)
        .then(response => response.json())
        .then(data => {
            resultColors = Array.from(data.colors)
            for (let i = 0; i < colorBars.length - 1; i++) {
                colorBars[0].style.background = baseColor
                colorBars[i + 1].style.background = resultColors[i].hex.value
                // colorBars[color].style.background = color.hex.value
                console.log(resultColors[i])
            }
            console.log(data)
        })
})

function getColor(hexValue) {
    return hexValue.replace('#', '')
}

