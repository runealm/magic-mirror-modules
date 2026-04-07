Module.register("MMM-KioskPrices", {
    defaults: {
        title: "🥤 Kiosk",
        pricesFile: "prices.json",
        updateInterval: 60 * 1000, // Sjekk etter endringer hvert minutt
    },

    start: function () {
        this.prices = [];
        this.loadPrices();
        setInterval(() => {
            this.loadPrices();
        }, this.config.updateInterval);
    },

    loadPrices: function () {
        this.sendSocketNotification("GET_PRICES", {
            file: this.file(this.config.pricesFile),
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "PRICES_DATA") {
            this.prices = payload;
            this.updateDom();
        }
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "kiosk-wrapper";

        // Tittel
        const title = document.createElement("div");
        title.className = "kiosk-title";
        title.innerHTML = this.config.title;
        wrapper.appendChild(title);

        // Skillelinje
        const divider = document.createElement("div");
        divider.className = "kiosk-divider";
        wrapper.appendChild(divider);

        // Prisliste
        if (this.prices.length === 0) {
            const empty = document.createElement("div");
            empty.className = "kiosk-empty";
            empty.innerHTML = "Laster priser...";
            wrapper.appendChild(empty);
        } else {
            this.prices.forEach((item) => {
                const row = document.createElement("div");
                row.className = "kiosk-row";

                const name = document.createElement("span");
                name.className = "kiosk-name";
                name.innerHTML = item.name;

                const dots = document.createElement("span");
                dots.className = "kiosk-dots";

                const price = document.createElement("span");
                price.className = "kiosk-price";
                price.innerHTML = item.price + ",-";

                row.appendChild(name);
                row.appendChild(dots);
                row.appendChild(price);
                wrapper.appendChild(row);
            });
        }

        return wrapper;
    },

    getStyles: function () {
        return ["MMM-KioskPrices.css"];
    },
});
