! function(e) {
    var t = {};

    function i(s) {
        if (t[s]) return t[s].exports;
        var a = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(a.exports, a, a.exports, i), a.l = !0, a.exports
    }
    i.m = e, i.c = t, i.d = function(e, t, s) {
        i.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: s
        })
    }, i.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 2)
}([function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const s = .6;
    t.Visualizer = class {
        constructor(e, t = 2048) {
            this.canvas = e, this.drawContext = e.getContext("2d"), this.audioContext = new AudioContext, this.analyser = this.audioContext.createAnalyser(), this.drawFunc = (() => {}), this.analyser.minDecibels = -140, this.analyser.maxDecibels = 0, this.analyser.smoothingTimeConstant = s, this.freqs = new Uint8Array(this.analyser.frequencyBinCount), this.times = new Uint8Array(this.analyser.frequencyBinCount)
        }
        connect(e) {
            const t = this.audioContext.createMediaElementSource(e);
            t.connect(this.audioContext.destination), t.connect(this.analyser)
        }
        draw() {
            this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height), this.analyser.getByteFrequencyData(this.freqs), this.analyser.getByteTimeDomainData(this.times), this.drawFunc(this.freqs, this.times, this.drawContext, this.canvas), this.loop = requestAnimationFrame(this.draw.bind(this))
        }
        set drawFunction(e) {
            this.drawFunc = e
        }
        start() {
            this.draw()
        }
        stop() {
            this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height), cancelAnimationFrame(this.loop)
        }
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const s = i(0);
    t.default = class extends s.Visualizer {
        constructor(e) {
            super(e, 32)
        }
        start() {
            super.start(), this.drawFunction = ((e, t, i, s) => {
                const a = e[0] / 10;
                i.beginPath(), i.arc(s.width / 2, s.height / 2, a, 0, 2 * Math.PI), i.fillStyle = "white", i.fill()
            })
        }
        stop() {
            setTimeout(() => {
                super.stop()
            }, 1e3)
        }
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const s = i(1);
    var a;
    ! function(e) {
        e.Idle = "idle", e.Listening = "listening", e.Busy = "busy", e.Speaking = "speak"
    }(a || (a = {}));
    const n = [];
    Module.register("MMM-awesome-alexa", {
        defaults: {
            clientId: "amzn1.application-oa2-client.81574bebfb25437595d7376f44b54f8e",
            clientSecret: "87d49f998b3a6507b8e6a08760cda274e1d44a22a2bebade9433b1e7445d66a5",
            deviceId: "magic_mirror_alexa",
            lite: 1,
            isSpeechVisualizationEnabled: 1
        },
        start() {
            void 0 === this.config.refreshToken && n.push("Refresh token must be set in the config before using awesome-alexa!"), this.sendSocketNotification("CONFIG", this.config), this.canvas = this.createCanvas(), this.config.isSpeechVisualizationEnabled && (this.visualizer = new s.default(this.canvas))
        },
        getDom() {
            const e = document.createElement("div");
            e.setAttribute("id", "wrapper"), e.classList.add("wrapper");
            const t = this.createLoadingSpinner(),
                i = document.createElement("div");
            if (i.classList.add("alexa-circle"), e.appendChild(t), e.appendChild(i), e.appendChild(this.canvas), n.length > 0) {
                e.classList.add("wrapper-error");
                for (const t of n) e.appendChild(document.createTextNode(t))
            }
            return this.alexaCircle = i, this.mainDiv = e, e
        },
        getStyles() {
            return [this.file("styles/global.css")]
        },
        createLoadingSpinner() {
            const e = document.createElement("img");
            return e.setAttribute("src", "modules/MMM-awesome-alexa/styles/loading.gif"), e.setAttribute("id", "loading-spinner"), e.classList.add("loading-spinner"), e.classList.add("hidden"), e
        },
        createCanvas() {
            const e = document.createElement("canvas");
            return e.width = window.innerWidth, e.height = window.innerHeight, e
        },
        socketNotificationReceived(e, t) {
            switch (Log.log(this.name + " received a notification: " + e + " - Payload: " + t), e) {
                case a.Idle:
                    this.idle();
                    break;
                case a.Listening:
                    this.listening();
                    break;
                case a.Busy:
                    this.busy();
                    break;
                case a.Speaking:
                    this.speaking()
            }
        },
        listening() {
            if (this.config.lite) {
                document.getElementById("loading-spinner").classList.remove("hidden")
            } else this.alexaCircle.classList.add("alexa-circle--listening"), this.mainDiv.classList.add("wrapper-active")
        },
        idle() {
            this.config.lite || this.mainDiv.classList.remove("wrapper-active")
        },
        busy() {
            this.config.lite || this.alexaCircle.classList.add("alexa-circle--busy")
        },
        speaking() {
            const e = new Audio("/output.mpeg");
            // runs when speaking
            if (this.config.isSpeechVisualizationEnabled && (this.visualizer.connect(e), this.visualizer.start()), e.play(), e.addEventListener("ended", () => {
                    this.sendSocketNotification("finishedSpeaking", {}), this.config.isSpeechVisualizationEnabled && this.visualizer.stop()
                }), this.config.lite) {
                document.getElementById("loading-spinner").classList.add("hidden")
            } else this.alexaCircle.classList.remove("alexa-circle--busy", "alexa-circle--listening")
        }
    })
}]);