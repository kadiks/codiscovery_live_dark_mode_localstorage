let toggleBtn = null
let colorScheme = null

const init = () => {
  colorScheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark"

  const userSelectedColor = localStorage.getItem("color-scheme")
  if (userSelectedColor) {
    colorScheme = userSelectedColor
  }

  changeMode(colorScheme)

  //   console.log("colorScheme", colorScheme)
  toggleBtn = document.querySelector(".toggle-color-mode")

  toggleBtn.addEventListener("click", () => {
    // colorScheme =         SI        ? ALORS    : SINON;
    colorScheme = colorScheme === "dark" ? "light" : "dark"

    // console.log("colorScheme #2", colorScheme)
    changeMode(colorScheme)
  })
}

const changeMode = (colorMode) => {
  localStorage.setItem("color-scheme", colorMode)

  const iconClass = {
    dark: "fa-moon",
    light: "fa-sun"
  }

  document.querySelectorAll(".toggle-color-mode > *").forEach((el) => {
    el.classList.remove("selected")
  })

  const selector = `.toggle-color-mode > .${iconClass[colorMode]}`
  console.log("selector", selector)
  document.querySelector(selector).classList.add("selected")

  const inverseColorMode = colorMode === "dark" ? "light" : "dark"

  const colorVariables = [
    `--bg-${colorMode}-color`,
    `--font-${colorMode}-body`,
    `--font-${inverseColorMode}-body`,
    `--${colorMode}-primary-color`,
    `--${colorMode}-secondary-color`
  ]
  const finalVariables = [
    `--bg-color`,
    `--font-body`,
    `--font-button-body`,
    `--primary-color`,
    `--secondary-color`
  ]

  // Get all colors from colorMode
  const colorValues = colorVariables.map((variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    )
  })

  // Apply colors to final CSS variables
  finalVariables.forEach((finalVariable, index) => {
    document.documentElement.style.setProperty(
      finalVariable,
      colorValues[index]
    )
  })
}

window.addEventListener("load", init)
