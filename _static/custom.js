document.addEventListener(
  "input",
  function (event) {
    // Only run on our select menu
    if (!["destinationChain", "sourceChain"].includes(event.target.id)) return;

    const $destination = document.querySelector("#destinationChain");
    const $source = document.querySelector("#sourceChain");
    // Terra can only be the source OR destination.
    if (event.target.id === "sourceChain" && event.target.value === "terra") {
      $destination.value = "ethereum";
    } else if (
      event.target.id === "destinationChain" &&
      event.target.value === "terra"
    ) {
      $source.value = "ethereum";
    }

    // Either source or destination should be Terra, so enforce that!
    if (
      event.target.id === "sourceChain" &&
      $destination.value !== "terra" &&
      event.target.value !== "terra"
    ) {
      $destination.value = "terra";
    } else if (
      event.target.id === "destinationChain" &&
      $source.value !== "terra" &&
      event.target.value !== "terra"
    ) {
      $source.value = "terra";
    }

    const sourceChain = $source.value;
    const destinationChain = $destination.value;

    const combined = [sourceChain, destinationChain];

    combined.sort();

    const idToShow = combined.join("_");

    document.querySelectorAll(".bridgedocs").forEach((i) => {
      i.style = "display: none";
    });

    document.querySelector(`#${idToShow}`).style = "";
  },
  false
);

setTimeout(() => {
  const rightNav = document.querySelector(".topbar-main");

  const str = `
    <div class="theme-switcher">
			<input type="radio" id="light-theme" name="themes" />
			<label for="light-theme">
				<span>
					Light
				</span>
			</label>
			<input type="radio" id="dark-theme" name="themes" />
			<label for="dark-theme">
				<span>
					Dark
				</span>
			</label>

			<span class="slider"></span>
		</div>
  `;

  rightNav.insertAdjacentHTML("afterbegin", str);

  const lightThemeElm = document.getElementById("light-theme");
  const darkThemeElm = document.getElementById("dark-theme");
  const currentThemeEvent = localStorage.getItem("theme");

  if (currentThemeEvent === "dark-theme" && !darkThemeElm.checked) {
    darkThemeElm.checked = true;
  } else {
    lightThemeElm.checked = true;
  }

  lightThemeElm.addEventListener("click", function () {
    const currentThemeEvent = localStorage.getItem("theme");

    setLightTheme();

    lightThemeElm.checked = true;
    darkThemeElm.checked = false;
  });

  darkThemeElm.addEventListener("click", function () {
    const currentThemeEvent = localStorage.getItem("theme");

    setDarkTheme();

    darkThemeElm.checked = true;
    lightThemeElm.checked = false;
  });
}, 250);
