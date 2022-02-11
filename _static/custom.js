document.addEventListener(
  "input",
  function(event) {
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

    document.querySelectorAll('.bridgedocs').forEach(i => {
      i.style = 'display: none';
    });

    document.querySelector(`#${idToShow}`).style = '';
  },
  false
);
