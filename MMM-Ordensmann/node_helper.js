const NodeHelper = require("node_helper");
const fs = require("fs");

module.exports = NodeHelper.create({
    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_SCHEDULE") {
            try {
                const data = fs.readFileSync(payload.file, "utf8");
                const schedule = JSON.parse(data);
                this.sendSocketNotification("SCHEDULE_DATA", schedule);
            } catch (e) {
                console.error("[MMM-Ordensmann] Kunne ikke lese schedule.json:", e.message);
                this.sendSocketNotification("SCHEDULE_DATA", []);
            }
        }
    },
});
