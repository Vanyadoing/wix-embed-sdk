var N = Object.defineProperty;
var J = (e, n, t) => n in e ? N(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var W = (e, n, t) => J(e, typeof n != "symbol" ? n + "" : n, t);
function B() {
  let e = null, n = null;
  return {
    promise: new Promise((o, i) => {
      e = o, n = i;
    }),
    resolve: e,
    reject: n
  };
}
const V = (e) => {
  let {
    createHost: n
  } = e;
  return {
    __type: "host",
    create: (t) => ({}),
    host: (t) => {
      var o, i;
      const {
        applicationId: r
      } = t ?? {}, c = typeof window < "u" ? window.wixEmbedsAPI : void 0, s = n(t), f = K();
      return {
        ...s,
        apiBaseUrl: f,
        getMonitoringClient: c == null || c.getMonitoringClientFunction == null ? void 0 : c.getMonitoringClientFunction(r),
        essentials: {
          language: typeof window < "u" ? (o = window.commonConfig) == null ? void 0 : o.language : void 0,
          locale: typeof window < "u" ? (i = window.commonConfig) == null ? void 0 : i.locale : void 0
        }
      };
    },
    auth: (t) => {
      const o = typeof window < "u" ? window.wixEmbedsAPI : void 0;
      t || (t = o == null || o.getAccessTokenFunction == null ? void 0 : o.getAccessTokenFunction());
      let i = !1;
      const {
        resolve: r,
        promise: c
      } = B();
      return {
        getAuthHeaders: async () => {
          if (!t && i && (t = await c), !t)
            throw new Error("Failed to resolve auth token");
          return {
            headers: {
              Authorization: await t()
            }
          };
        },
        getAccessTokenInjector: () => (i = !0, (s) => {
          r(s);
        })
      };
    }
  };
};
function K() {
  const e = typeof window < "u" ? window.wixEmbedsAPI : void 0, n = e == null || e.getExternalBaseUrl == null ? void 0 : e.getExternalBaseUrl();
  if (!n)
    return;
  const t = new URL(n);
  return t != null && t.pathname && t.pathname !== "/" ? "" + t.hostname + t.pathname : t.hostname;
}
const G = (e) => {
  let {
    clientSdk: n,
    applicationId: t
  } = e;
  return {
    invoke: async (o) => {
      let {
        namespace: i,
        method: r,
        args: c
      } = o;
      if (!n)
        throw new Error("Wix Site SDK only works in a Wix site environment. Learn more: https://dev.wix.com/docs/sdk/host-modules/site/introduction");
      return n.invoke({
        namespace: i,
        method: r,
        args: c,
        applicationId: t,
        accessToken: "accessToken"
      });
    },
    getAccessToken: () => {
      throw new Error("Not implemented");
    },
    observeState: () => ({
      disconnect: () => {
      }
    })
  };
}, F = function(e) {
  const n = typeof $wixContext < "u" && $wixContext.clientSdk || (e == null ? void 0 : e.clientSdk) || window.clientSdk, {
    applicationId: t
  } = e || {};
  if (!t)
    throw new Error('"createHost" was called without a required field "applicationId"');
  return {
    // environment: {},
    channel: G({
      clientSdk: n,
      applicationId: t
    }),
    close: () => {
    }
  };
}, X = V({
  createHost: F
});
var g = {};
const Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wixContext: g
}, Symbol.toStringTag, { value: "Module" }));
function A(e, n = !1, t = (o) => o) {
  return () => ({
    __type: "event-definition",
    type: e,
    isDomainEvent: n,
    transformations: t
  });
}
function Q(e, n) {
  return {
    __type: "service-plugin-definition",
    componentType: e,
    methods: n
  };
}
var D = "wix_spi_error";
const Z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventDefinition: A,
  SERVICE_PLUGIN_ERROR_TYPE: D,
  ServicePluginDefinition: Q
}, Symbol.toStringTag, { value: "Module" })), ee = (e) => {
  switch (e) {
    case "get":
    case "GET":
      return "GET";
    case "post":
    case "POST":
      return "POST";
    case "put":
    case "PUT":
      return "PUT";
    case "delete":
    case "DELETE":
      return "DELETE";
    case "patch":
    case "PATCH":
      return "PATCH";
    case "head":
    case "HEAD":
      return "HEAD";
    case "options":
    case "OPTIONS":
      return "OPTIONS";
    default:
      throw new Error(`Unknown method: ${e}`);
  }
}, te = (e) => (n) => async (t) => {
  let o;
  const i = (r) => {
    if (o = e(t)(r), o.url === void 0)
      throw new Error("Url was not successfully created for this request, please reach out to support channels for assistance.");
    const { method: c, url: s, params: f } = o;
    return {
      ...o,
      method: ee(c),
      url: s,
      data: o.data,
      params: f
    };
  };
  try {
    const r = await n.request(i);
    if (o === void 0)
      throw new Error("Request options were not created for this request, please reach out to support channels for assistance.");
    const c = Array.isArray(o.transformResponse) ? o.transformResponse : [o.transformResponse];
    let s = r.data;
    return c.forEach((f) => {
      f && (s = f(r.data, r.headers));
    }), s;
  } catch (r) {
    throw typeof r == "object" && r !== null && "response" in r && typeof r.response == "object" && r.response !== null && "data" in r.response ? r.response.data : r;
  }
}, ne = (e) => e.__isAmbassador ? !0 : !!e().__isAmbassador, oe = "__metadata", C = "www.wixapis.com", ie = "edge.wixapis.com";
class re extends Error {
  constructor(t, o) {
    super(t);
    W(this, "message");
    W(this, "response");
    this.message = t, this.response = o;
  }
  async details() {
    const t = await this.response.json();
    return se(this.response.status, t == null ? void 0 : t.message, t == null ? void 0 : t.details, {
      requestId: this.response.headers.get("X-Wix-Request-Id"),
      details: t
    });
  }
}
const se = (e, n, t, o) => ({
  details: {
    ...!(t != null && t.validationError) && {
      applicationError: {
        description: n,
        code: e,
        data: o
      }
    },
    ...t
  },
  message: n,
  requestId: o == null ? void 0 : o.requestId
}), ae = (e) => e != null && e.method && ["post", "put", "patch"].includes(e.method.toLocaleLowerCase()) && e.body ? { "Content-Type": "application/json" } : {}, le = (e) => e && typeof e == "object" && !Array.isArray(e), ce = (e) => e.__type === "host";
function ue(e, n) {
  return e.create(n);
}
const de = "x-wix-bi-gateway";
function fe(e, n, t) {
  return {
    [de]: pe({
      environment: `js-sdk${t ? `-${t}` : ""}`,
      "package-name": e.packageName ?? (n == null ? void 0 : n.PACKAGE_NAME),
      "method-fqn": e.methodFqn,
      entity: e.entityFqdn
    })
  };
}
function pe(e) {
  return Object.entries(e).filter(([n, t]) => !!t).map(([n, t]) => `${n}=${t}`).join(",");
}
function R(e) {
  const n = globalThis.__wix_context__, t = {
    client: g.client,
    elevatedClient: g.elevatedClient
  };
  let o;
  globalThis.__wix_context__ = void 0, g.client = void 0, g.elevatedClient = void 0, typeof $wixContext < "u" && (o = {
    client: $wixContext == null ? void 0 : $wixContext.client,
    elevatedClient: $wixContext == null ? void 0 : $wixContext.elevatedClient
  }, delete $wixContext.client, delete $wixContext.elevatedClient);
  try {
    return e();
  } finally {
    globalThis.__wix_context__ = n, g.client = t.client, g.elevatedClient = t.elevatedClient, typeof $wixContext < "u" && ($wixContext.client = o.client, $wixContext.elevatedClient = o.elevatedClient);
  }
}
function he(e, n, t, o, i, r, c, s) {
  return R(() => e({
    request: async (f) => {
      var a, l;
      const x = f({
        host: (r == null ? void 0 : r.HTTPHost) || C
      });
      let u = x;
      u.method === "GET" && ((a = u.fallback) != null && a.length) && u.params.toString().length > 4e3 && (u = x.fallback[0]);
      const p = (r == null ? void 0 : r.HTTPHost) ?? C;
      let d = `https://${s ? ie : p}${u.url}`;
      u.params && u.params.toString() && (d += `?${u.params.toString()}`);
      try {
        const h = fe(x, n, c), _ = await t(d, {
          method: u.method,
          ...u.data && {
            body: JSON.stringify(u.data)
          },
          headers: {
            ...h
          }
        });
        if (_.status !== 200) {
          let w = null;
          try {
            w = await _.json();
          } catch {
          }
          throw xe(_.status, w == null ? void 0 : w.message, w == null ? void 0 : w.details, {
            requestId: _.headers.get("X-Wix-Request-Id"),
            details: w
          });
        }
        return {
          data: await _.json(),
          headers: _.headers,
          status: _.status,
          statusText: _.statusText
        };
      } catch (h) {
        throw (l = h.message) != null && l.includes("fetch is not defined") && console.error("Node.js v18+ is required"), h;
      }
    },
    fetchWithAuth: t,
    wixAPIFetch: o,
    getActiveToken: i
  }));
}
const xe = (e, n, t, o) => ({
  response: {
    data: {
      details: {
        ...!(t != null && t.validationError) && {
          applicationError: {
            description: n,
            code: e,
            data: o
          }
        },
        ...t
      },
      message: n
    },
    status: e
  },
  requestId: o == null ? void 0 : o.requestId
});
function U() {
  return {
    emit(e, ...n) {
      for (let t = 0, o = this.events[e] || [], i = o.length; t < i; t++)
        o[t](...n);
    },
    events: {},
    on(e, n) {
      var t;
      return ((t = this.events)[e] || (t[e] = [])).push(n), () => {
        var o;
        this.events[e] = (o = this.events[e]) == null ? void 0 : o.filter((i) => n !== i);
      };
    }
  };
}
const we = (e) => e.__type === "event-definition";
function H(e, n, t, o) {
  let i;
  if (e.isDomainEvent) {
    const c = t, { deletedEvent: s, actionEvent: f, createdEvent: x, updatedEvent: u, ...p } = c, d = {
      ...o,
      ...p
    };
    s ? s != null && s.deletedEntity ? i = {
      entity: s == null ? void 0 : s.deletedEntity,
      metadata: d
    } : i = { metadata: d } : f ? i = {
      data: f.body,
      metadata: d
    } : i = {
      entity: (x == null ? void 0 : x.entity) ?? (u == null ? void 0 : u.currentEntity),
      metadata: d
    };
  } else
    i = {
      data: t,
      metadata: o
    };
  const r = e.transformations ?? ((c) => c);
  return n(r(i));
}
function _e(e) {
  const n = /* @__PURE__ */ new Map(), t = U(), o = {
    ...t,
    getRegisteredEvents: () => n,
    async process(i, r = {
      expectedEvents: []
    }) {
      const { eventType: c, identity: s, instanceId: f, payload: x } = await this.parseJWT(i), u = [
        ...r.expectedEvents,
        ...Array.from(n.keys()).map((d) => ({ type: d }))
      ];
      if (u.length > 0 && !u.some(({ type: d }) => d === c))
        throw new Error(`Unexpected event type: ${c}. Expected one of: ${u.map((d) => d.type).join(", ")}`);
      const p = n.get(c) ?? [];
      return await Promise.all(p.map(({ eventDefinition: d, handler: a }) => H(d, a, x, {
        instanceId: f,
        identity: s
      }))), {
        instanceId: f,
        eventType: c,
        payload: x,
        identity: s
      };
    },
    async processRequest(i, r) {
      const c = await i.text();
      return this.process(c, r);
    },
    async parseJWT(i) {
      if (!e.decodeJWT)
        throw new Error("decodeJWT is not supported by the authentication strategy");
      const { decoded: r, valid: c } = await e.decodeJWT(i);
      if (!c)
        throw new Error("JWT is not valid");
      if (typeof r.data != "string")
        throw new Error(`Unexpected type of JWT data: expected string, got ${typeof r.data}`);
      const s = JSON.parse(r.data), f = s.eventType, x = s.instanceId, u = s.identity ? JSON.parse(s.identity) : void 0, p = JSON.parse(s.data);
      return {
        instanceId: x,
        eventType: f,
        payload: p,
        identity: u
      };
    },
    async parseRequest(i) {
      const r = await i.text();
      return this.parseJWT(r);
    },
    async executeHandlers(i) {
      const r = Array.from(n.keys()).map((s) => ({ type: s }));
      if (r.length > 0 && !r.some(({ type: s }) => s === i.eventType))
        throw new Error(`Unexpected event type: ${i.eventType}. Expected one of: ${r.map((s) => s.type).join(", ")}`);
      const c = n.get(i.eventType) ?? [];
      await Promise.all(c.map(({ eventDefinition: s, handler: f }) => H(s, f, i.payload, {
        instanceId: i.instanceId,
        identity: i.identity
      })));
    },
    apps: {
      AppInstalled: A("AppInstalled")(),
      AppRemoved: A("AppRemoved")()
    }
  };
  return {
    initModule(i) {
      return (r) => {
        const c = n.get(i.type) ?? [];
        c.push({ eventDefinition: i, handler: r }), n.set(i.type, c), t.emit("registered", i);
      };
    },
    client: o
  };
}
const ye = (e) => e.__type === "service-plugin-definition";
function me(e) {
  const n = /* @__PURE__ */ new Map(), t = U(), o = {
    ...t,
    getRegisteredServicePlugins: () => n,
    async parseJWT(i) {
      if (!e.decodeJWT)
        throw new Error("decodeJWT is not supported by the authentication strategy");
      const { decoded: r, valid: c } = await e.decodeJWT(i, !0);
      if (!c)
        throw new Error("JWT is not valid");
      if (typeof r.data != "object" || r.data === null || !("metadata" in r.data) || typeof r.data.metadata != "object" || r.data.metadata === null || !("appExtensionType" in r.data.metadata) || typeof r.data.metadata.appExtensionType != "string")
        throw new Error("Unexpected JWT data: expected object with metadata.appExtensionType string");
      return r.data;
    },
    async process(i) {
      const r = await this.parseJWT(i.body);
      return this.executeHandler(r, i.url);
    },
    async parseRequest(i) {
      const r = await i.text();
      return this.parseJWT(r);
    },
    async processRequest(i) {
      const r = i.url, c = await i.text();
      try {
        const s = await this.process({ url: r, body: c });
        return Response.json(s);
      } catch (s) {
        if (s.errorType === "SPI" && s.applicationCode && s.httpCode)
          return Response.json({ applicationError: { code: s.applicationCode, data: s.data } }, { status: s.httpCode });
        throw s;
      }
    },
    async executeHandler(i, r) {
      const c = i.metadata.appExtensionType.toLowerCase(), s = n.get(c) ?? [];
      if (s.length === 0)
        throw new Error(`No service plugin implementations found for component type ${c}`);
      if (s.length > 1)
        throw new Error(`Multiple service plugin implementations found for component type ${c}. This is currently not supported`);
      const { implementation: f, servicePluginDefinition: x } = s[0], u = x.methods.find((d) => r.endsWith(d.primaryHttpMappingPath));
      if (!u)
        throw new Error("Unexpect request: request url did not match any method: " + r);
      const p = f[u.name];
      if (!p)
        throw new Error(`Got request for service plugin method ${u.name} but no implementation was provided. Available methods: ${Object.keys(f).join(", ")}`);
      return u.transformations.toREST(await p(u.transformations.fromREST(i)));
    }
  };
  return {
    initModule(i) {
      return (r) => {
        const c = n.get(i.componentType.toLowerCase()) ?? [];
        c.push({ servicePluginDefinition: i, implementation: r }), n.set(i.componentType.toLowerCase(), c), t.emit("registered", i);
      };
    },
    client: o
  };
}
const b = "X-Wix-Consistent";
function ve(e) {
  const n = e.headers || { Authorization: "" }, t = e.auth || {
    getAuthHeaders: (a) => Promise.resolve({ headers: {} })
  }, o = t.getAuthHeaders.bind(void 0, e.host);
  t.getAuthHeaders = o;
  const i = async (a, l) => {
    const h = await o(), _ = {
      ...(l == null ? void 0 : l.headers) ?? {},
      ...h.headers,
      ...n[b] ? { [b]: n[b] } : {}
    };
    if (typeof a == "string" || a instanceof URL) {
      const y = await fetch(a, {
        ...l,
        headers: _
      }), w = S(y);
      return w && (n[b] = w), y;
    } else {
      for (const [m, v] of Object.entries(_))
        typeof v == "string" && a.headers.set(m, v);
      const y = await fetch(a, l), w = S(y);
      return w && (n[b] = w), y;
    }
  }, { client: r, initModule: c } = me(t), { client: s, initModule: f } = _e(t), x = async (a, l) => {
    var m, v;
    const h = await o(), _ = ae(l), y = await fetch(a, {
      ...l,
      headers: {
        ..._,
        ...n,
        ...h == null ? void 0 : h.headers,
        ...l == null ? void 0 : l.headers,
        ...(v = (m = e.host) == null ? void 0 : m.essentials) == null ? void 0 : v.passThroughHeaders
      }
    }), w = S(y);
    return w && (n[b] = w), y;
  }, u = (a, l) => {
    var h, _, y;
    if (we(a))
      return f(a);
    if (ye(a))
      return c(a);
    if (ce(a) && e.host)
      return ue(a, e.host);
    if (typeof a == "function") {
      if ("__type" in a && a.__type === D)
        return a;
      const w = ((h = e.host) == null ? void 0 : h.apiBaseUrl) ?? C, m = e.useCDN === void 0 ? (_ = e.auth) == null ? void 0 : _.shouldUseCDN : e.useCDN;
      return he(R(() => ne(a)) ? te(a) : a, l ?? {}, x, (v, L) => {
        const M = new URL(v, `https://${w}`);
        return M.host = w, M.protocol = "https", x(M.toString(), L);
      }, t.getActiveToken, { HTTPHost: w }, (y = e.host) == null ? void 0 : y.name, m);
    } else return le(a) ? Object.fromEntries(Object.entries(a).map(([w, m]) => [w, u(m, a[oe])])) : a;
  }, p = (a) => {
    for (const l in a)
      n[l] = a[l];
  };
  return {
    ...e.modules ? u(e.modules) : {},
    auth: t,
    setHeaders: p,
    use: u,
    enableContext(a, l = { elevated: !1 }) {
      a === "global" ? globalThis.__wix_context__ != null ? l.elevated ? globalThis.__wix_context__.elevatedClient = this : globalThis.__wix_context__.client = this : l.elevated ? globalThis.__wix_context__ = { elevatedClient: this } : globalThis.__wix_context__ = { client: this } : l.elevated ? g.elevatedClient = this : g.client = this;
    },
    /**
     * @param relativeUrl The URL to fetch relative to the API base URL
     * @param options The fetch options
     * @returns The fetch Response object
     * @deprecated Use `fetchWithAuth` instead
     */
    fetch: (a, l) => {
      var y;
      const h = ((y = e.host) == null ? void 0 : y.apiBaseUrl) ?? C, _ = new URL(a, `https://${h}`);
      return _.host = h, _.protocol = "https", x(_.toString(), l);
    },
    fetchWithAuth: i,
    async graphql(a, l, h = {
      apiVersion: "alpha"
    }) {
      var v;
      const _ = ((v = e == null ? void 0 : e.host) == null ? void 0 : v.apiBaseUrl) ?? C, y = await x(`https://${_}/graphql/${h.apiVersion}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: a, variables: l })
      });
      if (y.status !== 200)
        throw new re(`GraphQL request failed with status ${y.status}`, y);
      const { data: w, errors: m } = await y.json();
      return { data: w ?? {}, errors: m };
    },
    webhooks: s,
    servicePlugins: r
  };
}
function S(e) {
  var n, t;
  return ((n = e.headers) == null ? void 0 : n.get(b)) ?? ((t = e.headers) == null ? void 0 : t.get(b.toLowerCase()));
}
var T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function z(e) {
  if (e.__esModule) return e;
  var n = e.default;
  if (typeof n == "function") {
    var t = function o() {
      return this instanceof o ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    t.prototype = n.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(o) {
    var i = Object.getOwnPropertyDescriptor(e, o);
    Object.defineProperty(t, o, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[o];
      }
    });
  }), t;
}
var I = {}, E = {}, $ = {}, P = {};
const ge = /* @__PURE__ */ z(Z);
var j = {};
const be = /* @__PURE__ */ z(Y);
var k;
function Ce() {
  return k || (k = 1, function(e) {
    var n = T && T.__createBinding || (Object.create ? function(p, d, a, l) {
      l === void 0 && (l = a);
      var h = Object.getOwnPropertyDescriptor(d, a);
      (!h || ("get" in h ? !d.__esModule : h.writable || h.configurable)) && (h = { enumerable: !0, get: function() {
        return d[a];
      } }), Object.defineProperty(p, l, h);
    } : function(p, d, a, l) {
      l === void 0 && (l = a), p[l] = d[a];
    }), t = T && T.__exportStar || function(p, d) {
      for (var a in p) a !== "default" && !Object.prototype.hasOwnProperty.call(d, a) && n(d, p, a);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.resolveContext = i, e.contextualizeHostModule = r, e.getContextualAuth = c, e.contextualizeRESTModule = s, e.contextualizeEventDefinitionModule = f, e.contextualizeSerivcePluginModule = x, e.runWithoutContext = u;
    const o = be;
    function i() {
      const p = typeof $wixContext < "u" && $wixContext.initWixModules ? $wixContext.initWixModules : typeof globalThis.__wix_context__ < "u" && globalThis.__wix_context__.initWixModules ? globalThis.__wix_context__.initWixModules : void 0;
      if (p)
        return {
          // @ts-expect-error
          initWixModules(l, h) {
            return u(() => p(l, h));
          },
          fetchWithAuth() {
            throw new Error("fetchWithAuth is not available in this context");
          },
          graphql() {
            throw new Error("graphql is not available in this context");
          }
        };
      const d = typeof $wixContext < "u" ? $wixContext.client : typeof o.wixContext.client < "u" ? o.wixContext.client : typeof globalThis.__wix_context__ < "u" ? globalThis.__wix_context__.client : void 0, a = typeof $wixContext < "u" ? $wixContext.elevatedClient : typeof o.wixContext.elevatedClient < "u" ? o.wixContext.elevatedClient : typeof globalThis.__wix_context__ < "u" ? globalThis.__wix_context__.elevatedClient : void 0;
      if (!(!d && !a))
        return {
          initWixModules(l, h) {
            if (h) {
              if (!a)
                throw new Error("An elevated client is required to use elevated modules. Make sure to initialize the Wix context with an elevated client before using elevated SDK modules");
              return u(() => a.use(l));
            }
            if (!d)
              throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
            return u(() => d.use(l));
          },
          fetchWithAuth: (l, h) => {
            if (!d)
              throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
            return d.fetchWithAuth(l, h);
          },
          getAuth() {
            if (!d)
              throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
            return d.auth;
          },
          async graphql(l, h, _) {
            if (!d)
              throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
            return d.graphql(l, h, _);
          }
        };
    }
    function r(p, d) {
      return (...a) => {
        const l = i();
        if (!l)
          throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
        return l.initWixModules(p)[d].apply(void 0, a);
      };
    }
    function c() {
      const p = i();
      if (!p)
        throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
      return p.getAuth();
    }
    function s(p, d) {
      return (...a) => {
        var h;
        const l = i();
        if (!l)
          throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
        return l.initWixModules(p, !!((h = a[d]) != null && h.suppressAuth)).apply(void 0, a);
      };
    }
    function f(p) {
      return (...d) => {
        const a = i();
        if (!a)
          throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
        return a.initWixModules(p).apply(void 0, d);
      };
    }
    function x(p) {
      return (...d) => {
        const a = i();
        if (!a)
          throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
        return a.initWixModules(p).apply(void 0, d);
      };
    }
    t(q(), e);
    function u(p) {
      const d = globalThis.__wix_context__, a = {
        client: o.wixContext.client,
        elevatedClient: o.wixContext.elevatedClient
      };
      let l;
      globalThis.__wix_context__ = void 0, o.wixContext.client = void 0, o.wixContext.elevatedClient = void 0, typeof $wixContext < "u" && (l = {
        client: $wixContext == null ? void 0 : $wixContext.client,
        elevatedClient: $wixContext == null ? void 0 : $wixContext.elevatedClient
      }, delete $wixContext.client, delete $wixContext.elevatedClient);
      try {
        return p();
      } finally {
        globalThis.__wix_context__ = d, o.wixContext.client = a.client, o.wixContext.elevatedClient = a.elevatedClient, typeof $wixContext < "u" && ($wixContext.client = l.client, $wixContext.elevatedClient = l.elevatedClient);
      }
    }
  }(j)), j;
}
var O;
function q() {
  return O || (O = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ServicePluginDefinition = e.EventDefinition = void 0, e.contextualizeHostModuleV2 = o, e.contextualizeRESTModuleV2 = i, e.contextualizeEventDefinitionModuleV2 = r, e.contextualizeSerivcePluginModuleV2 = c;
    const n = ge;
    Object.defineProperty(e, "EventDefinition", { enumerable: !0, get: function() {
      return n.EventDefinition;
    } }), Object.defineProperty(e, "ServicePluginDefinition", { enumerable: !0, get: function() {
      return n.ServicePluginDefinition;
    } });
    const t = Ce();
    function o(s, f) {
      return {
        ...s,
        ...Object.fromEntries(f.map((x) => [
          x,
          (...u) => {
            const p = (0, t.resolveContext)();
            if (!p)
              throw new Error("Wix context is not available. Make sure to initialize the Wix context before using SDK modules");
            return p.initWixModules(s)[x].apply(void 0, u);
          }
        ]))
      };
    }
    function i(s, f) {
      return (...x) => {
        const u = (0, t.resolveContext)();
        return u ? u.initWixModules(s, f).apply(void 0, x) : s.apply(void 0, x);
      };
    }
    function r(s) {
      const f = (...x) => {
        const u = (0, t.resolveContext)();
        return u ? u.initWixModules(s).apply(void 0, x) : () => {
        };
      };
      return f.__type = s.__type, f.type = s.type, f.isDomainEvent = s.isDomainEvent, f.transformations = s.transformations, f;
    }
    function c(s) {
      const f = (...x) => {
        const u = (0, t.resolveContext)();
        return u ? u.initWixModules(s).apply(void 0, x) : () => {
        };
      };
      return f.__type = s.__type, f.componentType = s.componentType, f.methods = s.methods, f;
    }
  }(P)), P;
}
Object.defineProperty($, "__esModule", { value: !0 });
$.createHostModule = Ee;
const Te = q();
function Ee(e) {
  return (0, Te.contextualizeHostModuleV2)({
    __type: "host",
    create: (n) => Object.entries(e).reduce((t, [o, i]) => ({
      ...t,
      [o]: i(n)
    }), {})
  }, Object.keys(e));
}
Object.defineProperty(E, "__esModule", { value: !0 });
E.seoRuntime = void 0;
const Me = $;
E.seoRuntime = (0, Me.createHostModule)({
  links: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "links",
      args: t
    });
  },
  metaTags: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "metaTags",
      args: t
    });
  },
  structuredData: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "structuredData",
      args: t
    });
  },
  title: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "title",
      args: t
    });
  },
  setLinks: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "setLinks",
      args: t
    });
  },
  setMetaTags: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "setMetaTags",
      args: t
    });
  },
  setStructuredData: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "setStructuredData",
      args: t
    });
  },
  setTitle: ({ channel: e }) => function(...t) {
    return e.invoke({
      namespace: "seo",
      method: "setTitle",
      args: t
    });
  }
});
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.seo = void 0;
  var n = E;
  Object.defineProperty(e, "seo", { enumerable: !0, get: function() {
    return n.seoRuntime;
  } });
})(I);
const We = ve({
  host: X.host({ applicationId: "2b6a1f00-0341-451b-8e69-6dd2e20c409b" }),
  modules: { seo: I.seo }
});
We.seo.title().then((e) => console.log("✅ Site title:", e)).catch((e) => console.error("❌ SEO error:", e));
