(function ()
{
    function g(a)
    {
        throw a;
    }
    var h = void 0,
        l = !0,
        m = null,
        n = !1,
        q, aa = aa || {}, r = this,
        ba = function (a)
        {
            a = a.split(".");
            for (var b = r, c; c = a.shift();) if (b[c] != m) b = b[c];
                else return m;
            return b
        }, ca = function ()
        {}, da = function (a)
        {
            var b = typeof a;
            if ("object" == b) if (a)
                {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                }
                else return "null";
                else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        }, s = function (a)
        {
            return "array" == da(a)
        }, ea = function (a)
        {
            var b = da(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        }, t = function (a)
        {
            return "string" == typeof a
        }, fa = function (a)
        {
            return "function" == da(a)
        }, ga = function (a)
        {
            var b = typeof a;
            return "object" == b && a != m || "function" ==
                b
        }, ja = function (a)
        {
            return a[ha] || (a[ha] = ++ia)
        }, ha = "closure_uid_" + (1E9 * Math.random() >>> 0),
        ia = 0,
        ka = function (a, b, c)
        {
            return a.call.apply(a.bind, arguments)
        }, la = function (a, b, c)
        {
            a || g(Error());
            if (2 < arguments.length)
            {
                var d = Array.prototype.slice.call(arguments, 2);
                return function ()
                {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function ()
            {
                return a.apply(b, arguments)
            }
        }, u = function (a, b, c)
        {
            u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ?
                ka : la;
            return u.apply(m, arguments)
        }, ma = function (a, b)
        {
            var c = Array.prototype.slice.call(arguments, 1);
            return function ()
            {
                var b = Array.prototype.slice.call(arguments);
                b.unshift.apply(b, c);
                return a.apply(this, b)
            }
        }, v = Date.now || function ()
        {
            return +new Date
        }, w = function (a, b)
        {
            var c = a.split("."),
                d = r;
            !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());)!c.length && b !== h ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
        }, y = function (a, b)
        {
            function c()
            {}
            c.prototype = b.prototype;
            a.s = b.prototype;
            a.prototype = new c
        };
    Function.prototype.bind = Function.prototype.bind || function (a, b)
    {
        if (1 < arguments.length)
        {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return u.apply(m, c)
        }
        return u(this, a)
    };
    var na = function (a, b)
    {
        this.b = a;
        this.a = b
    }, oa = function (a, b, c)
        {
            var d = 2 < arguments.length ? Array.prototype.slice.call(arguments, 2) : [];
            return new na(
            {
                get: a,
                set: b,
                configurable: n,
                enumerable: l
            }, d)
        }, qa = function (a, b)
        {
            var c = 1 < arguments.length ? Array.prototype.slice.call(arguments, 1) : [];
            return new na(
            {
                get: a,
                set: pa,
                configurable: n,
                enumerable: l
            }, c)
        }, pa = function ()
        {
            g(Error("Cannot set read-only property"))
        }, ra = function (a)
        {
            for (var b = Object.getOwnPropertyNames(a), c = 0; c < b.length; c++)
            {
                var d = a[b[c]];
                if (d instanceof na)
                {
                    Object.defineProperty(a,
                        b[c], d.b);
                    for (var e = 0; e < d.a.length; e++) Object.defineProperty(a, d.a[e], d.b)
                }
            }
        };
    var sa = function (a)
    {
        Error.captureStackTrace ? Error.captureStackTrace(this, sa) : this.stack = Error().stack || "";
        a && (this.message = String(a))
    };
    y(sa, Error);
    sa.prototype.name = "CustomError";
    var ua = function (a)
    {
        sa.call(this, "Element " + a + " is already bound to a collaborative value.");
        this.a = a
    };
    y(ua, sa);
    ua.prototype.e = function ()
    {
        return this.a
    };
    ua.prototype.b = qa(ua.prototype.e, "domElement");
    ua.prototype.name = "AlreadyBoundError";
    w("gapi.drive.realtime.databinding.AlreadyBoundError", ua);
    w("gapi.drive.realtime.databinding.AlreadyBoundError.prototype.domElement", ua.prototype.b);
    ra(ua.prototype);
    var z = function ()
    {};
    z.prototype.aa = n;
    z.prototype.Ra = function ()
    {
        return this.aa
    };
    z.prototype.J = function ()
    {
        this.aa || (this.aa = l, this.p())
    };
    var va = function (a, b, c)
    {
        a.t || (a.t = []);
        a.t.push(u(b, c))
    };
    z.prototype.p = function ()
    {
        if (this.t) for (; this.t.length;) this.t.shift()()
    };
    var B = function (a)
    {
        a && "function" == typeof a.J && a.J()
    }, wa = function (a)
        {
            for (var b = 0, c = arguments.length; b < c; ++b)
            {
                var d = arguments[b];
                ea(d) ? wa.apply(m, d) : B(d)
            }
        };
    var xa = function (a, b)
    {
        return 0 == a.lastIndexOf(b, 0)
    }, ya = function (a)
        {
            var b = a.length - 1;
            return 0 <= b && a.indexOf("/", b) == b
        }, za = function (a, b)
        {
            for (var c = 1; c < arguments.length; c++)
            {
                var d = String(arguments[c]).replace(/\$/g, "$$$$");
                a = a.replace(/\%s/, d)
            }
            return a
        }, Fa = function (a)
        {
            if (!Aa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(Ba, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Ca, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Da, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Ea, "&quot;"));
            return a
        }, Ba = /&/g,
        Ca = /</g,
        Da =
            />/g,
        Ea = /\"/g,
        Aa = /[&<>\"]/;
    var Ga = function (a, b)
    {
        b.unshift(a);
        sa.call(this, za.apply(m, b));
        b.shift()
    };
    y(Ga, sa);
    Ga.prototype.name = "AssertionError";
    var Ha = function (a, b, c, d)
    {
        var e = "Assertion failed";
        if (c) var e = e + (": " + c),
        f = d;
        else a && (e += ": " + a, f = b);
        g(new Ga("" + e, f || []))
    }, C = function (a, b, c)
        {
            a || Ha("", m, b, Array.prototype.slice.call(arguments, 2))
        }, Ia = function (a, b)
        {
            g(new Ga("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
        }, Ja = function (a, b, c)
        {
            t(a) || Ha("Expected string but got %s: %s.", [da(a), a], b, Array.prototype.slice.call(arguments, 2));
            return a
        }, Ka = function (a, b, c)
        {
            s(a) || Ha("Expected array but got %s: %s.", [da(a), a], b, Array.prototype.slice.call(arguments,
                2))
        }, La = function (a, b, c, d)
        {
            a instanceof b || Ha("instanceof check failed.", m, c, Array.prototype.slice.call(arguments, 3))
        };
    var Ma = Array.prototype,
        Na = Ma.indexOf ? function (a, b, c)
        {
            C(a.length != m);
            return Ma.indexOf.call(a, b, c)
        } : function (a, b, c)
        {
            c = c == m ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (t(a)) return !t(b) || 1 != b.length ? -1 : a.indexOf(b, c);
            for (; c < a.length; c++) if (c in a && a[c] === b) return c;
            return -1
        }, Oa = Ma.forEach ? function (a, b, c)
        {
            C(a.length != m);
            Ma.forEach.call(a, b, c)
        } : function (a, b, c)
        {
            for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        }, Pa = Ma.some ? function (a, b, c)
        {
            C(a.length != m);
            return Ma.some.call(a, b, c)
        } : function (a,
            b, c)
        {
            for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return l;
            return n
        }, Qa = function (a, b)
        {
            var c;
            a: {
                c = a.length;
                for (var d = t(a) ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(h, d[e], e, a))
                    {
                        c = e;
                        break a
                    }
                c = -1
            }
            return 0 > c ? m : t(a) ? a.charAt(c) : a[c]
        }, Ra = function (a, b)
        {
            var c = Na(a, b);
            0 <= c && (C(a.length != m), Ma.splice.call(a, c, 1))
        }, Sa = function (a)
        {
            return Ma.concat.apply(Ma, arguments)
        }, Ta = function (a)
        {
            var b = a.length;
            if (0 < b)
            {
                for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
                return c
            }
            return []
        }, Ua = function (a,
            b)
        {
            for (var c = 1; c < arguments.length; c++)
            {
                var d = arguments[c],
                    e;
                if (s(d) || (e = ea(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) a.push.apply(a, d);
                else if (e) for (var f = a.length, k = d.length, p = 0; p < k; p++) a[f + p] = d[p];
                else a.push(d)
            }
        }, Va = function (a, b, c)
        {
            C(a.length != m);
            return 2 >= arguments.length ? Ma.slice.call(a, b) : Ma.slice.call(a, b, c)
        };
    var Wa = "StopIteration" in r ? r.StopIteration : Error("StopIteration"),
        Xa = function ()
        {};
    Xa.prototype.a = function ()
    {
        g(Wa)
    };
    Xa.prototype.Za = function ()
    {
        return this
    };
    var Ya = function (a)
    {
        if (a instanceof Xa) return a;
        if ("function" == typeof a.Za) return a.Za(n);
        if (ea(a))
        {
            var b = 0,
                c = new Xa;
            c.a = function ()
            {
                for (;;)
                {
                    b >= a.length && g(Wa);
                    if (b in a) return a[b++];
                    b++
                }
            };
            return c
        }
        g(Error("Not implemented"))
    }, Za = function (a, b)
        {
            if (ea(a)) try
                {
                    Oa(a, b, h)
            }
            catch (c)
            {
                c !== Wa && g(c)
            }
            else
            {
                a = Ya(a);
                try
                {
                    for (;;) b.call(h, a.a(), h, a)
                }
                catch (d)
                {
                    d !== Wa && g(d)
                }
            }
        };
    var ab = function (a)
    {
        var b = $a,
            c;
        for (c in b) a.call(h, b[c], c, b)
    }, bb = function (a)
        {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b
        }, cb = function (a)
        {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        }, db = function (a)
        {
            var b = {}, c;
            for (c in a) b[c] = a[c];
            return b
        }, eb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        fb = function (a, b)
        {
            for (var c, d, e = 1; e < arguments.length; e++)
            {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < eb.length; f++) c = eb[f], Object.prototype.hasOwnProperty.call(d,
                        c) && (a[c] = d[c])
            }
        };
    var gb = function (a)
    {
        if ("function" == typeof a.I) return a.I();
        if (t(a)) return a.split("");
        if (ea(a))
        {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return bb(a)
    }, hb = function (a, b, c)
        {
            if ("function" == typeof a.forEach) a.forEach(b, c);
            else if (ea(a) || t(a)) Oa(a, b, c);
            else
            {
                var d;
                if ("function" == typeof a.$) d = a.$();
                else if ("function" != typeof a.I) if (ea(a) || t(a))
                    {
                        d = [];
                        for (var e = a.length, f = 0; f < e; f++) d.push(f)
                    }
                    else d = cb(a);
                    else d = h;
                for (var e = gb(a), f = e.length, k = 0; k < f; k++) b.call(c, e[k], d && d[k], a)
            }
        };
    var ib = function (a, b)
    {
        this.b = {};
        this.a = [];
        var c = arguments.length;
        if (1 < c)
        {
            c % 2 && g(Error("Uneven number of arguments"));
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        }
        else if (a)
        {
            a instanceof ib ? (c = a.$(), d = a.I()) : (c = cb(a), d = bb(a));
            for (var e = 0; e < c.length; e++) this.set(c[e], d[e])
        }
    };
    q = ib.prototype;
    q.o = 0;
    q.Va = 0;
    q.Ca = function ()
    {
        return this.o
    };
    q.I = function ()
    {
        jb(this);
        for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
        return a
    };
    q.$ = function ()
    {
        jb(this);
        return this.a.concat()
    };
    q.$a = function ()
    {
        return 0 == this.o
    };
    q.clear = function ()
    {
        this.b = {};
        this.Va = this.o = this.a.length = 0
    };
    var lb = function (a, b)
    {
        kb(a.b, b) && (delete a.b[b], a.o--, a.Va++, a.a.length > 2 * a.o && jb(a))
    }, jb = function (a)
        {
            if (a.o != a.a.length)
            {
                for (var b = 0, c = 0; b < a.a.length;)
                {
                    var d = a.a[b];
                    kb(a.b, d) && (a.a[c++] = d);
                    b++
                }
                a.a.length = c
            }
            if (a.o != a.a.length)
            {
                for (var e = {}, c = b = 0; b < a.a.length;) d = a.a[b], kb(e, d) || (a.a[c++] = d, e[d] = 1), b++;
                a.a.length = c
            }
        };
    ib.prototype.get = function (a, b)
    {
        return kb(this.b, a) ? this.b[a] : b
    };
    ib.prototype.set = function (a, b)
    {
        kb(this.b, a) || (this.o++, this.a.push(a), this.Va++);
        this.b[a] = b
    };
    ib.prototype.D = function ()
    {
        return new ib(this)
    };
    ib.prototype.Za = function (a)
    {
        jb(this);
        var b = 0,
            c = this.a,
            d = this.b,
            e = this.Va,
            f = this,
            k = new Xa;
        k.a = function ()
        {
            for (;;)
            {
                e != f.Va && g(Error("The map has changed since the iterator was created"));
                b >= c.length && g(Wa);
                var k = c[b++];
                return a ? k : d[k]
            }
        };
        return k
    };
    var kb = function (a, b)
    {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var mb = function (a)
    {
        this.a = new ib;
        if (a)
        {
            a = gb(a);
            for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
        }
    }, nb = function (a)
        {
            var b = typeof a;
            return "object" == b && a || "function" == b ? "o" + ja(a) : b.substr(0, 1) + a
        };
    q = mb.prototype;
    q.Ca = function ()
    {
        return this.a.Ca()
    };
    q.add = function (a)
    {
        this.a.set(nb(a), a)
    };
    q.clear = function ()
    {
        this.a.clear()
    };
    q.$a = function ()
    {
        return this.a.$a()
    };
    q.contains = function (a)
    {
        a = nb(a);
        return kb(this.a.b, a)
    };
    q.I = function ()
    {
        return this.a.I()
    };
    q.D = function ()
    {
        return new mb(this)
    };
    q.Za = function ()
    {
        return this.a.Za(n)
    };
    var pb = function (a, b)
    {
        this.e = a;
        this.f = b;
        ob.contains(b) && g(new ua(b));
        ob.add(b);
        va(this, function ()
        {
            lb(ob.a, nb(b))
        })
    };
    y(pb, z);
    var ob = new mb;
    q = pb.prototype;
    q.fd = function ()
    {
        this.J()
    };
    q.p = function ()
    {
        pb.s.p.call(this)
    };
    q.ed = function ()
    {
        return this.f
    };
    q.gd = function ()
    {
        return this.e
    };
    q.dd = qa(pb.prototype.ed, "domElement");
    q.$c = qa(pb.prototype.gd, "collaborativeObject");
    w("gapi.drive.realtime.databinding.Binding", pb);
    w("gapi.drive.realtime.databinding.Binding.prototype.unbind", pb.prototype.fd);
    w("gapi.drive.realtime.databinding.Binding.prototype.domElement", pb.prototype.dd);
    w("gapi.drive.realtime.databinding.Binding.prototype.collaborativeObject", pb.prototype.$c);
    ra(pb.prototype);
    var D = function (a, b)
    {
        ("number" != typeof a || Math.floor(a) !== a) && g(new TypeError("Expected integer for " + b + ", but was: " + a));
        return a
    }, qb = function (a)
        {
            "boolean" !== typeof a && g(new TypeError("Expected boolean for canBeDeleted, but was: " + a))
        }, rb = function (a, b)
        {
            "string" !== typeof a && g(new TypeError("Expected string for " + b + ", but was: " + a))
        };
    var sb = function ()
    {
        sa.call(this, "Document is closed.")
    };
    y(sb, sa);
    sb.prototype.name = "DocumentClosedError";
    var E = function ()
    {
        this.e = {};
        va(this, this.G, this)
    };
    y(E, z);
    E.prototype.addEventListener = function (a, b, c)
    {
        this.j();
        rb(a, "type");
        c = c || n;
        a in this.e || (this.e[a] = {});
        a = this.e[a];
        c in a || (a[c] = new mb);
        a[c].add(b)
    };
    E.prototype.removeEventListener = function (a, b, c)
    {
        this.j();
        rb(a, "type");
        a = tb(this, a, c || n);
        a != m && lb(a.a, nb(b))
    };
    var tb = function (a, b, c)
    {
        return b in a.e && (a = a.e[b], c in a) ? a[c] : m
    };
    E.prototype.Fa = function ()
    {
        return m
    };
    E.prototype.dispatchEvent = function (a)
    {
        var b = m;
        if (a.r)
        {
            b = [];
            b.push(this);
            for (var c = new mb; 0 < b.length;)
            {
                var d = b.shift().Fa();
                if (d != m) for (var e = 0; e < d.length; e++)
                    {
                        var f = d[e];
                        c.contains(f) || (c.add(f), b.push(f))
                }
            }
            b = c.I()
        }
        c = l;
        if (b) for (d = b.length - 1; !a.e && 0 <= d; d--) a.a = b[d], c = ub(a.a, a.type, l, a) && c;
        if (a.e) return c;
        a.a = a.b;
        c = ub(a.a, a.type, l, a) && c;
        if (a.e) return c;
        c = ub(a.a, a.type, n, a) && c;
        if (b) for (d = 0; !a.e && d < b.length; d++) a.a = b[d], c = ub(a.a, a.type, n, a) && c;
        return c
    };
    E.prototype.j = function ()
    {
        this.Ra() && g(new sb)
    };
    var ub = function (a, b, c, d)
    {
        var e = l;
        a = tb(a, b, c);
        if (a == m) return l;
        a = a.I();
        for (b = 0; b < a.length; b++)
        {
            c = a[b];
            try
            {
                e = "handleEvent" in c ? c.handleEvent(d) !== n && e : c(d) !== n && e
            }
            catch (f)
            {
                window.console.error("Error in listener function: " + f)
            }
        }
        return e && d.g != n
    };
    E.prototype.G = function ()
    {
        this.e = {}
    };
    w("gapi.drive.realtime.EventTarget.prototype.addEventListener", E.prototype.addEventListener);
    w("gapi.drive.realtime.EventTarget.prototype.removeEventListener", E.prototype.removeEventListener);
    var G = function (a, b)
    {
        this.type = a;
        this.a = this.b = b
    };
    G.prototype.J = function ()
    {};
    G.prototype.e = n;
    G.prototype.g = l;
    G.prototype.i = function ()
    {
        this.g = n
    };
    var H = function (a, b, c, d, e, f)
    {
        G.call(this, a, b);
        this.k = c;
        this.f = d;
        this.H = e;
        this.r = f;
        this.sessionId = this.k;
        this.userId = this.f;
        this.isLocal = this.H;
        this.type = this.type;
        this.target = this.b
    };
    y(H, G);
    w("gapi.drive.realtime.BaseModelEvent", H);
    var vb = {
        rd: "object_changed",
        zd: "values_set",
        xd: "values_added",
        yd: "values_removed",
        Ad: "value_changed",
        vd: "text_inserted",
        ud: "text_deleted",
        kd: "collaborator_joined",
        ld: "collaborator_left",
        sd: "reference_shifted",
        nd: "document_save_state_changed"
    };
    w("gapi.drive.realtime.EventType", vb);
    vb.OBJECT_CHANGED = "object_changed";
    vb.VALUES_SET = "values_set";
    vb.VALUES_ADDED = "values_added";
    vb.VALUES_REMOVED = "values_removed";
    vb.VALUE_CHANGED = "value_changed";
    vb.TEXT_INSERTED = "text_inserted";
    vb.TEXT_DELETED = "text_deleted";
    vb.COLLABORATOR_JOINED = "collaborator_joined";
    vb.COLLABORATOR_LEFT = "collaborator_left";
    vb.REFERENCE_SHIFTED = "reference_shifted";
    vb.DOCUMENT_SAVE_STATE_CHANGED = "document_save_state_changed";
    var wb = function (a, b, c, d, e, f)
    {
        H.call(this, "reference_shifted", a, d, e, f, n);
        this.oldIndex = this.l = b;
        this.newIndex = this.h = c
    };
    y(wb, H);
    w("gapi.drive.realtime.ReferenceShiftedEvent", wb);
    var xb = function (a, b)
    {
        return new wb(a, b.oldIndex, b.newIndex, b.sessionId, b.userId, b.local)
    };
    w("gapi.drive.realtime.ReferenceShiftedEvent", wb);
    var yb = function (a, b, c, d, e, f)
    {
        H.call(this, "values_added", a, b, c, d, n);
        this.index = this.index = e;
        this.values = this.h = f
    };
    y(yb, H);
    w("gapi.drive.realtime.ValuesAddedEvent", yb);
    var Ab = function (a, b, c)
    {
        return new yb(a, c.sessionId, c.userId, c.local, c.index, zb(b, c.values) || [])
    }, Bb = function (a, b, c, d, e, f)
        {
            H.call(this, "values_removed", a, b, c, d, n);
            this.index = this.index = e;
            this.values = this.h = f
        };
    y(Bb, H);
    w("gapi.drive.realtime.ValuesRemovedEvent", Bb);
    var Cb = function (a, b, c)
    {
        return new Bb(a, c.sessionId, c.userId, c.local, c.index, zb(b, c.values) || [])
    }, Db = function (a, b, c, d, e, f, k)
        {
            H.call(this, "values_set", a, b, c, d, n);
            this.index = this.index = e;
            this.oldValues = this.l = f;
            this.newValues = this.h = k
        };
    y(Db, H);
    w("gapi.drive.realtime.ValuesSetEvent", Db);
    var Eb = function (a, b, c)
    {
        return new Db(a, c.sessionId, c.userId, c.local, c.index, zb(b, c.oldValues) || [], zb(b, c.newValues) || [])
    };
    var Fb = function (a, sessionId, userId, local, e, f)
    {
        H.call(this, "text_inserted", a, sessionId, userId, local, n);
        this.index = this.index = e;
        this.text = this.h = f
    };
    y(Fb, H);
    w("gapi.drive.realtime.TextInsertedEvent", Fb);
    w("gapi.drive.realtime.TextInsertedEvent", Fb);
    var Hb = function (a, b, c)
    {
        return new Fb(a, c.sessionId, c.userId, c.local, c.index, Gb(b, c.text))
    }, Ib = function (a, b, c, d, e, f)
        {
            H.call(this, "text_deleted", a, b, c, d, n);
            this.index = this.index = e;
            this.text = this.h = f
        };
    y(Ib, H);
    w("gapi.drive.realtime.TextDeletedEvent", Ib);
    w("gapi.drive.realtime.TextDeletedEvent", Ib);
    var Jb = function (a, b, c)
    {
        return new Ib(a, c.sessionId, c.userId, c.local, c.index, Gb(b, c.text))
    };
    var Kb = function (a, b, c, d, e, newValue, oldValue)
    {
        H.call(this, "value_changed", a, b, c, d, n);
        this.property = this.h = e;
        this.newValue = this.l = newValue;
        this.oldValue = this.t = oldValue
    };
    y(Kb, H);
    w("gapi.drive.realtime.ValueChangedEvent", Kb);
    var Lb = function (a, b, c)
    {
        var d = Gb(b, c.oldValue);
        b = Gb(b, c.newValue);
        return new Kb(a, c.sessionId, c.userId, c.local, c.property, b, d)
    };
    var Mb = function (a, b, c, d, e)
    {
        H.call(this, "object_changed", a, b, c, d, l);
        this.events = this.h = e
    };
    y(Mb, H);
    w("gapi.drive.realtime.ObjectChangedEvent", Mb);
    var Nb = function (a, b)
    {
        for (var c = b.source, d = b.events, e = [], f = 0; f < d.length; f++)
        {
            var k = d[f];
            "values_set" === k.type ? e.push(Eb(c, a, k)) : "values_added" === k.type ? e.push(Ab(c, a, k)) : "values_removed" === k.type ? e.push(Cb(c, a, k)) : "value_changed" === k.type ? e.push(Lb(c, a, k)) : "text_inserted" === k.type ? e.push(Hb(c, a, k)) : "text_deleted" === k.type ? e.push(Jb(c, a, k)) : "reference_shifted" === k.type ? e.push(xb(c, k)) : "object_changed" === k.type && (k = Nb(a, k), e.push(k))
        }
        return new Mb(Gb(a, b.source), b.sessionId, b.userId, b.local, e)
    };
    w("gapi.drive.realtime.ObjectChangedEvent", Mb);
    var I = function (a)
    {
        E.call(this);
        this.a = a;
        this.g = n
    };
    y(I, E);
    var Ob = function (a)
    {
        a.f(function (b)
        {
            a.dispatchEvent(b)
        })
    }, J = function (a)
        {
            a = Pb(a.a, a);
            a == m && g(Error("Expected associated GWT object"));
            return a
        }, K = function (a)
        {
            return a.a.a
        };
    I.prototype.r = function ()
    {
        var a = J(this);
        return this.a.a.a.getId(a)
    };
    I.prototype.f = function (a)
    {
        var b = this,
            c = Qb(K(this), J(this), function (c)
            {
                a(Nb(b.a, c))
            });
        K(this).bind(a, c)
    };
    w("gapi.drive.realtime.CollaborativeObject.prototype.addObjectChangedListener_", I.prototype.f);
    q = I.prototype;
    q.Fa = function ()
    {
        return K(this).Fa(J(this))
    };
    q.addEventListener = function (a, b, c)
    {
        this.g || (this.g = l, this.ca());
        return I.s.addEventListener.call(this, a, b, c)
    };
    q.ca = function ()
    {};
    q.toString = function ()
    {
        this.j();
        var a = J(this);
        return !a ? "" + a : K(this).a.objToString(a)
    };
    q.id = qa(I.prototype.r, "id");
    w("gapi.drive.realtime.CollaborativeObject.prototype.toString", I.prototype.toString);
    w("gapi.drive.realtime.CollaborativeObject.prototype.id", I.prototype.id);
    ra(I.prototype);
    var L = function (a)
    {
        I.call(this, a)
    };
    y(L, I);
    w("gapi.drive.realtime.CollaborativeString", L);
    L.prototype.h = function ()
    {
        this.j();
        var a = J(this);
        return K(this).a.getStringLength(a)
    };
    L.prototype.b = function ()
    {
        this.j();
        var a = J(this);
        return K(this).a.getText(a)
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.getText", L.prototype.b);
    L.prototype.Ua = function (a)
    {
        this.j();
        rb(a, "text");
        K(this).Ua(J(this), a)
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.setText", L.prototype.Ua);
    L.prototype.k = function (a)
    {
        this.j();
        rb(a, "text");
        this.i(this.h(), a)
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.append", L.prototype.k);
    L.prototype.i = function (a, b)
    {
        this.j();
        D(a, "index");
        rb(b, "text");
        var c = J(this);
        K(this).a.insertString(c, a, b)
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.insertString", L.prototype.i);
    L.prototype.q = function (a, b)
    {
        this.j();
        D(a, "startIndex");
        D(b, "endIndex");
        var c = J(this);
        K(this).a.removeStringRange(c, a, b)
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.removeRange", L.prototype.q);
    L.prototype.l = function (a, b)
    {
        this.j();
        D(a, "index");
        qb(b);
        return Rb(this.a, J(this), a, b)
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.registerReference", L.prototype.l);
    var Tb = function (a, b)
    {
        var c = Sb(K(a), J(a), function (c)
        {
            b(Hb(a, a.a, c))
        });
        K(a).bind(b, c)
    }, Vb = function (a, b)
        {
            var c = Ub(K(a), J(a), function (c)
            {
                b(Jb(a, a.a, c))
            });
            K(a).bind(b, c)
        };
    L.prototype.toString = function ()
    {
        return this.b()
    };
    w("gapi.drive.realtime.CollaborativeString.prototype.toString", L.prototype.toString);
    L.prototype.length = qa(L.prototype.h);
    w("gapi.drive.realtime.CollaborativeString.prototype.length", L.prototype.length);
    L.prototype.ca = function ()
    {
        L.s.ca.call(this);
        var a = this;
        Tb(this, function (b)
        {
            a.dispatchEvent(b)
        });
        Vb(this, function (b)
        {
            a.dispatchEvent(b)
        })
    };
    ra(L.prototype);
    var Wb = function (a)
    {
        Wb[" "](a);
        return a
    };
    Wb[" "] = ca;
    var Xb, Yb, Zb, $b, ac = function ()
        {
            return r.navigator ? r.navigator.userAgent : m
        }, bc = function ()
        {
            return r.navigator
        };
    $b = Zb = Yb = Xb = n;
    var cc;
    if (cc = ac())
    {
        var dc = bc();
        Xb = 0 == cc.indexOf("Opera");
        Yb = !Xb && -1 != cc.indexOf("MSIE");
        (Zb = !Xb && -1 != cc.indexOf("WebKit")) && cc.indexOf("Mobile");
        $b = !Xb && !Zb && "Gecko" == dc.product
    }
    var ec = Xb,
        M = Yb,
        fc = $b,
        gc = Zb,
        hc = bc(),
        ic = hc && hc.platform || "";
    ic.indexOf("Mac");
    ic.indexOf("Win");
    ic.indexOf("Linux");
    bc() && (bc().appVersion || "").indexOf("X11");
    var jc = ac();
    jc && jc.indexOf("Android");
    jc && jc.indexOf("iPhone");
    jc && jc.indexOf("iPad");
    var kc = function ()
    {
        var a = r.document;
        return a ? a.documentMode : h
    }, lc;
    a: {
        var mc = "",
            nc;
        if (ec && r.opera) var oc = r.opera.version,
        mc = "function" == typeof oc ? oc() : oc;
        else if (fc ? nc = /rv\:([^\);]+)(\)|;)/ : M ? nc = /MSIE\s+([^\);]+)(\)|;)/ : gc && (nc = /WebKit\/(\S+)/), nc) var pc = nc.exec(ac()),
        mc = pc ? pc[1] : "";
        if (M)
        {
            var qc = kc();
            if (qc > parseFloat(mc))
            {
                lc = String(qc);
                break a
            }
        }
        lc = mc
    }
    var rc = lc,
        sc = {}, tc = function (a)
        {
            var b;
            if (!(b = sc[a]))
            {
                b = 0;
                for (var c = String(rc).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++)
                {
                    var k = c[f] || "",
                        p = d[f] || "",
                        A = RegExp("(\\d*)(\\D*)", "g"),
                        F = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var x = A.exec(k) || ["", "", ""],
                            T = F.exec(p) || ["", "", ""];
                        if (0 == x[0].length && 0 == T[0].length) break;
                        b = ((0 == x[1].length ? 0 : parseInt(x[1], 10)) < (0 == T[1].length ? 0 : parseInt(T[1], 10)) ? -1 : (0 == x[1].length ?
                            0 : parseInt(x[1], 10)) > (0 == T[1].length ? 0 : parseInt(T[1], 10)) ? 1 : 0) || ((0 == x[2].length) < (0 == T[2].length) ? -1 : (0 == x[2].length) > (0 == T[2].length) ? 1 : 0) || (x[2] < T[2] ? -1 : x[2] > T[2] ? 1 : 0)
                    } while (0 == b)
                }
                b = sc[a] = 0 <= b
            }
            return b
        }, uc = r.document,
        vc = !uc || !M ? h : kc() || ("CSS1Compat" == uc.compatMode ? parseInt(rc, 10) : 5);
    var wc = !M || M && 9 <= vc,
        xc = M && !tc("9");
    !gc || tc("528");
    fc && tc("1.9b") || M && tc("8") || ec && tc("9.5") || gc && tc("528");
    fc && !tc("8") || M && tc("9");
    var zc = function (a, b)
    {
        a && yc(this, a, b)
    };
    y(zc, G);
    zc.prototype.b = m;
    zc.prototype.f = m;
    var yc = function (a, b, c)
    {
        var d = a.type = b.type;
        G.call(a, d);
        a.b = b.target || b.srcElement;
        a.a = c;
        if ((c = b.relatedTarget) && fc) try
            {
                Wb(c.nodeName)
        }
        catch (e)
        {}
        a.f = b;
        b.defaultPrevented && a.i();
        delete a.e
    };
    zc.prototype.i = function ()
    {
        zc.s.i.call(this);
        var a = this.f;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = n, xc) try
            {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        }
        catch (b)
        {}
    };
    var Ac = 0;
    var Bc = function ()
    {};
    Bc.prototype.key = 0;
    Bc.prototype.ua = n;
    Bc.prototype.Ea = n;
    Bc.prototype.handleEvent = function (a)
    {
        return this.a ? this.la.call(this.Rb || this.src, a) : this.la.handleEvent.call(this.la, a)
    };
    var $a = {}, Cc = {}, Dc = {}, Ec = {}, Fc = function (a, b, c, d, e)
        {
            if (s(b))
            {
                for (var f = 0; f < b.length; f++) Fc(a, b[f], c, d, e);
                return m
            }
            a = Gc(a, b, c, n, d, e);
            b = a.key;
            $a[b] = a;
            return b
        }, Gc = function (a, b, c, d, e, f)
        {
            b || g(Error("Invalid event type"));
            e = !! e;
            var k = Cc;
            b in k || (k[b] = {
                o: 0,
                K: 0
            });
            k = k[b];
            e in k || (k[e] = {
                o: 0,
                K: 0
            }, k.o++);
            var k = k[e],
                p = ja(a),
                A;
            k.K++;
            if (k[p])
            {
                A = k[p];
                for (var F = 0; F < A.length; F++) if (k = A[F], k.la == c && k.Rb == f)
                    {
                        if (k.ua) break;
                        d || (A[F].Ea = n);
                        return A[F]
                    }
            }
            else A = k[p] = [], k.o++;
            var F = Hc(),
                x = k = new Bc;
            fa(c) ? x.a = l : c && c.handleEvent &&
                fa(c.handleEvent) ? x.a = n : g(Error("Invalid listener argument"));
            x.la = c;
            x.b = F;
            x.src = a;
            x.type = b;
            x.capture = !! e;
            x.Rb = f;
            x.Ea = n;
            x.key = ++Ac;
            x.ua = n;
            k.Ea = d;
            F.src = a;
            F.la = k;
            A.push(k);
            Dc[p] || (Dc[p] = []);
            Dc[p].push(k);
            a.addEventListener ? a == r || !a.customEvent_ ? a.addEventListener(b, F, e) : Ic(a) : a.attachEvent(b in Ec ? Ec[b] : Ec[b] = "on" + b, F);
            return k
        }, Hc = function ()
        {
            var a = Jc,
                b = wc ? function (c)
                {
                    return a.call(b.src, b.la, c)
                } : function (c)
                {
                    c = a.call(b.src, b.la, c);
                    if (!c) return c
                };
            return b
        }, Kc = function (a, b, c, d, e)
        {
            if (s(b))
            {
                for (var f =
                    0; f < b.length; f++) Kc(a, b[f], c, d, e);
                return m
            }
            a = Gc(a, b, c, l, d, e);
            b = a.key;
            $a[b] = a;
            return b
        }, Lc = function (a, b, c, d, e)
        {
            if (s(b)) for (var f = 0; f < b.length; f++) Lc(a, b[f], c, d, e);
            else
            {
                d = !! d;
                a: {
                    f = Cc;
                    if (b in f && (f = f[b], d in f && (f = f[d], a = ja(a), f[a])))
                    {
                        a = f[a];
                        break a
                    }
                    a = m
                }
                if (a) for (f = 0; f < a.length; f++) if (a[f].la == c && a[f].capture == d && a[f].Rb == e)
                        {
                            Mc(a[f].key);
                            break
                        }
            }
        }, Mc = function (a)
        {
            var b = $a[a];
            if (!b || b.ua) return n;
            var c = b.src,
                d = b.type,
                e = b.b,
                f = b.capture;
            c.removeEventListener ? (c == r || !c.customEvent_) && c.removeEventListener(d,
                e, f) : c.detachEvent && c.detachEvent(d in Ec ? Ec[d] : Ec[d] = "on" + d, e);
            c = ja(c);
            Dc[c] && (e = Dc[c], Ra(e, b), 0 == e.length && delete Dc[c]);
            b.ua = l;
            if (b = Cc[d][f][c]) b.wc = l, Nc(d, f, c, b);
            delete $a[a];
            return l
        }, Nc = function (a, b, c, d)
        {
            if (!d.tb && d.wc)
            {
                for (var e = 0, f = 0; e < d.length; e++) d[e].ua ? d[e].b.src = m : (e != f && (d[f] = d[e]), f++);
                d.length = f;
                d.wc = n;
                0 == f && (delete Cc[a][b][c], Cc[a][b].o--, 0 == Cc[a][b].o && (delete Cc[a][b], Cc[a].o--), 0 == Cc[a].o && delete Cc[a])
            }
        }, Oc = function (a)
        {
            var b = 0;
            if (a != m)
            {
                if (a = ja(a), Dc[a])
                {
                    a = Dc[a];
                    for (var c = a.length -
                        1; 0 <= c; c--) Mc(a[c].key), b++
                }
            }
            else ab(function (a, c)
                {
                    Mc(c);
                    b++
                })
        }, Qc = function (a, b, c, d, e)
        {
            var f = 1;
            b = ja(b);
            if (a[b])
            {
                var k = --a.K,
                    p = a[b];
                p.tb ? p.tb++ : p.tb = 1;
                try
                {
                    for (var A = p.length, F = 0; F < A; F++)
                    {
                        var x = p[F];
                        x && !x.ua && (f &= Pc(x, e) !== n)
                    }
                }
                finally
                {
                    a.K = Math.max(k, a.K), p.tb--, Nc(c, d, b, p)
                }
            }
            return Boolean(f)
        }, Pc = function (a, b)
        {
            a.Ea && Mc(a.key);
            return a.handleEvent(b)
        }, Jc = function (a, b)
        {
            if (a.ua) return l;
            var c = a.type,
                d = Cc;
            if (!(c in d)) return l;
            var d = d[c],
                e, f;
            if (!wc)
            {
                e = b || ba("window.event");
                var k = l in d,
                    p = n in d;
                if (k)
                {
                    if (0 >
                        e.keyCode || e.returnValue != h) return l;
                    a: {
                        var A = n;
                        if (0 == e.keyCode) try
                            {
                                e.keyCode = -1;
                                break a
                        }
                        catch (F)
                        {
                            A = l
                        }
                        if (A || e.returnValue == h) e.returnValue = l
                    }
                }
                A = new zc;
                yc(A, e, this);
                e = l;
                try
                {
                    if (k)
                    {
                        for (var x = [], T = A.a; T; T = T.parentNode) x.push(T);
                        f = d[l];
                        f.K = f.o;
                        for (var ta = x.length - 1; !A.e && 0 <= ta && f.K; ta--) A.a = x[ta], e &= Qc(f, x[ta], c, l, A);
                        if (p)
                        {
                            f = d[n];
                            f.K = f.o;
                            for (ta = 0; !A.e && ta < x.length && f.K; ta++) A.a = x[ta], e &= Qc(f, x[ta], c, n, A)
                        }
                    }
                    else e = Pc(a, A)
                }
                finally
                {
                    x && (x.length = 0)
                }
                return e
            }
            c = new zc(b, this);
            return e = Pc(a, c)
        }, Rc = 0,
        N = function (a)
        {
            return a +
                "_" + Rc++
        };
    var Sc = function (a, b)
    {
        pb.call(this, a, b);
        this.b = a;
        this.a = b;
        var c = Fc(this.a, "input", this.jc, n, this);
        va(this, function ()
        {
            Mc(c)
        });
        if (M && !(M && 10 <= vc))
        {
            var d = Fc(this.a, "focus", this.mc, n, this);
            va(this, function ()
            {
                Mc(d)
            });
            var e = Fc(this.a, "blur", this.mc, n, this);
            va(this, function ()
            {
                Mc(e)
            })
        }
        var f = u(this.Qc, this);
        a.addEventListener("text_inserted", f);
        va(this, function ()
        {
            a.removeEventListener("text_inserted", f)
        });
        var k = u(this.Pc, this);
        a.addEventListener("text_deleted", k);
        va(this, function ()
        {
            a.removeEventListener("text_deleted",
                k)
        })
    };
    y(Sc, pb);
    q = Sc.prototype;
    q.qb = n;
    q.jc = function ()
    {
        this.qb = l;
        this.b.Ua(this.a.value);
        this.qb = n
    };
    q.mc = function (a)
    {
        "focus" == a.type ? this.g = Fc(document, "selectionchange", this.jc, n, this) : Mc(this.g)
    };
    q.Qc = function (a)
    {
        this.qb || Tc(this, a.index, a.h.length)
    };
    q.Pc = function (a)
    {
        this.qb || Tc(this, a.index, -a.h.length)
    };
    var Tc = function (a, b, c)
    {
        if (document.activeElement != a.a) a.a.value = a.b.b();
        else
        {
            var d = a.a.selectionStart,
                e = a.a.selectionEnd;
            if (0 < c) b <= d && (d += c), b < e && (e += c);
            else
            {
                var f = b + -c;
                f <= d ? d += c : b < d && (d = b);
                f <= e ? e += c : b < e && (e = b)
            }
            a.a.value = a.b.b();
            a.a.setSelectionRange(d, e)
        }
    };
    w("gapi.drive.realtime.databinding.StringBinding", Sc);
    w("gapi.drive.realtime.databinding.bindString", function (a, b)
    {
        a instanceof L || g(new TypeError("Expected CollaborativeString for string, but was: " + a + "."));
        b instanceof Element || g(new TypeError("Expected Element for textInputElement, but was: " + b));
        "textarea" == b.type || "text" == b.type || g(new TypeError("Expected text or textarea element for string, but was: " + b + "."));
        b.value = a.b();
        return new Sc(a, b)
    });
    var Vc = function (a)
    {
        return Uc(a || arguments.callee.caller, [])
    }, Uc = function (a, b)
        {
            var c = [];
            if (0 <= Na(b, a)) c.push("[...circular reference...]");
            else if (a && 50 > b.length)
            {
                c.push(Wc(a) + "(");
                for (var d = a.arguments, e = 0; e < d.length; e++)
                {
                    0 < e && c.push(", ");
                    var f;
                    f = d[e];
                    switch (typeof f)
                    {
                        case "object":
                            f = f ? "object" : "null";
                            break;
                        case "string":
                            break;
                        case "number":
                            f = String(f);
                            break;
                        case "boolean":
                            f = f ? "true" : "false";
                            break;
                        case "function":
                            f = (f = Wc(f)) ? f : "[fn]";
                            break;
                        default:
                            f = typeof f
                    }
                    40 < f.length && (f = f.substr(0, 40) + "...");
                    c.push(f)
                }
                b.push(a);
                c.push(")\n");
                try
                {
                    c.push(Uc(a.caller, b))
                }
                catch (k)
                {
                    c.push("[exception trying to get caller]\n")
                }
            }
            else a ? c.push("[...long stack...]") : c.push("[end]");
            return c.join("")
        }, Wc = function (a)
        {
            if (Xc[a]) return Xc[a];
            a = String(a);
            if (!Xc[a])
            {
                var b = /function ([^\(]+)/.exec(a);
                Xc[a] = b ? b[1] : "[Anonymous]"
            }
            return Xc[a]
        }, Xc = {};
    var Zc = function (a, b, c, d, e)
    {
        "number" == typeof e || Yc++;
        d || v();
        this.e = b;
        delete this.b;
        delete this.a
    };
    Zc.prototype.b = m;
    Zc.prototype.a = m;
    var Yc = 0;
    var $c = function ()
    {};
    $c.prototype.a = m;
    $c.prototype.e = m;
    $c.prototype.b = m;
    var ad = function (a, b)
    {
        this.name = a;
        this.value = b
    };
    ad.prototype.toString = function ()
    {
        return this.name
    };
    var bd = new ad("SEVERE", 1E3),
        cd = new ad("WARNING", 900),
        dd = new ad("INFO", 800),
        ed = new ad("CONFIG", 700),
        fd = new ad("FINE", 500),
        gd = function (a)
        {
            if (a.e) return a.e;
            if (a.a) return gd(a.a);
            Ia("Root logger has no level set.");
            return m
        };
    $c.prototype.log = function (a, b, c)
    {
        if (a.value >= gd(this).value)
        {
            a = "log:" + this.f(a, b, c).e;
            r.console && (r.console.timeStamp ? r.console.timeStamp(a) : r.console.markTimeline && r.console.markTimeline(a));
            r.msWriteProfilerMark && r.msWriteProfilerMark(a);
            for (a = this; a;) a = a.a
        }
    };
    $c.prototype.f = function (a, b, c)
    {
        var d = new Zc(0, String(b));
        if (c)
        {
            d.b = c;
            var e;
            var f = arguments.callee.caller;
            try
            {
                var k;
                var p = ba("window.location.href");
                if (t(c)) k = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: p,
                        stack: "Not available"
                };
                else
                {
                    var A, F, x = n;
                    try
                    {
                        A = c.lineNumber || c.hd || "Not available"
                    }
                    catch (T)
                    {
                        A = "Not available", x = l
                    }
                    try
                    {
                        F = c.fileName || c.filename || c.sourceURL || r.$googDebugFname || p
                    }
                    catch (ta)
                    {
                        F = "Not available", x = l
                    }
                    k = x || !c.lineNumber || !c.fileName || !c.stack ? {
                        message: c.message,
                        name: c.name,
                        lineNumber: A,
                        fileName: F,
                        stack: c.stack || "Not available"
                    } : c
                }
                e = "Message: " + Fa(k.message) + '\nUrl: <a href="view-source:' + k.fileName + '" target="_new">' + k.fileName + "</a>\nLine: " + k.lineNumber + "\n\nBrowser stack:\n" + Fa(k.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + Fa(Vc(f) + "-> ")
            }
            catch (zh)
            {
                e = "Exception trying to expose exception! You win, we lose. " + zh
            }
            d.a = e
        }
        return d
    };
    var hd = function (a, b)
    {
        a.log(bd, b, h)
    }, id = function (a, b)
        {
            a.log(dd, b, h);
            console.log(b)
        }, O = function (a, b)
        {
            a.log(fd, b, h);
            console.log(b)
        }, jd = {}, kd = m,
        ld = function (a)
        {
            kd || (kd = new $c, jd[""] = kd, kd.e = ed);
            var b;
            if (!(b = jd[a]))
            {
                b = new $c;
                var c = a.lastIndexOf("."),
                    d = a.substr(c + 1),
                    c = ld(a.substr(0, c));
                c.b || (c.b = {});
                c.b[d] = b;
                b.a = c;
                jd[a] = b
            }
            return b
        };
    var md = function (a)
    {
        this.b = a;
        this.a = []
    };
    y(md, z);
    var nd = [],
        od = function (a, b, c, d)
        {
            s(c) || (nd[0] = c, c = nd);
            for (var e = 0; e < c.length; e++)
            {
                var f = Fc(b, c[e], d || a, n, a.b || a);
                a.a.push(f)
            }
            return a
        }, pd = function (a, b, c, d, e, f)
        {
            if (s(c)) for (var k = 0; k < c.length; k++) pd(a, b, c[k], d, e, f);
            else b = Kc(b, c, d || a, e, f || a.b || a), a.a.push(b)
        };
    md.prototype.p = function ()
    {
        md.s.p.call(this);
        Oa(this.a, Mc);
        this.a.length = 0
    };
    md.prototype.handleEvent = function ()
    {
        g(Error("EventHandler.handleEvent not implemented"))
    };
    var qd = function (a)
    {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try
            {
                return eval("(" + a + ")")
        }
        catch (b)
        {}
        g(Error("Invalid JSON string: " + a))
    }, rd = function (a)
        {
            return eval("(" + a + ")")
        }, sd = function ()
        {}, ud = function (a, b, c)
        {
            switch (typeof b)
            {
                case "string":
                    td(b, c);
                    break;
                case "number":
                    c.push(isFinite(b) && !isNaN(b) ? b : "null");
                    break;
                case "boolean":
                    c.push(b);
                    break;
                case "undefined":
                    c.push("null");
                    break;
                case "object":
                    if (b == m)
                    {
                        c.push("null");
                        break
                    }
                    if (s(b))
                    {
                        var d = b.length;
                        c.push("[");
                        for (var e = "", f = 0; f < d; f++) c.push(e), ud(a, b[f], c), e = ",";
                        c.push("]");
                        break
                    }
                    c.push("{");
                    d = "";
                    for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), td(e, c), c.push(":"), ud(a, f, c), d = ","));
                    c.push("}");
                    break;
                case "function":
                    break;
                default:
                    g(Error("Unknown type: " + typeof b))
            }
        }, vd = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        }, wd = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        td = function (a, b)
        {
            b.push('"', a.replace(wd, function (a)
            {
                if (a in vd) return vd[a];
                var b = a.charCodeAt(0),
                    e = "\\u";
                16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
                return vd[a] = e + b.toString(16)
            }), '"')
        };
    var xd = function ()
    {
        this.a = v()
    };
    new xd;
    xd.prototype.set = function (a)
    {
        this.a = a
    };
    xd.prototype.get = function ()
    {
        return this.a
    };
    var yd = function ()
    {
        this.i = {}
    };
    y(yd, z);
    yd.prototype.customEvent_ = l;
    q = yd.prototype;
    q.Mb = m;
    q.addEventListener = function (a, b, c, d)
    {
        Fc(this, a, b, c, d)
    };
    q.removeEventListener = function (a, b, c, d)
    {
        Lc(this, a, b, c, d)
    };
    q.dispatchEvent = function (a)
    {
        C(this.customEvent_, "Can not use goog.events.dispatchEvent with non-goog.events.EventTarget instance.");
        Ic(this);
        var b = a.type || a,
            c = Cc;
        if (b in c)
        {
            if (t(a)) a = new G(a, this);
            else if (a instanceof G) a.b = a.b || this;
            else
            {
                var d = a;
                a = new G(b, this);
                fb(a, d)
            }
            var d = 1,
                e, c = c[b],
                b = l in c,
                f;
            if (b)
            {
                e = [];
                for (f = this; f; f = f.Mb) e.push(f);
                f = c[l];
                f.K = f.o;
                for (var k = e.length - 1; !a.e && 0 <= k && f.K; k--) a.a = e[k], d &= Qc(f, e[k], a.type, l, a) && a.g != n
            }
            if (n in c) if (f = c[n], f.K = f.o, b) for (k = 0; !a.e && k < e.length && f.K; k++) a.a =
                            e[k], d &= Qc(f, e[k], a.type, n, a) && a.g != n;
                else for (e = this; !a.e && e && f.K; e = e.Mb) a.a = e, d &= Qc(f, e, a.type, n, a) && a.g != n;
            a = Boolean(d)
        }
        else a = l;
        return a
    };
    q.p = function ()
    {
        yd.s.p.call(this);
        Oc(this);
        this.Mb = m
    };
    var Ic = function (a)
    {
        C(a.i, "Event target is not initialized. Did you call superclass (goog.events.EventTarget) constructor?")
    };
    var zd = function (a, b)
    {
        this.a = b ? rd : qd
    };
    zd.prototype.parse = function (a)
    {
        return this.a(a)
    };
    var Ad = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
        Cd = function (a)
        {
            if (Bd)
            {
                Bd = n;
                var b = r.location;
                if (b)
                {
                    var c = b.href;
                    if (c && (c = (c = Cd(c)[3] || m) && decodeURIComponent(c)) && c != b.hostname) Bd = l, g(Error())
                }
            }
            return a.match(Ad)
        }, Bd = gc,
        Dd = function (a)
        {
            if (a[1])
            {
                var b = a[0],
                    c = b.indexOf("#");
                0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
                c = b.indexOf("?");
                0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = h)
            }
            return a.join("")
        }, Ed = function (a, b, c)
        {
            if (s(b))
            {
                Ka(b);
                for (var d = 0; d < b.length; d++) Ed(a, String(b[d]), c)
            }
            else b != m && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
        }, Fd = function (a, b, c)
        {
            C(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
            for (c = c || 0; c < b.length; c += 2) Ed(b[c], b[c + 1], a);
            return a
        }, Gd = function (a, b)
        {
            return Dd(2 == arguments.length ? Fd([a], arguments[1], 0) : Fd([a], arguments, 1))
        }, Hd = function (a, b, c)
        {
            for (var d = 0, e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;)
            {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f) if (f = a.charCodeAt(d +
                        e), !f || 61 == f || 38 == f || 35 == f) return d;
                d += e + 1
            }
            return -1
        }, Id = /#|$/;
    var Jd = function (a, b)
    {
        var c;
        if (a instanceof Jd) this.wa = b !== h ? b : a.wa, Kd(this, a.Ha), this.sb = a.sb, Ld(this, a.Ga), Md(this, a.Xa), this.Ya = a.Ya, Nd(this, a.a.D()), this.rb = a.rb;
        else if (a && (c = Cd(String(a))))
        {
            this.wa = !! b;
            Kd(this, c[1] || "", l);
            var d = c[2] || "";
            this.sb = d ? decodeURIComponent(d) : "";
            Ld(this, c[3] || "", l);
            Md(this, c[4]);
            this.Ya = (d = c[5] || "") ? decodeURIComponent(d) : "";
            Nd(this, c[6] || "", l);
            this.rb = (c = c[7] || "") ? decodeURIComponent(c) : ""
        }
        else this.wa = !! b, this.a = new P(m, 0, this.wa)
    };
    q = Jd.prototype;
    q.Ha = "";
    q.sb = "";
    q.Ga = "";
    q.Xa = m;
    q.Ya = "";
    q.rb = "";
    q.wa = n;
    q.toString = function ()
    {
        var a = [],
            b = this.Ha;
        b && a.push(Od(b, Pd), ":");
        if (b = this.Ga)
        {
            a.push("//");
            var c = this.sb;
            c && a.push(Od(c, Pd), "@");
            a.push(encodeURIComponent(String(b)));
            b = this.Xa;
            b != m && a.push(":", String(b))
        }
        if (b = this.Ya) this.Ga && "/" != b.charAt(0) && a.push("/"), a.push(Od(b, "/" == b.charAt(0) ? Qd : Rd));
        (b = this.a.toString()) && a.push("?", b);
        (b = this.rb) && a.push("#", Od(b, Sd));
        return a.join("")
    };
    q.D = function ()
    {
        return new Jd(this)
    };
    var Kd = function (a, b, c)
    {
        a.Ha = c ? b ? decodeURIComponent(b) : "" : b;
        a.Ha && (a.Ha = a.Ha.replace(/:$/, ""))
    }, Ld = function (a, b, c)
        {
            a.Ga = c ? b ? decodeURIComponent(b) : "" : b
        }, Md = function (a, b)
        {
            b ? (b = Number(b), (isNaN(b) || 0 > b) && g(Error("Bad port number " + b)), a.Xa = b) : a.Xa = m
        }, Nd = function (a, b, c)
        {
            b instanceof P ? (a.a = b, Td(a.a, a.wa)) : (c || (b = Od(b, Ud)), a.a = new P(b, 0, a.wa))
        }, Q = function (a, b, c)
        {
            a.a.set(b, c)
        }, Wd = function (a, b, c)
        {
            s(c) || (c = [String(c)]);
            Vd(a.a, b, c)
        }, Xd = function (a)
        {
            Q(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) +
                Math.abs(Math.floor(2147483648 * Math.random()) ^ v()).toString(36));
            return a
        }, Yd = function (a, b, c, d)
        {
            var e = new Jd(m, h);
            a && Kd(e, a);
            b && Ld(e, b);
            c && Md(e, c);
            d && (e.Ya = d);
            return e
        }, Od = function (a, b)
        {
            return t(a) ? encodeURI(a).replace(b, Zd) : m
        }, Zd = function (a)
        {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        }, Pd = /[#\/\?@]/g,
        Rd = /[\#\?:]/g,
        Qd = /[\#\?]/g,
        Ud = /[\#\?@]/g,
        Sd = /#/g,
        P = function (a, b, c)
        {
            this.b = a || m;
            this.e = !! c
        }, ae = function (a)
        {
            if (!a.a && (a.a = new ib, a.o = 0, a.b)) for (var b = a.b.split("&"), c = 0; c < b.length; c++)
                {
                    var d =
                        b[c].indexOf("="),
                        e = m,
                        f = m;
                    0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
                    e = decodeURIComponent(e.replace(/\+/g, " "));
                    e = $d(a, e);
                    a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
            }
        };
    P.prototype.a = m;
    P.prototype.o = m;
    P.prototype.Ca = function ()
    {
        ae(this);
        return this.o
    };
    P.prototype.add = function (a, b)
    {
        ae(this);
        this.b = m;
        a = $d(this, a);
        var c = this.a.get(a);
        c || this.a.set(a, c = []);
        c.push(b);
        this.o++;
        return this
    };
    var be = function (a, b)
    {
        ae(a);
        b = $d(a, b);
        kb(a.a.b, b) && (a.b = m, a.o -= a.a.get(b).length, lb(a.a, b))
    };
    P.prototype.clear = function ()
    {
        this.a = this.b = m;
        this.o = 0
    };
    P.prototype.$a = function ()
    {
        ae(this);
        return 0 == this.o
    };
    var ce = function (a, b)
    {
        ae(a);
        b = $d(a, b);
        return kb(a.a.b, b)
    };
    P.prototype.$ = function ()
    {
        ae(this);
        for (var a = this.a.I(), b = this.a.$(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    P.prototype.I = function (a)
    {
        ae(this);
        var b = [];
        if (a) ce(this, a) && (b = Sa(b, this.a.get($d(this, a))));
        else
        {
            a = this.a.I();
            for (var c = 0; c < a.length; c++) b = Sa(b, a[c])
        }
        return b
    };
    P.prototype.set = function (a, b)
    {
        ae(this);
        this.b = m;
        a = $d(this, a);
        ce(this, a) && (this.o -= this.a.get(a).length);
        this.a.set(a, [b]);
        this.o++;
        return this
    };
    P.prototype.get = function (a, b)
    {
        var c = a ? this.I(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    var Vd = function (a, b, c)
    {
        be(a, b);
        0 < c.length && (a.b = m, a.a.set($d(a, b), Ta(c)), a.o += c.length)
    };
    P.prototype.toString = function ()
    {
        if (this.b) return this.b;
        if (!this.a) return "";
        for (var a = [], b = this.a.$(), c = 0; c < b.length; c++) for (var d = b[c], e = encodeURIComponent(String(d)), d = this.I(d), f = 0; f < d.length; f++)
            {
                var k = e;
                "" !== d[f] && (k += "=" + encodeURIComponent(String(d[f])));
                a.push(k)
        }
        return this.b = a.join("&")
    };
    P.prototype.D = function ()
    {
        var a = new P;
        a.b = this.b;
        this.a && (a.a = this.a.D(), a.o = this.o);
        return a
    };
    var $d = function (a, b)
    {
        var c = String(b);
        a.e && (c = c.toLowerCase());
        return c
    }, Td = function (a, b)
        {
            b && !a.e && (ae(a), a.b = m, hb(a.a, function (a, b)
            {
                var e = b.toLowerCase();
                b != e && (be(this, b), Vd(this, e, a))
            }, a));
            a.e = b
        };
    var ee = function (a, b)
    {
        this.i = {};
        this.b = a || 1;
        this.f = b || de;
        this.g = u(this.k, this);
        this.h = v()
    };
    y(ee, yd);
    ee.prototype.e = n;
    var de = r;
    ee.prototype.a = m;
    ee.prototype.setInterval = function (a)
    {
        this.b = a;
        this.a && this.e ? (fe(this), ge(this)) : this.a && fe(this)
    };
    ee.prototype.k = function ()
    {
        if (this.e)
        {
            var a = v() - this.h;
            0 < a && a < 0.8 * this.b ? this.a = this.f.setTimeout(this.g, this.b - a) : (this.dispatchEvent("tick"), this.e && (this.a = this.f.setTimeout(this.g, this.b), this.h = v()))
        }
    };
    var ge = function (a)
    {
        a.e = l;
        a.a || (a.a = a.f.setTimeout(a.g, a.b), a.h = v())
    }, fe = function (a)
        {
            a.e = n;
            a.a && (a.f.clearTimeout(a.a), a.a = m)
        };
    ee.prototype.p = function ()
    {
        ee.s.p.call(this);
        fe(this);
        delete this.f
    };
    var he = function (a, b)
    {
        fa(a) || (a && "function" == typeof a.handleEvent ? a = u(a.handleEvent, a) : g(Error("Invalid listener argument")));
        return 2147483647 < b ? -1 : de.setTimeout(a, b || 0)
    };
    var ie = function (a, b, c)
    {
        this.i = a;
        this.g = b;
        this.f = c;
        this.e = u(this.h, this)
    };
    y(ie, z);
    ie.prototype.b = n;
    ie.prototype.a = m;
    ie.prototype.p = function ()
    {
        ie.s.p.call(this);
        this.a && (de.clearTimeout(this.a), this.a = m, this.b = n)
    };
    ie.prototype.h = function ()
    {
        this.a = m;
        this.b && (this.b = n, je(this))
    };
    var je = function (a)
    {
        a.a = he(a.e, a.g);
        a.i.call(a.f)
    };
    var ke = function ()
    {};
    ke.prototype.a = m;
    var le, me = function ()
        {};
    y(me, ke);
    me.prototype.b = function ()
    {
        var a = ne(this);
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    };
    me.prototype.e = function ()
    {
        var a = {};
        ne(this) && (a[0] = l, a[1] = l);
        return a
    };
    var ne = function (a)
    {
        if (!a.f && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject)
        {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++)
            {
                var d = b[c];
                try
                {
                    return new ActiveXObject(d), a.f = d
                }
                catch (e)
                {}
            }
            g(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
        }
        return a.f
    };
    le = new me;
    var R = function (a, b, c, d, e)
    {
        this.f = a;
        this.b = b;
        this.e = c;
        this.g = d;
        this.i = e || 1;
        this.k = 45E3;
        this.a = new md(this);
        this.h = new ee;
        this.h.setInterval(250)
    };
    q = R.prototype;
    q.na = m;
    q.W = n;
    q.Da = m;
    q.Pb = m;
    q.Ka = m;
    q.za = m;
    q.ea = m;
    q.M = m;
    q.ya = m;
    q.C = m;
    q.Sa = 0;
    q.X = m;
    q.Aa = m;
    q.ha = m;
    q.Ia = -1;
    q.ac = l;
    q.qa = n;
    q.zb = 0;
    q.ib = m;
    var oe = function (a, b)
    {
        switch (a)
        {
            case 0:
                return "Non-200 return code (" + b + ")";
            case 1:
                return "XMLHTTP failure (no data)";
            case 2:
                return "HttpConnection timeout";
            default:
                return "Unknown error"
        }
    }, pe = {}, qe = {}, re = function ()
        {
            return !M || M && 10 <= vc
        };
    R.prototype.setTimeout = function (a)
    {
        this.k = a
    };
    var te = function (a, b, c)
    {
        a.za = 1;
        a.ea = Xd(b.D());
        a.ya = c;
        a.l = l;
        se(a, m)
    }, ue = function (a, b, c, d, e)
        {
            a.za = 1;
            a.ea = Xd(b.D());
            a.ya = m;
            a.l = c;
            e && (a.ac = n);
            se(a, d)
        }, se = function (a, b)
        {
            a.Ka = v();
            ve(a);
            a.M = a.ea.D();
            Wd(a.M, "t", a.i);
            a.Sa = 0;
            a.C = a.f.Kb(a.f.nb() ? b : m);
            0 < a.zb && (a.ib = new ie(u(a.r, a, a.C), a.zb));
            od(a.a, a.C, "readystatechange", a.aa);
            var c = a.na ? db(a.na) : {};
            a.ya ? (a.Aa = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.C.send(a.M, a.Aa, a.ya, c)) : (a.Aa = "GET", a.ac && !gc && (c.Connection = "close"), a.C.send(a.M, a.Aa,
                m, c));
            a.f.V(1);
            var d = a.ya;
            if (d) for (var c = "", d = d.split("&"), e = 0; e < d.length; e++)
                {
                    var f = d[e].split("=");
                    if (1 < f.length) var k = f[0],
                    f = f[1], p = k.split("_"), c = 2 <= p.length && "type" == p[1] ? c + (k + "=" + f + "&") : c + (k + "=redacted&")
            }
            else c = m;
            S(a.b, "XMLHTTP REQ (" + a.g + ") [attempt " + a.i + "]: " + a.Aa + "\n" + a.M + "\n" + c)
        };
    R.prototype.aa = function (a)
    {
        a = a.b;
        var b = this.ib;
        b && 3 == we(a) ? (S(this.b, "Throttling readystatechange."), !b.a ? je(b) : b.b = l) : this.r(a)
    };
    R.prototype.r = function (a)
    {
        try
        {
            if (a == this.C) a: {
                    var b = we(this.C),
                        c = this.C.R,
                        d = xe(this.C);
                    if (!re() || gc && !tc("420+"))
                    {
                        if (4 > b) break a
                    }
                    else if (3 > b || 3 == b && !ec && !ye(this.C)) break a;
                    !this.qa && (4 == b && 7 != c) && (8 == c || 0 >= d ? this.f.V(3) : this.f.V(2));
                    ze(this);
                    var e = xe(this.C);
                    this.Ia = e;
                    var f = ye(this.C);
                    f || S(this.b, "No response text for uri " + this.M + " status " + e);
                    this.W = 200 == e;
                    S(this.b, "XMLHTTP RESP (" + this.g + ") [ attempt " + this.i + "]: " + this.Aa + "\n" + this.M + "\n" + b + " " + e);
                    this.W ? (4 == b && Ae(this), this.l ? (Be(this, b, f),
                        ec && 3 == b && (od(this.a, this.h, "tick", this.G), ge(this.h))) : (Ce(this.b, this.g, f, m), De(this, f)), this.W && !this.qa && (4 == b ? this.f.jb(this) : (this.W = n, ve(this)))) : (400 == e && 0 < f.indexOf("Unknown SID") ? (this.ha = 3, U(), Ee(this.b, "XMLHTTP Unknown SID (" + this.g + ")")) : (this.ha = 0, U(), Ee(this.b, "XMLHTTP Bad status " + e + " (" + this.g + ")")), Ae(this), Fe(this))
            }
            else Ee(this.b, "Called back with an unexpected xmlhttp")
        }
        catch (k)
        {
            S(this.b, "Failed call to OnXmlHttpReadyStateChanged_"), this.C && ye(this.C) ? Ge(this.b, k, "ResponseText: " +
                ye(this.C)) : Ge(this.b, k, "No response text")
        }
        finally
        {}
    };
    var Be = function (a, b, c)
    {
        for (var d = l; !a.qa && a.Sa < c.length;)
        {
            var e = He(a, c);
            if (e == qe)
            {
                4 == b && (a.ha = 4, U(), d = n);
                Ce(a.b, a.g, m, "[Incomplete Response]");
                break
            }
            else if (e == pe)
            {
                a.ha = 4;
                U();
                Ce(a.b, a.g, c, "[Invalid Chunk]");
                d = n;
                break
            }
            else Ce(a.b, a.g, e, m), De(a, e)
        }
        4 == b && 0 == c.length && (a.ha = 1, U(), d = n);
        a.W = a.W && d;
        d || (Ce(a.b, a.g, c, "[Invalid Chunked Response]"), Ae(a), Fe(a))
    };
    R.prototype.G = function ()
    {
        var a = we(this.C),
            b = ye(this.C);
        this.Sa < b.length && (ze(this), Be(this, a, b), this.W && 4 != a && ve(this))
    };
    var He = function (a, b)
    {
        var c = a.Sa,
            d = b.indexOf("\n", c);
        if (-1 == d) return qe;
        c = Number(b.substring(c, d));
        if (isNaN(c)) return pe;
        d += 1;
        if (d + c > b.length) return qe;
        var e = b.substr(d, c);
        a.Sa = d + c;
        return e
    }, Ie = function (a, b)
        {
            a.Ka = v();
            ve(a);
            var c = b ? window.location.hostname : "";
            a.M = a.ea.D();
            Q(a.M, "DOMAIN", c);
            Q(a.M, "t", a.i);
            try
            {
                a.X = new ActiveXObject("htmlfile")
            }
            catch (d)
            {
                hd(a.b.a, "ActiveX blocked");
                Ae(a);
                a.ha = 7;
                U();
                Fe(a);
                return
            }
            var e = "<html><body>";
            b && (e += '<script>document.domain="' + c + '"\x3c/script>');
            e += "</body></html>";
            a.X.open();
            a.X.write(e);
            a.X.close();
            a.X.parentWindow.m = u(a.A, a);
            a.X.parentWindow.d = u(a.t, a, l);
            a.X.parentWindow.rpcClose = u(a.t, a, n);
            c = a.X.createElement("div");
            a.X.parentWindow.document.body.appendChild(c);
            c.innerHTML = '<iframe src="' + a.M + '"></iframe>';
            S(a.b, "TRIDENT REQ (" + a.g + ") [ attempt " + a.i + "]: GET\n" + a.M);
            a.f.V(1)
        };
    R.prototype.A = function (a)
    {
        Je(u(this.q, this, a), 0)
    };
    R.prototype.q = function (a)
    {
        if (!this.qa)
        {
            var b = this.b;
            S(b, "TRIDENT TEXT (" + this.g + "): " + Ke(b, a));
            ze(this);
            De(this, a);
            ve(this)
        }
    };
    R.prototype.t = function (a)
    {
        Je(u(this.H, this, a), 0)
    };
    R.prototype.H = function (a)
    {
        this.qa || (S(this.b, "TRIDENT TEXT (" + this.g + "): " + a ? "success" : "failure"), Ae(this), this.W = a, this.f.jb(this), this.f.V(4))
    };
    var Le = function (a)
    {
        a.qa = l;
        Ae(a)
    }, ve = function (a)
        {
            a.Pb = v() + a.k;
            Me(a, a.k)
        }, Me = function (a, b)
        {
            a.Da != m && g(Error("WatchDog timer not null"));
            a.Da = Je(u(a.F, a), b)
        }, ze = function (a)
        {
            a.Da && (r.clearTimeout(a.Da), a.Da = m)
        };
    R.prototype.F = function ()
    {
        this.Da = m;
        var a = v();
        0 <= a - this.Pb ? (this.W && hd(this.b.a, "Received watchdog timeout even though request loaded successfully"), S(this.b, "TIMEOUT: " + this.M), 2 != this.za && this.f.V(3), Ae(this), this.ha = 2, U(), Fe(this)) : (Ee(this.b, "WatchDog timer called too early"), Me(this, this.Pb - a))
    };
    var Fe = function (a)
    {
        !a.f.xc() && !a.qa && a.f.jb(a)
    }, Ae = function (a)
        {
            ze(a);
            B(a.ib);
            a.ib = m;
            fe(a.h);
            var b = a.a;
            Oa(b.a, Mc);
            b.a.length = 0;
            a.C && (b = a.C, a.C = m, b.abort(), b.J());
            a.X && (a.X = m)
        }, De = function (a, b)
        {
            try
            {
                a.f.vc(a, b), a.f.V(4)
            }
            catch (c)
            {
                Ge(a.b, c, "Error in httprequest callback")
            }
        };
    var Ne = function ()
    {
        this.a = ld("goog.net.BrowserChannel")
    }, Ce = function (a, b, c, d)
        {
            S(a, "XMLHTTP TEXT (" + b + "): " + Ke(a, c) + (d ? " " + d : ""))
        }, Oe = function (a, b)
        {
            S(a, b)
        }, Ge = function (a, b, c)
        {
            hd(a.a, (c || "Exception") + b)
        }, S = function (a, b)
        {
            id(a.a, b)
        }, Ee = function (a, b)
        {
            a.a.log(cd, b, h)
        }, Ke = function (a, b)
        {
            if (!b || "y2f%" == b) return b;
            try
            {
                var c = rd(b);
                if (c) for (var d = 0; d < c.length; d++) if (s(c[d]))
                        {
                            var e = c[d];
                            if (!(2 > e.length))
                            {
                                var f = e[1];
                                if (s(f) && !(1 > f.length))
                                {
                                    var k = f[0];
                                    if ("noop" != k && "stop" != k) for (var p = 1; p < f.length; p++) f[p] = ""
                                }
                            }
                        }
                d = [];
                ud(new sd, c, d);
                return d.join("")
            }
            catch (A)
            {
                return S(a, "Exception parsing expected JS array - probably was not JS"), b
            }
        };
    var Qe = function (a, b, c, d, e)
    {
        Oe(new Ne, "TestLoadImageWithRetries: " + e);
        if (0 == d) c(n);
        else
        {
            var f = e || 0;
            d--;
            Pe(a, b, function (e)
            {
                e ? c(l) : r.setTimeout(function ()
                {
                    Qe(a, b, c, d, f)
                }, f)
            })
        }
    }, Pe = function (a, b, c)
        {
            var d = new Ne;
            S(d, "TestLoadImage: loading " + a);
            var e = new Image;
            e.onload = function ()
            {
                try
                {
                    S(d, "TestLoadImage: loaded"), Re(e), c(l)
                }
                catch (a)
                {
                    Ge(d, a)
                }
            };
            e.onerror = function ()
            {
                try
                {
                    S(d, "TestLoadImage: error"), Re(e), c(n)
                }
                catch (a)
                {
                    Ge(d, a)
                }
            };
            e.onabort = function ()
            {
                try
                {
                    S(d, "TestLoadImage: abort"), Re(e), c(n)
                }
                catch (a)
                {
                    Ge(d, a)
                }
            };
            e.ontimeout = function ()
            {
                try
                {
                    S(d, "TestLoadImage: timeout"), Re(e), c(n)
                }
                catch (a)
                {
                    Ge(d, a)
                }
            };
            r.setTimeout(function ()
            {
                if (e.ontimeout) e.ontimeout()
            }, b);
            e.src = a
        }, Re = function (a)
        {
            a.onload = m;
            a.onerror = m;
            a.onabort = m;
            a.ontimeout = m
        };
    var Se = function (a, b)
    {
        this.a = a;
        this.b = b;
        this.e = new zd(0, l)
    };
    q = Se.prototype;
    q.Hb = m;
    q.N = m;
    q.pb = n;
    q.bc = m;
    q.ob = m;
    q.Qb = m;
    q.Ib = m;
    q.O = m;
    q.ta = -1;
    q.Qa = m;
    q.Ma = m;
    var Ue = function (a)
    {
        var b = Te(a.a, a.Ma, "/mail/images/cleardot.gif");
        Xd(b);
        Qe(b.toString(), 5E3, u(a.f, a), 3, 2E3);
        a.V(1)
    };
    Se.prototype.f = function (a)
    {
        if (a) this.O = 2, Ve(this);
        else
        {
            U();
            var b = this.a;
            S(b.a, "Test Connection Blocked");
            b.Z = b.ja.ta;
            We(b, 9)
        }
        a && this.V(2)
    };
    var Ve = function (a)
    {
        S(a.b, "TestConnection: starting stage 2");
        var b = a.a.A;
        if (b != m) S(a.b, "TestConnection: skipping stage 2, precomputed result is " + b ? "Buffered" : "Unbuffered"), U(), b ? (U(), Xe(a.a, a, n)) : (U(), Xe(a.a, a, l));
        else if (a.N = new R(a, a.b, h, h, h), a.N.na = a.Hb, b = Ye(a.a, a.Qa, a.Ib), U(), re()) Wd(b, "TYPE", "xmlhttp"), ue(a.N, b, n, a.Qa, n);
        else
        {
            Wd(b, "TYPE", "html");
            var c = a.N;
            a = Boolean(a.Qa);
            c.za = 3;
            c.ea = Xd(b.D());
            Ie(c, a)
        }
    };
    q = Se.prototype;
    q.Kb = function (a)
    {
        return this.a.Kb(a)
    };
    q.abort = function ()
    {
        this.N && (Le(this.N), this.N = m);
        this.ta = -1
    };
    q.xc = function ()
    {
        return n
    };
    q.vc = function (a, b)
    {
        this.ta = a.Ia;
        if (0 == this.O) if (S(this.b, "TestConnection: Got data for stage 1"), b)
            {
                try
                {
                    var c = this.e.parse(b)
                }
                catch (d)
                {
                    Ge(this.b, d);
                    Ze(this.a, this);
                    return
                }
                this.Qa = $e(this.a, c[0]);
                this.Ma = c[1]
            }
            else S(this.b, "TestConnection: Null responseText"), Ze(this.a, this);
            else if (2 == this.O) if (this.pb) U(), this.Qb = v();
            else if ("11111" == b)
        {
            if (U(), this.pb = l, this.ob = v(), c = this.ob - this.bc, re() || 500 > c) this.ta = 200, Le(this.N), S(this.b, "Test connection succeeded; using streaming connection"), U(), Xe(this.a,
                    this, l)
        }
        else U(), this.ob = this.Qb = v(), this.pb = n
    };
    q.jb = function ()
    {
        this.ta = this.N.Ia;
        if (this.N.W) if (0 == this.O) S(this.b, "TestConnection: request complete for initial check"), this.Ma ? (this.O = 1, Ue(this)) : (this.O = 2, Ve(this));
            else
            {
                if (2 == this.O)
                {
                    S(this.b, "TestConnection: request complete for stage 2");
                    var a = n;
                    (a = re() ? this.pb : 200 > this.Qb - this.ob ? n : l) ? (S(this.b, "Test connection succeeded; using streaming connection"), U(), Xe(this.a, this, l)) : (S(this.b, "Test connection failed; not using streaming"), U(), Xe(this.a, this, n))
                }
            }
            else S(this.b, "TestConnection: request failed, in state " +
                    this.O), 0 == this.O ? U() : 2 == this.O && U(), Ze(this.a, this)
    };
    q.nb = function ()
    {
        return this.a.nb()
    };
    q.V = function (a)
    {
        this.a.V(a)
    };
    var af = function (a)
    {
        this.i = {};
        this.f = new ib;
        this.b = a || m
    };
    y(af, yd);
    var bf = {
        nc: "",
        Tc: "text",
        Sc: "document",
        Rc: "blob",
        ARRAY_BUFFER: "arraybuffer"
    };
    af.prototype.a = ld("goog.net.XhrIo");
    var cf = /^https?$/i;
    q = af.prototype;
    q.ia = n;
    q.n = m;
    q.kb = m;
    q.Ja = "";
    q.Zb = "";
    q.R = 0;
    q.Pa = "";
    q.Fb = n;
    q.gb = n;
    q.Bb = n;
    q.va = n;
    q.La = 0;
    q.ra = m;
    q.fa = "";
    q.Yb = n;
    q.send = function (a, b, c, d)
    {
        this.n && g(Error("[goog.net.XhrIo] Object is active with another request=" + this.Ja + "; newUri=" + a));
        b = b ? b.toUpperCase() : "GET";
        this.Ja = a;
        this.Pa = "";
        this.R = 0;
        this.Zb = b;
        this.Fb = n;
        this.ia = l;
        this.n = this.b ? this.b.b() : le.b();
        this.kb = this.b ? this.b.a || (this.b.a = this.b.e()) : le.a || (le.a = le.e());
        this.n.onreadystatechange = u(this.e, this);
        try
        {
            O(this.a, df(this, "Opening Xhr")), this.Bb = l, this.n.open(b, a, l), this.Bb = n
        }
        catch (e)
        {
            O(this.a, df(this, "Error opening Xhr: " + e.message));
            ef(this, e);
            return
        }
        a =
            c || "";
        var f = this.f.D();
        d && hb(d, function (a, b)
        {
            f.set(b, a)
        });
        d = Qa(f.$(), ff);
        c = r.FormData && a instanceof r.FormData;
        "POST" == b && (!d && !c) && f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        hb(f, function (a, b)
        {
            this.n.setRequestHeader(b, a)
        }, this);
        this.fa && (this.n.responseType = this.fa);
        "withCredentials" in this.n && (this.n.withCredentials = this.Yb);
        try
        {
            this.ra && (de.clearTimeout(this.ra), this.ra = m), 0 < this.La && (O(this.a, df(this, "Will abort after " + this.La + "ms if incomplete")), this.ra = de.setTimeout(u(this.g,
                this), this.La)), O(this.a, df(this, "Sending request")), this.gb = l, this.n.send(a), this.gb = n
        }
        catch (k)
        {
            O(this.a, df(this, "Send error: " + k.message)), ef(this, k)
        }
    };
    var ff = function (a)
    {
        return "content-type" == a.toLowerCase()
    };
    af.prototype.g = function ()
    {
        "undefined" != typeof aa && this.n && (this.Pa = "Timed out after " + this.La + "ms, aborting", this.R = 8, O(this.a, df(this, this.Pa)), this.dispatchEvent("timeout"), this.abort(8))
    };
    var ef = function (a, b)
    {
        a.ia = n;
        a.n && (a.va = l, a.n.abort(), a.va = n);
        a.Pa = b;
        a.R = 5;
        gf(a);
        hf(a)
    }, gf = function (a)
        {
            a.Fb || (a.Fb = l, a.dispatchEvent("complete"), a.dispatchEvent("error"))
        };
    af.prototype.abort = function (a)
    {
        this.n && this.ia && (O(this.a, df(this, "Aborting")), this.ia = n, this.va = l, this.n.abort(), this.va = n, this.R = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), hf(this))
    };
    af.prototype.p = function ()
    {
        this.n && (this.ia && (this.ia = n, this.va = l, this.n.abort(), this.va = n), hf(this, l));
        af.s.p.call(this)
    };
    af.prototype.e = function ()
    {
        !this.Bb && !this.gb && !this.va ? this.h() : jf(this)
    };
    af.prototype.h = function ()
    {
        jf(this)
    };
    var jf = function (a)
    {
        if (a.ia && "undefined" != typeof aa) if (a.kb[1] && 4 == we(a) && 2 == xe(a)) O(a.a, df(a, "Local request error detected and ignored"));
            else if (a.gb && 4 == we(a)) de.setTimeout(u(a.e, a), 0);
        else if (a.dispatchEvent("readystatechange"), 4 == we(a))
        {
            O(a.a, df(a, "Request complete"));
            a.ia = n;
            try
            {
                if (kf(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
                else
                {
                    a.R = 6;
                    var b;
                    try
                    {
                        b = 2 < we(a) ? a.n.statusText : ""
                    }
                    catch (c)
                    {
                        O(a.a, "Can not get status: " + c.message), b = ""
                    }
                    a.Pa = b + " [" + xe(a) + "]";
                    gf(a)
                }
            }
            finally
            {
                hf(a)
            }
        }
    }, hf = function (a,
            b)
        {
            if (a.n)
            {
                var c = a.n,
                    d = a.kb[0] ? ca : m;
                a.n = m;
                a.kb = m;
                a.ra && (de.clearTimeout(a.ra), a.ra = m);
                b || a.dispatchEvent("ready");
                try
                {
                    c.onreadystatechange = d
                }
                catch (e)
                {
                    hd(a.a, "Problem encountered resetting onreadystatechange: " + e.message)
                }
            }
        }, kf = function (a)
        {
            var b = xe(a),
                c;
            a: switch (b)
            {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                    c = l;
                    break a;
                default:
                    c = n
            }
            if (!c)
            {
                if (b = 0 === b) a = Cd(String(a.Ja))[1] || m, !a && self.location && (a = self.location.protocol, a = a.substr(0, a.length - 1)), b = !cf.test(a ? a.toLowerCase() : "");
                c =
                    b
            }
            return c
        }, we = function (a)
        {
            return a.n ? a.n.readyState : 0
        }, xe = function (a)
        {
            try
            {
                return 2 < we(a) ? a.n.status : -1
            }
            catch (b)
            {
                return a.a.log(cd, "Can not get status: " + b.message, h), -1
            }
        }, ye = function (a)
        {
            try
            {
                return a.n ? a.n.responseText : ""
            }
            catch (b)
            {
                return O(a.a, "Can not get responseText: " + b.message), ""
            }
        }, lf = function (a)
        {
            try
            {
                if (!a.n) return m;
                if ("response" in a.n) return a.n.response;
                switch (a.fa)
                {
                    case "":
                    case "text":
                        return a.n.responseText;
                    case "arraybuffer":
                        if ("mozResponseArrayBuffer" in a.n) return a.n.mozResponseArrayBuffer
                }
                hd(a.a,
                    "Response type " + a.fa + " is not supported on this browser");
                return m
            }
            catch (b)
            {
                return O(a.a, "Can not get response: " + b.message), m
            }
        };
    af.prototype.getResponseHeader = function (a)
    {
        return this.n && 4 == we(this) ? this.n.getResponseHeader(a) : h
    };
    af.prototype.getAllResponseHeaders = function ()
    {
        return this.n && 4 == we(this) ? this.n.getAllResponseHeaders() : ""
    };
    var df = function (a, b)
    {
        return b + " [" + a.Zb + " " + a.Ja + " " + xe(a) + "]"
    };
    var mf = function (a, b, c)
    {
        this.k = a || m;
        this.b = 1;
        this.f = [];
        this.g = [];
        this.a = new Ne;
        this.i = new zd(0, l);
        this.H = b || m;
        this.A = c != m ? c : m
    };
    q = mf.prototype;
    q.xa = m;
    q.Jb = m;
    q.L = m;
    q.B = m;
    q.Cb = m;
    q.hb = m;
    q.$b = m;
    q.lb = m;
    q.zc = l;
    q.Oa = 0;
    q.v = m;
    q.ka = m;
    q.ba = m;
    q.sa = m;
    q.ja = m;
    q.Db = m;
    q.eb = -1;
    q.ec = -1;
    q.Z = -1;
    q.Na = 0;
    q.Ba = 0;
    q.kc = 0;
    q.ub = n;
    q.pa = 8;
    var nf = new yd,
        of = function (a)
        {
            G.call(this, "statevent", a)
        };
    y(of, G);
    var pf = function (a)
    {
        G.call(this, "timingevent", a)
    };
    y(pf, G);
    var qf = function (a)
    {
        G.call(this, "serverreachability", a)
    };
    y(qf, G);
    var uf = function (a)
    {
        S(a.a, "disconnect()");
        rf(a);
        if (3 == a.b)
        {
            var b = a.Oa++,
                c = a.hb.D();
            Q(c, "SID", a.e);
            Q(c, "RID", b);
            Q(c, "TYPE", "terminate");
            sf(a, c);
            b = new R(a, a.a, a.e, b, h);
            b.za = 2;
            b.ea = Xd(c.D());
            (new Image).src = b.ea;
            b.Ka = v();
            ve(b)
        }
        tf(a)
    }, rf = function (a)
        {
            a.ja && (a.ja.abort(), a.ja = m);
            a.B && (Le(a.B), a.B = m);
            a.ba && (r.clearTimeout(a.ba), a.ba = m);
            vf(a);
            a.L && (Le(a.L), a.L = m);
            a.ka && (r.clearTimeout(a.ka), a.ka = m)
        };
    mf.prototype.xc = function ()
    {
        return 0 == this.b
    };
    var wf = function (a)
    {
        !a.L && !a.ka && (a.ka = Je(u(a.t, a), 0), a.Na = 0)
    };
    mf.prototype.t = function (a)
    {
        this.ka = m;
        S(this.a, "startForwardChannel_");
        if (xf(this)) if (1 == this.b) if (a) hd(this.a.a, "Not supposed to retry the open");
                else
                {
                    S(this.a, "open_()");
                    this.Oa = Math.floor(1E5 * Math.random());
                    a = this.Oa++;
                    var b = new R(this, this.a, "", a, h);
                    b.na = this.xa;
                    var c = yf(this),
                        d = this.hb.D();
                    Q(d, "RID", a);
                    this.k && Q(d, "CVER", this.k);
                    sf(this, d);
                    te(b, d, c);
                    this.L = b;
                    this.b = 2
                }
                else 3 == this.b && (a ? zf(this, a) : 0 == this.f.length ? S(this.a, "startForwardChannel_ returned: nothing to send") : this.L ? hd(this.a.a, "startForwardChannel_ returned: connection already in progress") :
                        (zf(this), S(this.a, "startForwardChannel_ finished, sent request")))
    };
    var zf = function (a, b)
    {
        var c, d;
        b ? 6 < a.pa ? (a.f = a.g.concat(a.f), a.g.length = 0, c = a.Oa - 1, d = yf(a)) : (c = b.g, d = b.ya) : (c = a.Oa++, d = yf(a));
        var e = a.hb.D();
        Q(e, "SID", a.e);
        Q(e, "RID", c);
        Q(e, "AID", a.eb);
        sf(a, e);
        c = new R(a, a.a, a.e, c, a.Na + 1);
        c.na = a.xa;
        c.setTimeout(Math.round(1E4) + Math.round(1E4 * Math.random()));
        a.L = c;
        te(c, e, d)
    }, sf = function (a, b)
        {
            if (a.v)
            {
                var c = a.v.Bc(a);
                c && hb(c, function (a, c)
                {
                    Q(b, c, a)
                })
            }
        }, yf = function (a)
        {
            var b = Math.min(a.f.length, 1E3),
                c = ["count=" + b],
                d;
            6 < a.pa && 0 < b ? (d = a.f[0].a, c.push("ofs=" + d)) : d = 0;
            for (var e =
                0; e < b; e++)
            {
                var f = a.f[e].a,
                    k = a.f[e].map,
                    f = 6 >= a.pa ? e : f - d;
                try
                {
                    hb(k, function (a, b)
                    {
                        c.push("req" + f + "_" + b + "=" + encodeURIComponent(a))
                    })
                }
                catch (p)
                {
                    c.push("req" + f + "_type=" + encodeURIComponent("_badmap"))
                }
            }
            a.g = a.g.concat(a.f.splice(0, b));
            return c.join("&")
        }, Af = function (a)
        {
            !a.B && !a.ba && (a.h = 1, a.ba = Je(u(a.l, a), 0), a.Ba = 0)
        }, Cf = function (a)
        {
            if (a.B || a.ba) return hd(a.a.a, "Request already in progress"), n;
            if (3 <= a.Ba) return n;
            S(a.a, "Going to retry GET");
            a.h++;
            a.ba = Je(u(a.l, a), Bf(a, a.Ba));
            a.Ba++;
            return l
        };
    mf.prototype.l = function ()
    {
        this.ba = m;
        if (xf(this))
        {
            S(this.a, "Creating new HttpRequest");
            this.B = new R(this, this.a, this.e, "rpc", this.h);
            this.B.na = this.xa;
            this.B.zb = this.kc;
            var a = this.$b.D();
            Q(a, "RID", "rpc");
            Q(a, "SID", this.e);
            Q(a, "CI", this.Db ? "0" : "1");
            Q(a, "AID", this.eb);
            sf(this, a);
            if (re()) Q(a, "TYPE", "xmlhttp"), ue(this.B, a, l, this.lb, n);
            else
            {
                Q(a, "TYPE", "html");
                var b = this.B,
                    c = Boolean(this.lb);
                b.za = 3;
                b.ea = Xd(a.D());
                Ie(b, c)
            }
            S(this.a, "New Request created")
        }
    };
    var xf = function (a)
    {
        if (a.v)
        {
            var b = a.v.uc(a);
            if (0 != b) return S(a.a, "Handler returned error code from okToMakeRequest"), We(a, b), n
        }
        return l
    }, Xe = function (a, b, c)
        {
            S(a.a, "Test Connection Finished");
            a.Db = c;
            a.Z = b.ta;
            S(a.a, "connectChannel_()");
            a.r(1, 0);
            a.hb = Df(a, a.Cb);
            wf(a)
        }, Ze = function (a, b)
        {
            S(a.a, "Test Connection Failed");
            a.Z = b.ta;
            We(a, 2)
        };
    mf.prototype.vc = function (a, b)
    {
        if (!(0 == this.b || this.B != a && this.L != a)) if (this.Z = a.Ia, this.L == a && 3 == this.b) if (7 < this.pa)
                {
                    var c;
                    try
                    {
                        c = this.i.parse(b)
                    }
                    catch (d)
                    {
                        c = m
                    }
                    if (s(c) && 3 == c.length)
                    {
                        var e = c;
                        if (0 == e[0]) a: if (S(this.a, "Server claims our backchannel is missing."), this.ba) S(this.a, "But we are currently starting the request.");
                            else
                            {
                                if (this.B) if (this.B.Ka + 3E3 < this.L.Ka) vf(this), Le(this.B), this.B = m;
                                    else break a;
                                    else Ee(this.a, "We do not have a BackChannel established");
                                Cf(this);
                                U()
                            }
                            else this.ec = e[1], c = this.ec -
                                    this.eb, 0 < c && (e = e[2], S(this.a, e + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > e && (this.Db && 0 == this.Ba) && !this.sa && (this.sa = Je(u(this.q, this), 6E3)))
                    }
                    else S(this.a, "Bad POST response data returned"), We(this, 11)
                }
                else "y2f%" != b && (S(this.a, "Bad data returned - missing/invald magic cookie"), We(this, 11));
                else if (this.B == a && vf(this), !/^[\s\xa0]*$/.test(b))
        {
            c = this.i.parse(b);
            C(s(c));
            for (e = 0; e < c.length; e++)
            {
                var f = c[e];
                this.eb = f[0];
                f = f[1];
                2 == this.b ? "c" == f[0] ? (this.e = f[1], this.lb = $e(this,
                    f[2]), f = f[3], f != m ? this.pa = f : this.pa = 6, this.b = 3, this.v && this.v.dc(this), this.$b = Ye(this, this.lb, this.Cb), Af(this)) : "stop" == f[0] && We(this, 7) : 3 == this.b && ("stop" == f[0] ? We(this, 7) : "noop" != f[0] && this.v && this.v.cc(this, f), this.Ba = 0)
            }
        }
    };
    var $e = function (a, b)
    {
        return a.zc ? a.v ? a.v.Ac(b) : b : m
    };
    mf.prototype.q = function ()
    {
        this.sa != m && (this.sa = m, Le(this.B), this.B = m, Cf(this), U())
    };
    var vf = function (a)
    {
        a.sa != m && (r.clearTimeout(a.sa), a.sa = m)
    };
    mf.prototype.jb = function (a)
    {
        S(this.a, "Request complete");
        var b;
        if (this.B == a) vf(this), this.B = m, b = 2;
        else if (this.L == a) this.L = m, b = 1;
        else return;
        this.Z = a.Ia;
        if (0 != this.b) if (a.W) 1 == b ? (v(), nf.dispatchEvent(new pf(nf)), wf(this), this.g.length = 0) : Af(this);
            else
            {
                var c = a.ha;
                if (3 == c || 7 == c || 0 == c && 0 < this.Z) S(this.a, "Not retrying due to error type");
                else
                {
                    S(this.a, "Maybe retrying, last error: " + oe(c, this.Z));
                    var d;
                    if (d = 1 == b) this.L || this.ka ? (hd(this.a.a, "Request already in progress"), d = n) : 1 == this.b || 2 <= this.Na ? d = n :
                            (S(this.a, "Going to retry POST"), this.ka = Je(u(this.t, this, a), Bf(this, this.Na)), this.Na++, d = l);
                    if (d || 2 == b && Cf(this)) return;
                    S(this.a, "Exceeded max number of retries")
                }
                S(this.a, "Error: HTTP request failed");
                switch (c)
                {
                    case 1:
                        We(this, 5);
                        break;
                    case 4:
                        We(this, 10);
                        break;
                    case 3:
                        We(this, 6);
                        break;
                    case 7:
                        We(this, 12);
                        break;
                    default:
                        We(this, 2)
                }
            }
    };
    var Bf = function (a, b)
    {
        var c = 5E3 + Math.floor(1E4 * Math.random());
        a.v || (S(a.a, "Inactive channel"), c *= 2);
        return c * b
    };
    mf.prototype.r = function (a)
    {
        0 <= Na(arguments, this.b) || g(Error("Unexpected channel state: " + this.b))
    };
    var We = function (a, b)
    {
        S(a.a, "Error code " + b);
        if (2 == b || 9 == b)
        {
            var c = m;
            a.v && (c = a.v.tc(a));
            var d = u(a.F, a);
            c || (c = new Jd("//www.google.com/images/cleardot.gif"), Xd(c));
            Pe(c.toString(), 1E4, d)
        }
        else U();
        Ef(a, b)
    };
    mf.prototype.F = function (a)
    {
        a ? (S(this.a, "Successfully pinged google.com"), U()) : (S(this.a, "Failed to ping google.com"), U(), Ef(this, 8))
    };
    var Ef = function (a, b)
    {
        S(a.a, "HttpChannel: error - " + b);
        a.b = 0;
        a.v && a.v.lc(a, b);
        tf(a);
        rf(a)
    }, tf = function (a)
        {
            a.b = 0;
            a.Z = -1;
            if (a.v) if (0 == a.g.length && 0 == a.f.length) a.v.Ob(a);
                else
                {
                    S(a.a, "Number of undelivered maps, pending: " + a.g.length + ", outgoing: " + a.f.length);
                    var b = Ta(a.g),
                        c = Ta(a.f);
                    a.g.length = 0;
                    a.f.length = 0;
                    a.v.Ob(a, b, c)
                }
        }, Df = function (a, b)
        {
            var c = Te(a, m, b);
            S(a.a, "GetForwardChannelUri: " + c);
            return c
        }, Ye = function (a, b, c)
        {
            b = Te(a, a.nb() ? b : m, c);
            S(a.a, "GetBackChannelUri: " + b);
            return b
        }, Te = function (a, b, c)
        {
            var d =
                c instanceof Jd ? c.D() : new Jd(c, h);
            if ("" != d.Ga) b && Ld(d, b + "." + d.Ga), Md(d, d.Xa);
            else var e = window.location,
            d = Yd(e.protocol, b ? b + "." + e.hostname : e.hostname, e.port, c);
            a.Jb && hb(a.Jb, function (a, b)
            {
                Q(d, b, a)
            });
            Q(d, "VER", a.pa);
            sf(a, d);
            return d
        };
    mf.prototype.Kb = function (a)
    {
        a && !this.ub && g(Error("Can't create secondary domain capable XhrIo object."));
        a = new af;
        a.Yb = this.ub;
        return a
    };
    var Je = function (a, b)
    {
        fa(a) || g(Error("Fn must not be null and must be a function"));
        return r.setTimeout(function ()
        {
            a()
        }, b)
    };
    mf.prototype.V = function ()
    {
        nf.dispatchEvent(new qf(nf))
    };
    var U = function ()
    {
        nf.dispatchEvent(new of(nf))
    };
    mf.prototype.nb = function ()
    {
        return this.ub || !re()
    };
    var Ff = function ()
    {};
    q = Ff.prototype;
    q.uc = function ()
    {
        return 0
    };
    q.dc = function ()
    {};
    q.cc = function ()
    {};
    q.lc = function ()
    {};
    q.Ob = function ()
    {};
    q.Bc = function ()
    {
        return {}
    };
    q.tc = function ()
    {
        return m
    };
    q.Ac = function (a)
    {
        return a
    };
    var Gf = function ()
    {
        this.a = [];
        this.b = {}
    };
    y(Gf, z);
    Gf.prototype.g = 1;
    Gf.prototype.f = 0;
    var Hf = function (a, b, c, d)
    {
        if (b = a.b[b])
        {
            var e = a.a;
            (b = Qa(b, function (a)
            {
                return e[a + 1] == c && e[a + 2] == d
            })) && a.Nb(b)
        }
    };
    q = Gf.prototype;
    q.Nb = function (a)
    {
        if (0 != this.f) return this.e || (this.e = []), this.e.push(a), n;
        var b = this.a[a];
        if (b)
        {
            var c = this.b[b];
            c && Ra(c, a);
            delete this.a[a];
            delete this.a[a + 1];
            delete this.a[a + 2]
        }
        return !!b
    };
    q.Xc = function (a, b)
    {
        var c = this.b[a];
        if (c)
        {
            this.f++;
            for (var d = Va(arguments, 1), e = 0, f = c.length; e < f; e++)
            {
                var k = c[e];
                this.a[k + 1].apply(this.a[k + 2], d)
            }
            this.f--;
            if (this.e && 0 == this.f) for (; c = this.e.pop();) this.Nb(c)
        }
    };
    q.clear = function (a)
    {
        if (a)
        {
            var b = this.b[a];
            b && (Oa(b, this.Nb, this), delete this.b[a])
        }
        else this.a.length = 0, this.b = {}
    };
    q.Ca = function (a)
    {
        if (a)
        {
            var b = this.b[a];
            return b ? b.length : 0
        }
        a = 0;
        for (b in this.b) a += this.Ca(b);
        return a
    };
    q.p = function ()
    {
        Gf.s.p.call(this);
        delete this.a;
        delete this.b;
        delete this.e
    };
    var V = 0;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    V++;
    var If = N("online"),
        Jf = N("offline");
    var Kf = function (a, b, c)
    {
        this.b = a;
        this.g = b || 0;
        this.e = c;
        this.f = u(this.i, this)
    };
    y(Kf, z);
    Kf.prototype.a = 0;
    Kf.prototype.p = function ()
    {
        Kf.s.p.call(this);
        Lf(this);
        delete this.b;
        delete this.e
    };
    var Lf = function (a)
    {
        0 != a.a && de.clearTimeout(a.a);
        a.a = 0
    };
    Kf.prototype.i = function ()
    {
        this.a = 0;
        this.b && this.b.call(this.e)
    };
    var Mf = function (a, b, c, d)
    {
        this.b = d != m ? d : 0.15;
        C(0 <= this.b && 1 >= this.b);
        this.g = a;
        this.i = b;
        this.h = c;
        this.a = new Kf(this.k, h, this);
        this.f = m;
        this.e = 0
    };
    y(Mf, z);
    var Of = function (a, b)
    {
        b && (Lf(a.a), Nf(a, a.i));
        if (0 == a.a.a)
        {
            var c = v(),
                c = Math.max(0, (a.f == m ? c : a.f + a.e) - c);
            0 == c && (a.e = 0);
            var d = a.a;
            Lf(d);
            d.a = he(d.f, c !== h ? c : d.g)
        }
    }, Nf = function (a, b)
        {
            0 < b && 0 != a.b && (b = Math.floor(b * (1 - a.b + 2 * Math.random() * a.b)));
            a.e = b
        };
    Mf.prototype.k = function ()
    {
        this.f = v();
        Nf(this, Math.min(Math.max(2 * this.e, this.i), this.h));
        this.g()
    };
    Mf.prototype.p = function ()
    {
        this.a.J();
        delete this.a;
        delete this.g;
        Mf.s.p.call(this)
    };
    var Pf = function (a, b, c, d)
    {
        this.e = new Mf(u(this.Oc, this), c || 5E3, d || 45E3);
        this.a = new md(this);
        this.f = a;
        (this.b = b || m) && od(od(this.a, this.b, If, this.Nc), this.b, Jf, this.Mc);
        va(this, ma(B, this.e));
        va(this, ma(B, this.a))
    };
    y(Pf, z);
    q = Pf.prototype;
    q.Ta = n;
    q.oc = ld("docs.net.RetryManager");
    q.Nc = function ()
    {
        id(this.oc, "OfflineObserver signalled ONLINE state.");
        this.Ta && Of(this.e, l)
    };
    q.Mc = function ()
    {
        id(this.oc, "OfflineObserver signalled OFFLINE state.");
        Lf(this.e.a)
    };
    q.Oc = function ()
    {
        if (this.Ta && (!this.b || this.b.a())) this.Ta = n, this.f()
    };
    q.p = function ()
    {
        delete this.f;
        delete this.a;
        delete this.e;
        delete this.b;
        Pf.s.p.call(this)
    };
    var Rf = function (a, b, c, d, e, f)
    {
        this.Gb = c || m;
        this.bb = !! e;
        this.k = ca;
        this.a = new md(this);
        this.h = this.e = this.r = m;
        this.xb = a || Qf;
        this.T = m;
        this.f = new Gf;
        this.da = b;
        this.t = n;
        this.q = m;
        this.l = this.U = this.G = n;
        (this.i = d || m) && od(this.a, this.i, [If, Jf], ma(this.Eb, h));
        this.H = new Pf(u(this.Kc, this), this.i || h);
        this.S = -1;
        this.g = m;
        this.aa = {};
        this.wb = !! f;
        this.A = n
    };
    y(Rf, Ff);
    Rf.prototype.b = m;
    Rf.prototype.oa = m;
    Rf.prototype.F = ld("docs.net.BrowserChannel");
    var Sf = function (a, b, c, d)
    {
        a = a.f;
        var e = a.b[b];
        e || (e = a.b[b] = []);
        var f = a.g;
        a.a[f] = b;
        a.a[f + 1] = c;
        a.a[f + 2] = d;
        a.g = f + 3;
        e.push(f)
    };
    Rf.prototype.Ac = function (a)
    {
        return this.Gb || a
    };
    var Qf = function (a)
    {
        if (1 == a.length && t(a[0]))
        {
            var b = a[0];
            xa(b, "{this._action=") ? (a = {}, function ()
            {
                eval(b)
            }.call(a), a = [0, a._lsq, [b, a], a._tfe]) : a = rd(b)
        }
        return {
            type: a[0],
            vb: a[1],
            data: a[2],
            ab: a[3] || m
        }
    };
    Rf.prototype.cc = function (a, b)
    {
        var c = this.xb.call(m, b);
        C("number" == typeof c.type, "Event type must be a number: " + c.type);
        C("number" == typeof c.vb, "Event sequence number must be a number: " + c.vb);
        C(ga(c.data), "Event data must be of type object: " + c.data);
        C(t(c.ab) || c.ab === m, "Event tfe param must be of type string or null: " + c.ab);
        if (c.vb > this.S)
        {
            this.S = c.vb;
            if (this.T != c.ab)
            {
                var d = c.ab;
                this.T = d;
                Tf(this, "tfe_changed", d)
            }
            Tf(this, String(c.type), c.data)
        }
    };
    var Tf = function (a, b, c)
    {
        a.Ab && a.Ab(b, c);
        a.f.Xc(b, c)
    };
    Rf.prototype.Bc = function ()
    {
        var a = db(this.aa);
        C(!a.lsq && !a.u && !a.c && !a.w);
        a.lsq = String(this.S);
        this.oa != m && (a.u = this.oa);
        return a
    };
    Rf.prototype.uc = function ()
    {
        if (this.cb) try
            {
                this.cb.a()
        }
        catch (a)
        {
            g(a)
        }
        return 0
    };
    Rf.prototype.dc = function ()
    {
        O(this.F, "Underlying channel opened.");
        this.t = l;
        this.l = n;
        this.Eb(0)
    };
    Rf.prototype.Ob = function ()
    {
        O(this.F, "Underlying channel closed.");
        this.t = n;
        if (!this.l)
        {
            var a = this.H;
            a.Ta = l;
            (!a.b || a.b.a()) && Of(a.e)
        }
    };
    var Vf = function (a, b, c, d)
    {
        a.r = b || a.r;
        a.e = c || a.e;
        a.h = d || a.h || "";
        C(!ya(a.h), "The URL prefix shouldn't end with a trailing slash");
        !a.t && !a.l && (a.U = l, Uf(a))
    }, Uf = function (a)
        {
            C( !! a.r, "browser channel ID must be defined");
            C(a.h != m, "url prefix must be defined");
            a.b && (a.b.v = m, uf(a.b));
            a.b = a.Lb();
            var b = {
                id: a.r
            };
            a.e && (b.sid = a.e);
            var c = a.b,
                d = a.h + "/test",
                tmp = a;
            a = a.h + "/bind";
            S(c.a, "connect()");
            console.log(tmp);
            U();
            c.Cb = a;
            c.Jb = b || {};
            S(c.a, "connectTest_()");
            xf(c) && (c.ja = new Se(c, c.a), c.ja.Hb = c.xa, c.ja.e = c.i, b = c.ja, b.Ib = d, d = Df(b.a, b.Ib),
                U(), b.bc = v(), c = b.a.H, c != m ? (b.Qa = $e(b.a, c[0]), b.Ma = c[1], b.Ma ? (b.O = 1, Ue(b)) : (b.O = 2, Ve(b))) : (Wd(d, "MODE", "init"), b.N = new R(b, b.b, h, h, h), b.N.na = b.Hb, ue(b.N, d, n, m, l), b.O = 0))
        }, Wf = function (a)
        {
            a.g = m;
            a.q = m;
            a.t && (a.U = n, a.l = n, uf(a.b))
        };
    q = Rf.prototype;
    q.Kc = function ()
    {
        if (this.U && !this.t)
        {
            this.l = l;
            Uf(this);
            var a = this.H;
            a.Ta = l;
            (!a.b || a.b.a()) && Of(a.e)
        }
    };
    q.Lb = function ()
    {
        var a;
        a = this.da ? this.da() : new mf("1");
        a.xa = {
            "X-Same-Domain": "1"
        };
        a.zc = l;
        a.ub = this.wb;
        this.bb && (a.kc = 200);
        a.v = this;
        return a
    };
    q.lc = function (a, b)
    {
        this.Eb(b)
    };
    q.Eb = function (a)
    {
        if (a != m)
        {
            this.q = a;
            if (!this.G && 6 == a)
            {
                this.G = l;
                Vf(this);
                return
            }
            this.G = n;
            if (2 == a && 409 == (this.b ? this.b.Z : -1)) this.T = m, Tf(this, "tfe_changed", m)
        }
        a = this.i && !this.i.a() ? 8 : this.q != m ? this.q : 0;
        a != this.g && (O(this.F, "Reporting error state: " + a), this.g = a, this.k.call(r, a))
    };
    q.tc = function ()
    {
        return new Jd("//www.google.com/images/cleardot.gif")
    };
    q.J = function ()
    {
        this.A || (this.A = l, this.b && (this.b.v = m, uf(this.b), delete this.b), B(this.a), B(this.H), B(this.f), delete this.a, delete this.H, delete this.i, delete this.f)
    };
    q.Ra = function ()
    {
        return this.A
    };
    var Xf = function ()
    {
        Rf.call(this)
    };
    y(Xf, Rf);
    Xf.prototype.Lb = function ()
    {
        var a = Xf.s.Lb.call(this);
        a.xa = m;
        return a
    };
    var W = function (a)
    {
        I.call(this, a)
    };
    y(W, I);
    w("gapi.drive.realtime.CollaborativeList", W);
    W.prototype.b = function ()
    {
        this.j();
        var a = J(this);
        return K(this).a.getListSize(a)
    };
    W.prototype.U = function (a)
    {
        this.j();
        a = D(a, "length");
        a != this.b() && (a > this.b() && g(Error("Cannot set the list length to be greater than the current value.")), this.i(a, this.b()))
    };
    W.prototype.get = function (a)
    {
        D(a, "index");
        this.j();
        var b = this.a,
            c = J(this);
        a = K(this).a.getListItem(c, a);
        return Gb(b, a)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.get", W.prototype.get);
    W.prototype.push = function (a)
    {
        this.j();
        var b = J(this),
            c = this.b();
        a = Pb(this.a, a);
        K(this).a.insertIntoList(b, c, a);
        return this.b()
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.push", W.prototype.push);
    W.prototype.F = function (a)
    {
        this.j();
        var b = J(this),
            c = this.b();
        a = Yf(this.a, a);
        K(this).a.insertAllIntoList(b, c, a)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.pushAll", W.prototype.F);
    W.prototype.q = function (a, b)
    {
        D(a, "index");
        this.j();
        var c = J(this),
            d = Pb(this.a, b);
        K(this).a.insertIntoList(c, a, d)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.insert", W.prototype.q);
    W.prototype.A = function (a, b)
    {
        D(a, "index");
        this.j();
        var c = J(this),
            d = Yf(this.a, b);
        K(this).a.insertAllIntoList(c, a, d)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.insertAll", W.prototype.A);
    W.prototype.set = function (a, b)
    {
        D(a, "index");
        this.j();
        var c = J(this),
            d = Pb(this.a, b);
        K(this).a.setListItem(c, a, d)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.set", W.prototype.set);
    W.prototype.T = function (a, b)
    {
        D(a, "index");
        this.j();
        var c = J(this),
            d = Yf(this.a, b);
        K(this).a.replaceListItems(c, a, d)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.replaceRange", W.prototype.T);
    W.prototype.clear = function ()
    {
        this.j();
        var a = J(this);
        K(this).a.clearList(a)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.clear", W.prototype.clear);
    W.prototype.l = function (a)
    {
        D(a, "index");
        this.j();
        var b = J(this);
        K(this).a.removeFromList(b, a)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.remove", W.prototype.l);
    W.prototype.i = function (a, b)
    {
        D(a, "startIndex");
        D(b, "endIndex");
        this.j();
        var c = J(this);
        K(this).a.removeRange(c, a, b)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.removeRange", W.prototype.i);
    W.prototype.S = function (a)
    {
        this.j();
        a = this.indexOf(a);
        if (0 <= a)
        {
            var b = J(this);
            K(this).a.removeFromList(b, a)
        }
        return 0 <= a
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.removeValue", W.prototype.S);
    W.prototype.indexOf = function (a, b)
    {
        this.j();
        for (var c = 0; c < this.b(); c++) if (b ? b(this.get(c), a) : this.get(c) == a) return c;
        return -1
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.indexOf", W.prototype.indexOf);
    W.prototype.lastIndexOf = function (a, b)
    {
        this.j();
        for (var c = 0; c < this.b(); c++)
        {
            var d = this.b() - c - 1;
            if (b ? b(this.get(d), a) : this.get(d) == a) return d
        }
        return -1
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.lastIndexOf", W.prototype.lastIndexOf);
    W.prototype.h = function ()
    {
        this.j();
        return zb(this.a, J(this)) || []
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.asArray", W.prototype.h);
    W.prototype.k = function (a, b)
    {
        D(a, "index");
        qb(b);
        this.j();
        return Rb(this.a, J(this), a, b)
    };
    w("gapi.drive.realtime.CollaborativeList.prototype.registerReference", W.prototype.k);
    var $f = function (a, b)
    {
        var c = Zf(K(a), J(a), function (c)
        {
            b(Ab(a, a.a, c))
        });
        K(a).bind(b, c)
    }, bg = function (a, b)
        {
            var c = ag(K(a), J(a), function (c)
            {
                b(Cb(a, a.a, c))
            });
            K(a).bind(b, c)
        }, dg = function (a, b)
        {
            var c = cg(K(a), J(a), function (c)
            {
                b(Eb(a, a.a, c))
            });
            K(a).bind(b, c)
        };
    W.prototype.length = oa(W.prototype.b, W.prototype.U);
    w("gapi.drive.realtime.CollaborativeList.prototype.length", W.prototype.length);
    W.prototype.ca = function ()
    {
        W.s.ca.call(this);
        var a = this;
        $f(this, function (b)
        {
            a.dispatchEvent(b)
        });
        bg(this, function (b)
        {
            a.dispatchEvent(b)
        });
        dg(this, function (b)
        {
            a.dispatchEvent(b)
        })
    };
    ra(W.prototype);
    var X = function (a)
    {
        I.call(this, a)
    };
    y(X, I);
    w("gapi.drive.realtime.CollaborativeMap", X);
    X.prototype.b = function ()
    {
        this.j();
        var a = J(this);
        return K(this).a.getMapSize(a)
    };
    X.prototype.$a = function ()
    {
        this.j();
        return 0 == this.b()
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.isEmpty", X.prototype.$a);
    X.prototype.q = function (a)
    {
        this.j();
        rb(a, "key");
        return this.get(a) != m
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.has", X.prototype.q);
    X.prototype.set = function (a, b)
    {
        this.j();
        rb(a, "key");
        var c = J(this),
            d = Pb(this.a, b);
        return K(this).a.put(c, a, d)
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.set", X.prototype.set);
    X.prototype.get = function (a)
    {
        this.j();
        rb(a, "key");
        return Gb(this.a, K(this).get(J(this), a))
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.get", X.prototype.get);
    X.prototype.clear = function ()
    {
        this.j();
        var a = J(this);
        K(this).a.clearMap(a)
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.clear", X.prototype.clear);
    X.prototype.i = function (a)
    {
        this.j();
        rb(a, "key");
        var b = this.a,
            c = J(this);
        a = K(this).a.removeFromMap(c, a);
        return Gb(b, a)
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.delete", X.prototype.i);
    X.prototype.h = function ()
    {
        this.j();
        var a = K(this).$(J(this));
        return zb(this.a, a)
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.keys", X.prototype.h);
    X.prototype.l = function ()
    {
        this.j();
        var a = K(this).I(J(this));
        return zb(this.a, a)
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.values", X.prototype.l);
    X.prototype.A = function ()
    {
        this.j();
        var a;
        a = J(this);
        a = K(this).a.getItems(a);
        for (var b = [], c = 0; c < a.length; c++)
        {
            var d = a[c],
                e = [];
            e.push(Gb(this.a, d[0]));
            e.push(Gb(this.a, d[1]));
            b.push(e)
        }
        return b
    };
    w("gapi.drive.realtime.CollaborativeMap.prototype.items", X.prototype.A);
    var fg = function (a, b)
    {
        var c = eg(K(a), J(a), function (c)
        {
            b(Lb(a, a.a, c))
        });
        K(a).bind(b, c)
    };
    X.prototype.k = qa(X.prototype.b);
    w("gapi.drive.realtime.CollaborativeMap.prototype.size", X.prototype.k);
    X.prototype.ca = function ()
    {
        X.s.ca.call(this);
        var a = this;
        fg(this, function (b)
        {
            a.dispatchEvent(b)
        })
    };
    ra(X.prototype);
    var gg = function (a, b)
    {
        G.call(this, "collaborator_joined", a);
        this.collaborator = this.f = b
    };
    y(gg, G);
    w("gapi.drive.realtime.CollaboratorJoinedEvent", gg);
    w("gapi.drive.realtime.CollaboratorJoinedEvent", gg);
    var ig = function (a, b)
    {
        var c = new hg(b.userId, b.sessionId, b.displayName, b.color, b.isMe, b.isAnonymous, b.photoUrl);
        return new gg(a, c)
    }, jg = function (a, b)
        {
            G.call(this, "collaborator_left", a);
            this.collaborator = this.f = b
        };
    y(jg, G);
    w("gapi.drive.realtime.CollaboratorLeftEvent", jg);
    w("gapi.drive.realtime.CollaboratorLeftEvent", jg);
    var kg = function (a, b)
    {
        var c = new hg(b.userId, b.sessionId, b.displayName, b.color, b.isMe, b.isAnonymous, b.photoUrl);
        return new jg(a, c)
    }, hg = function (a, b, c, d, e, f, k)
        {
            this.userId = this.f = a;
            this.sessionId = this.g = b;
            this.displayName = this.b = c;
            this.color = this.color = d;
            this.isMe = this.a = e;
            this.isAnonymous = this.e = f;
            this.photoUrl = this.i = k
        };
    w("gapi.drive.realtime.Collaborator", hg);
    var lg = function (a, b, c, d, e, f, k, p)
    {
        this.b = a;
        this.g = c;
        this.f = d;
        this.h = e;
        this.k = f || "";
        this.i = !! k;
        this.l = p || 0;
        v()
    }, mg = function (a)
        {
            return new lg(a.sid, 0, a.displayName, a.color, a.photoUrl || "", a.profileId || "", a.isMe, a.userType)
        };
    lg.prototype.a = function ()
    {
        return this.i
    };
    lg.prototype.e = function ()
    {
        return 0 != this.l
    };
    var ng = N("session_active");
    N("session_before_leave");
    var og = N("session_chat"),
        pg = N("session_join"),
        qg = N("session_leave");
    var rg = function (a)
    {
        G.call(this, ng, a)
    };
    y(rg, G);
    var sg = function (a, b, c)
    {
        G.call(this, og, a);
        this.message = c
    };
    y(sg, G);
    var tg = function (a, b)
    {
        G.call(this, pg, a);
        this.f = b
    };
    y(tg, G);
    var ug = function (a, b)
    {
        G.call(this, qg, a);
        this.f = b
    };
    y(ug, G);
    var vg = function ()
    {
        this.i = {}
    };
    y(vg, yd);
    var wg = function (a, b, c, d, e, f)
    {
        this.i = {};
        this.e = a;
        Sf(a, "14", this.Jc, this);
        Sf(a, "5", this.Wb, this);
        Sf(a, "6", this.Xb, this);
        Sf(a, "7", this.Vb, this);
        f && Sf(a, "0", this.Ub, this);
        this.h = b;
        this.f = d;
        this.a = e || {};
        this.b = f || m;
        this.g = new md(this)
    };
    y(wg, vg);
    q = wg.prototype;
    q.Jc = function (a)
    {
        this.a[a.sid] && this.dispatchEvent(new rg(this))
    };
    q.Wb = function (a)
    {
        a = this.f(a);
        a.a() ? this.a = {} : C(!this.a[a.b], "Session already known for this collaborator");
        this.a[a.b] = a;
        this.dispatchEvent(new tg(this, a))
    };
    q.Xb = function (a)
    {
        a = Ja(a.sid);
        var b = this.a[a];
        b && (delete this.a[a], this.dispatchEvent(new ug(this, b)))
    };
    q.Vb = function (a)
    {
        var b = Ja(a.sid);
        C( !! this.a[b], "A collaborator for sid " + b + " does not exist.");
        this.dispatchEvent(new sg(this, 0, a.msg));
        xg(this, b)
    };
    q.Ub = function (a)
    {
        this.b && (a = this.b(a)) && xg(this, a)
    };
    var xg = function (a, b)
    {
        var c = a.a[b];
        C(c, "A collaborator for sid " + b + " does not exist.");
        c && v()
    };
    wg.prototype.p = function ()
    {
        wg.s.p.call(this);
        delete this.h;
        var a = this.e;
        Hf(a.f, "5", this.Wb, this);
        Hf(a.f, "6", this.Xb, this);
        Hf(a.f, "7", this.Vb, this);
        this.b && Hf(a.f, "0", this.Ub, this);
        delete this.e;
        B(this.g);
        B(m)
    };
    var yg = function (a)
    {
        this.a = {};
        (a = a || r._docs_flag_initialData) && fb(this.a, a)
    };
    yg.b = function ()
    {
        return yg.a ? yg.a : yg.a = new yg
    };
    yg.prototype.get = function (a)
    {
        return this.a[a]
    };
    N("save_state_change");
    N("commentable_change");
    N("create_requested");
    N("created");
    N("editable_change");
    V++;
    N("acl_change");
    N("anonymity_change");
    N("cold-start-offline-enabled");
    N("description_change");
    N("docos_keydata_change");
    N("email_change");
    N("import_warnings_change");
    N("last_modified_change");
    N("needs_user_attribute_refresh");
    N("owner_change");
    N("parent_collections_change");
    N("star_change");
    N("subscribe_change");
    N("title_change");
    N("trash_change");
    var zg = {
        md: "concurrent_creation",
        pd: "invalid_compound_operation",
        qd: "not_found",
        od: "forbidden",
        td: "server_error",
        jd: "client_error",
        wd: "token_refresh_required"
    };
    w("gapi.drive.realtime.ErrorType", zg);
    zg.CONCURRENT_CREATION = "concurrent_creation";
    zg.INVALID_COMPOUND_OPERATION = "invalid_compound_operation";
    zg.NOT_FOUND = "not_found";
    zg.FORBIDDEN = "forbidden";
    zg.SERVER_ERROR = "server_error";
    zg.CLIENT_ERROR = "client_error";
    zg.TOKEN_REFRESH_REQUIRED = "token_refresh_required";
    var Ag = function (a, b, c)
    {
        this.type = this.type = a;
        this.message = this.message = b;
        this.isFatal = this.a = c
    };
    w("gapi.drive.realtime.Error", Ag);
    var Bg = function ()
    {};
    Bg.prototype.toString = function ()
    {
        return this.a.toString()
    };
    var Cg = function (a)
    {
        var b = a;
        a = [];
        b || (b = ["er"]);
        this.a = b;
        if (a) for (b = 0; b < a.length; b++) this.a[a[b]] = this.a[a[b]] || []
    };
    y(Cg, Bg);
    Cg.a = "er";
    var Dg = ac();
    Dg && (-1 != Dg.indexOf("Firefox") || -1 != Dg.indexOf("Camino") || -1 != Dg.indexOf("iPhone") || -1 != Dg.indexOf("iPod") || -1 != Dg.indexOf("iPad") || -1 != Dg.indexOf("Android") || -1 != Dg.indexOf("Chrome") || Dg.indexOf("Safari"));
    /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
    N("async-service-code-loading");
    N("async-service-code-loaded");
    var Eg = function (a, b)
    {
        this.f = b;
        this.b = [];
        a > this.f && g(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
        for (var c = 0; c < a; c++) this.b.push(this.a())
    };
    y(Eg, z);
    Eg.prototype.P = function ()
    {
        return this.b.length ? this.b.pop() : this.a()
    };
    Eg.prototype.a = function ()
    {
        return {}
    };
    Eg.prototype.e = function (a)
    {
        if (ga(a)) if (fa(a.J)) a.J();
            else for (var b in a) delete a[b]
    };
    Eg.prototype.p = function ()
    {
        Eg.s.p.call(this);
        for (var a = this.b; a.length;) this.e(a.pop());
        delete this.b
    };
    var Hg = function ()
    {
        this.a = [];
        this.e = new ib;
        this.f = new ib;
        this.i = 1;
        this.g = new Eg(0, 4E3);
        this.g.a = function ()
        {
            return new Fg
        };
        this.h = new Eg(0, 50);
        this.h.a = function ()
        {
            return new Gg
        };
        var a = this;
        this.b = new Eg(0, 2E3);
        this.b.a = function ()
        {
            return String(a.i++)
        };
        this.b.e = function ()
        {}
    }, Gg = function ()
        {
            this.time = this.count = 0
        };
    Gg.prototype.toString = function ()
    {
        var a = [];
        a.push(this.type, " ", this.count, " (", Math.round(10 * this.time) / 10, " ms)");
        return a.join("")
    };
    var Fg = function ()
    {}, Kg = function (a, b, c)
        {
            var d = []; - 1 == b ? d.push("    ") : d.push(Ig(a.b - b));
            d.push(" ", Jg(a.b - 0));
            0 == a.a ? d.push(" Start        ") : 1 == a.a ? (d.push(" Done "), d.push(Ig(a.g - a.startTime), " ms ")) : d.push(" Comment      ");
            d.push(c, a);
            0 < a.f && d.push("[VarAlloc ", a.f, "] ");
            return d.join("")
        };
    Fg.prototype.toString = function ()
    {
        return this.type == m ? this.e : "[" + this.type + "] " + this.e
    };
    Hg.prototype.toString = function ()
    {
        for (var a = [], b = -1, c = [], d = 0; d < this.a.length; d++)
        {
            var e = this.a[d];
            1 == e.a && c.pop();
            a.push(" ", Kg(e, b, c.join("")));
            b = e.b;
            a.push("\n");
            0 == e.a && c.push("|  ")
        }
        if (0 != this.e.Ca())
        {
            var f = v();
            a.push(" Unstopped timers:\n");
            Za(this.e, function (b)
            {
                a.push("  ", b, " (", f - b.startTime, " ms, started at ", Jg(b.startTime), ")\n")
            })
        }
        b = this.f.$();
        for (d = 0; d < b.length; d++) c = this.f.get(b[d]), 1 < c.count && a.push(" TOTAL ", c, "\n");
        a.push("Total tracers created ", 0, "\n", "Total comments created ", 0,
            "\n", "Overhead start: ", 0, " ms\n", "Overhead end: ", 0, " ms\n", "Overhead comment: ", 0, " ms\n");
        return a.join("")
    };
    var Ig = function (a)
    {
        a = Math.round(a);
        var b = "";
        1E3 > a && (b = " ");
        100 > a && (b = "  ");
        10 > a && (b = "   ");
        return b + a
    }, Jg = function (a)
        {
            a = Math.round(a);
            return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4)
        };
    new Hg;
    N("exception");
    ld("goog.debug.ErrorReporter");
    V++;
    var Lg = N("fatal-error");
    N("incident");
    var Mg = function ()
    {
        this.a = {}
    };
    y(Mg, z);
    Mg.prototype.Ea = function (a, b, c)
    {
        fa(a) ? c && (a = u(a, c)) : a && "function" == typeof a.handleEvent ? a = u(a.handleEvent, a) : g(Error("Invalid listener argument"));
        c = new Ng;
        a = he(u(this.b, this, a, c), b);
        this.a[a] = l;
        return c.a = a
    };
    Mg.prototype.b = function (a, b)
    {
        var c = b.a;
        c === m || delete this.a[c];
        a()
    };
    Mg.prototype.clear = function (a)
    {
        a === m || delete this.a[a];
        de.clearTimeout(a)
    };
    Mg.prototype.p = function ()
    {
        for (var a in this.a) de.clearTimeout(Number(a));
        Mg.s.p.call(this)
    };
    var Ng = function ()
    {
        this.a = m
    };
    var Og = function ()
    {
        var a;
        a = yg.b().get("info_params");
        this.a = (a = a != m ? Object(a) : {}) ? db(a) : {}
    };
    var Pg = function (a, b, c, d)
    {
        G.call(this, a);
        this.errorCode = b;
        this.f = c;
        this.k = d
    };
    y(Pg, G);
    Pg.prototype.l = m;
    Pg.prototype.t = "";
    Pg.prototype.h = m;
    var Qg = N("error"),
        Rg = N("ok"),
        Sg = N("network_warning"),
        Tg = N("server_warning"),
        Ug = N("clienterror"),
        Vg = N("restart_now");
    var Wg = function (a, b)
    {
        this.e = [];
        this.g = a;
        this.f = b || m;
        this.b = this.a = m;
        this.f && (this.b = new ee(500), this.a = new md(this), od(this.a, this.b, "tick", this.i))
    };
    y(Wg, z);
    Wg.prototype.contains = function (a)
    {
        return 0 <= Na(this.e, a)
    };
    Wg.prototype.i = function ()
    {
        for (; 0 < this.e.length && this.f.b();) this.f.a(), this.g(this.e.shift());
        0 == this.e.length && this.b && fe(this.b)
    };
    Wg.prototype.p = function ()
    {
        B(this.a);
        B(this.b);
        Wg.s.p.call(this)
    };
    var Xg = function (a, b, c, d, e, f, k, p, A, F, x)
    {
        this.b = a;
        this.f = b;
        this.e = c;
        this.i = x || (b ? "POST" : "GET");
        this.responseType = k;
        this.h = d;
        this.g = e;
        this.k = f;
        this.a = p;
        this.l = F
    };
    y(Xg, z);
    q = Xg.prototype;
    q.yb = 0;
    q.Tb = 0;
    q.yc = 0;
    q.ga = m;
    q.fb = m;
    q.p = function ()
    {
        if (this.a)
        {
            var a = this.a;
            if (a.k.contains(this))
            {
                var b = a.k;
                Ra(b.e, this);
                0 == b.e.length && b.b && fe(b.b);
                Ra(a.f, this);
                Ra(a.l, this)
            }
            else Yg(a, this)
        }
        this.ga && (this.ga.J(), this.ga = m);
        delete this.a;
        delete this.g;
        delete this.h;
        Xg.s.p.call(this)
    };
    var Zg = function (a, b)
    {
        this.f = a;
        this.a = b
    };
    q = Zg.prototype;
    q.ic = 3;
    q.fc = ca;
    q.Lc = function ()
    {
        return m
    };
    q.gc = ca;
    q.hc = 2E4;
    q.Q = function (a)
    {
        var b = [this.a];
        Ua(b, arguments);
        this.a = Gd.apply(m, b);
        return this
    };
    var $g = function (a, b)
    {
        a.b = b;
        return a
    }, ah = function (a, b)
        {
            a.fc = u(b, h);
            return a
        }, bh = function (a, b)
        {
            a.ic = b;
            return a
        }, ch = function (a, b)
        {
            a.gc = u(b, h);
            return a
        };
    Zg.prototype.setTimeout = function (a)
    {
        this.hc = a;
        return this
    };
    var dh = function (a)
    {
        var b;
        ("GET" == a.e || "HEAD" == a.e) && C(!a.b, "GET and HEAD methods do not support request content.");
        b = new Xg(a.a, a.b, a.ic, a.gc, a.fc, a.Lc, "", a.f, 0, a.hc, a.e);
        a.f.send(b)
    };
    var eh = function (a, b, c)
    {
        this.f = a;
        this.a = b || bf.nc;
        this.e = c || m;
        a != m && (this.a == bf.nc || this.a == bf.Tc ? C(t(a), "Response doesn't match string response type.") : this.a == bf.ARRAY_BUFFER ? C(ArrayBuffer != m && a instanceof ArrayBuffer, "Response doesn't match ArrayBuffer response type.") : this.a == bf.Rc ? C(Blob != m && a instanceof Blob, "Response doesn't match ArrayBuffer response type.") : this.a == bf.Sc ? C(Document != m && a instanceof Document, "Response doesn't match Document response type.") : C(n, "Unknown response type: " + this.a))
    },
        fh = function (a)
        {
            C("" == a.a || "text" == a.a, "Cannot get string for response of type: " + a.a + ". Use Response.getTypedResponse().");
            return a.f || ""
        };
    eh.prototype.P = function ()
    {
        if (this.b === h)
        {
            var a = fh(this),
                a = a && rd(a.replace(/^[^[{]+/, "")) || m;
            C("object" == typeof a, "The server response should be null, an object, or an array.");
            this.b = a
        }
        return this.b
    };
    var hh = function ()
    {
        G.call(this, gh)
    };
    y(hh, G);
    var gh = N("StatusChangeEvent");
    var jh = function ()
    {
        this.i = {};
        this.a = ih
    };
    y(jh, yd);
    var kh = N("restart_soon");
    jh.prototype.b = ld("docs.net.Status");
    var lh = function (a, b)
    {
        var c = a.a;
        b != c && (id(a.b, "Net state changed from " + c + " to " + b), a.a = b, a.dispatchEvent(new hh))
    }, nh = function (a, b)
        {
            this.e = a;
            this.a = b;
            C(mh[a] == m, "docs.net.Status.State instances should be uniquely named.");
            mh[a] = this
        }, mh = {};
    nh.prototype.b = function ()
    {
        return 1 == this.a
    };
    var ih = new nh("IDLE", 1),
        oh = new nh("BUSY", 1),
        ph = new nh("RECOVERING", 2),
        qh = new nh("OFFLINE", 3),
        rh = new nh("SERVER_DOWN", 3),
        sh = new nh("FORBIDDEN", 4),
        th = new nh("AUTH_REQUIRED", 4),
        uh = new nh("INCOMPATIBLE_SERVER", 5),
        vh = new nh("CLIENT_ERROR", 5),
        wh = new nh("SAVE_ERROR", 5);
    nh.prototype.toString = function ()
    {
        return this.e
    };
    var yh = function (a, b, c, d, e, f)
    {
        this.i = {};
        this.b = m;
        this.a = new md(this);
        this.A = c || m;
        c && od(this.a, c, Lg, this.U);
        this.S = 5E3 * (0.75 + 0.5 * Math.random());
        this.G = {
            "X-Same-Domain": "1"
        };
        this.e = d || new jh;
        this.r = new Mg;
        this.F = "";
        this.f = [];
        this.l = [];
        this.k = new Wg(u(this.oa, this), f);
        this.h = e || new Og;
        a = (a || r).location.href;
        b = a.search(Id);
        c = Hd(a, "authkey", b);
        if (0 > c) a = m;
        else
        {
            d = a.indexOf("&", c);
            if (0 > d || d > b) d = b;
            c += 8;
            a = decodeURIComponent(a.substr(c, d - c).replace(/\+/g, " "))
        }
        xh(this, "authkey", a);
        this.g = ld("docs.net.NetService")
    };
    y(yh, yd);
    var Ah = function (a, b)
    {
        C(xa(b, "/"));
        return new Zg(a, a.F + b)
    };
    yh.prototype.send = function (a)
    {
        var b = this.f;
        0 <= Na(b, a) || b.push(a);
        a: {
            b = this.k;
            if (b.f)
            {
                if (!b.f.b() || 0 != b.e.length)
                {
                    b.e.push(a);
                    ge(b.b);
                    break a
                }
                b.f.a()
            }
            b.g(a)
        }
    };
    yh.prototype.oa = function (a)
    {
        if (!(5 <= this.e.a.a))
        {
            a.ga && a.ga.J();
            a.a = this;
            a.Tb = v();
            var b = a.ga = new af;
            pd(this.a, b, "complete", u(this.da, this, a));
            b.La = Math.max(0, a.l);
            "" != a.responseType && (b.fa = a.responseType);
            var c = a.b,
                d;
            for (d in this.h.a) 0 <= Hd(a.b, d, a.b.search(Id)) && g(Error("Request for uri " + a.b + " already contains reserved additional param " + d));
            c = [c];
            d = this.h.a;
            for (var e in d) Ed(e, d[e], c);
            c = Dd(c);
            this.e.a == ih && lh(this.e, oh);
            b.send(c, a.i, a.f, this.G)
        }
    };
    yh.prototype.da = function (a)
    {
        O(this.g, "handleXhrComplete_()");
        var b = a.ga,
            c;
        c = "";
        var d = m;
        try
        {
            c = "" == b.fa ? ye(b) : lf(b), d = b.getResponseHeader("Content-Type")
        }
        catch (e)
        {}
        /^[\s\xa0]*$/.test(d == m ? "" : String(d)) && (d = m);
        c = new eh(c, b.fa, d);
        a.fb = c;
        "SOON" == b.getResponseHeader("X-Restart") && this.e.dispatchEvent(kh);
        if ("NOW" == b.getResponseHeader("X-Restart")) c = new Pg(Vg, b.R, xe(b));
        else
        {
            c = b.R;
            var d = xe(b),
                f, k = a.fb;
            if (7 == c) c = m;
            else
            {
                f = b.R;
                var p = xe(b);
                if (kf(b) ? 0 == f && 0 == p && !ye(b) : 8 == f || 5 == f || 6 == f && (0 >= p || 503 == p || 405 == p ||
                    M && 12001 <= p && 12156 >= p)) f = Sg;
                else
                {
                    b: if (f = b.R, p = xe(b), 6 == f && (202 == p || 401 == p || 403 == p || 409 == p || 429 == p || 500 <= p && 599 >= p && 550 != p)) f = l;
                    else
                    {
                        if (200 == p)
                        {
                            if (!b.getResponseHeader("Content-Type") || Bh(k))
                            {
                                f = l;
                                break b
                            }
                            if ("" == k.a && k.P() == m)
                            {
                                1 != a.e && this.A && (f = {
                                    xhrReqUri: a.b,
                                    xhrReqContent: a.f,
                                    xhrReqMethod: a.i,
                                    xhrRespStatus: p,
                                    xhrRespErr: f,
                                    xhrRespText: ye(b),
                                    xhrRespType: b.fa,
                                    xhrRespHeaders: b.getAllResponseHeaders(),
                                    docsRespType: k.a,
                                    docsRespContentType: k.e,
                                    docsRespString: fh(k)
                                }, this.A.log(Error("blank JSON response"),
                                    f));
                                f = l;
                                break b
                            }
                        }
                        f = n
                    }
                    f = f ? Tg : kf(b) ? Rg : Qg
                }
                var p = b.R,
                    A = xe(b),
                    k = 6 == p && 500 == A ? Bh(k) : m;
                c = new Pg(f, c, d, k)
            }
        } if (c)
        {
            d = l;
            if (c.type == Rg)
            {
                try
                {
                    O(this.g, "A request succeeded."), a.h(a.fb), Yg(this, a)
                }
                catch (F)
                {
                    c = new Pg(Ug, c.errorCode, c.f), c.l = F, c.h = Rg, Yg(this, a, vh)
                }
                a.J()
            }
            else if (c.type == Sg || c.type == Tg)
            {
                k = c;
                f = n;
                if (200 == k.f && (p = Bh(a.fb)) && "XSRF" == p.a[1]) f = p.a[4], id(this.g, "setXsrfToken(" + f + ")"), xh(this, "token", f), f = l;
                409 == k.f && this.q(m);
                p = 5 <= this.e.a.a;
                A = k.type == Tg;
                !p && (f || 1 != a.e) && 3 > a.yb ? (Ch(this, a, n), k = 3) : 3 == a.e ? (p ||
                    (this.b && !A ? this.l.push(a) : Ch(this, a, l), Dh(this), lh(this.e, Eh(k.f))), k = 2) : k = 1;
                switch (k)
                {
                    case 1:
                        c.h = c.type;
                        c.type = Qg;
                        break;
                    case 3:
                        d = n;
                        break;
                    case 2:
                        Fh(this, c)
                }
            }
            else c.type == Vg && (Yg(this, a, uh), d = n); if (c.type == Qg)
            {
                O(this.g, "A request failed, abandoning it.");
                Fh(this, c);
                try
                {
                    a.g(c) == n && (d = n);
                    var x = a.k(c) || Eh(c.f);
                    Yg(this, a, x)
                }
                catch (T)
                {
                    c = new Pg(Ug, c.errorCode, c.f), c.l = T, c.h = Qg, Yg(this, a, vh)
                }
                a.J()
            }
            b.J();
            a.ga = m;
            d && (c.t = String(b.Ja), this.dispatchEvent(c))
        }
    };
    var Fh = function (a, b)
    {
        if (b.k instanceof Cg)
        {
            var c = b.k.a[2];
            c && hd(a.g, "Server response sent error: " + c)
        }
    }, Yg = function (a, b, c)
        {
            var d = a.e.a,
                e = d,
                f = c || qh;
            c = !c;
            b.a = m;
            Ra(a.f, b);
            Ra(a.l, b);
            C(!a.k.contains(b), "Request completed while in rate limited queue.");
            C(d != ih, "Request completed with NetService in IDLE state - illegal");
            C(3 <= f.a, "Must be an offline state");
            if (!(5 <= d.a)) if (5 <= f.a) lh(a.e, f);
                else
                {
                    var k = a.b || Pa(a.f, function (a)
                    {
                        return 3 == a.e
                    });
                    if (d == oh) c || !k ? 0 == a.f.length && (e = ih) : (Dh(a), e = f);
                    else if (C(3 == b.e ||
                        k, "Offline without either a browser channel or a guaranteed delivery request - illegal."), c) if (0 < a.f.length) e = ph, Gh(a);
                        else
                        {
                            if (!a.b || !(a.b.g == m ? 0 : a.b.g)) e = ih
                        }
                        else e = f;
                    lh(a.e, e)
                }
        }, Dh = function (a)
        {
            a.b && a.e.a.b() && (Wf(a.b), Vf(a.b))
        }, Ch = function (a, b, c)
        {
            b.yb++;
            var d = a.S,
                e = b.yc;
            c && 0 != e && (d = 3E4 > e ? 1.5 * e : e);
            b.yc = d;
            c = Math.max(0, d - (v() - b.Tb));
            O(a.g, "A request failed, retrying (n=" + b.yb + ")");
            a.r.Ea(u(a.send, a, b), c)
        };
    yh.prototype.T = function (a)
    {
        O(this.g, "handleBrowserChannelError_(" + a + ")");
        var b = this.e.a;
        5 <= b.a || (a ? lh(this.e, Eh(this.b.b ? this.b.b.Z : -1)) : 1 != b.a && (0 < this.f.length ? (lh(this.e, ph), Gh(this)) : lh(this.e, ih)))
    };
    var Gh = function (a)
    {
        O(a.g, "restartSuspendedRequest_()");
        var b = a.l.shift();
        b && a.send(b)
    }, Eh = function (a)
        {
            return 401 == a ? th : 403 == a ? sh : 202 == a || 405 == a || 409 == a || 429 == a || 500 <= a && 599 >= a && 550 != a ? rh : 400 <= a && 499 >= a || 550 == a ? vh : qh
        };
    yh.prototype.q = function (a)
    {
        xh(this, "tfe", a)
    };
    var xh = function (a, b, c)
    {
        var d = a.h;
        c ? d.a[b] = c : delete d.a[b];
        a.b && (a.b.aa = db(a.h.a))
    };
    yh.prototype.U = function ()
    {
        lh(this.e, vh)
    };
    var Bh = function (a)
    {
        if (a && ("" == a.a || "text" == a.a) && xa(fh(a), ")]}'\n")) if (a = a.P(), s(a) && (a = a[0], s(a) && "er" == a[0])) return new Cg(a);
        return m
    };
    yh.prototype.p = function ()
    {
        B(this.r);
        this.r = new Mg;
        wa(this.f);
        this.f = [];
        this.l = [];
        var a = this.k;
        a.e = [];
        a.b && fe(a.b);
        this.b && !this.b.Ra() && (Hf(this.b.f, "tfe_changed", this.q, this), Wf(this.b), this.b.k = ca);
        this.b = m;
        lh(this.e, ih);
        B(this.r);
        B(this.k);
        B(this.a);
        yh.s.p.call(this)
    };
    var Hh = function ()
    {
        yh.call(this);
        this.G = {}
    };
    y(Hh, yh);
    var Ih = function (a, b, c)
    {
        this.a = new Y(a, b, c);
        va(this, ma(B, this.a))
    };
    y(Ih, z);
    Ih.prototype.close = function ()
    {
        B(this)
    };
    Ih.prototype.H = function ()
    {
        return this.a
    };
    var Y = function (a, b, c)
    {
        this.r = a;
        this.f = "";
        this.cb = b;
        this.Ec = c;
        this.l = -1;
        this.h = [];
        this.A = n;
        this.Cc = 0;
        this.a = new md(this);
        this.e = this.bb = m;
        this.S = 0;
        this.b = new Hh;
        this.T = n;
        this.q = [];
        this.G = {};
        this.k = this.g = m;
        this.U = [];
        this.F = [];
        this.Dc = Fc(window, "unload", u(this.Sb, this));
        this.wb = Fc(window, "beforeunload", u(this.Sb, this));
        this.da = m;
        od(this.a, this.b.e, gh, this.Fc);
        a = this.b;
        b = this.cb;
        c = xa(b, "https://") || xa(b, "http://");
        var d = xa(b, "/");
        c = c || d;
        d = !ya(b);
        C("" == b || c && d);
        a.F = b;
        this.i();
        Jh(this)
    };
    y(Y, z);
    var Jh = function (a)
    {
        Kh(a, function ()
        {}) && a.Y(new Ag("client_error", "Network service failure: Failure before obtaining model ID.", l));
        a.i();
        dh(ah(ch(bh(Ah(a.b, "/modelid").Q("id", a.r), 1), u(a.Vc, a)), u(a.Wa, a)))
    };
    Y.prototype.Vc = function (a)
    {
        this.f = a.P().modelId;
        Lh(this)
    };
    var Lh = function (a)
    {
        Kh(a, function ()
        {}) && a.Y(new Ag("client_error", "Network service failure: Failure before obtaining initial state.", l));
        a.i();
        dh(ah(ch(Ah(a.b, "/gs").Q("id", a.f), u(a.Uc, a)), u(a.Wa, a)))
    };
    Y.prototype.Uc = function (a)
    {
        a = a.P();
        this.Gc = a.interactionMode;
        this.S = a.revision;
        this.e = a.sid;
        this.bb = JSON.parse(a.snapshot);
        this.l = this.S;
        this.g = new Xf;
        a = this.b;
        var b = this.g;
        C(!a.b, "Only one browser channel may be registered with a NetService");
        a.b = b;
        var c = u(a.T, a);
        C(b.k == ca, "Illegal to register two Error Status Callbacks");
        b.k = c;
        b.g != m && b.k(b.g);
        Sf(b, "tfe_changed", a.q, a);
        a.b.aa = db(a.h.a);
        Vf(this.g, this.f, this.e, this.cb);
        Sf(this.g, "0", this.Ab, this);
        this.k = new wg(this.g, this.b, 0, mg);
        od(this.a, this.k,
            pg, this.Hc);
        od(this.a, this.k, qg, this.Ic);
        Mh(this)
    };
    Y.prototype.Gb = function ()
    {
        this.T = l;
        for (var a = 0; a < this.q.length; ++a) Nh(this, this.q[a]);
        this.q = []
    };
    Y.prototype.oa = function (a, b, c, d)
    {
        a = new Oh(a, b, c, d);
        this.T ? Nh(this, a) : this.q.push(a)
    };
    var Nh = function (a, b)
    {
        a.Ra() && b.e(
        {
            error: "Communication service is closed."
        });
        if ("mutate" == b.a) Ph(a, b.f, b.b, b.e);
        else if ("getCollaborators" == b.a)
        {
            var c = b.b,
                d = a.k.a,
                e = {}, f;
            for (f in d) e[f] = Qh(d[f]);
            c(e)
        }
        else "getInitialData" == b.a ? (0, b.b)(
            {
                revision: a.S,
                snapshot: a.bb,
                sid: a.e,
                interactionMode: a.Gc
            }) : "export" == b.a && Rh(a, b.b, b.e)
    };
    Y.prototype.addEventListener = function (a, b)
    {
        var c = this.G[a];
        c || (c = [], this.G[a] = c);
        c.push(b)
    };
    var Qh = function (a)
    {
        return {
            sid: a.b,
            userId: a.k,
            displayName: a.g,
            color: a.f,
            isMe: a.a(),
            isAnonymous: a.e(),
            photoUrl: a.h
        }
    };
    Y.prototype.Fc = function ()
    {
        var a = this.b.e.a;
        a == th ? (this.Y(new Ag("token_refresh_required", "The OAuth token must be refreshed.", n)), this.i()) : a == sh && this.Y(new Ag("forbidden", "Access denied to document: " + this.r, l));
        a.b() ? this.da && window.clearInterval(this.da) : this.da = window.setInterval(u(this.i, this), 1E3);
        Sh(this, "brix.netStatus",
        {
            status: Th(a),
            isOk: a.b()
        })
    };
    var Th = function (a)
    {
        switch (a)
        {
            case ih:
                return "IDLE";
            case oh:
                return "BUSY";
            case qh:
                return "OFFLINE";
            case rh:
                return "SERVER_DOWN";
            case ph:
                return "RECOVERING";
            case sh:
                return "FORBIDDEN";
            case th:
                return "AUTH_REQUIRED";
            case vh:
                return "CLIENT_ERROR";
            case uh:
                return "INCOMPATIBLE_SERVER";
            case wh:
                return "SAVE_ERROR";
            default:
                return "UNKNOWN_STATE"
        }
    }, Sh = function (a, b, c)
        {
            if (a = a.G[b]) for (var d = 0; d < a.length; ++d) a[d](b, c)
        };
    Y.prototype.Hc = function (a)
    {
        !this.T && a.f.a() && setTimeout(u(this.Gb, this), 0);
        Sh(this, "brix.join", Qh(a.f))
    };
    Y.prototype.Ic = function (a)
    {
        Sh(this, "brix.leave", Qh(a.f))
    };
    var Kh = function (a, b)
    {
        return 5 <= a.b.e.a.a ? (b(
        {
            error: "Unrecoverable error. The document must be reloaded."
        }), l) : n
    }, Ph = function (a, b, c, d)
        {
            if (!Kh(a, d))
            {
                a.i();
                d = Ah(a.b, "/save");
                var e = {};
                e.revision = b.revision;
                e.requestNumber = a.Cc++;
                e.changes = b.payload;
                dh(ah(ch($g(d.Q("id", a.f).Q("sid", a.e), JSON.stringify(e)), function (a)
                {
                    c(a.P() || {})
                }), u(a.Wa, a)))
            }
        }, Rh = function (a, b, c)
        {
            Kh(a, c) || (a.i(), dh(ah(ch(Ah(a.b, "/export").Q("id", a.f), function (a)
            {
                b(a.P() || {})
            }), u(a.Wa, a))))
        }, Mh = function (a, b)
        {
            a.A = l;
            var c = a.l + 1;
            a.i();
            var d =
                Ah(a.b, "/delta");
            b && (b < a.l && g(new RangeError("End revision must be greater than or equal to the current revision.")), d = d.Q("endRev", b));
            dh(bh(ah(ch(d.Q("id", a.f).Q("sid", a.e).Q("startRev", c), u(a.xb, a)), u(a.Wa, a)), 3))
        };
    Y.prototype.xb = function (a)
    {
        this.A = n;
        a = a.P();
        a = ea(a) ? a : a.mu;
        Uh(this, Vh(this, a))
    };
    Y.prototype.Ab = function (a)
    {
        Uh(this, Vh(this, a))
    };
    var Uh = function (a, b)
    {
        for (var c = 0; c < b.length; ++c) a.h.push(b[c]);
        a.h.sort(function (a, b)
        {
            return a.revision - b.revision
        });
        var d = a.h;
        a.h = [];
        for (var e = [], c = 0; c < d.length; ++c)
        {
            var f = d[c],
                k = f.revision;
            k == a.l + 1 ? (a.l = k, e.push(f)) : k > a.l + 1 && a.h.push(f)
        }
        0 < e.length && Sh(a, "brix.bc_msg", e);
        0 < a.h.length && !a.A && Mh(a, a.h[0].revision)
    }, Vh = function (a, b)
        {
            for (var c = [], d = 0; d < b.length; d++)
            {
                var e = b[d],
                    f = e[0],
                    k = e[4];
                c.push(
                {
                    type: f[2],
                    payload: f[0],
                    timestamp: e[1],
                    user: e[2],
                    revision: e[3],
                    sid: k,
                    fromMe: k == a.e,
                    id: a.f
                })
            }
            return c
        };
    q = Y.prototype;
    q.Sb = function ()
    {
        var a;
        if (!this.f || !this.e) a = m;
        else
        {
            a = [];
            var b = this.b.h.a,
                c;
            for (c in b) a.push(c, b[c]);
            a.push("id", this.f);
            a.push("sid", this.e);
            a = this.b ? Ah(this.b, "/leave").Q(a).a : m
        }
        try
        {
            (new Image).src = a
        }
        catch (d)
        {}
    };
    q.p = function ()
    {
        Mc(this.Dc);
        Mc(this.wb);
        this.k && (B(this.k), this.k = m);
        this.g && (Wf(this.g), B(this.g), this.g = m);
        window.setTimeout(u(this.Wc, this), 1E3)
    };
    q.Wc = function ()
    {
        dh(ah(ch(bh(Ah(this.b, "/leave").Q("id", this.f).Q("sid", this.e), 1), u(this.sc, this)), u(this.sc, this)))
    };
    q.sc = function ()
    {
        window.setTimeout(u(this.bd, this), 1)
    };
    q.bd = function ()
    {
        B(this.b);
        this.b = m
    };
    q.Wa = function (a)
    {
        var b = a.f;
        if (6 == a.errorCode)
        {
            if (404 == b)
            {
                this.Y(new Ag("not_found", "Document not found: " + this.r, l));
                return
            }
            if (403 == b)
            {
                this.Y(new Ag("forbidden", "Access denied to document: " + this.r, l));
                return
            }
            if (423 == b)
            {
                this.Y(new Ag("concurrent_creation", "A different session already created the document: " + this.r, l));
                return
            }
            if (401 == b)
            {
                this.Y(new Ag("token_refresh_required", "The OAuth token must be refreshed.", l));
                return
            }
        }
        this.Y(new Ag("client_error", "Unrecoverable network service failure.", l))
    };
    q.Y = function (a)
    {
        for (var b = 0; b < this.F.length; ++b)(0, this.F[b])(a);
        this.U.push(a);
        a.a && B(this)
    };
    var Wh = function (a, b)
    {
        a.F.push(b);
        for (var c = 0; c < a.U.length; ++c) b(a.U[c])
    };
    Y.prototype.i = function ()
    {
        xh(this.b, "access_token", this.Ec())
    };
    var Oh = function (a, b, c, d)
    {
        this.a = a;
        this.f = b;
        this.b = c;
        this.e = d
    };
    w("gapi.drive.realtime.CorsCommunicationService", Ih);
    w("gapi.drive.realtime.CorsCommunicationService.prototype.getRpcService", Ih.prototype.H);
    w("gapi.drive.realtime.CorsCommunicationService.RpcService", Y);
    w("gapi.drive.realtime.CorsCommunicationService.RpcService.prototype.sendRpc", Y.prototype.oa);
    w("gapi.drive.realtime.CorsCommunicationService.RpcService.prototype.addEventListener", Y.prototype.addEventListener);
    var Xh = {}, Yh = [];
    w("gapi.drive.realtime.custom.registerType", function (a, b)
    {
        Xh[b] && g(Error("Attempted to register the type " + b + " multiple times."));
        rb(b, "name");
        a.__collabTypeName__ = b;
        Zh(a);
        Xh[b] = a;
        Yh.push(b)
    });
    w("gapi.drive.realtime.custom.setInitializer", function (a, b)
    {
        a.__collabTypeName__ || g(Error("Attempted to set initializer for unregistered type"));
        a.prototype.__collaborativeInitializerFn__ = b
    });
    var Zh = function (a, b)
    {
        a.__collabTypeName__ || g(Error("Attempted to set onLoaded for unregistered type"));
        a.prototype.__collaborativeOnLoadedFn__ = function ()
        {
            $h(this);
            b && b.call(this)
        }
    };
    w("gapi.drive.realtime.custom.setOnLoaded", Zh);
    var $h = function (a)
    {
        var b = ai(a),
            c = Pb(b, a);
        c == m && g(Error());
        var d = b.a;
        eg(d, c, function (c)
        {
            c = Lb(a, b, c);
            var d = c.b.__collaborativeListenerMap__;
            if (d && (d = d[c.h])) for (var k = 0; k < d.length; k++) d[k].call(c.b, c);
            a.dispatchEvent(c)
        });
        Qb(d, c, function (c)
        {
            c = Nb(b, c);
            var d = a.__objectListeners__;
            if (d) for (var k = 0; k < d.length; k++) d[k].call(a, c);
            a.dispatchEvent(c)
        })
    }, bi = function (a)
        {
            a.__collaborativeOnLoadedFn__ && a.__collaborativeOnLoadedFn__()
        }, ci = function (a, b)
        {
            var c = Xh[a];
            c || g(Error("Unknown type name " + a));
            var d = new c;
            d.__collaborativeModel__ = b;
            d.__collaborativeListenerMap__ = {};
            c = new E;
            fb(d, c);
            d.Fa = function ()
            {
                var a = ai(d),
                    b = Pb(a, d);
                b == m && g(Error());
                return a.a.Fa(b)
            };
            return d
        }, di = function ()
        {
            for (; 0 < Yh.length;)
            {
                var a = Yh.shift();
                ra(Xh[a].prototype)
            }
        };
    w("gapi.drive.realtime.custom.collaborativeField", function (a)
    {
        rb(a, "name");
        return oa(ei(a), fi(a))
    });
    w("gapi.drive.realtime.custom.getId", function (a)
    {
        var b = ai(a),
            c = b.a;
        a = Pb(b, a);
        a == m && g(Error());
        return c.a.getId(a)
    });
    var ai = function (a)
    {
        return a.__collaborativeModel__
    };
    w("gapi.drive.realtime.custom.getModel", ai);
    var gi = function (a)
    {
        return !!a.__collaborativeModel__
    };
    w("gapi.drive.realtime.custom.isCustomObject", gi);
    var ei = function (a)
    {
        return function ()
        {
            this.j();
            var b = ai(this),
                c = b.a,
                d = Pb(b, this);
            d == m && g(Error());
            return Gb(b, c.get(d, a))
        }
    }, fi = function (a)
        {
            return function (b)
            {
                this.j();
                var c = ai(this),
                    d = c.a,
                    e = Pb(c, this);
                e == m && g(Error());
                b = Pb(c, b);
                d.a.put(e, a, b)
            }
        };
    var hi = function (a, b, c)
    {
        G.call(this, "document_save_state_changed", a);
        this.qc = b;
        this.pc = c;
        this.isSaving = this.qc;
        this.isPending = this.pc
    };
    y(hi, G);
    w("gapi.drive.realtime.DocumentSaveStateChangedEvent", hi);
    var Z = function (a)
    {
        I.call(this, a)
    };
    y(Z, I);
    Z.prototype.q = function (a)
    {
        this.j();
        a = D(a, "newIndex");
        var b = J(this);
        K(this).a.setIndexReferenceIndex(b, a)
    };
    Z.prototype.h = function ()
    {
        this.j();
        var a = J(this);
        return K(this).a.getIndexReferenceIndex(a)
    };
    Z.prototype.i = function ()
    {
        this.j();
        var a = J(this);
        return K(this).a.getIndexReferenceCanBeDeleted(a)
    };
    Z.prototype.k = function ()
    {
        this.j();
        return this.a.P(ii(K(this), J(this)))
    };
    var ki = function (a, b)
    {
        var c = ji(K(a), J(a), function (c)
        {
            b(xb(a, c))
        });
        K(a).bind(b, c)
    };
    Z.prototype.ca = function ()
    {
        I.prototype.ca.call(this);
        var a = this;
        ki(this, function (b)
        {
            a.dispatchEvent(b)
        })
    };
    Z.prototype.index = oa(Z.prototype.h, Z.prototype.q);
    Z.prototype.b = qa(Z.prototype.i);
    Z.prototype.l = qa(Z.prototype.k);
    w("gapi.drive.realtime.IndexReference", Z);
    w("gapi.drive.realtime.IndexReference.prototype.index", Z.prototype.index);
    w("gapi.drive.realtime.IndexReference.prototype.canBeDeleted", Z.prototype.b);
    w("gapi.drive.realtime.IndexReference.prototype.referencedObject", Z.prototype.l);
    ra(Z.prototype);
    var $ = function (a, b)
    {
        this.a = a;
        a.bind(this, a.a.getModel());
        this.f = b;
        this.b = 0;
        this.e = n;
        va(this, this.A, this);
        var c = u(this.k, this);
        this.a.a.addRemoteChangeListener(c)
    };
    y($, z);
    w("gapi.drive.realtime.Model", $);
    $.prototype.F = function (a, b)
    {
        this.j();
        var c = Va(arguments, 1);
        return li(this, a, function (a)
        {
            a.__collaborativeInitializerFn__ && a.__collaborativeInitializerFn__.apply(a, c);
            bi(a)
        })
    };
    w("gapi.drive.realtime.Model.prototype.create", $.prototype.F);
    var li = function (a, b, c)
    {
        b = mi(b);
        var d = ni(a, b);
        a.i("initialize");
        b = a.a.a.create(b);
        a.a.bind(d, b);
        d instanceof I && Ob(d);
        c(d);
        a.g();
        return d
    };
    $.prototype.i = function (a)
    {
        this.j();
        window.setTimeout(u(this.h, this), 1);
        ++this.b;
        this.a.a.beginCompoundOperation(a || "")
    };
    w("gapi.drive.realtime.Model.prototype.beginCompoundOperation", $.prototype.i);
    var oi = function (a)
    {
        a.j();
        ++a.b;
        a.e = l;
        a.a.a.beginCreationCompoundOperation()
    };
    $.prototype.g = function ()
    {
        this.j();
        0 == this.b && g(Error("No compound operation to end."));
        --this.b;
        0 == this.b && (this.e = n);
        this.a.a.endCompoundOperation()
    };
    w("gapi.drive.realtime.Model.prototype.endCompoundOperation", $.prototype.g);
    w("gapi.drive.realtime.Model.prototype.endCompoundOperation", $.prototype.g);
    $.prototype.l = function (a)
    {
        return li(this, "List", function (b)
        {
            if (a) for (var c = 0; c < a.length; c++) b.push(a[c])
        })
    };
    w("gapi.drive.realtime.Model.prototype.createList", $.prototype.l);
    $.prototype.r = function (a)
    {
        this.j();
        return li(this, "Map", function (b)
        {
            if (a) for (var c in a) b.set(c, a[c])
        })
    };
    w("gapi.drive.realtime.Model.prototype.createMap", $.prototype.r);
    $.prototype.q = function (a)
    {
        this.j();
        return li(this, "EditableString", function (b)
        {
            a && b.Ua(a)
        })
    };
    w("gapi.drive.realtime.Model.prototype.createString", $.prototype.q);
    var Rb = function (a, b, c, d)
    {
        a.j();
        D(c, "startIndex");
        qb(d);
        return li(a, "IndexReference", function (a)
        {
            var f = J(a);
            K(a).a.initIndexReference(f, b, c, d)
        })
    }, mi = function (a)
        {
            if (t(a)) return a;
            (a = a.__collabTypeName__) || g(Error("Invalid collaborative type specifier."));
            return a
        }, ni = function (a, b)
        {
            var c = mi(b);
            return "Map" == c ? new X(a) : "EditableString" == c ? new L(a) : "List" == c ? new W(a) : "IndexReference" == c ? new Z(a) : ci(c, a)
        };
    $.prototype.P = function (a)
    {
        this.j();
        return pi(this, this.a.P(a))
    };
    $.prototype.G = function ()
    {
        this.j();
        var a = pi(this, this.a.a.getRoot());
        La(a, X);
        return a
    };
    w("gapi.drive.realtime.Model.prototype.getRoot", $.prototype.G);
    var pi = function (a, b)
    {
        if (b == m) return m;
        var c = a.a.a.asJsObject(b);
        c == m && (c = ni(a, a.a.a.getType(b)), a.a.bind(c, b), c instanceof I && Ob(c), gi(c) && bi(c));
        return c
    }, Pb = function (a, b)
        {
            var c;
            b == m ? c = m : b instanceof Object && gi(b) || b instanceof I ? c = a.a.a.asGwtObject(b) : (c = JSON.stringify(b), c = a.a.a.asGwtJsonValue(c));
            return c
        }, Gb = function (a, b)
        {
            if (b == m) return m;
            var c = a.a.a.asJsJsonValue(b);
            if (c) return c = JSON.parse(c), "object" === typeof c ? Object.freeze(c) : c;
            c = a.a.a.asJsPrimitive(b);
            return c != m ? c : pi(a, b)
        }, zb = function (a,
            b)
        {
            if (b == m) return m;
            for (var c = a.a.a.asJsArray(b), d = 0; d < c.length; d++) c[d] = Gb(a, c[d]);
            return c
        }, Yf = function (a, b)
        {
            for (var c = [], d = 0; d < b.length; d++) c.push(Pb(a, b[d]));
            return a.a.a.asGwtList(c)
        };
    $.prototype.k = function ()
    {
        if (0 < this.b)
        {
            if (1 == this.b && this.e) var a = this.f,
            b = new Ag("concurrent_creation", "Changes received during initial document creation.", l);
            else a = this.f, b = new Ag("invalid_compound_operation", "Changes received during an open compound operation - did you forget to call endCompoundOperation()?", l);
            a.b(b);
            a.mb(b);
            B(this.f)
        }
    };
    $.prototype.h = function ()
    {
        if (!this.e && 0 < this.b || this.e && 1 < this.b)
        {
            var a = this.f,
                b = new Ag("invalid_compound_operation", "Open compound operation at end of synchronous block - did you forget to call endCompoundOperation()?", l);
            a.b(b);
            a.mb(b)
        }
    };
    $.prototype.A = function ()
    {
        var a = this.a.a.getAllObjects(),
            b = zb(this, a),
            a = [];
        if (b) for (var c = 0; c < b.length; ++c) b[c] && a.push(b[c]);
        for (b = 0; b < a.length; ++b) B(a[b])
    };
    $.prototype.j = function ()
    {
        this.Ra() && g(new sb)
    };
    var qi = function (a, b, c)
    {
        E.call(this);
        this.a = a;
        this.g = new $(a, this);
        this.i = b;
        this.f = n;
        this.b = c;
        Wh(b.H(), u(this.mb, this));
        va(this, ma(B, b));
        va(this, ma(B, this.g))
    };
    y(qi, E);
    q = qi.prototype;
    q.rc = function ()
    {
        this.j();
        return this.g
    };
    q.cd = function ()
    {
        this.j();
        return this.a.a.getCollaborators()
    };
    q.addEventListener = function (a, b)
    {
        this.j();
        rb(a, "type");
        qi.s.addEventListener.call(this, a, b);
        if (!this.f)
        {
            var c = this;
            ri(this.a, function (a)
            {
                c.dispatchEvent(ig(c, a))
            });
            si(this.a, function (a)
            {
                c.dispatchEvent(kg(c, a))
            });
            ti(this.a, function (a)
            {
                c.dispatchEvent(new hi(c, a.saving, a.pending))
            });
            this.f = l
        }
    };
    q.close = function ()
    {
        B(this)
    };
    q.ad = function (a, b)
    {
        this.i.H().oa("export",
        {}, a, b)
    };
    q.mb = function (a)
    {
        a.a && B(this)
    };
    w("gapi.drive.realtime.Document", qi);
    w("gapi.drive.realtime.Document.prototype.getModel", qi.prototype.rc);
    w("gapi.drive.realtime.Document.prototype.getCollaborators", qi.prototype.cd);
    w("gapi.drive.realtime.Document.prototype.exportDocument", qi.prototype.ad);
    w("gapi.drive.realtime.Document.prototype.close", qi.prototype.close);
    var ui = function (a)
    {
        this.a = a
    };
    ui.prototype.bind = function (a, b)
    {
        this.a.bind(a, b)
    };
    var Qb = function (a, b, c)
    {
        return a.a.addObjectChangedListener(b, c)
    };
    ui.prototype.get = function (a, b)
    {
        return this.a.get(a, b)
    };
    ui.prototype.$ = function (a)
    {
        return this.a.getKeys(a)
    };
    ui.prototype.I = function (a)
    {
        return this.a.getValues(a)
    };
    var eg = function (a, b, c)
    {
        return a.a.addValueChangedListener(b, c)
    };
    ui.prototype.P = function (a)
    {
        return this.a.getObject(a)
    };
    ui.prototype.Ua = function (a, b)
    {
        this.a.setText(a, b)
    };
    var Sb = function (a, b, c)
    {
        return a.a.addTextInsertedListener(b, c)
    }, Ub = function (a, b, c)
        {
            return a.a.addTextDeletedListener(b, c)
        }, Zf = function (a, b, c)
        {
            return a.a.addValuesAddedListener(b, c)
        }, ag = function (a, b, c)
        {
            return a.a.addValuesRemovedListener(b, c)
        }, cg = function (a, b, c)
        {
            return a.a.addValuesSetListener(b, c)
        }, ii = function (a, b)
        {
            return a.a.getIndexReferenceObjectId(b)
        }, ji = function (a, b, c)
        {
            return a.a.addReferenceShiftedListener(b, c)
        }, ri = function (a, b)
        {
            a.a.addCollaboratorJoinedListener(b)
        }, si = function (a, b)
        {
            a.a.addCollaboratorLeftListener(b)
        };
    ui.prototype.Fa = function (a)
    {
        return this.a.getParents(a)
    };
    var ti = function (a, b)
    {
        a.a.addDocumentSaveStateListener(b)
    };
    var vi = function ()
    {
        this.ma = new XDomainRequest;
        this.readyState = 0;
        this.responseText = this.onreadystatechange = m;
        this.status = -1;
        this.ma.onload = u(this.Yc, this);
        this.ma.onerror = u(this.Y, this);
        this.ma.onprogress = u(this.Zc, this)
    };
    q = vi.prototype;
    q.open = function (a, b)
    {
        this.ma.open(a, b)
    };
    q.send = function (a)
    {
        this.ma.send(a)
    };
    q.abort = function ()
    {
        this.ma.abort()
    };
    q.setRequestHeader = function ()
    {};
    q.getResponseHeader = function (a)
    {
        if ("content-type" == a.toLowerCase()) return this.ma.contentType
    };
    q.Yc = function ()
    {
        this.status = 200;
        this.responseText = this.ma.responseText;
        wi(this, 4)
    };
    q.Y = function ()
    {
        this.status = 500;
        this.responseText = m;
        wi(this, 4)
    };
    q.Zc = function ()
    {
        this.status = 200;
        wi(this, 1)
    };
    var wi = function (a, b)
    {
        a.readyState = b;
        if (a.onreadystatechange) a.onreadystatechange()
    }, xi = function ()
        {};
    y(xi, ke);
    xi.prototype.b = function ()
    {
        return new vi
    };
    xi.prototype.e = function ()
    {
        return {}
    };
    w("gapi.drive.realtime.gwt.loadInternal_", yi);
    //var zi = window.document.createElement("script");
    //zi.appendChild(window.document.createTextNode("function jsapi_pretty(){var p='',q='jsapi_pretty';var b=p,c=q;var d=window,e=document,f,g=b,h={},i=[],j=[],k=[],l=0,m,n;if(!d.__gwt_stylesLoaded){d.__gwt_stylesLoaded={}}if(!d.__gwt_scriptsLoaded){d.__gwt_scriptsLoaded={}}function o(){if(f){f(m,c,g,l)}}\njsapi_pretty.onScriptLoad=function(a){jsapi_pretty=null;f=a;o()}}\njsapi_pretty();(function () {var $gwt_version = \"0.0.999\";var $wnd = window;var $doc = $wnd.document;var $moduleName, $moduleBase;var $stats = $wnd.__gwtStatsEvent ? function(a) {$wnd.__gwtStatsEvent(a)} : null;var $strongName = 'C612E4E9362C2532264A395A0B74C382';function LR(){}\nfunction lf(){}\nfunction lj(){}\nfunction cj(){}\nfunction fj(){}\nfunction ij(){}\nfunction ip(){}\nfunction ap(){}\nfunction ep(){}\nfunction mp(){}\nfunction qp(){}\nfunction up(){}\nfunction ug(){}\nfunction gg(){}\nfunction _i(){}\nfunction Vl(){}\nfunction dm(){}\nfunction Jo(){}\nfunction yp(){}\nfunction Cp(){}\nfunction Gp(){}\nfunction Kp(){}\nfunction Op(){}\nfunction Sp(){}\nfunction Wp(){}\nfunction Zp(){}\nfunction Zz(){}\nfunction ez(){}\nfunction uz(){}\nfunction yz(){}\nfunction bq(){}\nfunction fq(){}\nfunction iq(){}\nfunction Fw(){}\nfunction MA(){}\nfunction MQ(){}\nfunction XB(){}\nfunction bJ(){}\nfunction lJ(){}\nfunction GJ(){}\nfunction IJ(){}\nfunction $J(){}\nfunction mP(){}\nfunction pP(){}\nfunction Ry(a){}\nfunction Zy(a){Qy(a)}\nfunction zx(a){Qy(a)}\nfunction br(){kz()}\nfunction yJ(){xJ()}\nfunction qd(a,b){b(a)}\nfunction Ow(a,b){a.f=b}\nfunction yI(a,b){a.h=b}\nfunction zI(a,b){a.l=b}\nfunction AI(a,b){a.m=b}\nfunction eb(a){this.b=a}\nfunction kb(a){this.b=a}\nfunction Pb(a){this.b=a}\nfunction Sb(a){this.b=a}\nfunction oc(a){this.b=a}\nfunction me(a){this.b=a}\nfunction qe(a){this.b=a}\nfunction ue(a){this.b=a}\nfunction we(a){this.b=a}\nfunction yf(a){this.b=a}\nfunction Cf(a){this.b=a}\nfunction Xf(a){this.b=a}\nfunction Zf(a){this.b=a}\nfunction ei(a){this.b=a}\nfunction vl(a){this.b=a}\nfunction Qn(a){this.b=a}\nfunction sn(a){this.f=a}\nfunction jk(a){this.c=a}\nfunction Yo(a){this.b=a}\nfunction mq(a){this.b=a}\nfunction uq(a){this.b=a}\nfunction Kw(a){this.b=a}\nfunction rx(a){this.b=a}\nfunction Gx(a){this.b=a}\nfunction pA(){this.b=[]}\nfunction qA(a){this.b=a}\nfunction BA(a){this.b=a}\nfunction SA(a){this.b=a}\nfunction gB(a){this.b=a}\nfunction UJ(a){this.b=a}\nfunction nK(a){this.b=a}\nfunction FK(a){this.b=a}\nfunction YM(a){this.b=a}\nfunction lN(a){this.b=a}\nfunction LN(a){this.e=a}\nfunction eO(a){this.b=a}\nfunction pO(a){this.b=a}\nfunction $O(a){this.b=a}\nfunction uP(a){this.b=a}\nfunction zP(a){this.c=a}\nfunction GP(a){this.c=a}\nfunction _P(a){this.d=a}\nfunction wQ(a){this.b=a}\nfunction AQ(a){this.b=a}\nfunction ER(a){this.b=a}\nfunction EO(){tO(this)}\nfunction Oc(){Ic(this)}\nfunction PL(){ML(this)}\nfunction QL(){ML(this)}\nfunction MM(){vM(this)}\nfunction Xy(){return Ty}\nfunction wA(a){return a.b}\nfunction FA(a){return a.b}\nfunction YA(a){return a.b}\nfunction mB(a){return a.b}\nfunction WB(a){return a.b}\nfunction KB(){return null}\nfunction QA(){return null}\nfunction Hz(){this.b=++Ez}\nfunction qz(a,b){a.b+=b}\nfunction rz(a,b){a.b+=b}\nfunction sz(a,b){a.b+=b}\nfunction sh(a,b){dR(a.f,b)}\nfunction xh(a,b){fR(a.f,b)}\nfunction Gb(a,b){vO(a.c,b)}\nfunction Jb(a,b){BO(a.c,b)}\nfunction Jl(a,b){BO(a.d,b)}\nfunction Bl(a,b){vO(a.d,b)}\nfunction qm(a,b){vO(a.g,b)}\nfunction Nm(a,b){BO(a.g,b)}\nfunction rf(a,b){Kz(a.d,b)}\nfunction fx(a,b){Kz(a.c,b)}\nfunction nx(a,b){jy(a.n,b)}\nfunction Ox(a,b){jx(b.b,a)}\nfunction V(a){Q(a.b,a.c)}\nfunction uc(a){qc(a.b,a.c)}\nfunction ML(a){a.b=new uz}\nfunction cl(){this.b=new gR}\nfunction kl(){this.b=new gR}\nfunction HL(){this.b=new uz}\nfunction zl(){new _Q;new _Q}\nfunction ll(){kl.call(this)}\nfunction ql(){kl.call(this)}\nfunction Zl(){jc.call(this)}\nfunction OJ(){br.call(this)}\nfunction iK(){br.call(this)}\nfunction yK(){br.call(this)}\nfunction BK(){br.call(this)}\nfunction YK(){br.call(this)}\nfunction YL(){br.call(this)}\nfunction zR(){br.call(this)}\nfunction oR(){MM.call(this)}\nfunction _Q(){MM.call(this)}\nfunction NO(a,b){a.length=b}\nfunction qc(a,b){return b(a)}\nfunction sm(a,b){IM(a.f,b.b)}\nfunction cr(a){kz();this.f=a}\nfunction dr(a){kz();this.f=a}\nfunction Lr(){Jr();return ir}\nfunction qu(){nu();return iu}\nfunction Fu(){Cu();return yu}\nfunction Yu(){Vu();return Ru}\nfunction Yt(){Vt();return Rt}\nfunction st(){pt();return mt}\nfunction Jt(){Gt();return At}\nfunction Jv(){Gv();return Cv}\nfunction Zi(){Xi();return Ri}\nfunction ws(){ts();return qs}\nfunction Ps(){Ms();return Is}\nfunction at(){Zs();return Xs}\nfunction iw(){fw();return bw}\nfunction qw(){ow();return kw}\nfunction Ew(){Ew=LR;Dw=new Fw}\nfunction Rw(){Rw=LR;Qw=new Hz}\nfunction Yw(){Yw=LR;Xw=new Hz}\nfunction Nx(){Nx=LR;Mx=new Hz}\nfunction No(){No=LR;Mo=new Zp}\nfunction cg(){cg=LR;bg=new gg}\nfunction sg(){sg=LR;rg=new ug}\nfunction rv(){rv=LR;qv=new Hu}\nfunction xJ(){xJ=LR;wJ=new Hz}\nfunction pJ(){pJ=LR;oJ=new GJ}\nfunction bz(){bz=LR;az=new ez}\nfunction LA(){LA=LR;KA=new MA}\nfunction KQ(){KQ=LR;JQ=new MQ}\nfunction gR(){this.b=new _Q}\nfunction Cx(a){vx();this.b=a}\nfunction Px(a){Nx();this.b=a}\nfunction nn(a){ri.call(this,a)}\nfunction fr(a){cr.call(this,a)}\nfunction gr(a){dr.call(this,a)}\nfunction HA(a){cr.call(this,a)}\nfunction IA(a){er.call(this,a)}\nfunction dA(a){aA.call(this,a)}\nfunction fB(){gB.call(this,{})}\nfunction jK(a){cr.call(this,a)}\nfunction wK(a){cr.call(this,a)}\nfunction zK(a){cr.call(this,a)}\nfunction CK(a){cr.call(this,a)}\nfunction ZK(a){cr.call(this,a)}\nfunction ZL(a){cr.call(this,a)}\nfunction nQ(a){zP.call(this,a)}\nfunction sQ(a){nQ.call(this,a)}\nfunction IQ(a){KP.call(this,a)}\nfunction Ex(a){throw new er(a)}\nfunction NB(a){throw new HA(a)}\nfunction fJ(a){return new dJ[a]}\nfunction gJ(){return !!$stats}\nfunction Li(a,b){return a.i-b.i}\nfunction hn(a,b){a.d+=b;a.e=2}\nfunction cm(a,b,c){a.b=b;a.c=c}\nfunction Vb(a,b){Hb(a.b,b,a.c)}\nfunction Qo(a,b,c){So(a,b,b,c)}\nfunction QQ(a,b){By(a.b,TI(b))}\nfunction lP(a,b){return b.cT(a)}\nfunction VK(a,b){return a<b?a:b}\nfunction K(a,b){a.c=b;return a}\nfunction km(a,b){a.c=b;return a}\nfunction jm(a,b){a.b=b;return a}\nfunction lm(a,b){a.d=b;return a}\nfunction LI(a,b){return !KI(a,b)}\nfunction MI(a,b){return !JI(a,b)}\nfunction HB(a){return new SA(a)}\nfunction JB(a){return new QB(a)}\nfunction df(a){return FB(),MB(a)}\nfunction ni(a,b){return zM(a.c,b)}\nfunction Ej(a,b){return yO(a.c,b)}\nfunction _A(b,a){return a in b.b}\nfunction Ay(b,a){b[b.length]=a}\nfunction PO(a,b,c){a.splice(b,c)}\nfunction Ds(a){Pq.call(this,jE,a)}\nfunction Ss(a){Pq.call(this,kE,a)}\nfunction ht(a){Pq.call(this,lE,a)}\nfunction vt(a){Pq.call(this,mE,a)}\nfunction Mt(a){Pq.call(this,nE,a)}\nfunction Mu(a){Pq.call(this,qE,a)}\nfunction du(a){Pq.call(this,oE,a)}\nfunction tu(a){Pq.call(this,pE,a)}\nfunction xv(a){Pq.call(this,rE,a)}\nfunction Yv(a){Pq.call(this,sE,a)}\nfunction $t(a){Rq.call(this,RG,a)}\nfunction $u(a){Jq.call(this,GF,a)}\nfunction CJ(){Lz.call(this,null)}\nfunction Cy(a){return new Date(a)}\nfunction UI(a){return a.l|a.m<<22}\nfunction YP(a,b){return zM(a.d,b)}\nfunction eR(a,b){return xM(a.b,b)}\nfunction BM(b,a){return b.f[xT+a]}\nfunction RQ(a){this.b=Cy(TI(a))}\nfunction W(a,b){this.b=a;this.c=b}\nfunction Wb(a,b){this.b=a;this.c=b}\nfunction ab(a,b){this.b=a;this.c=b}\nfunction $b(a,b){this.b=a;this.c=b}\nfunction vc(a,b){this.b=a;this.c=b}\nfunction ke(a,b){this.b=a;this.c=b}\nfunction ze(a,b){this.b=a;this.c=b}\nfunction Ce(a,b){this.b=a;this.c=b}\nfunction Ge(a,b){this.b=a;this.c=b}\nfunction Ke(a,b){this.b=a;this.c=b}\nfunction Pe(a,b){this.b=a;this.c=b}\nfunction Ue(a,b){this.b=a;this.c=b}\nfunction $e(a,b){this.b=a;this.c=b}\nfunction Hf(a,b){this.b=a;this.c=b}\nfunction el(a,b){this.b=a;this.c=b}\nfunction Tm(a,b){this.b=a;this.c=b}\nfunction In(a,b){this.b=a;this.c=b}\nfunction Vn(a,b){this.c=a;this.b=b}\nfunction zq(a,b){this.c=a;this.d=b}\nfunction Jq(a,b){this.d=a;this.e=b}\nfunction Mi(a,b){this.g=a;this.i=b}\nfunction vw(a,b){this.b=a;this.c=b}\nfunction Tx(a,b){this.b=b;this.c=a}\nfunction Wx(a,b){this.b=b;this.c=a}\nfunction $x(a,b){this.b=b;this.c=a}\nfunction by(a,b){this.b=b;this.c=a}\nfunction ny(a,b){this.b=a;this.c=b}\nfunction AB(a,b){this.b=a;this.c=b}\nfunction qN(a,b){this.c=a;this.b=b}\nfunction $N(a,b){this.b=a;this.c=b}\nfunction jO(a,b){this.b=a;this.c=b}\nfunction Pq(a,b){Jq.call(this,a,b)}\nfunction Rq(a,b){Jq.call(this,a,b)}\nfunction uR(a,b){this.b=a;this.c=b}\nfunction fy(a,b){a.d=b;a.e=new EO}\nfunction S(a,b){Lb(a.b,new W(a,b))}\nfunction Q(a,b){sf(a.f,new ab(a,b))}\nfunction mK(a,b){return oK(a.b,b.b)}\nfunction IN(a){return a.c<a.e.Hc()}\nfunction WK(){return Math.random()}\nfunction UK(a){return Math.floor(a)}\nfunction GB(a){return AA(),a?zA:yA}\nfunction DL(a,b){return eL(a.b.b,b)}\nfunction DM(b,a){return xT+a in b.f}\nfunction DO(a){return ZB(a.b,0,a.c)}\nfunction DR(a,b){return qy(a.b,b.b)}\nfunction CL(a,b){rz(a.b,b);return a}\nfunction OL(a,b){rz(a.b,b);return a}\nfunction BL(a,b){qz(a.b,b);return a}\nfunction NL(a,b){qz(a.b,b);return a}\nfunction sJ(a){pJ();$wnd.alert(a)}\nfunction Qy(a){$wnd.clearTimeout(a)}\nfunction yx(a){$wnd.clearInterval(a)}\nfunction ys(a){Yr.call(this,fD,ZG,a)}\nfunction Hu(){Rq.call(this,iD,true)}\nfunction cs(){Rq.call(this,IG,false)}\nfunction ct(){Rq.call(this,LG,false)}\nfunction Lv(){Rq.call(this,ZG,false)}\nfunction tO(a){a.b=aC(hI,PR,0,0,0)}\nfunction Ic(a){a.d=new oR;a.c=new oR}\nfunction bs(a){return AA(),a.b?zA:yA}\nfunction Yy(a,b){return vz(a,b,null)}\nfunction pC(a){return a==null?null:a}\nfunction VQ(a){return a<10?sT+a:IS+a}\nfunction jC(a,b){return a.cM&&a.cM[b]}\nfunction hL(b,a){return b.indexOf(a)}\nfunction FI(a,b){return qI(a,b,false)}\nfunction oI(a){return pI(a.l,a.m,a.h)}\nfunction RL(a){ML(this);rz(this.b,a)}\nfunction FO(a){tO(this);NO(this.b,a)}\nfunction ln(a){this.b=new EO;this.c=a}\nfunction Lz(a){this.b=new Xz;this.c=a}\nfunction wL(){wL=LR;tL={};vL={}}\nfunction JR(){ER.call(this,HI(VL()))}\nfunction Sv(){Jq.call(this,null,true)}\nfunction Nn(a,b,c){un.call(this,a,b,c)}\nfunction jo(a,b,c){un.call(this,a,b,c)}\nfunction co(a,b,c){Bn.call(this,a,b,c)}\nfunction go(a,b,c){Bn.call(this,a,b,c)}\nfunction ls(a){is();Pq.call(this,iE,a)}\nfunction lv(a){Yr.call(this,lD,a,true)}\nfunction Sj(){Bh.call(this,(Xi(),Si).c)}\nfunction nk(){ri.call(this,(Xi(),Ti).c)}\nfunction oo(a){no.call(this,IS,a,false)}\nfunction YB(a){return ZB(a,0,a.length)}\nfunction Sf(a,b){return Sr(b,a.c,true)}\nfunction Im(a,b){return kC(zM(a.f,b),9)}\nfunction Gl(a,b){return fg((cg(),a),b)}\nfunction iC(a,b){return a.cM&&!!a.cM[b]}\nfunction oC(a){return a.tM==LR||iC(a,1)}\nfunction Wy(a){return a.$H||(a.$H=++My)}\nfunction eL(b,a){return b.charCodeAt(a)}\nfunction GL(a,b,c){return jL(a.b.b,b,c)}\nfunction hc(a,b,c){fc(a,c,b.f,b.c,b.b)}\nfunction Iq(a,b,c,d){kf(b,a.e?c+1:c,d)}\nfunction QO(a,b,c,d){a.splice(b,c,d)}\nfunction yN(a,b){(a<0||a>=b)&&BN(a,b)}\nfunction yw(a,b){ww(a!=null,b);return a}\nfunction NI(a,b){qI(a,b,true);return mI}\nfunction Tw(a,b){Rw();this.b=b;this.c=a}\nfunction TP(a){GP.call(this,a);this.b=a}\nfunction KP(a){zP.call(this,a);this.b=a}\nfunction sq(a){rq.call(this,a,new mq(a))}\nfunction mo(a,b){no.call(this,a,b,false)}\nfunction fv(){Yr.call(this,null,ZG,true)}\nfunction tJ(){if(!mJ){EJ(oJ);mJ=true}}\nfunction ww(a,b){if(!a){throw new wK(b)}}\nfunction zw(a,b){if(!a){throw new zK(b)}}\nfunction mC(a,b){return a!=null&&iC(a,b)}\nfunction fR(a,b){return IM(a.b,b)!=null}\nfunction ry(a){return UI(WI(a,RI(a,32)))}\nfunction yy(a){return nC(a)?lz(lC(a)):IS}\nfunction sb(b){return function(a){b.r(a)}}\nfunction er(a){kz();this.f=!a?null:$q(a)}\nfunction Pc(a){Ic(this);this.b=a;Nc(this)}\nfunction Vo(){No();this.b=new _Q;Po(this)}\nfunction pk(){this.b=new _Q;new ei(this)}\nfunction Xz(){this.e=new _Q;this.d=false}\nfunction gP(){gP=LR;eP=new pP;fP=new mP}\nfunction vx(){vx=LR;ux=new EO;qJ(new lJ)}\nfunction RK(){RK=LR;QK=aC(gI,PR,97,256,0)}\nfunction xO(a){a.b=aC(hI,PR,0,0,0);a.c=0}\nfunction $s(){Mi.call(this,jT,0);this.b=0}\nfunction $(a,b){a.b.c=b.b;R(a.b,b);uc(a.c)}\nfunction Uz(a,b){var c;c=Vz(a,b);return c}\nfunction yO(a,b){yN(b,a.c);return a.b[b]}\nfunction FL(a,b,c){return tz(a.b,b,b,c),a}\nfunction EL(a,b,c){return tz(a.b,b,c,IS),a}\nfunction qf(a,b){return Jz(a.d,(Nx(),Mx),b)}\nfunction jL(c,a,b){return c.substr(a,b-a)}\nfunction vb(c,a,b){c.addEventListener(a,b)}\nfunction uh(a,b,c){mC(b,9)&&kC(b,9).dc(a,c)}\nfunction zh(a,b,c){mC(b,9)&&kC(b,9).sc(a,c)}\nfunction xb(a,b,c,d){wb(a,b,c,ub(d),sb(d))}\nfunction cx(a,b){return Jz(a.c,(Rw(),Qw),b)}\nfunction dx(a,b){return Jz(a.c,(Yw(),Xw),b)}\nfunction bN(a){return a.c=kC(JN(a.b),105)}\nfunction TJ(a,b){return a.b==b.b?0:a.b?1:-1}\nfunction xy(a){return a==null?null:a.name}\nfunction vy(a){return a==null?null:a.message}\nfunction uy(a){return nC(a)?vy(lC(a)):a+IS}\nfunction Py(a,b,c){return a.apply(b,c);var d}\nfunction fz(a,b){!a&&(a=[]);Ay(a,b);return a}\nfunction dK(a){var b=dJ[a.e];a=null;return b}\nfunction oO(a){var b;b=bN(a.b).Cd();return b}\nfunction dO(a){var b;b=bN(a.b);return b.Bd()}\nfunction Ze(a,b){var c;c=Ac(b,a.b);qd(c,a.c)}\nfunction wx(a){a.c?yx(a.d):zx(a.d);BO(ux,a)}\nfunction Am(a){--a.c;Lm(a);a.c==0&&(a.d=IS)}\nfunction qj(a,b){!a.b&&(a.b=new EO);vO(a.b,b)}\nfunction sk(a,b){!a.b&&(a.b=new EO);vO(a.b,b)}\nfunction vO(a,b){cC(a.b,a.c++,b);return true}\nfunction N(a,b,c){this.b=a;this.d=b;this.c=c}\nfunction nf(a,b,c){this.d=a;this.c=b;this.b=c}\nfunction us(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Ns(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction qt(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Ht(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Wt(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Wu(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction ou(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Du(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Hv(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction gw(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction pw(a,b,c){Mi.call(this,a,b);this.b=c}\nfunction Kx(a,b,c){this.c=a;this.d=b;this.b=c}\nfunction ri(a){Bh.call(this,a);this.c=new _Q}\nfunction MJ(){cr.call(this,'divide by zero')}\nfunction VL(){return (new Date).getTime()}\nfunction Hj(a){return new jo(a.f,a.b,a.c.Hc())}\nfunction Ij(a){return new Nn(a.f,a.b,a.c.Hc())}\nfunction Jz(a,b,c){return new Zz(Qz(a.b,b,c))}\nfunction fg(a,b){return eg(kC(a,12),kC(b,12))}\nfunction Fp(a){return new vw((Ew(),Ew(),Dw),a)}\nfunction sL(a){return String.fromCharCode(a)}\nfunction eK(a){return typeof a=='number'&&a>0}\nfunction EK(a,b){return a.b<b.b?-1:a.b>b.b?1:0}\nfunction qy(a,b){return LI(a,b)?-1:JI(a,b)?1:0}\nfunction SK(a){return GI(a,dS)?0:LI(a,dS)?-1:1}\nfunction iL(b,a){return b.substr(a,b.length-a)}\nfunction ob(a){var b;return b=a,oC(b)?b.cZ:YF}\nfunction Az(a){var b;if(xz){b=new yz;Kz(a,b)}}\nfunction Pz(a,b){!a.b&&(a.b=new EO);vO(a.b,b)}\nfunction px(a,b,c){ox.call(this,a,new ly(b),c)}\nfunction tv(a){rv();zq.call(this,lD,qv);this.b=a}\nfunction QB(a){if(a==null){throw new YK}this.b=a}\nfunction oy(a){if(a==null){throw new YK}return a}\nfunction mz(){try{null.a()}catch(a){return a}}\nfunction dM(a){var b;b=a.Cc();return new $N(a,b)}\nfunction fM(a){var b;b=a.Cc();return new jO(a,b)}\nfunction qQ(a){var b;b=a.c.Mc();return new wQ(b)}\nfunction By(b,a){b.setTime(a);return b.getTime()}\nfunction Fx(a){a.b.f=false;a.b.n.c.c>0&&mx(a.b)}\nfunction Gf(a,b){var c;c=vf(b);a.b.c=c.c;$(a.c,c)}\nfunction Rz(a,b,c,d){var e;e=Tz(a,b,c);e.Jc(d)}\nfunction tz(a,b,c,d){a.b=jL(a.b,0,b)+d+iL(a.b,c)}\nfunction Rs(a,b,c,d){Oq(a,c,d,(Zs(),Ys),b.b,false)}\nfunction Wm(a,b){this.c=a;this.d=b;this.b=false}\nfunction $w(a,b,c){Yw();this.b=a;this.c=b;this.d=c}\nfunction bL(a){this.b='Unknown';this.d=a;this.c=-1}\nfunction Nb(a){this.b=new _Q;this.c=new EO;this.e=a}\nfunction jc(){this.b=new _Q;this.c=new _Q;ic(this)}\nfunction Bh(a){this.j=new _Q;this.f=new gR;this.k=a}\nfunction aA(a){dr.call(this,cA(a),bA(a));this.b=a}\nfunction ly(a){this.e=new EO;this.c=new EO;this.b=a}\nfunction rC(a){if(a!=null){throw new iK}return null}\nfunction zL(){if(uL==256){tL=vL;vL={};uL=0}++uL}\nfunction fC(){fC=LR;dC=[];eC=[];gC(new XB,dC,eC)}\nfunction Ag(){Ag=LR;new Bg((SJ(),RJ));new Bg(QJ)}\nfunction Zs(){Zs=LR;Ys=new $s;Xs=bC(XH,ZR,59,[Ys])}\nfunction pb(a){var b;return b=a,oC(b)?b.hC():Wy(b)}\nfunction Wf(a,b){return Or(),kC(Pr(b,a.b.c,UG),71)}\nfunction WI(a,b){return pI(a.l^b.l,a.m^b.m,a.h^b.h)}\nfunction GI(a,b){return a.l==b.l&&a.m==b.m&&a.h==b.h}\nfunction nC(a){return a!=null&&a.tM!=LR&&!iC(a,1)}\nfunction Vg(a,b){return new Tg(a,b.f,b.g,b.e,b.d,b)}\nfunction Ax(a,b){return Yy(rS(function(){a.kd()}),b)}\nfunction ub(b){var c=rb;return function(a){b.s(c(a))}}\nfunction nb(a,b){var c;return c=a,oC(c)?c.eQ(b):c===b}\nfunction dR(a,b){var c;c=EM(a.b,b,a);return c==null}\nfunction iz(a,b){a.length>=b&&a.splice(0,b);return a}\nfunction un(a,b,c){sn.call(this,a);this.b=c;this.c=b}\nfunction Tg(a,b,c,d,e){Kg.call(this,a,b,c,d);this.b=e}\nfunction hx(a,b,c,d,e){ix(a,(gP(),new uP(b)),c,d,e)}\nfunction Ro(a,b,c,d){So(a,b,c,d);So(a,c,b,new Yo(d))}\nfunction nA(a,b,c){var d;d=mA(a,b);oA(a,b,c);return d}\nfunction lx(a){var b;b=ex(a);!!b&&uf(a.b,b.c,b.d,b.b)}\nfunction ZN(a){var b;b=new dN(a.c.b);return new eO(b)}\nfunction iO(a){var b;b=new dN(a.c.b);return new pO(b)}\nfunction lq(a,b){var c;c=Im(a.b,b.lc());return c.mc(b)}\nfunction ZP(a){!a.c&&(a.c=new nQ(dM(a.d)));return a.c}\nfunction $P(a){!a.e&&(a.e=new zP(fM(a.d)));return a.e}\nfunction vM(a){a.b=[];a.f={};a.d=false;a.c=null;a.e=0}\nfunction AA(){AA=LR;yA=new BA(false);zA=new BA(true)}\nfunction SJ(){SJ=LR;QJ=new UJ(false);RJ=new UJ(true)}\nfunction rJ(a,b){return Jz((!nJ&&(nJ=new CJ),nJ),a,b)}\nfunction pI(a,b,c){return _=new bJ,_.l=a,_.m=b,_.h=c,_}\nfunction tk(a,b,c){var d;d=xk(a,b);return Ck(a,b.c,d,c)}\nfunction wk(a,b,c){var d;d=xk(a,b);return Ck(a,b.c,d,c)}\nfunction uk(a,b,c){var d;d=yk(a,b);return Dk(a,b.b,d,c)}\nfunction vk(a,b,c){var d;d=yk(a,b);return Dk(a,b.b,d,c)}\nfunction XO(a,b,c,d){var e;e=ZB(a,b,c);YO(e,a,b,c,-b,d)}\nfunction kf(a,b,c){xw(!!a,LS,bC(hI,PR,0,[a]));nA(a,b,c)}\nfunction jf(a,b){xw(!!a,LS,bC(hI,PR,0,[a]));nA(a,0,b)}\nfunction AR(a,b){return pC(a)===pC(b)||a!=null&&nb(a,b)}\nfunction BN(a,b){throw new CK('Index: '+a+', Size: '+b)}\nfunction jg(a){this.b=(ww(a!=null,'serializedValue'),a)}\nfunction qJ(a){pJ();tJ();return rJ(xz?xz:(xz=new Hz),a)}\nfunction lI(a){if(mC(a,101)){return a}return new ty(a)}\nfunction aB(a,b){if(b==null){throw new YK}return bB(a,b)}\nfunction jP(a){gP();return mC(a,106)?new IQ(a):new KP(a)}\nfunction Km(a){a.e&&a.b&&ym(a,(Xi(),Ti).c,eT);return a.e}\nfunction Nk(){Bh.call(this,(Xi(),Vi).c);this.c=new HL}\nfunction Ll(){Bh.call(this,(Xi(),Wi).c);this.d=new EO}\nfunction Pg(a,b,c,d){Kg.call(this,a,b,c,d);this.b=new EO}\nfunction om(a,b,c,d){this.c=a;this.b=b;this.d=c;this.e=d}\nfunction Kg(a,b,c,d){this.i=a;this.f=b;this.e=d;this.g=c}\nfunction KJ(a,b,c){this.b=a;this.e=b;this.d=null;this.c=c}\nfunction ty(a){br.call(this);this.c=a;this.b=IS;jz(this)}\nfunction kJ(){while((vx(),ux).c>0){wx(kC(yO(ux,0),86))}}\nfunction tb(c){var d=rb;return function(a,b){c.y(a,d(b))}}\nfunction tj(a,b,c){var d;d=xj(a,b,c);return zj(a,b.b,d,c)}\nfunction sj(a,b,c){var d;d=xj(a,b,c);return zj(a,b.b,d,c)}\nfunction rj(a,b,c){var d;d=wj(a,b,c);return Aj(a,b.c,d,c)}\nfunction uj(a,b,c){var d;d=wj(a,b,c);return Aj(a,b.c,d,c)}\nfunction Qj(a,b,c){vm(a.i,Mj(a,b,c),(!bm&&(bm=new dm),bm))}\nfunction xw(a,b,c){var d;if(!a){d=Bw(b,c);throw new wK(d)}}\nfunction kC(a,b){if(a!=null&&!jC(a,b)){throw new iK}return a}\nfunction aC(a,b,c,d,e){var f;f=_B(e,d);bC(a,b,c,f);return f}\nfunction zj(a,b,c,d){return new fh(a,d.uc(),d.vc(),d.wc(),b,c)}\nfunction Aj(a,b,c,d){return new hh(a,d.uc(),d.vc(),d.wc(),b,c)}\nfunction Ck(a,b,c,d){return new Zg(a,d.uc(),d.vc(),d.wc(),b,c)}\nfunction Dk(a,b,c,d){return new _g(a,d.uc(),d.vc(),d.wc(),b,c)}\nfunction ix(a,b,c,d,e){var f;f=ky(a.n,b,c);fx(a,new $w(f,d,e))}\nfunction hP(a,b){var c,d;d=a.c;for(c=0;c<d;++c){CO(a,c,b[c])}}\nfunction Gy(a){var b=Dy[a.charCodeAt(0)];return b==null?a:b}\nfunction XP(a){!a.b&&(a.b=new sQ(new YM(a.d)));return a.b}\nfunction cf(a){if(!a){return null}return !a.rd()?null:a.rd().b}\nfunction fL(a,b){if(!mC(b,1)){return false}return String(a)==b}\nfunction oL(a,b){a=String(a);if(a==b){return 0}return a<b?-1:1}\nfunction Yr(a,b,c){Jq.call(this,a,c);this.c=b;this.b=false}\nfunction uO(a,b,c){(b<0||b>a.c)&&BN(b,a.c);QO(a.b,b,0,c);++a.c}\nfunction yk(a,b){var c,d;c=b.b;d=Bk(a,b.c);FL(a.c,c,d);return d}\nfunction dc(a,b){var c;c=kC(zM(a.b,b),68);return !c?a.A(b):c.B()}\nfunction cB(a){var b;b=$A(a,aC(jI,PR,1,0,0));return new AB(a,b)}\nfunction WL(a){return a==null?0:mC(a,1)?yL(kC(a,1)):Wy(a)}\nfunction BI(a){return a.l+a.m*4194304+a.h*17592186044416}\nfunction iy(a){return a.e.c<=0&&a.e.c<=0&&a.c.c>0&&a.d!=-1}\nfunction $y(){return Yy(function(){Ly!=0&&(Ly=0);Oy=-1},10)}\nfunction P(a,b){return new Om(im(lm(jm(km(new mm,b),true),a.g)))}\nfunction Bf(a,b){var c;c=kC(yw(Of(b.qd()),OS),97).b;Fx(a.b,PK(c))}\nfunction $q(a){var b,c;b=a.cZ.f;c=a.fd();return c!=null?b+VS+c:b}\nfunction Fk(a,b){var c;c=Bk(a,b.c);return new jo(b.f,b.b,c.length)}\nfunction Gk(a,b){var c;c=Bk(a,b.c);return new Nn(b.f,b.b,c.length)}\nfunction rm(a,b){var c;c=dc(a.i,b.c);c.fc(a,b.b,a.j);EM(a.f,b.b,c)}\nfunction wb(f,a,b,c,d){var e=b.tS();f.sendRpc(a,JSON.parse(e),c,d)}\nfunction CO(a,b,c){var d;d=(yN(b,a.c),a.b[b]);cC(a.b,b,c);return d}\nfunction aK(a,b,c){var d;d=new $J;d.f=a+b;eK(c)&&fK(c,d);return d}\nfunction Zg(a,b,c,d,e,f){Kg.call(this,a,b,c,d);this.b=e;this.c=f}\nfunction _g(a,b,c,d,e,f){Kg.call(this,a,b,c,d);this.b=e;this.c=f}\nfunction fh(a,b,c,d,e,f){Kg.call(this,a,b,c,d);this.b=e;this.c=f}\nfunction hh(a,b,c,d,e,f){Kg.call(this,a,b,c,d);this.b=e;this.c=f}\nfunction Kr(a,b,c,d,e){Mi.call(this,a,b);this.d=c;this.b=d;this.c=e}\nfunction GO(a){tO(this);RO(this.b,0,0,a.Qc());this.c=this.b.length}\nfunction Oj(a,b){if(!a.b){return}BO(a.b,b);a.b.c==0&&(a.b=null)}\nfunction Kk(a,b){if(!a.b){return}BO(a.b,b);a.b.c==0&&(a.b=null)}\nfunction KN(a){if(a.d<0){throw new yK}a.e.Fd(a.d);a.c=a.d;a.d=-1}\nfunction kx(a,b){hy(a.n,b);fx(a,new Tw(a.n.e.c>0,a.n.c.c>0));mx(a)}\nfunction PQ(a,b){return SK(SI(HI(a.b.getTime()),HI(b.b.getTime())))}\nfunction wy(a){return a==null?bT:nC(a)?xy(lC(a)):mC(a,1)?tT:ob(a).f}\nfunction qC(a){return ~~Math.max(Math.min(a,2147483647),-2147483648)}\nfunction sf(a,b){xb(a.b,'getInitialData',(LA(),LA(),KA),new Hf(a,b))}\nfunction ef(a,b){xw(!!a.md(),JS,bC(hI,PR,0,[a]));return mA(a.md(),b)}\nfunction hf(a){xw(!!a.md(),KS,bC(hI,PR,0,[a]));return a.md().b.length}\nfunction $B(a,b){var c,d;c=a;d=_B(0,b);bC(c.cZ,c.cM,c.qI,d);return d}\nfunction GM(a,b){var c;c=a.c;a.c=b;if(!a.d){a.d=true;++a.e}return c}\nfunction KM(a){var b;b=a.c;a.c=null;if(a.d){a.d=false;--a.e}return b}\nfunction cK(a,b){var c;c=new $J;c.f=a+b;eK(0)&&fK(0,c);c.d=2;return c}\nfunction bC(a,b,c,d){fC();hC(d,dC,eC);d.cZ=a;d.cM=b;d.qI=c;return d}\nfunction hC(a,b,c){fC();for(var d=0,e=b.length;d<e;++d){a[b[d]]=c[d]}}\nfunction gL(a,b,c,d){var e;for(e=0;e<b;++e){c[d++]=a.charCodeAt(e)}}\nfunction rQ(a,b){var c;for(c=0;c<b;++c){cC(a,c,new AQ(kC(a[c],105)))}}\nfunction Rj(a,b,c){var d;d=yO(a.c,b);Qj(a,b,(gP(),new uP(c)));return d}\nfunction pj(a,b,c){vm(a.i,Fj(a,b,c),(!bm&&(bm=new dm),bm));return true}\nfunction Zw(a,b){var c,d;c=new oo(a.b);d=new Wm(a.c,a.d);vm(b.b.e,c,d)}\nfunction Uy(a,b,c){var d;d=Sy();try{return Py(a,b,c)}finally{Vy(d)}}\nfunction RO(a,b,c,d){Array.prototype.splice.apply(a,[b,c].concat(d))}\nfunction Ah(a,b,c,d){mC(b,9)&&kC(b,9).dc(a,d);mC(c,9)&&kC(c,9).sc(a,d)}\nfunction AO(a,b){var c;c=(yN(b,a.c),a.b[b]);PO(a.b,b,1);--a.c;return c}\nfunction zO(a,b,c){for(;c<a.c;++c){if(AR(b,a.b[c])){return c}}return -1}\nfunction lC(a){if(a!=null&&(a.tM==LR||iC(a,1))){throw new iK}return a}\nfunction JN(a){if(a.c>=a.e.Hc()){throw new zR}return a.e.Kc(a.d=a.c++)}\nfunction bf(a){if(!a){return null}return !a.pd()?null:new nK(a.pd().b)}\nfunction Jm(a){if(a.p){return a.p}a.p=kC(kC(zM(a.f,eT),9),8);return a.p}\nfunction Kl(a,b){vm(a.i,new Zn(a.g,a.e,b,a.b,a.c),(!bm&&(bm=new dm),bm))}\nfunction oj(a,b,c){vm(a.i,Fj(a,b,(gP(),new uP(c))),(!bm&&(bm=new dm),bm))}\nfunction xp(a,b){var c;c=fL(b.f,a.b)?(Ew(),Ew(),Dw):b;return new vw(a,c)}\nfunction im(a){var b,c,d,e;c=a.c;b=a.b;d=a.d;e=a.e;return new om(c,b,d,e)}\nfunction Wo(a,b){var c,d;for(d=b.Mc();d.Rc();){c=d.Sc();cC(a.b,a.c++,c)}}\nfunction Gm(a){var b;for(b=new LN(a.n);b.c<b.e.Hc();){rC(JN(b));null.Id()}}\nfunction hy(a,b){var c,d;for(d=new LN(b);d.c<d.e.Hc();){c=JN(d);vO(a.c,c)}}\nfunction eB(d,a,b){if(b){var c=b.ld();d.b[a]=c(b)}else{delete d.b[a]}}\nfunction oA(d,a,b){if(b){var c=b.ld();b=c(b)}else{b=undefined}d.b[a]=b}\nfunction vh(a,b,c){zw(!a.i&&a.g==null,'Cannot rebind object');a.i=b;a.g=c}\nfunction Zn(a,b,c,d,e){sn.call(this,a);this.d=b;this.c=c;this.b=d;this.e=e}\nfunction Xg(a,b,c,d,e,f,g){Kg.call(this,a,b,c,d);this.c=e;this.b=f;this.d=g}\nfunction bh(a,b,c,d,e,f,g){Kg.call(this,a,b,c,d);this.d=e;this.b=f;this.c=g}\nfunction jh(a,b,c,d,e,f,g){Kg.call(this,a,b,c,d);this.b=e;this.c=f;this.d=g}\nfunction L(){this.b=new Tf(new lf);this.d=new Vo;this.c=new jc;new zl}\nfunction Eg(){var a;zg=new FO(256);for(a=0;a<256;++a){vO(zg,new Bg(sL(a)))}}\nfunction bA(a){var b;b=a.Mc();if(!b.Rc()){return null}return kC(b.Sc(),101)}\nfunction af(a){if(!a){return null}return !a.nd()?null:(SJ(),a.nd().b?RJ:QJ)}\nfunction xM(a,b){return b==null?a.d:mC(b,1)?DM(a,kC(b,1)):CM(a,b,a.Ad(b))}\nfunction zM(a,b){return b==null?a.c:mC(b,1)?BM(a,kC(b,1)):AM(a,b,a.Ad(b))}\nfunction IM(a,b){return b==null?KM(a):mC(b,1)?LM(a,kC(b,1)):JM(a,b,a.Ad(b))}\nfunction xk(a,b){var c,d,e;e=b.c;d=e+b.b;c=GL(a.c,e,d);EL(a.c,e,d);return c}\nfunction ZB(a,b,c){var d,e;d=a;e=d.slice(b,c);bC(d.cZ,d.cM,d.qI,e);return e}\nfunction HM(e,a,b){var c,d=e.f;a=xT+a;a in d?(c=d[a]):++e.e;d[a]=b;return c}\nfunction gC(a,b,c){var d=0,e;for(var f in a){if(e=a[f]){b[d]=f;c[d]=e;++d}}}\nfunction Mc(a){var b={};for(var c=0;c<a.length;c+=2){b[a[c]]=a[c+1]}return b}\nfunction Jc(a){var b,c,d;b=[];for(d=a.Mc();d.Rc();){c=d.Sc();Ay(b,c)}return b}\nfunction BO(a,b){var c;c=zO(a,b,0);if(c==-1){return false}AO(a,c);return true}\nfunction Tr(a,b){var c;if(b){c=a.d;!c&&(c=a.b)}else{c=a.b;!c&&(c=a.d)}return c}\nfunction pp(a,b){var c;c=b;fL(b.f,a.b)&&(c=(Ew(),Ew(),Dw));return new vw(a,c)}\nfunction tp(a,b){var c;c=b;fL(b.f,a.b)&&(c=(Ew(),Ew(),Dw));return new vw(a,c)}\nfunction Bp(a,b){var c;c=b;fL(b.f,a.b)&&(c=(Ew(),Ew(),Dw));return new vw(a,c)}\nfunction lp(a,b){var c;c=b;fL(a.b,b.b)&&(c=(Ew(),Ew(),Dw));return new vw(a,c)}\nfunction Io(a,b){var c;c=b;fL(a.b,b.b)&&(c=(Ew(),Ew(),Dw));return new vw(a,c)}\nfunction th(a,b){var c;c=kC(zM(a.j,b.g),97);!c&&(c=PK(0));EM(a.j,b.g,PK(c.b+1))}\nfunction Sw(a,b){var c;c=Lc(bC(hI,PR,0,['saving',a.c,'pending',a.b]));qd(c,b.b)}\nfunction Ek(a,b){var c,d;d=b.c;c=b.c+b.b;return new go(b.f,b.c,Pk(GL(a.c,d,c)))}\nfunction Hk(a,b){var c,d;d=b.c;c=b.c+b.b;return new co(b.f,b.c,Pk(GL(a.c,d,c)))}\nfunction To(a,b,c){var d;d=Oo(a,b,c);if(d){return d.Yc(a,b,c)}return new vw(b,c)}\nfunction Iw(a){var b;b=aB(a.b,vS);if(!b){return null}return b.od()?null:b.rd().b}\nfunction uJ(){pJ();var a;if(mJ){a=new yJ;!!nJ&&Kz(nJ,a);return null}return null}\nfunction dB(a,b,c){var d;if(b==null){throw new YK}d=aB(a,b);eB(a,b,c);return d}\nfunction Nj(a,b){var c;c=yO(a.c,b);vm(a.i,Lj(a,b),(!bm&&(bm=new dm),bm));return c}\nfunction LM(d,a){var b,c=d.f;a=xT+a;if(a in c){b=c[a];--d.e;delete c[a]}return b}\nfunction Mm(a,b){var c;c=kC(zM(a.k,b.e),107);if(!c){c=new gR;EM(a.k,b.e,c)}c.Jc(b)}\nfunction Em(a,b){var c,d;for(d=new LN(a.g);d.c<d.e.Hc();){c=kC(JN(d),22);c.v(b)}}\nfunction Rv(a,b,c,d){var e;for(e=0;e<b.Hc();++e){Iq(a,c,e,Sr(b.Kc(e),d,true))}}\nfunction gt(a,b,c,d){Oq(a,c,d,(pt(),ot),b.c,false);Oq(a,c,d,nt,b.b,false)}\nfunction lL(a,b,c){a=a.slice(b,c);return String.fromCharCode.apply(null,a)}\nfunction Vy(a){a&&dz((bz(),az));--Ly;if(a){if(Oy!=-1){Zy(Oy);Oy=-1}}}\nfunction wf(a){this.d=new Lz(this);this.b=a;vb(a,'brix.bc_msg',tb(new yf(this)))}\nfunction mm(){this.c=(gP(),gP(),eP);this.b=true;this.d=new Zl;new zl;this.e=new Vl}\nfunction Fy(){Fy=LR;Dy=Jy();Ey=typeof JSON=='object'&&typeof JSON.parse==vT}\nfunction mA(d,a){var b=d.b[a];var c=(FB(),EB)[typeof b];return c?c(b):OB(typeof b)}\nfunction Of(a){var b;if(!(MS in a.b)){return null}b=Mf(a);return !b?null:PK(qC(b.b))}\nfunction mi(a,b){var c;if(mC(b,27)){c=kC(b,27);li(a,c)}else{throw new wK(XS+b.cZ.f)}}\nfunction cz(a){var b,c;if(a.b){c=null;do{b=a.b;a.b=null;c=gz(b,c)}while(a.b);a.b=c}}\nfunction dz(a){var b,c;if(a.c){c=null;do{b=a.c;a.c=null;c=gz(b,c)}while(a.c);a.c=c}}\nfunction El(a,b,c){var d;d=a.e==null;a.e=b.d;a.b=b.b;d&&Mm(a.i,a);return Il(a,b.c,c)}\nfunction Il(a,b,c){var d;d=a.c;a.c=b;return new Xg(a,c.uc(),c.vc(),c.wc(),a.e,a.c,d)}\nfunction vz(a,b,c){var d=$wnd.setTimeout(function(){a();c!=null&&Ry(c)},b);return d}\nfunction Dm(a,b,c){var d,e;for(e=new LN(a.g);e.c<e.e.Hc();){d=kC(JN(e),22);d.t(b,c)}}\nfunction Hm(a,b,c){var d,e;for(e=new LN(a.g);e.c<e.e.Hc();){d=kC(JN(e),22);d.u(b,c)}}\nfunction EM(a,b,c){return b==null?GM(a,c):mC(b,1)?HM(a,kC(b,1),c):FM(a,b,c,a.Ad(b))}\nfunction Kc(a){return mC(a,98)?kC(a,98).ud():mC(a,90)?kC(a,90).b:mC(a,1)?kC(a,1):null}\nfunction Uf(a){var b;b=new GO(a);iP(b,(gP(),gP(),fP));return b?new IQ(b):new KP(null)}\nfunction Jw(a){var b;b=aB(a.b,'user');if(!b){return null}return b.od()?null:b.rd().b}\nfunction Jk(a,b){var c;if(!mC(b,10)){return false}c=kC(b,10);return fL(a.c.b.b,c.c.b.b)}\nfunction PN(a,b){var c;this.b=a;LN.call(this,a);c=a.Hc();(b<0||b>c)&&BN(b,c);this.c=b}\nfunction rq(a,b){this.e=new EO;this.d=new EO;this.c=new EO;this.b=b;qm(a,new uq(this))}\nfunction rb(a){return a instanceof Array||a instanceof $wnd.Array?new qA(a):new gB(a)}\nfunction Ty(b){return function(){try{return Uy(b,this,arguments)}catch(a){throw a}}}\nfunction tw(a,b){if(a){return a}if(b){return b}throw new ZK('All arguments are null.')}\nfunction ng(a,b){if(mC(a,9)&&mC(b,9)){return fL(kC(a,9).lc(),kC(b,9).lc())}return rw(a,b)}\nfunction to(a,b){mC(a,49)?so(kC(a,49),b,false):!mC(a,72)&&(cC(b.b,b.c++,a),true);return b}\nfunction _J(a,b,c){var d;d=new $J;d.f=a+b;eK(c!=0?-c:0)&&fK(c!=0?-c:0,d);d.d=4;return d}\nfunction iP(a,b){gP();var c;c=ZB(a.b,0,a.c);XO(c,0,c.length,b?b:(KQ(),KQ(),JQ));hP(a,c)}\nfunction eq(a,b){var c;c=b;fL(a.f,b.f)&&fL(a.b,b.b)&&(c=(Ew(),Ew(),Dw));return new vw(a,c)}\nfunction nI(a){var b,c,d;b=a&4194303;c=a>>22&4194303;d=a<0?1048575:0;return pI(b,c,d)}\nfunction Hq(a,b,c){var d;d=a.e?c+1:c;if(d>=hf(kC(b,84))){return null}return ef(kC(b,84),d)}\nfunction Oq(a,b,c,d,e,f){var g;ww(!!d,iT);if(e==null){return}g=Sr(e,c,f);Iq(a,b,d.Xc(),g)}\nfunction rc(){gapi.drive.realtime.gwt.loadInternal_=function(a,b,c,d){sc(a,b,c,d)}}\nfunction ic(a){var b,c,d,e;for(c=(Xi(),Xi(),Ri),d=0,e=c.length;d<e;++d){b=c[d];hc(a,b,b.d)}}\nfunction Ib(a,b){var c,d;IM(a.b,b.g);for(d=new LN(a.c);d.c<d.e.Hc();){c=kC(JN(d),3);c.x(b)}}\nfunction wm(a,b){var c,d;for(d=b.Mc();d.Rc();){c=kC(d.Sc(),71);vm(a,c,(sg(),rg));a.e=false}}\nfunction oi(a,b){var c,d;ww(mC(b,53),SS);d=kC(b,53);c=pg(ni(a,d.b));return new Do(d.f,d.b,c)}\nfunction MK(a){var b,c;if(a==0){return 32}else{c=0;for(b=1;(b&a)==0;b<<=1){++c}return c}}\nfunction Pk(a){var b,c;c=new FO(a.lN());for(b=0;b<a.lN();++b){vO(c,pg(sL(a.cA(b))))}return c}\nfunction $A(e,a){var b=e.b;var c=0;for(var d in b){b.hasOwnProperty(d)&&(a[c++]=d)}return a}\nfunction qb(a){var b;return b=a,oC(b)?b.tS():b.toString?b.toString():'[JavaScriptObject]'}\nfunction dN(a){var b;this.d=a;b=new EO;a.d&&vO(b,new lN(a));uM(a,b);sM(a,b);this.b=new LN(b)}\nfunction bK(a,b,c,d,e){var f;f=new $J;f.f=a+b;eK(c)&&fK(c,f);f.d=e?8:0;f.c=d;f.b=e;return f}\nfunction Nq(a,b,c,d,e){var f;ww(!!d,iT);f=Hq(a,b,d.Xc());if(!f){return null}return Pr(f,c,e)}\nfunction Aw(a,b,c,d,e){if(b-(e?1:0)>=a){return a}if(c<0){if(a<b-c){return d?-1:b}}return a+c}\nfunction Ab(a,b,c,d,e,f,g){this.g=a;this.i=b;this.c=c;this.b=d;this.e=e;this.d=f;this.f=g}\nfunction Yi(a,b,c,d,e,f,g){Mi.call(this,a,b);this.c=c;this.f=d;this.d=e;this.b=g;this.e=f}\nfunction Do(a,b,c){sn.call(this,a);this.b=(ww(b!=null,'property cannot be null.'),b);this.c=c}\nfunction jy(a,b){if(a.d!=-1){throw new zK('Initial revision has already been set.')}a.d=b}\nfunction Lc(a){if(a.length%2!=0){throw new wK('Even number of arguments required')}return Mc(a)}\nfunction rw(a,b){if(pC(a)===pC(b)){return true}if(a==null||b==null){return false}return nb(a,b)}\nfunction qB(a,b){var c;while(a.Rc()){c=a.Sc();if(b==null?c==null:nb(b,c)){return a}}return null}\nfunction li(a,b){var c,d;if(!a.b){return}for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),14);c.Wb(b)}}\nfunction zk(a,b){var c,d;if(!a.b){return}for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),24);c.Xb(b)}}\nfunction Ak(a,b){var c,d;if(!a.b){return}for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),24);c.Yb(b)}}\nfunction Bj(a,b){var c,d;if(!a.b){return}for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),21);c.$b(b)}}\nfunction Cj(a,b){var c,d;if(!a.b){return}for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),21);c.Zb(b)}}\nfunction Dj(a,b){var c,d;if(!a.b){return}for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),21);c._b(b)}}\nfunction ec(a,b){var c;if(xM(a.b,b)){return b}c=kC(zM(a.c,b),1);if(c==null){return a.z(b)}return c}\nfunction Cl(a,b,c){var d;if(!fL(b.f,a.e)){return null}d=Aw(a.c,b.c,-b.b,a.b,true);return Il(a,d,c)}\nfunction gf(a){xw(!!a.qd(),'Attempted to fetch keys of %s',bC(hI,PR,0,[a]));return cB(a.qd())}\nfunction Fg(a){Ag();if(a>=0&&a<256){!zg&&Eg();return kC(yO(zg,a),16)}else{return new Bg(sL(a))}}\nfunction oK(a,b){if(isNaN(a)){return isNaN(b)?0:1}else if(isNaN(b)){return -1}return a<b?-1:a>b?1:0}\nfunction ts(){ts=LR;rs=new us(jT,0,0);ss=new us('TYPE_NAME',1,1);qs=bC(VH,ZR,57,[rs,ss])}\nfunction Ms(){Ms=LR;Ks=new Ns(jT,0,0);Ls=new Ns(kT,1,1);Js=new Ns(lT,2,2);Is=bC(WH,ZR,58,[Ks,Ls,Js])}\nfunction Vt(){Vt=LR;St=new Wt(jT,0,0);Tt=new Wt(kT,1,1);Ut=new Wt(mT,2,2);Rt=bC($H,ZR,62,[St,Tt,Ut])}\nfunction Cu(){Cu=LR;Au=new Du(jT,0,0);Bu=new Du(kT,1,1);zu=new Du(lT,2,2);yu=bC(aI,ZR,64,[Au,Bu,zu])}\nfunction Gv(){Gv=LR;Dv=new Hv(jT,0,0);Ev=new Hv(kT,1,1);Fv=new Hv(mT,2,2);Cv=bC(cI,ZR,66,[Dv,Ev,Fv])}\nfunction pt(){pt=LR;ot=new qt('TYPE',0,0);nt=new qt('ENCODED_CONTENT',1,1);mt=bC(YH,ZR,60,[ot,nt])}\nfunction _I(){_I=LR;XI=pI(4194303,4194303,524287);YI=pI(0,0,524288);ZI=II(1);II(2);$I=II(0)}\nfunction FB(){FB=LR;EB={'boolean':GB,number:HB,string:JB,object:IB,'function':IB,undefined:KB}}\nfunction Xv(a,b,c,d){Oq(a,c,d,(fw(),cw),b.f,false);Oq(a,c,d,dw,b.b,false);Oq(a,c,d,ew,b.c,true)}\nfunction wv(a,b,c,d){Oq(a,c,d,(Gv(),Dv),b.f,false);Oq(a,c,d,Ev,PK(b.b),false);Oq(a,c,d,Fv,b.c,false)}\nfunction Lt(a,b,c,d){Oq(a,c,d,(Vt(),St),b.f,false);Oq(a,c,d,Tt,PK(b.b),false);Oq(a,c,d,Ut,b.c,false)}\nfunction cu(a,b,c,d){Oq(a,c,d,(nu(),ju),b.f,false);Oq(a,c,d,ku,PK(b.b),false);Oq(a,c,d,mu,b.c,false)}\nfunction Bm(a,b){var c,d,e;for(d=ZN(dM(a.kc().b));IN(d.b.b);){c=kC(dO(d),20);e=zc(b,c.b);qd(e,c.c)}}\nfunction wh(a){var b,c,d;d=new EO;for(c=ZN(dM(a.j));IN(c.b.b);){b=kC(dO(c),1);vO(d,Im(a.i,b))}return d}\nfunction wI(a){var b,c;c=LK(a.h);if(c==32){b=LK(a.m);return b==32?LK(a.l)+32:b+20-10}else{return c-12}}\nfunction wO(a,b){var c,d;c=b.Qc();d=c.length;if(d==0){return false}RO(a.b,a.c,0,c);a.c+=d;return true}\nfunction ci(a,b){var c,d;d=kC(zM(a.b,b.b),103);if(!d){return}for(c=d.Mc();c.Rc();){rC(c.Sc());null.Id()}}\nfunction Fb(a,b){var c,d;b.e&&Kb(a,b);EM(a.b,b.g,b);for(d=new LN(a.c);d.c<d.e.Hc();){c=kC(JN(d),3);c.w(b)}}\nfunction Dl(a,b,c){var d;if(!fL(b.f,a.e)){return null}d=Aw(a.c,b.b,b.c.Hc(),a.b,true);return Il(a,d,c)}\nfunction Vr(a){var b;b=kC(zM(Mr,a),103);if(!b){return null}if(b.Hc()!=1){return null}return kC(b.Kc(0),55)}\nfunction oq(a){var b;if(a.e.c==0&&a.d.c==0){return}b=new iq;a.e.c==0||uO(a.e,0,b);a.d.c==0||uO(a.d,0,b)}\nfunction Gj(a,b){var c,d,e;e=new EO;for(c=0;c<b.b;++c){d=c+b.c;vO(e,pg(yO(a.c,d)))}return new go(b.f,b.c,e)}\nfunction Jj(a,b){var c,d,e;e=new EO;for(c=0;c<b.b;++c){d=c+b.c;vO(e,pg(yO(a.c,d)))}return new co(b.f,b.c,e)}\nfunction Bk(a,b){var c,d,e;c=new PL;for(e=b.Mc();e.Rc();){d=kC(e.Sc(),17);OL(c,qb(og(d,a.i)))}return c.b.b}\nfunction mc(a){var b,c;jc.call(this);for(c=ZN(dM(a.b));IN(c.b.b);){b=kC(dO(c),1);gc(this,new oc(b),b,null)}}\nfunction Ik(a,b,c){var d;d=new EO;vO(d,new co(a.g,b,Pk(c)));vm(a.i,new oo(d),(!bm&&(bm=new dm),bm))}\nfunction pg(a){return a==null?null:mC(a,9)?new Zf(kC(a,9).lc()):mC(a,13)?kC(a,13):(Ag(),Ag(),new Bg(a))}\nfunction ow(){ow=LR;lw=new pw(pT,0,pT);nw=new pw(qT,1,qT);mw=new pw(rT,2,rT);kw=bC(eI,ZR,69,[lw,nw,mw])}\nfunction Tf(a){var b;this.c=a;this.b=(b=new _Q,EM(b,PK(1),new Xf(this)),gP(),new _P(b));this.d=Uf(ZP(this.b))}\nfunction bM(a){var b,c,d;d=0;for(c=new dN(a.Cc().b);IN(c.b);){b=c.c=kC(JN(c.b),105);d+=b.hC();d=~~d}return d}\nfunction dv(a){var b,c,d;d=new QL(a.Hc());for(b=0;b<a.Hc();++b){c=kC(a.Kc(b),16);OL(d,kC(c.b,1))}return d.b.b}\nfunction kq(a,b){var c,d;d=Im(a.b,b.b);c=new EO;vO(c,new In(d.lc(),d.pc()));wO(c,d.oc());return uo(c,IS,false)}\nfunction eg(a,b){var c;c=oL(a.e,b.e);if(c!=0){return c}c=a.c-b.c;if(c!=0){return c}return a.b!=b.b?a.b?-1:1:0}\nfunction yL(a){wL();var b=xT+a;var c=vL[b];if(c!=null){return c}c=tL[b];c==null&&(c=xL(a));zL();return vL[b]=c}\nfunction sI(a,b,c,d,e){var f;f=QI(a,b);c&&vI(f);if(e){a=uI(a,b);d?(mI=OI(a)):(mI=pI(a.l,a.m,a.h))}return f}\nfunction su(a,b,c,d){Oq(a,c,d,(Cu(),Au),b.f,false);Oq(a,c,d,zu,PK(b.b),false);Oq(a,c,d,Bu,PK(b.c),false)}\nfunction Cs(a,b,c,d){Oq(a,c,d,(Ms(),Ks),b.f,false);Oq(a,c,d,Js,PK(b.b),false);Oq(a,c,d,Ls,PK(b.c),false)}\nfunction Oo(a,b,c){var d;if(mC(b,49)||mC(c,49)){return Mo}d=kC(zM(a.b,b.cZ),104);return d?kC(d.Dc(c.cZ),54):null}\nfunction ff(a,b){xw(!!a.qd(),'Attempted to dereference %s as an object',bC(hI,PR,0,[a]));return aB(a.qd(),b)}\nfunction Kj(a,b){var c,d,e;e=new EO;c=b.b;for(d=0;d<b.c.Hc();++d){vO(e,pg(yO(a.c,c+d)))}return new wo(b.f,b.b,e)}\nfunction EI(a,b){var c,d,e;c=a.l+b.l;d=a.m+b.m+(c>>22);e=a.h+b.h+(d>>22);return pI(c&4194303,d&4194303,e&1048575)}\nfunction SI(a,b){var c,d,e;c=a.l-b.l;d=a.m-b.m+(c>>22);e=a.h-b.h+(d>>22);return pI(c&4194303,d&4194303,e&1048575)}\nfunction uo(a,b,c){if(a.Hc()==1&&!c){return kC(a.Kc(0),71)}if(a.Hc()==0&&!c){return Ew(),Ew(),Dw}return new mo(b,a)}\nfunction PK(a){var b,c;if(a>-129&&a<128){b=a+128;c=(RK(),QK)[b];!c&&(c=QK[b]=new FK(a));return c}return new FK(a)}\nfunction nz(a){var b,c,d;d=a&&a.stack?a.stack.split('\\n'):[];for(b=0,c=d.length;b<c;++b){d[b]=hz(d[b])}return d}\nfunction Zq(a){var b,c,d;c=aC(iI,PR,100,a.length,0);for(d=0,b=a.length;d<b;++d){if(!a[d]){throw new YK}c[d]=a[d]}}\nfunction OI(a){var b,c,d;b=~a.l+1&4194303;c=~a.m+(b==0?1:0)&4194303;d=~a.h+(b==0&&c==0?1:0)&1048575;return pI(b,c,d)}\nfunction yM(e,a){var b=e.f;for(var c in b){if(c.charCodeAt(0)==58){var d=b[c];if(e.zd(a,d)){return true}}}return false}\nfunction uM(e,a){var b=e.f;for(var c in b){if(c.charCodeAt(0)==58){var d=new qN(e,c.substring(1));a.Jc(d)}}}\nfunction tm(a,b,c){var d,e,f;d=new EO;for(f=new GP(b.c.c.Mc());f.c.Rc();){e=kC(f.c.Sc(),71);wO(d,zm(a,e,c))}return d}\nfunction _m(a,b,c,d,e){var f,g,i,j,k;g=jL(a,0,c);j=jL(b,0,d);i=iL(a,c);k=iL(b,d);f=an(g,j,e);gn(f,an(i,k,e));return f}\nfunction fc(a,b,c,d,e){var f,g,i,j;f=new gR;for(i=0,j=e.length;i<j;++i){g=e[i];dR(f,g)}fL(d,c.f)||dR(f,c.f);gc(a,b,d,f)}\nfunction WO(a,b,c,d,e,f,g,i){var j;j=c;while(f<g){j>=d||b<c&&i.tc(a[b],a[j])<=0?cC(e,f++,a[b++]):cC(e,f++,a[j++])}}\nfunction gwtOnLoad(b,c,d,e){$moduleName=c;$moduleBase=d;if(b)try{rS(kI)()}catch(a){b(c)}else{rS(kI)()}}\nfunction cN(a){if(!a.c){throw new zK('Must call next() before remove().')}else{KN(a.b);IM(a.d,a.c.Bd());a.c=null}}\nfunction gx(a,b){if(a.n.e.c<=0){throw new wK('Unexpected ack received.')}fy(a.n,b);fx(a,new Tw(a.n.e.c>0,a.n.c.c>0))}\nfunction xx(a,b){if(b<0){throw new wK('must be non-negative')}a.c?yx(a.d):zx(a.d);BO(ux,a);a.c=false;a.d=Ax(a,b);vO(ux,a)}\nfunction fn(a,b){if(a.e==1){a.f=new Nn(a.c,a.f.c,a.f.b+b);CO(a.b,a.b.c-1,a.f)}else{a.f=new Nn(a.c,a.d,b);vO(a.b,a.f)}a.e=1}\nfunction Wz(a){var b,c;if(a.b){try{for(c=new LN(a.b);c.c<c.e.Hc();){b=kC(JN(c),87);Rz(b.b,b.e,b.d,b.c)}}finally{a.b=null}}}\nfunction cn(a,b){var c,d;d=VK(a.length,b.length);for(c=0;c<d;++c){if(a.charCodeAt(c)!=b.charCodeAt(c)){return c}}return d}\nfunction py(a,b){var c,d;oy(a);if(a.length>=b){return a}d=new QL;for(c=a.length;c<b;++c){sz(d.b,sT)}rz(d.b,a);return d.b.b}\nfunction UO(a){var b,c,d,e;if(a==null){return 0}e=1;for(c=0,d=a.length;c<d;++c){b=a[c];e=31*e+(b==null?0:pb(b))|0}return e}\nfunction kz(){var a,b,c,d;c=iz(nz(mz()),2);d=aC(iI,PR,100,c.length,0);for(a=0,b=d.length;a<b;++a){d[a]=new bL(c[a])}Zq(d)}\nfunction vI(a){var b,c,d;b=~a.l+1&4194303;c=~a.m+(b==0?1:0)&4194303;d=~a.h+(b==0&&c==0?1:0)&1048575;zI(a,b);AI(a,c);yI(a,d)}\nfunction qq(a,b){var c,d;if(a.c.c!=0){d=mC(b,49)?kC(b,49).d:null;c=uo(a.c,d==null?IS:d,false);uO(a.e,0,c);xO(a.d);a.c=new EO}}\nfunction Lk(a,b,c){var d;d=new EO;wO(d,Wl(a.i,a.g,b,-(c-b)));vO(d,new Nn(a.g,b,c-b));vm(a.i,new oo(d),(!bm&&(bm=new dm),bm))}\nfunction ox(a,b,c){this.c=new Lz(this);this.b=a;this.n=b;this.i=c;this.k=800;this.e=$R;qf(a,new rx(this));this.j=new Cx(this)}\nfunction OB(a){FB();throw new HA(\"Unexpected typeof result '\"+a+\"'; please report this bug to the GWT team\")}\nfunction fw(){fw=LR;cw=new gw(jT,0,0);dw=new gw('PROPERTY',1,1);ew=new gw('VALUE',2,2);bw=bC(dI,ZR,67,[cw,dw,ew])}\nfunction Vu(){Vu=LR;Tu=new Wu('MUTATIONS',0,0);Uu=new Wu('NAME',1,1);Su=new Wu('IS_CREATION',2,2);Ru=bC(bI,ZR,65,[Tu,Uu,Su])}\nfunction Bc(a,b){return Lc(bC(hI,PR,0,[CS,'text_deleted',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),FS,Kc(PK(a.b)),GS,a.c]))}\nfunction Cc(a,b){return Lc(bC(hI,PR,0,[CS,'text_inserted',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),FS,Kc(PK(a.b)),GS,a.c]))}\nfunction Ec(a,b){return Lc(bC(hI,PR,0,[CS,'values_added',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),FS,Kc(PK(a.b)),HS,a.c]))}\nfunction Fc(a,b){return Lc(bC(hI,PR,0,[CS,'values_removed',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),FS,Kc(PK(a.b)),HS,a.c]))}\nfunction Vz(a,b){var c,d;d=kC(zM(a.e,b),104);if(!d){return gP(),gP(),eP}c=kC(d.Dc(null),103);if(!c){return gP(),gP(),eP}return c}\nfunction Tz(a,b,c){var d,e;e=kC(zM(a.e,b),104);if(!e){e=new _Q;EM(a.e,b,e)}d=kC(e.Dc(c),103);if(!d){d=new EO;e.Fc(c,d)}return d}\nfunction ym(a,b,c){var d;xm(a,IS,false);vm(a,new In(c,ec(a.i,b)),(!bm&&(bm=new dm),bm));d=kC(zM(a.f,c),9);d.qc();Am(a);return d}\nfunction XM(a,b){var c,d,e;if(mC(b,105)){c=kC(b,105);d=c.Bd();if(xM(a.b,d)){e=zM(a.b,d);return a.b.yd(c.Cd(),e)}}return false}\nfunction Lj(a,b){var c,d;c=Wl(a.i,a.g,b,-1);if(c.c!=0){d=new GO(c);vO(d,new Nn(a.g,b,1));return new oo(d)}return new Nn(a.g,b,1)}\nfunction Sy(){var a;if(Ly!=0){a=(new Date).getTime();if(a-Ny>2000){Ny=a;Oy=$y()}}if(Ly++==0){cz((bz(),az));return true}return false}\nfunction VO(a,b,c,d){var e,f,g;for(e=b+1;e<c;++e){for(f=e;f>b&&d.tc(a[f-1],a[f])>0;--f){g=a[f];cC(a,f,a[f-1]);cC(a,f-1,g)}}}\nfunction sM(i,a){var b=i.b;for(var c in b){var d=parseInt(c,10);if(c==d){var e=b[d];for(var f=0,g=e.length;f<g;++f){a.Jc(e[f])}}}}\nfunction jz(a){var b,c,d,e;d=nz(nC(a.c)?lC(a.c):null);e=aC(iI,PR,100,d.length,0);for(b=0,c=e.length;b<c;++b){e[b]=new bL(d[b])}Zq(e)}\nfunction II(a){var b,c;if(a>-129&&a<128){b=a+128;DI==null&&(DI=aC(fI,PR,85,256,0));c=DI[b];!c&&(c=DI[b]=nI(a));return c}return nI(a)}\nfunction rI(a,b){if(a.h==524288&&a.m==0&&a.l==0){b&&(mI=pI(0,0,0));return oI((_I(),ZI))}b&&(mI=pI(a.l,a.m,a.h));return pI(0,0,0)}\nfunction Bn(a,b,c){sn.call(this,a);ww(c.Hc()>=1,'At least one value must be specified for an insert mutation.');this.b=b;this.c=c}\nfunction no(a,b,c){this.c=(gP(),mC(b,106)?new IQ(b):new KP(b));this.d=(ww(a!=null,'MultiMutation name cannot be null.'),a);this.b=c}\nfunction Om(a){this.g=new EO;this.n=new EO;this.f=new _Q;this.k=new _Q;this.o=new EO;this.i=a.d;this.b=a.b;this.j=a.e;wm(this,a.c)}\nfunction mx(a){var b;b=(new JR).b;if(a.g){a.d=b;return}if(!a.f&&JI(SI((new JR).b,a.d),a.e)){lx(a)}else{xx(a.j,a.k);a.g=true}a.d=b}\nfunction yj(a){var b;if(a.c.c>0){b=new EO;wO(b,Wl(a.i,a.g,0,-a.c.c));vO(b,new Nn(a.g,0,a.c.c));vm(a.i,new oo(b),(!bm&&(bm=new dm),bm))}}\nfunction ev(a){var b,c;c=new EO;for(b=0;b<a.length;++b){vO(c,(Ag(),new Bg(sL(a.charCodeAt(b)))))}return gP(),c?new IQ(c):new KP(null)}\nfunction AM(i,a,b){var c=i.b[b];if(c){for(var d=0,e=c.length;d<e;++d){var f=c[d];var g=f.Bd();if(i.zd(a,g)){return f.Cd()}}}return null}\nfunction CM(i,a,b){var c=i.b[b];if(c){for(var d=0,e=c.length;d<e;++d){var f=c[d];var g=f.Bd();if(i.zd(a,g)){return true}}}return false}\nfunction Wr(a){var b,c,d,e;for(c=(Jr(),Jr(),ir),d=0,e=c.length;d<e;++d){b=c[d];if(b.c==a){return b}}throw new wK('Found unknown type '+a)}\nfunction kL(c){if(c.length==0||c[0]>CT&&c[c.length-1]>CT){return c}var a=c.replace(/^(\\s*)/,IS);var b=a.replace(/\\s*$/,IS);return b}\nfunction nu(){nu=LR;ju=new ou(jT,0,0);ku=new ou(kT,1,1);mu=new ou(mT,2,2);lu=new ou('MUTATION_ID',3,3);iu=bC(_H,ZR,63,[ju,ku,mu,lu])}\nfunction ks(a,b,c,d){var e,f;Oq(a,c,d,(ts(),rs),b.b,false);f=b.c;e=kC(zM(hs,f),97);e?Oq(a,c,d,ss,new nK(e.b),true):Oq(a,c,d,ss,f,true)}\nfunction bB(f,a){var b=f.b;var c;a=String(a);b.hasOwnProperty(a)&&(c=b[a]);var d=(FB(),EB)[typeof c];var e=d?d(c):OB(typeof c);return e}\nfunction TI(a){if(GI(a,(_I(),YI))){return -9223372036854775808}if(!KI(a,$I)){return -BI(OI(a))}return a.l+a.m*4194304+a.h*17592186044416}\nfunction yh(a,b){var c;c=kC(zM(a.j,b.g),97);if(!c){throw new wK('Removed non-existent parent '+b)}c.b==1?IM(a.j,b.g):EM(a.j,b.g,PK(c.b-1))}\nfunction wo(a,b,c){sn.call(this,a);if(c.Hc()<1){throw new wK('At least one value must be specified for a set mutation.')}this.b=b;this.c=c}\nfunction jl(a,b){var c,d;if(mC(b,9)){c=kC(b,9);d=new vl(c);if(eR(a.b,d)){return a.Vc(c)}else{dR(a.b,d);return a.Tc(c)}}else{return a.Uc(b)}}\nfunction Fq(a,b,c){var d;if(kC(b,84).od()){return null}if(!a.e&&!kC(b,84).md()){d=new pA;jf(d,kC(b,84));return a.bd(d,c)}else{return a.bd(b,c)}}\nfunction Sr(a,b,c){Or();var d;if(a==null){return LA(),LA(),KA}d=Ur(a);if(!d){throw new fr('No encoder for type: '+ob(a).f)}return Tr(d,c)._c(a,b,d)}\nfunction dn(a,b){var c,d,e,f;e=a.length;f=b.length;d=e<f?e:f;for(c=1;c<=d;++c){if(a.charCodeAt(e-c)!=b.charCodeAt(f-c)){return c-1}}return d}\nfunction wj(a,b,c){var d,e,f,g;g=b.c;e=null;!!a.b&&(e=new EO);for(f=0;f<b.b;++f){d=AO(a.c,g);zh(a,d,c.wc());!!e&&(cC(e.b,e.c++,d),true)}return e}\nfunction so(a,b,c){var d,e;for(e=new GP(a.c.c.Mc());e.c.Rc();){d=kC(e.c.Sc(),71);mC(d,49)?so(kC(d,49),b,c):mC(d,72)?c&&b.Jc(d):b.Jc(d)}return b}\nfunction pi(a){var b,c,d;d=new EO;for(c=new dN((new YM(a.c)).b);IN(c.b);){b=c.c=kC(JN(c.b),105);vO(d,new Do(a.g,kC(b.Bd(),1),pg(b.Cd())))}return d}\nfunction Ur(a){var b,c,d;b=kC(zM(Mr,ob(a)),103);!b&&(b=Nr);for(d=b.Mc();d.Rc();){c=kC(d.Sc(),55);if(!c.d?c.b.Zc(a):c.d.Zc(a)){return c}}return null}\nfunction lz(b){var c=IS;try{for(var d in b){if(d!='name'&&d!='message'&&d!='toString'){try{c+='\\n '+d+VS+b[d]}catch(a){}}}}catch(a){}return c}\nfunction Gc(a,b){return Lc(bC(hI,PR,0,[CS,'values_set',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),FS,Kc(PK(a.b)),'oldValues',a.d,'newValues',a.c]))}\nfunction Dc(a,b){return Lc(bC(hI,PR,0,[CS,'value_changed',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),'property',a.d,'oldValue',a.c,'newValue',a.b]))}\nfunction is(){is=LR;var a,b,c,d;hs=new _Q;gs=new _Q;for(b=(Xi(),Xi(),Ri),c=0,d=b.length;c<d;++c){a=b[c];EM(hs,a.c,PK(a.e));EM(gs,PK(a.e),a.c)}}\nfunction Lb(a,b){if(a.f){return}a.f=true;vb(a.e,'brix.join',tb(new Pb(a)));vb(a.e,'brix.leave',tb(new Sb(a)));xb(a.e,uS,(LA(),LA(),KA),new Wb(a,b))}\nfunction gy(a){if(a.e.c>0){throw new zK('Cannot dequeue for send when there are still unacknowledged mutations.')}a.e=a.c;a.c=new EO;return jP(a.e)}\nfunction Fm(a,b){var c,d;if(mC(b,40)){Gm(a,Im(a,kC(b,40).b))}else if(mC(b,49)){for(d=new GP(kC(b,49).c.c.Mc());d.c.Rc();){c=kC(d.c.Sc(),71);Fm(a,c)}}}\nfunction vN(a,b){var c,d;for(c=0,d=a.b.length;c<d;++c){if(b==null?(yN(c,a.b.length),a.b[c])==null:nb(b,(yN(c,a.b.length),a.b[c]))){return c}}return -1}\nfunction gz(b,c){var d,e,f;for(d=0,e=b.length;d<e;++d){f=b[d];try{f[1]?f[0].Id()&&(c=fz(c,f)):f[0].Id()}catch(a){a=lI(a);if(!mC(a,101))throw a}}return c}\nfunction Hl(a,b,c,d){if(a.e!=null){throw new wK('Index reference has already been initialized')}vm(a.i,new Zn(a.g,b.lc(),c,d,-1),(!bm&&(bm=new dm),bm))}\nfunction uI(a,b){var c,d,e;if(b<=22){c=a.l&(1<<b)-1;d=e=0}else if(b<=44){c=a.l;d=a.m&(1<<b-22)-1;e=0}else{c=a.l;d=a.m;e=a.h&(1<<b-44)-1}return pI(c,d,e)}\nfunction ex(a){var b,c;if(!a.f&&iy(a.n)){b=gy(a.n);fx(a,new Tw(a.n.e.c>0,a.n.c.c>0));c=new $x(a.i,b);a.f=true;return new Kx(c,a.n.d,new Gx(a))}return null}\nfunction Mb(a){var b;b=a.qd();return new Ab(aB(b,vS).rd().b,aB(b,wS).rd().b,aB(b,xS).rd().b,aB(b,yS).rd().b,aB(b,zS).nd().b,aB(b,AS).nd().b,aB(b,BS).rd().b)}\nfunction jn(a,b){var c,d,e,f,g,i,j;g=new FO(b.length);for(d=(i=b.length,j=aC(RH,PR,-1,i,1),gL(b,i,j,0),j),e=0,f=d.length;e<f;++e){c=d[e];vO(g,Fg(c))}kn(a,g)}\nfunction Ac(a,b){return Lc(bC(hI,PR,0,[CS,'reference_shifted',DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),'id',a.c,'newIndex',Kc(PK(a.b)),'oldIndex',Kc(PK(a.d))]))}\nfunction Qv(a,b,c){var d,e,f,g;f=(g=hf(kC(b,84)),a.e?g-1:g);e=new FO(f);for(d=0;d<f;++d){vO(e,(Or(),Pr(Hq(a,b,d),c,UG)))}return gP(),e?new IQ(e):new KP(null)}\nfunction eM(a){var b,c,d,e;e=TS;b=false;for(d=new dN(a.Cc().b);IN(d.b);){c=d.c=kC(JN(d.b),105);b?(e+=US):(b=true);e+=IS+c.Bd();e+=DT;e+=IS+c.Cd()}return e+WS}\nfunction Xl(a,b,c){var d,e,f,g,i;i=to(c,new EO);e=new EO;for(g=new LN(i);g.c<g.e.Hc();){f=kC(JN(g),71);if(mC(f,41)){d=kC(f,41);wO(e,Wl(a,b,d.c,-d.b))}}return e}\nfunction um(a,b,c){var d,e,f,g,i;e=new EO;d=Im(a,b.lc());wO(e,d.ec(b,c));i=kC(zM(a.k,b.lc()),107);if(i){for(g=i.Mc();g.Rc();){f=kC(g.Sc(),12);wO(e,Fl(f,b,c))}}return e}\nfunction Lu(a,b,c,d){var e,f;Oq(a,c,d,(Vu(),Tu),b.c,false);f=b.d;!f.length&&(f=null);Oq(a,c,d,Uu,f,false);e=(SJ(),b.b?RJ:QJ);e.b||(e=null);Oq(a,c,d,Su,e,false)}\nfunction ut(a,b,c,d){Oq(a,c,d,(Gt(),Ct),b.f,false);Oq(a,c,d,Ft,b.d,false);Oq(a,c,d,Dt,PK(b.c),false);Oq(a,c,d,Bt,(SJ(),b.b?RJ:QJ),false);Oq(a,c,d,Et,PK(b.e),false)}\nfunction Kb(a,b){xw(!a.d||zb(a.d,b),\"Cannot reset 'me' object. Existing me: %s, new me: %s\",bC(hI,PR,0,[a.d,b]));if(!a.d){a.d=b;cm((!bm&&(bm=new dm),bm),b.g,b.i)}}\nfunction Pf(a,b,c){var d,e;d=aB(a,b);if(d){e=d.rd();if(!e){if(d.od()){return null}throw new jK(Bw(QS,bC(hI,PR,0,[pG.f,b,oG.f,aB(a,b)])))}return e.b}else{return c}}\nfunction fK(a,b){var c;b.e=a;if(a==2){c=String.prototype}else{if(a>0){var d=dK(b);if(d){c=d.prototype}else{d=dJ[a]=function(){};d.cZ=b;return}}else{return}}c.cZ=b}\nfunction js(a,b,c){var d,e,f,g;e=kC(Nq(a,b,c,(ts(),rs),ZG),1);d=Nq(a,b,c,ss,UG);if(mC(d,1)){g=kC(d,1)}else{f=kC(d,93);g=kC(zM(gs,PK(qC(f.b))),1)}return new In(e,g)}\nfunction hv(a){var b,c,d,e,f;for(d=a.Mc();d.Rc();){c=d.Sc();if(mC(c,16)){e=kC(c,16);f=e.b;if(mC(f,1)){b=kC(f,1);if(b.length==1){continue}}}return false}return true}\nfunction ZQ(){ZQ=LR;XQ=bC(jI,PR,1,['Sun','Mon','Tue','Wed','Thu','Fri','Sat']);YQ=bC(jI,PR,1,['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])}\nfunction ji(a,b){var c,d,e;e=17;for(d=(gP(),qQ(XP(new _P(a.c))));d.b.Rc();){c=new AQ(kC(d.b.Sc(),105));e=e*37+yL(kC(c.b.Bd(),1));e=e*37+kC(jl(b,c.b.Cd()),97).b}return e}\nfunction _K(){_K=LR;$K=bC(RH,PR,-1,[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122])}\nfunction zb(a,b){var c;if(!mC(b,2)){return false}c=kC(b,2);return sw(bC(hI,PR,0,[a.g,c.g,a.i,c.i,a.c,c.c,a.b,c.b,(SJ(),a.e?RJ:QJ),c.e?RJ:QJ,a.d?RJ:QJ,c.d?RJ:QJ,a.f,c.f]))}\nfunction Hb(a,b,c){var d,e,f,g,i;f=b.qd();for(i=new LN(new $O(cB(f).c));i.c<i.e.Hc();){g=kC(JN(i),1);d=aB(f,g).qd();Fb(a,Mb(d))}if(a.d){V(c)}else{e=new $b(a,c);vO(a.c,e)}}\nfunction Bg(a){Ag();ww(a!=null,'Primitive values cannot be null.');xw(mC(a,1)||mC(a,90)||mC(a,98),'Illegal primitive value %s has type %s',bC(hI,PR,0,[a,ob(a)]));this.b=a}\nfunction NK(a){var b,c,d;b=aC(RH,PR,-1,8,1);c=(_K(),$K);d=7;if(a>=0){while(a>15){b[d--]=c[a&15];a>>=4}}else{while(d>0){b[d--]=c[a&15];a>>=4}}b[d]=c[a&15];return lL(b,d,8)}\nfunction Mf(a){var b,c;b=aB(a,MS);if(b){c=b.pd();if(!c){if(b.od()){return null}throw new jK(Bw(QS,bC(hI,PR,0,[mG.f,MS,oG.f,aB(a,MS)])))}return new nK(c.b)}else{return null}}\nfunction Lf(a){var b,c;b=aB(a,PS);if(b){c=b.nd();if(!c){if(b.od()){return null}throw new jK(Bw(QS,bC(hI,PR,0,[jG.f,PS,oG.f,aB(a,PS)])))}return SJ(),c.b?RJ:QJ}else{return null}}\nfunction ky(a,b,c){var d;a.d=c;d=Uo(a.b,a.e,b);a.e=new FO(jP(d.b).c.Hc());wO(a.e,jP(d.b));d=Uo(a.b,a.c,jP(d.c));a.c=new FO(jP(d.b).c.Hc());wO(a.c,jP(d.b));return jP(jP(d.c))}\nfunction CI(a,b){var c,d,e;e=a.h-b.h;if(e<0){return false}c=a.l-b.l;d=a.m-b.m+(c>>22);e+=d>>22;if(e<0){return false}zI(a,c&4194303);AI(a,d&4194303);yI(a,e&1048575);return true}\nfunction qg(a){var b,c,d;b=new EO;for(d=new LN(a);d.c<d.e.Hc();){c=JN(d);vO(b,kC(c==null?null:mC(c,9)?new Zf(kC(c,9).lc()):mC(c,13)?kC(c,13):(Ag(),Ag(),new Bg(c)),17))}return b}\nfunction qi(a,b,c){var d;d=zM(a.c,b);vm(a.i,new Do(a.g,b,kC(c==null?null:mC(c,9)?new Zf(kC(c,9).lc()):mC(c,13)?kC(c,13):(Ag(),Ag(),new Bg(c)),17)),(!bm&&(bm=new dm),bm));return d}\nfunction Jg(a,b){var c;if(a===b){return true}if(b==null){return false}if(a.cZ!=ob(b)){return false}c=kC(b,18);return sw(bC(hI,PR,0,[(SJ(),a.e?RJ:QJ),c.e?RJ:QJ,a.f,c.f,a.g,c.g]))}\nfunction sw(a){var b;if(a.length%2!=0){throw new wK('There must be an even number of fields to compare.')}for(b=0;b<a.length;b+=2){if(!rw(a[b],a[b+1])){return false}}return true}\nfunction rB(a){var b,c,d,e;d=new HL;b=null;rz(d.b,_S);c=a.Mc();while(c.Rc()){b!=null?(rz(d.b,b),d):(b=US);e=c.Sc();rz(d.b,e===a?'(this Collection)':IS+e)}rz(d.b,RS);return d.b.b}\nfunction So(a,b,c,d){var e;ww(!(b==FF&&c==FF),'At least one of the registered types must be a concrete mutation class.');e=kC(zM(a.b,b),104);if(!e){e=new _Q;EM(a.b,b,e)}e.Fc(c,d)}\nfunction cM(a,b,c){var d,e,f;for(e=new dN(a.Cc().b);IN(e.b);){d=e.c=kC(JN(e.b),105);f=d.Bd();if(b==null?f==null:nb(b,f)){if(c){d=new uR(d.Bd(),d.Cd());cN(e)}return d}}return null}\nfunction _B(a,b){var c=new Array(b);if(a==3){for(var d=0;d<b;++d){var e=new Object;e.l=e.m=e.h=0;c[d]=e}}else if(a>0){var e=[null,0,false][a];for(var d=0;d<b;++d){c[d]=e}}return c}\nfunction xj(a,b,c){var d,e,f,g,i;d=b.b;e=null;!!a.b&&(e=new EO);for(i=b.c.Mc();i.Rc();){g=kC(i.Sc(),17);f=og(g,a.i);uO(a.c,d++,f);uh(a,f,c.wc());!!e&&(cC(e.b,e.c++,f),true)}return e}\nfunction wM(k,a){var b=k.b;for(var c in b){var d=parseInt(c,10);if(c==d){var e=b[d];for(var f=0,g=e.length;f<g;++f){var i=e[f];var j=i.Cd();if(k.zd(a,j)){return true}}}}return false}\nfunction JM(i,a,b){var c=i.b[b];if(c){for(var d=0,e=c.length;d<e;++d){var f=c[d];var g=f.Bd();if(i.zd(a,g)){c.length==1?delete i.b[b]:c.splice(d,1);--i.e;return f.Cd()}}}return null}\nfunction Qz(a,b,c){if(!b){throw new ZK('Cannot add a handler with a null type')}if(!c){throw new ZK('Cannot add a null handler')}a.c>0?Pz(a,new KJ(a,b,c)):Rz(a,b,null,c);return new IJ}\nfunction MB(b){FB();var c;if(b==null){throw new YK}if(b.length==0){throw new wK('empty argument')}try{return LB(b,true)}catch(a){a=lI(a);if(mC(a,77)){c=a;throw new IA(c)}else throw a}}\nfunction sc(a,b,c,d){var e,f,g,i,j,k,n,o,p;f=new gR;for(g=0;g<d.length;++g){dR(f,d[g])}e=c;i=K(new L,new mc(f));j=new T((n=i.b,o=i.d,p=i.c,new N(n,o,p)),e);k=new Pc(j);S(j,new vc(k,b))}\nfunction Rp(a,b){var c,d,e,f;d=b.b;c=a.b;if(fL(a.f,b.f)){d=Aw(b.b,a.b,a.c.Hc(),false,true);c=Aw(a.b,b.b,b.c.Hc(),false,false)}f=new co(b.f,d,b.c);e=new co(a.f,c,a.c);return new vw(e,f)}\nfunction JI(a,b){var c,d;c=a.h>>19;d=b.h>>19;return c==0?d!=0||a.h>b.h||a.h==b.h&&a.m>b.m||a.h==b.h&&a.m==b.m&&a.l>b.l:!(d==0||a.h<b.h||a.h==b.h&&a.m<b.m||a.h==b.h&&a.m==b.m&&a.l<=b.l)}\nfunction KI(a,b){var c,d;c=a.h>>19;d=b.h>>19;return c==0?d!=0||a.h>b.h||a.h==b.h&&a.m>b.m||a.h==b.h&&a.m==b.m&&a.l>=b.l:!(d==0||a.h<b.h||a.h==b.h&&a.m<b.m||a.h==b.h&&a.m==b.m&&a.l<b.l)}\nfunction hJ(a){return $stats({moduleName:$moduleName,sessionId:$sessionId,subSystem:'startup',evtGroup:'moduleStartup',millis:(new Date).getTime(),type:'onModuleLoadStart',className:a})}\nfunction Fj(a,b,c){var d,e,f;d=new EO;for(f=c.Mc();f.Rc();){e=f.Sc();vO(d,kC(e==null?null:mC(e,9)?new Zf(kC(e,9).lc()):mC(e,13)?kC(e,13):(Ag(),Ag(),new Bg(e)),17))}return new co(a.g,b,d)}\nfunction Mj(a,b,c){var d,e,f;d=new FO(c.Hc());for(f=c.Mc();f.Rc();){e=f.Sc();vO(d,kC(e==null?null:mC(e,9)?new Zf(kC(e,9).lc()):mC(e,13)?kC(e,13):(Ag(),Ag(),new Bg(e)),17))}return new wo(a.g,b,d)}\nfunction R(a,b){var c,d,e;dx(a.i,new eb(a));e=b.c;d=new Tx(a.d,b.d);c=a.c==(ow(),lw);a.e=new Om(im(lm(jm(km(new mm,d),c),a.g)));qm(a.e,new kb(a));new sq(a.e);bC(hI,PR,0,[PK(e)]);nx(a.i,e)}\nfunction T(a,b){P(this,(gP(),gP(),eP));this.d=a.b;this.f=new wf(b.getRpcService());this.j=b.getRpcService();this.k=a.d;this.g=a.c;this.i=new px(this.f,this.k,this.d);this.b=new Nb(this.j)}\nfunction tf(a,b){var c,d,e,f,g;c=b.md();g=new EO;for(e=0;e<c.b.length;++e){d=mA(c,e).qd();f=new Kw(d);qC(aB(f.b,MS).pd().b)>a.c&&(a.c=qC(aB(f.b,MS).pd().b));cC(g.b,g.c++,f)}rf(a,new Px(g))}\nfunction Gt(){Gt=LR;Ct=new Ht(jT,0,0);Ft=new Ht('REFERENCE_OBJECT_ID',1,1);Dt=new Ht(kT,2,2);Bt=new Ht('CAN_BE_DELETED',3,3);Et=new Ht('PREVIOUS_INDEX',4,4);At=bC(ZH,ZR,61,[Ct,Ft,Dt,Bt,Et])}\nfunction Hy(b){Fy();var c=b.replace(/[\\xad\\u0600-\\u0603\\u06dd\\u070f\\u17b4\\u17b5\\u200b-\\u200f\\u2028-\\u202e\\u2060-\\u2064\\u206a-\\u206f\\ufeff\\ufff9-\\ufffb]/g,function(a){return Gy(a)});return c}\nfunction Kf(a,b){var c,d,e,f;for(d=kC(b.b&&b.b(),95),e=0,f=d.length;e<f;++e){c=d[e];if(fL(kC(c,69).b,a)){return c}}throw new wK(\"Value '\"+a+\"' is not a valid serialized form for enum: \"+b.f)}\nfunction Pj(a,b,c){var d,e;d=Wl(a.i,a.g,b,-(c-b));if(d.c==0){vm(a.i,new Nn(a.g,b,c-b),(!bm&&(bm=new dm),bm))}else{e=new GO(d);vO(e,new Nn(a.g,b,c-b));vm(a.i,new oo(e),(!bm&&(bm=new dm),bm))}}\nfunction Kz(b,c){var d,e;!c.e||(c.e=false,c.f=null);e=c.f;Ow(c,b.c);try{Sz(b.b,c)}catch(a){a=lI(a);if(mC(a,88)){d=a;throw new dA(d.b)}else throw a}finally{e==null?(c.e=true,c.f=null):(c.f=e)}}\nfunction Wl(a,b,c,d){var e,f,g,i,j;e=new EO;for(i=(j=kC(zM(a.k,b),107),j?j:new gR).Mc();i.Rc();){g=kC(i.Sc(),12);f=Aw(g.c,c,d,true,true);g.c!=-1&&f==-1&&vO(e,new Zn(g.g,g.e,g.c,g.b,g.c))}return e}\nfunction TN(a,b,c){this.d=a;this.b=b;this.c=c-b;if(b>c){throw new wK(ET+b+' > toIndex: '+c)}if(b<0){throw new CK(ET+b+' < 0')}if(c>a.Hc()){throw new CK('toIndex: '+c+' > wrapped.size() '+a.Hc())}}\nfunction xL(a){var b,c,d,e;b=0;d=a.length;e=d-4;c=0;while(c<e){b=a.charCodeAt(c+3)+31*(a.charCodeAt(c+2)+31*(a.charCodeAt(c+1)+31*(a.charCodeAt(c)+31*b)))|0;c+=4}while(c<d){b=b*31+eL(a,c++)}return b|0}\nfunction cC(a,b,c){if(c!=null){if(a.qI>0&&!jC(c,a.qI)){throw new OJ}else if(a.qI==-1&&(c.tM==LR||iC(c,1))){throw new OJ}else if(a.qI<-1&&!(c.tM!=LR&&!iC(c,1))&&!jC(c,-a.qI)){throw new OJ}}return a[b]=c}\nfunction FM(k,a,b,c){var d=k.b[c];if(d){for(var e=0,f=d.length;e<f;++e){var g=d[e];var i=g.Bd();if(k.zd(a,i)){var j=g.Cd();g.Dd(b);return j}}}else{d=k.b[c]=[]}var g=new uR(a,b);d.push(g);++k.e;return null}\nfunction uf(a,b,c,d){var e,f,g,i,j;j=new pA;e=0;for(i=new by(b.c,new GP(b.b.c.Mc()));i.b.c.Rc();){g=Sf(i.c,kC(i.b.c.Sc(),71));nA(j,e++,g)}f=new fB;dB(f,NS,j);dB(f,MS,new SA(c));xb(a.b,'mutate',f,new Cf(d))}\nfunction xm(a,b,c){if(c){zw(a.c==0,'Creation compound operations cannot be nested inside another compound operation.');a.q=true}a.c==0&&(a.d=(ww(b!=null,'Compound operation name cannot be null.'),b));++a.c}\nfunction Lm(a){var b,c;if(a.c!=0){return}if(a.o.c==0){return}a.d!=null||a.o.c>1?Em(a,new no(a.d,a.o,a.q)):Em(a,kC(yO(a.o,0),71));for(c=new LN(a.o);c.c<c.e.Hc();){b=kC(JN(c),71);Fm(a,b)}a.q=false;a.o=new EO}\nfunction PI(a,b){var c,d,e;b&=63;if(b<22){c=a.l<<b;d=a.m<<b|a.l>>22-b;e=a.h<<b|a.m>>22-b}else if(b<44){c=0;d=a.l<<b-22;e=a.m<<b-22|a.l>>44-b}else{c=0;d=0;e=a.l<<b-44}return pI(c&4194303,d&4194303,e&1048575)}\nfunction Iy(b){Fy();var c=b.replace(/[\\x00-\\x1f\\xad\\u0600-\\u0603\\u06dd\\u070f\\u17b4\\u17b5\\u200b-\\u200f\\u2028-\\u202e\\u2060-\\u2064\\u206a-\\u206f\\ufeff\\ufff9-\\ufffb\"\\\\]/g,function(a){return Gy(a)});return wT+c+wT}\nfunction hz(a){var b,c,d;d=IS;a=kL(a);b=a.indexOf(uT);c=a.indexOf(vT)==0?8:0;if(b==-1){b=hL(a,String.fromCharCode(64));c=a.indexOf('function ')==0?9:0}b!=-1&&(d=kL(jL(a,c,b)));return d.length>0?d:'anonymous'}\nfunction zc(a,b){var c,d,e;e=new EO;for(d=new LN(a.b);d.c<d.e.Hc();){c=kC(JN(d),18);vO(e,yc(c,b))}return Lc(bC(hI,PR,0,[CS,'object_changed','source',a.i,DS,a.f,wS,a.g,ES,Kc((SJ(),a.e?RJ:QJ)),'events',Jc(e)]))}\nfunction Nf(b,c){var d,e;ww(!!c,'Default value cannot be null.');d=Pf(b,'interactionMode',c.b);if(d==null){return null}try{return Kf(d,(e=CF.c,e==MG?CF:e))}catch(a){a=lI(a);if(mC(a,96)){return c}else throw a}}\nfunction YO(a,b,c,d,e,f){var g,i,j,k;g=d-c;if(g<7){VO(b,c,d,f);return}j=c+e;i=d+e;k=j+(i-j>>1);YO(b,a,j,k,-e,f);YO(b,a,k,i,-e,f);if(f.tc(a[k-1],a[k])<=0){while(c<d){cC(b,c++,a[j++])}return}WO(a,j,k,i,b,c,d,f)}\nfunction Or(){Or=LR;var a,b,c,d,e,f,g;Mr=new _Q;Nr=new EO;for(d=(Jr(),Jr(),ir),e=0,f=d.length;e<f;++e){c=d[e];a=c.d;!a&&(a=c.b);b=a.ad();if(b){g=kC(zM(Mr,b),103);!g&&(g=new EO);g.Jc(c);EM(Mr,b,g)}else{vO(Nr,c)}}}\nfunction Np(a,b){var c,d,e,f;if(!fL(a.f,b.d)){return new vw(a,b)}d=Aw(b.c,a.b,a.c.Hc(),b.b,true);f=new Zn(b.f,b.d,d,b.b,b.e);c=new EO;cC(c.b,c.c++,a);vO(c,new Zn(b.f,b.d,d,b.b,b.e));e=new oo(c);return new vw(e,f)}\nfunction dp(a,b){var c,d,e,f,g;if(!fL(a.f,b.d)){return new vw(a,b)}e=Aw(b.c,a.c,-a.b,b.b,true);d=Aw(b.e,a.c,-a.b,b.b,true);g=new Zn(b.f,b.d,e,b.b,d);c=new EO;cC(c.b,c.c++,a);cC(c.b,c.c++,g);f=new oo(c);return new vw(f,g)}\nfunction eJ(a,b,c){var d=dJ[a];if(d&&!d.cZ){_=d.prototype}else{!d&&(d=dJ[a]=function(){});_=d.prototype=b<0?{}:fJ(b);_.cM=c}for(var e=3;e<arguments.length;++e){arguments[e].prototype=_}if(d.cZ){_.cZ=d.cZ;d.cZ=null}}\nfunction IB(a){if(!a){return LA(),KA}var b=a.valueOf?a.valueOf():a;if(b!==a){var c=EB[typeof b];return c?c(b):OB(typeof b)}else if(a instanceof Array||a instanceof $wnd.Array){return new qA(a)}else{return new gB(a)}}\nfunction og(a,b){var c;if(!a){return null}else if(mC(a,16)){return kC(a,16).b}else if(mC(a,43)){throw new ZL('Encoded values are not currently supported.')}else if(mC(a,13)){return a}else{c=kC(a,15);return Im(b,c.b)}}\nfunction RI(a,b){var c,d,e,f;b&=63;c=a.h&1048575;if(b<22){f=c>>>b;e=a.m>>b|c<<22-b;d=a.l>>b|a.m<<22-b}else if(b<44){f=0;e=c>>>b-22;d=a.m>>b-22|a.h<<44-b}else{f=0;e=0;d=c>>>b-44}return pI(d&4194303,e&4194303,f&1048575)}\nfunction Mk(a,b){var c,d;c=uo(jP(an(a.c.b.b,b,a.g).b),IS,false);d=new EO;wO(d,Xl(a.i,a.g,c));if(d.c!=0){cC(d.b,d.c++,c);vm(a.i,new oo(d),(!bm&&(bm=new dm),bm));return}if(mC(c,72)){return}vm(a.i,c,(!bm&&(bm=new dm),bm))}\nfunction sv(a){var b;b=a.b;if(mC(b,1)){return Iy((new QB(kC(b,1))).b)}else if(mC(b,90)){return kC(b,90).b?nT:oT}else if(mC(b,98)){return (new SA(kC(b,98).ud())).b+IS}throw new wK('unable to encode value '+a+' to JSON')}\nfunction cA(a){var b,c,d,e,f;c=a.Hc();if(c==0){return null}b=new RL(c==1?'Exception caught: ':c+' exceptions caught: ');d=true;for(f=a.Mc();f.Rc();){e=kC(f.Sc(),101);d?(d=false):(rz(b.b,'; '),b);OL(b,e.fd())}return b.b.b}\nfunction gn(a,b){var c,d,e,f;c=0;for(e=new LN(b.b);e.c<e.e.Hc();){d=kC(JN(e),48);if(c<d.Xc()){f=d.Xc()-c;a.d+=f;a.e=2;c+=f}if(mC(d,45)){kn(a,kC(d,45).c);c+=d.Wc()}else mC(d,41)&&fn(a,d.Wc())}if(c<b.d){f=b.d-c;a.d+=f;a.e=2}}\nfunction vj(a,b,c){var d,e,f,g,i,j,k;d=b.b;g=new EO;i=new EO;for(k=b.c.Mc();k.Rc();){j=kC(k.Sc(),17);e=og(j,a.i);f=CO(a.c,d++,e);Ah(a,e,f,c.wc());cC(g.b,g.c++,e);cC(i.b,i.c++,f)}return new jh(a,c.uc(),c.vc(),c.wc(),b.b,g,i)}\nfunction Uo(a,b,c){var d,e,f,g,i,j,k;j=new EO;Wo(j,b);k=new EO;Wo(k,c);for(e=0;e<j.c;++e){d=(yN(e,j.c),kC(j.b[e],71));for(f=0;f<k.c;++f){i=(yN(f,k.c),kC(k.b[f],71));g=To(a,d,i);d=g.b;CO(k,f,g.c)}CO(j,e,d)}return new ny(j,k)}\nfunction jx(a,b){var c,d,e,f;f=-1;c=0;for(e=new LN(b.b);e.c<e.e.Hc();){d=kC(JN(e),73);f=qC(aB(d.b,MS).pd().b);if(aB(d.b,'fromMe').nd().b){++c}else{if(c>0){gx(a,f);c=0}hx(a,Rf(a.i,aB(d.b,NS).md()),f,Iw(d),Jw(d))}}c>0&&gx(a,f)}\nfunction vf(a){var b,c,d,e,f,g;f=kC(a,82);g=kC(yw(Of(f),OS),97).b;Pf(f,vS,null);e=kC(aB(f,'snapshot'),80);c=kC(Nf(f,(ow(),lw)),69);tw(Lf(f),(SJ(),SJ(),QJ));d=new EO;for(b=0;b<e.b.length;++b){vO(d,mA(e,b))}return new nf(d,g,c)}\nfunction Qr(a){var b,c,d;d=cf(kC(a,84));if(d!=null){return d}c=bf(kC(a,84));if(c){return new nK(c.b)}b=af(kC(a,84));if(b){return b}throw new zK('Encoded value is not a primitive but also does not contain required type code.')}\nfunction LK(a){var b,c,d;if(a<0){return 0}else if(a==0){return 32}else{d=-(a>>16);b=d>>16&16;c=16-b;a=a>>b;d=a-256;b=d>>16&8;c+=b;a<<=b;d=a-4096;b=d>>16&4;c+=b;a<<=b;d=a-16384;b=d>>16&2;c+=b;a<<=b;d=a>>14;b=d&~(d>>1);return c+2-b}}\nfunction hi(a,b,c){var d,e,f,g;ww(mC(b,53),SS);d=kC(b,53);g=og(d.c,a.i);g==null?(e=IM(a.c,d.b)):(e=EM(a.c,d.b,g));if(ng(e,g)){return new EO}uh(a,g,c.wc());zh(a,e,c.wc());f=new EO;vO(f,new bh(a,c.uc(),c.vc(),c.wc(),d.b,g,e));return f}\nfunction bl(a,b,c){var d,e,f;if(b==null||c==null){return b==null&&c==null}if(pC(b)===pC(c)){return true}if(mC(b,9)&&mC(c,9)){d=kC(b,9);e=kC(c,9);f=new el(d,e);if(eR(a.b,f)){return true}dR(a.b,f);return d.gc(a,e)}else{return nb(b,c)}}\nfunction ki(a,b){var c,d,e,f;f=new PL;rz(f.b,TS);e=true;for(d=(gP(),qQ(XP(new _P(a.c))));d.b.Rc();){c=new AQ(kC(d.b.Sc(),105));e||(rz(f.b,US),f);e=false;OL(f,kC(c.b.Bd(),1));rz(f.b,VS);OL(f,kC(jl(b,c.b.Cd()),1))}rz(f.b,WS);return f.b.b}\nfunction Gq(a,b,c,d){var e,f;if(b==null){return LA(),LA(),KA}e=new pA;a.e&&kf(e,0,new SA(PK(d.c).b));a.cd(b,e,c);if(!a.e&&(xw(!!e,KS,bC(hI,PR,0,[e])),e.b.length)==1){f=(xw(!!e,JS,bC(hI,PR,0,[e])),mA(e,0));if(!f.md()){return f}}return e}\nfunction Cm(a){var b,c,d,e;e=new _Q;for(d=new LN(a);d.c<d.e.Hc();){c=kC(JN(d),18);c.xc().jc(c);b=kC(zM(e,c.xc().lc()),19);if(!b){b=new Pg(c.xc(),c.f,c.g,c.e);EM(e,c.xc().lc(),b)}vO(b.b,c)}for(d=iO(fM(e));IN(d.b.b);){c=kC(oO(d),19);Bm(c.i,c)}}\nfunction kn(a,b){var c;if(b.Lc()){throw new wK('valuesToInsert must not be empty')}if(a.e==0){c=new FO(b.Hc()+a.g.c.Hc());wO(c,a.g.c);wO(c,b);a.g=new co(a.c,a.g.b,c);CO(a.b,a.b.c-1,a.g)}else{a.g=new co(a.c,a.d,b);vO(a.b,a.g)}a.d+=b.Hc();a.e=0}\nfunction Jp(a,b){var c,d,e,f,g,i;Ew();g=a;e=b.b;if(fL(a.f,b.f)){e=Aw(b.b,a.c,-a.b,true,false);c=a.c+a.b;f=Aw(a.c,b.b,b.c.Hc(),false,true);d=Aw(c,b.b,b.c.Hc(),false,false);g=new Nn(a.f,f,d-f)}e<0?(i=Dw):(i=new co(b.f,e,b.c));return new vw(g,i)}\nfunction TK(a){var b,c,d;b=aC(RH,PR,-1,65,1);c=(_K(),$K);d=64;if(KI(a,dS)){while(KI(a,iS)){b[d--]=c[UI(NI(a,iS))];a=FI(a,iS)}b[d]=c[UI(a)]}else{while(MI(a,jS)){b[d--]=c[UI(OI(NI(a,iS)))];a=FI(a,iS)}b[d--]=c[UI(OI(a))];b[d]=45}return lL(b,d,65)}\nfunction Pr(b,c,d){Or();var e;try{if(kC(b,84).od()){return null}e=Vr(d);return !!e&&!!e.b?Fq(e.b,b,c):kC(b,84).md()?Rr(b,c):Qr(b)}catch(a){a=lI(a);if(mC(a,99)){throw new gr('Unexpected runtime exception while deserializing value: '+b)}else throw a}}\nfunction gc(a,b,c,d){var e,f;xw(!xM(a.b,c),'Name %s is already registered.',bC(hI,PR,0,[c]));EM(a.b,c,b);if(d){for(f=ZN(dM(d.b));IN(f.b.b);){e=kC(dO(f),1);xw(!xM(a.c,e),'Alternate name %s for type %s is already in use',bC(hI,PR,0,[e,c]));EM(a.c,e,c)}}}\nfunction aM(a,b){var c,d,e,f,g;if(b===a){return true}if(!mC(b,104)){return false}f=kC(b,104);if(a.Hc()!=f.Hc()){return false}for(d=f.Cc().Mc();d.Rc();){c=kC(d.Sc(),105);e=c.Bd();g=c.Cd();if(!a.wd(e)){return false}if(!AR(g,a.Dc(e))){return false}}return true}\nfunction pq(a,b,c){var d;if(!c){oq(a);return}if(mC(b,72)){d=(Ew(),Ew(),Dw)}else if(mC(b,40)){d=new Qn(kC(b,40).b)}else if(mC(b,42)){d=kq(a.b,kC(b,42))}else if(mC(b,50)){d=lq(a.b,kC(b,50))}else{throw new wK('Cannot invert mutation with illegal type '+b)}uO(a.c,0,d)}\nfunction Fl(a,b,c){var d;d=new EO;if(mC(b,44)){vO(d,El(a,kC(b,44),c))}else if(mC(b,39)){vO(d,Dl(a,kC(b,39),c))}else if(mC(b,38)){vO(d,Cl(a,kC(b,38),c))}else if(mC(b,52));else{throw new wK('Muations of type '+b.cZ.f+' cannot be applied to IndexReferences.')}return d}\nfunction xI(a){var b,c,d;c=a.l;if((c&c-1)!=0){return -1}d=a.m;if((d&d-1)!=0){return -1}b=a.h;if((b&b-1)!=0){return -1}if(b==0&&d==0&&c==0){return -1}if(b==0&&d==0&&c!=0){return MK(c)}if(b==0&&d!=0&&c==0){return MK(d)+22}if(b!=0&&d==0&&c==0){return MK(b)+44}return -1}\nfunction QI(a,b){var c,d,e,f,g;b&=63;c=a.h;d=(c&524288)!=0;d&&(c|=-1048576);if(b<22){g=c>>b;f=a.m>>b|c<<22-b;e=a.l>>b|a.m<<22-b}else if(b<44){g=d?1048575:0;f=c>>b-22;e=a.m>>b-22|c<<44-b}else{g=d?1048575:0;f=d?4194303:0;e=c>>b-44}return pI(e&4194303,f&4194303,g&1048575)}\nfunction ii(a,b,c){var d,e,f,g;if(!mC(c,33)){return false}g=kC(c,33);if(a.c.e!=g.c.e){return false}for(e=(gP(),qQ(XP(new _P(a.c))));e.b.Rc();){d=new AQ(kC(e.b.Sc(),105));f=kC(d.b.Bd(),1);if(!xM(g.c,f)){return false}if(!bl(b,zM(g.c,f),d.b.Cd())){return false}}return true}\nfunction vm(a,b,c){var d,e,f,g;if(c.wc()){zw(a.b,'Unable to apply local mutation because document is in read-only mode.');vO(a.o,b);f=zm(a,b,c);Cm(f);Lm(a)}else{d=new gR;e=new Tm(a,d);vO(a.g,e);f=zm(a,b,c);Cm(f);BO(a.g,e);for(g=ZN(dM(d.b));IN(g.b.b);){kC(dO(g),9);Gm(a)}}}\nfunction kI(){gJ()&&hJ('com.google.gwt.useragent.client.UserAgentAsserter');gJ()&&hJ('com.google.gwt.user.client.DocumentModeAsserter');iJ();gJ()&&hJ('com.google.apps.brix.api.client.embeddable.EmbeddableApi');new Oc;rc();gJ()&&hJ('com.google.gwt.logging.client.LogConfiguration')}\nfunction Bw(a,b){var c,d,e,f;a=IS+a;c=new QL(a.length+16*b.length);f=0;d=0;while(d<b.length){e=a.indexOf('%s',f);if(e==-1){break}OL(c,jL(a,f,e));NL(c,b[d++]);f=e+2}OL(c,iL(a,f));if(d<b.length){rz(c.b,' [');NL(c,b[d++]);while(d<b.length){rz(c.b,US);NL(c,b[d++])}sz(c.b,RS)}return c.b.b}\nfunction an(a,b,c){var d,e,f,g;if(a==null||b==null){throw new YK}if(fL(a,b)){f=new ln(c);hn(f,a.length);return f}e=cn(a,b);a=iL(a,e);b=iL(b,e);g=dn(a,b);a=jL(a,0,a.length-g);b=jL(b,0,b.length-g);f=bn(a,b,c,EI(HI(VL()),$R));if(e>0){d=new ln(c);d.d+=e;d.e=2;gn(d,f);f=d}g>0&&(f.d+=g,f.e=2);return f}\nfunction _o(a,b){var c,d,e,f,g,i,j,k,n,o;if(!fL(a.f,b.f)){return new vw(a,b)}n=(Ew(),Ew(),Dw);o=Dw;d=a.c;c=d+a.b;k=b.c;j=k+b.b;f=Aw(d,k,-b.b,false,false);e=Aw(c,k,-b.b,false,false);i=Aw(k,d,-a.b,false,false);g=Aw(j,d,-a.b,false,false);f<e&&(n=new Nn(a.f,f,e-f));i<g&&(o=new Nn(b.f,i,g-i));return new vw(n,o)}\nfunction Rr(a,b){var c,d;if(hf(kC(a,84))<1){throw new fr('Serialized object is missing type field.')}d=bf(ef(kC(a,84),0));if(!d){throw new fr('Serialized object type field is not a number.')}c=Wr(qC(d.b)).d;if(!c){throw new fr('No serializer found to deserialize object with type code: '+qC(d.b))}return c.$c(a,b)}\nfunction Vp(a,b){var c,d,e,f,g,i,j,k,n;if(!fL(a.f,b.f)){return new vw(a,b)}j=b.b;i=b.c.Hc();g=j+i-1;c=a.c.Hc();if(a.b<=b.b){n=new wo(b.f,b.b+c,b.c)}else if(a.b>g){n=b}else{k=a.b-j;d=new wo(b.f,b.b,b.c.Pc(0,k));f=new wo(b.f,b.b+k+c,b.c.Pc(k,i));e=new EO;cC(e.b,e.c++,d);cC(e.b,e.c++,f);n=new oo(e)}return new vw(a,n)}\nfunction zm(a,b,c){var d;d=new EO;if(mC(b,72)){return d}if(mC(b,49)){wO(d,tm(a,kC(b,49),c));return d}Hm(a,b,c);if(a.c>0&&!c.wc()){throw new zK('Cannot receive a server mutation in the middle of a compound operation.')}mC(b,40)?rm(a,kC(b,40)):mC(b,42)?sm(a,kC(b,42)):mC(b,50)&&wO(d,um(a,kC(b,50),c));Dm(a,b,c);return d}\nfunction Sz(b,c){var d,e,f,g,i;if(!c){throw new ZK('Cannot fire null event')}try{++b.c;g=Uz(b,c.jd());d=null;i=b.d?g.Oc(g.Hc()):g.Nc();while(b.d?i.Gd():i.Rc()){f=b.d?i.Hd():i.Sc();try{c.id(kC(f,79))}catch(a){a=lI(a);if(mC(a,101)){e=a;!d&&(d=new gR);dR(d,e)}else throw a}}if(d){throw new aA(d)}}finally{--b.c;b.c==0&&Wz(b)}}\nfunction HI(a){var b,c,d,e,f;if(isNaN(a)){return _I(),$I}if(a<-9223372036854775808){return _I(),YI}if(a>=9223372036854775807){return _I(),XI}e=false;if(a<0){e=true;a=-a}d=0;if(a>=17592186044416){d=qC(a/17592186044416);a-=d*17592186044416}c=0;if(a>=4194304){c=qC(a/4194304);a-=c*4194304}b=qC(a);f=pI(b,c,d);e&&vI(f);return f}\nfunction VI(a){var b,c,d,e,f;if(a.l==0&&a.m==0&&a.h==0){return sT}if(a.h==524288&&a.m==0&&a.l==0){return '-9223372036854775808'}if(a.h>>19!=0){return zT+VI(OI(a))}c=a;d=IS;while(!(c.l==0&&c.m==0&&c.h==0)){e=II(1000000000);c=qI(c,e,true);b=IS+UI(mI);if(!(c.l==0&&c.m==0&&c.h==0)){f=9-b.length;for(;f>0;--f){b=sT+b}}d=b+d}return d}\nfunction LB(b,c){var d;if(c&&(Fy(),Ey)){try{d=JSON.parse(b)}catch(a){return NB(yT+a)}}else{if(c){if(!(Fy(),!/[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]/.test(b.replace(/\"(\\\\.|[^\"\\\\])*\"/g,IS)))){return NB('Illegal character in JSON string')}}b=Hy(b);try{d=eval(uT+b+tS)}catch(a){return NB(yT+a)}}var e=EB[typeof d];return e?e(d):OB(typeof d)}\nfunction yc(a,b){if(mC(a,27)){return Dc(kC(a,27),b)}if(mC(a,19)){return zc(kC(a,19),b)}if(mC(a,26)){return Cc(kC(a,26),b)}if(mC(a,25)){return Bc(kC(a,25),b)}if(mC(a,28)){return Ec(kC(a,28),b)}if(mC(a,29)){return Fc(kC(a,29),b)}if(mC(a,30)){return Gc(kC(a,30),b)}if(mC(a,23)){return Ac(kC(a,23),b)}throw new ZL('Unknown event type '+a.cZ.f)}\nfunction IR(a){var b,c;b=new RQ(a);QQ(b,EI(HI(b.b.getTime()),II(60000*b.b.getTimezoneOffset())));c=EI(NI(a,qS),II(LI(a,dS)?1000:0));return py(IS+(b.b.getFullYear()-1900+1900),4)+zT+py(IS+(b.b.getMonth()+1),2)+zT+py(IS+b.b.getDate(),2)+'T'+py(IS+b.b.getHours(),2)+xT+py(IS+b.b.getMinutes(),2)+xT+py(IS+b.b.getSeconds(),2)+BT+py(IS+VI(c),3)+'Z'}\nfunction EJ(f){var d=f.b=$wnd.onbeforeunload;var e=f.c=$wnd.onunload;$wnd.onbeforeunload=function(a){var b,c;try{b=rS(uJ)()}finally{c=d&&d(a)}if(b!=null){return b}if(c!=null){return c}};$wnd.onunload=rS(function(a){try{pJ();mJ&&Az((!nJ&&(nJ=new CJ),nJ))}finally{e&&e(a);$wnd.onresize=null;$wnd.onscroll=null;$wnd.onbeforeunload=null;$wnd.onunload=null}})}\nfunction tI(a,b,c,d,e,f){var g,i,j,k,n,o,p;k=wI(b)-wI(a);g=PI(b,k);j=pI(0,0,0);while(k>=0){i=CI(a,g);if(i){k<22?(j.l|=1<<k,undefined):k<44?(j.m|=1<<k-22,undefined):(j.h|=1<<k-44,undefined);if(a.l==0&&a.m==0&&a.h==0){break}}n=g.m;o=g.h;p=g.l;yI(g,o>>>1);g.m=n>>>1|(o&1)<<21;g.l=p>>>1|(n&1)<<21;--k}c&&vI(j);if(f){if(d){mI=OI(a);e&&(mI=SI(mI,(_I(),ZI)))}else{mI=pI(a.l,a.m,a.h)}}return j}\nfunction Xi(){Xi=LR;Ti=new Yi('COLLABORATIVE_MAP',0,'Map',cD,new _i,0,bC(jI,PR,1,[JD.f]));Si=new Yi('COLLABORATIVE_LIST',1,YS,bD,new cj,1,bC(jI,PR,1,[ID.f]));Vi=new Yi('COLLABORATIVE_STRING',2,'EditableString',eD,new fj,2,bC(jI,PR,1,[LD.f]));Ui=new Yi('COLLABORATIVE_RANGE',3,'Range',dD,new ij,3,bC(jI,PR,1,[]));Wi=new Yi('INDEX_REFERENCE',4,ZS,hD,new lj,4,bC(jI,PR,1,[]));Ri=bC(TH,ZR,31,[Ti,Si,Vi,Ui,Wi])}\nfunction Rf(a,b){var c,d,e,f,g,i;if(kC(b,84).md()){c=(Or(),kC(Pr(b,a.c,UG),71));return c}else{e=gf(kC(b,84));for(g=new GP(a.d.c.Mc());g.c.Rc();){f=kC(g.c.Sc(),97);i=IS+f.b;if(i!=null&&_A(e.b,i)){d=ff(kC(b,84),i);return Wf(kC(YP(a.b,f),5),d)}}throw new zK('Encoded payload does not contain any encoding version that is compatible with this decoder. Supported versions: '+ZP(a.b)+' Payload version(s): '+a.d)}}\nfunction bn(a,b,c,d){var e,f,g,i;if(!a.length){g=new ln(c);jn(g,b);return g}if(!b.length){g=new ln(c);fn(g,a.length);return g}f=a.length>b.length?a:b;i=a.length>b.length?b:a;e=f.indexOf(i);if(e!=-1){g=new ln(c);if(a.length>b.length){fn(g,e);hn(g,i.length);fn(g,f.length-(e+i.length))}else{jn(g,jL(f,0,e));hn(g,i.length);jn(g,iL(f,e+i.length))}return g}if(i.length==1){g=new ln(c);fn(g,a.length);jn(g,b);return g}return $m(a,b,c,d)}\nfunction hp(a,b){var c,d,e,f,g,i,j,k,n,o,p,q,r;if(!fL(a.f,b.f)){return new vw(a,b)}p=null;r=null;n=b.b;k=b.c.Hc();j=n+k-1;e=a.c;d=a.b;c=e+d-1;g=b.c;if(e>n){i=0>j-e+1?0:j-e+1;p=new wo(b.f,n,g.Pc(0,k-i))}if(c<j){i=0>c-n+1?0:c-n+1;o=d-i;r=new wo(b.f,n-o,g.Pc(i,k))}if(!!p&&!!r){f=new EO;cC(f.b,f.c++,p);cC(f.b,f.c++,r);q=new oo(f)}else p?(q=p):r?(q=r):(q=(Ew(),Ew(),Dw));ww(!!q,'Transformed set mutation cannot be null');return new vw(a,q)}\nfunction aq(a,b){var c,d,e,f,g,i,j,k,n,o,p,q;if(!fL(a.f,b.f)){return new vw(a,b)}o=null;q=null;d=a.c.Hc();e=a.b;c=e+d-1;k=b.c.Hc();n=b.b;j=n+k-1;g=b.c;if(n<e){i=0>j-e+1?0:j-e+1;o=new wo(b.f,n,g.Pc(0,k-i))}if(j>c){i=0>c-n+1?0:c-n+1;q=new wo(b.f,n+i,g.Pc(i,k))}if(!!o&&!!q){f=new EO;cC(f.b,f.c++,o);cC(f.b,f.c++,q);p=new oo(f)}else o?(p=o):q?(p=q):(p=(Ew(),Ew(),Dw));ww(!!p,'Transformed server mutation cannot be null');return new vw(a,p)}\nfunction Po(a){Qo(a,nE,new Sp);Qo(a,jE,new ap);Qo(a,sE,new fq);Qo(a,rE,new bq);Qo(a,mE,new Gp);Qo(a,pE,new ap);Ro(a,jE,rE,new ip);Ro(a,pE,rE,new ip);Ro(a,nE,rE,new Wp);Ro(a,oE,rE,new Wp);Ro(a,jE,nE,new Kp);Ro(a,pE,nE,new Kp);Ro(a,jE,oE,new Kp);Ro(a,pE,oE,new Kp);Ro(a,kE,sE,new Cp);Ro(a,kE,nE,new up);Ro(a,kE,oE,new up);Ro(a,kE,jE,new qp);Ro(a,kE,pE,new qp);Ro(a,kE,rE,new yp);Ro(a,nE,mE,new Op);Ro(a,jE,mE,new ep);So(a,kE,iE,new mp);So(a,iE,kE,new Jo)}\nfunction qI(a,b,c){var d,e,f,g,i,j;if(b.l==0&&b.m==0&&b.h==0){throw new MJ}if(a.l==0&&a.m==0&&a.h==0){c&&(mI=pI(0,0,0));return pI(0,0,0)}if(b.h==524288&&b.m==0&&b.l==0){return rI(a,c)}j=false;if(b.h>>19!=0){b=OI(b);j=true}g=xI(b);f=false;e=false;d=false;if(a.h==524288&&a.m==0&&a.l==0){e=true;f=true;if(g==-1){a=oI((_I(),XI));d=true;j=!j}else{i=QI(a,g);j&&vI(i);c&&(mI=pI(0,0,0));return i}}else if(a.h>>19!=0){f=true;a=OI(a);d=true;j=!j}if(g!=-1){return sI(a,g,j,f,c)}if(!KI(a,b)){c&&(f?(mI=OI(a)):(mI=pI(a.l,a.m,a.h)));return pI(0,0,0)}return tI(d?a:pI(a.l,a.m,a.h),b,j,f,e,c)}\nfunction $m(a,b,c,d){var e,f,g,i,j,k,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D;u=a.length;v=b.length;s=~~((u+v+1)/2);y=2*s;w=aC(SH,PR,-1,y,1);x=aC(SH,PR,-1,y,1);for(z=0;z<y;++z){w[z]=-1;x[z]=-1}w[s+1]=0;x[s+1]=0;f=u-v;g=f%2!=0;n=0;j=0;r=0;p=0;for(e=0;e<s;++e){if(e%100==0&&JI(HI(VL()),d)){break}for(i=-e+n;i<=e-j;i+=2){k=s+i;i==-e||i!=e&&w[k-1]<w[k+1]?(A=w[k+1]):(A=w[k-1]+1);C=A-i;while(A<u&&C<v&&a.charCodeAt(A)==b.charCodeAt(C)){++A;++C}w[k]=A;if(A>u){j+=2}else if(C>v){n+=2}else if(g){q=s+f-i;if(q>=0&&q<y&&x[q]!=-1){B=u-x[q];if(A>=B){return _m(a,b,A,C,c)}}}}for(o=-e+r;o<=e-p;o+=2){q=s+o;o==-e||o!=e&&x[q-1]<x[q+1]?(B=x[q+1]):(B=x[q-1]+1);D=B-o;while(B<u&&D<v&&a.charCodeAt(u-B-1)==b.charCodeAt(v-D-1)){++B;++D}x[q]=B;if(B>u){p+=2}else if(D>v){r+=2}else if(!g){k=s+f-o;if(k>=0&&k<y&&w[k]!=-1){A=w[k];C=s+A-k;B=u-B;if(A>=B){return _m(a,b,A,C,c)}}}}}t=new ln(c);fn(t,u);jn(t,b);return t}\nfunction iJ(){var a,b,c;b=$doc.compatMode;a=bC(jI,PR,1,[AT]);for(c=0;c<a.length;++c){if(fL(a[c],b)){return}}a.length==1&&fL(AT,a[0])&&fL('BackCompat',b)?\"GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\\\"document.compatMode\\\" value=\\\"\"+b+'\"/&gt;':\"Your *.gwt.xml module configuration prohibits the use of the current doucment rendering mode (document.compatMode=' \"+b+\"').<br>Modify your application's host HTML page doctype, or update your custom 'document.compatMode' configuration property settings.\"}\nfunction Jy(){var a=['\\\\u0000','\\\\u0001','\\\\u0002','\\\\u0003','\\\\u0004','\\\\u0005','\\\\u0006','\\\\u0007','\\\\b','\\\\t','\\\\n','\\\\u000B','\\\\f','\\\\r','\\\\u000E','\\\\u000F','\\\\u0010','\\\\u0011','\\\\u0012','\\\\u0013','\\\\u0014','\\\\u0015','\\\\u0016','\\\\u0017','\\\\u0018','\\\\u0019','\\\\u001A','\\\\u001B','\\\\u001C','\\\\u001D','\\\\u001E','\\\\u001F'];a[34]='\\\\\"';a[92]='\\\\\\\\';a[173]='\\\\u00ad';a[1536]='\\\\u0600';a[1537]='\\\\u0601';a[1538]='\\\\u0602';a[1539]='\\\\u0603';a[1757]='\\\\u06dd';a[1807]='\\\\u070f';a[6068]='\\\\u17b4';a[6069]='\\\\u17b5';a[8203]='\\\\u200b';a[8204]='\\\\u200c';a[8205]='\\\\u200d';a[8206]='\\\\u200e';a[8207]='\\\\u200f';a[8232]='\\\\u2028';a[8233]='\\\\u2029';a[8234]='\\\\u202a';a[8235]='\\\\u202b';a[8236]='\\\\u202c';a[8237]='\\\\u202d';a[8238]='\\\\u202e';a[8288]='\\\\u2060';a[8289]='\\\\u2061';a[8290]='\\\\u2062';a[8291]='\\\\u2063';a[8292]='\\\\u2064';a[8298]='\\\\u206a';a[8299]='\\\\u206b';a[8300]='\\\\u206c';a[8301]='\\\\u206d';a[8302]='\\\\u206e';a[8303]='\\\\u206f';a[65279]='\\\\ufeff';a[65529]='\\\\ufff9';a[65530]='\\\\ufffa';a[65531]='\\\\ufffb';return a}\nfunction Jr(){Jr=LR;Hr=new Kr('UNPACKED_LIST',0,new Sv,null,0);yr=new Kr('PACKED_PRIMITIVE_STRING_LIST',1,new fv,null,1);lr=new Kr('DEFAULT_OBJECT_REFERENCE',2,new ys(true),new ys(false),2);Ar=new Kr('PRIMITIVE_VALUE_DOUBLE',3,new lv(LG),null,3);wr=new Kr('MULTI_MUTATION',4,new Mu(true),new Mu(false),4);rr=new Kr('INSERT_MUTATION',5,new Mt(true),new Mt(false),5);mr=new Kr('DELETE_MUTATION',6,new Ds(true),new Ds(false),6);kr=new Kr('CREATE_MUTATION',7,new ls(true),new ls(false),7);Ir=new Kr('UPDATE_MUTATION',8,new Yv(true),new Yv(false),8);xr=new Kr('NULL_MUTATION',9,new $u(true),new $u(false),9);nr=new Kr('DESTROY_MUTATION',10,new Ss(true),new Ss(false),10);Fr=new Kr('SET_MUTATION',11,new xv(true),new xv(false),11);Er=new Kr('PRIMITIVE_VALUE_STRING',12,new lv(ZG),null,12);zr=new Kr('PRIMITIVE_VALUE_BOOLEAN',13,new lv(IG),null,13);pr=new Kr('ENCODED_VALUE',14,new ht(true),new ht(false),14);sr=new Kr('INTEGER',15,new $t(true),new $t(false),15);or=new Kr('DOUBLE',16,null,new ct,16);Gr=new Kr('STRING',17,null,new Lv,17);jr=new Kr('BOOLEAN',18,null,new cs,18);ur=new Kr('INVSERSE_INSERT_MUTATION',19,new tu(true),new tu(false),19);tr=new Kr('INVSERSE_DELETE_MUTATION',20,new du(true),new du(false),20);vr=new Kr('JSON_VALUE_CODEC',21,new Hu,null,21);Cr=new Kr('PRIMITIVE_VALUE_JSON_DOUBLE',22,(rv(),new tv(LG)),null,22);Br=new Kr('PRIMITIVE_VALUE_JSON_BOOLEAN',23,new tv(IG),null,23);Dr=new Kr('PRIMITIVE_VALUE_JSON_STRING',24,new tv(ZG),null,24);qr=new Kr('INDEX_MUTATION',25,new vt(true),new vt(false),25);ir=bC(UH,ZR,55,[Hr,yr,lr,Ar,wr,rr,mr,kr,Ir,xr,nr,Fr,Er,zr,pr,sr,or,Gr,jr,ur,tr,vr,Cr,Br,Dr,qr])}\nfunction Nc(a){a['bind']=a.Y;a['unbind']=a.Vb;a['asJsObject']=a.T;a['asGwtObject']=a.Q;a['asJsPrimitive']=a.U;a['asGwtJsonValue']=a.O;a['asJsJsonValue']=a.S;a['asGwtList']=a.P;a['asJsArray']=a.R;a['getModel']=a.pb;a['getRoot']=a.sb;a['getDocument']=a.fb;a['create']=a._;a['getType']=a.vb;a['getId']=a.gb;a['addObjectChangedListener']=a.F;a['removeObjectChangedListener']=a.Kb;a['addRemoteChangeListener']=a.H;a['removeRemoteChangeListener']=a.Nb;a['asMap']=a.V;a['getMapSize']=a.ob;a['put']=a.Eb;a['get']=a.cb;a['clearMap']=a.$;a['removeFromMap']=a.Ib;a['getKeys']=a.lb;a['getValues']=a.wb;a['getItems']=a.kb;a['addValueChangedListener']=a.K;a['removeValueChangedListener']=a.Qb;a['isInitialized']=a.Bb;a['createRoot']=a.ab;a['getObject']=a.qb;a['getAllObjects']=a.db;a['beginCompoundOperation']=a.W;a['beginCreationCompoundOperation']=a.X;a['endCompoundOperation']=a.bb;a['getStringLength']=a.tb;a['getText']=a.ub;a['setText']=a.Ub;a['insertString']=a.Ab;a['removeStringRange']=a.Pb;a['addTextInsertedListener']=a.J;a['addTextDeletedListener']=a.I;a['removeStringListener']=a.Ob;a['getListSize']=a.nb;a['getListItem']=a.mb;a['insertIntoList']=a.zb;a['insertAllIntoList']=a.yb;a['setListItem']=a.Tb;a['replaceListItems']=a.Rb;a['clearList']=a.Z;a['removeFromList']=a.Hb;a['removeRange']=a.Lb;a['initIndexReference']=a.xb;a['setIndexReferenceIndex']=a.Sb;a['addValuesAddedListener']=a.L;a['addValuesRemovedListener']=a.M;a['addValuesSetListener']=a.N;a['removeListListener']=a.Jb;a['getIndexReferenceIndex']=a.ib;a['getIndexReferenceCanBeDeleted']=a.hb;a['getIndexReferenceObjectId']=a.jb;a['addReferenceShiftedListener']=a.G;a['removeReferenceShiftedListener']=a.Mb;a[uS]=a.eb;a['addCollaboratorJoinedListener']=a.C;a['addCollaboratorLeftListener']=a.D;a['removeCollaboratorJoinedListener']=a.Fb;a['removeCollaboratorLeftListener']=a.Gb;a['getParents']=a.rb;a['isReadOnly']=a.Cb;a['addDocumentSaveStateListener']=a.E;a['objToString']=a.Db}\nvar IS='',CT=' ',hT=' : ',wT='\"',uT='(',tS=')',gT=',',US=', ',dT=', canBeDeleted=',fT=', id=',cT=', index=',zT='-',BT='.',sT='0',xT=':',VS=': ',DT='=',LS='Attempted to call set on %s',KS='Attempted to check length of %s',JS='Attempted to dereference %s as an array',lT='COUNT',AT='CSS1Compat',pT='EDIT',yT='Error parsing JSON: ',QS='Expected %s value (or null) for key \"%s\" but got %s (value is \"%s\").',iT='Field cannot be null.',jT='ID',kT='INDEX',ZS='IndexReference',YS='List',sS='Load of initial data failed.',$S='Only insert and delete mutations can be applied to arrays.',aT='Only insert and delete mutations can be applied to strings.',SS='Only update mutations can be applied to maps.',rT='REVISION_VIEW_ONLY',OS='Revision number is null or not set.',tT='String',XS='Told to fire event of unknown type ',cU='UmbrellaException',mT='VALUES',qT='VIEW_ONLY',_S='[',hU='[Lcom.google.apps.brix.api.shared.serialization.codec.',IT='[Ljava.lang.',RS=']',yS='color',NT='com.google.apps.brix.api.client.cds.',VT='com.google.apps.brix.api.client.collaborators.',HT='com.google.apps.brix.api.client.embeddable.',WT='com.google.apps.brix.api.client.net.',PT='com.google.apps.brix.api.shared.cds.json.',LT='com.google.apps.brix.api.shared.cds.model.',bU='com.google.apps.brix.api.shared.cds.model.event.',OT='com.google.apps.brix.api.shared.cds.model.impl.',ST='com.google.apps.brix.api.shared.cds.model.mutation.',QT='com.google.apps.brix.api.shared.cds.transform.',eU='com.google.apps.brix.api.shared.cds.undo.',fU='com.google.apps.brix.api.shared.serialization.',gU='com.google.apps.brix.api.shared.serialization.codec.',ZT='com.google.apps.brix.api.shared.util.',RT='com.google.apps.docs.commands.',TT='com.google.apps.docs.otprotocol.',dU='com.google.apps.docs.otprotocol.serialization.',XT='com.google.apps.docs.otprotocol.transformation.',GT='com.google.gwt.core.client.',KT='com.google.gwt.core.client.impl.',$T='com.google.gwt.event.shared.',YT='com.google.gwt.json.client.',JT='com.google.gwt.lang.',UT='com.google.gwt.user.client.',aU='com.google.gwt.user.client.impl.',_T='com.google.web.bindery.event.shared.',PS='debugMode',xS='displayName',oT='false',ET='fromIndex: ',vT='function',uS='getCollaborators',FS='index',AS='isAnonymous',zS='isMe',FT='java.lang.',MT='java.util.',ES='local',bT='null',NS='payload',BS='photoUrl',MS='revision',eT='root',DS='sessionId',vS='sid',GS='text',nT='true',CS='type',wS='userId',HS='values',TS='{',WS='}';var _,jS={l:4194268,m:4194303,h:1048575},dS={l:0,m:0,h:0},iS={l:36,m:0,h:0},$R={l:200,m:0,h:0},qS={l:1000,m:0,h:0},dJ={},WR={18:1},UR={24:1},bS={89:1,101:1},nS={103:1},OR={},pS={89:1,104:1},QR={22:1},mS={105:1},YR={8:1,9:1,104:1},cS={89:1,99:1,101:1},RR={3:1},XR={9:1},gS={84:1},hS={107:1},aS={54:1},TR={14:1},_R={71:1},eS={86:1},lS={104:1},ZR={89:1,95:1},oS={89:1,103:1,106:1},SR={68:1},fS={88:1,89:1,99:1,101:1},VR={21:1},PR={89:1},kS={91:1};eJ(1,-1,OR);_.eQ=function G(a){return this===a};_.gC=function H(){return this.cZ};_.hC=function I(){return Wy(this)};_.tS=function J(){return this.cZ.f+'@'+NK(this.hC())};_.toString=function(){return this.tS()};_.tM=LR;eJ(3,1,{},L);_.b=null;_.c=null;_.d=null;eJ(4,1,{},N);_.b=null;_.c=null;_.d=null;eJ(5,1,{},T);_.b=null;_.c=null;_.d=null;_.e=null;_.f=null;_.g=null;_.i=null;_.j=null;_.k=null;eJ(6,1,{},W);_.r=function X(a){sJ(sS)};_.s=function Y(a){V(this,rC(a))};_.b=null;_.c=null;eJ(7,1,{},ab);_.r=function bb(a){sJ(sS)};_.s=function cb(a){$(this,kC(a,4))};_.b=null;_.c=null;eJ(8,1,{75:1,79:1},eb);_.b=null;eJ(10,1,QR);_.t=function hb(a,b){};_.u=function ib(a,b){};_.v=function jb(a){};eJ(9,10,QR,kb);_.v=function lb(a){kx(this.b.i,(gP(),new uP(a)))};_.b=null;eJ(14,1,{2:1},Ab);_.eQ=function Bb(a){return zb(this,a)};_.hC=function Cb(){return UO(bC(hI,PR,0,[this.g,this.i,this.c,this.b,(SJ(),this.e?RJ:QJ),this.d?RJ:QJ,this.f]))};_.tS=function Db(){return 'Collaborator '+this.c+' (session = '+this.g+tS};_.b=null;_.c=null;_.d=false;_.e=false;_.f=null;_.g=null;_.i=null;eJ(15,1,{},Nb);_.b=null;_.c=null;_.d=null;_.e=null;_.f=false;eJ(16,1,{},Pb);_.y=function Qb(a,b){Fb(this.b,Mb(b))};_.b=null;eJ(17,1,{},Sb);_.y=function Tb(a,b){Ib(this.b,Mb(b))};_.b=null;eJ(18,1,{},Wb);_.r=function Xb(a){sJ(sS)};_.s=function Yb(a){Vb(this,kC(a,84))};_.b=null;_.c=null;eJ(19,1,RR,$b);_.w=function _b(a){if(this.b.d){V(this.c);Jb(this.b,this)}};_.x=function ac(a){};_.b=null;_.c=null;eJ(21,1,{},jc);_.z=function kc(a){throw new wK('Unknown type name '+a)};_.A=function lc(a){throw new wK('Unknown type '+a)};eJ(20,21,{},mc);eJ(22,1,SR,oc);_.B=function pc(){return new nn(this.b)};_.b=null;eJ(24,1,{},vc);_.r=function wc(a){sJ(sS)};_.s=function xc(a){uc(this,kC(a,6))};_.b=null;_.c=null;eJ(26,1,{},Oc,Pc);_.C=function Qc(a){var b;b=new me(a);Gb(this.b.b,b);return b};_.D=function Rc(a){var b;b=new qe(a);Gb(this.b.b,b);return b};_.E=function Sc(a){cx(this.b.i,new ue(a))};_.F=function Tc(a,b){var c;c=new ke(this,b);kC(a,9).cc(c);return c};_.G=function Uc(a,b){var c;c=new $e(this,b);Bl(kC(a,12),c);return c};_.H=function Vc(a){var b;b=new we(a);qm(this.b.e,b);return b};_.I=function Wc(a,b){var c;c=new Ge(this,b);sk(kC(a,10),c);return c};_.J=function Xc(a,b){var c;c=new Ce(this,b);sk(kC(a,10),c);return c};_.K=function Yc(a,b){var c;c=new ze(this,b);kC(a,8).ac(c);return c};_.L=function Zc(a,b){var c;c=new Ke(this,b);qj(kC(a,7),c);return c};_.M=function $c(a,b){var c;c=new Pe(this,b);qj(kC(a,7),c);return c};_.N=function _c(a,b){var c;c=new Ue(this,b);qj(kC(a,7),c);return c};_.O=function ad(a){return new jg(a)};_.P=function bd(a){var b,c;c=new EO;for(b=0;b<a.length;++b){vO(c,a[b])}return c};_.Q=function cd(a){return zM(this.d,a)};_.R=function dd(a){return Jc(a)};_.S=function ed(a){return mC(a,13)?kC(a,13).b:null};_.T=function fd(a){return lC(zM(this.c,a))};_.U=function gd(a){return Kc(a)};_.V=function hd(a){return kC(a,8)};_.W=function id(a){xm(this.b.e,a,false)};_.X=function jd(){xm(this.b.e,IS,true)};_.Y=function kd(a,b){EM(this.d,a,b);EM(this.c,b,a)};_.Z=function ld(a){yj(kC(a,7))};_.$=function md(a){kC(a,8).Bc()};_._=function nd(a){var b,c;return ym(this.b.e,a,(b=HI(UK(WK()*2147483648)),c=WI(HI(UK(WK()*2147483648)),HI(VL())),'gde'+TK(b)+TK(c)))};_.ab=function od(){Km(this.b.e)};_.bb=function pd(){Am(this.b.e)};_.cb=function rd(a,b){return kC(a,8).Dc(b)};_.db=function sd(){var a,b,c;c=new gR;for(b=ZN(dM(this.b.e.f));IN(b.b.b);){a=kC(dO(b),1);dR(c,Im(this.b.e,a))}return c};_.eb=function td(){var a,b,c,d;d=[];for(b=iO(fM(this.b.b.b));IN(b.b.b);){a=kC(oO(b),2);c=Lc(bC(hI,PR,0,[DS,a.g,wS,a.i,xS,a.c,yS,a.b,zS,a.e,AS,a.d,BS,a.f]));Ay(d,c)}return d};_.fb=function ud(){return this.b};_.gb=function vd(a){return kC(a,9).lc()};_.hb=function wd(a){return kC(kC(a,12),36).b};_.ib=function xd(a){return kC(kC(a,12),36).c};_.jb=function yd(a){return kC(kC(a,12),36).e};_.kb=function zd(a){var b,c,d,e,f;b=kC(a,8).Cc();f=[];for(d=b.Mc();d.Rc();){c=kC(d.Sc(),105);e=[];Ay(e,c.Bd());Ay(e,c.Cd());Ay(f,e)}return f};_.lb=function Ad(a){return kC(a,8).Ec()};_.mb=function Bd(a,b){return Ej(kC(a,7),b)};_.nb=function Cd(a){return kC(kC(a,7),32).c.c};_.ob=function Dd(a){return kC(a,8).Hc()};_.pb=function Ed(){return this.b.e};_.qb=function Fd(a){return Im(this.b.e,a)};_.rb=function Gd(a){var b,c,d,e;b=kC(a,9).nc();c=[];for(e=new LN(b);e.c<e.e.Hc();){d=kC(JN(e),9);Ay(c,lC(zM(this.c,d)))}return c};_.sb=function Hd(){return Jm(this.b.e)};_.tb=function Id(a){return kC(a,10).lN()};_.ub=function Jd(a){return kC(a,10).tS()};_.vb=function Kd(a){if(mC(a,9)){return kC(a,9).pc()}return ob(a).f};_.wb=function Ld(a){return kC(a,8).Ic()};_.xb=function Md(a,b,c,d){Hl(kC(a,12),kC(b,9),c,d)};_.yb=function Nd(a,b,c){pj(kC(a,7),b,c)};_.zb=function Od(a,b,c){oj(kC(a,7),b,c)};_.Ab=function Pd(a,b,c){Ik(kC(a,10),b,c)};_.Bb=function Qd(){return !this.b.e.e};_.Cb=function Rd(){return this.b.c!=(ow(),lw)};_.Db=function Sd(a){return qb(a)};_.Eb=function Td(a,b,c){return kC(a,8).Fc(b,c)};_.Fb=function Ud(a){Jb(this.b.b,kC(a,3))};_.Gb=function Vd(a){Jb(this.b.b,kC(a,3))};_.Hb=function Wd(a,b){Nj(kC(a,7),b)};_.Ib=function Xd(a,b){return kC(a,8).Gc(b)};_.Jb=function Yd(a,b){mC(b,21)&&Oj(kC(a,7),kC(b,21))};_.Kb=function Zd(a,b){kC(a,9).rc(kC(b,20))};_.Lb=function $d(a,b,c){Pj(kC(a,7),b,c)};_.Mb=function _d(a,b){Jl(kC(a,12),kC(b,51))};_.Nb=function ae(a){Nm(this.b.e,kC(a,22))};_.Ob=function be(a,b){mC(b,24)&&Kk(kC(a,10),kC(b,24))};_.Pb=function ce(a,b,c){Lk(kC(a,10),b,c)};_.Qb=function de(a,b){kC(a,8).bc(kC(b,14))};_.Rb=function ee(a,b,c){Qj(kC(a,7),b,(b+c.Hc(),c))};_.Sb=function fe(a,b){Kl(kC(a,12),b)};_.Tb=function ge(a,b,c){Rj(kC(a,7),b,c)};_.Ub=function he(a,b){Mk(kC(a,10),b)};_.Vb=function ie(a){var b,c,d;if(xM(this.d,a)){b=this.d;d=this.c}else if(xM(this.c,a)){b=this.c;d=this.d}else{return false}c=a==null?b.c:mC(a,1)?BM(b,kC(a,1)):AM(b,a,Wy(a));a==null?KM(b):mC(a,1)?LM(b,kC(a,1)):JM(b,a,Wy(a));c==null?KM(d):mC(c,1)?LM(d,kC(c,1)):JM(d,c,Wy(c));return true};_.b=null;eJ(27,1,{20:1},ke);_.b=null;_.c=null;eJ(28,1,RR,me);_.w=function ne(a){var b;b=Lc(bC(hI,PR,0,[DS,a.g,wS,a.i,xS,a.c,yS,a.b,zS,a.e,AS,a.d,BS,a.f]));qd(b,this.b)};_.x=function oe(a){};_.b=null;eJ(29,1,RR,qe);_.w=function re(a){};_.x=function se(a){var b;b=Lc(bC(hI,PR,0,[DS,a.g,wS,a.i,xS,a.c,yS,a.b,zS,a.e,AS,a.d,BS,a.f]));qd(b,this.b)};_.b=null;eJ(30,1,{74:1,79:1},ue);_.b=null;eJ(31,10,QR,we);_.u=function xe(a,b){b.wc()||(this.b(null),undefined)};_.b=null;eJ(32,1,TR,ze);_.Wb=function Ae(a){var b;b=Dc(a,this.b);qd(b,this.c)};_.b=null;_.c=null;eJ(33,1,UR,Ce);_.Xb=function De(a){};_.Yb=function Ee(a){var b;b=Cc(a,this.b);qd(b,this.c)};_.b=null;_.c=null;eJ(34,1,UR,Ge);_.Xb=function He(a){var b;b=Bc(a,this.b);qd(b,this.c)};_.Yb=function Ie(a){};_.b=null;_.c=null;eJ(35,1,VR,Ke);_.Zb=function Le(a){var b;b=Ec(a,this.b);qd(b,this.c)};_.$b=function Me(a){};_._b=function Ne(a){};_.b=null;_.c=null;eJ(36,1,VR,Pe);_.Zb=function Qe(a){};_.$b=function Re(a){var b;b=Fc(a,this.b);qd(b,this.c)};_._b=function Se(a){};_.b=null;_.c=null;eJ(37,1,VR,Ue);_.Zb=function Ve(a){};_.$b=function We(a){};_._b=function Xe(a){var b;b=Gc(a,this.b);qd(b,this.c)};_.b=null;_.c=null;eJ(38,1,{51:1},$e);_.b=null;_.c=null;eJ(39,1,{},lf);eJ(40,1,{4:1},nf);_.b=null;_.c=0;_.d=null;eJ(42,1,{});eJ(41,42,{},wf);_.b=null;_.c=-1;eJ(43,1,{},yf);_.y=function zf(a,b){tf(this.b,b)};_.b=null;eJ(44,1,{},Cf);_.r=function Df(a){Ex(a)};_.s=function Ef(a){Bf(this,kC(a,84))};_.b=null;eJ(45,1,{},Hf);_.r=function If(a){sJ(sS)};_.s=function Jf(a){Gf(this,kC(a,84))};_.b=null;_.c=null;eJ(47,1,{},Tf);_.b=null;_.c=null;_.d=null;eJ(48,1,{5:1},Xf);_.b=null;eJ(49,1,{11:1,15:1,17:1},Zf);_.eQ=function $f(a){var b;if(!mC(a,15)){return false}b=kC(a,15);return sw(bC(hI,PR,0,[this.b,b.b]))};_.hC=function _f(){return UO(bC(hI,PR,0,[this.b]))};_.tS=function ag(){return 'DefaultObjectReference [id='+this.b+RS};_.b=null;var bg;eJ(50,1,{},gg);_.tc=function hg(a,b){return fg(a,b)};eJ(51,1,{13:1,17:1},jg);_.eQ=function kg(a){var b;if(this===a){return true}if(a==null){return false}if(!mC(a,13)){return false}b=kC(a,13);return fL(this.b,b.b)};_.hC=function lg(){return yL(this.b)};_.tS=function mg(){return '[JsonValue '+this.b+RS};_.b=null;var rg;eJ(53,1,{},ug);_.uc=function vg(){return null};_.vc=function wg(){return null};_.wc=function xg(){return false};eJ(54,1,{16:1,17:1},Bg);_.eQ=function Cg(a){var b;if(!mC(a,16)){return false}b=kC(a,16);return sw(bC(hI,PR,0,[this.b,b.b]))};_.hC=function Dg(){return UO(bC(hI,PR,0,[this.b]))};_.tS=function Gg(){return IS+this.b};_.b=null;var zg=null;eJ(56,1,{});_.i=null;eJ(55,56,WR);_.eQ=function Lg(a){return Jg(this,a)};_.xc=function Mg(){return this.i};_.hC=function Ng(){return UO(bC(hI,PR,0,[(SJ(),this.e?RJ:QJ),this.f,this.g]))};_.e=false;_.f=null;_.g=null;eJ(57,55,{18:1,19:1},Pg);_.eQ=function Qg(a){var b;if(!mC(a,19)){return false}b=kC(a,19);return sw(bC(hI,PR,0,[this.i.lc(),b.i.lc(),this.b,b.b,this.f,b.f,this.g,b.g,(SJ(),this.e?RJ:QJ),b.e?RJ:QJ]))};_.hC=function Rg(){return UO(bC(hI,PR,0,[this.i.lc(),this.b,this.f,this.g,(SJ(),this.e?RJ:QJ)]))};_.b=null;eJ(58,55,WR,Tg);_.xc=function Ug(){return this.i};_.b=null;eJ(59,55,{18:1,23:1},Xg);_.b=0;_.c=null;_.d=0;eJ(60,55,{18:1,25:1},Zg);_.b=0;_.c=null;eJ(61,55,{18:1,26:1},_g);_.b=0;_.c=null;eJ(62,55,{18:1,27:1},bh);_.eQ=function ch(a){var b;if(this===a){return true}if(!Jg(this,a)){return false}if(sD!=ob(a)){return false}b=kC(a,27);return sw(bC(hI,PR,0,[this.d,b.d,this.b,b.b,this.c,b.c]))};_.hC=function dh(){return UO(bC(hI,PR,0,[PK(UO(bC(hI,PR,0,[(SJ(),this.e?RJ:QJ),this.f,this.g]))),this.d,this.c,this.b]))};_.b=null;_.c=null;_.d=null;eJ(63,55,{18:1,28:1},fh);_.b=0;_.c=null;eJ(64,55,{18:1,29:1},hh);_.b=0;_.c=null;eJ(65,55,{18:1,30:1},jh);_.b=0;_.c=null;_.d=null;eJ(67,1,XR);_.eQ=function mh(a){var b;if(a==null){return false}if(a===this){return true}if(!mC(a,9)){return false}b=kC(a,9);return this.yc(b)};_.hC=function nh(){return this.zc()};_.yc=function oh(a){return bl(new cl,this,a)};_.zc=function ph(){return kC(jl(new ll,this),97).b};_.Ac=function qh(){return kC(jl(new ql,this),1)};_.tS=function rh(){return this.Ac()};eJ(66,67,XR);_.cc=function Ch(a){sh(this,a)};_.dc=function Dh(a,b){th(this,a)};_.fc=function Eh(a,b,c){vh(this,a,b)};_.kc=function Fh(){return this.f};_.lc=function Gh(){return this.g};_.nc=function Hh(){return wh(this)};_.pc=function Ih(){return this.k};_.qc=function Jh(){};_.rc=function Kh(a){xh(this,a)};_.sc=function Lh(a,b){yh(this,a)};_.f=null;_.g=null;_.i=null;_.j=null;_.k=null;eJ(69,67,XR);_.cc=function Oh(a){sh(this.c,a)};_.dc=function Ph(a,b){th(this.c,a)};_.ec=function Qh(a,b){return hi(this.c,a,b)};_.fc=function Rh(a,b,c){this.c=new nk;vh(this.c,a,b)};_.gc=function Sh(a,b){return ii(this.c,a,b)};_.hc=function Th(a){return ji(this.c,a)};_.ic=function Uh(a){return ki(this.c,a)};_.jc=function Vh(a){mi(this.c,a)};_.kc=function Wh(){return this.c.f};_.lc=function Xh(){return this.c.g};_.mc=function Yh(a){return oi(this.c,a)};_.nc=function Zh(){return wh(this.c)};_.oc=function $h(){return pi(this.c)};_.qc=function _h(){};_.rc=function ai(a){xh(this.c,a)};_.sc=function bi(a,b){yh(this.c,a)};_.c=null;eJ(68,69,XR);eJ(70,1,TR,ei);_.Wb=function fi(a){ci(this.b,Vg(this.b,a))};_.b=null;eJ(71,66,YR);_.ac=function si(a){!this.b&&(this.b=new EO);vO(this.b,a)};_.ec=function ti(a,b){return hi(this,a,b)};_.Bc=function ui(){var a,b,c;a=new EO;for(c=ZN(dM(this.c));IN(c.b.b);){b=kC(dO(c),1);vO(a,new Do(this.g,b,null))}vm(this.i,new oo(a),(!bm&&(bm=new dm),bm))};_.gc=function vi(a,b){return ii(this,a,b)};_.hc=function wi(a){return ji(this,a)};_.ic=function xi(a){return ki(this,a)};_.Cc=function yi(){return gP(),XP(new _P(this.c))};_.jc=function zi(a){mi(this,a)};_.Dc=function Ai(a){return ni(this,a)};_.mc=function Bi(a){return oi(this,a)};_.oc=function Ci(){return pi(this)};_.Ec=function Di(){return gP(),ZP(new _P(this.c))};_.Fc=function Ei(a,b){return qi(this,kC(a,1),b)};_.Gc=function Fi(a){var b;b=zM(this.c,a);xM(this.c,a)&&vm(this.i,new Do(this.g,a,null),(!bm&&(bm=new dm),bm));return b};_.bc=function Gi(a){if(this.b){BO(this.b,a);this.b.c==0&&(this.b=null)}};_.Hc=function Hi(){return this.c.e};_.Ic=function Ii(){return gP(),$P(new _P(this.c))};_.b=null;eJ(73,1,{89:1,92:1,94:1});_.cT=function Ni(a){return Li(this,kC(a,94))};_.eQ=function Oi(a){return this===a};_.hC=function Pi(){return Wy(this)};_.tS=function Qi(){return this.g};_.g=null;_.i=0;eJ(72,73,{31:1,89:1,92:1,94:1},Yi);_.b=null;_.c=null;_.d=null;_.e=0;_.f=null;var Ri,Si,Ti,Ui,Vi,Wi;eJ(74,1,SR,_i);_.B=function aj(){return new nk};eJ(75,1,SR,cj);_.B=function dj(){return new Sj};eJ(76,1,SR,fj);_.B=function gj(){return new Nk};eJ(77,1,SR,ij);_.B=function jj(){return new pk};eJ(78,1,SR,lj);_.B=function mj(){return new Ll};eJ(79,66,{7:1,9:1,32:1,103:1},Sj);_.Jc=function Tj(a){oj(this,this.c.c,a);return true};_.ec=function Uj(a,b){var c;c=new EO;if(mC(a,41)){vO(c,rj(this,kC(a,41),b))}else if(mC(a,45)){vO(c,sj(this,kC(a,45),b))}else if(mC(a,46)){vO(c,tj(this,kC(a,46),b))}else if(mC(a,47)){vO(c,uj(this,kC(a,47),b))}else if(mC(a,52)){vO(c,vj(this,kC(a,52),b))}else{throw new wK($S)}return c};_.fc=function Vj(a,b,c){vh(this,a,b);this.c=new EO};_.gc=function Wj(a,b){var c,d;if(!mC(b,32)){return false}d=kC(b,32);if(this.c.c!=d.c.c){return false}for(c=0;c<this.c.c;++c){if(!bl(a,yO(this.c,c),yO(d.c,c))){return false}}return true};_.hc=function Xj(a){var b,c,d;d=17;for(c=new jk(this);c.b<c.c.c.c;){b=Ej(c.c,c.b++);d=d*37+kC(jl(a,b),97).b}return d};_.ic=function Yj(a){var b,c,d,e;e=new PL;rz(e.b,_S);b=true;for(d=new jk(this);d.b<d.c.c.c;){c=Ej(d.c,d.b++);b?(b=false):(rz(e.b,US),e);OL(e,kC(jl(a,c),1))}rz(e.b,RS);return e.b.b};_.jc=function Zj(a){if(mC(a,30)){Dj(this,kC(a,30))}else if(mC(a,28)){Cj(this,kC(a,28))}else if(mC(a,29)){Bj(this,kC(a,29))}else{throw new wK(XS+a.cZ.f)}};_.Kc=function $j(a){return Ej(this,a)};_.mc=function _j(a){if(mC(a,41)){return Gj(this,kC(a,41))}else if(mC(a,46)){return Ij(kC(a,46))}else if(mC(a,45)){return Hj(kC(a,45))}else if(mC(a,47)){return Jj(this,kC(a,47))}else if(mC(a,52)){return Kj(this,kC(a,52))}else{throw new wK($S)}};_.oc=function ak(){if(this.c.c==0){return gP(),gP(),eP}return gP(),new uP(new co(this.g,0,qg(this.c)))};_.Lc=function bk(){return this.c.c==0};_.Mc=function ck(){return new jk(this)};_.Nc=function dk(){throw new YL};_.Oc=function ek(a){throw new YL};_.Hc=function fk(){return this.c.c};_.Pc=function gk(a,b){return new TN(this.c,a,b)};_.Qc=function hk(){return DO(this.c)};_.b=null;_.c=null;eJ(80,1,{},jk);_.Rc=function kk(){return this.b<this.c.c.c};_.Sc=function lk(){return Ej(this.c,this.b++)};_.b=0;_.c=null;eJ(81,71,{8:1,9:1,33:1,104:1},nk);eJ(82,68,XR,pk);_.pc=function qk(){return (Xi(),Ui).c};eJ(83,66,{9:1,10:1,91:1},Nk);_.ec=function Ok(a,b){var c;c=new EO;if(mC(a,41)){vO(c,tk(this,kC(a,41),b))}else if(mC(a,46)){vO(c,vk(this,kC(a,46),b))}else if(mC(a,45)){vO(c,uk(this,kC(a,45),b))}else if(mC(a,47)){vO(c,wk(this,kC(a,47),b))}else{throw new wK(aT)}return c};_.fc=function Qk(a,b,c){vh(this,a,b)};_.cA=function Rk(a){return DL(this.c,a)};_.gc=function Sk(a,b){return Jk(this,b)};_.hc=function Tk(a){return yL(this.c.b.b)};_.ic=function Uk(a){return this.c.b.b};_.jc=function Vk(a){if(mC(a,26)){Ak(this,kC(a,26))}else if(mC(a,25)){zk(this,kC(a,25))}else{throw new wK(XS+a.cZ.f)}};_.mc=function Wk(a){if(mC(a,41)){return Ek(this,kC(a,41))}else if(mC(a,45)){return Fk(this,kC(a,45))}else if(mC(a,46)){return Gk(this,kC(a,46))}else if(mC(a,47)){return Hk(this,kC(a,47))}else{throw new wK(aT)}};_.oc=function Xk(){var a;a=new EO;this.c.b.b.length>0&&vO(a,new co(this.g,0,Pk(this.c)));return a};_.yc=function Yk(a){return Jk(this,a)};_.zc=function Zk(){return yL(this.c.b.b)};_.Ac=function $k(){return this.c.b.b};_.lN=function _k(){return this.c.b.b.length};_.b=null;eJ(84,1,{},cl);eJ(85,1,{34:1},el);_.eQ=function fl(a){var b;if(!mC(a,34)){return false}b=kC(a,34);return this.b==b.b&&this.c==b.c||this.b==b.c&&this.c==b.b};_.hC=function gl(){var a,b;a=WL(this.b);b=WL(this.c);return a<b?UO(bC(hI,PR,0,[PK(a),PK(b)])):UO(bC(hI,PR,0,[PK(b),PK(a)]))};_.b=null;_.c=null;eJ(87,1,{});eJ(86,87,{},ll);_.Tc=function ml(a){return PK(a.hc(this))};_.Uc=function nl(a){return PK(a==null?0:pb(a))};_.Vc=function ol(a){return PK(0)};eJ(88,87,{},ql);_.Tc=function rl(a){return a.ic(this)};_.Uc=function sl(a){return a!=null?qb(a):bT};_.Vc=function tl(a){var b;return b=new PL,rz(b.b,'<'),OL(b,a.pc()),rz(b.b,VS),OL(b,a.lc()),rz(b.b,'>'),b.b.b};eJ(89,1,{35:1},vl);_.eQ=function wl(a){var b;if(!mC(a,35)){return false}b=kC(a,35);return b.b==this.b};_.hC=function xl(){return WL(this.b)};_.b=null;eJ(90,1,{},zl);eJ(91,66,{9:1,12:1,36:1,92:1},Ll);_.ec=function Ml(a,b){return Fl(this,a,b)};_.cT=function Nl(a){return Gl(this,kC(a,36))};_.gc=function Ol(a,b){var c;if(!mC(b,12)){return false}c=kC(b,12);return sw(bC(hI,PR,0,[this.e,c.e,PK(this.c),PK(c.c),(SJ(),this.b?RJ:QJ),c.b?RJ:QJ]))};_.hc=function Pl(a){return UO(bC(hI,PR,0,[this.g,PK(this.c),(SJ(),this.b?RJ:QJ)]))};_.ic=function Ql(a){return 'DefaultIndexReference [id='+this.g+', objectId='+this.e+cT+this.c+dT+this.b+RS};_.jc=function Rl(a){var b,c;if(mC(a,23)){for(c=new LN(this.d);c.c<c.e.Hc();){b=kC(JN(c),51);Ze(b,kC(a,23))}}else{throw new wK(XS+a.cZ.f)}};_.mc=function Sl(a){var b;if(mC(a,44)){b=kC(a,44);return new Zn(b.f,b.d,b.e,b.b,b.c)}throw new wK('Index references can only get inverse of IndexMutation')};_.oc=function Tl(){var a;a=new EO;vO(a,new Zn(this.g,this.e,this.c,this.b,this.c));return a};_.b=false;_.c=0;_.d=null;_.e=null;eJ(92,1,{},Vl);eJ(94,21,{},Zl);_.z=function $l(a){return a};_.A=function _l(a){return new nn(a)};eJ(95,1,{},dm);_.uc=function em(){return this.b};_.vc=function fm(){return this.c};_.wc=function gm(){return true};_.b=null;_.c=null;var bm=null;eJ(96,1,{},mm);_.b=false;_.c=null;_.d=null;_.e=null;eJ(97,1,{},om);_.b=false;_.c=null;_.d=null;_.e=null;eJ(98,1,{6:1,37:1},Om);_.eQ=function Pm(a){var b;if(!mC(a,37)){return false}b=kC(a,37);return sw(bC(hI,PR,0,[Jm(this),Jm(b)]))};_.hC=function Qm(){return UO(bC(hI,PR,0,[Jm(this)]))};_.tS=function Rm(){return 'DefaultModel (root = '+Jm(this).tS()+tS};_.b=false;_.c=0;_.d=IS;_.e=true;_.i=null;_.j=null;_.p=null;_.q=false;eJ(99,10,QR,Tm);_.t=function Um(a,b){mC(a,40)&&dR(this.c,Im(this.b,kC(a,40).b))};_.b=null;_.c=null;eJ(100,1,{},Wm);_.uc=function Xm(){return this.c};_.vc=function Ym(){return this.d};_.wc=function Zm(){return this.b};_.b=false;_.c=null;_.d=null;eJ(102,1,{},ln);_.c=null;_.d=0;_.e=2;_.f=null;_.g=null;eJ(103,71,YR,nn);eJ(107,1,_R);eJ(106,107,_R);eJ(105,106,{50:1,71:1});_.lc=function tn(){return this.f};_.f=null;eJ(104,105,{38:1,48:1,50:1,71:1});_.eQ=function vn(a){var b;if(!mC(a,38)){return false}b=kC(a,38);return sw(bC(hI,PR,0,[this.f,b.f,PK(this.b),PK(b.b),PK(this.c),PK(b.c)]))};_.Wc=function wn(){return this.b};_.Xc=function xn(){return this.c};_.hC=function yn(){return UO(bC(hI,PR,0,[this.f,PK(this.b),PK(this.c)]))};_.tS=function zn(){return 'AbstractDeleteMutation [count='+this.b+fT+this.f+cT+this.c+RS};_.b=0;_.c=0;eJ(108,105,{39:1,48:1,50:1,71:1});_.eQ=function Cn(a){var b;if(!mC(a,39)){return false}b=kC(a,39);return sw(bC(hI,PR,0,[this.f,b.f,PK(this.b),PK(b.b),this.c,b.c]))};_.Wc=function Dn(){return this.c.Hc()};_.Xc=function En(){return this.b};_.hC=function Fn(){return UO(bC(hI,PR,0,[this.f,PK(this.b),this.c]))};_.tS=function Gn(){return 'AbstractInsertMutation @ '+this.f+gT+this.b+hT+this.c};_.b=0;_.c=null;eJ(109,106,{40:1,71:1},In);_.eQ=function Jn(a){var b;if(!mC(a,40)){return false}b=kC(a,40);return sw(bC(hI,PR,0,[this.b,b.b,this.c,b.c]))};_.hC=function Kn(){return UO(bC(hI,PR,0,[this.b,this.c]))};_.tS=function Ln(){return 'CreateMutation: [id = '+this.b+', type = '+this.c+RS};_.b=null;_.c=null;eJ(110,104,{38:1,41:1,48:1,50:1,71:1},Nn);_.tS=function On(){return 'DeleteMutation [count='+this.b+fT+this.f+cT+this.c+RS};eJ(111,106,{42:1,71:1},Qn);_.eQ=function Rn(a){if(!mC(a,42)){return false}return sw(bC(hI,PR,0,[this.b,kC(a,42).b]))};_.hC=function Sn(){return UO(bC(hI,PR,0,[this.b]))};_.tS=function Tn(){return 'DestroyMutation [id='+this.b+', mutationId=]'};_.b=null;eJ(112,1,{17:1,43:1},Vn);_.eQ=function Wn(a){var b;if(!mC(a,43)){return false}b=kC(a,43);return sw(bC(hI,PR,0,[this.c,b.c,this.b,b.b]))};_.hC=function Xn(){return UO(bC(hI,PR,0,[this.c,this.b]))};_.b=null;_.c=null;eJ(113,105,{44:1,50:1,71:1},Zn);_.eQ=function $n(a){var b;if(!mC(a,44)){return false}b=kC(a,44);return sw(bC(hI,PR,0,[this.f,b.f,this.d,b.d,PK(this.c),PK(b.c),(SJ(),this.b?RJ:QJ),b.b?RJ:QJ]))};_.hC=function _n(){return UO(bC(hI,PR,0,[this.f,this.d,PK(this.c),(SJ(),this.b?RJ:QJ)]))};_.tS=function ao(){return 'IndexMutation: [objectId='+this.d+cT+this.c+dT+this.b+RS};_.b=false;_.c=0;_.d=null;_.e=0;eJ(114,108,{39:1,45:1,48:1,50:1,71:1},co);_.tS=function eo(){return 'InsertMutation @ '+this.f+gT+this.b+hT+this.c};eJ(115,108,{39:1,46:1,48:1,50:1,71:1},go);_.tS=function ho(){return 'InverseDeleteMutation id: '+this.f+' @ '+this.b+hT+this.c};eJ(116,104,{38:1,47:1,48:1,50:1,71:1},jo);_.tS=function ko(){return 'InverseInsertMutation [count='+this.b+fT+this.f+cT+this.c+RS};eJ(117,106,{49:1,71:1},mo,no,oo);_.eQ=function po(a){var b;if(!mC(a,49)){return false}b=kC(a,49);return sw(bC(hI,PR,0,[this.d,b.d,this.c,b.c]))};_.hC=function qo(){return UO(bC(hI,PR,0,[this.d,this.c]))};_.tS=function ro(){return 'MultiMutation: ['+(!this.d.length?IS:'name='+this.d+US)+'mutations='+this.c+RS};_.b=false;_.c=null;_.d=null;eJ(119,105,{48:1,50:1,52:1,71:1},wo);_.eQ=function xo(a){var b;if(!mC(a,52)){return false}b=kC(a,52);return sw(bC(hI,PR,0,[this.f,b.f,PK(this.b),PK(b.b),this.c,b.c]))};_.Wc=function yo(){return this.c.Hc()};_.Xc=function zo(){return this.b};_.hC=function Ao(){return UO(bC(hI,PR,0,[this.f,PK(this.b),this.c]))};_.tS=function Bo(){return 'set @ '+this.f+gT+this.b+hT+this.c};_.b=0;_.c=null;eJ(120,105,{50:1,53:1,71:1},Do);_.eQ=function Eo(a){var b;if(!mC(a,53)){return false}b=kC(a,53);return sw(bC(hI,PR,0,[this.f,b.f,this.b,b.b,this.c,b.c]))};_.hC=function Fo(){return UO(bC(hI,PR,0,[this.f,this.b,this.c]))};_.tS=function Go(){return 'UpdateMutation: [propertyName='+this.b+', value='+this.c+RS};_.b=null;_.c=null;eJ(121,1,aS,Jo);_.Yc=function Ko(a,b,c){return Io(kC(b,40),kC(c,42))};eJ(122,1,{},Vo);_.b=null;var Mo;eJ(123,1,aS,Yo);_.Yc=function Zo(a,b,c){var d;d=this.b.Yc(a,c,b);return new vw(d.c,d.b)};_.b=null;eJ(124,1,aS,ap);_.Yc=function bp(a,b,c){return _o(kC(b,38),kC(c,38))};eJ(125,1,aS,ep);_.Yc=function fp(a,b,c){return dp(kC(b,38),kC(c,44))};eJ(126,1,aS,ip);_.Yc=function jp(a,b,c){return hp(kC(b,38),kC(c,52))};eJ(127,1,aS,mp);_.Yc=function np(a,b,c){return lp(kC(b,42),kC(c,40))};eJ(128,1,aS,qp);_.Yc=function rp(a,b,c){return pp(kC(b,42),kC(c,38))};eJ(129,1,aS,up);_.Yc=function vp(a,b,c){return tp(kC(b,42),kC(c,39))};eJ(130,1,aS,yp);_.Yc=function zp(a,b,c){return xp(kC(b,42),kC(c,52))};eJ(131,1,aS,Cp);_.Yc=function Dp(a,b,c){return Bp(kC(b,42),kC(c,53))};eJ(132,1,aS,Gp);_.Yc=function Hp(a,b,c){return Fp((kC(b,44),kC(c,44)))};eJ(133,1,aS,Kp);_.Yc=function Lp(a,b,c){return Jp(kC(b,38),kC(c,39))};eJ(134,1,aS,Op);_.Yc=function Pp(a,b,c){return Np(kC(b,39),kC(c,44))};eJ(135,1,aS,Sp);_.Yc=function Tp(a,b,c){return Rp(kC(b,39),kC(c,39))};eJ(136,1,aS,Wp);_.Yc=function Xp(a,b,c){return Vp(kC(b,39),kC(c,52))};eJ(137,1,aS,Zp);_.Yc=function $p(a,b,c){var d,e,f,g,i;d=null;f=null;mC(b,49)&&(d=kC(b,49).d);mC(c,49)&&(f=kC(c,49).d);e=Uo(a,to(b,new EO),to(c,new EO));g=uo(jP(e.b),d,mC(b,49));i=uo(jP(e.c),f,mC(c,49));return new vw(g,i)};eJ(138,1,aS,bq);_.Yc=function cq(a,b,c){return aq(kC(b,52),kC(c,52))};eJ(139,1,aS,fq);_.Yc=function gq(a,b,c){return eq(kC(b,53),kC(c,53))};eJ(140,106,_R,iq);eJ(141,1,{},mq);_.b=null;eJ(142,1,{},sq);_.b=null;eJ(143,1,QR,uq);_.t=function vq(a,b){};_.u=function wq(a,b){pq(this.b,a,b.wc())};_.v=function xq(a){qq(this.b,a)};_.b=null;eJ(144,1,{});_.$c=function Aq(a,b){throw new YL};_._c=function Bq(a,b,c){return Gq(this.d,new jg(sv(kC(a,16))),b,(Jr(),vr))};_.ad=function Cq(){return this.c};_.c=null;_.d=null;eJ(146,1,{});_.$c=function Kq(a,b){return Fq(this,a,b)};_._c=function Lq(a,b,c){return Gq(this,a,b,c)};_.ad=function Mq(){return this.d};_.d=null;_.e=false;eJ(145,146,{});eJ(147,146,{});_.Zc=function Sq(a){return ob(a)==this.d};_.bd=function Tq(a,b){if(kC(a,84).od()){return null}return this.dd(Hq(this,a,0),b)};_.cd=function Uq(a,b,c){Iq(this,b,0,this.ed(a,c))};eJ(151,1,bS);_.fd=function _q(){return this.f};_.tS=function ar(){return $q(this)};_.f=null;eJ(150,151,bS);eJ(149,150,cS,er);eJ(148,149,cS,fr,gr);eJ(152,73,{55:1,89:1,92:1,94:1},Kr);_.b=null;_.c=0;_.d=null;var ir,jr,kr,lr,mr,nr,or,pr,qr,rr,sr,tr,ur,vr,wr,xr,yr,zr,Ar,Br,Cr,Dr,Er,Fr,Gr,Hr,Ir;var Mr,Nr;eJ(154,146,{});_.Zc=function Zr(a){return ob(a)==this.d};_.bd=function $r(a,b){var c;c=Hq(this,a,0);return this.hd(Pr(c,b,this.c))};_.cd=function _r(a,b,c){var d;d=Sr(this.gd(a),c,this.b);kf(b,this.e?1:0,d)};_.b=false;_.c=null;eJ(155,147,{},cs);_.dd=function ds(a,b){var c;return c=af(a),ww(!!c,'Illegal Boolean value: '+a),c};_.ed=function es(a,b){return bs(kC(a,90))};eJ(156,145,{},ls);_.Zc=function ms(a){return mC(a,40)};_.bd=function ns(a,b){return js(this,a,b)};_.cd=function os(a,b,c){ks(this,kC(a,40),b,c)};var gs,hs;eJ(157,73,{56:1,57:1,89:1,92:1,94:1},us);_.Xc=function vs(){return this.b};_.b=0;var qs,rs,ss;eJ(158,154,{},ys);_.gd=function zs(a){return kC(a,11).b};_.hd=function As(a){return new Zf(kC(a,1))};eJ(159,145,{},Ds);_.Zc=function Es(a){return mC(a,41)};_.bd=function Fs(a,b){var c,d,e;return c=kC(Nq(this,a,b,(Ms(),Ks),ZG),1),d=kC(Nq(this,a,b,Ls,RG),97).b,e=kC(Nq(this,a,b,Js,RG),97).b,new Nn(c,d,e)};_.cd=function Gs(a,b,c){Cs(this,kC(a,41),b,c)};eJ(160,73,{56:1,58:1,89:1,92:1,94:1},Ns);_.Xc=function Os(){return this.b};_.b=0;var Is,Js,Ks,Ls;eJ(161,145,{},Ss);_.Zc=function Ts(a){return mC(a,42)};_.bd=function Us(a,b){var c;return c=kC(Nq(this,a,b,(Zs(),Ys),ZG),1),new Qn(c)};_.cd=function Vs(a,b,c){Rs(this,kC(a,42),b,c)};eJ(162,73,{56:1,59:1,89:1,92:1,94:1},$s);_.Xc=function _s(){return this.b};_.b=0;var Xs,Ys;eJ(163,147,{},ct);_.dd=function dt(a,b){var c;return c=bf(a),ww(!!c,'Illegal Double value: '+a),new nK(c.b)};_.ed=function et(a,b){return new SA(kC(a,93).b)};eJ(164,145,{},ht);_.Zc=function it(a){return mC(a,43)};_.bd=function jt(a,b){var c,d;return c=kC(Nq(this,a,b,(pt(),ot),ZG),1),d=kC(Nq(this,a,b,nt,ZG),1),new Vn(c,d)};_.cd=function kt(a,b,c){gt(this,kC(a,43),b,c)};eJ(165,73,{56:1,60:1,89:1,92:1,94:1},qt);_.Xc=function rt(){return this.b};_.b=0;var mt,nt,ot;eJ(166,145,{},vt);_.Zc=function wt(a){return mC(a,44)};_.bd=function xt(a,b){var c,d,e,f,g;return c=kC(Nq(this,a,b,(Gt(),Ct),ZG),1),d=kC(Nq(this,a,b,Ft,ZG),1),e=kC(Nq(this,a,b,Dt,RG),97).b,f=kC(Nq(this,a,b,Bt,IG),90).b,g=kC(Nq(this,a,b,Et,RG),97).b,new Zn(c,d,e,f,g)};_.cd=function yt(a,b,c){ut(this,kC(a,44),b,c)};eJ(167,73,{56:1,61:1,89:1,92:1,94:1},Ht);_.Xc=function It(){return this.b};_.b=0;var At,Bt,Ct,Dt,Et,Ft;eJ(168,145,{},Mt);_.Zc=function Nt(a){return mC(a,45)};_.bd=function Ot(a,b){var c,d,e;return c=kC(Nq(this,a,b,(Vt(),St),ZG),1),d=kC(Nq(this,a,b,Tt,RG),97).b,e=kC(Nq(this,a,b,Ut,MH),103),new co(c,d,e)};_.cd=function Pt(a,b,c){Lt(this,kC(a,45),b,c)};eJ(169,73,{56:1,62:1,89:1,92:1,94:1},Wt);_.Xc=function Xt(){return this.b};_.b=0;var Rt,St,Tt,Ut;eJ(170,147,{},$t);_.dd=function _t(a,b){var c;return c=bf(a),ww(!!c,'Illegal Integer value: '+a),PK(qC(c.b))};_.ed=function au(a,b){return new SA(kC(a,97).b)};eJ(171,145,{},du);_.Zc=function eu(a){return mC(a,46)};_.bd=function fu(a,b){var c,d,e;return c=kC(Nq(this,a,b,(nu(),ju),ZG),1),d=kC(Nq(this,a,b,ku,RG),97).b,e=kC(Nq(this,a,b,mu,MH),103),new go(c,d,e)};_.cd=function gu(a,b,c){cu(this,kC(a,46),b,c)};eJ(172,73,{56:1,63:1,89:1,92:1,94:1},ou);_.Xc=function pu(){return this.b};_.b=0;var iu,ju,ku,lu,mu;eJ(173,145,{},tu);_.Zc=function uu(a){return mC(a,47)};_.bd=function vu(a,b){var c,d,e;return c=kC(Nq(this,a,b,(Cu(),Au),ZG),1),d=kC(Nq(this,a,b,Bu,RG),97).b,e=kC(Nq(this,a,b,zu,RG),97).b,new jo(c,d,e)};_.cd=function wu(a,b,c){su(this,kC(a,47),b,c)};eJ(174,73,{56:1,64:1,89:1,92:1,94:1},Du);_.Xc=function Eu(){return this.b};_.b=0;var yu,zu,Au,Bu;eJ(175,147,{},Hu);_.dd=function Iu(a,b){return new jg(a.tS())};_.ed=function Ju(a,b){return df(kC(a,13).b)};eJ(176,145,{},Mu);_.Zc=function Nu(a){return mC(a,49)};_.bd=function Ou(a,b){var c,d,e;return c=kC(Nq(this,a,b,(Vu(),Tu),MH),103),d=kC(Nq(this,a,b,Uu,ZG),1),d==null&&(d=IS),e=kC(Nq(this,a,b,Su,IG),90),!e&&(e=(SJ(),SJ(),QJ)),new no(d,c,e.b)};_.cd=function Pu(a,b,c){Lu(this,kC(a,49),b,c)};eJ(177,73,{56:1,65:1,89:1,92:1,94:1},Wu);_.Xc=function Xu(){return this.b};_.b=0;var Ru,Su,Tu,Uu;eJ(178,146,{},$u);_.Zc=function _u(a){return mC(a,72)};_.bd=function av(a,b){return Ew(),Ew(),Dw};_.cd=function bv(a,b,c){kC(a,72)};eJ(179,154,{},fv);_.Zc=function gv(a){if(!mC(a,103)){return false}return hv(kC(a,103))};_.gd=function iv(a){return dv(kC(a,103))};_.hd=function jv(a){return ev(kC(a,1))};eJ(180,154,{},lv);_.Zc=function mv(a){return false};_.gd=function nv(a){return kC(a,16).b};_.hd=function ov(a){return Ag(),new Bg(a)};eJ(181,144,{},tv);_.Zc=function uv(a){var b,c;if(mC(a,16)){c=kC(a,16);b=c.b;if(ob(b)==this.b){return true}}return false};_.b=null;var qv;eJ(182,145,{},xv);_.Zc=function yv(a){return mC(a,52)};_.bd=function zv(a,b){var c,d,e;return c=kC(Nq(this,a,b,(Gv(),Dv),ZG),1),d=kC(Nq(this,a,b,Ev,TG),98),e=kC(Nq(this,a,b,Fv,MH),103),new wo(c,d.vd(),e)};_.cd=function Av(a,b,c){wv(this,kC(a,52),b,c)};eJ(183,73,{56:1,66:1,89:1,92:1,94:1},Hv);_.Xc=function Iv(){return this.b};_.b=0;var Cv,Dv,Ev,Fv;eJ(184,147,{},Lv);_.Zc=function Mv(a){return mC(a,1)};_.dd=function Nv(a,b){return kC(yw(cf(a),'Illegal String value: '+a),1)};_.ed=function Ov(a,b){return new QB(kC(a,1))};eJ(185,146,{},Sv);_.Zc=function Tv(a){if(!mC(a,103)){return false}return !hv(kC(a,103))};_.bd=function Uv(a,b){return Qv(this,a,b)};_.cd=function Vv(a,b,c){Rv(this,kC(a,103),b,c)};eJ(186,145,{},Yv);_.Zc=function Zv(a){return mC(a,53)};_.bd=function $v(a,b){var c,d,e;return c=kC(Nq(this,a,b,(fw(),cw),ZG),1),d=kC(Nq(this,a,b,dw,ZG),1),e=kC(Nq(this,a,b,ew,UG),17),new Do(c,d,e)};_.cd=function _v(a,b,c){Xv(this,kC(a,53),b,c)};eJ(187,73,{56:1,67:1,89:1,92:1,94:1},gw);_.Xc=function hw(){return this.b};_.b=0;var bw,cw,dw,ew;eJ(189,73,{69:1,70:1,89:1,92:1,94:1},pw);_.b=null;var kw,lw,mw,nw;eJ(191,1,{},vw);_.b=null;_.c=null;eJ(195,107,{71:1,72:1},Fw);_.tS=function Gw(){return 'Null{}'};var Dw;eJ(196,1,{73:1},Kw);_.b=null;eJ(199,1,{});_.tS=function Pw(){return 'An event type'};_.f=null;eJ(198,199,{});_.e=false;eJ(197,198,{},Tw);_.id=function Uw(a){Sw(this,kC(a,74))};_.jd=function Vw(){return Qw};_.b=false;_.c=false;var Qw;eJ(200,198,{},$w);_.id=function _w(a){Zw(this,kC(a,75))};_.jd=function ax(){return Xw};_.b=null;_.c=null;_.d=null;var Xw;eJ(201,1,{},px);_.b=null;_.d=dS;_.e=dS;_.f=false;_.g=false;_.i=null;_.j=null;_.k=0;_.n=null;eJ(202,1,{76:1,79:1},rx);_.b=null;eJ(204,1,eS);_.kd=function Bx(){this.c||BO(ux,this);lx(this.b);this.b.g=false};_.c=false;_.d=0;var ux;eJ(203,204,eS,Cx);_.b=null;eJ(205,1,{},Gx);_.r=function Hx(a){Ex(a)};_.s=function Ix(a){Fx(this,kC(a,97))};_.b=null;eJ(206,1,{},Kx);_.b=null;_.c=null;_.d=0;eJ(207,198,{},Px);_.id=function Qx(a){Ox(this,kC(a,76))};_.jd=function Rx(){return Mx};_.b=null;var Mx;eJ(208,1,{},Tx);_.Mc=function Ux(){return new Wx(this.c,new LN(this.b))};_.b=null;_.c=null;eJ(209,1,{},Wx);_.Rc=function Xx(){return IN(this.b)};_.Sc=function Yx(){return Rf(this.c,JN(this.b))};_.b=null;_.c=null;eJ(210,1,{},$x);_.Mc=function _x(){return new by(this.c,new GP(this.b.c.Mc()))};_.b=null;_.c=null;eJ(211,1,{},by);_.Rc=function cy(){return this.b.c.Rc()};_.Sc=function dy(){return Sf(this.c,kC(this.b.c.Sc(),71))};_.b=null;_.c=null;eJ(212,1,{},ly);_.b=null;_.d=-1;eJ(213,1,{},ny);_.b=null;_.c=null;eJ(219,149,{77:1,89:1,99:1,101:1},ty);_.fd=function zy(){this.d==null&&(this.e=wy(this.c),this.b=this.b+VS+uy(this.c),this.d=uT+this.e+') '+yy(this.c)+this.b,undefined);return this.d};_.b=IS;_.c=null;_.d=null;_.e=null;var Dy,Ey;eJ(224,1,{});var Ly=0,My=0,Ny=0,Oy=-1;eJ(226,224,{},ez);_.b=null;_.c=null;var az;eJ(231,1,{});eJ(232,231,{},uz);_.b=IS;eJ(236,198,{},yz);_.id=function zz(a){kC(a,78);kJ()};_.jd=function Bz(){return xz};var xz=null;eJ(238,1,{});_.hC=function Fz(){return this.b};_.tS=function Gz(){return 'Event type'};_.b=0;var Ez=0;eJ(237,238,{},Hz);eJ(239,1,{},Lz);_.b=null;_.c=null;eJ(242,1,{});eJ(241,242,{});_.b=null;_.c=0;_.d=false;eJ(240,241,{},Xz);eJ(243,1,{},Zz);eJ(245,149,fS,aA);_.b=null;eJ(244,245,fS,dA);eJ(247,1,gS);_.md=function gA(){return null};_.nd=function hA(){return null};_.od=function iA(){return null};_.pd=function jA(){return null};_.qd=function kA(){return null};_.rd=function lA(){return null};eJ(246,247,{80:1,84:1},pA,qA);_.eQ=function rA(a){if(!mC(a,80)){return false}return this.b==kC(a,80).b};_.ld=function sA(){return wA};_.hC=function tA(){return Wy(this.b)};_.md=function uA(){return this};_.tS=function vA(){var a,b,c;c=new HL;rz(c.b,_S);for(b=0,a=this.b.length;b<a;++b){b>0&&(rz(c.b,gT),c);BL(c,mA(this,b))}rz(c.b,RS);return c.b.b};_.b=null;eJ(248,247,gS,BA);_.ld=function CA(){return FA};_.nd=function DA(){return this};_.tS=function EA(){return SJ(),IS+this.b};_.b=false;var yA,zA;eJ(249,149,cS,HA,IA);eJ(250,247,gS,MA);_.ld=function NA(){return QA};_.od=function OA(){return this};_.tS=function PA(){return bT};var KA;eJ(251,247,{81:1,84:1},SA);_.eQ=function TA(a){if(!mC(a,81)){return false}return this.b==kC(a,81).b};_.ld=function UA(){return YA};_.hC=function VA(){return qC((new nK(this.b)).b)};_.pd=function WA(){return this};_.tS=function XA(){return this.b+IS};_.b=0;eJ(252,247,{82:1,84:1},fB,gB);_.eQ=function hB(a){if(!mC(a,82)){return false}return this.b==kC(a,82).b};_.ld=function iB(){return mB};_.hC=function jB(){return Wy(this.b)};_.qd=function kB(){return this};_.tS=function lB(){var a,b,c,d,e,f;f=new HL;rz(f.b,TS);a=true;e=$A(this,aC(jI,PR,1,0,0));for(c=0,d=e.length;c<d;++c){b=e[c];a?(a=false):(rz(f.b,US),f);CL(f,Iy(b));rz(f.b,xT);BL(f,aB(this,b))}rz(f.b,WS);return f.b.b};_.b=null;eJ(255,1,{});_.Jc=function sB(a){throw new ZL('Add not supported on this collection')};_.sd=function tB(a){var b;b=qB(this.Mc(),a);return !!b};_.Lc=function uB(){return this.Hc()==0};_.Qc=function vB(){return this.td(aC(hI,PR,0,this.Hc(),0))};_.td=function wB(a){var b,c,d;d=this.Hc();a.length<d&&(a=$B(a,d));c=this.Mc();for(b=0;b<d;++b){cC(a,b,c.Sc())}a.length>d&&cC(a,d,null);return a};_.tS=function xB(){return rB(this)};eJ(254,255,hS);_.eQ=function yB(a){var b,c,d;if(a===this){return true}if(!mC(a,107)){return false}c=kC(a,107);if(c.Hc()!=this.Hc()){return false}for(b=c.Mc();b.Rc();){d=b.Sc();if(!this.sd(d)){return false}}return true};_.hC=function zB(){var a,b,c;a=0;for(b=this.Mc();b.Rc();){c=b.Sc();if(c!=null){a+=pb(c);a=~~a}}return a};eJ(253,254,hS,AB);_.sd=function BB(a){return mC(a,1)&&_A(this.b,kC(a,1))};_.Mc=function CB(){return new LN(new $O(this.c))};_.Hc=function DB(){return this.c.length};_.b=null;_.c=null;var EB;eJ(257,247,{83:1,84:1},QB);_.eQ=function RB(a){if(!mC(a,83)){return false}return fL(this.b,kC(a,83).b)};_.ld=function SB(){return WB};_.hC=function TB(){return yL(this.b)};_.rd=function UB(){return this};_.tS=function VB(){return Iy(this.b)};_.b=null;eJ(258,1,{},XB);_.qI=0;var dC,eC;var mI=null;var DI=null;var XI,YI,ZI,$I;eJ(267,1,{85:1},bJ);eJ(272,1,{78:1,79:1},lJ);var mJ=false,nJ=null,oJ;eJ(274,198,{},yJ);_.id=function zJ(a){rC(a);null.Id()};_.jd=function AJ(){return wJ};var wJ;eJ(275,239,{},CJ);eJ(276,1,{});_.b=null;_.c=null;eJ(277,276,{},GJ);eJ(278,1,{},IJ);eJ(279,1,{87:1},KJ);_.b=null;_.c=null;_.d=null;_.e=null;eJ(280,149,cS,MJ);eJ(281,149,cS,OJ);eJ(282,1,{89:1,90:1,92:1},UJ);_.cT=function VJ(a){return TJ(this,kC(a,90))};_.eQ=function WJ(a){return mC(a,90)&&kC(a,90).b==this.b};_.hC=function XJ(){return this.b?1231:1237};_.tS=function YJ(){return this.b?nT:oT};_.b=false;var QJ,RJ;eJ(283,1,{},$J);_.tS=function gK(){return ((this.d&2)!=0?'interface ':(this.d&1)!=0?IS:'class ')+this.f};_.b=null;_.c=null;_.d=0;_.e=0;_.f=null;eJ(284,149,cS,iK,jK);eJ(286,1,{89:1,98:1});eJ(285,286,{89:1,92:1,93:1,98:1},nK);_.cT=function pK(a){return mK(this,kC(a,93))};_.ud=function qK(){return this.b};_.eQ=function rK(a){return mC(a,93)&&kC(a,93).b==this.b};_.hC=function sK(){return qC(this.b)};_.vd=function tK(){return qC(this.b)};_.tS=function uK(){return IS+this.b};_.b=0;eJ(287,149,{89:1,96:1,99:1,101:1},wK);eJ(288,149,cS,yK,zK);eJ(289,149,cS,BK,CK);eJ(290,286,{89:1,92:1,97:1,98:1},FK);_.cT=function GK(a){return EK(this,kC(a,97))};_.ud=function HK(){return this.b};_.eQ=function IK(a){return mC(a,97)&&kC(a,97).b==this.b};_.hC=function JK(){return this.b};_.vd=function KK(){return this.b};_.tS=function OK(){return IS+this.b};_.b=0;var QK;eJ(294,149,cS,YK,ZK);var $K;eJ(296,1,{89:1,100:1},bL);_.tS=function cL(){return this.b+BT+this.d+'(Unknown Source'+(this.c>=0?xT+this.c:IS)+tS};_.b=null;_.c=0;_.d=null;_=String.prototype;_.cM={1:1,89:1,91:1,92:1};_.cA=function mL(a){return this.charCodeAt(a)};_.cT=function nL(a){return oL(this,kC(a,1))};_.eQ=function pL(a){return fL(this,a)};_.hC=function qL(){return yL(this)};_.lN=function rL(){return this.length};_.tS=_.toString;var tL,uL=0,vL;eJ(298,1,kS,HL);_.cA=function IL(a){return DL(this,a)};_.lN=function JL(){return this.b.b.length};_.tS=function KL(){return this.b.b};eJ(299,1,kS,PL,QL,RL);_.cA=function SL(a){return eL(this.b.b,a)};_.lN=function TL(){return this.b.b.length};_.tS=function UL(){return this.b.b};eJ(301,149,cS,YL,ZL);eJ(303,1,lS);_.Bc=function gM(){vM(this.Cc().b)};_.wd=function hM(a){return !!cM(this,a,false)};_.xd=function iM(a){var b,c,d;for(c=new dN(this.Cc().b);IN(c.b);){b=c.c=kC(JN(c.b),105);d=b.Cd();if(a==null?d==null:nb(a,d)){return true}}return false};_.eQ=function jM(a){return aM(this,a)};_.Dc=function kM(a){var b;b=cM(this,a,false);return !b?null:b.Cd()};_.hC=function lM(){return bM(this)};_.Ec=function mM(){return dM(this)};_.Fc=function nM(a,b){throw new ZL('Put not supported on this map')};_.Gc=function oM(a){var b;b=cM(this,a,true);return !b?null:b.Cd()};_.Hc=function pM(){return this.Cc().b.e};_.tS=function qM(){return eM(this)};_.Ic=function rM(){return fM(this)};eJ(302,303,lS);_.Bc=function NM(){vM(this)};_.wd=function OM(a){return xM(this,a)};_.xd=function PM(a){if(this.d&&this.yd(this.c,a)){return true}else if(yM(this,a)){return true}else if(wM(this,a)){return true}return false};_.Cc=function QM(){return new YM(this)};_.zd=function RM(a,b){return this.yd(a,b)};_.Dc=function SM(a){return zM(this,a)};_.Fc=function TM(a,b){return EM(this,a,b)};_.Gc=function UM(a){return IM(this,a)};_.Hc=function VM(){return this.e};_.b=null;_.c=null;_.d=false;_.e=0;_.f=null;eJ(304,254,hS,YM);_.sd=function ZM(a){return XM(this,a)};_.Mc=function $M(){return new dN(this.b)};_.Hc=function _M(){return this.b.e};_.b=null;eJ(305,1,{},dN);_.Rc=function eN(){return IN(this.b)};_.Sc=function fN(){return bN(this)};_.b=null;_.c=null;_.d=null;eJ(307,1,mS);_.eQ=function iN(a){var b;if(mC(a,105)){b=kC(a,105);if(AR(this.Bd(),b.Bd())&&AR(this.Cd(),b.Cd())){return true}}return false};_.hC=function jN(){var a,b;a=0;b=0;this.Bd()!=null&&(a=pb(this.Bd()));this.Cd()!=null&&(b=pb(this.Cd()));return a^b};_.tS=function kN(){return this.Bd()+DT+this.Cd()};eJ(306,307,mS,lN);_.Bd=function mN(){return null};_.Cd=function nN(){return this.b.c};_.Dd=function oN(a){return GM(this.b,a)};_.b=null;eJ(308,307,mS,qN);_.Bd=function rN(){return this.b};_.Cd=function sN(){return BM(this.c,this.b)};_.Dd=function tN(a){return HM(this.c,this.b,a)};_.b=null;_.c=null;eJ(309,255,nS);_.Ed=function wN(a,b){throw new ZL('Add not supported on this list')};_.Jc=function xN(a){this.Ed(this.Hc(),a);return true};_.eQ=function zN(a){var b,c,d,e,f;if(a===this){return true}if(!mC(a,103)){return false}f=kC(a,103);if(this.Hc()!=f.Hc()){return false}d=new LN(this);e=f.Mc();while(d.c<d.e.Hc()){b=JN(d);c=e.Sc();if(!(b==null?c==null:nb(b,c))){return false}}return true};_.hC=function AN(){var a,b,c;b=1;a=new LN(this);while(a.c<a.e.Hc()){c=JN(a);b=31*b+(c==null?0:pb(c));b=~~b}return b};_.Mc=function CN(){return new LN(this)};_.Nc=function DN(){return new PN(this,0)};_.Oc=function EN(a){return new PN(this,a)};_.Fd=function FN(a){throw new ZL('Remove not supported on this list')};_.Pc=function GN(a,b){return new TN(this,a,b)};eJ(310,1,{},LN);_.Rc=function MN(){return IN(this)};_.Sc=function NN(){return JN(this)};_.c=0;_.d=-1;_.e=null;eJ(311,310,{},PN);_.Gd=function QN(){return this.c>0};_.Hd=function RN(){if(this.c<=0){throw new zR}return this.b.Kc(this.d=--this.c)};_.b=null;eJ(312,309,nS,TN);_.Ed=function UN(a,b){yN(a,this.c+1);++this.c;this.d.Ed(this.b+a,b)};_.Kc=function VN(a){yN(a,this.c);return this.d.Kc(this.b+a)};_.Fd=function WN(a){var b;yN(a,this.c);b=this.d.Fd(this.b+a);--this.c;return b};_.Hc=function XN(){return this.c};_.b=0;_.c=0;_.d=null;eJ(313,254,hS,$N);_.sd=function _N(a){return this.b.wd(a)};_.Mc=function aO(){return ZN(this)};_.Hc=function bO(){return this.c.b.e};_.b=null;_.c=null;eJ(314,1,{},eO);_.Rc=function fO(){return IN(this.b.b)};_.Sc=function gO(){return dO(this)};_.b=null;eJ(315,255,{},jO);_.sd=function kO(a){return this.b.xd(a)};_.Mc=function lO(){return iO(this)};_.Hc=function mO(){return this.c.b.e};_.b=null;_.c=null;eJ(316,1,{},pO);_.Rc=function qO(){return IN(this.b.b)};_.Sc=function rO(){return oO(this)};_.b=null;eJ(317,309,oS,EO,FO,GO);_.Ed=function HO(a,b){uO(this,a,b)};_.Jc=function IO(a){return vO(this,a)};_.sd=function JO(a){return zO(this,a,0)!=-1};_.Kc=function KO(a){return yO(this,a)};_.Lc=function LO(){return this.c==0};_.Fd=function MO(a){return AO(this,a)};_.Hc=function OO(){return this.c};_.Qc=function SO(){return DO(this)};_.td=function TO(a){var b;a.length<this.c&&(a=$B(a,this.c));for(b=0;b<this.c;++b){cC(a,b,this.b[b])}a.length>this.c&&cC(a,this.c,null);return a};_.c=0;eJ(319,309,oS,$O);_.sd=function _O(a){return vN(this,a)!=-1};_.Kc=function aP(a){return yN(a,this.b.length),this.b[a]};_.Hc=function bP(){return this.b.length};_.Qc=function cP(){return YB(this.b)};_.td=function dP(a){var b,c;c=this.b.length;a.length<c&&(a=$B(a,c));for(b=0;b<c;++b){cC(a,b,this.b[b])}a.length>c&&cC(a,c,null);return a};_.b=null;var eP,fP;eJ(321,1,{},mP);_.tc=function nP(a,b){return lP(kC(a,92),kC(b,92))};eJ(322,309,oS,pP);_.sd=function qP(a){return false};_.Kc=function rP(a){throw new BK};_.Hc=function sP(){return 0};eJ(323,309,{89:1,103:1},uP);_.sd=function vP(a){return AR(this.b,a)};_.Kc=function wP(a){if(a==0){return this.b}else{throw new BK}};_.Hc=function xP(){return 1};_.b=null;eJ(324,1,{},zP);_.Jc=function AP(a){throw new YL};_.Mc=function BP(){return new GP(this.c.Mc())};_.Hc=function CP(){return this.c.Hc()};_.Qc=function DP(){return this.c.Qc()};_.tS=function EP(){return this.c.tS()};_.c=null;eJ(325,1,{},GP);_.Rc=function HP(){return this.c.Rc()};_.Sc=function IP(){return this.c.Sc()};_.c=null;eJ(326,324,nS,KP);_.eQ=function LP(a){return this.b.eQ(a)};_.Kc=function MP(a){return this.b.Kc(a)};_.hC=function NP(){return this.b.hC()};_.Lc=function OP(){return this.b.Lc()};_.Nc=function PP(){return new TP(this.b.Oc(0))};_.Oc=function QP(a){return new TP(this.b.Oc(a))};_.Pc=function RP(a,b){return new KP(this.b.Pc(a,b))};_.b=null;eJ(327,325,{},TP);_.Gd=function UP(){return this.b.Gd()};_.Hd=function VP(){return this.b.Hd()};_.b=null;eJ(328,1,lS,_P);_.Bc=function aQ(){throw new YL};_.Cc=function bQ(){return XP(this)};_.eQ=function cQ(a){return aM(this.d,a)};_.Dc=function dQ(a){return YP(this,a)};_.hC=function eQ(){return bM(this.d)};_.Ec=function fQ(){return ZP(this)};_.Fc=function gQ(a,b){throw new YL};_.Gc=function hQ(a){throw new YL};_.Hc=function iQ(){return this.d.e};_.tS=function jQ(){return eM(this.d)};_.Ic=function kQ(){return $P(this)};_.b=null;_.c=null;_.d=null;_.e=null;eJ(330,324,hS,nQ);_.eQ=function oQ(a){return this.c.eQ(a)};_.hC=function pQ(){return this.c.hC()};eJ(329,330,hS,sQ);_.Mc=function tQ(){return qQ(this)};_.Qc=function uQ(){var a;a=this.c.Qc();rQ(a,a.length);return a};eJ(331,1,{},wQ);_.Rc=function xQ(){return this.b.Rc()};_.Sc=function yQ(){return new AQ(kC(this.b.Sc(),105))};_.b=null;eJ(332,1,mS,AQ);_.eQ=function BQ(a){return this.b.eQ(a)};_.Bd=function CQ(){return this.b.Bd()};_.Cd=function DQ(){return this.b.Cd()};_.hC=function EQ(){return this.b.hC()};_.Dd=function FQ(a){throw new YL};_.tS=function GQ(){return this.b.tS()};_.b=null;eJ(333,326,{103:1,106:1},IQ);var JQ;eJ(335,1,{},MQ);_.tc=function NQ(a,b){return kC(a,92).cT(b)};eJ(336,1,{89:1,92:1,102:1},RQ);_.cT=function SQ(a){return PQ(this,kC(a,102))};_.eQ=function TQ(a){return mC(a,102)&&GI(HI(this.b.getTime()),HI(kC(a,102).b.getTime()))};_.hC=function UQ(){var a;a=HI(this.b.getTime());return UI(WI(a,RI(a,32)))};_.tS=function WQ(){var a,b,c;c=-this.b.getTimezoneOffset();a=(c>=0?'+':IS)+~~(c/60);b=(c<0?-c:c)%60<10?sT+(c<0?-c:c)%60:IS+(c<0?-c:c)%60;return (ZQ(),XQ)[this.b.getDay()]+CT+YQ[this.b.getMonth()]+CT+VQ(this.b.getDate())+CT+VQ(this.b.getHours())+xT+VQ(this.b.getMinutes())+xT+VQ(this.b.getSeconds())+' GMT'+a+b+CT+this.b.getFullYear()};_.b=null;var XQ,YQ;eJ(338,302,pS,_Q);_.yd=function aR(a,b){return pC(a)===pC(b)||a!=null&&nb(a,b)};_.Ad=function bR(a){return ~~pb(a)};eJ(339,254,{89:1,107:1},gR);_.Jc=function hR(a){return dR(this,a)};_.sd=function iR(a){return eR(this,a)};_.Lc=function jR(){return this.b.e==0};_.Mc=function kR(){return ZN(dM(this.b))};_.Hc=function lR(){return this.b.e};_.tS=function mR(){return rB(dM(this.b))};_.b=null;eJ(340,302,pS,oR);_.eQ=function pR(a){var b,c,d,e,f;if(a===this){return true}if(!mC(a,104)){return false}e=kC(a,104);if(this.e!=e.Hc()){return false}for(c=e.Cc().Mc();c.Rc();){b=kC(c.Sc(),105);d=b.Bd();f=b.Cd();if(!(d==null?this.d:mC(d,1)?DM(this,kC(d,1)):CM(this,d,Wy(d)))){return false}if(pC(f)!==pC(d==null?this.c:mC(d,1)?BM(this,kC(d,1)):AM(this,d,Wy(d)))){return false}}return true};_.yd=function qR(a,b){return pC(a)===pC(b)};_.Ad=function rR(a){return Wy(a)};_.hC=function sR(){var a,b,c;c=0;for(b=new dN((new YM(this)).b);IN(b.b);){a=b.c=kC(JN(b.b),105);c+=WL(a.Bd());c+=WL(a.Cd())}return c};eJ(341,307,mS,uR);_.Bd=function vR(){return this.b};_.Cd=function wR(){return this.c};_.Dd=function xR(a){var b;b=this.c;this.c=a;return b};_.b=null;_.c=null;eJ(342,149,cS,zR);eJ(345,1,{92:1,108:1,109:1});_.cT=function FR(a){return DR(this,kC(a,108))};_.eQ=function GR(a){return mC(a,109)&&GI(kC(a,109).b,this.b)};_.hC=function HR(){return ry(this.b)};_.b=dS;eJ(344,345,{89:1,92:1,108:1,109:1},JR);_.tS=function KR(){return IR(this.b)};var rS=Xy();var UG=aK(FT,'Object',1),YF=aK(GT,'JavaScriptObject$',12),HC=aK(HT,'EmbeddableApi$1',24),SH=_J(IS,'[I',351),hI=_J(IT,'Object;',349),$G=aK(FT,'Throwable',151),NG=aK(FT,'Exception',150),VG=aK(FT,'RuntimeException',149),WG=aK(FT,'StackTraceElement',296),iI=_J(IT,'StackTraceElement;',352),rG=aK(JT,'LongLibBase$LongEmul',267),fI=_J('[Lcom.google.gwt.lang.','LongLibBase$LongEmul;',353),sG=aK(JT,'SeedUtil',268),MG=aK(FT,'Enum',73),IG=aK(FT,'Boolean',282),TG=aK(FT,'Number',286),RH=_J(IS,'[C',354),KG=aK(FT,'Class',283),LG=aK(FT,'Double',285),RG=aK(FT,'Integer',290),gI=_J(IT,'Integer;',355),ZG=aK(FT,tT,2),JG=aK(FT,'ClassCastException',284),YG=aK(FT,'StringBuilder',299),HG=aK(FT,'ArrayStoreException',281),XF=aK(GT,'JavaScriptException',219),jI=_J(IT,'String;',350),GG=aK(FT,'ArithmeticException',280),aG=aK(KT,'StringBufferImpl',231),UC=aK(HT,'GwtDocumentBridge',26),LC=aK(HT,'GwtDocumentBridge$1',27),jD=aK(LT,'ModelAdapter',10),MC=aK(HT,'GwtDocumentBridge$2',31),NC=aK(HT,'GwtDocumentBridge$3',32),OC=aK(HT,'GwtDocumentBridge$4',33),PC=aK(HT,'GwtDocumentBridge$5',34),QC=aK(HT,'GwtDocumentBridge$6',35),RC=aK(HT,'GwtDocumentBridge$7',36),SC=aK(HT,'GwtDocumentBridge$8',37),TC=aK(HT,'GwtDocumentBridge$9',38),IC=aK(HT,'GwtDocumentBridge$10',28),JC=aK(HT,'GwtDocumentBridge$11',29),KC=aK(HT,'GwtDocumentBridge$12',30),_F=aK(KT,'StringBufferImplAppend',232),ZF=aK(GT,'Scheduler',224),$F=aK(KT,'SchedulerImpl',226),SG=aK(FT,'NullPointerException',294),OG=aK(FT,'IllegalArgumentException',287),pH=aK(MT,'AbstractMap',303),fH=aK(MT,'AbstractHashMap',302),LH=aK(MT,'IdentityHashMap',340),aH=aK(MT,'AbstractCollection',255),qH=aK(MT,'AbstractSet',254),cH=aK(MT,'AbstractHashMap$EntrySet',304),bH=aK(MT,'AbstractHashMap$EntrySetIterator',305),oH=aK(MT,'AbstractMapEntry',307),dH=aK(MT,'AbstractHashMap$MapEntryNull',306),eH=aK(MT,'AbstractHashMap$MapEntryString',308),lH=aK(MT,'AbstractMap$1',313),kH=aK(MT,'AbstractMap$1$1',314),nH=aK(MT,'AbstractMap$2',315),mH=aK(MT,'AbstractMap$2$1',316),KH=aK(MT,'HashSet',339),JH=aK(MT,'HashMap',338),tC=aK(NT,'ApplicationConfigBuilder',3),sC=aK(NT,'ApplicationConfigBuilder$1',4),yC=aK(NT,'ApplicationManager',5),uC=aK(NT,'ApplicationManager$1',6),vC=aK(NT,'ApplicationManager$2',7),wC=aK(NT,'ApplicationManager$3',8),xC=aK(NT,'ApplicationManager$4',9),VD=aK(OT,'DefaultObjectFactory',21),GC=aK(HT,'CustomMapsObjectFactory',20),FC=aK(HT,'CustomMapsObjectFactory$CustomMapCreator',22),_G=aK(FT,'UnsupportedOperationException',301),XG=aK(FT,'StringBuffer',298),aD=aK(PT,'JsonMutationSerializer',47),_C=aK(PT,'JsonMutationSerializer$StandardJsonSerializer',48),VC=aK('com.google.apps.brix.api.client.json.','ClientJsonDriver',39),vE=aK(QT,'DefaultTransformer',122),EF=aK(RT,'AbstractCommand',107),gE=aK(ST,'AbstractMutation',106),hE=aK(ST,'AbstractObjectMutation',105),fE=aK(ST,'AbstractInsertMutation',108),nE=aK(ST,'InsertMutation',114),eE=aK(ST,'AbstractDeleteMutation',104),jE=aK(ST,'DeleteMutation',110),sE=aK(ST,'UpdateMutation',120),rE=aK(ST,'SetMutation',119),mE=aK(ST,'IndexMutation',113),pE=aK(ST,'InverseInsertMutation',116),oE=aK(ST,'InverseDeleteMutation',115),kE=aK(ST,'DestroyMutation',111),iE=aK(ST,'CreateMutation',109),FF=cK(RT,'Command'),uE=aK(QT,'DefaultTransformer$1',123),TD=aK(OT,'DefaultEncodableValueFactory',90),jH=aK(MT,'AbstractList',309),uH=aK(MT,'Collections$EmptyList',322),vH=aK(MT,'Collections$SingletonList',323),xH=aK(MT,'Collections$UnmodifiableCollection',324),zH=aK(MT,'Collections$UnmodifiableList',326),DH=aK(MT,'Collections$UnmodifiableMap',328),FH=aK(MT,'Collections$UnmodifiableSet',330),CH=aK(MT,'Collections$UnmodifiableMap$UnmodifiableEntrySet',329),BH=aK(MT,'Collections$UnmodifiableMap$UnmodifiableEntrySet$UnmodifiableEntry',332),EH=aK(MT,'Collections$UnmodifiableRandomAccessList',333),wH=aK(MT,'Collections$UnmodifiableCollectionIterator',325),yH=aK(MT,'Collections$UnmodifiableListIterator',327),AH=aK(MT,'Collections$UnmodifiableMap$UnmodifiableEntrySet$1',331),tH=aK(MT,'Collections$1',321),gH=aK(MT,'AbstractList$IteratorImpl',310),hH=aK(MT,'AbstractList$ListIteratorImpl',311),iH=aK(MT,'AbstractList$SubList',312),PF=aK(TT,'OtProtocolManager',201),OF=aK(TT,'OtProtocolManager$PayloadData',206),LF=aK(TT,'OtProtocolManager$1',202),uG=aK(UT,'Timer',204),MF=aK(TT,'OtProtocolManager$2',203),NF=aK(TT,'OtProtocolManager$3',205),tG=aK(UT,'Timer$1',272),EC=aK(VT,'CollaboratorManager',15),AC=aK(VT,'CollaboratorManager$1',16),BC=aK(VT,'CollaboratorManager$2',17),CC=aK(VT,'CollaboratorManager$3',18),DC=aK(VT,'CollaboratorManager$4',19),aE=aK(OT,'ModelImpl',98),_D=aK(OT,'ModelImpl$1',99),$D=aK(OT,'ModelConfigBuilder',96),ZD=aK(OT,'ModelConfigBuilder$1',97),HF=aK(TT,'AbstractNetworkDriver',42),$C=aK(WT,'RpcServiceBasedNetworkDriver',41),XC=aK(WT,'RpcServiceBasedNetworkDriver$1',43),YC=aK(WT,'RpcServiceBasedNetworkDriver$2',44),ZC=aK(WT,'RpcServiceBasedNetworkDriver$3',45),VF=aK(XT,'TransformationManager',212),rH=aK(MT,'ArrayList',317),qG=aK(YT,'JSONValue',247),lG=aK(YT,'JSONNull',250),NH=aK(MT,'MapEntryImpl',341),HE=aK(QT,'InsertVsInsertTransform',135),wE=aK(QT,'DeleteVsDeleteTransform',124),LE=aK(QT,'UpdateVsUpdateTransform',139),KE=aK(QT,'SetVsSetTransform',138),EE=aK(QT,'IndexVsIndexTransform',132),yE=aK(QT,'DeleteVsSetTransform',126),IE=aK(QT,'InsertVsSetTransform',136),FE=aK(QT,'InsertVsDeleteTransform',133),DE=aK(QT,'DestroyVsUpdateTransform',131),BE=aK(QT,'DestroyVsInsertTransform',129),AE=aK(QT,'DestroyVsDeleteTransform',128),CE=aK(QT,'DestroyVsSetTransform',130),GE=aK(QT,'InsertVsIndexTransform',134),xE=aK(QT,'DeleteVsIndexTransform',125),zE=aK(QT,'DestroyVsCreateTransform',127),tE=aK(QT,'CreateVsDestroyTransform',121),JE=aK(QT,'MultiVsAnyTransform',137),cD=cK(LT,'CollaborativeMap'),SD=aK(OT,'CycleSafeCollaborativeObject',67),wD=aK(OT,'AbstractCollaborativeObject',66),AD=aK(OT,'BaseCollaborativeMapImpl',71),JD=aK(OT,'CollaborativeMapImpl',81),bD=cK(LT,'CollaborativeList'),ID=aK(OT,'CollaborativeListImpl',79),eD=cK(LT,'CollaborativeString'),LD=aK(OT,'CollaborativeStringImpl',83),dD=cK(LT,'CollaborativeRange'),hD=cK(LT,ZS),GD=bK(OT,'BuiltInCollaborativeType',72,MG,Zi),TH=_J('[Lcom.google.apps.brix.api.shared.cds.model.impl.','BuiltInCollaborativeType;',356),BD=aK(OT,'BuiltInCollaborativeType$1',74),CD=aK(OT,'BuiltInCollaborativeType$2',75),DD=aK(OT,'BuiltInCollaborativeType$3',76),ED=aK(OT,'BuiltInCollaborativeType$4',77),FD=aK(OT,'BuiltInCollaborativeType$5',78),XD=aK(OT,'LenientTypeNamesObjectFactory',94),WD=aK(OT,'DefaultObjectHolderFactory',92),iD=aK(LT,'JsonValue',51),gD=aK(LT,'IndexReference$1',50),CF=bK(ZT,'InteractionMode',189,MG,qw),eI=_J('[Lcom.google.apps.brix.api.shared.util.','InteractionMode;',357),sH=aK(MT,'Arrays$ArrayList',319),RD=aK(OT,'CycleSafeCollaborativeObject$CycleSafeValueGenerator',87),QD=aK(OT,'CycleSafeCollaborativeObject$CycleSafeValueGenerator$CollaborativeObjectIdentity',89),OD=aK(OT,'CycleSafeCollaborativeObject$CycleSafeHashcodeGenerator',86),PD=aK(OT,'CycleSafeCollaborativeObject$CycleSafeStringGenerator',88),ND=aK(OT,'CycleSafeCollaborativeObject$CycleSafeEqualityChecker',84),MD=aK(OT,'CycleSafeCollaborativeObject$CycleSafeEqualityChecker$CollaborativeObjectPair',85),HD=aK(OT,'CollaborativeListImpl$1',80),kD=aK(LT,'MutationMetadata$1',53),fG=aK($T,'HandlerManager',239),AG=aK(_T,'EventBus',242),EG=aK(_T,'SimpleEventBus',241),eG=aK($T,'HandlerManager$Bus',240),CG=aK(_T,'SimpleEventBus$1',278),DG=aK(_T,'SimpleEventBus$2',279),BG=aK(_T,'Event',199),dG=aK($T,'GwtEvent',198),QF=aK(TT,'PayloadReceivedEvent',207),zG=aK(_T,'Event$Type',238),cG=aK($T,'GwtEvent$Type',237),oG=aK(YT,'JSONObject',252),nG=aK(YT,'JSONObject$1',253),QG=aK(FT,'IndexOutOfBoundsException',289),JF=aK(TT,'MutationsPendingStatusEvent',197),vG=aK(UT,'Window$ClosingEvent',274),wG=aK(UT,'Window$WindowHandlers',275),GH=aK(MT,'Comparators$1',335),qE=aK(ST,'MultiMutation',117),gG=aK($T,'LegacyHandlerWrapper',243),dE=aK(OT,'TypedCollaborativeMap',103),YD=aK(OT,'LocalMutationMetadata',95),iG=aK(YT,'JSONArray',246),yG=aK(aU,'WindowImpl',276),xG=aK(aU,'WindowImplMozilla',277),PG=aK(FT,'IllegalStateException',288),OH=aK(MT,'NoSuchElementException',342),GF=aK(RT,'NullCommand',195),IH=aK(MT,'EventObject',56),mD=aK(bU,'AbstractModelEvent',55),nD=aK(bU,'CollaborativeObjectChangeEvent',57),zC=aK(VT,'CollaboratorImpl',14),pG=aK(YT,'JSONString',257),jG=aK(YT,'JSONBoolean',248),IF=aK(TT,'ChangeMessage',196),zD=aK(OT,'AbstractDelegatingObject',69),yD=aK(OT,'AbstractCustomCollaborativeObject',68),KD=aK(OT,'CollaborativeRangeImpl',82),xD=aK(OT,'AbstractCustomCollaborativeObject$1',70),UD=aK(OT,'DefaultIndexReference',91),HH=aK(MT,'Date',336),bG=aK('com.google.gwt.event.logical.shared.','CloseEvent',236),sD=aK(bU,'ValueChangedEvent',62),kG=aK(YT,'JSONException',249),mG=aK(YT,'JSONNumber',251),FG=aK(_T,cU,245),hG=aK($T,cU,244),lD=aK(LT,'PrimitiveValue',54),lE=aK(ST,'EncodedValue',112),vD=aK(bU,'ValuesSetEvent',65),tD=aK(bU,'ValuesAddedEvent',63),uD=aK(bU,'ValuesRemovedEvent',64),cE=aK(OT,'StringDiff$DiffCommandBuffer',102),rD=aK(bU,'TextInsertedEvent',61),qD=aK(bU,'TextDeletedEvent',60),pD=aK(bU,'ReferenceShiftedEvent',59),fD=aK(LT,'DefaultObjectReference',49),RF=aK(dU,'JsonToMutationIterable',208),PE=aK(eU,'UndoManager',142),OE=aK(eU,'UndoManager$1',143),WC=aK(WT,'DocumentInitialLoadResultImpl',40),oD=aK(bU,'FieldChangeEvent',58),KF=aK(TT,'MutationsReceivedEvent',200),NE=aK(eU,'MutationInverterImpl',141),SF=aK(dU,'JsonToMutationIterator',209),QH=aK('org.joda.time.base.','AbstractInstant',345),PH=aK('org.joda.time.','Instant',344),TF=aK(dU,'MutationToJsonIterable',210),ME=aK(eU,'CollaboratorMutation',140),UE=bK(fU,'SerializedType',152,MG,Lr),UH=_J('[Lcom.google.apps.brix.api.shared.serialization.','SerializedType;',358),WF=aK(XT,'TransformationResult',213),VE=aK(fU,'ValueCodec',146),zF=aK(gU,'UnpackedListCodec',185),WE=aK(fU,'WrapperCodec',154),tF=aK(gU,'PackedPrimitiveStringListCodec',179),$E=aK(gU,'DefaultObjectReferenceCodec',158),uF=aK(gU,'PrimitiveValueCodec',180),RE=aK(fU,'FieldCodec',145),rF=aK(gU,'MultiMutationCodec',176),MH=cK(MT,YS),qF=bK(gU,'MultiMutationCodec$Field',177,MG,Yu),bI=_J(hU,'MultiMutationCodec$Field;',359),jF=aK(gU,'InsertMutationCodec',168),iF=bK(gU,'InsertMutationCodec$Field',169,MG,Yt),$H=_J(hU,'InsertMutationCodec$Field;',360),aF=aK(gU,'DeleteMutationCodec',159),_E=bK(gU,'DeleteMutationCodec$Field',160,MG,Ps),WH=_J(hU,'DeleteMutationCodec$Field;',361),ZE=aK(gU,'CreateMutationCodec',156),YE=bK(gU,'CreateMutationCodec$Field',157,MG,ws),VH=_J(hU,'CreateMutationCodec$Field;',362),BF=aK(gU,'UpdateMutationCodec',186),AF=bK(gU,'UpdateMutationCodec$Field',187,MG,iw),dI=_J(hU,'UpdateMutationCodec$Field;',363),sF=aK(gU,'NullMutationCodec',178),cF=aK(gU,'DestroyMutationCodec',161),bF=bK(gU,'DestroyMutationCodec$Field',162,MG,at),XH=_J(hU,'DestroyMutationCodec$Field;',364),xF=aK(gU,'SetMutationCodec',182),wF=bK(gU,'SetMutationCodec$Field',183,MG,Jv),cI=_J(hU,'SetMutationCodec$Field;',365),fF=aK(gU,'EncodedValueCodec',164),eF=bK(gU,'EncodedValueCodec$Field',165,MG,st),YH=_J(hU,'EncodedValueCodec$Field;',366),SE=aK(fU,'PrimitiveCodec',147),kF=aK(gU,'IntegerCodec',170),dF=aK(gU,'DoubleCodec',163),yF=aK(gU,'StringCodec',184),XE=aK(gU,'BooleanCodec',155),oF=aK(gU,'InverseInsertMutationCodec',173),nF=bK(gU,'InverseInsertMutationCodec$Field',174,MG,Fu),aI=_J(hU,'InverseInsertMutationCodec$Field;',367),mF=aK(gU,'InverseDeleteMutationCodec',171),lF=bK(gU,'InverseDeleteMutationCodec$Field',172,MG,qu),_H=_J(hU,'InverseDeleteMutationCodec$Field;',368),pF=aK(gU,'JsonValueCodec',175),QE=aK(fU,'DelegatingCodec',144),vF=aK(gU,'PrimitiveValueJsonCodec',181),hF=aK(gU,'IndexMutationCodec',166),gF=bK(gU,'IndexMutationCodec$Field',167,MG,Jt),ZH=_J(hU,'IndexMutationCodec$Field;',369),TE=aK(fU,'SerializationException',148),DF=aK(ZT,'Pair',191),UF=aK(dU,'MutationToJsonIterator',211),bE=aK(OT,'MutationMetadataImpl',100);if (jsapi_pretty) jsapi_pretty.onScriptLoad(gwtOnLoad);})();"));
    //window.document.head.appendChild(zi);
    if (jsapi_pretty) jsapi_pretty.onScriptLoad(gwtOnLoad);
    var yi = window.gapi.drive.realtime.gwt.loadInternal_;
    var Ai = m,
        Bi = function ()
        {
            (!window.gapi || !window.gapi.auth || !window.gapi.auth.getToken) && g(Error("Authentication library not available. Please call gapi.load(\u2018auth\u2019, initFn);"));
            var a = window.gapi.auth.getToken();
            (!a || !a.access_token) && g(Error("Authentication error: No token set"));
            return a.access_token
        }, Ci = function ()
        {
            return Ai ? Ai : "https://drive.google.com/otservice"
        };
    w("gapi.drive.realtime.setServerAddress", function (a)
    {
        a && 0 < a.length ? ("/" == a.slice(a.length - 1) && (a = a.slice(0, a.length - 1)), Ai = a) : Ai = m
    });
    w("gapi.drive.realtime.getDocsServer_", Ci);
    w("gapi.drive.realtime.load", function (a, b, c, d)
    {
        M && !(M && 10 <= vc) && (le = new xi, re = function ()
        {
            return l
        });
        var e = function (a)
        {
            window.console.error("Drive Realtime API Error: " + a.type + ": " + a.message);
            d && d(a)
        }, f = m,
            f = new Ih(a, Ci(), Bi);
        Wh(f.H(), e);
        Bi();
        yi(a, function (a)
        {
            di();
            a = new ui(a);
            var d = new qi(a, f, e),
                A = d.rc();
            if (a.a.isInitialized()) b(d);
            else
            {
                oi(A);
                A.a.a.createRoot();
                c && c(A);
                A.g();
                var F = function (a)
                {
                    !a.qc && !a.pc && (d.removeEventListener("document_save_state_changed", F), b(d))
                };
                d.addEventListener("document_save_state_changed",
                    F)
            }
        }, f, Object.keys(Xh) || [])
    });
})()