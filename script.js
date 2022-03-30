import { Toast } from "./toast.js"

const selectedColor = document.querySelector('#selected-color')
const baseColorBar = document.querySelector('#base-color')
const allColors = document.querySelectorAll('[data-color-target]')
const colorBars = document.querySelector('.bar-results').children
const colorScheme = document.querySelector('#color-scheme-selection')
const submitBtn = document.querySelector('#submit')
const hexValues = document.querySelector('.hex-results').children
const title = document.querySelector('#title')
let baseColor = selectedColor.value
let scheme = colorScheme.value
let gradientArray = [baseColor]
let resultColors = []

window.onload = fetchColorData

selectedColor.addEventListener('input', () => {
    baseColorBar.style.background = selectedColor.value
    baseColor = selectedColor.value
    fetchColorData()
})

colorScheme.addEventListener('input', () => {
    scheme = colorScheme.value
    fetchColorData()
})

allColors.forEach(colorBar => {
    colorBar.addEventListener('click', () => {
        let color = colorBar.style.background
        copyToClipboard(color)
    })
})

function copyToClipboard(color) {
    navigator.clipboard.writeText(color)
        .then(() => copied(color))
        .catch(err => errorNotCopied(err))
}

const copied = color => new Toast({
    message: `${color} copied to clipboard`,
    type: 'success'
})

const errorNotCopied = err => new Toast({
    message: `Sorry, unable to copy to clipboard. ${err}`,
    type: 'danger'
})

function getColor(hexValue) {
    return hexValue.replace('#', '')
}

function fetchColorData() {
    let mode = colorScheme.value
    let color = getColor(selectedColor.value)
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=4`)
        .then(response => response.json())
        .then(data => returnColors(data))
}

function returnColors(data) {
    gradientArray = [baseColor]
    resultColors = data.colors
    for (let i = 0; i < colorBars.length - 1; i++) {
        colorBars[0].style.background = baseColor
        colorBars[i + 1].style.background = resultColors[i].hex.value
        hexValues[0].textContent = baseColor
        hexValues[i + 1].textContent = resultColors[i].hex.value
        gradientArray.push(resultColors[i].hex.value)
    }
    changeTitleGrad()
}

function changeTitleGrad() {
    let colors = gradientArray.join()
    title.style.color = baseColor
    title.style.background = `linear-gradient(45deg,${colors})`
}

new Toast({
    message: 'Welcome to Colour! The definitive color picker.',
    type: 'warning',
    customButtons: [
        {
            text: 'How it works?',
            onClick: () => howItWorks()
        }
    ]
});

function howItWorks() {
    document.querySelector('.instructions').style.display = 'flex'
    document.querySelector('#step3').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.instructions').style.display = 'none'
        document.querySelector('#step3').style.display = 'none'
    }, 7000);
}