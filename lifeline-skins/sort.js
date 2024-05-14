const searchBox = document.getElementById("searchBox");
const skins = document.querySelectorAll(".skin");
const sortOrder = document.getElementById("sortOrder");

searchBox.addEventListener("input", filterSkins);
sortOrder.addEventListener("change", filterSkins);

function filterSkins() {
  const searchTerm = searchBox.value.toLowerCase();
  const sortType = sortOrder.value;
  let sortedSkins;

  if (sortType === "none") {
    sortedSkins = Array.from(skins);
  } else {
    sortedSkins = Array.from(skins).sort((a, b) => {
      const titleA = a.querySelector("h2").textContent.toLowerCase();
      const titleB = b.querySelector("h2").textContent.toLowerCase();

      if (sortType === "az") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
  }

  sortedSkins.forEach((skin, index) => {
    const title = skin.querySelector("h2").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      skin.style.display = "block";
    } else {
      skin.style.display = "none";
    }

    skin.style.order = index;
  });
}
