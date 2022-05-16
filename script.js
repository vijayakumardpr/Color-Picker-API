let color = document.getElementById("colors")
let mode = document.getElementById("mode")
let form = document.querySelector("form")
let colorContainer = document.querySelector(".colors-container")
let copyClipboard = document.querySelector(".clipboard")
let copyColor = document.querySelectorAll(".color")

function getColors(e) {
  e.preventDefault()
  let trueColor = color.value.substring(1)
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${trueColor}&mode=${mode.value}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      let colors = data.colors

      colorContainer.innerHTML = `
                           <div style="background-color:${colors[0].hex.value}"></div>
                           <div style="background-color:${colors[1].hex.value}"></div>
                           <div style="background-color:${colors[2].hex.value}"></div>
                           <div style="background-color:${colors[3].hex.value}"></div>
                           <div style="background-color:${colors[4].hex.value}"></div>
             
           `

      copyClipboard.innerHTML = `
            <input type="text" class="color" value="${colors[0].hex.value}"></input>
            <input type="text" class="color" value="${colors[1].hex.value}"></input>
            <input type="text" class="color" value="${colors[2].hex.value}"></input>
            <input type="text" class="color" value="${colors[3].hex.value}"></input>
            <input type="text" class="color" value="${colors[4].hex.value}"></input>
           `
    })
}
form.addEventListener("submit", getColors)

copyColor.forEach((color) => {
  color.addEventListener("click", () => {
    console.log(color)
    color.select()
    navigator.clipboard.writeText(color.value)
    alert("Copied: " + color.value)
  })
})
