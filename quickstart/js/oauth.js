/* JS */
(function ()
{
    var window = this;
    var _ = {};
    _.m = function (a)
    {
        throw a;
    };
    _.p = void 0;
    _.r = !0;
    _.s = null;
    _.u = !1;
    _.aa = function ()
    {
        return function (a)
        {
            return a
        }
    };
    _.x = function ()
    {
        return function () {}
    };
    _.ba = function (a)
    {
        return function (c)
        {
            this[a] = c
        }
    };
    _.y = function (a)
    {
        return function ()
        {
            return this[a]
        }
    };
    _.ca = function (a)
    {
        return function ()
        {
            return a
        }
    };
    _.C = function (a, c, f)
    {
        a = a.split(".");
        f = f || _.D;
        !(a[0] in f) && f.execScript && f.execScript("var " + a[0]);
        for (var g; a.length && (g = a.shift());)!a.length && (0, _.kf)(c) ? f[g] = c : f = f[g] ? f[g] : f[g] = {}
    };
    _.da = function (a)
    {
        var c = typeof a;
        if ("object" == c) if (a)
            {
                if (a instanceof window.Array) return "array";
                if (a instanceof window.Object) return c;
                var f = window.Object.prototype.toString.call(a);
                if ("[object Window]" == f) return "object";
                if ("[object Array]" == f || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == f || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            }
            else return "null";
            else if ("function" == c && "undefined" == typeof a.call) return "object";
        return c
    };
    _.kf = function (a)
    {
        return a !== _.p
    };
    _.ea = function (a)
    {
        return "array" == (0, _.da)(a)
    };
    _.re = function (a)
    {
        var c = (0, _.da)(a);
        return "array" == c || "object" == c && "number" == typeof a.length
    };
    _.fa = function (a)
    {
        return "string" == typeof a
    };
    _.ga = function (a)
    {
        return "function" == (0, _.da)(a)
    };
    _.Vg = function (a)
    {
        var c = typeof a;
        return "object" == c && a != _.s || "function" == c
    };
    _.ia = function (a, c, f)
    {
        return a.call.apply(a.bind, arguments)
    };
    _.la = function (a, c, f)
    {
        a || (0, _.m)((0, window.Error)());
        if (2 < arguments.length)
        {
            var g = window.Array.prototype.slice.call(arguments, 2);
            return function ()
            {
                var f = window.Array.prototype.slice.call(arguments);
                window.Array.prototype.unshift.apply(f, g);
                return a.apply(c, f)
            }
        }
        return function ()
        {
            return a.apply(c, arguments)
        }
    };
    _.H = function (a, c, f)
    {
        _.H = window.Function.prototype.bind && -1 != window.Function.prototype.bind.toString().indexOf("native code") ? _.ia : _.la;
        return _.H.apply(_.s, arguments)
    };
    _.ma = function (a, c)
    {
        var f = window.Array.prototype.slice.call(arguments, 1);
        return function ()
        {
            var c = window.Array.prototype.slice.call(arguments);
            c.unshift.apply(c, f);
            return a.apply(this, c)
        }
    };
    _.J = function (a, c)
    {
        function f()
        {}
        f.prototype = c.prototype;
        a.T = c.prototype;
        a.prototype = new f;
        a.prototype.constructor = a
    };
    _._DumpException = function (a)
    {
        (0, _.m)(a)
    };
    _.na = _.na ||
    {};
    _.D = this;
    _.oa = "closure_uid_" + (1E9 * window.Math.random() >>> 0);
    _.pa = window.Date.now || function ()
    {
        return +new window.Date
    };
    window.Function.prototype.bind = window.Function.prototype.bind || function (a, c)
    {
        if (1 < arguments.length)
        {
            var f = window.Array.prototype.slice.call(arguments, 1);
            f.unshift(this, a);
            return _.H.apply(_.s, f)
        }
        return (0, _.H)(this, a)
    };
    _.Kh = window.gapi ||
    {};
    _.ra = window.gadgets ||
    {};
    _.L = window.osapi = window.osapi ||
    {};
    window.___jsl = window.___jsl ||
    {};
    (window.___jsl.cd = window.___jsl.cd || []).push(
    {
        gwidget:
        {
            parsetags: "explicit"
        },
        appsapi:
        {
            plus_one_service: "/plus/v1"
        },
        client:
        {
            jsonpOverride: _.u
        },
        poshare:
        {
            hangoutContactPickerServer: "https://plus.google.com"
        },
        gappsutil:
        {
            required_scopes: ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/plus.people.recommended"],
            display_on_page_ready: _.u
        },
        appsutil:
        {
            required_scopes: ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/plus.people.recommended"],
            display_on_page_ready: _.u
        },
        "oauth-flow":
        {
            authUrl: "https://accounts.google.com/o/oauth2/auth",
            proxyUrl: "https://accounts.google.com/o/oauth2/postmessageRelay",
            redirectUri: "postmessage"
        },
        iframes:
        {
            sharebox:
            {
                params:
                {
                    json: "&"
                },
                url: ":socialhost:/:session_prefix:_/sharebox/dialog"
            },
            plus:
            {
                url: ":socialhost:/u/:session_index:/_/pages/badge"
            },
            ":socialhost:": "https://plusone.google.com",
            card:
            {
                params:
                {
                    s: "#",
                    userid: "&"
                },
                url: ":socialhost:/:session_prefix:_/hovercard/internalcard"
            },
            ":signuphost:": "https://plus.google.com",
            plusone:
            {
                url: ":socialhost:/:session_prefix:_/+1/fastbutton"
            },
            plus_share:
            {
                url: ":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true"
            },
            plus_circle:
            {
                url: ":socialhost:/:session_prefix:_/widget/plus/circle"
            },
            configurator:
            {
                url: ":socialhost:/:session_prefix:_/plusbuttonconfigurator"
            },
            appcirclepicker:
            {
                url: ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
            },
            ":source:": "1p"
        },
        poclient:
        {
            update_session: "google.updateSessionCallback"
        },
        "googleapis.config":
        {
            methods:
            {
                "chili.people.list": _.r,
                "pos.plusones.list": _.r,
                "pos.plusones.get": _.r,
                "chili.people.get": _.r,
                "pos.plusones.insert": _.r,
                "chili.activities.list": _.r,
                "pos.plusones.delete": _.r,
                "chili.activities.get": _.r,
                "chili.activities.search": _.r,
                "pos.plusones.getSignupState": _.r
            },
            requestCache:
            {
                enabled: _.r
            },
            versions:
            {
                chili: "v1",
                pos: "v1"
            },
            rpc: "/rpc",
            root: "https://www.googleapis.com",
            "root-1p": "https://clients6.google.com",
            sessionCache:
            {
                enabled: _.r
            },
            transport:
            {
                isProxyShared: _.r
            },
            xd3: "/static/proxy.html",
            developerKey: "AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ",
            auth:
            {
                useInterimAuth: _.u
            }
        },
        drive_saver:
        {
            driveUrl: "https://drive.google.com"
        }
    });

    window.___jsl = window.___jsl ||
    {};
    (window.___jsl.cd = window.___jsl.cd || []).push(
    {
        gwidget:
        {
            parsetags: "onload"
        },
        iframes:
        {
            ":source:": "3p"
        }
    });
    _.N = function (a, c, f)
    {
        return a[c] = a[c] || f
    };
    _.O = function ()
    {
        var a;
        if ((a = window.Object.create) && _.ta.test(a)) a = a(_.s);
        else
        {
            a = {};
            for (var c in a) a[c] = _.p
        }
        return a
    };
    _.Ua = function (a, c, f)
    {
        var g = (0, window.RegExp)("([#].*&|[#])" + c + "=([^&#]*)", "g");
        c = (0, window.RegExp)("([?#].*&|[?#])" + c + "=([^&#]*)", "g");
        if (a = a && (g.exec(a) || c.exec(a))) try
            {
                f = (0, window.decodeURIComponent)(a[2])
        }
        catch (h)
        {}
        return f
    };
    _.ua = function (a, c)
    {
        var f = "";
        2E3 < c.length && (f = c.substring(2E3), c = c.substring(0, 2E3));
        var g = a.createElement("div"),
            h = a.createElement("a");
        h.href = c;
        g.appendChild(h);
        g.innerHTML = g.innerHTML;
        c = (0, window.String)(g.firstChild.href);
        g.parentNode && g.parentNode.removeChild(g);
        return c + f
    };
    _.va = function ()
    {
        return (0, _.N)(_.wa, "WI", (0, _.O)())
    };
    _.Wc = function ()
    {
        return _.wa.ucs
    };
    _.xa = function ()
    {
        return _.wa.ssfn
    };
    _.ya = function (a)
    {
        var c = window.___jsl = window.___jsl ||
        {};
        c[a] = c[a] || [];
        return c[a]
    };
    _.za = function (a)
    {
        var c = window.___jsl = window.___jsl ||
        {};
        c.cfg = !a && c.cfg ||
        {};
        return c.cfg
    };
    _.Aa = function (a)
    {
        return "object" === typeof a && /\[native code\]/.test(a.push)
    };
    _.Ba = function (a, c)
    {
        if (c) for (var f in c) c.hasOwnProperty(f) && (a[f] && c[f] && "object" === typeof a[f] && "object" === typeof c[f] && !(0, _.Aa)(a[f]) && !(0, _.Aa)(c[f]) ? (0, _.Ba)(a[f], c[f]) : c[f] && "object" === typeof c[f] ? (a[f] = (0, _.Aa)(c[f]) ? [] :
                {}, (0, _.Ba)(a[f], c[f])) : a[f] = c[f])
    };
    _.Da = function (a)
    {
        if (a && !/^\s+$/.test(a))
        {
            for (; 0 == a.charCodeAt(a.length - 1);) a = a.substring(0, a.length - 1);
            var c;
            try
            {
                c = window.JSON.parse(a)
            }
            catch (f)
            {}
            if ("object" === typeof c) return c;
            try
            {
                c = (new window.Function("return (" + a + "\n)"))()
            }
            catch (g)
            {}
            if ("object" === typeof c) return c;
            try
            {
                c = (new window.Function("return ({" + a + "\n})"))()
            }
            catch (h)
            {}
            return "object" === typeof c ? c :
            {}
        }
    };
    _.Ea = function (a)
    {
        (0, _.za)(_.r);
        var c = window.___gcfg,
            f = (0, _.ya)("cu");
        if (c && c !== window.___gu)
        {
            var g = {};
            (0, _.Ba)(g, c);
            f.push(g);
            window.___gu = c
        }
        var c = (0, _.ya)("cu"),
            h = window.document.scripts || window.document.getElementsByTagName("script") || [],
            g = [],
            l = [];
        l.push.apply(l, (0, _.ya)("us"));
        for (var n = 0; n < h.length; ++n) for (var q = h[n], t = 0; t < l.length; ++t) q.src && 0 == q.src.indexOf(l[t]) && g.push(q);
        0 == g.length && (0 < h.length && h[h.length - 1].src) && g.push(h[h.length - 1]);
        for (h = 0; h < g.length; ++h) g[h].getAttribute("gapi_processed") ||
                (g[h].setAttribute("gapi_processed", _.r), (l = g[h]) ? (n = l.nodeType, l = 3 == n || 4 == n ? l.nodeValue : l.textContent || l.innerText || l.innerHTML || "") : l = _.p, (l = (0, _.Da)(l)) && c.push(l));
        a && (g = {}, (0, _.Ba)(g, a), f.push(g));
        g = (0, _.ya)("cd");
        a = 0;
        for (c = g.length; a < c; ++a)(0, _.Ba)((0, _.za)(), g[a]);
        g = (0, _.ya)("ci");
        a = 0;
        for (c = g.length; a < c; ++a)(0, _.Ba)((0, _.za)(), g[a]);
        a = 0;
        for (c = f.length; a < c; ++a)(0, _.Ba)((0, _.za)(), f[a])
    };
    _.P = function (a, c)
    {
        if (!a) return (0, _.za)();
        for (var f = a.split("/"), g = (0, _.za)(), h = 0, l = f.length; g && "object" === typeof g && h < l; ++h) g = g[f[h]];
        return h === f.length && g !== _.p ? g : c
    };
    _.Fa = function (a, c)
    {
        var f = a;
        if ("string" === typeof a)
        {
            for (var g = f = {}, h = a.split("/"), l = 0, n = h.length; l < n - 1; ++l) var q = {}, g = g[h[l]] = q;
            g[h[l]] = c
        }(0, _.Ea)(f)
    };
    _.Ga = function ()
    {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), (0, _.N)(_.wa, "ci", []).push(a), window.__GOOGLEAPIS = _.p)
    };
    _.Q = function (a, c)
    {
        c = "function" == typeof _.Ha && (0, _.Ha)(a, c) || c;
        (0, _.C)(a, c, _.p)
    };
    _.Ia = window;
    _.Ja = window.document;
    _.sb = _.Ia.location;
    _.ta = /\[native code\]/;
    _.Yi = (0, _.N)(_.Ia, "gapi",
    {});
    _.wa = (0, _.N)(_.Ia, "___jsl", (0, _.O)());
    (0, _.N)(_.wa, "I", 0);
    (0, _.N)(_.wa, "hel", 10);
    _.Ga && (0, _.Ga)();
    (0, _.Ea)();
    (0, _.Q)("gapi.config.get", _.P);
    (0, _.Q)("gapi.config.update", _.Fa);

    _.Qa = function (a, c)
    {
        return window.Object.prototype.hasOwnProperty.call(a, c)
    };
    _.Ra = function (a, c)
    {
        a = a ||
        {};
        for (var f in a)(0, _.Qa)(a, f) && (c[f] = a[f])
    };
    _.Sa = function (a, c, f, g, h)
    {
        if (a[g + "EventListener"]) a[g + "EventListener"](c, f, _.u);
        else if (a[h + "tachEvent"]) a[h + "tachEvent"]("on" + c, f)
    };
    _.Va = function (a, c, f)
    {
        (0, _.Sa)(a, c, f, "add", "at")
    };

    _.R = _.R ||
    {};
    _.R = _.R ||
    {};
    (function ()
    {
        function a(a, c)
        {
            return window.String.fromCharCode(c)
        }
        var c = {
            0: _.u,
            10: _.r,
            13: _.r,
            34: _.r,
            39: _.r,
            60: _.r,
            62: _.r,
            92: _.r,
            8232: _.r,
            8233: _.r,
            65282: _.r,
            65287: _.r,
            65308: _.r,
            65310: _.r,
            65340: _.r
        };
        _.R.escape = function (a, c)
        {
            if (a)
            {
                if ("string" === typeof a) return _.R.Qf(a);
                if ("array" === typeof a) for (var h = 0, l = a.length; h < l; ++h) a[h] = _.R.escape(a[h]);
                else if ("object" === typeof a && c)
                {
                    h = {};
                    for (l in a) a.hasOwnProperty(l) && (h[_.R.Qf(l)] = _.R.escape(a[l], _.r));
                    return h
                }
            }
            return a
        };
        _.R.Qf = function (a)
        {
            if (!a) return a;
            for (var g = [], h, l, n = 0, q = a.length; n < q; ++n) h = a.charCodeAt(n), l = c[h], l === _.r ? g.push("&#", h, ";") : l !== _.u && g.push(a.charAt(n));
            return g.join("")
        };
        _.R.su = function (c)
        {
            return !c ? c : c.replace(/&#([0-9]+);/g, a)
        }
    })();

    _.R = _.R ||
    {};
    (function ()
    {
        function a(c)
        {
            var f = "";
            if (3 == c.nodeType || 4 == c.nodeType) f = c.nodeValue;
            else if (c.innerText) f = c.innerText;
            else if (c.innerHTML) f = c.innerHTML;
            else if (c.firstChild)
            {
                f = [];
                for (c = c.firstChild; c; c = c.nextSibling) f.push(a(c));
                f = f.join("")
            }
            return f
        }
        _.R.createElement = function (a)
        {
            var f;
            if (!window.document.body || window.document.body.namespaceURI) try
                {
                    f = window.document.createElementNS("http://www.w3.org/1999/xhtml", a)
            }
            catch (g)
            {}
            return f || window.document.createElement(a)
        };
        _.R.Fh = function (a)
        {
            var f = _.R.createElement("iframe");
            try
            {
                var g = ["<", "iframe"],
                    h = a ||
                    {}, l;
                for (l in h) h.hasOwnProperty(l) && (g.push(" "), g.push(l), g.push('="'), g.push(_.R.Qf(h[l])), g.push('"'));
                g.push("></");
                g.push("iframe");
                g.push(">");
                var n = _.R.createElement(g.join(""));
                if (n && (!f || n.tagName == f.tagName && n.namespaceURI == f.namespaceURI)) f = n
            }
            catch (q)
            {}
            g = f;
            a = a ||
            {};
            for (var t in a) a.hasOwnProperty(t) && (g[t] = a[t]);
            return f
        };
        _.R.Jk = function ()
        {
            if (window.document.body) return window.document.body;
            try
            {
                var a = window.document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "body");
                if (a && 1 == a.length) return a[0]
            }
            catch (f)
            {}
            return window.document.documentElement || window.document
        };
        _.R.Qt = function (c)
        {
            return a(c)
        }
    })();

    if (window.JSON && window.JSON.parse && window.JSON.stringify) _.Kb = function ()
        {
            function a(a)
            {
                return this[a]
            }
            var c = /___$/;
            return {
                parse: function (a)
                {
                    try
                    {
                        return window.JSON.parse(a)
                    }
                    catch (c)
                    {
                        return _.u
                    }
                },
                stringify: function (f)
                {
                    function g(c)
                    {
                        return h.call(this, c, a)
                    }
                    var h = window.JSON.stringify,
                        l = window.Array.prototype.toJSON && '"[{\\"x\\": 1}]"' === h([
                            {
                                x: 1
                            }
                        ]) ? g : h;
                    try
                    {
                        return l(f, function (a, f)
                        {
                            return !c.test(a) ? f : _.p
                        })
                    }
                    catch (n)
                    {
                        return _.s
                    }
                }
            }
    }();
    if (!window.JSON || !window.JSON.parse || !window.JSON.stringify) _.Kb = function ()
        {
            function a(a)
            {
                return 10 > a ? "0" + a : a
            }
            function c(a)
            {
                var h, l, n;
                h = /[\"\\\x00-\x1f\x7f-\x9f]/g;
                switch (typeof a)
                {
                case "string":
                    return h.test(a) ? '"' + a.replace(h, function (a)
                    {
                        var c = f[a];
                        if (c) return c;
                        c = a.charCodeAt();
                        return "\\u00" + window.Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                    }) + '"' : '"' + a + '"';
                case "number":
                    return (0, window.isFinite)(a) ? (0, window.String)(a) : "null";
                case "boolean":
                case "null":
                    return (0, window.String)(a);
                case "object":
                    if (!a) return "null";
                    h = [];
                    if ("number" === typeof a.length && !a.propertyIsEnumerable("length"))
                    {
                        n = a.length;
                        for (l = 0; l < n; l += 1) h.push(c(a[l]) || "null");
                        return "[" + h.join(",") + "]"
                    }
                    for (l in a)!/___$/.test(l) && a.hasOwnProperty(l) && "string" === typeof l && (n = c(a[l])) && h.push(c(l) + ":" + n);
                    return "{" + h.join(",") + "}"
                }
                return ""
            }
            window.Date.prototype.toJSON = function ()
            {
                return [this.getUTCFullYear(), "-", a(this.getUTCMonth() + 1), "-", a(this.getUTCDate()), "T", a(this.getUTCHours()), ":", a(this.getUTCMinutes()), ":", a(this.getUTCSeconds()), "Z"].join("")
            };
            var f = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            };
            return {
                stringify: c,
                parse: function (a)
                {
                    return /^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? eval("(" + a + ")") : _.u
                }
            }
    }();
    _.Kb.Ck = function (a)
    {
        var c = {};
        if (a === _.s || a === _.p) return c;
        for (var f in a) if (a.hasOwnProperty(f))
            {
                var g = a[f];
                _.s === g || _.p === g || (c[f] = "string" === typeof g ? g : _.Kb.stringify(g))
            }
        return c
    };
    (0, _.Q)("gadgets.json.flatten", _.Kb.Ck);
    (0, _.Q)("gadgets.json.parse", _.Kb.parse);
    (0, _.Q)("gadgets.json.stringify", _.Kb.stringify);
    (0, _.Q)("gadgets.json.flatten", _.Kb.Ck);
    (0, _.Q)("gadgets.json.parse", _.Kb.parse);
    (0, _.Q)("gadgets.json.stringify", _.Kb.stringify);

    _.Mb = function ()
    {
        function a(a)
        {
            c(1, a)
        }
        function c(a, c)
        {
            if (!(a < f) && g) if (2 === a && g.warn) g.warn(c);
                else if (3 === a && g.error) try
                {
                    g.error(c)
            }
            catch (n)
            {}
            else g.log && g.log(c)
        }
        _.Lb = function (a)
        {
            c(2, a)
        };
        _.sa = function (a)
        {
            c(3, a)
        };
        _.Fc = (0, _.x)();
        a.INFO = 1;
        a.WARNING = 2;
        a.NONE = 4;
        var f = 1,
            g = window.console ? window.console : window.opera ? window.opera.postError : _.p;
        return a
    }();

    _.R = _.R ||
    {};
    (function ()
    {
        var a = [];
        _.R.du = function (c)
        {
            a.push(c)
        };
        _.R.ku = function ()
        {
            for (var c = 0, f = a.length; c < f; ++c) a[c]()
        }
    })();
    _.R = _.R ||
    {};
    (function ()
    {
        var a = _.s;
        _.R.oa = function (c)
        {
            var f = "undefined" === typeof c;
            if (a !== _.s && f) return a;
            var g = {};
            c = c || window.location.href;
            var h = c.indexOf("?"),
                l = c.indexOf("#");
            c = (-1 === l ? c.substr(h + 1) : [c.substr(h + 1, l - h - 1), "&", c.substr(l + 1)].join("")).split("&");
            for (var h = window.decodeURIComponent ? window.decodeURIComponent : window.unescape, l = 0, n = c.length; l < n; ++l)
            {
                var q = c[l].indexOf("=");
                if (-1 !== q)
                {
                    var t = c[l].substring(0, q),
                        q = c[l].substring(q + 1),
                        q = q.replace(/\+/g, " ");
                    try
                    {
                        g[t] = h(q)
                    }
                    catch (v)
                    {}
                }
            }
            f && (a = g);
            return g
        };
        _.R.oa()
    })();
    (0, _.Q)("gadgets.util.getUrlParameters", _.R.oa);
    _.kd = function (a)
    {
        _.Kd && _.Kd.log && _.Kd.log(a)
    };
    _.ke = function () {};
    _.Kd = window.console;
    _.Pb = function ()
    {
        var a = window.gadgets && window.gadgets.config && window.gadgets.config.get;
        a && (0, _.Fa)(a());
        return {
            Q: function (a, f, g)
            {
                g && g((0, _.P)())
            },
            get: function (a)
            {
                return (0, _.P)(a)
            },
            update: function (a, f)
            {
                f && (0, _.m)("Config replacement is not supported");
                (0, _.Fa)(a)
            },
            ba: (0, _.x)()
        }
    }();
    (0, _.Q)("gadgets.config.register", _.Pb.Q);
    (0, _.Q)("gadgets.config.get", _.Pb.get);
    (0, _.Q)("gadgets.config.init", _.Pb.ba);
    (0, _.Q)("gadgets.config.update", _.Pb.update);
    _.Qb = _.Qb ||
    {};
    _.Qb.Km = _.s;
    _.Qb.bm = _.s;
    _.Qb.pg = _.s;
    _.Qb.frameElement = _.s;
    _.Qb = _.Qb ||
    {};
    _.Qb.Lj || (_.Qb.Lj = function ()
    {
        function a(a, c, f)
        {
            "undefined" != typeof window.addEventListener ? window.addEventListener(a, c, f) : "undefined" != typeof window.attachEvent && window.attachEvent("on" + a, c);
            "message" === a && (window.___jsl = window.___jsl ||
            {}, a = window.___jsl, a.RPMQ = a.RPMQ || [], a.RPMQ.push(c))
        }
        function c(a)
        {
            var c = _.Kb.parse(a.data);
            if (c && c.f)
            {
                (0, _.Fc)("gadgets.rpc.receive(" + window.name + "): " + a.data);
                var g = _.T.$d(c.f);
                h && ("undefined" !== typeof a.origin ? a.origin !== g : a.domain !== /^.+:\/\/([^:]+).*/.exec(g)[1]) ? (0, _.sa)("Invalid rpc message origin. " +
                    g + " vs " + (a.origin || "")) : f(c, a.origin)
            }
        }
        var f, g, h = _.r;
        return {
            Kk: (0, _.ca)("wpm"),
            b: (0, _.ca)(_.r),
            ba: function (l, n)
            {
                _.Pb.Q("rpc", _.s, function (a)
                {
                    if ("true" === (0, window.String)((a && a.rpc ||
                    {}).disableForceSecure)) h = _.u
                });
                f = l;
                g = n;
                a("message", c, _.u);
                g("..", _.r);
                return _.r
            },
            sf: function (a)
            {
                g(a, _.r);
                return _.r
            },
            call: function (a, c, f)
            {
                var g = _.T.$d(a),
                    h = _.T.dk(a);
                g ? window.setTimeout(function ()
                {
                    var a = _.Kb.stringify(f);
                    (0, _.Fc)("gadgets.rpc.send(" + window.name + "): " + a);
                    h.postMessage(a, g)
                }, 0) : ".." != a && (0, _.sa)("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message");
                return _.r
            }
        }
    }());
    _.Qb = _.Qb ||
    {};
    _.Qb.Uf || (_.Qb.Uf = function ()
    {
        function a(a, c)
        {
            function f()
            {
                a.apply(
                {}, arguments)
            }
            rw[c] = rw[c] || f;
            return ja + "." + c
        }
        function c()
        {
            if (z === _.s && window.document.body && v)
            {
                var a = v + "?cb=" + window.Math.random() + "&origin=" + Ca + "&jsl=1",
                    f = window.document.createElement("div");
                f.style.height = "1px";
                f.style.width = "1px";
                a = '<object height="1" width="1" id="' + t + '" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="' + a + '"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="' + a +
                    '" height="1" width="1"></embed></object>';
                window.document.body.appendChild(f);
                f.innerHTML = a;
                z = f.firstChild
            }++K;
            E !== _.s && (z !== _.s || 50 <= K) ? window.clearTimeout(E) : E = window.setTimeout(c, 100)
        }
        function f()
        {
            S[".."] || (q(".."), U++, 50 <= U && ka !== _.s ? (window.clearTimeout(ka), ka = _.s) : ka = window.setTimeout(f, 100))
        }
        function g()
        {
            if (z !== _.s && z.setup) for (; 0 < I.length;)
                {
                    var a = I.shift(),
                        c = a.Qs;
                    z.setup(a.ve, ".." === c ? _.T.lh : c, ".." === c ? "INNER" : "OUTER")
            }
            E !== _.s && window.clearTimeout(E);
            E = _.s
        }
        function h()
        {
            !S[".."] && ka === _.s &&
                (ka = window.setTimeout(f, 100))
        }
        function l(a, c, f)
        {
            c = _.T.$d(a);
            var g = _.T.Wd(a);
            z["sendMessage_" + (".." === a ? _.T.lh : a) + "_" + g + "_" + (".." === a ? "INNER" : "OUTER")].call(z, _.Kb.stringify(f), c);
            return _.r
        }
        function n(a, c)
        {
            var f = _.Kb.parse(a),
                g = f._scr;
            g ? (F(g, _.r), S[g] = _.r, ".." !== g && q(g, _.r)) : window.setTimeout(function ()
            {
                A(f, c)
            }, 0)
        }
        function q(a, c)
        {
            var f = _.T.lh,
                g = {};
            g._scr = c ? ".." : f;
            g._pnt = f;
            l(a, f, g)
        }
        var t = "___xpcswf",
            v = _.s,
            w = _.u,
            A = _.s,
            F = _.s,
            z = _.s,
            I = [],
            E = _.s,
            K = 0,
            U = 0,
            ka = _.s,
            S = {}, Ca = window.location.protocol + "//" + window.location.host,
            ja, rw = function ()
            {
                window.___jsl = window.___jsl ||
                {};
                var a = window.___jsl._fm = {};
                ja = "___jsl._fm";
                return a
            }();
        _.Pb.Q("rpc", _.s, function (a)
        {
            w && (v = a && a.rpc && a.rpc.commSwf || "//xpc.googleusercontent.com/gadgets/xpc.swf")
        });
        a(g, "ready");
        a(h, "setupDone");
        a(n, "receiveMessage");
        return {
            Kk: (0, _.ca)("flash"),
            b: (0, _.ca)(_.r),
            ba: function (a, c)
            {
                A = a;
                F = c;
                return w = _.r
            },
            sf: function (a, f)
            {
                I.push(
                {
                    ve: f,
                    Qs: a
                });
                z === _.s && E === _.s && (E = window.setTimeout(c, 100));
                return _.r
            },
            call: l,
            Vo: n,
            d: g,
            i: h
        }
    }());
    if (!window.gadgets || !window.gadgets.rpc)
    {
        _.T = function ()
        {
            function a()
            {}
            function c(a, c)
            {
                if (!Ya[a])
                {
                    var f = fc;
                    c || (f = te);
                    Ya[a] = f;
                    for (var g = If[a] || [], h = 0; h < g.length; ++h)
                    {
                        var l = g[h];
                        l.t = S[a];
                        f.call(a, l.f, l)
                    }
                    If[a] = []
                }
            }
            function f()
            {
                function a()
                {
                    Go = _.r
                }
                Ho || ("undefined" != typeof window.addEventListener ? window.addEventListener("unload", a, _.u) : "undefined" != typeof window.attachEvent && window.attachEvent("onunload", a), Ho = _.r)
            }
            function g(c, g, h, l, n)
            {
                if (!S[g] || S[g] !== h)(0, _.sa)("Invalid gadgets.rpc token. " + S[g] + " vs " +
                        h), a(g, 2);
                n.onunload = function ()
                {
                    rw[g] && !Go && (a(g, 1), _.T.mj(g))
                };
                f();
                l = _.Kb.parse((0, window.decodeURIComponent)(l))
            }
            function h(f, g)
            {
                if (f && "string" === typeof f.s && "string" === typeof f.f && f.a instanceof window.Array) if (S[f.f] && S[f.f] !== f.t && ((0, _.sa)("Invalid gadgets.rpc token. " + S[f.f] + " vs " + f.t), a(f.f, 2)), "__ack" === f.s) window.setTimeout(function ()
                        {
                            c(f.f, _.r)
                        }, 0);
                    else
                    {
                        f.c && (f.callback = function (a)
                        {
                            _.T.call(f.f, (f.g ? "legacy__" : "") + "__cb", _.s, f.c, a)
                        });
                        if (g)
                        {
                            var h = l(g);
                            f.origin = g;
                            var n = f.r;
                            if (!n || l(n) !=
                                h) n = g;
                            f.referer = n
                        }
                        h = (K[f.s] || K[""]).apply(f, f.a);
                        f.c && "undefined" !== typeof h && _.T.call(f.f, "__cb", _.s, f.c, h)
                    }
            }
            function l(a)
            {
                if (!a) return "";
                a = a.split("#")[0].split("?")[0];
                a = a.toLowerCase();
                0 == a.indexOf("//") && (a = window.location.protocol + a); - 1 == a.indexOf("://") && (a = window.location.protocol + "//" + a);
                var c = a.substring(a.indexOf("://") + 3),
                    f = c.indexOf("/"); - 1 != f && (c = c.substring(0, f));
                a = a.substring(0, a.indexOf("://"));
                var f = "",
                    g = c.indexOf(":");
                if (-1 != g)
                {
                    var h = c.substring(g + 1),
                        c = c.substring(0, g);
                    if ("http" ===
                        a && "80" !== h || "https" === a && "443" !== h) f = ":" + h
                }
                return a + "://" + c + f
            }
            function n(a)
            {
                if ("/" == a.charAt(0))
                {
                    var c = a.indexOf("|");
                    return {
                        id: 0 < c ? a.substring(1, c) : a.substring(1),
                        origin: 0 < c ? a.substring(c + 1) : _.s
                    }
                }
                return _.s
            }
            function q(a)
            {
                if ("undefined" === typeof a || ".." === a) return window.parent;
                var c = n(a);
                if (c) return window.top.frames[c.id];
                a = (0, window.String)(a);
                return (c = window.frames[a]) ? c : (c = window.document.getElementById(a)) && c.contentWindow ? c.contentWindow : _.s
            }
            function t(a, c)
            {
                if (rw[a] !== _.r)
                {
                    "undefined" === typeof rw[a] &&
                        (rw[a] = 0);
                    var f = q(a);
                    (".." === a || f != _.s) && fc.sf(a, c) === _.r ? rw[a] = _.r : rw[a] !== _.r && 10 > rw[a]++ ? window.setTimeout(function ()
                    {
                        t(a, c)
                    }, 500) : (Ya[a] = te, rw[a] = _.r)
                }
            }
            function v(a)
            {
                (a = U[a]) && "/" === a.substring(0, 1) && (a = "/" === a.substring(1, 2) ? window.document.location.protocol + a : window.document.location.protocol + "//" + window.document.location.host + a);
                return a
            }
            function w(a, c, f)
            {
                c && !/http(s)?:\/\/.+/.test(c) && (0 == c.indexOf("//") ? c = window.location.protocol + c : "/" == c.charAt(0) ? c = window.location.protocol + "//" + window.location.host +
                    c : -1 == c.indexOf("://") && (c = window.location.protocol + "//" + c));
                U[a] = c;
                "undefined" !== typeof f && (ka[a] = !! f)
            }
            function A(a, c)
            {
                c = c || "";
                S[a] = (0, window.String)(c);
                t(a, c)
            }
            function F(a)
            {
                a = (a.passReferrer || "").split(":", 2);
                wh = a[0] || "none";
                nk = a[1] || "origin"
            }
            function z(a)
            {
                "true" === (0, window.String)(a.useLegacyProtocol) && (fc = _.Qb.pg || te, fc.ba(h, c))
            }
            function I(a, c)
            {
                function f(g)
                {
                    g = g && g.rpc ||
                    {};
                    F(g);
                    var h = g.parentRelayUrl || "",
                        h = l(Ta.parent || c) + h;
                    w("..", h, "true" === (0, window.String)(g.useLegacyProtocol));
                    z(g);
                    A("..",
                        a)
                }!Ta.parent && c ? f(
                {}) : _.Pb.Q("rpc", _.s, f)
            }
            function E(a, c, f)
            {
                if (".." === a) I(f || Ta.rpctoken || Ta.ifpctok || "", c);
                else a:
                    {
                        var g = _.s;
                        if ("/" != a.charAt(0))
                        {
                            if (!_.R) break a;
                            (g = window.document.getElementById(a)) || (0, _.m)((0, window.Error)("h`" + a))
                        }
                        g = g && g.src;
                        c = c || _.T.Pq(g);
                        w(a, c);
                        c = _.R.oa(g);
                        A(a, f || c.rpctoken)
                }
            }
            var K = {}, U = {}, ka = {}, S = {}, Ca = 0,
                ja = {}, rw = {}, Ta = {}, Ya = {}, If = {}, wh = _.s,
                nk = _.s,
                Yw = window.top !== window.self,
                ok = window.name,
                pk = window.console,
                Io = pk && pk.log && function (a)
                {
                    pk.log(a)
                } || (0, _.x)(),
                te = function ()
                {
                    function a(c)
                    {
                        return function ()
                        {
                            Io(c +
                                ": call ignored")
                        }
                    }
                    return {
                        getCode: (0, _.ca)("noop"),
                        isParentVerifiable: (0, _.ca)(_.r),
                        init: a("init"),
                        setup: a("setup"),
                        call: a("call")
                    }
                }();
            _.R && (Ta = _.R.oa());
            var Go = _.u,
                Ho = _.u,
                fc = function ()
                {
                    if ("flash" == Ta.rpctx) return _.Qb.Uf;
                    if ("rmr" == Ta.rpctx) return _.Qb.Km;
                    var a = "function" === typeof window.postMessage ? _.Qb.Lj : "object" === typeof window.postMessage ? _.Qb.Lj : window.ActiveXObject ? _.Qb.Uf ? _.Qb.Uf : _.Qb.bm ? _.Qb.bm : _.Qb.pg : 0 < window.navigator.userAgent.indexOf("WebKit") ? _.Qb.Km : "Gecko" === window.navigator.product ?
                        _.Qb.frameElement : _.Qb.pg;
                    a || (a = te);
                    return a
                }();
            K[""] = function ()
            {
                Io("Unknown RPC service: " + this.s)
            };
            K.__cb = function (a, c)
            {
                var f = ja[a];
                f && (delete ja[a], f.call(this, c))
            };
            return {
                Ca: function (c)
                {
                    "function" === typeof c.Mm && (a = c.Mm)
                },
                Q: function (a, c)
                {
                    ("__cb" === a || "__ack" === a) && (0, _.m)((0, window.Error)("i"));
                    "" === a && (0, _.m)((0, window.Error)("j"));
                    K[a] = c
                },
                Jd: function (a)
                {
                    ("__cb" === a || "__ack" === a) && (0, _.m)((0, window.Error)("k"));
                    "" === a && (0, _.m)((0, window.Error)("l"));
                    delete K[a]
                },
                Am: function (a)
                {
                    K[""] = a
                },
                aB: function ()
                {
                    delete K[""]
                },
                Fk: (0, _.x)(),
                call: function (a, c, f, g)
                {
                    a = a || "..";
                    var h = "..";
                    ".." === a ? h = ok : "/" == a.charAt(0) && (h = _.T.Pq(window.location.href), h = "/" + ok + (h ? "|" + h : ""));
                    ++Ca;
                    f && (ja[Ca] = f);
                    var l = {
                        s: c,
                        f: h,
                        c: f ? Ca : 0,
                        a: window.Array.prototype.slice.call(arguments, 3),
                        t: S[a],
                        l: !! ka[a]
                    }, q;
                    a: if ("bidir" === wh || "c2p" === wh && ".." === a || "p2c" === wh && ".." !== a)
                    {
                        q = window.location.href;
                        var t = "?";
                        if ("query" === nk) t = "#";
                        else if ("hash" === nk) break a;
                        t = q.lastIndexOf(t);
                        t = -1 === t ? q.length : t;
                        q = q.substring(0, t)
                    }
                    else q = _.s;
                    q && (l.r = q);
                    ".." !== a && n(a) == _.s && !window.document.getElementById(a) || (q = Ya[a], !q && n(a) !== _.s && (q = fc), 0 === c.indexOf("legacy__") && (q = fc, l.s = c.substring(8), l.c = l.c ? l.c : Ca), l.g = _.r, l.r = h, q ? (ka[a] && (q = _.Qb.pg), q.call(a, h, l) === _.u && (Ya[a] = te, fc.call(a, h, l))) : If[a] ? If[a].push(l) : If[a] = [l])
                },
                Rk: v,
                Xg: w,
                Wg: A,
                tf: E,
                Wd: function (a)
                {
                    return S[a]
                },
                mj: function (a)
                {
                    delete U[a];
                    delete ka[a];
                    delete S[a];
                    delete rw[a];
                    delete Ya[a]
                },
                Qk: function ()
                {
                    return fc.Kk()
                },
                ym: function (a, c)
                {
                    4 < a.length ? fc.Vo(a, h) : g.apply(_.s, a.concat(c))
                },
                zm: function (a)
                {
                    a.a = window.Array.prototype.slice.call(a.a);
                    window.setTimeout(function ()
                    {
                        h(a)
                    }, 0)
                },
                Pq: l,
                $d: function (a)
                {
                    var c = _.s,
                        c = v(a);
                    c || (c = (c = n(a)) ? c.origin : ".." == a ? Ta.parent : window.document.getElementById(a).src);
                    return l(c)
                },
                ba: function ()
                {
                    fc.ba(h, c) === _.u && (fc = te);
                    Yw ? E("..") : _.Pb.Q("rpc", _.s, function (a)
                    {
                        a = a.rpc ||
                        {};
                        F(a);
                        z(a)
                    })
                },
                dk: q,
                Uo: n,
                b: "__ack",
                lh: ok || "..",
                j: 0,
                i: 1,
                d: 2
            }
        }();
        _.T.ba()
    }
    else if ("undefined" == typeof _.T || !_.T) _.T = window.gadgets.rpc, _.T.Ca = _.T.config, _.T.Q = _.T.register, _.T.Jd = _.T.unregister, _.T.Am = _.T.registerDefault, _.T.aB = _.T.unregisterDefault,
    _.T.Fk = _.T.forceParentVerifiable, _.T.call = _.T.call, _.T.Rk = _.T.getRelayUrl, _.T.Xg = _.T.setRelayUrl, _.T.Wg = _.T.setAuthToken, _.T.tf = _.T.setupReceiver, _.T.Wd = _.T.getAuthToken, _.T.mj = _.T.removeReceiver, _.T.Qk = _.T.getRelayChannel, _.T.ym = _.T.receive, _.T.zm = _.T.receiveSameDomain, _.T.Pq = _.T.getOrigin, _.T.$d = _.T.getTargetOrigin, _.T.dk = _.T._getTargetWin, _.T.Uo = _.T._parseSiblingId;
    _.T.Ca(
    {
        Mm: function (a)
        {
            (0, _.m)((0, window.Error)("m`" + a))
        }
    });
    _.Fc = _.ke;
    (0, _.Q)("gadgets.rpc.config", _.T.Ca);
    (0, _.Q)("gadgets.rpc.register", _.T.Q);
    (0, _.Q)("gadgets.rpc.unregister", _.T.Jd);
    (0, _.Q)("gadgets.rpc.registerDefault", _.T.Am);
    (0, _.Q)("gadgets.rpc.unregisterDefault", _.T.aB);
    (0, _.Q)("gadgets.rpc.forceParentVerifiable", _.T.Fk);
    (0, _.Q)("gadgets.rpc.call", _.T.call);
    (0, _.Q)("gadgets.rpc.getRelayUrl", _.T.Rk);
    (0, _.Q)("gadgets.rpc.setRelayUrl", _.T.Xg);
    (0, _.Q)("gadgets.rpc.setAuthToken", _.T.Wg);
    (0, _.Q)("gadgets.rpc.setupReceiver", _.T.tf);
    (0, _.Q)("gadgets.rpc.getAuthToken", _.T.Wd);
    (0, _.Q)("gadgets.rpc.removeReceiver", _.T.mj);
    (0, _.Q)("gadgets.rpc.getRelayChannel", _.T.Qk);
    (0, _.Q)("gadgets.rpc.receive", _.T.ym);
    (0, _.Q)("gadgets.rpc.receiveSameDomain", _.T.zm);
    (0, _.Q)("gadgets.rpc.getOrigin", _.T.Pq);
    (0, _.Q)("gadgets.rpc.getTargetOrigin", _.T.$d);


    _.Rb = window.gapi && window.gapi.util ||
    {};
    _.Rb = _.Rb ||
    {};
    _.Rb.xh = function ()
    {
        var a = {
            Nj: "bsh",
            Uj: "h"
        };
        window.___jsl = window.___jsl ||
        {};
        return {
            b: function ()
            {
                return window.___jsl[a.Nj]
            },
            Ok: function ()
            {
                return window.___jsl[a.Uj]
            },
            pj: function (c)
            {
                window.___jsl[a.Nj] = c
            },
            ys: function (c)
            {
                window.___jsl[a.Uj] = c
            }
        }
    }();

    _.Wb = function (a)
    {
        var c = (0, _.P)("googleapis.config/sessionIndex");
        c == _.s && (c = window.__X_GOOG_AUTHUSER);
        if (c == _.s)
        {
            var f = window.google;
            f && (c = f.authuser)
        }
        c == _.s && (a == _.s && (a = window.location.href), c = a ? (0, _.Ua)(a, "authuser") || _.s : _.s);
        return c == _.s ? _.s : (0, window.String)(c)
    };
    _.Xb = function (a, c, f)
    {
        a = (0, window.String)(a);
        if (((0, _.Ua)(a, "authuser") || _.s) != _.s || ((0, _.Ua)(a, "hd") || _.s) != _.s) return a;
        c = (0, _.Wb)(c);
        if (f)
        {
            var g = a,
                h = g.match(/^((https?:)?\/\/[^\/?#]*)?(\/[^\/?#]+)\/[0-9]+([\/][^?#]*)([?#].*)?$/);
            if (h && h[0])
            {
                var l = h[1],
                    n = h[4],
                    q = h[5];
                h[3] == "/" + f && (g = (l || "") + (n || "/") + (q || ""))
            }
            if ((h = g.match(/^(((https?:)?\/\/[^\/?#]*)([\/][^?#]*)?|([\/][^?#]*))([?#].*)?$/)) && h[0]) return l = h[2], a = h[4] || h[5], q = h[6], c != _.s && (g = (l || "") + "/" + f + "/" + (0, window.encodeURIComponent)(c) + (a || "/") +
                    (q || "")), g
        }
        f = c == _.s ? (0, window.encodeURIComponent)("authuser") + "=0" : c.match(/^([-a-z0-9]+[.])+[-a-z0-9]+$/) ? [(0, window.encodeURIComponent)("authuser") + "=", (0, window.encodeURIComponent)((0, window.String)(c)), "&" + (0, window.encodeURIComponent)("hd") + "=", (0, window.encodeURIComponent)(c)].join("") : ["authuser=", (0, window.encodeURIComponent)(c)].join("");
        a = a.split("#");
        c = a[0].indexOf("?");
        0 > c ? a[0] = [a[0], "?", f].join("") : (g = [a[0]], c < a[0].length - 1 && g.push("&"), g.push(f), a[0] = g.join(""));
        return g = a.join("#")
    };

    _.Yb = _.Xb;
    _.Vj = function (a, c)
    {
        this.b = a;
        var f = c ||
        {};
        this.j = f.Fr;
        this.d = f.domain;
        this.i = f.path;
        this.k = f.wD
    };
    _.dk = function (a)
    {
        this.b = a
    };
    _.fk = function (a)
    {
        this.b = a;
        this.d = window.sessionStorage
    };
    _.LC = /^[-+/_=.:|%&a-zA-Z0-9@]*$/;
    _.MC = /^[A-Z_][A-Z0-9_]{0,63}$/;
    _.Vj.prototype.Hd = function ()
    {
        for (var a = this.b + "=", c = window.document.cookie.split(/;\s*/), f = 0; f < c.length; ++f)
        {
            var g = c[f];
            if (0 == g.indexOf(a)) return g.substr(a.length)
        }
    };
    _.Vj.prototype.write = function (a, c)
    {
        _.MC.test(this.b) || (0, _.m)("Invalid cookie name");
        _.LC.test(a) || (0, _.m)("Invalid cookie value");
        var f = this.b + "=" + a;
        this.d && (f += ";domain=" + this.d);
        this.i && (f += ";path=" + this.i);
        var g = "number" === typeof c ? c : this.j;
        if (0 <= g)
        {
            var h = new window.Date;
            h.setSeconds(h.getSeconds() + g);
            f += ";expires=" + h.toUTCString()
        }
        this.k && (f += ";secure");
        window.document.cookie = f
    };
    _.Vj.prototype.clear = function ()
    {
        this.write("", 0)
    };
    _.Vj.iterate = function (a)
    {
        for (var c = window.document.cookie.split(/;\s*/), f = 0; f < c.length; ++f) a(c[f].split("=")[0])
    };
    _.Ok = {};
    _.dk.prototype.Hd = function ()
    {
        if (_.Ok.hasOwnProperty(this.b)) return _.Ok[this.b]
    };
    _.dk.prototype.write = function (a)
    {
        _.Ok[this.b] = a
    };
    _.dk.prototype.clear = function ()
    {
        delete _.Ok[this.b]
    };
    _.dk.iterate = function (a)
    {
        for (var c in _.Ok) _.Ok.hasOwnProperty(c) && a(c)
    };
    _.fk.prototype.Hd = function ()
    {
        return this.d.getItem(this.b)
    };
    _.fk.prototype.write = function (a)
    {
        this.d.setItem(this.b, a)
    };
    _.fk.prototype.clear = function ()
    {
        this.d.removeItem(this.b)
    };
    _.fk.iterate = function (a)
    {
        for (var c = 0, f = window.sessionStorage.length; c < f; ++c)
        {
            var g = window.sessionStorage.key(c);
            a(g)
        }
    };

    _.Pj = window.oauth2 ||
    {};
    _.Qj = window.auth_firstparty ||
    {};
    for (_.mC = 0; 64 > _.mC; ++_.mC);
    _.Fn = function ()
    {
        return window.Math.floor((new window.Date).getTime() / 1E3)
    };
    _.Pn = function (a)
    {
        this.Ch = a;
        this.vg = _.s
    };
    _.st = function (a)
    {
        if (!a) return _.s;
        "single_host_origin" !== a && (a = _.T.Pq(a));
        var c = window.location.hostname,
            f = c,
            g = _.Gt;
        if ("single_host_origin" !== a)
        {
            f = a.split("://");
            if (2 == f.length) g = "https" === f.shift();
            else return (0, _.kd)("WARNING invalid cookie_policy: " + a), _.s;
            f = f[0]
        }
        if (-1 !== f.indexOf(":")) f = c = "";
        else
        {
            if (f !== c)
            {
                a = "." + f;
                if (c.lastIndexOf(a) !== c.length - a.length) return (0, _.kd)("Invalid cookie_policy domain: " + f), _.s;
                f = a
            }
            c = f.split(".").length - 1
        }
        return {
            domain: f,
            Gb: g,
            Ke: c
        }
    };
    _.OC = function (a)
    {
        if (!a) return _.s;
        var c = a.client_id;
        if (!c) return _.s;
        for (var c = c.toUpperCase(), f = 0, g = _.Iv.length; f < g; ++f)
        {
            var h = c.split(_.Iv[f]);
            2 == h.length && "" === h[1] && (c = h[0])
        }
        c = c.replace(/-/g, "_").toUpperCase();
        40 < c.length && (f = (0, _.Tb)(), f.update(c), c = f.Of().toUpperCase());
        a = (0, _.st)(a.cookie_policy);
        return !a ? _.s : !_.Gt && a.Gb ? ((0, _.kd)("WARNING: https cookie_policy set for http domain"), _.s) : ["GCSC", a.Gb ? "E" : "U", "_", c, "_", a.Gb ? "S" : "H", a.Ke].join("")
    };
    _.Fu = function (a)
    {
        if (0 !== a.indexOf("GCSC")) return _.s;
        var c = {
            uf: _.u
        };
        a = a.substr(4);
        if (!a) return c;
        var f = a.charAt(0);
        a = a.substr(1);
        var g = a.lastIndexOf("_");
        if (-1 == g) return c;
        var h = a.substr(g + 1);
        a = a.substring(0, g);
        if ("_" !== a.charAt(0)) return c;
        a = a.substr(1);
        var l = h.substr(1),
            g = "",
            n = window.location.hostname;
        if ("" !== l)
        {
            g = (0, window.parseInt)(l, 10);
            if ((0, window.isNaN)(g)) return c;
            l = n.split(".");
            if (l.length < g - 1) return c;
            l.length == g - 1 && (n = "." + n)
        }
        else n = "";
        h = h.charAt(0);
        l = "E" === f && "S" === h;
        return !l && ("U" !==
            f || "H" !== h) || l && !_.Gt ? c :
        {
            uf: _.r,
            Gb: l,
            ep: a,
            domain: n,
            Ke: g
        }
    };
    _.vv = function (a)
    {
        return !a ? _.s :
        {
            domain: a.domain,
            path: "/",
            wD: a.Gb
        }
    };
    _.Cv = function (a)
    {
        var c = _.Dv[a];
        c || (c = new _.Pn(new _.dk(a)), _.Dv[a] = c);
        return {
            Kc: c,
            key: a
        }
    };
    _.Ev = function (a, c)
    {
        var f = c ? _.Fv : _.Dv,
            g = c ? _.Gv : _.Hv,
            h = a && (0, _.OC)(a),
            l = !! h;
        a && !a.g_user_cookie_policy && (g = _.dk, h = "token");
        if (!h) if (!c && _.Jv) h = _.Jv;
            else return _.s;
        var n = f[h];
        if (!n)
        {
            n = (0, _.Fu)(h);
            if ("token" !== h && (!n || !n.uf)) return _.s;
            n = new g(h, (0, _.vv)(n));
            c || (n = new _.Pn(n))
        }
        f[h] = n;
        return {
            Kc: n,
            key: h,
            Fj: l
        }
    };
    _.Wj = function (a, c)
    {
        var f = a && "token" !== a ? (0, _.Cv)(a) : (0, _.Ev)();
        if (!f) return _.s;
        var g = f.Kc.Hd();
        g && (g.expires_at && (0, _.Fn)() > g.expires_at) && (f.Kc.clear(), g = _.s);
        g && (g.error && !c) && (g = _.s);
        return g
    };
    _.Zj = function (a, c)
    {
        var f = "";
        if (!a) return f;
        var g = c || "&",
            h;
        for (h in a) if (
            {}.hasOwnProperty.call(a, h))
            {
                var l;
                l = a[h];
                if (l != _.s)
                {
                    var n = [(0, window.encodeURIComponent)(h), "="];
                    if (l instanceof window.Array)
                    {
                        for (var q = [], t = 0; t < l.length; t++) q.push((0, window.encodeURIComponent)(l[t]));
                        n.push(q.join("+"))
                    }
                    else n.push((0, window.encodeURIComponent)(l));
                    l = n.join("")
                }
                else l = "";
                l && (f && (f += g), f += l)
            }
        return f
    };
    _.Kv = (0, _.P)("oauth-flow/persist") == _.r;
    _.Hv = _.Kv ? _.fk : _.dk;
    _.Gt = "https:" === window.location.protocol;
    _.Lv = _.Gt || "http:" === window.location.protocol ? _.Vj : _.dk;
    _.Gv = _.Kv ? _.Lv : _.dk;
    _.Dv = (0, _.O)();
    _.Fv = (0, _.O)();
    _.Mv = (0, _.O)();
    _.Jv = _.s;
    _.lw = "state code cookie_policy g_user_cookie_policy authuser prompt g-oauth-window".split(" ");
    _.Iv = [".APPS.GOOGLEUSERCONTENT.COM", "@DEVELOPER.GSERVICEACCOUNT.COM"];
    _.Pn.prototype.write = function (a)
    {
        var c = (0, _.O)(),
            f = (0, _.O)(),
            g;
        for (g in a) window.Object.prototype.hasOwnProperty.call(a, g) && (f[g] = a[g], c[g] = a[g]);
        g = 0;
        for (var h = _.lw.length; g < h; ++g) delete f[_.lw[g]];
        a = (0, window.String)(a.authuser || 0);
        g = (0, _.O)();
        g[a] = _.R.oa("#" + (0, _.Zj)(f));
        this.Ch.write(_.Kb.stringify(g));
        this.vg = c
    };
    _.Pn.prototype.Hd = (0, _.y)("vg");
    _.Pn.prototype.clear = function ()
    {
        this.Ch.clear();
        this.vg = (0, _.O)()
    };
    _.Hv.iterate(function (a)
    {
        var c = (0, _.Fu)(a);
        c && c.uf && (_.Dv[a] = new _.Pn(new _.Hv(a, (0, _.vv)(c))))
    });
    _.Gv.iterate(function (a)
    {
        _.Dv[a] && (_.Fv[a] = new _.Gv(a, (0, _.vv)((0, _.Fu)(a))))
    });

    _.Rb.Pq = function (a)
    {
        if (!a) return "";
        a = a.split("#")[0].split("?")[0];
        a = a.toLowerCase();
        0 == a.indexOf("//") && (a = window.location.protocol + a);
        /^\w*:\/\//.test(a) || (a = window.location.href);
        var c = a.substring(a.indexOf("://") + 3),
            f = c.indexOf("/"); - 1 != f && (c = c.substring(0, f));
        a = a.substring(0, a.indexOf("://"));
        var f = "",
            g = c.indexOf(":");
        if (-1 != g)
        {
            var h = c.substring(g + 1),
                c = c.substring(0, g);
            if ("http" === a && "80" !== h || "https" === a && "443" !== h) f = ":" + h
        }
        return a + "://" + c + f
    };

    _.Xj = window.googleapis && window.googleapis.server ||
    {};
    _.Yj = function ()
    {
        var a = /\s*;\s*/;
        return {
            get: function (c, f)
            {
                for (var g = c + "=", h = (window.document.cookie || "").split(a), l = 0, n; n = h[l]; ++l) if (0 == n.indexOf(g)) return n.substr(g.length);
                return f
            }
        }
    }();
    _.Tb = function ()
    {
        function a()
        {
            h[0] = 1732584193;
            h[1] = 4023233417;
            h[2] = 2562383102;
            h[3] = 271733878;
            h[4] = 3285377520;
            w = v = 0
        }
        function c(a)
        {
            for (var c = n, f = 0; 64 > f; f += 4) c[f / 4] = a[f] << 24 | a[f + 1] << 16 | a[f + 2] << 8 | a[f + 3];
            for (f = 16; 80 > f; f++) c[f] = ((c[f - 3] ^ c[f - 8] ^ c[f - 14] ^ c[f - 16]) << 1 | (c[f - 3] ^ c[f - 8] ^ c[f - 14] ^ c[f - 16]) >>> 31) & 4294967295;
            a = h[0];
            for (var g = h[1], l = h[2], q = h[3], t = h[4], v, w, f = 0; 80 > f; f++) 40 > f ? 20 > f ? (v = q ^ g & (l ^ q), w = 1518500249) : (v = g ^ l ^ q, w = 1859775393) : 60 > f ? (v = g & l | q & (g | l), w = 2400959708) : (v = g ^ l ^ q, w = 3395469782), v = ((a << 5 | a >>> 27) & 4294967295) +
                    v + t + w + c[f] & 4294967295, t = q, q = l, l = (g << 30 | g >>> 2) & 4294967295, g = a, a = v;
            h[0] = h[0] + a & 4294967295;
            h[1] = h[1] + g & 4294967295;
            h[2] = h[2] + l & 4294967295;
            h[3] = h[3] + q & 4294967295;
            h[4] = h[4] + t & 4294967295
        }
        function f(a, f)
        {
            if ("string" === typeof a)
            {
                a = (0, window.unescape)((0, window.encodeURIComponent)(a));
                for (var g = [], h = 0, n = a.length; h < n; ++h) g.push(a.charCodeAt(h));
                a = g
            }
            f || (f = a.length);
            g = 0;
            if (0 == v) for (; g + 64 < f;) c(a.slice(g, g + 64)), g += 64, w += 64;
            for (; g < f;) if (l[v++] = a[g++], w++, 64 == v)
                {
                    v = 0;
                    for (c(l); g + 64 < f;) c(a.slice(g, g + 64)), g += 64, w += 64
                }
        }

        function g()
        {
            var a = [],
                g = 8 * w;
            56 > v ? f(q, 56 - v) : f(q, 64 - (v - 56));
            for (var n = 63; 56 <= n; n--) l[n] = g & 255, g >>>= 8;
            c(l);
            for (n = g = 0; 5 > n; n++) for (var t = 24; 0 <= t; t -= 8) a[g++] = h[n] >> t & 255;
            return a
        }
        for (var h = [], l = [], n = [], q = [128], t = 1; 64 > t; ++t) q[t] = 0;
        var v, w;
        a();
        return {
            reset: a,
            update: f,
            xk: g,
            Of: function ()
            {
                for (var a = g(), c = "", f = 0; f < a.length; f++) c += "0123456789ABCDEF".charAt(window.Math.floor(a[f] / 16)) + "0123456789ABCDEF".charAt(a[f] % 16);
                return c
            }
        }
    };

    _.Qj = function ()
    {
        function a()
        {
            var a = window.__OVERRIDE_SID;
            a == _.s && (a = _.Yj.get("SID"));
            return !!a
        }
        return {
            Nq: function (a)
            {
                var f = {
                    SAPISIDHASH: _.r,
                    APISIDHASH: _.r
                };
                return a && (a.OriginToken || a.Authorization && f[(0, window.String)(a.Authorization).split(" ")[0]]) ? _.r : _.u
            },
            er: a,
            bq: function ()
            {
                var c = _.s;
                a() && (c = window.__PVT, c == _.s && (c = _.Yj.get("BEAT")));
                return c
            },
            Qe: function ()
            {
                var c = _.Rb.Pq((0, window.String)(window.location.href));
                if (a())
                {
                    var f = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:"),
                        g = f ? "SAPISID" : "APISID",
                        h = f ? window.__SAPISID : window.__APISID;
                    h == _.s && (h = _.Yj.get(g));
                    if (h) return f = f ? "SAPISIDHASH" : "APISIDHASH", g = (0, _.Tb)(), g.reset(), g.update([h, c].join(" ")), f + " " + g.Of().toLowerCase()
                }
                return _.s
            }
        }
    }();

    _.R = _.R ||
    {};
    _.R.Ee = function (a, c, f, g)
    {
        "undefined" != typeof a.addEventListener ? a.addEventListener(c, f, g) : "undefined" != typeof a.attachEvent ? a.attachEvent("on" + c, f) : (0, _.Lb)("cannot attachBrowserEvent: " + c)
    };
    _.R.Vr = function (a, c, f, g)
    {
        a.removeEventListener ? a.removeEventListener(c, f, g) : a.detachEvent ? a.detachEvent("on" + c, f) : (0, _.Lb)("cannot removeBrowserEvent: " + c)
    };

    _.Ub = function (a)
    {
        if ("complete" === _.Ja.readyState) a();
        else
        {
            var c = _.u,
                f = function ()
                {
                    if (!c) return c = _.r, a.apply(this, arguments)
                };
            _.Ia.addEventListener ? (_.Ia.addEventListener("load", f, _.u), _.Ia.addEventListener("DOMContentLoaded", f, _.u)) : _.Ia.attachEvent && (_.Ia.attachEvent("onreadystatechange", function ()
            {
                "complete" === _.Ja.readyState && f.apply(this, arguments)
            }), _.Ia.attachEvent("onload", f))
        }
    };
    _.Vb = function ()
    {
        function a(c)
        {
            c = c || window.event;
            var f = c.screenX + c.clientX << 16,
                f = f + (c.screenY + c.clientY),
                f = f * ((new window.Date).getTime() % 1E6);
            n = n * f % q;
            0 < g && ++h == g && _.R.Vr(window, "mousemove", a, _.u)
        }
        function c(a)
        {
            var c = (0, _.Tb)();
            c.update(a);
            return c.Of()
        }
        var f = window.crypto;
        if (f && "function" == typeof f.getRandomValues) return function ()
            {
                var a = new window.Uint32Array(1);
                f.getRandomValues(a);
                return (0, window.Number)("0." + a[0])
        };
        var g = (0, _.P)("random/maxObserveMousemove");
        g == _.s && (g = -1);
        var h = 0,
            l = window.Math.random(),
            n = 1,
            q = 1E6 * (window.screen.width * window.screen.width + window.screen.height);
        0 != g && _.R.Ee(window, "mousemove", a, _.u);
        var t = c(window.document.cookie + "|" + window.document.location + "|" + (new window.Date).getTime() + "|" + l);
        return function ()
        {
            var a = n,
                a = a + (0, window.parseInt)(t.substr(0, 20), 16);
            t = c(t);
            return a / (q + window.Math.pow(16, 20))
        }
    }();
    (0, _.Q)("shindig.random", _.Vb);
    _.zk = function (a, c)
    {
        var f = _.R.Fh(
        {
            id: a,
            name: a
        });
        f.style.width = "1px";
        f.style.height = "1px";
        f.style.position = "absolute";
        f.style.top = "-100px";
        var g;
        if (window.navigator)
        {
            g = window.navigator.userAgent || "";
            var h = window.navigator.product || "";
            g = 0 != g.indexOf("Opera") && -1 == g.indexOf("WebKit") && "Gecko" == h && 0 < g.indexOf("rv:1.")
        }
        else g = _.u;
        f.src = g ? "about:blank" : c;
        window.document.body.appendChild(f);
        g && (f.src = c);
        return f
    };
    _.Ak = {};
    _.Bk = function ()
    {
        function a(a, c, f, g)
        {
            for (var h = 0; h < z.length; h++)
            {
                var l = z[h];
                window.setTimeout(function ()
                {
                    l(a, c, f, g)
                }, 1)
            }
        }
        function c(a, c, f, g)
        {
            var h = t("proxy");
            if (f || !h) var h = t("root"),
            l = t("root-1p") || h, n = t("xd3"), h = (f || (0, window.String)(c ? l : h)) + n;
            (c = _.R.oa().jsh || _.Rb.xh.Ok()) && (h += (0 <= h.indexOf("?") ? "&" : "?") + "jsh=" + (0, window.encodeURIComponent)(c));
            t("push") && (h += (0 <= h.indexOf("?") ? "&" : "?") + "p=1");
            h += "#parent=" + (0, window.encodeURIComponent)(g != _.s ? (0, window.String)(g) : _.Rb.Pq(window.document.location.href));
            return h += "&rpctoken=" + a
        }
        function f(c, f, g, n)
        {
            var q = h(g, n),
                t = (0, _.zk)(q, f);
            _.T.Q("ready:" + c, function ()
            {
                _.T.Jd("ready:" + c);
                if (!A[q])
                {
                    A[q] = _.r;
                    var f = F[q];
                    F[q] = [];
                    for (var h = 0, t = f.length; h < t; ++h)
                    {
                        var v = f[h];
                        l(v.qf, v.$r, v.Ga)
                    }
                    a("ready", (new window.Date).getTime(), g, n || _.s)
                }
            });
            _.T.tf(q, f);
            w[q] = t
        }
        function g(g, h)
        {
            var l = (0, window.String)(2147483647 * (0, _.Vb)() | 0),
                n = c(l, g, h);
            a("loading", (new window.Date).getTime(), g, h || _.s);
            (0, _.Ub)(function ()
            {
                f(l, n, g, h)
            })
        }
        function h(a, f)
        {
            var g = c("", a, f, ""),
                h = v[g];
            h || (h = (0, _.Tb)(),
                h.update(g), h = h.Of().toLowerCase(), h += window.Math.random(), v[g] = h);
            return "apiproxy" + h
        }
        function l(a, c, f)
        {
            function l(a)
            {
                a && (q = a.root || q, t = _.Qj.Nq(a.headers))
            }
            var q = _.s,
                t = _.u;
            if ("makeRequest" === a || "listen" === a) l(c);
            else if ("makeHttpRequests" === a && c)
            {
                for (var v = (0, _.P)("client/jsonpOverride"), z = 0, rw = c.length; z < rw; ++z)
                {
                    var Ta = c[z];
                    Ta && (Ta = Ta.params, l(Ta), v && n(Ta, f))
                }
                if (v) return
            }
            v = h(t, q);
            w[v] || g(t, q);
            A[v] ? _.T.call(v, a, function (c)
            {
                var g = _.Kb.parse(c);
                if ("makeRequest" == a && g)
                {
                    for (var h = {}, l = 0; l < g.length; l++) h[g[l].id] =
                            g[l];
                    f(h, c)
                }
                else f(g, c)
            }, c) : (F[v] || (F[v] = []), F[v].push(
            {
                qf: a,
                $r: c,
                Ga: f
            }))
        }
        function n(a, c)
        {
            "GET" != a.httpMethod && (0, _.m)("JSONP supports GET methods only.");
            var f = "jpcb" + (0, window.String)(2147483647 * (0, _.Vb)() | 0),
                g = window.document.createElement("script"),
                h = window.document.getElementsByTagName("head")[0];
            window[f] = function (a)
            {
                c(a);
                try
                {
                    delete window[f]
                }
                catch (l)
                {
                    window[f] = _.p
                }
                window.setTimeout(function ()
                {
                    h.removeChild(g)
                }, 1)
            };
            var l = a.root || t("root"),
                l = l + a.url,
                n = a.urlParams;
            if (n) for (var v in n) window.Object.prototype.hasOwnProperty.call(n,
                        v) && (l = q(l, v, n[v]));
            l = q(l, "callback", f);
            g.setAttribute("id", f);
            g.setAttribute("src", l);
            g.setAttribute("charset", "utf-8");
            h.appendChild(g)
        }
        function q(a, c, f)
        {
            a += 0 < a.indexOf("?") ? "&" : "?";
            return a += (0, window.encodeURIComponent)(c) + "=" + (0, window.encodeURIComponent)(f)
        }
        function t(a)
        {
            return (0, _.P)("googleapis.config/" + a)
        }
        var v = {}, w = {}, A = {}, F = {}, z = [];
        return {
            Md: function (a, c)
            {
                var f = a ||
                {}, g = _.Rb.Pq((0, window.String)(window.location.href));
                f["X-Origin"] = g;
                var g = f.Authorization,
                    h = f.OriginToken;
                if (g == _.s && h == _.s)
                {
                    if (g ==
                        _.s)
                    {
                        var l;
                        _.Pj && _.Ak && (l = (0, _.Wj)());
                        l && l.access_token && (g = (0, window.String)(l.token_type || "Bearer") + " " + l.access_token)
                    }
                    g == _.s && (t("auth/useFirstPartyAuth") && _.Qj.er()) && (l = f["X-Goog-AuthUser"], l == _.s && (l = (0, _.Wb)(c) || "0"), (g = _.Qj.Qe()) && (f["X-Goog-AuthUser"] = l));
                    g ? f.Authorization = g : t("auth/useOriginToken") !== _.u && (h = _.Qj.bq()) && (f.OriginToken = h)
                }
                return f
            },
            Xo: function (a)
            {
                z.push(a)
            },
            Wr: function (a)
            {
                for (var c = 0; c < z.length; c++) if (z[c] == a)
                    {
                        z.splice(c, 1);
                        break
                    }
            },
            Dd: l
        }
    }();

    _.Pb.ft = function (a)
    {
        var c = [];
        if (1 < arguments.length) for (var f = 0, g; g = arguments[f]; ++f) c.push(g);
        else c = a;
        return function (a)
        {
            for (var f = 0; c[f]; ++f) if (a === c[f]) return _.r;
            return _.u
        }
    };
    _.Pb.Dt = function (a)
    {
        return function (c)
        {
            return a.test(c)
        }
    };
    _.Pb.Sn = function (a)
    {
        return "undefined" !== typeof a
    };
    _.Pb.yt = function (a)
    {
        return "string" === typeof a && 0 < a.length
    };
    _.Pb.at = function (a)
    {
        return "boolean" === typeof a
    };
    _.Pb.rt = function (a)
    {
        return function (c)
        {
            for (var f in a) if (a.hasOwnProperty(f) && !(0, a[f])(c[f])) return _.u;
            return _.r
        }
    };

    _.R = _.R ||
    {};
    _.R.Dg = function (a, c, f)
    {
        for (var g = [], h = 2, l = arguments.length; h < l; ++h) g.push(arguments[h]);
        return function ()
        {
            for (var f = g.slice(), h = 0, l = arguments.length; h < l; ++h) f.push(arguments[h]);
            return c.apply(a, f)
        }
    };
    _.R.nf = function (a)
    {
        var c, f, g = {};
        for (c = 0; f = a[c]; ++c) g[f] = f;
        return g
    };

    _.R = _.R ||
    {};
    (function ()
    {
        function a(a)
        {
            c = a["core.util"] ||
            {}
        }
        var c = {}, f = {};
        _.Pb && _.Pb.Q("core.util", _.s, a);
        _.R.Nt = function (a)
        {
            return "undefined" === typeof c[a] ? _.s : c[a]
        };
        _.R.hasFeature = function (a)
        {
            return "undefined" !== typeof c[a]
        };
        _.R.Rt = function ()
        {
            return f
        }
    })();

    _.ak = function (a)
    {
        var c = a === _.r,
            f = (0, _.Wj)();
        _.bk && window.setTimeout(function ()
        {
            (0, _.bk)(c, f)
        }, 0)
    };
    _.ck = function (a, c)
    {
        var f, g;
        "string" == typeof a ? (f = c, g = a) : (f = a, g = "token");
        if (f)
        {
            var h = (0, _.Ev)(f, _.r);
            if (h)
            {
                var l;
                l = f;
                if (!l || !l.session_state) l = _.s;
                else
                {
                    var n = [],
                        q = [],
                        t = [],
                        v = (0, window.parseInt)(l.authuser, 10) || 0;
                    n[v] = l.session_state;
                    q[v] = l.issued_at;
                    t[v] = l.expires_at;
                    l = ["C=" + l.client_id, "S=" + n.join("|"), "I=" + q.join("|"), "X=" + t.join("|")].join(":")
                }
                l && h.Kc.write(l);
                "token" == g && (h = (0, _.st)(f.g_user_cookie_policy), !h || h.Gb && !_.Gt ? h = _.s : (l = "G_AUTHUSER_" + (_.Gt && h.Gb ? "S" : "H") + h.Ke, n = _.Mv[l], n || (n = new _.Lv(l, (0, _.vv)(h)), _.Mv[l] = n), h = n), h && (f.session_state && !f.error) && h.write(f.authuser || "0"))
            }
        }
        if (g = "token" !== g ? (0, _.Cv)(g) : (0, _.Ev)(f)) if (f)
            {
                if (g.Kc.write(f), !_.Jv || g.Fj && "token" !== _.Jv) _.Jv = g.key
            }
            else g.Kc.clear(), _.Jv = _.s;
            (0, _.ak)(_.r)
    };
    _.ek = function (a)
    {
        var c = _.mw;
        return function (f)
        {
            if (this.f == c && this.t == _.T.Wd(this.f) && this.origin == _.T.$d(this.f)) return a.apply(this, arguments)
        }
    };
    _.gk = function (a)
    {
        if (_.hk === _.s) a && a();
        else
        {
            a && _.hk.push(a);
            a = _.mw;
            var c = window.document.getElementById(a),
                f = (new window.Date).getTime();
            if (c)
            {
                if (_.nw && 6E4 > f - _.nw) return;
                c.parentNode.removeChild(c);
                if (/Firefox/.test(window.navigator.userAgent)) try
                    {
                        window.frames[a] = _.p
                }
                catch (g)
                {}(0, _.ow)();
                a = _.mw
            }
            _.nw = f;
            var h = (0, window.String)(2147483647 * (0, _.Vb)() | 0);
            _.T.Q("oauth2relayReady:" + h, (0, _.ek)(function ()
            {
                _.T.Jd("oauth2relayReady:" + h);
                (0, _.ik)()
            }));
            _.T.Q("oauth2relayReady", (0, _.ek)(function ()
            {
                (0, _.ik)()
            }));
            c = (0, _.ek)(function (a)
            {
                var c = _.R.oa;
                a = c(a);
                var f = c = a.state,
                    f = f.replace(/\|.*$/, "");
                a.state = {}.hasOwnProperty.call(_.jk, f) ? _.jk[f] : _.s;
                a.state != _.s && (f = _.kk[c], delete _.kk[c], (0, _.lk)(a, f))
            });
            _.T.Q("oauth2callback:" + h, c);
            _.T.Q("oauth2callback", c);
            var c = [(0, _.P)("oauth-flow/proxyUrl") || (0, _.P)("oauth-flow/relayUrl"), "?parent=", (0, window.encodeURIComponent)(_.Rb.Pq(window.location.href)), "#rpctoken=", h, "&forcesecure=1"].join(""),
                f = _.R.Jk(),
                l = _.R.Fh(
                {
                    name: a,
                    id: a
                });
            l.src = c;
            l.style.width = "1px";
            l.style.height =
                "1px";
            l.style.position = "absolute";
            l.style.left = "-100px";
            f.appendChild(l);
            _.T.tf(a)
        }
    };
    _.ik = function ()
    {
        var a = _.hk;
        if (a !== _.s)
        {
            _.hk = _.s;
            for (var c = 0, f = a.length; c < f; c++) a[c]()
        }
    };
    _.lk = function (a, c)
    {
        var f = c && c.key || "token";
        a = (0, _.pw)(c && c.params, a);
        (0, _.ck)(f, a);
        a = (0, _.Wj)(f);
        if (c)
        {
            (f = c.iframe) && f.parentNode.removeChild(f);
            var f = c.popup,
                g = c.after_redirect;
            if (f && "keep_open" != g) try
                {
                    f.close()
            }
            catch (h)
            {}
            c.timeout && (window.clearTimeout(c.timeout), c.timeout = _.s);
            c.callback && (c.callback(a), c.callback = _.s)
        }
    };
    _.mk = function (a, c)
    {
        if (_.qk)
        {
            var f = _.qk.popup,
                g = _.qk.after_redirect;
            if (f && "keep_open" != g) try
                {
                    f.close()
            }
            catch (h)
            {}
        }
        f = _.qk = {};
        "key" in a && (f.key = a.key, delete a.key);
        _.qk.params = a;
        _.qk.callback = function (f)
        {
            (c || (0, _.x)())((0, _.pw)(a, f))
        };
        f.uri = (0, _.rk)(a, f);
        return f
    };
    _.pw = function (a, c)
    {
        a && c && (c.client_id = c.client_id || a.client_id, c.scope = c.scope || a.scope, c.g_user_cookie_policy = a.cookie_policy, c.cookie_policy = c.cookie_policy || (a.cookie_policy ? "single_host_origin" : _.p));
        if (c)
        {
            c.issued_at || (c.issued_at = (0, window.String)((0, _.Fn)()));
            var f = (0, window.parseInt)(c.expires_in, 10) || 86400;
            c.error && (f = (0, _.P)("oauth-flow/errorMaxAge") || 86400);
            c.expires_in = (0, window.String)(f);
            c.expires_at || (c.expires_at = (0, window.String)((0, _.Fn)() + f))
        }
        return c
    };
    _.sk = function (a, c)
    {
        var f = a ||
        {}, g = _.R.oa();
        f.Vt = g.lang || g.hl;
        var h = (0, _.mk)(f, c),
            l = h.uri,
            n = _.s;
        a.after_redirect && (h.after_redirect = a.after_redirect);
        f.scope != _.s ? (0, _.gk)(function ()
        {
            if (h) if (h.popup) h.popup.focus();
                else if (f.immediate === _.r)
            {
                var a = _.R.Jk(),
                    c = _.R.Fh();
                c.src = l;
                c.style.width = "1px";
                c.style.height = "1px";
                c.style.position = "absolute";
                c.style.left = "-100px";
                h.timeout = window.setTimeout(function ()
                {
                    c.parentNode && c.parentNode.removeChild(c)
                }, 3E5);
                a.appendChild(c)
            }
            else
            {
                var a = window.Math.min((0, _.P)("oauth-flow/authWindowWidth",
                    650), window.screen.width - 20),
                    g = window.Math.min((0, _.P)("oauth-flow/authWindowHeight", 600), window.screen.height - 30);
                n = window.open(l, "_blank", ["toolbar=no", "location=" + (window.opera ? "no" : "yes"), "directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no", "width=" + a, "height=" + g, "top=" + (window.screen.height - g) / 2, "left=" + (window.screen.width - a) / 2].join());
                _.qk.popup = n
            }
        }) : (0, _.lk)(_.s, _.qk);
        return n
    };
    _.tk = function (a)
    {
        if (a) return a.replace(/[#][\s\S]*/, "");
        a = _.Rb.Pq(window.location.href);
        return [(0, _.P)("oauth-flow/callbackUrl"), "?x_origin=", (0, window.encodeURIComponent)(a)].join("")
    };
    _.rk = function (a, c)
    {
        var f = a ||
        {}, g;
        for (g in _.uk)(0, _.kf)(f[g]) || (f[g] = _.uk[g]);
        _.vk != _.s && 0 < _.vk.length && (f.scope = (0, _.wk)(f.scope, _.vk), f.state = (0, _.wk)(f.state, _.vk));
        a = f;
        f = (0, _.P)("googleapis/overrideClientId");
        f != _.s && (a.client_id = f);
        if (!a.redirect_uri || "postmessage" === a.redirect_uri)
        {
            f = a;
            g = a.state || "";
            g = (0, window.String)(g);
            var h = "";
            if (
            {}.hasOwnProperty.call(_.xk, g)) h = _.xk[g];
            else
            {
                for (var l = 2147483647 * (0, _.Vb)() | 0;;)
                {
                    h = (0, window.String)(l);
                    if (!
                    {}.hasOwnProperty.call(_.jk, h)) break;
                    l += (0, _.Vb)()
                }
                _.jk[h] =
                    g;
                _.xk[g] = h
            }
            f.state = h + "|" + (0, _.Vb)();
            _.kk[a.state] = c
        }
        f = a.authorize_uri || (0, _.P)("oauth-flow/authUrl");
        delete a.authorize_uri;
        f += 0 < f.indexOf("?") ? "&" : "?";
        f += (0, _.Zj)(a);
        return f = (0, _.Xb)(f)
    };
    _.wk = function (a, c)
    {
        return a != _.s ? (0, _.ea)(a) ? [].concat(a).concat(c) : [a].concat(c) : [].concat(c)
    };
    _.ow = function ()
    {
        _.mw = "oauth2relay" + (0, window.String)(2147483647 * (0, _.Vb)() | 0);
        _.uk.proxy = _.mw
    };
    _.yk = {};
    _.nw = 0;
    _.hk = [];
    _.kk = {};
    _.jk = {};
    _.xk = {};
    (function ()
    {
        _.uk = {};
        (0, _.ow)();
        var a = (0, _.P)("oauth-flow/client_id");
        _.uk.client_id = a;
        _.uk.redirect_uri = (0, _.tk)((0, _.P)("oauth-flow/redirectUri"));
        _.uk.origin = _.Rb.Pq(window.location.href);
        _.uk.response_type = "token";
        window.setTimeout(function ()
        {
            (0, _.sk)(
            {
                immediate: _.r
            }, (0, _.x)())
        }, 0)
    })();
    _.__OAUTH2_URI = _.yk.kt;
    _.__OAUTH2_RELAY_URI = _.yk.jt;
    _.__OAUTH2_CALLBACK_URI = _.yk.LD;
    _.__OAUTH2_REDIRECT_URI = _.yk.ND;
    _.__OAUTH2_PROXY_URI = _.yk.MD;
    _.Ck = function (a, c, f)
    {
        return function (c, h)
        {
            var l = _.s;
            if ((0, _.ea)(c)) for (var n = 0; n < c.length; n++)
                {
                    if (401 === c[n].status)
                    {
                        l = c[n];
                        break
                    }
            }
            else 401 === c.status && (l = c); if (l !== _.s)
            {
                var q;
                a:
                {
                    for (var t in l.headers) if ("www-authenticate" == t.toLowerCase())
                        {
                            q = l.headers[t];
                            break
                        }
                    if (q != _.s && (l = q.indexOf("allowed-scopes="), 0 <= l && (l += 15, q = q.substring(l + 1, q.length - 1))))
                    {
                        q = [q.split(",").pop()];
                        break a
                    }
                    q = []
                }
                q && (0, _.Dk)(q, a, f)
            }
            f(c, h)
        }
    };
    _.Dk = function (a, c, f)
    {
        var g = (0, _.ea)(c) ? c : [c];
        (0, _.sk)(
        {
            scope: a,
            immediate: _.r
        }, function (a)
        {
            if (a && !a.error && (a = a.access_token))
            {
                a = "Bearer " + a;
                for (var c = 0; c < g.length; c++) g[c].headers || (g[c].headers = {}), g[c].headers.Authorization = a;
                _.Bk.Dd("makeHttpRequests", g, f)
            }
        })
    };

    _.Ek = {
        Ff: _.sk,
        op: function (a, c)
        {
            (0, _.gk)(function ()
            {
                _.T.call(_.mw, "check_session_state", function (a)
                {
                    c.call(_.s, a)
                }, a.session_state, a.client_id)
            })
        },
        Qe: _.Qj.Qe,
        $f: _.Wj,
        Wk: function (a, c)
        {
            (0, _.gk)(function ()
            {
                var f = _.mw,
                    g = _.Qj.Qe() || "",
                    h = _.s,
                    l = _.s;
                g && (l = g.split(" "), 2 == l.length && (h = l[1]));
                h ? _.T.call(f, "get_versioninfo", function (c)
                {
                    a(c)
                }, h, c) : a()
            })
        },
        ba: _.gk,
        Ym: _.ck
    };
    (0, _.Q)("gapi.auth.authorize", _.Ek.Ff);
    (0, _.Q)("gapi.auth.checkSessionState", _.Ek.op);
    (0, _.Q)("gapi.auth.getAuthHeaderValueForFirstParty", _.Ek.Qe);
    (0, _.Q)("gapi.auth.getToken", _.Ek.$f);
    (0, _.Q)("gapi.auth.getVersionInfo", _.Ek.Wk);
    (0, _.Q)("gapi.auth.init", _.Ek.ba);
    (0, _.Q)("gapi.auth.setToken", _.Ek.Ym);


    _.Yl = window.tamings___ || [];
    _.Zl = window.caja___;
    _.___ = window.___;
    _.$l = function (a, c, f)
    {
        this.method = a;
        this.transport = c;
        this.rpc = f
    };
    _.L.Ui = function ()
    {
        function a(a)
        {
            var c = {
                method: a.request.method,
                id: a.key
            };
            a.request.rpc && (c.params = a.request.rpc);
            return c
        }
        var c = {}, f = [];
        c.execute = function (c)
        {
            function h(a)
            {
                a.error && (l.error = a.error);
                for (var h = 0; h < f.length; h++)
                {
                    var n = f[h].key,
                        t = a[n];
                    t && (l[n] = t.error ? t : t.data || t.result)
                }
                q--;
                0 === q && c(l)
            }
            for (var l = {}, n = {}, q = 0, t = [], v = 0; v < f.length; v++)
            {
                var w = f[v].request.transport;
                n[w.name] || (t.push(w), q++);
                n[w.name] = n[w.name] || [];
                n[w.name].push(a(f[v]))
            }
            for (v = 0; v < t.length; v++) t[v].execute(n[t[v].name], h);
            0 == q && window.setTimeout(function ()
            {
                c(l)
            }, 0)
        };
        c.add = function (a, h)
        {
            h && a && f.push(
            {
                key: a,
                request: h
            });
            return c
        };
        return c
    };
    _.L.qh = function (a, c)
    {
        if ("newBatch" !== a)
        {
            for (var f = a.split("."), g = window.osapi, h = 0; h < f.length - 1; h++) g[f[h]] = g[f[h]] ||
                {}, g = g[f[h]];
            var l = f[f.length - 1];
            g[l] ? (g.__dupwarn || (0, _.Lb)("Skipping duplicate osapi method definition " + a + " on transport " + c.name + "; others may exist, but suppressing warnings"), g.__dupwarn = _.r) : (g[l] = function (f)
            {
                f = f ||
                {};
                f.userId = f.userId || "@viewer";
                f.groupId = f.groupId || "@self";
                return new _.$l(a, c, f)
            }, "undefined" !== typeof _.Yl && _.Yl.push(function ()
            {
                _.Zl.markTameAsFunction(g[l], a)
            }))
        }
    };
    _.$l.prototype.execute = function (a)
    {
        var c = "undefined" !== typeof _.Zl && _.Zl.getUseless && _.Zl.getUseless(),
            f = c ? _.Zl.getUseless() : this,
            g = c ? _.Zl.untame(a) : a;
        a = _.L.Ui();
        a.add(this.method, this);
        a.execute(function (a)
        {
            a.error ? g.call(f, a.error) : g.call(f, a[f.method])
        })
    };

    _.am = function (a, c)
    {
        for (var f = a.split("."), g = c || window, h; h = f.shift();) if (g[h] != _.s) g = g[h];
            else return _.s;
        return g
    };
    _.bm = function (a, c, f)
    {
        a = a.split(".");
        f = f || window;
        !(a[0] in f) && f.execScript && f.execScript("var " + a[0]);
        for (var g; a.length && (g = a.shift());)!a.length && c !== _.p ? f[g] = c : f = f[g] ? f[g] : f[g] = {}
    };
    _.cm = function (a, c)
    {
        _.L.qh(a,
        {
            name: "googleapis",
            execute: _.dm,
            root: c
        });
        var f = (0, _.am)(a, window.osapi);
        (0, _.bm)(a, f);
        if (0 != a.indexOf("googleapis."))
        {
            var g = a.substring(a.indexOf(".") + 1),
                h = g.lastIndexOf(".delete"); - 1 != h && h + 7 == g.length && (g = g.replace(".delete", ".remove"));
            (0, _.bm)("googleapis." + g, f)
        }
    };
    _.em = function (a)
    {
        for (var c in a) a.hasOwnProperty(c) && (_.fm[c] = a[c])
    };
    _.gm = function (a)
    {
        (0, _.hm)("key", a)
    };
    _.hm = function (a, c)
    {
        c == _.s ? (0, _.im)(a) : (_.jm = _.jm ||
        {}, _.jm[a] = c)
    };
    _.im = function (a)
    {
        _.jm && delete _.jm[a]
    };
    _.km = function (a)
    {
        a = a ||
        {};
        if (window.navigator)
        {
            for (var c = ["appVersion", "platform", "userAgent"], f = [], g = 0; g < c.length; g++) window.navigator[c[g]] && f.push((0, window.encodeURIComponent)(c[g]) + "=" + (0, window.encodeURIComponent)(window.navigator[c[g]]));
            a["X-ClientDetails"] = f.join("&")
        }
        return a
    };
    _.lm = function (a, c)
    {
        for (var f = 0; f < _.mm.length; f++) window.setTimeout(function (c)
            {
                return function ()
                {
                    c(a)
                }
            }(_.mm[f]), 1);
        return function ()
        {
            var a = arguments;
            c.apply(_.s, a);
            for (var f = 0; f < _.nm.length; f++) window.setTimeout(function (c)
                {
                    return function ()
                    {
                        c.apply(_.s, a)
                    }
                }(_.nm[f]), 1)
        }
    };
    _.om = function (a)
    {
        a.applicationName = _.pm;
        a.clientVersion = "1.0.0-alpha";
        _.jm && (a.urlParams = _.jm, _.jm.key && (a.developerKey = _.jm.key))
    };
    _.dm = function (a, c)
    {
        for (var f = this.root || _.s, g = 0; g < a.length; g++)
        {
            var h = a[g],
                l = h.method.substring(0, h.method.indexOf("."));
            h.jsonrpc = "2.0";
            h.key = h.id;
            f = h.root || f;
            (l = _.fm[l] || "v1") && !h.apiVersion && (h.apiVersion = l)
        }
        g = {};
        g = _.Bk.Md(g);
        g = (0, _.km)(g);
        f = {
            requests: a,
            headers: g,
            root: f
        };
        (0, _.om)(f);
        g = (0, _.lm)(a, c);
        _.Bk.Dd("makeRequest", f, g)
    };
    _.qm = function (a)
    {
        _.mm.push(a)
    };
    _.rm = function (a)
    {
        _.nm.push(a)
    };
    _.sm = function (a)
    {
        for (var c = 0; c < _.mm.length; c++) if (_.mm[c] == a)
            {
                _.mm.splice(c, 1);
                break
            }
    };
    _.tm = function (a)
    {
        for (var c = 0; c < _.nm.length; c++) if (_.nm[c] == a)
            {
                _.nm.splice(c, 1);
                break
            }
    };
    _.um = function (a, c)
    {
        for (var f = 0, g = a.length; f < g; f++)
        {
            var h = a[f];
            h.key = h.id;
            var l = h.params.headers ||
            {}, l = _.Bk.Md(l),
                l = (0, _.km)(l);
            h.params.headers = l;
            (0, _.om)(h.params)
        }
        f = (0, _.lm)(a, c);
        _.Bk.Dd("makeHttpRequests", a, f)
    };
    _.vm = function ()
    {
        var a = _.R.oa(),
            c = {
                debug: "googleapis.config/debug"
            }, f;
        for (f in c) a[f] && (0, _.Fa)(c[f], "true" == a[f]);
        for (var g in (0, _.P)("googleapis.config/methods"))(0, _.cm)(g);
        (0, _.P)("googleapis.config/versions") && (0, _.em)((0, _.P)("googleapis.config/versions"));
        (0, _.P)("googleapis.config/developerKey") && (0, _.gm)((0, _.P)("googleapis.config/developerKey"));
        _.L.qh("googleapis.newHttpRequest",
        {
            name: "googleapis",
            execute: _.um
        });
        (0, _.bm)("googleapis.newHttpRequest", (0, _.am)("googleapis.newHttpRequest", window.osapi))
    };
    _.wm = function ()
    {
        this.d = {};
        this.b = _.L.Ui()
    };
    _.pm = _.s;
    _.fm = {};
    _.mm = [];
    _.nm = [];
    (0, _.vm)();
    _.wm.prototype.add = function (a, c, f)
    {
        this.d[a] = f;
        this.b.add(a, c);
        return this
    };
    _.wm.prototype.execute = function (a)
    {
        var c = this;
        this.b.execute(function (f)
        {
            var g = {}, h = _.u,
                l;
            for (l in f) if (f.hasOwnProperty(l))
                {
                    var n = f[l],
                        q = c.d[l];
                    q ? q(n) : (g[l] = n, h = _.r)
                }
            h && a && a(g)
        })
    };
    (0, _.Q)("googleapis.ApiClient.register", _.cm);
    (0, _.Q)("googleapis.ApiClient.setVersions", _.em);
    (0, _.Q)("googleapis.ApiClient.setDeveloperKey", _.gm);
    (0, _.Q)("googleapis.ApiClient.setUrlParameter", _.hm);
    (0, _.Q)("googleapis.ApiClient.removeUrlParameter", _.im);
    (0, _.Q)("googleapis.ApiClient.addExecuteListener", _.qm);
    (0, _.Q)("googleapis.ApiClient.addResponseListener", _.rm);
    (0, _.Q)("googleapis.ApiClient.removeExecuteListener", _.sm);
    (0, _.Q)("googleapis.ApiClient.removeResponseListener", _.tm);
    (0, _.Q)("googleapis.ApiClient.init", _.vm);
    (0, _.Q)("googleapis.Batch", _.wm);
    (0, _.Q)("googleapis.Batch.prototype.add", _.wm.prototype.add);
    (0, _.Q)("googleapis.Batch.prototype.execute", _.wm.prototype.execute);
    (0, _.Q)("googleapis.init", function ()
    {
        (0, _.vm)()
    });
    (0, _.Q)("googleapis.newBatch", function ()
    {
        return new _.wm
    });
    (0, _.Q)("googleapis.newRequest", function (a, c, f)
    {
        c = c ||
        {};
        var g = {
            name: "googleapis",
            execute: _.dm,
            root: f
        }, h = _.L.Ui(),
            l = this;
        f = {};
        f.method = a;
        f.transport = g;
        f.rpc = c;
        f.execute = function (f)
        {
            h.add(a,
            {
                method: a,
                rpc: c,
                transport: g
            });
            h.execute(function (c)
            {
                c.error ? f.call(l, c.error) : f.call(l, c[a])
            })
        };
        return f
    });
    (0, _.Q)("googleapis.register", function (a, c)
    {
        (0, _.cm)(a, c)
    });
    (0, _.Q)("googleapis.setUrlParameter", function (a, c)
    {
        (0, _.hm)(a, c)
    });
    (0, _.Q)("googleapis.removeUrlParameter", function (a)
    {
        (0, _.im)(a)
    });
    (0, _.Q)("googleapis.setDeveloperKey", function (a)
    {
        (0, _.gm)(a)
    });
    (0, _.Q)("googleapis.setApplicationName", function (a)
    {
        _.pm = a
    });
    (0, _.Q)("googleapis.setVersions", function (a)
    {
        (0, _.em)(a)
    });
    (0, _.Q)("googleapis.addExecuteListener", function (a)
    {
        (0, _.qm)(a)
    });
    (0, _.Q)("googleapis.removeExecuteListener", function (a)
    {
        (0, _.sm)(a)
    });
    (0, _.Q)("googleapis.addResponseListener", function (a)
    {
        (0, _.rm)(a)
    });
    (0, _.Q)("googleapis.removeResponseListener", function (a)
    {
        (0, _.tm)(a)
    });
    (0, _.Q)("googleapis.addTransportInitListener", function (a)
    {
        _.Bk.Xo(a)
    });
    (0, _.Q)("googleapis.removeTransportInitListener", function (a)
    {
        _.Bk.Wr(a)
    });

    _.qf = function (a, c, f)
    {
        for (var g in a) c.call(f, a[g], g, a)
    };
    _.rf = function (a)
    {
        var c = {}, f;
        for (f in a) c[f] = a[f];
        return c
    };
    _.sf = function (a, c)
    {
        for (var f, g, h = 1; h < arguments.length; h++)
        {
            g = arguments[h];
            for (f in g) a[f] = g[f];
            for (var l = 0; l < _.tf.length; l++) f = _.tf[l], window.Object.prototype.hasOwnProperty.call(g, f) && (a[f] = g[f])
        }
    };
    _.uf = function (a)
    {
        var c = arguments.length;
        if (1 == c && (0, _.ea)(arguments[0])) return _.uf.apply(_.s, arguments[0]);
        for (var f = {}, g = 0; g < c; g++) f[arguments[g]] = _.r;
        return f
    };
    _.tf = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    _.xm = function (a, c)
    {
        var f = "/discovery/v1/apis/";
        return f += (0, window.encodeURIComponent)(a) + "/" + (0, window.encodeURIComponent)(c) + "/rpc?fields=methods%2f*%2fid&pp=0"
    };
    _.ym = function (a)
    {
        if (a)
        {
            for (var c = [], f = 0; f < _.zm.length; f++)
            {
                var g = window.navigator[_.zm[f]];
                g && c.push((0, window.encodeURIComponent)(_.zm[f]) + "=" + (0, window.encodeURIComponent)(g))
            }
            a["X-ClientDetails"] = c.join("&")
        }
    };
    _.Am = function ()
    {
        var a = (0, _.P)("client/name", "google-api-javascript-client");
        return a in _.Bm ? a : "google-api-javascript-client"
    };
    _.Cm = function ()
    {
        return (0, _.P)("client/version", "1.1.0-beta")
    };
    _.Dm = function (a)
    {
        var c;
        "object" == typeof a && (c = a.callback, delete a.callback);
        a = new _.Em(a);
        if (c) a.execute(c);
        else return a
    };
    _.Fm = function (a, c)
    {
        a || (0, _.m)("Missing required parameters");
        for (var f = a.split("."), g = window.gapi.client, h = 0; h < f.length - 1; h++)
        {
            var l = f[h];
            g[l] = g[l] ||
            {};
            g = g[l]
        }
        f = f[f.length - 1];
        g[f] || (c = c ||
        {}, g[f] = function (f)
        {
            var g;
            g = "string" == typeof c ? c : c.root;
            f && f.root && (g = f.root);
            return new _.Gm(
            {
                method: a,
                apiVersion: c.apiVersion,
                rpcParams: f,
                transport:
                {
                    name: "googleapis",
                    root: g
                }
            })
        })
    };
    _.Hm = function (a)
    {
        (0, _.em)(a);
        for (var c in a) window.Object.prototype.hasOwnProperty.call(a, c) && (_.Im[c] = a[c])
    };
    _.Em = function (a)
    {
        (!a || "object" != typeof a && "string" != typeof a) && (0, _.m)("Invalid request parameters");
        a = "string" == typeof a ?
        {
            path: a
        } : a;
        a.path || (0, _.m)('Missing required parameter: "path"');
        this.b = {
            path: a.path,
            method: a.method || "GET",
            params: a.params ||
            {},
            headers: a.headers ||
            {},
            body: a.body,
            root: a.root
        }
    };
    _.Jm = function (a, c)
    {
        var f = c.headers,
            g = f["Content-Type"];
        c.body && !g && (g = "application/json", f["Content-Type"] = g);
        "application/json" == g && (c.params.alt = "json");
        c.key = c.id;
        f = _.Bk.Md(f);
        (0, _.ym)(f);
        (f = _.jm.key) && (c.params.key = f)
    };
    _.Km = function (a, c)
    {
        var f = a.b,
            g = {};
        g.key = c;
        var h = {};
        h.id = f.id;
        h.key = f.key;
        h.url = f.path;
        h.httpMethod = f.method;
        h.body = f.body;
        h.headers = f.headers;
        h.urlParams = f.params;
        h.root = f.root;
        h.clientName = (0, _.Am)();
        h.clientVersion = (0, _.Cm)();
        g.params = h;
        return g
    };
    _.Lm = function ()
    {
        this.b = [];
        this.i = this.d = _.s
    };
    _.Mm = function (a, c)
    {
        return function (f, g)
        {
            for (var h = 0; h < a.b.length; h++)
            {
                var l = a.b[h];
                l.Ga && l.Ga(f[l.id] || _.u, g)
            }
            c && c(f, g)
        }
    };
    _.Gm = function (a)
    {
        (!a || "object" != typeof a) && (0, _.m)("Missing rpc parameters");
        a.method || (0, _.m)("Missing rpc method");
        this.b = a
    };
    _.Nm = function (a)
    {
        return (a = a.b.transport) ? a.root || _.s : _.s
    };
    _.Om = function (a, c)
    {
        return function (f, g)
        {
            var h;
            if (f) if (f.error) h = f.error, h.error == _.s && (h.error = (0, _.rf)(f.error));
                else
                {
                    if (h = f.result || f.data, (0, _.Vg)(h) && h.result == _.s && (h.result = (0, _.rf)(f.result || f.data)), (0, _.Vg)(h) && h._subscription && a.d)
                    {
                        var l = h._subscription,
                            n = a.d,
                            q = (0, _.Nm)(a);
                        _.Pm[++_.Qm] = n;
                        _.T.Q("_invalidate", _.Rm);
                        _.Bk.Dd("listen",
                        {
                            root: q,
                            headers: _.Bk.Md(),
                            callback: _.Qm,
                            subscription: l
                        })
                    }
                }
                else h = _.u;
            c(h, g)
        }
    };
    _.Rm = function (a)
    {
        var c = _.Pm[a.Ga];
        c && c(a.mu, a.data)
    };
    _.zm = ["appVersion", "platform", "userAgent"];
    _.Bm = {
        "google-api-javascript-client": _.r,
        "google-api-gwt-client": _.r
    };
    _.Im = {};
    (0, _.gm)(_.s);
    _.Em.prototype.execute = function (a)
    {
        (0, _.Jm)(this, this.b);
        var c = _.s;
        if (!this.b.headers.Authorization)
        {
            var f = (0, _.Wj)();
            f && f.state && (c = f.state.split(/\w+/))
        }
        var g = (0, _.Ck)(this.b, c, function (c, f)
        {
            var g = c instanceof window.Array ? c[0] : c,
                q;
            if (204 != g.status && g.body) try
                {
                    q = _.Kb.parse(g.body)
            }
            catch (t)
            {}(0, _.P)("client/jsonpOverride") && (q = g);
            a(q, f)
        }),
            c = (0, _.Km)(this, "gapiRequest");
        _.Bk.Dd("makeHttpRequests", [c], function (a, c)
        {
            var f = a;
            a.gapiRequest && (f = a.gapiRequest);
            f && f.data && (f = f.data);
            g(f, c)
        })
    };
    _.Lm.prototype.add = function (a, c)
    {
        c = c ||
        {};
        var f = {}, g = window.Object.prototype.hasOwnProperty;
        if (a) f.qf = a;
        else
        {
            var h = "";
            g.call(c, "id") && (h = 'with ID "' + c.id + '" ');
            (0, _.m)("Batch entry " + h + "is missing a request method")
        } if (g.call(c, "id"))
        {
            g = c.id;
            for (h = 0; h < this.b.length; h++) this.b[h].id == g && (0, _.m)('Batch ID "' + g + '" already in use, please use another.');
            f.id = g
        }
        else
        {
            do f.id = (0, window.String)(2147483647 * (0, _.Vb)() | 0); while (g.call(this.b, f.id))
        }
        f.Ga = c.callback;
        this.b.push(f)
    };
    _.Lm.prototype.execute = function (a)
    {
        this.d = [];
        for (var c, f, g = 0; g < this.b.length; g++)
        {
            c = this.b[g];
            var h = f = c.qf,
                l = h.b.method;
            c = {
                jsonrpc: "2.0",
                id: c.id,
                method: l
            };
            var n = h.b.rpcParams;
            n && (c.params = n);
            l = l.substring(0, l.indexOf("."));
            c.apiVersion = h.b.apiVersion || _.Im[l] || "v1";
            this.d.push(c);
            this.i = (0, _.Nm)(f) || this.i
        }
        f = {};
        f = _.Bk.Md(f);
        (0, _.ym)(f);
        f = {
            requests: this.d,
            headers: f,
            root: this.i,
            clientName: (0, _.Am)(),
            clientVersion: (0, _.Cm)(),
            urlParams:
            {
                key: _.jm.key
            }
        };
        _.Bk.Dd("makeRequest", f, (0, _.Mm)(this, a))
    };
    _.Gm.prototype.execute = function (a)
    {
        var c = new _.Lm;
        c.add(this,
        {
            id: "gapiRpc",
            callback: (0, _.Om)(this, a)
        });
        c.execute()
    };
    _.Pm = {};
    _.Qm = 0;
    (0, _.Q)("gapi.client.load", function (a, c, f, g)
    {
        (!a || !c) && (0, _.m)("Missing required parameters.");
        var h = f || (0, _.x)();
        (0, _.Dm)(
        {
            path: (0, _.xm)(a, c),
            callback: function (f)
            {
                if (f.error) h(f);
                else
                {
                    var n = {};
                    n[a] = c;
                    (0, _.Hm)(n);
                    for (var q in f) if (f.hasOwnProperty(q) && "methods" == q)
                        {
                            var n = f[q],
                                t;
                            for (t in n) n.hasOwnProperty(t) && (0, _.Fm)(t, g)
                        }
                    h.call(_.s)
                }
            },
            root: g
        })
    });
    (0, _.Q)("gapi.client.newRpcBatch", function ()
    {
        return new _.Lm
    });
    (0, _.Q)("gapi.client.register", _.Fm);
    (0, _.Q)("gapi.client.request", _.Dm);
    (0, _.Q)("gapi.client.rpcRequest", function (a, c, f)
    {
        a || (0, _.m)("Missing required parameter method.");
        return new _.Gm(
        {
            method: a,
            apiVersion: c,
            rpcParams: f,
            transport:
            {
                name: "googleapis",
                root: f && f.root || ""
            }
        })
    });
    (0, _.Q)("gapi.client.setApiKey", _.gm);
    (0, _.Q)("gapi.client.setApiVersions", _.Hm);

})();

// Copyright 2002-2013 Google Inc.