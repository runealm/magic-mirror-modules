Module.register("MMM-Ordensmann", {
    defaults: {
        title: "🦺 Ordensmann",
        scheduleFile: "schedule.json",
        updateInterval: 60 * 60 * 1000, // Sjekk hver time
    },

    start: function () {
        this.schedule = [];
        this.loadSchedule();
        setInterval(() => {
            this.loadSchedule();
        }, this.config.updateInterval);
    },

    loadSchedule: function () {
        this.sendSocketNotification("GET_SCHEDULE", {
            file: this.file(this.config.scheduleFile),
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "SCHEDULE_DATA") {
            this.schedule = payload;
            this.updateDom();
        }
    },

    getMonthName: function (monthIndex) {
        const months = [
            "Januar", "Februar", "Mars", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Desember"
        ];
        return months[monthIndex];
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "ordensmann-wrapper";

        if (this.schedule.length === 0) {
            const empty = document.createElement("div");
            empty.innerHTML = "Laster ordensmann...";
            wrapper.appendChild(empty);
            return wrapper;
        }

        // Finn nåværende og neste måned
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear();

        let nextMonth = currentMonth + 1;
        let nextYear = currentYear;
        if (nextMonth > 12) {
            nextMonth = 1;
            nextYear = currentYear + 1;
        }

        // Tittel
        const title = document.createElement("div");
        title.className = "ordensmann-title";
        title.innerHTML = this.config.title;
        wrapper.appendChild(title);

        // Finn oppføringer for nåværende og neste måned
        const toShow = [
            { month: currentMonth, year: currentYear, isCurrent: true },
            { month: nextMonth, year: nextYear, isCurrent: false },
        ];

        toShow.forEach(({ month, year, isCurrent }) => {
            const entry = this.schedule.find(
                e => e.month === month && e.year === year
            );

            const row = document.createElement("div");
            row.className = "ordensmann-row" + (isCurrent ? " current" : " next");

            const monthName = this.getMonthName(month - 1);
            const name = entry ? entry.name : "—";

            row.innerHTML = `<span class="ordensmann-month">${monthName}</span>` +
                            `<span class="ordensmann-sep"> — </span>` +
                            `<span class="ordensmann-name">${name}</span>`;

            wrapper.appendChild(row);
        });

        return wrapper;
    },

    getStyles: function () {
        return ["MMM-Ordensmann.css"];
    },
});
