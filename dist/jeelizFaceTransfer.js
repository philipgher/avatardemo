 /**
  * Jeeliz Weboji - https://github.com/jeeliz/jeelizWeboji
  *
  * Copyright 2018 Jeeliz ( https://jeeliz.com )
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  * http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

 var JEEFACETRANSFERAPI = (function() {
   function ka(a) {
     var b = new XMLHttpRequest;
     b.open("GET", c.Qa + c.save, !0);
     b.withCredentials = !1;
     b.onreadystatechange = function() {
       4 === b.readyState && 200 === b.status && a(b.responseText)
     };
     b.send()
   }

   function na() {
     var a = c.tb,
       b = Array(a),
       d;
     for (d = 0; d < a; ++d) b[d] = 0;
     return b
   }

   function oa(a, b, d) {
     a = Math.min(Math.max((d - a) / (b - a), 0), 1);
     return a * a * (3 - 2 * a)
   }

   function qa(a, b, d) {
     return Math.min(Math.max((d - a) / (b - a), 0), 1)
   }

   function ra(a, b, d, e) {
     return Math.pow(Math.min(Math.max((e - a) / (b - a), 0), 1), d)
   }

   function sa(a) {
     switch (a) {
       case "relu":
         return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
       case "elu":
         return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
       case "elu01":
         return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
       case "arctan":
         return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
       case "copy":
         return "";
       default:
         return !1
     }
   }

   function wa(a, b) {
     var d = b % 8;
     return a[(b - d) / 8] >> 7 - d & 1
   }

   function xa(a) {
     var b = JSON.parse(a);
     a = b.ne;
     var d = b.nf,
       e = b.n,
       g = "undefined" === typeof btoa ? Buffer.from(b.data, "base64").toString("latin1") : atob(b.data),
       f = g.length,
       h;
     b = new Uint8Array(f);
     for (h = 0; h < f; ++h) b[h] = g.charCodeAt(h);
     g = new Float32Array(e);
     f = new Float32Array(d);
     h = a + d + 1;
     var m, r;
     for (m = 0; m < e; ++m) {
       var l = h * m;
       var v = 0 === wa(b, l) ? 1 : -1;
       var q = l + 1;
       var n = 1,
         A = 0;
       for (r = q + a - 1; r >= q; --r) A += n * wa(b, r), n *= 2;
       r = A;
       q = b;
       n = l + 1 + a;
       A = f;
       var x = 0,
         B = A.length;
       for (l = n; l < n + B; ++l) A[x] = wa(q, l), ++x;
       for (l = q = 0; l < d; ++l) q += f[l] * Math.pow(2, -l -
         1);
       v = 0 === q && 0 === r ? 0 : v * (1 + q) * Math.pow(2, 1 + r - Math.pow(2, a - 1));
       g[m] = v
     }
     return g
   }
   var p = function() {
       function a(a, b) {
         a = k.createShader(a);
         k.shaderSource(a, b);
         k.compileShader(a);
         return k.getShaderParameter(a, k.COMPILE_STATUS) ? a : !1
       }

       function b(b, d) {
         b = a(k.VERTEX_SHADER, b);
         d = a(k.FRAGMENT_SHADER, d);
         var f = k.createProgram();
         k.attachShader(f, b);
         k.attachShader(f, d);
         k.linkProgram(f);
         return f
       }

       function d(a) {
         void 0 === a.aa && (a.aa = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
         void 0 === a.da && (a.da = ["a0"]);
         void 0 === a.V && (a.V = [2]);
         if (void 0 === a.precision || "highp" === a.precision) a.precision = r;
         a.id = h++;
         void 0 !== a.Pc && a.Pc.forEach(function(b, d) {
           a.c = a.c.replace(b, a.qa[d])
         });
         a.Pa = 0;
         a.V.forEach(function(b) {
           a.Pa += 4 * b
         });
         a.pa = b(a.aa, "precision " + a.precision + " float;\n" + a.c);
         a.l = {};
         a.f.forEach(function(b) {
           a.l[b] = k.getUniformLocation(a.pa, b)
         });
         a.attributes = {};
         a.W = [];
         a.da.forEach(function(b) {
           var d = k.getAttribLocation(a.pa, b);
           a.attributes[b] = d;
           a.W.push(d)
         });
         if (a.h) {
           k.useProgram(a.pa);
           f = a;
           g = a.id;
           for (var d in a.h) k.uniform1i(a.l[d], a.h[d])
         }
         a.Fd = !0
       }

       function e(a) {
         ya.Uc(C);
         g !== a.id && (C.M(), g = a.id, f = a, k.useProgram(a.pa), a.W.forEach(function(a) {
           0 !== a && k.enableVertexAttribArray(a)
         }))
       }
       var g = -1,
         f = !1,
         h = 0,
         m = !1,
         r = "highp",
         l = ["u1"],
         v = ["u0"],
         q = {
           u1: 0
         },
         n = {
           u0: 0
         },
         A = {
           u1: 0,
           u2: 1
         },
         x = {
           u3: 0
         },
         B = {
           s0: {
             c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
             f: l,
             h: q
           },
           s1: {
             c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
             f: l,
             h: q,
             precision: "lowp"
           },
           s2: {
             c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
             f: ["u1", "u2"],
             h: A
           },
           s3: {
             c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
             f: l,
             h: q
           },
           s4: {
             c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
             f: ["u1", "mask"],
             h: A
           },
           s5: {
             c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
             f: l,
             h: q
           },
           s6: {
             c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
             f: l,
             h: q
           },
           s7: {
             c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
             f: ["u0", "u4"],
             h: n
           },
           s8: {
             c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}",
             f: ["u0", "u4"],
             h: n
           },
           s9: {
             c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
             f: l,
             h: q
           },
           s10: {
             c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",
             f: ["u1", "u5", "u6"],
             h: {
               u1: 0,
               u5: 1
             }
           },
           s11: {
             c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",
             f: ["u1", "u7"],
             h: q
           },
           s12: {
             c: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
             f: ["u1", "u8"],
             h: q
           },
           s13: {
             c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
             f: v,
             h: n
           },
           s14: {
             c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}",
             f: v,
             h: n
           },
           s15: {
             c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",
             f: v,
             h: n
           },
           s16: {
             c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
             f: v,
             h: n
           },
           s17: {
             c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
             f: ["u0", "u6", "u9"],
             h: {
               u0: 0,
               u6: 1,
               u9: 2
             }
           },
           s18: {
             c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
             f: v,
             h: n
           },
           s19: {
             c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
             f: v,
             h: n
           },
           s20: {
             c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}",
             f: ["u0", "u10"],
             h: n
           },
           s21: {
             c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
             f: ["u0", "u13", "u12"],
             h: {
               u0: 0,
               u13: 1
             }
           },
           s22: {
             c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
             f: ["u1", "u14"],
             h: q
           },
           s23: {
             c: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}",
             f: ["u15", "u16", "u17"],
             h: {
               u16: 0,
               u15: 1,
               u17: 2
             }
           },
           s24: {
             c: "uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}",
             f: ["u16", "u15", "u18"],
             h: {
               u16: 0,
               u15: 1
             }
           },
           s25: {
             c: "uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
             f: "u15 u16 u18 u22 u19 u20 u21".split(" "),
             h: {
               u16: 0,
               u15: 1,
               u22: 3,
               u19: 4,
               u20: 5,
               u21: 6
             }
           },
           s26: {
             c: "uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}",
             f: "u15 u16 u18 u24 u25 u26 u23".split(" "),
             h: {
               u16: 0,
               u15: 1,
               u23: 2
             }
           },
           s27: {
             c: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}",
             f: ["u15", "u16"],
             h: {
               u16: 0,
               u15: 1
             }
           },
           s28: {
             c: "uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}",
             f: ["u1", "u23", "u27"],
             h: {
               u1: 0,
               u23: 1
             }
           },
           s29: {
             c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
             f: l,
             h: q,
             precision: "lowp"
           },
           s30: {
             c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
             f: ["u1", "u2", "u28"],
             h: A
           },
           s31: {
             c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u28,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}",
             f: ["u1", "u2", "u28"],
             h: A
           },
           s32: {
             c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
             f: ["u3", "u7"],
             h: x
           },
           s33: {
             c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
             f: ["u3", "u7"],
             h: x
           },
           s34: {
             c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
             f: ["u1"],
             h: q,
             precision: "lowp"
           },
           s35: {
             c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
             f: ["u7", "u1"],
             h: q,
             precision: "lowp"
           },
           s36: {
             c: "uniform sampler2D u1,u29,u30;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u29,vv0),b=texture2D(u30,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
             f: ["u1", "u29", "u30"],
             h: {
               u1: 0,
               u29: 1,
               u30: 2
             }
           }
         },
         E = {
           s37: {
             c: "uniform float u18,u31;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 o=vec2(0.,0.),h=vec2(1.,1.),i=vec2(.5,.5),m=vec2(.01,.01);void main(){vec4 j=texture2D(u23,vv0);float f=1.1111;vec2 a,l,b=o,c=m/u18,k=floor(vv0*u18+c);float p=f*u18;vec2 n=h*(f-1.)/2.;for(float d=0.;d<1.1111;d+=1.){b.x=d;for(float e=0.;e<1.1111;e+=1.)b.y=e,a=(k+i+u31*(b-n))/u18,a+=step(a,-c),a-=step(h-c,a),l=(k*f+b+i)/p,j+=texture2D(u15,l)*texture2D(u16,a);}gl_FragColor=j,gl_FragColor*=2.2222;}",
             f: ["u18", "u15", "u16", "u23", "u31"],
             qa: ["1.1111", "gl_FragColor\\*=2.2222;"]
           },
           s38: {
             c: "uniform float u18,u31,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 m=vec2(0.,0.),j=vec2(1.,1.),n=vec2(.5,.5),u=vec2(.01,.01);void main(){vec4 p=texture2D(u23,vv0);float q=1.1111,i=3.3333;vec2 a,s,t,r,b=m,c=m,d=u/u26,o=floor(vv0*u18+d);float k=q*u26;vec2 v=j*(q-1.)/2.;float w=k/u18;vec2 x=o*i;for(float g=0.;g<1.1111;g+=1.){b.x=g;for(float f=0.;f<1.1111;f+=1.){b.y=f;for(float h=0.;h<3.3333;h+=1.){c.x=h;for(float e=0.;e<3.3333;e+=1.)c.y=e,t=x+c+i*u31*(b-v),a=(t+n)/u26,a+=step(a,-d),a-=step(j-d,a),r=b*i+c,s=(o*w+r+n)/k,p+=texture2D(u15,s)*texture2D(u16,a);}}}gl_FragColor=p,gl_FragColor*=2.2222;}",
             f: "u18 u26 u15 u16 u23 u31".split(" "),
             qa: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
           }
         },
         C = {
           Ia: function() {
             return m
           },
           i: function() {
             if (!m) {
               r = "highp";
               for (var a in B) d(B[a], a);
               p.set("s0");
               k.enableVertexAttribArray(0);
               a = za.i();
               m = !0;
               return a
             }
           },
           Nb: function(a) {
             a.forEach(function(a) {
               C.Mb(a)
             })
           },
           Mb: function(a) {
             B[a.id] = a;
             d(a, a.id)
           },
           jb: function(a, b, f) {
             b || (b = a);
             B[b] = Object.create(E[a]);
             E[a].qa && E[a].qa.forEach(function(a, d) {
               B[b].c = B[b].c.replace(new RegExp(a, "g"), f[d])
             });
             d(B[b], b)
           },
           set: function(a) {
             e(B[a])
           },
           gc: function(a) {
             return "undefined" !==
               typeof B[a]
           },
           sd: function() {
             return f.pd
           },
           M: function() {
             -1 !== g && (g = -1, f.W.forEach(function(a) {
               0 !== a && k.disableVertexAttribArray(a)
             }))
           },
           Ma: function() {
             var a = 0;
             f.W.forEach(function(b, d) {
               d = f.V[d];
               k.vertexAttribPointer(b, d, k.FLOAT, !1, f.Pa, a);
               a += 4 * d
             })
           },
           od: function() {
             k.enableVertexAttribArray(0)
           },
           Na: function() {
             k.vertexAttribPointer(f.W[0], 2, k.FLOAT, !1, 8, 0)
           },
           Ud: function(a, b) {
             k.uniform1i(f.l[a], b)
           },
           A: function(a, b) {
             k.uniform1f(f.l[a], b)
           },
           H: function(a, b, d) {
             k.uniform2f(f.l[a], b, d)
           },
           Vd: function(a, b) {
             k.uniform2fv(f.l[a],
               b)
           },
           Wd: function(a, b) {
             k.uniform3fv(f.l[a], b)
           },
           Eb: function(a, b, d, e) {
             k.uniform3f(f.l[a], b, d, e)
           },
           Fb: function(a, b) {
             k.uniform4fv(f.l[a], b)
           },
           Xd: function(a, b) {
             k.uniformMatrix2fv(f.l[a], !1, b)
           },
           Yd: function(a, b) {
             k.uniformMatrix3fv(f.l[a], !1, b)
           },
           Zd: function(a, b) {
             k.uniformMatrix4fv(f.l[a], !1, b)
           },
           I: function(a, b) {
             C.set(a);
             b.forEach(function(a) {
               switch (a.type) {
                 case "4f":
                   k.uniform4fv(f.l[a.name], a.value);
                   break;
                 case "3f":
                   k.uniform3fv(f.l[a.name], a.value);
                   break;
                 case "2f":
                   k.uniform2fv(f.l[a.name], a.value);
                   break;
                 case "1f":
                   k.uniform1f(f.l[a.name],
                     a.value);
                   break;
                 case "1i":
                   k.uniform1i(f.l[a.name], a.value);
                   break;
                 case "mat2":
                   k.uniformMatrix2fv(f.l[a.name], !1, a.value);
                   break;
                 case "mat3":
                   k.uniformMatrix3fv(f.l[a.name], !1, a.value);
                   break;
                 case "mat4":
                   k.uniformMatrix4fv(f.l[a.name], !1, a.value)
               }
             })
           }
         };
       return C
     }(),
     k, Aa = function() {
       function a(a) {
         console.log("ERROR in ContextFeedForward : ", a);
         return !1
       }
       var b = !1,
         d = !1,
         e = !1,
         g = !1,
         f = !0,
         h = !1,
         m = {
           s: function() {
             return b.width
           },
           D: function() {
             return b.height
           },
           ia: function() {
             return b
           },
           rd: function() {
             return k
           },
           m: function() {
             return f
           },
           flush: function() {
             k.flush()
           },
           kc: function() {
             h || (h = new Uint8Array(b.width * b.height * 4));
             k.readPixels(0, 0, b.width, b.height, k.RGBA, k.UNSIGNED_BYTE, h);
             return h
           },
           ud: function() {
             return b.toDataURL("image/jpeg")
           },
           vd: function() {
             w.C();
             d || (d = document.createElement("canvas"), e = d.getContext("2d"));
             d.width = b.width;
             d.height = b.height;
             var a = m.kc(),
               f = e.createImageData(d.width, d.height),
               g, h, n = d.width,
               A = d.height,
               x = f.data;
             for (h = 0; h < A; ++h) {
               var B = A - h - 1;
               for (g = 0; g < n; ++g) {
                 var E = 4 * (h * n + g);
                 var C = 4 * (B * n + g);
                 x[E] = a[C];
                 x[E + 1] = a[C +
                   1];
                 x[E + 2] = a[C + 2];
                 x[E + 3] = a[C + 3]
               }
             }
             e.putImageData(f, 0, 0);
             return d.toDataURL("image/png")
           },
           td: function(a) {
             !d && a && (d = document.createElement("canvas"), e = d.getContext("2d"));
             var f = a ? d : document.createElement("canvas");
             f.width = b.width;
             f.height = b.height;
             (a ? e : f.getContext("2d")).drawImage(b, 0, 0);
             return f
           },
           i: function(d) {
             d.ab && !d.ga_ ? b = document.getElementById(d.ab) : d.ga_ && (b = d.ga_);
             b || (b = document.createElement("canvas"));
             b.width = d && void 0 !== d.width ? d.width : 512;
             b.height = d && void 0 !== d.height ? d.height : 512;
             "undefined" ===
             typeof d && (d = {});
             void 0 === d.premultipliedAlpha && (d.premultipliedAlpha = !1);
             void 0 === d.Ha && (d.Ha = !0);
             void 0 === d.antialias && (d.antialias = !1);
             var e = {
               antialias: d.antialias,
               alpha: !0,
               preserveDrawingBuffer: !0,
               premultipliedAlpha: d.premultipliedAlpha,
               stencil: !1,
               depth: d.Ha
             };
             (k = b.getContext("webgl2", e)) ? f = !0: ((k = b.getContext("webgl", e)) || (k = b.getContext("experimental-webgl", e)), f = !1);
             if (!k) return a("WebGL is not enabled");
             (g = k.getExtension("WEBGL_lose_context")) && b.addEventListener("webglcontextlost", d.Jc, !1);
             if (!y.i()) return a("Not enough capabilities");
             if (!y.Vb() && f) return a("Your configuration cannot process color buffer float");
             k.clearColor(0, 0, 0, 0);
             k.disable(k.DEPTH_TEST);
             k.disable(k.BLEND);
             k.disable(k.DITHER);
             k.disable(k.STENCIL_TEST);
             k.GENERATE_MIPMAP_HINT && k.hint(k.GENERATE_MIPMAP_HINT, k.FASTEST);
             k.disable(k.SAMPLE_ALPHA_TO_COVERAGE);
             k.disable(k.SAMPLE_COVERAGE);
             return !0
           },
           Ed: function() {
             if (!p.i()) return !1;
             k.depthFunc(k.LEQUAL);
             k.clearDepth(1);
             return !0
           }
         };
       return m
     }(),
     ya = function() {
       var a = "undefined" ===
         typeof p ? JEShaders : p;
       return {
         Uc: function(b) {
           a !== b && (a.M(), a = b)
         },
         Ia: function() {
           return a.Ia()
         },
         Na: function() {
           a.Na()
         },
         Ma: function() {
           a.Ma()
         },
         M: function() {
           a.M()
         },
         set: function(b) {
           a.set(b)
         }
       }
     }(),
     z = function() {
       var a, b, d = 0,
         e = -2,
         g = -2,
         f = !1,
         h = {
           reset: function() {
             g = e = -2
           },
           i: function() {
             f || (a = k.createBuffer(), k.bindBuffer(k.ARRAY_BUFFER, a), k.bufferData(k.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), k.STATIC_DRAW), b = k.createBuffer(), k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, b), k.bufferData(k.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,
               1, 2
             ]), k.STATIC_DRAW), h.ya(), f = !0)
           },
           a: function(a) {
             var b = d++,
               f = a.R.length,
               h = k.createBuffer();
             k.bindBuffer(k.ARRAY_BUFFER, h);
             k.bufferData(k.ARRAY_BUFFER, a.Ib instanceof Float32Array ? a.Ib : new Float32Array(a.Ib), k.STATIC_DRAW);
             e = b;
             if (a.R) {
               var m = k.createBuffer();
               k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, m);
               if (65536 > a.R.length) {
                 var n = Uint16Array;
                 var A = k.UNSIGNED_SHORT;
                 var x = 2
               } else n = Uint32Array, A = k.UNSIGNED_INT, x = 4;
               k.bufferData(k.ELEMENT_ARRAY_BUFFER, a.R instanceof n ? a.R : new n(a.R), k.STATIC_DRAW);
               g = b
             }
             var B = {
               Ub: function(a) {
                 e !==
                   b && (k.bindBuffer(k.ARRAY_BUFFER, h), e = b);
                 a && ya.Ma()
               },
               Sb: function() {
                 g !== b && (k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, m), g = b)
               },
               bind: function(a) {
                 B.Ub(a);
                 B.Sb()
               },
               md: function() {
                 k.drawElements(k.TRIANGLES, f, A, 0)
               },
               nd: function(a, b) {
                 k.drawElements(k.TRIANGLES, a, A, b * x)
               },
               remove: function() {
                 k.deleteBuffer(h);
                 a.R && k.deleteBuffer(m);
                 B = null
               }
             };
             return B
           },
           ya: function() {
             -1 !== e && (k.bindBuffer(k.ARRAY_BUFFER, a), e = -1); - 1 !== g && (k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, b), g = -1)
           },
           g: function(a, b) {
             a && z.ya();
             b && ya.Na();
             k.drawElements(k.TRIANGLES,
               3, k.UNSIGNED_SHORT, 0)
           },
           jc: function() {
             k.deleteBuffer(a);
             k.deleteBuffer(b)
           }
         };
       return h
     }(),
     w = function() {
       var a, b, d, e = !1,
         g = {
           o: -2,
           hc: 1
         };
       return {
         i: function() {
           if (!e) {
             a = k.createFramebuffer();
             var f = y.m();
             b = f && k.DRAW_FRAMEBUFFER ? k.DRAW_FRAMEBUFFER : k.FRAMEBUFFER;
             d = f && k.READ_FRAMEBUFFER ? k.READ_FRAMEBUFFER : k.FRAMEBUFFER;
             e = !0
           }
         },
         xd: function() {
           return b
         },
         Ca: function() {
           return d
         },
         O: function() {
           return k.FRAMEBUFFER
         },
         zd: function() {
           return g
         },
         qd: function() {
           return a
         },
         a: function(d) {
           void 0 === d.kb && (d.kb = !1);
           var f = d.$c ? d.$c : !1,
             e = d.width,
             r = void 0 !== d.height ? d.height : d.width,
             l = a,
             v = !1,
             q = !1,
             n = 0;
           f && (e = e ? e : f.s(), r = r ? r : f.D());
           var A = {
             Cb: function() {
               q || (l = k.createFramebuffer(), q = !0, n = g.hc++)
             },
             Lb: function() {
               A.Cb();
               A.j();
               v = k.createRenderbuffer();
               k.bindRenderbuffer(k.RENDERBUFFER, v);
               k.renderbufferStorage(k.RENDERBUFFER, k.DEPTH_COMPONENT16, e, r);
               k.framebufferRenderbuffer(b, k.DEPTH_ATTACHMENT, k.RENDERBUFFER, v);
               k.clearDepth(1)
             },
             bind: function(a, d) {
               n !== g.o && (k.bindFramebuffer(b, l), g.o = n);
               f && f.j();
               d && k.viewport(0, 0, e, r);
               a && k.clear(k.COLOR_BUFFER_BIT |
                 k.DEPTH_BUFFER_BIT)
             },
             fd: function() {
               n !== g.o && (k.bindFramebuffer(b, l), g.o = n)
             },
             clear: function() {
               k.clear(k.COLOR_BUFFER_BIT | k.DEPTH_BUFFER_BIT)
             },
             jd: function() {
               k.clear(k.COLOR_BUFFER_BIT)
             },
             kd: function() {
               k.clear(k.DEPTH_BUFFER_BIT)
             },
             Vc: function() {
               k.viewport(0, 0, e, r)
             },
             j: function() {
               n !== g.o && (k.bindFramebuffer(b, l), g.o = n)
             },
             rtt: function(a) {
               f = a;
               g.o !== n && (k.bindFramebuffer(k.FRAMEBUFFER, l), g.o = n);
               a.j()
             },
             C: function() {
               k.bindFramebuffer(b, null);
               g.o = -1
             },
             resize: function(a, b) {
               e = a;
               r = b;
               v && (k.bindRenderbuffer(k.RENDERBUFFER,
                 v), k.renderbufferStorage(k.RENDERBUFFER, k.DEPTH_COMPONENT16, e, r))
             },
             remove: function() {
               k.bindFramebuffer(b, l);
               k.framebufferTexture2D(b, k.COLOR_ATTACHMENT0, k.TEXTURE_2D, null, 0);
               v && k.framebufferRenderbuffer(b, k.DEPTH_ATTACHMENT, k.RENDERBUFFER, null);
               k.bindFramebuffer(b, null);
               k.deleteFramebuffer(l);
               v && k.deleteRenderbuffer(v);
               A = null
             }
           };
           d.kb && A.Lb();
           return A
         },
         C: function() {
           k.bindFramebuffer(b, null);
           g.o = -1
         },
         bd: function() {
           k.bindFramebuffer(b, null);
           k.clear(k.COLOR_BUFFER_BIT | k.DEPTH_BUFFER_BIT);
           k.viewport(0, 0,
             y.s(), y.D());
           g.o = -1
         },
         reset: function() {
           g.o = -2
         },
         G: function() {
           0 !== g.o && (k.bindFramebuffer(b, a), g.o = 0)
         },
         clear: function() {
           k.viewport(0, 0, y.s(), y.D());
           k.clear(k.COLOR_BUFFER_BIT)
         }
       }
     }(),
     H = function() {
       function a(a) {
         k.bindTexture(k.TEXTURE_2D, a)
       }

       function b(a) {
         K[0] = a;
         a = ca[0];
         var b = a >> 16 & 32768,
           d = a >> 12 & 2047,
           D = a >> 23 & 255;
         return 103 > D ? b : 142 < D ? b | 31744 | ((255 == D ? 0 : 1) && a & 8388607) : 113 > D ? (d |= 2048, b | (d >> 114 - D) + (d >> 113 - D & 1)) : b = (b | D - 112 << 10 | d >> 1) + (d & 1)
       }

       function d(a) {
         var d = new Uint16Array(a.length);
         a.forEach(function(a, D) {
           d[D] =
             b(a)
         });
         return d
       }

       function e() {
         if (null !== Q.Da) return Q.Da;
         var a = f(d([1, 1, 1, 1]));
         return null === a ? !0 : Q.Da = a
       }

       function g() {
         if (null !== Q.Ea) return Q.Ea;
         var a = f(new Uint8Array([255, 255, 255, 255]));
         return null === a ? !0 : Q.Ea = a
       }

       function f(a) {
         if (!ya.Ia() || !x) return null;
         a = J.a({
           isFloat: !1,
           B: !0,
           array: a,
           width: 1
         });
         w.C();
         k.viewport(0, 0, 1, 1);
         k.clearColor(0, 0, 0, 0);
         k.clear(k.COLOR_BUFFER_BIT);
         ya.set("s0");
         a.Xa(0);
         z.g(!1, !0);
         var b = new Uint8Array(4);
         k.readPixels(0, 0, 1, 1, k.RGBA, k.UNSIGNED_BYTE, b);
         b = .9 < b[0];
         a.remove();
         w.G();
         return b
       }
       var h = 0,
         m, r = 0,
         l, v = !1,
         q, n, A, x = !1,
         B = !1,
         E, C, F, W = [
           [1, 0, 0, 0],
           [0, 1, 0, 0],
           [0, 0, 1, 0],
           [0, 0, 0, 1]
         ],
         ba = !1,
         ha = !1,
         K = new Float32Array(1),
         ca = new Int32Array(K.buffer),
         Q = {
           Da: null,
           Ea: null
         },
         J = {
           i: function() {
             if (!x) {
               n = [k.RGB, !1, k.RGB, k.RGBA];
               A = [k.RGB, !1, k.RGB, k.RGBA];
               m = [k.TEXTURE0, k.TEXTURE1, k.TEXTURE2, k.TEXTURE3, k.TEXTURE4, k.TEXTURE5, k.TEXTURE6, k.TEXTURE7];
               ba = "undefined" !== typeof JEContext;
               ha = "undefined" !== typeof y;
               ba && JEContext.Md() && m.push(k.TEXTURE8, k.TEXTURE9);
               l = [-1, -1, -1, -1, -1, -1, -1, -1];
               q = [k.UNSIGNED_BYTE,
                 k.FLOAT, k.FLOAT
               ];
               if (!v) {
                 for (var a = new Float32Array(16384), b = 0; 16384 > b; ++b) a[b] = 2 * Math.random() - 1;
                 v = {
                   random: J.a({
                     isFloat: !0,
                     isPot: !0,
                     array: a,
                     width: 64
                   }),
                   Hb: J.a({
                     isFloat: !1,
                     isPot: !0,
                     width: 1,
                     array: new Uint8Array([0, 0, 0, 0])
                   })
                 }
               }
               x = !0
             }
           },
           sc: function() {
             J.cd()
           },
           Cd: function() {
             return v.Hb
           },
           cd: function() {
             q[1] = y.ja()
           },
           Rc: function() {
             A = n = [k.RGBA, k.RGBA, k.RGBA, k.RGBA]
           },
           Mc: function(a, b) {
             p.set("s1");
             w.C();
             var d = a.s(),
               D = a.D();
             k.viewport(0, 0, d, D);
             a.b(0);
             z.g(!1, !1);
             k.readPixels(0, 0, d, D, k.RGBA, k.UNSIGNED_BYTE, b)
           },
           ic: function(b,
             d, e) {
             k.activeTexture(k.TEXTURE0);
             h = 0;
             var D = k.createTexture();
             a(D);
             var f = y.m() && k.RGBA32F ? k.RGBA32F : k.FLOAT;
             d = d instanceof Float32Array ? d : new Float32Array(d);
             var g = Math.log(d.length) / Math.log(2);
             g !== Math.floor(g) && (k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE), k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE));
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, k.NEAREST);
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.NEAREST);
             k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, e);
             k.texImage2D(k.TEXTURE_2D, 0, k.RGBA, b.s(), b.D(), 0, k.RGBA, f, d);
             a(null);
             k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1);
             w.G();
             p.set("s0");
             b.u();
             k.clearColor(0, 0, 0, 0);
             k.clear(k.COLOR_BUFFER_BIT);
             a(D);
             z.g(!0, !1);
             k.deleteTexture(D)
           },
           a: function(b) {
             function f() {
               a(O);
               da && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, da);
               b.isPot ? (k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, b.mb ? k.MIRRORED_REPEAT : k.REPEAT), k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, b.J ? k.MIRRORED_REPEAT : k.REPEAT)) : (k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S,
                 k.CLAMP_TO_EDGE), k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE));
               b.la && "undefined" !== typeof JESETTINGS && k.texParameterf(k.TEXTURE_2D, JEContext.wd().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.ed);
               k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, b.isLinear ? k.LINEAR : k.NEAREST);
               b.isLinear ? k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, b.isMipmap && !la ? k.NEAREST_MIPMAP_LINEAR : k.LINEAR) : k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, b.isMipmap && !la ? k.NEAREST_MIPMAP_NEAREST : k.NEAREST);
               V =
                 n[b.$ - 1];
               P = A[b.$ - 1];
               X = q[v];
               if (y.m()) {
                 var d = k.RGBA32F;
                 V === k.RGBA && X === k.FLOAT && d && (P = d);
                 V === k.RGB && X === k.FLOAT && d && (P = d, V = k.RGBA)
               }
               if (b.B && !b.isFloat || b.isFloat && b.isMipmap && za.vc())(d = k.RGBA16F) && (P = d), X = y.ja();
               b.ob && "undefined" !== typeof k.texStorage2D && (ua = b.ob);
               b.nb && 4 === b.$ && (V = JEContext.Ad());
               if (b.v) k.texImage2D(k.TEXTURE_2D, 0, P, V, X, b.v);
               else if (b.url) k.texImage2D(k.TEXTURE_2D, 0, P, V, X, aa);
               else if (L) {
                 try {
                   var f = k.getError();
                   f !== k.NO_ERROR && console.log("GLERR in SharedTexture :", f);
                   k.texImage2D(k.TEXTURE_2D,
                     0, P, u, t, 0, V, X, L);
                   k.getError() !== k.NO_ERROR && (k.texImage2D(k.TEXTURE_2D, 0, P, u, t, 0, V, X, null), k.getError() !== k.NO_ERROR && k.texImage2D(k.TEXTURE_2D, 0, k.RGBA, u, t, 0, k.RGBA, k.UNSIGNED_BYTE, null))
                 } catch (fb) {
                   k.texImage2D(k.TEXTURE_2D, 0, P, u, t, 0, V, X, null)
                 }
                 b.isKeepArray || (L = null)
               } else k.texImage2D(k.TEXTURE_2D, 0, P, u, t, 0, V, X, null);
               if (b.isMipmap)
                 if (!la && M) M.Ba(), va = !0;
                 else if (la) {
                 f = Math.log(Math.min(u, t)) / Math.log(2);
                 pa = Array(1 + f);
                 pa[0] = O;
                 for (d = 1; d <= f; ++d) {
                   var e = Math.pow(2, d);
                   var g = u / e;
                   e = t / e;
                   var m = k.createTexture();
                   a(m);
                   k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.NEAREST);
                   k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, k.NEAREST);
                   k.texImage2D(k.TEXTURE_2D, 0, P, g, e, 0, V, X, null);
                   a(null);
                   pa[d] = m
                 }
                 va = !0
               }
               a(null);
               l[h] = -1;
               da && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1);
               S = !0;
               N && M && (N(M), N = !1)
             }
             "undefined" === typeof b.isFloat && (b.isFloat = !1);
             "undefined" === typeof b.B && (b.B = !1);
             "undefined" === typeof b.isPot && (b.isPot = !0);
             "undefined" === typeof b.isLinear && (b.isLinear = !1);
             "undefined" === typeof b.isMipmap && (b.isMipmap = !1);
             "undefined" === typeof b.za && (b.za = !1);
             void 0 === b.la && (b.la = !1);
             void 0 === b.J && (b.J = !1);
             void 0 === b.mb && (b.mb = !1);
             void 0 === b.nb && (b.nb = !1);
             void 0 === b.$ && (b.$ = 4);
             void 0 === b.lb && (b.lb = !1);
             "undefined" === typeof b.isFlipY && (b.isFlipY = b.url || b.array ? !0 : !1);
             "undefined" === typeof b.isKeepArray && (b.isKeepArray = !1);
             b.data && (b.array = "string" === typeof b.data ? xa(b.data) : b.isFloat ? new Float32Array(b.data) : new Uint8Array(b.data), b.isFlipY = !1);
             var v = 0,
               D = b.v ? !0 : !1,
               x = null,
               R = null,
               T = !1,
               Q = null;
             b.isFloat && (b.B = !0);
             b.B && (v =
               1);
             b.lb || y.m() || !b.isFloat || !ha || y.Za() || (b.isFloat = !1);
             b.isFloat && (v = 2);
             b.la && ba && !JEContext.Hd() && (b.la = !1);
             var O = k.createTexture(),
               N = b.za,
               aa = null,
               L = !1,
               u = 0,
               t = 0,
               S = !1,
               G = r++,
               ea = !1,
               K, ia, ca, ja, P, V, X, da = b.isFlipY,
               la = b.B && b.isMipmap && "undefined" !== typeof za && !za.Xb() ? !0 : !1,
               pa, ua = -1,
               va = !1;
             "undefined" !== typeof b.width && b.width && (u = b.width, t = "undefined" !== typeof b.height && b.height ? b.height : u);
             var M = {
               get: function() {
                 return O
               },
               s: function() {
                 return u
               },
               D: function() {
                 return t
               },
               Dd: function() {
                 return b.url
               },
               Id: function() {
                 return b.isFloat
               },
               Kd: function() {
                 return b.B
               },
               Ld: function() {
                 return b.isLinear
               },
               Ba: function() {
                 k.generateMipmap(k.TEXTURE_2D)
               },
               Ya: function(b, d) {
                 la ? (b || (b = M.fb()), M.xa(d), a(pa[b]), l[d] = -1) : M.b(d)
               },
               fb: function() {
                 -1 === ua && (ua = Math.log(u) / Math.log(2));
                 return ua
               },
               eb: function(b) {
                 if (la) {
                   b || (b = M.fb());
                   p.set("s11");
                   M.xa(0);
                   var d, f = u,
                     e = t;
                   for (d = 1; d <= b; ++d) f /= 2, e /= 2, p.H("u7", .25 / f, .25 / e), k.viewport(0, 0, f, e), a(pa[d - 1]), k.framebufferTexture2D(w.O(), k.COLOR_ATTACHMENT0, k.TEXTURE_2D, pa[d], 0), z.g(!1, 1 === d);
                   l[0] = -1
                 } else M.Ba()
               },
               xa: function(a) {
                 a !==
                   h && (k.activeTexture(m[a]), h = a)
               },
               b: function(b) {
                 if (!S) return !1;
                 M.xa(b);
                 if (l[b] === G) return !1;
                 a(O);
                 l[b] = G;
                 return !0
               },
               Xa: function(b) {
                 k.activeTexture(m[b]);
                 h = b;
                 a(O);
                 l[b] = G
               },
               j: function() {
                 k.framebufferTexture2D(w.O(), k.COLOR_ATTACHMENT0, k.TEXTURE_2D, O, 0)
               },
               u: function() {
                 k.viewport(0, 0, u, t);
                 k.framebufferTexture2D(w.O(), k.COLOR_ATTACHMENT0, k.TEXTURE_2D, O, 0)
               },
               be: function() {
                 k.framebufferTexture2D(w.O(), k.COLOR_ATTACHMENT0, k.TEXTURE_2D, null, 0)
               },
               resize: function(a, b) {
                 u = a;
                 t = b;
                 f()
               },
               clone: function(a) {
                 a = J.a({
                   width: u,
                   height: t,
                   B: b.B,
                   isFloat: b.isFloat,
                   isLinear: b.isLinear,
                   J: b.J,
                   isFlipY: a ? !da : da,
                   isPot: b.isPot
                 });
                 ya.set("s0");
                 w.G();
                 a.j();
                 k.viewport(0, 0, u, t);
                 M.b(0);
                 z.g(!0, !0);
                 return a
               },
               Vc: function() {
                 k.viewport(0, 0, u, t)
               },
               remove: function() {
                 k.deleteTexture(O);
                 M = null
               },
               refresh: function() {
                 M.Xa(0);
                 da && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !0);
                 D ? k.texImage2D(k.TEXTURE_2D, 0, P, V, k.UNSIGNED_BYTE, b.v) : k.texImage2D(k.TEXTURE_2D, 0, P, u, t, 0, V, X, L);
                 da && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1)
               },
               $a: function() {
                 var a = u * t * 4;
                 ia = [new Uint8Array(a), new Uint8Array(a),
                   new Uint8Array(a), new Uint8Array(a)
                 ];
                 K = [new Float32Array(ia[0].buffer), new Float32Array(ia[1].buffer), new Float32Array(ia[2].buffer), new Float32Array(ia[3].buffer)];
                 ca = new Uint8Array(4 * a);
                 ja = new Float32Array(ca.buffer);
                 ea = !0
               },
               Ab: function() {
                 ea || M.$a();
                 k.readPixels(0, 0, u, 4 * t, k.RGBA, k.UNSIGNED_BYTE, ca);
                 var a, b = u * t,
                   d = 2 * b,
                   f = 3 * b;
                 for (a = 0; a < b; ++a) K[0][a] = ja[a], K[1][a] = ja[a + b], K[2][a] = ja[a + d], K[3][a] = ja[a + f];
                 return K
               },
               bb: function() {
                 w.C();
                 p.set("s12");
                 M.b(0);
                 k.viewport(0, 0, u, 4 * t);
                 for (var a = 0; 4 > a; ++a) k.viewport(0,
                   t * a, u, t), p.Fb("u8", W[a]), z.g(!1, 0 === a)
               },
               ce: function(b) {
                 var d = X === q[0] && !g();
                 a(O);
                 da && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, da);
                 d ? (T || (x = document.createElement("canvas"), x.width = u, x.height = t, R = x.getContext("2d"), Q = R.createImageData(u, t), T = !0), Q.data.set(b), R.putImageData(Q, 0, 0), k.texImage2D(k.TEXTURE_2D, 0, P, V, X, x)) : k.texImage2D(k.TEXTURE_2D, 0, P, u, t, 0, V, X, b);
                 l[h] = G;
                 da && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1)
               },
               de: function(b, d) {
                 a(O);
                 k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, d);
                 k.texImage2D(k.TEXTURE_2D, 0, P, V,
                   X, b);
                 l[h] = G;
                 d && k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1)
               },
               Qd: function(a, d) {
                 var f = u * t,
                   e = 4 * f;
                 a = b.B ? a ? "RGBE" : "JSON" : "RGBA";
                 d && (a = d);
                 d = y.m() && !1;
                 switch (a) {
                   case "RGBE":
                     var g = "s39";
                     break;
                   case "JSON":
                     g = d ? "s0" : "s12";
                     break;
                   case "RGBA":
                   case "RGBAARRAY":
                     g = "s6"
                 }
                 ea || ("RGBA" === a || "RGBE" === a || "RGBAARRAY" === a ? (ia = new Uint8Array(e), ea = !0) : "JSON" !== a || d || M.$a());
                 w.C();
                 p.set(g);
                 M.b(0);
                 if ("RGBA" === a || "RGBE" === a || "RGBAARRAY" === a) {
                   k.viewport(0, 0, u, t);
                   z.g(!0, !0);
                   k.readPixels(0, 0, u, t, k.RGBA, k.UNSIGNED_BYTE, ia);
                   if ("RGBAARRAY" ===
                     a) return {
                     data: ia
                   };
                   B || (E = document.createElement("canvas"), C = E.getContext("2d"), B = !0);
                   E.width = u;
                   E.height = t;
                   F = C.createImageData(u, t);
                   F.data.set(ia);
                   C.putImageData(F, 0, 0);
                   var h = E.toDataURL("image/png")
                 } else if ("JSON" === a)
                   if (d) h = new Float32Array(f), k.viewport(0, 0, u, t), z.g(!0, !0), k.readPixels(0, 0, u, t, k.RGBA, k.FLOAT, h);
                   else {
                     for (h = 0; 4 > h; ++h) k.viewport(0, t * h, u, t), p.Fb("u8", W[h]), z.g(!h, !h);
                     M.Ab();
                     h = Array(f);
                     for (g = 0; g < f; ++g) h[4 * g] = K[0][g], h[4 * g + 1] = K[1][g], h[4 * g + 2] = K[2][g], h[4 * g + 3] = K[3][g]
                   }
                 return {
                   format: a,
                   data: h,
                   width: u,
                   height: t,
                   isMirrorY: b.J,
                   isFlipY: "RGBA" === a ? b.isFlipY : !b.isFlipY
                 }
               }
             };
             b.isMipmap && !la && S && !va && (M.Ba(), va = !0);
             if (b.url) a(O), k.texImage2D(k.TEXTURE_2D, 0, k.RGBA, 1, 1, 0, k.RGBA, k.UNSIGNED_BYTE, null), aa = new Image, aa.ld = "Anonymous", aa.crossOrigin = "Anonymous", aa.src = b.url, aa.onload = function() {
               u = aa.width;
               t = aa.height;
               f()
             };
             else if (b.v) {
               var Da = function() {
                 u = void 0 !== b.v.videoWidth ? b.v.videoWidth : b.v.width;
                 t = void 0 !== b.v.videoHeight ? b.v.videoHeight : b.v.height;
                 u ? f() : setTimeout(Da, 1)
               };
               Da()
             } else b.array ? (b.B &&
               !b.isFloat ? b.array instanceof Uint16Array ? (L = b.array, f()) : e() ? (L = d(b.array), f()) : (f(), J.ic(M, b.array, da)) : (L = b.isFloat ? b.array instanceof Float32Array ? b.array : new Float32Array(b.array) : b.array instanceof Uint8Array ? b.array : new Uint8Array(b.array), f()), b.isKeepArray || (L && L !== b.array && (L = null), delete b.array)) : f();
             M.pc = M.s;
             N && S && (N(M), N = !1);
             return M
           },
           C: function(b) {
             b !== h && (k.activeTexture(m[b]), h = b);
             l[b] = -1;
             a(null)
           },
           gd: function(a) {
             v.random.b(a)
           },
           reset: function() {
             for (var a = 0; a < m.length; ++a) l[a] = -1;
             h = -1
           },
           Pd: function() {
             h = -1
           },
           $d: function() {
             for (var a = 0; a < m.length; ++a) J.C(a)
           },
           jc: function() {
             v && (v.random.remove(), v.Hb.remove())
           },
           ae: function(a, b) {
             if ("RGBA" === a.format || "RGBE" === a.format) {
               var d = new Image;
               d.src = a.data;
               d.onload = function() {
                 J.a({
                   J: a.isMirrorY,
                   isFlipY: a.isFlipY,
                   isFloat: !1,
                   v: d,
                   za: function(d) {
                     if ("RGBA" === a.format) b(d);
                     else {
                       var f = a.width,
                         e = a.height,
                         g = J.a({
                           J: a.isMirrorY,
                           isFloat: !0,
                           width: f,
                           height: e,
                           isFlipY: a.isFlipY
                         });
                       w.G();
                       k.viewport(0, 0, f, e);
                       p.set("s40");
                       g.j();
                       d.b(0);
                       z.g(!0, !0);
                       J.C(0);
                       b(g);
                       k.flush();
                       setTimeout(d.remove, 50)
                     }
                   }
                 })
               }
             } else "JSON" === a.format ? b(J.a({
               isFloat: !0,
               isFlipY: a.isFlipY,
               width: a.width,
               height: a.height,
               array: new Float32Array(a.data)
             })) : b(!1)
           }
         };
       return J
     }(),
     Ea = {
       a: function(a) {
         var b = [H.a(a), H.a(a)],
           d = [b[1], b[0]],
           e = d,
           g = {
             Db: function(a) {
               e[1].j();
               e[0].b(a);
               g.Gb()
             },
             Td: function(a) {
               e[1].u();
               e[0].b(a);
               g.Gb()
             },
             Gb: function() {
               e = e === b ? d : b
             },
             refresh: function() {
               e[0].refresh();
               e[1].refresh()
             },
             b: function(a) {
               e[0].b(a)
             }
           };
         return g
       }
     },
     y = function() {
       function a() {
         b = "undefined" === typeof Aa ? JEContext : Aa;
         d = !0
       }
       var b,
         d = !1,
         e = !1,
         g = !1,
         f = !1,
         h = !1,
         m = !1,
         r = !1,
         l = !1,
         v = !1,
         q = !1,
         n = !1,
         A = !0,
         x = !0,
         B = !0,
         E, C = "undefined" === typeof window ? {} : window,
         F = {
           i: function() {
             if (d) return !0;
             a();
             F.cb();
             F.Aa();
             F.ec();
             F.fc();
             w.i();
             H.i();
             if (!F.$b()) return !1;
             z.i();
             H.sc();
             return !0
           },
           s: function() {
             d || a();
             return b.s()
           },
           D: function() {
             d || a();
             return b.D()
           },
           m: function() {
             d || a();
             return b.m()
           },
           ec: function() {
             n = (q = k.getExtension("EXT_color_buffer_float") || k.getExtension("WEBGL_color_buffer_float") || k.getExtension("OES_color_buffer_float")) ? !0 : !1;
             C.GL_EXT_COLORBUFFERFLOAT =
               q
           },
           fc: function() {
             k.getExtension("EXT_color_buffer_half_float") || k.getExtension("WEBGL_color_buffer_half_float") || k.getExtension("OES_color_buffer_half_float")
           },
           cb: function() {
             if (!e) {
               this.m() || (g = k.getExtension("OES_texture_float") || k.getExtension("MOZ_OES_texture_float") || k.getExtension("WEBKIT_OES_texture_float"), h = (C.GL_EXT_FLOAT = g) ? !0 : !1);
               if (h || this.m()) f = k.getExtension("OES_texture_float_linear") || k.getExtension("MOZ_OES_texture_float_linear") || k.getExtension("WEBKIT_OES_texture_float_linear"),
                 C.GL_EXT_FLOATLINEAR = f;
               e = !0
             }
           },
           Aa: function() {
             if (!v) {
               if (!this.m()) {
                 if (m = k.getExtension("OES_texture_half_float") || k.getExtension("MOZ_OES_texture_half_float") || k.getExtension("WEBKIT_OES_texture_half_float")) E = m.HALF_FLOAT_OES, r = !0;
                 C.GL_EXT_HALFFLOAT = m
               }
               if (r || this.m()) l = k.getExtension("OES_texture_half_float_linear") || k.getExtension("MOZ_OES_texture_half_float_linear") || k.getExtension("WEBKIT_OES_texture_half_float_linear"), C.GL_EXT_HALFFLOATLINEAR = l;
               v = !0
             }
           },
           ja: function() {
             if (F.m()) return k.HALF_FLOAT;
             F.Aa();
             return r ? E : k.FLOAT
           },
           Za: function() {
             return A
           },
           Wb: function() {
             return x
           },
           hd: function() {
             return B
           },
           Vb: function() {
             return n
           },
           bc: function() {
             x = A = !0;
             var a = k.createFramebuffer();
             k.bindFramebuffer(k.FRAMEBUFFER, a);
             var b = k.createTexture();
             k.bindTexture(k.TEXTURE_2D, b);
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, k.NEAREST);
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.NEAREST);
             k.texImage2D(k.TEXTURE_2D, 0, F.m() && k.RGBA32F ? k.RGBA32F : k.RGBA, 1, 1, 0, k.RGBA, k.FLOAT, null);
             k.framebufferTexture2D(w.O(),
               k.COLOR_ATTACHMENT0, k.TEXTURE_2D, b, 0);
             var d = k.checkFramebufferStatus(w.Ca());
             d !== k.FRAMEBUFFER_COMPLETE && (A = !1);
             k.texImage2D(k.TEXTURE_2D, 0, F.m() && k.RGBA16F ? k.RGBA16F : k.RGBA, 1, 1, 0, k.RGBA, F.ja(), null);
             k.framebufferTexture2D(w.O(), k.COLOR_ATTACHMENT0, k.TEXTURE_2D, b, 0);
             d = k.checkFramebufferStatus(w.Ca());
             d !== k.FRAMEBUFFER_COMPLETE && (x = !1);
             k.bindTexture(k.TEXTURE_2D, null);
             k.bindFramebuffer(k.FRAMEBUFFER, null);
             k.deleteTexture(b);
             k.deleteFramebuffer(a)
           },
           ac: function() {
             var a = w.a({
               width: 1
             });
             a.Cb();
             var b = H.a({
               width: 1,
               isFloat: !0,
               $: 3
             });
             a.j();
             b.j();
             k.flush();
             k.checkFramebufferStatus(w.Ca()) !== k.FRAMEBUFFER_COMPLETE ? (H.Rc(), B = !1) : B = !0;
             a.remove();
             b.remove()
           },
           $b: function() {
             F.bc();
             if (!A && !x) return !1;
             F.ac();
             return !0
           }
         };
       return F
     }(),
     za = function() {
       var a = !1,
         b = [.8, 1, .8, 1],
         d = 0,
         e, g = new Uint8Array(4),
         f = b.concat(b, b, b),
         h = !0,
         m = {
           i: function() {
             function b(a, b, d, f) {
               k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, f ? k.NEAREST_MIPMAP_NEAREST : k.LINEAR);
               try {
                 var e = k.getError();
                 e !== k.NO_ERROR && console.log("GLERR in test_mipmapping() :", e);
                 k.texImage2D(k.TEXTURE_2D, 0, a, 2, 2, 0, k.RGBA, b, d);
                 e = k.getError();
                 if (e !== k.NO_ERROR) return !1
               } catch (W) {
                 return !1
               }
               f && k.generateMipmap(k.TEXTURE_2D);
               z.ya();
               z.g(!1, !0);
               k.readPixels(0, 0, 1, 1, k.RGBA, k.UNSIGNED_BYTE, g);
               e = k.getError();
               e === k.INVALID_OPERATION && "undefined" !== typeof k.PIXEL_PACK_BUFFER && (k.bindBuffer(k.PIXEL_PACK_BUFFER, null), k.readPixels(0, 0, 1, 1, k.RGBA, k.UNSIGNED_BYTE, g), e = k.getError());
               return e !== k.NO_ERROR ? !1 : 0 !== g[0]
             }

             function l(a) {
               return y.Za() && b(q, k.FLOAT, new Float32Array(f), a) ? (d = 3, !0) : !1
             }

             function m(a) {
               return y.Wb() ? b(n, y.ja(), new Uint16Array(f), a) || b(n, k.FLOAT, new Float32Array(f), a) ? (d = 2, !0) : !1 : !1
             }
             y.cb();
             y.Aa();
             var q = k.RGBA,
               n = k.RGBA;
             if (Aa.m()) {
               var A = k.RGBA32F;
               A && (q = A);
               (A = k.RGBA16F) && (n = A)
             }
             z.i();
             w.reset();
             w.C();
             k.viewport(0, 0, 1, 1);
             p.set("s0");
             a = !0;
             e = k.createTexture();
             k.activeTexture(k.TEXTURE0);
             k.bindTexture(k.TEXTURE_2D, e);
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.REPEAT);
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.REPEAT);
             k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER,
               k.NEAREST);
             if (m(!0) || l(!0)) return !0;
             h = !1;
             if (m(!1) || l(!1)) return !0;
             if (Aa.m()) {
               n = q = k.RGBA;
               if (m(!0) || l(!0)) return !0;
               h = !1;
               if (m(!1) || l(!1)) return !0
             }
             return !1
           },
           Xb: function() {
             return h
           },
           yd: function() {
             return d
           },
           Jd: function() {
             a || m.i();
             return 3 === d
           },
           vc: function() {
             a || m.i();
             return 2 === d
           }
         };
       return m
     }(),
     Fa = {
       a: function(a) {
         var b = H.a(a.alpha),
           d = H.a(a.beta);
         return {
           dc: function() {
             b.b(1);
             d.b(2)
           }
         }
       }
     },
     Ia = {
       a: function(a) {
         var b = a.Xc;
         b.index = a.index;
         b.K = a.K;
         b.parent = a.parent;
         switch (b.type) {
           case "input":
             a = Ga.a(b);
             break;
           default:
             a =
               Ha.a(b)
         }
         return a
       }
     },
     Ga = {
       a: function(a) {
         "undefined" === typeof a.sift && (a.sift = !1);
         "undefined" === typeof a.DWT && (a.DWT = !1);
         "undefined" === typeof a.blur && (a.blur = !1);
         "undefined" === typeof a.siftOutWidth && (a.siftOutWidth = !1);
         "undefined" === typeof a.filterBank && (a.filterBank = !1);
         "undefined" === typeof a.poolType && (a.poolType = "max");
         "undefined" === typeof a.postpreprocessing && (a.postpreprocessing = "copy");
         "undefined" === typeof a.density && (a.density = 1);
         a.filterBank && (FilterBank.Sd(a.poolType, a.postpreprocessing), FilterBank.Rd(a.density));
         var b = !1;
         if (a.mask) {
           b = !0;
           c && void 0 !== c.Qb && (a.mask = c.Qb + a.mask);
           var d = H.a({
             isFloat: !1,
             url: a.mask
           })
         }
         var e = !1,
           g = "undefined" !== typeof a.preprocessing ? a.preprocessing : !1,
           f = !1;
         a.sift ? Sift.i({
           rc: k,
           ga_: !1,
           width: a.size,
           Od: a.siftOutWidth
         }) : a.DWT && DWT.i({
           rc: k,
           ga_: !1,
           width: a.size
         });
         switch (g) {
           case "sobel":
             var h = "s30";
             f = !0;
             break;
           case "meanNormalization":
             h = "s31";
             f = !0;
             break;
           case "grayScale":
             h = "s29";
             f = !1;
             break;
           case "copy":
             h = "s0";
             break;
           case "inputLightRegulation":
             h = "s29";
             Ja.i({
               width: a.size,
               qb: a.nBlurPass,
               uc: !1
             });
             e = !0;
             break;
           case "direct":
           case "none":
             h = !1;
             break;
           default:
             h = "s3"
         }
         b && (h += "Mask");
         if (a.blur) var m = H.a({
           isFloat: !1,
           isPot: !1,
           width: a.size
         });
         var r = H.a({
             isFloat: !1,
             isPot: !1,
             width: a.size
           }),
           l = {
             s: function() {
               return a.sift ? Sift.P() : a.filterBank ? FilterBank.P() : a.size
             },
             P: function() {
               return l.s()
             },
             nc: function() {
               return a.sift ? Sift.Z() : a.DWT ? DWT.Z() : a.filterBank ? FilterBank.Z() : e ? Ja.Z() : r
             },
             w: function() {
               w.G();
               a.blur && (m.u(), p.set("s41"), p.H("u7", 1 / a.size, 1 / a.size), z.g(!1, !0), m.b(0));
               h && (p.set(h), f && p.A("u28", 1 / a.size),
                 r.u(), b && d.b(1), z.g(!1, !1), r.b(0), e ? Ja.oa(r) : a.sift ? (p.M(), Sift.oa()) : a.DWT ? (p.M(), DWT.oa(4)) : a.filterBank && (p.M(), FilterBank.oa(r)))
             }
           };
         return l
       }
     },
     Ha = {
       a: function(a) {
         "undefined" === typeof a.disableNormalize && (a.disableNormalize = !1);
         var b = [],
           d = [],
           e, g, f = !1,
           h, m = !0,
           r, l, v = a.isReorganize ? a.isReorganize : !1,
           q = a.kernelsNumber ? !0 : !1,
           n = a.dynPelu ? Fa.a(a.dynPelu) : !1,
           A = n ? !0 : !1,
           x = {
             isEnabled: !1
           },
           B;
         if ("softmax" === a.type) {
           a.activation = "softmax";
           a.size = Math.pow(2, Math.ceil(Math.log(Math.sqrt(a.num_classes)) / Math.log(2)));
           a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.K.P();
           a.gain = "undefined" !== typeof a.gain ? a.gain : 1;
           p.I("s20", [{
             type: "1f",
             name: "u10",
             value: a.gain
           }]);
           var E = H.a({
               isFloat: !0,
               isPot: !1,
               width: a.size
             }),
             C = H.a({
               isFloat: !0,
               isPot: !1,
               width: a.size,
               isMipmap: !0
             });
           m = !1;
           var F = new Uint8Array(Math.pow(4 * a.size, 2)),
             W;
           for (W = 0; W < a.size * a.size; ++W) {
             var ba = W < a.num_classes ? 255 : 0;
             F[4 * W] = ba;
             F[4 * W + 1] = ba;
             F[4 * W + 2] = ba;
             F[4 * W + 3] = ba
           }
           var ha = H.a({
             isFloat: !1,
             isPot: !1,
             width: a.size,
             array: F
           })
         } else a.cost ? (a.sparsity = "undefined" !==
           typeof a.sparsity ? a.sparsity : a.K.P(), m = !1) : "full" === a.connectivityUp && (a.sparsity = a.K.P());
         var K = {
             elu: "s15",
             elu01: "s16",
             relu: "s14",
             arctan: "s18",
             sigmoid: "s13",
             copy: "s0",
             softplus: "s19",
             softmax: "s20",
             dynPelu: "s17"
           } [a.activation],
           ca = a.sparsity * a.sparsity,
           Q = !1,
           J = a.size;
         if (a.maxPooling) {
           switch (a.maxPooling.size) {
             case 2:
               var D = "s32";
               break;
             case 4:
               D = "s33"
           }
           Q = !0;
           J /= a.maxPooling.size;
           var Y = H.a({
             isFloat: !0,
             isPot: !1,
             width: J
           })
         }
         var I = void 0 !== a.Ic && a.Ic ? !0 : !1,
           fa = null,
           Z = null,
           R = null;
         I && (fa = "s42" + a.index.toString(),
           p.jb("s42", fa, [((a.normalization.n - 1) / 2).toFixed(1)]), p.I(fa, [{
             type: "1i",
             name: "u1",
             value: 0
           }, {
             type: "2f",
             name: "u7",
             value: [1 / a.size, 1 / a.size]
           }, {
             type: "1f",
             name: "u6",
             value: a.normalization.alpha
           }, {
             type: "1f",
             name: "u9",
             value: a.normalization.beta
           }, {
             type: "1f",
             name: "u32",
             value: a.normalization.k
           }]), Z = H.a({
             isFloat: !0,
             isPot: !0,
             width: a.size
           }), R = H.a({
             isFloat: !0,
             isPot: !0,
             width: a.size
           }));
         var T, ma, O, N;
         m && (N = H.a({
           isFloat: !0,
           isPot: !1,
           width: a.size
         }));
         var aa = H.a(a.bias),
           L, u = {
             s: function() {
               return a.size
             },
             P: function() {
               return J
             },
             gb: function() {
               return a.num_classes
             },
             Tb: function(a) {
               B.b(a)
             },
             Lc: function() {
               a.remap && a.remap.isEnabled && (x = {
                 isEnabled: !0,
                 xc: H.a({
                   isFloat: !1,
                   isFlipY: !1,
                   array: new Uint8Array(a.remap.maskTexture.data),
                   width: a.remap.maskTexture.width,
                   isPot: !1
                 }),
                 layers: a.remap.layers.map(function(b) {
                   return a.parent.lc(b)
                 }),
                 depth: a.remap.depth
               })
             },
             Tc: function() {
               switch (a.connectivityUp) {
                 case "gaussian":
                   L = Ka.a(a.connectivity);
                   break;
                 case "direct":
                   L = La.a(a.connectivity);
                   break;
                 case "square":
                   L = Ma.a(a.connectivity);
                   break;
                 case "squareFast":
                   L =
                     Na.a(a.connectivity, a.activation);
                   break;
                 case "full":
                   L = Oa.a(a.connectivity);
                   break;
                 case "conv":
                   l = a.kernelsNumber, L = Pa.a(a.connectivity), v && (r = H.a({
                     width: J,
                     isFloat: !0,
                     isFlipY: !1,
                     isPot: !1
                   }))
               }
               if (L.L) {
                 var b = a.size * a.sparsity;
                 ma = Math.log(b / a.size) / Math.log(2);
                 T = H.a({
                   isMipmap: !0,
                   isFloat: !0,
                   isPot: !0,
                   width: b,
                   ob: ma
                 });
                 O = H.a({
                   isFloat: !0,
                   isPot: !0,
                   width: a.size
                 })
               }
             },
             w: function(b, d) {
               B = b;
               L.L ? (T.u(), q && aa.b(2), L.w(x), T.b(0), T.eb(ma), O.u(), q ? p.set("s0") : (p.set("s28"), p.A("u27", ca), aa.b(1)), T.Ya(ma, 0), z.g(!1, !1), p.set(K),
                 I ? Z.j() : N.j(), O.b(0), A && n.dc(), z.g(!1, !1)) : (N.u(), aa.b(1), L.w());
               I && (p.set(fa), R.j(), Z.b(0), z.g(!1, !1), p.set("s43"), p.A("u6", 1), N.j(), R.b(1), z.g(!1, !1));
               if (m) return Q ? (Y.u(), N.b(0), p.set(D), p.H("u7", 1 / a.size, 1 / a.size), z.g(!1, !1), d = Y) : d = N, d.b(0), v && (r.j(), p.set("s22"), p.H("u14", l, J / l), z.g(!1, !1), d = r, r.b(0)), d;
               if ("softmax" === a.type) {
                 p.set("s20");
                 N.b(0);
                 E.j();
                 z.g(!1, !1);
                 a.disableNormalize ? b = E : (p.set("s2"), E.b(0), ha.b(1), C.j(), z.g(!1, !1), p.set("s0"), g.u(), C.b(0), C.eb(!1), z.g(!1, !1), p.set("s21"), e.u(),
                   C.Ya(!1, 0), p.A("u12", N.pc()), g.b(1), z.g(!1, !1), b = e);
                 if (d) {
                   switch (f) {
                     case "cpuRGBAAvg":
                       break;
                     default:
                       var t = u.vb(b)
                   }
                   return t
                 }
                 return !1
               }
               if (a.cost) {
                 p.set("gpuRawAvg" === f ? "s8" : "s7");
                 d = N;
                 a.disableNormalize || (p.A("u4", 1 / a.size), e.u(), N.b(0), z.g(!1, !1), d = e);
                 switch (f) {
                   case "cpuRGBA2Float":
                     d.bb();
                     t = u.vb(d);
                     h(t);
                     break;
                   case "gpuRawAvg":
                   case "gpuRaw":
                     d.b(0), h(d)
                 }
                 return !1
               }
             },
             Zb: function(m) {
               m && "undefined" !== typeof m.ub && (f = m.ub, h = m.Kc);
               N = H.a({
                 isFloat: !0,
                 isPot: !0,
                 isMipmap: "softmax" === a.type,
                 width: a.size
               });
               "softmax" ===
               a.type && (g = H.a({
                 isFloat: !0,
                 isPot: !0,
                 width: 1
               }));
               var l = 0,
                 r = 0,
                 q = "undefined" !== typeof a.num_classes && a.num_classes ? a.num_classes : a.size * a.size;
               for (m = 0; m < q; ++m) b.push(l + (a.size - 1 - r) * a.size), d.push([-1, -1, -1, -1]), ++l, l === a.size && (l = 0, ++r);
               a.disableNormalize || (e = H.a({
                 isFloat: !0,
                 isPot: !0,
                 width: a.size
               }))
             },
             vb: function(a) {
               a.bb();
               var f = a.Ab();
               b.forEach(function(a, b) {
                 d[b][0] = f[0][a];
                 d[b][1] = f[1][a];
                 d[b][2] = f[2][a];
                 d[b][3] = f[3][a]
               });
               return d
             }
           };
         a.K && u.Tc(a.K);
         return u
       }
     };

   function Qa() {
     var a = {
         Gd: !1
       },
       b, d;
     a || (a = {});
     this.lc = function(a) {
       return b[a]
     };
     this.Qc = function(a) {
       var e = !1;
       b = a.map(function(a, b) {
         return e = a = Ia.a({
           index: b,
           parent: this,
           Xc: a,
           K: e
         })
       });
       d = b[b.length - 1];
       b.forEach(function(a, b) {
         0 !== b && a.Lc()
       })
     };
     this.w = function(a, d) {
       var f = d;
       b.forEach(function(b) {
         f = b.w(f, a)
       });
       return f
     };
     this.oc = function() {
       return d.s()
     };
     this.Z = function() {
       return d.nc()
     };
     this.Sc = function(a) {
       d.Zb(a)
     };
     this.gb = function() {
       return d.gb()
     }
   }
   var La = {
       a: function(a) {
         var b = H.a(a.weights);
         delete a.weights.data;
         return {
           L: !0,
           Y: function() {
             return 1
           },
           qc: function() {
             return b
           },
           w: function() {
             p.set("s27");
             b.b(1);
             z.g(!1, !1)
           }
         }
       }
     },
     Oa = {
       a: function(a) {
         var b = a.fromLayerSize,
           d = H.a(a.weights);
         return {
           L: !0,
           Y: function() {
             return b
           },
           w: function(b) {
             if (b.isEnabled) {
               p.set("s25");
               b.xc.b(3);
               var e, f = Math.min(b.layers.length, b.depth);
               for (e = 0; e < f; ++e) b.layers[e].Tb(4 + e)
             } else p.set("s24");
             p.A("u18", a.toLayerSize);
             d.b(1);
             z.g(!1, !1)
           }
         }
       }
     },
     Ka = {
       a: function(a) {
         var b = a.toSparsity * a.toLayerSize,
           d = b / a.fromLayerSize,
           e = H.a(a.weights);
         H.a({
           width: b,
           isFloat: !0,
           array: new Float32Array(a.fromBindings),
           isPot: !0
         });
         var g = H.a({
           width: b,
           isFloat: !0,
           array: new Float32Array(a.toBindings),
           isPot: !0
         });
         return {
           L: !0,
           Y: function() {
             return d
           },
           w: function() {
             p.set("s23");
             e.b(1);
             g.b(2);
             z.g(!1, !0)
           }
         }
       }
     },
     Ma = {
       a: function(a) {
         var b = a.fromLayerSize,
           d = a.toLayerSize,
           e = a.toSparsity,
           g = e * d,
           f = g / b,
           h = b / d,
           m, r, l, v, q = 0,
           n = 0,
           A = 0,
           x = Array(e * d * e * d * 4),
           B = Array(e * d * e * d * 4),
           E = Array(b * b);
         for (m = 0; m < E.length; ++m) E[m] = 0;
         var C = Math.floor(e / 2),
           F = .5 / d,
           W = .5 /
           b,
           ba = .5 / g;
         for (m = 0; m < d; ++m)
           for (r = 0; r < d; ++r) {
             var ha = Math.round(m * h);
             var K = Math.round(r * h);
             var ca = m / d;
             var Q = r / d;
             ca += F;
             Q += F;
             for (l = 0; l < e; ++l)
               for (v = 0; v < e; ++v) {
                 var J = q / g;
                 var D = n / g;
                 var Y = ha + l - C;
                 var I = K + v - C;
                 0 > Y && (Y += b);
                 0 > I && (I += b);
                 Y >= b && (Y -= b);
                 I >= b && (I -= b);
                 var fa = Y / b;
                 var Z = I / b;
                 D = 1 - D - 1 / g;
                 fa += W;
                 Z += W;
                 J += ba;
                 D += ba;
                 var R = m * e + l,
                   T = r * e + v;
                 T = d * e - T - 1;
                 R = T * d * e + R;
                 x[4 * R] = J;
                 x[4 * R + 1] = D;
                 x[4 * R + 2] = fa;
                 x[4 * R + 3] = Z;
                 fa = E[I * b + Y]++;
                 Z = fa % f;
                 Y = Y * f + Z;
                 I = I * f + (fa - Z) / f;
                 I = b * f - 1 - I;
                 I = I * b * f + Y;
                 B[4 * I] = J;
                 B[4 * I + 1] = D;
                 B[4 * I + 2] = ca;
                 B[4 * I + 3] = Q;
                 ++q >= g && (q =
                   0, ++n);
                 ++A
               }
           }
         var ma = H.a(a.weights);
         H.a({
           width: g,
           isFloat: !0,
           array: new Float32Array(B),
           isPot: !0
         });
         B = null;
         var O = H.a({
           width: g,
           isFloat: !0,
           array: new Float32Array(x),
           isPot: !0
         });
         x = null;
         return {
           L: !0,
           Y: function() {
             return f
           },
           w: function() {
             p.set("s23");
             ma.b(1);
             O.b(2);
             z.g(!1, !1)
           }
         }
       }
     },
     Pa = {
       a: function(a) {
         var b = a.kernelsNumber,
           d = a.toSparsity,
           e = d * a.toLayerSize / a.fromLayerSize,
           g = H.a(a.weights);
         return {
           L: !0,
           Y: function() {
             return e
           },
           Bd: function() {
             return d
           },
           qc: function() {
             return g
           },
           w: function() {
             p.set("s26");
             p.A("u24", b);
             p.A("u25",
               d);
             p.A("u18", a.toLayerSize);
             p.A("u26", a.fromLayerSize);
             g.b(1);
             z.g(!1, !1)
           }
         }
       }
     },
     Na = {
       a: function(a, b) {
         var d = a.fromLayerSize,
           e = a.toLayerSize,
           g = a.toSparsity,
           f = a.stride ? a.stride : 1,
           h = g * e / d,
           m = e < d,
           r = d / e,
           l = H.a(a.weights),
           v = "s44" + [d.toString(), e.toString(), g.toString(), f.toString(), b].join("_");
         p.gc(v) || (a = sa(b), e = [{
           type: "1f",
           name: "u18",
           value: e
         }, {
           type: "1f",
           name: "u31",
           value: f
         }], m && e.push({
           type: "1f",
           name: "u26",
           value: d
         }), d = [(m ? h : g).toFixed(1), a], m && d.push(r.toFixed(1)), p.jb(m ? "s38" : "s37", v, d), p.I(v, e.concat([{
           type: "1i",
           name: "u16",
           value: 0
         }, {
           type: "1i",
           name: "u23",
           value: 1
         }, {
           type: "1i",
           name: "u15",
           value: 3
         }])));
         return {
           L: !1,
           Y: function() {
             return h
           },
           w: function() {
             p.set(v);
             l.b(3);
             z.g(!1, !1)
           }
         }
       }
     },
     Ja = function() {
       var a, b, d, e, g, f, h, m, r;
       return {
         i: function(l) {
           a = l.qb ? l.qb : 3;
           b = l.width ? l.width : 64;
           e = l.uc ? !0 : !1;
           l = {
             isFloat: !1,
             width: b,
             isPot: !1,
             isFlipY: !1
           };
           g = H.a(l);
           f = H.a(l);
           h = H.a(l);
           m = H.a(l);
           r = H.a({
             isFloat: !0,
             width: b,
             isPot: !1,
             isFlipY: !1
           });
           d = 1 / b
         },
         oa: function(b) {
           p.set("s35");
           for (var l = 0; l < a; ++l) g.j(), p.H("u7", d, 0), z.g(e, !1), f.j(), g.b(0), p.H("u7",
             0, d), z.g(e, !1), f.b(0);
           p.set("s34");
           m.j();
           b.b(0);
           z.g(e);
           p.set("s35");
           for (l = 0; l < a; ++l) h.j(), m.b(0), p.H("u7", d, 0), z.g(e, !1), m.j(), h.b(0), p.H("u7", 0, d), z.g(e, !1);
           p.set("s36");
           r.j();
           b.b(0);
           f.b(1);
           m.b(2);
           z.g(e, !1);
           r.b(0)
         },
         Z: function() {
           return r
         }
       }
     }();

   function Ra(a, b) {
     a[b] = !0;
     a.setAttribute(b, "true")
   }

   function Sa() {
     var a = !1,
       b = navigator.userAgent || navigator.vendor || window.opera;
     if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
         4))) a = !0;
     return a
   }

   function Ta() {
     return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
   }

   function Ua() {
     var a = navigator.userAgent.toLowerCase();
     return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1
   }

   function Va() {
     return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1
   }

   function Wa(a) {
     if (!a) return a;
     var b = !1;
     if (a.video) {
       var d = function(a) {
         var b = {};
         "undefined" !== typeof a.min && (b.min = a.min);
         "undefined" !== typeof a.max && (b.max = a.max);
         "undefined" !== typeof a.ideal && (b.ideal = a.ideal);
         return b
       };
       b = {};
       "undefined" !== typeof a.video.width && (b.width = d(a.video.width));
       "undefined" !== typeof a.video.height && (b.height = d(a.video.height));
       "undefined" !== typeof a.video.facingMode && (b.facingMode = a.video.facingMode)
     }
     b = {
       audio: a.audio,
       video: b
     };
     "undefined" !== typeof a.deviceId && (b.deviceId = a.deviceId);
     return b
   }

   function Xa(a) {
     var b = a.video.width;
     a.video.width = a.video.height;
     a.video.height = b;
     return a
   }

   function Ya(a) {
     function b(a) {
       return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function(b, d) {
         return Math.abs(b - a) - Math.abs(d - a)
       })
     }

     function d(b) {
       e.push(b(Wa(a)))
     }
     var e = [];
     if (!a || !a.video) return e;
     if (a.video.width && a.video.height) {
       if (a.video.width.ideal && a.video.height.ideal)
         for (var g = b(a.video.width.ideal).slice(0, 3), f = b(a.video.height.ideal).slice(0, 3), h = 0, m; h < g.length; ++h) {
           m = g[h];
           for (var r = 0, l; r < f.length; ++r)
             if (l = f[r], m !== a.video.width.ideal || l !== a.video.height.ideal) {
               var v = Math.max(m,
                 l) / Math.min(m, l);
               v < 4 / 3 - .1 || v > 16 / 9 + .1 || d(function(a) {
                 a.video.width.ideal = m;
                 a.video.height.ideal = l;
                 return a
               })
             }
         }
       d(function(a) {
         return Xa(a)
       })
     }
     a.video.facingMode && (d(function(a) {
       delete a.video.facingMode;
       return a
     }), a.video.width && a.video.height && d(function(a) {
       Xa(a);
       delete a.video.facingMode;
       return a
     }));
     a.video.width && a.video.height && (a.video.width.ideal && a.video.height.ideal && d(function(a) {
       delete a.video.width.ideal;
       delete a.video.height.ideal;
       return a
     }), d(function(a) {
       delete a.video.width;
       delete a.video.height;
       return a
     }));
     e.push({
       audio: a.audio,
       video: !0
     });
     return e
   }

   function Za(a) {
     try {
       var b = window.matchMedia("(orientation: portrait)").matches ? !0 : !1
     } catch (e) {
       b = window.innerHeight > window.innerWidth
     }
     if (b && a && a.video) {
       b = a.video.width;
       var d = a.video.height;
       b && d && b.ideal && d.ideal && b.ideal > d.ideal && (a.video.height = b, a.video.width = d)
     }
   }

   function $a(a) {
     a.volume = 0;
     Ra(a, "muted");
     if (Ua()) {
       if (1 === a.volume) {
         var b = function() {
           a.volume = 0;
           window.removeEventListener("mousemove", b, !1);
           window.removeEventListener("touchstart", b, !1)
         };
         window.addEventListener("mousemove", b, !1);
         window.addEventListener("touchstart", b, !1)
       }
       setTimeout(function() {
         a.volume = 0;
         Ra(a, "muted")
       }, 5)
     }
   }

   function ab(a, b, d, e) {
     function g(a) {
       f || (f = !0, d(a))
     }
     var f = !1;
     navigator.mediaDevices.getUserMedia(e).then(function(d) {
       function e() {
         setTimeout(function() {
           if (a.currentTime) {
             var e = a.videoWidth,
               h = a.videoHeight;
             if (0 === e || 0 === h) g("VIDEO_NULLSIZE");
             else {
               e && (a.style.width = e.toString() + "px");
               h && (a.style.height = h.toString() + "px");
               e = {
                 Yb: null,
                 Wc: null,
                 Ac: null
               };
               try {
                 var m = d.getVideoTracks()[0];
                 m && (e.Ac = m, e.Yb = m.getCapabilities(), e.Wc = m.getSettings())
               } catch (q) {}
               Ua() || Ta() ? a.parentNode && null !== a.parentNode ? (f || b(a, d,
                 e), setTimeout(function() {
                 a.play()
               }, 100)) : (document.body.appendChild(a), $a(a), f || b(a, d, e), setTimeout(function() {
                 a.style.transform = "scale(0.0001,0.0001)";
                 a.style.position = "fixed";
                 a.style.bottom = "0px";
                 a.style.right = "0px";
                 $a(a);
                 setTimeout(function() {
                   a.play()
                 }, 100)
               }, 80)) : f || b(a, d, e)
             }
           } else g("VIDEO_NOTSTARTED")
         }, 700)
       }
       "undefined" !== typeof a.srcObject ? a.srcObject = d : (a.src = window.URL.createObjectURL(d), a.videoStream = d);
       $a(a);
       a.addEventListener("loadeddata", function() {
         var b = a.play();
         $a(a);
         "undefined" === typeof b ?
           e() : b.then(function() {
             e()
           }).catch(function() {
             g("VIDEO_PLAYPROMISEREJECTED")
           })
       }, !1)
     }).catch(function(a) {
       g(a)
     })
   }

   function bb(a, b) {
     var d = Va() ? document.createElement("video") : !1,
       e = {
         video: {
           facingMode: {
             ideal: "user"
           },
           width: {
             min: 240,
             max: 1280,
             ideal: 320
           },
           height: {
             min: 240,
             max: 1280,
             ideal: 240
           }
         },
         audio: U.Sa
       };
     d ? Va() ? (e && e.video && (Ta() ? Za(e) : Sa() && Za(e), e.video.width && e.video.width.ideal && (d.style.width = e.video.width.ideal + "px"), e.video.height && e.video.height.ideal && (d.style.height = e.video.height.ideal + "px")), Ra(d, "autoplay"), Ra(d, "playsinline"), e && e.audio ? d.volume = 0 : Ra(d, "muted"), ab(d, a, function() {
       function g(f) {
         if (0 === f.length) b("INVALID_FALLBACKCONSTRAINS");
         else {
           var e = f.shift();
           ab(d, a, function() {
             g(f)
           }, e)
         }
       }
       var f = Ya(e);
       g(f)
     }, e)) : b && b("MEDIASTREAMAPI_NOTFOUND") : b && b("VIDEO_NOTPROVIDED")
   }
   var cb = function() {
       var a = 0,
         b, d, e, g;
       return {
         i: function(f, h) {
           a = f.length;
           b = h;
           d = f;
           e = new Float32Array(a);
           g = new Float32Array(a)
         },
         mc: function() {
           return g
         },
         Yc: function(a, h, m) {
           a.forEach(function(a, f) {
             var l = Math.min(1, d[f] * m * (h + .33 * (1 - h)));
             a = l * a + (1 - l) * e[f];
             e[f] = a;
             g[f] = b[f](a)
           })
         }
       }
     }(),
     U = {
       U: [],
       va: !1,
       wa: !1,
       ua: !1,
       Sa: !1,
       ca: !0,
       ba: !1,
       ready: !1,
       initialized: !1
     },
     c = {
       save: "jeelizFaceTransferNNC.json",
       Qa: "../../",
       Pb: 0,
       ka: 64,
       width: 512,
       height: 512,
       Bc: .25,
       yc: .7,
       Fc: 3,
       borderWidth: .4,
       X: .35,
       Gc: 5,
       Hc: 3,
       Oa: [.06, .08,
         .15
       ],
       ad: 55,
       Cc: .6,
       zc: 5.8,
       Kb: .75,
       Jb: 1,
       Ta: [.03, 1],
       dd: 20,
       ea: .2,
       N: [30, 55],
       Ra: 3,
       Rb: 1 / 3.5,
       tb: 11,
       pb: 1,
       Dc: 1,
       Ua: [.1, .01],
       Nc: [.4, -.7, -.4],
       Oc: [.3, 0, 0],
       Bb: [5, 7],
       cc: !1,
       T: [0, 7],
       Wa: .001,
       Va: [Math.PI / 10, Math.PI / 6],
       wb: [0, 6],
       xb: [.1, .4],
       yb: [.009, .02],
       zb: [.02, .05],
       Ka: 8,
       ib: [3, 7],
       hb: .05,
       Ob: [.2, .2, .15, .15, .15, .15, .2, .2, .15, .15, .2],
       Ec: [oa.bind(null, .05, .7), oa.bind(null, .05, .7), oa.bind(null, 0, .4), oa.bind(null, 0, .4), oa.bind(null, 0, .6), oa.bind(null, 0, .6), qa.bind(null, .1, .6), oa.bind(null, .1, .4), ra.bind(null, .68, .77, 2), ra.bind(null,
         .68, .77, 2), oa.bind(null, .15, .5)]
     };
   U.get_nMorphs = function() {
     return c.tb
   };
   var db = !1;

   function eb() {
     var a, b, d, e, g, f, h, m, r, l, v;

     function q() {
       ++L;
       1 === L && (cb.i(c.Ob, c.Ec), n(), U.ready = !0, U.U.forEach(function(a) {
         a()
       }), U.U.splice(0, U.U.length), A(), L = 0)
     }

     function n() {
       Z = na();
       R = new Uint8Array(K * K * 4);
       U.get_morphTargetInfluences = function() {
         return Z
       };
       U.get_morphTargetInfluencesStabilized = function() {
         return cb.mc()
       };
       U.set_morphUpdateCallback = function(a) {
         aa = a
       };
       U.get_rotation = function() {
         return ma
       };
       U.get_rotationStabilized = function() {
         return N
       };
       U.switch_sleep = function(a) {
         t !== u.ra || a ? t = a ? u.ra : u.ha : A()
       };
       U.on_detect = function(a) {
         a(S.F);
         S.La.push(a)
       };
       U.is_detected = function() {
         return S.F
       };
       U.set_animateDelay = function(a) {
         F = a
       }
     }

     function A() {
       t !== u.ha && (t = u.ha, G.timestamp = Date.now(), W && window.clearTimeout(W), ba && window.cancelAnimationFrame(ba), B())
     }

     function x() {
       t !== u.ra && (W = setTimeout(B, F))
     }

     function B() {
       var a = D.currentTime - la;
       0 > a && (la = D.currentTime);
       1E3 * a < c.dd || (Y.refresh(), la += a, p.set("s46"), w.G(), I.Fa.u(), Y.b(0), z.g(!1, !0));
       a = t === u.ha ? G.na : 1;
       for (var b = 0; b < a; ++b) {
         var d = I,
           f = ha;
         p.set("s47");
         w.G();
         d.Ga.u();
         d.Fa.b(0);
         d.sa.b(1);
         z.g(!1, !1);
         d.Ga.b(0);
         f.w(!1, d.Ga)
       }
       U.ca && (w.bd(), p.set("s5"), I.Fa.b(0), z.g(!1, !1), k.enable(k.BLEND), k.blendFunc(k.SRC_ALPHA, k.ONE), fa.b(0), z.g(!1, !1), k.disable(k.BLEND));
       k.flush();
       b = Date.now();
       d = b - G.timestamp;
       G.timestamp = b;
       G.rb = a / d;
       G.Ja = G.rb * c.ea + G.Ja * (1 - c.ea);
       G.sb = 1E3 / d;
       G.S = G.sb * c.ea + G.S * (1 - c.ea);
       G.S > c.N[1] ? (++G.na, G.S = (c.N[0] + c.N[1]) / 2) : G.S < c.N[0] && (G.na = Math.max(G.na - 1, c.Ra), G.S = (c.N[0] + c.N[1]) / 2);
       G.fa = c.Rb / Math.max(G.Ja, .001);
       t !== u.ra && (ba = window.requestAnimationFrame(x))
     }
     var E, C, F = c.Pb,
       W = !1,
       ba = !1,
       ha, K, ca, Q, J, D, Y, I = {},
       fa, Z = !1,
       R, T = [0, 0, 0],
       ma = [0, 0, 0],
       O = [0, 0, 0],
       N = [0, 0, 0],
       aa = !1,
       L = 0,
       u = {
         wc: -2,
         ra: -1,
         ha: 0
       },
       t = u.wc,
       S = {
         ma: 0,
         F: !1,
         La: []
       },
       G = {
         timestamp: 0,
         rb: 0,
         Ja: 0,
         na: c.Ra,
         sb: 0,
         S: 0,
         fa: 1
       },
       ea = 1,
       Ba = 1,
       ia = 1,
       Ca = 1,
       ja = [0, 0, 0],
       P = [0, 0, 0],
       V = Date.now(),
       X = new Float32Array(c.Ka),
       da = 0,
       la = 0;
     return {
       tc: function() {
         E = c.width;
         C = c.height;
         Q = c.Bc;
         J = c.yc;
         var n = E / c.ka;
         Q *= n;
         J *= n;
         g = (1 - 2 * c.borderWidth) / c.Gc;
         f = (1 - 2 * c.X) / c.Hc;
         h = (J - Q) / c.Fc;
         m = c.borderWidth;
         r = c.X;
         l = 1 - c.borderWidth;
         v = 1 - c.X;
         a = 0;
         b = c.borderWidth;
         d = c.X;
         e = Q;
         ca = [c.ka /
           E, c.ka / C
         ]
       },
       i: function(n) {
         function u() {
           S.ma = c.hb * t(c.ib[0], c.ib[1]) + (1 - c.hb) * S.ma;
           .6 < S.ma && !S.F ? (S.La.forEach(function(a) {
             a(!0)
           }), S.F = !0) : .4 > S.ma && S.F && (S.La.forEach(function(a) {
             a(!1)
           }), S.F = !1)
         }

         function t(a, b) {
           a += K * b;
           return (R[4 * a] + R[4 * a + 1] + R[4 * a + 2] + R[4 * a + 3]) / 1020
         }

         function A() {
           Z.forEach(function(a, b) {
             if (S.F) {
               a = (c.pb + b) % K;
               var d = c.Dc + Math.floor((c.pb + b) / K);
               d = K - 1 - d;
               Z[b] = t(a, d)
             } else Z[b] = 0
           })
         }
         D = n;
         Y = H.a({
           v: D,
           isPot: !1,
           isFloat: !1,
           isFlipY: !0
         });
         p.Nb([{
           id: "s46",
           name: "_",
           aa: "attribute vec2 a0;uniform vec2 u33,u34;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u34+u33*a0;}",
           da: ["a0"],
           V: [2],
           c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
           f: ["u1", "u33", "u34"],
           precision: "lowp"
         }, {
           id: "s47",
           name: "_",
           c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
           aa: "attribute vec2 a0;uniform sampler2D u35;uniform vec2 u36;const vec2 f=vec2(.25,.5),h=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u35,f);vec2 b=a.gb,c=a.a*u36,d=a0*.5+e;vv0=b+(d-e)*c,gl_Position=vec4(a0,0.,1.);}",
           da: ["a0"],
           V: [2],
           f: ["u1", "u35", "u36"],
           precision: "lowp"
         }, {
           id: "s48",
           name: "_",
           aa: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
           c: "uniform sampler2D u37,u35;uniform vec3 u38,u39;uniform float u40,u41,u42,u43,u44,u45,u46;varying vec2 vv0;const vec4 n=vec4(1.,1.,1.,1.),o=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u37,vec2(.375,.9375)),h=texture2D(u37,vec2(.5,.9375));float i=dot(e,texture2D(u37,vec2(0.,.9375))),d=dot(e,texture2D(u37,vec2(.125,.9375))),j=dot(e,texture2D(u37,vec2(.25,.9375)));vec4 a=texture2D(u35,vec2(.5,.5));float c=dot(g,e),k=dot(h,e);bool l=c>u43&&c>k+u44;l?a.r=2.:a.r>u42?a.r=0.:a.r>1.9&&(a.a>u41||a.a<u40)?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a.gba=u38,a.r=1.;else{float b;if(a.r>1.9)b=1.-u46;else b=1.,a.r=0.;float f=a.a*u45;a.gba+=vec3(i,d,j)*u39*b*f;}gl_FragColor=a;}",
           f: "u37 u35 u38 u40 u41 u42 u43 u44 u39 u45 u46".split(" ")
         }, {
           id: "s49",
           name: "_",
           c: "uniform sampler2D u35;uniform vec2 u36;varying vec2 vv0;const vec2 j=vec2(1.,1.);const vec4 i=vec4(0.,.5,1.,1.);void main(){vec4 g=texture2D(u35,vec2(.25,.5));vec2 h=g.gb;float k=g.a;vec2 a=k*u36,c=h+a,d=h;d-=a/2.,c-=a/2.;vec2 l=.5*(d+c),f=step(d,vv0)*step(vv0,c);float m=f.x*f.y;vec2 b=2.*abs(l-vv0)/a;b=pow(b,3.*j),gl_FragColor=m*i*max(b.x,b.y);}",
           f: ["u35", "u36"],
           precision: "lowp"
         }, {
           id: "s50",
           name: "_",
           c: "uniform sampler2D u1,u5;uniform float u50,u51,u46;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);float c=(1.-u46)*(u51-u50)+u50;gl_FragColor=mix(b,a,c*f);}",
           f: ["u1", "u5", "u50", "u51", "u46"],
           precision: "highp"
         }]);
         p.I("s47", [{
           type: "1i",
           name: "u1",
           value: 0
         }, {
           type: "1i",
           name: "u35",
           value: 1
         }, {
           type: "2f",
           name: "u36",
           value: ca
         }]);
         p.I("s49", [{
           type: "1i",
           name: "u35",
           value: 0
         }, {
           type: "2f",
           name: "u36",
           value: ca
         }]);
         p.I("s48", [{
           type: "1i",
           name: "u37",
           value: 0
         }, {
           type: "1i",
           name: "u35",
           value: 1
         }, {
           type: "1f",
           name: "u40",
           value: c.Cc
         }, {
           type: "1f",
           name: "u41",
           value: c.zc
         }, {
           type: "1f",
           name: "u42",
           value: c.ad
         }, {
           type: "1f",
           name: "u43",
           value: c.Kb
         }, {
           type: "1f",
           name: "u44",
           value: c.Jb
         }, {
           type: "1f",
           name: "u45",
           value: ca[0]
         }]);
         p.I("s50", [{
           type: "1i",
           name: "u1",
           value: 0
         }, {
           type: "1i",
           name: "u5",
           value: 1
         }, {
           type: "1f",
           name: "u50",
           value: c.Ta[0]
         }, {
           type: "1f",
           name: "u51",
           value: c.Ta[1]
         }]);
         fa = H.a({
           isPot: !1,
           isFloat: !1,
           width: E,
           height: C
         });
         var x = new Float32Array([0, c.borderWidth, c.X, 0]);
         (function(a) {
           a.Fa = H.a({
             isPot: !1,
             Nd: !0,
             isFloat: !1,
             width: E,
             height: C
           });
           a.Ga = H.a({
             isPot: !0,
             isFloat: !1,
             width: c.ka
           });
           var b = {
             width: 1,
             height: 1,
             isFloat: !0,
             isPot: !1,
             array: x
           };
           a.sa = Ea.a(b);
           a.Zc = Ea.a(b)
         })(I);
         ka(function(n) {
           n = JSON.parse(n);
           ha = new Qa;
           ha.Qc(n.layers);
           ha.Sc({
             ub: "gpuRaw",
             Kc: function(n) {
               var q = I;
               q.sa.Db(1);
               k.viewport(0, 0, 1, 1);
               p.set("s48");
               p.A("u46", ea);
               p.Eb("u38", b, d, e);
               p.Eb("u39", 1 * c.Oa[0], 1 * c.Oa[1], 1 * c.Oa[2]);
               z.g(!1, !1);
               1 !== ++a % 2 && (e += h, e > J && (b += g, e = Q, b > l && (b = m, d += f, d > v && (d = r))));
               q.Zc.Db(1);
               p.set("s50");
               p.A("u46", ea);
               q.sa.b(0);
               z.g(!1, !1);
               H.Mc(n, R);
               A();
               if (!c.cc && S.F)
                 for (q = 0; 3 > q; ++q) n = t(q + c.Bb[0], c.Bb[1]), n = (2 * n - 1) * c.Nc[q], n += c.Oc[q], T[q] = n;
               u();
               n = Date.now();
               q = n - V;
               ia = qa(c.xb[0], c.xb[1], t(c.wb[0], c.wb[1]));
               var x = t(c.T[0], c.T[1]),
                 B = t(c.T[0] + 1, c.T[1]),
                 C = t(c.T[0] + 2, c.T[1]),
                 D = x - P[0],
                 E = B - P[1],
                 F = C - P[2];
               Ba = 1 - qa(c.zb[0], c.zb[1], Math.sqrt(D * D + E * E + F * F) / q);
               P[0] = x;
               P[1] = B;
               P[2] = C;
               x = ja[0] - T[0];
               B = ja[1] - T[1];
               C = ja[2] - T[2];
               q = Math.sqrt(x * x + B * B + C * C) / q;
               ja[0] = T[0];
               ja[1] = T[1];
               ja[2] = T[2];
               Ca = 1 - qa(c.yb[0], c.yb[1], q);
               ea = ia * Ba * Ca;
               V = n;
               X[da] = ea;
               da = (da + 1) % c.Ka;
               for (n = 0; n < c.Ka; ++n) ea = Math.min(X[n], ea);
               cb.Yc(Z, ea, G.fa);
               aa && aa(ea, G.fa);
               if (S.F)
                 for (n = c.Ua[1] * ea + c.Ua[0] * (1 - ea), n *= G.fa, q = 0; 3 > q; ++q) ma[q] = n * T[q] + (1 - n) * ma[q], N[q] = ma[q];
               else n = Date.now(), O[0] = c.Va[0] * Math.sin(n * c.Wa), O[1] = c.Va[1] * Math.cos(n *
                 c.Wa), N[0] = O[0], N[1] = O[1], N[2] = O[2];
               n = I;
               w.G();
               fa.u();
               p.set("s49");
               n.sa.b(0);
               z.g(!1, !1)
             }
           });
           K = ha.oc();
           q()
         })
       }
     }
   }
   U.onLoad = function(a) {
     U.ready ? a() : U.U.push(a)
   };
   U.set_audio = function(a) {
     U.Sa = a
   };
   U.switch_displayVideo = function(a) {
     U.ca = a;
     U.ba && (U.ba.style.display = U.ca ? "block" : "none")
   };
   U.onWebcamAsk = function(a) {
     U.va = a
   };
   U.onContextLost = function(a) {
     U.ua = a
   };
   U.onWebcamGet = function(a) {
     U.wa = a
   };
   U.set_size = function(a, b) {
     c.width = a;
     c.height = b
   };
   U.get_size = function() {
     return {
       width: c.width,
       height: c.height
     }
   };
   U.get_videoStream = function() {
     return db
   };
   U.get_cv = function() {
     return Aa.ia()
   };
   U.init = function(a) {
     var b = eb(),
       d = a.callbackReady ? a.callbackReady : function(a) {
         console.log("ERR:", a)
       },
       e = a.callbackReady ? a.callbackReady.bind(!1) : !1;
     if ("undefined" === typeof a.canvasId) d("NO_CANVASID");
     else if (document.getElementById(a.canvasId))
       if (U.initialized) d("ALREADY_INITIALIZED");
       else {
         U.initialized = !0;
         window.ta = d ? function(a) {
           d(a);
           window.ta = !1
         } : !1;
         a.NNCpath && (c.Qa = a.NNCpath);
         U.U.push(e);
         if (!Aa.i({
             ab: a.canvasId,
             width: c.width,
             height: c.height,
             debug: !1,
             Ha: !1,
             Jc: function() {
               U.ua && U.ua()
             },
             premultipliedAlpha: !1
           })) return d("GL_INCOMPATIBLE"),
           !1;
         U.ba = Aa.ia();
         U.ca || (U.ba.style.display = "none");
         z.i();
         w.i();
         p.i();
         H.i();
         k.depthFunc(k.LEQUAL);
         k.clearDepth(1);
         U.va && U.va();
         bb(function(a, d) {
           db = d;
           U.wa && U.wa();
           var e = a.videoWidth,
             f = a.videoHeight;
           Aa.ia().width = e;
           Aa.ia().height = f;
           c.width = e;
           c.height = f;
           b.tc();
           d = [.5, .5];
           f /= e;
           e = Aa.D() / Aa.s();
           f > e ? 1 >= f ? d[0] *= f : d[1] /= f : (d[0] *= f, f = 1 / e, d[0] *= f, d[1] *= f);
           d[1] *= e;
           b.i(a);
           p.I("s46", [{
             type: "1i",
             name: "u1",
             value: 0
           }, {
             type: "2f",
             name: "u33",
             value: d
           }, {
             type: "2f",
             name: "u34",
             value: [.5, .5]
           }])
         }, function() {
           window.ta && window.ta("WEBCAM_UNAVAILABLE")
         });
         return !0
       }
     else d("INVALID_CANVASID")
   };
   window.JEEFACETRANSFERAPI = U;;
   return JEEFACETRANSFERAPI;
 })();
