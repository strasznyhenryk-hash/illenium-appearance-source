(function () {
    "use strict";

    /* ===== STATE ===== */
    const state = {
        visible: false,
        onRadio: false,
        channel: 0,
        volume: 30,
        favourite: [],
        recomended: [],
        members: {},
        userData: {},
        channelName: {},
        maxChannel: 500,
        locale: {},
        battery: 100,
        overlay: "default",
        insideJammer: false,
        radioId: null,
        mutedPlayers: {},
        freqInput: "",
        currentPage: "pageHome",
        showOverlay: false,
        isBroken: false
    };

    /* ===== DOM REFS ===== */
    const $ = (id) => document.getElementById(id);
    const app = $("app");
    const statusText = $("statusText");
    const onlineCount = $("onlineCount");
    const radioLed = { className: '' };
    const memberList = $("memberList");
    const favList = $("favList");
    const recentList = $("recentList");
    const freqDisplay = $("freqDisplay");
    const volumeSlider = $("volumeSlider");
    const volumeVal = $("volumeVal");
    const displayName = $("displayName");
    const soundIcon = $("soundIcon");
    const headerBattery = $("headerBattery");
    const notifyEl = $("notify");
    const overlay = $("overlay");
    const overlayList = $("overlayList");
    const btnStar = null;
    const btnToggleOverlay = $("btnToggleOverlay");
    const btnAllowMove = $("btnAllowMove");
    const btnEnableClicks = $("btnEnableClicks");
    const batteryDrainOverlay = $("batteryDrainOverlay");

    /* ===== NUI FETCH ===== */
    function nuiCallback(name, data) {
        return fetch("https://z_radio/" + name, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(r => r.json()).catch(() => {});
    }

    /* ===== PAGE NAVIGATION ===== */
    function showPage(pageId) {
        if (state.isBroken && pageId !== "pageBroken") return;

        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        const page = $(pageId);
        if (page) page.classList.add("active");
        state.currentPage = pageId;

        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        const navMap = {
            pageHome: "navHome",
            pageChannel: "navChannel",
            pageSettings: "navSettings",
            pageMembers: "navHome",
            pageFavorites: "navHome",
            pageRecent: "navHome",
            pageBroken: null
        };
        const navId = navMap[pageId];
        if (navId) $(navId).classList.add("active");
    }

    /* ===== UPDATE UI ===== */
    function updateStatusDisplay() {
        if (state.isBroken) return;

        if (state.onRadio && state.channel > 0) {
            const chName = getChannelName(state.channel);
            statusText.textContent = "POLACZONO: " + state.channel.toFixed(2);
            if (chName) statusText.textContent = chName;
            radioLed.className = "radio-led connected";
        } else {
            statusText.textContent = "ROZLACZONO";
            radioLed.className = "radio-led";
        }

        if (state.insideJammer) {
            radioLed.className = "radio-led jammed";
        }

        const count = state.members ? Object.keys(state.members).length : 0;
        onlineCount.textContent = count;

        updateBatteryIcon();
        updateStarButton();
        updateVolumeIcon();
    }

    function getChannelName(ch) {
        if (!state.channelName) return null;
        const key = String(ch);
        if (state.channelName[key]) return state.channelName[key];
        const intPart = Math.floor(ch);
        const pKey = intPart + ".%";
        if (state.channelName[pKey]) return state.channelName[pKey];
        return null;
    }

    function updateBatteryIcon() {
        headerBattery.className = "fas";
        if (state.battery > 75) headerBattery.className += " fa-battery-full";
        else if (state.battery > 50) headerBattery.className += " fa-battery-three-quarters";
        else if (state.battery > 25) headerBattery.className += " fa-battery-half";
        else if (state.battery > 10) headerBattery.className += " fa-battery-quarter";
        else {
            headerBattery.className += " fa-battery-empty low";
        }
    }

    function updateStarButton() {
        if (!btnStar) return;
        if (state.onRadio && state.favourite.includes(state.channel)) {
            btnStar.classList.add("faved");
        } else {
            btnStar.classList.remove("faved");
        }
    }

    function updateVolumeIcon() {
        if (state.volume === 0) {
            soundIcon.className = "fas fa-volume-mute";
        } else if (state.volume < 50) {
            soundIcon.className = "fas fa-volume-down";
        } else {
            soundIcon.className = "fas fa-volume-up";
        }
    }

    /* ===== MEMBERS LIST ===== */
    function renderMembers() {
        memberList.innerHTML = "";
        if (!state.members || Object.keys(state.members).length === 0) {
            memberList.innerHTML = '<div class="empty-msg">BRAK CZLONKOW</div>';
            return;
        }
        for (const [id, data] of Object.entries(state.members)) {
            const item = document.createElement("div");
            item.className = "member-item";

            const talkIcon = document.createElement("i");
            talkIcon.className = "fas fa-microphone talking-icon" + (data.isTalking ? " active" : "");

            const nameEl = document.createElement("span");
            nameEl.className = "name";
            nameEl.textContent = data.name || ("Gracz #" + id);

            const muteBtn = document.createElement("button");
            muteBtn.className = "mute-btn" + (state.mutedPlayers[id] ? " muted" : "");
            muteBtn.innerHTML = state.mutedPlayers[id] ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            muteBtn.onclick = () => {
                nuiCallback("togglemutePlayer", parseInt(id)).then(result => {
                    if (result) state.mutedPlayers = result;
                    renderMembers();
                });
            };

            item.appendChild(talkIcon);
            item.appendChild(nameEl);
            item.appendChild(muteBtn);
            memberList.appendChild(item);
        }
    }

    /* ===== FAVORITES LIST ===== */
    function renderFavorites() {
        favList.innerHTML = "";
        if (!state.favourite || state.favourite.length === 0) {
            favList.innerHTML = '<div class="empty-msg">BRAK ULUBIONYCH</div>';
            return;
        }
        state.favourite.forEach(ch => {
            const item = document.createElement("div");
            item.className = "channel-item";

            const freq = document.createElement("span");
            freq.className = "ch-freq";
            freq.textContent = Number(ch).toFixed(2) + " MHz";

            const name = getChannelName(ch);
            const nameEl = document.createElement("span");
            nameEl.className = "ch-name";
            nameEl.textContent = name || "";

            item.appendChild(freq);
            item.appendChild(nameEl);

            item.onclick = () => {
                nuiCallback("join", ch);
            };

            favList.appendChild(item);
        });
    }

    /* ===== RECENT LIST ===== */
    function renderRecent() {
        recentList.innerHTML = "";
        if (!state.recomended || state.recomended.length === 0) {
            recentList.innerHTML = '<div class="empty-msg">BRAK OSTATNICH</div>';
            return;
        }
        state.recomended.forEach(ch => {
            const item = document.createElement("div");
            item.className = "channel-item";

            const freq = document.createElement("span");
            freq.className = "ch-freq";
            freq.textContent = Number(ch).toFixed(2) + " MHz";

            const name = getChannelName(ch);
            const nameEl = document.createElement("span");
            nameEl.className = "ch-name";
            nameEl.textContent = name || "";

            item.onclick = () => {
                nuiCallback("join", ch);
            };

            item.appendChild(freq);
            item.appendChild(nameEl);
            recentList.appendChild(item);
        });
    }

    /* ===== OVERLAY ===== */
    function updateOverlay() {
        if (!state.showOverlay || !state.onRadio) {
            overlay.style.display = "none";
            return;
        }
        overlay.style.display = "block";
        overlayList.innerHTML = "";
        if (state.members) {
            for (const [id, data] of Object.entries(state.members)) {
                const item = document.createElement("div");
                item.className = "overlay-item";

                const dot = document.createElement("div");
                dot.className = "ov-talking" + (data.isTalking ? " active" : "");

                const nameEl = document.createElement("span");
                nameEl.textContent = data.name || ("Gracz #" + id);

                item.appendChild(dot);
                item.appendChild(nameEl);
                overlayList.appendChild(item);
            }
        }
    }

    /* ===== NOTIFY ===== */
    let notifyTimeout = null;
    function showNotify(msg, duration) {
        notifyEl.textContent = msg;
        notifyEl.style.display = "block";
        if (notifyTimeout) clearTimeout(notifyTimeout);
        notifyTimeout = setTimeout(() => {
            notifyEl.style.display = "none";
        }, duration || 3000);
    }

    /* ===== SETTINGS ===== */
    function loadSettings() {
        if (state.userData) {
            if (state.userData.name) displayName.value = state.userData.name;
            if (state.userData.playerlist) {
                state.showOverlay = state.userData.playerlist.show || false;
                btnToggleOverlay.textContent = state.showOverlay ? "UKRYJ" : "POKAZ";
            }
            if (state.userData.allowMovement) {
                btnAllowMove.textContent = state.userData.allowMovement ? "WL" : "WYL";
            }
            if (state.userData.enableClicks) {
                btnEnableClicks.textContent = state.userData.enableClicks ? "WL" : "WYL";
            }
        }
        volumeSlider.value = state.volume;
        volumeVal.textContent = state.volume + "%";
    }

    /* ===== BROKEN RADIO STATE ===== */
    function showBrokenScreen() {
        state.isBroken = true;
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        $("pageBroken").classList.add("active");
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.classList.remove("active");
            b.style.pointerEvents = "none";
        });
    }

    function hideBrokenScreen() {
        state.isBroken = false;
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.style.pointerEvents = "";
        });
    }

    /* ===== NUI MESSAGE HANDLER ===== */
    window.addEventListener("message", function (event) {
        const msg = event.data;
        if (!msg || !msg.action) return;

        switch (msg.action) {
            case "setRadioVisible": {
                const d = msg.data;
                state.visible = true;
                state.onRadio = d.onRadio;
                state.channel = d.channel || 0;
                state.volume = d.volume || 30;
                state.favourite = d.favourite || [];
                state.recomended = d.recomended || [];
                state.userData = d.userData || {};
                state.channelName = d.channelName || {};
                state.maxChannel = d.maxChannel || 500;
                state.locale = d.locale || {};
                state.battery = d.battery || 100;
                state.overlay = d.overlay || "default";
                state.insideJammer = d.insideJammerZone || false;
                state.radioId = d.radioId || null;
                state.isBroken = d.isBroken || false;

                app.style.display = "block";

                if (state.isBroken) {
                    showBrokenScreen();
                } else {
                    hideBrokenScreen();
                    showPage("pageHome");
                    updateStatusDisplay();
                    loadSettings();
                }

                nuiCallback("getMutedList", null).then(result => {
                    if (result) state.mutedPlayers = result;
                });

                if (state.overlay === "always") {
                    state.showOverlay = true;
                } else if (state.overlay === "never") {
                    state.showOverlay = false;
                }
                updateOverlay();
                break;
            }

            case "setRadioHide":
                state.visible = false;
                app.style.display = "none";
                break;

            case "updateRadio": {
                const d = msg.data;
                state.onRadio = d.onRadio;
                state.channel = d.channel || 0;
                state.volume = d.volume || 30;
                state.favourite = d.favourite || [];
                state.recomended = d.recomended || [];
                state.userData = d.userData || {};
                state.battery = d.battery || 100;
                state.insideJammer = d.insideJammerZone || false;
                updateStatusDisplay();
                updateOverlay();
                break;
            }

            case "notify":
                showNotify(msg.data.msg, msg.data.duration);
                break;

            case "insideJammer":
                state.insideJammer = msg.data;
                updateStatusDisplay();
                break;

            case "updateRadioList":
                state.members = msg.data || {};
                updateStatusDisplay();
                if (state.currentPage === "pageMembers") renderMembers();
                updateOverlay();
                break;

            case "updateRadioTalking": {
                const d = msg.data;
                if (state.members && state.members[d.radioId]) {
                    state.members[d.radioId].isTalking = d.radioTalking;
                }
                if (state.currentPage === "pageMembers") renderMembers();
                updateOverlay();
                break;
            }

            case "UpdateTime":
                break;

            case "batteryUpdate": {
                state.battery = msg.data;
                updateBatteryIcon();
                break;
            }

            case "batteryDrainAnim": {
                if (msg.data) {
                    batteryDrainOverlay.style.display = "flex";
                } else {
                    batteryDrainOverlay.style.display = "none";
                }
                break;
            }

            case "radioBroken": {
                showBrokenScreen();
                break;
            }
        }
    });

    /* ===== EVENT LISTENERS ===== */

    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (state.isBroken) return;
            const page = btn.dataset.page;
            if (page) {
                showPage(page);
                if (page === "pageSettings") loadSettings();
            }
        });
    });

    // Home buttons
    $("btnStatus").addEventListener("click", () => {
        if (state.isBroken) return;
        if (state.onRadio) {
            showPage("pageChannel");
        } else {
            showPage("pageChannel");
        }
    });

    $("btnReconnect").addEventListener("click", () => {
        if (state.isBroken) return;
        if (state.onRadio) {
            nuiCallback("leave", null);
        } else {
            showPage("pageChannel");
        }
    });

    $("btnOnline").addEventListener("click", () => {
        if (state.isBroken) return;
        renderMembers();
        showPage("pageMembers");
    });

    $("btnMyRadios").addEventListener("click", () => {
        if (state.isBroken) return;
        renderFavorites();
        showPage("pageFavorites");
    });

    $("btnSecure").addEventListener("click", () => {
        if (state.isBroken) return;
        renderRecent();
        showPage("pageRecent");
    });

    $("btnSound").addEventListener("click", () => {
        if (state.isBroken) return;
        if (state.volume > 0) {
            state.volume = 0;
            nuiCallback("toggleMute", 0);
        } else {
            state.volume = 30;
            nuiCallback("toggleMute", 30);
        }
        updateVolumeIcon();
        volumeSlider.value = state.volume;
        volumeVal.textContent = state.volume + "%";
    });

    $("btnRecent").addEventListener("click", () => {
        if (state.isBroken) return;
        renderRecent();
        showPage("pageRecent");
    });

    // PTT button
    const pttBtn = $("btnCallGreen");
    if (pttBtn) {
        pttBtn.addEventListener("click", () => {
            if (state.isBroken) return;
            if (!state.onRadio) {
                showPage("pageChannel");
            } else {
                nuiCallback("leave", null);
            }
        });
    }

    // Numpad
    document.querySelectorAll(".num-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (state.isBroken) return;
            const num = btn.dataset.num;
            if (num === "C") {
                state.freqInput = "";
            } else {
                if (num === "." && state.freqInput.includes(".")) return;
                if (state.freqInput.length >= 8) return;
                state.freqInput += num;
            }
            freqDisplay.textContent = state.freqInput || "0.00";
        });
    });

    // Connect button
    $("btnConnect").addEventListener("click", () => {
        if (state.isBroken) return;
        const freq = parseFloat(state.freqInput);
        if (!isNaN(freq) && freq > 0) {
            nuiCallback("join", freq);
            state.freqInput = "";
            freqDisplay.textContent = "0.00";
            showPage("pageHome");
        }
    });

    // Volume slider
    volumeSlider.addEventListener("input", () => {
        state.volume = parseInt(volumeSlider.value);
        volumeVal.textContent = state.volume + "%";
    });
    volumeSlider.addEventListener("change", () => {
        nuiCallback("volumeChange", state.volume);
        updateVolumeIcon();
    });

    // Toggle overlay
    btnToggleOverlay.addEventListener("click", () => {
        state.showOverlay = !state.showOverlay;
        btnToggleOverlay.textContent = state.showOverlay ? "UKRYJ" : "POKAZ";
        nuiCallback("showPlayerList", state.showOverlay);
        updateOverlay();
    });

    // Allow movement
    btnAllowMove.addEventListener("click", () => {
        const newVal = btnAllowMove.textContent === "WYL";
        btnAllowMove.textContent = newVal ? "WL" : "WYL";
        nuiCallback("allowMovement", newVal);
    });

    // Enable clicks
    btnEnableClicks.addEventListener("click", () => {
        const newVal = btnEnableClicks.textContent === "WYL";
        btnEnableClicks.textContent = newVal ? "WL" : "WYL";
        nuiCallback("enableClicks", newVal);
    });

    // Save settings
    $("btnSaveSettings").addEventListener("click", () => {
        if (state.isBroken) return;
        const name = displayName.value.trim();
        if (name) {
            nuiCallback("saveData", { name: name });
        }
        showNotify("ZAPISANO", 2000);
    });

    // Back buttons
    ["btnBackMembers", "btnBackFav", "btnBackRecent", "btnBackSettings", "btnBackChannel"].forEach(id => {
        const btn = $(id);
        if (btn) {
            btn.addEventListener("click", () => {
                showPage("pageHome");
            });
        }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && state.visible) {
            nuiCallback("hideUI", null);
        }
    });
})();
