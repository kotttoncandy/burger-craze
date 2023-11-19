(() => {
  // node_modules/kaboom/dist/kaboom.mjs
  var Pn = Object.defineProperty;
  var fi = (s, t, c) => t in s ? Pn(s, t, { enumerable: true, configurable: true, writable: true, value: c }) : s[t] = c;
  var o = (s, t) => Pn(s, "name", { value: t, configurable: true });
  var mi = (s, t) => {
    for (var c in t)
      Pn(s, c, { get: t[c], enumerable: true });
  };
  var Ee = (s, t, c) => (fi(s, typeof t != "symbol" ? t + "" : t, c), c);
  var pi = (() => {
    for (var s = new Uint8Array(128), t = 0; t < 64; t++)
      s[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
    return (c) => {
      for (var g = c.length, S = new Uint8Array((g - (c[g - 1] == "=") - (c[g - 2] == "=")) * 3 / 4 | 0), M = 0, z2 = 0; M < g; ) {
        var q = s[c.charCodeAt(M++)], N = s[c.charCodeAt(M++)], Z = s[c.charCodeAt(M++)], ue = s[c.charCodeAt(M++)];
        S[z2++] = q << 2 | N >> 4, S[z2++] = N << 4 | Z >> 2, S[z2++] = Z << 6 | ue;
      }
      return S;
    };
  })();
  function De(s) {
    return s * Math.PI / 180;
  }
  o(De, "deg2rad");
  function it(s) {
    return s * 180 / Math.PI;
  }
  o(it, "rad2deg");
  function je(s, t, c) {
    return t > c ? je(s, c, t) : Math.min(Math.max(s, t), c);
  }
  o(je, "clamp");
  function Ge(s, t, c) {
    if (typeof s == "number" && typeof t == "number")
      return s + (t - s) * c;
    if (s instanceof b && t instanceof b)
      return s.lerp(t, c);
    if (s instanceof L && t instanceof L)
      return s.lerp(t, c);
    throw new Error(`Bad value for lerp(): ${s}, ${t}. Only number, Vec2 and Color is supported.`);
  }
  o(Ge, "lerp");
  function zt(s, t, c, g, S) {
    return g + (s - t) / (c - t) * (S - g);
  }
  o(zt, "map");
  function dr(s, t, c, g, S) {
    return je(zt(s, t, c, g, S), g, S);
  }
  o(dr, "mapc");
  var be = class {
    x = 0;
    y = 0;
    constructor(t = 0, c = t) {
      this.x = t, this.y = c;
    }
    static fromAngle(t) {
      let c = De(t);
      return new be(Math.cos(c), Math.sin(c));
    }
    clone() {
      return new be(this.x, this.y);
    }
    add(...t) {
      let c = C(...t);
      return new be(this.x + c.x, this.y + c.y);
    }
    sub(...t) {
      let c = C(...t);
      return new be(this.x - c.x, this.y - c.y);
    }
    scale(...t) {
      let c = C(...t);
      return new be(this.x * c.x, this.y * c.y);
    }
    dist(...t) {
      let c = C(...t);
      return this.sub(c).len();
    }
    sdist(...t) {
      let c = C(...t);
      return this.sub(c).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let t = this.len();
      return t === 0 ? new be(0) : this.scale(1 / t);
    }
    normal() {
      return new be(this.y, -this.x);
    }
    reflect(t) {
      return this.sub(t.scale(2 * this.dot(t)));
    }
    project(t) {
      return t.scale(t.dot(this) / t.len());
    }
    reject(t) {
      return this.sub(this.project(t));
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    angle(...t) {
      let c = C(...t);
      return it(Math.atan2(this.y - c.y, this.x - c.x));
    }
    angleBetween(...t) {
      let c = C(...t);
      return it(Math.atan2(this.cross(c), this.dot(c)));
    }
    lerp(t, c) {
      return new be(Ge(this.x, t.x, c), Ge(this.y, t.y, c));
    }
    slerp(t, c) {
      let g = this.dot(t), S = this.cross(t), M = Math.atan2(S, g);
      return this.scale(Math.sin((1 - c) * M)).add(t.scale(Math.sin(c * M))).scale(1 / S);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(t) {
      return new be(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
    }
    transform(t) {
      return t.multVec2(this);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y;
    }
    bbox() {
      return new ne(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  };
  var b = be;
  o(b, "Vec2"), Ee(b, "LEFT", new be(-1, 0)), Ee(b, "RIGHT", new be(1, 0)), Ee(b, "UP", new be(0, -1)), Ee(b, "DOWN", new be(0, 1));
  function C(...s) {
    if (s.length === 1) {
      if (s[0] instanceof b)
        return new b(s[0].x, s[0].y);
      if (Array.isArray(s[0]) && s[0].length === 2)
        return new b(...s[0]);
    }
    return new b(...s);
  }
  o(C, "vec2");
  var oe = class {
    r = 255;
    g = 255;
    b = 255;
    constructor(t, c, g) {
      this.r = je(t, 0, 255), this.g = je(c, 0, 255), this.b = je(g, 0, 255);
    }
    static fromArray(t) {
      return new oe(t[0], t[1], t[2]);
    }
    static fromHex(t) {
      if (typeof t == "number")
        return new oe(t >> 16 & 255, t >> 8 & 255, t >> 0 & 255);
      if (typeof t == "string") {
        let c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return new oe(parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(t, c, g) {
      if (c == 0)
        return new oe(255 * g, 255 * g, 255 * g);
      let S = o((ue, E, X) => (X < 0 && (X += 1), X > 1 && (X -= 1), X < 1 / 6 ? ue + (E - ue) * 6 * X : X < 1 / 2 ? E : X < 2 / 3 ? ue + (E - ue) * (2 / 3 - X) * 6 : ue), "hue2rgb"), M = g < 0.5 ? g * (1 + c) : g + c - g * c, z2 = 2 * g - M, q = S(z2, M, t + 1 / 3), N = S(z2, M, t), Z = S(z2, M, t - 1 / 3);
      return new oe(Math.round(q * 255), Math.round(N * 255), Math.round(Z * 255));
    }
    clone() {
      return new oe(this.r, this.g, this.b);
    }
    lighten(t) {
      return new oe(this.r + t, this.g + t, this.b + t);
    }
    darken(t) {
      return this.lighten(-t);
    }
    invert() {
      return new oe(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(t) {
      return new oe(this.r * t.r / 255, this.g * t.g / 255, this.b * t.b / 255);
    }
    lerp(t, c) {
      return new oe(Ge(this.r, t.r, c), Ge(this.g, t.g, c), Ge(this.b, t.b, c));
    }
    eq(t) {
      return this.r === t.r && this.g === t.g && this.b === t.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
  };
  var L = oe;
  o(L, "Color"), Ee(L, "RED", new oe(255, 0, 0)), Ee(L, "GREEN", new oe(0, 255, 0)), Ee(L, "BLUE", new oe(0, 0, 255)), Ee(L, "YELLOW", new oe(255, 255, 0)), Ee(L, "MAGENTA", new oe(255, 0, 255)), Ee(L, "CYAN", new oe(0, 255, 255)), Ee(L, "WHITE", new oe(255, 255, 255)), Ee(L, "BLACK", new oe(0, 0, 0));
  function J(...s) {
    if (s.length === 0)
      return new L(255, 255, 255);
    if (s.length === 1) {
      if (s[0] instanceof L)
        return s[0].clone();
      if (typeof s[0] == "string")
        return L.fromHex(s[0]);
      if (Array.isArray(s[0]) && s[0].length === 3)
        return L.fromArray(s[0]);
    }
    return new L(...s);
  }
  o(J, "rgb");
  var fr = o((s, t, c) => L.fromHSL(s, t, c), "hsl2rgb");
  var Q = class {
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(t, c, g, S) {
      this.x = t, this.y = c, this.w = g, this.h = S;
    }
    scale(t) {
      return new Q(this.x + this.w * t.x, this.y + this.h * t.y, this.w * t.w, this.h * t.h);
    }
    pos() {
      return new b(this.x, this.y);
    }
    clone() {
      return new Q(this.x, this.y, this.w, this.h);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y && this.w === t.w && this.h === t.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  o(Q, "Quad");
  function ae(s, t, c, g) {
    return new Q(s, t, c, g);
  }
  o(ae, "quad");
  var W = class {
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(t) {
      t && (this.m = t);
    }
    static translate(t) {
      return new W([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
    }
    static scale(t) {
      return new W([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(t) {
      t = De(-t);
      let c = Math.cos(t), g = Math.sin(t);
      return new W([1, 0, 0, 0, 0, c, -g, 0, 0, g, c, 0, 0, 0, 0, 1]);
    }
    static rotateY(t) {
      t = De(-t);
      let c = Math.cos(t), g = Math.sin(t);
      return new W([c, 0, g, 0, 0, 1, 0, 0, -g, 0, c, 0, 0, 0, 0, 1]);
    }
    static rotateZ(t) {
      t = De(-t);
      let c = Math.cos(t), g = Math.sin(t);
      return new W([c, -g, 0, 0, g, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(t) {
      return this.m[12] += this.m[0] * t.x + this.m[4] * t.y, this.m[13] += this.m[1] * t.x + this.m[5] * t.y, this.m[14] += this.m[2] * t.x + this.m[6] * t.y, this.m[15] += this.m[3] * t.x + this.m[7] * t.y, this;
    }
    scale(t) {
      return this.m[0] *= t.x, this.m[4] *= t.y, this.m[1] *= t.x, this.m[5] *= t.y, this.m[2] *= t.x, this.m[6] *= t.y, this.m[3] *= t.x, this.m[7] *= t.y, this;
    }
    rotate(t) {
      t = De(-t);
      let c = Math.cos(t), g = Math.sin(t), S = this.m[0], M = this.m[1], z2 = this.m[4], q = this.m[5];
      return this.m[0] = S * c + M * g, this.m[1] = -S * g + M * c, this.m[4] = z2 * c + q * g, this.m[5] = -z2 * g + q * c, this;
    }
    mult(t) {
      let c = [];
      for (let g = 0; g < 4; g++)
        for (let S = 0; S < 4; S++)
          c[g * 4 + S] = this.m[0 * 4 + S] * t.m[g * 4 + 0] + this.m[1 * 4 + S] * t.m[g * 4 + 1] + this.m[2 * 4 + S] * t.m[g * 4 + 2] + this.m[3 * 4 + S] * t.m[g * 4 + 3];
      return new W(c);
    }
    multVec2(t) {
      return new b(t.x * this.m[0] + t.y * this.m[4] + this.m[12], t.x * this.m[1] + t.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new b(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4], c = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new b(c, t / c);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4], c = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new b(t / c, c);
      } else
        return new b(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return it(this.m[1] > 0 ? Math.acos(this.m[0] / t) : -Math.acos(this.m[0] / t));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return it(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / t) : -Math.acos(this.m[4] / t)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new b(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new b(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t));
      } else
        return new b(0, 0);
    }
    invert() {
      let t = [], c = this.m[10] * this.m[15] - this.m[14] * this.m[11], g = this.m[9] * this.m[15] - this.m[13] * this.m[11], S = this.m[9] * this.m[14] - this.m[13] * this.m[10], M = this.m[8] * this.m[15] - this.m[12] * this.m[11], z2 = this.m[8] * this.m[14] - this.m[12] * this.m[10], q = this.m[8] * this.m[13] - this.m[12] * this.m[9], N = this.m[6] * this.m[15] - this.m[14] * this.m[7], Z = this.m[5] * this.m[15] - this.m[13] * this.m[7], ue = this.m[5] * this.m[14] - this.m[13] * this.m[6], E = this.m[4] * this.m[15] - this.m[12] * this.m[7], X = this.m[4] * this.m[14] - this.m[12] * this.m[6], d = this.m[5] * this.m[15] - this.m[13] * this.m[7], K = this.m[4] * this.m[13] - this.m[12] * this.m[5], me = this.m[6] * this.m[11] - this.m[10] * this.m[7], ke = this.m[5] * this.m[11] - this.m[9] * this.m[7], w2 = this.m[5] * this.m[10] - this.m[9] * this.m[6], ce = this.m[4] * this.m[11] - this.m[8] * this.m[7], pe = this.m[4] * this.m[10] - this.m[8] * this.m[6], le = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      t[0] = this.m[5] * c - this.m[6] * g + this.m[7] * S, t[4] = -(this.m[4] * c - this.m[6] * M + this.m[7] * z2), t[8] = this.m[4] * g - this.m[5] * M + this.m[7] * q, t[12] = -(this.m[4] * S - this.m[5] * z2 + this.m[6] * q), t[1] = -(this.m[1] * c - this.m[2] * g + this.m[3] * S), t[5] = this.m[0] * c - this.m[2] * M + this.m[3] * z2, t[9] = -(this.m[0] * g - this.m[1] * M + this.m[3] * q), t[13] = this.m[0] * S - this.m[1] * z2 + this.m[2] * q, t[2] = this.m[1] * N - this.m[2] * Z + this.m[3] * ue, t[6] = -(this.m[0] * N - this.m[2] * E + this.m[3] * X), t[10] = this.m[0] * d - this.m[1] * E + this.m[3] * K, t[14] = -(this.m[0] * ue - this.m[1] * X + this.m[2] * K), t[3] = -(this.m[1] * me - this.m[2] * ke + this.m[3] * w2), t[7] = this.m[0] * me - this.m[2] * ce + this.m[3] * pe, t[11] = -(this.m[0] * ke - this.m[1] * ce + this.m[3] * le), t[15] = this.m[0] * w2 - this.m[1] * pe + this.m[2] * le;
      let se = this.m[0] * t[0] + this.m[1] * t[4] + this.m[2] * t[8] + this.m[3] * t[12];
      for (let Ue = 0; Ue < 4; Ue++)
        for (let B = 0; B < 4; B++)
          t[Ue * 4 + B] *= 1 / se;
      return new W(t);
    }
    clone() {
      return new W([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  o(W, "Mat4");
  function Mn(s, t, c, g = Math.sin) {
    return s + (g(c) + 1) / 2 * (t - s);
  }
  o(Mn, "wave");
  var gi = 1103515245;
  var wi = 12345;
  var hr = 2147483648;
  var st = class {
    seed;
    constructor(t) {
      this.seed = t;
    }
    gen() {
      return this.seed = (gi * this.seed + wi) % hr, this.seed / hr;
    }
    genNumber(t, c) {
      return t + this.gen() * (c - t);
    }
    genVec2(t, c) {
      return new b(this.genNumber(t.x, c.x), this.genNumber(t.y, c.y));
    }
    genColor(t, c) {
      return new L(this.genNumber(t.r, c.r), this.genNumber(t.g, c.g), this.genNumber(t.b, c.b));
    }
    genAny(...t) {
      if (t.length === 0)
        return this.gen();
      if (t.length === 1) {
        if (typeof t[0] == "number")
          return this.genNumber(0, t[0]);
        if (t[0] instanceof b)
          return this.genVec2(C(0, 0), t[0]);
        if (t[0] instanceof L)
          return this.genColor(J(0, 0, 0), t[0]);
      } else if (t.length === 2) {
        if (typeof t[0] == "number" && typeof t[1] == "number")
          return this.genNumber(t[0], t[1]);
        if (t[0] instanceof b && t[1] instanceof b)
          return this.genVec2(t[0], t[1]);
        if (t[0] instanceof L && t[1] instanceof L)
          return this.genColor(t[0], t[1]);
      }
    }
  };
  o(st, "RNG");
  var Rn = new st(Date.now());
  function mr(s) {
    return s != null && (Rn.seed = s), Rn.seed;
  }
  o(mr, "randSeed");
  function yt(...s) {
    return Rn.genAny(...s);
  }
  o(yt, "rand");
  function Dn(...s) {
    return Math.floor(yt(...s));
  }
  o(Dn, "randi");
  function pr(s) {
    return yt() <= s;
  }
  o(pr, "chance");
  function gr(s) {
    return s[Dn(s.length)];
  }
  o(gr, "choose");
  function wr(s, t) {
    return s.pos.x + s.width > t.pos.x && s.pos.x < t.pos.x + t.width && s.pos.y + s.height > t.pos.y && s.pos.y < t.pos.y + t.height;
  }
  o(wr, "testRectRect");
  function bi(s, t) {
    if (s.p1.x === s.p2.x && s.p1.y === s.p2.y || t.p1.x === t.p2.x && t.p1.y === t.p2.y)
      return null;
    let c = (t.p2.y - t.p1.y) * (s.p2.x - s.p1.x) - (t.p2.x - t.p1.x) * (s.p2.y - s.p1.y);
    if (c === 0)
      return null;
    let g = ((t.p2.x - t.p1.x) * (s.p1.y - t.p1.y) - (t.p2.y - t.p1.y) * (s.p1.x - t.p1.x)) / c, S = ((s.p2.x - s.p1.x) * (s.p1.y - t.p1.y) - (s.p2.y - s.p1.y) * (s.p1.x - t.p1.x)) / c;
    return g < 0 || g > 1 || S < 0 || S > 1 ? null : g;
  }
  o(bi, "testLineLineT");
  function rt(s, t) {
    let c = bi(s, t);
    return c ? C(s.p1.x + c * (s.p2.x - s.p1.x), s.p1.y + c * (s.p2.y - s.p1.y)) : null;
  }
  o(rt, "testLineLine");
  function br(s, t) {
    if (vt(s, t.p1) || vt(s, t.p2))
      return true;
    let c = s.points();
    return !!rt(t, new Se(c[0], c[1])) || !!rt(t, new Se(c[1], c[2])) || !!rt(t, new Se(c[2], c[3])) || !!rt(t, new Se(c[3], c[0]));
  }
  o(br, "testRectLine");
  function vt(s, t) {
    return t.x > s.pos.x && t.x < s.pos.x + s.width && t.y > s.pos.y && t.y < s.pos.y + s.height;
  }
  o(vt, "testRectPoint");
  function vr(s, t) {
    let c = t.sub(s.p1), g = s.p2.sub(s.p1);
    if (Math.abs(c.cross(g)) > Number.EPSILON)
      return false;
    let S = c.dot(g) / g.dot(g);
    return S >= 0 && S <= 1;
  }
  o(vr, "testLinePoint");
  function Gn(s, t) {
    let c = s.p2.sub(s.p1), g = c.dot(c), S = s.p1.sub(t.center), M = 2 * c.dot(S), z2 = S.dot(S) - t.radius * t.radius, q = M * M - 4 * g * z2;
    if (g <= Number.EPSILON || q < 0)
      return false;
    if (q == 0) {
      let N = -M / (2 * g);
      if (N >= 0 && N <= 1)
        return true;
    } else {
      let N = (-M + Math.sqrt(q)) / (2 * g), Z = (-M - Math.sqrt(q)) / (2 * g);
      if (N >= 0 && N <= 1 || Z >= 0 && Z <= 1)
        return true;
    }
    return yr(t, s.p1);
  }
  o(Gn, "testLineCircle");
  function yr(s, t) {
    return s.center.sdist(t) < s.radius * s.radius;
  }
  o(yr, "testCirclePoint");
  function Ur(s, t) {
    let c = t.pts[t.pts.length - 1];
    for (let g of t.pts) {
      if (Gn(new Se(c, g), s))
        return true;
      c = g;
    }
    return yr(s, t.pts[0]) ? true : Fn(t, s.center);
  }
  o(Ur, "testCirclePolygon");
  function Fn(s, t) {
    let c = false, g = s.pts;
    for (let S = 0, M = g.length - 1; S < g.length; M = S++)
      g[S].y > t.y != g[M].y > t.y && t.x < (g[M].x - g[S].x) * (t.y - g[S].y) / (g[M].y - g[S].y) + g[S].x && (c = !c);
    return c;
  }
  o(Fn, "testPolygonPoint");
  var Se = class {
    p1;
    p2;
    constructor(t, c) {
      this.p1 = t.clone(), this.p2 = c.clone();
    }
    transform(t) {
      return new Se(t.multVec2(this.p1), t.multVec2(this.p2));
    }
    bbox() {
      return ne.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new Se(this.p1, this.p2);
    }
  };
  o(Se, "Line");
  var ne = class {
    pos;
    width;
    height;
    constructor(t, c, g) {
      this.pos = t.clone(), this.width = c, this.height = g;
    }
    static fromPoints(t, c) {
      return new ne(t.clone(), c.x - t.x, c.y - t.y);
    }
    center() {
      return new b(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(t) {
      return new Pe(this.points().map((c) => t.multVec2(c)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new ne(this.pos.clone(), this.width, this.height);
    }
    distToPoint(t) {
      return Math.sqrt(this.sdistToPoint(t));
    }
    sdistToPoint(t) {
      let c = this.pos, g = this.pos.add(this.width, this.height), S = Math.max(c.x - t.x, 0, t.x - g.x), M = Math.max(c.y - t.y, 0, t.y - g.y);
      return S * S + M * M;
    }
  };
  o(ne, "Rect");
  var Ne = class {
    center;
    radius;
    constructor(t, c) {
      this.center = t.clone(), this.radius = c;
    }
    transform(t) {
      return new Xe(this.center, this.radius, this.radius).transform(t);
    }
    bbox() {
      return ne.fromPoints(this.center.sub(C(this.radius)), this.center.add(C(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new Ne(this.center, this.radius);
    }
  };
  o(Ne, "Circle");
  var Xe = class {
    center;
    radiusX;
    radiusY;
    constructor(t, c, g) {
      this.center = t.clone(), this.radiusX = c, this.radiusY = g;
    }
    transform(t) {
      return new Xe(t.multVec2(this.center), t.m[0] * this.radiusX, t.m[5] * this.radiusY);
    }
    bbox() {
      return ne.fromPoints(this.center.sub(C(this.radiusX, this.radiusY)), this.center.add(C(this.radiusX, this.radiusY)));
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new Xe(this.center, this.radiusX, this.radiusY);
    }
  };
  o(Xe, "Ellipse");
  var Pe = class {
    pts;
    constructor(t) {
      if (t.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = t;
    }
    transform(t) {
      return new Pe(this.pts.map((c) => t.multVec2(c)));
    }
    bbox() {
      let t = C(Number.MAX_VALUE), c = C(-Number.MAX_VALUE);
      for (let g of this.pts)
        t.x = Math.min(t.x, g.x), c.x = Math.max(c.x, g.x), t.y = Math.min(t.y, g.y), c.y = Math.max(c.y, g.y);
      return ne.fromPoints(t, c);
    }
    area() {
      let t = 0, c = this.pts.length;
      for (let g = 0; g < c; g++) {
        let S = this.pts[g], M = this.pts[(g + 1) % c];
        t += S.x * M.y * 0.5, t -= M.x * S.y * 0.5;
      }
      return Math.abs(t);
    }
    clone() {
      return new Pe(this.pts.map((t) => t.clone()));
    }
  };
  o(Pe, "Polygon");
  function xr(s, t) {
    let c = Number.MAX_VALUE, g = C(0);
    for (let S of [s, t])
      for (let M = 0; M < S.pts.length; M++) {
        let z2 = S.pts[M], N = S.pts[(M + 1) % S.pts.length].sub(z2).normal().unit(), Z = Number.MAX_VALUE, ue = -Number.MAX_VALUE;
        for (let K = 0; K < s.pts.length; K++) {
          let me = s.pts[K].dot(N);
          Z = Math.min(Z, me), ue = Math.max(ue, me);
        }
        let E = Number.MAX_VALUE, X = -Number.MAX_VALUE;
        for (let K = 0; K < t.pts.length; K++) {
          let me = t.pts[K].dot(N);
          E = Math.min(E, me), X = Math.max(X, me);
        }
        let d = Math.min(ue, X) - Math.max(Z, E);
        if (d < 0)
          return null;
        if (d < Math.abs(c)) {
          let K = X - Z, me = E - ue;
          c = Math.abs(K) < Math.abs(me) ? K : me, g = N.scale(c);
        }
      }
    return g;
  }
  o(xr, "sat");
  var ot = class extends Map {
    lastID;
    constructor(...t) {
      super(...t), this.lastID = 0;
    }
    push(t) {
      let c = this.lastID;
      return this.set(c, t), this.lastID++, c;
    }
    pushd(t) {
      let c = this.push(t);
      return () => this.delete(c);
    }
  };
  o(ot, "IDList");
  var Oe = class {
    paused = false;
    cancel;
    constructor(t) {
      this.cancel = t;
    }
    static join(t) {
      let c = new Oe(() => t.forEach((g) => g.cancel()));
      return Object.defineProperty(c, "paused", { get: () => t[0].paused, set: (g) => t.forEach((S) => S.paused = g) }), c.paused = false, c;
    }
  };
  o(Oe, "EventController");
  var ve = class {
    handlers = new ot();
    add(t) {
      let c = this.handlers.pushd((...S) => {
        g.paused || t(...S);
      }), g = new Oe(c);
      return g;
    }
    addOnce(t) {
      let c = this.add((...g) => {
        c.cancel(), t(...g);
      });
      return c;
    }
    next() {
      return new Promise((t) => this.addOnce(t));
    }
    trigger(...t) {
      this.handlers.forEach((c) => c(...t));
    }
    numListeners() {
      return this.handlers.size;
    }
  };
  o(ve, "Event");
  var Fe = class {
    handlers = {};
    on(t, c) {
      return this.handlers[t] || (this.handlers[t] = new ve()), this.handlers[t].add(c);
    }
    onOnce(t, c) {
      let g = this.on(t, (...S) => {
        g.cancel(), c(...S);
      });
      return g;
    }
    next(t) {
      return new Promise((c) => {
        this.onOnce(t, (...g) => c(g[0]));
      });
    }
    trigger(t, ...c) {
      this.handlers[t] && this.handlers[t].trigger(...c);
    }
    remove(t) {
      delete this.handlers[t];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(t) {
      return this.handlers[t]?.numListeners() ?? 0;
    }
  };
  o(Fe, "EventHandler");
  function Bn(s, t) {
    let c = typeof s, g = typeof t;
    if (c !== g)
      return false;
    if (c === "object" && g === "object" && s !== null && t !== null) {
      let S = Object.keys(s), M = Object.keys(t);
      if (S.length !== M.length)
        return false;
      for (let z2 of S) {
        let q = s[z2], N = t[z2];
        if (!(typeof q == "function" && typeof N == "function") && !Bn(q, N))
          return false;
      }
      return true;
    }
    return s === t;
  }
  o(Bn, "deepEq");
  function vi(s) {
    let t = window.atob(s), c = t.length, g = new Uint8Array(c);
    for (let S = 0; S < c; S++)
      g[S] = t.charCodeAt(S);
    return g.buffer;
  }
  o(vi, "base64ToArrayBuffer");
  function Er(s) {
    return vi(s.split(",")[1]);
  }
  o(Er, "dataURLToArrayBuffer");
  function Kt(s, t) {
    let c = document.createElement("a");
    c.href = t, c.download = s, c.click();
  }
  o(Kt, "download");
  function Ln(s, t) {
    Kt(s, "data:text/plain;charset=utf-8," + t);
  }
  o(Ln, "downloadText");
  function Sr(s, t) {
    Ln(s, JSON.stringify(t));
  }
  o(Sr, "downloadJSON");
  function Vn(s, t) {
    let c = URL.createObjectURL(t);
    Kt(s, c), URL.revokeObjectURL(c);
  }
  o(Vn, "downloadBlob");
  var In = o((s) => s.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var Cr = o((s) => s.split(".").pop(), "getExt");
  var Tr = (() => {
    let s = 0;
    return () => s++;
  })();
  var Ut = class {
    _items;
    _compareFn;
    constructor(t = (c, g) => c < g) {
      this._compareFn = t, this._items = [];
    }
    insert(t) {
      this._items.push(t), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let t = this._items[0], c = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = c, this.moveDown(0)), t;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(t) {
      for (; t > 0; ) {
        let c = Math.floor((t - 1) / 2);
        if (!this._compareFn(this._items[t], this._items[c]) && this._items[t] >= this._items[c])
          break;
        this.swap(t, c), t = c;
      }
    }
    moveDown(t) {
      for (; t < Math.floor(this._items.length / 2); ) {
        let c = 2 * t + 1;
        if (c < this._items.length - 1 && !this._compareFn(this._items[c], this._items[c + 1]) && ++c, this._compareFn(this._items[t], this._items[c]))
          break;
        this.swap(t, c), t = c;
      }
    }
    swap(t, c) {
      [this._items[t], this._items[c]] = [this._items[c], this._items[t]];
    }
    get length() {
      return this._items.length;
    }
  };
  o(Ut, "BinaryHeap");
  var jn = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var Je = class {
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(t) {
      this.pressed.add(t), this.pressedRepeat.add(t), this.down.add(t);
    }
    pressRepeat(t) {
      this.pressedRepeat.add(t);
    }
    release(t) {
      this.down.delete(t), this.pressed.delete(t), this.released.add(t);
    }
  };
  o(Je, "ButtonState");
  var Yt = class {
    buttonState = new Je();
    stickState = /* @__PURE__ */ new Map();
  };
  o(Yt, "GamepadState");
  var Xt = class {
    dts = [];
    timer = 0;
    fps = 0;
    tick(t) {
      this.dts.push(t), this.timer += t, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((c, g) => c + g) / this.dts.length)), this.dts = []);
    }
  };
  o(Xt, "FPSCounter");
  var Ar = o((s) => {
    if (!s.canvas)
      throw new Error("Please provide a canvas");
    let t = { canvas: s.canvas, loopID: null, stopped: false, dt: 0, time: 0, realTime: 0, fpsCounter: new Xt(), timeScale: 1, skipTime: false, numFrames: 0, paused: false, mousePos: new b(0), mouseDeltaPos: new b(0), keyState: new Je(), mouseState: new Je(), mergedGamepadState: new Yt(), gamepadStates: /* @__PURE__ */ new Map(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: s.canvas.offsetWidth, lastHeight: s.canvas.offsetHeight, events: new Fe() };
    function c() {
      return t.canvas;
    }
    o(c, "canvas");
    function g() {
      return t.dt * t.timeScale;
    }
    o(g, "dt");
    function S() {
      return t.time;
    }
    o(S, "time");
    function M() {
      return t.fpsCounter.fps;
    }
    o(M, "fps");
    function z2() {
      return t.numFrames;
    }
    o(z2, "numFrames");
    function q() {
      return t.canvas.toDataURL();
    }
    o(q, "screenshot");
    function N(h2) {
      t.canvas.style.cursor = h2;
    }
    o(N, "setCursor");
    function Z() {
      return t.canvas.style.cursor;
    }
    o(Z, "getCursor");
    function ue(h2) {
      if (h2)
        try {
          let y = t.canvas.requestPointerLock();
          y.catch && y.catch((x) => console.error(x));
        } catch (y) {
          console.error(y);
        }
      else
        document.exitPointerLock();
    }
    o(ue, "setCursorLocked");
    function E() {
      return !!document.pointerLockElement;
    }
    o(E, "isCursorLocked");
    function X(h2) {
      h2.requestFullscreen ? h2.requestFullscreen() : h2.webkitRequestFullscreen && h2.webkitRequestFullscreen();
    }
    o(X, "enterFullscreen");
    function d() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    o(d, "exitFullscreen");
    function K() {
      return document.fullscreenElement || document.webkitFullscreenElement;
    }
    o(K, "getFullscreenElement");
    function me(h2 = true) {
      h2 ? X(t.canvas) : d();
    }
    o(me, "setFullscreen");
    function ke() {
      return !!K();
    }
    o(ke, "isFullscreen");
    function w2() {
      t.stopped = true;
      for (let h2 in he)
        t.canvas.removeEventListener(h2, he[h2]);
      for (let h2 in qe)
        document.removeEventListener(h2, qe[h2]);
      for (let h2 in Re)
        window.removeEventListener(h2, Re[h2]);
      Lt.disconnect();
    }
    o(w2, "quit");
    function ce(h2) {
      t.loopID !== null && cancelAnimationFrame(t.loopID);
      let y = 0, x = o((ee) => {
        if (t.stopped)
          return;
        if (t.paused || document.visibilityState !== "visible") {
          t.loopID = requestAnimationFrame(x);
          return;
        }
        let ge = ee / 1e3, I = ge - t.realTime, de = s.maxFPS ? 1 / s.maxFPS : 0;
        t.realTime = ge, y += I, y > de && (t.skipTime || (t.dt = y, t.time += g(), t.fpsCounter.tick(t.dt)), y = 0, t.skipTime = false, t.numFrames++, pn(), h2(), Mt()), t.loopID = requestAnimationFrame(x);
      }, "frame");
      x(0);
    }
    o(ce, "run");
    function pe() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    o(pe, "isTouchScreen");
    function le() {
      return t.mousePos.clone();
    }
    o(le, "mousePos");
    function se() {
      return t.mouseDeltaPos.clone();
    }
    o(se, "mouseDeltaPos");
    function Ue(h2 = "left") {
      return t.mouseState.pressed.has(h2);
    }
    o(Ue, "isMousePressed");
    function B(h2 = "left") {
      return t.mouseState.down.has(h2);
    }
    o(B, "isMouseDown");
    function T(h2 = "left") {
      return t.mouseState.released.has(h2);
    }
    o(T, "isMouseReleased");
    function lt() {
      return t.isMouseMoved;
    }
    o(lt, "isMouseMoved");
    function Be(h2) {
      return h2 === void 0 ? t.keyState.pressed.size > 0 : t.keyState.pressed.has(h2);
    }
    o(Be, "isKeyPressed");
    function tn(h2) {
      return h2 === void 0 ? t.keyState.pressedRepeat.size > 0 : t.keyState.pressedRepeat.has(h2);
    }
    o(tn, "isKeyPressedRepeat");
    function ht(h2) {
      return h2 === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(h2);
    }
    o(ht, "isKeyDown");
    function We(h2) {
      return h2 === void 0 ? t.keyState.released.size > 0 : t.keyState.released.has(h2);
    }
    o(We, "isKeyReleased");
    function nn(h2) {
      return h2 === void 0 ? t.mergedGamepadState.buttonState.pressed.size > 0 : t.mergedGamepadState.buttonState.pressed.has(h2);
    }
    o(nn, "isGamepadButtonPressed");
    function rn(h2) {
      return h2 === void 0 ? t.mergedGamepadState.buttonState.down.size > 0 : t.mergedGamepadState.buttonState.down.has(h2);
    }
    o(rn, "isGamepadButtonDown");
    function Qe(h2) {
      return h2 === void 0 ? t.mergedGamepadState.buttonState.released.size > 0 : t.mergedGamepadState.buttonState.released.has(h2);
    }
    o(Qe, "isGamepadButtonReleased");
    let sn = o((h2, y) => {
      if (typeof h2 == "function")
        return t.events.on("keyDown", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("keyDown", (x) => x === h2 && y(h2));
    }, "onKeyDown"), _e = o((h2, y) => {
      if (typeof h2 == "function")
        return t.events.on("keyPress", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("keyPress", (x) => x === h2 && y(h2));
    }, "onKeyPress"), on = o((h2, y) => {
      if (typeof h2 == "function")
        return t.events.on("keyPressRepeat", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("keyPressRepeat", (x) => x === h2 && y(h2));
    }, "onKeyPressRepeat"), an = o((h2, y) => {
      if (typeof h2 == "function")
        return t.events.on("keyRelease", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("keyRelease", (x) => x === h2 && y(h2));
    }, "onKeyRelease");
    function xt(h2, y) {
      return typeof h2 == "function" ? t.events.on("mouseDown", (x) => h2(x)) : t.events.on("mouseDown", (x) => x === h2 && y(x));
    }
    o(xt, "onMouseDown");
    function Et(h2, y) {
      return typeof h2 == "function" ? t.events.on("mousePress", (x) => h2(x)) : t.events.on("mousePress", (x) => x === h2 && y(x));
    }
    o(Et, "onMousePress");
    function St(h2, y) {
      return typeof h2 == "function" ? t.events.on("mouseRelease", (x) => h2(x)) : t.events.on("mouseRelease", (x) => x === h2 && y(x));
    }
    o(St, "onMouseRelease");
    function He(h2) {
      return t.events.on("mouseMove", () => h2(le(), se()));
    }
    o(He, "onMouseMove");
    function un(h2) {
      return t.events.on("charInput", h2);
    }
    o(un, "onCharInput");
    function cn(h2) {
      return t.events.on("touchStart", h2);
    }
    o(cn, "onTouchStart");
    function ln(h2) {
      return t.events.on("touchMove", h2);
    }
    o(ln, "onTouchMove");
    function hn(h2) {
      return t.events.on("touchEnd", h2);
    }
    o(hn, "onTouchEnd");
    function dn(h2) {
      return t.events.on("scroll", h2);
    }
    o(dn, "onScroll");
    function fn(h2, y) {
      if (typeof h2 == "function")
        return t.events.on("gamepadButtonDown", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("gamepadButtonDown", (x) => x === h2 && y(h2));
    }
    o(fn, "onGamepadButtonDown");
    function Ct(h2, y) {
      if (typeof h2 == "function")
        return t.events.on("gamepadButtonPress", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("gamepadButtonPress", (x) => x === h2 && y(h2));
    }
    o(Ct, "onGamepadButtonPress");
    function Tt(h2, y) {
      if (typeof h2 == "function")
        return t.events.on("gamepadButtonRelease", h2);
      if (typeof h2 == "string" && typeof y == "function")
        return t.events.on("gamepadButtonRelease", (x) => x === h2 && y(h2));
    }
    o(Tt, "onGamepadButtonRelease");
    function At(h2, y) {
      return t.events.on("gamepadStick", (x, ee) => x === h2 && y(ee));
    }
    o(At, "onGamepadStick");
    function Ot(h2) {
      t.events.on("gamepadConnect", h2);
    }
    o(Ot, "onGamepadConnect");
    function Pt(h2) {
      t.events.on("gamepadDisconnect", h2);
    }
    o(Pt, "onGamepadDisconnect");
    function mn(h2) {
      return t.mergedGamepadState.stickState.get(h2) || new b(0);
    }
    o(mn, "getGamepadStick");
    function dt() {
      return [...t.charInputted];
    }
    o(dt, "charInputted");
    function Rt() {
      return [...t.gamepads];
    }
    o(Rt, "getGamepads");
    function pn() {
      t.events.trigger("input"), t.keyState.down.forEach((h2) => t.events.trigger("keyDown", h2)), t.mouseState.down.forEach((h2) => t.events.trigger("mouseDown", h2)), Ft();
    }
    o(pn, "processInput");
    function Mt() {
      t.keyState.update(), t.mouseState.update(), t.mergedGamepadState.buttonState.update(), t.mergedGamepadState.stickState.forEach((h2, y) => {
        t.mergedGamepadState.stickState.set(y, new b(0));
      }), t.charInputted = [], t.isMouseMoved = false, t.gamepadStates.forEach((h2) => {
        h2.buttonState.update(), h2.stickState.forEach((y, x) => {
          h2.stickState.set(x, new b(0));
        });
      });
    }
    o(Mt, "resetInput");
    function Dt(h2) {
      let y = { index: h2.index, isPressed: (x) => t.gamepadStates.get(h2.index).buttonState.pressed.has(x), isDown: (x) => t.gamepadStates.get(h2.index).buttonState.down.has(x), isReleased: (x) => t.gamepadStates.get(h2.index).buttonState.released.has(x), getStick: (x) => t.gamepadStates.get(h2.index).stickState.get(x) };
      return t.gamepads.push(y), t.gamepadStates.set(h2.index, { buttonState: new Je(), stickState: /* @__PURE__ */ new Map([["left", new b(0)], ["right", new b(0)]]) }), y;
    }
    o(Dt, "registerGamepad");
    function Gt(h2) {
      t.gamepads = t.gamepads.filter((y) => y.index !== h2.index), t.gamepadStates.delete(h2.index);
    }
    o(Gt, "removeGamepad");
    function Ft() {
      for (let h2 of navigator.getGamepads())
        h2 && !t.gamepadStates.has(h2.index) && Dt(h2);
      for (let h2 of t.gamepads) {
        let y = navigator.getGamepads()[h2.index], ee = (s.gamepads ?? {})[y.id] ?? jn[y.id] ?? jn.default, ge = t.gamepadStates.get(h2.index);
        for (let I = 0; I < y.buttons.length; I++)
          y.buttons[I].pressed ? (ge.buttonState.down.has(ee.buttons[I]) || (t.mergedGamepadState.buttonState.press(ee.buttons[I]), ge.buttonState.press(ee.buttons[I]), t.events.trigger("gamepadButtonPress", ee.buttons[I])), t.events.trigger("gamepadButtonDown", ee.buttons[I])) : ge.buttonState.down.has(ee.buttons[I]) && (t.mergedGamepadState.buttonState.release(ee.buttons[I]), ge.buttonState.release(ee.buttons[I]), t.events.trigger("gamepadButtonRelease", ee.buttons[I]));
        for (let I in ee.sticks) {
          let de = ee.sticks[I], Me = new b(y.axes[de.x], y.axes[de.y]);
          ge.stickState.set(I, Me), t.mergedGamepadState.stickState.set(I, Me), t.events.trigger("gamepadStick", I, Me);
        }
      }
    }
    o(Ft, "processGamepad");
    let he = {}, qe = {}, Re = {};
    he.mousemove = (h2) => {
      let y = new b(h2.offsetX, h2.offsetY), x = new b(h2.movementX, h2.movementY);
      t.events.onOnce("input", () => {
        t.isMouseMoved = true, t.mousePos = y, t.mouseDeltaPos = x, t.events.trigger("mouseMove");
      });
    };
    let Ce = ["left", "middle", "right", "back", "forward"];
    he.mousedown = (h2) => {
      t.events.onOnce("input", () => {
        let y = Ce[h2.button];
        y && (t.mouseState.press(y), t.events.trigger("mousePress", y));
      });
    }, he.mouseup = (h2) => {
      t.events.onOnce("input", () => {
        let y = Ce[h2.button];
        y && (t.mouseState.release(y), t.events.trigger("mouseRelease", y));
      });
    };
    let gn = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), Bt = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    he.keydown = (h2) => {
      gn.has(h2.key) && h2.preventDefault(), t.events.onOnce("input", () => {
        let y = Bt[h2.key] || h2.key.toLowerCase();
        y.length === 1 ? (t.events.trigger("charInput", y), t.charInputted.push(y)) : y === "space" && (t.events.trigger("charInput", " "), t.charInputted.push(" ")), h2.repeat ? (t.keyState.pressRepeat(y), t.events.trigger("keyPressRepeat", y)) : (t.keyState.press(y), t.events.trigger("keyPressRepeat", y), t.events.trigger("keyPress", y));
      });
    }, he.keyup = (h2) => {
      t.events.onOnce("input", () => {
        let y = Bt[h2.key] || h2.key.toLowerCase();
        t.keyState.release(y), t.events.trigger("keyRelease", y);
      });
    }, he.touchstart = (h2) => {
      h2.preventDefault(), t.events.onOnce("input", () => {
        let y = [...h2.changedTouches];
        y.forEach((x) => {
          t.events.trigger("touchStart", new b(x.clientX, x.clientY), x);
        }), s.touchToMouse !== false && (t.mousePos = new b(y[0].clientX, y[0].clientY), t.mouseState.press("left"), t.events.trigger("mousePress", "left"));
      });
    }, he.touchmove = (h2) => {
      h2.preventDefault(), t.events.onOnce("input", () => {
        let y = [...h2.changedTouches];
        y.forEach((x) => {
          t.events.trigger("touchMove", new b(x.clientX, x.clientY), x);
        }), s.touchToMouse !== false && (t.mousePos = new b(y[0].clientX, y[0].clientY), t.events.trigger("mouseMove"));
      });
    }, he.touchend = (h2) => {
      t.events.onOnce("input", () => {
        let y = [...h2.changedTouches];
        y.forEach((x) => {
          t.events.trigger("touchEnd", new b(x.clientX, x.clientY), x);
        }), s.touchToMouse !== false && (t.mousePos = new b(y[0].clientX, y[0].clientY), t.mouseState.release("left"), t.events.trigger("mouseRelease", "left"));
      });
    }, he.touchcancel = (h2) => {
      t.events.onOnce("input", () => {
        let y = [...h2.changedTouches];
        y.forEach((x) => {
          t.events.trigger("touchEnd", new b(x.clientX, x.clientY), x);
        }), s.touchToMouse !== false && (t.mousePos = new b(y[0].clientX, y[0].clientY), t.mouseState.release("left"), t.events.trigger("mouseRelease", "left"));
      });
    }, he.wheel = (h2) => {
      h2.preventDefault(), t.events.onOnce("input", () => {
        t.events.trigger("scroll", new b(h2.deltaX, h2.deltaY));
      });
    }, he.contextmenu = (h2) => h2.preventDefault(), qe.visibilitychange = () => {
      document.visibilityState === "visible" && (t.skipTime = true);
    }, Re.gamepadconnected = (h2) => {
      let y = Dt(h2.gamepad);
      t.events.onOnce("input", () => {
        t.events.trigger("gamepadConnect", y);
      });
    }, Re.gamepaddisconnected = (h2) => {
      let y = Rt().filter((x) => x.index === h2.gamepad.index)[0];
      Gt(h2.gamepad), t.events.onOnce("input", () => {
        t.events.trigger("gamepadDisconnect", y);
      });
    };
    for (let h2 in he)
      t.canvas.addEventListener(h2, he[h2]);
    for (let h2 in qe)
      document.addEventListener(h2, qe[h2]);
    for (let h2 in Re)
      window.addEventListener(h2, Re[h2]);
    let Lt = new ResizeObserver((h2) => {
      for (let y of h2)
        if (y.target === t.canvas) {
          if (t.lastWidth === t.canvas.offsetWidth && t.lastHeight === t.canvas.offsetHeight)
            return;
          t.lastWidth = t.canvas.offsetWidth, t.lastHeight = t.canvas.offsetHeight, t.events.onOnce("input", () => {
            t.events.trigger("resize");
          });
        }
    });
    return Lt.observe(t.canvas), { dt: g, time: S, run: ce, canvas: c, fps: M, numFrames: z2, quit: w2, setFullscreen: me, isFullscreen: ke, setCursor: N, screenshot: q, getGamepads: Rt, getCursor: Z, setCursorLocked: ue, isCursorLocked: E, isTouchScreen: pe, mousePos: le, mouseDeltaPos: se, isKeyDown: ht, isKeyPressed: Be, isKeyPressedRepeat: tn, isKeyReleased: We, isMouseDown: B, isMousePressed: Ue, isMouseReleased: T, isMouseMoved: lt, isGamepadButtonPressed: nn, isGamepadButtonDown: rn, isGamepadButtonReleased: Qe, getGamepadStick: mn, charInputted: dt, onKeyDown: sn, onKeyPress: _e, onKeyPressRepeat: on, onKeyRelease: an, onMouseDown: xt, onMousePress: Et, onMouseRelease: St, onMouseMove: He, onCharInput: un, onTouchStart: cn, onTouchMove: ln, onTouchEnd: hn, onScroll: dn, onGamepadButtonDown: fn, onGamepadButtonPress: Ct, onGamepadButtonRelease: Tt, onGamepadStick: At, onGamepadConnect: Ot, onGamepadDisconnect: Pt, events: t.events, get paused() {
      return t.paused;
    }, set paused(h2) {
      t.paused = h2;
    } };
  }, "default");
  var Jt = 2.5949095;
  var Or = 1.70158 + 1;
  var Pr = 2 * Math.PI / 3;
  var Rr = 2 * Math.PI / 4.5;
  var Wt = { linear: (s) => s, easeInSine: (s) => 1 - Math.cos(s * Math.PI / 2), easeOutSine: (s) => Math.sin(s * Math.PI / 2), easeInOutSine: (s) => -(Math.cos(Math.PI * s) - 1) / 2, easeInQuad: (s) => s * s, easeOutQuad: (s) => 1 - (1 - s) * (1 - s), easeInOutQuad: (s) => s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2, easeInCubic: (s) => s * s * s, easeOutCubic: (s) => 1 - Math.pow(1 - s, 3), easeInOutCubic: (s) => s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2, easeInQuart: (s) => s * s * s * s, easeOutQuart: (s) => 1 - Math.pow(1 - s, 4), easeInOutQuart: (s) => s < 0.5 ? 8 * s * s * s * s : 1 - Math.pow(-2 * s + 2, 4) / 2, easeInQuint: (s) => s * s * s * s * s, easeOutQuint: (s) => 1 - Math.pow(1 - s, 5), easeInOutQuint: (s) => s < 0.5 ? 16 * s * s * s * s * s : 1 - Math.pow(-2 * s + 2, 5) / 2, easeInExpo: (s) => s === 0 ? 0 : Math.pow(2, 10 * s - 10), easeOutExpo: (s) => s === 1 ? 1 : 1 - Math.pow(2, -10 * s), easeInOutExpo: (s) => s === 0 ? 0 : s === 1 ? 1 : s < 0.5 ? Math.pow(2, 20 * s - 10) / 2 : (2 - Math.pow(2, -20 * s + 10)) / 2, easeInCirc: (s) => 1 - Math.sqrt(1 - Math.pow(s, 2)), easeOutCirc: (s) => Math.sqrt(1 - Math.pow(s - 1, 2)), easeInOutCirc: (s) => s < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * s, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * s + 2, 2)) + 1) / 2, easeInBack: (s) => Or * s * s * s - 1.70158 * s * s, easeOutBack: (s) => 1 + Or * Math.pow(s - 1, 3) + 1.70158 * Math.pow(s - 1, 2), easeInOutBack: (s) => s < 0.5 ? Math.pow(2 * s, 2) * ((Jt + 1) * 2 * s - Jt) / 2 : (Math.pow(2 * s - 2, 2) * ((Jt + 1) * (s * 2 - 2) + Jt) + 2) / 2, easeInElastic: (s) => s === 0 ? 0 : s === 1 ? 1 : -Math.pow(2, 10 * s - 10) * Math.sin((s * 10 - 10.75) * Pr), easeOutElastic: (s) => s === 0 ? 0 : s === 1 ? 1 : Math.pow(2, -10 * s) * Math.sin((s * 10 - 0.75) * Pr) + 1, easeInOutElastic: (s) => s === 0 ? 0 : s === 1 ? 1 : s < 0.5 ? -(Math.pow(2, 20 * s - 10) * Math.sin((20 * s - 11.125) * Rr)) / 2 : Math.pow(2, -20 * s + 10) * Math.sin((20 * s - 11.125) * Rr) / 2 + 1, easeInBounce: (s) => 1 - Wt.easeOutBounce(1 - s), easeOutBounce: (s) => s < 1 / 2.75 ? 7.5625 * s * s : s < 2 / 2.75 ? 7.5625 * (s -= 1.5 / 2.75) * s + 0.75 : s < 2.5 / 2.75 ? 7.5625 * (s -= 2.25 / 2.75) * s + 0.9375 : 7.5625 * (s -= 2.625 / 2.75) * s + 0.984375, easeInOutBounce: (s) => s < 0.5 ? (1 - Wt.easeOutBounce(1 - 2 * s)) / 2 : (1 + Wt.easeOutBounce(2 * s - 1)) / 2 };
  var at = Wt;
  var ut = class {
    time;
    action;
    finished = false;
    paused = false;
    constructor(t, c) {
      this.time = t, this.action = c;
    }
    tick(t) {
      return this.finished || this.paused ? false : (this.time -= t, this.time <= 0 ? (this.action(), this.finished = true, this.time = 0, true) : false);
    }
    reset(t) {
      this.time = t, this.finished = false;
    }
  };
  o(ut, "Timer");
  var Mr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var xi = {};
  mi(xi, { default: () => Nn });
  var Nn = pi("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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var Dr = "data:image/png;base64,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";
  var Gr = "data:image/png;base64,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";
  var Ti = "3000.0.0-beta.6";
  var Fr = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var Qt = "topleft";
  var Br = 64;
  var Ai = "monospace";
  var Zt = "monospace";
  var Oi = 36;
  var Lr = 64;
  var Vr = 256;
  var Ir = 2048;
  var jr = 2048;
  var Nr = 2048;
  var kr = 2048;
  var _r = 0.1;
  var Pi = 64;
  var Hr = "nearest";
  var Ri = 1;
  var zr = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var en = zr.reduce((s, t) => s + t.size, 0);
  var Kr = 2048;
  var qr = Kr * 4 * en;
  var $r = Kr * 6;
  var Mi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var Di = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var kn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var _n = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var Gi = /* @__PURE__ */ new Set(["id", "require"]);
  var Fi = /* @__PURE__ */ new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
  function ct(s) {
    switch (s) {
      case "topleft":
        return new b(-1, -1);
      case "top":
        return new b(0, -1);
      case "topright":
        return new b(1, -1);
      case "left":
        return new b(-1, 0);
      case "center":
        return new b(0, 0);
      case "right":
        return new b(1, 0);
      case "botleft":
        return new b(-1, 1);
      case "bot":
        return new b(0, 1);
      case "botright":
        return new b(1, 1);
      default:
        return s;
    }
  }
  o(ct, "anchorPt");
  function Bi(s) {
    switch (s) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  o(Bi, "alignPt");
  function Li(s) {
    return s.createBuffer(1, 1, 44100);
  }
  o(Li, "createEmptyAudioBuffer");
  var mo = o((s = {}) => {
    let t = s.root ?? document.body;
    t === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let c = s.canvas ?? (() => {
      let e = document.createElement("canvas");
      return t.appendChild(e), e;
    })(), g = s.scale ?? 1, S = s.width && s.height && !s.stretch && !s.letterbox;
    S ? (c.width = s.width * g, c.height = s.height * g) : (c.width = c.parentElement.offsetWidth, c.height = c.parentElement.offsetHeight);
    let M = c.width, z2 = c.height, q = s.pixelDensity || window.devicePixelRatio;
    c.width *= q, c.height *= q;
    let N = ["outline: none", "cursor: default"];
    S ? (N.push(`width: ${M}px`), N.push(`height: ${z2}px`)) : (N.push("width: 100%"), N.push("height: 100%")), s.crisp && (N.push("image-rendering: pixelated"), N.push("image-rendering: crisp-edges")), c.style.cssText = N.join(";"), c.tabIndex = 0;
    let Z = document.createElement("canvas");
    Z.width = Vr, Z.height = Vr;
    let ue = Z.getContext("2d", { willReadFrequently: true }), E = Ar({ canvas: c, touchToMouse: s.touchToMouse, gamepads: s.gamepads, pixelDensity: s.pixelDensity, maxFPS: s.maxFPS }), X = [], d = E.canvas().getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    class K {
      src = null;
      glTex;
      width;
      height;
      constructor(n, r, i = {}) {
        this.glTex = d.createTexture(), X.push(() => this.free()), this.bind(), n && r && d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, n, r, 0, d.RGBA, d.UNSIGNED_BYTE, null), this.width = n, this.height = r;
        let u = (() => {
          switch (i.filter ?? s.texFilter) {
            case "linear":
              return d.LINEAR;
            case "nearest":
              return d.NEAREST;
            default:
              return d.NEAREST;
          }
        })(), l = (() => {
          switch (i.wrap) {
            case "repeat":
              return d.REPEAT;
            case "clampToEdge":
              return d.CLAMP_TO_EDGE;
            default:
              return d.CLAMP_TO_EDGE;
          }
        })();
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, u), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, u), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, l), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, l), this.unbind();
      }
      static fromImage(n, r = {}) {
        let i = new K(0, 0, r);
        return i.bind(), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, n), i.width = n.width, i.height = n.height, i.unbind(), i.src = n, i;
      }
      update(n, r = 0, i = 0) {
        this.bind(), d.texSubImage2D(d.TEXTURE_2D, 0, r, i, d.RGBA, d.UNSIGNED_BYTE, n), this.unbind();
      }
      bind() {
        d.bindTexture(d.TEXTURE_2D, this.glTex);
      }
      unbind() {
        d.bindTexture(d.TEXTURE_2D, null);
      }
      free() {
        d.deleteTexture(this.glTex);
      }
    }
    o(K, "Texture");
    class me {
      tex;
      canvas;
      ctx;
      x = 0;
      y = 0;
      curHeight = 0;
      constructor(n, r) {
        this.canvas = document.createElement("canvas"), this.canvas.width = n, this.canvas.height = r, this.tex = K.fromImage(this.canvas), this.ctx = this.canvas.getContext("2d");
      }
      add(n) {
        if (n.width > this.canvas.width || n.height > this.canvas.height)
          throw new Error(`Texture size (${n.width} x ${n.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
        this.x + n.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + n.height > this.canvas.height && (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.tex = K.fromImage(this.canvas), this.x = 0, this.y = 0, this.curHeight = 0);
        let r = new b(this.x, this.y);
        return this.x += n.width, n.height > this.curHeight && (this.curHeight = n.height), n instanceof ImageData ? this.ctx.putImageData(n, r.x, r.y) : this.ctx.drawImage(n, r.x, r.y), this.tex.update(this.canvas), [this.tex, new Q(r.x / this.canvas.width, r.y / this.canvas.height, n.width / this.canvas.width, n.height / this.canvas.height)];
      }
    }
    o(me, "TexPacker");
    class ke {
      tex;
      glFrameBuffer;
      glRenderBuffer;
      constructor(n, r, i = {}) {
        this.tex = new K(n, r, i), this.glFrameBuffer = d.createFramebuffer(), this.glRenderBuffer = d.createRenderbuffer(), X.push(() => this.free()), this.bind(), d.renderbufferStorage(d.RENDERBUFFER, d.DEPTH_STENCIL, n, r), d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, this.tex.glTex, 0), d.framebufferRenderbuffer(d.FRAMEBUFFER, d.DEPTH_STENCIL_ATTACHMENT, d.RENDERBUFFER, this.glRenderBuffer), this.unbind();
      }
      bind() {
        d.bindFramebuffer(d.FRAMEBUFFER, this.glFrameBuffer), d.bindRenderbuffer(d.RENDERBUFFER, this.glRenderBuffer);
      }
      unbind() {
        d.bindFramebuffer(d.FRAMEBUFFER, null), d.bindRenderbuffer(d.RENDERBUFFER, null);
      }
      free() {
        d.deleteFramebuffer(this.glFrameBuffer), d.deleteRenderbuffer(this.glRenderBuffer);
      }
    }
    o(ke, "FrameBuffer");
    let w2 = (() => {
      let e = he(kn, _n), n = K.fromImage(new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), r = new ke(d.drawingBufferWidth, d.drawingBufferHeight), i = null, u = 1;
      s.background && (i = L.fromArray(s.background), u = s.background[3] ?? 1, d.clearColor(i.r / 255, i.g / 255, i.b / 255, u)), d.enable(d.BLEND), d.enable(d.SCISSOR_TEST), d.blendFuncSeparate(d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA, d.ONE, d.ONE_MINUS_SRC_ALPHA);
      let l = d.createBuffer();
      d.bindBuffer(d.ARRAY_BUFFER, l), d.bufferData(d.ARRAY_BUFFER, qr * 4, d.DYNAMIC_DRAW), zr.reduce((f, p, U) => (d.vertexAttribPointer(U, p.size, d.FLOAT, false, en * 4, f), d.enableVertexAttribArray(U), f + p.size * 4), 0), d.bindBuffer(d.ARRAY_BUFFER, null);
      let a = d.createBuffer();
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, a), d.bufferData(d.ELEMENT_ARRAY_BUFFER, $r * 4, d.DYNAMIC_DRAW), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null);
      let m = K.fromImage(new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
      return { drawCalls: 0, lastDrawCalls: 0, defShader: e, curShader: e, frameBuffer: r, postShader: null, postShaderUniform: null, defTex: n, curTex: n, curUniform: {}, vbuf: l, ibuf: a, vqueue: [], iqueue: [], transform: new W(), transformStack: [], bgTex: m, bgColor: i, bgAlpha: u, width: s.width, height: s.height, viewport: { x: 0, y: 0, width: d.drawingBufferWidth, height: d.drawingBufferHeight } };
    })();
    class ce {
      tex;
      frames = [new Q(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(n, r, i = {}, u = null) {
        this.tex = n, r && (this.frames = r), this.anims = i, this.slice9 = u;
      }
      static from(n, r = {}) {
        return typeof n == "string" ? ce.fromURL(n, r) : Promise.resolve(ce.fromImage(n, r));
      }
      static fromImage(n, r = {}) {
        let [i, u] = B.packer.add(n), l = r.frames ? r.frames.map((a) => new Q(u.x + a.x * u.w, u.y + a.y * u.h, a.w * u.w, a.h * u.h)) : xt(r.sliceX || 1, r.sliceY || 1, u.x, u.y, u.w, u.h);
        return new ce(i, l, r.anims, r.slice9);
      }
      static fromURL(n, r = {}) {
        return Qe(n).then((i) => ce.fromImage(i, r));
      }
    }
    o(ce, "SpriteData");
    class pe {
      buf;
      constructor(n) {
        this.buf = n;
      }
      static fromArrayBuffer(n) {
        return new Promise((r, i) => le.ctx.decodeAudioData(n, r, i)).then((r) => new pe(r));
      }
      static fromURL(n) {
        return In(n) ? pe.fromArrayBuffer(Er(n)) : rn(n).then((r) => pe.fromArrayBuffer(r));
      }
    }
    o(pe, "SoundData");
    let le = (() => {
      let e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain();
      n.connect(e.destination);
      let r = new pe(Li(e));
      return e.decodeAudioData(Nn.buffer.slice(0)).then((i) => {
        r.buf = i;
      }).catch((i) => {
        console.error("Failed to load burp: ", i);
      }), { ctx: e, masterNode: n, burpSnd: r };
    })();
    class se {
      loaded = false;
      data = null;
      error = null;
      onLoadEvents = new ve();
      onErrorEvents = new ve();
      onFinishEvents = new ve();
      constructor(n) {
        n.then((r) => {
          this.data = r, this.onLoadEvents.trigger(r);
        }).catch((r) => {
          if (this.error = r, this.onErrorEvents.numListeners() > 0)
            this.onErrorEvents.trigger(r);
          else
            throw r;
        }).finally(() => {
          this.onFinishEvents.trigger(), this.loaded = true;
        });
      }
      static loaded(n) {
        let r = new se(Promise.resolve(n));
        return r.data = n, r.loaded = true, r;
      }
      onLoad(n) {
        return this.loaded && this.data ? n(this.data) : this.onLoadEvents.add(n), this;
      }
      onError(n) {
        return this.loaded && this.error ? n(this.error) : this.onErrorEvents.add(n), this;
      }
      onFinish(n) {
        return this.loaded ? n() : this.onFinishEvents.add(n), this;
      }
      then(n) {
        return this.onLoad(n);
      }
      catch(n) {
        return this.onError(n);
      }
      finally(n) {
        return this.onFinish(n);
      }
    }
    o(se, "Asset");
    class Ue {
      assets = /* @__PURE__ */ new Map();
      lastUID = 0;
      add(n, r) {
        let i = n ?? this.lastUID++ + "", u = new se(r);
        return this.assets.set(i, u), u;
      }
      addLoaded(n, r) {
        let i = n ?? this.lastUID++ + "", u = se.loaded(r);
        return this.assets.set(i, u), u;
      }
      get(n) {
        return this.assets.get(n);
      }
      progress() {
        if (this.assets.size === 0)
          return 1;
        let n = 0;
        return this.assets.forEach((r) => {
          r.loaded && n++;
        }), n / this.assets.size;
      }
    }
    o(Ue, "AssetBucket");
    let B = { urlPrefix: "", sprites: new Ue(), fonts: new Ue(), bitmapFonts: new Ue(), sounds: new Ue(), shaders: new Ue(), custom: new Ue(), packer: new me(Nr, kr), loaded: false }, T = { events: new Fe(), objEvents: new Fe(), root: Qn([]), gravity: 0, scenes: {}, logs: [], cam: { pos: null, scale: new b(1), angle: 0, shake: 0, transform: new W() } };
    function lt(e) {
      return B.custom.add(null, e);
    }
    o(lt, "load");
    function Be() {
      let e = [B.sprites, B.sounds, B.shaders, B.fonts, B.bitmapFonts, B.custom];
      return e.reduce((n, r) => n + r.progress(), 0) / e.length;
    }
    o(Be, "loadProgress");
    function tn(e) {
      return e !== void 0 && (B.urlPrefix = e), B.urlPrefix;
    }
    o(tn, "loadRoot");
    function ht(e) {
      let n = B.urlPrefix + e;
      return fetch(n).then((r) => {
        if (!r.ok)
          throw new Error(`Failed to fetch ${n}`);
        return r;
      });
    }
    o(ht, "fetchURL");
    function We(e) {
      return ht(e).then((n) => n.json());
    }
    o(We, "fetchJSON");
    function nn(e) {
      return ht(e).then((n) => n.text());
    }
    o(nn, "fetchText");
    function rn(e) {
      return ht(e).then((n) => n.arrayBuffer());
    }
    o(rn, "fetchArrayBuffer");
    function Qe(e) {
      let n = new Image();
      return n.crossOrigin = "anonymous", n.src = In(e) ? e : B.urlPrefix + e, new Promise((r, i) => {
        n.onload = () => r(n), n.onerror = () => i(new Error(`Failed to load image from "${e}"`));
      });
    }
    o(Qe, "loadImg");
    function sn(e, n) {
      return B.custom.add(e, We(n));
    }
    o(sn, "loadJSON");
    class _e {
      fontface;
      outline;
      filter;
      constructor(n, r = {}) {
        this.fontface = n, this.outline = r.outline ?? 0, this.filter = r.filter ?? Hr;
      }
    }
    o(_e, "FontData");
    function on(e, n, r = {}) {
      let i = new FontFace(e, typeof n == "string" ? `url(${n})` : n);
      return document.fonts.add(i), B.fonts.add(e, i.load().catch((u) => {
        throw new Error(`Failed to load font from "${n}": ${u}`);
      }).then((u) => new _e(u, r)));
    }
    o(on, "loadFont");
    function an(e, n, r, i, u = {}) {
      return B.bitmapFonts.add(e, Qe(n).then((l) => qe(K.fromImage(l, u), r, i, u.chars ?? Fr)));
    }
    o(an, "loadBitmapFont");
    function xt(e = 1, n = 1, r = 0, i = 0, u = 1, l = 1) {
      let a = [], m = u / e, f = l / n;
      for (let p = 0; p < n; p++)
        for (let U = 0; U < e; U++)
          a.push(new Q(r + U * m, i + p * f, m, f));
      return a;
    }
    o(xt, "slice");
    function Et(e, n) {
      return lt(typeof n == "string" ? new Promise((r, i) => {
        We(n).then((u) => {
          Et(e, u).then(r).catch(i);
        });
      }) : ce.from(e).then((r) => {
        let i = {};
        for (let u in n) {
          let l = n[u], a = r.frames[0], m = Nr * a.w, f = kr * a.h, p = l.frames ? l.frames.map((D) => new Q(a.x + (l.x + D.x) / m * a.w, a.y + (l.y + D.y) / f * a.h, D.w / m * a.w, D.h / f * a.h)) : xt(l.sliceX || 1, l.sliceY || 1, a.x + l.x / m * a.w, a.y + l.y / f * a.h, l.width / m * a.w, l.height / f * a.h), U = new ce(r.tex, p, l.anims);
          B.sprites.addLoaded(u, U), i[u] = U;
        }
        return i;
      }));
    }
    o(Et, "loadSpriteAtlas");
    function St(e, n = {}) {
      let r = document.createElement("canvas"), i = e[0].width, u = e[0].height;
      r.width = i * e.length, r.height = u;
      let l = r.getContext("2d");
      e.forEach((m, f) => {
        m instanceof ImageData ? l.putImageData(m, f * i, 0) : l.drawImage(m, f * i, 0);
      });
      let a = l.getImageData(0, 0, e.length * i, u);
      return ce.fromImage(a, { ...n, sliceX: e.length, sliceY: 1 });
    }
    o(St, "createSpriteSheet");
    function He(e, n, r = { sliceX: 1, sliceY: 1, anims: {} }) {
      return Array.isArray(n) ? n.some((i) => typeof i == "string") ? B.sprites.add(e, Promise.all(n.map((i) => typeof i == "string" ? Qe(i) : Promise.resolve(i))).then((i) => St(i, r))) : B.sprites.addLoaded(e, St(n, r)) : typeof n == "string" ? B.sprites.add(e, ce.from(n, r)) : B.sprites.addLoaded(e, ce.fromImage(n, r));
    }
    o(He, "loadSprite");
    function un(e, n) {
      return B.sprites.add(e, new Promise(async (r) => {
        let i = typeof n == "string" ? await We(n) : n, u = await Promise.all(i.frames.map(Qe)), l = document.createElement("canvas");
        l.width = i.width, l.height = i.height * i.frames.length;
        let a = l.getContext("2d");
        u.forEach((f, p) => {
          a.drawImage(f, 0, p * i.height);
        });
        let m = await He(null, l, { sliceY: i.frames.length, anims: i.anims });
        r(m);
      }));
    }
    o(un, "loadPedit");
    function cn(e, n, r) {
      typeof n == "string" && !r && (r = n.replace(new RegExp(`${Cr(n)}$`), "json"));
      let i = typeof r == "string" ? We(r) : Promise.resolve(r);
      return B.sprites.add(e, i.then((u) => {
        let l = u.meta.size, a = u.frames.map((f) => new Q(f.frame.x / l.w, f.frame.y / l.h, f.frame.w / l.w, f.frame.h / l.h)), m = {};
        for (let f of u.meta.frameTags)
          f.from === f.to ? m[f.name] = f.from : m[f.name] = { from: f.from, to: f.to, speed: 10, loop: true, pingpong: f.direction === "pingpong" };
        return ce.from(n, { frames: a, anims: m });
      }));
    }
    o(cn, "loadAseprite");
    function ln(e, n, r) {
      return B.shaders.addLoaded(e, he(n, r));
    }
    o(ln, "loadShader");
    function hn(e, n, r) {
      let i = o((l) => l ? nn(l) : Promise.resolve(null), "resolveUrl"), u = Promise.all([i(n), i(r)]).then(([l, a]) => he(l, a));
      return B.shaders.add(e, u);
    }
    o(hn, "loadShaderURL");
    function dn(e, n, r = {}) {
      return B.sounds.add(e, typeof n == "string" ? pe.fromURL(n) : pe.fromArrayBuffer(n));
    }
    o(dn, "loadSound");
    function fn(e = "bean") {
      return He(e, Mr);
    }
    o(fn, "loadBean");
    function Ct(e) {
      return B.sprites.get(e);
    }
    o(Ct, "getSprite");
    function Tt(e) {
      return B.sounds.get(e);
    }
    o(Tt, "getSound");
    function At(e) {
      return B.fonts.get(e);
    }
    o(At, "getFont");
    function Ot(e) {
      return B.bitmapFonts.get(e);
    }
    o(Ot, "getBitmapFont");
    function Pt(e) {
      return B.shaders.get(e);
    }
    o(Pt, "getShader");
    function mn(e) {
      return B.custom.get(e);
    }
    o(mn, "getAsset");
    function dt(e) {
      if (typeof e == "string") {
        let n = Ct(e);
        if (n)
          return n;
        if (Be() < 1)
          return null;
        throw new Error(`Sprite not found: ${e}`);
      } else {
        if (e instanceof ce)
          return se.loaded(e);
        if (e instanceof se)
          return e;
        throw new Error(`Invalid sprite: ${e}`);
      }
    }
    o(dt, "resolveSprite");
    function Rt(e) {
      if (typeof e == "string") {
        let n = Tt(e);
        if (n)
          return n;
        if (Be() < 1)
          return null;
        throw new Error(`Sound not found: ${e}`);
      } else {
        if (e instanceof pe)
          return se.loaded(e);
        if (e instanceof se)
          return e;
        throw new Error(`Invalid sound: ${e}`);
      }
    }
    o(Rt, "resolveSound");
    function pn(e) {
      if (!e)
        return w2.defShader;
      if (typeof e == "string") {
        let n = Pt(e);
        if (n)
          return n.data ?? n;
        if (Be() < 1)
          return null;
        throw new Error(`Shader not found: ${e}`);
      } else if (e instanceof se)
        return e.data ? e.data : e;
      return e;
    }
    o(pn, "resolveShader");
    function Mt(e) {
      if (!e)
        return Mt(s.font ?? Ai);
      if (typeof e == "string") {
        let n = Ot(e), r = At(e);
        if (n)
          return n.data ?? n;
        if (r)
          return r.data ?? r;
        if (document.fonts.check(`${Lr}px ${e}`))
          return e;
        if (Be() < 1)
          return null;
        throw new Error(`Font not found: ${e}`);
      } else if (e instanceof se)
        return e.data ? e.data : e;
      return e;
    }
    o(Mt, "resolveFont");
    function Dt(e) {
      return e !== void 0 && (le.masterNode.gain.value = e), le.masterNode.gain.value;
    }
    o(Dt, "volume");
    function Gt(e, n = {}) {
      let r = le.ctx, i = n.paused ?? false, u = r.createBufferSource(), l = new ve(), a = r.createGain(), m = n.seek ?? 0, f = 0, p = 0, U = false;
      u.loop = !!n.loop, u.detune.value = n.detune ?? 0, u.playbackRate.value = n.speed ?? 1, u.connect(a), u.onended = () => {
        V() >= u.buffer?.duration && l.trigger();
      }, a.connect(le.masterNode), a.gain.value = n.volume ?? 1;
      let D = o((O) => {
        u.buffer = O.buf, i || (f = r.currentTime, u.start(0, m), U = true);
      }, "start"), H = Rt(e);
      H instanceof se && H.onLoad(D);
      let V = o(() => {
        if (!u.buffer)
          return 0;
        let O = i ? p - f : r.currentTime - f, A = u.buffer.duration;
        return u.loop ? O % A : Math.min(O, A);
      }, "getTime"), $ = o((O) => {
        let A = r.createBufferSource();
        return A.buffer = O.buffer, A.loop = O.loop, A.playbackRate.value = O.playbackRate.value, A.detune.value = O.detune.value, A.onended = O.onended, A.connect(a), A;
      }, "cloneNode");
      return { set paused(O) {
        if (i !== O)
          if (i = O, O)
            U && (u.stop(), U = false), p = r.currentTime;
          else {
            u = $(u);
            let A = p - f;
            u.start(0, A), U = true, f = r.currentTime - A, p = 0;
          }
      }, get paused() {
        return i;
      }, play(O = 0) {
        this.seek(O), this.paused = false;
      }, seek(O) {
        u.buffer?.duration && (O > u.buffer.duration || (i ? (u = $(u), f = p - O) : (u.stop(), u = $(u), f = r.currentTime - O, u.start(0, O), U = true, p = 0)));
      }, set speed(O) {
        u.playbackRate.value = O;
      }, get speed() {
        return u.playbackRate.value;
      }, set detune(O) {
        u.detune.value = O;
      }, get detune() {
        return u.detune.value;
      }, set volume(O) {
        a.gain.value = Math.max(O, 0);
      }, get volume() {
        return a.gain.value;
      }, set loop(O) {
        u.loop = O;
      }, get loop() {
        return u.loop;
      }, duration() {
        return u.buffer?.duration ?? 0;
      }, time() {
        return V() % this.duration();
      }, onEnd(O) {
        return l.add(O);
      }, then(O) {
        return this.onEnd(O);
      } };
    }
    o(Gt, "play");
    function Ft(e) {
      return Gt(le.burpSnd, e);
    }
    o(Ft, "burp");
    function he(e = kn, n = _n) {
      let r = Mi.replace("{{user}}", e ?? kn), i = Di.replace("{{user}}", n ?? _n), u = d.createShader(d.VERTEX_SHADER), l = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(u, r), d.shaderSource(l, i), d.compileShader(u), d.compileShader(l);
      let a = d.createProgram();
      if (X.push(() => d.deleteProgram(a)), d.attachShader(a, u), d.attachShader(a, l), d.bindAttribLocation(a, 0, "a_pos"), d.bindAttribLocation(a, 1, "a_uv"), d.bindAttribLocation(a, 2, "a_color"), d.linkProgram(a), !d.getProgramParameter(a, d.LINK_STATUS)) {
        let m = o((D) => {
          let H = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/, V = D.match(H);
          return { line: Number(V.groups.line), msg: V.groups.msg.replace(/\n\0$/, "") };
        }, "formatShaderError"), f = d.getShaderInfoLog(u), p = d.getShaderInfoLog(l), U = "";
        if (f) {
          let D = m(f);
          U += `Vertex shader line ${D.line - 14}: ${D.msg}`;
        }
        if (p) {
          let D = m(p);
          U += `Fragment shader line ${D.line - 14}: ${D.msg}`;
        }
        throw new Error(U);
      }
      return d.deleteShader(u), d.deleteShader(l), { bind() {
        d.useProgram(a);
      }, unbind() {
        d.useProgram(null);
      }, free() {
        d.deleteProgram(a);
      }, send(m) {
        for (let f in m) {
          let p = m[f], U = d.getUniformLocation(a, f);
          typeof p == "number" ? d.uniform1f(U, p) : p instanceof W ? d.uniformMatrix4fv(U, false, new Float32Array(p.m)) : p instanceof L ? d.uniform3f(U, p.r, p.g, p.b) : p instanceof b && d.uniform2f(U, p.x, p.y);
        }
      } };
    }
    o(he, "makeShader");
    function qe(e, n, r, i) {
      let u = e.width / n, l = {}, a = i.split("").entries();
      for (let [m, f] of a)
        l[f] = new Q(m % u * n, Math.floor(m / u) * r, n, r);
      return { tex: e, map: l, size: r };
    }
    o(qe, "makeFont");
    function Re(e, n, r, i = w2.defTex, u = w2.defShader, l = {}) {
      let a = pn(u);
      if (!a || a instanceof se)
        return;
      (i !== w2.curTex || a !== w2.curShader || !Bn(w2.curUniform, l) || w2.vqueue.length + e.length * en > qr || w2.iqueue.length + n.length > $r) && Ce();
      let m = r ? w2.transform : T.cam.transform.mult(w2.transform);
      for (let f of e) {
        let p = h2(m.multVec2(f.pos));
        w2.vqueue.push(p.x, p.y, f.uv.x, f.uv.y, f.color.r / 255, f.color.g / 255, f.color.b / 255, f.opacity);
      }
      for (let f of n)
        w2.iqueue.push(f + w2.vqueue.length / en - e.length);
      w2.curTex = i, w2.curShader = a, w2.curUniform = l;
    }
    o(Re, "drawRaw");
    function Ce() {
      !w2.curTex || !w2.curShader || w2.vqueue.length === 0 || w2.iqueue.length === 0 || (d.bindBuffer(d.ARRAY_BUFFER, w2.vbuf), d.bufferSubData(d.ARRAY_BUFFER, 0, new Float32Array(w2.vqueue)), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, w2.ibuf), d.bufferSubData(d.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(w2.iqueue)), w2.curShader.bind(), w2.curShader.send(w2.curUniform), w2.curTex.bind(), d.drawElements(d.TRIANGLES, w2.iqueue.length, d.UNSIGNED_SHORT, 0), w2.curTex.unbind(), w2.curShader.unbind(), d.bindBuffer(d.ARRAY_BUFFER, null), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null), w2.vqueue.length = 0, w2.iqueue.length = 0, w2.drawCalls++);
    }
    o(Ce, "flush");
    function gn() {
      d.clear(d.COLOR_BUFFER_BIT), w2.frameBuffer.bind(), d.clear(d.COLOR_BUFFER_BIT), w2.bgColor || Le(() => {
        Me({ width: we(), height: ye(), quad: new Q(0, 0, we() / Br, ye() / Br), tex: w2.bgTex, fixed: true });
      }), w2.drawCalls = 0, w2.transformStack.length = 0, w2.transform = new W();
    }
    o(gn, "frameStart");
    function Bt(e, n) {
      w2.postShader = e, w2.postShaderUniform = n ?? null;
    }
    o(Bt, "usePostEffect");
    function Lt() {
      Ce(), w2.frameBuffer.unbind(), Le(() => {
        Vt({ flipY: true, tex: w2.frameBuffer.tex, scale: new b(1 / q), shader: w2.postShader, uniform: typeof w2.postShaderUniform == "function" ? w2.postShaderUniform() : w2.postShaderUniform, fixed: true });
      }), Ce(), w2.lastDrawCalls = w2.drawCalls;
    }
    o(Lt, "frameEnd");
    function h2(e) {
      return new b(e.x / we() * 2 - 1, -e.y / ye() * 2 + 1);
    }
    o(h2, "screen2ndc");
    function y(e) {
      w2.transform = e.clone();
    }
    o(y, "pushMatrix");
    function x(...e) {
      if (e[0] === void 0)
        return;
      let n = C(...e);
      n.x === 0 && n.y === 0 || w2.transform.translate(n);
    }
    o(x, "pushTranslate");
    function ee(...e) {
      if (e[0] === void 0)
        return;
      let n = C(...e);
      n.x === 1 && n.y === 1 || w2.transform.scale(n);
    }
    o(ee, "pushScale");
    function ge(e) {
      e && w2.transform.rotate(e);
    }
    o(ge, "pushRotate");
    function I() {
      w2.transformStack.push(w2.transform.clone());
    }
    o(I, "pushTransform");
    function de() {
      w2.transformStack.length > 0 && (w2.transform = w2.transformStack.pop());
    }
    o(de, "popTransform");
    function Me(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let n = e.width, r = e.height, u = ct(e.anchor || Qt).scale(new b(n, r).scale(-0.5)), l = e.quad || new Q(0, 0, 1, 1), a = e.color || J(255, 255, 255), m = e.opacity ?? 1, f = e.tex ? _r / e.tex.width : 0, p = e.tex ? _r / e.tex.height : 0, U = l.x + f, D = l.y + p, H = l.w - f * 2, V = l.h - p * 2;
      I(), x(e.pos), ge(e.angle), ee(e.scale), x(u), Re([{ pos: new b(-n / 2, r / 2), uv: new b(e.flipX ? U + H : U, e.flipY ? D : D + V), color: a, opacity: m }, { pos: new b(-n / 2, -r / 2), uv: new b(e.flipX ? U + H : U, e.flipY ? D + V : D), color: a, opacity: m }, { pos: new b(n / 2, -r / 2), uv: new b(e.flipX ? U : U + H, e.flipY ? D + V : D), color: a, opacity: m }, { pos: new b(n / 2, r / 2), uv: new b(e.flipX ? U : U + H, e.flipY ? D : D + V), color: a, opacity: m }], [0, 1, 3, 1, 2, 3], e.fixed, e.tex, e.shader, e.uniform), de();
    }
    o(Me, "drawUVQuad");
    function Vt(e) {
      if (!e.tex)
        throw new Error('drawTexture() requires property "tex".');
      let n = e.quad ?? new Q(0, 0, 1, 1), r = e.tex.width * n.w, i = e.tex.height * n.h, u = new b(1);
      if (e.tiled) {
        let l = Math.ceil((e.width || r) / r), a = Math.ceil((e.height || i) / i), f = ct(e.anchor || Qt).add(new b(1, 1)).scale(0.5).scale(l * r, a * i);
        for (let p = 0; p < l; p++)
          for (let U = 0; U < a; U++)
            Me(Object.assign({}, e, { pos: (e.pos || new b(0)).add(new b(r * p, i * U)).sub(f), scale: u.scale(e.scale || new b(1)), tex: e.tex, quad: n, width: r, height: i, anchor: "topleft" }));
      } else
        e.width && e.height ? (u.x = e.width / r, u.y = e.height / i) : e.width ? (u.x = e.width / r, u.y = u.x) : e.height && (u.y = e.height / i, u.x = u.y), Me(Object.assign({}, e, { scale: u.scale(e.scale || new b(1)), tex: e.tex, quad: n, width: r, height: i }));
    }
    o(Vt, "drawTexture");
    function Yr(e) {
      if (!e.sprite)
        throw new Error('drawSprite() requires property "sprite"');
      let n = dt(e.sprite);
      if (!n || !n.data)
        return;
      let r = n.data.frames[e.frame ?? 0];
      if (!r)
        throw new Error(`Frame not found: ${e.frame ?? 0}`);
      Vt(Object.assign({}, e, { tex: n.data.tex, quad: r.scale(e.quad ?? new Q(0, 0, 1, 1)) }));
    }
    o(Yr, "drawSprite");
    function ft(e, n, r, i, u, l = 1) {
      i = De(i % 360), u = De(u % 360), u <= i && (u += Math.PI * 2);
      let a = [], m = Math.ceil((u - i) / De(8) * l), f = (u - i) / m;
      for (let p = i; p < u; p += f)
        a.push(e.add(n * Math.cos(p), r * Math.sin(p)));
      return a.push(e.add(n * Math.cos(u), r * Math.sin(u))), a;
    }
    o(ft, "getArcPts");
    function Te(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let n = e.width, r = e.height, u = ct(e.anchor || Qt).add(1, 1).scale(new b(n, r).scale(-0.5)), l = [new b(0, 0), new b(n, 0), new b(n, r), new b(0, r)];
      if (e.radius) {
        let a = Math.min(Math.min(n, r) / 2, e.radius);
        l = [new b(a, 0), new b(n - a, 0), ...ft(new b(n - a, a), a, a, 270, 360), new b(n, a), new b(n, r - a), ...ft(new b(n - a, r - a), a, a, 0, 90), new b(n - a, r), new b(a, r), ...ft(new b(a, r - a), a, a, 90, 180), new b(0, r - a), new b(0, a), ...ft(new b(a, a), a, a, 180, 270)];
      }
      $e(Object.assign({}, e, { offset: u, pts: l, ...e.gradient ? { colors: e.horizontal ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]] : [e.gradient[0], e.gradient[0], e.gradient[1], e.gradient[1]] } : {} }));
    }
    o(Te, "drawRect");
    function mt(e) {
      let { p1: n, p2: r } = e;
      if (!n || !r)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let i = e.width || 1, u = r.sub(n).unit().normal().scale(i * 0.5), l = [n.sub(u), n.add(u), r.add(u), r.sub(u)].map((a) => ({ pos: new b(a.x, a.y), uv: new b(0), color: e.color ?? L.WHITE, opacity: e.opacity ?? 1 }));
      Re(l, [0, 1, 3, 1, 2, 3], e.fixed, w2.defTex, e.shader, e.uniform);
    }
    o(mt, "drawLine");
    function Hn(e) {
      let n = e.pts;
      if (!n)
        throw new Error('drawLines() requires property "pts".');
      if (!(n.length < 2))
        if (e.radius && n.length >= 3) {
          let r = n[0].sdist(n[1]);
          for (let u = 1; u < n.length - 1; u++)
            r = Math.min(n[u].sdist(n[u + 1]), r);
          let i = Math.min(e.radius, Math.sqrt(r) / 2);
          mt(Object.assign({}, e, { p1: n[0], p2: n[1] }));
          for (let u = 1; u < n.length - 2; u++) {
            let l = n[u], a = n[u + 1];
            mt(Object.assign({}, e, { p1: l, p2: a }));
          }
          mt(Object.assign({}, e, { p1: n[n.length - 2], p2: n[n.length - 1] }));
        } else
          for (let r = 0; r < n.length - 1; r++)
            mt(Object.assign({}, e, { p1: n[r], p2: n[r + 1] })), e.join !== "none" && Ze(Object.assign({}, e, { pos: n[r], radius: e.width / 2 }));
    }
    o(Hn, "drawLines");
    function qn(e) {
      if (!e.p1 || !e.p2 || !e.p3)
        throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
      return $e(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
    }
    o(qn, "drawTriangle");
    function Ze(e) {
      if (!e.radius)
        throw new Error('drawCircle() requires property "radius".');
      e.radius !== 0 && $n(Object.assign({}, e, { radiusX: e.radius, radiusY: e.radius, angle: 0 }));
    }
    o(Ze, "drawCircle");
    function $n(e) {
      if (e.radiusX === void 0 || e.radiusY === void 0)
        throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
      if (e.radiusX === 0 || e.radiusY === 0)
        return;
      let n = e.start ?? 0, r = e.end ?? 360, i = ct(e.anchor ?? "center").scale(new b(-e.radiusX, -e.radiusY)), u = ft(i, e.radiusX, e.radiusY, n, r, e.resolution);
      u.unshift(i);
      let l = Object.assign({}, e, { pts: u, radius: 0, ...e.gradient ? { colors: [e.gradient[0], ...Array(u.length - 1).fill(e.gradient[1])] } : {} });
      if (r - n >= 360 && e.outline) {
        e.fill !== false && $e(Object.assign(l, { outline: null })), $e(Object.assign(l, { pts: u.slice(1), fill: false }));
        return;
      }
      $e(l);
    }
    o($n, "drawEllipse");
    function $e(e) {
      if (!e.pts)
        throw new Error('drawPolygon() requires property "pts".');
      let n = e.pts.length;
      if (!(n < 3)) {
        if (I(), x(e.pos), ee(e.scale), ge(e.angle), x(e.offset), e.fill !== false) {
          let r = e.color ?? L.WHITE, i = e.pts.map((l, a) => ({ pos: new b(l.x, l.y), uv: new b(0, 0), color: e.colors ? e.colors[a] ?? r : r, opacity: e.opacity ?? 1 })), u = [...Array(n - 2).keys()].map((l) => [0, l + 1, l + 2]).flat();
          Re(i, e.indices ?? u, e.fixed, w2.defTex, e.shader, e.uniform);
        }
        e.outline && Hn({ pts: [...e.pts, e.pts[0]], radius: e.radius, width: e.outline.width, color: e.outline.color, join: e.outline.join, uniform: e.uniform, fixed: e.fixed, opacity: e.opacity }), de();
      }
    }
    o($e, "drawPolygon");
    function zn(e, n, r) {
      Ce(), d.clear(d.STENCIL_BUFFER_BIT), d.enable(d.STENCIL_TEST), d.stencilFunc(d.NEVER, 1, 255), d.stencilOp(d.REPLACE, d.REPLACE, d.REPLACE), n(), Ce(), d.stencilFunc(r, 1, 255), d.stencilOp(d.KEEP, d.KEEP, d.KEEP), e(), Ce(), d.disable(d.STENCIL_TEST);
    }
    o(zn, "drawStenciled");
    function Xr(e, n) {
      zn(e, n, d.EQUAL);
    }
    o(Xr, "drawMasked");
    function Jr(e, n) {
      zn(e, n, d.NOTEQUAL);
    }
    o(Jr, "drawSubtracted");
    function Kn() {
      return (w2.viewport.width + w2.viewport.height) / (w2.width + w2.height);
    }
    o(Kn, "getViewportScale");
    function Le(e) {
      Ce();
      let n = w2.width, r = w2.height;
      w2.width = w2.viewport.width, w2.height = w2.viewport.height, e(), Ce(), w2.width = n, w2.height = r;
    }
    o(Le, "drawUnscaled");
    function Yn(e, n) {
      n.pos && (e.pos = e.pos.add(n.pos)), n.scale && (e.scale = e.scale.scale(C(n.scale))), n.angle && (e.angle += n.angle), n.color && (e.color = e.color.mult(n.color)), n.opacity && (e.opacity *= n.opacity);
    }
    o(Yn, "applyCharTransform");
    let Xn = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function Wr(e) {
      let n = {}, r = e.replace(Xn, "$2"), i = 0;
      for (let u of e.matchAll(Xn)) {
        let l = u.index - i;
        for (let a = 0; a < u.groups.text.length; a++)
          n[a + l] = [u.groups.style];
        i += u[0].length - u.groups.text.length;
      }
      return { charStyleMap: n, text: r };
    }
    o(Wr, "compileStyledText");
    let wn = {};
    function ze(e) {
      if (e.text === void 0)
        throw new Error('formatText() requires property "text".');
      let n = Mt(e.font);
      if (e.text === "" || n instanceof se || !n)
        return { width: 0, height: 0, chars: [], opt: e };
      let { charStyleMap: r, text: i } = Wr(e.text + ""), u = i.split("");
      if (n instanceof _e || typeof n == "string") {
        let k = n instanceof _e ? n.fontface.family : n, _ = n instanceof _e ? { outline: n.outline, filter: n.filter } : { outline: 0, filter: Hr }, F = wn[k] ?? { font: { tex: new K(Ir, jr, { filter: _.filter }), map: {}, size: Lr }, cursor: new b(0), outline: _.outline };
        wn[k] || (wn[k] = F), n = F.font;
        for (let xe of u)
          if (!F.font.map[xe]) {
            let v = ue;
            v.clearRect(0, 0, Z.width, Z.height), v.font = `${n.size}px ${k}`, v.textBaseline = "top", v.textAlign = "left", v.fillStyle = "#ffffff";
            let R = v.measureText(xe), P = Math.ceil(R.width), G = n.size;
            F.outline && (v.lineJoin = "round", v.lineWidth = F.outline * 2, v.strokeStyle = "#000000", v.strokeText(xe, F.outline, F.outline), P += F.outline * 2, G += F.outline * 3), v.fillText(xe, F.outline, F.outline);
            let j = v.getImageData(0, 0, P, G);
            if (F.cursor.x + P > Ir && (F.cursor.x = 0, F.cursor.y += G, F.cursor.y > jr))
              throw new Error("Font atlas exceeds character limit");
            n.tex.update(j, F.cursor.x, F.cursor.y), n.map[xe] = new Q(F.cursor.x, F.cursor.y, P, G), F.cursor.x += P;
          }
      }
      let l = e.size || n.size, a = C(e.scale ?? 1).scale(l / n.size), m = e.lineSpacing ?? 0, f = e.letterSpacing ?? 0, p = 0, U = 0, D = 0, H = [], V = [], $ = 0, O = null, A = null;
      for (; $ < u.length; ) {
        let k = u[$];
        if (k === `
`)
          D += l + m, H.push({ width: p - f, chars: V }), O = null, A = null, p = 0, V = [];
        else {
          let _ = n.map[k];
          if (_) {
            let F = _.w * a.x;
            e.width && p + F > e.width && (D += l + m, O != null && ($ -= V.length - O, k = u[$], _ = n.map[k], F = _.w * a.x, V = V.slice(0, O - 1), p = A), O = null, A = null, H.push({ width: p - f, chars: V }), p = 0, V = []), V.push({ tex: n.tex, width: _.w, height: _.h, quad: new Q(_.x / n.tex.width, _.y / n.tex.height, _.w / n.tex.width, _.h / n.tex.height), ch: k, pos: new b(p, D), opacity: e.opacity ?? 1, color: e.color ?? L.WHITE, scale: C(a), angle: 0 }), k === " " && (O = V.length, A = p), p += F, U = Math.max(U, p), p += f;
          }
        }
        $++;
      }
      H.push({ width: p - f, chars: V }), D += l, e.width && (U = e.width);
      let te = [];
      for (let k of H) {
        let _ = (U - k.width) * Bi(e.align ?? "left");
        for (let F of k.chars) {
          let xe = n.map[F.ch], v = te.length;
          if (F.pos = F.pos.add(_, 0).add(xe.w * a.x * 0.5, xe.h * a.y * 0.5), e.transform) {
            let R = typeof e.transform == "function" ? e.transform(v, F.ch) : e.transform;
            R && Yn(F, R);
          }
          if (r[v]) {
            let R = r[v];
            for (let P of R) {
              let G = e.styles[P], j = typeof G == "function" ? G(v, F.ch) : G;
              j && Yn(F, j);
            }
          }
          te.push(F);
        }
      }
      return { width: U, height: D, chars: te, opt: e };
    }
    o(ze, "formatText");
    function Jn(e) {
      Ke(ze(e));
    }
    o(Jn, "drawText");
    function Ke(e) {
      I(), x(e.opt.pos), ge(e.opt.angle), x(ct(e.opt.anchor ?? "topleft").add(1, 1).scale(e.width, e.height).scale(-0.5)), e.chars.forEach((n) => {
        Me({ tex: n.tex, width: n.width, height: n.height, pos: n.pos, scale: n.scale, angle: n.angle, color: n.color, opacity: n.opacity, quad: n.quad, anchor: "center", uniform: e.opt.uniform, shader: e.opt.shader, fixed: e.opt.fixed });
      }), de();
    }
    o(Ke, "drawFormattedText");
    function Qr() {
      let e = q, n = d.drawingBufferWidth / e, r = d.drawingBufferHeight / e;
      if (E.isFullscreen()) {
        let u = window.innerWidth, l = window.innerHeight, a = u / l, m = n / r;
        if (a > m) {
          let f = window.innerHeight * m;
          w2.viewport = { x: (u - f) / 2, y: 0, width: f, height: l };
        } else {
          let f = window.innerWidth / m;
          w2.viewport = { x: 0, y: (l - f) / 2, width: u, height: f };
        }
        return;
      }
      if (s.letterbox) {
        if (!s.width || !s.height)
          throw new Error("Letterboxing requires width and height defined.");
        let u = n / r, l = s.width / s.height;
        if (u > l) {
          s.stretch || (w2.width = r * l, w2.height = r);
          let a = r * l, m = r, f = (n - a) / 2;
          d.scissor(f * e, 0, a * e, m * e), d.viewport(f * e, 0, a * e, r * e), w2.viewport = { x: f, y: 0, width: a, height: r };
        } else {
          s.stretch || (w2.width = n, w2.height = n / l);
          let a = n, m = n / l, f = (r - m) / 2;
          d.scissor(0, f * e, a * e, m * e), d.viewport(0, f * e, n * e, m * e), w2.viewport = { x: 0, y: f, width: n, height: m };
        }
        return;
      }
      if (s.stretch) {
        if (!s.width || !s.height)
          throw new Error("Stretching requires width and height defined.");
        d.viewport(0, 0, n * e, r * e), w2.viewport = { x: 0, y: 0, width: n, height: r };
        return;
      }
      let i = s.scale ?? 1;
      w2.width = n / i, w2.height = r / i, d.viewport(0, 0, n * e, r * e), w2.viewport = { x: 0, y: 0, width: n, height: r };
    }
    o(Qr, "updateViewport");
    function we() {
      return w2.width;
    }
    o(we, "width");
    function ye() {
      return w2.height;
    }
    o(ye, "height");
    let et = {};
    function Zr(e) {
      return new b((e.x - w2.viewport.x) * we() / w2.viewport.width, (e.y - w2.viewport.y) * ye() / w2.viewport.height);
    }
    o(Zr, "windowToContent");
    function es(e) {
      return new b(e.x * w2.viewport.width / w2.width, e.y * w2.viewport.height / w2.height);
    }
    o(es, "contentToView");
    function It() {
      return Zr(E.mousePos());
    }
    o(It, "mousePos"), et.error = (e) => {
      e.error ? Sn(e.error) : Sn(new Error(e.message));
    }, et.unhandledrejection = (e) => Sn(e.reason);
    for (let e in et)
      window.addEventListener(e, et[e]);
    let re = { inspect: false, timeScale: 1, showLog: true, fps: () => E.fps(), numFrames: () => E.numFrames(), stepFrame: cr, drawCalls: () => w2.drawCalls, clearLog: () => T.logs = [], log: (e) => {
      let n = s.logMax ?? Ri, r = e instanceof Error ? "error" : "info";
      T.logs.unshift(`${`[time]${E.time().toFixed(2)}[/time] `}[${r}]${e?.toString ? e.toString() : e}[/${r}]`), T.logs.length > n && (T.logs = T.logs.slice(0, n));
    }, error: (e) => re.log(new Error(e.toString ? e.toString() : e)), curRecording: null, get paused() {
      return E.paused;
    }, set paused(e) {
      E.paused = e, e ? le.ctx.suspend() : le.ctx.resume();
    } };
    function Ae() {
      return E.dt();
    }
    o(Ae, "dt");
    function ts(...e) {
      return e.length > 0 && (T.cam.pos = C(...e)), T.cam.pos ? T.cam.pos.clone() : Ht();
    }
    o(ts, "camPos");
    function ns(...e) {
      return e.length > 0 && (T.cam.scale = C(...e)), T.cam.scale.clone();
    }
    o(ns, "camScale");
    function rs(e) {
      return e !== void 0 && (T.cam.angle = e), T.cam.angle;
    }
    o(rs, "camRot");
    function ss(e = 12) {
      T.cam.shake = e;
    }
    o(ss, "shake");
    function bn(e) {
      return T.cam.transform.multVec2(e);
    }
    o(bn, "toScreen");
    function Wn(e) {
      return T.cam.transform.invert().multVec2(e);
    }
    o(Wn, "toWorld");
    function jt(e) {
      let n = new W();
      return e.pos && n.translate(e.pos), e.scale && n.scale(e.scale), e.angle && n.rotate(e.angle), e.parent ? n.mult(e.parent.transform) : n;
    }
    o(jt, "calcTransform");
    function Qn(e) {
      let n = /* @__PURE__ */ new Map(), r = {}, i = new Fe(), u = null, l = { id: Tr(), hidden: false, paused: false, transform: new W(), children: [], parent: null, add(a) {
        let m = (() => {
          if (Array.isArray(a))
            return Qn(a);
          if (a.parent)
            throw new Error("Cannot add a game obj that already has a parent.");
          return a;
        })();
        return m.parent = this, m.transform = jt(m), this.children.push(m), m.trigger("add", m), T.events.trigger("add", m), m;
      }, readd(a) {
        let m = this.children.indexOf(a);
        return m !== -1 && (this.children.splice(m, 1), this.children.push(a)), a;
      }, remove(a) {
        let m = this.children.indexOf(a);
        m !== -1 && (a.trigger("destroy"), T.events.trigger("destroy", a), a.parent = null, this.children.splice(m, 1));
      }, removeAll(a) {
        this.get(a).forEach((m) => this.remove(m));
      }, update() {
        this.paused || (this.children.sort((a, m) => (a.z ?? 0) - (m.z ?? 0)).forEach((a) => a.update()), this.trigger("update"));
      }, draw() {
        this.hidden || (I(), x(this.pos), ee(this.scale), ge(this.angle), this.trigger("draw"), this.children.sort((a, m) => (a.z ?? 0) - (m.z ?? 0)).forEach((a) => a.draw()), de());
      }, drawInspect() {
        this.hidden || (I(), x(this.pos), ee(this.scale), ge(this.angle), this.children.sort((a, m) => (a.z ?? 0) - (m.z ?? 0)).forEach((a) => a.drawInspect()), this.trigger("drawInspect"), de());
      }, use(a) {
        if (!a)
          return;
        if (typeof a == "string")
          return this.use({ id: a });
        let m = [];
        a.id && (this.unuse(a.id), r[a.id] = [], m = r[a.id], n.set(a.id, a));
        for (let p in a) {
          if (Gi.has(p))
            continue;
          let U = Object.getOwnPropertyDescriptor(a, p);
          if (typeof U.value == "function" && (a[p] = a[p].bind(this)), U.set && Object.defineProperty(a, p, { set: U.set.bind(this) }), U.get && Object.defineProperty(a, p, { get: U.get.bind(this) }), Fi.has(p)) {
            let D = p === "add" ? () => {
              u = o((H) => m.push(H), "onCurCompCleanup"), a[p](), u = null;
            } : a[p];
            m.push(this.on(p, D).cancel);
          } else if (this[p] === void 0)
            Object.defineProperty(this, p, { get: () => a[p], set: (D) => a[p] = D, configurable: true, enumerable: true }), m.push(() => delete this[p]);
          else
            throw new Error(`Duplicate component property: "${p}"`);
        }
        let f = o(() => {
          if (a.require) {
            for (let p of a.require)
              if (!this.c(p))
                throw new Error(`Component "${a.id}" requires component "${p}"`);
          }
        }, "checkDeps");
        a.destroy && m.push(a.destroy.bind(this)), this.exists() ? (f(), a.add && (u = o((p) => m.push(p), "onCurCompCleanup"), a.add.call(this), u = null)) : a.require && m.push(this.on("add", f).cancel);
      }, unuse(a) {
        r[a] && (r[a].forEach((m) => m()), delete r[a]), n.has(a) && n.delete(a);
      }, c(a) {
        return n.get(a);
      }, get(a, m = {}) {
        let f = m.recursive ? this.children.flatMap((p) => [p, ...p.children]) : this.children;
        if (f = f.filter((p) => a ? p.is(a) : true), m.liveUpdate) {
          let p = o((U) => m.recursive ? this.isAncestorOf(U) : U.parent === this, "isChild");
          yn((U) => {
            p(U) && U.is(a) && f.push(U);
          }), Zn((U) => {
            if (p(U) && U.is(a)) {
              let D = f.findIndex((H) => H.id === U.id);
              D !== -1 && f.splice(D, 1);
            }
          });
        }
        return f;
      }, isAncestorOf(a) {
        return a.parent ? a.parent === this || this.isAncestorOf(a.parent) : false;
      }, exists() {
        return T.root.isAncestorOf(this);
      }, is(a) {
        if (a === "*")
          return true;
        if (Array.isArray(a)) {
          for (let m of a)
            if (!this.c(m))
              return false;
          return true;
        } else
          return this.c(a) != null;
      }, on(a, m) {
        let f = i.on(a, m.bind(this));
        return u && u(() => f.cancel()), f;
      }, trigger(a, ...m) {
        i.trigger(a, ...m), T.objEvents.trigger(a, this, ...m);
      }, destroy() {
        this.parent && this.parent.remove(this);
      }, inspect() {
        let a = {};
        for (let [m, f] of n)
          a[m] = f.inspect ? f.inspect() : null;
        return a;
      }, onAdd(a) {
        return this.on("add", a);
      }, onUpdate(a) {
        return this.on("update", a);
      }, onDraw(a) {
        return this.on("draw", a);
      }, onDestroy(a) {
        return this.on("destroy", a);
      }, clearEvents() {
        i.clear();
      } };
      for (let a of e)
        l.use(a);
      return l;
    }
    o(Qn, "make");
    function Ie(e, n, r) {
      return T.objEvents[e] || (T.objEvents[e] = new ot()), T.objEvents.on(e, (i, ...u) => {
        i.is(n) && r(i, ...u);
      });
    }
    o(Ie, "on");
    let vn = o((e, n) => {
      if (typeof e == "function" && n === void 0) {
        let r = wt([{ update: e }]);
        return { get paused() {
          return r.paused;
        }, set paused(i) {
          r.paused = i;
        }, cancel: () => r.destroy() };
      } else if (typeof e == "string")
        return Ie("update", e, n);
    }, "onUpdate"), is = o((e, n) => {
      if (typeof e == "function" && n === void 0) {
        let r = wt([{ draw: e }]);
        return { get paused() {
          return r.hidden;
        }, set paused(i) {
          r.hidden = i;
        }, cancel: () => r.destroy() };
      } else if (typeof e == "string")
        return Ie("draw", e, n);
    }, "onDraw");
    function yn(e, n) {
      if (typeof e == "function" && n === void 0)
        return T.events.on("add", e);
      if (typeof e == "string")
        return Ie("add", e, n);
    }
    o(yn, "onAdd");
    function Zn(e, n) {
      if (typeof e == "function" && n === void 0)
        return T.events.on("destroy", e);
      if (typeof e == "string")
        return Ie("destroy", e, n);
    }
    o(Zn, "onDestroy");
    function os(e, n, r) {
      return Ie("collide", e, (i, u, l) => u.is(n) && r(i, u, l));
    }
    o(os, "onCollide");
    function as(e, n, r) {
      return Ie("collideUpdate", e, (i, u, l) => u.is(n) && r(i, u, l));
    }
    o(as, "onCollideUpdate");
    function us(e, n, r) {
      return Ie("collideEnd", e, (i, u, l) => u.is(n) && r(i, u, l));
    }
    o(us, "onCollideEnd");
    function Nt(e, n) {
      ar(e, { recursive: true }).forEach(n), yn(e, n);
    }
    o(Nt, "forAllCurrentAndFuture");
    function cs(e, n) {
      if (typeof e == "function")
        return E.onMousePress(e);
      {
        let r = [];
        return Nt(e, (i) => {
          if (!i.area)
            throw new Error("onClick() requires the object to have area() component");
          r.push(i.onClick(() => n(i)));
        }), Oe.join(r);
      }
    }
    o(cs, "onClick");
    function ls(e, n) {
      let r = [];
      return Nt(e, (i) => {
        if (!i.area)
          throw new Error("onHover() requires the object to have area() component");
        r.push(i.onHover(() => n(i)));
      }), Oe.join(r);
    }
    o(ls, "onHover");
    function hs(e, n) {
      let r = [];
      return Nt(e, (i) => {
        if (!i.area)
          throw new Error("onHoverUpdate() requires the object to have area() component");
        r.push(i.onHoverUpdate(() => n(i)));
      }), Oe.join(r);
    }
    o(hs, "onHoverUpdate");
    function ds(e, n) {
      let r = [];
      return Nt(e, (i) => {
        if (!i.area)
          throw new Error("onHoverEnd() requires the object to have area() component");
        r.push(i.onHoverEnd(() => n(i)));
      }), Oe.join(r);
    }
    o(ds, "onHoverEnd");
    function pt(e, n) {
      let r = 0, i = [];
      n && i.push(n);
      let u = vn(() => {
        r += Ae(), r >= e && (u.cancel(), i.forEach((l) => l()));
      });
      return { paused: u.paused, cancel: u.cancel, onEnd(l) {
        i.push(l);
      }, then(l) {
        return this.onEnd(l), this;
      } };
    }
    o(pt, "wait");
    function fs(e, n) {
      let r = null, i = o(() => {
        r = pt(e, i), n();
      }, "newAction");
      return r = pt(0, i), { get paused() {
        return r.paused;
      }, set paused(u) {
        r.paused = u;
      }, cancel: () => r.cancel() };
    }
    o(fs, "loop");
    function er() {
      E.onKeyPress("f1", () => {
        re.inspect = !re.inspect;
      }), E.onKeyPress("f2", () => {
        re.clearLog();
      }), E.onKeyPress("f8", () => {
        re.paused = !re.paused;
      }), E.onKeyPress("f7", () => {
        re.timeScale = gt(je(re.timeScale - 0.2, 0, 2), 1);
      }), E.onKeyPress("f9", () => {
        re.timeScale = gt(je(re.timeScale + 0.2, 0, 2), 1);
      }), E.onKeyPress("f10", () => {
        re.stepFrame();
      });
    }
    o(er, "enterDebugMode");
    function tr() {
      E.onKeyPress("b", () => Ft());
    }
    o(tr, "enterBurpMode");
    function ms(e) {
      T.gravity = e;
    }
    o(ms, "setGravity");
    function ps() {
      return T.gravity;
    }
    o(ps, "getGravity");
    function gs(...e) {
      e.length === 1 || e.length === 2 ? (w2.bgColor = J(e[0]), e[1] && (w2.bgAlpha = e[1])) : (e.length === 3 || e.length === 4) && (w2.bgColor = J(e[0], e[1], e[2]), e[3] && (w2.bgAlpha = e[3])), d.clearColor(w2.bgColor.r / 255, w2.bgColor.g / 255, w2.bgColor.b / 255, w2.bgAlpha);
    }
    o(gs, "setBackground");
    function ws() {
      return w2.bgColor.clone();
    }
    o(ws, "getBackground");
    function kt(...e) {
      return { id: "pos", pos: C(...e), moveBy(...n) {
        this.pos = this.pos.add(C(...n));
      }, move(...n) {
        this.moveBy(C(...n).scale(Ae()));
      }, moveTo(...n) {
        if (typeof n[0] == "number" && typeof n[1] == "number")
          return this.moveTo(C(n[0], n[1]), n[2]);
        let r = n[0], i = n[1];
        if (i === void 0) {
          this.pos = C(r);
          return;
        }
        let u = r.sub(this.pos);
        if (u.len() <= i * Ae()) {
          this.pos = C(r);
          return;
        }
        this.move(u.unit().scale(i));
      }, worldPos() {
        return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
      }, screenPos() {
        return this.fixed ? this.pos : bn(this.pos);
      }, inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      }, drawInspect() {
        Ze({ color: J(255, 0, 0), radius: 4 / Kn() });
      } };
    }
    o(kt, "pos");
    function _t(...e) {
      return e.length === 0 ? _t(1) : { id: "scale", scale: C(...e), scaleTo(...n) {
        this.scale = C(...n);
      }, scaleBy(...n) {
        this.scale.scale(C(...n));
      }, inspect() {
        return `(${gt(this.scale.x, 2)}, ${gt(this.scale.y, 2)})`;
      } };
    }
    o(_t, "scale");
    function bs(e) {
      return { id: "rotate", angle: e ?? 0, rotateBy(n) {
        this.angle += n;
      }, rotateTo(n) {
        this.angle = n;
      }, inspect() {
        return `${Math.round(this.angle)}`;
      } };
    }
    o(bs, "rotate");
    function vs(...e) {
      return { id: "color", color: J(...e), inspect() {
        return this.color.toString();
      } };
    }
    o(vs, "color");
    function gt(e, n) {
      return Number(e.toFixed(n));
    }
    o(gt, "toFixed");
    function ys(e) {
      return { id: "opacity", opacity: e ?? 1, inspect() {
        return `${gt(this.opacity, 1)}`;
      }, fadeOut(n = 1, r = at.linear) {
        return Cn(this.opacity, 0, n, (i) => this.opacity = i, r);
      } };
    }
    o(ys, "opacity");
    function Un(e) {
      if (!e)
        throw new Error("Please define an anchor");
      return { id: "anchor", anchor: e, inspect() {
        return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
      } };
    }
    o(Un, "anchor");
    function Us(e) {
      return { id: "z", z: e, inspect() {
        return `${this.z}`;
      } };
    }
    o(Us, "z");
    function xs(e, n) {
      return { id: "follow", require: ["pos"], follow: { obj: e, offset: n ?? C(0) }, add() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }, update() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      } };
    }
    o(xs, "follow");
    function Es(e, n) {
      let r = typeof e == "number" ? b.fromAngle(e) : e.unit();
      return { id: "move", require: ["pos"], update() {
        this.move(r.scale(n));
      } };
    }
    o(Es, "move");
    let Ss = 200;
    function Cs(e = {}) {
      let n = e.distance ?? Ss, r = false;
      return { id: "offscreen", require: ["pos"], isOffScreen() {
        let i = bn(this.pos), u = new ne(C(0), we(), ye());
        return !vt(u, i) && u.sdistToPoint(i) > n * n;
      }, onExitScreen(i) {
        return this.on("exitView", i);
      }, onEnterScreen(i) {
        return this.on("enterView", i);
      }, update() {
        this.isOffScreen() ? (r || (this.trigger("exitView"), r = true), e.hide && (this.hidden = true), e.pause && (this.paused = true), e.destroy && this.destroy()) : (r && (this.trigger("enterView"), r = false), e.hide && (this.hidden = false), e.pause && (this.paused = false));
      } };
    }
    o(Cs, "offscreen");
    function Ts(e = {}) {
      let n = {}, r = /* @__PURE__ */ new Set();
      return { id: "area", collisionIgnore: e.collisionIgnore ?? [], add() {
        this.area.cursor && this.onHover(() => E.setCursor(this.area.cursor)), this.onCollideUpdate((i, u) => {
          n[i.id] || this.trigger("collide", i, u), n[i.id] = u, r.add(i.id);
        });
      }, update() {
        for (let i in n)
          r.has(Number(i)) || (this.trigger("collideEnd", n[i].target), delete n[i]);
        r.clear();
      }, drawInspect() {
        let i = this.localArea();
        I(), ee(this.area.scale), x(this.area.offset);
        let u = { outline: { width: 4 / Kn(), color: J(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: this.fixed };
        i instanceof ne ? Te({ ...u, pos: i.pos, width: i.width, height: i.height }) : i instanceof Pe ? $e({ ...u, pts: i.pts }) : i instanceof Ne && Ze({ ...u, pos: i.center, radius: i.radius }), de();
      }, area: { shape: e.shape ?? null, scale: e.scale ? C(e.scale) : C(1), offset: e.offset ?? C(0), cursor: e.cursor ?? null }, isClicked() {
        return E.isMousePressed() && this.isHovering();
      }, isHovering() {
        let i = this.fixed ? It() : Wn(It());
        return this.hasPoint(i);
      }, checkCollision(i) {
        return n[i.id] ?? null;
      }, getCollisions() {
        return Object.values(n);
      }, isColliding(i) {
        return !!n[i.id];
      }, isOverlapping(i) {
        let u = n[i.id];
        return u && u.hasOverlap();
      }, onClick(i) {
        return E.onMousePress("left", () => {
          this.isHovering() && i();
        });
      }, onHover(i) {
        let u = false;
        return this.onUpdate(() => {
          u ? u = this.isHovering() : this.isHovering() && (u = true, i());
        });
      }, onHoverUpdate(i) {
        return this.onUpdate(() => {
          this.isHovering() && i();
        });
      }, onHoverEnd(i) {
        let u = false;
        return this.onUpdate(() => {
          u ? this.isHovering() || (u = false, i()) : u = this.isHovering();
        });
      }, onCollide(i, u) {
        if (typeof i == "function" && u === void 0)
          return this.on("collide", i);
        if (typeof i == "string")
          return this.onCollide((l, a) => {
            l.is(i) && u(l, a);
          });
      }, onCollideUpdate(i, u) {
        if (typeof i == "function" && u === void 0)
          return this.on("collideUpdate", i);
        if (typeof i == "string")
          return this.on("collideUpdate", (l, a) => l.is(i) && u(l, a));
      }, onCollideEnd(i, u) {
        if (typeof i == "function" && u === void 0)
          return this.on("collideEnd", i);
        if (typeof i == "string")
          return this.on("collideEnd", (l) => l.is(i) && u(l));
      }, hasPoint(i) {
        return Fn(this.worldArea(), i);
      }, resolveCollision(i) {
        let u = this.checkCollision(i);
        u && !u.resolved && (this.pos = this.pos.add(u.displacement), u.resolved = true);
      }, localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      }, worldArea() {
        let i = this.localArea();
        if (!(i instanceof Pe || i instanceof ne))
          throw new Error("Only support polygon and rect shapes for now");
        let u = this.transform.clone().scale(C(this.area.scale ?? 1)).translate(this.area.offset);
        if (i instanceof ne) {
          let l = ct(this.anchor || Qt).add(1, 1).scale(-0.5).scale(i.width, i.height);
          u.translate(l);
        }
        return i.transform(u);
      }, screenArea() {
        let i = this.worldArea();
        return this.fixed ? i : i.transform(T.cam.transform);
      } };
    }
    o(Ts, "area");
    function tt(e) {
      return { color: e.color, opacity: e.opacity, anchor: e.anchor, outline: e.outline, fixed: e.fixed, shader: e.shader, uniform: e.uniform };
    }
    o(tt, "getRenderProps");
    function xn(e, n = {}) {
      let r = null, i = null, u = new ve();
      if (!e)
        throw new Error("Please pass the resource name or data to sprite()");
      let l = o((a, m, f, p) => {
        let U = C(1, 1);
        return f && p ? (U.x = f / (a.width * m.w), U.y = p / (a.height * m.h)) : f ? (U.x = f / (a.width * m.w), U.y = U.x) : p && (U.y = p / (a.height * m.h), U.x = U.y), U;
      }, "calcTexScale");
      return { id: "sprite", width: 0, height: 0, frame: n.frame || 0, quad: n.quad || new Q(0, 0, 1, 1), animSpeed: n.animSpeed ?? 1, flipX: n.flipX ?? false, flipY: n.flipY ?? false, draw() {
        if (!r)
          return;
        let a = r.frames[this.frame ?? 0];
        if (!a)
          throw new Error(`Frame not found: ${this.frame ?? 0}`);
        if (r.slice9) {
          let { left: m, right: f, top: p, bottom: U } = r.slice9, D = r.tex.width * a.w, H = r.tex.height * a.h, V = this.width - m - f, $ = this.height - p - U, O = m / D, A = f / D, te = 1 - O - A, k = p / H, _ = U / H, F = 1 - k - _, xe = [ae(0, 0, O, k), ae(O, 0, te, k), ae(O + te, 0, A, k), ae(0, k, O, F), ae(O, k, te, F), ae(O + te, k, A, F), ae(0, k + F, O, _), ae(O, k + F, te, _), ae(O + te, k + F, A, _), ae(0, 0, m, p), ae(m, 0, V, p), ae(m + V, 0, f, p), ae(0, p, m, $), ae(m, p, V, $), ae(m + V, p, f, $), ae(0, p + $, m, U), ae(m, p + $, V, U), ae(m + V, p + $, f, U)];
          for (let v = 0; v < 9; v++) {
            let R = xe[v], P = xe[v + 9];
            Vt(Object.assign(tt(this), { pos: P.pos(), tex: r.tex, quad: a.scale(R), flipX: this.flipX, flipY: this.flipY, tiled: n.tiled, width: P.w, height: P.h }));
          }
        } else
          Vt(Object.assign(tt(this), { tex: r.tex, quad: a, flipX: this.flipX, flipY: this.flipY, tiled: n.tiled, width: this.width, height: this.height }));
      }, add() {
        let a = o((f) => {
          let p = f.frames[0].clone();
          n.quad && (p = p.scale(n.quad));
          let U = l(f.tex, p, n.width, n.height);
          this.width = f.tex.width * p.w * U.x, this.height = f.tex.height * p.h * U.y, n.anim && this.play(n.anim), r = f, u.trigger(r);
        }, "setSpriteData"), m = dt(e);
        m ? m.onLoad(a) : En(() => a(dt(e).data));
      }, update() {
        if (!i)
          return;
        let a = r.anims[i.name];
        if (typeof a == "number") {
          this.frame = a;
          return;
        }
        if (a.speed === 0)
          throw new Error("Sprite anim speed cannot be 0");
        i.timer += Ae() * this.animSpeed, i.timer >= 1 / i.speed && (i.timer = 0, a.from > a.to ? (this.frame--, this.frame < a.to && (i.loop ? this.frame = a.from : (this.frame++, i.onEnd(), this.stop()))) : (this.frame++, this.frame > a.to && (i.loop ? this.frame = a.from : (this.frame--, i.onEnd(), this.stop()))));
      }, play(a, m = {}) {
        if (!r) {
          u.add(() => this.play(a, m));
          return;
        }
        let f = r.anims[a];
        if (f === void 0)
          throw new Error(`Anim not found: ${a}`);
        i && this.stop(), i = typeof f == "number" ? { name: a, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
        } } : { name: a, timer: 0, loop: m.loop ?? f.loop ?? false, pingpong: m.pingpong ?? f.pingpong ?? false, speed: m.speed ?? f.speed ?? 10, onEnd: m.onEnd ?? (() => {
        }) }, this.frame = typeof f == "number" ? f : f.from, this.trigger("animStart", a);
      }, stop() {
        if (!i)
          return;
        let a = i.name;
        i = null, this.trigger("animEnd", a);
      }, numFrames() {
        return r?.frames.length ?? 0;
      }, curAnim() {
        return i?.name;
      }, onAnimEnd(a) {
        return this.on("animEnd", a);
      }, onAnimStart(a) {
        return this.on("animStart", a);
      }, renderArea() {
        return new ne(C(0), this.width, this.height);
      }, inspect() {
        if (typeof e == "string")
          return `"${e}"`;
      } };
    }
    o(xn, "sprite");
    function As(e, n = {}) {
      function r(i) {
        let u = ze(Object.assign(tt(i), { text: i.text + "", size: i.textSize, font: i.font, width: n.width && i.width, align: i.align, letterSpacing: i.letterSpacing, lineSpacing: i.lineSpacing, transform: i.textTransform, styles: i.textStyles }));
        return n.width || (i.width = u.width / (i.scale?.x || 1)), i.height = u.height / (i.scale?.y || 1), u;
      }
      return o(r, "update"), { id: "text", text: e, textSize: n.size ?? Oi, font: n.font, width: n.width, height: 0, align: n.align, lineSpacing: n.lineSpacing, letterSpacing: n.letterSpacing, textTransform: n.transform, textStyles: n.styles, add() {
        En(() => r(this));
      }, draw() {
        Ke(r(this));
      }, renderArea() {
        return new ne(C(0), this.width, this.height);
      } };
    }
    o(As, "text");
    function Os(e, n, r = {}) {
      return { id: "rect", width: e, height: n, radius: r.radius || 0, draw() {
        Te(Object.assign(tt(this), { width: this.width, height: this.height, radius: this.radius }));
      }, renderArea() {
        return new ne(C(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    o(Os, "rect");
    function Ps(e, n) {
      return { id: "rect", width: e, height: n, draw() {
        Me(Object.assign(tt(this), { width: this.width, height: this.height }));
      }, renderArea() {
        return new ne(C(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    o(Ps, "uvquad");
    function Rs(e) {
      return { id: "circle", radius: e, draw() {
        Ze(Object.assign(tt(this), { radius: this.radius }));
      }, renderArea() {
        return new ne(new b(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
      }, inspect() {
        return `${Math.ceil(this.radius)}`;
      } };
    }
    o(Rs, "circle");
    function Ms(e = 1, n = J(0, 0, 0)) {
      return { id: "outline", outline: { width: e, color: n } };
    }
    o(Ms, "outline");
    function nr() {
      return { id: "timer", wait(e, n) {
        let r = [n], i = 0, u = this.onUpdate(() => {
          i += Ae(), i >= e && (r.forEach((l) => l()), u.cancel());
        });
        return { get paused() {
          return u.paused;
        }, set paused(l) {
          u.paused = l;
        }, cancel: u.cancel, onEnd(l) {
          r.push(l);
        }, then(l) {
          return this.onEnd(l), this;
        } };
      }, loop(e, n) {
        let r = null, i = o(() => {
          r = this.wait(e, i), n();
        }, "newAction");
        return r = pt(0, i), { get paused() {
          return r.paused;
        }, set paused(u) {
          r.paused = u;
        }, cancel: () => r.cancel() };
      }, tween(e, n, r, i, u = at.linear) {
        let l = 0, a = [], m = this.onUpdate(() => {
          l += Ae();
          let f = Math.min(l / r, 1);
          i(Ge(e, n, u(f))), f === 1 && (m.cancel(), i(n), a.forEach((p) => p()));
        });
        return { get paused() {
          return m.paused;
        }, set paused(f) {
          m.paused = f;
        }, onEnd(f) {
          a.push(f);
        }, then(f) {
          return this.onEnd(f), this;
        }, cancel() {
          m.cancel();
        }, finish() {
          m.cancel(), i(n), a.forEach((f) => f());
        } };
      } };
    }
    o(nr, "timer");
    let Ds = 640, Gs = 65536;
    function Fs(e = {}) {
      let n = C(0), r = null, i = null, u = false;
      return { id: "body", require: ["pos", "area"], jumpForce: e.jumpForce ?? Ds, gravityScale: e.gravityScale ?? 1, isStatic: e.isStatic ?? false, mass: e.mass ?? 1, add() {
        if (this.mass === 0)
          throw new Error("Can't set body mass to 0");
        this.onCollideUpdate((l, a) => {
          if (l.is("body") && !a.resolved && (this.trigger("beforePhysicsResolve", a), l.trigger("beforePhysicsResolve", a.reverse()), !a.resolved && !(this.isStatic && l.isStatic))) {
            if (!this.isStatic && !l.isStatic) {
              let m = this.mass + l.mass;
              this.pos = this.pos.add(a.displacement.scale(l.mass / m)), l.pos = l.pos.add(a.displacement.scale(-this.mass / m)), this.transform = jt(this), l.transform = jt(l);
            } else {
              let m = !this.isStatic && l.isStatic ? a : a.reverse();
              m.source.pos = m.source.pos.add(m.displacement), m.source.transform = jt(m.source);
            }
            a.resolved = true, this.trigger("physicsResolve", a), l.trigger("physicsResolve", a.reverse());
          }
        }), this.onPhysicsResolve((l) => {
          T.gravity && (l.isBottom() && this.isFalling() ? (n.y = 0, r = l.target, i = l.target.pos, u ? u = false : this.trigger("ground", r)) : l.isTop() && this.isJumping() && (n.y = 0, this.trigger("headbutt", l.target)));
        });
      }, update() {
        if (!T.gravity || this.isStatic)
          return;
        if (u && (r = null, i = null, this.trigger("fallOff"), u = false), r)
          if (!this.isOverlapping(r) || !r.exists() || !r.is("body"))
            u = true;
          else {
            !r.pos.eq(i) && e.stickToPlatform !== false && this.moveBy(r.pos.sub(i)), i = r.pos;
            return;
          }
        let l = n.y;
        n.y += T.gravity * this.gravityScale * Ae(), n.y = Math.min(n.y, e.maxVelocity ?? Gs), l < 0 && n.y >= 0 && this.trigger("fall"), this.move(n);
      }, onPhysicsResolve(l) {
        return this.on("physicsResolve", l);
      }, onBeforePhysicsResolve(l) {
        return this.on("beforePhysicsResolve", l);
      }, curPlatform() {
        return r;
      }, isGrounded() {
        return r !== null;
      }, isFalling() {
        return n.y > 0;
      }, isJumping() {
        return n.y < 0;
      }, jump(l) {
        r = null, i = null, n.y = -l || -this.jumpForce;
      }, onGround(l) {
        return this.on("ground", l);
      }, onFall(l) {
        return this.on("fall", l);
      }, onFallOff(l) {
        return this.on("fallOff", l);
      }, onHeadbutt(l) {
        return this.on("headbutt", l);
      } };
    }
    o(Fs, "body");
    function Bs(e = 2) {
      let n = e;
      return { id: "doubleJump", require: ["body"], numJumps: e, add() {
        this.onGround(() => {
          n = this.numJumps;
        });
      }, doubleJump(r) {
        n <= 0 || (n < this.numJumps && this.trigger("doubleJump"), n--, this.jump(r));
      }, onDoubleJump(r) {
        return this.on("doubleJump", r);
      }, inspect() {
        return `${n}`;
      } };
    }
    o(Bs, "doubleJump");
    function Ls(e, n) {
      return { id: "shader", shader: e, ...typeof n == "function" ? { uniform: n(), update() {
        this.uniform = n();
      } } : { uniform: n } };
    }
    o(Ls, "shader");
    function Vs() {
      return { id: "fixed", fixed: true };
    }
    o(Vs, "fixed");
    function rr(e) {
      return { id: "stay", stay: true, scenesToStay: e };
    }
    o(rr, "stay");
    function Is(e) {
      if (e == null)
        throw new Error("health() requires the initial amount of hp");
      return { id: "health", hurt(n = 1) {
        this.setHP(e - n), this.trigger("hurt", n);
      }, heal(n = 1) {
        this.setHP(e + n), this.trigger("heal", n);
      }, hp() {
        return e;
      }, setHP(n) {
        e = n, e <= 0 && this.trigger("death");
      }, onHurt(n) {
        return this.on("hurt", n);
      }, onHeal(n) {
        return this.on("heal", n);
      }, onDeath(n) {
        return this.on("death", n);
      }, inspect() {
        return `${e}`;
      } };
    }
    o(Is, "health");
    function js(e, n = {}) {
      if (e == null)
        throw new Error("lifespan() requires time");
      let r = n.fade ?? 0;
      return { id: "lifespan", async add() {
        await pt(e), r > 0 && this.opacity && await Cn(this.opacity, 0, r, (i) => this.opacity = i, at.linear), this.destroy();
      } };
    }
    o(js, "lifespan");
    function Ns(e, n, r) {
      if (!e)
        throw new Error("state() requires an initial state");
      let i = {};
      function u(f) {
        i[f] || (i[f] = { enter: new ve(), end: new ve(), update: new ve(), draw: new ve() });
      }
      o(u, "initStateEvents");
      function l(f, p, U) {
        return u(p), i[p][f].add(U);
      }
      o(l, "on");
      function a(f, p, ...U) {
        u(p), i[p][f].trigger(...U);
      }
      o(a, "trigger");
      let m = false;
      return { id: "state", state: e, enterState(f, ...p) {
        if (m = true, n && !n.includes(f))
          throw new Error(`State not found: ${f}`);
        let U = this.state;
        if (r) {
          if (!r?.[U])
            return;
          let D = typeof r[U] == "string" ? [r[U]] : r[U];
          if (!D.includes(f))
            throw new Error(`Cannot transition state from "${U}" to "${f}". Available transitions: ${D.map((H) => `"${H}"`).join(", ")}`);
        }
        a("end", U, ...p), this.state = f, a("enter", f, ...p), a("enter", `${U} -> ${f}`, ...p);
      }, onStateTransition(f, p, U) {
        return l("enter", `${f} -> ${p}`, U);
      }, onStateEnter(f, p) {
        return l("enter", f, p);
      }, onStateUpdate(f, p) {
        return l("update", f, p);
      }, onStateDraw(f, p) {
        return l("draw", f, p);
      }, onStateEnd(f, p) {
        return l("end", f, p);
      }, update() {
        m || (a("enter", e), m = true), a("update", this.state);
      }, draw() {
        a("draw", this.state);
      }, inspect() {
        return this.state;
      } };
    }
    o(Ns, "state");
    function ks(e = 1) {
      let n = 0, r = false;
      return { require: ["opacity"], add() {
        this.opacity = 0;
      }, update() {
        r || (n += Ae(), this.opacity = zt(n, 0, e, 0, 1), n >= e && (this.opacity = 1, r = true));
      } };
    }
    o(ks, "fadeIn");
    function En(e) {
      B.loaded ? e() : T.events.on("load", e);
    }
    o(En, "onLoad");
    function _s(e, n) {
      T.scenes[e] = n;
    }
    o(_s, "scene");
    function Hs(e, ...n) {
      if (!T.scenes[e])
        throw new Error(`Scene not found: ${e}`);
      T.events.onOnce("frameEnd", () => {
        T.events.trigger("sceneLeave", e), E.events.clear(), T.events.clear(), T.objEvents.clear(), [...T.root.children].forEach((r) => {
          (!r.stay || r.scenesToStay && !r.scenesToStay.includes(e)) && T.root.remove(r);
        }), T.root.clearEvents(), T.cam = { pos: null, scale: C(1), angle: 0, shake: 0, transform: new W() }, T.scenes[e](...n), s.debug !== false && er(), s.burp && tr();
      });
    }
    o(Hs, "go");
    function qs(e) {
      return T.events.on("sceneLeave", e);
    }
    o(qs, "onSceneLeave");
    function $s(e, n) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch {
        return n ? (sr(e, n), n) : null;
      }
    }
    o($s, "getData");
    function sr(e, n) {
      window.localStorage[e] = JSON.stringify(n);
    }
    o(sr, "setData");
    function ir(e) {
      let n = e(nt);
      for (let r in n)
        nt[r] = n[r], s.global !== false && (window[r] = n[r]);
      return nt;
    }
    o(ir, "plug");
    function Ht() {
      return C(we() / 2, ye() / 2);
    }
    o(Ht, "center");
    let zs;
    ((A) => (A[A.None = 0] = "None", A[A.Left = 1] = "Left", A[A.Top = 2] = "Top", A[A.LeftTop = 3] = "LeftTop", A[A.Right = 4] = "Right", A[A.Horizontal = 5] = "Horizontal", A[A.RightTop = 6] = "RightTop", A[A.HorizontalTop = 7] = "HorizontalTop", A[A.Bottom = 8] = "Bottom", A[A.LeftBottom = 9] = "LeftBottom", A[A.Vertical = 10] = "Vertical", A[A.LeftVertical = 11] = "LeftVertical", A[A.RightBottom = 12] = "RightBottom", A[A.HorizontalBottom = 13] = "HorizontalBottom", A[A.RightVertical = 14] = "RightVertical", A[A.All = 15] = "All"))(zs ||= {});
    function or(e = {}) {
      let n = C(0), r = e.isObstacle ?? false, i = e.cost ?? 0, u = e.edges ?? [], l = o(() => {
        let m = { left: 1, top: 2, right: 4, bottom: 8 };
        return u.map((f) => m[f] || 0).reduce((f, p) => f | p, 0);
      }, "getEdgeMask"), a = l();
      return { id: "tile", tilePosOffset: e.offset ?? C(0), set tilePos(m) {
        let f = this.getLevel();
        n = m.clone(), this.pos = C(this.tilePos.x * f.tileWidth(), this.tilePos.y * f.tileHeight()).add(this.tilePosOffset);
      }, get tilePos() {
        return n;
      }, set isObstacle(m) {
        r !== m && (r = m, this.getLevel().invalidateNavigationMap());
      }, get isObstacle() {
        return r;
      }, set cost(m) {
        i !== m && (i = m, this.getLevel().invalidateNavigationMap());
      }, get cost() {
        return i;
      }, set edges(m) {
        u = m, a = l(), this.getLevel().invalidateNavigationMap();
      }, get edges() {
        return u;
      }, get edgeMask() {
        return a;
      }, getLevel() {
        return this.parent;
      }, moveLeft() {
        this.tilePos = this.tilePos.add(C(-1, 0));
      }, moveRight() {
        this.tilePos = this.tilePos.add(C(1, 0));
      }, moveUp() {
        this.tilePos = this.tilePos.add(C(0, -1));
      }, moveDown() {
        this.tilePos = this.tilePos.add(C(0, 1));
      } };
    }
    o(or, "tile");
    function Ks(e, n) {
      if (!n.tileWidth || !n.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let r = wt([kt(n.pos ?? C(0))]), i = e.length, u = 0, l = null, a = null, m = null, f = null, p = o((v) => v.x + v.y * u, "tile2Hash"), U = o((v) => C(Math.floor(v % u), Math.floor(v / u)), "hash2Tile"), D = o(() => {
        l = [];
        for (let v of r.children)
          H(v);
      }, "createSpatialMap"), H = o((v) => {
        let R = p(v.tilePos);
        l[R] ? l[R].push(v) : l[R] = [v];
      }, "insertIntoSpatialMap"), V = o((v) => {
        let R = p(v.tilePos);
        if (l[R]) {
          let P = l[R].indexOf(v);
          P >= 0 && l[R].splice(P, 1);
        }
      }, "removeFromSpatialMap"), $ = o(() => {
        let v = false;
        for (let R of r.children) {
          let P = r.pos2Tile(R.pos);
          (R.tilePos.x != P.x || R.tilePos.y != P.y) && (v = true, V(R), R.tilePos.x = P.x, R.tilePos.y = P.y, H(R));
        }
        v && r.trigger("spatial_map_changed");
      }, "updateSpatialMap"), O = o(() => {
        let v = r.getSpatialMap(), R = r.numRows() * r.numColumns();
        a ? a.length = R : a = new Array(R), a.fill(1, 0, R);
        for (let P = 0; P < v.length; P++) {
          let G = v[P];
          if (G) {
            let j = 0;
            for (let Y of G)
              if (Y.isObstacle) {
                j = 1 / 0;
                break;
              } else
                j += Y.cost;
            a[P] = j || 1;
          }
        }
      }, "createCostMap"), A = o(() => {
        let v = r.getSpatialMap(), R = r.numRows() * r.numColumns();
        m ? m.length = R : m = new Array(R), m.fill(15, 0, R);
        for (let P = 0; P < v.length; P++) {
          let G = v[P];
          if (G) {
            let j = G.length, Y = 15;
            for (let ie = 0; ie < j; ie++)
              Y |= G[ie].edgeMask;
            m[P] = Y;
          }
        }
      }, "createEdgeMap"), te = o(() => {
        let v = r.numRows() * r.numColumns(), R = o((G, j) => {
          let Y = [];
          for (Y.push(G); Y.length > 0; ) {
            let ie = Y.pop();
            F(ie).forEach((fe) => {
              f[fe] < 0 && (f[fe] = j, Y.push(fe));
            });
          }
        }, "traverse");
        f ? f.length = v : f = new Array(v), f.fill(-1, 0, v);
        let P = 0;
        for (let G = 0; G < a.length; G++) {
          if (f[G] >= 0) {
            P++;
            continue;
          }
          R(G, P), P++;
        }
      }, "createConnectivityMap"), k = o((v, R) => a[R], "getCost"), _ = o((v, R) => {
        let P = U(v), G = U(R);
        return P.dist(G);
      }, "getHeuristic"), F = o((v, R) => {
        let P = [], G = Math.floor(v % u), j = G > 0 && m[v] & 1 && a[v - 1] !== 1 / 0, Y = v >= u && m[v] & 2 && a[v - u] !== 1 / 0, ie = G < u - 1 && m[v] & 4 && a[v + 1] !== 1 / 0, fe = v < u * i - u - 1 && m[v] & 8 && a[v + u] !== 1 / 0;
        return R ? (j && (Y && P.push(v - u - 1), P.push(v - 1), fe && P.push(v + u - 1)), Y && P.push(v - u), ie && (Y && P.push(v - u + 1), P.push(v + 1), fe && P.push(v + u + 1)), fe && P.push(v + u)) : (j && P.push(v - 1), Y && P.push(v - u), ie && P.push(v + 1), fe && P.push(v + u)), P;
      }, "getNeighbours"), xe = { id: "level", tileWidth() {
        return n.tileWidth;
      }, tileHeight() {
        return n.tileHeight;
      }, spawn(v, ...R) {
        let P = C(...R), G = (() => {
          if (typeof v == "string") {
            if (n.tiles[v]) {
              if (typeof n.tiles[v] != "function")
                throw new Error("Level symbol def must be a function returning a component list");
              return n.tiles[v](P);
            } else if (n.wildcardTile)
              return n.wildcardTile(v, P);
          } else {
            if (Array.isArray(v))
              return v;
            throw new Error("Expected a symbol or a component list");
          }
        })();
        if (!G)
          return null;
        let j = false, Y = false;
        for (let fe of G)
          fe.id === "tile" && (Y = true), fe.id === "pos" && (j = true);
        j || G.push(kt()), Y || G.push(or());
        let ie = r.add(G);
        return j && (ie.tilePosOffset = ie.pos.clone()), ie.tilePos = P, l && (H(ie), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), ie;
      }, numColumns() {
        return u;
      }, numRows() {
        return i;
      }, levelWidth() {
        return u * this.tileWidth();
      }, levelHeight() {
        return i * this.tileHeight();
      }, tile2Pos(...v) {
        return C(...v).scale(this.tileWidth(), this.tileHeight());
      }, pos2Tile(...v) {
        let R = C(...v);
        return C(Math.floor(R.x / this.tileWidth()), Math.floor(R.y / this.tileHeight()));
      }, getSpatialMap() {
        return l || D(), l;
      }, onSpatialMapChanged(v) {
        return this.on("spatial_map_changed", v);
      }, onNavigationMapInvalid(v) {
        return this.on("navigation_map_invalid", v);
      }, getAt(v) {
        l || D();
        let R = p(v);
        return l[R] || [];
      }, update() {
        l && $();
      }, invalidateNavigationMap() {
        a = null, m = null, f = null;
      }, onNavigationMapChanged(v) {
        return this.on("navigation_map_changed", v);
      }, getTilePath(v, R, P = {}) {
        if (a || O(), m || A(), f || te(), v.x < 0 || v.x >= u || v.y < 0 || v.y >= i || R.x < 0 || R.x >= u || R.y < 0 || R.y >= i)
          return null;
        let G = p(v), j = p(R);
        if (a[j] === 1 / 0)
          return null;
        if (G === j)
          return [];
        if (f[G] != -1 && f[G] !== f[j])
          return null;
        let Y = new Ut((Ve, An) => Ve.cost < An.cost);
        Y.insert({ cost: 0, node: G });
        let ie = /* @__PURE__ */ new Map();
        ie.set(G, G);
        let fe = /* @__PURE__ */ new Map();
        for (fe.set(G, 0); Y.length !== 0; ) {
          let Ve = Y.remove()?.node;
          if (Ve === j)
            break;
          let An = F(Ve, P.allowDiagonals);
          for (let Ye of An) {
            let On = (fe.get(Ve) || 0) + k(Ve, Ye) + _(Ye, j);
            (!fe.has(Ye) || On < fe.get(Ye)) && (fe.set(Ye, On), Y.insert({ cost: On, node: Ye }), ie.set(Ye, Ve));
          }
        }
        let Tn = [], bt = j, di = U(bt);
        for (Tn.push(di); bt !== G; ) {
          bt = ie.get(bt);
          let Ve = U(bt);
          Tn.push(Ve);
        }
        return Tn.reverse();
      }, getPath(v, R, P = {}) {
        let G = this.tileWidth(), j = this.tileHeight(), Y = this.getTilePath(this.pos2Tile(v), this.pos2Tile(R), P);
        return Y ? [v, ...Y.slice(1, -1).map((ie) => ie.scale(G, j).add(G / 2, j / 2)), R] : null;
      } };
      return r.use(xe), r.onNavigationMapInvalid(() => {
        r.invalidateNavigationMap(), r.trigger("navigation_map_changed");
      }), e.forEach((v, R) => {
        let P = v.split("");
        u = Math.max(P.length, u), P.forEach((G, j) => {
          r.spawn(G, C(j, R));
        });
      }), r;
    }
    o(Ks, "addLevel");
    function Ys(e = {}) {
      let n = null, r = null, i = null, u = null;
      return { id: "agent", require: ["pos", "tile"], agentSpeed: e.speed ?? 100, allowDiagonals: e.allowDiagonals ?? true, getDistanceToTarget() {
        return n ? this.pos.dist(n) : 0;
      }, getNextLocation() {
        return r && i ? r[i] : null;
      }, getPath() {
        return r ? r.slice() : null;
      }, getTarget() {
        return n;
      }, isNavigationFinished() {
        return r ? i === null : true;
      }, isTargetReachable() {
        return r !== null;
      }, isTargetReached() {
        return n ? this.pos.eq(n) : true;
      }, setTarget(l) {
        n = l, r = this.getLevel().getPath(this.pos, n, { allowDiagonals: this.allowDiagonals }), i = r ? 0 : null, r ? (u || (u = this.getLevel().onNavigationMapChanged(() => {
          r && i !== null && (r = this.getLevel().getPath(this.pos, n, { allowDiagonals: this.allowDiagonals }), i = r ? 0 : null, r ? this.trigger("navigation-next", this, r[i]) : this.trigger("navigation-ended", this));
        }), this.onDestroy(() => u.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, r[i])) : this.trigger("navigation-ended", this);
      }, update() {
        if (r && i !== null) {
          if (this.pos.sdist(r[i]) < 2)
            if (i === r.length - 1) {
              this.pos = n.clone(), i = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
              return;
            } else
              i++, this.trigger("navigation-next", this, r[i]);
          this.moveTo(r[i], this.agentSpeed);
        }
      }, onNavigationStarted(l) {
        return this.on("navigation-started", l);
      }, onNavigationNext(l) {
        return this.on("navigation-next", l);
      }, onNavigationEnded(l) {
        return this.on("navigation-ended", l);
      }, onTargetReached(l) {
        return this.on("target-reached", l);
      }, inspect() {
        return JSON.stringify({ target: JSON.stringify(n), path: JSON.stringify(r) });
      } };
    }
    o(Ys, "agent");
    function Xs(e) {
      let n = E.canvas().captureStream(e), r = le.ctx.createMediaStreamDestination();
      le.masterNode.connect(r);
      let i = new MediaRecorder(n), u = [];
      return i.ondataavailable = (l) => {
        l.data.size > 0 && u.push(l.data);
      }, i.onerror = () => {
        le.masterNode.disconnect(r), n.getTracks().forEach((l) => l.stop());
      }, i.start(), { resume() {
        i.resume();
      }, pause() {
        i.pause();
      }, stop() {
        return i.stop(), le.masterNode.disconnect(r), n.getTracks().forEach((l) => l.stop()), new Promise((l) => {
          i.onstop = () => {
            l(new Blob(u, { type: "video/mp4" }));
          };
        });
      }, download(l = "kaboom.mp4") {
        this.stop().then((a) => Vn(l, a));
      } };
    }
    o(Xs, "record");
    function Js() {
      return document.activeElement === E.canvas();
    }
    o(Js, "isFocused");
    function Ws(e) {
      e.destroy();
    }
    o(Ws, "destroy");
    let wt = T.root.add.bind(T.root), Qs = T.root.readd.bind(T.root), Zs = T.root.removeAll.bind(T.root), ar = T.root.get.bind(T.root);
    function ur(e = 2, n = 1) {
      let r = 0;
      return { id: "boom", require: ["scale"], update() {
        let i = Math.sin(r * e) * n;
        i < 0 && this.destroy(), this.scale = C(i), r += Ae();
      } };
    }
    o(ur, "boom");
    let ei = He(null, Dr), ti = He(null, Gr);
    function ni(e, n = {}) {
      let r = wt([kt(e), rr()]), i = (n.speed || 1) * 5, u = n.scale || 1;
      r.add([xn(ti), _t(0), Un("center"), ur(i, u), ...n.comps ?? []]);
      let l = r.add([xn(ei), _t(0), Un("center"), nr(), ...n.comps ?? []]);
      return l.wait(0.4 / i, () => l.use(ur(i, u))), l.onDestroy(() => r.destroy()), r;
    }
    o(ni, "addKaboom");
    function cr() {
      T.root.update();
    }
    o(cr, "updateFrame");
    class qt {
      source;
      target;
      displacement;
      resolved = false;
      constructor(n, r, i, u = false) {
        this.source = n, this.target = r, this.displacement = i, this.resolved = u;
      }
      reverse() {
        return new qt(this.target, this.source, this.displacement.scale(-1), this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    o(qt, "Collision");
    function ri() {
      let e = {}, n = s.hashGridSize || Pi, r = new W(), i = [];
      function u(l) {
        if (i.push(r.clone()), l.pos && r.translate(l.pos), l.scale && r.scale(l.scale), l.angle && r.rotate(l.angle), l.transform = r.clone(), l.c("area") && !l.paused) {
          let a = l, f = a.worldArea().bbox(), p = Math.floor(f.pos.x / n), U = Math.floor(f.pos.y / n), D = Math.ceil((f.pos.x + f.width) / n), H = Math.ceil((f.pos.y + f.height) / n), V = /* @__PURE__ */ new Set();
          for (let $ = p; $ <= D; $++)
            for (let O = U; O <= H; O++)
              if (!e[$])
                e[$] = {}, e[$][O] = [a];
              else if (!e[$][O])
                e[$][O] = [a];
              else {
                let A = e[$][O];
                e:
                  for (let te of A) {
                    if (!te.exists() || V.has(te.id))
                      continue;
                    for (let _ of a.collisionIgnore)
                      if (te.is(_))
                        continue e;
                    for (let _ of te.collisionIgnore)
                      if (a.is(_))
                        continue e;
                    let k = xr(a.worldArea(), te.worldArea());
                    if (k) {
                      let _ = new qt(a, te, k);
                      a.trigger("collideUpdate", te, _);
                      let F = _.reverse();
                      F.resolved = _.resolved, te.trigger("collideUpdate", a, F);
                    }
                    V.add(te.id);
                  }
                A.push(a);
              }
        }
        l.children.forEach(u), r = i.pop();
      }
      o(u, "checkObj"), u(T.root);
    }
    o(ri, "checkFrame");
    function si() {
      let e = T.cam, n = b.fromAngle(yt(0, 360)).scale(e.shake);
      e.shake = Ge(e.shake, 0, 5 * Ae()), e.transform = new W().translate(Ht()).scale(e.scale).rotate(e.angle).translate((e.pos ?? Ht()).scale(-1).add(n)), T.root.draw(), Ce();
    }
    o(si, "drawFrame");
    function ii() {
      let e = Be();
      T.events.numListeners("loading") > 0 ? T.events.trigger("loading", e) : Le(() => {
        let n = we() / 2, r = 24, i = C(we() / 2, ye() / 2).sub(C(n / 2, r / 2));
        Te({ pos: C(0), width: we(), height: ye(), color: J(0, 0, 0) }), Te({ pos: i, width: n, height: r, fill: false, outline: { width: 4 } }), Te({ pos: i, width: n * e, height: r });
      });
    }
    o(ii, "drawLoadScreen");
    function lr(e, n) {
      Le(() => {
        let r = C(8);
        I(), x(e);
        let i = ze({ text: n, font: Zt, size: 16, pos: r, color: J(255, 255, 255), fixed: true }), u = i.width + r.x * 2, l = i.height + r.x * 2;
        e.x + u >= we() && x(C(-u, 0)), e.y + l >= ye() && x(C(0, -l)), Te({ width: u, height: l, color: J(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ke(i), de();
      });
    }
    o(lr, "drawInspectText");
    function oi() {
      if (re.inspect) {
        let e = null;
        for (let n of T.root.get("*", { recursive: true }))
          if (n.c("area") && n.isHovering()) {
            e = n;
            break;
          }
        if (T.root.drawInspect(), e) {
          let n = [], r = e.inspect();
          for (let i in r)
            r[i] ? n.push(`${i}: ${r[i]}`) : n.push(`${i}`);
          lr(es(It()), n.join(`
`));
        }
        lr(C(8), `FPS: ${re.fps()}`);
      }
      re.paused && Le(() => {
        I(), x(we(), 0), x(-8, 8);
        let e = 32;
        Te({ width: e, height: e, anchor: "topright", color: J(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let n = 1; n <= 2; n++)
          Te({ width: 4, height: e * 0.6, anchor: "center", pos: C(-e / 3 * n, e * 0.5), color: J(255, 255, 255), radius: 2, fixed: true });
        de();
      }), re.timeScale !== 1 && Le(() => {
        I(), x(we(), ye()), x(-8, -8);
        let e = 8, n = ze({ text: re.timeScale.toFixed(1), font: Zt, size: 16, color: J(255, 255, 255), pos: C(-e), anchor: "botright", fixed: true });
        Te({ width: n.width + e * 2 + e * 4, height: n.height + e * 2, anchor: "botright", color: J(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let r = 0; r < 2; r++) {
          let i = re.timeScale < 1;
          qn({ p1: C(-n.width - e * (i ? 2 : 3.5), -e), p2: C(-n.width - e * (i ? 2 : 3.5), -e - n.height), p3: C(-n.width - e * (i ? 3.5 : 2), -e - n.height / 2), pos: C(-r * e * 1 + (i ? -e * 0.5 : 0), 0), color: J(255, 255, 255), fixed: true });
        }
        Ke(n), de();
      }), re.curRecording && Le(() => {
        I(), x(0, ye()), x(24, -24), Ze({ radius: 12, color: J(255, 0, 0), opacity: Mn(0, 1, E.time() * 4), fixed: true }), de();
      }), re.showLog && T.logs.length > 0 && Le(() => {
        I(), x(0, ye()), x(8, -8);
        let e = 8, n = ze({ text: T.logs.join(`
`), font: Zt, pos: C(e, -e), anchor: "botleft", size: 16, width: we() * 0.6, lineSpacing: e / 2, fixed: true, styles: { time: { color: J(127, 127, 127) }, info: { color: J(255, 255, 255) }, error: { color: J(255, 0, 127) } } });
        Te({ width: n.width + e * 2, height: n.height + e * 2, anchor: "botleft", color: J(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ke(n), de();
      });
    }
    o(oi, "drawDebug"), s.debug !== false && er(), s.burp && tr();
    function ai(e) {
      T.events.on("loading", e);
    }
    o(ai, "onLoading");
    function ui(e) {
      T.events.on("resize", e);
    }
    o(ui, "onResize");
    function ci(e) {
      T.events.on("error", e);
    }
    o(ci, "onError");
    function Sn(e) {
      E.run(() => {
        Le(() => {
          let i = we(), u = ye(), l = { size: 36, width: i - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: Zt, fixed: true };
          Te({ width: i, height: u, color: J(0, 0, 255), fixed: true });
          let a = ze({ ...l, text: e.name, pos: C(32), color: J(255, 128, 0), fixed: true });
          Ke(a), Jn({ ...l, text: e.message, pos: C(32, 32 + a.height + 16), fixed: true }), de(), T.events.trigger("error", e);
        });
      });
    }
    o(Sn, "handleErr");
    function li(e) {
      X.push(e);
    }
    o(li, "onCleanup");
    function hi() {
      T.events.onOnce("frameEnd", () => {
        E.quit();
        for (let n in et)
          window.removeEventListener(n, et[n]);
        d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT | d.STENCIL_BUFFER_BIT);
        let e = d.getParameter(d.MAX_TEXTURE_IMAGE_UNITS);
        for (let n = 0; n < e; n++)
          d.activeTexture(d.TEXTURE0 + n), d.bindTexture(d.TEXTURE_2D, null), d.bindTexture(d.TEXTURE_CUBE_MAP, null);
        d.bindBuffer(d.ARRAY_BUFFER, null), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null), d.bindRenderbuffer(d.RENDERBUFFER, null), d.bindFramebuffer(d.FRAMEBUFFER, null), X.forEach((n) => n()), d.deleteBuffer(w2.vbuf), d.deleteBuffer(w2.ibuf);
      });
    }
    o(hi, "quit");
    function Cn(e, n, r, i, u = at.linear) {
      let l = 0, a = [], m = vn(() => {
        l += Ae();
        let f = Math.min(l / r, 1);
        i(Ge(e, n, u(f))), f === 1 && (m.cancel(), i(n), a.forEach((p) => p()));
      });
      return { get paused() {
        return m.paused;
      }, set paused(f) {
        m.paused = f;
      }, onEnd(f) {
        a.push(f);
      }, then(f) {
        return this.onEnd(f), this;
      }, cancel() {
        m.cancel();
      }, finish() {
        m.cancel(), i(n), a.forEach((f) => f());
      } };
    }
    o(Cn, "tween");
    let $t = true;
    E.run(() => {
      gn(), B.loaded || Be() === 1 && !$t && (B.loaded = true, T.events.trigger("load")), !B.loaded && s.loadingScreen !== false || $t ? ii() : (re.paused || cr(), ri(), si(), s.debug !== false && oi()), $t && ($t = false), Lt(), T.events.trigger("frameEnd");
    }), Qr();
    let nt = { VERSION: Ti, loadRoot: tn, loadProgress: Be, loadSprite: He, loadSpriteAtlas: Et, loadSound: dn, loadBitmapFont: an, loadFont: on, loadShader: ln, loadShaderURL: hn, loadAseprite: cn, loadPedit: un, loadBean: fn, loadJSON: sn, load: lt, getSprite: Ct, getSound: Tt, getFont: At, getBitmapFont: Ot, getShader: Pt, getAsset: mn, Asset: se, SpriteData: ce, SoundData: pe, width: we, height: ye, center: Ht, dt: Ae, time: E.time, screenshot: E.screenshot, record: Xs, isFocused: Js, setCursor: E.setCursor, getCursor: E.getCursor, setCursorLocked: E.setCursorLocked, isCursorLocked: E.isCursorLocked, setFullscreen: E.setFullscreen, isFullscreen: E.isFullscreen, isTouchScreen: E.isTouchScreen, onLoad: En, onLoading: ai, onResize: ui, onGamepadConnect: E.onGamepadConnect, onGamepadDisconnect: E.onGamepadDisconnect, onError: ci, onCleanup: li, camPos: ts, camScale: ns, camRot: rs, shake: ss, toScreen: bn, toWorld: Wn, setGravity: ms, getGravity: ps, setBackground: gs, getBackground: ws, getGamepads: E.getGamepads, add: wt, destroy: Ws, destroyAll: Zs, get: ar, readd: Qs, pos: kt, scale: _t, rotate: bs, color: vs, opacity: ys, anchor: Un, area: Ts, sprite: xn, text: As, rect: Os, circle: Rs, uvquad: Ps, outline: Ms, body: Fs, doubleJump: Bs, shader: Ls, timer: nr, fixed: Vs, stay: rr, health: Is, lifespan: js, z: Us, move: Es, offscreen: Cs, follow: xs, state: Ns, fadeIn: ks, tile: or, agent: Ys, on: Ie, onUpdate: vn, onDraw: is, onAdd: yn, onDestroy: Zn, onClick: cs, onCollide: os, onCollideUpdate: as, onCollideEnd: us, onHover: ls, onHoverUpdate: hs, onHoverEnd: ds, onKeyDown: E.onKeyDown, onKeyPress: E.onKeyPress, onKeyPressRepeat: E.onKeyPressRepeat, onKeyRelease: E.onKeyRelease, onMouseDown: E.onMouseDown, onMousePress: E.onMousePress, onMouseRelease: E.onMouseRelease, onMouseMove: E.onMouseMove, onCharInput: E.onCharInput, onTouchStart: E.onTouchStart, onTouchMove: E.onTouchMove, onTouchEnd: E.onTouchEnd, onScroll: E.onScroll, onGamepadButtonDown: E.onGamepadButtonDown, onGamepadButtonPress: E.onGamepadButtonPress, onGamepadButtonRelease: E.onGamepadButtonRelease, onGamepadStick: E.onGamepadStick, mousePos: It, mouseDeltaPos: E.mouseDeltaPos, isKeyDown: E.isKeyDown, isKeyPressed: E.isKeyPressed, isKeyPressedRepeat: E.isKeyPressedRepeat, isKeyReleased: E.isKeyReleased, isMouseDown: E.isMouseDown, isMousePressed: E.isMousePressed, isMouseReleased: E.isMouseReleased, isMouseMoved: E.isMouseMoved, isGamepadButtonPressed: E.isGamepadButtonPressed, isGamepadButtonDown: E.isGamepadButtonDown, isGamepadButtonReleased: E.isGamepadButtonReleased, charInputted: E.charInputted, loop: fs, wait: pt, play: Gt, volume: Dt, burp: Ft, audioCtx: le.ctx, Timer: ut, Line: Se, Rect: ne, Circle: Ne, Polygon: Pe, Vec2: b, Color: L, Mat4: W, Quad: Q, RNG: st, rand: yt, randi: Dn, randSeed: mr, vec2: C, rgb: J, hsl2rgb: fr, quad: ae, choose: gr, chance: pr, lerp: Ge, tween: Cn, easings: at, map: zt, mapc: dr, wave: Mn, deg2rad: De, rad2deg: it, testLineLine: rt, testRectRect: wr, testRectLine: br, testRectPoint: vt, testCirclePolygon: Ur, testLinePoint: vr, testLineCircle: Gn, drawSprite: Yr, drawText: Jn, formatText: ze, drawRect: Te, drawLine: mt, drawLines: Hn, drawTriangle: qn, drawCircle: Ze, drawEllipse: $n, drawUVQuad: Me, drawPolygon: $e, drawFormattedText: Ke, drawMasked: Xr, drawSubtracted: Jr, pushTransform: I, popTransform: de, pushTranslate: x, pushScale: ee, pushRotate: ge, pushMatrix: y, usePostEffect: Bt, debug: re, scene: _s, go: Hs, onSceneLeave: qs, addLevel: Ks, getData: $s, setData: sr, download: Kt, downloadJSON: Sr, downloadText: Ln, downloadBlob: Vn, plug: ir, ASCII_CHARS: Fr, canvas: E.canvas(), addKaboom: ni, LEFT: b.LEFT, RIGHT: b.RIGHT, UP: b.UP, DOWN: b.DOWN, RED: L.RED, GREEN: L.GREEN, BLUE: L.BLUE, YELLOW: L.YELLOW, MAGENTA: L.MAGENTA, CYAN: L.CYAN, WHITE: L.WHITE, BLACK: L.BLACK, quit: hi, Event: ve, EventHandler: Fe, EventController: Oe };
    if (s.plugins && s.plugins.forEach(ir), s.global !== false)
      for (let e in nt)
        window[e] = nt[e];
    return E.canvas().focus(), nt;
  }, "default");

  // index.js
  var w = window.innerWidth > 0 ? window.innerWidth : screen.width;
  var h = window.innerHeight > 0 ? window.innerHeight : screen.height;
  var sc = h / 615;
  mo({
    maxFPS: 240,
    crisp: true,
    width: 1128 * 1.25,
    height: 615 * 1.25,
    scale: 0.8 * sc,
    stretch: false,
    debug: true
  });
  loadSprite("bottomBun", "images/bottomBun2.png");
  loadSprite("lettuce", "images/lettuce2.png");
  loadSprite("tomato", "images/tomato2.png");
  loadSprite("patty", "images/patty.png");
  loadSprite("topBun", "images/topBun.png");
  loadSprite("background", "images/pattern.png");
  loadSprite("bell", "images/bell.png");
  loadSprite("paper", "images/paper.png");
  loadSprite("table", "images/table.png");
  loadSprite("guacamole", "images/guacamole.png");
  loadSprite("title", "images/title.png");
  loadSprite("titleBackground", "images/titleBackground.png");
  loadSprite("play", "images/play.png");
  loadSprite("tutorial", "images/tutorial.png");
  loadSprite("click", "images/click.png");
  loadSprite("clickHere", "images/clickHere.png");
  loadSprite("pause", "images/pause.png");
  loadSprite("playButton", "images/playButton.png");
  loadSprite("pickles", "images/pickles.png");
  loadSprite("arrow", "images/arrow.png");
  loadSprite("specialOrder", "images/specialOrder.png");
  loadSprite("x", "images/x.png");
  loadSprite("window", "images/window.png");
  loadFont("font", "./font.ttf");
  loadFont("lightFont", "Bai_Jamjuree/BaiJamjuree-Medium.ttf");
  loadSound("bell", "sfx/bell.mp3");
  loadSound("plop", "sfx/plop.mp3");
  loadSound("start", "sfx/start.mp3");
  loadSound("music", "music.mp3");
  var ingredients = [
    "lettuce",
    "tomato",
    "patty",
    "topBun",
    "guacamole",
    "pickles"
  ];
  var ingredientsInRecipe = [
    "lettuce",
    "tomato",
    "patty",
    "guacamole",
    "pickles"
  ];
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
    return array;
  }
  function floating() {
    return {
      // Initialize the component
      add() {
        this.origY = this.pos.y;
        this.offset = Math.random() * 20;
      },
      // Update the component
      update() {
        this.pos.y = this.origY + Math.sin(time() + this.offset) * 10;
      }
    };
  }
  function blinking() {
    let timer = 0;
    return {
      // Component initialization
      // Component update function
      update() {
        if (debug.fps() > 1) {
          timer += 1 / debug.fps();
          if (timer >= 0.5) {
            this.hidden = !this.hidden;
            timer = 0;
          }
        }
      }
    };
  }
  var effects = {
    light: () => ({
      "u_radius": 200,
      "u_blur": 300,
      "u_resolution": vec2(1128 * 1.25, 615 * 1.25),
      "u_mouse": center()
    })
  };
  for (const effect in effects) {
    loadShaderURL(effect, null, `${effect}.frag`);
  }
  var music = play("music", {
    volume: 0.3,
    loop: true
  });
  scene("game", (difficulty) => {
    var level = 1;
    var isPaused = false;
    var order = [];
    var recipe;
    var score = 1;
    var numOrders = 1;
    var specialOrder = false;
    var strikes = difficulty == "HARD" || difficulty == "SUPERHARD" ? 1 : 3;
    var xList = [];
    var multiplyer = difficulty == "SUPERHARD" ? 2 : 1;
    setGravity(700 * multiplyer);
    var transition = add([
      rect(width(), height()),
      z(1e5),
      opacity(1)
    ]);
    var endingScreen = add([
      rect(width() / 2, height() / 1.1, {
        radius: 50
      }),
      anchor("center"),
      color(BLACK),
      pos(center().x, -height() / 2),
      z(1e3)
    ]);
    var endBody = endingScreen.add([
      rect(width() / 2 - 50, height() / 1.1 - 50, {
        radius: 30
      }),
      color("#A5E78D"),
      anchor("center")
    ]);
    endBody.add([
      text("YOU LOST\n:(", {
        font: "font",
        size: 120,
        align: "center"
      }),
      pos(0, -100),
      anchor("center")
    ]);
    var goBackMenu = endingScreen.add([
      text("GO BACK to MENU", {
        font: "font",
        size: 40
      }),
      anchor("center"),
      rotate(0),
      area(),
      pos(0, 200),
      "unPausable"
    ]);
    var restartBackMenu = endingScreen.add([
      text("RESTART", {
        font: "font",
        size: 40
      }),
      anchor("center"),
      rotate(0),
      area(),
      pos(0, 130),
      "unPausable"
    ]);
    goBackMenu.onClick(async () => {
      await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
        go("menu");
      });
    });
    restartBackMenu.onClick(async () => {
      await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
        go("game", difficulty);
      });
    });
    var background = add([
      sprite("background"),
      rotate(45),
      anchor("center"),
      pos(center()),
      scale(0.8),
      color()
    ]);
    add([
      rect(width() / 1.3, 250),
      pos(width() / 2, height() / 1.2),
      anchor("center"),
      outline(10)
    ]);
    var specialOrderLabel = add([
      sprite("specialOrder"),
      anchor("center"),
      blinking(),
      pos(center()),
      scale(0.4),
      z(1e3)
    ]);
    volume(0.5);
    onDraw(() => {
      drawLine({
        p1: vec2(0, center().y - 200),
        p2: vec2(width(), center().y - 200),
        width: 4,
        color: rgb(0, 0, 0),
        z: 0
      });
    });
    var ready = add([
      sprite("bell"),
      pos(center().x - 300, center().y + 80),
      anchor("center"),
      scale(0.2),
      //animate(1, 0.01),
      area({
        scale: vec2(0.8, 0.7)
      })
    ]);
    function specialRequest() {
      specialOrder = true;
      var recipes = get("recipe");
      recipes.forEach((r2) => {
        destroy(r2);
      });
      var r = [];
      for (let i2 = 0; i2 < level; i2++) {
        r.push(ingredientsInRecipe[Math.floor(Math.random() * ingredientsInRecipe.length)]);
      }
      var st2 = "Top Bun\n";
      let reversedOrder = [...r].reverse();
      reversedOrder.forEach((element) => {
        st2 += `${element} 
`;
      });
      st2 += "Bottom Bun\n";
      let border = add([
        rect(950, 1350, {
          radius: 60
        }),
        anchor("center"),
        pos(-100),
        //move(180, -90),
        color(BLACK),
        scale(0.25),
        area(),
        {
          ingre: r
        },
        "recipe"
      ]);
      border.add([
        rect(800, 1200, {
          radius: 40
        }),
        anchor("center")
      ]);
      tween(border.pos, vec2(width() - 200, center().y), 0.5, (p) => border.pos = p, easings.easeInBack);
      border.add([
        text(st2, {
          align: "center",
          font: "lightFont"
        }),
        anchor("center"),
        area(),
        color(BLACK),
        scale(3),
        pos(0, 100)
      ]);
      recipe = {
        text: border.ingre,
        obj: border
      };
      ingredients = [...border.ingre, "topBun"];
      ingredientIndex = 0;
      shuffle(ingredients);
      border.unuse("move"), tween(border.pos, vec2(width() - 200, center().y), 0.5, (p) => border.pos = p, easings.easeInBack);
      tween(border.scale, vec2(0.25), 0.5, (p) => border.scale = p, easings.easeInSine);
    }
    wait(Math.random() * 10 + 40, () => {
      loop(Math.random() * 60 + 60, () => {
        specialRequest();
      });
    });
    ready.onClick(async () => {
      if (recipe != null && !isPaused) {
        var points = 0;
        specialOrder = false;
        recipe.obj.destroy();
        for (let i2 = 0; i2 < recipe.text.length; i2++) {
          if (order[i2] != null) {
            if (recipe.text[i2].includes(order[i2])) {
              points += 1;
            }
          }
        }
        if (level < 6) {
          level += points / recipe.text.length / 3;
        }
        score += points / recipe.text.length * 5;
        if (strikes != 0) {
          var strikeObj = xList[strikes - 1];
          if (points != recipe.text.length) {
            strikeObj.opacity = 1;
            strikes -= 1;
          }
        }
        recipe = null;
        numOrders++;
        play("bell", {
          volume: 3,
          seek: 0.3
        });
        get("ingredient").forEach((element) => {
          if (element.isGrounded()) {
            tween(element.pos, vec2(width() + 300, element.pos.y), 1, (p) => element.pos = p, easings.easeInSine);
          }
        });
        await tween(bottomBun.pos, vec2(width() + 300, bottomBun.pos.y), 1, (p) => bottomBun.pos = p, easings.easeInSine).then(() => {
          bottomBun.pos = vec2(-300, bottomBun.pos.y);
          tween(bottomBun.pos, vec2(center().x, bottomBun.pos.y), 1, (p) => bottomBun.pos = p, easings.easeInSine);
        });
      }
    });
    loop(10, () => {
      addRecipe();
    });
    for (let i2 = 0; i2 < 6; i2++) {
      add([
        rect(1301 * 0.250832693 / 1.5, 307 * 0.250832693 / 1.36),
        area(),
        pos(center().x, 445 - i2 * 307 / 5),
        anchor("center"),
        color(RED),
        outline(10),
        opacity(0),
        "layer"
      ]);
    }
    var layers = get("layer");
    var scoreLabelBorder = add([
      rect(450, 100),
      outline(5),
      pos(width() - 200, 100),
      anchor("center")
    ]);
    for (var i = 0; i < strikes; i++) {
      if (difficulty == "EASY")
        break;
      let xObj = scoreLabelBorder.add([
        sprite("x"),
        pos(strikes != 1 ? 550 / 5 - i * 125 : 0, 0),
        anchor("center"),
        scale(0.075),
        opacity(0.3)
      ]);
      xList.push(xObj);
    }
    var scoreLabel = scoreLabelBorder.add([
      text(`Score: ${score}/5`, {
        font: "lightFont",
        size: 40
      }),
      anchor("center"),
      color(BLACK)
    ]);
    scoreLabel.hidden = difficulty != "EASY";
    scoreLabel.onUpdate(() => {
      scoreLabel.text = `Score: ${Math.floor(score / numOrders)} Star(s)`;
    });
    var bottomBun = add([
      sprite("bottomBun"),
      pos(width() / 2, height() / 1.5),
      anchor("center"),
      //area({scale: vec2(2,2)}),
      area(),
      body({
        isStatic: true
      }),
      scale(0.376249039 / 2)
    ]);
    var pauseButton = add([
      sprite("pause"),
      anchor("center"),
      pos(width() - 50, height() - 50),
      area(),
      scale(1),
      "unPausable",
      z(1e3)
    ]);
    const pauseMenuBorder = add([
      rect(350, 450, {
        radius: 50
      }),
      pos(center().add(0, 700)),
      anchor("center"),
      z(1e4),
      color(BLACK),
      area(),
      "unPausable"
    ]);
    const pauseMenu = pauseMenuBorder.add([
      rect(300, 400, {
        radius: 30
      }),
      color("#FF8585"),
      anchor("center"),
      area(),
      "unPausable"
    ]);
    pauseMenu.add([
      text("GAME \nPAUSED", {
        font: "font",
        align: "center"
      }),
      anchor("center"),
      scale(1.3)
    ]);
    var pauseMenuTitleScreen = pauseMenu.add([
      pos(0, 170),
      text("BACK to MENU", {
        font: "font"
      }),
      anchor("center"),
      area()
    ]);
    var resume = pauseMenu.add([
      pos(0, 120),
      text("RESUME", {
        font: "font"
      }),
      anchor("center"),
      area()
    ]);
    pauseMenuTitleScreen.onClick(async () => {
      await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
        go("menu");
      });
    });
    resume.onClick(() => {
      pause();
    });
    pauseButton.onClick(() => {
      pause();
    });
    var recipeHolder = add([
      rect(800 * 0.1, 1200 * 0.1),
      area({
        collisionIgnore: ["ingredient"]
      }),
      scale(1),
      pos(vec2(width() - 200, center().y)),
      opacity(0),
      anchor("center")
    ]);
    recipeHolder.onCollide("recipe", (a) => {
      recipe = {
        text: a.ingre,
        obj: a
      };
    });
    recipeHolder.onCollideEnd("recipe", (a) => {
      recipe = null;
    });
    const effect = Object.keys(effects)[0];
    usePostEffect(effect, effects[effect]());
    function addRecipe() {
      get("recipe").forEach((rec) => {
        if (rec.pos == vec2(width() - 200, center().y)) {
          destroy(rec);
        }
      });
      var r = [];
      for (let i2 = 0; i2 < level; i2++) {
        r.push(ingredientsInRecipe[Math.floor(Math.random() * ingredientsInRecipe.length)]);
      }
      var st2 = "Top Bun\n";
      let reversedOrder = [...r].reverse();
      reversedOrder.forEach((element) => {
        st2 += `${element} 
`;
      });
      st2 += "Bottom Bun\n";
      let border = add([
        rect(950, 1350, {
          radius: 60
        }),
        anchor("center"),
        pos(-100, center().y - 200),
        move(180, -90),
        color(rgb(0, 0, 0)),
        scale(0.2),
        area(),
        {
          ingre: r
        },
        "recipe"
      ]);
      border.add([
        rect(800, 1200, {
          radius: 40
        }),
        anchor("center")
      ]);
      border.add([
        text(st2, {
          align: "center",
          font: "lightFont"
        }),
        anchor("center"),
        area(),
        color(BLACK),
        scale(3),
        pos(0, 100)
      ]);
    }
    var ingredientIndex = 0;
    tween(transition.opacity, 0, 1, (p) => transition.opacity = p, easings.easeInSine);
    onClick("recipe", async (a) => {
      if (recipe == null && a.children.length > 0 && !a.paused) {
        ingredients = [...a.ingre, "topBun"];
        ingredientIndex = 0;
        shuffle(ingredients);
        a.unuse("move"), tween(a.pos, vec2(width() - 200, center().y), 0.5, (p) => a.pos = p, easings.linear);
        tween(a.scale, vec2(0.25), 0.5, (p) => a.scale = p, easings.easeInSine);
      }
    });
    loop(2 / level, () => {
      if (ingredients.length > 0) {
        var ty = ingredients[ingredientIndex].replace(" ", "");
        var mat = add([
          sprite(ty.replace("\n", "")),
          pos(Math.floor(Math.random() * width()), -100),
          anchor("center"),
          body({
            maxVelocity: (Math.random() * 200 + 600) * multiplyer,
            stickToPlatform: false
          }),
          //area({scale: vec2(2,2)}),
          area({
            shape: new Rect(vec2(0), 1301, 307),
            collisionIgnore: [ty.replace("\n", "") == "topBun" ? "layer" : null]
          }),
          offscreen({
            destroy: true
          }),
          scale(0.376249039 / 2),
          "ingredient",
          {
            type: ty
          }
        ]);
        if (ingredientIndex >= ingredients.length - 1) {
          ingredientIndex = 0;
        } else {
          ingredientIndex += 1;
        }
      }
    });
    onCollideEnd("layer", "ingredient", (c, d) => {
      var index = layers.indexOf(c);
      if (order[index] == d.type)
        order[index] = null;
    });
    var heldIngredient;
    var endingIsTweening = false;
    onUpdate(async () => {
      let dt = 0;
      var groundedIngredients = [];
      if (debug.fps() > 1) {
        dt = 1 / debug.fps();
      }
      get("recipe").forEach((r) => {
        if (recipe != null || recipe != void 0) {
          if (recipe.obj == r) {
            r.scale.x += (0.25 - r.scale.x) * dt;
            r.scale.y += (0.25 - r.scale.y) * dt;
          }
        } else {
          r.scale = vec2(Math.sin(time()) / 30 + 0.2);
        }
      });
      if (specialOrder) {
        tween(background.color, rgb("#FF8585"), 1, (c) => background.color = c, easings.linear);
        specialOrderLabel.paused = false;
        specialOrderLabel.opacity = 1;
      } else {
        tween(background.color, WHITE, 1, (c) => background.color = c, easings.linear);
        specialOrderLabel.paused = true;
        specialOrderLabel.opacity = 0;
      }
      if (strikes == 0) {
        if (!endingIsTweening) {
          await tween(endingScreen.pos.y, center().y, 1, (y) => endingScreen.pos.y = y, easings.easeInSine).then(() => {
            endingIsTweening = true;
          });
        }
        if (endingScreen.pos.y == center().y) {
          const allObjs = get("*");
          allObjs.forEach((obj) => {
            obj.paused = !obj.is("unPausable");
          });
        }
      }
      get("recipe").forEach((r) => {
        if (r.pos.x > width() + 200) {
          numOrders += 1;
          destroy(r);
          if (difficulty != "EASY" && strikes != 0) {
            var strikeObj = xList[strikes - 1];
            strikeObj.opacity = 1;
            strikes -= 1;
          }
        }
      });
      get("ingredient").forEach(async (ingredient) => {
        if (ingredient.isClicked() && heldIngredient == null) {
          heldIngredient = ingredient;
          wait(0, () => {
            play("plop", {
              seek: 0.023,
              detune: 500,
              volume: 0.8
            });
          });
          tween(ingredient.scale, vec2(0.376249039 / 1.5), 1, (s) => ingredient.scale = s, easings.easeOutElastic);
          var particleColor;
          switch (ingredient.type) {
            case "topBun":
            case "patty":
              particleColor = rgb(196, 164, 132);
              break;
            case "tomato":
              particleColor = rgb("#FF6B6B");
              break;
            case "guacamole":
            case "lettuce":
            case "pickles":
              particleColor = GREEN;
              break;
            default:
              particleColor = BLACK;
              break;
          }
          for (let particle = 0; particle < 5; particle++) {
            const item = ingredient.add([
              rect(20, 20),
              anchor("center"),
              scale(rand(3, 6)),
              area({ collisionIgnore: ["particle", "ingredient"] }),
              body(),
              pos(),
              lifespan(1, { fade: 0.5 }),
              opacity(1),
              move(choose([LEFT, RIGHT]), rand(720, 720 * 2)),
              color(particleColor),
              //                        follow(ingredient),
              "particle"
            ]);
            item.jump(rand(320, 640));
          }
        }
        if (!isMouseDown("left")) {
          tween(ingredient.scale, vec2(0.376249039 / 2), 0.1, (s) => ingredient.scale = s, easings.easeOutSine);
          heldIngredient = null;
        }
        if (ingredient.isGrounded()) {
          groundedIngredients.push({
            i: ingredient.type,
            y: ingredient.pos.y
          });
        }
      });
      if (heldIngredient != null || heldIngredient != void 0) {
        heldIngredient.pos = mousePos();
      }
      groundedIngredients.sort((a, b2) => b2.y - a.y);
      order = groundedIngredients.map((item) => item.i);
    });
    var curTween;
    pauseMenu.hidden = true;
    pauseMenu.paused = true;
    function pause() {
      const allObjs = get("*");
      isPaused = !isPaused;
      allObjs.forEach((obj) => {
        obj.paused = !obj.paused;
      });
      if (curTween)
        curTween.cancel();
      curTween = tween(
        // start value (accepts number, Vec2 and Color)
        pauseMenuBorder.pos,
        // destination value
        isPaused ? center() : vec2(center().x, height() + 250),
        // duration (in seconds)
        isPaused ? 1 : 0.5,
        // how value should be updated
        (p) => pauseMenuBorder.pos = p,
        // interpolation function (defaults to easings.linear)
        isPaused ? easings.easeOutElastic : easings.linear
      );
      if (isPaused) {
        pauseMenu.hidden = false;
        pauseMenu.paused = false;
      } else {
        curTween.onEnd(() => {
          pauseMenu.hidden = true;
          pauseMenu.paused = true;
        });
      }
      var unPausable = get("unPausable");
      unPausable.forEach((element) => {
        element.pause = false;
      });
    }
    function unpause() {
      const allObjs = get("*");
      isPaused = false;
      allObjs.forEach((obj) => {
        obj.paused = false;
      });
      if (curTween)
        curTween.cancel();
      curTween = tween(
        // start value (accepts number, Vec2 and Color)
        pauseMenuBorder.pos,
        // destination value
        isPaused ? center() : vec2(center().x, height() + 500),
        // duration (in seconds)
        0.5,
        // how value should be updated
        (p) => pauseMenuBorder.pos = p,
        // interpolation function (defaults to easings.linear)
        easings.easeOutElastic
      );
      if (isPaused) {
        pauseMenu.hidden = false;
        pauseMenu.paused = false;
      } else {
        curTween.onEnd(() => {
          pauseMenu.hidden = true;
          pauseMenu.paused = true;
        });
      }
      var unPausable = get("unPausable");
      unPausable.forEach((element) => {
        element.pause = false;
      });
    }
  });
  scene("menu", () => {
    var transition = add([
      rect(width(), height()),
      z(1e5),
      opacity(1)
    ]);
    tween(transition.opacity, 0, 1, (p) => transition.opacity = p, easings.easeInSine);
    ingredients = [
      "lettuce",
      "tomato",
      "patty",
      "topBun",
      "guacamole",
      "pickles"
    ];
    var background = add([
      sprite("background"),
      anchor("center"),
      pos(center()),
      scale(0.8),
      rotate(45),
      color()
    ]);
    var titleBackground = add([
      rect(width() / 2, height() / 1.1, {
        radius: 50
      }),
      anchor("center"),
      color(BLACK),
      pos(center())
    ]);
    titleBackground.add([
      rect(width() / 2 - 50, height() / 1.1 - 50, {
        radius: 30
      }),
      color("#A5E78D"),
      anchor("center")
    ]);
    var playButtonBorder = add([
      rect(400, 100, {
        radius: 45
      }),
      pos(center().x, center().y + 10),
      color(BLACK),
      anchor("center"),
      scale(1.25),
      floating()
    ]);
    var playButton = playButtonBorder.add([
      rect(360, 60, {
        radius: 30
      }),
      pos(),
      anchor("center"),
      color("#4ECDC4"),
      z(1e3),
      area()
    ]);
    playButton.add([
      text("play!", {
        font: "font"
      }),
      anchor("center")
    ]);
    var tutorialBorder = add([
      rect(400, 100, {
        radius: 45
      }),
      pos(center().x, center().y - 30),
      color(BLACK),
      anchor("center"),
      scale(1.25)
    ]);
    var tutorial = tutorialBorder.add([
      rect(360, 60, {
        radius: 30
      }),
      pos(),
      anchor("center"),
      color("#FF6B6B"),
      z(1e3),
      area()
    ]);
    tutorial.add([
      text("help mee!", {
        font: "font"
      }),
      anchor("center")
    ]);
    tutorial.onUpdate(() => {
      tutorialBorder.pos.y = playButtonBorder.pos.y + 135;
    });
    var difficultyLevelHolder = add([
      rect(300, 350),
      pos(0 - 155, playButtonBorder.pos.y),
      anchor("center"),
      outline(5),
      z(1e5 - 2)
    ]);
    var easy = difficultyLevelHolder.add([
      rect(285, 100),
      pos(0, -115),
      area(),
      //color(rgb('#87ff7c')),
      color("#4ECDC4"),
      anchor("center"),
      outline(5),
      "difficulty",
      "easy"
    ]);
    easy.add([
      text("easy!", {
        font: "font"
      }),
      anchor("center")
    ]);
    var medium = difficultyLevelHolder.add([
      rect(285, 100),
      pos(0, 0),
      area(),
      color(rgb(255, 165, 0)),
      anchor("center"),
      outline(5),
      "difficulty",
      "medium"
    ]);
    medium.add([
      text("medium!!", {
        font: "font"
      }),
      anchor("center"),
      color(WHITE)
    ]);
    var hard = difficultyLevelHolder.add([
      rect(285, 100),
      pos(0, 115),
      color(RED),
      area(),
      anchor("center"),
      outline(5),
      "difficulty",
      "hard"
    ]);
    hard.add([
      text("hard!!!", {
        font: "font"
      }),
      anchor("center"),
      color(WHITE)
    ]);
    onClick("difficulty", async (b2) => {
      if (b2.paused)
        return;
      var difficulty = "medium".toUpperCase();
      if (b2.is("easy"))
        difficulty = "medium".toUpperCase();
      if (b2.is("medium"))
        difficulty = "hard".toUpperCase();
      if (b2.is("hard"))
        difficulty = "superHard".toUpperCase();
      play("bell", {
        seek: 0.32
      });
      await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
        go("game", difficulty);
      });
    });
    difficultyLevelHolder.children.forEach((ch) => {
      ch.paused = true;
    });
    difficultyLevelHolder.paused = true;
    playButton.onClick(async () => {
      tween(
        difficultyLevelHolder.pos.x,
        difficultyLevelHolder.paused ? playButtonBorder.pos.x + 450 : width() + 255,
        1,
        (x) => difficultyLevelHolder.pos.x = x,
        difficultyLevelHolder.paused ? easings.easeOutElastic : easings.easeInSine
      );
      difficultyLevelHolder.paused = !difficultyLevelHolder.paused;
      difficultyLevelHolder.children.forEach((ch) => {
        ch.paused = !ch.paused;
      });
    });
    const tutorialMenu = add([
      rect(width() / 1.5, height() / 1.5),
      color(255, 255, 255),
      outline(20),
      anchor("center"),
      pos(center().x, height() + height() / 1.5),
      "unPausable",
      z(1e5 - 1),
      { index: 0 }
    ]);
    var closeTutorial = tutorialMenu.add([
      text("Close", {
        font: "lightFont"
      }),
      color(BLACK),
      anchor("center"),
      pos(400, -220),
      area()
    ]);
    var recipeHelp = tutorialMenu.add([
      text("Click                     to Select a Recipe", {
        font: "lightFont"
      }),
      color(BLACK),
      anchor("center"),
      "recipeHelp"
    ]);
    var makingHelp = tutorialMenu.add([
      text("Make Burgers From Ingredients \nthat Fall From the Celling\nORDER MATTERS!!!", {
        font: "lightFont",
        align: "center"
      }),
      color(BLACK),
      anchor("center"),
      "makingHelp"
    ]);
    var finishHelp = tutorialMenu.add([
      text("Press                      to Serve", {
        font: "lightFont"
      }),
      color(BLACK),
      anchor("center"),
      "finishHelp"
    ]);
    finishHelp.add([
      sprite("bell"),
      scale(0.2),
      anchor("center"),
      pos(-20, 0)
    ]);
    recipeHelp.hidden = true;
    var rPlaceholder = recipeHelp.add([
      rect(800, 1200),
      scale(0.2),
      pos(-100, 0),
      scale(0.2),
      anchor("center"),
      outline(30)
    ]);
    rPlaceholder.add([
      text("Top Bun\nPatty\nBottom Bun", {
        align: "center",
        font: "lightFont"
      }),
      anchor("center"),
      area(),
      color(BLACK),
      scale(3),
      pos(0, 100)
    ]);
    var leftArrow = tutorialMenu.add([
      sprite("arrow"),
      anchor("center"),
      color(BLACK),
      pos(-400, 0),
      scale(-0.02, 0.02),
      area()
    ]);
    var rightArrow = tutorialMenu.add([
      sprite("arrow"),
      anchor("center"),
      color(BLACK),
      pos(400, 0),
      scale(0.02, 0.02),
      area()
    ]);
    closeTutorial.onClick(() => {
      tween(tutorialMenu.pos.y, height() + height() / 1.5, 0.5, (y) => tutorialMenu.pos.y = y, easings.linear);
    });
    tutorial.onClick(() => {
      tween(tutorialMenu.pos.y, center().y, 1, (y) => tutorialMenu.pos.y = y, easings.easeOutElastic);
    });
    tutorialMenu.onUpdate(() => {
      tutorialMenu.children.forEach((element) => {
        if (element.is("recipeHelp")) {
          if (tutorialMenu.index == 0) {
            element.hidden = false;
          } else {
            element.hidden = true;
          }
        }
        if (element.is("makingHelp")) {
          if (tutorialMenu.index == 1) {
            element.hidden = false;
          } else {
            element.hidden = true;
          }
        }
        if (element.is("finishHelp")) {
          if (tutorialMenu.index == 2) {
            element.hidden = false;
          } else {
            element.hidden = true;
          }
        }
      });
      if ((isKeyPressed("left") || leftArrow.isClicked()) && tutorialMenu.index > 0) {
        tutorialMenu.index -= 1;
      }
      if ((isKeyPressed("right") || rightArrow.isClicked()) && tutorialMenu.index < 2) {
        tutorialMenu.index += 1;
      }
    });
    var title = add([
      sprite("title"),
      anchor("center"),
      scale(0.35),
      pos(center().x, 200),
      z(1e3),
      floating()
    ]);
    setGravity(700);
    let ingredientIndex = 0;
    loop(1, () => {
      if (ingredients.length > 0) {
        var ty = ingredients[ingredientIndex].replace(" ", "");
        var mat = add([
          sprite(ty.replace("\n", "")),
          pos(Math.floor(Math.random() * width()), -100),
          anchor("center"),
          body({
            maxVelocity: Math.random() * 200 + 600,
            stickToPlatform: false
          }),
          //area({scale: vec2(2,2)}),
          area(),
          offscreen({
            destroy: true
          }),
          scale(0.376249039 / 1.5),
          z(0)
        ]);
        if (ingredientIndex >= ingredients.length - 1) {
          ingredientIndex = 0;
        } else {
          ingredientIndex += 1;
        }
      }
    });
  });
  go("menu");
})();
