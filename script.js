    (() => {
      const button = document.querySelector(".menu-toggle");
      const navigation = document.querySelector("#primary-navigation");
      const header = document.querySelector(".site-header");
      document.querySelector("#current-year").textContent = new Date().getFullYear();
      const copyButton = document.querySelector(".contact-copy-button");
      const contactAddress = document.querySelector("#contact-address").textContent;
      const copyStatus = document.querySelector("#contact-copy-status");
      const mobile = window.matchMedia("(max-width: 760px)");
      let previousScrollY = window.scrollY;

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(contactAddress);
          copyStatus.textContent = "E-mail je skopírovaný.";
        } catch {
          copyStatus.textContent = "Kopírovanie sa nepodarilo. Označ adresu a skopíruj ju ručne.";
        }
      });

      const syncNavigation = () => {
        if (mobile.matches) {
          header.classList.remove("is-hidden");
          navigation.hidden = true;
          button.hidden = false;
          button.setAttribute("aria-expanded", "false");
          button.setAttribute("aria-label", "Otvoriť navigáciu");
        } else {
          navigation.hidden = false;
          button.hidden = true;
          button.setAttribute("aria-expanded", "true");
          button.setAttribute("aria-label", "Navigácia je otvorená");
          header.classList.remove("is-hidden");
        }
        previousScrollY = window.scrollY;
      };

      button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        button.setAttribute("aria-label", isExpanded ? "Otvoriť navigáciu" : "Zavrieť navigáciu");
        navigation.hidden = isExpanded;
      });

      navigation.addEventListener("click", (event) => {
        if (mobile.matches && event.target instanceof Element && event.target.closest("a")) {
          navigation.hidden = true;
          button.setAttribute("aria-expanded", "false");
          button.setAttribute("aria-label", "Otvoriť navigáciu");
        }
      });

      document.addEventListener("keydown", (event) => {
        if (mobile.matches && event.key === "Escape" && !navigation.hidden) {
          navigation.hidden = true;
          button.setAttribute("aria-expanded", "false");
          button.setAttribute("aria-label", "Otvoriť navigáciu");
          button.focus();
        }
      });

      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - previousScrollY;

        if (!mobile.matches) {
          header.classList.remove("is-hidden");
          previousScrollY = currentScrollY;
          return;
        }

        if (currentScrollY <= 0) {
          header.classList.remove("is-hidden");
          previousScrollY = currentScrollY;
          return;
        }

        if (Math.abs(scrollDifference) < 8) return;

        if (button.getAttribute("aria-expanded") !== "true") {
          header.classList.toggle("is-hidden", scrollDifference > 0);
        }
        previousScrollY = currentScrollY;
      }, { passive: true });

      mobile.addEventListener("change", syncNavigation);
      syncNavigation();
    })();
