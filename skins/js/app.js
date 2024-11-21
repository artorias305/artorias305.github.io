fetch("skins.json")
  .then((response) => response.json())
  .then((data) => {
    const gallery = document.getElementById("skin-gallery");
    const searchInput = document.getElementById("search");
    const downloadAllBtn = document.getElementById("downloadAllBtn");

    downloadAllBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const originalText = downloadAllBtn.textContent;
      downloadAllBtn.textContent = "Preparing Download...";
      downloadAllBtn.style.pointerEvents = "none";

      try {
        const downloadUrls = data.map((skin) => skin.download);

        for (const url of downloadUrls) {
          const link = document.createElement("a");
          link.href = url;
          link.download = url.split("/").pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error("Error downloading skins:", error);
        alert("There was an error downloading the skins. Please try again.");
      } finally {
        downloadAllBtn.textContent = originalText;
        downloadAllBtn.style.pointerEvents = "auto";
      }
    });

    function renderSkins(skins) {
      gallery.innerHTML = "";
      skins.forEach((skin) => {
        gallery.innerHTML += `
          <div class="skin-card">
            <img src="${skin.thumbnail}" alt="${skin.name}">
            <h3>${skin.name}</h3>
            <p>By: ${skin.author}</p>
            <a href="${skin.download}" class="btn" download>Download</a>
          </div>
        `;
      });
    }

    renderSkins(data);

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filteredSkins = data.filter(
        (skin) =>
          skin.name.toLowerCase().includes(query) ||
          skin.author.toLowerCase().includes(query) ||
          skin.category.toLowerCase().includes(query)
      );
      renderSkins(filteredSkins);
    });

    gallery.addEventListener("click", (e) => {
      const button = e.target.closest(".btn");
      if (button) {
        const spinner = document.createElement("div");
        spinner.className = "spinner";

        button.classList.add("downloading");
        button.textContent = "Downloading";
        button.appendChild(spinner);

        setTimeout(() => {
          button.classList.remove("downloading");
          button.textContent = "Download";
          spinner.remove();
        }, 2000);
      }
    });
  })
  .catch((error) => console.error("Error loading skins:", error));
