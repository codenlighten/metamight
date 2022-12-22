var bsv = (function (t) {
	var e = {};
	function r(n) {
		if (e[n]) return e[n].exports;
		var i = (e[n] = { i: n, l: !1, exports: {} });
		return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
	}
	return (
		(r.m = t),
		(r.c = e),
		(r.d = function (t, e, n) {
			r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
		}),
		(r.r = function (t) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(t, "__esModule", { value: !0 });
		}),
		(r.t = function (t, e) {
			if ((1 & e && (t = r(t)), 8 & e)) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var n = Object.create(null);
			if (
				(r.r(n),
				Object.defineProperty(n, "default", { enumerable: !0, value: t }),
				2 & e && "string" != typeof t)
			)
				for (var i in t)
					r.d(
						n,
						i,
						function (e) {
							return t[e];
						}.bind(null, i)
					);
			return n;
		}),
		(r.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return r.d(e, "a", e), e;
		}),
		(r.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(r.p = ""),
		r((r.s = 54))
	);
})([
	function (t, e, r) {
		"use strict";
		(function (t) {
			/*!
			 * The buffer module from node.js, for the browser.
			 *
			 * @author   Feross Aboukhadijeh <http://feross.org>
			 * @license  MIT
			 */
			var n = r(55),
				i = r(56),
				s = r(57);
			function o() {
				return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
			}
			function f(t, e) {
				if (o() < e) throw new RangeError("Invalid typed array length");
				return (
					a.TYPED_ARRAY_SUPPORT
						? ((t = new Uint8Array(e)).__proto__ = a.prototype)
						: (null === t && (t = new a(e)), (t.length = e)),
					t
				);
			}
			function a(t, e, r) {
				if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a))
					return new a(t, e, r);
				if ("number" == typeof t) {
					if ("string" == typeof e)
						throw new Error(
							"If encoding is specified then the first argument must be a string"
						);
					return h(this, t);
				}
				return u(this, t, e, r);
			}
			function u(t, e, r, n) {
				if ("number" == typeof e)
					throw new TypeError('"value" argument must not be a number');
				return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
					? (function (t, e, r, n) {
							if ((e.byteLength, r < 0 || e.byteLength < r))
								throw new RangeError("'offset' is out of bounds");
							if (e.byteLength < r + (n || 0))
								throw new RangeError("'length' is out of bounds");
							e =
								void 0 === r && void 0 === n
									? new Uint8Array(e)
									: void 0 === n
									? new Uint8Array(e, r)
									: new Uint8Array(e, r, n);
							a.TYPED_ARRAY_SUPPORT
								? ((t = e).__proto__ = a.prototype)
								: (t = d(t, e));
							return t;
					  })(t, e, r, n)
					: "string" == typeof e
					? (function (t, e, r) {
							("string" == typeof r && "" !== r) || (r = "utf8");
							if (!a.isEncoding(r))
								throw new TypeError(
									'"encoding" must be a valid string encoding'
								);
							var n = 0 | l(e, r),
								i = (t = f(t, n)).write(e, r);
							i !== n && (t = t.slice(0, i));
							return t;
					  })(t, e, r)
					: (function (t, e) {
							if (a.isBuffer(e)) {
								var r = 0 | p(e.length);
								return 0 === (t = f(t, r)).length ? t : (e.copy(t, 0, 0, r), t);
							}
							if (e) {
								if (
									("undefined" != typeof ArrayBuffer &&
										e.buffer instanceof ArrayBuffer) ||
									"length" in e
								)
									return "number" != typeof e.length || (n = e.length) != n
										? f(t, 0)
										: d(t, e);
								if ("Buffer" === e.type && s(e.data)) return d(t, e.data);
							}
							var n;
							throw new TypeError(
								"First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
							);
					  })(t, e);
			}
			function c(t) {
				if ("number" != typeof t)
					throw new TypeError('"size" argument must be a number');
				if (t < 0) throw new RangeError('"size" argument must not be negative');
			}
			function h(t, e) {
				if ((c(e), (t = f(t, e < 0 ? 0 : 0 | p(e))), !a.TYPED_ARRAY_SUPPORT))
					for (var r = 0; r < e; ++r) t[r] = 0;
				return t;
			}
			function d(t, e) {
				var r = e.length < 0 ? 0 : 0 | p(e.length);
				t = f(t, r);
				for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
				return t;
			}
			function p(t) {
				if (t >= o())
					throw new RangeError(
						"Attempt to allocate Buffer larger than maximum size: 0x" +
							o().toString(16) +
							" bytes"
					);
				return 0 | t;
			}
			function l(t, e) {
				if (a.isBuffer(t)) return t.length;
				if (
					"undefined" != typeof ArrayBuffer &&
					"function" == typeof ArrayBuffer.isView &&
					(ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
				)
					return t.byteLength;
				"string" != typeof t && (t = "" + t);
				var r = t.length;
				if (0 === r) return 0;
				for (var n = !1; ; )
					switch (e) {
						case "ascii":
						case "latin1":
						case "binary":
							return r;
						case "utf8":
						case "utf-8":
						case void 0:
							return K(t).length;
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return 2 * r;
						case "hex":
							return r >>> 1;
						case "base64":
							return z(t).length;
						default:
							if (n) return K(t).length;
							(e = ("" + e).toLowerCase()), (n = !0);
					}
			}
			function b(t, e, r) {
				var n = !1;
				if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
				if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
					return "";
				if ((r >>>= 0) <= (e >>>= 0)) return "";
				for (t || (t = "utf8"); ; )
					switch (t) {
						case "hex":
							return M(this, e, r);
						case "utf8":
						case "utf-8":
							return P(this, e, r);
						case "ascii":
							return k(this, e, r);
						case "latin1":
						case "binary":
							return R(this, e, r);
						case "base64":
							return E(this, e, r);
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return x(this, e, r);
						default:
							if (n) throw new TypeError("Unknown encoding: " + t);
							(t = (t + "").toLowerCase()), (n = !0);
					}
			}
			function m(t, e, r) {
				var n = t[e];
				(t[e] = t[r]), (t[r] = n);
			}
			function g(t, e, r, n, i) {
				if (0 === t.length) return -1;
				if (
					("string" == typeof r
						? ((n = r), (r = 0))
						: r > 2147483647
						? (r = 2147483647)
						: r < -2147483648 && (r = -2147483648),
					(r = +r),
					isNaN(r) && (r = i ? 0 : t.length - 1),
					r < 0 && (r = t.length + r),
					r >= t.length)
				) {
					if (i) return -1;
					r = t.length - 1;
				} else if (r < 0) {
					if (!i) return -1;
					r = 0;
				}
				if (("string" == typeof e && (e = a.from(e, n)), a.isBuffer(e)))
					return 0 === e.length ? -1 : y(t, e, r, n, i);
				if ("number" == typeof e)
					return (
						(e &= 255),
						a.TYPED_ARRAY_SUPPORT &&
						"function" == typeof Uint8Array.prototype.indexOf
							? i
								? Uint8Array.prototype.indexOf.call(t, e, r)
								: Uint8Array.prototype.lastIndexOf.call(t, e, r)
							: y(t, [e], r, n, i)
					);
				throw new TypeError("val must be string, number or Buffer");
			}
			function y(t, e, r, n, i) {
				var s,
					o = 1,
					f = t.length,
					a = e.length;
				if (
					void 0 !== n &&
					("ucs2" === (n = String(n).toLowerCase()) ||
						"ucs-2" === n ||
						"utf16le" === n ||
						"utf-16le" === n)
				) {
					if (t.length < 2 || e.length < 2) return -1;
					(o = 2), (f /= 2), (a /= 2), (r /= 2);
				}
				function u(t, e) {
					return 1 === o ? t[e] : t.readUInt16BE(e * o);
				}
				if (i) {
					var c = -1;
					for (s = r; s < f; s++)
						if (u(t, s) === u(e, -1 === c ? 0 : s - c)) {
							if ((-1 === c && (c = s), s - c + 1 === a)) return c * o;
						} else -1 !== c && (s -= s - c), (c = -1);
				} else
					for (r + a > f && (r = f - a), s = r; s >= 0; s--) {
						for (var h = !0, d = 0; d < a; d++)
							if (u(t, s + d) !== u(e, d)) {
								h = !1;
								break;
							}
						if (h) return s;
					}
				return -1;
			}
			function v(t, e, r, n) {
				r = Number(r) || 0;
				var i = t.length - r;
				n ? (n = Number(n)) > i && (n = i) : (n = i);
				var s = e.length;
				if (s % 2 != 0) throw new TypeError("Invalid hex string");
				n > s / 2 && (n = s / 2);
				for (var o = 0; o < n; ++o) {
					var f = parseInt(e.substr(2 * o, 2), 16);
					if (isNaN(f)) return o;
					t[r + o] = f;
				}
				return o;
			}
			function _(t, e, r, n) {
				return j(K(e, t.length - r), t, r, n);
			}
			function S(t, e, r, n) {
				return j(
					(function (t) {
						for (var e = [], r = 0; r < t.length; ++r)
							e.push(255 & t.charCodeAt(r));
						return e;
					})(e),
					t,
					r,
					n
				);
			}
			function w(t, e, r, n) {
				return S(t, e, r, n);
			}
			function I(t, e, r, n) {
				return j(z(e), t, r, n);
			}
			function A(t, e, r, n) {
				return j(
					(function (t, e) {
						for (
							var r, n, i, s = [], o = 0;
							o < t.length && !((e -= 2) < 0);
							++o
						)
							(r = t.charCodeAt(o)),
								(n = r >> 8),
								(i = r % 256),
								s.push(i),
								s.push(n);
						return s;
					})(e, t.length - r),
					t,
					r,
					n
				);
			}
			function E(t, e, r) {
				return 0 === e && r === t.length
					? n.fromByteArray(t)
					: n.fromByteArray(t.slice(e, r));
			}
			function P(t, e, r) {
				r = Math.min(t.length, r);
				for (var n = [], i = e; i < r; ) {
					var s,
						o,
						f,
						a,
						u = t[i],
						c = null,
						h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
					if (i + h <= r)
						switch (h) {
							case 1:
								u < 128 && (c = u);
								break;
							case 2:
								128 == (192 & (s = t[i + 1])) &&
									(a = ((31 & u) << 6) | (63 & s)) > 127 &&
									(c = a);
								break;
							case 3:
								(s = t[i + 1]),
									(o = t[i + 2]),
									128 == (192 & s) &&
										128 == (192 & o) &&
										(a = ((15 & u) << 12) | ((63 & s) << 6) | (63 & o)) >
											2047 &&
										(a < 55296 || a > 57343) &&
										(c = a);
								break;
							case 4:
								(s = t[i + 1]),
									(o = t[i + 2]),
									(f = t[i + 3]),
									128 == (192 & s) &&
										128 == (192 & o) &&
										128 == (192 & f) &&
										(a =
											((15 & u) << 18) |
											((63 & s) << 12) |
											((63 & o) << 6) |
											(63 & f)) > 65535 &&
										a < 1114112 &&
										(c = a);
						}
					null === c
						? ((c = 65533), (h = 1))
						: c > 65535 &&
						  ((c -= 65536),
						  n.push(((c >>> 10) & 1023) | 55296),
						  (c = 56320 | (1023 & c))),
						n.push(c),
						(i += h);
				}
				return (function (t) {
					var e = t.length;
					if (e <= O) return String.fromCharCode.apply(String, t);
					var r = "",
						n = 0;
					for (; n < e; )
						r += String.fromCharCode.apply(String, t.slice(n, (n += O)));
					return r;
				})(n);
			}
			(e.Buffer = a),
				(e.SlowBuffer = function (t) {
					+t != t && (t = 0);
					return a.alloc(+t);
				}),
				(e.INSPECT_MAX_BYTES = 50),
				(a.TYPED_ARRAY_SUPPORT =
					void 0 !== t.TYPED_ARRAY_SUPPORT
						? t.TYPED_ARRAY_SUPPORT
						: (function () {
								try {
									var t = new Uint8Array(1);
									return (
										(t.__proto__ = {
											__proto__: Uint8Array.prototype,
											foo: function () {
												return 42;
											},
										}),
										42 === t.foo() &&
											"function" == typeof t.subarray &&
											0 === t.subarray(1, 1).byteLength
									);
								} catch (t) {
									return !1;
								}
						  })()),
				(e.kMaxLength = o()),
				(a.poolSize = 8192),
				(a._augment = function (t) {
					return (t.__proto__ = a.prototype), t;
				}),
				(a.from = function (t, e, r) {
					return u(null, t, e, r);
				}),
				a.TYPED_ARRAY_SUPPORT &&
					((a.prototype.__proto__ = Uint8Array.prototype),
					(a.__proto__ = Uint8Array),
					"undefined" != typeof Symbol &&
						Symbol.species &&
						a[Symbol.species] === a &&
						Object.defineProperty(a, Symbol.species, {
							value: null,
							configurable: !0,
						})),
				(a.alloc = function (t, e, r) {
					return (function (t, e, r, n) {
						return (
							c(e),
							e <= 0
								? f(t, e)
								: void 0 !== r
								? "string" == typeof n
									? f(t, e).fill(r, n)
									: f(t, e).fill(r)
								: f(t, e)
						);
					})(null, t, e, r);
				}),
				(a.allocUnsafe = function (t) {
					return h(null, t);
				}),
				(a.allocUnsafeSlow = function (t) {
					return h(null, t);
				}),
				(a.isBuffer = function (t) {
					return !(null == t || !t._isBuffer);
				}),
				(a.compare = function (t, e) {
					if (!a.isBuffer(t) || !a.isBuffer(e))
						throw new TypeError("Arguments must be Buffers");
					if (t === e) return 0;
					for (
						var r = t.length, n = e.length, i = 0, s = Math.min(r, n);
						i < s;
						++i
					)
						if (t[i] !== e[i]) {
							(r = t[i]), (n = e[i]);
							break;
						}
					return r < n ? -1 : n < r ? 1 : 0;
				}),
				(a.isEncoding = function (t) {
					switch (String(t).toLowerCase()) {
						case "hex":
						case "utf8":
						case "utf-8":
						case "ascii":
						case "latin1":
						case "binary":
						case "base64":
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return !0;
						default:
							return !1;
					}
				}),
				(a.concat = function (t, e) {
					if (!s(t))
						throw new TypeError('"list" argument must be an Array of Buffers');
					if (0 === t.length) return a.alloc(0);
					var r;
					if (void 0 === e)
						for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
					var n = a.allocUnsafe(e),
						i = 0;
					for (r = 0; r < t.length; ++r) {
						var o = t[r];
						if (!a.isBuffer(o))
							throw new TypeError(
								'"list" argument must be an Array of Buffers'
							);
						o.copy(n, i), (i += o.length);
					}
					return n;
				}),
				(a.byteLength = l),
				(a.prototype._isBuffer = !0),
				(a.prototype.swap16 = function () {
					var t = this.length;
					if (t % 2 != 0)
						throw new RangeError("Buffer size must be a multiple of 16-bits");
					for (var e = 0; e < t; e += 2) m(this, e, e + 1);
					return this;
				}),
				(a.prototype.swap32 = function () {
					var t = this.length;
					if (t % 4 != 0)
						throw new RangeError("Buffer size must be a multiple of 32-bits");
					for (var e = 0; e < t; e += 4)
						m(this, e, e + 3), m(this, e + 1, e + 2);
					return this;
				}),
				(a.prototype.swap64 = function () {
					var t = this.length;
					if (t % 8 != 0)
						throw new RangeError("Buffer size must be a multiple of 64-bits");
					for (var e = 0; e < t; e += 8)
						m(this, e, e + 7),
							m(this, e + 1, e + 6),
							m(this, e + 2, e + 5),
							m(this, e + 3, e + 4);
					return this;
				}),
				(a.prototype.toString = function () {
					var t = 0 | this.length;
					return 0 === t
						? ""
						: 0 === arguments.length
						? P(this, 0, t)
						: b.apply(this, arguments);
				}),
				(a.prototype.equals = function (t) {
					if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
					return this === t || 0 === a.compare(this, t);
				}),
				(a.prototype.inspect = function () {
					var t = "",
						r = e.INSPECT_MAX_BYTES;
					return (
						this.length > 0 &&
							((t = this.toString("hex", 0, r).match(/.{2}/g).join(" ")),
							this.length > r && (t += " ... ")),
						"<Buffer " + t + ">"
					);
				}),
				(a.prototype.compare = function (t, e, r, n, i) {
					if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
					if (
						(void 0 === e && (e = 0),
						void 0 === r && (r = t ? t.length : 0),
						void 0 === n && (n = 0),
						void 0 === i && (i = this.length),
						e < 0 || r > t.length || n < 0 || i > this.length)
					)
						throw new RangeError("out of range index");
					if (n >= i && e >= r) return 0;
					if (n >= i) return -1;
					if (e >= r) return 1;
					if (this === t) return 0;
					for (
						var s = (i >>>= 0) - (n >>>= 0),
							o = (r >>>= 0) - (e >>>= 0),
							f = Math.min(s, o),
							u = this.slice(n, i),
							c = t.slice(e, r),
							h = 0;
						h < f;
						++h
					)
						if (u[h] !== c[h]) {
							(s = u[h]), (o = c[h]);
							break;
						}
					return s < o ? -1 : o < s ? 1 : 0;
				}),
				(a.prototype.includes = function (t, e, r) {
					return -1 !== this.indexOf(t, e, r);
				}),
				(a.prototype.indexOf = function (t, e, r) {
					return g(this, t, e, r, !0);
				}),
				(a.prototype.lastIndexOf = function (t, e, r) {
					return g(this, t, e, r, !1);
				}),
				(a.prototype.write = function (t, e, r, n) {
					if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
					else if (void 0 === r && "string" == typeof e)
						(n = e), (r = this.length), (e = 0);
					else {
						if (!isFinite(e))
							throw new Error(
								"Buffer.write(string, encoding, offset[, length]) is no longer supported"
							);
						(e |= 0),
							isFinite(r)
								? ((r |= 0), void 0 === n && (n = "utf8"))
								: ((n = r), (r = void 0));
					}
					var i = this.length - e;
					if (
						((void 0 === r || r > i) && (r = i),
						(t.length > 0 && (r < 0 || e < 0)) || e > this.length)
					)
						throw new RangeError("Attempt to write outside buffer bounds");
					n || (n = "utf8");
					for (var s = !1; ; )
						switch (n) {
							case "hex":
								return v(this, t, e, r);
							case "utf8":
							case "utf-8":
								return _(this, t, e, r);
							case "ascii":
								return S(this, t, e, r);
							case "latin1":
							case "binary":
								return w(this, t, e, r);
							case "base64":
								return I(this, t, e, r);
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return A(this, t, e, r);
							default:
								if (s) throw new TypeError("Unknown encoding: " + n);
								(n = ("" + n).toLowerCase()), (s = !0);
						}
				}),
				(a.prototype.toJSON = function () {
					return {
						type: "Buffer",
						data: Array.prototype.slice.call(this._arr || this, 0),
					};
				});
			var O = 4096;
			function k(t, e, r) {
				var n = "";
				r = Math.min(t.length, r);
				for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
				return n;
			}
			function R(t, e, r) {
				var n = "";
				r = Math.min(t.length, r);
				for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
				return n;
			}
			function M(t, e, r) {
				var n = t.length;
				(!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
				for (var i = "", s = e; s < r; ++s) i += F(t[s]);
				return i;
			}
			function x(t, e, r) {
				for (var n = t.slice(e, r), i = "", s = 0; s < n.length; s += 2)
					i += String.fromCharCode(n[s] + 256 * n[s + 1]);
				return i;
			}
			function T(t, e, r) {
				if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
				if (t + e > r)
					throw new RangeError("Trying to access beyond buffer length");
			}
			function B(t, e, r, n, i, s) {
				if (!a.isBuffer(t))
					throw new TypeError('"buffer" argument must be a Buffer instance');
				if (e > i || e < s)
					throw new RangeError('"value" argument is out of bounds');
				if (r + n > t.length) throw new RangeError("Index out of range");
			}
			function N(t, e, r, n) {
				e < 0 && (e = 65535 + e + 1);
				for (var i = 0, s = Math.min(t.length - r, 2); i < s; ++i)
					t[r + i] =
						(e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
			}
			function C(t, e, r, n) {
				e < 0 && (e = 4294967295 + e + 1);
				for (var i = 0, s = Math.min(t.length - r, 4); i < s; ++i)
					t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255;
			}
			function U(t, e, r, n, i, s) {
				if (r + n > t.length) throw new RangeError("Index out of range");
				if (r < 0) throw new RangeError("Index out of range");
			}
			function L(t, e, r, n, s) {
				return s || U(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
			}
			function H(t, e, r, n, s) {
				return s || U(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
			}
			(a.prototype.slice = function (t, e) {
				var r,
					n = this.length;
				if (
					((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
					(e = void 0 === e ? n : ~~e) < 0
						? (e += n) < 0 && (e = 0)
						: e > n && (e = n),
					e < t && (e = t),
					a.TYPED_ARRAY_SUPPORT)
				)
					(r = this.subarray(t, e)).__proto__ = a.prototype;
				else {
					var i = e - t;
					r = new a(i, void 0);
					for (var s = 0; s < i; ++s) r[s] = this[s + t];
				}
				return r;
			}),
				(a.prototype.readUIntLE = function (t, e, r) {
					(t |= 0), (e |= 0), r || T(t, e, this.length);
					for (var n = this[t], i = 1, s = 0; ++s < e && (i *= 256); )
						n += this[t + s] * i;
					return n;
				}),
				(a.prototype.readUIntBE = function (t, e, r) {
					(t |= 0), (e |= 0), r || T(t, e, this.length);
					for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); )
						n += this[t + --e] * i;
					return n;
				}),
				(a.prototype.readUInt8 = function (t, e) {
					return e || T(t, 1, this.length), this[t];
				}),
				(a.prototype.readUInt16LE = function (t, e) {
					return e || T(t, 2, this.length), this[t] | (this[t + 1] << 8);
				}),
				(a.prototype.readUInt16BE = function (t, e) {
					return e || T(t, 2, this.length), (this[t] << 8) | this[t + 1];
				}),
				(a.prototype.readUInt32LE = function (t, e) {
					return (
						e || T(t, 4, this.length),
						(this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
							16777216 * this[t + 3]
					);
				}),
				(a.prototype.readUInt32BE = function (t, e) {
					return (
						e || T(t, 4, this.length),
						16777216 * this[t] +
							((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
					);
				}),
				(a.prototype.readIntLE = function (t, e, r) {
					(t |= 0), (e |= 0), r || T(t, e, this.length);
					for (var n = this[t], i = 1, s = 0; ++s < e && (i *= 256); )
						n += this[t + s] * i;
					return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
				}),
				(a.prototype.readIntBE = function (t, e, r) {
					(t |= 0), (e |= 0), r || T(t, e, this.length);
					for (var n = e, i = 1, s = this[t + --n]; n > 0 && (i *= 256); )
						s += this[t + --n] * i;
					return s >= (i *= 128) && (s -= Math.pow(2, 8 * e)), s;
				}),
				(a.prototype.readInt8 = function (t, e) {
					return (
						e || T(t, 1, this.length),
						128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
					);
				}),
				(a.prototype.readInt16LE = function (t, e) {
					e || T(t, 2, this.length);
					var r = this[t] | (this[t + 1] << 8);
					return 32768 & r ? 4294901760 | r : r;
				}),
				(a.prototype.readInt16BE = function (t, e) {
					e || T(t, 2, this.length);
					var r = this[t + 1] | (this[t] << 8);
					return 32768 & r ? 4294901760 | r : r;
				}),
				(a.prototype.readInt32LE = function (t, e) {
					return (
						e || T(t, 4, this.length),
						this[t] |
							(this[t + 1] << 8) |
							(this[t + 2] << 16) |
							(this[t + 3] << 24)
					);
				}),
				(a.prototype.readInt32BE = function (t, e) {
					return (
						e || T(t, 4, this.length),
						(this[t] << 24) |
							(this[t + 1] << 16) |
							(this[t + 2] << 8) |
							this[t + 3]
					);
				}),
				(a.prototype.readFloatLE = function (t, e) {
					return e || T(t, 4, this.length), i.read(this, t, !0, 23, 4);
				}),
				(a.prototype.readFloatBE = function (t, e) {
					return e || T(t, 4, this.length), i.read(this, t, !1, 23, 4);
				}),
				(a.prototype.readDoubleLE = function (t, e) {
					return e || T(t, 8, this.length), i.read(this, t, !0, 52, 8);
				}),
				(a.prototype.readDoubleBE = function (t, e) {
					return e || T(t, 8, this.length), i.read(this, t, !1, 52, 8);
				}),
				(a.prototype.writeUIntLE = function (t, e, r, n) {
					((t = +t), (e |= 0), (r |= 0), n) ||
						B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
					var i = 1,
						s = 0;
					for (this[e] = 255 & t; ++s < r && (i *= 256); )
						this[e + s] = (t / i) & 255;
					return e + r;
				}),
				(a.prototype.writeUIntBE = function (t, e, r, n) {
					((t = +t), (e |= 0), (r |= 0), n) ||
						B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
					var i = r - 1,
						s = 1;
					for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); )
						this[e + i] = (t / s) & 255;
					return e + r;
				}),
				(a.prototype.writeUInt8 = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 1, 255, 0),
						a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
						(this[e] = 255 & t),
						e + 1
					);
				}),
				(a.prototype.writeUInt16LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 2, 65535, 0),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
							: N(this, t, e, !0),
						e + 2
					);
				}),
				(a.prototype.writeUInt16BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 2, 65535, 0),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
							: N(this, t, e, !1),
						e + 2
					);
				}),
				(a.prototype.writeUInt32LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 4, 4294967295, 0),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e + 3] = t >>> 24),
							  (this[e + 2] = t >>> 16),
							  (this[e + 1] = t >>> 8),
							  (this[e] = 255 & t))
							: C(this, t, e, !0),
						e + 4
					);
				}),
				(a.prototype.writeUInt32BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 4, 4294967295, 0),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = t >>> 24),
							  (this[e + 1] = t >>> 16),
							  (this[e + 2] = t >>> 8),
							  (this[e + 3] = 255 & t))
							: C(this, t, e, !1),
						e + 4
					);
				}),
				(a.prototype.writeIntLE = function (t, e, r, n) {
					if (((t = +t), (e |= 0), !n)) {
						var i = Math.pow(2, 8 * r - 1);
						B(this, t, e, r, i - 1, -i);
					}
					var s = 0,
						o = 1,
						f = 0;
					for (this[e] = 255 & t; ++s < r && (o *= 256); )
						t < 0 && 0 === f && 0 !== this[e + s - 1] && (f = 1),
							(this[e + s] = (((t / o) >> 0) - f) & 255);
					return e + r;
				}),
				(a.prototype.writeIntBE = function (t, e, r, n) {
					if (((t = +t), (e |= 0), !n)) {
						var i = Math.pow(2, 8 * r - 1);
						B(this, t, e, r, i - 1, -i);
					}
					var s = r - 1,
						o = 1,
						f = 0;
					for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
						t < 0 && 0 === f && 0 !== this[e + s + 1] && (f = 1),
							(this[e + s] = (((t / o) >> 0) - f) & 255);
					return e + r;
				}),
				(a.prototype.writeInt8 = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 1, 127, -128),
						a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
						t < 0 && (t = 255 + t + 1),
						(this[e] = 255 & t),
						e + 1
					);
				}),
				(a.prototype.writeInt16LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 2, 32767, -32768),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
							: N(this, t, e, !0),
						e + 2
					);
				}),
				(a.prototype.writeInt16BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 2, 32767, -32768),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
							: N(this, t, e, !1),
						e + 2
					);
				}),
				(a.prototype.writeInt32LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 4, 2147483647, -2147483648),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = 255 & t),
							  (this[e + 1] = t >>> 8),
							  (this[e + 2] = t >>> 16),
							  (this[e + 3] = t >>> 24))
							: C(this, t, e, !0),
						e + 4
					);
				}),
				(a.prototype.writeInt32BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || B(this, t, e, 4, 2147483647, -2147483648),
						t < 0 && (t = 4294967295 + t + 1),
						a.TYPED_ARRAY_SUPPORT
							? ((this[e] = t >>> 24),
							  (this[e + 1] = t >>> 16),
							  (this[e + 2] = t >>> 8),
							  (this[e + 3] = 255 & t))
							: C(this, t, e, !1),
						e + 4
					);
				}),
				(a.prototype.writeFloatLE = function (t, e, r) {
					return L(this, t, e, !0, r);
				}),
				(a.prototype.writeFloatBE = function (t, e, r) {
					return L(this, t, e, !1, r);
				}),
				(a.prototype.writeDoubleLE = function (t, e, r) {
					return H(this, t, e, !0, r);
				}),
				(a.prototype.writeDoubleBE = function (t, e, r) {
					return H(this, t, e, !1, r);
				}),
				(a.prototype.copy = function (t, e, r, n) {
					if (
						(r || (r = 0),
						n || 0 === n || (n = this.length),
						e >= t.length && (e = t.length),
						e || (e = 0),
						n > 0 && n < r && (n = r),
						n === r)
					)
						return 0;
					if (0 === t.length || 0 === this.length) return 0;
					if (e < 0) throw new RangeError("targetStart out of bounds");
					if (r < 0 || r >= this.length)
						throw new RangeError("sourceStart out of bounds");
					if (n < 0) throw new RangeError("sourceEnd out of bounds");
					n > this.length && (n = this.length),
						t.length - e < n - r && (n = t.length - e + r);
					var i,
						s = n - r;
					if (this === t && r < e && e < n)
						for (i = s - 1; i >= 0; --i) t[i + e] = this[i + r];
					else if (s < 1e3 || !a.TYPED_ARRAY_SUPPORT)
						for (i = 0; i < s; ++i) t[i + e] = this[i + r];
					else Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e);
					return s;
				}),
				(a.prototype.fill = function (t, e, r, n) {
					if ("string" == typeof t) {
						if (
							("string" == typeof e
								? ((n = e), (e = 0), (r = this.length))
								: "string" == typeof r && ((n = r), (r = this.length)),
							1 === t.length)
						) {
							var i = t.charCodeAt(0);
							i < 256 && (t = i);
						}
						if (void 0 !== n && "string" != typeof n)
							throw new TypeError("encoding must be a string");
						if ("string" == typeof n && !a.isEncoding(n))
							throw new TypeError("Unknown encoding: " + n);
					} else "number" == typeof t && (t &= 255);
					if (e < 0 || this.length < e || this.length < r)
						throw new RangeError("Out of range index");
					if (r <= e) return this;
					var s;
					if (
						((e >>>= 0),
						(r = void 0 === r ? this.length : r >>> 0),
						t || (t = 0),
						"number" == typeof t)
					)
						for (s = e; s < r; ++s) this[s] = t;
					else {
						var o = a.isBuffer(t) ? t : K(new a(t, n).toString()),
							f = o.length;
						for (s = 0; s < r - e; ++s) this[s + e] = o[s % f];
					}
					return this;
				});
			var D = /[^+\/0-9A-Za-z-_]/g;
			function F(t) {
				return t < 16 ? "0" + t.toString(16) : t.toString(16);
			}
			function K(t, e) {
				var r;
				e = e || 1 / 0;
				for (var n = t.length, i = null, s = [], o = 0; o < n; ++o) {
					if ((r = t.charCodeAt(o)) > 55295 && r < 57344) {
						if (!i) {
							if (r > 56319) {
								(e -= 3) > -1 && s.push(239, 191, 189);
								continue;
							}
							if (o + 1 === n) {
								(e -= 3) > -1 && s.push(239, 191, 189);
								continue;
							}
							i = r;
							continue;
						}
						if (r < 56320) {
							(e -= 3) > -1 && s.push(239, 191, 189), (i = r);
							continue;
						}
						r = 65536 + (((i - 55296) << 10) | (r - 56320));
					} else i && (e -= 3) > -1 && s.push(239, 191, 189);
					if (((i = null), r < 128)) {
						if ((e -= 1) < 0) break;
						s.push(r);
					} else if (r < 2048) {
						if ((e -= 2) < 0) break;
						s.push((r >> 6) | 192, (63 & r) | 128);
					} else if (r < 65536) {
						if ((e -= 3) < 0) break;
						s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
					} else {
						if (!(r < 1114112)) throw new Error("Invalid code point");
						if ((e -= 4) < 0) break;
						s.push(
							(r >> 18) | 240,
							((r >> 12) & 63) | 128,
							((r >> 6) & 63) | 128,
							(63 & r) | 128
						);
					}
				}
				return s;
			}
			function z(t) {
				return n.toByteArray(
					(function (t) {
						if (
							(t = (function (t) {
								return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
							})(t).replace(D, "")).length < 2
						)
							return "";
						for (; t.length % 4 != 0; ) t += "=";
						return t;
					})(t)
				);
			}
			function j(t, e, r, n) {
				for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
					e[i + r] = t[i];
				return i;
			}
		}.call(this, r(34)));
	},
	function (t, e, r) {
		"use strict";
		var n = {
			isArray: (t) => Array.isArray(t),
			isNumber: (t) => "number" == typeof t,
			isObject: (t) => t && "object" == typeof t,
			isString: (t) => "string" == typeof t,
			isUndefined: (t) => void 0 === t,
			isFunction: (t) => "function" == typeof t,
			isNull: (t) => null === t,
			isDate: (t) => t instanceof Date,
			extend: (t, e) => Object.assign(t, e),
			noop: () => {},
			every: (t, e) => t.every(e || ((t) => t)),
			map: (t, e) => Array.from(t).map(e || ((t) => t)),
			includes: (t, e) => t.includes(e),
			each: (t, e) => t.forEach(e),
			clone: (t) => Object.assign({}, t),
			pick: (t, e) => {
				const r = {};
				return (
					e.forEach((e) => {
						void 0 !== t[e] && (r[e] = t[e]);
					}),
					r
				);
			},
			values: (t) => Object.values(t),
			filter: (t, e) => t.filter(e),
			reduce: (t, e, r) => t.reduce(e, r),
			without: (t, e) => t.filter((t) => t !== e),
			shuffle: (t) => {
				const e = t.slice(0);
				for (let t = e.length - 1; t > 0; t--) {
					const r = Math.floor(Math.random() * (t + 1));
					[e[t], e[r]] = [e[r], e[t]];
				}
				return e;
			},
			difference: (t, e) => t.filter((t) => !e.includes(t)),
			findIndex: (t, e) => t.findIndex(e),
			some: (t, e) => t.some(e),
			range: (t) => [...Array(t).keys()],
		};
		t.exports = n;
	},
	function (t, e, r) {
		"use strict";
		var n = r(8),
			i = r(1);
		t.exports = {
			checkState: function (t, e) {
				if (!t) throw new n.InvalidState(e);
			},
			checkArgument: function (t, e, r, i) {
				if (!t) throw new n.InvalidArgument(e, r, i);
			},
			checkArgumentType: function (t, e, s) {
				if (((s = s || "(unknown name)"), i.isString(e))) {
					if ("Buffer" === e) {
						if (!r(0).Buffer.isBuffer(t))
							throw new n.InvalidArgumentType(t, e, s);
					} else if (typeof t !== e) throw new n.InvalidArgumentType(t, e, s);
				} else if (!(t instanceof e))
					throw new n.InvalidArgumentType(t, e.name, s);
			},
		};
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(7),
				i = r(2),
				s = r(1),
				o = function (t) {
					for (var r = e.alloc(t.length), n = 0; n < t.length; n++)
						r[n] = t[t.length - 1 - n];
					return r;
				};
			(n.Zero = new n(0)),
				(n.One = new n(1)),
				(n.Minus1 = new n(-1)),
				(n.fromNumber = function (t) {
					return i.checkArgument(s.isNumber(t)), new n(t);
				}),
				(n.fromString = function (t, e) {
					return i.checkArgument(s.isString(t)), new n(t, e);
				}),
				(n.fromBuffer = function (t, e) {
					void 0 !== e && "little" === e.endian && (t = o(t));
					var r = t.toString("hex");
					return new n(r, 16);
				}),
				(n.fromSM = function (t, r) {
					var i;
					if (0 === t.length) return n.fromBuffer(e.from([0]));
					var s = "big";
					return (
						r && (s = r.endian),
						"little" === s && (t = o(t)),
						128 & t[0]
							? ((t[0] = 127 & t[0]), (i = n.fromBuffer(t)).neg().copy(i))
							: (i = n.fromBuffer(t)),
						i
					);
				}),
				(n.prototype.toNumber = function () {
					return parseInt(this.toString(10), 10);
				}),
				(n.prototype.toBuffer = function (t) {
					var r, i;
					if (t && t.size) {
						var s = (i = this.toString(16, 2)).length / 2;
						(r = e.from(i, "hex")),
							s === t.size ||
								(s > t.size
									? (r = n.trim(r, s))
									: s < t.size && (r = n.pad(r, s, t.size)));
					} else (i = this.toString(16, 2)), (r = e.from(i, "hex"));
					return void 0 !== t && "little" === t.endian && (r = o(r)), r;
				}),
				(n.prototype.toSMBigEndian = function () {
					var t;
					return (
						-1 === this.cmp(n.Zero)
							? 128 & (t = this.neg().toBuffer())[0]
								? (t = e.concat([e.from([128]), t]))
								: (t[0] = 128 | t[0])
							: 128 & (t = this.toBuffer())[0] &&
							  (t = e.concat([e.from([0]), t])),
						(1 === t.length) & (0 === t[0]) && (t = e.from([])),
						t
					);
				}),
				(n.prototype.toSM = function (t) {
					var e = t ? t.endian : "big",
						r = this.toSMBigEndian();
					return "little" === e && (r = o(r)), r;
				}),
				(n.fromScriptNumBuffer = function (t, e, r) {
					var s = r || 4;
					if (
						(i.checkArgument(
							t.length <= s,
							new Error("script number overflow")
						),
						e &&
							t.length > 0 &&
							0 == (127 & t[t.length - 1]) &&
							(t.length <= 1 || 0 == (128 & t[t.length - 2])))
					)
						throw new Error("non-minimally encoded script number");
					return n.fromSM(t, { endian: "little" });
				}),
				(n.prototype.toScriptNumBuffer = function () {
					return this.toSM({ endian: "little" });
				}),
				(n.trim = function (t, e) {
					return t.slice(e - t.length, t.length);
				}),
				(n.pad = function (t, r, n) {
					for (var i = e.alloc(n), s = 0; s < t.length; s++)
						i[i.length - 1 - s] = t[t.length - 1 - s];
					for (s = 0; s < n - r; s++) i[s] = 0;
					return i;
				}),
				(n.prototype.toHex = function (...t) {
					return this.toBuffer(...t).toString("hex");
				}),
				(n.fromHex = function (t, ...r) {
					return n.fromBuffer(e.from(t, "hex"), ...r);
				}),
				(t.exports = n);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = function (t) {
					return !!n.isString(t) && /^[0-9a-fA-F]+$/.test(t);
				};
			t.exports = {
				isValidJSON: function (t) {
					var e;
					if (!n.isString(t)) return !1;
					try {
						e = JSON.parse(t);
					} catch (t) {
						return !1;
					}
					return "object" == typeof e;
				},
				isHexa: s,
				isHexaString: s,
				defineImmutable: function (t, e) {
					return (
						Object.keys(e).forEach(function (r) {
							Object.defineProperty(t, r, {
								configurable: !1,
								enumerable: !0,
								value: e[r],
							});
						}),
						t
					);
				},
				isNaturalNumber: function (t) {
					return (
						"number" == typeof t && isFinite(t) && Math.floor(t) === t && t >= 0
					);
				},
				integerAsBuffer: function (t) {
					i.checkArgumentType(t, "number", "integer");
					const r = e.allocUnsafe(4);
					return r.writeUInt32BE(t, 0), r;
				},
			};
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		(function (e) {
			e.browser ? (t.exports = r(84)) : (t.exports = r(85));
		}.call(this, r(36)));
	},
	function (t, e, r) {
		"use strict";
		var n = e;
		(n.version = r(62).version),
			(n.utils = r(63)),
			(n.rand = r(64)),
			(n.curve = r(27)),
			(n.curves = r(69)),
			(n.ec = r(77)),
			(n.eddsa = r(81));
	},
	function (t, e, r) {
		(function (t) {
			!(function (t, e) {
				"use strict";
				function n(t, e) {
					if (!t) throw new Error(e || "Assertion failed");
				}
				function i(t, e) {
					t.super_ = e;
					var r = function () {};
					(r.prototype = e.prototype),
						(t.prototype = new r()),
						(t.prototype.constructor = t);
				}
				function s(t, e, r) {
					if (s.isBN(t)) return t;
					(this.negative = 0),
						(this.words = null),
						(this.length = 0),
						(this.red = null),
						null !== t &&
							(("le" !== e && "be" !== e) || ((r = e), (e = 10)),
							this._init(t || 0, e || 10, r || "be"));
				}
				var o;
				"object" == typeof t ? (t.exports = s) : (e.BN = s),
					(s.BN = s),
					(s.wordSize = 26);
				try {
					o = r(60).Buffer;
				} catch (t) {}
				function f(t, e, r) {
					for (var n = 0, i = Math.min(t.length, r), s = e; s < i; s++) {
						var o = t.charCodeAt(s) - 48;
						(n <<= 4),
							(n |=
								o >= 49 && o <= 54
									? o - 49 + 10
									: o >= 17 && o <= 22
									? o - 17 + 10
									: 15 & o);
					}
					return n;
				}
				function a(t, e, r, n) {
					for (var i = 0, s = Math.min(t.length, r), o = e; o < s; o++) {
						var f = t.charCodeAt(o) - 48;
						(i *= n), (i += f >= 49 ? f - 49 + 10 : f >= 17 ? f - 17 + 10 : f);
					}
					return i;
				}
				(s.isBN = function (t) {
					return (
						t instanceof s ||
						(null !== t &&
							"object" == typeof t &&
							t.constructor.wordSize === s.wordSize &&
							Array.isArray(t.words))
					);
				}),
					(s.max = function (t, e) {
						return t.cmp(e) > 0 ? t : e;
					}),
					(s.min = function (t, e) {
						return t.cmp(e) < 0 ? t : e;
					}),
					(s.prototype._init = function (t, e, r) {
						if ("number" == typeof t) return this._initNumber(t, e, r);
						if ("object" == typeof t) return this._initArray(t, e, r);
						"hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
						var i = 0;
						"-" === (t = t.toString().replace(/\s+/g, ""))[0] && i++,
							16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i),
							"-" === t[0] && (this.negative = 1),
							this.strip(),
							"le" === r && this._initArray(this.toArray(), e, r);
					}),
					(s.prototype._initNumber = function (t, e, r) {
						t < 0 && ((this.negative = 1), (t = -t)),
							t < 67108864
								? ((this.words = [67108863 & t]), (this.length = 1))
								: t < 4503599627370496
								? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
								  (this.length = 2))
								: (n(t < 9007199254740992),
								  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
								  (this.length = 3)),
							"le" === r && this._initArray(this.toArray(), e, r);
					}),
					(s.prototype._initArray = function (t, e, r) {
						if ((n("number" == typeof t.length), t.length <= 0))
							return (this.words = [0]), (this.length = 1), this;
						(this.length = Math.ceil(t.length / 3)),
							(this.words = new Array(this.length));
						for (var i = 0; i < this.length; i++) this.words[i] = 0;
						var s,
							o,
							f = 0;
						if ("be" === r)
							for (i = t.length - 1, s = 0; i >= 0; i -= 3)
								(o = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
									(this.words[s] |= (o << f) & 67108863),
									(this.words[s + 1] = (o >>> (26 - f)) & 67108863),
									(f += 24) >= 26 && ((f -= 26), s++);
						else if ("le" === r)
							for (i = 0, s = 0; i < t.length; i += 3)
								(o = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
									(this.words[s] |= (o << f) & 67108863),
									(this.words[s + 1] = (o >>> (26 - f)) & 67108863),
									(f += 24) >= 26 && ((f -= 26), s++);
						return this.strip();
					}),
					(s.prototype._parseHex = function (t, e) {
						(this.length = Math.ceil((t.length - e) / 6)),
							(this.words = new Array(this.length));
						for (var r = 0; r < this.length; r++) this.words[r] = 0;
						var n,
							i,
							s = 0;
						for (r = t.length - 6, n = 0; r >= e; r -= 6)
							(i = f(t, r, r + 6)),
								(this.words[n] |= (i << s) & 67108863),
								(this.words[n + 1] |= (i >>> (26 - s)) & 4194303),
								(s += 24) >= 26 && ((s -= 26), n++);
						r + 6 !== e &&
							((i = f(t, e, r + 6)),
							(this.words[n] |= (i << s) & 67108863),
							(this.words[n + 1] |= (i >>> (26 - s)) & 4194303)),
							this.strip();
					}),
					(s.prototype._parseBase = function (t, e, r) {
						(this.words = [0]), (this.length = 1);
						for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
						n--, (i = (i / e) | 0);
						for (
							var s = t.length - r,
								o = s % n,
								f = Math.min(s, s - o) + r,
								u = 0,
								c = r;
							c < f;
							c += n
						)
							(u = a(t, c, c + n, e)),
								this.imuln(i),
								this.words[0] + u < 67108864
									? (this.words[0] += u)
									: this._iaddn(u);
						if (0 !== o) {
							var h = 1;
							for (u = a(t, c, t.length, e), c = 0; c < o; c++) h *= e;
							this.imuln(h),
								this.words[0] + u < 67108864
									? (this.words[0] += u)
									: this._iaddn(u);
						}
					}),
					(s.prototype.copy = function (t) {
						t.words = new Array(this.length);
						for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
						(t.length = this.length),
							(t.negative = this.negative),
							(t.red = this.red);
					}),
					(s.prototype.clone = function () {
						var t = new s(null);
						return this.copy(t), t;
					}),
					(s.prototype._expand = function (t) {
						for (; this.length < t; ) this.words[this.length++] = 0;
						return this;
					}),
					(s.prototype.strip = function () {
						for (; this.length > 1 && 0 === this.words[this.length - 1]; )
							this.length--;
						return this._normSign();
					}),
					(s.prototype._normSign = function () {
						return (
							1 === this.length && 0 === this.words[0] && (this.negative = 0),
							this
						);
					}),
					(s.prototype.inspect = function () {
						return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
					});
				var u = [
						"",
						"0",
						"00",
						"000",
						"0000",
						"00000",
						"000000",
						"0000000",
						"00000000",
						"000000000",
						"0000000000",
						"00000000000",
						"000000000000",
						"0000000000000",
						"00000000000000",
						"000000000000000",
						"0000000000000000",
						"00000000000000000",
						"000000000000000000",
						"0000000000000000000",
						"00000000000000000000",
						"000000000000000000000",
						"0000000000000000000000",
						"00000000000000000000000",
						"000000000000000000000000",
						"0000000000000000000000000",
					],
					c = [
						0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
						5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
					],
					h = [
						0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
						16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
						11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
						5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
						20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
						60466176,
					];
				function d(t, e, r) {
					r.negative = e.negative ^ t.negative;
					var n = (t.length + e.length) | 0;
					(r.length = n), (n = (n - 1) | 0);
					var i = 0 | t.words[0],
						s = 0 | e.words[0],
						o = i * s,
						f = 67108863 & o,
						a = (o / 67108864) | 0;
					r.words[0] = f;
					for (var u = 1; u < n; u++) {
						for (
							var c = a >>> 26,
								h = 67108863 & a,
								d = Math.min(u, e.length - 1),
								p = Math.max(0, u - t.length + 1);
							p <= d;
							p++
						) {
							var l = (u - p) | 0;
							(c +=
								((o = (i = 0 | t.words[l]) * (s = 0 | e.words[p]) + h) /
									67108864) |
								0),
								(h = 67108863 & o);
						}
						(r.words[u] = 0 | h), (a = 0 | c);
					}
					return 0 !== a ? (r.words[u] = 0 | a) : r.length--, r.strip();
				}
				(s.prototype.toString = function (t, e) {
					var r;
					if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
						r = "";
						for (var i = 0, s = 0, o = 0; o < this.length; o++) {
							var f = this.words[o],
								a = (16777215 & ((f << i) | s)).toString(16);
							(r =
								0 !== (s = (f >>> (24 - i)) & 16777215) || o !== this.length - 1
									? u[6 - a.length] + a + r
									: a + r),
								(i += 2) >= 26 && ((i -= 26), o--);
						}
						for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
							r = "0" + r;
						return 0 !== this.negative && (r = "-" + r), r;
					}
					if (t === (0 | t) && t >= 2 && t <= 36) {
						var d = c[t],
							p = h[t];
						r = "";
						var l = this.clone();
						for (l.negative = 0; !l.isZero(); ) {
							var b = l.modn(p).toString(t);
							r = (l = l.idivn(p)).isZero() ? b + r : u[d - b.length] + b + r;
						}
						for (this.isZero() && (r = "0" + r); r.length % e != 0; )
							r = "0" + r;
						return 0 !== this.negative && (r = "-" + r), r;
					}
					n(!1, "Base should be between 2 and 36");
				}),
					(s.prototype.toNumber = function () {
						var t = this.words[0];
						return (
							2 === this.length
								? (t += 67108864 * this.words[1])
								: 3 === this.length && 1 === this.words[2]
								? (t += 4503599627370496 + 67108864 * this.words[1])
								: this.length > 2 &&
								  n(!1, "Number can only safely store up to 53 bits"),
							0 !== this.negative ? -t : t
						);
					}),
					(s.prototype.toJSON = function () {
						return this.toString(16);
					}),
					(s.prototype.toBuffer = function (t, e) {
						return n(void 0 !== o), this.toArrayLike(o, t, e);
					}),
					(s.prototype.toArray = function (t, e) {
						return this.toArrayLike(Array, t, e);
					}),
					(s.prototype.toArrayLike = function (t, e, r) {
						var i = this.byteLength(),
							s = r || Math.max(1, i);
						n(i <= s, "byte array longer than desired length"),
							n(s > 0, "Requested array length <= 0"),
							this.strip();
						var o,
							f,
							a = "le" === e,
							u = new t(s),
							c = this.clone();
						if (a) {
							for (f = 0; !c.isZero(); f++)
								(o = c.andln(255)), c.iushrn(8), (u[f] = o);
							for (; f < s; f++) u[f] = 0;
						} else {
							for (f = 0; f < s - i; f++) u[f] = 0;
							for (f = 0; !c.isZero(); f++)
								(o = c.andln(255)), c.iushrn(8), (u[s - f - 1] = o);
						}
						return u;
					}),
					Math.clz32
						? (s.prototype._countBits = function (t) {
								return 32 - Math.clz32(t);
						  })
						: (s.prototype._countBits = function (t) {
								var e = t,
									r = 0;
								return (
									e >= 4096 && ((r += 13), (e >>>= 13)),
									e >= 64 && ((r += 7), (e >>>= 7)),
									e >= 8 && ((r += 4), (e >>>= 4)),
									e >= 2 && ((r += 2), (e >>>= 2)),
									r + e
								);
						  }),
					(s.prototype._zeroBits = function (t) {
						if (0 === t) return 26;
						var e = t,
							r = 0;
						return (
							0 == (8191 & e) && ((r += 13), (e >>>= 13)),
							0 == (127 & e) && ((r += 7), (e >>>= 7)),
							0 == (15 & e) && ((r += 4), (e >>>= 4)),
							0 == (3 & e) && ((r += 2), (e >>>= 2)),
							0 == (1 & e) && r++,
							r
						);
					}),
					(s.prototype.bitLength = function () {
						var t = this.words[this.length - 1],
							e = this._countBits(t);
						return 26 * (this.length - 1) + e;
					}),
					(s.prototype.zeroBits = function () {
						if (this.isZero()) return 0;
						for (var t = 0, e = 0; e < this.length; e++) {
							var r = this._zeroBits(this.words[e]);
							if (((t += r), 26 !== r)) break;
						}
						return t;
					}),
					(s.prototype.byteLength = function () {
						return Math.ceil(this.bitLength() / 8);
					}),
					(s.prototype.toTwos = function (t) {
						return 0 !== this.negative
							? this.abs().inotn(t).iaddn(1)
							: this.clone();
					}),
					(s.prototype.fromTwos = function (t) {
						return this.testn(t - 1)
							? this.notn(t).iaddn(1).ineg()
							: this.clone();
					}),
					(s.prototype.isNeg = function () {
						return 0 !== this.negative;
					}),
					(s.prototype.neg = function () {
						return this.clone().ineg();
					}),
					(s.prototype.ineg = function () {
						return this.isZero() || (this.negative ^= 1), this;
					}),
					(s.prototype.iuor = function (t) {
						for (; this.length < t.length; ) this.words[this.length++] = 0;
						for (var e = 0; e < t.length; e++)
							this.words[e] = this.words[e] | t.words[e];
						return this.strip();
					}),
					(s.prototype.ior = function (t) {
						return n(0 == (this.negative | t.negative)), this.iuor(t);
					}),
					(s.prototype.or = function (t) {
						return this.length > t.length
							? this.clone().ior(t)
							: t.clone().ior(this);
					}),
					(s.prototype.uor = function (t) {
						return this.length > t.length
							? this.clone().iuor(t)
							: t.clone().iuor(this);
					}),
					(s.prototype.iuand = function (t) {
						var e;
						e = this.length > t.length ? t : this;
						for (var r = 0; r < e.length; r++)
							this.words[r] = this.words[r] & t.words[r];
						return (this.length = e.length), this.strip();
					}),
					(s.prototype.iand = function (t) {
						return n(0 == (this.negative | t.negative)), this.iuand(t);
					}),
					(s.prototype.and = function (t) {
						return this.length > t.length
							? this.clone().iand(t)
							: t.clone().iand(this);
					}),
					(s.prototype.uand = function (t) {
						return this.length > t.length
							? this.clone().iuand(t)
							: t.clone().iuand(this);
					}),
					(s.prototype.iuxor = function (t) {
						var e, r;
						this.length > t.length
							? ((e = this), (r = t))
							: ((e = t), (r = this));
						for (var n = 0; n < r.length; n++)
							this.words[n] = e.words[n] ^ r.words[n];
						if (this !== e)
							for (; n < e.length; n++) this.words[n] = e.words[n];
						return (this.length = e.length), this.strip();
					}),
					(s.prototype.ixor = function (t) {
						return n(0 == (this.negative | t.negative)), this.iuxor(t);
					}),
					(s.prototype.xor = function (t) {
						return this.length > t.length
							? this.clone().ixor(t)
							: t.clone().ixor(this);
					}),
					(s.prototype.uxor = function (t) {
						return this.length > t.length
							? this.clone().iuxor(t)
							: t.clone().iuxor(this);
					}),
					(s.prototype.inotn = function (t) {
						n("number" == typeof t && t >= 0);
						var e = 0 | Math.ceil(t / 26),
							r = t % 26;
						this._expand(e), r > 0 && e--;
						for (var i = 0; i < e; i++)
							this.words[i] = 67108863 & ~this.words[i];
						return (
							r > 0 &&
								(this.words[i] = ~this.words[i] & (67108863 >> (26 - r))),
							this.strip()
						);
					}),
					(s.prototype.notn = function (t) {
						return this.clone().inotn(t);
					}),
					(s.prototype.setn = function (t, e) {
						n("number" == typeof t && t >= 0);
						var r = (t / 26) | 0,
							i = t % 26;
						return (
							this._expand(r + 1),
							(this.words[r] = e
								? this.words[r] | (1 << i)
								: this.words[r] & ~(1 << i)),
							this.strip()
						);
					}),
					(s.prototype.iadd = function (t) {
						var e, r, n;
						if (0 !== this.negative && 0 === t.negative)
							return (
								(this.negative = 0),
								(e = this.isub(t)),
								(this.negative ^= 1),
								this._normSign()
							);
						if (0 === this.negative && 0 !== t.negative)
							return (
								(t.negative = 0),
								(e = this.isub(t)),
								(t.negative = 1),
								e._normSign()
							);
						this.length > t.length
							? ((r = this), (n = t))
							: ((r = t), (n = this));
						for (var i = 0, s = 0; s < n.length; s++)
							(e = (0 | r.words[s]) + (0 | n.words[s]) + i),
								(this.words[s] = 67108863 & e),
								(i = e >>> 26);
						for (; 0 !== i && s < r.length; s++)
							(e = (0 | r.words[s]) + i),
								(this.words[s] = 67108863 & e),
								(i = e >>> 26);
						if (((this.length = r.length), 0 !== i))
							(this.words[this.length] = i), this.length++;
						else if (r !== this)
							for (; s < r.length; s++) this.words[s] = r.words[s];
						return this;
					}),
					(s.prototype.add = function (t) {
						var e;
						return 0 !== t.negative && 0 === this.negative
							? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
							: 0 === t.negative && 0 !== this.negative
							? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
							: this.length > t.length
							? this.clone().iadd(t)
							: t.clone().iadd(this);
					}),
					(s.prototype.isub = function (t) {
						if (0 !== t.negative) {
							t.negative = 0;
							var e = this.iadd(t);
							return (t.negative = 1), e._normSign();
						}
						if (0 !== this.negative)
							return (
								(this.negative = 0),
								this.iadd(t),
								(this.negative = 1),
								this._normSign()
							);
						var r,
							n,
							i = this.cmp(t);
						if (0 === i)
							return (
								(this.negative = 0),
								(this.length = 1),
								(this.words[0] = 0),
								this
							);
						i > 0 ? ((r = this), (n = t)) : ((r = t), (n = this));
						for (var s = 0, o = 0; o < n.length; o++)
							(s = (e = (0 | r.words[o]) - (0 | n.words[o]) + s) >> 26),
								(this.words[o] = 67108863 & e);
						for (; 0 !== s && o < r.length; o++)
							(s = (e = (0 | r.words[o]) + s) >> 26),
								(this.words[o] = 67108863 & e);
						if (0 === s && o < r.length && r !== this)
							for (; o < r.length; o++) this.words[o] = r.words[o];
						return (
							(this.length = Math.max(this.length, o)),
							r !== this && (this.negative = 1),
							this.strip()
						);
					}),
					(s.prototype.sub = function (t) {
						return this.clone().isub(t);
					});
				var p = function (t, e, r) {
					var n,
						i,
						s,
						o = t.words,
						f = e.words,
						a = r.words,
						u = 0,
						c = 0 | o[0],
						h = 8191 & c,
						d = c >>> 13,
						p = 0 | o[1],
						l = 8191 & p,
						b = p >>> 13,
						m = 0 | o[2],
						g = 8191 & m,
						y = m >>> 13,
						v = 0 | o[3],
						_ = 8191 & v,
						S = v >>> 13,
						w = 0 | o[4],
						I = 8191 & w,
						A = w >>> 13,
						E = 0 | o[5],
						P = 8191 & E,
						O = E >>> 13,
						k = 0 | o[6],
						R = 8191 & k,
						M = k >>> 13,
						x = 0 | o[7],
						T = 8191 & x,
						B = x >>> 13,
						N = 0 | o[8],
						C = 8191 & N,
						U = N >>> 13,
						L = 0 | o[9],
						H = 8191 & L,
						D = L >>> 13,
						F = 0 | f[0],
						K = 8191 & F,
						z = F >>> 13,
						j = 0 | f[1],
						V = 8191 & j,
						q = j >>> 13,
						Y = 0 | f[2],
						G = 8191 & Y,
						X = Y >>> 13,
						W = 0 | f[3],
						Z = 8191 & W,
						J = W >>> 13,
						Q = 0 | f[4],
						$ = 8191 & Q,
						tt = Q >>> 13,
						et = 0 | f[5],
						rt = 8191 & et,
						nt = et >>> 13,
						it = 0 | f[6],
						st = 8191 & it,
						ot = it >>> 13,
						ft = 0 | f[7],
						at = 8191 & ft,
						ut = ft >>> 13,
						ct = 0 | f[8],
						ht = 8191 & ct,
						dt = ct >>> 13,
						pt = 0 | f[9],
						lt = 8191 & pt,
						bt = pt >>> 13;
					(r.negative = t.negative ^ e.negative), (r.length = 19);
					var mt =
						(((u + (n = Math.imul(h, K))) | 0) +
							((8191 & (i = ((i = Math.imul(h, z)) + Math.imul(d, K)) | 0)) <<
								13)) |
						0;
					(u = ((((s = Math.imul(d, z)) + (i >>> 13)) | 0) + (mt >>> 26)) | 0),
						(mt &= 67108863),
						(n = Math.imul(l, K)),
						(i = ((i = Math.imul(l, z)) + Math.imul(b, K)) | 0),
						(s = Math.imul(b, z));
					var gt =
						(((u + (n = (n + Math.imul(h, V)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, q)) | 0) + Math.imul(d, V)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, q)) | 0) + (i >>> 13)) | 0) +
							(gt >>> 26)) |
						0),
						(gt &= 67108863),
						(n = Math.imul(g, K)),
						(i = ((i = Math.imul(g, z)) + Math.imul(y, K)) | 0),
						(s = Math.imul(y, z)),
						(n = (n + Math.imul(l, V)) | 0),
						(i = ((i = (i + Math.imul(l, q)) | 0) + Math.imul(b, V)) | 0),
						(s = (s + Math.imul(b, q)) | 0);
					var yt =
						(((u + (n = (n + Math.imul(h, G)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, X)) | 0) + Math.imul(d, G)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, X)) | 0) + (i >>> 13)) | 0) +
							(yt >>> 26)) |
						0),
						(yt &= 67108863),
						(n = Math.imul(_, K)),
						(i = ((i = Math.imul(_, z)) + Math.imul(S, K)) | 0),
						(s = Math.imul(S, z)),
						(n = (n + Math.imul(g, V)) | 0),
						(i = ((i = (i + Math.imul(g, q)) | 0) + Math.imul(y, V)) | 0),
						(s = (s + Math.imul(y, q)) | 0),
						(n = (n + Math.imul(l, G)) | 0),
						(i = ((i = (i + Math.imul(l, X)) | 0) + Math.imul(b, G)) | 0),
						(s = (s + Math.imul(b, X)) | 0);
					var vt =
						(((u + (n = (n + Math.imul(h, Z)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, J)) | 0) + Math.imul(d, Z)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, J)) | 0) + (i >>> 13)) | 0) +
							(vt >>> 26)) |
						0),
						(vt &= 67108863),
						(n = Math.imul(I, K)),
						(i = ((i = Math.imul(I, z)) + Math.imul(A, K)) | 0),
						(s = Math.imul(A, z)),
						(n = (n + Math.imul(_, V)) | 0),
						(i = ((i = (i + Math.imul(_, q)) | 0) + Math.imul(S, V)) | 0),
						(s = (s + Math.imul(S, q)) | 0),
						(n = (n + Math.imul(g, G)) | 0),
						(i = ((i = (i + Math.imul(g, X)) | 0) + Math.imul(y, G)) | 0),
						(s = (s + Math.imul(y, X)) | 0),
						(n = (n + Math.imul(l, Z)) | 0),
						(i = ((i = (i + Math.imul(l, J)) | 0) + Math.imul(b, Z)) | 0),
						(s = (s + Math.imul(b, J)) | 0);
					var _t =
						(((u + (n = (n + Math.imul(h, $)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, tt)) | 0) + Math.imul(d, $)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) +
							(_t >>> 26)) |
						0),
						(_t &= 67108863),
						(n = Math.imul(P, K)),
						(i = ((i = Math.imul(P, z)) + Math.imul(O, K)) | 0),
						(s = Math.imul(O, z)),
						(n = (n + Math.imul(I, V)) | 0),
						(i = ((i = (i + Math.imul(I, q)) | 0) + Math.imul(A, V)) | 0),
						(s = (s + Math.imul(A, q)) | 0),
						(n = (n + Math.imul(_, G)) | 0),
						(i = ((i = (i + Math.imul(_, X)) | 0) + Math.imul(S, G)) | 0),
						(s = (s + Math.imul(S, X)) | 0),
						(n = (n + Math.imul(g, Z)) | 0),
						(i = ((i = (i + Math.imul(g, J)) | 0) + Math.imul(y, Z)) | 0),
						(s = (s + Math.imul(y, J)) | 0),
						(n = (n + Math.imul(l, $)) | 0),
						(i = ((i = (i + Math.imul(l, tt)) | 0) + Math.imul(b, $)) | 0),
						(s = (s + Math.imul(b, tt)) | 0);
					var St =
						(((u + (n = (n + Math.imul(h, rt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, nt)) | 0) + Math.imul(d, rt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, nt)) | 0) + (i >>> 13)) | 0) +
							(St >>> 26)) |
						0),
						(St &= 67108863),
						(n = Math.imul(R, K)),
						(i = ((i = Math.imul(R, z)) + Math.imul(M, K)) | 0),
						(s = Math.imul(M, z)),
						(n = (n + Math.imul(P, V)) | 0),
						(i = ((i = (i + Math.imul(P, q)) | 0) + Math.imul(O, V)) | 0),
						(s = (s + Math.imul(O, q)) | 0),
						(n = (n + Math.imul(I, G)) | 0),
						(i = ((i = (i + Math.imul(I, X)) | 0) + Math.imul(A, G)) | 0),
						(s = (s + Math.imul(A, X)) | 0),
						(n = (n + Math.imul(_, Z)) | 0),
						(i = ((i = (i + Math.imul(_, J)) | 0) + Math.imul(S, Z)) | 0),
						(s = (s + Math.imul(S, J)) | 0),
						(n = (n + Math.imul(g, $)) | 0),
						(i = ((i = (i + Math.imul(g, tt)) | 0) + Math.imul(y, $)) | 0),
						(s = (s + Math.imul(y, tt)) | 0),
						(n = (n + Math.imul(l, rt)) | 0),
						(i = ((i = (i + Math.imul(l, nt)) | 0) + Math.imul(b, rt)) | 0),
						(s = (s + Math.imul(b, nt)) | 0);
					var wt =
						(((u + (n = (n + Math.imul(h, st)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, ot)) | 0) + Math.imul(d, st)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, ot)) | 0) + (i >>> 13)) | 0) +
							(wt >>> 26)) |
						0),
						(wt &= 67108863),
						(n = Math.imul(T, K)),
						(i = ((i = Math.imul(T, z)) + Math.imul(B, K)) | 0),
						(s = Math.imul(B, z)),
						(n = (n + Math.imul(R, V)) | 0),
						(i = ((i = (i + Math.imul(R, q)) | 0) + Math.imul(M, V)) | 0),
						(s = (s + Math.imul(M, q)) | 0),
						(n = (n + Math.imul(P, G)) | 0),
						(i = ((i = (i + Math.imul(P, X)) | 0) + Math.imul(O, G)) | 0),
						(s = (s + Math.imul(O, X)) | 0),
						(n = (n + Math.imul(I, Z)) | 0),
						(i = ((i = (i + Math.imul(I, J)) | 0) + Math.imul(A, Z)) | 0),
						(s = (s + Math.imul(A, J)) | 0),
						(n = (n + Math.imul(_, $)) | 0),
						(i = ((i = (i + Math.imul(_, tt)) | 0) + Math.imul(S, $)) | 0),
						(s = (s + Math.imul(S, tt)) | 0),
						(n = (n + Math.imul(g, rt)) | 0),
						(i = ((i = (i + Math.imul(g, nt)) | 0) + Math.imul(y, rt)) | 0),
						(s = (s + Math.imul(y, nt)) | 0),
						(n = (n + Math.imul(l, st)) | 0),
						(i = ((i = (i + Math.imul(l, ot)) | 0) + Math.imul(b, st)) | 0),
						(s = (s + Math.imul(b, ot)) | 0);
					var It =
						(((u + (n = (n + Math.imul(h, at)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, ut)) | 0) + Math.imul(d, at)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, ut)) | 0) + (i >>> 13)) | 0) +
							(It >>> 26)) |
						0),
						(It &= 67108863),
						(n = Math.imul(C, K)),
						(i = ((i = Math.imul(C, z)) + Math.imul(U, K)) | 0),
						(s = Math.imul(U, z)),
						(n = (n + Math.imul(T, V)) | 0),
						(i = ((i = (i + Math.imul(T, q)) | 0) + Math.imul(B, V)) | 0),
						(s = (s + Math.imul(B, q)) | 0),
						(n = (n + Math.imul(R, G)) | 0),
						(i = ((i = (i + Math.imul(R, X)) | 0) + Math.imul(M, G)) | 0),
						(s = (s + Math.imul(M, X)) | 0),
						(n = (n + Math.imul(P, Z)) | 0),
						(i = ((i = (i + Math.imul(P, J)) | 0) + Math.imul(O, Z)) | 0),
						(s = (s + Math.imul(O, J)) | 0),
						(n = (n + Math.imul(I, $)) | 0),
						(i = ((i = (i + Math.imul(I, tt)) | 0) + Math.imul(A, $)) | 0),
						(s = (s + Math.imul(A, tt)) | 0),
						(n = (n + Math.imul(_, rt)) | 0),
						(i = ((i = (i + Math.imul(_, nt)) | 0) + Math.imul(S, rt)) | 0),
						(s = (s + Math.imul(S, nt)) | 0),
						(n = (n + Math.imul(g, st)) | 0),
						(i = ((i = (i + Math.imul(g, ot)) | 0) + Math.imul(y, st)) | 0),
						(s = (s + Math.imul(y, ot)) | 0),
						(n = (n + Math.imul(l, at)) | 0),
						(i = ((i = (i + Math.imul(l, ut)) | 0) + Math.imul(b, at)) | 0),
						(s = (s + Math.imul(b, ut)) | 0);
					var At =
						(((u + (n = (n + Math.imul(h, ht)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, dt)) | 0) + Math.imul(d, ht)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, dt)) | 0) + (i >>> 13)) | 0) +
							(At >>> 26)) |
						0),
						(At &= 67108863),
						(n = Math.imul(H, K)),
						(i = ((i = Math.imul(H, z)) + Math.imul(D, K)) | 0),
						(s = Math.imul(D, z)),
						(n = (n + Math.imul(C, V)) | 0),
						(i = ((i = (i + Math.imul(C, q)) | 0) + Math.imul(U, V)) | 0),
						(s = (s + Math.imul(U, q)) | 0),
						(n = (n + Math.imul(T, G)) | 0),
						(i = ((i = (i + Math.imul(T, X)) | 0) + Math.imul(B, G)) | 0),
						(s = (s + Math.imul(B, X)) | 0),
						(n = (n + Math.imul(R, Z)) | 0),
						(i = ((i = (i + Math.imul(R, J)) | 0) + Math.imul(M, Z)) | 0),
						(s = (s + Math.imul(M, J)) | 0),
						(n = (n + Math.imul(P, $)) | 0),
						(i = ((i = (i + Math.imul(P, tt)) | 0) + Math.imul(O, $)) | 0),
						(s = (s + Math.imul(O, tt)) | 0),
						(n = (n + Math.imul(I, rt)) | 0),
						(i = ((i = (i + Math.imul(I, nt)) | 0) + Math.imul(A, rt)) | 0),
						(s = (s + Math.imul(A, nt)) | 0),
						(n = (n + Math.imul(_, st)) | 0),
						(i = ((i = (i + Math.imul(_, ot)) | 0) + Math.imul(S, st)) | 0),
						(s = (s + Math.imul(S, ot)) | 0),
						(n = (n + Math.imul(g, at)) | 0),
						(i = ((i = (i + Math.imul(g, ut)) | 0) + Math.imul(y, at)) | 0),
						(s = (s + Math.imul(y, ut)) | 0),
						(n = (n + Math.imul(l, ht)) | 0),
						(i = ((i = (i + Math.imul(l, dt)) | 0) + Math.imul(b, ht)) | 0),
						(s = (s + Math.imul(b, dt)) | 0);
					var Et =
						(((u + (n = (n + Math.imul(h, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(h, bt)) | 0) + Math.imul(d, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(d, bt)) | 0) + (i >>> 13)) | 0) +
							(Et >>> 26)) |
						0),
						(Et &= 67108863),
						(n = Math.imul(H, V)),
						(i = ((i = Math.imul(H, q)) + Math.imul(D, V)) | 0),
						(s = Math.imul(D, q)),
						(n = (n + Math.imul(C, G)) | 0),
						(i = ((i = (i + Math.imul(C, X)) | 0) + Math.imul(U, G)) | 0),
						(s = (s + Math.imul(U, X)) | 0),
						(n = (n + Math.imul(T, Z)) | 0),
						(i = ((i = (i + Math.imul(T, J)) | 0) + Math.imul(B, Z)) | 0),
						(s = (s + Math.imul(B, J)) | 0),
						(n = (n + Math.imul(R, $)) | 0),
						(i = ((i = (i + Math.imul(R, tt)) | 0) + Math.imul(M, $)) | 0),
						(s = (s + Math.imul(M, tt)) | 0),
						(n = (n + Math.imul(P, rt)) | 0),
						(i = ((i = (i + Math.imul(P, nt)) | 0) + Math.imul(O, rt)) | 0),
						(s = (s + Math.imul(O, nt)) | 0),
						(n = (n + Math.imul(I, st)) | 0),
						(i = ((i = (i + Math.imul(I, ot)) | 0) + Math.imul(A, st)) | 0),
						(s = (s + Math.imul(A, ot)) | 0),
						(n = (n + Math.imul(_, at)) | 0),
						(i = ((i = (i + Math.imul(_, ut)) | 0) + Math.imul(S, at)) | 0),
						(s = (s + Math.imul(S, ut)) | 0),
						(n = (n + Math.imul(g, ht)) | 0),
						(i = ((i = (i + Math.imul(g, dt)) | 0) + Math.imul(y, ht)) | 0),
						(s = (s + Math.imul(y, dt)) | 0);
					var Pt =
						(((u + (n = (n + Math.imul(l, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(l, bt)) | 0) + Math.imul(b, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(b, bt)) | 0) + (i >>> 13)) | 0) +
							(Pt >>> 26)) |
						0),
						(Pt &= 67108863),
						(n = Math.imul(H, G)),
						(i = ((i = Math.imul(H, X)) + Math.imul(D, G)) | 0),
						(s = Math.imul(D, X)),
						(n = (n + Math.imul(C, Z)) | 0),
						(i = ((i = (i + Math.imul(C, J)) | 0) + Math.imul(U, Z)) | 0),
						(s = (s + Math.imul(U, J)) | 0),
						(n = (n + Math.imul(T, $)) | 0),
						(i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(B, $)) | 0),
						(s = (s + Math.imul(B, tt)) | 0),
						(n = (n + Math.imul(R, rt)) | 0),
						(i = ((i = (i + Math.imul(R, nt)) | 0) + Math.imul(M, rt)) | 0),
						(s = (s + Math.imul(M, nt)) | 0),
						(n = (n + Math.imul(P, st)) | 0),
						(i = ((i = (i + Math.imul(P, ot)) | 0) + Math.imul(O, st)) | 0),
						(s = (s + Math.imul(O, ot)) | 0),
						(n = (n + Math.imul(I, at)) | 0),
						(i = ((i = (i + Math.imul(I, ut)) | 0) + Math.imul(A, at)) | 0),
						(s = (s + Math.imul(A, ut)) | 0),
						(n = (n + Math.imul(_, ht)) | 0),
						(i = ((i = (i + Math.imul(_, dt)) | 0) + Math.imul(S, ht)) | 0),
						(s = (s + Math.imul(S, dt)) | 0);
					var Ot =
						(((u + (n = (n + Math.imul(g, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(g, bt)) | 0) + Math.imul(y, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(y, bt)) | 0) + (i >>> 13)) | 0) +
							(Ot >>> 26)) |
						0),
						(Ot &= 67108863),
						(n = Math.imul(H, Z)),
						(i = ((i = Math.imul(H, J)) + Math.imul(D, Z)) | 0),
						(s = Math.imul(D, J)),
						(n = (n + Math.imul(C, $)) | 0),
						(i = ((i = (i + Math.imul(C, tt)) | 0) + Math.imul(U, $)) | 0),
						(s = (s + Math.imul(U, tt)) | 0),
						(n = (n + Math.imul(T, rt)) | 0),
						(i = ((i = (i + Math.imul(T, nt)) | 0) + Math.imul(B, rt)) | 0),
						(s = (s + Math.imul(B, nt)) | 0),
						(n = (n + Math.imul(R, st)) | 0),
						(i = ((i = (i + Math.imul(R, ot)) | 0) + Math.imul(M, st)) | 0),
						(s = (s + Math.imul(M, ot)) | 0),
						(n = (n + Math.imul(P, at)) | 0),
						(i = ((i = (i + Math.imul(P, ut)) | 0) + Math.imul(O, at)) | 0),
						(s = (s + Math.imul(O, ut)) | 0),
						(n = (n + Math.imul(I, ht)) | 0),
						(i = ((i = (i + Math.imul(I, dt)) | 0) + Math.imul(A, ht)) | 0),
						(s = (s + Math.imul(A, dt)) | 0);
					var kt =
						(((u + (n = (n + Math.imul(_, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(_, bt)) | 0) + Math.imul(S, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(S, bt)) | 0) + (i >>> 13)) | 0) +
							(kt >>> 26)) |
						0),
						(kt &= 67108863),
						(n = Math.imul(H, $)),
						(i = ((i = Math.imul(H, tt)) + Math.imul(D, $)) | 0),
						(s = Math.imul(D, tt)),
						(n = (n + Math.imul(C, rt)) | 0),
						(i = ((i = (i + Math.imul(C, nt)) | 0) + Math.imul(U, rt)) | 0),
						(s = (s + Math.imul(U, nt)) | 0),
						(n = (n + Math.imul(T, st)) | 0),
						(i = ((i = (i + Math.imul(T, ot)) | 0) + Math.imul(B, st)) | 0),
						(s = (s + Math.imul(B, ot)) | 0),
						(n = (n + Math.imul(R, at)) | 0),
						(i = ((i = (i + Math.imul(R, ut)) | 0) + Math.imul(M, at)) | 0),
						(s = (s + Math.imul(M, ut)) | 0),
						(n = (n + Math.imul(P, ht)) | 0),
						(i = ((i = (i + Math.imul(P, dt)) | 0) + Math.imul(O, ht)) | 0),
						(s = (s + Math.imul(O, dt)) | 0);
					var Rt =
						(((u + (n = (n + Math.imul(I, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(I, bt)) | 0) + Math.imul(A, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(A, bt)) | 0) + (i >>> 13)) | 0) +
							(Rt >>> 26)) |
						0),
						(Rt &= 67108863),
						(n = Math.imul(H, rt)),
						(i = ((i = Math.imul(H, nt)) + Math.imul(D, rt)) | 0),
						(s = Math.imul(D, nt)),
						(n = (n + Math.imul(C, st)) | 0),
						(i = ((i = (i + Math.imul(C, ot)) | 0) + Math.imul(U, st)) | 0),
						(s = (s + Math.imul(U, ot)) | 0),
						(n = (n + Math.imul(T, at)) | 0),
						(i = ((i = (i + Math.imul(T, ut)) | 0) + Math.imul(B, at)) | 0),
						(s = (s + Math.imul(B, ut)) | 0),
						(n = (n + Math.imul(R, ht)) | 0),
						(i = ((i = (i + Math.imul(R, dt)) | 0) + Math.imul(M, ht)) | 0),
						(s = (s + Math.imul(M, dt)) | 0);
					var Mt =
						(((u + (n = (n + Math.imul(P, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(P, bt)) | 0) + Math.imul(O, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(O, bt)) | 0) + (i >>> 13)) | 0) +
							(Mt >>> 26)) |
						0),
						(Mt &= 67108863),
						(n = Math.imul(H, st)),
						(i = ((i = Math.imul(H, ot)) + Math.imul(D, st)) | 0),
						(s = Math.imul(D, ot)),
						(n = (n + Math.imul(C, at)) | 0),
						(i = ((i = (i + Math.imul(C, ut)) | 0) + Math.imul(U, at)) | 0),
						(s = (s + Math.imul(U, ut)) | 0),
						(n = (n + Math.imul(T, ht)) | 0),
						(i = ((i = (i + Math.imul(T, dt)) | 0) + Math.imul(B, ht)) | 0),
						(s = (s + Math.imul(B, dt)) | 0);
					var xt =
						(((u + (n = (n + Math.imul(R, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(R, bt)) | 0) + Math.imul(M, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(M, bt)) | 0) + (i >>> 13)) | 0) +
							(xt >>> 26)) |
						0),
						(xt &= 67108863),
						(n = Math.imul(H, at)),
						(i = ((i = Math.imul(H, ut)) + Math.imul(D, at)) | 0),
						(s = Math.imul(D, ut)),
						(n = (n + Math.imul(C, ht)) | 0),
						(i = ((i = (i + Math.imul(C, dt)) | 0) + Math.imul(U, ht)) | 0),
						(s = (s + Math.imul(U, dt)) | 0);
					var Tt =
						(((u + (n = (n + Math.imul(T, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(T, bt)) | 0) + Math.imul(B, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(B, bt)) | 0) + (i >>> 13)) | 0) +
							(Tt >>> 26)) |
						0),
						(Tt &= 67108863),
						(n = Math.imul(H, ht)),
						(i = ((i = Math.imul(H, dt)) + Math.imul(D, ht)) | 0),
						(s = Math.imul(D, dt));
					var Bt =
						(((u + (n = (n + Math.imul(C, lt)) | 0)) | 0) +
							((8191 &
								(i =
									((i = (i + Math.imul(C, bt)) | 0) + Math.imul(U, lt)) | 0)) <<
								13)) |
						0;
					(u =
						((((s = (s + Math.imul(U, bt)) | 0) + (i >>> 13)) | 0) +
							(Bt >>> 26)) |
						0),
						(Bt &= 67108863);
					var Nt =
						(((u + (n = Math.imul(H, lt))) | 0) +
							((8191 & (i = ((i = Math.imul(H, bt)) + Math.imul(D, lt)) | 0)) <<
								13)) |
						0;
					return (
						(u =
							((((s = Math.imul(D, bt)) + (i >>> 13)) | 0) + (Nt >>> 26)) | 0),
						(Nt &= 67108863),
						(a[0] = mt),
						(a[1] = gt),
						(a[2] = yt),
						(a[3] = vt),
						(a[4] = _t),
						(a[5] = St),
						(a[6] = wt),
						(a[7] = It),
						(a[8] = At),
						(a[9] = Et),
						(a[10] = Pt),
						(a[11] = Ot),
						(a[12] = kt),
						(a[13] = Rt),
						(a[14] = Mt),
						(a[15] = xt),
						(a[16] = Tt),
						(a[17] = Bt),
						(a[18] = Nt),
						0 !== u && ((a[19] = u), r.length++),
						r
					);
				};
				function l(t, e, r) {
					return new b().mulp(t, e, r);
				}
				function b(t, e) {
					(this.x = t), (this.y = e);
				}
				Math.imul || (p = d),
					(s.prototype.mulTo = function (t, e) {
						var r = this.length + t.length;
						return 10 === this.length && 10 === t.length
							? p(this, t, e)
							: r < 63
							? d(this, t, e)
							: r < 1024
							? (function (t, e, r) {
									(r.negative = e.negative ^ t.negative),
										(r.length = t.length + e.length);
									for (var n = 0, i = 0, s = 0; s < r.length - 1; s++) {
										var o = i;
										i = 0;
										for (
											var f = 67108863 & n,
												a = Math.min(s, e.length - 1),
												u = Math.max(0, s - t.length + 1);
											u <= a;
											u++
										) {
											var c = s - u,
												h = (0 | t.words[c]) * (0 | e.words[u]),
												d = 67108863 & h;
											(f = 67108863 & (d = (d + f) | 0)),
												(i +=
													(o =
														((o = (o + ((h / 67108864) | 0)) | 0) +
															(d >>> 26)) |
														0) >>> 26),
												(o &= 67108863);
										}
										(r.words[s] = f), (n = o), (o = i);
									}
									return 0 !== n ? (r.words[s] = n) : r.length--, r.strip();
							  })(this, t, e)
							: l(this, t, e);
					}),
					(b.prototype.makeRBT = function (t) {
						for (
							var e = new Array(t), r = s.prototype._countBits(t) - 1, n = 0;
							n < t;
							n++
						)
							e[n] = this.revBin(n, r, t);
						return e;
					}),
					(b.prototype.revBin = function (t, e, r) {
						if (0 === t || t === r - 1) return t;
						for (var n = 0, i = 0; i < e; i++)
							(n |= (1 & t) << (e - i - 1)), (t >>= 1);
						return n;
					}),
					(b.prototype.permute = function (t, e, r, n, i, s) {
						for (var o = 0; o < s; o++) (n[o] = e[t[o]]), (i[o] = r[t[o]]);
					}),
					(b.prototype.transform = function (t, e, r, n, i, s) {
						this.permute(s, t, e, r, n, i);
						for (var o = 1; o < i; o <<= 1)
							for (
								var f = o << 1,
									a = Math.cos((2 * Math.PI) / f),
									u = Math.sin((2 * Math.PI) / f),
									c = 0;
								c < i;
								c += f
							)
								for (var h = a, d = u, p = 0; p < o; p++) {
									var l = r[c + p],
										b = n[c + p],
										m = r[c + p + o],
										g = n[c + p + o],
										y = h * m - d * g;
									(g = h * g + d * m),
										(m = y),
										(r[c + p] = l + m),
										(n[c + p] = b + g),
										(r[c + p + o] = l - m),
										(n[c + p + o] = b - g),
										p !== f &&
											((y = a * h - u * d), (d = a * d + u * h), (h = y));
								}
					}),
					(b.prototype.guessLen13b = function (t, e) {
						var r = 1 | Math.max(e, t),
							n = 1 & r,
							i = 0;
						for (r = (r / 2) | 0; r; r >>>= 1) i++;
						return 1 << (i + 1 + n);
					}),
					(b.prototype.conjugate = function (t, e, r) {
						if (!(r <= 1))
							for (var n = 0; n < r / 2; n++) {
								var i = t[n];
								(t[n] = t[r - n - 1]),
									(t[r - n - 1] = i),
									(i = e[n]),
									(e[n] = -e[r - n - 1]),
									(e[r - n - 1] = -i);
							}
					}),
					(b.prototype.normalize13b = function (t, e) {
						for (var r = 0, n = 0; n < e / 2; n++) {
							var i =
								8192 * Math.round(t[2 * n + 1] / e) +
								Math.round(t[2 * n] / e) +
								r;
							(t[n] = 67108863 & i),
								(r = i < 67108864 ? 0 : (i / 67108864) | 0);
						}
						return t;
					}),
					(b.prototype.convert13b = function (t, e, r, i) {
						for (var s = 0, o = 0; o < e; o++)
							(s += 0 | t[o]),
								(r[2 * o] = 8191 & s),
								(s >>>= 13),
								(r[2 * o + 1] = 8191 & s),
								(s >>>= 13);
						for (o = 2 * e; o < i; ++o) r[o] = 0;
						n(0 === s), n(0 == (-8192 & s));
					}),
					(b.prototype.stub = function (t) {
						for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
						return e;
					}),
					(b.prototype.mulp = function (t, e, r) {
						var n = 2 * this.guessLen13b(t.length, e.length),
							i = this.makeRBT(n),
							s = this.stub(n),
							o = new Array(n),
							f = new Array(n),
							a = new Array(n),
							u = new Array(n),
							c = new Array(n),
							h = new Array(n),
							d = r.words;
						(d.length = n),
							this.convert13b(t.words, t.length, o, n),
							this.convert13b(e.words, e.length, u, n),
							this.transform(o, s, f, a, n, i),
							this.transform(u, s, c, h, n, i);
						for (var p = 0; p < n; p++) {
							var l = f[p] * c[p] - a[p] * h[p];
							(a[p] = f[p] * h[p] + a[p] * c[p]), (f[p] = l);
						}
						return (
							this.conjugate(f, a, n),
							this.transform(f, a, d, s, n, i),
							this.conjugate(d, s, n),
							this.normalize13b(d, n),
							(r.negative = t.negative ^ e.negative),
							(r.length = t.length + e.length),
							r.strip()
						);
					}),
					(s.prototype.mul = function (t) {
						var e = new s(null);
						return (
							(e.words = new Array(this.length + t.length)), this.mulTo(t, e)
						);
					}),
					(s.prototype.mulf = function (t) {
						var e = new s(null);
						return (e.words = new Array(this.length + t.length)), l(this, t, e);
					}),
					(s.prototype.imul = function (t) {
						return this.clone().mulTo(t, this);
					}),
					(s.prototype.imuln = function (t) {
						n("number" == typeof t), n(t < 67108864);
						for (var e = 0, r = 0; r < this.length; r++) {
							var i = (0 | this.words[r]) * t,
								s = (67108863 & i) + (67108863 & e);
							(e >>= 26),
								(e += (i / 67108864) | 0),
								(e += s >>> 26),
								(this.words[r] = 67108863 & s);
						}
						return 0 !== e && ((this.words[r] = e), this.length++), this;
					}),
					(s.prototype.muln = function (t) {
						return this.clone().imuln(t);
					}),
					(s.prototype.sqr = function () {
						return this.mul(this);
					}),
					(s.prototype.isqr = function () {
						return this.imul(this.clone());
					}),
					(s.prototype.pow = function (t) {
						var e = (function (t) {
							for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
								var n = (r / 26) | 0,
									i = r % 26;
								e[r] = (t.words[n] & (1 << i)) >>> i;
							}
							return e;
						})(t);
						if (0 === e.length) return new s(1);
						for (
							var r = this, n = 0;
							n < e.length && 0 === e[n];
							n++, r = r.sqr()
						);
						if (++n < e.length)
							for (var i = r.sqr(); n < e.length; n++, i = i.sqr())
								0 !== e[n] && (r = r.mul(i));
						return r;
					}),
					(s.prototype.iushln = function (t) {
						n("number" == typeof t && t >= 0);
						var e,
							r = t % 26,
							i = (t - r) / 26,
							s = (67108863 >>> (26 - r)) << (26 - r);
						if (0 !== r) {
							var o = 0;
							for (e = 0; e < this.length; e++) {
								var f = this.words[e] & s,
									a = ((0 | this.words[e]) - f) << r;
								(this.words[e] = a | o), (o = f >>> (26 - r));
							}
							o && ((this.words[e] = o), this.length++);
						}
						if (0 !== i) {
							for (e = this.length - 1; e >= 0; e--)
								this.words[e + i] = this.words[e];
							for (e = 0; e < i; e++) this.words[e] = 0;
							this.length += i;
						}
						return this.strip();
					}),
					(s.prototype.ishln = function (t) {
						return n(0 === this.negative), this.iushln(t);
					}),
					(s.prototype.iushrn = function (t, e, r) {
						var i;
						n("number" == typeof t && t >= 0),
							(i = e ? (e - (e % 26)) / 26 : 0);
						var s = t % 26,
							o = Math.min((t - s) / 26, this.length),
							f = 67108863 ^ ((67108863 >>> s) << s),
							a = r;
						if (((i -= o), (i = Math.max(0, i)), a)) {
							for (var u = 0; u < o; u++) a.words[u] = this.words[u];
							a.length = o;
						}
						if (0 === o);
						else if (this.length > o)
							for (this.length -= o, u = 0; u < this.length; u++)
								this.words[u] = this.words[u + o];
						else (this.words[0] = 0), (this.length = 1);
						var c = 0;
						for (u = this.length - 1; u >= 0 && (0 !== c || u >= i); u--) {
							var h = 0 | this.words[u];
							(this.words[u] = (c << (26 - s)) | (h >>> s)), (c = h & f);
						}
						return (
							a && 0 !== c && (a.words[a.length++] = c),
							0 === this.length && ((this.words[0] = 0), (this.length = 1)),
							this.strip()
						);
					}),
					(s.prototype.ishrn = function (t, e, r) {
						return n(0 === this.negative), this.iushrn(t, e, r);
					}),
					(s.prototype.shln = function (t) {
						return this.clone().ishln(t);
					}),
					(s.prototype.ushln = function (t) {
						return this.clone().iushln(t);
					}),
					(s.prototype.shrn = function (t) {
						return this.clone().ishrn(t);
					}),
					(s.prototype.ushrn = function (t) {
						return this.clone().iushrn(t);
					}),
					(s.prototype.testn = function (t) {
						n("number" == typeof t && t >= 0);
						var e = t % 26,
							r = (t - e) / 26,
							i = 1 << e;
						return !(this.length <= r) && !!(this.words[r] & i);
					}),
					(s.prototype.imaskn = function (t) {
						n("number" == typeof t && t >= 0);
						var e = t % 26,
							r = (t - e) / 26;
						if (
							(n(
								0 === this.negative,
								"imaskn works only with positive numbers"
							),
							this.length <= r)
						)
							return this;
						if (
							(0 !== e && r++,
							(this.length = Math.min(r, this.length)),
							0 !== e)
						) {
							var i = 67108863 ^ ((67108863 >>> e) << e);
							this.words[this.length - 1] &= i;
						}
						return this.strip();
					}),
					(s.prototype.maskn = function (t) {
						return this.clone().imaskn(t);
					}),
					(s.prototype.iaddn = function (t) {
						return (
							n("number" == typeof t),
							n(t < 67108864),
							t < 0
								? this.isubn(-t)
								: 0 !== this.negative
								? 1 === this.length && (0 | this.words[0]) < t
									? ((this.words[0] = t - (0 | this.words[0])),
									  (this.negative = 0),
									  this)
									: ((this.negative = 0),
									  this.isubn(t),
									  (this.negative = 1),
									  this)
								: this._iaddn(t)
						);
					}),
					(s.prototype._iaddn = function (t) {
						this.words[0] += t;
						for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
							(this.words[e] -= 67108864),
								e === this.length - 1
									? (this.words[e + 1] = 1)
									: this.words[e + 1]++;
						return (this.length = Math.max(this.length, e + 1)), this;
					}),
					(s.prototype.isubn = function (t) {
						if ((n("number" == typeof t), n(t < 67108864), t < 0))
							return this.iaddn(-t);
						if (0 !== this.negative)
							return (
								(this.negative = 0), this.iaddn(t), (this.negative = 1), this
							);
						if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
							(this.words[0] = -this.words[0]), (this.negative = 1);
						else
							for (var e = 0; e < this.length && this.words[e] < 0; e++)
								(this.words[e] += 67108864), (this.words[e + 1] -= 1);
						return this.strip();
					}),
					(s.prototype.addn = function (t) {
						return this.clone().iaddn(t);
					}),
					(s.prototype.subn = function (t) {
						return this.clone().isubn(t);
					}),
					(s.prototype.iabs = function () {
						return (this.negative = 0), this;
					}),
					(s.prototype.abs = function () {
						return this.clone().iabs();
					}),
					(s.prototype._ishlnsubmul = function (t, e, r) {
						var i,
							s,
							o = t.length + r;
						this._expand(o);
						var f = 0;
						for (i = 0; i < t.length; i++) {
							s = (0 | this.words[i + r]) + f;
							var a = (0 | t.words[i]) * e;
							(f = ((s -= 67108863 & a) >> 26) - ((a / 67108864) | 0)),
								(this.words[i + r] = 67108863 & s);
						}
						for (; i < this.length - r; i++)
							(f = (s = (0 | this.words[i + r]) + f) >> 26),
								(this.words[i + r] = 67108863 & s);
						if (0 === f) return this.strip();
						for (n(-1 === f), f = 0, i = 0; i < this.length; i++)
							(f = (s = -(0 | this.words[i]) + f) >> 26),
								(this.words[i] = 67108863 & s);
						return (this.negative = 1), this.strip();
					}),
					(s.prototype._wordDiv = function (t, e) {
						var r = (this.length, t.length),
							n = this.clone(),
							i = t,
							o = 0 | i.words[i.length - 1];
						0 !== (r = 26 - this._countBits(o)) &&
							((i = i.ushln(r)), n.iushln(r), (o = 0 | i.words[i.length - 1]));
						var f,
							a = n.length - i.length;
						if ("mod" !== e) {
							((f = new s(null)).length = a + 1),
								(f.words = new Array(f.length));
							for (var u = 0; u < f.length; u++) f.words[u] = 0;
						}
						var c = n.clone()._ishlnsubmul(i, 1, a);
						0 === c.negative && ((n = c), f && (f.words[a] = 1));
						for (var h = a - 1; h >= 0; h--) {
							var d =
								67108864 * (0 | n.words[i.length + h]) +
								(0 | n.words[i.length + h - 1]);
							for (
								d = Math.min((d / o) | 0, 67108863), n._ishlnsubmul(i, d, h);
								0 !== n.negative;

							)
								d--,
									(n.negative = 0),
									n._ishlnsubmul(i, 1, h),
									n.isZero() || (n.negative ^= 1);
							f && (f.words[h] = d);
						}
						return (
							f && f.strip(),
							n.strip(),
							"div" !== e && 0 !== r && n.iushrn(r),
							{ div: f || null, mod: n }
						);
					}),
					(s.prototype.divmod = function (t, e, r) {
						return (
							n(!t.isZero()),
							this.isZero()
								? { div: new s(0), mod: new s(0) }
								: 0 !== this.negative && 0 === t.negative
								? ((f = this.neg().divmod(t, e)),
								  "mod" !== e && (i = f.div.neg()),
								  "div" !== e &&
										((o = f.mod.neg()), r && 0 !== o.negative && o.iadd(t)),
								  { div: i, mod: o })
								: 0 === this.negative && 0 !== t.negative
								? ((f = this.divmod(t.neg(), e)),
								  "mod" !== e && (i = f.div.neg()),
								  { div: i, mod: f.mod })
								: 0 != (this.negative & t.negative)
								? ((f = this.neg().divmod(t.neg(), e)),
								  "div" !== e &&
										((o = f.mod.neg()), r && 0 !== o.negative && o.isub(t)),
								  { div: f.div, mod: o })
								: t.length > this.length || this.cmp(t) < 0
								? { div: new s(0), mod: this }
								: 1 === t.length
								? "div" === e
									? { div: this.divn(t.words[0]), mod: null }
									: "mod" === e
									? { div: null, mod: new s(this.modn(t.words[0])) }
									: {
											div: this.divn(t.words[0]),
											mod: new s(this.modn(t.words[0])),
									  }
								: this._wordDiv(t, e)
						);
						var i, o, f;
					}),
					(s.prototype.div = function (t) {
						return this.divmod(t, "div", !1).div;
					}),
					(s.prototype.mod = function (t) {
						return this.divmod(t, "mod", !1).mod;
					}),
					(s.prototype.umod = function (t) {
						return this.divmod(t, "mod", !0).mod;
					}),
					(s.prototype.divRound = function (t) {
						var e = this.divmod(t);
						if (e.mod.isZero()) return e.div;
						var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
							n = t.ushrn(1),
							i = t.andln(1),
							s = r.cmp(n);
						return s < 0 || (1 === i && 0 === s)
							? e.div
							: 0 !== e.div.negative
							? e.div.isubn(1)
							: e.div.iaddn(1);
					}),
					(s.prototype.modn = function (t) {
						n(t <= 67108863);
						for (var e = (1 << 26) % t, r = 0, i = this.length - 1; i >= 0; i--)
							r = (e * r + (0 | this.words[i])) % t;
						return r;
					}),
					(s.prototype.idivn = function (t) {
						n(t <= 67108863);
						for (var e = 0, r = this.length - 1; r >= 0; r--) {
							var i = (0 | this.words[r]) + 67108864 * e;
							(this.words[r] = (i / t) | 0), (e = i % t);
						}
						return this.strip();
					}),
					(s.prototype.divn = function (t) {
						return this.clone().idivn(t);
					}),
					(s.prototype.egcd = function (t) {
						n(0 === t.negative), n(!t.isZero());
						var e = this,
							r = t.clone();
						e = 0 !== e.negative ? e.umod(t) : e.clone();
						for (
							var i = new s(1), o = new s(0), f = new s(0), a = new s(1), u = 0;
							e.isEven() && r.isEven();

						)
							e.iushrn(1), r.iushrn(1), ++u;
						for (var c = r.clone(), h = e.clone(); !e.isZero(); ) {
							for (
								var d = 0, p = 1;
								0 == (e.words[0] & p) && d < 26;
								++d, p <<= 1
							);
							if (d > 0)
								for (e.iushrn(d); d-- > 0; )
									(i.isOdd() || o.isOdd()) && (i.iadd(c), o.isub(h)),
										i.iushrn(1),
										o.iushrn(1);
							for (
								var l = 0, b = 1;
								0 == (r.words[0] & b) && l < 26;
								++l, b <<= 1
							);
							if (l > 0)
								for (r.iushrn(l); l-- > 0; )
									(f.isOdd() || a.isOdd()) && (f.iadd(c), a.isub(h)),
										f.iushrn(1),
										a.iushrn(1);
							e.cmp(r) >= 0
								? (e.isub(r), i.isub(f), o.isub(a))
								: (r.isub(e), f.isub(i), a.isub(o));
						}
						return { a: f, b: a, gcd: r.iushln(u) };
					}),
					(s.prototype._invmp = function (t) {
						n(0 === t.negative), n(!t.isZero());
						var e = this,
							r = t.clone();
						e = 0 !== e.negative ? e.umod(t) : e.clone();
						for (
							var i, o = new s(1), f = new s(0), a = r.clone();
							e.cmpn(1) > 0 && r.cmpn(1) > 0;

						) {
							for (
								var u = 0, c = 1;
								0 == (e.words[0] & c) && u < 26;
								++u, c <<= 1
							);
							if (u > 0)
								for (e.iushrn(u); u-- > 0; )
									o.isOdd() && o.iadd(a), o.iushrn(1);
							for (
								var h = 0, d = 1;
								0 == (r.words[0] & d) && h < 26;
								++h, d <<= 1
							);
							if (h > 0)
								for (r.iushrn(h); h-- > 0; )
									f.isOdd() && f.iadd(a), f.iushrn(1);
							e.cmp(r) >= 0 ? (e.isub(r), o.isub(f)) : (r.isub(e), f.isub(o));
						}
						return (i = 0 === e.cmpn(1) ? o : f).cmpn(0) < 0 && i.iadd(t), i;
					}),
					(s.prototype.gcd = function (t) {
						if (this.isZero()) return t.abs();
						if (t.isZero()) return this.abs();
						var e = this.clone(),
							r = t.clone();
						(e.negative = 0), (r.negative = 0);
						for (var n = 0; e.isEven() && r.isEven(); n++)
							e.iushrn(1), r.iushrn(1);
						for (;;) {
							for (; e.isEven(); ) e.iushrn(1);
							for (; r.isEven(); ) r.iushrn(1);
							var i = e.cmp(r);
							if (i < 0) {
								var s = e;
								(e = r), (r = s);
							} else if (0 === i || 0 === r.cmpn(1)) break;
							e.isub(r);
						}
						return r.iushln(n);
					}),
					(s.prototype.invm = function (t) {
						return this.egcd(t).a.umod(t);
					}),
					(s.prototype.isEven = function () {
						return 0 == (1 & this.words[0]);
					}),
					(s.prototype.isOdd = function () {
						return 1 == (1 & this.words[0]);
					}),
					(s.prototype.andln = function (t) {
						return this.words[0] & t;
					}),
					(s.prototype.bincn = function (t) {
						n("number" == typeof t);
						var e = t % 26,
							r = (t - e) / 26,
							i = 1 << e;
						if (this.length <= r)
							return this._expand(r + 1), (this.words[r] |= i), this;
						for (var s = i, o = r; 0 !== s && o < this.length; o++) {
							var f = 0 | this.words[o];
							(s = (f += s) >>> 26), (f &= 67108863), (this.words[o] = f);
						}
						return 0 !== s && ((this.words[o] = s), this.length++), this;
					}),
					(s.prototype.isZero = function () {
						return 1 === this.length && 0 === this.words[0];
					}),
					(s.prototype.cmpn = function (t) {
						var e,
							r = t < 0;
						if (0 !== this.negative && !r) return -1;
						if (0 === this.negative && r) return 1;
						if ((this.strip(), this.length > 1)) e = 1;
						else {
							r && (t = -t), n(t <= 67108863, "Number is too big");
							var i = 0 | this.words[0];
							e = i === t ? 0 : i < t ? -1 : 1;
						}
						return 0 !== this.negative ? 0 | -e : e;
					}),
					(s.prototype.cmp = function (t) {
						if (0 !== this.negative && 0 === t.negative) return -1;
						if (0 === this.negative && 0 !== t.negative) return 1;
						var e = this.ucmp(t);
						return 0 !== this.negative ? 0 | -e : e;
					}),
					(s.prototype.ucmp = function (t) {
						if (this.length > t.length) return 1;
						if (this.length < t.length) return -1;
						for (var e = 0, r = this.length - 1; r >= 0; r--) {
							var n = 0 | this.words[r],
								i = 0 | t.words[r];
							if (n !== i) {
								n < i ? (e = -1) : n > i && (e = 1);
								break;
							}
						}
						return e;
					}),
					(s.prototype.gtn = function (t) {
						return 1 === this.cmpn(t);
					}),
					(s.prototype.gt = function (t) {
						return 1 === this.cmp(t);
					}),
					(s.prototype.gten = function (t) {
						return this.cmpn(t) >= 0;
					}),
					(s.prototype.gte = function (t) {
						return this.cmp(t) >= 0;
					}),
					(s.prototype.ltn = function (t) {
						return -1 === this.cmpn(t);
					}),
					(s.prototype.lt = function (t) {
						return -1 === this.cmp(t);
					}),
					(s.prototype.lten = function (t) {
						return this.cmpn(t) <= 0;
					}),
					(s.prototype.lte = function (t) {
						return this.cmp(t) <= 0;
					}),
					(s.prototype.eqn = function (t) {
						return 0 === this.cmpn(t);
					}),
					(s.prototype.eq = function (t) {
						return 0 === this.cmp(t);
					}),
					(s.red = function (t) {
						return new w(t);
					}),
					(s.prototype.toRed = function (t) {
						return (
							n(!this.red, "Already a number in reduction context"),
							n(0 === this.negative, "red works only with positives"),
							t.convertTo(this)._forceRed(t)
						);
					}),
					(s.prototype.fromRed = function () {
						return (
							n(
								this.red,
								"fromRed works only with numbers in reduction context"
							),
							this.red.convertFrom(this)
						);
					}),
					(s.prototype._forceRed = function (t) {
						return (this.red = t), this;
					}),
					(s.prototype.forceRed = function (t) {
						return (
							n(!this.red, "Already a number in reduction context"),
							this._forceRed(t)
						);
					}),
					(s.prototype.redAdd = function (t) {
						return (
							n(this.red, "redAdd works only with red numbers"),
							this.red.add(this, t)
						);
					}),
					(s.prototype.redIAdd = function (t) {
						return (
							n(this.red, "redIAdd works only with red numbers"),
							this.red.iadd(this, t)
						);
					}),
					(s.prototype.redSub = function (t) {
						return (
							n(this.red, "redSub works only with red numbers"),
							this.red.sub(this, t)
						);
					}),
					(s.prototype.redISub = function (t) {
						return (
							n(this.red, "redISub works only with red numbers"),
							this.red.isub(this, t)
						);
					}),
					(s.prototype.redShl = function (t) {
						return (
							n(this.red, "redShl works only with red numbers"),
							this.red.shl(this, t)
						);
					}),
					(s.prototype.redMul = function (t) {
						return (
							n(this.red, "redMul works only with red numbers"),
							this.red._verify2(this, t),
							this.red.mul(this, t)
						);
					}),
					(s.prototype.redIMul = function (t) {
						return (
							n(this.red, "redMul works only with red numbers"),
							this.red._verify2(this, t),
							this.red.imul(this, t)
						);
					}),
					(s.prototype.redSqr = function () {
						return (
							n(this.red, "redSqr works only with red numbers"),
							this.red._verify1(this),
							this.red.sqr(this)
						);
					}),
					(s.prototype.redISqr = function () {
						return (
							n(this.red, "redISqr works only with red numbers"),
							this.red._verify1(this),
							this.red.isqr(this)
						);
					}),
					(s.prototype.redSqrt = function () {
						return (
							n(this.red, "redSqrt works only with red numbers"),
							this.red._verify1(this),
							this.red.sqrt(this)
						);
					}),
					(s.prototype.redInvm = function () {
						return (
							n(this.red, "redInvm works only with red numbers"),
							this.red._verify1(this),
							this.red.invm(this)
						);
					}),
					(s.prototype.redNeg = function () {
						return (
							n(this.red, "redNeg works only with red numbers"),
							this.red._verify1(this),
							this.red.neg(this)
						);
					}),
					(s.prototype.redPow = function (t) {
						return (
							n(this.red && !t.red, "redPow(normalNum)"),
							this.red._verify1(this),
							this.red.pow(this, t)
						);
					});
				var m = { k256: null, p224: null, p192: null, p25519: null };
				function g(t, e) {
					(this.name = t),
						(this.p = new s(e, 16)),
						(this.n = this.p.bitLength()),
						(this.k = new s(1).iushln(this.n).isub(this.p)),
						(this.tmp = this._tmp());
				}
				function y() {
					g.call(
						this,
						"k256",
						"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
					);
				}
				function v() {
					g.call(
						this,
						"p224",
						"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
					);
				}
				function _() {
					g.call(
						this,
						"p192",
						"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
					);
				}
				function S() {
					g.call(
						this,
						"25519",
						"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
					);
				}
				function w(t) {
					if ("string" == typeof t) {
						var e = s._prime(t);
						(this.m = e.p), (this.prime = e);
					} else
						n(t.gtn(1), "modulus must be greater than 1"),
							(this.m = t),
							(this.prime = null);
				}
				function I(t) {
					w.call(this, t),
						(this.shift = this.m.bitLength()),
						this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
						(this.r = new s(1).iushln(this.shift)),
						(this.r2 = this.imod(this.r.sqr())),
						(this.rinv = this.r._invmp(this.m)),
						(this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
						(this.minv = this.minv.umod(this.r)),
						(this.minv = this.r.sub(this.minv));
				}
				(g.prototype._tmp = function () {
					var t = new s(null);
					return (t.words = new Array(Math.ceil(this.n / 13))), t;
				}),
					(g.prototype.ireduce = function (t) {
						var e,
							r = t;
						do {
							this.split(r, this.tmp),
								(e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
						} while (e > this.n);
						var n = e < this.n ? -1 : r.ucmp(this.p);
						return (
							0 === n
								? ((r.words[0] = 0), (r.length = 1))
								: n > 0
								? r.isub(this.p)
								: r.strip(),
							r
						);
					}),
					(g.prototype.split = function (t, e) {
						t.iushrn(this.n, 0, e);
					}),
					(g.prototype.imulK = function (t) {
						return t.imul(this.k);
					}),
					i(y, g),
					(y.prototype.split = function (t, e) {
						for (var r = Math.min(t.length, 9), n = 0; n < r; n++)
							e.words[n] = t.words[n];
						if (((e.length = r), t.length <= 9))
							return (t.words[0] = 0), void (t.length = 1);
						var i = t.words[9];
						for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
							var s = 0 | t.words[n];
							(t.words[n - 10] = ((4194303 & s) << 4) | (i >>> 22)), (i = s);
						}
						(i >>>= 22),
							(t.words[n - 10] = i),
							0 === i && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
					}),
					(y.prototype.imulK = function (t) {
						(t.words[t.length] = 0),
							(t.words[t.length + 1] = 0),
							(t.length += 2);
						for (var e = 0, r = 0; r < t.length; r++) {
							var n = 0 | t.words[r];
							(e += 977 * n),
								(t.words[r] = 67108863 & e),
								(e = 64 * n + ((e / 67108864) | 0));
						}
						return (
							0 === t.words[t.length - 1] &&
								(t.length--, 0 === t.words[t.length - 1] && t.length--),
							t
						);
					}),
					i(v, g),
					i(_, g),
					i(S, g),
					(S.prototype.imulK = function (t) {
						for (var e = 0, r = 0; r < t.length; r++) {
							var n = 19 * (0 | t.words[r]) + e,
								i = 67108863 & n;
							(n >>>= 26), (t.words[r] = i), (e = n);
						}
						return 0 !== e && (t.words[t.length++] = e), t;
					}),
					(s._prime = function (t) {
						if (m[t]) return m[t];
						var e;
						if ("k256" === t) e = new y();
						else if ("p224" === t) e = new v();
						else if ("p192" === t) e = new _();
						else {
							if ("p25519" !== t) throw new Error("Unknown prime " + t);
							e = new S();
						}
						return (m[t] = e), e;
					}),
					(w.prototype._verify1 = function (t) {
						n(0 === t.negative, "red works only with positives"),
							n(t.red, "red works only with red numbers");
					}),
					(w.prototype._verify2 = function (t, e) {
						n(0 == (t.negative | e.negative), "red works only with positives"),
							n(t.red && t.red === e.red, "red works only with red numbers");
					}),
					(w.prototype.imod = function (t) {
						return this.prime
							? this.prime.ireduce(t)._forceRed(this)
							: t.umod(this.m)._forceRed(this);
					}),
					(w.prototype.neg = function (t) {
						return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
					}),
					(w.prototype.add = function (t, e) {
						this._verify2(t, e);
						var r = t.add(e);
						return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
					}),
					(w.prototype.iadd = function (t, e) {
						this._verify2(t, e);
						var r = t.iadd(e);
						return r.cmp(this.m) >= 0 && r.isub(this.m), r;
					}),
					(w.prototype.sub = function (t, e) {
						this._verify2(t, e);
						var r = t.sub(e);
						return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
					}),
					(w.prototype.isub = function (t, e) {
						this._verify2(t, e);
						var r = t.isub(e);
						return r.cmpn(0) < 0 && r.iadd(this.m), r;
					}),
					(w.prototype.shl = function (t, e) {
						return this._verify1(t), this.imod(t.ushln(e));
					}),
					(w.prototype.imul = function (t, e) {
						return this._verify2(t, e), this.imod(t.imul(e));
					}),
					(w.prototype.mul = function (t, e) {
						return this._verify2(t, e), this.imod(t.mul(e));
					}),
					(w.prototype.isqr = function (t) {
						return this.imul(t, t.clone());
					}),
					(w.prototype.sqr = function (t) {
						return this.mul(t, t);
					}),
					(w.prototype.sqrt = function (t) {
						if (t.isZero()) return t.clone();
						var e = this.m.andln(3);
						if ((n(e % 2 == 1), 3 === e)) {
							var r = this.m.add(new s(1)).iushrn(2);
							return this.pow(t, r);
						}
						for (
							var i = this.m.subn(1), o = 0;
							!i.isZero() && 0 === i.andln(1);

						)
							o++, i.iushrn(1);
						n(!i.isZero());
						var f = new s(1).toRed(this),
							a = f.redNeg(),
							u = this.m.subn(1).iushrn(1),
							c = this.m.bitLength();
						for (
							c = new s(2 * c * c).toRed(this);
							0 !== this.pow(c, u).cmp(a);

						)
							c.redIAdd(a);
						for (
							var h = this.pow(c, i),
								d = this.pow(t, i.addn(1).iushrn(1)),
								p = this.pow(t, i),
								l = o;
							0 !== p.cmp(f);

						) {
							for (var b = p, m = 0; 0 !== b.cmp(f); m++) b = b.redSqr();
							n(m < l);
							var g = this.pow(h, new s(1).iushln(l - m - 1));
							(d = d.redMul(g)), (h = g.redSqr()), (p = p.redMul(h)), (l = m);
						}
						return d;
					}),
					(w.prototype.invm = function (t) {
						var e = t._invmp(this.m);
						return 0 !== e.negative
							? ((e.negative = 0), this.imod(e).redNeg())
							: this.imod(e);
					}),
					(w.prototype.pow = function (t, e) {
						if (e.isZero()) return new s(1).toRed(this);
						if (0 === e.cmpn(1)) return t.clone();
						var r = new Array(16);
						(r[0] = new s(1).toRed(this)), (r[1] = t);
						for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
						var i = r[0],
							o = 0,
							f = 0,
							a = e.bitLength() % 26;
						for (0 === a && (a = 26), n = e.length - 1; n >= 0; n--) {
							for (var u = e.words[n], c = a - 1; c >= 0; c--) {
								var h = (u >> c) & 1;
								i !== r[0] && (i = this.sqr(i)),
									0 !== h || 0 !== o
										? ((o <<= 1),
										  (o |= h),
										  (4 === ++f || (0 === n && 0 === c)) &&
												((i = this.mul(i, r[o])), (f = 0), (o = 0)))
										: (f = 0);
							}
							a = 26;
						}
						return i;
					}),
					(w.prototype.convertTo = function (t) {
						var e = t.umod(this.m);
						return e === t ? e.clone() : e;
					}),
					(w.prototype.convertFrom = function (t) {
						var e = t.clone();
						return (e.red = null), e;
					}),
					(s.mont = function (t) {
						return new I(t);
					}),
					i(I, w),
					(I.prototype.convertTo = function (t) {
						return this.imod(t.ushln(this.shift));
					}),
					(I.prototype.convertFrom = function (t) {
						var e = this.imod(t.mul(this.rinv));
						return (e.red = null), e;
					}),
					(I.prototype.imul = function (t, e) {
						if (t.isZero() || e.isZero())
							return (t.words[0] = 0), (t.length = 1), t;
						var r = t.imul(e),
							n = r
								.maskn(this.shift)
								.mul(this.minv)
								.imaskn(this.shift)
								.mul(this.m),
							i = r.isub(n).iushrn(this.shift),
							s = i;
						return (
							i.cmp(this.m) >= 0
								? (s = i.isub(this.m))
								: i.cmpn(0) < 0 && (s = i.iadd(this.m)),
							s._forceRed(this)
						);
					}),
					(I.prototype.mul = function (t, e) {
						if (t.isZero() || e.isZero()) return new s(0)._forceRed(this);
						var r = t.mul(e),
							n = r
								.maskn(this.shift)
								.mul(this.minv)
								.imaskn(this.shift)
								.mul(this.m),
							i = r.isub(n).iushrn(this.shift),
							o = i;
						return (
							i.cmp(this.m) >= 0
								? (o = i.isub(this.m))
								: i.cmpn(0) < 0 && (o = i.iadd(this.m)),
							o._forceRed(this)
						);
					}),
					(I.prototype.invm = function (t) {
						return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
					});
			})(t, this);
		}.call(this, r(59)(t)));
	},
	function (t, e, r) {
		"use strict";
		var n = r(1);
		function i(t, e) {
			return t.replace("{0}", e[0]).replace("{1}", e[1]).replace("{2}", e[2]);
		}
		var s = function (t, e) {
				var r = function () {
					if (n.isString(e.message)) this.message = i(e.message, arguments);
					else {
						if (!n.isFunction(e.message))
							throw new Error("Invalid error definition for " + e.name);
						this.message = e.message.apply(null, arguments);
					}
					this.stack = this.message + "\n" + new Error().stack;
				};
				return (
					((r.prototype = Object.create(t.prototype)).name =
						t.prototype.name + e.name),
					(t[e.name] = r),
					e.errors && o(r, e.errors),
					r
				);
			},
			o = function (t, e) {
				n.each(e, function (e) {
					s(t, e);
				});
			},
			f = {
				Error: function () {
					(this.message = "Internal error"),
						(this.stack = this.message + "\n" + new Error().stack);
				},
			};
		(f.Error.prototype = Object.create(Error.prototype)),
			(f.Error.prototype.name = "bsv.Error");
		var a,
			u = r(61);
		(a = f.Error),
			o(a, u),
			(t.exports = f.Error),
			(t.exports.extend = function (t) {
				return s(f.Error, t);
			});
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(3),
				i = r(1),
				s = r(2),
				o = r(4),
				f = function t(e, r) {
					if (!(this instanceof t)) return new t(e, r);
					if (e instanceof n) this.set({ r: e, s: r });
					else if (e) {
						var i = e;
						this.set(i);
					}
				};
			(f.prototype.set = function (t) {
				return (
					(this.r = t.r || this.r || void 0),
					(this.s = t.s || this.s || void 0),
					(this.i = void 0 !== t.i ? t.i : this.i),
					(this.compressed =
						void 0 !== t.compressed ? t.compressed : this.compressed),
					(this.nhashtype = t.nhashtype || this.nhashtype || void 0),
					this
				);
			}),
				(f.fromCompact = function (t) {
					s.checkArgument(e.isBuffer(t), "Argument is expected to be a Buffer");
					var r = new f(),
						i = !0,
						o = t.slice(0, 1)[0] - 27 - 4;
					o < 0 && ((i = !1), (o += 4));
					var a = t.slice(1, 33),
						u = t.slice(33, 65);
					return (
						s.checkArgument(
							0 === o || 1 === o || 2 === o || 3 === o,
							new Error("i must be 0, 1, 2, or 3")
						),
						s.checkArgument(32 === a.length, new Error("r must be 32 bytes")),
						s.checkArgument(32 === u.length, new Error("s must be 32 bytes")),
						(r.compressed = i),
						(r.i = o),
						(r.r = n.fromBuffer(a)),
						(r.s = n.fromBuffer(u)),
						r
					);
				}),
				(f.fromDER = f.fromBuffer =
					function (t, e) {
						var r = f.parseDER(t, e),
							n = new f();
						return (n.r = r.r), (n.s = r.s), n;
					}),
				(f.fromTxFormat = function (t) {
					var e = t.readUInt8(t.length - 1),
						r = t.slice(0, t.length - 1),
						n = f.fromDER(r, !1);
					return (n.nhashtype = e), n;
				}),
				(f.fromString = function (t) {
					var r = e.from(t, "hex");
					return f.fromDER(r);
				}),
				(f.parseDER = function (t, r) {
					s.checkArgument(
						e.isBuffer(t),
						new Error("DER formatted signature should be a buffer")
					),
						i.isUndefined(r) && (r = !0);
					var o = t[0];
					s.checkArgument(48 === o, new Error("Header byte should be 0x30"));
					var f = t[1],
						a = t.slice(2).length;
					s.checkArgument(
						!r || f === a,
						new Error("Length byte should length of what follows")
					),
						(f = f < a ? f : a);
					var u = t[2];
					s.checkArgument(
						2 === u,
						new Error("Integer byte for r should be 0x02")
					);
					var c = t[3],
						h = t.slice(4, 4 + c),
						d = n.fromBuffer(h),
						p = 0 === t[4];
					s.checkArgument(c === h.length, new Error("Length of r incorrect"));
					var l = t[4 + c + 0];
					s.checkArgument(
						2 === l,
						new Error("Integer byte for s should be 0x02")
					);
					var b = t[4 + c + 1],
						m = t.slice(4 + c + 2, 4 + c + 2 + b),
						g = n.fromBuffer(m),
						y = 0 === t[4 + c + 2 + 2];
					s.checkArgument(b === m.length, new Error("Length of s incorrect"));
					var v = 4 + c + 2 + b;
					return (
						s.checkArgument(
							f === v - 2,
							new Error("Length of signature incorrect")
						),
						{
							header: o,
							length: f,
							rheader: u,
							rlength: c,
							rneg: p,
							rbuf: h,
							r: d,
							sheader: l,
							slength: b,
							sneg: y,
							sbuf: m,
							s: g,
						}
					);
				}),
				(f.prototype.toCompact = function (t, r) {
					if (
						((t = "number" == typeof t ? t : this.i),
						(r = "boolean" == typeof r ? r : this.compressed),
						0 !== t && 1 !== t && 2 !== t && 3 !== t)
					)
						throw new Error("i must be equal to 0, 1, 2, or 3");
					var n = t + 27 + 4;
					!1 === r && (n -= 4);
					var i = e.from([n]),
						s = this.r.toBuffer({ size: 32 }),
						o = this.s.toBuffer({ size: 32 });
					return e.concat([i, s, o]);
				}),
				(f.prototype.toBuffer = f.prototype.toDER =
					function () {
						var t = this.r.toBuffer(),
							r = this.s.toBuffer(),
							n = !!(128 & t[0]),
							i = !!(128 & r[0]),
							s = n ? e.concat([e.from([0]), t]) : t,
							o = i ? e.concat([e.from([0]), r]) : r,
							f = s.length,
							a = o.length,
							u = 2 + f + 2 + a;
						return e.concat([e.from([48, u, 2, f]), s, e.from([2, a]), o]);
					}),
				(f.prototype.toString = function () {
					return this.toDER().toString("hex");
				}),
				(f.isTxDER = function (t) {
					if (t.length < 9) return !1;
					if (t.length > 73) return !1;
					if (48 !== t[0]) return !1;
					if (t[1] !== t.length - 3) return !1;
					var e = t[3];
					if (5 + e >= t.length) return !1;
					var r = t[5 + e];
					if (e + r + 7 !== t.length) return !1;
					var n = t.slice(4);
					if (2 !== t[2]) return !1;
					if (0 === e) return !1;
					if (128 & n[0]) return !1;
					if (e > 1 && 0 === n[0] && !(128 & n[1])) return !1;
					var i = t.slice(6 + e);
					return (
						2 === t[6 + e - 2] &&
						0 !== r &&
						!(128 & i[0]) &&
						!(r > 1 && 0 === i[0] && !(128 & i[1]))
					);
				}),
				(f.prototype.hasLowS = function () {
					return (
						!this.s.lt(new n(1)) &&
						!this.s.gt(
							new n(
								"7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0",
								"hex"
							)
						)
					);
				}),
				(f.prototype.hasDefinedHashtype = function () {
					if (!o.isNaturalNumber(this.nhashtype)) return !1;
					var t = 31 & this.nhashtype;
					return !(t < f.SIGHASH_ALL || t > f.SIGHASH_SINGLE);
				}),
				(f.prototype.toTxFormat = function () {
					var t = this.toDER(),
						r = e.alloc(1);
					return r.writeUInt8(this.nhashtype, 0), e.concat([t, r]);
				}),
				(f.SIGHASH_ALL = 1),
				(f.SIGHASH_NONE = 2),
				(f.SIGHASH_SINGLE = 3),
				(f.SIGHASH_FORKID = 64),
				(f.SIGHASH_ANYONECANPAY = 128),
				(t.exports = f);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		(t.exports = r(46)), (t.exports.Interpreter = r(47));
	},
	function (t, e) {
		"function" == typeof Object.create
			? (t.exports = function (t, e) {
					(t.super_ = e),
						(t.prototype = Object.create(e.prototype, {
							constructor: {
								value: t,
								enumerable: !1,
								writable: !0,
								configurable: !0,
							},
						}));
			  })
			: (t.exports = function (t, e) {
					t.super_ = e;
					var r = function () {};
					(r.prototype = e.prototype),
						(t.prototype = new r()),
						(t.prototype.constructor = t);
			  });
	},
	function (t, e, r) {
		"use strict";
		var n = r(18),
			i = r(11);
		function s(t, e) {
			return (
				55296 == (64512 & t.charCodeAt(e)) &&
				!(e < 0 || e + 1 >= t.length) &&
				56320 == (64512 & t.charCodeAt(e + 1))
			);
		}
		function o(t) {
			return (
				((t >>> 24) |
					((t >>> 8) & 65280) |
					((t << 8) & 16711680) |
					((255 & t) << 24)) >>>
				0
			);
		}
		function f(t) {
			return 1 === t.length ? "0" + t : t;
		}
		function a(t) {
			return 7 === t.length
				? "0" + t
				: 6 === t.length
				? "00" + t
				: 5 === t.length
				? "000" + t
				: 4 === t.length
				? "0000" + t
				: 3 === t.length
				? "00000" + t
				: 2 === t.length
				? "000000" + t
				: 1 === t.length
				? "0000000" + t
				: t;
		}
		(e.inherits = i),
			(e.toArray = function (t, e) {
				if (Array.isArray(t)) return t.slice();
				if (!t) return [];
				var r = [];
				if ("string" == typeof t)
					if (e) {
						if ("hex" === e)
							for (
								(t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
									(t = "0" + t),
									i = 0;
								i < t.length;
								i += 2
							)
								r.push(parseInt(t[i] + t[i + 1], 16));
					} else
						for (var n = 0, i = 0; i < t.length; i++) {
							var o = t.charCodeAt(i);
							o < 128
								? (r[n++] = o)
								: o < 2048
								? ((r[n++] = (o >> 6) | 192), (r[n++] = (63 & o) | 128))
								: s(t, i)
								? ((o =
										65536 + ((1023 & o) << 10) + (1023 & t.charCodeAt(++i))),
								  (r[n++] = (o >> 18) | 240),
								  (r[n++] = ((o >> 12) & 63) | 128),
								  (r[n++] = ((o >> 6) & 63) | 128),
								  (r[n++] = (63 & o) | 128))
								: ((r[n++] = (o >> 12) | 224),
								  (r[n++] = ((o >> 6) & 63) | 128),
								  (r[n++] = (63 & o) | 128));
						}
				else for (i = 0; i < t.length; i++) r[i] = 0 | t[i];
				return r;
			}),
			(e.toHex = function (t) {
				for (var e = "", r = 0; r < t.length; r++) e += f(t[r].toString(16));
				return e;
			}),
			(e.htonl = o),
			(e.toHex32 = function (t, e) {
				for (var r = "", n = 0; n < t.length; n++) {
					var i = t[n];
					"little" === e && (i = o(i)), (r += a(i.toString(16)));
				}
				return r;
			}),
			(e.zero2 = f),
			(e.zero8 = a),
			(e.join32 = function (t, e, r, i) {
				var s = r - e;
				n(s % 4 == 0);
				for (
					var o = new Array(s / 4), f = 0, a = e;
					f < o.length;
					f++, a += 4
				) {
					var u;
					(u =
						"big" === i
							? (t[a] << 24) | (t[a + 1] << 16) | (t[a + 2] << 8) | t[a + 3]
							: (t[a + 3] << 24) | (t[a + 2] << 16) | (t[a + 1] << 8) | t[a]),
						(o[f] = u >>> 0);
				}
				return o;
			}),
			(e.split32 = function (t, e) {
				for (
					var r = new Array(4 * t.length), n = 0, i = 0;
					n < t.length;
					n++, i += 4
				) {
					var s = t[n];
					"big" === e
						? ((r[i] = s >>> 24),
						  (r[i + 1] = (s >>> 16) & 255),
						  (r[i + 2] = (s >>> 8) & 255),
						  (r[i + 3] = 255 & s))
						: ((r[i + 3] = s >>> 24),
						  (r[i + 2] = (s >>> 16) & 255),
						  (r[i + 1] = (s >>> 8) & 255),
						  (r[i] = 255 & s));
				}
				return r;
			}),
			(e.rotr32 = function (t, e) {
				return (t >>> e) | (t << (32 - e));
			}),
			(e.rotl32 = function (t, e) {
				return (t << e) | (t >>> (32 - e));
			}),
			(e.sum32 = function (t, e) {
				return (t + e) >>> 0;
			}),
			(e.sum32_3 = function (t, e, r) {
				return (t + e + r) >>> 0;
			}),
			(e.sum32_4 = function (t, e, r, n) {
				return (t + e + r + n) >>> 0;
			}),
			(e.sum32_5 = function (t, e, r, n, i) {
				return (t + e + r + n + i) >>> 0;
			}),
			(e.sum64 = function (t, e, r, n) {
				var i = t[e],
					s = (n + t[e + 1]) >>> 0,
					o = (s < n ? 1 : 0) + r + i;
				(t[e] = o >>> 0), (t[e + 1] = s);
			}),
			(e.sum64_hi = function (t, e, r, n) {
				return (((e + n) >>> 0 < e ? 1 : 0) + t + r) >>> 0;
			}),
			(e.sum64_lo = function (t, e, r, n) {
				return (e + n) >>> 0;
			}),
			(e.sum64_4_hi = function (t, e, r, n, i, s, o, f) {
				var a = 0,
					u = e;
				return (
					(a += (u = (u + n) >>> 0) < e ? 1 : 0),
					(a += (u = (u + s) >>> 0) < s ? 1 : 0),
					(t + r + i + o + (a += (u = (u + f) >>> 0) < f ? 1 : 0)) >>> 0
				);
			}),
			(e.sum64_4_lo = function (t, e, r, n, i, s, o, f) {
				return (e + n + s + f) >>> 0;
			}),
			(e.sum64_5_hi = function (t, e, r, n, i, s, o, f, a, u) {
				var c = 0,
					h = e;
				return (
					(c += (h = (h + n) >>> 0) < e ? 1 : 0),
					(c += (h = (h + s) >>> 0) < s ? 1 : 0),
					(c += (h = (h + f) >>> 0) < f ? 1 : 0),
					(t + r + i + o + a + (c += (h = (h + u) >>> 0) < u ? 1 : 0)) >>> 0
				);
			}),
			(e.sum64_5_lo = function (t, e, r, n, i, s, o, f, a, u) {
				return (e + n + s + f + u) >>> 0;
			}),
			(e.rotr64_hi = function (t, e, r) {
				return ((e << (32 - r)) | (t >>> r)) >>> 0;
			}),
			(e.rotr64_lo = function (t, e, r) {
				return ((t << (32 - r)) | (e >>> r)) >>> 0;
			}),
			(e.shr64_hi = function (t, e, r) {
				return t >>> r;
			}),
			(e.shr64_lo = function (t, e, r) {
				return ((t << (32 - r)) | (e >>> r)) >>> 0;
			});
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(3),
				i = r(20),
				s = r(5),
				o = r(4),
				f = r(19),
				a = r(1),
				u = r(2);
			function c(t, e) {
				if (!(this instanceof c)) return new c(t, e);
				if (
					(u.checkArgument(
						t,
						"First argument is required, please include public key data."
					),
					t instanceof c)
				)
					return t;
				e = e || {};
				var r = this._classifyArgs(t, e);
				return (
					r.point.validate(),
					o.defineImmutable(this, {
						point: r.point,
						compressed: r.compressed,
						network: r.network || f.defaultNetwork,
					}),
					this
				);
			}
			(c.prototype._classifyArgs = function (t, r) {
				var n = { compressed: a.isUndefined(r.compressed) || r.compressed };
				if (t instanceof i) n.point = t;
				else if (t.x && t.y) n = c._transformObject(t);
				else if ("string" == typeof t) n = c._transformDER(e.from(t, "hex"));
				else if (c._isBuffer(t)) n = c._transformDER(t);
				else {
					if (!c._isPrivateKey(t))
						throw new TypeError(
							"First argument is an unrecognized data format."
						);
					n = c._transformPrivateKey(t);
				}
				return (
					n.network ||
						(n.network = a.isUndefined(r.network) ? void 0 : f.get(r.network)),
					n
				);
			}),
				(c._isPrivateKey = function (t) {
					return t instanceof r(29);
				}),
				(c._isBuffer = function (t) {
					return t instanceof e || t instanceof Uint8Array;
				}),
				(c._transformPrivateKey = function (t) {
					u.checkArgument(
						c._isPrivateKey(t),
						"Must be an instance of PrivateKey"
					);
					var e = {};
					return (
						(e.point = i.getG().mul(t.bn)),
						(e.compressed = t.compressed),
						(e.network = t.network),
						e
					);
				}),
				(c._transformDER = function (t, e) {
					u.checkArgument(
						c._isBuffer(t),
						"Must be a buffer of DER encoded public key"
					);
					var r,
						s,
						o,
						f,
						h = {};
					if (
						((e = !!a.isUndefined(e) || e),
						4 !== t[0] && (e || (6 !== t[0] && 7 !== t[0])))
					)
						if (3 === t[0])
							(o = t.slice(1)),
								(r = new n(o)),
								((h = c._transformX(!0, r)).compressed = !0);
						else {
							if (2 !== t[0])
								throw new TypeError("Invalid DER format public key");
							(o = t.slice(1)),
								(r = new n(o)),
								((h = c._transformX(!1, r)).compressed = !0);
						}
					else {
						if (
							((o = t.slice(1, 33)),
							(f = t.slice(33, 65)),
							32 !== o.length || 32 !== f.length || 65 !== t.length)
						)
							throw new TypeError("Length of x and y must be 32 bytes");
						(r = new n(o)),
							(s = new n(f)),
							(h.point = new i(r, s)),
							(h.compressed = !1);
					}
					return h;
				}),
				(c._transformX = function (t, e) {
					u.checkArgument(
						"boolean" == typeof t,
						"Must specify whether y is odd or not (true or false)"
					);
					var r = {};
					return (r.point = i.fromX(t, e)), r;
				}),
				(c._transformObject = function (t) {
					var e = new n(t.x, "hex"),
						r = new n(t.y, "hex");
					return new c(new i(e, r), { compressed: t.compressed });
				}),
				(c.fromPrivateKey = function (t) {
					u.checkArgument(
						c._isPrivateKey(t),
						"Must be an instance of PrivateKey"
					);
					var e = c._transformPrivateKey(t);
					return new c(e.point, {
						compressed: e.compressed,
						network: e.network,
					});
				}),
				(c.fromDER = c.fromBuffer =
					function (t, e) {
						u.checkArgument(
							c._isBuffer(t),
							"Must be a buffer of DER encoded public key"
						);
						var r = c._transformDER(t, e);
						return new c(r.point, { compressed: r.compressed });
					}),
				(c.fromPoint = function (t, e) {
					return (
						u.checkArgument(
							t instanceof i,
							"First argument must be an instance of Point."
						),
						new c(t, { compressed: e })
					);
				}),
				(c.fromHex = c.fromString =
					function (t, r) {
						var n = e.from(t, r || "hex"),
							i = c._transformDER(n);
						return new c(i.point, { compressed: i.compressed });
					}),
				(c.fromX = function (t, e) {
					var r = c._transformX(t, e);
					return new c(r.point, { compressed: r.compressed });
				}),
				(c.getValidationError = function (t) {
					var e;
					try {
						new c(t);
					} catch (t) {
						e = t;
					}
					return e;
				}),
				(c.isValid = function (t) {
					return !c.getValidationError(t);
				}),
				(c.prototype.toObject = c.prototype.toJSON =
					function () {
						return {
							x: this.point.getX().toString("hex", 2),
							y: this.point.getY().toString("hex", 2),
							compressed: this.compressed,
						};
					}),
				(c.prototype.toBuffer = c.prototype.toDER =
					function () {
						var t,
							r = this.point.getX(),
							n = this.point.getY(),
							i = r.toBuffer({ size: 32 }),
							s = n.toBuffer({ size: 32 });
						return this.compressed
							? ((t = s[s.length - 1] % 2 ? e.from([3]) : e.from([2])),
							  e.concat([t, i]))
							: ((t = e.from([4])), e.concat([t, i, s]));
					}),
				(c.prototype._getID = function () {
					return s.sha256ripemd160(this.toBuffer());
				}),
				(c.prototype.toAddress = function (t) {
					return r(21).fromPublicKey(this, t || this.network);
				}),
				(c.prototype.toString = c.prototype.toHex =
					function () {
						return this.toDER().toString("hex");
					}),
				(c.prototype.inspect = function () {
					return (
						"<PublicKey: " +
						this.toHex() +
						(this.compressed ? "" : ", uncompressed") +
						">"
					);
				}),
				(t.exports = c);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(37),
				i = function t(e) {
					if (!(this instanceof t)) return new t(e);
					(this.bufLen = 0), e ? this.set(e) : (this.bufs = []);
				};
			(i.prototype.set = function (t) {
				return (
					(this.bufs = t.bufs || this.bufs || []),
					(this.bufLen = this.bufs.reduce(function (t, e) {
						return t + e.length;
					}, 0)),
					this
				);
			}),
				(i.prototype.toBuffer = function () {
					return this.concat();
				}),
				(i.prototype.concat = function () {
					return e.concat(this.bufs, this.bufLen);
				}),
				(i.prototype.write = function (t) {
					return (
						n(e.isBuffer(t)), this.bufs.push(t), (this.bufLen += t.length), this
					);
				}),
				(i.prototype.writeReverse = function (t) {
					return (
						n(e.isBuffer(t)),
						this.bufs.push(e.from(t).reverse()),
						(this.bufLen += t.length),
						this
					);
				}),
				(i.prototype.writeUInt8 = function (t) {
					var r = e.alloc(1);
					return r.writeUInt8(t, 0), this.write(r), this;
				}),
				(i.prototype.writeUInt16BE = function (t) {
					var r = e.alloc(2);
					return r.writeUInt16BE(t, 0), this.write(r), this;
				}),
				(i.prototype.writeUInt16LE = function (t) {
					var r = e.alloc(2);
					return r.writeUInt16LE(t, 0), this.write(r), this;
				}),
				(i.prototype.writeUInt32BE = function (t) {
					var r = e.alloc(4);
					return r.writeUInt32BE(t, 0), this.write(r), this;
				}),
				(i.prototype.writeInt32LE = function (t) {
					var r = e.alloc(4);
					return r.writeInt32LE(t, 0), this.write(r), this;
				}),
				(i.prototype.writeUInt32LE = function (t) {
					var r = e.alloc(4);
					return r.writeUInt32LE(t, 0), this.write(r), this;
				}),
				(i.prototype.writeUInt64BEBN = function (t) {
					var e = t.toBuffer({ size: 8 });
					return this.write(e), this;
				}),
				(i.prototype.writeUInt64LEBN = function (t) {
					var e = t.toBuffer({ size: 8 });
					return this.writeReverse(e), this;
				}),
				(i.prototype.writeVarintNum = function (t) {
					var e = i.varintBufNum(t);
					return this.write(e), this;
				}),
				(i.prototype.writeVarintBN = function (t) {
					var e = i.varintBufBN(t);
					return this.write(e), this;
				}),
				(i.varintBufNum = function (t) {
					var r;
					return (
						t < 253
							? (r = e.alloc(1)).writeUInt8(t, 0)
							: t < 65536
							? ((r = e.alloc(3)).writeUInt8(253, 0), r.writeUInt16LE(t, 1))
							: t < 4294967296
							? ((r = e.alloc(5)).writeUInt8(254, 0), r.writeUInt32LE(t, 1))
							: ((r = e.alloc(9)).writeUInt8(255, 0),
							  r.writeInt32LE(-1 & t, 1),
							  r.writeUInt32LE(Math.floor(t / 4294967296), 5)),
						r
					);
				}),
				(i.varintBufBN = function (t) {
					var r,
						n = t.toNumber();
					if (n < 253) (r = e.alloc(1)).writeUInt8(n, 0);
					else if (n < 65536)
						(r = e.alloc(3)).writeUInt8(253, 0), r.writeUInt16LE(n, 1);
					else if (n < 4294967296)
						(r = e.alloc(5)).writeUInt8(254, 0), r.writeUInt32LE(n, 1);
					else {
						var s = new i();
						s.writeUInt8(255), s.writeUInt64LEBN(t), (r = s.concat());
					}
					return r;
				}),
				(t.exports = i);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(3),
				o = function t(r) {
					if (!(this instanceof t)) return new t(r);
					if (!n.isUndefined(r))
						if (e.isBuffer(r)) this.set({ buf: r });
						else if (n.isString(r)) {
							var i = e.from(r, "hex");
							if (2 * i.length !== r.length)
								throw new TypeError("Invalid hex string");
							this.set({ buf: i });
						} else {
							if (!n.isObject(r))
								throw new TypeError("Unrecognized argument for BufferReader");
							var s = r;
							this.set(s);
						}
				};
			(o.prototype.set = function (t) {
				return (
					(this.buf = t.buf || this.buf || void 0),
					(this.pos = t.pos || this.pos || 0),
					this
				);
			}),
				(o.prototype.eof = function () {
					return this.pos >= this.buf.length;
				}),
				(o.prototype.finished = o.prototype.eof),
				(o.prototype.read = function (t) {
					i.checkArgument(!n.isUndefined(t), "Must specify a length");
					var e = this.buf.slice(this.pos, this.pos + t);
					return (this.pos = this.pos + t), e;
				}),
				(o.prototype.readAll = function () {
					var t = this.buf.slice(this.pos, this.buf.length);
					return (this.pos = this.buf.length), t;
				}),
				(o.prototype.readUInt8 = function () {
					var t = this.buf.readUInt8(this.pos);
					return (this.pos = this.pos + 1), t;
				}),
				(o.prototype.readUInt16BE = function () {
					var t = this.buf.readUInt16BE(this.pos);
					return (this.pos = this.pos + 2), t;
				}),
				(o.prototype.readUInt16LE = function () {
					var t = this.buf.readUInt16LE(this.pos);
					return (this.pos = this.pos + 2), t;
				}),
				(o.prototype.readUInt32BE = function () {
					var t = this.buf.readUInt32BE(this.pos);
					return (this.pos = this.pos + 4), t;
				}),
				(o.prototype.readUInt32LE = function () {
					var t = this.buf.readUInt32LE(this.pos);
					return (this.pos = this.pos + 4), t;
				}),
				(o.prototype.readInt32LE = function () {
					var t = this.buf.readInt32LE(this.pos);
					return (this.pos = this.pos + 4), t;
				}),
				(o.prototype.readUInt64BEBN = function () {
					var t = this.buf.slice(this.pos, this.pos + 8),
						e = s.fromBuffer(t);
					return (this.pos = this.pos + 8), e;
				}),
				(o.prototype.readUInt64LEBN = function () {
					var t,
						e = this.buf.readUInt32LE(this.pos),
						r = 4294967296 * this.buf.readUInt32LE(this.pos + 4) + e;
					if (r <= 9007199254740991) t = new s(r);
					else {
						var n = Array.prototype.slice.call(
							this.buf,
							this.pos,
							this.pos + 8
						);
						t = new s(n, 10, "le");
					}
					return (this.pos = this.pos + 8), t;
				}),
				(o.prototype.readVarintNum = function () {
					var t = this.readUInt8();
					switch (t) {
						case 253:
							return this.readUInt16LE();
						case 254:
							return this.readUInt32LE();
						case 255:
							var e = this.readUInt64LEBN().toNumber();
							if (e <= Math.pow(2, 53)) return e;
							throw new Error(
								"number too large to retain precision - use readVarintBN"
							);
						default:
							return t;
					}
				}),
				(o.prototype.readVarLengthBuffer = function () {
					var t = this.readVarintNum(),
						e = this.read(t);
					return (
						i.checkState(
							e.length === t,
							"Invalid length while reading varlength buffer. Expected to read: " +
								t +
								" and read " +
								e.length
						),
						e
					);
				}),
				(o.prototype.readVarintBuf = function () {
					switch (this.buf.readUInt8(this.pos)) {
						case 253:
							return this.read(3);
						case 254:
							return this.read(5);
						case 255:
							return this.read(9);
						default:
							return this.read(1);
					}
				}),
				(o.prototype.readVarintBN = function () {
					var t = this.readUInt8();
					switch (t) {
						case 253:
							return new s(this.readUInt16LE());
						case 254:
							return new s(this.readUInt32LE());
						case 255:
							return this.readUInt64LEBN();
						default:
							return new s(t);
					}
				}),
				(o.prototype.reverse = function () {
					for (var t = e.alloc(this.buf.length), r = 0; r < t.length; r++)
						t[r] = this.buf[this.buf.length - 1 - r];
					return (this.buf = t), this;
				}),
				(o.prototype.readReverse = function (t) {
					n.isUndefined(t) && (t = this.buf.length);
					var r = this.buf.slice(this.pos, this.pos + t);
					return (this.pos = this.pos + t), e.from(r).reverse();
				}),
				(t.exports = o);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(0),
				i = r(9),
				s = r(10),
				o = r(17),
				f = r(15),
				a = r(14),
				u = r(3),
				c = r(5),
				h = r(40),
				d = r(2),
				p = r(47),
				l = r(1),
				b = p.SCRIPT_ENABLE_SIGHASH_FORKID,
				m = function (t, h, m, g, y, v) {
					var _ = r(49),
						S = r(39);
					l.isUndefined(v) && (v = b);
					var w,
						I = _.shallowCopy(t);
					((g = new s(g)), v & p.SCRIPT_ENABLE_REPLAY_PROTECTION) &&
						(h = ((16711680 | (57005 ^ (h >> 8))) << 8) | (255 & h));
					if (h & i.SIGHASH_FORKID && v & p.SCRIPT_ENABLE_SIGHASH_FORKID)
						return (function (t, r, n, s, o) {
							var h = t.inputs[n];
							function p(t, e) {
								var r = new a();
								l.isUndefined(e)
									? l.each(t.outputs, function (t) {
											t.toBufferWriter(r);
									  })
									: t.outputs[e].toBufferWriter(r);
								var n = r.toBuffer();
								return c.sha256sha256(n);
							}
							d.checkArgument(
								o instanceof u,
								"For ForkId=0 signatures, satoshis or complete input must be provided"
							);
							var b = e.alloc(32),
								m = e.alloc(32),
								g = e.alloc(32);
							r & i.SIGHASH_ANYONECANPAY ||
								(b = (function (t) {
									var e = new a();
									l.each(t.inputs, function (t) {
										e.writeReverse(t.prevTxId), e.writeUInt32LE(t.outputIndex);
									});
									var r = e.toBuffer();
									return c.sha256sha256(r);
								})(t)),
								r & i.SIGHASH_ANYONECANPAY ||
									(31 & r) === i.SIGHASH_SINGLE ||
									(31 & r) === i.SIGHASH_NONE ||
									(m = (function (t) {
										var e = new a();
										l.each(t.inputs, function (t) {
											e.writeUInt32LE(t.sequenceNumber);
										});
										var r = e.toBuffer();
										return c.sha256sha256(r);
									})(t)),
								(31 & r) !== i.SIGHASH_SINGLE && (31 & r) !== i.SIGHASH_NONE
									? (g = p(t))
									: (31 & r) === i.SIGHASH_SINGLE &&
									  n < t.outputs.length &&
									  (g = p(t, n));
							var y = new a();
							y.writeInt32LE(t.version),
								y.write(b),
								y.write(m),
								y.writeReverse(h.prevTxId),
								y.writeUInt32LE(h.outputIndex),
								y.writeVarintNum(s.toBuffer().length),
								y.write(s.toBuffer()),
								y.writeUInt64LEBN(o);
							var v = h.sequenceNumber;
							y.writeUInt32LE(v),
								y.write(g),
								y.writeUInt32LE(t.nLockTime),
								y.writeUInt32LE(r >>> 0);
							var _ = y.toBuffer(),
								S = c.sha256sha256(_);
							return (S = new f(S).readReverse());
						})(I, h, m, g, y);
					for (g.removeCodeseparators(), w = 0; w < I.inputs.length; w++)
						I.inputs[w] = new S(I.inputs[w]).setScript(s.empty());
					if (
						((I.inputs[m] = new S(I.inputs[m]).setScript(g)),
						(31 & h) === i.SIGHASH_NONE || (31 & h) === i.SIGHASH_SINGLE)
					)
						for (w = 0; w < I.inputs.length; w++)
							w !== m && (I.inputs[w].sequenceNumber = 0);
					if ((31 & h) === i.SIGHASH_NONE) I.outputs = [];
					else if ((31 & h) === i.SIGHASH_SINGLE) {
						if (m >= I.outputs.length)
							return e.from(
								"0000000000000000000000000000000000000000000000000000000000000001",
								"hex"
							);
						for (I.outputs.length = m + 1, w = 0; w < m; w++)
							I.outputs[w] = new o({
								satoshis: u.fromBuffer(
									n.Buffer.from("ffffffffffffffff", "hex")
								),
								script: s.empty(),
							});
					}
					h & i.SIGHASH_ANYONECANPAY && (I.inputs = [I.inputs[m]]);
					var A = new a().write(I.toBuffer()).writeInt32LE(h).toBuffer(),
						E = c.sha256sha256(A);
					return (E = new f(E).readReverse());
				};
			t.exports = {
				sighash: m,
				sign: function (t, e, r, n, i, s, o) {
					var f = m(t, r, n, i, s, o);
					return h.sign(f, e, "little").set({ nhashtype: r });
				},
				verify: function (t, e, r, n, i, s, o) {
					d.checkArgument(!l.isUndefined(t)),
						d.checkArgument(!l.isUndefined(e) && !l.isUndefined(e.nhashtype));
					var f = m(t, e.nhashtype, n, i, s, o);
					return h.verify(f, e, r, "little");
				},
			};
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(3),
				s = r(0),
				o = r(4),
				f = r(14),
				a = r(24),
				u = r(10),
				c = r(2),
				h = r(8);
			function d(t) {
				if (!(this instanceof d)) return new d(t);
				if (!n.isObject(t))
					throw new TypeError("Unrecognized argument for Output");
				var r;
				(this.satoshis = t.satoshis),
					e.isBuffer(t.script)
						? (this._scriptBuffer = t.script)
						: ((r =
								n.isString(t.script) && o.isHexa(t.script)
									? s.Buffer.from(t.script, "hex")
									: t.script),
						  this.setScript(r));
			}
			Object.defineProperty(d.prototype, "script", {
				configurable: !1,
				enumerable: !0,
				get: function () {
					return this._script
						? this._script
						: (this.setScriptFromBuffer(this._scriptBuffer), this._script);
				},
			}),
				Object.defineProperty(d.prototype, "satoshis", {
					configurable: !1,
					enumerable: !0,
					get: function () {
						return this._satoshis;
					},
					set: function (t) {
						t instanceof i
							? ((this._satoshisBN = t), (this._satoshis = t.toNumber()))
							: n.isString(t)
							? ((this._satoshis = parseInt(t)),
							  (this._satoshisBN = i.fromNumber(this._satoshis)))
							: (c.checkArgument(
									o.isNaturalNumber(t),
									"Output satoshis is not a natural number"
							  ),
							  (this._satoshisBN = i.fromNumber(t)),
							  (this._satoshis = t)),
							c.checkState(
								o.isNaturalNumber(this._satoshis),
								"Output satoshis is not a natural number"
							);
					},
				}),
				(d.prototype.invalidSatoshis = function () {
					return this._satoshis > 9007199254740991
						? "transaction txout satoshis greater than max safe integer"
						: this._satoshis !== this._satoshisBN.toNumber()
						? "transaction txout satoshis has corrupted value"
						: this._satoshis < 0 && "transaction txout negative";
				}),
				Object.defineProperty(d.prototype, "satoshisBN", {
					configurable: !1,
					enumerable: !0,
					get: function () {
						return this._satoshisBN;
					},
					set: function (t) {
						(this._satoshisBN = t),
							(this._satoshis = t.toNumber()),
							c.checkState(
								o.isNaturalNumber(this._satoshis),
								"Output satoshis is not a natural number"
							);
					},
				}),
				(d.prototype.toObject = d.prototype.toJSON =
					function () {
						var t = { satoshis: this.satoshis };
						return (t.script = this._scriptBuffer.toString("hex")), t;
					}),
				(d.fromObject = function (t) {
					return new d(t);
				}),
				(d.prototype.setScriptFromBuffer = function (t) {
					this._scriptBuffer = t;
					try {
						(this._script = u.fromBuffer(this._scriptBuffer)),
							(this._script._isOutput = !0);
					} catch (t) {
						if (!(t instanceof h.Script.InvalidBuffer)) throw t;
						this._script = null;
					}
				}),
				(d.prototype.setScript = function (t) {
					if (t instanceof u)
						(this._scriptBuffer = t.toBuffer()),
							(this._script = t),
							(this._script._isOutput = !0);
					else if (n.isString(t))
						(this._script = u.fromString(t)),
							(this._scriptBuffer = this._script.toBuffer()),
							(this._script._isOutput = !0);
					else {
						if (!e.isBuffer(t))
							throw new TypeError("Invalid argument type: script");
						this.setScriptFromBuffer(t);
					}
					return this;
				}),
				(d.prototype.inspect = function () {
					var t;
					return (
						(t = this.script
							? this.script.inspect()
							: this._scriptBuffer.toString("hex")),
						"<Output (" + this.satoshis + " sats) " + t + ">"
					);
				}),
				(d.fromBufferReader = function (t) {
					var e = {};
					e.satoshis = t.readUInt64LEBN();
					var r = t.readVarintNum();
					return (e.script = 0 !== r ? t.read(r) : s.Buffer.from([])), new d(e);
				}),
				(d.prototype.toBufferWriter = function (t) {
					t || (t = new f()), t.writeUInt64LEBN(this._satoshisBN);
					var e = this._scriptBuffer;
					return t.writeVarintNum(e.length), t.write(e), t;
				}),
				(d.prototype.getSize = function () {
					var t = this.script.toBuffer().length;
					return 8 + a(t).toBuffer().length + t;
				}),
				(t.exports = d);
		}.call(this, r(0).Buffer));
	},
	function (t, e) {
		function r(t, e) {
			if (!t) throw new Error(e || "Assertion failed");
		}
		(t.exports = r),
			(r.equal = function (t, e, r) {
				if (t != e) throw new Error(r || "Assertion failed: " + t + " != " + e);
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(1),
			i = r(4),
			s = [],
			o = {};
		function f() {}
		function a(t, e) {
			if (~s.indexOf(t)) return t;
			if (!e) return o[t];
			n.isArray(e) || (e = [e]);
			for (var r = 0; r < s.length; r++) {
				var i = s[r],
					f = n.pick(i, e);
				if (~n.values(f).indexOf(t)) return i;
			}
		}
		function u(t) {
			for (var e = [], r = 0; r < t.length; r++) e.push(31 & t.charCodeAt(r));
			return e;
		}
		function c(t) {
			var e = new f();
			i.defineImmutable(e, {
				name: t.name,
				alias: t.alias,
				pubkeyhash: t.pubkeyhash,
				privatekey: t.privatekey,
				scripthash: t.scripthash,
				xpubkey: t.xpubkey,
				xprivkey: t.xprivkey,
			});
			var r = t.indexBy || Object.keys(t);
			return (
				t.cashAddrPrefix &&
					n.extend(e, {
						cashAddrPrefix: t.cashAddrPrefix,
						cashAddrPrefixArray: u(t.cashAddrPrefix),
					}),
				t.networkMagic &&
					n.extend(e, { networkMagic: i.integerAsBuffer(t.networkMagic) }),
				t.port && n.extend(e, { port: t.port }),
				t.dnsSeeds && n.extend(e, { dnsSeeds: t.dnsSeeds }),
				s.push(e),
				(function (t, e) {
					for (var r = 0; r < e.length; r++) {
						var i = e[r],
							s = t[i];
						n.isUndefined(s) || n.isObject(s) || (o[s] = t);
					}
				})(e, r),
				e
			);
		}
		f.prototype.toString = function () {
			return this.name;
		};
		var h = ["seed.bitcoinsv.org", "seed.bitcoinunlimited.info"],
			d = {
				PORT: 18333,
				NETWORK_MAGIC: 4108710900,
				DNS_SEEDS: h,
				PREFIX: "testnet",
				CASHADDRPREFIX: "bchtest",
			},
			p = {
				PORT: 18444,
				NETWORK_MAGIC: 3669344250,
				DNS_SEEDS: [],
				PREFIX: "regtest",
				CASHADDRPREFIX: "bchreg",
			},
			l = {
				PORT: 9333,
				NETWORK_MAGIC: 4224632057,
				DNS_SEEDS: ["stn-seed.bitcoinsv.io"],
				PREFIX: "stn",
				CASHADDRPREFIX: "bsvstn",
			},
			b = {
				name: "livenet",
				alias: "mainnet",
				prefix: "bitcoin",
				cashAddrPrefix: "bitcoincash",
				pubkeyhash: 0,
				privatekey: 128,
				scripthash: 5,
				xpubkey: 76067358,
				xprivkey: 76066276,
				networkMagic: 3823236072,
				port: 8333,
				dnsSeeds: h,
			},
			m = {
				name: "testnet",
				prefix: d.PREFIX,
				cashAddrPrefix: d.CASHADDRPREFIX,
				pubkeyhash: 111,
				privatekey: 239,
				scripthash: 196,
				xpubkey: 70617039,
				xprivkey: 70615956,
				networkMagic: d.NETWORK_MAGIC,
			},
			g = {
				name: "regtest",
				prefix: p.PREFIX,
				cashAddrPrefix: p.CASHADDRPREFIX,
				pubkeyhash: 111,
				privatekey: 239,
				scripthash: 196,
				xpubkey: 70617039,
				xprivkey: 70615956,
				networkMagic: p.NETWORK_MAGIC,
				port: p.PORT,
				dnsSeeds: [],
				indexBy: ["port", "name", "cashAddrPrefix", "networkMagic"],
			},
			y = {
				name: "stn",
				prefix: l.PREFIX,
				cashAddrPrefix: l.CASHADDRPREFIX,
				pubkeyhash: 111,
				privatekey: 239,
				scripthash: 196,
				xpubkey: 70617039,
				xprivkey: 70615956,
				networkMagic: l.NETWORK_MAGIC,
				indexBy: ["port", "name", "cashAddrPrefix", "networkMagic"],
			};
		c(m), c(y), c(g), c(b);
		var v = a("livenet"),
			_ = a("regtest"),
			S = a("testnet"),
			w = a("stn");
		Object.defineProperty(S, "port", {
			enumerable: !0,
			configurable: !1,
			get: function () {
				return this.regtestEnabled ? p.PORT : this.stnEnabled ? l.PORT : d.PORT;
			},
		}),
			Object.defineProperty(S, "networkMagic", {
				enumerable: !0,
				configurable: !1,
				get: function () {
					return this.regtestEnabled
						? i.integerAsBuffer(p.NETWORK_MAGIC)
						: this.stnEnabled
						? i.integerAsBuffer(l.NETWORK_MAGIC)
						: i.integerAsBuffer(d.NETWORK_MAGIC);
				},
			}),
			Object.defineProperty(S, "dnsSeeds", {
				enumerable: !0,
				configurable: !1,
				get: function () {
					return this.regtestEnabled
						? p.DNS_SEEDS
						: this.stnEnabled
						? l.DNS_SEEDS
						: d.DNS_SEEDS;
				},
			}),
			Object.defineProperty(S, "cashAddrPrefix", {
				enumerable: !0,
				configurable: !1,
				get: function () {
					return this.regtestEnabled
						? p.CASHADDRPREFIX
						: this.stnEnabled
						? l.CASHADDRPREFIX
						: d.CASHADDRPREFIX;
				},
			}),
			Object.defineProperty(S, "cashAddrPrefixArray", {
				enumerable: !0,
				configurable: !1,
				get: function () {
					return this.regtestEnabled
						? u(p.CASHADDRPREFIX)
						: this.stnEnabled
						? l.cashAddrPrefixToArray(l.CASHADDRPREFIX)
						: u(d.CASHADDRPREFIX);
				},
			}),
			(t.exports = {
				add: c,
				remove: function (t) {
					for (var e = 0; e < s.length; e++) s[e] === t && s.splice(e, 1);
					!(function (t, e) {
						for (var r = 0; r < e.length; r++) {
							var n = e[r];
							o[n] === t && delete o[n];
						}
					})(t, Object.keys(o));
				},
				defaultNetwork: v,
				livenet: v,
				mainnet: v,
				testnet: S,
				regtest: _,
				stn: w,
				get: a,
				enableRegtest: function () {
					S.regtestEnabled = !0;
				},
				disableRegtest: function () {
					S.regtestEnabled = !1;
				},
				enableStn: function () {
					S.stnEnabled = !0;
				},
				disableStn: function () {
					S.stnEnabled = !1;
				},
			});
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(3),
				i = new (0, r(6).ec)("secp256k1"),
				s = i.curve.point.bind(i.curve),
				o = i.curve.pointFromX.bind(i.curve),
				f = function (t, e, r) {
					try {
						var n = s(t, e, r);
					} catch (t) {
						throw new Error("Invalid Point");
					}
					return n.validate(), n;
				};
			(f.prototype = Object.getPrototypeOf(i.curve.point())),
				(f.fromX = function (t, e) {
					try {
						var r = o(e, t);
					} catch (t) {
						throw new Error("Invalid X");
					}
					return r.validate(), r;
				}),
				(f.getG = function () {
					return i.curve.g;
				}),
				(f.getN = function () {
					return new n(i.curve.n.toArray());
				}),
				f.prototype._getX || (f.prototype._getX = f.prototype.getX),
				(f.prototype.getX = function () {
					return new n(this._getX().toArray());
				}),
				f.prototype._getY || (f.prototype._getY = f.prototype.getY),
				(f.prototype.getY = function () {
					return new n(this._getY().toArray());
				}),
				(f.prototype.validate = function () {
					if (this.isInfinity())
						throw new Error("Point cannot be equal to Infinity");
					var t;
					try {
						t = o(this.getX(), this.getY().isOdd());
					} catch (t) {
						throw new Error("Point does not lie on the curve");
					}
					if (0 !== t.y.cmp(this.y))
						throw new Error("Invalid y value for curve.");
					if (!this.mul(f.getN()).isInfinity())
						throw new Error("Point times N must be infinity");
					return this;
				}),
				(f.pointToCompressed = function (t) {
					var r,
						n = t.getX().toBuffer({ size: 32 }),
						i = t.getY().toBuffer({ size: 32 });
					return (
						(r = i[i.length - 1] % 2 ? e.from([3]) : e.from([2])),
						e.concat([r, n])
					);
				}),
				(f.pointFromCompressed = function (t) {
					if (33 !== t.length) throw new Error("invalid buffer length");
					let e,
						r = t[0];
					if (3 === r) e = !0;
					else {
						if (2 !== r) throw new Error("invalid value of compressed prefix");
						e = !1;
					}
					let i = t.slice(1, 33),
						s = n.fromBuffer(i);
					return f.fromX(e, s);
				}),
				(f.prototype.toBuffer = function () {
					return f.pointToCompressed(this);
				}),
				(f.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(f.fromBuffer = function (t) {
					return f.pointFromCompressed(t);
				}),
				(f.fromHex = function (t) {
					return f.fromBuffer(e.from(t, "hex"));
				}),
				(t.exports = f);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(8),
				o = r(23),
				f = r(19),
				a = r(5),
				u = r(4),
				c = r(13);
			function h(t, e, r) {
				if (!(this instanceof h)) return new h(t, e, r);
				if (n.isArray(t) && n.isNumber(e)) return h.createMultisig(t, e, r);
				if (t instanceof h) return t;
				if (
					(i.checkArgument(
						t,
						"First argument is required, please include address data.",
						"guide/address.html"
					),
					e && !f.get(e))
				)
					throw new TypeError(
						'Second argument must be "livenet", "testnet", or "regtest".'
					);
				if (r && r !== h.PayToPublicKeyHash && r !== h.PayToScriptHash)
					throw new TypeError(
						'Third argument must be "pubkeyhash" or "scripthash".'
					);
				var s = this._classifyArguments(t, e, r);
				return (
					(s.network = s.network || f.get(e) || f.defaultNetwork),
					(s.type = s.type || r || h.PayToPublicKeyHash),
					u.defineImmutable(this, {
						hashBuffer: s.hashBuffer,
						network: s.network,
						type: s.type,
					}),
					this
				);
			}
			(h.prototype._classifyArguments = function (t, r, i) {
				if ((t instanceof e || t instanceof Uint8Array) && 20 === t.length)
					return h._transformHash(t);
				if ((t instanceof e || t instanceof Uint8Array) && 21 === t.length)
					return h._transformBuffer(t, r, i);
				if (t instanceof c) return h._transformPublicKey(t);
				if (t instanceof d) return h._transformScript(t, r);
				if ("string" == typeof t) return h._transformString(t, r, i);
				if (n.isObject(t)) return h._transformObject(t);
				throw new TypeError("First argument is an unrecognized data format.");
			}),
				(h.PayToPublicKeyHash = "pubkeyhash"),
				(h.PayToScriptHash = "scripthash"),
				(h._transformHash = function (t) {
					var r = {};
					if (!(t instanceof e || t instanceof Uint8Array))
						throw new TypeError("Address supplied is not a buffer.");
					if (20 !== t.length)
						throw new TypeError(
							"Address hashbuffers must be exactly 20 bytes."
						);
					return (r.hashBuffer = t), r;
				}),
				(h._transformObject = function (t) {
					return (
						i.checkArgument(
							t.hash || t.hashBuffer,
							"Must provide a `hash` or `hashBuffer` property"
						),
						i.checkArgument(t.type, "Must provide a `type` property"),
						{
							hashBuffer: t.hash ? e.from(t.hash, "hex") : t.hashBuffer,
							network: f.get(t.network) || f.defaultNetwork,
							type: t.type,
						}
					);
				}),
				(h._classifyFromVersion = function (t) {
					var e = {},
						r = f.get(t[0], "pubkeyhash"),
						n = f.get(t[0], "scripthash");
					return (
						r
							? ((e.network = r), (e.type = h.PayToPublicKeyHash))
							: n && ((e.network = n), (e.type = h.PayToScriptHash)),
						e
					);
				}),
				(h._transformBuffer = function (t, r, n) {
					var i = {};
					if (!(t instanceof e || t instanceof Uint8Array))
						throw new TypeError("Address supplied is not a buffer.");
					if (21 !== t.length)
						throw new TypeError("Address buffers must be exactly 21 bytes.");
					var s = f.get(r),
						o = h._classifyFromVersion(t);
					if (r && !s) throw new TypeError("Unknown network");
					if (!o.network || (s && s !== o.network))
						throw new TypeError("Address has mismatched network type.");
					if (!o.type || (n && n !== o.type))
						throw new TypeError("Address has mismatched type.");
					return (
						(i.hashBuffer = t.slice(1)),
						(i.network = o.network),
						(i.type = o.type),
						i
					);
				}),
				(h._transformPublicKey = function (t) {
					var e = {};
					if (!(t instanceof c))
						throw new TypeError("Address must be an instance of PublicKey.");
					return (
						(e.hashBuffer = a.sha256ripemd160(t.toBuffer())),
						(e.type = h.PayToPublicKeyHash),
						e
					);
				}),
				(h._transformScript = function (t, e) {
					i.checkArgument(t instanceof d, "script must be a Script instance");
					var r = t.getAddressInfo(e);
					if (!r) throw new s.Script.CantDeriveAddress(t);
					return r;
				}),
				(h.createMultisig = function (t, e, r) {
					return (
						(r = r || t[0].network || f.defaultNetwork),
						h.payingTo(d.buildMultisigOut(t, e), r)
					);
				}),
				(h._transformString = function (t, e, r) {
					if ("string" != typeof t)
						throw new TypeError("data parameter supplied is not a string.");
					if (t.length < 27) throw new Error("Invalid Address string provided");
					t = t.trim();
					var n = f.get(e);
					if (e && !n) throw new TypeError("Unknown network");
					var i = o.decode(t);
					return h._transformBuffer(i, e, r);
				}),
				(h.fromPublicKey = function (t, e) {
					var r = h._transformPublicKey(t);
					return (e = e || f.defaultNetwork), new h(r.hashBuffer, e, r.type);
				}),
				(h.fromPrivateKey = function (t, e) {
					let r = c.fromPrivateKey(t);
					return (
						(e = e || t.network || f.defaultNetwork), h.fromPublicKey(r, e)
					);
				}),
				(h.fromPublicKeyHash = function (t, e) {
					var r = h._transformHash(t);
					return new h(r.hashBuffer, e, h.PayToPublicKeyHash);
				}),
				(h.fromScriptHash = function (t, e) {
					i.checkArgument(t, "hash parameter is required");
					var r = h._transformHash(t);
					return new h(r.hashBuffer, e, h.PayToScriptHash);
				}),
				(h.payingTo = function (t, e) {
					return (
						i.checkArgument(t, "script is required"),
						i.checkArgument(
							t instanceof d,
							"script must be instance of Script"
						),
						h.fromScriptHash(a.sha256ripemd160(t.toBuffer()), e)
					);
				}),
				(h.fromScript = function (t, e) {
					i.checkArgument(t instanceof d, "script must be a Script instance");
					var r = h._transformScript(t, e);
					return new h(r.hashBuffer, e, r.type);
				}),
				(h.fromBuffer = function (t, e, r) {
					var n = h._transformBuffer(t, e, r);
					return new h(n.hashBuffer, n.network, n.type);
				}),
				(h.fromHex = function (t, r, n) {
					return h.fromBuffer(e.from(t, "hex"), r, n);
				}),
				(h.fromString = function (t, e, r) {
					var n = h._transformString(t, e, r);
					return new h(n.hashBuffer, n.network, n.type);
				}),
				(h.fromObject = function (t) {
					return (
						i.checkState(
							u.isHexa(t.hash),
							'Unexpected hash property, "' + t.hash + '", expected to be hex.'
						),
						new h(e.from(t.hash, "hex"), t.network, t.type)
					);
				}),
				(h.getValidationError = function (t, e, r) {
					var n;
					try {
						new h(t, e, r);
					} catch (t) {
						n = t;
					}
					return n;
				}),
				(h.isValid = function (t, e, r) {
					return !h.getValidationError(t, e, r);
				}),
				(h.prototype.isPayToPublicKeyHash = function () {
					return this.type === h.PayToPublicKeyHash;
				}),
				(h.prototype.isPayToScriptHash = function () {
					return this.type === h.PayToScriptHash;
				}),
				(h.prototype.toBuffer = function () {
					var t = e.from([this.network[this.type]]);
					return e.concat([t, this.hashBuffer]);
				}),
				(h.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(h.prototype.toObject = h.prototype.toJSON =
					function () {
						return {
							hash: this.hashBuffer.toString("hex"),
							type: this.type,
							network: this.network.toString(),
						};
					}),
				(h.prototype.inspect = function () {
					return (
						"<Address: " +
						this.toString() +
						", type: " +
						this.type +
						", network: " +
						this.network +
						">"
					);
				}),
				(h.prototype.toString = function () {
					return o.encode(this.toBuffer());
				}),
				(t.exports = h);
			var d = r(10);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(18);
		function s() {
			(this.pending = null),
				(this.pendingTotal = 0),
				(this.blockSize = this.constructor.blockSize),
				(this.outSize = this.constructor.outSize),
				(this.hmacStrength = this.constructor.hmacStrength),
				(this.padLength = this.constructor.padLength / 8),
				(this.endian = "big"),
				(this._delta8 = this.blockSize / 8),
				(this._delta32 = this.blockSize / 32);
		}
		(e.BlockHash = s),
			(s.prototype.update = function (t, e) {
				if (
					((t = n.toArray(t, e)),
					this.pending
						? (this.pending = this.pending.concat(t))
						: (this.pending = t),
					(this.pendingTotal += t.length),
					this.pending.length >= this._delta8)
				) {
					var r = (t = this.pending).length % this._delta8;
					(this.pending = t.slice(t.length - r, t.length)),
						0 === this.pending.length && (this.pending = null),
						(t = n.join32(t, 0, t.length - r, this.endian));
					for (var i = 0; i < t.length; i += this._delta32)
						this._update(t, i, i + this._delta32);
				}
				return this;
			}),
			(s.prototype.digest = function (t) {
				return (
					this.update(this._pad()), i(null === this.pending), this._digest(t)
				);
			}),
			(s.prototype._pad = function () {
				var t = this.pendingTotal,
					e = this._delta8,
					r = e - ((t + this.padLength) % e),
					n = new Array(r + this.padLength);
				n[0] = 128;
				for (var i = 1; i < r; i++) n[i] = 0;
				if (((t <<= 3), "big" === this.endian)) {
					for (var s = 8; s < this.padLength; s++) n[i++] = 0;
					(n[i++] = 0),
						(n[i++] = 0),
						(n[i++] = 0),
						(n[i++] = 0),
						(n[i++] = (t >>> 24) & 255),
						(n[i++] = (t >>> 16) & 255),
						(n[i++] = (t >>> 8) & 255),
						(n[i++] = 255 & t);
				} else
					for (
						n[i++] = 255 & t,
							n[i++] = (t >>> 8) & 255,
							n[i++] = (t >>> 16) & 255,
							n[i++] = (t >>> 24) & 255,
							n[i++] = 0,
							n[i++] = 0,
							n[i++] = 0,
							n[i++] = 0,
							s = 8;
						s < this.padLength;
						s++
					)
						n[i++] = 0;
				return n;
			});
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(30),
				s = r(0),
				o = r(5).sha256sha256,
				f = function t(r) {
					if (!(this instanceof t)) return new t(r);
					if (e.isBuffer(r)) {
						var n = r;
						this.fromBuffer(n);
					} else if ("string" == typeof r) {
						var i = r;
						this.fromString(i);
					}
				};
			(f.prototype.set = function (t) {
				return (this.buf = t.buf || this.buf || void 0), this;
			}),
				(f.validChecksum = function (t, e) {
					return (
						n.isString(t) && (t = s.Buffer.from(i.decode(t))),
						n.isString(e) && (e = s.Buffer.from(i.decode(e))),
						e || ((e = t.slice(-4)), (t = t.slice(0, -4))),
						f.checksum(t).toString("hex") === e.toString("hex")
					);
				}),
				(f.decode = function (t) {
					if ("string" != typeof t) throw new Error("Input must be a string");
					var r = e.from(i.decode(t));
					if (r.length < 4) throw new Error("Input string too short");
					var n = r.slice(0, -4),
						s = r.slice(-4),
						f = o(n).slice(0, 4);
					if (s.toString("hex") !== f.toString("hex"))
						throw new Error("Checksum mismatch");
					return n;
				}),
				(f.checksum = function (t) {
					return o(t).slice(0, 4);
				}),
				(f.encode = function (t) {
					if (!e.isBuffer(t)) throw new Error("Input must be a buffer");
					var r = e.alloc(t.length + 4),
						n = f.checksum(t);
					return t.copy(r), n.copy(r, t.length), i.encode(r);
				}),
				(f.prototype.fromBuffer = function (t) {
					return (this.buf = t), this;
				}),
				(f.fromBuffer = function (t) {
					return new f().fromBuffer(t);
				}),
				(f.fromHex = function (t) {
					return f.fromBuffer(e.from(t, "hex"));
				}),
				(f.prototype.fromString = function (t) {
					var e = f.decode(t);
					return (this.buf = e), this;
				}),
				(f.fromString = function (t) {
					var e = f.decode(t);
					return new i(e);
				}),
				(f.prototype.toBuffer = function () {
					return this.buf;
				}),
				(f.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(f.prototype.toString = function () {
					return f.encode(this.buf);
				}),
				(t.exports = f);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(14),
				i = r(15),
				s = r(3),
				o = function t(r) {
					if (!(this instanceof t)) return new t(r);
					if (e.isBuffer(r)) this.buf = r;
					else if ("number" == typeof r) {
						var n = r;
						this.fromNumber(n);
					} else if (r instanceof s) {
						var i = r;
						this.fromBN(i);
					} else if (r) {
						var o = r;
						this.set(o);
					}
				};
			(o.prototype.set = function (t) {
				return (this.buf = t.buf || this.buf), this;
			}),
				(o.prototype.fromString = function (t) {
					return this.set({ buf: e.from(t, "hex") }), this;
				}),
				(o.prototype.toString = function () {
					return this.buf.toString("hex");
				}),
				(o.prototype.fromBuffer = function (t) {
					return (this.buf = t), this;
				}),
				(o.prototype.fromBufferReader = function (t) {
					return (this.buf = t.readVarintBuf()), this;
				}),
				(o.prototype.fromBN = function (t) {
					return (this.buf = n().writeVarintBN(t).concat()), this;
				}),
				(o.prototype.fromNumber = function (t) {
					return (this.buf = n().writeVarintNum(t).concat()), this;
				}),
				(o.prototype.toBuffer = function () {
					return this.buf;
				}),
				(o.prototype.toBN = function () {
					return i(this.buf).readVarintBN();
				}),
				(o.prototype.toNumber = function () {
					return i(this.buf).readVarintNum();
				}),
				(t.exports = o);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(8),
				o = r(14),
				f = r(0),
				a = r(4),
				u = r(10),
				c = r(16),
				h = r(17);
			function d(t) {
				return this instanceof d
					? t
						? this._fromObject(t)
						: void 0
					: new d(t);
			}
			(d.MAXINT = 4294967295),
				(d.DEFAULT_SEQNUMBER = 4294967295),
				(d.DEFAULT_LOCKTIME_SEQNUMBER = 4294967294),
				(d.DEFAULT_RBF_SEQNUMBER = 4294967293),
				(d.BASE_SIZE = 40),
				Object.defineProperty(d.prototype, "script", {
					configurable: !1,
					enumerable: !0,
					get: function () {
						return this.isNull()
							? null
							: (this._script ||
									((this._script = new u(this._scriptBuffer)),
									(this._script._isInput = !0)),
							  this._script);
					},
				}),
				(d.fromObject = function (t) {
					return i.checkArgument(n.isObject(t)), new d()._fromObject(t);
				}),
				(d.prototype._fromObject = function (t) {
					var e;
					if (
						((e =
							n.isString(t.prevTxId) && a.isHexa(t.prevTxId)
								? f.Buffer.from(t.prevTxId, "hex")
								: t.prevTxId),
						(this.output = t.output
							? t.output instanceof h
								? t.output
								: new h(t.output)
							: void 0),
						(this.prevTxId = e || t.txidbuf),
						(this.outputIndex = n.isUndefined(t.outputIndex)
							? t.txoutnum
							: t.outputIndex),
						(this.sequenceNumber = n.isUndefined(t.sequenceNumber)
							? n.isUndefined(t.seqnum)
								? 4294967295
								: t.seqnum
							: t.sequenceNumber),
						n.isUndefined(t.script) && n.isUndefined(t.scriptBuffer))
					)
						throw new s.Transaction.Input.MissingScript();
					return this.setScript(t.scriptBuffer || t.script), this;
				}),
				(d.prototype.toObject = d.prototype.toJSON =
					function () {
						var t = {
							prevTxId: this.prevTxId.toString("hex"),
							outputIndex: this.outputIndex,
							sequenceNumber: this.sequenceNumber,
							script: this._scriptBuffer.toString("hex"),
						};
						return (
							this.script && (t.scriptString = this.script.toString()),
							this.output && (t.output = this.output.toObject()),
							t
						);
					}),
				(d.fromBufferReader = function (t) {
					var e = new d();
					return (
						(e.prevTxId = t.readReverse(32)),
						(e.outputIndex = t.readUInt32LE()),
						(e._scriptBuffer = t.readVarLengthBuffer()),
						(e.sequenceNumber = t.readUInt32LE()),
						e
					);
				}),
				(d.prototype.toBufferWriter = function (t) {
					t || (t = new o()),
						t.writeReverse(this.prevTxId),
						t.writeUInt32LE(this.outputIndex);
					var e = this._scriptBuffer;
					return (
						t.writeVarintNum(e.length),
						t.write(e),
						t.writeUInt32LE(this.sequenceNumber),
						t
					);
				}),
				(d.prototype.setScript = function (t) {
					if (((this._script = null), t instanceof u))
						(this._script = t),
							(this._script._isInput = !0),
							(this._scriptBuffer = t.toBuffer());
					else if (null === t)
						(this._script = u.empty()),
							(this._script._isInput = !0),
							(this._scriptBuffer = this._script.toBuffer());
					else if (a.isHexa(t)) this._scriptBuffer = f.Buffer.from(t, "hex");
					else if (n.isString(t))
						(this._script = new u(t)),
							(this._script._isInput = !0),
							(this._scriptBuffer = this._script.toBuffer());
					else {
						if (!e.isBuffer(t))
							throw new TypeError("Invalid argument type: script");
						this._scriptBuffer = f.Buffer.from(t);
					}
					return this;
				}),
				(d.prototype.getSignatures = function () {
					throw new s.AbstractMethodInvoked(
						"Trying to sign unsupported output type (only P2PKH and P2SH multisig inputs are supported) for input: " +
							JSON.stringify(this)
					);
				}),
				(d.prototype.isFullySigned = function () {
					throw new s.AbstractMethodInvoked("Input#isFullySigned");
				}),
				(d.prototype.isFinal = function () {
					return this.sequenceNumber === d.MAXINT;
				}),
				(d.prototype.addSignature = function () {
					throw new s.AbstractMethodInvoked("Input#addSignature");
				}),
				(d.prototype.clearSignatures = function () {
					throw new s.AbstractMethodInvoked("Input#clearSignatures");
				}),
				(d.prototype.isValidSignature = function (t, e) {
					return (
						(e.signature.nhashtype = e.sigtype),
						c.verify(
							t,
							e.signature,
							e.publicKey,
							e.inputIndex,
							this.output.script,
							this.output.satoshisBN
						)
					);
				}),
				(d.prototype.isNull = function () {
					return (
						"0000000000000000000000000000000000000000000000000000000000000000" ===
							this.prevTxId.toString("hex") && 4294967295 === this.outputIndex
					);
				}),
				(d.prototype._estimateSize = function () {
					return this.toBufferWriter().toBuffer().length;
				}),
				(t.exports = d);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(11),
				o = r(4),
				f = r(13),
				a = r(8),
				u = r(9);
			function c(t) {
				if (!(this instanceof c)) return new c(t);
				if (t instanceof c) return t;
				if (n.isObject(t)) return this._fromObject(t);
				throw new a.InvalidArgument(
					"TransactionSignatures must be instantiated from an object"
				);
			}
			s(c, u),
				(c.prototype._fromObject = function (t) {
					return (
						this._checkObjectArgs(t),
						(this.publicKey = new f(t.publicKey)),
						(this.prevTxId = e.isBuffer(t.prevTxId)
							? t.prevTxId
							: e.from(t.prevTxId, "hex")),
						(this.outputIndex = t.outputIndex),
						(this.inputIndex = t.inputIndex),
						(this.signature =
							t.signature instanceof u
								? t.signature
								: e.isBuffer(t.signature)
								? u.fromBuffer(t.signature)
								: u.fromString(t.signature)),
						(this.sigtype = t.sigtype),
						this
					);
				}),
				(c.prototype._checkObjectArgs = function (t) {
					i.checkArgument(f(t.publicKey), "publicKey"),
						i.checkArgument(!n.isUndefined(t.inputIndex), "inputIndex"),
						i.checkArgument(!n.isUndefined(t.outputIndex), "outputIndex"),
						i.checkState(
							n.isNumber(t.inputIndex),
							"inputIndex must be a number"
						),
						i.checkState(
							n.isNumber(t.outputIndex),
							"outputIndex must be a number"
						),
						i.checkArgument(t.signature, "signature"),
						i.checkArgument(t.prevTxId, "prevTxId"),
						i.checkState(
							t.signature instanceof u ||
								e.isBuffer(t.signature) ||
								o.isHexa(t.signature),
							"signature must be a buffer or hexa value"
						),
						i.checkState(
							e.isBuffer(t.prevTxId) || o.isHexa(t.prevTxId),
							"prevTxId must be a buffer or hexa value"
						),
						i.checkArgument(t.sigtype, "sigtype"),
						i.checkState(n.isNumber(t.sigtype), "sigtype must be a number");
				}),
				(c.prototype.toObject = c.prototype.toJSON =
					function () {
						return {
							publicKey: this.publicKey.toString(),
							prevTxId: this.prevTxId.toString("hex"),
							outputIndex: this.outputIndex,
							inputIndex: this.inputIndex,
							signature: this.signature.toString(),
							sigtype: this.sigtype,
						};
					}),
				(c.fromObject = function (t) {
					return i.checkArgument(t), new c(t);
				}),
				(t.exports = c);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		var n = e;
		(n.base = r(65)), (n.short = r(66)), (n.mont = r(67)), (n.edwards = r(68));
	},
	function (t, e, r) {
		var n = e;
		(n.utils = r(12)),
			(n.common = r(22)),
			(n.sha = r(70)),
			(n.ripemd = r(74)),
			(n.hmac = r(75)),
			(n.sha1 = n.sha.sha1),
			(n.sha256 = n.sha.sha256),
			(n.sha224 = n.sha.sha224),
			(n.sha384 = n.sha.sha384),
			(n.sha512 = n.sha.sha512),
			(n.ripemd160 = n.ripemd.ripemd160);
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(21),
				s = r(23),
				o = r(3),
				f = r(4),
				a = r(19),
				u = r(20),
				c = r(13),
				h = r(32),
				d = r(2);
			function p(t, e) {
				if (!(this instanceof p)) return new p(t, e);
				if (t instanceof p) return t;
				var r = this._classifyArguments(t, e);
				if (!r.bn || 0 === r.bn.cmp(new o(0)))
					throw new TypeError(
						"Number can not be equal to zero, undefined, null or false"
					);
				if (!r.bn.lt(u.getN()))
					throw new TypeError("Number must be less than N");
				if (void 0 === r.network)
					throw new TypeError(
						'Must specify the network ("livenet" or "testnet")'
					);
				return (
					f.defineImmutable(this, {
						bn: r.bn,
						compressed: r.compressed,
						network: r.network,
					}),
					Object.defineProperty(this, "publicKey", {
						configurable: !1,
						enumerable: !0,
						get: this.toPublicKey.bind(this),
					}),
					this
				);
			}
			(p.prototype._classifyArguments = function (t, r) {
				var i = { compressed: !0, network: r ? a.get(r) : a.defaultNetwork };
				if (n.isUndefined(t) || n.isNull(t)) i.bn = p._getRandomBN();
				else if (t instanceof o) i.bn = t;
				else if (t instanceof e || t instanceof Uint8Array)
					i = p._transformBuffer(t, r);
				else if (t.bn && t.network) i = p._transformObject(t);
				else if (!r && a.get(t))
					(i.bn = p._getRandomBN()), (i.network = a.get(t));
				else {
					if ("string" != typeof t)
						throw new TypeError("First argument is an unrecognized data type.");
					f.isHexa(t)
						? (i.bn = new o(e.from(t, "hex")))
						: (i = p._transformWIF(t, r));
				}
				return i;
			}),
				(p._getRandomBN = function () {
					var t, e;
					do {
						var r = h.getRandomBuffer(32);
						t = (e = o.fromBuffer(r)).lt(u.getN());
					} while (!t);
					return e;
				}),
				(p._transformBuffer = function (t, e) {
					var r = {};
					if (32 === t.length) return p._transformBNBuffer(t, e);
					if (((r.network = a.get(t[0], "privatekey")), !r.network))
						throw new Error("Invalid network");
					if (e && r.network !== a.get(e))
						throw new TypeError("Private key network mismatch");
					if (34 === t.length && 1 === t[33]) r.compressed = !0;
					else {
						if (33 !== t.length)
							throw new Error(
								"Length of buffer must be 33 (uncompressed) or 34 (compressed)"
							);
						r.compressed = !1;
					}
					return (r.bn = o.fromBuffer(t.slice(1, 33))), r;
				}),
				(p._transformBNBuffer = function (t, e) {
					var r = {};
					return (
						(r.network = a.get(e) || a.defaultNetwork),
						(r.bn = o.fromBuffer(t)),
						(r.compressed = !1),
						r
					);
				}),
				(p._transformWIF = function (t, e) {
					return p._transformBuffer(s.decode(t), e);
				}),
				(p.fromBuffer = function (t, e) {
					return new p(t, e);
				}),
				(p.fromHex = function (t, r) {
					return p.fromBuffer(e.from(t, "hex"), r);
				}),
				(p._transformObject = function (t) {
					return {
						bn: new o(t.bn, "hex"),
						network: a.get(t.network),
						compressed: t.compressed,
					};
				}),
				(p.fromString = p.fromWIF =
					function (t) {
						return (
							d.checkArgument(
								n.isString(t),
								"First argument is expected to be a string."
							),
							new p(t)
						);
					}),
				(p.fromObject = p.fromJSON =
					function (t) {
						return (
							d.checkArgument(
								n.isObject(t),
								"First argument is expected to be an object."
							),
							new p(t)
						);
					}),
				(p.fromRandom = function (t) {
					var e = p._getRandomBN();
					return new p(e, t);
				}),
				(p.getValidationError = function (t, e) {
					var r;
					try {
						new p(t, e);
					} catch (t) {
						r = t;
					}
					return r;
				}),
				(p.isValid = function (t, e) {
					return !!t && !p.getValidationError(t, e);
				}),
				(p.prototype.toString = function () {
					return this.toWIF();
				}),
				(p.prototype.toWIF = function () {
					var t,
						r = this.network;
					return (
						(t = this.compressed
							? e.concat([
									e.from([r.privatekey]),
									this.bn.toBuffer({ size: 32 }),
									e.from([1]),
							  ])
							: e.concat([
									e.from([r.privatekey]),
									this.bn.toBuffer({ size: 32 }),
							  ])),
						s.encode(t)
					);
				}),
				(p.prototype.toBigNumber = function () {
					return this.bn;
				}),
				(p.prototype.toBuffer = function () {
					return this.bn.toBuffer({ size: 32 });
				}),
				(p.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(p.prototype.toPublicKey = function () {
					return (
						this._pubkey || (this._pubkey = c.fromPrivateKey(this)),
						this._pubkey
					);
				}),
				(p.prototype.toAddress = function (t) {
					var e = this.toPublicKey();
					return i.fromPublicKey(e, t || this.network);
				}),
				(p.prototype.toObject = p.prototype.toJSON =
					function () {
						return {
							bn: this.bn.toString("hex"),
							compressed: this.compressed,
							network: this.network.toString(),
						};
					}),
				(p.prototype.inspect = function () {
					var t = this.compressed ? "" : ", uncompressed";
					return (
						"<PrivateKey: " +
						this.toHex() +
						", network: " +
						this.network +
						t +
						">"
					);
				}),
				(t.exports = p);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(45),
				s = r(0),
				o = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".split(
					""
				),
				f = function t(r) {
					if (!(this instanceof t)) return new t(r);
					if (e.isBuffer(r)) {
						var n = r;
						this.fromBuffer(n);
					} else if ("string" == typeof r) {
						var i = r;
						this.fromString(i);
					}
				};
			(f.validCharacters = function (t) {
				return (
					s.Buffer.isBuffer(t) && (t = t.toString()),
					n.every(
						n.map(t, function (t) {
							return n.includes(o, t);
						})
					)
				);
			}),
				(f.prototype.set = function (t) {
					return (this.buf = t.buf || this.buf || void 0), this;
				}),
				(f.encode = function (t) {
					if (!s.Buffer.isBuffer(t))
						throw new Error("Input should be a buffer");
					return i.encode(t);
				}),
				(f.decode = function (t) {
					if ("string" != typeof t) throw new Error("Input should be a string");
					return e.from(i.decode(t));
				}),
				(f.prototype.fromBuffer = function (t) {
					return (this.buf = t), this;
				}),
				(f.fromBuffer = function (t) {
					return new f().fromBuffer(t);
				}),
				(f.fromHex = function (t) {
					return f.fromBuffer(e.from(t, "hex"));
				}),
				(f.prototype.fromString = function (t) {
					var e = f.decode(t);
					return (this.buf = e), this;
				}),
				(f.fromString = function (t) {
					return new f().fromString(t);
				}),
				(f.prototype.toBuffer = function () {
					return this.buf;
				}),
				(f.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(f.prototype.toString = function () {
					return f.encode(this.buf);
				}),
				(t.exports = f);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		(t.exports = r(49)),
			(t.exports.Input = r(39)),
			(t.exports.Output = r(17)),
			(t.exports.UnspentOutput = r(50)),
			(t.exports.Signature = r(26)),
			(t.exports.Sighash = r(16));
	},
	function (t, e, r) {
		"use strict";
		(function (e, n) {
			function i() {}
			(i.getRandomBuffer = function (t) {
				return e.browser
					? i.getRandomBufferBrowser(t)
					: i.getRandomBufferNode(t);
			}),
				(i.getRandomBufferNode = function (t) {
					return r(35).randomBytes(t);
				}),
				(i.getRandomBufferBrowser = function (t) {
					if (!window.crypto && !window.msCrypto)
						throw new Error("window.crypto not available");
					var e;
					if (window.crypto && window.crypto.getRandomValues) e = window.crypto;
					else {
						if (!window.msCrypto || !window.msCrypto.getRandomValues)
							throw new Error("window.crypto.getRandomValues not available");
						e = window.msCrypto;
					}
					var r = new Uint8Array(t);
					return e.getRandomValues(r), n.from(r);
				}),
				(t.exports = i);
		}.call(this, r(36), r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(3),
				s = r(15),
				o = r(14),
				f = r(5),
				a = r(2),
				u = function t(e) {
					if (!(this instanceof t)) return new t(e);
					var r = t._from(e);
					return (
						(this.version = r.version),
						(this.prevHash = r.prevHash),
						(this.merkleRoot = r.merkleRoot),
						(this.time = r.time),
						(this.timestamp = r.time),
						(this.bits = r.bits),
						(this.nonce = r.nonce),
						r.hash &&
							a.checkState(
								this.hash === r.hash,
								"Argument object hash property does not match block hash."
							),
						this
					);
				};
			(u._from = function (t) {
				var r = {};
				if (e.isBuffer(t)) r = u._fromBufferReader(s(t));
				else {
					if (!n.isObject(t))
						throw new TypeError("Unrecognized argument for BlockHeader");
					r = u._fromObject(t);
				}
				return r;
			}),
				(u._fromObject = function (t) {
					a.checkArgument(t, "data is required");
					var r = t.prevHash,
						i = t.merkleRoot;
					return (
						n.isString(t.prevHash) && (r = e.from(t.prevHash, "hex").reverse()),
						n.isString(t.merkleRoot) &&
							(i = e.from(t.merkleRoot, "hex").reverse()),
						{
							hash: t.hash,
							version: t.version,
							prevHash: r,
							merkleRoot: i,
							time: t.time,
							timestamp: t.time,
							bits: t.bits,
							nonce: t.nonce,
						}
					);
				}),
				(u.fromObject = function (t) {
					var e = u._fromObject(t);
					return new u(e);
				}),
				(u.fromRawBlock = function (t) {
					e.isBuffer(t) || (t = e.from(t, "binary"));
					var r = s(t);
					r.pos = u.Constants.START_OF_HEADER;
					var n = u._fromBufferReader(r);
					return new u(n);
				}),
				(u.fromBuffer = function (t) {
					var e = u._fromBufferReader(s(t));
					return new u(e);
				}),
				(u.fromString = function (t) {
					var r = e.from(t, "hex");
					return u.fromBuffer(r);
				}),
				(u._fromBufferReader = function (t) {
					var e = {};
					return (
						(e.version = t.readInt32LE()),
						(e.prevHash = t.read(32)),
						(e.merkleRoot = t.read(32)),
						(e.time = t.readUInt32LE()),
						(e.bits = t.readUInt32LE()),
						(e.nonce = t.readUInt32LE()),
						e
					);
				}),
				(u.fromBufferReader = function (t) {
					var e = u._fromBufferReader(t);
					return new u(e);
				}),
				(u.prototype.toObject = u.prototype.toJSON =
					function () {
						return {
							hash: this.hash,
							version: this.version,
							prevHash: e.from(this.prevHash).reverse().toString("hex"),
							merkleRoot: e.from(this.merkleRoot).reverse().toString("hex"),
							time: this.time,
							bits: this.bits,
							nonce: this.nonce,
						};
					}),
				(u.prototype.toBuffer = function () {
					return this.toBufferWriter().concat();
				}),
				(u.prototype.toString = function () {
					return this.toBuffer().toString("hex");
				}),
				(u.prototype.toBufferWriter = function (t) {
					return (
						t || (t = new o()),
						t.writeInt32LE(this.version),
						t.write(this.prevHash),
						t.write(this.merkleRoot),
						t.writeUInt32LE(this.time),
						t.writeUInt32LE(this.bits),
						t.writeUInt32LE(this.nonce),
						t
					);
				}),
				(u.prototype.getTargetDifficulty = function (t) {
					t = t || this.bits;
					for (var e = new i(16777215 & t), r = 8 * ((t >>> 24) - 3); r-- > 0; )
						e = e.mul(new i(2));
					return e;
				}),
				(u.prototype.getDifficulty = function () {
					var t = this.getTargetDifficulty(486604799).mul(
							new i(Math.pow(10, 8))
						),
						e = this.getTargetDifficulty(),
						r = t.div(e).toString(10),
						n = r.length - 8;
					return (r = r.slice(0, n) + "." + r.slice(n)), parseFloat(r);
				}),
				(u.prototype._getHash = function () {
					var t = this.toBuffer();
					return f.sha256sha256(t);
				});
			var c = {
				configurable: !1,
				enumerable: !0,
				get: function () {
					return (
						this._id ||
							(this._id = s(this._getHash()).readReverse().toString("hex")),
						this._id
					);
				},
				set: n.noop,
			};
			Object.defineProperty(u.prototype, "id", c),
				Object.defineProperty(u.prototype, "hash", c),
				(u.prototype.validTimestamp = function () {
					var t = Math.round(new Date().getTime() / 1e3);
					return !(this.time > t + u.Constants.MAX_TIME_OFFSET);
				}),
				(u.prototype.validProofOfWork = function () {
					var t = new i(this.id, "hex"),
						e = this.getTargetDifficulty();
					return !(t.cmp(e) > 0);
				}),
				(u.prototype.inspect = function () {
					return "<BlockHeader " + this.id + ">";
				}),
				(u.Constants = {
					START_OF_HEADER: 8,
					MAX_TIME_OFFSET: 7200,
					LARGEST_HASH: new i(
						"10000000000000000000000000000000000000000000000000000000000000000",
						"hex"
					),
				}),
				(t.exports = u);
		}.call(this, r(0).Buffer));
	},
	function (t, e) {
		var r;
		r = (function () {
			return this;
		})();
		try {
			r = r || new Function("return this")();
		} catch (t) {
			"object" == typeof window && (r = window);
		}
		t.exports = r;
	},
	function (t, e) {
		t.exports = crypto;
	},
	function (t, e) {
		var r,
			n,
			i = (t.exports = {});
		function s() {
			throw new Error("setTimeout has not been defined");
		}
		function o() {
			throw new Error("clearTimeout has not been defined");
		}
		function f(t) {
			if (r === setTimeout) return setTimeout(t, 0);
			if ((r === s || !r) && setTimeout)
				return (r = setTimeout), setTimeout(t, 0);
			try {
				return r(t, 0);
			} catch (e) {
				try {
					return r.call(null, t, 0);
				} catch (e) {
					return r.call(this, t, 0);
				}
			}
		}
		!(function () {
			try {
				r = "function" == typeof setTimeout ? setTimeout : s;
			} catch (t) {
				r = s;
			}
			try {
				n = "function" == typeof clearTimeout ? clearTimeout : o;
			} catch (t) {
				n = o;
			}
		})();
		var a,
			u = [],
			c = !1,
			h = -1;
		function d() {
			c &&
				a &&
				((c = !1), a.length ? (u = a.concat(u)) : (h = -1), u.length && p());
		}
		function p() {
			if (!c) {
				var t = f(d);
				c = !0;
				for (var e = u.length; e; ) {
					for (a = u, u = []; ++h < e; ) a && a[h].run();
					(h = -1), (e = u.length);
				}
				(a = null),
					(c = !1),
					(function (t) {
						if (n === clearTimeout) return clearTimeout(t);
						if ((n === o || !n) && clearTimeout)
							return (n = clearTimeout), clearTimeout(t);
						try {
							n(t);
						} catch (e) {
							try {
								return n.call(null, t);
							} catch (e) {
								return n.call(this, t);
							}
						}
					})(t);
			}
		}
		function l(t, e) {
			(this.fun = t), (this.array = e);
		}
		function b() {}
		(i.nextTick = function (t) {
			var e = new Array(arguments.length - 1);
			if (arguments.length > 1)
				for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
			u.push(new l(t, e)), 1 !== u.length || c || f(p);
		}),
			(l.prototype.run = function () {
				this.fun.apply(null, this.array);
			}),
			(i.title = "browser"),
			(i.browser = !0),
			(i.env = {}),
			(i.argv = []),
			(i.version = ""),
			(i.versions = {}),
			(i.on = b),
			(i.addListener = b),
			(i.once = b),
			(i.off = b),
			(i.removeListener = b),
			(i.removeAllListeners = b),
			(i.emit = b),
			(i.prependListener = b),
			(i.prependOnceListener = b),
			(i.listeners = function (t) {
				return [];
			}),
			(i.binding = function (t) {
				throw new Error("process.binding is not supported");
			}),
			(i.cwd = function () {
				return "/";
			}),
			(i.chdir = function (t) {
				throw new Error("process.chdir is not supported");
			}),
			(i.umask = function () {
				return 0;
			});
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(88);
			/*!
			 * The buffer module from node.js, for the browser.
			 *
			 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
			 * @license  MIT
			 */ function i(t, e) {
				if (t === e) return 0;
				for (
					var r = t.length, n = e.length, i = 0, s = Math.min(r, n);
					i < s;
					++i
				)
					if (t[i] !== e[i]) {
						(r = t[i]), (n = e[i]);
						break;
					}
				return r < n ? -1 : n < r ? 1 : 0;
			}
			function s(t) {
				return e.Buffer && "function" == typeof e.Buffer.isBuffer
					? e.Buffer.isBuffer(t)
					: !(null == t || !t._isBuffer);
			}
			var o = r(89),
				f = Object.prototype.hasOwnProperty,
				a = Array.prototype.slice,
				u = "foo" === function () {}.name;
			function c(t) {
				return Object.prototype.toString.call(t);
			}
			function h(t) {
				return (
					!s(t) &&
					"function" == typeof e.ArrayBuffer &&
					("function" == typeof ArrayBuffer.isView
						? ArrayBuffer.isView(t)
						: !!t &&
						  (t instanceof DataView ||
								!!(t.buffer && t.buffer instanceof ArrayBuffer)))
				);
			}
			var d = (t.exports = y),
				p = /\s*function\s+([^\(\s]*)\s*/;
			function l(t) {
				if (o.isFunction(t)) {
					if (u) return t.name;
					var e = t.toString().match(p);
					return e && e[1];
				}
			}
			function b(t, e) {
				return "string" == typeof t ? (t.length < e ? t : t.slice(0, e)) : t;
			}
			function m(t) {
				if (u || !o.isFunction(t)) return o.inspect(t);
				var e = l(t);
				return "[Function" + (e ? ": " + e : "") + "]";
			}
			function g(t, e, r, n, i) {
				throw new d.AssertionError({
					message: r,
					actual: t,
					expected: e,
					operator: n,
					stackStartFunction: i,
				});
			}
			function y(t, e) {
				t || g(t, !0, e, "==", d.ok);
			}
			function v(t, e, r, n) {
				if (t === e) return !0;
				if (s(t) && s(e)) return 0 === i(t, e);
				if (o.isDate(t) && o.isDate(e)) return t.getTime() === e.getTime();
				if (o.isRegExp(t) && o.isRegExp(e))
					return (
						t.source === e.source &&
						t.global === e.global &&
						t.multiline === e.multiline &&
						t.lastIndex === e.lastIndex &&
						t.ignoreCase === e.ignoreCase
					);
				if (
					(null !== t && "object" == typeof t) ||
					(null !== e && "object" == typeof e)
				) {
					if (
						h(t) &&
						h(e) &&
						c(t) === c(e) &&
						!(t instanceof Float32Array || t instanceof Float64Array)
					)
						return 0 === i(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
					if (s(t) !== s(e)) return !1;
					var f = (n = n || { actual: [], expected: [] }).actual.indexOf(t);
					return (
						(-1 !== f && f === n.expected.indexOf(e)) ||
						(n.actual.push(t),
						n.expected.push(e),
						(function (t, e, r, n) {
							if (null == t || null == e) return !1;
							if (o.isPrimitive(t) || o.isPrimitive(e)) return t === e;
							if (r && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e))
								return !1;
							var i = _(t),
								s = _(e);
							if ((i && !s) || (!i && s)) return !1;
							if (i) return (t = a.call(t)), (e = a.call(e)), v(t, e, r);
							var f,
								u,
								c = I(t),
								h = I(e);
							if (c.length !== h.length) return !1;
							for (c.sort(), h.sort(), u = c.length - 1; u >= 0; u--)
								if (c[u] !== h[u]) return !1;
							for (u = c.length - 1; u >= 0; u--)
								if (((f = c[u]), !v(t[f], e[f], r, n))) return !1;
							return !0;
						})(t, e, r, n))
					);
				}
				return r ? t === e : t == e;
			}
			function _(t) {
				return "[object Arguments]" == Object.prototype.toString.call(t);
			}
			function S(t, e) {
				if (!t || !e) return !1;
				if ("[object RegExp]" == Object.prototype.toString.call(e))
					return e.test(t);
				try {
					if (t instanceof e) return !0;
				} catch (t) {}
				return !Error.isPrototypeOf(e) && !0 === e.call({}, t);
			}
			function w(t, e, r, n) {
				var i;
				if ("function" != typeof e)
					throw new TypeError('"block" argument must be a function');
				"string" == typeof r && ((n = r), (r = null)),
					(i = (function (t) {
						var e;
						try {
							t();
						} catch (t) {
							e = t;
						}
						return e;
					})(e)),
					(n =
						(r && r.name ? " (" + r.name + ")." : ".") + (n ? " " + n : ".")),
					t && !i && g(i, r, "Missing expected exception" + n);
				var s = "string" == typeof n,
					f = !t && i && !r;
				if (
					(((!t && o.isError(i) && s && S(i, r)) || f) &&
						g(i, r, "Got unwanted exception" + n),
					(t && i && r && !S(i, r)) || (!t && i))
				)
					throw i;
			}
			(d.AssertionError = function (t) {
				(this.name = "AssertionError"),
					(this.actual = t.actual),
					(this.expected = t.expected),
					(this.operator = t.operator),
					t.message
						? ((this.message = t.message), (this.generatedMessage = !1))
						: ((this.message = (function (t) {
								return (
									b(m(t.actual), 128) +
									" " +
									t.operator +
									" " +
									b(m(t.expected), 128)
								);
						  })(this)),
						  (this.generatedMessage = !0));
				var e = t.stackStartFunction || g;
				if (Error.captureStackTrace) Error.captureStackTrace(this, e);
				else {
					var r = new Error();
					if (r.stack) {
						var n = r.stack,
							i = l(e),
							s = n.indexOf("\n" + i);
						if (s >= 0) {
							var o = n.indexOf("\n", s + 1);
							n = n.substring(o + 1);
						}
						this.stack = n;
					}
				}
			}),
				o.inherits(d.AssertionError, Error),
				(d.fail = g),
				(d.ok = y),
				(d.equal = function (t, e, r) {
					t != e && g(t, e, r, "==", d.equal);
				}),
				(d.notEqual = function (t, e, r) {
					t == e && g(t, e, r, "!=", d.notEqual);
				}),
				(d.deepEqual = function (t, e, r) {
					v(t, e, !1) || g(t, e, r, "deepEqual", d.deepEqual);
				}),
				(d.deepStrictEqual = function (t, e, r) {
					v(t, e, !0) || g(t, e, r, "deepStrictEqual", d.deepStrictEqual);
				}),
				(d.notDeepEqual = function (t, e, r) {
					v(t, e, !1) && g(t, e, r, "notDeepEqual", d.notDeepEqual);
				}),
				(d.notDeepStrictEqual = function t(e, r, n) {
					v(e, r, !0) && g(e, r, n, "notDeepStrictEqual", t);
				}),
				(d.strictEqual = function (t, e, r) {
					t !== e && g(t, e, r, "===", d.strictEqual);
				}),
				(d.notStrictEqual = function (t, e, r) {
					t === e && g(t, e, r, "!==", d.notStrictEqual);
				}),
				(d.throws = function (t, e, r) {
					w(!0, t, e, r);
				}),
				(d.doesNotThrow = function (t, e, r) {
					w(!1, t, e, r);
				}),
				(d.ifError = function (t) {
					if (t) throw t;
				}),
				(d.strict = n(
					function t(e, r) {
						e || g(e, !0, r, "==", t);
					},
					d,
					{
						equal: d.strictEqual,
						deepEqual: d.deepStrictEqual,
						notEqual: d.notStrictEqual,
						notDeepEqual: d.notDeepStrictEqual,
					}
				)),
				(d.strict.strict = d.strict);
			var I =
				Object.keys ||
				function (t) {
					var e = [];
					for (var r in t) f.call(t, r) && e.push(r);
					return e;
				};
		}.call(this, r(34)));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(4);
			function o(t) {
				if (!(this instanceof o)) return new o(t);
				var e;
				if (n.isNumber(t)) e = t;
				else {
					if (!n.isString(t))
						throw new TypeError(
							'Unrecognized num type: "' + typeof t + '" for Opcode'
						);
					e = o.map[t];
				}
				return s.defineImmutable(this, { num: e }), this;
			}
			for (var f in ((o.fromBuffer = function (t) {
				return (
					i.checkArgument(e.isBuffer(t)),
					new o(Number("0x" + t.toString("hex")))
				);
			}),
			(o.fromNumber = function (t) {
				return i.checkArgument(n.isNumber(t)), new o(t);
			}),
			(o.fromString = function (t) {
				i.checkArgument(n.isString(t));
				var e = o.map[t];
				if (void 0 === e) throw new TypeError("Invalid opcodestr");
				return new o(e);
			}),
			(o.prototype.toHex = function () {
				return this.num.toString(16);
			}),
			(o.prototype.toBuffer = function () {
				return e.from(this.toHex(), "hex");
			}),
			(o.prototype.toNumber = function () {
				return this.num;
			}),
			(o.prototype.toString = function () {
				var t = o.reverseMap[this.num];
				if (void 0 === t)
					throw new Error("Opcode does not have a string representation");
				return t;
			}),
			(o.smallInt = function (t) {
				return (
					i.checkArgument(
						n.isNumber(t),
						"Invalid Argument: n should be number"
					),
					i.checkArgument(
						t >= 0 && t <= 16,
						"Invalid Argument: n must be between 0 and 16"
					),
					0 === t ? o("OP_0") : new o(o.map.OP_1 + t - 1)
				);
			}),
			(o.map = {
				OP_FALSE: 0,
				OP_0: 0,
				OP_PUSHDATA1: 76,
				OP_PUSHDATA2: 77,
				OP_PUSHDATA4: 78,
				OP_1NEGATE: 79,
				OP_RESERVED: 80,
				OP_TRUE: 81,
				OP_1: 81,
				OP_2: 82,
				OP_3: 83,
				OP_4: 84,
				OP_5: 85,
				OP_6: 86,
				OP_7: 87,
				OP_8: 88,
				OP_9: 89,
				OP_10: 90,
				OP_11: 91,
				OP_12: 92,
				OP_13: 93,
				OP_14: 94,
				OP_15: 95,
				OP_16: 96,
				OP_NOP: 97,
				OP_VER: 98,
				OP_IF: 99,
				OP_NOTIF: 100,
				OP_VERIF: 101,
				OP_VERNOTIF: 102,
				OP_ELSE: 103,
				OP_ENDIF: 104,
				OP_VERIFY: 105,
				OP_RETURN: 106,
				OP_TOALTSTACK: 107,
				OP_FROMALTSTACK: 108,
				OP_2DROP: 109,
				OP_2DUP: 110,
				OP_3DUP: 111,
				OP_2OVER: 112,
				OP_2ROT: 113,
				OP_2SWAP: 114,
				OP_IFDUP: 115,
				OP_DEPTH: 116,
				OP_DROP: 117,
				OP_DUP: 118,
				OP_NIP: 119,
				OP_OVER: 120,
				OP_PICK: 121,
				OP_ROLL: 122,
				OP_ROT: 123,
				OP_SWAP: 124,
				OP_TUCK: 125,
				OP_CAT: 126,
				OP_SPLIT: 127,
				OP_NUM2BIN: 128,
				OP_BIN2NUM: 129,
				OP_SIZE: 130,
				OP_INVERT: 131,
				OP_AND: 132,
				OP_OR: 133,
				OP_XOR: 134,
				OP_EQUAL: 135,
				OP_EQUALVERIFY: 136,
				OP_RESERVED1: 137,
				OP_RESERVED2: 138,
				OP_1ADD: 139,
				OP_1SUB: 140,
				OP_2MUL: 141,
				OP_2DIV: 142,
				OP_NEGATE: 143,
				OP_ABS: 144,
				OP_NOT: 145,
				OP_0NOTEQUAL: 146,
				OP_ADD: 147,
				OP_SUB: 148,
				OP_MUL: 149,
				OP_DIV: 150,
				OP_MOD: 151,
				OP_LSHIFT: 152,
				OP_RSHIFT: 153,
				OP_BOOLAND: 154,
				OP_BOOLOR: 155,
				OP_NUMEQUAL: 156,
				OP_NUMEQUALVERIFY: 157,
				OP_NUMNOTEQUAL: 158,
				OP_LESSTHAN: 159,
				OP_GREATERTHAN: 160,
				OP_LESSTHANOREQUAL: 161,
				OP_GREATERTHANOREQUAL: 162,
				OP_MIN: 163,
				OP_MAX: 164,
				OP_WITHIN: 165,
				OP_RIPEMD160: 166,
				OP_SHA1: 167,
				OP_SHA256: 168,
				OP_HASH160: 169,
				OP_HASH256: 170,
				OP_CODESEPARATOR: 171,
				OP_CHECKSIG: 172,
				OP_CHECKSIGVERIFY: 173,
				OP_CHECKMULTISIG: 174,
				OP_CHECKMULTISIGVERIFY: 175,
				OP_CHECKLOCKTIMEVERIFY: 177,
				OP_CHECKSEQUENCEVERIFY: 178,
				OP_NOP1: 176,
				OP_NOP2: 177,
				OP_NOP3: 178,
				OP_NOP4: 179,
				OP_NOP5: 180,
				OP_NOP6: 181,
				OP_NOP7: 182,
				OP_NOP8: 183,
				OP_NOP9: 184,
				OP_NOP10: 185,
				OP_PUBKEYHASH: 253,
				OP_PUBKEY: 254,
				OP_INVALIDOPCODE: 255,
			}),
			(o.reverseMap = []),
			o.map))
				o.reverseMap[o.map[f]] = f;
			n.extend(o, o.map),
				(o.isSmallIntOp = function (t) {
					return (
						t instanceof o && (t = t.toNumber()),
						t === o.map.OP_0 || (t >= o.map.OP_1 && t <= o.map.OP_16)
					);
				}),
				(o.prototype.inspect = function () {
					return (
						"<Opcode: " +
						this.toString() +
						", hex: " +
						this.toHex() +
						", decimal: " +
						this.num +
						">"
					);
				}),
				(t.exports = o);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		(t.exports = r(25)),
			(t.exports.PublicKey = r(95)),
			(t.exports.PublicKeyHash = r(96)),
			(t.exports.MultiSig = r(97)),
			(t.exports.MultiSigScriptHash = r(98));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(3),
				i = r(20),
				s = r(9),
				o = r(13),
				f = r(32),
				a = r(5),
				u = r(1),
				c = r(2),
				h = function t(e) {
					if (!(this instanceof t)) return new t(e);
					e && this.set(e);
				};
			(h.prototype.set = function (t) {
				return (
					(this.hashbuf = t.hashbuf || this.hashbuf),
					(this.endian = t.endian || this.endian),
					(this.privkey = t.privkey || this.privkey),
					(this.pubkey =
						t.pubkey || (this.privkey ? this.privkey.publicKey : this.pubkey)),
					(this.sig = t.sig || this.sig),
					(this.k = t.k || this.k),
					(this.verified = t.verified || this.verified),
					this
				);
			}),
				(h.prototype.privkey2pubkey = function () {
					this.pubkey = this.privkey.toPublicKey();
				}),
				(h.prototype.calci = function () {
					for (var t = 0; t < 4; t++) {
						var e;
						this.sig.i = t;
						try {
							e = this.toPublicKey();
						} catch (t) {
							console.error(t);
							continue;
						}
						if (e.point.eq(this.pubkey.point))
							return (this.sig.compressed = this.pubkey.compressed), this;
					}
					throw (
						((this.sig.i = void 0),
						new Error("Unable to find valid recovery factor"))
					);
				}),
				(h.fromString = function (t) {
					var e = JSON.parse(t);
					return new h(e);
				}),
				(h.prototype.randomK = function () {
					var t,
						e = i.getN();
					do {
						t = n.fromBuffer(f.getRandomBuffer(32));
					} while (!t.lt(e) || !t.gt(n.Zero));
					return (this.k = t), this;
				}),
				(h.prototype.deterministicK = function (t) {
					u.isUndefined(t) && (t = 0);
					var r = e.alloc(32);
					r.fill(1);
					var s = e.alloc(32);
					s.fill(0);
					var o = this.privkey.bn.toBuffer({ size: 32 }),
						f =
							"little" === this.endian
								? e.from(this.hashbuf).reverse()
								: this.hashbuf;
					(s = a.sha256hmac(e.concat([r, e.from([0]), o, f]), s)),
						(r = a.sha256hmac(r, s)),
						(s = a.sha256hmac(e.concat([r, e.from([1]), o, f]), s)),
						(r = a.sha256hmac(r, s)),
						(r = a.sha256hmac(r, s));
					for (
						var c = n.fromBuffer(r), h = i.getN(), d = 0;
						d < t || !c.lt(h) || !c.gt(n.Zero);
						d++
					)
						(s = a.sha256hmac(e.concat([r, e.from([0])]), s)),
							(r = a.sha256hmac(r, s)),
							(r = a.sha256hmac(r, s)),
							(c = n.fromBuffer(r));
					return (this.k = c), this;
				}),
				(h.prototype.toPublicKey = function () {
					var t = this.sig.i;
					c.checkArgument(
						0 === t || 1 === t || 2 === t || 3 === t,
						new Error("i must be equal to 0, 1, 2, or 3")
					);
					var e = n.fromBuffer(this.hashbuf),
						r = this.sig.r,
						s = this.sig.s,
						f = 1 & t,
						a = t >> 1,
						u = i.getN(),
						h = i.getG(),
						d = a ? r.add(u) : r,
						p = i.fromX(f, d);
					if (!p.mul(u).isInfinity())
						throw new Error("nR is not a valid curve point");
					var l = e.neg().umod(u),
						b = r.invm(u),
						m = p.mul(s).add(h.mul(l)).mul(b);
					return o.fromPoint(m, this.sig.compressed);
				}),
				(h.prototype.sigError = function () {
					if (!e.isBuffer(this.hashbuf) || 32 !== this.hashbuf.length)
						return "hashbuf must be a 32 byte buffer";
					var t = this.sig.r,
						r = this.sig.s;
					if (
						!(t.gt(n.Zero) && t.lt(i.getN()) && r.gt(n.Zero) && r.lt(i.getN()))
					)
						return "r and s not in range";
					var s = n.fromBuffer(
							this.hashbuf,
							this.endian ? { endian: this.endian } : void 0
						),
						o = i.getN(),
						f = r.invm(o),
						a = f.mul(s).umod(o),
						u = f.mul(t).umod(o),
						c = i.getG().mulAdd(a, this.pubkey.point, u);
					return c.isInfinity()
						? "p is infinity"
						: 0 !== c.getX().umod(o).cmp(t) && "Invalid signature";
				}),
				(h.toLowS = function (t) {
					return (
						t.gt(
							n.fromBuffer(
								e.from(
									"7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0",
									"hex"
								)
							)
						) && (t = i.getN().sub(t)),
						t
					);
				}),
				(h.prototype._findSignature = function (t, e) {
					var r,
						s,
						o,
						f = i.getN(),
						a = i.getG(),
						u = 0;
					do {
						(!this.k || u > 0) && this.deterministicK(u),
							u++,
							(r = this.k),
							(s = a.mul(r).x.umod(f)),
							(o = r
								.invm(f)
								.mul(e.add(t.mul(s)))
								.umod(f));
					} while (s.cmp(n.Zero) <= 0 || o.cmp(n.Zero) <= 0);
					return { s: (o = h.toLowS(o)), r: s };
				}),
				(h.prototype.sign = function () {
					var t = this.hashbuf,
						r = this.privkey,
						i = r.bn;
					c.checkState(t && r && i, new Error("invalid parameters")),
						c.checkState(
							e.isBuffer(t) && 32 === t.length,
							new Error("hashbuf must be a 32 byte buffer")
						);
					var o = n.fromBuffer(
							t,
							this.endian ? { endian: this.endian } : void 0
						),
						f = this._findSignature(i, o);
					return (
						(f.compressed = this.pubkey.compressed), (this.sig = new s(f)), this
					);
				}),
				(h.prototype.signRandomK = function () {
					return this.randomK(), this.sign();
				}),
				(h.prototype.toString = function () {
					var t = {};
					return (
						this.hashbuf && (t.hashbuf = this.hashbuf.toString("hex")),
						this.privkey && (t.privkey = this.privkey.toString()),
						this.pubkey && (t.pubkey = this.pubkey.toString()),
						this.sig && (t.sig = this.sig.toString()),
						this.k && (t.k = this.k.toString()),
						JSON.stringify(t)
					);
				}),
				(h.prototype.verify = function () {
					return (
						this.sigError() ? (this.verified = !1) : (this.verified = !0), this
					);
				}),
				(h.sign = function (t, e, r) {
					return h().set({ hashbuf: t, endian: r, privkey: e }).sign().sig;
				}),
				(h.signWithCalcI = function (t, e, r) {
					return h().set({ hashbuf: t, endian: r, privkey: e }).sign().calci()
						.sig;
				}),
				(h.signRandomK = function (t, e, r) {
					return h().set({ hashbuf: t, endian: r, privkey: e }).signRandomK()
						.sig;
				}),
				(h.verify = function (t, e, r, n) {
					return h().set({ hashbuf: t, endian: n, sig: e, pubkey: r }).verify()
						.verified;
				}),
				(t.exports = h);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		var n = e;
		function i(t) {
			return 1 === t.length ? "0" + t : t;
		}
		function s(t) {
			for (var e = "", r = 0; r < t.length; r++) e += i(t[r].toString(16));
			return e;
		}
		(n.toArray = function (t, e) {
			if (Array.isArray(t)) return t.slice();
			if (!t) return [];
			var r = [];
			if ("string" != typeof t) {
				for (var n = 0; n < t.length; n++) r[n] = 0 | t[n];
				return r;
			}
			if ("hex" === e) {
				(t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t);
				for (n = 0; n < t.length; n += 2) r.push(parseInt(t[n] + t[n + 1], 16));
			} else
				for (n = 0; n < t.length; n++) {
					var i = t.charCodeAt(n),
						s = i >> 8,
						o = 255 & i;
					s ? r.push(s, o) : r.push(o);
				}
			return r;
		}),
			(n.zero2 = i),
			(n.toHex = s),
			(n.encode = function (t, e) {
				return "hex" === e ? s(t) : t;
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(12).rotr32;
		function i(t, e, r) {
			return (t & e) ^ (~t & r);
		}
		function s(t, e, r) {
			return (t & e) ^ (t & r) ^ (e & r);
		}
		function o(t, e, r) {
			return t ^ e ^ r;
		}
		(e.ft_1 = function (t, e, r, n) {
			return 0 === t
				? i(e, r, n)
				: 1 === t || 3 === t
				? o(e, r, n)
				: 2 === t
				? s(e, r, n)
				: void 0;
		}),
			(e.ch32 = i),
			(e.maj32 = s),
			(e.p32 = o),
			(e.s0_256 = function (t) {
				return n(t, 2) ^ n(t, 13) ^ n(t, 22);
			}),
			(e.s1_256 = function (t) {
				return n(t, 6) ^ n(t, 11) ^ n(t, 25);
			}),
			(e.g0_256 = function (t) {
				return n(t, 7) ^ n(t, 18) ^ (t >>> 3);
			}),
			(e.g1_256 = function (t) {
				return n(t, 17) ^ n(t, 19) ^ (t >>> 10);
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(22),
			s = r(42),
			o = r(18),
			f = n.sum32,
			a = n.sum32_4,
			u = n.sum32_5,
			c = s.ch32,
			h = s.maj32,
			d = s.s0_256,
			p = s.s1_256,
			l = s.g0_256,
			b = s.g1_256,
			m = i.BlockHash,
			g = [
				1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
				2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
				1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
				264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
				2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
				113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
				1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
				3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
				430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
				1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
				2428436474, 2756734187, 3204031479, 3329325298,
			];
		function y() {
			if (!(this instanceof y)) return new y();
			m.call(this),
				(this.h = [
					1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
					2600822924, 528734635, 1541459225,
				]),
				(this.k = g),
				(this.W = new Array(64));
		}
		n.inherits(y, m),
			(t.exports = y),
			(y.blockSize = 512),
			(y.outSize = 256),
			(y.hmacStrength = 192),
			(y.padLength = 64),
			(y.prototype._update = function (t, e) {
				for (var r = this.W, n = 0; n < 16; n++) r[n] = t[e + n];
				for (; n < r.length; n++)
					r[n] = a(b(r[n - 2]), r[n - 7], l(r[n - 15]), r[n - 16]);
				var i = this.h[0],
					s = this.h[1],
					m = this.h[2],
					g = this.h[3],
					y = this.h[4],
					v = this.h[5],
					_ = this.h[6],
					S = this.h[7];
				for (o(this.k.length === r.length), n = 0; n < r.length; n++) {
					var w = u(S, p(y), c(y, v, _), this.k[n], r[n]),
						I = f(d(i), h(i, s, m));
					(S = _),
						(_ = v),
						(v = y),
						(y = f(g, w)),
						(g = m),
						(m = s),
						(s = i),
						(i = f(w, I));
				}
				(this.h[0] = f(this.h[0], i)),
					(this.h[1] = f(this.h[1], s)),
					(this.h[2] = f(this.h[2], m)),
					(this.h[3] = f(this.h[3], g)),
					(this.h[4] = f(this.h[4], y)),
					(this.h[5] = f(this.h[5], v)),
					(this.h[6] = f(this.h[6], _)),
					(this.h[7] = f(this.h[7], S));
			}),
			(y.prototype._digest = function (t) {
				return "hex" === t
					? n.toHex32(this.h, "big")
					: n.split32(this.h, "big");
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(22),
			s = r(18),
			o = n.rotr64_hi,
			f = n.rotr64_lo,
			a = n.shr64_hi,
			u = n.shr64_lo,
			c = n.sum64,
			h = n.sum64_hi,
			d = n.sum64_lo,
			p = n.sum64_4_hi,
			l = n.sum64_4_lo,
			b = n.sum64_5_hi,
			m = n.sum64_5_lo,
			g = i.BlockHash,
			y = [
				1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
				3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
				2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
				310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
				1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
				3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
				264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
				1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
				2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
				3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
				113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
				773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
				1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
				2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
				3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
				3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
				430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
				883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
				1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
				2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
				2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
				3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
				3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
				174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
				685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
				1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
				1607167915, 987167468, 1816402316, 1246189591,
			];
		function v() {
			if (!(this instanceof v)) return new v();
			g.call(this),
				(this.h = [
					1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
					4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
					2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209,
				]),
				(this.k = y),
				(this.W = new Array(160));
		}
		function _(t, e, r, n, i) {
			var s = (t & r) ^ (~t & i);
			return s < 0 && (s += 4294967296), s;
		}
		function S(t, e, r, n, i, s) {
			var o = (e & n) ^ (~e & s);
			return o < 0 && (o += 4294967296), o;
		}
		function w(t, e, r, n, i) {
			var s = (t & r) ^ (t & i) ^ (r & i);
			return s < 0 && (s += 4294967296), s;
		}
		function I(t, e, r, n, i, s) {
			var o = (e & n) ^ (e & s) ^ (n & s);
			return o < 0 && (o += 4294967296), o;
		}
		function A(t, e) {
			var r = o(t, e, 28) ^ o(e, t, 2) ^ o(e, t, 7);
			return r < 0 && (r += 4294967296), r;
		}
		function E(t, e) {
			var r = f(t, e, 28) ^ f(e, t, 2) ^ f(e, t, 7);
			return r < 0 && (r += 4294967296), r;
		}
		function P(t, e) {
			var r = o(t, e, 14) ^ o(t, e, 18) ^ o(e, t, 9);
			return r < 0 && (r += 4294967296), r;
		}
		function O(t, e) {
			var r = f(t, e, 14) ^ f(t, e, 18) ^ f(e, t, 9);
			return r < 0 && (r += 4294967296), r;
		}
		function k(t, e) {
			var r = o(t, e, 1) ^ o(t, e, 8) ^ a(t, e, 7);
			return r < 0 && (r += 4294967296), r;
		}
		function R(t, e) {
			var r = f(t, e, 1) ^ f(t, e, 8) ^ u(t, e, 7);
			return r < 0 && (r += 4294967296), r;
		}
		function M(t, e) {
			var r = o(t, e, 19) ^ o(e, t, 29) ^ a(t, e, 6);
			return r < 0 && (r += 4294967296), r;
		}
		function x(t, e) {
			var r = f(t, e, 19) ^ f(e, t, 29) ^ u(t, e, 6);
			return r < 0 && (r += 4294967296), r;
		}
		n.inherits(v, g),
			(t.exports = v),
			(v.blockSize = 1024),
			(v.outSize = 512),
			(v.hmacStrength = 192),
			(v.padLength = 128),
			(v.prototype._prepareBlock = function (t, e) {
				for (var r = this.W, n = 0; n < 32; n++) r[n] = t[e + n];
				for (; n < r.length; n += 2) {
					var i = M(r[n - 4], r[n - 3]),
						s = x(r[n - 4], r[n - 3]),
						o = r[n - 14],
						f = r[n - 13],
						a = k(r[n - 30], r[n - 29]),
						u = R(r[n - 30], r[n - 29]),
						c = r[n - 32],
						h = r[n - 31];
					(r[n] = p(i, s, o, f, a, u, c, h)),
						(r[n + 1] = l(i, s, o, f, a, u, c, h));
				}
			}),
			(v.prototype._update = function (t, e) {
				this._prepareBlock(t, e);
				var r = this.W,
					n = this.h[0],
					i = this.h[1],
					o = this.h[2],
					f = this.h[3],
					a = this.h[4],
					u = this.h[5],
					p = this.h[6],
					l = this.h[7],
					g = this.h[8],
					y = this.h[9],
					v = this.h[10],
					k = this.h[11],
					R = this.h[12],
					M = this.h[13],
					x = this.h[14],
					T = this.h[15];
				s(this.k.length === r.length);
				for (var B = 0; B < r.length; B += 2) {
					var N = x,
						C = T,
						U = P(g, y),
						L = O(g, y),
						H = _(g, y, v, k, R),
						D = S(g, y, v, k, R, M),
						F = this.k[B],
						K = this.k[B + 1],
						z = r[B],
						j = r[B + 1],
						V = b(N, C, U, L, H, D, F, K, z, j),
						q = m(N, C, U, L, H, D, F, K, z, j);
					(N = A(n, i)),
						(C = E(n, i)),
						(U = w(n, i, o, f, a)),
						(L = I(n, i, o, f, a, u));
					var Y = h(N, C, U, L),
						G = d(N, C, U, L);
					(x = R),
						(T = M),
						(R = v),
						(M = k),
						(v = g),
						(k = y),
						(g = h(p, l, V, q)),
						(y = d(l, l, V, q)),
						(p = a),
						(l = u),
						(a = o),
						(u = f),
						(o = n),
						(f = i),
						(n = h(V, q, Y, G)),
						(i = d(V, q, Y, G));
				}
				c(this.h, 0, n, i),
					c(this.h, 2, o, f),
					c(this.h, 4, a, u),
					c(this.h, 6, p, l),
					c(this.h, 8, g, y),
					c(this.h, 10, v, k),
					c(this.h, 12, R, M),
					c(this.h, 14, x, T);
			}),
			(v.prototype._digest = function (t) {
				return "hex" === t
					? n.toHex32(this.h, "big")
					: n.split32(this.h, "big");
			});
	},
	function (t, e, r) {
		var n = r(86);
		t.exports = n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(21),
				i = r(15),
				s = r(14),
				o = r(5),
				f = r(38),
				a = r(13),
				u = r(9),
				c = r(19),
				h = r(2),
				d = r(1),
				p = r(8),
				l = r(0),
				b = r(4),
				m = function t(r) {
					return this instanceof t
						? ((this.chunks = []),
						  e.isBuffer(r)
								? t.fromBuffer(r)
								: r instanceof n
								? t.fromAddress(r)
								: r instanceof t
								? t.fromBuffer(r.toBuffer())
								: d.isString(r)
								? t.fromString(r)
								: void (d.isObject(r) && d.isArray(r.chunks) && this.set(r)))
						: new t(r);
				};
			(m.prototype.set = function (t) {
				return (
					h.checkArgument(d.isObject(t)),
					h.checkArgument(d.isArray(t.chunks)),
					(this.chunks = t.chunks),
					this
				);
			}),
				(m.fromBuffer = function (t) {
					var e = new m();
					e.chunks = [];
					for (var r = new i(t); !r.finished(); )
						try {
							var n,
								s,
								o = r.readUInt8();
							o > 0 && o < f.OP_PUSHDATA1
								? ((n = o),
								  e.chunks.push({ buf: r.read(n), len: n, opcodenum: o }))
								: o === f.OP_PUSHDATA1
								? ((n = r.readUInt8()),
								  (s = r.read(n)),
								  e.chunks.push({ buf: s, len: n, opcodenum: o }))
								: o === f.OP_PUSHDATA2
								? ((n = r.readUInt16LE()),
								  (s = r.read(n)),
								  e.chunks.push({ buf: s, len: n, opcodenum: o }))
								: o === f.OP_PUSHDATA4
								? ((n = r.readUInt32LE()),
								  (s = r.read(n)),
								  e.chunks.push({ buf: s, len: n, opcodenum: o }))
								: e.chunks.push({ opcodenum: o });
						} catch (e) {
							if (e instanceof RangeError)
								throw new p.Script.InvalidBuffer(t.toString("hex"));
							throw e;
						}
					return e;
				}),
				(m.prototype.toBuffer = function () {
					for (var t = new s(), e = 0; e < this.chunks.length; e++) {
						var r = this.chunks[e],
							n = r.opcodenum;
						t.writeUInt8(r.opcodenum),
							r.buf &&
								(n < f.OP_PUSHDATA1
									? t.write(r.buf)
									: n === f.OP_PUSHDATA1
									? (t.writeUInt8(r.len), t.write(r.buf))
									: n === f.OP_PUSHDATA2
									? (t.writeUInt16LE(r.len), t.write(r.buf))
									: n === f.OP_PUSHDATA4 &&
									  (t.writeUInt32LE(r.len), t.write(r.buf)));
					}
					return t.concat();
				}),
				(m.fromASM = function (t) {
					var r = new m();
					r.chunks = [];
					for (var n = t.split(" "), i = 0; i < n.length; ) {
						var s = n[i],
							o = f(s).toNumber();
						if ("0" === s) (o = 0), r.chunks.push({ opcodenum: o }), (i += 1);
						else if ("-1" === s)
							(o = f.OP_1NEGATE), r.chunks.push({ opcodenum: o }), (i += 1);
						else if (d.isUndefined(o)) {
							var a = e.from(n[i], "hex");
							if (a.toString("hex") !== n[i])
								throw new Error("invalid hex string in script");
							var u = a.length;
							u >= 0 && u < f.OP_PUSHDATA1
								? (o = u)
								: u < Math.pow(2, 8)
								? (o = f.OP_PUSHDATA1)
								: u < Math.pow(2, 16)
								? (o = f.OP_PUSHDATA2)
								: u < Math.pow(2, 32) && (o = f.OP_PUSHDATA4),
								r.chunks.push({ buf: a, len: a.length, opcodenum: o }),
								(i += 1);
						} else r.chunks.push({ opcodenum: o }), (i += 1);
					}
					return r;
				}),
				(m.fromHex = function (t) {
					return new m(l.Buffer.from(t, "hex"));
				}),
				(m.fromString = function (t) {
					if (b.isHexa(t) || 0 === t.length)
						return new m(l.Buffer.from(t, "hex"));
					var r = new m();
					r.chunks = [];
					for (var n = t.split(" "), i = 0; i < n.length; ) {
						var s = n[i],
							o = f(s).toNumber();
						if (d.isUndefined(o)) {
							if (!((o = parseInt(s)) > 0 && o < f.OP_PUSHDATA1))
								throw new Error("Invalid script: " + JSON.stringify(t));
							r.chunks.push({
								buf: e.from(n[i + 1].slice(2), "hex"),
								len: o,
								opcodenum: o,
							}),
								(i += 2);
						} else if (
							o === f.OP_PUSHDATA1 ||
							o === f.OP_PUSHDATA2 ||
							o === f.OP_PUSHDATA4
						) {
							if ("0x" !== n[i + 2].slice(0, 2))
								throw new Error("Pushdata data must start with 0x");
							r.chunks.push({
								buf: e.from(n[i + 2].slice(2), "hex"),
								len: parseInt(n[i + 1]),
								opcodenum: o,
							}),
								(i += 3);
						} else r.chunks.push({ opcodenum: o }), (i += 1);
					}
					return r;
				}),
				(m.prototype._chunkToString = function (t, e) {
					var r = t.opcodenum,
						n = "asm" === e,
						i = "";
					if (t.buf)
						n ||
							(r !== f.OP_PUSHDATA1 &&
								r !== f.OP_PUSHDATA2 &&
								r !== f.OP_PUSHDATA4) ||
							(i = i + " " + f(r).toString()),
							t.len > 0 &&
								(i = n
									? i + " " + t.buf.toString("hex")
									: i + " " + t.len + " 0x" + t.buf.toString("hex"));
					else if (void 0 !== f.reverseMap[r])
						n
							? 0 === r
								? (i += " 0")
								: 79 === r
								? (i += " -1")
								: (i = i + " " + f(r).toString())
							: (i = i + " " + f(r).toString());
					else {
						var s = r.toString(16);
						s.length % 2 != 0 && (s = "0" + s),
							(i = n ? i + " " + s : i + " 0x" + s);
					}
					return i;
				}),
				(m.prototype.toASM = function () {
					for (var t = "", e = 0; e < this.chunks.length; e++) {
						var r = this.chunks[e];
						t += this._chunkToString(r, "asm");
					}
					return t.substr(1);
				}),
				(m.prototype.toString = function () {
					for (var t = "", e = 0; e < this.chunks.length; e++) {
						var r = this.chunks[e];
						t += this._chunkToString(r);
					}
					return t.substr(1);
				}),
				(m.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(m.prototype.inspect = function () {
					return "<Script: " + this.toString() + ">";
				}),
				(m.prototype.isPublicKeyHashOut = function () {
					return !(
						5 !== this.chunks.length ||
						this.chunks[0].opcodenum !== f.OP_DUP ||
						this.chunks[1].opcodenum !== f.OP_HASH160 ||
						!this.chunks[2].buf ||
						20 !== this.chunks[2].buf.length ||
						this.chunks[3].opcodenum !== f.OP_EQUALVERIFY ||
						this.chunks[4].opcodenum !== f.OP_CHECKSIG
					);
				}),
				(m.prototype.isPublicKeyHashIn = function () {
					if (2 === this.chunks.length) {
						var t = this.chunks[0].buf,
							e = this.chunks[1].buf;
						if (t && t.length && 48 === t[0] && e && e.length) {
							var r = e[0];
							if ((4 === r || 6 === r || 7 === r) && 65 === e.length) return !0;
							if ((3 === r || 2 === r) && 33 === e.length) return !0;
						}
					}
					return !1;
				}),
				(m.prototype.getPublicKey = function () {
					return (
						h.checkState(
							this.isPublicKeyOut(),
							"Can't retrieve PublicKey from a non-PK output"
						),
						this.chunks[0].buf
					);
				}),
				(m.prototype.getPublicKeyHash = function () {
					return (
						h.checkState(
							this.isPublicKeyHashOut(),
							"Can't retrieve PublicKeyHash from a non-PKH output"
						),
						this.chunks[2].buf
					);
				}),
				(m.prototype.isPublicKeyOut = function () {
					if (
						2 === this.chunks.length &&
						this.chunks[0].buf &&
						this.chunks[0].buf.length &&
						this.chunks[1].opcodenum === f.OP_CHECKSIG
					) {
						var t = this.chunks[0].buf,
							e = t[0],
							r = !1;
						if (
							((((4 !== e && 6 !== e && 7 !== e) || 65 !== t.length) &&
								((3 !== e && 2 !== e) || 33 !== t.length)) ||
								(r = !0),
							r)
						)
							return a.isValid(t);
					}
					return !1;
				}),
				(m.prototype.isPublicKeyIn = function () {
					if (1 === this.chunks.length) {
						var t = this.chunks[0].buf;
						if (t && t.length && 48 === t[0]) return !0;
					}
					return !1;
				}),
				(m.prototype.isScriptHashOut = function () {
					var t = this.toBuffer();
					return (
						23 === t.length &&
						t[0] === f.OP_HASH160 &&
						20 === t[1] &&
						t[t.length - 1] === f.OP_EQUAL
					);
				}),
				(m.prototype.isScriptHashIn = function () {
					if (this.chunks.length <= 1) return !1;
					var t,
						e = this.chunks[this.chunks.length - 1].buf;
					if (!e) return !1;
					try {
						t = m.fromBuffer(e);
					} catch (t) {
						if (t instanceof p.Script.InvalidBuffer) return !1;
						throw t;
					}
					return t.classify() !== m.types.UNKNOWN;
				}),
				(m.prototype.isMultisigOut = function () {
					return (
						this.chunks.length > 3 &&
						f.isSmallIntOp(this.chunks[0].opcodenum) &&
						this.chunks.slice(1, this.chunks.length - 2).every(function (t) {
							return t.buf && e.isBuffer(t.buf);
						}) &&
						f.isSmallIntOp(this.chunks[this.chunks.length - 2].opcodenum) &&
						this.chunks[this.chunks.length - 1].opcodenum === f.OP_CHECKMULTISIG
					);
				}),
				(m.prototype.isMultisigIn = function () {
					return (
						this.chunks.length >= 2 &&
						0 === this.chunks[0].opcodenum &&
						this.chunks.slice(1, this.chunks.length).every(function (t) {
							return t.buf && e.isBuffer(t.buf) && u.isTxDER(t.buf);
						})
					);
				}),
				(m.prototype.isDataOut = function () {
					if (
						!(
							this.chunks.length >= 1 &&
							this.chunks[0].opcodenum === f.OP_RETURN
						)
					)
						return !1;
					var t = this.chunks.slice(1);
					return new m({ chunks: t }).isPushOnly();
				}),
				(m.prototype.isSafeDataOut = function () {
					if (this.chunks.length < 2) return !1;
					if (this.chunks[0].opcodenum !== f.OP_FALSE) return !1;
					var t = this.chunks.slice(1);
					return new m({ chunks: t }).isDataOut();
				}),
				(m.prototype.getData = function () {
					if (this.isSafeDataOut())
						return this.chunks.slice(2).map((t) => t.buf);
					if (this.isDataOut() || this.isScriptHashOut())
						return d.isUndefined(this.chunks[1])
							? e.alloc(0)
							: e.from(this.chunks[1].buf);
					if (this.isPublicKeyHashOut()) return e.from(this.chunks[2].buf);
					throw new Error("Unrecognized script type to get data from");
				}),
				(m.prototype.isPushOnly = function () {
					return d.every(this.chunks, function (t) {
						return (
							t.opcodenum <= f.OP_16 ||
							t.opcodenum === f.OP_PUSHDATA1 ||
							t.opcodenum === f.OP_PUSHDATA2 ||
							t.opcodenum === f.OP_PUSHDATA4
						);
					});
				}),
				((m.types = {}).UNKNOWN = "Unknown"),
				(m.types.PUBKEY_OUT = "Pay to public key"),
				(m.types.PUBKEY_IN = "Spend from public key"),
				(m.types.PUBKEYHASH_OUT = "Pay to public key hash"),
				(m.types.PUBKEYHASH_IN = "Spend from public key hash"),
				(m.types.SCRIPTHASH_OUT = "Pay to script hash"),
				(m.types.SCRIPTHASH_IN = "Spend from script hash"),
				(m.types.MULTISIG_OUT = "Pay to multisig"),
				(m.types.MULTISIG_IN = "Spend from multisig"),
				(m.types.DATA_OUT = "Data push"),
				(m.types.SAFE_DATA_OUT = "Safe data push"),
				(m.OP_RETURN_STANDARD_SIZE = 220),
				(m.prototype.classify = function () {
					if (this._isInput) return this.classifyInput();
					if (this._isOutput) return this.classifyOutput();
					var t = this.classifyOutput();
					return t !== m.types.UNKNOWN ? t : this.classifyInput();
				}),
				((m.outputIdentifiers = {}).PUBKEY_OUT = m.prototype.isPublicKeyOut),
				(m.outputIdentifiers.PUBKEYHASH_OUT = m.prototype.isPublicKeyHashOut),
				(m.outputIdentifiers.MULTISIG_OUT = m.prototype.isMultisigOut),
				(m.outputIdentifiers.SCRIPTHASH_OUT = m.prototype.isScriptHashOut),
				(m.outputIdentifiers.DATA_OUT = m.prototype.isDataOut),
				(m.outputIdentifiers.SAFE_DATA_OUT = m.prototype.isSafeDataOut),
				(m.prototype.classifyOutput = function () {
					for (var t in m.outputIdentifiers)
						if (m.outputIdentifiers[t].bind(this)()) return m.types[t];
					return m.types.UNKNOWN;
				}),
				((m.inputIdentifiers = {}).PUBKEY_IN = m.prototype.isPublicKeyIn),
				(m.inputIdentifiers.PUBKEYHASH_IN = m.prototype.isPublicKeyHashIn),
				(m.inputIdentifiers.MULTISIG_IN = m.prototype.isMultisigIn),
				(m.inputIdentifiers.SCRIPTHASH_IN = m.prototype.isScriptHashIn),
				(m.prototype.classifyInput = function () {
					for (var t in m.inputIdentifiers)
						if (m.inputIdentifiers[t].bind(this)()) return m.types[t];
					return m.types.UNKNOWN;
				}),
				(m.prototype.isStandard = function () {
					return this.classify() !== m.types.UNKNOWN;
				}),
				(m.prototype.prepend = function (t) {
					return this._addByType(t, !0), this;
				}),
				(m.prototype.equals = function (t) {
					if (
						(h.checkState(t instanceof m, "Must provide another script"),
						this.chunks.length !== t.chunks.length)
					)
						return !1;
					var r;
					for (r = 0; r < this.chunks.length; r++) {
						if (e.isBuffer(this.chunks[r].buf) && !e.isBuffer(t.chunks[r].buf))
							return !1;
						if (
							e.isBuffer(this.chunks[r].buf) &&
							!this.chunks[r].buf.equals(t.chunks[r].buf)
						)
							return !1;
						if (this.chunks[r].opcodenum !== t.chunks[r].opcodenum) return !1;
					}
					return !0;
				}),
				(m.prototype.add = function (t) {
					return this._addByType(t, !1), this;
				}),
				(m.prototype._addByType = function (t, r) {
					if ("string" == typeof t) this._addOpcode(t, r);
					else if ("number" == typeof t) this._addOpcode(t, r);
					else if (t instanceof f) this._addOpcode(t, r);
					else if (e.isBuffer(t)) this._addBuffer(t, r);
					else if (t instanceof m) this.chunks = this.chunks.concat(t.chunks);
					else {
						if ("object" != typeof t) throw new Error("Invalid script chunk");
						this._insertAtPosition(t, r);
					}
				}),
				(m.prototype._insertAtPosition = function (t, e) {
					e ? this.chunks.unshift(t) : this.chunks.push(t);
				}),
				(m.prototype._addOpcode = function (t, e) {
					var r;
					return (
						(r =
							"number" == typeof t
								? t
								: t instanceof f
								? t.toNumber()
								: f(t).toNumber()),
						this._insertAtPosition({ opcodenum: r }, e),
						this
					);
				}),
				(m.prototype._addBuffer = function (t, e) {
					var r,
						n = t.length;
					if (n >= 0 && n < f.OP_PUSHDATA1) r = n;
					else if (n < Math.pow(2, 8)) r = f.OP_PUSHDATA1;
					else if (n < Math.pow(2, 16)) r = f.OP_PUSHDATA2;
					else {
						if (!(n < Math.pow(2, 32)))
							throw new Error("You can't push that much data");
						r = f.OP_PUSHDATA4;
					}
					return (
						this._insertAtPosition({ buf: t, len: n, opcodenum: r }, e), this
					);
				}),
				(m.prototype.removeCodeseparators = function () {
					for (var t = [], e = 0; e < this.chunks.length; e++)
						this.chunks[e].opcodenum !== f.OP_CODESEPARATOR &&
							t.push(this.chunks[e]);
					return (this.chunks = t), this;
				}),
				(m.buildMultisigOut = function (t, e, r) {
					h.checkArgument(
						e <= t.length,
						"Number of required signatures must be less than or equal to the number of public keys"
					),
						(r = r || {});
					var n = new m();
					n.add(f.smallInt(e));
					var i = (t = d.map(t, a));
					r.noSorting ||
						(i = t
							.map((t) => t.toString("hex"))
							.sort()
							.map((t) => new a(t)));
					for (var s = 0; s < i.length; s++) {
						var o = i[s];
						n.add(o.toBuffer());
					}
					return n.add(f.smallInt(t.length)), n.add(f.OP_CHECKMULTISIG), n;
				}),
				(m.buildMultisigIn = function (t, r, n, i) {
					h.checkArgument(d.isArray(t)),
						h.checkArgument(d.isNumber(r)),
						h.checkArgument(d.isArray(n)),
						(i = i || {});
					var s = new m();
					return (
						s.add(f.OP_0),
						d.each(n, function (t) {
							h.checkArgument(
								e.isBuffer(t),
								"Signatures must be an array of Buffers"
							),
								s.add(t);
						}),
						s
					);
				}),
				(m.buildP2SHMultisigIn = function (t, r, n, i) {
					h.checkArgument(d.isArray(t)),
						h.checkArgument(d.isNumber(r)),
						h.checkArgument(d.isArray(n)),
						(i = i || {});
					var s = new m();
					return (
						s.add(f.OP_0),
						d.each(n, function (t) {
							h.checkArgument(
								e.isBuffer(t),
								"Signatures must be an array of Buffers"
							),
								s.add(t);
						}),
						s.add((i.cachedMultisig || m.buildMultisigOut(t, r, i)).toBuffer()),
						s
					);
				}),
				(m.buildPublicKeyHashOut = function (t) {
					h.checkArgument(!d.isUndefined(t)),
						h.checkArgument(t instanceof a || t instanceof n || d.isString(t)),
						t instanceof a
							? (t = t.toAddress())
							: d.isString(t) && (t = new n(t));
					var e = new m();
					return (
						e
							.add(f.OP_DUP)
							.add(f.OP_HASH160)
							.add(t.hashBuffer)
							.add(f.OP_EQUALVERIFY)
							.add(f.OP_CHECKSIG),
						(e._network = t.network),
						e
					);
				}),
				(m.buildPublicKeyOut = function (t) {
					h.checkArgument(t instanceof a);
					var e = new m();
					return e.add(t.toBuffer()).add(f.OP_CHECKSIG), e;
				}),
				(m.buildDataOut = function (t, r) {
					h.checkArgument(
						d.isUndefined(t) || d.isString(t) || d.isArray(t) || e.isBuffer(t)
					);
					var n = t;
					d.isArray(n) || (n = [t]);
					var i = new m();
					i.add(f.OP_RETURN);
					for (let t of n)
						h.checkArgument(d.isUndefined(t) || d.isString(t) || e.isBuffer(t)),
							d.isString(t) && (t = e.from(t, r)),
							d.isUndefined(t) || i.add(t);
					return i;
				}),
				(m.buildSafeDataOut = function (t, e) {
					var r = m.buildDataOut(t, e),
						n = new m();
					return n.add(f.OP_FALSE), n.add(r), n;
				}),
				(m.buildScriptHashOut = function (t) {
					h.checkArgument(
						t instanceof m || (t instanceof n && t.isPayToScriptHash())
					);
					var e = new m();
					return (
						e
							.add(f.OP_HASH160)
							.add(
								t instanceof n ? t.hashBuffer : o.sha256ripemd160(t.toBuffer())
							)
							.add(f.OP_EQUAL),
						(e._network = t._network || t.network),
						e
					);
				}),
				(m.buildPublicKeyIn = function (t, r) {
					h.checkArgument(t instanceof u || e.isBuffer(t)),
						h.checkArgument(d.isUndefined(r) || d.isNumber(r)),
						t instanceof u && (t = t.toBuffer());
					var n = new m();
					return n.add(e.concat([t, e.from([255 & (r || u.SIGHASH_ALL)])])), n;
				}),
				(m.buildPublicKeyHashIn = function (t, r, n) {
					return (
						h.checkArgument(r instanceof u || e.isBuffer(r)),
						h.checkArgument(d.isUndefined(n) || d.isNumber(n)),
						r instanceof u && (r = r.toBuffer()),
						new m()
							.add(e.concat([r, e.from([255 & (n || u.SIGHASH_ALL)])]))
							.add(new a(t).toBuffer())
					);
				}),
				(m.empty = function () {
					return new m();
				}),
				(m.prototype.toScriptHashOut = function () {
					return m.buildScriptHashOut(this);
				}),
				(m.fromAddress = function (t) {
					if ((t = n(t)).isPayToScriptHash()) return m.buildScriptHashOut(t);
					if (t.isPayToPublicKeyHash()) return m.buildPublicKeyHashOut(t);
					throw new p.Script.UnrecognizedAddress(t);
				}),
				(m.prototype.getAddressInfo = function (t) {
					if (this._isInput) return this._getInputAddressInfo();
					if (this._isOutput) return this._getOutputAddressInfo();
					var e = this._getOutputAddressInfo();
					return e || this._getInputAddressInfo();
				}),
				(m.prototype._getOutputAddressInfo = function () {
					var t = {};
					if (this.isScriptHashOut())
						(t.hashBuffer = this.getData()), (t.type = n.PayToScriptHash);
					else {
						if (!this.isPublicKeyHashOut()) return !1;
						(t.hashBuffer = this.getData()), (t.type = n.PayToPublicKeyHash);
					}
					return t;
				}),
				(m.prototype._getInputAddressInfo = function () {
					var t = {};
					if (this.isPublicKeyHashIn())
						(t.hashBuffer = o.sha256ripemd160(this.chunks[1].buf)),
							(t.type = n.PayToPublicKeyHash);
					else {
						if (!this.isScriptHashIn()) return !1;
						(t.hashBuffer = o.sha256ripemd160(
							this.chunks[this.chunks.length - 1].buf
						)),
							(t.type = n.PayToScriptHash);
					}
					return t;
				}),
				(m.prototype.toAddress = function (t) {
					var e = this.getAddressInfo();
					return (
						!!e &&
						((e.network = c.get(t) || this._network || c.defaultNetwork),
						new n(e))
					);
				}),
				(m.prototype.findAndDelete = function (t) {
					for (
						var e = t.toBuffer().toString("hex"), r = 0;
						r < this.chunks.length;
						r++
					) {
						e ===
							m({ chunks: [this.chunks[r]] })
								.toBuffer()
								.toString("hex") && this.chunks.splice(r, 1);
					}
					return this;
				}),
				(m.prototype.checkMinimalPush = function (t) {
					var e = this.chunks[t],
						r = e.buf,
						n = e.opcodenum;
					return (
						!r ||
						(0 === r.length
							? n === f.OP_0
							: 1 === r.length && r[0] >= 1 && r[0] <= 16
							? n === f.OP_1 + (r[0] - 1)
							: 1 === r.length && 129 === r[0]
							? n === f.OP_1NEGATE
							: r.length <= 75
							? n === r.length
							: r.length <= 255
							? n === f.OP_PUSHDATA1
							: !(r.length <= 65535) || n === f.OP_PUSHDATA2)
					);
				}),
				(m.prototype._decodeOP_N = function (t) {
					if (t === f.OP_0) return 0;
					if (t >= f.OP_1 && t <= f.OP_16) return t - (f.OP_1 - 1);
					throw new Error("Invalid opcode: " + JSON.stringify(t));
				}),
				(m.prototype.getSignatureOperationsCount = function (t) {
					t = !!d.isUndefined(t) || t;
					var e = this,
						r = 0,
						n = f.OP_INVALIDOPCODE;
					return (
						d.each(e.chunks, function (i) {
							var s = i.opcodenum;
							s === f.OP_CHECKSIG || s === f.OP_CHECKSIGVERIFY
								? r++
								: (s !== f.OP_CHECKMULTISIG &&
										s !== f.OP_CHECKMULTISIGVERIFY) ||
								  (t && n >= f.OP_1 && n <= f.OP_16
										? (r += e._decodeOP_N(n))
										: (r += 20)),
								(n = s);
						}),
						r
					);
				}),
				(t.exports = m);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(46),
				s = r(38),
				o = r(3),
				f = r(5),
				a = r(9),
				u = r(13),
				c = r(91),
				h = function t(e) {
					if (!(this instanceof t)) return new t(e);
					e ? (this.initialize(), this.set(e)) : this.initialize();
				};
			(h.prototype.verify = function (t, e, s, o, f, a) {
				var u,
					c = r(31);
				if (
					(n.isUndefined(s) && (s = new c()),
					n.isUndefined(o) && (o = 0),
					n.isUndefined(f) && (f = 0),
					f & h.SCRIPT_ENABLE_SIGHASH_FORKID &&
						((f |= h.SCRIPT_VERIFY_STRICTENC), !a))
				)
					throw new Error(
						"internal error - need satoshisBN to verify FORKID transactions"
					);
				if (
					(this.set({ script: t, tx: s, nin: o, flags: f, satoshisBN: a }),
					0 != (f & h.SCRIPT_VERIFY_SIGPUSHONLY) && !t.isPushOnly())
				)
					return (this.errstr = "SCRIPT_ERR_SIG_PUSHONLY"), !1;
				if (!this.evaluate()) return !1;
				f & h.SCRIPT_VERIFY_P2SH && (u = this.stack.slice());
				var d = this.stack;
				if (
					(this.initialize(),
					this.set({
						script: e,
						stack: d,
						tx: s,
						nin: o,
						flags: f,
						satoshisBN: a,
					}),
					!this.evaluate())
				)
					return !1;
				if (0 === this.stack.length)
					return (this.errstr = "SCRIPT_ERR_EVAL_FALSE_NO_RESULT"), !1;
				var p = this.stack[this.stack.length - 1];
				if (!h.castToBool(p))
					return (this.errstr = "SCRIPT_ERR_EVAL_FALSE_IN_STACK"), !1;
				if (f & h.SCRIPT_VERIFY_P2SH && e.isScriptHashOut()) {
					if (!t.isPushOnly())
						return (this.errstr = "SCRIPT_ERR_SIG_PUSHONLY"), !1;
					if (0 === u.length)
						throw new Error("internal error - stack copy empty");
					var l = u[u.length - 1],
						b = i.fromBuffer(l);
					if (
						(u.pop(),
						this.initialize(),
						this.set({
							script: b,
							stack: u,
							tx: s,
							nin: o,
							flags: f,
							satoshisBN: a,
						}),
						!this.evaluate())
					)
						return !1;
					if (0 === u.length)
						return (this.errstr = "SCRIPT_ERR_EVAL_FALSE_NO_P2SH_STACK"), !1;
					if (!h.castToBool(u[u.length - 1]))
						return (this.errstr = "SCRIPT_ERR_EVAL_FALSE_IN_P2SH_STACK"), !1;
				}
				if (0 != (f & h.SCRIPT_VERIFY_CLEANSTACK)) {
					if (0 == (f & h.SCRIPT_VERIFY_P2SH))
						throw new Error("internal error - CLEANSTACK without P2SH");
					if (1 !== u.length)
						return (this.errstr = "SCRIPT_ERR_CLEANSTACK"), !1;
				}
				return !0;
			}),
				(t.exports = h),
				(h.prototype.initialize = function (t) {
					(this.stack = []),
						(this.altstack = []),
						(this.pc = 0),
						(this.pbegincodehash = 0),
						(this.nOpCount = 0),
						(this.vfExec = []),
						(this.errstr = ""),
						(this.flags = 0);
				}),
				(h.prototype.set = function (t) {
					(this.script = t.script || this.script),
						(this.tx = t.tx || this.tx),
						(this.nin = void 0 !== t.nin ? t.nin : this.nin),
						(this.satoshisBN = t.satoshisBN || this.satoshisBN),
						(this.stack = t.stack || this.stack),
						(this.altstack = t.altstack || this.altstack),
						(this.pc = void 0 !== t.pc ? t.pc : this.pc),
						(this.pbegincodehash =
							void 0 !== t.pbegincodehash
								? t.pbegincodehash
								: this.pbegincodehash),
						(this.nOpCount =
							void 0 !== t.nOpCount ? t.nOpCount : this.nOpCount),
						(this.vfExec = t.vfExec || this.vfExec),
						(this.errstr = t.errstr || this.errstr),
						(this.flags = void 0 !== t.flags ? t.flags : this.flags);
				}),
				(h.true = e.from([1])),
				(h.false = e.from([])),
				(h.MAX_SCRIPT_ELEMENT_SIZE = 520),
				(h.MAXIMUM_ELEMENT_SIZE = 4),
				(h.LOCKTIME_THRESHOLD = 5e8),
				(h.LOCKTIME_THRESHOLD_BN = new o(h.LOCKTIME_THRESHOLD)),
				(h.SCRIPT_VERIFY_NONE = 0),
				(h.SCRIPT_VERIFY_P2SH = 1),
				(h.SCRIPT_VERIFY_STRICTENC = 2),
				(h.SCRIPT_VERIFY_DERSIG = 4),
				(h.SCRIPT_VERIFY_LOW_S = 8),
				(h.SCRIPT_VERIFY_NULLDUMMY = 16),
				(h.SCRIPT_VERIFY_SIGPUSHONLY = 32),
				(h.SCRIPT_VERIFY_MINIMALDATA = 64),
				(h.SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS = 128),
				(h.SCRIPT_VERIFY_CLEANSTACK = 256),
				(h.SCRIPT_VERIFY_CHECKLOCKTIMEVERIFY = 512),
				(h.SCRIPT_VERIFY_CHECKSEQUENCEVERIFY = 1024),
				(h.SCRIPT_VERIFY_MINIMALIF = 8192),
				(h.SCRIPT_VERIFY_NULLFAIL = 16384),
				(h.SCRIPT_VERIFY_COMPRESSED_PUBKEYTYPE = 32768),
				(h.SCRIPT_ENABLE_SIGHASH_FORKID = 65536),
				(h.SCRIPT_ENABLE_REPLAY_PROTECTION = 1 << 17),
				(h.SCRIPT_ENABLE_MONOLITH_OPCODES = 1 << 18),
				(h.SCRIPT_ENABLE_MAGNETIC_OPCODES = 1 << 19),
				(h.SEQUENCE_LOCKTIME_DISABLE_FLAG = 1 << 31),
				(h.SEQUENCE_LOCKTIME_TYPE_FLAG = 1 << 22),
				(h.SEQUENCE_LOCKTIME_MASK = 65535),
				(h.castToBool = function (t) {
					for (var e = 0; e < t.length; e++)
						if (0 !== t[e]) return e !== t.length - 1 || 128 !== t[e];
					return !1;
				}),
				(h.prototype.checkSignatureEncoding = function (t) {
					var e;
					if (0 === t.length) return !0;
					if (
						0 !=
							(this.flags &
								(h.SCRIPT_VERIFY_DERSIG |
									h.SCRIPT_VERIFY_LOW_S |
									h.SCRIPT_VERIFY_STRICTENC)) &&
						!a.isTxDER(t)
					)
						return (this.errstr = "SCRIPT_ERR_SIG_DER_INVALID_FORMAT"), !1;
					if (0 != (this.flags & h.SCRIPT_VERIFY_LOW_S)) {
						if (!(e = a.fromTxFormat(t)).hasLowS())
							return (this.errstr = "SCRIPT_ERR_SIG_DER_HIGH_S"), !1;
					} else if (0 != (this.flags & h.SCRIPT_VERIFY_STRICTENC)) {
						if (!(e = a.fromTxFormat(t)).hasDefinedHashtype())
							return (this.errstr = "SCRIPT_ERR_SIG_HASHTYPE"), !1;
						if (
							!(this.flags & h.SCRIPT_ENABLE_SIGHASH_FORKID) &&
							e.nhashtype & a.SIGHASH_FORKID
						)
							return (this.errstr = "SCRIPT_ERR_ILLEGAL_FORKID"), !1;
						if (
							this.flags & h.SCRIPT_ENABLE_SIGHASH_FORKID &&
							!(e.nhashtype & a.SIGHASH_FORKID)
						)
							return (this.errstr = "SCRIPT_ERR_MUST_USE_FORKID"), !1;
					}
					return !0;
				}),
				(h.prototype.checkPubkeyEncoding = function (t) {
					return (
						!(0 != (this.flags & h.SCRIPT_VERIFY_STRICTENC) && !u.isValid(t)) ||
						((this.errstr = "SCRIPT_ERR_PUBKEYTYPE"), !1)
					);
				}),
				(h._isMinimallyEncoded = function (t, e) {
					return (
						(e = e || h.MAXIMUM_ELEMENT_SIZE),
						!(t.length > e) &&
							!(
								t.length > 0 &&
								0 == (127 & t[t.length - 1]) &&
								(t.length <= 1 || 0 == (128 & t[t.length - 2]))
							)
					);
				}),
				(h._minimallyEncode = function (t) {
					if (0 === t.length) return t;
					var r = t[t.length - 1];
					if (127 & r) return t;
					if (1 === t.length) return e.from("");
					if (128 & t[t.length - 2]) return t;
					for (var n = t.length - 1; n > 0; n--)
						if (0 !== t[n - 1])
							return (
								128 & t[n - 1] ? (t[n++] = r) : (t[n - 1] |= r), t.slice(0, n)
							);
					return e.from("");
				}),
				(h.prototype.evaluate = function () {
					if (this.script.toBuffer().length > 1e4)
						return (this.errstr = "SCRIPT_ERR_SCRIPT_SIZE"), !1;
					try {
						for (; this.pc < this.script.chunks.length; ) {
							let t = {
								pc: this.pc,
								opcode: s.fromNumber(this.script.chunks[this.pc].opcodenum),
							};
							if (!this.step()) return !1;
							this._callbackStep(t);
						}
						if (this.stack.length + this.altstack.length > 1e3)
							return (this.errstr = "SCRIPT_ERR_STACK_SIZE"), !1;
					} catch (t) {
						return (this.errstr = "SCRIPT_ERR_UNKNOWN_ERROR: " + t), !1;
					}
					return (
						!(this.vfExec.length > 0) ||
						((this.errstr = "SCRIPT_ERR_UNBALANCED_CONDITIONAL"), !1)
					);
				}),
				(h.prototype._callbackStep = function (t) {
					if ("function" == typeof this.stepListener)
						try {
							this.stepListener(t, c(this.stack, !0), c(this.altstack, !0));
						} catch (t) {
							console.log(`Error in Step callback:${t}`);
						}
				}),
				(h.prototype.checkLockTime = function (t) {
					return (
						!!(
							(this.tx.nLockTime < h.LOCKTIME_THRESHOLD &&
								t.lt(h.LOCKTIME_THRESHOLD_BN)) ||
							(this.tx.nLockTime >= h.LOCKTIME_THRESHOLD &&
								t.gte(h.LOCKTIME_THRESHOLD_BN))
						) &&
						!t.gt(new o(this.tx.nLockTime)) &&
						!this.tx.inputs[this.nin].isFinal()
					);
				}),
				(h.prototype.checkSequence = function (t) {
					var e = this.tx.inputs[this.nin].sequenceNumber;
					if (this.tx.version < 2) return !1;
					if (e & h.SEQUENCE_LOCKTIME_DISABLE_FLAG) return !1;
					var r = h.SEQUENCE_LOCKTIME_TYPE_FLAG | h.SEQUENCE_LOCKTIME_MASK,
						n = new o(e & r),
						i = t.and(r),
						s = new o(h.SEQUENCE_LOCKTIME_TYPE_FLAG);
					return !!((n.lt(s) && i.lt(s)) || (n.gte(s) && i.gte(s))) && !i.gt(n);
				}),
				(h.prototype.step = function () {
					var t = this;
					function r(e) {
						return t.stack[t.stack.length + e];
					}
					var c,
						d,
						p,
						l,
						b,
						m,
						g,
						y,
						v,
						_,
						S,
						w,
						I,
						A,
						E,
						P,
						O,
						k = 0 != (this.flags & h.SCRIPT_VERIFY_MINIMALDATA),
						R = -1 === this.vfExec.indexOf(!1),
						M = this.script.chunks[this.pc];
					this.pc++;
					var x = M.opcodenum;
					if (n.isUndefined(x))
						return (this.errstr = "SCRIPT_ERR_UNDEFINED_OPCODE"), !1;
					if (M.buf && M.buf.length > h.MAX_SCRIPT_ELEMENT_SIZE)
						return (this.errstr = "SCRIPT_ERR_PUSH_SIZE"), !1;
					if (x > s.OP_16 && ++this.nOpCount > 201)
						return (this.errstr = "SCRIPT_ERR_OP_COUNT"), !1;
					if (
						(function (e) {
							switch (e) {
								case s.OP_2MUL:
								case s.OP_2DIV:
									return !0;
								case s.OP_INVERT:
								case s.OP_MUL:
								case s.OP_LSHIFT:
								case s.OP_RSHIFT:
									if (0 == (t.flags & h.SCRIPT_ENABLE_MAGNETIC_OPCODES))
										return !0;
									break;
								case s.OP_DIV:
								case s.OP_MOD:
								case s.OP_SPLIT:
								case s.OP_CAT:
								case s.OP_AND:
								case s.OP_OR:
								case s.OP_XOR:
								case s.OP_BIN2NUM:
								case s.OP_NUM2BIN:
									if (0 == (t.flags & h.SCRIPT_ENABLE_MONOLITH_OPCODES))
										return !0;
							}
							return !1;
						})(x)
					)
						return (this.errstr = "SCRIPT_ERR_DISABLED_OPCODE"), !1;
					if (R && x >= 0 && x <= s.OP_PUSHDATA4) {
						if (k && !this.script.checkMinimalPush(this.pc - 1))
							return (this.errstr = "SCRIPT_ERR_MINIMALDATA"), !1;
						if (M.buf) {
							if (M.len !== M.buf.length)
								throw new Error(
									`Length of push value not equal to length of data (${M.len},${M.buf.length})`
								);
							this.stack.push(M.buf);
						} else this.stack.push(h.false);
					} else if (R || (s.OP_IF <= x && x <= s.OP_ENDIF))
						switch (x) {
							case s.OP_1NEGATE:
							case s.OP_1:
							case s.OP_2:
							case s.OP_3:
							case s.OP_4:
							case s.OP_5:
							case s.OP_6:
							case s.OP_7:
							case s.OP_8:
							case s.OP_9:
							case s.OP_10:
							case s.OP_11:
							case s.OP_12:
							case s.OP_13:
							case s.OP_14:
							case s.OP_15:
							case s.OP_16:
								(b = x - (s.OP_1 - 1)),
									(c = new o(b).toScriptNumBuffer()),
									this.stack.push(c);
								break;
							case s.OP_NOP:
								break;
							case s.OP_NOP2:
							case s.OP_CHECKLOCKTIMEVERIFY:
								if (!(this.flags & h.SCRIPT_VERIFY_CHECKLOCKTIMEVERIFY)) {
									if (this.flags & h.SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS)
										return (
											(this.errstr = "SCRIPT_ERR_DISCOURAGE_UPGRADABLE_NOPS"),
											!1
										);
									break;
								}
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								var T = o.fromScriptNumBuffer(
									this.stack[this.stack.length - 1],
									k,
									5
								);
								if (T.lt(new o(0)))
									return (this.errstr = "SCRIPT_ERR_NEGATIVE_LOCKTIME"), !1;
								if (!this.checkLockTime(T))
									return (this.errstr = "SCRIPT_ERR_UNSATISFIED_LOCKTIME"), !1;
								break;
							case s.OP_NOP3:
							case s.OP_CHECKSEQUENCEVERIFY:
								if (!(this.flags & h.SCRIPT_VERIFY_CHECKSEQUENCEVERIFY)) {
									if (this.flags & h.SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS)
										return (
											(this.errstr = "SCRIPT_ERR_DISCOURAGE_UPGRADABLE_NOPS"),
											!1
										);
									break;
								}
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								var B = o.fromScriptNumBuffer(r(-1), k, 5);
								if (B.lt(new o(0)))
									return (this.errstr = "SCRIPT_ERR_NEGATIVE_LOCKTIME"), !1;
								if (0 != (B & h.SEQUENCE_LOCKTIME_DISABLE_FLAG)) break;
								if (!this.checkSequence(B))
									return (this.errstr = "SCRIPT_ERR_UNSATISFIED_LOCKTIME"), !1;
								break;
							case s.OP_NOP1:
							case s.OP_NOP4:
							case s.OP_NOP5:
							case s.OP_NOP6:
							case s.OP_NOP7:
							case s.OP_NOP8:
							case s.OP_NOP9:
							case s.OP_NOP10:
								if (this.flags & h.SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS)
									return (
										(this.errstr = "SCRIPT_ERR_DISCOURAGE_UPGRADABLE_NOPS"), !1
									);
								break;
							case s.OP_IF:
							case s.OP_NOTIF:
								if (((P = !1), R)) {
									if (this.stack.length < 1)
										return (
											(this.errstr = "SCRIPT_ERR_UNBALANCED_CONDITIONAL"), !1
										);
									if (((c = r(-1)), this.flags & h.SCRIPT_VERIFY_MINIMALIF)) {
										if (c.length > 1)
											return (this.errstr = "SCRIPT_ERR_MINIMALIF"), !1;
										if (1 === c.length && 1 !== c[0])
											return (this.errstr = "SCRIPT_ERR_MINIMALIF"), !1;
									}
									(P = h.castToBool(c)),
										x === s.OP_NOTIF && (P = !P),
										this.stack.pop();
								}
								this.vfExec.push(P);
								break;
							case s.OP_ELSE:
								if (0 === this.vfExec.length)
									return (
										(this.errstr = "SCRIPT_ERR_UNBALANCED_CONDITIONAL"), !1
									);
								this.vfExec[this.vfExec.length - 1] =
									!this.vfExec[this.vfExec.length - 1];
								break;
							case s.OP_ENDIF:
								if (0 === this.vfExec.length)
									return (
										(this.errstr = "SCRIPT_ERR_UNBALANCED_CONDITIONAL"), !1
									);
								this.vfExec.pop();
								break;
							case s.OP_VERIFY:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (((c = r(-1)), !(P = h.castToBool(c))))
									return (this.errstr = "SCRIPT_ERR_VERIFY"), !1;
								this.stack.pop();
								break;
							case s.OP_RETURN:
								return (this.errstr = "SCRIPT_ERR_OP_RETURN"), !1;
							case s.OP_TOALTSTACK:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.altstack.push(this.stack.pop());
								break;
							case s.OP_FROMALTSTACK:
								if (this.altstack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_ALTSTACK_OPERATION"), !1
									);
								this.stack.push(this.altstack.pop());
								break;
							case s.OP_2DROP:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.stack.pop(), this.stack.pop();
								break;
							case s.OP_2DUP:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(d = r(-2)),
									(p = r(-1)),
									this.stack.push(e.from(d)),
									this.stack.push(e.from(p));
								break;
							case s.OP_3DUP:
								if (this.stack.length < 3)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(d = r(-3)), (p = r(-2));
								var N = r(-1);
								this.stack.push(e.from(d)),
									this.stack.push(e.from(p)),
									this.stack.push(e.from(N));
								break;
							case s.OP_2OVER:
								if (this.stack.length < 4)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(d = r(-4)),
									(p = r(-3)),
									this.stack.push(e.from(d)),
									this.stack.push(e.from(p));
								break;
							case s.OP_2ROT:
								if (this.stack.length < 6)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(l = this.stack.splice(this.stack.length - 6, 2)),
									this.stack.push(l[0]),
									this.stack.push(l[1]);
								break;
							case s.OP_2SWAP:
								if (this.stack.length < 4)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(l = this.stack.splice(this.stack.length - 4, 2)),
									this.stack.push(l[0]),
									this.stack.push(l[1]);
								break;
							case s.OP_IFDUP:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(c = r(-1)),
									(P = h.castToBool(c)) && this.stack.push(e.from(c));
								break;
							case s.OP_DEPTH:
								(c = new o(this.stack.length).toScriptNumBuffer()),
									this.stack.push(c);
								break;
							case s.OP_DROP:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.stack.pop();
								break;
							case s.OP_DUP:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.stack.push(e.from(r(-1)));
								break;
							case s.OP_NIP:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.stack.splice(this.stack.length - 2, 1);
								break;
							case s.OP_OVER:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.stack.push(e.from(r(-2)));
								break;
							case s.OP_PICK:
							case s.OP_ROLL:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (
									((c = r(-1)),
									(b = (y = o.fromScriptNumBuffer(c, k)).toNumber()),
									this.stack.pop(),
									b < 0 || b >= this.stack.length)
								)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(c = r(-b - 1)),
									x === s.OP_ROLL &&
										this.stack.splice(this.stack.length - b - 1, 1),
									this.stack.push(e.from(c));
								break;
							case s.OP_ROT:
								if (this.stack.length < 3)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(m = r(-3)), (g = r(-2));
								var C = r(-1);
								(this.stack[this.stack.length - 3] = g),
									(this.stack[this.stack.length - 2] = C),
									(this.stack[this.stack.length - 1] = m);
								break;
							case s.OP_SWAP:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(m = r(-2)),
									(g = r(-1)),
									(this.stack[this.stack.length - 2] = g),
									(this.stack[this.stack.length - 1] = m);
								break;
							case s.OP_TUCK:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								this.stack.splice(this.stack.length - 2, 0, e.from(r(-1)));
								break;
							case s.OP_SIZE:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(y = new o(r(-1).length)),
									this.stack.push(y.toScriptNumBuffer());
								break;
							case s.OP_AND:
							case s.OP_OR:
							case s.OP_XOR:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (((d = r(-2)), (p = r(-1)), d.length !== p.length))
									return (this.errstr = "SCRIPT_ERR_INVALID_OPERAND_SIZE"), !1;
								switch (x) {
									case s.OP_AND:
										for (let t = 0; t < d.length; t++) d[t] &= p[t];
										break;
									case s.OP_OR:
										for (let t = 0; t < d.length; t++) d[t] |= p[t];
										break;
									case s.OP_XOR:
										for (let t = 0; t < d.length; t++) d[t] ^= p[t];
								}
								this.stack.pop();
								break;
							case s.OP_INVERT:
								this.stack.length < 1 &&
									(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"),
									(c = r(-1));
								for (let t = 0; t < c.length; t++) c[t] = ~c[t];
								break;
							case s.OP_LSHIFT:
							case s.OP_RSHIFT:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (0 === (d = r(-2)).length) this.stack.pop();
								else {
									if (
										((v = new o(d)),
										(b = (_ = o.fromScriptNumBuffer(r(-1), k)).toNumber()) < 0)
									)
										return (
											(this.errstr = "SCRIPT_ERR_INVALID_NUMBER_RANGE"), !1
										);
									let t;
									this.stack.pop(),
										this.stack.pop(),
										x === s.OP_LSHIFT && (t = v.ushln(b)),
										x === s.OP_RSHIFT && (t = v.ushrn(b));
									let n = (function (t, r) {
										let n = t;
										for (; n.length < r; ) n = e.concat([e.from([0]), n]);
										return n;
									})(e.from(t.toArray().slice(-1 * d.length)), d.length);
									this.stack.push(n);
								}
								break;
							case s.OP_EQUAL:
							case s.OP_EQUALVERIFY:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(d = r(-2)), (p = r(-1));
								var U = d.toString("hex") === p.toString("hex");
								if (
									(this.stack.pop(),
									this.stack.pop(),
									this.stack.push(U ? h.true : h.false),
									x === s.OP_EQUALVERIFY)
								) {
									if (!U) return (this.errstr = "SCRIPT_ERR_EQUALVERIFY"), !1;
									this.stack.pop();
								}
								break;
							case s.OP_1ADD:
							case s.OP_1SUB:
							case s.OP_NEGATE:
							case s.OP_ABS:
							case s.OP_NOT:
							case s.OP_0NOTEQUAL:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								switch (((c = r(-1)), (y = o.fromScriptNumBuffer(c, k)), x)) {
									case s.OP_1ADD:
										y = y.add(o.One);
										break;
									case s.OP_1SUB:
										y = y.sub(o.One);
										break;
									case s.OP_NEGATE:
										y = y.neg();
										break;
									case s.OP_ABS:
										y.cmp(o.Zero) < 0 && (y = y.neg());
										break;
									case s.OP_NOT:
										y = new o((0 === y.cmp(o.Zero)) + 0);
										break;
									case s.OP_0NOTEQUAL:
										y = new o((0 !== y.cmp(o.Zero)) + 0);
								}
								this.stack.pop(), this.stack.push(y.toScriptNumBuffer());
								break;
							case s.OP_ADD:
							case s.OP_SUB:
							case s.OP_MUL:
							case s.OP_MOD:
							case s.OP_DIV:
							case s.OP_BOOLAND:
							case s.OP_BOOLOR:
							case s.OP_NUMEQUAL:
							case s.OP_NUMEQUALVERIFY:
							case s.OP_NUMNOTEQUAL:
							case s.OP_LESSTHAN:
							case s.OP_GREATERTHAN:
							case s.OP_LESSTHANOREQUAL:
							case s.OP_GREATERTHANOREQUAL:
							case s.OP_MIN:
							case s.OP_MAX:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								switch (
									((v = o.fromScriptNumBuffer(r(-2), k)),
									(_ = o.fromScriptNumBuffer(r(-1), k)),
									(y = new o(0)),
									x)
								) {
									case s.OP_ADD:
										y = v.add(_);
										break;
									case s.OP_SUB:
										y = v.sub(_);
										break;
									case s.OP_MUL:
										y = v.mul(_);
										break;
									case s.OP_DIV:
										if (0 === _)
											return (this.errstr = "SCRIPT_ERR_DIV_BY_ZERO"), !1;
										y = v.div(_);
										break;
									case s.OP_MOD:
										if (0 === _)
											return (this.errstr = "SCRIPT_ERR_DIV_BY_ZERO"), !1;
										y = v.mod(_);
										break;
									case s.OP_BOOLAND:
										y = new o((0 !== v.cmp(o.Zero) && 0 !== _.cmp(o.Zero)) + 0);
										break;
									case s.OP_BOOLOR:
										y = new o((0 !== v.cmp(o.Zero) || 0 !== _.cmp(o.Zero)) + 0);
										break;
									case s.OP_NUMEQUAL:
									case s.OP_NUMEQUALVERIFY:
										y = new o((0 === v.cmp(_)) + 0);
										break;
									case s.OP_NUMNOTEQUAL:
										y = new o((0 !== v.cmp(_)) + 0);
										break;
									case s.OP_LESSTHAN:
										y = new o((v.cmp(_) < 0) + 0);
										break;
									case s.OP_GREATERTHAN:
										y = new o((v.cmp(_) > 0) + 0);
										break;
									case s.OP_LESSTHANOREQUAL:
										y = new o((v.cmp(_) <= 0) + 0);
										break;
									case s.OP_GREATERTHANOREQUAL:
										y = new o((v.cmp(_) >= 0) + 0);
										break;
									case s.OP_MIN:
										y = v.cmp(_) < 0 ? v : _;
										break;
									case s.OP_MAX:
										y = v.cmp(_) > 0 ? v : _;
								}
								if (
									(this.stack.pop(),
									this.stack.pop(),
									this.stack.push(y.toScriptNumBuffer()),
									x === s.OP_NUMEQUALVERIFY)
								) {
									if (!h.castToBool(r(-1)))
										return (this.errstr = "SCRIPT_ERR_NUMEQUALVERIFY"), !1;
									this.stack.pop();
								}
								break;
							case s.OP_WITHIN:
								if (this.stack.length < 3)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								(v = o.fromScriptNumBuffer(r(-3), k)),
									(_ = o.fromScriptNumBuffer(r(-2), k));
								var L = o.fromScriptNumBuffer(r(-1), k);
								(P = _.cmp(v) <= 0 && v.cmp(L) < 0),
									this.stack.pop(),
									this.stack.pop(),
									this.stack.pop(),
									this.stack.push(P ? h.true : h.false);
								break;
							case s.OP_RIPEMD160:
							case s.OP_SHA1:
							case s.OP_SHA256:
							case s.OP_HASH160:
							case s.OP_HASH256:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								var H;
								(c = r(-1)),
									x === s.OP_RIPEMD160
										? (H = f.ripemd160(c))
										: x === s.OP_SHA1
										? (H = f.sha1(c))
										: x === s.OP_SHA256
										? (H = f.sha256(c))
										: x === s.OP_HASH160
										? (H = f.sha256ripemd160(c))
										: x === s.OP_HASH256 && (H = f.sha256sha256(c)),
									this.stack.pop(),
									this.stack.push(H);
								break;
							case s.OP_CODESEPARATOR:
								this.pbegincodehash = this.pc;
								break;
							case s.OP_CHECKSIG:
							case s.OP_CHECKSIGVERIFY:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (
									((S = r(-2)),
									(w = r(-1)),
									!this.checkSignatureEncoding(S) ||
										!this.checkPubkeyEncoding(w))
								)
									return !1;
								I = new i().set({
									chunks: this.script.chunks.slice(this.pbegincodehash),
								});
								var D = new i().add(S);
								I.findAndDelete(D);
								try {
									(A = a.fromTxFormat(S)),
										(E = u.fromBuffer(w, !1)),
										(O = this.tx.verifySignature(
											A,
											E,
											this.nin,
											I,
											this.satoshisBN,
											this.flags
										));
								} catch (t) {
									O = !1;
								}
								if (!O && this.flags & h.SCRIPT_VERIFY_NULLFAIL && S.length)
									return (this.errstr = "SCRIPT_ERR_NULLFAIL"), !1;
								if (
									(this.stack.pop(),
									this.stack.pop(),
									this.stack.push(O ? h.true : h.false),
									x === s.OP_CHECKSIGVERIFY)
								) {
									if (!O)
										return (this.errstr = "SCRIPT_ERR_CHECKSIGVERIFY"), !1;
									this.stack.pop();
								}
								break;
							case s.OP_CHECKMULTISIG:
							case s.OP_CHECKMULTISIGVERIFY:
								var F = 1;
								if (this.stack.length < F)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								var K = o.fromScriptNumBuffer(r(-F), k).toNumber();
								if (K < 0 || K > 20)
									return (this.errstr = "SCRIPT_ERR_PUBKEY_COUNT"), !1;
								if (((this.nOpCount += K), this.nOpCount > 201))
									return (this.errstr = "SCRIPT_ERR_OP_COUNT"), !1;
								var z = ++F;
								F += K;
								var j = K + 2;
								if (this.stack.length < F)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								var V = o.fromScriptNumBuffer(r(-F), k).toNumber();
								if (V < 0 || V > K)
									return (this.errstr = "SCRIPT_ERR_SIG_COUNT"), !1;
								var q = ++F;
								if (((F += V), this.stack.length < F))
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								I = new i().set({
									chunks: this.script.chunks.slice(this.pbegincodehash),
								});
								for (var Y = 0; Y < V; Y++)
									(S = r(-q - Y)), I.findAndDelete(new i().add(S));
								for (O = !0; O && V > 0; ) {
									if (
										((S = r(-q)),
										(w = r(-z)),
										!this.checkSignatureEncoding(S) ||
											!this.checkPubkeyEncoding(w))
									)
										return !1;
									var G;
									try {
										(A = a.fromTxFormat(S)),
											(E = u.fromBuffer(w, !1)),
											(G = this.tx.verifySignature(
												A,
												E,
												this.nin,
												I,
												this.satoshisBN,
												this.flags
											));
									} catch (t) {
										G = !1;
									}
									G && (q++, V--), z++, V > --K && (O = !1);
								}
								for (; F-- > 1; ) {
									if (
										!O &&
										this.flags & h.SCRIPT_VERIFY_NULLFAIL &&
										!j &&
										r(-1).length
									)
										return (this.errstr = "SCRIPT_ERR_NULLFAIL"), !1;
									j > 0 && j--, this.stack.pop();
								}
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (this.flags & h.SCRIPT_VERIFY_NULLDUMMY && r(-1).length)
									return (this.errstr = "SCRIPT_ERR_SIG_NULLDUMMY"), !1;
								if (
									(this.stack.pop(),
									this.stack.push(O ? h.true : h.false),
									x === s.OP_CHECKMULTISIGVERIFY)
								) {
									if (!O)
										return (this.errstr = "SCRIPT_ERR_CHECKMULTISIGVERIFY"), !1;
									this.stack.pop();
								}
								break;
							case s.OP_CAT:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (
									((d = r(-2)),
									(p = r(-1)),
									d.length + p.length > h.MAX_SCRIPT_ELEMENT_SIZE)
								)
									return (this.errstr = "SCRIPT_ERR_PUSH_SIZE"), !1;
								(this.stack[this.stack.length - 2] = e.concat([d, p])),
									this.stack.pop();
								break;
							case s.OP_SPLIT:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								d = r(-2);
								var X = o.fromScriptNumBuffer(r(-1), k).toNumber();
								if (X < 0 || X > d.length)
									return (this.errstr = "SCRIPT_ERR_INVALID_SPLIT_RANGE"), !1;
								var W = e.from(d);
								(this.stack[this.stack.length - 2] = W.slice(0, X)),
									(this.stack[this.stack.length - 1] = W.slice(X));
								break;
							case s.OP_NUM2BIN:
								if (this.stack.length < 2)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								var Z = o.fromScriptNumBuffer(r(-1), k).toNumber();
								if (Z > h.MAX_SCRIPT_ELEMENT_SIZE)
									return (this.errstr = "SCRIPT_ERR_PUSH_SIZE"), !1;
								this.stack.pop();
								var J = r(-1);
								if ((J = h._minimallyEncode(J)).length > Z)
									return (this.errstr = "SCRIPT_ERR_IMPOSSIBLE_ENCODING"), !1;
								if (J.length === Z) {
									this.stack[this.stack.length - 1] = J;
									break;
								}
								var Q = 0;
								J.length > 0 &&
									((Q = 128 & J[J.length - 1]), (J[J.length - 1] &= 127));
								var $ = e.alloc(Z);
								J.copy($, 0);
								for (var tt = J.length - 1; tt++ < Z - 2; ) $[tt] = 0;
								($[tt] = Q), (this.stack[this.stack.length - 1] = $);
								break;
							case s.OP_BIN2NUM:
								if (this.stack.length < 1)
									return (
										(this.errstr = "SCRIPT_ERR_INVALID_STACK_OPERATION"), !1
									);
								if (
									((d = r(-1)),
									(p = h._minimallyEncode(d)),
									(this.stack[this.stack.length - 1] = p),
									!h._isMinimallyEncoded(p))
								)
									return (this.errstr = "SCRIPT_ERR_INVALID_NUMBER_RANGE"), !1;
								break;
							default:
								return (this.errstr = "SCRIPT_ERR_BAD_OPCODE"), !1;
						}
					return !0;
				});
		}.call(this, r(0).Buffer));
	},
	function (t, e) {
		var r = Object.prototype.toString;
		function n(t) {
			return t.constructor ? t.constructor.name : null;
		}
		t.exports = function (t) {
			if (void 0 === t) return "undefined";
			if (null === t) return "null";
			var e = typeof t;
			if ("boolean" === e) return "boolean";
			if ("string" === e) return "string";
			if ("number" === e) return "number";
			if ("symbol" === e) return "symbol";
			if ("function" === e)
				return "GeneratorFunction" === n(t) ? "generatorfunction" : "function";
			if (
				(function (t) {
					return Array.isArray ? Array.isArray(t) : t instanceof Array;
				})(t)
			)
				return "array";
			if (
				(function (t) {
					if (t.constructor && "function" == typeof t.constructor.isBuffer)
						return t.constructor.isBuffer(t);
					return !1;
				})(t)
			)
				return "buffer";
			if (
				(function (t) {
					try {
						if ("number" == typeof t.length && "function" == typeof t.callee)
							return !0;
					} catch (t) {
						if (-1 !== t.message.indexOf("callee")) return !0;
					}
					return !1;
				})(t)
			)
				return "arguments";
			if (
				(function (t) {
					return (
						t instanceof Date ||
						("function" == typeof t.toDateString &&
							"function" == typeof t.getDate &&
							"function" == typeof t.setDate)
					);
				})(t)
			)
				return "date";
			if (
				(function (t) {
					return (
						t instanceof Error ||
						("string" == typeof t.message &&
							t.constructor &&
							"number" == typeof t.constructor.stackTraceLimit)
					);
				})(t)
			)
				return "error";
			if (
				(function (t) {
					return (
						t instanceof RegExp ||
						("string" == typeof t.flags &&
							"boolean" == typeof t.ignoreCase &&
							"boolean" == typeof t.multiline &&
							"boolean" == typeof t.global)
					);
				})(t)
			)
				return "regexp";
			switch (n(t)) {
				case "Symbol":
					return "symbol";
				case "Promise":
					return "promise";
				case "WeakMap":
					return "weakmap";
				case "WeakSet":
					return "weakset";
				case "Map":
					return "map";
				case "Set":
					return "set";
				case "Int8Array":
					return "int8array";
				case "Uint8Array":
					return "uint8array";
				case "Uint8ClampedArray":
					return "uint8clampedarray";
				case "Int16Array":
					return "int16array";
				case "Uint16Array":
					return "uint16array";
				case "Int32Array":
					return "int32array";
				case "Uint32Array":
					return "uint32array";
				case "Float32Array":
					return "float32array";
				case "Float64Array":
					return "float64array";
			}
			if (
				(function (t) {
					return (
						"function" == typeof t.throw &&
						"function" == typeof t.return &&
						"function" == typeof t.next
					);
				})(t)
			)
				return "generator";
			switch ((e = r.call(t))) {
				case "[object Object]":
					return "object";
				case "[object Map Iterator]":
					return "mapiterator";
				case "[object Set Iterator]":
					return "setiterator";
				case "[object String Iterator]":
					return "stringiterator";
				case "[object Array Iterator]":
					return "arrayiterator";
			}
			return e.slice(8, -1).toLowerCase().replace(/\s/g, "");
		};
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(0),
				o = r(8),
				f = r(4),
				a = r(15),
				u = r(14),
				c = r(24),
				h = r(5),
				d = r(9),
				p = r(16),
				l = r(21),
				b = r(50),
				m = r(39),
				g = m.PublicKeyHash,
				y = m.PublicKey,
				v = m.MultiSigScriptHash,
				_ = m.MultiSig,
				S = r(17),
				w = r(10),
				I = r(29),
				A = r(3);
			function E(t) {
				if (!(this instanceof E)) return new E(t);
				if (
					((this.inputs = []),
					(this.outputs = []),
					(this._inputAmount = void 0),
					(this._outputAmount = void 0),
					t)
				) {
					if (t instanceof E) return E.shallowCopy(t);
					if (f.isHexa(t)) this.fromString(t);
					else if (e.isBuffer(t)) this.fromBuffer(t);
					else {
						if (!n.isObject(t))
							throw new o.InvalidArgument(
								"Must provide an object or string to deserialize a transaction"
							);
						this.fromObject(t);
					}
				} else this._newTransaction();
			}
			(E.DUST_AMOUNT = 546),
				(E.FEE_SECURITY_MARGIN = 150),
				(E.MAX_MONEY = 21e14),
				(E.NLOCKTIME_BLOCKHEIGHT_LIMIT = 5e8),
				(E.NLOCKTIME_MAX_VALUE = 4294967295),
				(E.FEE_PER_KB = 500),
				(E.CHANGE_OUTPUT_MAX_SIZE = 62),
				(E.shallowCopy = function (t) {
					return new E(t.toBuffer());
				});
			var P = {
				configurable: !1,
				enumerable: !0,
				get: function () {
					return (
						(this._hash = new a(this._getHash()).readReverse().toString("hex")),
						this._hash
					);
				},
			};
			Object.defineProperty(E.prototype, "hash", P),
				Object.defineProperty(E.prototype, "id", P);
			var O = {
				configurable: !1,
				enumerable: !0,
				get: function () {
					return this._getInputAmount();
				},
			};
			Object.defineProperty(E.prototype, "inputAmount", O),
				(O.get = function () {
					return this._getOutputAmount();
				}),
				Object.defineProperty(E.prototype, "outputAmount", O),
				(E.prototype._getHash = function () {
					return h.sha256sha256(this.toBuffer());
				}),
				(E.prototype.serialize = function (t) {
					return !0 === t || (t && t.disableAll)
						? this.uncheckedSerialize()
						: this.checkedSerialize(t);
				}),
				(E.prototype.uncheckedSerialize = E.prototype.toString =
					function () {
						return this.toBuffer().toString("hex");
					}),
				(E.prototype.checkedSerialize = function (t) {
					var e = this.getSerializationError(t);
					if (e)
						throw (
							((e.message +=
								" - For more information please see: https://bsv.io/api/lib/transaction#serialization-checks"),
							e)
						);
					return this.uncheckedSerialize();
				}),
				(E.prototype.invalidSatoshis = function () {
					for (var t = !1, e = 0; e < this.outputs.length; e++)
						this.outputs[e].invalidSatoshis() && (t = !0);
					return t;
				}),
				(E.prototype.getSerializationError = function (t) {
					if (((t = t || {}), this.invalidSatoshis()))
						return new o.Transaction.InvalidSatoshis();
					var e,
						r = this._getUnspentValue();
					return (
						r < 0
							? t.disableMoreOutputThanInput ||
							  (e = new o.Transaction.InvalidOutputAmountSum())
							: (e = this._hasFeeError(t, r)),
						e || this._hasDustOutputs(t) || this._isMissingSignatures(t)
					);
				}),
				(E.prototype._hasFeeError = function (t, e) {
					if (!n.isUndefined(this._fee) && this._fee !== e)
						return new o.Transaction.FeeError.Different(
							"Unspent value is " + e + " but specified fee is " + this._fee
						);
					if (!t.disableLargeFees) {
						var r = Math.floor(E.FEE_SECURITY_MARGIN * this._estimateFee());
						if (e > r)
							return this._missingChange()
								? new o.Transaction.ChangeAddressMissing(
										"Fee is too large and no change address was provided"
								  )
								: new o.Transaction.FeeError.TooLarge(
										"expected less than " + r + " but got " + e
								  );
					}
				}),
				(E.prototype._missingChange = function () {
					return !this._changeScript;
				}),
				(E.prototype._hasDustOutputs = function (t) {
					var e, r;
					if (!t.disableDustOutputs)
						for (e in this.outputs)
							if (
								(r = this.outputs[e]).satoshis < E.DUST_AMOUNT &&
								!r.script.isDataOut() &&
								!r.script.isSafeDataOut()
							)
								return new o.Transaction.DustOutputs();
				}),
				(E.prototype._isMissingSignatures = function (t) {
					if (!t.disableIsFullySigned)
						return this.isFullySigned()
							? void 0
							: new o.Transaction.MissingSignatures();
				}),
				(E.prototype.inspect = function () {
					return "<Transaction: " + this.uncheckedSerialize() + ">";
				}),
				(E.prototype.toBuffer = function () {
					var t = new u();
					return this.toBufferWriter(t).toBuffer();
				}),
				(E.prototype.toBufferWriter = function (t) {
					return (
						t.writeInt32LE(this.version),
						t.writeVarintNum(this.inputs.length),
						n.each(this.inputs, function (e) {
							e.toBufferWriter(t);
						}),
						t.writeVarintNum(this.outputs.length),
						n.each(this.outputs, function (e) {
							e.toBufferWriter(t);
						}),
						t.writeUInt32LE(this.nLockTime),
						t
					);
				}),
				(E.prototype.fromBuffer = function (t) {
					var e = new a(t);
					return this.fromBufferReader(e);
				}),
				(E.prototype.fromBufferReader = function (t) {
					var e, r, n;
					for (
						i.checkArgument(!t.finished(), "No transaction data received"),
							this.version = t.readInt32LE(),
							r = t.readVarintNum(),
							e = 0;
						e < r;
						e++
					) {
						var s = m.fromBufferReader(t);
						this.inputs.push(s);
					}
					for (n = t.readVarintNum(), e = 0; e < n; e++)
						this.outputs.push(S.fromBufferReader(t));
					return (this.nLockTime = t.readUInt32LE()), this;
				}),
				(E.prototype.toObject = E.prototype.toJSON =
					function () {
						var t = [];
						this.inputs.forEach(function (e) {
							t.push(e.toObject());
						});
						var e = [];
						this.outputs.forEach(function (t) {
							e.push(t.toObject());
						});
						var r = {
							hash: this.hash,
							version: this.version,
							inputs: t,
							outputs: e,
							nLockTime: this.nLockTime,
						};
						return (
							this._changeScript &&
								(r.changeScript = this._changeScript.toString()),
							n.isUndefined(this._changeIndex) ||
								(r.changeIndex = this._changeIndex),
							n.isUndefined(this._fee) || (r.fee = this._fee),
							r
						);
					}),
				(E.prototype.fromObject = function (t) {
					i.checkArgument(n.isObject(t) || t instanceof E);
					var e,
						r = this;
					return (
						(e = t instanceof E ? e.toObject() : t),
						n.each(e.inputs, function (t) {
							if (t.output && t.output.script) {
								var e,
									n = new w(t.output.script);
								if (n.isPublicKeyHashOut()) e = new m.PublicKeyHash(t);
								else if (n.isScriptHashOut() && t.publicKeys && t.threshold)
									e = new m.MultiSigScriptHash(
										t,
										t.publicKeys,
										t.threshold,
										t.signatures
									);
								else {
									if (!n.isPublicKeyOut())
										throw new o.Transaction.Input.UnsupportedScript(
											t.output.script
										);
									e = new m.PublicKey(t);
								}
								r.addInput(e);
							} else r.uncheckedAddInput(new m(t));
						}),
						n.each(e.outputs, function (t) {
							r.addOutput(new S(t));
						}),
						e.changeIndex && (this._changeIndex = e.changeIndex),
						e.changeScript && (this._changeScript = new w(e.changeScript)),
						e.fee && (this._fee = e.fee),
						(this.nLockTime = e.nLockTime),
						(this.version = e.version),
						this._checkConsistency(t),
						this
					);
				}),
				(E.prototype._checkConsistency = function (t) {
					n.isUndefined(this._changeIndex) ||
						(i.checkState(this._changeScript, "Change script is expected."),
						i.checkState(
							this.outputs[this._changeIndex],
							"Change index points to undefined output."
						),
						i.checkState(
							this.outputs[this._changeIndex].script.toString() ===
								this._changeScript.toString(),
							"Change output has an unexpected script."
						)),
						t &&
							t.hash &&
							i.checkState(
								t.hash === this.hash,
								"Hash in object does not match transaction hash."
							);
				}),
				(E.prototype.lockUntilDate = function (t) {
					if (
						(i.checkArgument(t),
						n.isNumber(t) && t < E.NLOCKTIME_BLOCKHEIGHT_LIMIT)
					)
						throw new o.Transaction.LockTimeTooEarly();
					n.isDate(t) && (t = t.getTime() / 1e3);
					for (var e = 0; e < this.inputs.length; e++)
						this.inputs[e].sequenceNumber === m.DEFAULT_SEQNUMBER &&
							(this.inputs[e].sequenceNumber = m.DEFAULT_LOCKTIME_SEQNUMBER);
					return (this.nLockTime = t), this;
				}),
				(E.prototype.lockUntilBlockHeight = function (t) {
					if (
						(i.checkArgument(n.isNumber(t)), t >= E.NLOCKTIME_BLOCKHEIGHT_LIMIT)
					)
						throw new o.Transaction.BlockHeightTooHigh();
					if (t < 0) throw new o.Transaction.NLockTimeOutOfRange();
					for (var e = 0; e < this.inputs.length; e++)
						this.inputs[e].sequenceNumber === m.DEFAULT_SEQNUMBER &&
							(this.inputs[e].sequenceNumber = m.DEFAULT_LOCKTIME_SEQNUMBER);
					return (this.nLockTime = t), this;
				}),
				(E.prototype.getLockTime = function () {
					return this.nLockTime
						? this.nLockTime < E.NLOCKTIME_BLOCKHEIGHT_LIMIT
							? this.nLockTime
							: new Date(1e3 * this.nLockTime)
						: null;
				}),
				(E.prototype.fromString = function (t) {
					this.fromBuffer(s.Buffer.from(t, "hex"));
				}),
				(E.prototype._newTransaction = function () {
					(this.version = 1), (this.nLockTime = 0);
				}),
				(E.prototype.from = function (t, e, r) {
					if (n.isArray(t)) {
						var i = this;
						return (
							n.each(t, function (t) {
								i.from(t, e, r);
							}),
							this
						);
					}
					return n.some(this.inputs, function (e) {
						return (
							e.prevTxId.toString("hex") === t.txId &&
							e.outputIndex === t.outputIndex
						);
					})
						? this
						: (e && r ? this._fromMultisigUtxo(t, e, r) : this._fromNonP2SH(t),
						  this);
				}),
				(E.prototype._fromNonP2SH = function (t) {
					var e;
					(e = (t = new b(t)).script.isPublicKeyHashOut()
						? g
						: t.script.isPublicKeyOut()
						? y
						: m),
						this.addInput(
							new e({
								output: new S({ script: t.script, satoshis: t.satoshis }),
								prevTxId: t.txId,
								outputIndex: t.outputIndex,
								script: w.empty(),
							})
						);
				}),
				(E.prototype._fromMultisigUtxo = function (t, e, r) {
					var n;
					if (
						(i.checkArgument(
							r <= e.length,
							"Number of required signatures must be greater than the number of public keys"
						),
						(t = new b(t)).script.isMultisigOut())
					)
						n = _;
					else {
						if (!t.script.isScriptHashOut()) throw new Error("@TODO");
						n = v;
					}
					this.addInput(
						new n(
							{
								output: new S({ script: t.script, satoshis: t.satoshis }),
								prevTxId: t.txId,
								outputIndex: t.outputIndex,
								script: w.empty(),
							},
							e,
							r
						)
					);
				}),
				(E.prototype.addInput = function (t, e, r) {
					if (
						(i.checkArgumentType(t, m, "input"),
						!t.output && (n.isUndefined(e) || n.isUndefined(r)))
					)
						throw new o.Transaction.NeedMoreInfo(
							"Need information about the UTXO script and satoshis"
						);
					return (
						t.output ||
							!e ||
							n.isUndefined(r) ||
							((e = e instanceof w ? e : new w(e)),
							i.checkArgumentType(r, "number", "satoshis"),
							(t.output = new S({ script: e, satoshis: r }))),
						this.uncheckedAddInput(t)
					);
				}),
				(E.prototype.uncheckedAddInput = function (t) {
					return (
						i.checkArgumentType(t, m, "input"),
						this.inputs.push(t),
						(this._inputAmount = void 0),
						this._updateChangeOutput(),
						this
					);
				}),
				(E.prototype.hasAllUtxoInfo = function () {
					return n.every(
						this.inputs.map(function (t) {
							return !!t.output;
						})
					);
				}),
				(E.prototype.fee = function (t) {
					return (
						i.checkArgument(n.isNumber(t), "amount must be a number"),
						(this._fee = t),
						this._updateChangeOutput(),
						this
					);
				}),
				(E.prototype.feePerKb = function (t) {
					return (
						i.checkArgument(n.isNumber(t), "amount must be a number"),
						(this._feePerKb = t),
						this._updateChangeOutput(),
						this
					);
				}),
				(E.prototype.change = function (t) {
					return (
						i.checkArgument(t, "address is required"),
						(this._changeScript = w.fromAddress(t)),
						this._updateChangeOutput(),
						this
					);
				}),
				(E.prototype.getChangeOutput = function () {
					return n.isUndefined(this._changeIndex)
						? null
						: this.outputs[this._changeIndex];
				}),
				(E.prototype.to = function (t, e) {
					if (n.isArray(t)) {
						var r = this;
						return (
							n.each(t, function (t) {
								r.to(t.address, t.satoshis);
							}),
							this
						);
					}
					return (
						i.checkArgument(
							f.isNaturalNumber(e),
							"Amount is expected to be a positive integer"
						),
						this.addOutput(new S({ script: w(new l(t)), satoshis: e })),
						this
					);
				}),
				(E.prototype.addData = function (t) {
					return (
						this.addOutput(new S({ script: w.buildDataOut(t), satoshis: 0 })),
						this
					);
				}),
				(E.prototype.addSafeData = function (t) {
					return (
						this.addOutput(
							new S({ script: w.buildSafeDataOut(t), satoshis: 0 })
						),
						this
					);
				}),
				(E.prototype.addOutput = function (t) {
					return (
						i.checkArgumentType(t, S, "output"),
						this._addOutput(t),
						this._updateChangeOutput(),
						this
					);
				}),
				(E.prototype.clearOutputs = function () {
					return (
						(this.outputs = []),
						this._clearSignatures(),
						(this._outputAmount = void 0),
						(this._changeIndex = void 0),
						this._updateChangeOutput(),
						this
					);
				}),
				(E.prototype._addOutput = function (t) {
					this.outputs.push(t), (this._outputAmount = void 0);
				}),
				(E.prototype._getOutputAmount = function () {
					if (n.isUndefined(this._outputAmount)) {
						var t = this;
						(this._outputAmount = 0),
							n.each(this.outputs, function (e) {
								t._outputAmount += e.satoshis;
							});
					}
					return this._outputAmount;
				}),
				(E.prototype._getInputAmount = function () {
					if (n.isUndefined(this._inputAmount)) {
						var t = this;
						(this._inputAmount = 0),
							n.each(this.inputs, function (e) {
								if (n.isUndefined(e.output))
									throw new o.Transaction.Input.MissingPreviousOutput();
								t._inputAmount += e.output.satoshis;
							});
					}
					return this._inputAmount;
				}),
				(E.prototype._updateChangeOutput = function () {
					if (this._changeScript) {
						this._clearSignatures(),
							n.isUndefined(this._changeIndex) ||
								this._removeOutput(this._changeIndex),
							(this._changeIndex = this.outputs.length),
							this._addOutput(
								new S({ script: this._changeScript, satoshis: 0 })
							);
						var t = this._getUnspentValue() - this.getFee();
						this._removeOutput(this._changeIndex),
							(this._changeIndex = void 0),
							t >= E.DUST_AMOUNT &&
								((this._changeIndex = this.outputs.length),
								this._addOutput(
									new S({ script: this._changeScript, satoshis: t })
								));
					}
				}),
				(E.prototype.getFee = function () {
					return this.isCoinbase()
						? 0
						: n.isUndefined(this._fee)
						? this._changeScript
							? this._estimateFee()
							: this._getUnspentValue()
						: this._fee;
				}),
				(E.prototype._estimateFee = function () {
					var t = this._estimateSize();
					return Math.ceil((t / 1e3) * (this._feePerKb || E.FEE_PER_KB));
				}),
				(E.prototype._getUnspentValue = function () {
					return this._getInputAmount() - this._getOutputAmount();
				}),
				(E.prototype._clearSignatures = function () {
					n.each(this.inputs, function (t) {
						t.clearSignatures();
					});
				}),
				(E.prototype._estimateSize = function () {
					var t = 8;
					return (
						(t += c(this.inputs.length).toBuffer().length),
						(t += c(this.outputs.length).toBuffer().length),
						n.each(this.inputs, function (e) {
							t += e._estimateSize();
						}),
						n.each(this.outputs, function (e) {
							t += e.getSize();
						}),
						t
					);
				}),
				(E.prototype._removeOutput = function (t) {
					var e = this.outputs[t];
					(this.outputs = n.without(this.outputs, e)),
						(this._outputAmount = void 0);
				}),
				(E.prototype.removeOutput = function (t) {
					this._removeOutput(t), this._updateChangeOutput();
				}),
				(E.prototype.sort = function () {
					return (
						this.sortInputs(function (t) {
							var e = Array.prototype.concat.apply([], t);
							return (
								e.sort(function (t, e) {
									return (
										t.prevTxId.compare(e.prevTxId) ||
										t.outputIndex - e.outputIndex
									);
								}),
								e
							);
						}),
						this.sortOutputs(function (t) {
							var e = Array.prototype.concat.apply([], t);
							return (
								e.sort(function (t, e) {
									return (
										t.satoshis - e.satoshis ||
										t.script.toBuffer().compare(e.script.toBuffer())
									);
								}),
								e
							);
						}),
						this
					);
				}),
				(E.prototype.shuffleOutputs = function () {
					return this.sortOutputs(n.shuffle);
				}),
				(E.prototype.sortOutputs = function (t) {
					var e = t(this.outputs);
					return this._newOutputOrder(e);
				}),
				(E.prototype.sortInputs = function (t) {
					return (this.inputs = t(this.inputs)), this._clearSignatures(), this;
				}),
				(E.prototype._newOutputOrder = function (t) {
					if (
						this.outputs.length !== t.length ||
						0 !== n.difference(this.outputs, t).length
					)
						throw new o.Transaction.InvalidSorting();
					if (!n.isUndefined(this._changeIndex)) {
						var e = this.outputs[this._changeIndex];
						this._changeIndex = t.indexOf(e);
					}
					return (this.outputs = t), this;
				}),
				(E.prototype.removeInput = function (t, e) {
					var r;
					if (
						(r =
							!e && n.isNumber(t)
								? t
								: n.findIndex(this.inputs, function (r) {
										return (
											r.prevTxId.toString("hex") === t && r.outputIndex === e
										);
								  })) < 0 ||
						r >= this.inputs.length
					)
						throw new o.Transaction.InvalidIndex(r, this.inputs.length);
					var i = this.inputs[r];
					(this.inputs = n.without(this.inputs, i)),
						(this._inputAmount = void 0),
						this._updateChangeOutput();
				}),
				(E.prototype.sign = function (t, e) {
					i.checkState(
						this.hasAllUtxoInfo(),
						"Not all utxo information is available to sign the transaction."
					);
					var r = this;
					return n.isArray(t)
						? (n.each(t, function (t) {
								r.sign(t, e);
						  }),
						  this)
						: (n.each(this.getSignatures(t, e), function (t) {
								r.applySignature(t);
						  }),
						  this);
				}),
				(E.prototype.getSignatures = function (t, e) {
					(t = new I(t)), (e = e || d.SIGHASH_ALL | d.SIGHASH_FORKID);
					var r = this,
						i = [],
						s = h.sha256ripemd160(t.publicKey.toBuffer());
					return (
						n.each(this.inputs, function (o, f) {
							n.each(o.getSignatures(r, t, f, e, s), function (t) {
								i.push(t);
							});
						}),
						i
					);
				}),
				(E.prototype.applySignature = function (t) {
					return this.inputs[t.inputIndex].addSignature(this, t), this;
				}),
				(E.prototype.isFullySigned = function () {
					return (
						n.each(this.inputs, function (t) {
							if (t.isFullySigned === m.prototype.isFullySigned)
								throw new o.Transaction.UnableToVerifySignature(
									"Unrecognized script kind, or not enough information to execute script.This usually happens when creating a transaction from a serialized transaction"
								);
						}),
						n.every(
							n.map(this.inputs, function (t) {
								return t.isFullySigned();
							})
						)
					);
				}),
				(E.prototype.isValidSignature = function (t) {
					if (
						this.inputs[t.inputIndex].isValidSignature ===
						m.prototype.isValidSignature
					)
						throw new o.Transaction.UnableToVerifySignature(
							"Unrecognized script kind, or not enough information to execute script.This usually happens when creating a transaction from a serialized transaction"
						);
					return this.inputs[t.inputIndex].isValidSignature(this, t);
				}),
				(E.prototype.verifySignature = function (t, e, r, n, i, s) {
					return p.verify(this, t, e, r, n, i, s);
				}),
				(E.prototype.verify = function () {
					if (0 === this.inputs.length) return "transaction txins empty";
					if (0 === this.outputs.length) return "transaction txouts empty";
					for (var t = new A(0), e = 0; e < this.outputs.length; e++) {
						var r = this.outputs[e];
						if (r.invalidSatoshis())
							return "transaction txout " + e + " satoshis is invalid";
						if (r._satoshisBN.gt(new A(E.MAX_MONEY, 10)))
							return "transaction txout " + e + " greater than MAX_MONEY";
						if ((t = t.add(r._satoshisBN)).gt(new A(E.MAX_MONEY)))
							return (
								"transaction txout " +
								e +
								" total output greater than MAX_MONEY"
							);
					}
					if (this.toBuffer().length > 1e6)
						return "transaction over the maximum block size";
					var i = {};
					for (e = 0; e < this.inputs.length; e++) {
						var s = this.inputs[e],
							o = s.prevTxId + ":" + s.outputIndex;
						if (!n.isUndefined(i[o]))
							return "transaction input " + e + " duplicate input";
						i[o] = !0;
					}
					if (this.isCoinbase()) {
						var f = this.inputs[0]._scriptBuffer;
						if (f.length < 2 || f.length > 100)
							return "coinbase transaction script size invalid";
					} else
						for (e = 0; e < this.inputs.length; e++)
							if (this.inputs[e].isNull())
								return "transaction input " + e + " has null input";
					return !0;
				}),
				(E.prototype.isCoinbase = function () {
					return 1 === this.inputs.length && this.inputs[0].isNull();
				}),
				(t.exports = E);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		var n = r(1),
			i = r(2),
			s = r(4),
			o = r(10),
			f = r(21);
		function a(t) {
			if (!(this instanceof a)) return new a(t);
			i.checkArgument(
				n.isObject(t),
				"Must provide an object from where to extract data"
			);
			var e = t.address ? new f(t.address) : void 0,
				r = t.txid ? t.txid : t.txId;
			if (!r || !s.isHexaString(r) || r.length > 64)
				throw new Error("Invalid TXID in object", t);
			var u = n.isUndefined(t.vout) ? t.outputIndex : t.vout;
			if (!n.isNumber(u)) throw new Error("Invalid outputIndex, received " + u);
			i.checkArgument(
				!n.isUndefined(t.scriptPubKey) || !n.isUndefined(t.script),
				"Must provide the scriptPubKey for that output!"
			);
			var c = new o(t.scriptPubKey || t.script);
			i.checkArgument(
				!n.isUndefined(t.amount) || !n.isUndefined(t.satoshis),
				"Must provide an amount for the output"
			);
			var h = n.isUndefined(t.amount) ? t.satoshis : Math.round(1e8 * t.amount);
			i.checkArgument(n.isNumber(h), "Amount must be a number"),
				s.defineImmutable(this, {
					address: e,
					txId: r,
					outputIndex: u,
					script: c,
					satoshis: h,
				});
		}
		(a.prototype.inspect = function () {
			return (
				"<UnspentOutput: " +
				this.txId +
				":" +
				this.outputIndex +
				", satoshis: " +
				this.satoshis +
				", address: " +
				this.address +
				">"
			);
		}),
			(a.prototype.toString = function () {
				return this.txId + ":" + this.outputIndex;
			}),
			(a.fromObject = function (t) {
				return new a(t);
			}),
			(a.prototype.toObject = a.prototype.toJSON =
				function () {
					return {
						address: this.address ? this.address.toString() : void 0,
						txid: this.txId,
						vout: this.outputIndex,
						scriptPubKey: this.script.toBuffer().toString("hex"),
						amount: Number.parseFloat((this.satoshis / 1e8).toFixed(8)),
					};
				}),
			(t.exports = a);
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(33),
				s = r(15),
				o = r(14),
				f = r(5),
				a = r(31),
				u = r(8),
				c = r(2);
			function h(t) {
				if (!(this instanceof h)) return new h(t);
				var r = {};
				if (e.isBuffer(t)) r = h._fromBufferReader(s(t));
				else {
					if (!n.isObject(t))
						throw new TypeError("Unrecognized argument for MerkleBlock");
					r = {
						header: t.header instanceof i ? t.header : i.fromObject(t.header),
						numTransactions: t.numTransactions,
						hashes: t.hashes,
						flags: t.flags,
					};
				}
				return (
					n.extend(this, r),
					(this._flagBitsUsed = 0),
					(this._hashesUsed = 0),
					this
				);
			}
			(h.fromBuffer = function (t) {
				return h.fromBufferReader(s(t));
			}),
				(h.fromBufferReader = function (t) {
					return new h(h._fromBufferReader(t));
				}),
				(h.prototype.toBuffer = function () {
					return this.toBufferWriter().concat();
				}),
				(h.prototype.toBufferWriter = function (t) {
					t || (t = new o()),
						t.write(this.header.toBuffer()),
						t.writeUInt32LE(this.numTransactions),
						t.writeVarintNum(this.hashes.length);
					for (var r = 0; r < this.hashes.length; r++)
						t.write(e.from(this.hashes[r], "hex"));
					for (
						t.writeVarintNum(this.flags.length), r = 0;
						r < this.flags.length;
						r++
					)
						t.writeUInt8(this.flags[r]);
					return t;
				}),
				(h.prototype.toObject = h.prototype.toJSON =
					function () {
						return {
							header: this.header.toObject(),
							numTransactions: this.numTransactions,
							hashes: this.hashes,
							flags: this.flags,
						};
					}),
				(h.prototype.validMerkleTree = function () {
					if (
						(c.checkState(
							n.isArray(this.flags),
							"MerkleBlock flags is not an array"
						),
						c.checkState(
							n.isArray(this.hashes),
							"MerkleBlock hashes is not an array"
						),
						this.hashes.length > this.numTransactions)
					)
						return !1;
					if (8 * this.flags.length < this.hashes.length) return !1;
					var t = this._calcTreeHeight(),
						e = { hashesUsed: 0, flagBitsUsed: 0 },
						r = this._traverseMerkleTree(t, 0, e);
					return (
						e.hashesUsed === this.hashes.length &&
						r.equals(this.header.merkleRoot)
					);
				}),
				(h.prototype.filterdTxsHash = function () {
					throw new Error(
						"filterdTxsHash has been deprecated. use filteredTxsHash."
					);
				}),
				(h.prototype.filteredTxsHash = function () {
					if (
						(c.checkState(
							n.isArray(this.flags),
							"MerkleBlock flags is not an array"
						),
						c.checkState(
							n.isArray(this.hashes),
							"MerkleBlock hashes is not an array"
						),
						this.hashes.length > this.numTransactions)
					)
						throw new u.MerkleBlock.InvalidMerkleTree();
					if (8 * this.flags.length < this.hashes.length)
						throw new u.MerkleBlock.InvalidMerkleTree();
					if (1 === this.hashes.length) return [];
					var t = this._calcTreeHeight(),
						e = { hashesUsed: 0, flagBitsUsed: 0 },
						r = this._traverseMerkleTree(t, 0, e, !0);
					if (e.hashesUsed !== this.hashes.length)
						throw new u.MerkleBlock.InvalidMerkleTree();
					return r;
				}),
				(h.prototype._traverseMerkleTree = function (t, r, n, i) {
					if (
						(((n = n || {}).txs = n.txs || []),
						(n.flagBitsUsed = n.flagBitsUsed || 0),
						(n.hashesUsed = n.hashesUsed || 0),
						(i = i || !1),
						n.flagBitsUsed > 8 * this.flags.length)
					)
						return null;
					var s =
						(this.flags[n.flagBitsUsed >> 3] >>> (7 & n.flagBitsUsed++)) & 1;
					if (0 !== t && s) {
						var o = this._traverseMerkleTree(t - 1, 2 * r, n),
							a = o;
						return (
							2 * r + 1 < this._calcTreeWidth(t - 1) &&
								(a = this._traverseMerkleTree(t - 1, 2 * r + 1, n)),
							i ? n.txs : f.sha256sha256(e.concat([o, a]))
						);
					}
					if (n.hashesUsed >= this.hashes.length) return null;
					var u = this.hashes[n.hashesUsed++];
					return 0 === t && s && n.txs.push(u), e.from(u, "hex");
				}),
				(h.prototype._calcTreeWidth = function (t) {
					return (this.numTransactions + (1 << t) - 1) >> t;
				}),
				(h.prototype._calcTreeHeight = function () {
					for (var t = 0; this._calcTreeWidth(t) > 1; ) t++;
					return t;
				}),
				(h.prototype.hasTransaction = function (t) {
					c.checkArgument(!n.isUndefined(t), "tx cannot be undefined"),
						c.checkArgument(
							t instanceof a || "string" == typeof t,
							'Invalid tx given, tx must be a "string" or "Transaction"'
						);
					var r = t;
					t instanceof a && (r = e.from(t.id, "hex").reverse().toString("hex"));
					var i = [],
						s = this._calcTreeHeight();
					return (
						this._traverseMerkleTree(s, 0, { txs: i }), -1 !== i.indexOf(r)
					);
				}),
				(h._fromBufferReader = function (t) {
					c.checkState(!t.finished(), "No merkleblock data received");
					var e = {};
					(e.header = i.fromBufferReader(t)),
						(e.numTransactions = t.readUInt32LE());
					var r = t.readVarintNum();
					e.hashes = [];
					for (var n = 0; n < r; n++) e.hashes.push(t.read(32).toString("hex"));
					var s = t.readVarintNum();
					for (e.flags = [], n = 0; n < s; n++) e.flags.push(t.readUInt8());
					return e;
				}),
				(h.fromObject = function (t) {
					return new h(t);
				}),
				(t.exports = h);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(37),
				i = r(0),
				s = r(1),
				o = r(2),
				f = r(3),
				a = r(30),
				u = r(23),
				c = r(5),
				h = r(19),
				d = r(20),
				p = r(29),
				l = r(32),
				b = r(8),
				m = b.HDPrivateKey,
				g = r(4);
			function y(t) {
				if (t instanceof y) return t;
				if (!(this instanceof y)) return new y(t);
				if (!t) return this._generateRandomly();
				if (h.get(t)) return this._generateRandomly(t);
				if (s.isString(t) || e.isBuffer(t))
					if (y.isValidSerialized(t)) this._buildFromSerialized(t);
					else if (g.isValidJSON(t)) this._buildFromJSON(t);
					else {
						if (!e.isBuffer(t) || !y.isValidSerialized(t.toString()))
							throw y.getSerializedError(t);
						this._buildFromSerialized(t.toString());
					}
				else {
					if (!s.isObject(t)) throw new m.UnrecognizedArgument(t);
					this._buildFromObject(t);
				}
			}
			(y.fromRandom = function () {
				return new y();
			}),
				(y.isValidPath = function (t, e) {
					if (s.isString(t)) {
						var r = y._getDerivationIndexes(t);
						return null !== r && s.every(r, y.isValidPath);
					}
					return (
						!!s.isNumber(t) &&
						(t < y.Hardened && !0 === e && (t += y.Hardened),
						t >= 0 && t < y.MaxIndex)
					);
				}),
				(y._getDerivationIndexes = function (t) {
					var e = t.split("/");
					if (s.includes(y.RootElementAlias, t)) return [];
					if (!s.includes(y.RootElementAlias, e[0])) return null;
					var r = e.slice(1).map(function (t) {
						var e = "'" === t.slice(-1);
						if ((e && (t = t.slice(0, -1)), !t || "-" === t[0])) return NaN;
						var r = +t;
						return e && (r += y.Hardened), r;
					});
					return s.some(r, isNaN) ? null : r;
				}),
				(y.prototype.derive = function () {
					throw new Error(
						"derive has been deprecated. use deriveChild or, for the old way, deriveNonCompliantChild."
					);
				}),
				(y.prototype.deriveChild = function (t, e) {
					if (s.isNumber(t)) return this._deriveWithNumber(t, e);
					if (s.isString(t)) return this._deriveFromString(t);
					throw new m.InvalidDerivationArgument(t);
				}),
				(y.prototype.deriveNonCompliantChild = function (t, e) {
					if (s.isNumber(t)) return this._deriveWithNumber(t, e, !0);
					if (s.isString(t)) return this._deriveFromString(t, !0);
					throw new m.InvalidDerivationArgument(t);
				}),
				(y.prototype._deriveWithNumber = function (t, r, s) {
					if (!y.isValidPath(t, r)) throw new m.InvalidPath(t);
					(r = t >= y.Hardened || r),
						t < y.Hardened && !0 === r && (t += y.Hardened);
					var o,
						a = g.integerAsBuffer(t);
					if (r && s) {
						var u = this.privateKey.bn.toBuffer();
						o = e.concat([i.Buffer.from([0]), u, a]);
					} else if (r) {
						var h = this.privateKey.bn.toBuffer({ size: 32 });
						n(
							32 === h.length,
							"length of private key buffer is expected to be 32 bytes"
						),
							(o = e.concat([i.Buffer.from([0]), h, a]));
					} else o = e.concat([this.publicKey.toBuffer(), a]);
					var l = c.sha512hmac(o, this._buffers.chainCode),
						b = f.fromBuffer(l.slice(0, 32), { size: 32 }),
						v = l.slice(32, 64),
						_ = b
							.add(this.privateKey.toBigNumber())
							.umod(d.getN())
							.toBuffer({ size: 32 });
					return p.isValid(_)
						? new y({
								network: this.network,
								depth: this.depth + 1,
								parentFingerPrint: this.fingerPrint,
								childIndex: t,
								chainCode: v,
								privateKey: _,
						  })
						: this._deriveWithNumber(t + 1, null, s);
				}),
				(y.prototype._deriveFromString = function (t, e) {
					if (!y.isValidPath(t)) throw new m.InvalidPath(t);
					return y._getDerivationIndexes(t).reduce(function (t, r) {
						return t._deriveWithNumber(r, null, e);
					}, this);
				}),
				(y.isValidSerialized = function (t, e) {
					return !y.getSerializedError(t, e);
				}),
				(y.getSerializedError = function (t, r) {
					if (!s.isString(t) && !e.isBuffer(t))
						return new m.UnrecognizedArgument("Expected string or buffer");
					if (!a.validCharacters(t))
						return new b.InvalidB58Char("(unknown)", t);
					try {
						t = u.decode(t);
					} catch (e) {
						return new b.InvalidB58Checksum(t);
					}
					if (t.length !== y.DataLength) return new m.InvalidLength(t);
					if (!s.isUndefined(r)) {
						var n = y._validateNetwork(t, r);
						if (n) return n;
					}
					return null;
				}),
				(y._validateNetwork = function (t, e) {
					var r = h.get(e);
					if (!r) return new b.InvalidNetworkArgument(e);
					var n = t.slice(0, 4);
					return n.readUInt32BE(0) !== r.xprivkey
						? new b.InvalidNetwork(n)
						: null;
				}),
				(y.fromString = function (t) {
					return (
						o.checkArgument(s.isString(t), "No valid string was provided"),
						new y(t)
					);
				}),
				(y.fromObject = function (t) {
					return (
						o.checkArgument(s.isObject(t), "No valid argument was provided"),
						new y(t)
					);
				}),
				(y.prototype._buildFromJSON = function (t) {
					return this._buildFromObject(JSON.parse(t));
				}),
				(y.prototype._buildFromObject = function (t) {
					var r = {
						version: t.network
							? g.integerAsBuffer(h.get(t.network).xprivkey)
							: t.version,
						depth: s.isNumber(t.depth) ? e.from([255 & t.depth]) : t.depth,
						parentFingerPrint: s.isNumber(t.parentFingerPrint)
							? g.integerAsBuffer(t.parentFingerPrint)
							: t.parentFingerPrint,
						childIndex: s.isNumber(t.childIndex)
							? g.integerAsBuffer(t.childIndex)
							: t.childIndex,
						chainCode: s.isString(t.chainCode)
							? e.from(t.chainCode, "hex")
							: t.chainCode,
						privateKey:
							s.isString(t.privateKey) && g.isHexa(t.privateKey)
								? e.from(t.privateKey, "hex")
								: t.privateKey,
						checksum: t.checksum
							? t.checksum.length
								? t.checksum
								: g.integerAsBuffer(t.checksum)
							: void 0,
					};
					return this._buildFromBuffers(r);
				}),
				(y.prototype._buildFromSerialized = function (t) {
					var e = u.decode(t),
						r = {
							version: e.slice(y.VersionStart, y.VersionEnd),
							depth: e.slice(y.DepthStart, y.DepthEnd),
							parentFingerPrint: e.slice(
								y.ParentFingerPrintStart,
								y.ParentFingerPrintEnd
							),
							childIndex: e.slice(y.ChildIndexStart, y.ChildIndexEnd),
							chainCode: e.slice(y.ChainCodeStart, y.ChainCodeEnd),
							privateKey: e.slice(y.PrivateKeyStart, y.PrivateKeyEnd),
							checksum: e.slice(y.ChecksumStart, y.ChecksumEnd),
							xprivkey: t,
						};
					return this._buildFromBuffers(r);
				}),
				(y.prototype._generateRandomly = function (t) {
					return y.fromSeed(l.getRandomBuffer(64), t);
				}),
				(y.fromSeed = function (t, r) {
					if ((g.isHexaString(t) && (t = e.from(t, "hex")), !e.isBuffer(t)))
						throw new m.InvalidEntropyArgument(t);
					if (t.length < 16)
						throw new m.InvalidEntropyArgument.NotEnoughEntropy(t);
					if (t.length > 64)
						throw new m.InvalidEntropyArgument.TooMuchEntropy(t);
					var n = c.sha512hmac(t, i.Buffer.from("Bitcoin seed"));
					return new y({
						network: h.get(r) || h.defaultNetwork,
						depth: 0,
						parentFingerPrint: 0,
						childIndex: 0,
						privateKey: n.slice(0, 32),
						chainCode: n.slice(32, 64),
					});
				}),
				(y.prototype._calcHDPublicKey = function () {
					if (!this._hdPublicKey) {
						var t = r(53);
						this._hdPublicKey = new t(this);
					}
				}),
				(y.prototype._buildFromBuffers = function (t) {
					y._validateBufferArguments(t),
						g.defineImmutable(this, { _buffers: t });
					var r = [
							t.version,
							t.depth,
							t.parentFingerPrint,
							t.childIndex,
							t.chainCode,
							e.alloc(1),
							t.privateKey,
						],
						n = i.Buffer.concat(r);
					if (t.checksum && t.checksum.length) {
						if (t.checksum.toString() !== u.checksum(n).toString())
							throw new b.InvalidB58Checksum(n);
					} else t.checksum = u.checksum(n);
					var s,
						o = h.get(t.version.readUInt32BE(0));
					(s = u.encode(i.Buffer.concat(r))), (t.xprivkey = e.from(s));
					var a = new p(f.fromBuffer(t.privateKey), o),
						d = a.toPublicKey(),
						l = y.ParentFingerPrintSize,
						m = c.sha256ripemd160(d.toBuffer()).slice(0, l);
					return (
						g.defineImmutable(this, {
							xprivkey: s,
							network: o,
							depth: t.depth[0],
							privateKey: a,
							publicKey: d,
							fingerPrint: m,
						}),
						(this._hdPublicKey = null),
						Object.defineProperty(this, "hdPublicKey", {
							configurable: !1,
							enumerable: !0,
							get: function () {
								return this._calcHDPublicKey(), this._hdPublicKey;
							},
						}),
						Object.defineProperty(this, "xpubkey", {
							configurable: !1,
							enumerable: !0,
							get: function () {
								return this._calcHDPublicKey(), this._hdPublicKey.xpubkey;
							},
						}),
						this
					);
				}),
				(y._validateBufferArguments = function (t) {
					var r = function (r, i) {
						var s = t[r];
						n(e.isBuffer(s), r + " argument is not a buffer"),
							n(
								s.length === i,
								r +
									" has not the expected size: found " +
									s.length +
									", expected " +
									i
							);
					};
					r("version", y.VersionSize),
						r("depth", y.DepthSize),
						r("parentFingerPrint", y.ParentFingerPrintSize),
						r("childIndex", y.ChildIndexSize),
						r("chainCode", y.ChainCodeSize),
						r("privateKey", y.PrivateKeySize),
						t.checksum && t.checksum.length && r("checksum", y.CheckSumSize);
				}),
				(y.prototype.toString = function () {
					return this.xprivkey;
				}),
				(y.prototype.inspect = function () {
					return "<HDPrivateKey: " + this.xprivkey + ">";
				}),
				(y.prototype.toObject = y.prototype.toJSON =
					function () {
						return {
							network: h.get(this._buffers.version.readUInt32BE(0), "xprivkey")
								.name,
							depth: this._buffers.depth[0],
							fingerPrint: this.fingerPrint.readUInt32BE(0),
							parentFingerPrint:
								this._buffers.parentFingerPrint.readUInt32BE(0),
							childIndex: this._buffers.childIndex.readUInt32BE(0),
							chainCode: this._buffers.chainCode.toString("hex"),
							privateKey: this.privateKey.toBuffer().toString("hex"),
							checksum: this._buffers.checksum.readUInt32BE(0),
							xprivkey: this.xprivkey,
						};
					}),
				(y.fromBuffer = function (t) {
					return new y(t.toString());
				}),
				(y.fromHex = function (t) {
					return y.fromBuffer(e.from(t, "hex"));
				}),
				(y.prototype.toBuffer = function () {
					return e.from(this.toString());
				}),
				(y.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(y.DefaultDepth = 0),
				(y.DefaultFingerprint = 0),
				(y.DefaultChildIndex = 0),
				(y.Hardened = 2147483648),
				(y.MaxIndex = 2 * y.Hardened),
				(y.RootElementAlias = ["m", "M", "m'", "M'"]),
				(y.VersionSize = 4),
				(y.DepthSize = 1),
				(y.ParentFingerPrintSize = 4),
				(y.ChildIndexSize = 4),
				(y.ChainCodeSize = 32),
				(y.PrivateKeySize = 32),
				(y.CheckSumSize = 4),
				(y.DataLength = 78),
				(y.SerializedByteSize = 82),
				(y.VersionStart = 0),
				(y.VersionEnd = y.VersionStart + y.VersionSize),
				(y.DepthStart = y.VersionEnd),
				(y.DepthEnd = y.DepthStart + y.DepthSize),
				(y.ParentFingerPrintStart = y.DepthEnd),
				(y.ParentFingerPrintEnd =
					y.ParentFingerPrintStart + y.ParentFingerPrintSize),
				(y.ChildIndexStart = y.ParentFingerPrintEnd),
				(y.ChildIndexEnd = y.ChildIndexStart + y.ChildIndexSize),
				(y.ChainCodeStart = y.ChildIndexEnd),
				(y.ChainCodeEnd = y.ChainCodeStart + y.ChainCodeSize),
				(y.PrivateKeyStart = y.ChainCodeEnd + 1),
				(y.PrivateKeyEnd = y.PrivateKeyStart + y.PrivateKeySize),
				(y.ChecksumStart = y.PrivateKeyEnd),
				(y.ChecksumEnd = y.ChecksumStart + y.CheckSumSize),
				n(y.ChecksumEnd === y.SerializedByteSize),
				(t.exports = y);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(2),
				s = r(3),
				o = r(30),
				f = r(23),
				a = r(5),
				u = r(52),
				c = r(19),
				h = r(20),
				d = r(13),
				p = r(8),
				l = p,
				b = p.HDPublicKey,
				m = r(37),
				g = r(4);
			function y(t) {
				if (t instanceof y) return t;
				if (!(this instanceof y)) return new y(t);
				if (t) {
					if (n.isString(t) || e.isBuffer(t)) {
						var r = y.getSerializedError(t);
						if (r) {
							if (e.isBuffer(t) && !y.getSerializedError(t.toString()))
								return this._buildFromSerialized(t.toString());
							if (r instanceof b.ArgumentIsPrivateExtended)
								return new u(t).hdPublicKey;
							throw r;
						}
						return this._buildFromSerialized(t);
					}
					if (n.isObject(t))
						return t instanceof u
							? this._buildFromPrivate(t)
							: this._buildFromObject(t);
					throw new b.UnrecognizedArgument(t);
				}
				throw new b.MustSupplyArgument();
			}
			(y.fromHDPrivateKey = function (t) {
				return new y(t);
			}),
				(y.isValidPath = function (t) {
					if (n.isString(t)) {
						var e = u._getDerivationIndexes(t);
						return null !== e && n.every(e, y.isValidPath);
					}
					return !!n.isNumber(t) && t >= 0 && t < y.Hardened;
				}),
				(y.prototype.derive = function () {
					throw new Error(
						"derive has been deprecated. use deriveChild or, for the old way, deriveNonCompliantChild."
					);
				}),
				(y.prototype.deriveChild = function (t, e) {
					if (n.isNumber(t)) return this._deriveWithNumber(t, e);
					if (n.isString(t)) return this._deriveFromString(t);
					throw new b.InvalidDerivationArgument(t);
				}),
				(y.prototype._deriveWithNumber = function (t, r) {
					if (t >= y.Hardened || r)
						throw new b.InvalidIndexCantDeriveHardened();
					if (t < 0) throw new b.InvalidPath(t);
					var n,
						i = g.integerAsBuffer(t),
						o = e.concat([this.publicKey.toBuffer(), i]),
						f = a.sha512hmac(o, this._buffers.chainCode),
						u = s.fromBuffer(f.slice(0, 32), { size: 32 }),
						c = f.slice(32, 64);
					try {
						n = d.fromPoint(h.getG().mul(u).add(this.publicKey.point));
					} catch (e) {
						return this._deriveWithNumber(t + 1);
					}
					return new y({
						network: this.network,
						depth: this.depth + 1,
						parentFingerPrint: this.fingerPrint,
						childIndex: t,
						chainCode: c,
						publicKey: n,
					});
				}),
				(y.prototype._deriveFromString = function (t) {
					if (n.includes(t, "'")) throw new b.InvalidIndexCantDeriveHardened();
					if (!y.isValidPath(t)) throw new b.InvalidPath(t);
					return u._getDerivationIndexes(t).reduce(function (t, e) {
						return t._deriveWithNumber(e);
					}, this);
				}),
				(y.isValidSerialized = function (t, e) {
					return n.isNull(y.getSerializedError(t, e));
				}),
				(y.getSerializedError = function (t, r) {
					if (!n.isString(t) && !e.isBuffer(t))
						return new b.UnrecognizedArgument("expected buffer or string");
					if (!o.validCharacters(t))
						return new l.InvalidB58Char("(unknown)", t);
					try {
						t = f.decode(t);
					} catch (e) {
						return new l.InvalidB58Checksum(t);
					}
					if (t.length !== y.DataSize) return new b.InvalidLength(t);
					if (!n.isUndefined(r)) {
						var i = y._validateNetwork(t, r);
						if (i) return i;
					}
					var s = t.readUInt32BE(0);
					return s === c.livenet.xprivkey || s === c.testnet.xprivkey
						? new b.ArgumentIsPrivateExtended()
						: null;
				}),
				(y._validateNetwork = function (t, e) {
					var r = c.get(e);
					if (!r) return new l.InvalidNetworkArgument(e);
					var n = t.slice(y.VersionStart, y.VersionEnd);
					return n.readUInt32BE(0) !== r.xpubkey
						? new l.InvalidNetwork(n)
						: null;
				}),
				(y.prototype._buildFromPrivate = function (t) {
					var e = n.clone(t._buffers),
						r = h.getG().mul(s.fromBuffer(e.privateKey));
					return (
						(e.publicKey = h.pointToCompressed(r)),
						(e.version = g.integerAsBuffer(
							c.get(e.version.readUInt32BE(0)).xpubkey
						)),
						(e.privateKey = void 0),
						(e.checksum = void 0),
						(e.xprivkey = void 0),
						this._buildFromBuffers(e)
					);
				}),
				(y.prototype._buildFromObject = function (t) {
					var r = {
						version: t.network
							? g.integerAsBuffer(c.get(t.network).xpubkey)
							: t.version,
						depth: n.isNumber(t.depth) ? e.from([255 & t.depth]) : t.depth,
						parentFingerPrint: n.isNumber(t.parentFingerPrint)
							? g.integerAsBuffer(t.parentFingerPrint)
							: t.parentFingerPrint,
						childIndex: n.isNumber(t.childIndex)
							? g.integerAsBuffer(t.childIndex)
							: t.childIndex,
						chainCode: n.isString(t.chainCode)
							? e.from(t.chainCode, "hex")
							: t.chainCode,
						publicKey: n.isString(t.publicKey)
							? e.from(t.publicKey, "hex")
							: e.isBuffer(t.publicKey)
							? t.publicKey
							: t.publicKey.toBuffer(),
						checksum: n.isNumber(t.checksum)
							? g.integerAsBuffer(t.checksum)
							: t.checksum,
					};
					return this._buildFromBuffers(r);
				}),
				(y.prototype._buildFromSerialized = function (t) {
					var e = f.decode(t),
						r = {
							version: e.slice(y.VersionStart, y.VersionEnd),
							depth: e.slice(y.DepthStart, y.DepthEnd),
							parentFingerPrint: e.slice(
								y.ParentFingerPrintStart,
								y.ParentFingerPrintEnd
							),
							childIndex: e.slice(y.ChildIndexStart, y.ChildIndexEnd),
							chainCode: e.slice(y.ChainCodeStart, y.ChainCodeEnd),
							publicKey: e.slice(y.PublicKeyStart, y.PublicKeyEnd),
							checksum: e.slice(y.ChecksumStart, y.ChecksumEnd),
							xpubkey: t,
						};
					return this._buildFromBuffers(r);
				}),
				(y.prototype._buildFromBuffers = function (t) {
					y._validateBufferArguments(t),
						g.defineImmutable(this, { _buffers: t });
					var r = [
							t.version,
							t.depth,
							t.parentFingerPrint,
							t.childIndex,
							t.chainCode,
							t.publicKey,
						],
						n = e.concat(r),
						i = f.checksum(n);
					if (t.checksum && t.checksum.length) {
						if (t.checksum.toString("hex") !== i.toString("hex"))
							throw new l.InvalidB58Checksum(n, i);
					} else t.checksum = i;
					var s,
						o = c.get(t.version.readUInt32BE(0));
					(s = f.encode(e.concat(r))), (t.xpubkey = e.from(s));
					var u = new d(t.publicKey, { network: o }),
						h = y.ParentFingerPrintSize,
						p = a.sha256ripemd160(u.toBuffer()).slice(0, h);
					return (
						g.defineImmutable(this, {
							xpubkey: s,
							network: o,
							depth: t.depth[0],
							publicKey: u,
							fingerPrint: p,
						}),
						this
					);
				}),
				(y._validateBufferArguments = function (t) {
					var r = function (r, n) {
						var i = t[r];
						m(e.isBuffer(i), r + " argument is not a buffer, it's " + typeof i),
							m(
								i.length === n,
								r +
									" has not the expected size: found " +
									i.length +
									", expected " +
									n
							);
					};
					r("version", y.VersionSize),
						r("depth", y.DepthSize),
						r("parentFingerPrint", y.ParentFingerPrintSize),
						r("childIndex", y.ChildIndexSize),
						r("chainCode", y.ChainCodeSize),
						r("publicKey", y.PublicKeySize),
						t.checksum && t.checksum.length && r("checksum", y.CheckSumSize);
				}),
				(y.fromString = function (t) {
					return (
						i.checkArgument(n.isString(t), "No valid string was provided"),
						new y(t)
					);
				}),
				(y.fromObject = function (t) {
					return (
						i.checkArgument(n.isObject(t), "No valid argument was provided"),
						new y(t)
					);
				}),
				(y.prototype.toString = function () {
					return this.xpubkey;
				}),
				(y.prototype.inspect = function () {
					return "<HDPublicKey: " + this.xpubkey + ">";
				}),
				(y.prototype.toObject = y.prototype.toJSON =
					function () {
						return {
							network: c.get(this._buffers.version.readUInt32BE(0)).name,
							depth: this._buffers.depth[0],
							fingerPrint: this.fingerPrint.readUInt32BE(0),
							parentFingerPrint:
								this._buffers.parentFingerPrint.readUInt32BE(0),
							childIndex: this._buffers.childIndex.readUInt32BE(0),
							chainCode: this._buffers.chainCode.toString("hex"),
							publicKey: this.publicKey.toString(),
							checksum: this._buffers.checksum.readUInt32BE(0),
							xpubkey: this.xpubkey,
						};
					}),
				(y.fromBuffer = function (t) {
					return new y(t);
				}),
				(y.fromHex = function (t) {
					return y.fromBuffer(e.from(t, "hex"));
				}),
				(y.prototype.toBuffer = function () {
					return e.from(this._buffers.xpubkey);
				}),
				(y.prototype.toHex = function () {
					return this.toBuffer().toString("hex");
				}),
				(y.Hardened = 2147483648),
				(y.RootElementAlias = ["m", "M"]),
				(y.VersionSize = 4),
				(y.DepthSize = 1),
				(y.ParentFingerPrintSize = 4),
				(y.ChildIndexSize = 4),
				(y.ChainCodeSize = 32),
				(y.PublicKeySize = 33),
				(y.CheckSumSize = 4),
				(y.DataSize = 78),
				(y.SerializedByteSize = 82),
				(y.VersionStart = 0),
				(y.VersionEnd = y.VersionStart + y.VersionSize),
				(y.DepthStart = y.VersionEnd),
				(y.DepthEnd = y.DepthStart + y.DepthSize),
				(y.ParentFingerPrintStart = y.DepthEnd),
				(y.ParentFingerPrintEnd =
					y.ParentFingerPrintStart + y.ParentFingerPrintSize),
				(y.ChildIndexStart = y.ParentFingerPrintEnd),
				(y.ChildIndexEnd = y.ChildIndexStart + y.ChildIndexSize),
				(y.ChainCodeStart = y.ChildIndexEnd),
				(y.ChainCodeEnd = y.ChainCodeStart + y.ChainCodeSize),
				(y.PublicKeyStart = y.ChainCodeEnd),
				(y.PublicKeyEnd = y.PublicKeyStart + y.PublicKeySize),
				(y.ChecksumStart = y.PublicKeyEnd),
				(y.ChecksumEnd = y.ChecksumStart + y.CheckSumSize),
				m(y.PublicKeyEnd === y.DataSize),
				m(y.ChecksumEnd === y.SerializedByteSize),
				(t.exports = y);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e, n) {
			var i = t.exports;
			(i.version = "v" + r(58).version),
				(i.versionGuard = function (t) {
					if (void 0 !== t) {
						console.warn(
							"\n      More than one instance of bsv found.\n      Please make sure to require bsv and check that submodules do\n      not also include their own bsv dependency."
						);
					}
				}),
				i.versionGuard(e._bsv),
				(e._bsv = i.version),
				(i.crypto = {}),
				(i.crypto.BN = r(3)),
				(i.crypto.ECDSA = r(40)),
				(i.crypto.Hash = r(5)),
				(i.crypto.Random = r(32)),
				(i.crypto.Point = r(20)),
				(i.crypto.Signature = r(9)),
				(i.encoding = {}),
				(i.encoding.Base58 = r(30)),
				(i.encoding.Base58Check = r(23)),
				(i.encoding.BufferReader = r(15)),
				(i.encoding.BufferWriter = r(14)),
				(i.encoding.Varint = r(24)),
				(i.util = {}),
				(i.util.js = r(4)),
				(i.util.preconditions = r(2)),
				(i.errors = r(8)),
				(i.Address = r(21)),
				(i.Block = r(99)),
				(i.MerkleBlock = r(51)),
				(i.BlockHeader = r(33)),
				(i.HDPrivateKey = r(52)),
				(i.HDPublicKey = r(53)),
				(i.Networks = r(19)),
				(i.Opcode = r(38)),
				(i.PrivateKey = r(29)),
				(i.PublicKey = r(13)),
				(i.Script = r(10)),
				(i.Transaction = r(31)),
				(i.deps = {}),
				(i.deps.bnjs = r(7)),
				(i.deps.bs58 = r(45)),
				(i.deps.Buffer = n),
				(i.deps.elliptic = r(6)),
				(i.deps._ = r(1)),
				(i.Transaction.sighash = r(16));
		}.call(this, r(34), r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(e.byteLength = function (t) {
			var e = u(t),
				r = e[0],
				n = e[1];
			return (3 * (r + n)) / 4 - n;
		}),
			(e.toByteArray = function (t) {
				var e,
					r,
					n = u(t),
					o = n[0],
					f = n[1],
					a = new s(
						(function (t, e, r) {
							return (3 * (e + r)) / 4 - r;
						})(0, o, f)
					),
					c = 0,
					h = f > 0 ? o - 4 : o;
				for (r = 0; r < h; r += 4)
					(e =
						(i[t.charCodeAt(r)] << 18) |
						(i[t.charCodeAt(r + 1)] << 12) |
						(i[t.charCodeAt(r + 2)] << 6) |
						i[t.charCodeAt(r + 3)]),
						(a[c++] = (e >> 16) & 255),
						(a[c++] = (e >> 8) & 255),
						(a[c++] = 255 & e);
				2 === f &&
					((e = (i[t.charCodeAt(r)] << 2) | (i[t.charCodeAt(r + 1)] >> 4)),
					(a[c++] = 255 & e));
				1 === f &&
					((e =
						(i[t.charCodeAt(r)] << 10) |
						(i[t.charCodeAt(r + 1)] << 4) |
						(i[t.charCodeAt(r + 2)] >> 2)),
					(a[c++] = (e >> 8) & 255),
					(a[c++] = 255 & e));
				return a;
			}),
			(e.fromByteArray = function (t) {
				for (
					var e, r = t.length, i = r % 3, s = [], o = 0, f = r - i;
					o < f;
					o += 16383
				)
					s.push(c(t, o, o + 16383 > f ? f : o + 16383));
				1 === i
					? ((e = t[r - 1]), s.push(n[e >> 2] + n[(e << 4) & 63] + "=="))
					: 2 === i &&
					  ((e = (t[r - 2] << 8) + t[r - 1]),
					  s.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + "="));
				return s.join("");
			});
		for (
			var n = [],
				i = [],
				s = "undefined" != typeof Uint8Array ? Uint8Array : Array,
				o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				f = 0,
				a = o.length;
			f < a;
			++f
		)
			(n[f] = o[f]), (i[o.charCodeAt(f)] = f);
		function u(t) {
			var e = t.length;
			if (e % 4 > 0)
				throw new Error("Invalid string. Length must be a multiple of 4");
			var r = t.indexOf("=");
			return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
		}
		function c(t, e, r) {
			for (var i, s, o = [], f = e; f < r; f += 3)
				(i =
					((t[f] << 16) & 16711680) +
					((t[f + 1] << 8) & 65280) +
					(255 & t[f + 2])),
					o.push(
						n[((s = i) >> 18) & 63] +
							n[(s >> 12) & 63] +
							n[(s >> 6) & 63] +
							n[63 & s]
					);
			return o.join("");
		}
		(i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
	},
	function (t, e) {
		(e.read = function (t, e, r, n, i) {
			var s,
				o,
				f = 8 * i - n - 1,
				a = (1 << f) - 1,
				u = a >> 1,
				c = -7,
				h = r ? i - 1 : 0,
				d = r ? -1 : 1,
				p = t[e + h];
			for (
				h += d, s = p & ((1 << -c) - 1), p >>= -c, c += f;
				c > 0;
				s = 256 * s + t[e + h], h += d, c -= 8
			);
			for (
				o = s & ((1 << -c) - 1), s >>= -c, c += n;
				c > 0;
				o = 256 * o + t[e + h], h += d, c -= 8
			);
			if (0 === s) s = 1 - u;
			else {
				if (s === a) return o ? NaN : (1 / 0) * (p ? -1 : 1);
				(o += Math.pow(2, n)), (s -= u);
			}
			return (p ? -1 : 1) * o * Math.pow(2, s - n);
		}),
			(e.write = function (t, e, r, n, i, s) {
				var o,
					f,
					a,
					u = 8 * s - i - 1,
					c = (1 << u) - 1,
					h = c >> 1,
					d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
					p = n ? 0 : s - 1,
					l = n ? 1 : -1,
					b = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
				for (
					e = Math.abs(e),
						isNaN(e) || e === 1 / 0
							? ((f = isNaN(e) ? 1 : 0), (o = c))
							: ((o = Math.floor(Math.log(e) / Math.LN2)),
							  e * (a = Math.pow(2, -o)) < 1 && (o--, (a *= 2)),
							  (e += o + h >= 1 ? d / a : d * Math.pow(2, 1 - h)) * a >= 2 &&
									(o++, (a /= 2)),
							  o + h >= c
									? ((f = 0), (o = c))
									: o + h >= 1
									? ((f = (e * a - 1) * Math.pow(2, i)), (o += h))
									: ((f = e * Math.pow(2, h - 1) * Math.pow(2, i)), (o = 0)));
					i >= 8;
					t[r + p] = 255 & f, p += l, f /= 256, i -= 8
				);
				for (
					o = (o << i) | f, u += i;
					u > 0;
					t[r + p] = 255 & o, p += l, o /= 256, u -= 8
				);
				t[r + p - l] |= 128 * b;
			});
	},
	function (t, e) {
		var r = {}.toString;
		t.exports =
			Array.isArray ||
			function (t) {
				return "[object Array]" == r.call(t);
			};
	},
	function (t) {
		t.exports = {
			name: "bsv",
			version: "1.5.0",
			description: "A pure and powerful JavaScript Bitcoin SV (BSV) library.",
			author: "Ryan X. Charles <ryan@moneybutton.com>",
			main: "index.js",
			scripts: {
				lint: "standard",
				test: "standard && mocha",
				coverage: "nyc --reporter=text npm run test",
				"build-bsv": "webpack index.js --config webpack.config.js",
				"build-ecies":
					"webpack ecies/index.js --config webpack.subproject.config.js --output-library bsvEcies -o bsv-ecies.min.js",
				"build-message":
					"webpack message/index.js --config webpack.subproject.config.js --output-library bsvMessage -o bsv-message.min.js",
				"build-mnemonic":
					"webpack mnemonic/index.js --config webpack.subproject.config.js --output-library bsvMnemonic -o bsv-mnemonic.min.js",
				build:
					"yarn build-bsv && yarn build-ecies && yarn build-message && yarn build-mnemonic",
				prepublishOnly: "yarn build",
			},
			unpkg: "bsv.min.js",
			keywords: [
				"bitcoin",
				"transaction",
				"address",
				"p2p",
				"ecies",
				"cryptocurrency",
				"blockchain",
				"payment",
				"bip21",
				"bip32",
				"bip37",
				"bip69",
				"bip70",
				"multisig",
			],
			repository: { type: "git", url: "https://github.com/moneybutton/bsv" },
			browser: { request: "browser-request" },
			dependencies: {
				"aes-js": "^3.1.2",
				"bn.js": "=4.11.8",
				bs58: "=4.0.1",
				"clone-deep": "^4.0.1",
				elliptic: "6.4.1",
				"hash.js": "^1.1.7",
				inherits: "2.0.3",
				unorm: "1.4.1",
			},
			devDependencies: {
				brfs: "2.0.1",
				chai: "4.2.0",
				mocha: "^5.2.0",
				nyc: "^14.1.1",
				sinon: "7.2.3",
				standard: "12.0.1",
				webpack: "4.29.3",
				"webpack-cli": "3.2.3",
			},
			license: "MIT",
			standard: { globals: ["afterEach", "beforeEach", "describe", "it"] },
		};
	},
	function (t, e) {
		t.exports = function (t) {
			return (
				t.webpackPolyfill ||
					((t.deprecate = function () {}),
					(t.paths = []),
					t.children || (t.children = []),
					Object.defineProperty(t, "loaded", {
						enumerable: !0,
						get: function () {
							return t.l;
						},
					}),
					Object.defineProperty(t, "id", {
						enumerable: !0,
						get: function () {
							return t.i;
						},
					}),
					(t.webpackPolyfill = 1)),
				t
			);
		};
	},
	function (t, e) {},
	function (t, e, r) {
		"use strict";
		var n = "https://docs.moneybutton.com/";
		t.exports = [
			{
				name: "InvalidB58Char",
				message: "Invalid Base58 character: {0} in {1}",
			},
			{
				name: "InvalidB58Checksum",
				message: "Invalid Base58 checksum for {0}",
			},
			{
				name: "InvalidNetwork",
				message: "Invalid version for network: got {0}",
			},
			{ name: "InvalidState", message: "Invalid state: {0}" },
			{
				name: "NotImplemented",
				message: "Function {0} was not implemented yet",
			},
			{
				name: "InvalidNetworkArgument",
				message: 'Invalid network: must be "livenet" or "testnet", got {0}',
			},
			{
				name: "InvalidArgument",
				message: function () {
					return (
						"Invalid Argument" +
						(arguments[0] ? ": " + arguments[0] : "") +
						(arguments[1] ? " Documentation: " + n + arguments[1] : "")
					);
				},
			},
			{
				name: "AbstractMethodInvoked",
				message: "Abstract Method Invocation: {0}",
			},
			{
				name: "InvalidArgumentType",
				message: function () {
					return (
						"Invalid Argument for " +
						arguments[2] +
						", expected " +
						arguments[1] +
						" but got " +
						typeof arguments[0]
					);
				},
			},
			{
				name: "Unit",
				message: "Internal Error on Unit {0}",
				errors: [
					{ name: "UnknownCode", message: "Unrecognized unit code: {0}" },
					{ name: "InvalidRate", message: "Invalid exchange rate: {0}" },
				],
			},
			{
				name: "MerkleBlock",
				message: "Internal Error on MerkleBlock {0}",
				errors: [
					{
						name: "InvalidMerkleTree",
						message: "This MerkleBlock contain an invalid Merkle Tree",
					},
				],
			},
			{
				name: "Transaction",
				message: "Internal Error on Transaction {0}",
				errors: [
					{
						name: "Input",
						message: "Internal Error on Input {0}",
						errors: [
							{
								name: "MissingScript",
								message: "Need a script to create an input",
							},
							{
								name: "UnsupportedScript",
								message: "Unsupported input script type: {0}",
							},
							{
								name: "MissingPreviousOutput",
								message: "No previous output information.",
							},
						],
					},
					{ name: "NeedMoreInfo", message: "{0}" },
					{
						name: "InvalidSorting",
						message:
							"The sorting function provided did not return the change output as one of the array elements",
					},
					{ name: "InvalidOutputAmountSum", message: "{0}" },
					{
						name: "MissingSignatures",
						message: "Some inputs have not been fully signed",
					},
					{
						name: "InvalidIndex",
						message: "Invalid index: {0} is not between 0, {1}",
					},
					{
						name: "UnableToVerifySignature",
						message: "Unable to verify signature: {0}",
					},
					{
						name: "DustOutputs",
						message: "Dust amount detected in one output",
					},
					{ name: "InvalidSatoshis", message: "Output satoshis are invalid" },
					{
						name: "FeeError",
						message: "Internal Error on Fee {0}",
						errors: [
							{ name: "TooSmall", message: "Fee is too small: {0}" },
							{ name: "TooLarge", message: "Fee is too large: {0}" },
							{
								name: "Different",
								message: "Unspent value is different from specified fee: {0}",
							},
						],
					},
					{
						name: "ChangeAddressMissing",
						message: "Change address is missing",
					},
					{
						name: "BlockHeightTooHigh",
						message: "Block Height can be at most 2^32 -1",
					},
					{
						name: "NLockTimeOutOfRange",
						message: "Block Height can only be between 0 and 499 999 999",
					},
					{
						name: "LockTimeTooEarly",
						message: "Lock Time can't be earlier than UNIX date 500 000 000",
					},
				],
			},
			{
				name: "Script",
				message: "Internal Error on Script {0}",
				errors: [
					{
						name: "UnrecognizedAddress",
						message: "Expected argument {0} to be an address",
					},
					{
						name: "CantDeriveAddress",
						message:
							"Can't derive address associated with script {0}, needs to be p2pkh in, p2pkh out, p2sh in, or p2sh out.",
					},
					{
						name: "InvalidBuffer",
						message:
							"Invalid script buffer: can't parse valid script from given buffer {0}",
					},
				],
			},
			{
				name: "HDPrivateKey",
				message: "Internal Error on HDPrivateKey {0}",
				errors: [
					{
						name: "InvalidDerivationArgument",
						message:
							"Invalid derivation argument {0}, expected string, or number and boolean",
					},
					{
						name: "InvalidEntropyArgument",
						message:
							"Invalid entropy: must be an hexa string or binary buffer, got {0}",
						errors: [
							{
								name: "TooMuchEntropy",
								message:
									'Invalid entropy: more than 512 bits is non standard, got "{0}"',
							},
							{
								name: "NotEnoughEntropy",
								message: 'Invalid entropy: at least 128 bits needed, got "{0}"',
							},
						],
					},
					{
						name: "InvalidLength",
						message: "Invalid length for xprivkey string in {0}",
					},
					{ name: "InvalidPath", message: "Invalid derivation path: {0}" },
					{
						name: "UnrecognizedArgument",
						message:
							'Invalid argument: creating a HDPrivateKey requires a string, buffer, json or object, got "{0}"',
					},
				],
			},
			{
				name: "HDPublicKey",
				message: "Internal Error on HDPublicKey {0}",
				errors: [
					{
						name: "ArgumentIsPrivateExtended",
						message: "Argument is an extended private key: {0}",
					},
					{
						name: "InvalidDerivationArgument",
						message: "Invalid derivation argument: got {0}",
					},
					{
						name: "InvalidLength",
						message: 'Invalid length for xpubkey: got "{0}"',
					},
					{
						name: "InvalidPath",
						message:
							'Invalid derivation path, it should look like: "m/1/100", got "{0}"',
					},
					{
						name: "InvalidIndexCantDeriveHardened",
						message:
							"Invalid argument: creating a hardened path requires an HDPrivateKey",
					},
					{
						name: "MustSupplyArgument",
						message: "Must supply an argument to create a HDPublicKey",
					},
					{
						name: "UnrecognizedArgument",
						message:
							"Invalid argument for creation, must be string, json, buffer, or object",
					},
				],
			},
		];
	},
	function (t) {
		t.exports = {
			name: "elliptic",
			version: "6.4.1",
			description: "EC cryptography",
			main: "lib/elliptic.js",
			files: ["lib"],
			scripts: {
				jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
				jshint:
					"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
				lint: "npm run jscs && npm run jshint",
				unit: "istanbul test _mocha --reporter=spec test/index.js",
				test: "npm run lint && npm run unit",
				version: "grunt dist && git add dist/",
			},
			repository: { type: "git", url: "git@github.com:indutny/elliptic" },
			keywords: ["EC", "Elliptic", "curve", "Cryptography"],
			author: "Fedor Indutny <fedor@indutny.com>",
			license: "MIT",
			bugs: { url: "https://github.com/indutny/elliptic/issues" },
			homepage: "https://github.com/indutny/elliptic",
			devDependencies: {
				brfs: "^1.4.3",
				coveralls: "^2.11.3",
				grunt: "^0.4.5",
				"grunt-browserify": "^5.0.0",
				"grunt-cli": "^1.2.0",
				"grunt-contrib-connect": "^1.0.0",
				"grunt-contrib-copy": "^1.0.0",
				"grunt-contrib-uglify": "^1.0.1",
				"grunt-mocha-istanbul": "^3.0.1",
				"grunt-saucelabs": "^8.6.2",
				istanbul: "^0.4.2",
				jscs: "^2.9.0",
				jshint: "^2.6.0",
				mocha: "^2.1.0",
			},
			dependencies: {
				"bn.js": "^4.4.0",
				brorand: "^1.0.1",
				"hash.js": "^1.0.0",
				"hmac-drbg": "^1.0.0",
				inherits: "^2.0.1",
				"minimalistic-assert": "^1.0.0",
				"minimalistic-crypto-utils": "^1.0.0",
			},
		};
	},
	function (t, e, r) {
		"use strict";
		var n = e,
			i = r(7),
			s = r(18),
			o = r(41);
		(n.assert = s),
			(n.toArray = o.toArray),
			(n.zero2 = o.zero2),
			(n.toHex = o.toHex),
			(n.encode = o.encode),
			(n.getNAF = function (t, e) {
				for (var r = [], n = 1 << (e + 1), i = t.clone(); i.cmpn(1) >= 0; ) {
					var s;
					if (i.isOdd()) {
						var o = i.andln(n - 1);
						(s = o > (n >> 1) - 1 ? (n >> 1) - o : o), i.isubn(s);
					} else s = 0;
					r.push(s);
					for (
						var f = 0 !== i.cmpn(0) && 0 === i.andln(n - 1) ? e + 1 : 1, a = 1;
						a < f;
						a++
					)
						r.push(0);
					i.iushrn(f);
				}
				return r;
			}),
			(n.getJSF = function (t, e) {
				var r = [[], []];
				(t = t.clone()), (e = e.clone());
				for (var n = 0, i = 0; t.cmpn(-n) > 0 || e.cmpn(-i) > 0; ) {
					var s,
						o,
						f,
						a = (t.andln(3) + n) & 3,
						u = (e.andln(3) + i) & 3;
					if ((3 === a && (a = -1), 3 === u && (u = -1), 0 == (1 & a))) s = 0;
					else
						s =
							(3 !== (f = (t.andln(7) + n) & 7) && 5 !== f) || 2 !== u ? a : -a;
					if ((r[0].push(s), 0 == (1 & u))) o = 0;
					else
						o =
							(3 !== (f = (e.andln(7) + i) & 7) && 5 !== f) || 2 !== a ? u : -u;
					r[1].push(o),
						2 * n === s + 1 && (n = 1 - n),
						2 * i === o + 1 && (i = 1 - i),
						t.iushrn(1),
						e.iushrn(1);
				}
				return r;
			}),
			(n.cachedProperty = function (t, e, r) {
				var n = "_" + e;
				t.prototype[e] = function () {
					return void 0 !== this[n] ? this[n] : (this[n] = r.call(this));
				};
			}),
			(n.parseBytes = function (t) {
				return "string" == typeof t ? n.toArray(t, "hex") : t;
			}),
			(n.intFromLE = function (t) {
				return new i(t, "hex", "le");
			});
	},
	function (t, e, r) {
		var n;
		function i(t) {
			this.rand = t;
		}
		if (
			((t.exports = function (t) {
				return n || (n = new i(null)), n.generate(t);
			}),
			(t.exports.Rand = i),
			(i.prototype.generate = function (t) {
				return this._rand(t);
			}),
			(i.prototype._rand = function (t) {
				if (this.rand.getBytes) return this.rand.getBytes(t);
				for (var e = new Uint8Array(t), r = 0; r < e.length; r++)
					e[r] = this.rand.getByte();
				return e;
			}),
			"object" == typeof self)
		)
			self.crypto && self.crypto.getRandomValues
				? (i.prototype._rand = function (t) {
						var e = new Uint8Array(t);
						return self.crypto.getRandomValues(e), e;
				  })
				: self.msCrypto && self.msCrypto.getRandomValues
				? (i.prototype._rand = function (t) {
						var e = new Uint8Array(t);
						return self.msCrypto.getRandomValues(e), e;
				  })
				: "object" == typeof window &&
				  (i.prototype._rand = function () {
						throw new Error("Not implemented yet");
				  });
		else
			try {
				var s = r(35);
				if ("function" != typeof s.randomBytes)
					throw new Error("Not supported");
				i.prototype._rand = function (t) {
					return s.randomBytes(t);
				};
			} catch (t) {}
	},
	function (t, e, r) {
		"use strict";
		var n = r(7),
			i = r(6).utils,
			s = i.getNAF,
			o = i.getJSF,
			f = i.assert;
		function a(t, e) {
			(this.type = t),
				(this.p = new n(e.p, 16)),
				(this.red = e.prime ? n.red(e.prime) : n.mont(this.p)),
				(this.zero = new n(0).toRed(this.red)),
				(this.one = new n(1).toRed(this.red)),
				(this.two = new n(2).toRed(this.red)),
				(this.n = e.n && new n(e.n, 16)),
				(this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
				(this._wnafT1 = new Array(4)),
				(this._wnafT2 = new Array(4)),
				(this._wnafT3 = new Array(4)),
				(this._wnafT4 = new Array(4));
			var r = this.n && this.p.div(this.n);
			!r || r.cmpn(100) > 0
				? (this.redN = null)
				: ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
		}
		function u(t, e) {
			(this.curve = t), (this.type = e), (this.precomputed = null);
		}
		(t.exports = a),
			(a.prototype.point = function () {
				throw new Error("Not implemented");
			}),
			(a.prototype.validate = function () {
				throw new Error("Not implemented");
			}),
			(a.prototype._fixedNafMul = function (t, e) {
				f(t.precomputed);
				var r = t._getDoubles(),
					n = s(e, 1),
					i = (1 << (r.step + 1)) - (r.step % 2 == 0 ? 2 : 1);
				i /= 3;
				for (var o = [], a = 0; a < n.length; a += r.step) {
					var u = 0;
					for (e = a + r.step - 1; e >= a; e--) u = (u << 1) + n[e];
					o.push(u);
				}
				for (
					var c = this.jpoint(null, null, null),
						h = this.jpoint(null, null, null),
						d = i;
					d > 0;
					d--
				) {
					for (a = 0; a < o.length; a++) {
						(u = o[a]) === d
							? (h = h.mixedAdd(r.points[a]))
							: u === -d && (h = h.mixedAdd(r.points[a].neg()));
					}
					c = c.add(h);
				}
				return c.toP();
			}),
			(a.prototype._wnafMul = function (t, e) {
				var r = 4,
					n = t._getNAFPoints(r);
				r = n.wnd;
				for (
					var i = n.points,
						o = s(e, r),
						a = this.jpoint(null, null, null),
						u = o.length - 1;
					u >= 0;
					u--
				) {
					for (e = 0; u >= 0 && 0 === o[u]; u--) e++;
					if ((u >= 0 && e++, (a = a.dblp(e)), u < 0)) break;
					var c = o[u];
					f(0 !== c),
						(a =
							"affine" === t.type
								? c > 0
									? a.mixedAdd(i[(c - 1) >> 1])
									: a.mixedAdd(i[(-c - 1) >> 1].neg())
								: c > 0
								? a.add(i[(c - 1) >> 1])
								: a.add(i[(-c - 1) >> 1].neg()));
				}
				return "affine" === t.type ? a.toP() : a;
			}),
			(a.prototype._wnafMulAdd = function (t, e, r, n, i) {
				for (
					var f = this._wnafT1,
						a = this._wnafT2,
						u = this._wnafT3,
						c = 0,
						h = 0;
					h < n;
					h++
				) {
					var d = (E = e[h])._getNAFPoints(t);
					(f[h] = d.wnd), (a[h] = d.points);
				}
				for (h = n - 1; h >= 1; h -= 2) {
					var p = h - 1,
						l = h;
					if (1 === f[p] && 1 === f[l]) {
						var b = [e[p], null, null, e[l]];
						0 === e[p].y.cmp(e[l].y)
							? ((b[1] = e[p].add(e[l])),
							  (b[2] = e[p].toJ().mixedAdd(e[l].neg())))
							: 0 === e[p].y.cmp(e[l].y.redNeg())
							? ((b[1] = e[p].toJ().mixedAdd(e[l])),
							  (b[2] = e[p].add(e[l].neg())))
							: ((b[1] = e[p].toJ().mixedAdd(e[l])),
							  (b[2] = e[p].toJ().mixedAdd(e[l].neg())));
						var m = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
							g = o(r[p], r[l]);
						(c = Math.max(g[0].length, c)),
							(u[p] = new Array(c)),
							(u[l] = new Array(c));
						for (var y = 0; y < c; y++) {
							var v = 0 | g[0][y],
								_ = 0 | g[1][y];
							(u[p][y] = m[3 * (v + 1) + (_ + 1)]), (u[l][y] = 0), (a[p] = b);
						}
					} else
						(u[p] = s(r[p], f[p])),
							(u[l] = s(r[l], f[l])),
							(c = Math.max(u[p].length, c)),
							(c = Math.max(u[l].length, c));
				}
				var S = this.jpoint(null, null, null),
					w = this._wnafT4;
				for (h = c; h >= 0; h--) {
					for (var I = 0; h >= 0; ) {
						var A = !0;
						for (y = 0; y < n; y++)
							(w[y] = 0 | u[y][h]), 0 !== w[y] && (A = !1);
						if (!A) break;
						I++, h--;
					}
					if ((h >= 0 && I++, (S = S.dblp(I)), h < 0)) break;
					for (y = 0; y < n; y++) {
						var E,
							P = w[y];
						0 !== P &&
							(P > 0
								? (E = a[y][(P - 1) >> 1])
								: P < 0 && (E = a[y][(-P - 1) >> 1].neg()),
							(S = "affine" === E.type ? S.mixedAdd(E) : S.add(E)));
					}
				}
				for (h = 0; h < n; h++) a[h] = null;
				return i ? S : S.toP();
			}),
			(a.BasePoint = u),
			(u.prototype.eq = function () {
				throw new Error("Not implemented");
			}),
			(u.prototype.validate = function () {
				return this.curve.validate(this);
			}),
			(a.prototype.decodePoint = function (t, e) {
				t = i.toArray(t, e);
				var r = this.p.byteLength();
				if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r)
					return (
						6 === t[0]
							? f(t[t.length - 1] % 2 == 0)
							: 7 === t[0] && f(t[t.length - 1] % 2 == 1),
						this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r))
					);
				if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r)
					return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
				throw new Error("Unknown point format");
			}),
			(u.prototype.encodeCompressed = function (t) {
				return this.encode(t, !0);
			}),
			(u.prototype._encode = function (t) {
				var e = this.curve.p.byteLength(),
					r = this.getX().toArray("be", e);
				return t
					? [this.getY().isEven() ? 2 : 3].concat(r)
					: [4].concat(r, this.getY().toArray("be", e));
			}),
			(u.prototype.encode = function (t, e) {
				return i.encode(this._encode(e), t);
			}),
			(u.prototype.precompute = function (t) {
				if (this.precomputed) return this;
				var e = { doubles: null, naf: null, beta: null };
				return (
					(e.naf = this._getNAFPoints(8)),
					(e.doubles = this._getDoubles(4, t)),
					(e.beta = this._getBeta()),
					(this.precomputed = e),
					this
				);
			}),
			(u.prototype._hasDoubles = function (t) {
				if (!this.precomputed) return !1;
				var e = this.precomputed.doubles;
				return (
					!!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
				);
			}),
			(u.prototype._getDoubles = function (t, e) {
				if (this.precomputed && this.precomputed.doubles)
					return this.precomputed.doubles;
				for (var r = [this], n = this, i = 0; i < e; i += t) {
					for (var s = 0; s < t; s++) n = n.dbl();
					r.push(n);
				}
				return { step: t, points: r };
			}),
			(u.prototype._getNAFPoints = function (t) {
				if (this.precomputed && this.precomputed.naf)
					return this.precomputed.naf;
				for (
					var e = [this],
						r = (1 << t) - 1,
						n = 1 === r ? null : this.dbl(),
						i = 1;
					i < r;
					i++
				)
					e[i] = e[i - 1].add(n);
				return { wnd: t, points: e };
			}),
			(u.prototype._getBeta = function () {
				return null;
			}),
			(u.prototype.dblp = function (t) {
				for (var e = this, r = 0; r < t; r++) e = e.dbl();
				return e;
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(27),
			i = r(6),
			s = r(7),
			o = r(11),
			f = n.base,
			a = i.utils.assert;
		function u(t) {
			f.call(this, "short", t),
				(this.a = new s(t.a, 16).toRed(this.red)),
				(this.b = new s(t.b, 16).toRed(this.red)),
				(this.tinv = this.two.redInvm()),
				(this.zeroA = 0 === this.a.fromRed().cmpn(0)),
				(this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
				(this.endo = this._getEndomorphism(t)),
				(this._endoWnafT1 = new Array(4)),
				(this._endoWnafT2 = new Array(4));
		}
		function c(t, e, r, n) {
			f.BasePoint.call(this, t, "affine"),
				null === e && null === r
					? ((this.x = null), (this.y = null), (this.inf = !0))
					: ((this.x = new s(e, 16)),
					  (this.y = new s(r, 16)),
					  n &&
							(this.x.forceRed(this.curve.red),
							this.y.forceRed(this.curve.red)),
					  this.x.red || (this.x = this.x.toRed(this.curve.red)),
					  this.y.red || (this.y = this.y.toRed(this.curve.red)),
					  (this.inf = !1));
		}
		function h(t, e, r, n) {
			f.BasePoint.call(this, t, "jacobian"),
				null === e && null === r && null === n
					? ((this.x = this.curve.one),
					  (this.y = this.curve.one),
					  (this.z = new s(0)))
					: ((this.x = new s(e, 16)),
					  (this.y = new s(r, 16)),
					  (this.z = new s(n, 16))),
				this.x.red || (this.x = this.x.toRed(this.curve.red)),
				this.y.red || (this.y = this.y.toRed(this.curve.red)),
				this.z.red || (this.z = this.z.toRed(this.curve.red)),
				(this.zOne = this.z === this.curve.one);
		}
		o(u, f),
			(t.exports = u),
			(u.prototype._getEndomorphism = function (t) {
				if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
					var e, r;
					if (t.beta) e = new s(t.beta, 16).toRed(this.red);
					else {
						var n = this._getEndoRoots(this.p);
						e = (e = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
					}
					if (t.lambda) r = new s(t.lambda, 16);
					else {
						var i = this._getEndoRoots(this.n);
						0 === this.g.mul(i[0]).x.cmp(this.g.x.redMul(e))
							? (r = i[0])
							: ((r = i[1]), a(0 === this.g.mul(r).x.cmp(this.g.x.redMul(e))));
					}
					return {
						beta: e,
						lambda: r,
						basis: t.basis
							? t.basis.map(function (t) {
									return { a: new s(t.a, 16), b: new s(t.b, 16) };
							  })
							: this._getEndoBasis(r),
					};
				}
			}),
			(u.prototype._getEndoRoots = function (t) {
				var e = t === this.p ? this.red : s.mont(t),
					r = new s(2).toRed(e).redInvm(),
					n = r.redNeg(),
					i = new s(3).toRed(e).redNeg().redSqrt().redMul(r);
				return [n.redAdd(i).fromRed(), n.redSub(i).fromRed()];
			}),
			(u.prototype._getEndoBasis = function (t) {
				for (
					var e,
						r,
						n,
						i,
						o,
						f,
						a,
						u,
						c,
						h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
						d = t,
						p = this.n.clone(),
						l = new s(1),
						b = new s(0),
						m = new s(0),
						g = new s(1),
						y = 0;
					0 !== d.cmpn(0);

				) {
					var v = p.div(d);
					(u = p.sub(v.mul(d))), (c = m.sub(v.mul(l)));
					var _ = g.sub(v.mul(b));
					if (!n && u.cmp(h) < 0)
						(e = a.neg()), (r = l), (n = u.neg()), (i = c);
					else if (n && 2 == ++y) break;
					(a = u), (p = d), (d = u), (m = l), (l = c), (g = b), (b = _);
				}
				(o = u.neg()), (f = c);
				var S = n.sqr().add(i.sqr());
				return (
					o.sqr().add(f.sqr()).cmp(S) >= 0 && ((o = e), (f = r)),
					n.negative && ((n = n.neg()), (i = i.neg())),
					o.negative && ((o = o.neg()), (f = f.neg())),
					[
						{ a: n, b: i },
						{ a: o, b: f },
					]
				);
			}),
			(u.prototype._endoSplit = function (t) {
				var e = this.endo.basis,
					r = e[0],
					n = e[1],
					i = n.b.mul(t).divRound(this.n),
					s = r.b.neg().mul(t).divRound(this.n),
					o = i.mul(r.a),
					f = s.mul(n.a),
					a = i.mul(r.b),
					u = s.mul(n.b);
				return { k1: t.sub(o).sub(f), k2: a.add(u).neg() };
			}),
			(u.prototype.pointFromX = function (t, e) {
				(t = new s(t, 16)).red || (t = t.toRed(this.red));
				var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
					n = r.redSqrt();
				if (0 !== n.redSqr().redSub(r).cmp(this.zero))
					throw new Error("invalid point");
				var i = n.fromRed().isOdd();
				return ((e && !i) || (!e && i)) && (n = n.redNeg()), this.point(t, n);
			}),
			(u.prototype.validate = function (t) {
				if (t.inf) return !0;
				var e = t.x,
					r = t.y,
					n = this.a.redMul(e),
					i = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
				return 0 === r.redSqr().redISub(i).cmpn(0);
			}),
			(u.prototype._endoWnafMulAdd = function (t, e, r) {
				for (
					var n = this._endoWnafT1, i = this._endoWnafT2, s = 0;
					s < t.length;
					s++
				) {
					var o = this._endoSplit(e[s]),
						f = t[s],
						a = f._getBeta();
					o.k1.negative && (o.k1.ineg(), (f = f.neg(!0))),
						o.k2.negative && (o.k2.ineg(), (a = a.neg(!0))),
						(n[2 * s] = f),
						(n[2 * s + 1] = a),
						(i[2 * s] = o.k1),
						(i[2 * s + 1] = o.k2);
				}
				for (var u = this._wnafMulAdd(1, n, i, 2 * s, r), c = 0; c < 2 * s; c++)
					(n[c] = null), (i[c] = null);
				return u;
			}),
			o(c, f.BasePoint),
			(u.prototype.point = function (t, e, r) {
				return new c(this, t, e, r);
			}),
			(u.prototype.pointFromJSON = function (t, e) {
				return c.fromJSON(this, t, e);
			}),
			(c.prototype._getBeta = function () {
				if (this.curve.endo) {
					var t = this.precomputed;
					if (t && t.beta) return t.beta;
					var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
					if (t) {
						var r = this.curve,
							n = function (t) {
								return r.point(t.x.redMul(r.endo.beta), t.y);
							};
						(t.beta = e),
							(e.precomputed = {
								beta: null,
								naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(n) },
								doubles: t.doubles && {
									step: t.doubles.step,
									points: t.doubles.points.map(n),
								},
							});
					}
					return e;
				}
			}),
			(c.prototype.toJSON = function () {
				return this.precomputed
					? [
							this.x,
							this.y,
							this.precomputed && {
								doubles: this.precomputed.doubles && {
									step: this.precomputed.doubles.step,
									points: this.precomputed.doubles.points.slice(1),
								},
								naf: this.precomputed.naf && {
									wnd: this.precomputed.naf.wnd,
									points: this.precomputed.naf.points.slice(1),
								},
							},
					  ]
					: [this.x, this.y];
			}),
			(c.fromJSON = function (t, e, r) {
				"string" == typeof e && (e = JSON.parse(e));
				var n = t.point(e[0], e[1], r);
				if (!e[2]) return n;
				function i(e) {
					return t.point(e[0], e[1], r);
				}
				var s = e[2];
				return (
					(n.precomputed = {
						beta: null,
						doubles: s.doubles && {
							step: s.doubles.step,
							points: [n].concat(s.doubles.points.map(i)),
						},
						naf: s.naf && {
							wnd: s.naf.wnd,
							points: [n].concat(s.naf.points.map(i)),
						},
					}),
					n
				);
			}),
			(c.prototype.inspect = function () {
				return this.isInfinity()
					? "<EC Point Infinity>"
					: "<EC Point x: " +
							this.x.fromRed().toString(16, 2) +
							" y: " +
							this.y.fromRed().toString(16, 2) +
							">";
			}),
			(c.prototype.isInfinity = function () {
				return this.inf;
			}),
			(c.prototype.add = function (t) {
				if (this.inf) return t;
				if (t.inf) return this;
				if (this.eq(t)) return this.dbl();
				if (this.neg().eq(t)) return this.curve.point(null, null);
				if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
				var e = this.y.redSub(t.y);
				0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
				var r = e.redSqr().redISub(this.x).redISub(t.x),
					n = e.redMul(this.x.redSub(r)).redISub(this.y);
				return this.curve.point(r, n);
			}),
			(c.prototype.dbl = function () {
				if (this.inf) return this;
				var t = this.y.redAdd(this.y);
				if (0 === t.cmpn(0)) return this.curve.point(null, null);
				var e = this.curve.a,
					r = this.x.redSqr(),
					n = t.redInvm(),
					i = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(n),
					s = i.redSqr().redISub(this.x.redAdd(this.x)),
					o = i.redMul(this.x.redSub(s)).redISub(this.y);
				return this.curve.point(s, o);
			}),
			(c.prototype.getX = function () {
				return this.x.fromRed();
			}),
			(c.prototype.getY = function () {
				return this.y.fromRed();
			}),
			(c.prototype.mul = function (t) {
				return (
					(t = new s(t, 16)),
					this._hasDoubles(t)
						? this.curve._fixedNafMul(this, t)
						: this.curve.endo
						? this.curve._endoWnafMulAdd([this], [t])
						: this.curve._wnafMul(this, t)
				);
			}),
			(c.prototype.mulAdd = function (t, e, r) {
				var n = [this, e],
					i = [t, r];
				return this.curve.endo
					? this.curve._endoWnafMulAdd(n, i)
					: this.curve._wnafMulAdd(1, n, i, 2);
			}),
			(c.prototype.jmulAdd = function (t, e, r) {
				var n = [this, e],
					i = [t, r];
				return this.curve.endo
					? this.curve._endoWnafMulAdd(n, i, !0)
					: this.curve._wnafMulAdd(1, n, i, 2, !0);
			}),
			(c.prototype.eq = function (t) {
				return (
					this === t ||
					(this.inf === t.inf &&
						(this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))))
				);
			}),
			(c.prototype.neg = function (t) {
				if (this.inf) return this;
				var e = this.curve.point(this.x, this.y.redNeg());
				if (t && this.precomputed) {
					var r = this.precomputed,
						n = function (t) {
							return t.neg();
						};
					e.precomputed = {
						naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(n) },
						doubles: r.doubles && {
							step: r.doubles.step,
							points: r.doubles.points.map(n),
						},
					};
				}
				return e;
			}),
			(c.prototype.toJ = function () {
				return this.inf
					? this.curve.jpoint(null, null, null)
					: this.curve.jpoint(this.x, this.y, this.curve.one);
			}),
			o(h, f.BasePoint),
			(u.prototype.jpoint = function (t, e, r) {
				return new h(this, t, e, r);
			}),
			(h.prototype.toP = function () {
				if (this.isInfinity()) return this.curve.point(null, null);
				var t = this.z.redInvm(),
					e = t.redSqr(),
					r = this.x.redMul(e),
					n = this.y.redMul(e).redMul(t);
				return this.curve.point(r, n);
			}),
			(h.prototype.neg = function () {
				return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
			}),
			(h.prototype.add = function (t) {
				if (this.isInfinity()) return t;
				if (t.isInfinity()) return this;
				var e = t.z.redSqr(),
					r = this.z.redSqr(),
					n = this.x.redMul(e),
					i = t.x.redMul(r),
					s = this.y.redMul(e.redMul(t.z)),
					o = t.y.redMul(r.redMul(this.z)),
					f = n.redSub(i),
					a = s.redSub(o);
				if (0 === f.cmpn(0))
					return 0 !== a.cmpn(0)
						? this.curve.jpoint(null, null, null)
						: this.dbl();
				var u = f.redSqr(),
					c = u.redMul(f),
					h = n.redMul(u),
					d = a.redSqr().redIAdd(c).redISub(h).redISub(h),
					p = a.redMul(h.redISub(d)).redISub(s.redMul(c)),
					l = this.z.redMul(t.z).redMul(f);
				return this.curve.jpoint(d, p, l);
			}),
			(h.prototype.mixedAdd = function (t) {
				if (this.isInfinity()) return t.toJ();
				if (t.isInfinity()) return this;
				var e = this.z.redSqr(),
					r = this.x,
					n = t.x.redMul(e),
					i = this.y,
					s = t.y.redMul(e).redMul(this.z),
					o = r.redSub(n),
					f = i.redSub(s);
				if (0 === o.cmpn(0))
					return 0 !== f.cmpn(0)
						? this.curve.jpoint(null, null, null)
						: this.dbl();
				var a = o.redSqr(),
					u = a.redMul(o),
					c = r.redMul(a),
					h = f.redSqr().redIAdd(u).redISub(c).redISub(c),
					d = f.redMul(c.redISub(h)).redISub(i.redMul(u)),
					p = this.z.redMul(o);
				return this.curve.jpoint(h, d, p);
			}),
			(h.prototype.dblp = function (t) {
				if (0 === t) return this;
				if (this.isInfinity()) return this;
				if (!t) return this.dbl();
				if (this.curve.zeroA || this.curve.threeA) {
					for (var e = this, r = 0; r < t; r++) e = e.dbl();
					return e;
				}
				var n = this.curve.a,
					i = this.curve.tinv,
					s = this.x,
					o = this.y,
					f = this.z,
					a = f.redSqr().redSqr(),
					u = o.redAdd(o);
				for (r = 0; r < t; r++) {
					var c = s.redSqr(),
						h = u.redSqr(),
						d = h.redSqr(),
						p = c.redAdd(c).redIAdd(c).redIAdd(n.redMul(a)),
						l = s.redMul(h),
						b = p.redSqr().redISub(l.redAdd(l)),
						m = l.redISub(b),
						g = p.redMul(m);
					g = g.redIAdd(g).redISub(d);
					var y = u.redMul(f);
					r + 1 < t && (a = a.redMul(d)), (s = b), (f = y), (u = g);
				}
				return this.curve.jpoint(s, u.redMul(i), f);
			}),
			(h.prototype.dbl = function () {
				return this.isInfinity()
					? this
					: this.curve.zeroA
					? this._zeroDbl()
					: this.curve.threeA
					? this._threeDbl()
					: this._dbl();
			}),
			(h.prototype._zeroDbl = function () {
				var t, e, r;
				if (this.zOne) {
					var n = this.x.redSqr(),
						i = this.y.redSqr(),
						s = i.redSqr(),
						o = this.x.redAdd(i).redSqr().redISub(n).redISub(s);
					o = o.redIAdd(o);
					var f = n.redAdd(n).redIAdd(n),
						a = f.redSqr().redISub(o).redISub(o),
						u = s.redIAdd(s);
					(u = (u = u.redIAdd(u)).redIAdd(u)),
						(t = a),
						(e = f.redMul(o.redISub(a)).redISub(u)),
						(r = this.y.redAdd(this.y));
				} else {
					var c = this.x.redSqr(),
						h = this.y.redSqr(),
						d = h.redSqr(),
						p = this.x.redAdd(h).redSqr().redISub(c).redISub(d);
					p = p.redIAdd(p);
					var l = c.redAdd(c).redIAdd(c),
						b = l.redSqr(),
						m = d.redIAdd(d);
					(m = (m = m.redIAdd(m)).redIAdd(m)),
						(t = b.redISub(p).redISub(p)),
						(e = l.redMul(p.redISub(t)).redISub(m)),
						(r = (r = this.y.redMul(this.z)).redIAdd(r));
				}
				return this.curve.jpoint(t, e, r);
			}),
			(h.prototype._threeDbl = function () {
				var t, e, r;
				if (this.zOne) {
					var n = this.x.redSqr(),
						i = this.y.redSqr(),
						s = i.redSqr(),
						o = this.x.redAdd(i).redSqr().redISub(n).redISub(s);
					o = o.redIAdd(o);
					var f = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),
						a = f.redSqr().redISub(o).redISub(o);
					t = a;
					var u = s.redIAdd(s);
					(u = (u = u.redIAdd(u)).redIAdd(u)),
						(e = f.redMul(o.redISub(a)).redISub(u)),
						(r = this.y.redAdd(this.y));
				} else {
					var c = this.z.redSqr(),
						h = this.y.redSqr(),
						d = this.x.redMul(h),
						p = this.x.redSub(c).redMul(this.x.redAdd(c));
					p = p.redAdd(p).redIAdd(p);
					var l = d.redIAdd(d),
						b = (l = l.redIAdd(l)).redAdd(l);
					(t = p.redSqr().redISub(b)),
						(r = this.y.redAdd(this.z).redSqr().redISub(h).redISub(c));
					var m = h.redSqr();
					(m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m)),
						(e = p.redMul(l.redISub(t)).redISub(m));
				}
				return this.curve.jpoint(t, e, r);
			}),
			(h.prototype._dbl = function () {
				var t = this.curve.a,
					e = this.x,
					r = this.y,
					n = this.z,
					i = n.redSqr().redSqr(),
					s = e.redSqr(),
					o = r.redSqr(),
					f = s.redAdd(s).redIAdd(s).redIAdd(t.redMul(i)),
					a = e.redAdd(e),
					u = (a = a.redIAdd(a)).redMul(o),
					c = f.redSqr().redISub(u.redAdd(u)),
					h = u.redISub(c),
					d = o.redSqr();
				d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
				var p = f.redMul(h).redISub(d),
					l = r.redAdd(r).redMul(n);
				return this.curve.jpoint(c, p, l);
			}),
			(h.prototype.trpl = function () {
				if (!this.curve.zeroA) return this.dbl().add(this);
				var t = this.x.redSqr(),
					e = this.y.redSqr(),
					r = this.z.redSqr(),
					n = e.redSqr(),
					i = t.redAdd(t).redIAdd(t),
					s = i.redSqr(),
					o = this.x.redAdd(e).redSqr().redISub(t).redISub(n),
					f = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(
						s
					)).redSqr(),
					a = n.redIAdd(n);
				a = (a = (a = a.redIAdd(a)).redIAdd(a)).redIAdd(a);
				var u = i.redIAdd(o).redSqr().redISub(s).redISub(f).redISub(a),
					c = e.redMul(u);
				c = (c = c.redIAdd(c)).redIAdd(c);
				var h = this.x.redMul(f).redISub(c);
				h = (h = h.redIAdd(h)).redIAdd(h);
				var d = this.y.redMul(u.redMul(a.redISub(u)).redISub(o.redMul(f)));
				d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
				var p = this.z.redAdd(o).redSqr().redISub(r).redISub(f);
				return this.curve.jpoint(h, d, p);
			}),
			(h.prototype.mul = function (t, e) {
				return (t = new s(t, e)), this.curve._wnafMul(this, t);
			}),
			(h.prototype.eq = function (t) {
				if ("affine" === t.type) return this.eq(t.toJ());
				if (this === t) return !0;
				var e = this.z.redSqr(),
					r = t.z.redSqr();
				if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1;
				var n = e.redMul(this.z),
					i = r.redMul(t.z);
				return 0 === this.y.redMul(i).redISub(t.y.redMul(n)).cmpn(0);
			}),
			(h.prototype.eqXToP = function (t) {
				var e = this.z.redSqr(),
					r = t.toRed(this.curve.red).redMul(e);
				if (0 === this.x.cmp(r)) return !0;
				for (var n = t.clone(), i = this.curve.redN.redMul(e); ; ) {
					if ((n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)) return !1;
					if ((r.redIAdd(i), 0 === this.x.cmp(r))) return !0;
				}
			}),
			(h.prototype.inspect = function () {
				return this.isInfinity()
					? "<EC JPoint Infinity>"
					: "<EC JPoint x: " +
							this.x.toString(16, 2) +
							" y: " +
							this.y.toString(16, 2) +
							" z: " +
							this.z.toString(16, 2) +
							">";
			}),
			(h.prototype.isInfinity = function () {
				return 0 === this.z.cmpn(0);
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(27),
			i = r(7),
			s = r(11),
			o = n.base,
			f = r(6).utils;
		function a(t) {
			o.call(this, "mont", t),
				(this.a = new i(t.a, 16).toRed(this.red)),
				(this.b = new i(t.b, 16).toRed(this.red)),
				(this.i4 = new i(4).toRed(this.red).redInvm()),
				(this.two = new i(2).toRed(this.red)),
				(this.a24 = this.i4.redMul(this.a.redAdd(this.two)));
		}
		function u(t, e, r) {
			o.BasePoint.call(this, t, "projective"),
				null === e && null === r
					? ((this.x = this.curve.one), (this.z = this.curve.zero))
					: ((this.x = new i(e, 16)),
					  (this.z = new i(r, 16)),
					  this.x.red || (this.x = this.x.toRed(this.curve.red)),
					  this.z.red || (this.z = this.z.toRed(this.curve.red)));
		}
		s(a, o),
			(t.exports = a),
			(a.prototype.validate = function (t) {
				var e = t.normalize().x,
					r = e.redSqr(),
					n = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e);
				return 0 === n.redSqrt().redSqr().cmp(n);
			}),
			s(u, o.BasePoint),
			(a.prototype.decodePoint = function (t, e) {
				return this.point(f.toArray(t, e), 1);
			}),
			(a.prototype.point = function (t, e) {
				return new u(this, t, e);
			}),
			(a.prototype.pointFromJSON = function (t) {
				return u.fromJSON(this, t);
			}),
			(u.prototype.precompute = function () {}),
			(u.prototype._encode = function () {
				return this.getX().toArray("be", this.curve.p.byteLength());
			}),
			(u.fromJSON = function (t, e) {
				return new u(t, e[0], e[1] || t.one);
			}),
			(u.prototype.inspect = function () {
				return this.isInfinity()
					? "<EC Point Infinity>"
					: "<EC Point x: " +
							this.x.fromRed().toString(16, 2) +
							" z: " +
							this.z.fromRed().toString(16, 2) +
							">";
			}),
			(u.prototype.isInfinity = function () {
				return 0 === this.z.cmpn(0);
			}),
			(u.prototype.dbl = function () {
				var t = this.x.redAdd(this.z).redSqr(),
					e = this.x.redSub(this.z).redSqr(),
					r = t.redSub(e),
					n = t.redMul(e),
					i = r.redMul(e.redAdd(this.curve.a24.redMul(r)));
				return this.curve.point(n, i);
			}),
			(u.prototype.add = function () {
				throw new Error("Not supported on Montgomery curve");
			}),
			(u.prototype.diffAdd = function (t, e) {
				var r = this.x.redAdd(this.z),
					n = this.x.redSub(this.z),
					i = t.x.redAdd(t.z),
					s = t.x.redSub(t.z).redMul(r),
					o = i.redMul(n),
					f = e.z.redMul(s.redAdd(o).redSqr()),
					a = e.x.redMul(s.redISub(o).redSqr());
				return this.curve.point(f, a);
			}),
			(u.prototype.mul = function (t) {
				for (
					var e = t.clone(), r = this, n = this.curve.point(null, null), i = [];
					0 !== e.cmpn(0);
					e.iushrn(1)
				)
					i.push(e.andln(1));
				for (var s = i.length - 1; s >= 0; s--)
					0 === i[s]
						? ((r = r.diffAdd(n, this)), (n = n.dbl()))
						: ((n = r.diffAdd(n, this)), (r = r.dbl()));
				return n;
			}),
			(u.prototype.mulAdd = function () {
				throw new Error("Not supported on Montgomery curve");
			}),
			(u.prototype.jumlAdd = function () {
				throw new Error("Not supported on Montgomery curve");
			}),
			(u.prototype.eq = function (t) {
				return 0 === this.getX().cmp(t.getX());
			}),
			(u.prototype.normalize = function () {
				return (
					(this.x = this.x.redMul(this.z.redInvm())),
					(this.z = this.curve.one),
					this
				);
			}),
			(u.prototype.getX = function () {
				return this.normalize(), this.x.fromRed();
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(27),
			i = r(6),
			s = r(7),
			o = r(11),
			f = n.base,
			a = i.utils.assert;
		function u(t) {
			(this.twisted = 1 != (0 | t.a)),
				(this.mOneA = this.twisted && -1 == (0 | t.a)),
				(this.extended = this.mOneA),
				f.call(this, "edwards", t),
				(this.a = new s(t.a, 16).umod(this.red.m)),
				(this.a = this.a.toRed(this.red)),
				(this.c = new s(t.c, 16).toRed(this.red)),
				(this.c2 = this.c.redSqr()),
				(this.d = new s(t.d, 16).toRed(this.red)),
				(this.dd = this.d.redAdd(this.d)),
				a(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
				(this.oneC = 1 == (0 | t.c));
		}
		function c(t, e, r, n, i) {
			f.BasePoint.call(this, t, "projective"),
				null === e && null === r && null === n
					? ((this.x = this.curve.zero),
					  (this.y = this.curve.one),
					  (this.z = this.curve.one),
					  (this.t = this.curve.zero),
					  (this.zOne = !0))
					: ((this.x = new s(e, 16)),
					  (this.y = new s(r, 16)),
					  (this.z = n ? new s(n, 16) : this.curve.one),
					  (this.t = i && new s(i, 16)),
					  this.x.red || (this.x = this.x.toRed(this.curve.red)),
					  this.y.red || (this.y = this.y.toRed(this.curve.red)),
					  this.z.red || (this.z = this.z.toRed(this.curve.red)),
					  this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
					  (this.zOne = this.z === this.curve.one),
					  this.curve.extended &&
							!this.t &&
							((this.t = this.x.redMul(this.y)),
							this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
		}
		o(u, f),
			(t.exports = u),
			(u.prototype._mulA = function (t) {
				return this.mOneA ? t.redNeg() : this.a.redMul(t);
			}),
			(u.prototype._mulC = function (t) {
				return this.oneC ? t : this.c.redMul(t);
			}),
			(u.prototype.jpoint = function (t, e, r, n) {
				return this.point(t, e, r, n);
			}),
			(u.prototype.pointFromX = function (t, e) {
				(t = new s(t, 16)).red || (t = t.toRed(this.red));
				var r = t.redSqr(),
					n = this.c2.redSub(this.a.redMul(r)),
					i = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
					o = n.redMul(i.redInvm()),
					f = o.redSqrt();
				if (0 !== f.redSqr().redSub(o).cmp(this.zero))
					throw new Error("invalid point");
				var a = f.fromRed().isOdd();
				return ((e && !a) || (!e && a)) && (f = f.redNeg()), this.point(t, f);
			}),
			(u.prototype.pointFromY = function (t, e) {
				(t = new s(t, 16)).red || (t = t.toRed(this.red));
				var r = t.redSqr(),
					n = r.redSub(this.c2),
					i = r.redMul(this.d).redMul(this.c2).redSub(this.a),
					o = n.redMul(i.redInvm());
				if (0 === o.cmp(this.zero)) {
					if (e) throw new Error("invalid point");
					return this.point(this.zero, t);
				}
				var f = o.redSqrt();
				if (0 !== f.redSqr().redSub(o).cmp(this.zero))
					throw new Error("invalid point");
				return f.fromRed().isOdd() !== e && (f = f.redNeg()), this.point(f, t);
			}),
			(u.prototype.validate = function (t) {
				if (t.isInfinity()) return !0;
				t.normalize();
				var e = t.x.redSqr(),
					r = t.y.redSqr(),
					n = e.redMul(this.a).redAdd(r),
					i = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
				return 0 === n.cmp(i);
			}),
			o(c, f.BasePoint),
			(u.prototype.pointFromJSON = function (t) {
				return c.fromJSON(this, t);
			}),
			(u.prototype.point = function (t, e, r, n) {
				return new c(this, t, e, r, n);
			}),
			(c.fromJSON = function (t, e) {
				return new c(t, e[0], e[1], e[2]);
			}),
			(c.prototype.inspect = function () {
				return this.isInfinity()
					? "<EC Point Infinity>"
					: "<EC Point x: " +
							this.x.fromRed().toString(16, 2) +
							" y: " +
							this.y.fromRed().toString(16, 2) +
							" z: " +
							this.z.fromRed().toString(16, 2) +
							">";
			}),
			(c.prototype.isInfinity = function () {
				return (
					0 === this.x.cmpn(0) &&
					(0 === this.y.cmp(this.z) ||
						(this.zOne && 0 === this.y.cmp(this.curve.c)))
				);
			}),
			(c.prototype._extDbl = function () {
				var t = this.x.redSqr(),
					e = this.y.redSqr(),
					r = this.z.redSqr();
				r = r.redIAdd(r);
				var n = this.curve._mulA(t),
					i = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
					s = n.redAdd(e),
					o = s.redSub(r),
					f = n.redSub(e),
					a = i.redMul(o),
					u = s.redMul(f),
					c = i.redMul(f),
					h = o.redMul(s);
				return this.curve.point(a, u, h, c);
			}),
			(c.prototype._projDbl = function () {
				var t,
					e,
					r,
					n = this.x.redAdd(this.y).redSqr(),
					i = this.x.redSqr(),
					s = this.y.redSqr();
				if (this.curve.twisted) {
					var o = (u = this.curve._mulA(i)).redAdd(s);
					if (this.zOne)
						(t = n.redSub(i).redSub(s).redMul(o.redSub(this.curve.two))),
							(e = o.redMul(u.redSub(s))),
							(r = o.redSqr().redSub(o).redSub(o));
					else {
						var f = this.z.redSqr(),
							a = o.redSub(f).redISub(f);
						(t = n.redSub(i).redISub(s).redMul(a)),
							(e = o.redMul(u.redSub(s))),
							(r = o.redMul(a));
					}
				} else {
					var u = i.redAdd(s);
					(f = this.curve._mulC(this.z).redSqr()), (a = u.redSub(f).redSub(f));
					(t = this.curve._mulC(n.redISub(u)).redMul(a)),
						(e = this.curve._mulC(u).redMul(i.redISub(s))),
						(r = u.redMul(a));
				}
				return this.curve.point(t, e, r);
			}),
			(c.prototype.dbl = function () {
				return this.isInfinity()
					? this
					: this.curve.extended
					? this._extDbl()
					: this._projDbl();
			}),
			(c.prototype._extAdd = function (t) {
				var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
					r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
					n = this.t.redMul(this.curve.dd).redMul(t.t),
					i = this.z.redMul(t.z.redAdd(t.z)),
					s = r.redSub(e),
					o = i.redSub(n),
					f = i.redAdd(n),
					a = r.redAdd(e),
					u = s.redMul(o),
					c = f.redMul(a),
					h = s.redMul(a),
					d = o.redMul(f);
				return this.curve.point(u, c, d, h);
			}),
			(c.prototype._projAdd = function (t) {
				var e,
					r,
					n = this.z.redMul(t.z),
					i = n.redSqr(),
					s = this.x.redMul(t.x),
					o = this.y.redMul(t.y),
					f = this.curve.d.redMul(s).redMul(o),
					a = i.redSub(f),
					u = i.redAdd(f),
					c = this.x
						.redAdd(this.y)
						.redMul(t.x.redAdd(t.y))
						.redISub(s)
						.redISub(o),
					h = n.redMul(a).redMul(c);
				return (
					this.curve.twisted
						? ((e = n.redMul(u).redMul(o.redSub(this.curve._mulA(s)))),
						  (r = a.redMul(u)))
						: ((e = n.redMul(u).redMul(o.redSub(s))),
						  (r = this.curve._mulC(a).redMul(u))),
					this.curve.point(h, e, r)
				);
			}),
			(c.prototype.add = function (t) {
				return this.isInfinity()
					? t
					: t.isInfinity()
					? this
					: this.curve.extended
					? this._extAdd(t)
					: this._projAdd(t);
			}),
			(c.prototype.mul = function (t) {
				return this._hasDoubles(t)
					? this.curve._fixedNafMul(this, t)
					: this.curve._wnafMul(this, t);
			}),
			(c.prototype.mulAdd = function (t, e, r) {
				return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1);
			}),
			(c.prototype.jmulAdd = function (t, e, r) {
				return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0);
			}),
			(c.prototype.normalize = function () {
				if (this.zOne) return this;
				var t = this.z.redInvm();
				return (
					(this.x = this.x.redMul(t)),
					(this.y = this.y.redMul(t)),
					this.t && (this.t = this.t.redMul(t)),
					(this.z = this.curve.one),
					(this.zOne = !0),
					this
				);
			}),
			(c.prototype.neg = function () {
				return this.curve.point(
					this.x.redNeg(),
					this.y,
					this.z,
					this.t && this.t.redNeg()
				);
			}),
			(c.prototype.getX = function () {
				return this.normalize(), this.x.fromRed();
			}),
			(c.prototype.getY = function () {
				return this.normalize(), this.y.fromRed();
			}),
			(c.prototype.eq = function (t) {
				return (
					this === t ||
					(0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY()))
				);
			}),
			(c.prototype.eqXToP = function (t) {
				var e = t.toRed(this.curve.red).redMul(this.z);
				if (0 === this.x.cmp(e)) return !0;
				for (var r = t.clone(), n = this.curve.redN.redMul(this.z); ; ) {
					if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1;
					if ((e.redIAdd(n), 0 === this.x.cmp(e))) return !0;
				}
			}),
			(c.prototype.toP = c.prototype.normalize),
			(c.prototype.mixedAdd = c.prototype.add);
	},
	function (t, e, r) {
		"use strict";
		var n,
			i = e,
			s = r(28),
			o = r(6),
			f = o.utils.assert;
		function a(t) {
			"short" === t.type
				? (this.curve = new o.curve.short(t))
				: "edwards" === t.type
				? (this.curve = new o.curve.edwards(t))
				: (this.curve = new o.curve.mont(t)),
				(this.g = this.curve.g),
				(this.n = this.curve.n),
				(this.hash = t.hash),
				f(this.g.validate(), "Invalid curve"),
				f(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
		}
		function u(t, e) {
			Object.defineProperty(i, t, {
				configurable: !0,
				enumerable: !0,
				get: function () {
					var r = new a(e);
					return (
						Object.defineProperty(i, t, {
							configurable: !0,
							enumerable: !0,
							value: r,
						}),
						r
					);
				},
			});
		}
		(i.PresetCurve = a),
			u("p192", {
				type: "short",
				prime: "p192",
				p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
				a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
				b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
				n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
				hash: s.sha256,
				gRed: !1,
				g: [
					"188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
					"07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
				],
			}),
			u("p224", {
				type: "short",
				prime: "p224",
				p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
				a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
				b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
				n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
				hash: s.sha256,
				gRed: !1,
				g: [
					"b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
					"bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
				],
			}),
			u("p256", {
				type: "short",
				prime: null,
				p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
				a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
				b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
				n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
				hash: s.sha256,
				gRed: !1,
				g: [
					"6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
					"4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
				],
			}),
			u("p384", {
				type: "short",
				prime: null,
				p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
				a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
				b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
				n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
				hash: s.sha384,
				gRed: !1,
				g: [
					"aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
					"3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
				],
			}),
			u("p521", {
				type: "short",
				prime: null,
				p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
				a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
				b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
				n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
				hash: s.sha512,
				gRed: !1,
				g: [
					"000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
					"00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
				],
			}),
			u("curve25519", {
				type: "mont",
				prime: "p25519",
				p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
				a: "76d06",
				b: "1",
				n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
				hash: s.sha256,
				gRed: !1,
				g: ["9"],
			}),
			u("ed25519", {
				type: "edwards",
				prime: "p25519",
				p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
				a: "-1",
				c: "1",
				d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
				n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
				hash: s.sha256,
				gRed: !1,
				g: [
					"216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
					"6666666666666666666666666666666666666666666666666666666666666658",
				],
			});
		try {
			n = r(76);
		} catch (t) {
			n = void 0;
		}
		u("secp256k1", {
			type: "short",
			prime: "k256",
			p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
			a: "0",
			b: "7",
			n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
			h: "1",
			hash: s.sha256,
			beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
			lambda:
				"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
			basis: [
				{
					a: "3086d221a7d46bcde86c90e49284eb15",
					b: "-e4437ed6010e88286f547fa90abfe4c3",
				},
				{
					a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
					b: "3086d221a7d46bcde86c90e49284eb15",
				},
			],
			gRed: !1,
			g: [
				"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
				"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
				n,
			],
		});
	},
	function (t, e, r) {
		"use strict";
		(e.sha1 = r(71)),
			(e.sha224 = r(72)),
			(e.sha256 = r(43)),
			(e.sha384 = r(73)),
			(e.sha512 = r(44));
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(22),
			s = r(42),
			o = n.rotl32,
			f = n.sum32,
			a = n.sum32_5,
			u = s.ft_1,
			c = i.BlockHash,
			h = [1518500249, 1859775393, 2400959708, 3395469782];
		function d() {
			if (!(this instanceof d)) return new d();
			c.call(this),
				(this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
				(this.W = new Array(80));
		}
		n.inherits(d, c),
			(t.exports = d),
			(d.blockSize = 512),
			(d.outSize = 160),
			(d.hmacStrength = 80),
			(d.padLength = 64),
			(d.prototype._update = function (t, e) {
				for (var r = this.W, n = 0; n < 16; n++) r[n] = t[e + n];
				for (; n < r.length; n++)
					r[n] = o(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
				var i = this.h[0],
					s = this.h[1],
					c = this.h[2],
					d = this.h[3],
					p = this.h[4];
				for (n = 0; n < r.length; n++) {
					var l = ~~(n / 20),
						b = a(o(i, 5), u(l, s, c, d), p, r[n], h[l]);
					(p = d), (d = c), (c = o(s, 30)), (s = i), (i = b);
				}
				(this.h[0] = f(this.h[0], i)),
					(this.h[1] = f(this.h[1], s)),
					(this.h[2] = f(this.h[2], c)),
					(this.h[3] = f(this.h[3], d)),
					(this.h[4] = f(this.h[4], p));
			}),
			(d.prototype._digest = function (t) {
				return "hex" === t
					? n.toHex32(this.h, "big")
					: n.split32(this.h, "big");
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(43);
		function s() {
			if (!(this instanceof s)) return new s();
			i.call(this),
				(this.h = [
					3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
					1694076839, 3204075428,
				]);
		}
		n.inherits(s, i),
			(t.exports = s),
			(s.blockSize = 512),
			(s.outSize = 224),
			(s.hmacStrength = 192),
			(s.padLength = 64),
			(s.prototype._digest = function (t) {
				return "hex" === t
					? n.toHex32(this.h.slice(0, 7), "big")
					: n.split32(this.h.slice(0, 7), "big");
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(44);
		function s() {
			if (!(this instanceof s)) return new s();
			i.call(this),
				(this.h = [
					3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
					355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
					3675008525, 1694076839, 1203062813, 3204075428,
				]);
		}
		n.inherits(s, i),
			(t.exports = s),
			(s.blockSize = 1024),
			(s.outSize = 384),
			(s.hmacStrength = 192),
			(s.padLength = 128),
			(s.prototype._digest = function (t) {
				return "hex" === t
					? n.toHex32(this.h.slice(0, 12), "big")
					: n.split32(this.h.slice(0, 12), "big");
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(22),
			s = n.rotl32,
			o = n.sum32,
			f = n.sum32_3,
			a = n.sum32_4,
			u = i.BlockHash;
		function c() {
			if (!(this instanceof c)) return new c();
			u.call(this),
				(this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
				(this.endian = "little");
		}
		function h(t, e, r, n) {
			return t <= 15
				? e ^ r ^ n
				: t <= 31
				? (e & r) | (~e & n)
				: t <= 47
				? (e | ~r) ^ n
				: t <= 63
				? (e & n) | (r & ~n)
				: e ^ (r | ~n);
		}
		function d(t) {
			return t <= 15
				? 0
				: t <= 31
				? 1518500249
				: t <= 47
				? 1859775393
				: t <= 63
				? 2400959708
				: 2840853838;
		}
		function p(t) {
			return t <= 15
				? 1352829926
				: t <= 31
				? 1548603684
				: t <= 47
				? 1836072691
				: t <= 63
				? 2053994217
				: 0;
		}
		n.inherits(c, u),
			(e.ripemd160 = c),
			(c.blockSize = 512),
			(c.outSize = 160),
			(c.hmacStrength = 192),
			(c.padLength = 64),
			(c.prototype._update = function (t, e) {
				for (
					var r = this.h[0],
						n = this.h[1],
						i = this.h[2],
						u = this.h[3],
						c = this.h[4],
						y = r,
						v = n,
						_ = i,
						S = u,
						w = c,
						I = 0;
					I < 80;
					I++
				) {
					var A = o(s(a(r, h(I, n, i, u), t[l[I] + e], d(I)), m[I]), c);
					(r = c),
						(c = u),
						(u = s(i, 10)),
						(i = n),
						(n = A),
						(A = o(s(a(y, h(79 - I, v, _, S), t[b[I] + e], p(I)), g[I]), w)),
						(y = w),
						(w = S),
						(S = s(_, 10)),
						(_ = v),
						(v = A);
				}
				(A = f(this.h[1], i, S)),
					(this.h[1] = f(this.h[2], u, w)),
					(this.h[2] = f(this.h[3], c, y)),
					(this.h[3] = f(this.h[4], r, v)),
					(this.h[4] = f(this.h[0], n, _)),
					(this.h[0] = A);
			}),
			(c.prototype._digest = function (t) {
				return "hex" === t
					? n.toHex32(this.h, "little")
					: n.split32(this.h, "little");
			});
		var l = [
				0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
				6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0,
				6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
				4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
			],
			b = [
				5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
				13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
				12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
				14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
			],
			m = [
				11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
				9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14,
				8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
				5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
			],
			g = [
				8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
				12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12,
				13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12,
				5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
			];
	},
	function (t, e, r) {
		"use strict";
		var n = r(12),
			i = r(18);
		function s(t, e, r) {
			if (!(this instanceof s)) return new s(t, e, r);
			(this.Hash = t),
				(this.blockSize = t.blockSize / 8),
				(this.outSize = t.outSize / 8),
				(this.inner = null),
				(this.outer = null),
				this._init(n.toArray(e, r));
		}
		(t.exports = s),
			(s.prototype._init = function (t) {
				t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
					i(t.length <= this.blockSize);
				for (var e = t.length; e < this.blockSize; e++) t.push(0);
				for (e = 0; e < t.length; e++) t[e] ^= 54;
				for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
					t[e] ^= 106;
				this.outer = new this.Hash().update(t);
			}),
			(s.prototype.update = function (t, e) {
				return this.inner.update(t, e), this;
			}),
			(s.prototype.digest = function (t) {
				return this.outer.update(this.inner.digest()), this.outer.digest(t);
			});
	},
	function (t, e) {
		t.exports = {
			doubles: {
				step: 4,
				points: [
					[
						"e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
						"f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
					],
					[
						"8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
						"11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
					],
					[
						"175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
						"d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
					],
					[
						"363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
						"4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
					],
					[
						"8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
						"4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
					],
					[
						"723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
						"96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
					],
					[
						"eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
						"5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
					],
					[
						"100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
						"cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
					],
					[
						"e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
						"9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
					],
					[
						"feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
						"e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
					],
					[
						"da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
						"9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
					],
					[
						"53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
						"5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
					],
					[
						"8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
						"10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
					],
					[
						"385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
						"283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
					],
					[
						"6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
						"7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
					],
					[
						"3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
						"56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
					],
					[
						"85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
						"7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
					],
					[
						"948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
						"53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
					],
					[
						"6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
						"bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
					],
					[
						"e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
						"4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
					],
					[
						"e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
						"7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
					],
					[
						"213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
						"4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
					],
					[
						"4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
						"17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
					],
					[
						"fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
						"6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
					],
					[
						"76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
						"c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
					],
					[
						"c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
						"893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
					],
					[
						"d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
						"febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
					],
					[
						"b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
						"2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
					],
					[
						"e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
						"eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
					],
					[
						"a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
						"7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
					],
					[
						"90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
						"e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
					],
					[
						"8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
						"662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
					],
					[
						"e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
						"1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
					],
					[
						"8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
						"efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
					],
					[
						"e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
						"2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
					],
					[
						"b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
						"67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
					],
					[
						"d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
						"db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
					],
					[
						"324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
						"648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
					],
					[
						"4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
						"35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
					],
					[
						"9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
						"ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
					],
					[
						"6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
						"9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
					],
					[
						"a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
						"40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
					],
					[
						"7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
						"34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
					],
					[
						"928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
						"c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
					],
					[
						"85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
						"1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
					],
					[
						"ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
						"493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
					],
					[
						"827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
						"c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
					],
					[
						"eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
						"be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
					],
					[
						"e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
						"4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
					],
					[
						"1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
						"aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
					],
					[
						"146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
						"b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
					],
					[
						"fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
						"6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
					],
					[
						"da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
						"8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
					],
					[
						"a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
						"7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
					],
					[
						"174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
						"ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
					],
					[
						"959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
						"2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
					],
					[
						"d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
						"e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
					],
					[
						"64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
						"d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
					],
					[
						"8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
						"38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
					],
					[
						"13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
						"69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
					],
					[
						"bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
						"d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
					],
					[
						"8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
						"40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
					],
					[
						"8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
						"620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
					],
					[
						"dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
						"7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
					],
					[
						"f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
						"ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
					],
				],
			},
			naf: {
				wnd: 7,
				points: [
					[
						"f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
						"388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
					],
					[
						"2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
						"d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
					],
					[
						"5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
						"6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
					],
					[
						"acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
						"cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
					],
					[
						"774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
						"d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
					],
					[
						"f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
						"ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
					],
					[
						"d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
						"581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
					],
					[
						"defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
						"4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
					],
					[
						"2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
						"85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
					],
					[
						"352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
						"321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
					],
					[
						"2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
						"2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
					],
					[
						"9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
						"73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
					],
					[
						"daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
						"a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
					],
					[
						"c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
						"2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
					],
					[
						"6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
						"e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
					],
					[
						"1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
						"b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
					],
					[
						"605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
						"2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
					],
					[
						"62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
						"80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
					],
					[
						"80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
						"1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
					],
					[
						"7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
						"d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
					],
					[
						"d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
						"eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
					],
					[
						"49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
						"758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
					],
					[
						"77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
						"958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
					],
					[
						"f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
						"e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
					],
					[
						"463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
						"5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
					],
					[
						"f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
						"cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
					],
					[
						"caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
						"cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
					],
					[
						"2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
						"4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
					],
					[
						"7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
						"91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
					],
					[
						"754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
						"673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
					],
					[
						"e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
						"59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
					],
					[
						"186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
						"3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
					],
					[
						"df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
						"55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
					],
					[
						"5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
						"efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
					],
					[
						"290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
						"e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
					],
					[
						"af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
						"f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
					],
					[
						"766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
						"744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
					],
					[
						"59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
						"c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
					],
					[
						"f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
						"e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
					],
					[
						"7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
						"30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
					],
					[
						"948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
						"e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
					],
					[
						"7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
						"100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
					],
					[
						"3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
						"ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
					],
					[
						"d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
						"8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
					],
					[
						"1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
						"68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
					],
					[
						"733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
						"f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
					],
					[
						"15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
						"d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
					],
					[
						"a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
						"edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
					],
					[
						"e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
						"a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
					],
					[
						"311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
						"66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
					],
					[
						"34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
						"9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
					],
					[
						"f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
						"4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
					],
					[
						"d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
						"fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
					],
					[
						"32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
						"5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
					],
					[
						"7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
						"8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
					],
					[
						"ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
						"8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
					],
					[
						"16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
						"5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
					],
					[
						"eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
						"f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
					],
					[
						"78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
						"f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
					],
					[
						"494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
						"42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
					],
					[
						"a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
						"204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
					],
					[
						"c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
						"4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
					],
					[
						"841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
						"73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
					],
					[
						"5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
						"39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
					],
					[
						"36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
						"d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
					],
					[
						"336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
						"ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
					],
					[
						"8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
						"6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
					],
					[
						"1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
						"60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
					],
					[
						"85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
						"3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
					],
					[
						"29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
						"b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
					],
					[
						"a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
						"ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
					],
					[
						"4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
						"cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
					],
					[
						"d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
						"6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
					],
					[
						"ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
						"322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
					],
					[
						"af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
						"6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
					],
					[
						"e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
						"2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
					],
					[
						"591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
						"b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
					],
					[
						"11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
						"998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
					],
					[
						"3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
						"b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
					],
					[
						"cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
						"bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
					],
					[
						"c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
						"6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
					],
					[
						"c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
						"c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
					],
					[
						"a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
						"21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
					],
					[
						"347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
						"60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
					],
					[
						"da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
						"49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
					],
					[
						"c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
						"5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
					],
					[
						"4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
						"7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
					],
					[
						"3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
						"be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
					],
					[
						"cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
						"8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
					],
					[
						"b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
						"39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
					],
					[
						"d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
						"62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
					],
					[
						"48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
						"25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
					],
					[
						"dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
						"ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
					],
					[
						"6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
						"cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
					],
					[
						"e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
						"f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
					],
					[
						"eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
						"6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
					],
					[
						"13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
						"fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
					],
					[
						"ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
						"1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
					],
					[
						"b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
						"5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
					],
					[
						"ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
						"438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
					],
					[
						"8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
						"cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
					],
					[
						"52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
						"c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
					],
					[
						"e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
						"6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
					],
					[
						"7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
						"ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
					],
					[
						"5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
						"9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
					],
					[
						"32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
						"ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
					],
					[
						"e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
						"d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
					],
					[
						"8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
						"c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
					],
					[
						"4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
						"67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
					],
					[
						"3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
						"cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
					],
					[
						"674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
						"299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
					],
					[
						"d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
						"f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
					],
					[
						"30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
						"462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
					],
					[
						"be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
						"62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
					],
					[
						"93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
						"7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
					],
					[
						"b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
						"ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
					],
					[
						"d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
						"4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
					],
					[
						"d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
						"bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
					],
					[
						"463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
						"bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
					],
					[
						"7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
						"603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
					],
					[
						"74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
						"cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
					],
					[
						"30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
						"553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
					],
					[
						"9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
						"712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
					],
					[
						"176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
						"ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
					],
					[
						"75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
						"9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
					],
					[
						"809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
						"9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
					],
					[
						"1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
						"4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
					],
				],
			},
		};
	},
	function (t, e, r) {
		"use strict";
		var n = r(7),
			i = r(78),
			s = r(6),
			o = s.utils.assert,
			f = r(79),
			a = r(80);
		function u(t) {
			if (!(this instanceof u)) return new u(t);
			"string" == typeof t &&
				(o(s.curves.hasOwnProperty(t), "Unknown curve " + t),
				(t = s.curves[t])),
				t instanceof s.curves.PresetCurve && (t = { curve: t }),
				(this.curve = t.curve.curve),
				(this.n = this.curve.n),
				(this.nh = this.n.ushrn(1)),
				(this.g = this.curve.g),
				(this.g = t.curve.g),
				this.g.precompute(t.curve.n.bitLength() + 1),
				(this.hash = t.hash || t.curve.hash);
		}
		(t.exports = u),
			(u.prototype.keyPair = function (t) {
				return new f(this, t);
			}),
			(u.prototype.keyFromPrivate = function (t, e) {
				return f.fromPrivate(this, t, e);
			}),
			(u.prototype.keyFromPublic = function (t, e) {
				return f.fromPublic(this, t, e);
			}),
			(u.prototype.genKeyPair = function (t) {
				t || (t = {});
				for (
					var e = new i({
							hash: this.hash,
							pers: t.pers,
							persEnc: t.persEnc || "utf8",
							entropy: t.entropy || s.rand(this.hash.hmacStrength),
							entropyEnc: (t.entropy && t.entropyEnc) || "utf8",
							nonce: this.n.toArray(),
						}),
						r = this.n.byteLength(),
						o = this.n.sub(new n(2));
					;

				) {
					var f = new n(e.generate(r));
					if (!(f.cmp(o) > 0)) return f.iaddn(1), this.keyFromPrivate(f);
				}
			}),
			(u.prototype._truncateToN = function (t, e) {
				var r = 8 * t.byteLength() - this.n.bitLength();
				return (
					r > 0 && (t = t.ushrn(r)),
					!e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
				);
			}),
			(u.prototype.sign = function (t, e, r, s) {
				"object" == typeof r && ((s = r), (r = null)),
					s || (s = {}),
					(e = this.keyFromPrivate(e, r)),
					(t = this._truncateToN(new n(t, 16)));
				for (
					var o = this.n.byteLength(),
						f = e.getPrivate().toArray("be", o),
						u = t.toArray("be", o),
						c = new i({
							hash: this.hash,
							entropy: f,
							nonce: u,
							pers: s.pers,
							persEnc: s.persEnc || "utf8",
						}),
						h = this.n.sub(new n(1)),
						d = 0;
					;
					d++
				) {
					var p = s.k ? s.k(d) : new n(c.generate(this.n.byteLength()));
					if (!((p = this._truncateToN(p, !0)).cmpn(1) <= 0 || p.cmp(h) >= 0)) {
						var l = this.g.mul(p);
						if (!l.isInfinity()) {
							var b = l.getX(),
								m = b.umod(this.n);
							if (0 !== m.cmpn(0)) {
								var g = p.invm(this.n).mul(m.mul(e.getPrivate()).iadd(t));
								if (0 !== (g = g.umod(this.n)).cmpn(0)) {
									var y = (l.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
									return (
										s.canonical &&
											g.cmp(this.nh) > 0 &&
											((g = this.n.sub(g)), (y ^= 1)),
										new a({ r: m, s: g, recoveryParam: y })
									);
								}
							}
						}
					}
				}
			}),
			(u.prototype.verify = function (t, e, r, i) {
				(t = this._truncateToN(new n(t, 16))), (r = this.keyFromPublic(r, i));
				var s = (e = new a(e, "hex")).r,
					o = e.s;
				if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
				if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
				var f,
					u = o.invm(this.n),
					c = u.mul(t).umod(this.n),
					h = u.mul(s).umod(this.n);
				return this.curve._maxwellTrick
					? !(f = this.g.jmulAdd(c, r.getPublic(), h)).isInfinity() &&
							f.eqXToP(s)
					: !(f = this.g.mulAdd(c, r.getPublic(), h)).isInfinity() &&
							0 === f.getX().umod(this.n).cmp(s);
			}),
			(u.prototype.recoverPubKey = function (t, e, r, i) {
				o((3 & r) === r, "The recovery param is more than two bits"),
					(e = new a(e, i));
				var s = this.n,
					f = new n(t),
					u = e.r,
					c = e.s,
					h = 1 & r,
					d = r >> 1;
				if (u.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
					throw new Error("Unable to find sencond key candinate");
				u = d
					? this.curve.pointFromX(u.add(this.curve.n), h)
					: this.curve.pointFromX(u, h);
				var p = e.r.invm(s),
					l = s.sub(f).mul(p).umod(s),
					b = c.mul(p).umod(s);
				return this.g.mulAdd(l, u, b);
			}),
			(u.prototype.getKeyRecoveryParam = function (t, e, r, n) {
				if (null !== (e = new a(e, n)).recoveryParam) return e.recoveryParam;
				for (var i = 0; i < 4; i++) {
					var s;
					try {
						s = this.recoverPubKey(t, e, i);
					} catch (t) {
						continue;
					}
					if (s.eq(r)) return i;
				}
				throw new Error("Unable to find valid recovery factor");
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(28),
			i = r(41),
			s = r(18);
		function o(t) {
			if (!(this instanceof o)) return new o(t);
			(this.hash = t.hash),
				(this.predResist = !!t.predResist),
				(this.outLen = this.hash.outSize),
				(this.minEntropy = t.minEntropy || this.hash.hmacStrength),
				(this._reseed = null),
				(this.reseedInterval = null),
				(this.K = null),
				(this.V = null);
			var e = i.toArray(t.entropy, t.entropyEnc || "hex"),
				r = i.toArray(t.nonce, t.nonceEnc || "hex"),
				n = i.toArray(t.pers, t.persEnc || "hex");
			s(
				e.length >= this.minEntropy / 8,
				"Not enough entropy. Minimum is: " + this.minEntropy + " bits"
			),
				this._init(e, r, n);
		}
		(t.exports = o),
			(o.prototype._init = function (t, e, r) {
				var n = t.concat(e).concat(r);
				(this.K = new Array(this.outLen / 8)),
					(this.V = new Array(this.outLen / 8));
				for (var i = 0; i < this.V.length; i++)
					(this.K[i] = 0), (this.V[i] = 1);
				this._update(n),
					(this._reseed = 1),
					(this.reseedInterval = 281474976710656);
			}),
			(o.prototype._hmac = function () {
				return new n.hmac(this.hash, this.K);
			}),
			(o.prototype._update = function (t) {
				var e = this._hmac().update(this.V).update([0]);
				t && (e = e.update(t)),
					(this.K = e.digest()),
					(this.V = this._hmac().update(this.V).digest()),
					t &&
						((this.K = this._hmac()
							.update(this.V)
							.update([1])
							.update(t)
							.digest()),
						(this.V = this._hmac().update(this.V).digest()));
			}),
			(o.prototype.reseed = function (t, e, r, n) {
				"string" != typeof e && ((n = r), (r = e), (e = null)),
					(t = i.toArray(t, e)),
					(r = i.toArray(r, n)),
					s(
						t.length >= this.minEntropy / 8,
						"Not enough entropy. Minimum is: " + this.minEntropy + " bits"
					),
					this._update(t.concat(r || [])),
					(this._reseed = 1);
			}),
			(o.prototype.generate = function (t, e, r, n) {
				if (this._reseed > this.reseedInterval)
					throw new Error("Reseed is required");
				"string" != typeof e && ((n = r), (r = e), (e = null)),
					r && ((r = i.toArray(r, n || "hex")), this._update(r));
				for (var s = []; s.length < t; )
					(this.V = this._hmac().update(this.V).digest()),
						(s = s.concat(this.V));
				var o = s.slice(0, t);
				return this._update(r), this._reseed++, i.encode(o, e);
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(7),
			i = r(6).utils.assert;
		function s(t, e) {
			(this.ec = t),
				(this.priv = null),
				(this.pub = null),
				e.priv && this._importPrivate(e.priv, e.privEnc),
				e.pub && this._importPublic(e.pub, e.pubEnc);
		}
		(t.exports = s),
			(s.fromPublic = function (t, e, r) {
				return e instanceof s ? e : new s(t, { pub: e, pubEnc: r });
			}),
			(s.fromPrivate = function (t, e, r) {
				return e instanceof s ? e : new s(t, { priv: e, privEnc: r });
			}),
			(s.prototype.validate = function () {
				var t = this.getPublic();
				return t.isInfinity()
					? { result: !1, reason: "Invalid public key" }
					: t.validate()
					? t.mul(this.ec.curve.n).isInfinity()
						? { result: !0, reason: null }
						: { result: !1, reason: "Public key * N != O" }
					: { result: !1, reason: "Public key is not a point" };
			}),
			(s.prototype.getPublic = function (t, e) {
				return (
					"string" == typeof t && ((e = t), (t = null)),
					this.pub || (this.pub = this.ec.g.mul(this.priv)),
					e ? this.pub.encode(e, t) : this.pub
				);
			}),
			(s.prototype.getPrivate = function (t) {
				return "hex" === t ? this.priv.toString(16, 2) : this.priv;
			}),
			(s.prototype._importPrivate = function (t, e) {
				(this.priv = new n(t, e || 16)),
					(this.priv = this.priv.umod(this.ec.curve.n));
			}),
			(s.prototype._importPublic = function (t, e) {
				if (t.x || t.y)
					return (
						"mont" === this.ec.curve.type
							? i(t.x, "Need x coordinate")
							: ("short" !== this.ec.curve.type &&
									"edwards" !== this.ec.curve.type) ||
							  i(t.x && t.y, "Need both x and y coordinate"),
						void (this.pub = this.ec.curve.point(t.x, t.y))
					);
				this.pub = this.ec.curve.decodePoint(t, e);
			}),
			(s.prototype.derive = function (t) {
				return t.mul(this.priv).getX();
			}),
			(s.prototype.sign = function (t, e, r) {
				return this.ec.sign(t, this, e, r);
			}),
			(s.prototype.verify = function (t, e) {
				return this.ec.verify(t, e, this);
			}),
			(s.prototype.inspect = function () {
				return (
					"<Key priv: " +
					(this.priv && this.priv.toString(16, 2)) +
					" pub: " +
					(this.pub && this.pub.inspect()) +
					" >"
				);
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(7),
			i = r(6).utils,
			s = i.assert;
		function o(t, e) {
			if (t instanceof o) return t;
			this._importDER(t, e) ||
				(s(t.r && t.s, "Signature without r or s"),
				(this.r = new n(t.r, 16)),
				(this.s = new n(t.s, 16)),
				void 0 === t.recoveryParam
					? (this.recoveryParam = null)
					: (this.recoveryParam = t.recoveryParam));
		}
		function f() {
			this.place = 0;
		}
		function a(t, e) {
			var r = t[e.place++];
			if (!(128 & r)) return r;
			for (var n = 15 & r, i = 0, s = 0, o = e.place; s < n; s++, o++)
				(i <<= 8), (i |= t[o]);
			return (e.place = o), i;
		}
		function u(t) {
			for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r; )
				e++;
			return 0 === e ? t : t.slice(e);
		}
		function c(t, e) {
			if (e < 128) t.push(e);
			else {
				var r = 1 + ((Math.log(e) / Math.LN2) >>> 3);
				for (t.push(128 | r); --r; ) t.push((e >>> (r << 3)) & 255);
				t.push(e);
			}
		}
		(t.exports = o),
			(o.prototype._importDER = function (t, e) {
				t = i.toArray(t, e);
				var r = new f();
				if (48 !== t[r.place++]) return !1;
				if (a(t, r) + r.place !== t.length) return !1;
				if (2 !== t[r.place++]) return !1;
				var s = a(t, r),
					o = t.slice(r.place, s + r.place);
				if (((r.place += s), 2 !== t[r.place++])) return !1;
				var u = a(t, r);
				if (t.length !== u + r.place) return !1;
				var c = t.slice(r.place, u + r.place);
				return (
					0 === o[0] && 128 & o[1] && (o = o.slice(1)),
					0 === c[0] && 128 & c[1] && (c = c.slice(1)),
					(this.r = new n(o)),
					(this.s = new n(c)),
					(this.recoveryParam = null),
					!0
				);
			}),
			(o.prototype.toDER = function (t) {
				var e = this.r.toArray(),
					r = this.s.toArray();
				for (
					128 & e[0] && (e = [0].concat(e)),
						128 & r[0] && (r = [0].concat(r)),
						e = u(e),
						r = u(r);
					!(r[0] || 128 & r[1]);

				)
					r = r.slice(1);
				var n = [2];
				c(n, e.length), (n = n.concat(e)).push(2), c(n, r.length);
				var s = n.concat(r),
					o = [48];
				return c(o, s.length), (o = o.concat(s)), i.encode(o, t);
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(28),
			i = r(6),
			s = i.utils,
			o = s.assert,
			f = s.parseBytes,
			a = r(82),
			u = r(83);
		function c(t) {
			if (
				(o("ed25519" === t, "only tested with ed25519 so far"),
				!(this instanceof c))
			)
				return new c(t);
			t = i.curves[t].curve;
			(this.curve = t),
				(this.g = t.g),
				this.g.precompute(t.n.bitLength() + 1),
				(this.pointClass = t.point().constructor),
				(this.encodingLength = Math.ceil(t.n.bitLength() / 8)),
				(this.hash = n.sha512);
		}
		(t.exports = c),
			(c.prototype.sign = function (t, e) {
				t = f(t);
				var r = this.keyFromSecret(e),
					n = this.hashInt(r.messagePrefix(), t),
					i = this.g.mul(n),
					s = this.encodePoint(i),
					o = this.hashInt(s, r.pubBytes(), t).mul(r.priv()),
					a = n.add(o).umod(this.curve.n);
				return this.makeSignature({ R: i, S: a, Rencoded: s });
			}),
			(c.prototype.verify = function (t, e, r) {
				(t = f(t)), (e = this.makeSignature(e));
				var n = this.keyFromPublic(r),
					i = this.hashInt(e.Rencoded(), n.pubBytes(), t),
					s = this.g.mul(e.S());
				return e.R().add(n.pub().mul(i)).eq(s);
			}),
			(c.prototype.hashInt = function () {
				for (var t = this.hash(), e = 0; e < arguments.length; e++)
					t.update(arguments[e]);
				return s.intFromLE(t.digest()).umod(this.curve.n);
			}),
			(c.prototype.keyFromPublic = function (t) {
				return a.fromPublic(this, t);
			}),
			(c.prototype.keyFromSecret = function (t) {
				return a.fromSecret(this, t);
			}),
			(c.prototype.makeSignature = function (t) {
				return t instanceof u ? t : new u(this, t);
			}),
			(c.prototype.encodePoint = function (t) {
				var e = t.getY().toArray("le", this.encodingLength);
				return (e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), e;
			}),
			(c.prototype.decodePoint = function (t) {
				var e = (t = s.parseBytes(t)).length - 1,
					r = t.slice(0, e).concat(-129 & t[e]),
					n = 0 != (128 & t[e]),
					i = s.intFromLE(r);
				return this.curve.pointFromY(i, n);
			}),
			(c.prototype.encodeInt = function (t) {
				return t.toArray("le", this.encodingLength);
			}),
			(c.prototype.decodeInt = function (t) {
				return s.intFromLE(t);
			}),
			(c.prototype.isPoint = function (t) {
				return t instanceof this.pointClass;
			});
	},
	function (t, e, r) {
		"use strict";
		var n = r(6).utils,
			i = n.assert,
			s = n.parseBytes,
			o = n.cachedProperty;
		function f(t, e) {
			(this.eddsa = t),
				(this._secret = s(e.secret)),
				t.isPoint(e.pub) ? (this._pub = e.pub) : (this._pubBytes = s(e.pub));
		}
		(f.fromPublic = function (t, e) {
			return e instanceof f ? e : new f(t, { pub: e });
		}),
			(f.fromSecret = function (t, e) {
				return e instanceof f ? e : new f(t, { secret: e });
			}),
			(f.prototype.secret = function () {
				return this._secret;
			}),
			o(f, "pubBytes", function () {
				return this.eddsa.encodePoint(this.pub());
			}),
			o(f, "pub", function () {
				return this._pubBytes
					? this.eddsa.decodePoint(this._pubBytes)
					: this.eddsa.g.mul(this.priv());
			}),
			o(f, "privBytes", function () {
				var t = this.eddsa,
					e = this.hash(),
					r = t.encodingLength - 1,
					n = e.slice(0, t.encodingLength);
				return (n[0] &= 248), (n[r] &= 127), (n[r] |= 64), n;
			}),
			o(f, "priv", function () {
				return this.eddsa.decodeInt(this.privBytes());
			}),
			o(f, "hash", function () {
				return this.eddsa.hash().update(this.secret()).digest();
			}),
			o(f, "messagePrefix", function () {
				return this.hash().slice(this.eddsa.encodingLength);
			}),
			(f.prototype.sign = function (t) {
				return (
					i(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
				);
			}),
			(f.prototype.verify = function (t, e) {
				return this.eddsa.verify(t, e, this);
			}),
			(f.prototype.getSecret = function (t) {
				return (
					i(this._secret, "KeyPair is public only"), n.encode(this.secret(), t)
				);
			}),
			(f.prototype.getPublic = function (t) {
				return n.encode(this.pubBytes(), t);
			}),
			(t.exports = f);
	},
	function (t, e, r) {
		"use strict";
		var n = r(7),
			i = r(6).utils,
			s = i.assert,
			o = i.cachedProperty,
			f = i.parseBytes;
		function a(t, e) {
			(this.eddsa = t),
				"object" != typeof e && (e = f(e)),
				Array.isArray(e) &&
					(e = {
						R: e.slice(0, t.encodingLength),
						S: e.slice(t.encodingLength),
					}),
				s(e.R && e.S, "Signature without R or S"),
				t.isPoint(e.R) && (this._R = e.R),
				e.S instanceof n && (this._S = e.S),
				(this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded),
				(this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded);
		}
		o(a, "S", function () {
			return this.eddsa.decodeInt(this.Sencoded());
		}),
			o(a, "R", function () {
				return this.eddsa.decodePoint(this.Rencoded());
			}),
			o(a, "Rencoded", function () {
				return this.eddsa.encodePoint(this.R());
			}),
			o(a, "Sencoded", function () {
				return this.eddsa.encodeInt(this.S());
			}),
			(a.prototype.toBytes = function () {
				return this.Rencoded().concat(this.Sencoded());
			}),
			(a.prototype.toHex = function () {
				return i.encode(this.toBytes(), "hex").toUpperCase();
			}),
			(t.exports = a);
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(28),
				i = r(2),
				s = t.exports;
			(s.sha1 = function (t) {
				return (
					i.checkArgument(e.isBuffer(t)),
					e.from(n.sha1().update(t).digest("hex"), "hex")
				);
			}),
				(s.sha1.blocksize = 512),
				(s.sha256 = function (t) {
					return (
						i.checkArgument(e.isBuffer(t)),
						e.from(n.sha256().update(t).digest("hex"), "hex")
					);
				}),
				(s.sha256.blocksize = 512),
				(s.sha256sha256 = function (t) {
					return i.checkArgument(e.isBuffer(t)), s.sha256(s.sha256(t));
				}),
				(s.ripemd160 = function (t) {
					return (
						i.checkArgument(e.isBuffer(t)),
						e.from(n.ripemd160().update(t).digest("hex"), "hex")
					);
				}),
				(s.sha256ripemd160 = function (t) {
					return i.checkArgument(e.isBuffer(t)), s.ripemd160(s.sha256(t));
				}),
				(s.sha512 = function (t) {
					return (
						i.checkArgument(e.isBuffer(t)),
						e.from(n.sha512().update(t).digest("hex"), "hex")
					);
				}),
				(s.sha512.blocksize = 1024),
				(s.hmac = function (t, r, n) {
					i.checkArgument(e.isBuffer(r)),
						i.checkArgument(e.isBuffer(n)),
						i.checkArgument(t.blocksize);
					var s = t.blocksize / 8;
					if (n.length > s) n = t(n);
					else if (n < s) {
						var o = e.alloc(s);
						o.fill(0), n.copy(o), (n = o);
					}
					var f = e.alloc(s);
					f.fill(92);
					var a = e.alloc(s);
					a.fill(54);
					for (var u = e.alloc(s), c = e.alloc(s), h = 0; h < s; h++)
						(u[h] = f[h] ^ n[h]), (c[h] = a[h] ^ n[h]);
					return t(e.concat([u, t(e.concat([c, r]))]));
				}),
				(s.sha256hmac = function (t, e) {
					return s.hmac(s.sha256, t, e);
				}),
				(s.sha512hmac = function (t, e) {
					return s.hmac(s.sha512, t, e);
				});
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(35),
				i = r(2),
				s = t.exports;
			(s.sha1 = function (t) {
				return (
					i.checkArgument(e.isBuffer(t)),
					n.createHash("sha1").update(t).digest()
				);
			}),
				(s.sha1.blocksize = 512),
				(s.sha256 = function (t) {
					return (
						i.checkArgument(e.isBuffer(t)),
						n.createHash("sha256").update(t).digest()
					);
				}),
				(s.sha256.blocksize = 512),
				(s.sha256sha256 = function (t) {
					return i.checkArgument(e.isBuffer(t)), s.sha256(s.sha256(t));
				}),
				(s.ripemd160 = function (t) {
					return (
						i.checkArgument(e.isBuffer(t)),
						n.createHash("ripemd160").update(t).digest()
					);
				}),
				(s.sha256ripemd160 = function (t) {
					return i.checkArgument(e.isBuffer(t)), s.ripemd160(s.sha256(t));
				}),
				(s.sha512 = function (t) {
					return (
						i.checkArgument(e.isBuffer(t)),
						n.createHash("sha512").update(t).digest()
					);
				}),
				(s.sha512.blocksize = 1024),
				(s.hmac = function (t, r, n) {
					i.checkArgument(e.isBuffer(r)),
						i.checkArgument(e.isBuffer(n)),
						i.checkArgument(t.blocksize);
					var s = t.blocksize / 8;
					if (n.length > s) n = t(n);
					else if (n < s) {
						var o = e.alloc(s);
						o.fill(0), n.copy(o), (n = o);
					}
					var f = e.alloc(s);
					f.fill(92);
					var a = e.alloc(s);
					a.fill(54);
					for (var u = e.alloc(s), c = e.alloc(s), h = 0; h < s; h++)
						(u[h] = f[h] ^ n[h]), (c[h] = a[h] ^ n[h]);
					return t(e.concat([u, t(e.concat([c, r]))]));
				}),
				(s.sha256hmac = function (t, e) {
					return s.hmac(s.sha256, t, e);
				}),
				(s.sha512hmac = function (t, e) {
					return s.hmac(s.sha512, t, e);
				});
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		var n = r(87).Buffer;
		t.exports = function (t) {
			if (t.length >= 255) throw new TypeError("Alphabet too long");
			var e = new Uint8Array(256);
			e.fill(255);
			for (var r = 0; r < t.length; r++) {
				var i = t.charAt(r),
					s = i.charCodeAt(0);
				if (255 !== e[s]) throw new TypeError(i + " is ambiguous");
				e[s] = r;
			}
			var o = t.length,
				f = t.charAt(0),
				a = Math.log(o) / Math.log(256),
				u = Math.log(256) / Math.log(o);
			function c(t) {
				if ("string" != typeof t) throw new TypeError("Expected String");
				if (0 === t.length) return n.alloc(0);
				var r = 0;
				if (" " !== t[r]) {
					for (var i = 0, s = 0; t[r] === f; ) i++, r++;
					for (
						var u = ((t.length - r) * a + 1) >>> 0, c = new Uint8Array(u);
						t[r];

					) {
						var h = e[t.charCodeAt(r)];
						if (255 === h) return;
						for (var d = 0, p = u - 1; (0 !== h || d < s) && -1 !== p; p--, d++)
							(h += (o * c[p]) >>> 0),
								(c[p] = h % 256 >>> 0),
								(h = (h / 256) >>> 0);
						if (0 !== h) throw new Error("Non-zero carry");
						(s = d), r++;
					}
					if (" " !== t[r]) {
						for (var l = u - s; l !== u && 0 === c[l]; ) l++;
						var b = n.allocUnsafe(i + (u - l));
						b.fill(0, 0, i);
						for (var m = i; l !== u; ) b[m++] = c[l++];
						return b;
					}
				}
			}
			return {
				encode: function (e) {
					if (!n.isBuffer(e)) throw new TypeError("Expected Buffer");
					if (0 === e.length) return "";
					for (var r = 0, i = 0, s = 0, a = e.length; s !== a && 0 === e[s]; )
						s++, r++;
					for (
						var c = ((a - s) * u + 1) >>> 0, h = new Uint8Array(c);
						s !== a;

					) {
						for (
							var d = e[s], p = 0, l = c - 1;
							(0 !== d || p < i) && -1 !== l;
							l--, p++
						)
							(d += (256 * h[l]) >>> 0),
								(h[l] = d % o >>> 0),
								(d = (d / o) >>> 0);
						if (0 !== d) throw new Error("Non-zero carry");
						(i = p), s++;
					}
					for (var b = c - i; b !== c && 0 === h[b]; ) b++;
					for (var m = f.repeat(r); b < c; ++b) m += t.charAt(h[b]);
					return m;
				},
				decodeUnsafe: c,
				decode: function (t) {
					var e = c(t);
					if (e) return e;
					throw new Error("Non-base" + o + " character");
				},
			};
		};
	},
	function (t, e, r) {
		var n = r(0),
			i = n.Buffer;
		function s(t, e) {
			for (var r in t) e[r] = t[r];
		}
		function o(t, e, r) {
			return i(t, e, r);
		}
		i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
			? (t.exports = n)
			: (s(n, e), (e.Buffer = o)),
			(o.prototype = Object.create(i.prototype)),
			s(i, o),
			(o.from = function (t, e, r) {
				if ("number" == typeof t)
					throw new TypeError("Argument must not be a number");
				return i(t, e, r);
			}),
			(o.alloc = function (t, e, r) {
				if ("number" != typeof t)
					throw new TypeError("Argument must be a number");
				var n = i(t);
				return (
					void 0 !== e
						? "string" == typeof r
							? n.fill(e, r)
							: n.fill(e)
						: n.fill(0),
					n
				);
			}),
			(o.allocUnsafe = function (t) {
				if ("number" != typeof t)
					throw new TypeError("Argument must be a number");
				return i(t);
			}),
			(o.allocUnsafeSlow = function (t) {
				if ("number" != typeof t)
					throw new TypeError("Argument must be a number");
				return n.SlowBuffer(t);
			});
	},
	function (t, e, r) {
		"use strict";
		/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var n = Object.getOwnPropertySymbols,
			i = Object.prototype.hasOwnProperty,
			s = Object.prototype.propertyIsEnumerable;
		function o(t) {
			if (null == t)
				throw new TypeError(
					"Object.assign cannot be called with null or undefined"
				);
			return Object(t);
		}
		t.exports = (function () {
			try {
				if (!Object.assign) return !1;
				var t = new String("abc");
				if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0]))
					return !1;
				for (var e = {}, r = 0; r < 10; r++)
					e["_" + String.fromCharCode(r)] = r;
				if (
					"0123456789" !==
					Object.getOwnPropertyNames(e)
						.map(function (t) {
							return e[t];
						})
						.join("")
				)
					return !1;
				var n = {};
				return (
					"abcdefghijklmnopqrst".split("").forEach(function (t) {
						n[t] = t;
					}),
					"abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
				);
			} catch (t) {
				return !1;
			}
		})()
			? Object.assign
			: function (t, e) {
					for (var r, f, a = o(t), u = 1; u < arguments.length; u++) {
						for (var c in (r = Object(arguments[u])))
							i.call(r, c) && (a[c] = r[c]);
						if (n) {
							f = n(r);
							for (var h = 0; h < f.length; h++)
								s.call(r, f[h]) && (a[f[h]] = r[f[h]]);
						}
					}
					return a;
			  };
	},
	function (t, e, r) {
		(function (t) {
			var n =
					Object.getOwnPropertyDescriptors ||
					function (t) {
						for (var e = Object.keys(t), r = {}, n = 0; n < e.length; n++)
							r[e[n]] = Object.getOwnPropertyDescriptor(t, e[n]);
						return r;
					},
				i = /%[sdj%]/g;
			(e.format = function (t) {
				if (!g(t)) {
					for (var e = [], r = 0; r < arguments.length; r++)
						e.push(f(arguments[r]));
					return e.join(" ");
				}
				r = 1;
				for (
					var n = arguments,
						s = n.length,
						o = String(t).replace(i, function (t) {
							if ("%%" === t) return "%";
							if (r >= s) return t;
							switch (t) {
								case "%s":
									return String(n[r++]);
								case "%d":
									return Number(n[r++]);
								case "%j":
									try {
										return JSON.stringify(n[r++]);
									} catch (t) {
										return "[Circular]";
									}
								default:
									return t;
							}
						}),
						a = n[r];
					r < s;
					a = n[++r]
				)
					b(a) || !_(a) ? (o += " " + a) : (o += " " + f(a));
				return o;
			}),
				(e.deprecate = function (r, n) {
					if (void 0 !== t && !0 === t.noDeprecation) return r;
					if (void 0 === t)
						return function () {
							return e.deprecate(r, n).apply(this, arguments);
						};
					var i = !1;
					return function () {
						if (!i) {
							if (t.throwDeprecation) throw new Error(n);
							t.traceDeprecation ? console.trace(n) : console.error(n),
								(i = !0);
						}
						return r.apply(this, arguments);
					};
				});
			var s,
				o = {};
			function f(t, r) {
				var n = { seen: [], stylize: u };
				return (
					arguments.length >= 3 && (n.depth = arguments[2]),
					arguments.length >= 4 && (n.colors = arguments[3]),
					l(r) ? (n.showHidden = r) : r && e._extend(n, r),
					y(n.showHidden) && (n.showHidden = !1),
					y(n.depth) && (n.depth = 2),
					y(n.colors) && (n.colors = !1),
					y(n.customInspect) && (n.customInspect = !0),
					n.colors && (n.stylize = a),
					c(n, t, n.depth)
				);
			}
			function a(t, e) {
				var r = f.styles[e];
				return r
					? "[" + f.colors[r][0] + "m" + t + "[" + f.colors[r][1] + "m"
					: t;
			}
			function u(t, e) {
				return t;
			}
			function c(t, r, n) {
				if (
					t.customInspect &&
					r &&
					I(r.inspect) &&
					r.inspect !== e.inspect &&
					(!r.constructor || r.constructor.prototype !== r)
				) {
					var i = r.inspect(n, t);
					return g(i) || (i = c(t, i, n)), i;
				}
				var s = (function (t, e) {
					if (y(e)) return t.stylize("undefined", "undefined");
					if (g(e)) {
						var r =
							"'" +
							JSON.stringify(e)
								.replace(/^"|"$/g, "")
								.replace(/'/g, "\\'")
								.replace(/\\"/g, '"') +
							"'";
						return t.stylize(r, "string");
					}
					if (m(e)) return t.stylize("" + e, "number");
					if (l(e)) return t.stylize("" + e, "boolean");
					if (b(e)) return t.stylize("null", "null");
				})(t, r);
				if (s) return s;
				var o = Object.keys(r),
					f = (function (t) {
						var e = {};
						return (
							t.forEach(function (t, r) {
								e[t] = !0;
							}),
							e
						);
					})(o);
				if (
					(t.showHidden && (o = Object.getOwnPropertyNames(r)),
					w(r) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0))
				)
					return h(r);
				if (0 === o.length) {
					if (I(r)) {
						var a = r.name ? ": " + r.name : "";
						return t.stylize("[Function" + a + "]", "special");
					}
					if (v(r))
						return t.stylize(RegExp.prototype.toString.call(r), "regexp");
					if (S(r)) return t.stylize(Date.prototype.toString.call(r), "date");
					if (w(r)) return h(r);
				}
				var u,
					_ = "",
					A = !1,
					E = ["{", "}"];
				(p(r) && ((A = !0), (E = ["[", "]"])), I(r)) &&
					(_ = " [Function" + (r.name ? ": " + r.name : "") + "]");
				return (
					v(r) && (_ = " " + RegExp.prototype.toString.call(r)),
					S(r) && (_ = " " + Date.prototype.toUTCString.call(r)),
					w(r) && (_ = " " + h(r)),
					0 !== o.length || (A && 0 != r.length)
						? n < 0
							? v(r)
								? t.stylize(RegExp.prototype.toString.call(r), "regexp")
								: t.stylize("[Object]", "special")
							: (t.seen.push(r),
							  (u = A
									? (function (t, e, r, n, i) {
											for (var s = [], o = 0, f = e.length; o < f; ++o)
												k(e, String(o))
													? s.push(d(t, e, r, n, String(o), !0))
													: s.push("");
											return (
												i.forEach(function (i) {
													i.match(/^\d+$/) || s.push(d(t, e, r, n, i, !0));
												}),
												s
											);
									  })(t, r, n, f, o)
									: o.map(function (e) {
											return d(t, r, n, f, e, A);
									  })),
							  t.seen.pop(),
							  (function (t, e, r) {
									if (
										t.reduce(function (t, e) {
											return (
												e.indexOf("\n") >= 0 && 0,
												t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
											);
										}, 0) > 60
									)
										return (
											r[0] +
											("" === e ? "" : e + "\n ") +
											" " +
											t.join(",\n  ") +
											" " +
											r[1]
										);
									return r[0] + e + " " + t.join(", ") + " " + r[1];
							  })(u, _, E))
						: E[0] + _ + E[1]
				);
			}
			function h(t) {
				return "[" + Error.prototype.toString.call(t) + "]";
			}
			function d(t, e, r, n, i, s) {
				var o, f, a;
				if (
					((a = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }).get
						? (f = a.set
								? t.stylize("[Getter/Setter]", "special")
								: t.stylize("[Getter]", "special"))
						: a.set && (f = t.stylize("[Setter]", "special")),
					k(n, i) || (o = "[" + i + "]"),
					f ||
						(t.seen.indexOf(a.value) < 0
							? (f = b(r) ? c(t, a.value, null) : c(t, a.value, r - 1)).indexOf(
									"\n"
							  ) > -1 &&
							  (f = s
									? f
											.split("\n")
											.map(function (t) {
												return "  " + t;
											})
											.join("\n")
											.substr(2)
									: "\n" +
									  f
											.split("\n")
											.map(function (t) {
												return "   " + t;
											})
											.join("\n"))
							: (f = t.stylize("[Circular]", "special"))),
					y(o))
				) {
					if (s && i.match(/^\d+$/)) return f;
					(o = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
						? ((o = o.substr(1, o.length - 2)), (o = t.stylize(o, "name")))
						: ((o = o
								.replace(/'/g, "\\'")
								.replace(/\\"/g, '"')
								.replace(/(^"|"$)/g, "'")),
						  (o = t.stylize(o, "string")));
				}
				return o + ": " + f;
			}
			function p(t) {
				return Array.isArray(t);
			}
			function l(t) {
				return "boolean" == typeof t;
			}
			function b(t) {
				return null === t;
			}
			function m(t) {
				return "number" == typeof t;
			}
			function g(t) {
				return "string" == typeof t;
			}
			function y(t) {
				return void 0 === t;
			}
			function v(t) {
				return _(t) && "[object RegExp]" === A(t);
			}
			function _(t) {
				return "object" == typeof t && null !== t;
			}
			function S(t) {
				return _(t) && "[object Date]" === A(t);
			}
			function w(t) {
				return _(t) && ("[object Error]" === A(t) || t instanceof Error);
			}
			function I(t) {
				return "function" == typeof t;
			}
			function A(t) {
				return Object.prototype.toString.call(t);
			}
			function E(t) {
				return t < 10 ? "0" + t.toString(10) : t.toString(10);
			}
			(e.debuglog = function (r) {
				if (
					(y(s) && (s = t.env.NODE_DEBUG || ""), (r = r.toUpperCase()), !o[r])
				)
					if (new RegExp("\\b" + r + "\\b", "i").test(s)) {
						var n = t.pid;
						o[r] = function () {
							var t = e.format.apply(e, arguments);
							console.error("%s %d: %s", r, n, t);
						};
					} else o[r] = function () {};
				return o[r];
			}),
				(e.inspect = f),
				(f.colors = {
					bold: [1, 22],
					italic: [3, 23],
					underline: [4, 24],
					inverse: [7, 27],
					white: [37, 39],
					grey: [90, 39],
					black: [30, 39],
					blue: [34, 39],
					cyan: [36, 39],
					green: [32, 39],
					magenta: [35, 39],
					red: [31, 39],
					yellow: [33, 39],
				}),
				(f.styles = {
					special: "cyan",
					number: "yellow",
					boolean: "yellow",
					undefined: "grey",
					null: "bold",
					string: "green",
					date: "magenta",
					regexp: "red",
				}),
				(e.isArray = p),
				(e.isBoolean = l),
				(e.isNull = b),
				(e.isNullOrUndefined = function (t) {
					return null == t;
				}),
				(e.isNumber = m),
				(e.isString = g),
				(e.isSymbol = function (t) {
					return "symbol" == typeof t;
				}),
				(e.isUndefined = y),
				(e.isRegExp = v),
				(e.isObject = _),
				(e.isDate = S),
				(e.isError = w),
				(e.isFunction = I),
				(e.isPrimitive = function (t) {
					return (
						null === t ||
						"boolean" == typeof t ||
						"number" == typeof t ||
						"string" == typeof t ||
						"symbol" == typeof t ||
						void 0 === t
					);
				}),
				(e.isBuffer = r(90));
			var P = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];
			function O() {
				var t = new Date(),
					e = [E(t.getHours()), E(t.getMinutes()), E(t.getSeconds())].join(":");
				return [t.getDate(), P[t.getMonth()], e].join(" ");
			}
			function k(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}
			(e.log = function () {
				console.log("%s - %s", O(), e.format.apply(e, arguments));
			}),
				(e.inherits = r(11)),
				(e._extend = function (t, e) {
					if (!e || !_(e)) return t;
					for (var r = Object.keys(e), n = r.length; n--; ) t[r[n]] = e[r[n]];
					return t;
				});
			var R =
				"undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;
			function M(t, e) {
				if (!t) {
					var r = new Error("Promise was rejected with a falsy value");
					(r.reason = t), (t = r);
				}
				return e(t);
			}
			(e.promisify = function (t) {
				if ("function" != typeof t)
					throw new TypeError(
						'The "original" argument must be of type Function'
					);
				if (R && t[R]) {
					var e;
					if ("function" != typeof (e = t[R]))
						throw new TypeError(
							'The "util.promisify.custom" argument must be of type Function'
						);
					return (
						Object.defineProperty(e, R, {
							value: e,
							enumerable: !1,
							writable: !1,
							configurable: !0,
						}),
						e
					);
				}
				function e() {
					for (
						var e,
							r,
							n = new Promise(function (t, n) {
								(e = t), (r = n);
							}),
							i = [],
							s = 0;
						s < arguments.length;
						s++
					)
						i.push(arguments[s]);
					i.push(function (t, n) {
						t ? r(t) : e(n);
					});
					try {
						t.apply(this, i);
					} catch (t) {
						r(t);
					}
					return n;
				}
				return (
					Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
					R &&
						Object.defineProperty(e, R, {
							value: e,
							enumerable: !1,
							writable: !1,
							configurable: !0,
						}),
					Object.defineProperties(e, n(t))
				);
			}),
				(e.promisify.custom = R),
				(e.callbackify = function (e) {
					if ("function" != typeof e)
						throw new TypeError(
							'The "original" argument must be of type Function'
						);
					function r() {
						for (var r = [], n = 0; n < arguments.length; n++)
							r.push(arguments[n]);
						var i = r.pop();
						if ("function" != typeof i)
							throw new TypeError("The last argument must be of type Function");
						var s = this,
							o = function () {
								return i.apply(s, arguments);
							};
						e.apply(this, r).then(
							function (e) {
								t.nextTick(o, null, e);
							},
							function (e) {
								t.nextTick(M, e, o);
							}
						);
					}
					return (
						Object.setPrototypeOf(r, Object.getPrototypeOf(e)),
						Object.defineProperties(r, n(e)),
						r
					);
				});
		}.call(this, r(36)));
	},
	function (t, e) {
		t.exports = function (t) {
			return (
				t &&
				"object" == typeof t &&
				"function" == typeof t.copy &&
				"function" == typeof t.fill &&
				"function" == typeof t.readUInt8
			);
		};
	},
	function (t, e, r) {
		"use strict";
		const n = r(92),
			i = r(48),
			s = r(93);
		function o(t, e) {
			switch (i(t)) {
				case "object":
					return (function (t, e) {
						if ("function" == typeof e) return e(t);
						if (e || s(t)) {
							const r = new t.constructor();
							for (let n in t) r[n] = o(t[n], e);
							return r;
						}
						return t;
					})(t, e);
				case "array":
					return (function (t, e) {
						const r = new t.constructor(t.length);
						for (let n = 0; n < t.length; n++) r[n] = o(t[n], e);
						return r;
					})(t, e);
				default:
					return n(t);
			}
		}
		t.exports = o;
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			/*!
			 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
			 *
			 * Copyright (c) 2015-present, Jon Schlinkert.
			 * Released under the MIT License.
			 */
			const n = Symbol.prototype.valueOf,
				i = r(48);
			t.exports = function (t, r) {
				switch (i(t)) {
					case "array":
						return t.slice();
					case "object":
						return Object.assign({}, t);
					case "date":
						return new t.constructor(Number(t));
					case "map":
						return new Map(t);
					case "set":
						return new Set(t);
					case "buffer":
						return (function (t) {
							const r = t.length,
								n = e.allocUnsafe ? e.allocUnsafe(r) : e.from(r);
							return t.copy(n), n;
						})(t);
					case "symbol":
						return (function (t) {
							return n ? Object(n.call(t)) : {};
						})(t);
					case "arraybuffer":
						return (function (t) {
							const e = new t.constructor(t.byteLength);
							return new Uint8Array(e).set(new Uint8Array(t)), e;
						})(t);
					case "float32array":
					case "float64array":
					case "int16array":
					case "int32array":
					case "int8array":
					case "uint16array":
					case "uint32array":
					case "uint8clampedarray":
					case "uint8array":
						return (function (t, e) {
							return new t.constructor(t.buffer, t.byteOffset, t.length);
						})(t);
					case "regexp":
						return (function (t) {
							const e = void 0 !== t.flags ? t.flags : /\w+$/.exec(t) || void 0,
								r = new t.constructor(t.source, e);
							return (r.lastIndex = t.lastIndex), r;
						})(t);
					case "error":
						return Object.create(t);
					default:
						return t;
				}
			};
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		/*!
		 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
		 *
		 * Copyright (c) 2014-2017, Jon Schlinkert.
		 * Released under the MIT License.
		 */ var n = r(94);
		function i(t) {
			return (
				!0 === n(t) && "[object Object]" === Object.prototype.toString.call(t)
			);
		}
		t.exports = function (t) {
			var e, r;
			return (
				!1 !== i(t) &&
				"function" == typeof (e = t.constructor) &&
				!1 !== i((r = e.prototype)) &&
				!1 !== r.hasOwnProperty("isPrototypeOf")
			);
		};
	},
	function (t, e, r) {
		"use strict";
		/*!
		 * isobject <https://github.com/jonschlinkert/isobject>
		 *
		 * Copyright (c) 2014-2017, Jon Schlinkert.
		 * Released under the MIT License.
		 */ t.exports = function (t) {
			return null != t && "object" == typeof t && !1 === Array.isArray(t);
		};
	},
	function (t, e, r) {
		"use strict";
		var n = r(11),
			i = r(2),
			s = r(25),
			o = r(17),
			f = r(16),
			a = r(10),
			u = r(9),
			c = r(26);
		function h() {
			s.apply(this, arguments);
		}
		n(h, s),
			(h.prototype.getSignatures = function (t, e, r, n) {
				i.checkState(this.output instanceof o),
					(n = n || u.SIGHASH_ALL | u.SIGHASH_FORKID);
				var s = e.toPublicKey();
				return s.toString() ===
					this.output.script.getPublicKey().toString("hex")
					? [
							new c({
								publicKey: s,
								prevTxId: this.prevTxId,
								outputIndex: this.outputIndex,
								inputIndex: r,
								signature: f.sign(
									t,
									e,
									n,
									r,
									this.output.script,
									this.output.satoshisBN
								),
								sigtype: n,
							}),
					  ]
					: [];
			}),
			(h.prototype.addSignature = function (t, e) {
				return (
					i.checkState(this.isValidSignature(t, e), "Signature is invalid"),
					this.setScript(a.buildPublicKeyIn(e.signature.toDER(), e.sigtype)),
					this
				);
			}),
			(h.prototype.clearSignatures = function () {
				return this.setScript(a.empty()), this;
			}),
			(h.prototype.isFullySigned = function () {
				return this.script.isPublicKeyIn();
			}),
			(h.SCRIPT_MAX_SIZE = 74),
			(h.prototype._estimateSize = function () {
				return s.BASE_SIZE + h.SCRIPT_MAX_SIZE;
			}),
			(t.exports = h);
	},
	function (t, e, r) {
		"use strict";
		var n = r(11),
			i = r(2),
			s = r(5),
			o = r(25),
			f = r(17),
			a = r(16),
			u = r(10),
			c = r(9),
			h = r(26);
		function d() {
			o.apply(this, arguments);
		}
		n(d, o),
			(d.prototype.getSignatures = function (t, e, r, n, o) {
				return (
					i.checkState(this.output instanceof f),
					(o = o || s.sha256ripemd160(e.publicKey.toBuffer())),
					(n = n || c.SIGHASH_ALL | c.SIGHASH_FORKID),
					o.equals(this.output.script.getPublicKeyHash())
						? [
								new h({
									publicKey: e.publicKey,
									prevTxId: this.prevTxId,
									outputIndex: this.outputIndex,
									inputIndex: r,
									signature: a.sign(
										t,
										e,
										n,
										r,
										this.output.script,
										this.output.satoshisBN
									),
									sigtype: n,
								}),
						  ]
						: []
				);
			}),
			(d.prototype.addSignature = function (t, e) {
				return (
					i.checkState(this.isValidSignature(t, e), "Signature is invalid"),
					this.setScript(
						u.buildPublicKeyHashIn(e.publicKey, e.signature.toDER(), e.sigtype)
					),
					this
				);
			}),
			(d.prototype.clearSignatures = function () {
				return this.setScript(u.empty()), this;
			}),
			(d.prototype.isFullySigned = function () {
				return this.script.isPublicKeyHashIn();
			}),
			(d.SCRIPT_MAX_SIZE = 108),
			(d.prototype._estimateSize = function () {
				return o.BASE_SIZE + d.SCRIPT_MAX_SIZE;
			}),
			(t.exports = d);
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(11),
				s = r(25),
				o = r(17),
				f = r(2),
				a = r(10),
				u = r(9),
				c = r(16),
				h = r(26),
				d = r(13),
				p = r(24);
			function l(t, e, r, i) {
				s.apply(this, arguments);
				var o = this;
				(e = e || t.publicKeys),
					(r = r || t.threshold),
					(i = i || t.signatures),
					(this.publicKeys = e
						.map((t) => t.toString("hex"))
						.sort()
						.map((t) => new d(t))),
					f.checkState(
						a.buildMultisigOut(this.publicKeys, r).equals(this.output.script),
						"Provided public keys don't match to the provided output script"
					),
					(this.publicKeyIndex = {}),
					n.each(this.publicKeys, function (t, e) {
						o.publicKeyIndex[t.toString()] = e;
					}),
					(this.threshold = r),
					(this.signatures = i
						? this._deserializeSignatures(i)
						: new Array(this.publicKeys.length));
			}
			i(l, s),
				(l.prototype.toObject = function () {
					var t = s.prototype.toObject.apply(this, arguments);
					return (
						(t.threshold = this.threshold),
						(t.publicKeys = n.map(this.publicKeys, function (t) {
							return t.toString();
						})),
						(t.signatures = this._serializeSignatures()),
						t
					);
				}),
				(l.prototype._deserializeSignatures = function (t) {
					return n.map(t, function (t) {
						if (t) return new h(t);
					});
				}),
				(l.prototype._serializeSignatures = function () {
					return n.map(this.signatures, function (t) {
						if (t) return t.toObject();
					});
				}),
				(l.prototype.getSignatures = function (t, e, r, i) {
					f.checkState(this.output instanceof o),
						(i = i || u.SIGHASH_ALL | u.SIGHASH_FORKID);
					var s = this,
						a = [];
					return (
						n.each(this.publicKeys, function (n) {
							n.toString() === e.publicKey.toString() &&
								a.push(
									new h({
										publicKey: e.publicKey,
										prevTxId: s.prevTxId,
										outputIndex: s.outputIndex,
										inputIndex: r,
										signature: c.sign(
											t,
											e,
											i,
											r,
											s.output.script,
											s.output.satoshisBN
										),
										sigtype: i,
									})
								);
						}),
						a
					);
				}),
				(l.prototype.addSignature = function (t, e) {
					return (
						f.checkState(
							!this.isFullySigned(),
							"All needed signatures have already been added"
						),
						f.checkArgument(
							!n.isUndefined(this.publicKeyIndex[e.publicKey.toString()]),
							"Signature has no matching public key"
						),
						f.checkState(this.isValidSignature(t, e)),
						(this.signatures[this.publicKeyIndex[e.publicKey.toString()]] = e),
						this._updateScript(),
						this
					);
				}),
				(l.prototype._updateScript = function () {
					return (
						this.setScript(
							a.buildMultisigIn(
								this.publicKeys,
								this.threshold,
								this._createSignatures()
							)
						),
						this
					);
				}),
				(l.prototype._createSignatures = function () {
					return n.map(
						n.filter(this.signatures, function (t) {
							return !n.isUndefined(t);
						}),
						function (t) {
							return e.concat([t.signature.toDER(), e.from([255 & t.sigtype])]);
						}
					);
				}),
				(l.prototype.clearSignatures = function () {
					(this.signatures = new Array(this.publicKeys.length)),
						this._updateScript();
				}),
				(l.prototype.isFullySigned = function () {
					return this.countSignatures() === this.threshold;
				}),
				(l.prototype.countMissingSignatures = function () {
					return this.threshold - this.countSignatures();
				}),
				(l.prototype.countSignatures = function () {
					return n.reduce(
						this.signatures,
						function (t, e) {
							return t + !!e;
						},
						0
					);
				}),
				(l.prototype.publicKeysWithoutSignature = function () {
					var t = this;
					return n.filter(this.publicKeys, function (e) {
						return !t.signatures[t.publicKeyIndex[e.toString()]];
					});
				}),
				(l.prototype.isValidSignature = function (t, e) {
					return (
						(e.signature.nhashtype = e.sigtype),
						c.verify(
							t,
							e.signature,
							e.publicKey,
							e.inputIndex,
							this.output.script,
							this.output.satoshisBN
						)
					);
				}),
				(l.normalizeSignatures = function (t, e, r, n, i) {
					return i.map(function (i) {
						var s = null;
						return (
							(n = n.filter(function (n) {
								if (s) return !0;
								var o = new h({
									signature: u.fromTxFormat(n),
									publicKey: i,
									prevTxId: e.prevTxId,
									outputIndex: e.outputIndex,
									inputIndex: r,
									sigtype: u.SIGHASH_ALL,
								});
								return (
									(o.signature.nhashtype = o.sigtype),
									!c.verify(
										t,
										o.signature,
										o.publicKey,
										o.inputIndex,
										e.output.script
									) || ((s = o), !1)
								);
							})),
							s || null
						);
					});
				}),
				(l.SIGNATURE_SIZE = 73),
				(l.prototype._estimateSize = function () {
					var t = 1 + this.threshold * l.SIGNATURE_SIZE;
					return s.BASE_SIZE + p(t).toBuffer().length + t;
				}),
				(t.exports = l);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(11),
				s = r(25),
				o = r(17),
				f = r(2),
				a = r(10),
				u = r(9),
				c = r(16),
				h = r(26),
				d = r(13),
				p = r(24);
			function l(t, e, r, i) {
				s.apply(this, arguments);
				var o = this;
				(e = e || t.publicKeys),
					(r = r || t.threshold),
					(i = i || t.signatures),
					(this.publicKeys = e
						.map((t) => t.toString("hex"))
						.sort()
						.map((t) => new d(t))),
					(this.redeemScript = a.buildMultisigOut(this.publicKeys, r)),
					f.checkState(
						a.buildScriptHashOut(this.redeemScript).equals(this.output.script),
						"Provided public keys don't hash to the provided output"
					),
					(this.publicKeyIndex = {}),
					n.each(this.publicKeys, function (t, e) {
						o.publicKeyIndex[t.toString()] = e;
					}),
					(this.threshold = r),
					(this.signatures = i
						? this._deserializeSignatures(i)
						: new Array(this.publicKeys.length));
			}
			i(l, s),
				(l.prototype.toObject = function () {
					var t = s.prototype.toObject.apply(this, arguments);
					return (
						(t.threshold = this.threshold),
						(t.publicKeys = n.map(this.publicKeys, function (t) {
							return t.toString();
						})),
						(t.signatures = this._serializeSignatures()),
						t
					);
				}),
				(l.prototype._deserializeSignatures = function (t) {
					return n.map(t, function (t) {
						if (t) return new h(t);
					});
				}),
				(l.prototype._serializeSignatures = function () {
					return n.map(this.signatures, function (t) {
						if (t) return t.toObject();
					});
				}),
				(l.prototype.getSignatures = function (t, e, r, i) {
					f.checkState(this.output instanceof o),
						(i = i || u.SIGHASH_ALL | u.SIGHASH_FORKID);
					var s = this,
						a = [];
					return (
						n.each(this.publicKeys, function (n) {
							n.toString() === e.publicKey.toString() &&
								a.push(
									new h({
										publicKey: e.publicKey,
										prevTxId: s.prevTxId,
										outputIndex: s.outputIndex,
										inputIndex: r,
										signature: c.sign(
											t,
											e,
											i,
											r,
											s.redeemScript,
											s.output.satoshisBN
										),
										sigtype: i,
									})
								);
						}),
						a
					);
				}),
				(l.prototype.addSignature = function (t, e) {
					return (
						f.checkState(
							!this.isFullySigned(),
							"All needed signatures have already been added"
						),
						f.checkArgument(
							!n.isUndefined(this.publicKeyIndex[e.publicKey.toString()]),
							"Signature has no matching public key"
						),
						f.checkState(this.isValidSignature(t, e)),
						(this.signatures[this.publicKeyIndex[e.publicKey.toString()]] = e),
						this._updateScript(),
						this
					);
				}),
				(l.prototype._updateScript = function () {
					return (
						this.setScript(
							a.buildP2SHMultisigIn(
								this.publicKeys,
								this.threshold,
								this._createSignatures(),
								{ cachedMultisig: this.redeemScript }
							)
						),
						this
					);
				}),
				(l.prototype._createSignatures = function () {
					return n.map(
						n.filter(this.signatures, function (t) {
							return !n.isUndefined(t);
						}),
						function (t) {
							return e.concat([t.signature.toDER(), e.from([255 & t.sigtype])]);
						}
					);
				}),
				(l.prototype.clearSignatures = function () {
					(this.signatures = new Array(this.publicKeys.length)),
						this._updateScript();
				}),
				(l.prototype.isFullySigned = function () {
					return this.countSignatures() === this.threshold;
				}),
				(l.prototype.countMissingSignatures = function () {
					return this.threshold - this.countSignatures();
				}),
				(l.prototype.countSignatures = function () {
					return n.reduce(
						this.signatures,
						function (t, e) {
							return t + !!e;
						},
						0
					);
				}),
				(l.prototype.publicKeysWithoutSignature = function () {
					var t = this;
					return n.filter(this.publicKeys, function (e) {
						return !t.signatures[t.publicKeyIndex[e.toString()]];
					});
				}),
				(l.prototype.isValidSignature = function (t, e) {
					return (
						(e.signature.nhashtype = e.sigtype),
						c.verify(
							t,
							e.signature,
							e.publicKey,
							e.inputIndex,
							this.redeemScript,
							this.output.satoshisBN
						)
					);
				}),
				(l.SIGNATURE_SIZE = 73),
				(l.PUBKEY_SIZE = 34),
				(l.prototype._estimateSize = function () {
					var t = 3 + this.publicKeys.length * l.PUBKEY_SIZE,
						e =
							this.threshold * l.SIGNATURE_SIZE +
							1 +
							(t <= 75 ? 1 : t <= 255 ? 2 : 3) +
							t;
					return s.BASE_SIZE + p(e).toBuffer().length + e;
				}),
				(t.exports = l);
		}.call(this, r(0).Buffer));
	},
	function (t, e, r) {
		(t.exports = r(100)),
			(t.exports.BlockHeader = r(33)),
			(t.exports.MerkleBlock = r(51));
	},
	function (t, e, r) {
		"use strict";
		(function (e) {
			var n = r(1),
				i = r(33),
				s = r(3),
				o = r(15),
				f = r(14),
				a = r(5),
				u = r(31),
				c = r(2);
			function h(t) {
				return this instanceof h
					? (n.extend(this, h._from(t)), this)
					: new h(t);
			}
			(h.MAX_BLOCK_SIZE = 128e6),
				(h._from = function (t) {
					var r = {};
					if (e.isBuffer(t)) r = h._fromBufferReader(o(t));
					else {
						if (!n.isObject(t))
							throw new TypeError("Unrecognized argument for Block");
						r = h._fromObject(t);
					}
					return r;
				}),
				(h._fromObject = function (t) {
					var e = [];
					return (
						t.transactions.forEach(function (t) {
							t instanceof u ? e.push(t) : e.push(u().fromObject(t));
						}),
						{ header: i.fromObject(t.header), transactions: e }
					);
				}),
				(h.fromObject = function (t) {
					var e = h._fromObject(t);
					return new h(e);
				}),
				(h._fromBufferReader = function (t) {
					var e = {};
					c.checkState(!t.finished(), "No block data received"),
						(e.header = i.fromBufferReader(t));
					var r = t.readVarintNum();
					e.transactions = [];
					for (var n = 0; n < r; n++)
						e.transactions.push(u().fromBufferReader(t));
					return e;
				}),
				(h.fromBufferReader = function (t) {
					c.checkArgument(t, "br is required");
					var e = h._fromBufferReader(t);
					return new h(e);
				}),
				(h.fromBuffer = function (t) {
					return h.fromBufferReader(new o(t));
				}),
				(h.fromString = function (t) {
					var r = e.from(t, "hex");
					return h.fromBuffer(r);
				}),
				(h.fromRawBlock = function (t) {
					e.isBuffer(t) || (t = e.from(t, "binary"));
					var r = o(t);
					r.pos = h.Values.START_OF_BLOCK;
					var n = h._fromBufferReader(r);
					return new h(n);
				}),
				(h.prototype.toObject = h.prototype.toJSON =
					function () {
						var t = [];
						return (
							this.transactions.forEach(function (e) {
								t.push(e.toObject());
							}),
							{ header: this.header.toObject(), transactions: t }
						);
					}),
				(h.prototype.toBuffer = function () {
					return this.toBufferWriter().concat();
				}),
				(h.prototype.toString = function () {
					return this.toBuffer().toString("hex");
				}),
				(h.prototype.toBufferWriter = function (t) {
					t || (t = new f()),
						t.write(this.header.toBuffer()),
						t.writeVarintNum(this.transactions.length);
					for (var e = 0; e < this.transactions.length; e++)
						this.transactions[e].toBufferWriter(t);
					return t;
				}),
				(h.prototype.getTransactionHashes = function () {
					var t = [];
					if (0 === this.transactions.length) return [h.Values.NULL_HASH];
					for (var e = 0; e < this.transactions.length; e++)
						t.push(this.transactions[e]._getHash());
					return t;
				}),
				(h.prototype.getMerkleTree = function () {
					for (
						var t = this.getTransactionHashes(),
							r = 0,
							n = this.transactions.length;
						n > 1;
						n = Math.floor((n + 1) / 2)
					) {
						for (var i = 0; i < n; i += 2) {
							var s = Math.min(i + 1, n - 1),
								o = e.concat([t[r + i], t[r + s]]);
							t.push(a.sha256sha256(o));
						}
						r += n;
					}
					return t;
				}),
				(h.prototype.getMerkleRoot = function () {
					var t = this.getMerkleTree();
					return t[t.length - 1];
				}),
				(h.prototype.validMerkleRoot = function () {
					var t = new s(this.header.merkleRoot.toString("hex"), "hex"),
						e = new s(this.getMerkleRoot().toString("hex"), "hex");
					return 0 === t.cmp(e);
				}),
				(h.prototype._getHash = function () {
					return this.header._getHash();
				});
			var d = {
				configurable: !1,
				enumerable: !0,
				get: function () {
					return this._id || (this._id = this.header.id), this._id;
				},
				set: n.noop,
			};
			Object.defineProperty(h.prototype, "id", d),
				Object.defineProperty(h.prototype, "hash", d),
				(h.prototype.inspect = function () {
					return "<Block " + this.id + ">";
				}),
				(h.Values = {
					START_OF_BLOCK: 8,
					NULL_HASH: e.from(
						"0000000000000000000000000000000000000000000000000000000000000000",
						"hex"
					),
				}),
				(t.exports = h);
		}.call(this, r(0).Buffer));
	},
]);
