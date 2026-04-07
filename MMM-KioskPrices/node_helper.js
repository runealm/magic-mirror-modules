const NodeHelper = require("node_helper");
const fs = require("fs");

module.exports = NodeHelper.create({
    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_PRICES") {
            try {
                const data = fs.readFileSync(payload.file, "utf8");
                const prices = JSON.parse(data);
                this.sendSocketNotification("PRICES_DATA", prices);
            } catch (e) {
                console.error("[MMM-KioskPrices] Kunne ikke lese prices.json:", e.message);
                this.sendSocketNotification("PRICES_DATA", []);
            }
        }
    },
});
