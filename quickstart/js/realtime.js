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
    if (jsapi_pretty) jsapi_pretty.onScriptLoad(gwtOnLoad);
    var yi = window.gapi.drive.realtime.gwt.loadInternal_;
    var Ai = m,
        getAccessToken = function ()
        {
            (!window.gapi || !window.gapi.auth || !window.gapi.auth.getToken) && g(Error("Authentication library not available. Please call gapi.load(\u2018auth\u2019, initFn);"));
            var a = window.gapi.auth.getToken();
            (!a || !a.access_token) && g(Error("Authentication error: No token set"));
            window.console.log("OAuth access token: " + a.access_token);
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
    //fileId, this.onFileLoaded, this.initializeModel, handleErrors
    w("gapi.drive.realtime.load", function (fileId, onFileLoaded, initializeModel, handleErrors)
    {
        M && !(M && 10 <= vc) && (le = new xi, re = function ()
        {
            return l
        });
        var e = function (err)
        {
            window.console.error("Drive Realtime API Error: " + err.type + ": " + err.message);
            handleErrors && handleErrors(err)
        }, f = m,
            f = new Ih(fileId, Ci(), getAccessToken);
        Wh(f.H(), e);
        getAccessToken();
        yi(fileId, function (a)
        {
            di();
            a = new ui(a);
            var d = new qi(a, f, e);
            var A = d.rc();
            if (a.a.isInitialized()) onFileLoaded(d);
            else
            {
                oi(A);
                A.a.a.createRoot();
                initializeModel && initializeModel(A);
                A.g();
                var F = function (a)
                {
                    !a.qc && !a.pc && (d.removeEventListener("document_save_state_changed", F), onFileLoaded(d))
                };
                d.addEventListener("document_save_state_changed", F)
            }
        }, f, Object.keys(Xh) || [])
    });
})()