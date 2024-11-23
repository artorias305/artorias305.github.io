fetch("skins.json")
  .then((response) => response.json())
  .then((data) => {
    const gallery = document.getElementById("skin-gallery");
    const searchInput = document.getElementById("search");
    const downloadAllBtn = document.getElementById("downloadAllBtn");

    const themeSwitch = document.getElementById("checkbox");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      if (currentTheme === "light") {
        themeSwitch.checked = true;
      }
    }

    themeSwitch.addEventListener("change", function (e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });

    if (!currentTheme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );
      themeSwitch.checked = !prefersDark;
    }

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

    function createImageModal() {
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-content">
          <img class="modal-img" src="" alt="Preview">
        </div>
        <div class="zoom-controls">
          <button class="zoom-btn" id="zoom-out">-</button>
          <div class="zoom-level">100%</div>
          <button class="zoom-btn" id="zoom-in">+</button>
        </div>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const modal = createImageModal();
    const modalImg = modal.querySelector(".modal-img");
    const zoomLevel = modal.querySelector(".zoom-level");
    const closeBtn = modal.querySelector(".close-modal");
    const zoomInBtn = modal.querySelector("#zoom-in");
    const zoomOutBtn = modal.querySelector("#zoom-out");

    let scale = 1;
    let isDragging = false;
    let startX,
      startY,
      translateX = 0,
      translateY = 0;

    function updateTransform() {
      modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      zoomLevel.textContent = `${Math.round(scale * 100)}%`;
    }

    function resetZoom() {
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    }

    function renderSkins(skins) {
      gallery.innerHTML = "";
      skins.forEach((skin) => {
        gallery.innerHTML += `
          <div class="skin-card">
            <img src="${skin.thumbnail}" alt="${skin.name}" class="preview-trigger">
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

    gallery.addEventListener("click", (e) => {
      if (e.target.classList.contains("preview-trigger")) {
        modal.style.display = "block";
        modalImg.src = e.target.src;
        resetZoom();
      }
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    zoomInBtn.addEventListener("click", () => {
      scale = Math.min(scale + 0.25, 3);
      updateTransform();
    });

    zoomOutBtn.addEventListener("click", () => {
      scale = Math.max(scale - 0.25, 0.5);
      updateTransform();
    });

    modalImg.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      scale = Math.max(0.5, Math.min(scale + delta, 3));
      updateTransform();
    });

    modalImg.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      modalImg.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      modalImg.style.cursor = "move";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    window.addEventListener("keydown", (e) => {
      if (modal.style.display === "block") {
        switch (e.key) {
          case "Escape":
            modal.style.display = "none";
            break;
          case "+":
          case "=":
            scale = Math.min(scale + 0.25, 3);
            updateTransform();
            break;
          case "-":
            scale = Math.max(scale - 0.25, 0.5);
            updateTransform();
            break;
          case "0":
            resetZoom();
            break;
        }
      }
    });
  })
  .catch((error) => console.error("Error loading skins:", error));
