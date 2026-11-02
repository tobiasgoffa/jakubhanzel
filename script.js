    (() => {
      const button = document.querySelector(".menu-toggle");
      const navigation = document.querySelector("#primary-navigation");
      const mobile = window.matchMedia("(max-width: 760px)");

      const syncNavigation = () => {
        if (mobile.matches) {
          navigation.hidden = true;
          button.hidden = false;
          button.setAttribute("aria-expanded", "false");
          button.setAttribute("aria-label", "Otvoriť navigáciu");
        } else {
          navigation.hidden = false;
          button.hidden = true;
          button.setAttribute("aria-expanded", "true");
          button.setAttribute("aria-label", "Navigácia je otvorená");
        }
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

      mobile.addEventListener("change", syncNavigation);
      window.addEventListener("resize", syncNavigation);
      syncNavigation();
    })();
