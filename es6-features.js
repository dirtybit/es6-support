window.ES6_FEATURE_LIST = [
  {
    "name": "proper tail calls (tail call optimisation)",
    "category": "optimisation",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-tail-position-calls",
    "tests": [
      {
        "name": "direct recursion",
        "browsers": {
          "chrome": null,
          "firefox": null,
          "safari": "10",
          "edge": null
        },
        "code": "\"use strict\";\nreturn (function f(n){\n  if (n <= 0) {\n    return  \"foo\";\n  }\n  return f(n - 1);\n}(1e6)) === \"foo\";"
      },
      {
        "name": "mutual recursion",
        "browsers": {
          "chrome": null,
          "firefox": null,
          "safari": "10",
          "edge": null
        },
        "code": "\"use strict\";\nfunction f(n){\n  if (n <= 0) {\n    return  \"foo\";\n  }\n  return g(n - 1);\n}\nfunction g(n){\n  if (n <= 0) {\n    return  \"bar\";\n  }\n  return f(n - 1);\n}\nreturn f(1e6) === \"foo\" && f(1e6+1) === \"bar\";"
      }
    ]
  },
  {
    "name": "default function parameters",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "49",
          "firefox": "15",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function (a = 1, b = 2) { return a === 3 && b === 2; }(3));"
      },
      {
        "name": "explicit undefined defers to the default",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function (a = 1, b = 2) { return a === 1 && b === 3; }(undefined, 3));"
      },
      {
        "name": "defaults can refer to previous params",
        "browsers": {
          "chrome": "49",
          "firefox": "15",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function (a, b = a) { return b === 5; }(5));"
      },
      {
        "name": "arguments object interaction",
        "browsers": {
          "chrome": "49",
          "firefox": "43",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function (a = \"baz\", b = \"qux\", c = \"quux\") {\n  a = \"corge\";\n  // The arguments object is not mapped to the\n  // parameters, even outside of strict mode.\n  return arguments.length === 2\n    && arguments[0] === \"foo\"\n    && arguments[1] === \"bar\";\n}(\"foo\", \"bar\"));"
      },
      {
        "name": "temporal dead zone",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function(x = 1) {\n  try {\n    eval(\"(function(a=a){}())\");\n    return false;\n  } catch(e) {}\n  try {\n    eval(\"(function(a=b,b){}())\");\n    return false;\n  } catch(e) {}\n  return true;\n}());"
      },
      {
        "name": "separate scope",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function(a=function(){\n  return typeof b === 'undefined';\n}){\n  var b = 1;\n  return a();\n}());"
      },
      {
        "name": "new Function() support",
        "browsers": {
          "chrome": "49",
          "firefox": null,
          "safari": "10",
          "edge": "14"
        },
        "code": "return new Function(\"a = 1\", \"b = 2\",\n  \"return a === 3 && b === 2;\"\n)(3);"
      }
    ]
  },
  {
    "name": "rest parameters",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "47",
          "firefox": "15",
          "safari": "10",
          "edge": "12"
        },
        "code": "return (function (foo, ...args) {\n  return args instanceof Array && args + \"\" === \"bar,baz\";\n}(\"foo\", \"bar\", \"baz\"));"
      },
      {
        "name": "function 'length' property",
        "browsers": {
          "chrome": "47",
          "firefox": "15",
          "safari": "10",
          "edge": "12"
        },
        "code": "return function(a, ...b){}.length === 1 && function(...c){}.length === 0;"
      },
      {
        "name": "arguments object interaction",
        "browsers": {
          "chrome": "47",
          "firefox": "43",
          "safari": "10",
          "edge": "12"
        },
        "code": "return (function (foo, ...args) {\n  foo = \"qux\";\n  // The arguments object is not mapped to the\n  // parameters, even outside of strict mode.\n  return arguments.length === 3\n    && arguments[0] === \"foo\"\n    && arguments[1] === \"bar\"\n    && arguments[2] === \"baz\";\n}(\"foo\", \"bar\", \"baz\"));"
      },
      {
        "name": "can't be used in setters",
        "browsers": {
          "chrome": "47",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return (function (...args) {\n  try {\n    eval(\"({set e(...args){}})\");\n  } catch(e) {\n    return true;\n  }\n}());"
      },
      {
        "name": "new Function() support",
        "browsers": {
          "chrome": "47",
          "firefox": "15",
          "safari": "10",
          "edge": "12"
        },
        "code": "return new Function(\"a\", \"...b\",\n  \"return b instanceof Array && a+b === 'foobar,baz';\"\n)('foo','bar','baz');"
      }
    ]
  },
  {
    "name": "spread (...) operator",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation",
    "tests": [
      {
        "name": "with arrays, in function calls",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return Math.max(...[1, 2, 3]) === 3"
      },
      {
        "name": "with arrays, in array literals",
        "browsers": {
          "chrome": "46",
          "firefox": "16",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return [...[1, 2, 3]][2] === 3;"
      },
      {
        "name": "with sparse arrays, in function calls",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var a = Array(...[,,]);\nreturn \"0\" in a && \"1\" in a && '' + a[0] + a[1] === \"undefinedundefined\";"
      },
      {
        "name": "with sparse arrays, in array literals",
        "browsers": {
          "chrome": "46",
          "firefox": "16",
          "safari": "7.1",
          "edge": "13"
        },
        "code": "var a = [...[,,]];\nreturn \"0\" in a && \"1\" in a && '' + a[0] + a[1] === \"undefinedundefined\";"
      },
      {
        "name": "with strings, in function calls",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Math.max(...\"1234\") === 4;"
      },
      {
        "name": "with strings, in array literals",
        "browsers": {
          "chrome": "46",
          "firefox": "17",
          "safari": "9",
          "edge": "12"
        },
        "code": "return [\"a\", ...\"bcd\", \"e\"][3] === \"d\";"
      },
      {
        "name": "with astral plane strings, in function calls",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Array(...\"𠮷𠮶\")[0] === \"𠮷\";"
      },
      {
        "name": "with astral plane strings, in array literals",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "9",
          "edge": "12"
        },
        "code": "return [...\"𠮷𠮶\"][0] === \"𠮷\";"
      },
      {
        "name": "with generator instances, in calls",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterable = (function*(){ yield 1; yield 2; yield 3; }());\nreturn Math.max(...iterable) === 3;"
      },
      {
        "name": "with generator instances, in arrays",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterable = (function*(){ yield \"b\"; yield \"c\"; yield \"d\"; }());\nreturn [\"a\", ...iterable, \"e\"][3] === \"d\";"
      },
      {
        "name": "with generic iterables, in calls",
        "browsers": {
          "chrome": "46",
          "firefox": "36",
          "safari": "10",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([1, 2, 3]);\nreturn Math.max(...iterable) === 3;"
      },
      {
        "name": "with generic iterables, in arrays",
        "browsers": {
          "chrome": "46",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([\"b\", \"c\", \"d\"]);\nreturn [\"a\", ...iterable, \"e\"][3] === \"d\";"
      },
      {
        "name": "with instances of iterables, in calls",
        "browsers": {
          "chrome": "46",
          "firefox": "36",
          "safari": "10",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([1, 2, 3]);\nreturn Math.max(...Object.create(iterable)) === 3;"
      },
      {
        "name": "with instances of iterables, in arrays",
        "browsers": {
          "chrome": "46",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([\"b\", \"c\", \"d\"]);\nreturn [\"a\", ...Object.create(iterable), \"e\"][3] === \"d\";"
      },
      {
        "name": "spreading non-iterables is a runtime error",
        "browsers": {
          "chrome": "46",
          "firefox": "27",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "try {\n  Math.max(...2);\n} catch(e) {\n  return Math.max(...[1, 2, 3]) === 3;\n}"
      }
    ]
  },
  {
    "name": "object literal extensions",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-object-initialiser",
    "tests": [
      {
        "name": "computed properties",
        "browsers": {
          "chrome": "44",
          "firefox": "34",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var x = 'y';\nreturn ({ [x]: 1 }).y === 1;"
      },
      {
        "name": "shorthand properties",
        "browsers": {
          "chrome": "43",
          "firefox": "33",
          "safari": "9",
          "edge": "12"
        },
        "code": "var a = 7, b = 8, c = {a,b};\nreturn c.a === 7 && c.b === 8;"
      },
      {
        "name": "shorthand methods",
        "browsers": {
          "chrome": "43",
          "firefox": null,
          "safari": "9",
          "edge": "12"
        },
        "code": "return ({ y() { return 2; } }).y() === 2;"
      },
      {
        "name": "string-keyed shorthand methods",
        "browsers": {
          "chrome": "43",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "return ({ \"foo bar\"() { return 4; } })[\"foo bar\"]() === 4;"
      },
      {
        "name": "computed shorthand methods",
        "browsers": {
          "chrome": "44",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var x = 'y';\nreturn ({ [x](){ return 1 } }).y() === 1;"
      },
      {
        "name": "computed accessors",
        "browsers": {
          "chrome": "44",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "var x = 'y',\n    valueSet,\n    obj = {\n      get [x] () { return 1 },\n      set [x] (value) { valueSet = value }\n    };\nobj.y = 'foo';\nreturn obj.y === 1 && valueSet === 'foo';"
      }
    ]
  },
  {
    "name": "for..of loops",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements",
    "tests": [
      {
        "name": "with arrays",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var arr = [5];\nfor (var item of arr)\n  return item === 5;"
      },
      {
        "name": "with sparse arrays",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var arr = [,,];\nvar count = 0;\nfor (var item of arr)\n  count += (item === undefined);\nreturn count === 2;"
      },
      {
        "name": "with strings",
        "browsers": {
          "chrome": "38",
          "firefox": "17",
          "safari": "9",
          "edge": "12"
        },
        "code": "var str = \"\";\nfor (var item of \"foo\")\n  str += item;\nreturn str === \"foo\";"
      },
      {
        "name": "with astral plane strings",
        "browsers": {
          "chrome": "38",
          "firefox": "27",
          "safari": "9",
          "edge": "12"
        },
        "code": "var str = \"\";\nfor (var item of \"𠮷𠮶\")\n  str += item + \" \";\nreturn str === \"𠮷 𠮶 \";"
      },
      {
        "name": "with generator instances",
        "browsers": {
          "chrome": "38",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var result = \"\";\nvar iterable = (function*(){ yield 1; yield 2; yield 3; }());\nfor (var item of iterable) {\n  result += item;\n}\nreturn result === \"123\";"
      },
      {
        "name": "with generic iterables",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var result = \"\";\nvar iterable = global.__createIterableObject([1, 2, 3]);\nfor (var item of iterable) {\n  result += item;\n}\nreturn result === \"123\";"
      },
      {
        "name": "with instances of generic iterables",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var result = \"\";\nvar iterable = global.__createIterableObject([1, 2, 3]);\nfor (var item of Object.create(iterable)) {\n  result += item;\n}\nreturn result === \"123\";"
      },
      {
        "name": "iterator closing, break",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = __createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\nfor (var it of iter) break;\nreturn closed;"
      },
      {
        "name": "iterator closing, throw",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = __createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\ntry {\n  for (var it of iter) throw 0;\n} catch(e){}\nreturn closed;"
      }
    ]
  },
  {
    "name": "octal and binary literals",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals",
    "tests": [
      {
        "name": "octal literals",
        "browsers": {
          "chrome": "41",
          "firefox": "25",
          "safari": "9",
          "edge": "12"
        },
        "code": "return 0o10 === 8 && 0O10 === 8;"
      },
      {
        "name": "binary literals",
        "browsers": {
          "chrome": "41",
          "firefox": "25",
          "safari": "9",
          "edge": "12"
        },
        "code": "return 0b10 === 2 && 0B10 === 2;"
      },
      {
        "name": "octal supported by Number()",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Number('0o1') === 1;"
      },
      {
        "name": "binary supported by Number()",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Number('0b1') === 1;"
      }
    ]
  },
  {
    "name": "template literals",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "41",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var a = \"ba\", b = \"QUX\";\nreturn `foo bar\n${a + \"z\"} ${b.toLowerCase()}` === \"foo bar\\nbaz qux\";"
      },
      {
        "name": "toString conversion",
        "browsers": {
          "chrome": "41",
          "firefox": "34",
          "safari": "9",
          "edge": "13"
        },
        "code": "var a = {\n  toString: function() { return \"foo\"; },\n  valueOf: function() { return \"bar\"; },\n};\nreturn `${a}` === \"foo\";"
      },
      {
        "name": "tagged template literals",
        "browsers": {
          "chrome": "41",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var called = false;\nfunction fn(parts, a, b) {\n  called = true;\n  return parts instanceof Array &&\n    parts[0]     === \"foo\"      &&\n    parts[1]     === \"bar\\n\"    &&\n    parts.raw[0] === \"foo\"      &&\n    parts.raw[1] === \"bar\\\\n\"   &&\n    a === 123                   &&\n    b === 456;\n}\nreturn fn `foo${123}bar\\n${456}` && called;"
      },
      {
        "name": "passed array is frozen",
        "browsers": {
          "chrome": "41",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "return (function(parts) {\n  return Object.isFrozen(parts) && Object.isFrozen(parts.raw);\n}) `foo${0}bar${0}baz`;"
      },
      {
        "name": "line break normalisation",
        "browsers": {
          "chrome": "41",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var cr   = eval(\"`x\" + String.fromCharCode(13)    + \"y`\");\nvar lf   = eval(\"`x\" + String.fromCharCode(10)    + \"y`\");\nvar crlf = eval(\"`x\" + String.fromCharCode(13,10) + \"y`\");\n\nreturn cr.length === 3 && lf.length === 3 && crlf.length === 3\n  && cr[1] === lf[1] && lf[1] === crlf[1] && crlf[1] === '\\n';"
      }
    ]
  },
  {
    "name": "RegExp \"y\" and \"u\" flags",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky",
    "tests": [
      {
        "name": "\"y\" flag",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "13"
        },
        "code": "var re = new RegExp('\\\\w', 'y');\nre.exec('xy');\nreturn (re.exec('xy')[0] === 'y');"
      },
      {
        "name": "\"y\" flag, lastIndex",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "13"
        },
        "code": "var re = new RegExp('yy', 'y');\nre.lastIndex = 3;\nvar result = re.exec('xxxyyxx')[0];\nreturn result === 'yy' && re.lastIndex === 5;"
      },
      {
        "name": "\"u\" flag",
        "browsers": {
          "chrome": "50",
          "firefox": "46",
          "safari": "10",
          "edge": "12"
        },
        "code": "return \"𠮷\".match(/^.$/u)[0].length === 2;"
      },
      {
        "name": "\"u\" flag, Unicode code point escapes",
        "browsers": {
          "chrome": "50",
          "firefox": "46",
          "safari": "10",
          "edge": "12"
        },
        "code": "return \"𝌆\".match(/\\u{1d306}/u)[0].length === 2;"
      },
      {
        "name": "\"u\" flag, case folding",
        "browsers": {
          "chrome": "50",
          "firefox": "46",
          "safari": "10",
          "edge": "13"
        },
        "code": "return \"ſ\".match(/S/iu) && \"S\".match(/ſ/iu);"
      }
    ]
  },
  {
    "name": "destructuring, declarations",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment",
    "tests": [
      {
        "name": "with arrays",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var [a, , [b], c] = [5, null, [6]];\nreturn a === 5 && b === 6 && c === undefined;"
      },
      {
        "name": "with sparse arrays",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var [a, , b] = [,,,];\nreturn a === undefined && b === undefined;"
      },
      {
        "name": "with strings",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var [a, b, c] = \"ab\";\nreturn a === \"a\" && b === \"b\" && c === undefined;"
      },
      {
        "name": "with astral plane strings",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "9",
          "edge": "14"
        },
        "code": "var [c] = \"𠮷𠮶\";\nreturn c === \"𠮷\";"
      },
      {
        "name": "with generator instances",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "14"
        },
        "code": "var [a, b, c] = (function*(){ yield 1; yield 2; }());\nreturn a === 1 && b === 2 && c === undefined;"
      },
      {
        "name": "with generic iterables",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "14"
        },
        "code": "var [a, b, c] = global.__createIterableObject([1, 2]);\nreturn a === 1 && b === 2 && c === undefined;"
      },
      {
        "name": "with instances of generic iterables",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "14"
        },
        "code": "var [a, b, c] = Object.create(global.__createIterableObject([1, 2]));\nreturn a === 1 && b === 2 && c === undefined;"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\nvar [a, b] = iter;\nreturn closed;"
      },
      {
        "name": "trailing commas in iterable patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "10",
          "edge": "14"
        },
        "code": "var [a,] = [1];\nreturn a === 1;"
      },
      {
        "name": "with objects",
        "browsers": {
          "chrome": "49",
          "firefox": "15",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var {c, x:d, e} = {c:7, x:8};\nreturn c === 7 && d === 8 && e === undefined;"
      },
      {
        "name": "object destructuring with primitives",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var {toFixed} = 2;\nvar {slice} = '';\nreturn toFixed === Number.prototype.toFixed\n  && slice === String.prototype.slice;"
      },
      {
        "name": "trailing commas in object patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "14"
        },
        "code": "var {a,} = {a:1};\nreturn a === 1;"
      },
      {
        "name": "throws on null and undefined",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "try {\n  var {a} = null;\n  return false;\n} catch(e) {\n  if (!(e instanceof TypeError))\n    return false;\n}\ntry {\n  var {b} = undefined;\n  return false;\n} catch(e) {\n  if (!(e instanceof TypeError))\n    return false;\n}\nreturn true;"
      },
      {
        "name": "computed properties",
        "browsers": {
          "chrome": "49",
          "firefox": "35",
          "safari": "10",
          "edge": "14"
        },
        "code": "var qux = \"corge\";\nvar { [qux]: grault } = { corge: \"garply\" };\nreturn grault === \"garply\";"
      },
      {
        "name": "multiples in a single var statement",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "9",
          "edge": "14"
        },
        "code": "var [a,b] = [5,6], {c,d} = {c:7,d:8};\nreturn a === 5 && b === 6 && c === 7 && d === 8;"
      },
      {
        "name": "nested",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var [e, {x:f, g}] = [9, {x:10}];\nvar {h, x:[i]} = {h:11, x:[12]};\nreturn e === 9 && f === 10 && g === undefined\n  && h === 11 && i === 12;"
      },
      {
        "name": "in for-in loop heads",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "for(var [i, j, k] in { qux: 1 }) {\n  return i === \"q\" && j === \"u\" && k === \"x\";\n}"
      },
      {
        "name": "in for-of loop heads",
        "browsers": {
          "chrome": "49",
          "firefox": "13",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "for(var [i, j, k] of [[1,2,3]]) {\n  return i === 1 && j === 2 && k === 3;\n}"
      },
      {
        "name": "in catch heads",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "14"
        },
        "code": "try {\n  throw [1,2];\n} catch([i,j]) {\n  try {\n    throw { k: 3, l: 4 };\n  } catch({k, l}) {\n    return i === 1 && j === 2 && k === 3 && l === 4;\n  }\n}"
      },
      {
        "name": "rest",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "9",
          "edge": "14"
        },
        "code": "var [a, ...b] = [3, 4, 5];\nvar [c, ...d] = [6];\nreturn a === 3 && b instanceof Array && (b + \"\") === \"4,5\" &&\n   c === 6 && d instanceof Array && d.length === 0;"
      },
      {
        "name": "defaults",
        "browsers": {
          "chrome": "49",
          "firefox": "47",
          "safari": "9",
          "edge": "14"
        },
        "code": "var {a = 1, b = 0, z:c = 3} = {b:2, z:undefined};\nvar [d = 0, e = 5, f = 6] = [4,,undefined];\nreturn a === 1 && b === 2 && c === 3\n  && d === 4 && e === 5 && f === 6;"
      },
      {
        "name": "defaults, let temporal dead zone",
        "browsers": {
          "chrome": "49",
          "firefox": "47",
          "safari": "9",
          "edge": "14"
        },
        "code": "var {a, b = 2} = {a:1};\ntry {\n  eval(\"let {c = c} = {};\");\n  return false;\n} catch(e){}\ntry {\n  eval(\"let {c = d, d} = {d:1};\");\n  return false;\n} catch(e){}\nreturn a === 1 && b === 2;"
      }
    ]
  },
  {
    "name": "destructuring, assignment",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment",
    "tests": [
      {
        "name": "with arrays",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a,b,c;\n[a, , [b], c] = [5, null, [6]];\nreturn a === 5 && b === 6 && c === undefined;"
      },
      {
        "name": "with sparse arrays",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a, b;\n[a, , b] = [,,,];\nreturn a === undefined && b === undefined;"
      },
      {
        "name": "with strings",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a,b,c;\n[a, b, c] = \"ab\";\nreturn a === \"a\" && b === \"b\" && c === undefined;"
      },
      {
        "name": "with astral plane strings",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "9",
          "edge": "14"
        },
        "code": "var c;\n[c] = \"𠮷𠮶\";\nreturn c === \"𠮷\";"
      },
      {
        "name": "with generator instances",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "14"
        },
        "code": "var a,b,c;\n[a, b, c] = (function*(){ yield 1; yield 2; }());\nreturn a === 1 && b === 2 && c === undefined;"
      },
      {
        "name": "with generic iterables",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "14"
        },
        "code": "var a,b,c;\n[a, b, c] = global.__createIterableObject([1, 2]);\nreturn a === 1 && b === 2 && c === undefined;"
      },
      {
        "name": "with instances of generic iterables",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "14"
        },
        "code": "var a,b,c;\n[a, b, c] = Object.create(global.__createIterableObject([1, 2]));\nreturn a === 1 && b === 2 && c === undefined;"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\nvar a,b;\n[a, b] = iter;\nreturn closed;"
      },
      {
        "name": "iterable destructuring expression",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a, b, iterable = [1,2];\nreturn ([a, b] = iterable) === iterable;"
      },
      {
        "name": "chained iterable destructuring",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a,b,c,d;\n[a,b] = [c,d] = [1,2];\nreturn a === 1 && b === 2 && c === 1 && d === 2;"
      },
      {
        "name": "trailing commas in iterable patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "10",
          "edge": "14"
        },
        "code": "var a;\n[a,] = [1];\nreturn a === 1;"
      },
      {
        "name": "with objects",
        "browsers": {
          "chrome": "49",
          "firefox": "15",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var c,d,e;\n({c, x:d, e} = {c:7, x:8});\nreturn c === 7 && d === 8 && e === undefined;"
      },
      {
        "name": "object destructuring with primitives",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var toFixed, slice;\n({toFixed} = 2);\n({slice} = '');\nreturn toFixed === Number.prototype.toFixed\n  && slice === String.prototype.slice;"
      },
      {
        "name": "trailing commas in object patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "14"
        },
        "code": "var a;\n({a,} = {a:1});\nreturn a === 1;"
      },
      {
        "name": "object destructuring expression",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a, b, obj = { a:1, b:2 };\nreturn ({a,b} = obj) === obj;"
      },
      {
        "name": "parenthesised left-hand-side is a syntax error",
        "browsers": {
          "chrome": "49",
          "firefox": "41",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a, b;\n({a,b} = {a:1,b:2});\ntry {\n  eval(\"({a,b}) = {a:3,b:4};\");\n}\ncatch(e) {\n  return a === 1 && b === 2;\n}"
      },
      {
        "name": "chained object destructuring",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "14"
        },
        "code": "var a,b,c,d;\n({a,b} = {c,d} = {a:1,b:2,c:3,d:4});\nreturn a === 1 && b === 2 && c === 3 && d === 4;"
      },
      {
        "name": "throws on null and undefined",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var a,b;\ntry {\n  ({a} = null);\n  return false;\n} catch(e) {\n  if (!(e instanceof TypeError))\n    return false;\n}\ntry {\n  ({b} = undefined);\n  return false;\n} catch(e) {\n  if (!(e instanceof TypeError))\n    return false;\n}\nreturn true;"
      },
      {
        "name": "computed properties",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "14"
        },
        "code": "var grault, qux = \"corge\";\n({ [qux]: grault } = { corge: \"garply\" });\nreturn grault === \"garply\";"
      },
      {
        "name": "nested",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "var e,f,g,h,i;\n[e, {x:f, g}] = [9, {x:10}];\n({h, x:[i]} = {h:11, x:[12]});\nreturn e === 9 && f === 10 && g === undefined\n  && h === 11 && i === 12;"
      },
      {
        "name": "rest",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "9",
          "edge": "14"
        },
        "code": "var a,b,c,d;\n[a, ...b] = [3, 4, 5];\n[c, ...d] = [6];\nreturn a === 3 && b instanceof Array && (b + \"\") === \"4,5\" &&\n   c === 6 && d instanceof Array && d.length === 0;"
      },
      {
        "name": "nested rest",
        "browsers": {
          "chrome": "49",
          "firefox": "47",
          "safari": "10",
          "edge": "14"
        },
        "code": "var a = [1, 2, 3], first, last;\n[first, ...[a[2], last]] = a;\nreturn first === 1 && last === 3 && (a + \"\") === \"1,2,2\";"
      },
      {
        "name": "empty patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "10",
          "edge": "14"
        },
        "code": "[] = [1,2];\n({} = {a:1,b:2});\nreturn true;"
      },
      {
        "name": "defaults",
        "browsers": {
          "chrome": "49",
          "firefox": "47",
          "safari": "9",
          "edge": "14"
        },
        "code": "var a,b,c,d,e,f;\n({a = 1, b = 0, z:c = 3} = {b:2, z:undefined});\n[d = 0, e = 5, f = 6] = [4,,undefined];\nreturn a === 1 && b === 2 && c === 3\n  && d === 4 && e === 5 && f === 6;"
      }
    ]
  },
  {
    "name": "destructuring, parameters",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment",
    "tests": [
      {
        "name": "with arrays",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function([a, , [b], c]) {\n  return a === 5 && b === 6 && c === undefined;\n}([5, null, [6]]);"
      },
      {
        "name": "with sparse arrays",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function([a, , b]) {\n  return a === undefined && b === undefined;\n}([,,,]);"
      },
      {
        "name": "with strings",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function([a, b, c]) {\n  return a === \"a\" && b === \"b\" && c === undefined;\n}(\"ab\");"
      },
      {
        "name": "with astral plane strings",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "9",
          "edge": "14"
        },
        "code": "return function([c]) {\n  return c === \"𠮷\";\n}(\"𠮷𠮶\");"
      },
      {
        "name": "with generator instances",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "14"
        },
        "code": "return function([a, b, c]) {\n  return a === 1 && b === 2 && c === undefined;\n}(function*(){ yield 1; yield 2; }());"
      },
      {
        "name": "with generic iterables",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "14"
        },
        "code": "return function([a, b, c]) {\n  return a === 1 && b === 2 && c === undefined;\n}(global.__createIterableObject([1, 2]));"
      },
      {
        "name": "with instances of generic iterables",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "14"
        },
        "code": "return function([a, b, c]) {\n  return a === 1 && b === 2 && c === undefined;\n}(Object.create(global.__createIterableObject([1, 2])));"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\n(function([a,b]) {}(iter));\nreturn closed;"
      },
      {
        "name": "trailing commas in iterable patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "10",
          "edge": "14"
        },
        "code": "return function([a,]) {\n  return a === 1;\n}([1]);"
      },
      {
        "name": "with objects",
        "browsers": {
          "chrome": "49",
          "firefox": "16",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function({c, x:d, e}) {\n  return c === 7 && d === 8 && e === undefined;\n}({c:7, x:8});"
      },
      {
        "name": "object destructuring with primitives",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function({toFixed}, {slice}) {\n  return toFixed === Number.prototype.toFixed\n    && slice === String.prototype.slice;\n}(2,'');"
      },
      {
        "name": "trailing commas in object patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "10",
          "edge": "14"
        },
        "code": "return function({a,}) {\n  return a === 1;\n}({a:1});"
      },
      {
        "name": "throws on null and undefined",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "try {\n  (function({a}){}(null));\n  return false;\n} catch(e) {}\ntry {\n  (function({b}){}(undefined));\n  return false;\n} catch(e) {}\nreturn true;"
      },
      {
        "name": "computed properties",
        "browsers": {
          "chrome": "49",
          "firefox": "35",
          "safari": "10",
          "edge": "14"
        },
        "code": "var qux = \"corge\";\nreturn function({ [qux]: grault }) {\n  return grault === \"garply\";\n}({ corge: \"garply\" });"
      },
      {
        "name": "nested",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function([e, {x:f, g}], {h, x:[i]}) {\n  return e === 9 && f === 10 && g === undefined\n    && h === 11 && i === 12;\n}([9, {x:10}],{h:11, x:[12]});"
      },
      {
        "name": "'arguments' interaction",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return (function({a, x:b, y:e}, [c, d]) {\n  return arguments[0].a === 1 && arguments[0].x === 2\n    && !(\"y\" in arguments[0]) && arguments[1] + '' === \"3,4\";\n}({a:1, x:2}, [3, 4]));"
      },
      {
        "name": "new Function() support",
        "browsers": {
          "chrome": "49",
          "firefox": null,
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return new Function(\"{a, x:b, y:e}\",\"[c, d]\",\n  \"return a === 1 && b === 2 && c === 3 && \"\n  + \"d === 4 && e === undefined;\"\n)({a:1, x:2}, [3, 4]);"
      },
      {
        "name": "in parameters, function 'length' property",
        "browsers": {
          "chrome": "49",
          "firefox": "3",
          "safari": "7.1",
          "edge": "14"
        },
        "code": "return function({a, b}, [c, d]){}.length === 2;"
      },
      {
        "name": "rest",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "9",
          "edge": "14"
        },
        "code": "return function([a, ...b], [c, ...d]) {\n  return a === 3 && b instanceof Array && (b + \"\") === \"4,5\" &&\n     c === 6 && d instanceof Array && d.length === 0;\n}([3, 4, 5], [6]);"
      },
      {
        "name": "empty patterns",
        "browsers": {
          "chrome": "49",
          "firefox": "2",
          "safari": "10",
          "edge": "14"
        },
        "code": "return function ([],{}){\n  return arguments[0] + '' === \"3,4\" && arguments[1].x === \"foo\";\n}([3,4],{x:\"foo\"});"
      },
      {
        "name": "defaults",
        "browsers": {
          "chrome": "49",
          "firefox": "47",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function({a = 1, b = 0, c = 3, x:d = 0, y:e = 5},\n    [f = 6, g = 0, h = 8]) {\n  return a === 1 && b === 2 && c === 3 && d === 4 &&\n    e === 5 && f === 6 && g === 7 && h === 8;\n}({b:2, c:undefined, x:4},[, 7, undefined]));"
      },
      {
        "name": "defaults, separate scope",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "return (function({a=function(){\n  return typeof b === 'undefined';\n}}){\n  var b = 1;\n  return a();\n}({}));"
      },
      {
        "name": "defaults, new Function() support",
        "browsers": {
          "chrome": "49",
          "firefox": null,
          "safari": "10",
          "edge": "14"
        },
        "code": "return new Function(\"{a = 1, b = 0, c = 3, x:d = 0, y:e = 5}\",\n  \"return a === 1 && b === 2 && c === 3 && d === 4 && e === 5;\"\n)({b:2, c:undefined, x:4});"
      }
    ]
  },
  {
    "name": "Unicode code point escapes",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-literals-string-literals",
    "tests": [
      {
        "name": "in strings",
        "browsers": {
          "chrome": "44",
          "firefox": "40",
          "safari": "9",
          "edge": "12"
        },
        "code": "return '\\u{1d306}' == '\\ud834\\udf06';"
      },
      {
        "name": "in identifiers",
        "browsers": {
          "chrome": "44",
          "firefox": null,
          "safari": "9",
          "edge": "12"
        },
        "code": "var \\u{102C0} = { \\u{102C0} : 2 };\nreturn \\u{102C0}['\\ud800\\udec0'] === 2;"
      }
    ]
  },
  {
    "name": "new.target",
    "category": "syntax",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-built-in-function-objects",
    "tests": [
      {
        "name": "in constructors",
        "browsers": {
          "chrome": "46",
          "firefox": "41",
          "safari": "10",
          "edge": "13"
        },
        "code": "var passed = false;\nnew function f() {\n  passed = (new.target === f);\n}();\n(function() {\n  passed &= (new.target === undefined);\n}());\nreturn passed;"
      },
      {
        "name": "assignment is an early error",
        "browsers": {
          "chrome": "46",
          "firefox": "41",
          "safari": "10",
          "edge": "14"
        },
        "code": "var passed = false;\nnew function f() {\n  passed = (new.target === f);\n}();\n\ntry {\n  Function(\"new.target = function(){};\");\n} catch(e) {\n  return passed;\n}"
      }
    ]
  },
  {
    "name": "const",
    "category": "bindings",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations",
    "tests": [
      {
        "name": "basic support",
        "browsers": {
          "chrome": "19",
          "firefox": "3",
          "safari": "51",
          "edge": null
        },
        "code": "const foo = 123;\nreturn (foo === 123);"
      },
      {
        "name": "is block-scoped",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "const bar = 123;\n{ const bar = 456; }\nreturn bar === 123;"
      },
      {
        "name": "cannot be in statements",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "const bar = 1;\ntry {\n  Function(\"if(true) const baz = 1;\")();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "redefining a const is an error",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "const baz = 1;\ntry {\n  Function(\"const foo = 1; foo = 2;\")();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "for loop statement scope",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "const baz = 1;\nfor(const baz = 0; false;) {}\nreturn baz === 1;"
      },
      {
        "name": "for-in loop iteration scope",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "var scopes = [];\nfor(const i in { a:1, b:1 }) {\n  scopes.push(function(){ return i; });\n}\nreturn (scopes[0]() === \"a\" && scopes[1]() === \"b\");"
      },
      {
        "name": "for-of loop iteration scope",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "var scopes = [];\nfor(const i of ['a','b']) {\n  scopes.push(function(){ return i; });\n}\nreturn (scopes[0]() === \"a\" && scopes[1]() === \"b\");"
      },
      {
        "name": "temporal dead zone",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "var passed = (function(){ try { qux; } catch(e) { return true; }}());\nfunction fn() { passed &= qux === 456; }\nconst qux = 456;\nfn();\nreturn passed;"
      },
      {
        "name": "basic support (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "3",
          "safari": "10",
          "edge": null
        },
        "code": "\"use strict\";\nconst foo = 123;\nreturn (foo === 123);"
      },
      {
        "name": "is block-scoped (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nconst bar = 123;\n{ const bar = 456; }\nreturn bar === 123;"
      },
      {
        "name": "cannot be in statements (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nconst bar = 1;\ntry {\n  Function(\"'use strict'; if(true) const baz = 1;\")();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "redefining a const (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "7",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nconst baz = 1;\ntry {\n  Function(\"'use strict'; const foo = 1; foo = 2;\")();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "for loop statement scope (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nconst baz = 1;\nfor(const baz = 0; false;) {}\nreturn baz === 1;"
      },
      {
        "name": "for-in loop iteration scope (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "'use strict';\nvar scopes = [];\nfor(const i in { a:1, b:1 }) {\n  scopes.push(function(){ return i; });\n}\nreturn (scopes[0]() === \"a\" && scopes[1]() === \"b\");"
      },
      {
        "name": "for-of loop iteration scope (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "'use strict';\nvar scopes = [];\nfor(const i of ['a','b']) {\n  scopes.push(function(){ return i; });\n}\nreturn (scopes[0]() === \"a\" && scopes[1]() === \"b\");"
      },
      {
        "name": "temporal dead zone (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nvar passed = (function(){ try { qux; } catch(e) { return true; }}());\nfunction fn() { passed &= qux === 456; }\nconst qux = 456;\nfn();\nreturn passed;"
      }
    ]
  },
  {
    "name": "let",
    "category": "bindings",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations",
    "tests": [
      {
        "name": "basic support",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "let foo = 123;\nreturn (foo === 123);"
      },
      {
        "name": "is block-scoped",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "let bar = 123;\n{ let bar = 456; }\nreturn bar === 123;"
      },
      {
        "name": "cannot be in statements",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "let bar = 1;\ntry {\n  Function(\"if(true) let baz = 1;\")();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "for loop statement scope",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "let baz = 1;\nfor(let baz = 0; false;) {}\nreturn baz === 1;"
      },
      {
        "name": "temporal dead zone",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "var passed = (function(){ try {  qux; } catch(e) { return true; }}());\nfunction fn() { passed &= qux === 456; }\nlet qux = 456;\nfn();\nreturn passed;"
      },
      {
        "name": "for/for-in loop iteration scope",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "let scopes = [];\nfor(let i = 0; i < 2; i++) {\n  scopes.push(function(){ return i; });\n}\nlet passed = (scopes[0]() === 0 && scopes[1]() === 1);\n\nscopes = [];\nfor(let i in { a:1, b:1 }) {\n  scopes.push(function(){ return i; });\n}\npassed &= (scopes[0]() === \"a\" && scopes[1]() === \"b\");\nreturn passed;"
      },
      {
        "name": "basic support (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nlet foo = 123;\nreturn (foo === 123);"
      },
      {
        "name": "is block-scoped (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nlet bar = 123;\n{ let bar = 456; }\nreturn bar === 123;"
      },
      {
        "name": "cannot be in statements (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nlet bar = 1;\ntry {\n  Function(\"'use strict'; if(true) let baz = 1;\")();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "for loop statement scope (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nlet baz = 1;\nfor(let baz = 0; false;) {}\nreturn baz === 1;"
      },
      {
        "name": "temporal dead zone (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nvar passed = (function(){ try {  qux; } catch(e) { return true; }}());\nfunction fn() { passed &= qux === 456; }\nlet qux = 456;\nfn();\nreturn passed;"
      },
      {
        "name": "for/for-in loop iteration scope (strict mode)",
        "browsers": {
          "chrome": "41",
          "firefox": "51",
          "safari": "10",
          "edge": "14"
        },
        "code": "'use strict';\nlet scopes = [];\nfor(let i = 0; i < 2; i++) {\n  scopes.push(function(){ return i; });\n}\nlet passed = (scopes[0]() === 0 && scopes[1]() === 1);\n\nscopes = [];\nfor(let i in { a:1, b:1 }) {\n  scopes.push(function(){ return i; });\n}\npassed &= (scopes[0]() === \"a\" && scopes[1]() === \"b\");\nreturn passed;"
      }
    ]
  },
  {
    "name": "block-level function declaration",
    "category": "bindings",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation",
    "tests": [
      {
        "name": "block-level function declaration",
        "category": "bindings",
        "significance": "small",
        "note_id": "block-level-function",
        "note_html": "Note that prior to ES6, it was <a href=\"http://wiki.ecmascript.org/doku.php?id=conventions:no_non_standard_strict_decls\">recommended</a> that ES5 implementations forbid block-level declarations in strict mode.",
        "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation",
        "browsers": {
          "chrome": "41",
          "firefox": "46",
          "safari": "10",
          "edge": null
        },
        "code": "'use strict';\nif (f() !== 1) return false;\nfunction f() { return 1; }\n{\n  if (f() !== 2) return false;\n  function f() { return 2; }\n  if (f() !== 2) return false;\n}\nif (f() !== 1) return false;\nreturn true;"
      }
    ]
  },
  {
    "name": "arrow functions",
    "category": "functions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions",
    "tests": [
      {
        "name": "0 parameters",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "return (() => 5)() === 5;"
      },
      {
        "name": "1 parameter, no brackets",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var b = x => x + \"foo\";\nreturn (b(\"fee fie foe \") === \"fee fie foe foo\");"
      },
      {
        "name": "multiple parameters",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var c = (v, w, x, y, z) => \"\" + v + w + x + y + z;\nreturn (c(6, 5, 4, 3, 2) === \"65432\");"
      },
      {
        "name": "lexical \"this\" binding",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var d = { x : \"bar\", y : function() { return z => this.x + z; }}.y();\nvar e = { x : \"baz\", y : d };\nreturn d(\"ley\") === \"barley\" && e.y(\"ley\") === \"barley\";"
      },
      {
        "name": "\"this\" unchanged by call or apply",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var d = { x : \"foo\", y : function() { return () => this.x; }};\nvar e = { x : \"bar\" };\nreturn d.y().call(e) === \"foo\" && d.y().apply(e) === \"foo\";"
      },
      {
        "name": "can't be bound, can be curried",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var d = { x : \"bar\", y : function() { return z => this.x + z; }};\nvar e = { x : \"baz\" };\nreturn d.y().bind(e, \"ley\")() === \"barley\";"
      },
      {
        "name": "lexical \"arguments\" binding",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var f = (function() { return z => arguments[0]; }(5));\nreturn f(6) === 5;"
      },
      {
        "name": "no line break between params and <code>=></code>",
        "browsers": {
          "chrome": "45",
          "firefox": "39",
          "safari": "10",
          "edge": "12"
        },
        "code": "return (() => {\n  try { Function(\"x\\n => 2\")(); } catch(e) { return true; }\n})();"
      },
      {
        "name": "correct precedence",
        "browsers": {
          "chrome": "47",
          "firefox": "22",
          "safari": "10",
          "edge": "13"
        },
        "code": "return (() => {\n  try { Function(\"0 || () => 2\")(); } catch(e) { return true; }\n})();"
      },
      {
        "name": "no \"prototype\" property",
        "browsers": {
          "chrome": "45",
          "firefox": "22",
          "safari": "10",
          "edge": "13"
        },
        "code": "var a = () => 5;\nreturn !a.hasOwnProperty(\"prototype\");"
      },
      {
        "name": "lexical \"super\" binding in constructors",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var received;\n\nclass B {\n  constructor (arg) {\n    received = arg;\n  }\n}\nclass C extends B {\n  constructor () {\n    var callSuper = () => super('foo');\n    callSuper();\n  }\n}\nreturn new C instanceof C && received === 'foo'"
      },
      {
        "name": "lexical \"super\" binding in methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class B {\n  qux() {\n    return \"quux\";\n  }\n}\nclass C extends B {\n  baz() {\n    return x => super.qux();\n  }\n}\nvar arrow = new C().baz();\nreturn arrow() === \"quux\";"
      },
      {
        "name": "lexical \"new.target\" binding",
        "browsers": {
          "chrome": "46",
          "firefox": "41",
          "safari": "10",
          "edge": "13"
        },
        "code": "function C() {\n  return x => new.target;\n}\nreturn new C()() === C && C()() === undefined;"
      }
    ]
  },
  {
    "name": "class",
    "category": "functions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions",
    "tests": [
      {
        "name": "class statement",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {}\nreturn typeof C === \"function\";"
      },
      {
        "name": "is block-scoped",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C {}\nvar c1 = C;\n{\n  class C {}\n  var c2 = C;\n}\nreturn C === c1;"
      },
      {
        "name": "class expression",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "return typeof class C {} === \"function\";"
      },
      {
        "name": "anonymous class",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "return typeof class {} === \"function\";"
      },
      {
        "name": "constructor",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  constructor() { this.x = 1; }\n}\nreturn C.prototype.constructor === C\n  && new C().x === 1;"
      },
      {
        "name": "prototype methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  method() { return 2; }\n}\nreturn typeof C.prototype.method === \"function\"\n  && new C().method() === 2;"
      },
      {
        "name": "string-keyed methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  \"foo bar\"() { return 2; }\n}\nreturn typeof C.prototype[\"foo bar\"] === \"function\"\n  && new C()[\"foo bar\"]() === 2;"
      },
      {
        "name": "computed prototype methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var foo = \"method\";\nclass C {\n  [foo]() { return 2; }\n}\nreturn typeof C.prototype.method === \"function\"\n  && new C().method() === 2;"
      },
      {
        "name": "optional semicolons",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  ;\n  method() { return 2; };\n  method2() { return 2; }\n  method3() { return 2; };\n}\nreturn typeof C.prototype.method === \"function\"\n  && typeof C.prototype.method2 === \"function\"\n  && typeof C.prototype.method3 === \"function\";"
      },
      {
        "name": "static methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  static method() { return 3; }\n}\nreturn typeof C.method === \"function\"\n  && C.method() === 3;"
      },
      {
        "name": "computed static methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var foo = \"method\";\nclass C {\n  static [foo]() { return 3; }\n}\nreturn typeof C.method === \"function\"\n  && C.method() === 3;"
      },
      {
        "name": "accessor properties",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "var baz = false;\nclass C {\n  get foo() { return \"foo\"; }\n  set bar(x) { baz = x; }\n}\nnew C().bar = true;\nreturn new C().foo === \"foo\" && baz;"
      },
      {
        "name": "computed accessor properties",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var garply = \"foo\", grault = \"bar\", baz = false;\nclass C {\n  get [garply]() { return \"foo\"; }\n  set [grault](x) { baz = x; }\n}\nnew C().bar = true;\nreturn new C().foo === \"foo\" && baz;"
      },
      {
        "name": "static accessor properties",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "var baz = false;\nclass C {\n  static get foo() { return \"foo\"; }\n  static set bar(x) { baz = x; }\n}\nC.bar = true;\nreturn C.foo === \"foo\" && baz;"
      },
      {
        "name": "computed static accessor properties",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var garply = \"foo\", grault = \"bar\", baz = false;\nclass C {\n  static get [garply]() { return \"foo\"; }\n  static set [grault](x) { baz = x; }\n}\nC.bar = true;\nreturn C.foo === \"foo\" && baz;"
      },
      {
        "name": "class name is lexically scoped",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C {\n  method() { return typeof C === \"function\"; }\n}\nvar M = C.prototype.method;\nC = undefined;\nreturn C === undefined && M();"
      },
      {
        "name": "computed names, temporal dead zone",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "try {\n  var B = class C {\n    [C](){}\n  }\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "methods aren't enumerable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  foo() {}\n  static bar() {}\n}\nreturn !C.prototype.propertyIsEnumerable(\"foo\") && !C.propertyIsEnumerable(\"bar\");"
      },
      {
        "name": "implicit strict mode",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {\n  static method() { return this === undefined; }\n}\nreturn (0,C.method)();"
      },
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C {}\ntry {\n  C();\n}\ncatch(e) {\n  return true;\n}"
      },
      {
        "name": "extends",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class B {}\nclass C extends B {}\nreturn new C() instanceof B\n  && B.isPrototypeOf(C);"
      },
      {
        "name": "extends expressions",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "var B;\nclass C extends (B = class {}) {}\nreturn new C() instanceof B\n  && B.isPrototypeOf(C);"
      },
      {
        "name": "extends null",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C extends null {\n  constructor() { return Object.create(null); }\n}\nreturn Function.prototype.isPrototypeOf(C)\n  && Object.getPrototypeOf(C.prototype) === null;"
      },
      {
        "name": "new.target",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var passed = false;\nnew function f() {\n  passed = new.target === f;\n}();\n\nclass A {\n  constructor() {\n    passed &= new.target === B;\n  }\n}\nclass B extends A {}\nnew B();\nreturn passed;"
      }
    ]
  },
  {
    "name": "super",
    "category": "functions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword",
    "tests": [
      {
        "name": "statement in constructors",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "var passed = false;\nclass B {\n  constructor(a) { passed = (a === \"barbaz\"); }\n}\nclass C extends B {\n  constructor(a) { super(\"bar\" + a); }\n}\nnew C(\"baz\");\nreturn passed;"
      },
      {
        "name": "expression in constructors",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class B {\n  constructor(a) { return [\"foo\" + a]; }\n}\nclass C extends B {\n  constructor(a) { return super(\"bar\" + a); }\n}\nreturn new C(\"baz\")[0] === \"foobarbaz\";"
      },
      {
        "name": "in methods, property access",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class B {}\nB.prototype.qux = \"foo\";\nB.prototype.corge = \"baz\";\nclass C extends B {\n  quux(a) { return super.qux + a + super[\"corge\"]; }\n}\nC.prototype.qux = \"garply\";\nreturn new C().quux(\"bar\") === \"foobarbaz\";"
      },
      {
        "name": "in methods, method calls",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class B {\n  qux(a) { return \"foo\" + a; }\n}\nclass C extends B {\n  qux(a) { return super.qux(\"bar\" + a); }\n}\nreturn new C().qux(\"baz\") === \"foobarbaz\";"
      },
      {
        "name": "method calls use correct \"this\" binding",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class B {\n  qux(a) { return this.foo + a; }\n}\nclass C extends B {\n  qux(a) { return super.qux(\"bar\" + a); }\n}\nvar obj = new C();\nobj.foo = \"foo\";\nreturn obj.qux(\"baz\") === \"foobarbaz\";"
      },
      {
        "name": "constructor calls use correct \"new.target\" binding",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var passed;\nclass B {\n  constructor() { passed = (new.target === C); }\n}\nclass C extends B {\n  constructor() { super(); }\n}\nnew C();\nreturn passed;"
      },
      {
        "name": "is statically bound",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class B {\n  qux() { return \"bar\"; }\n}\nclass C extends B {\n  qux() { return super.qux() + this.corge; }\n}\nvar obj = {\n  qux: C.prototype.qux,\n  corge: \"ley\"\n};\nreturn obj.qux() === \"barley\";"
      },
      {
        "name": "super() invokes the correct constructor",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "// checks that super() is *not* a synonym of super.constructor()\nvar passed;\nclass B {\n    constructor() {\n        passed = true;\n    }\n};\nB.prototype.constructor = function () {\n    passed = false;\n};\nclass C extends B { };\nnew C;\nreturn passed;"
      }
    ]
  },
  {
    "name": "generators",
    "category": "functions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * generator(){\n  yield 5; yield 6;\n};\nvar iterator = generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "generator function expressions",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var generator = function * (){\n  yield 5; yield 6;\n};\nvar iterator = generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "correct \"this\" binding",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * generator(){\n  yield this.x; yield this.y;\n};\nvar iterator = { g: generator, x: 5, y: 6 }.g();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "can't use \"this\" with new",
        "browsers": {
          "chrome": "50",
          "firefox": "43",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * generator(){\n  yield this.x; yield this.y;\n};\ntry {\n  (new generator()).next();\n}\ncatch (e) {\n  return true;\n}"
      },
      {
        "name": "sending",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var sent;\nfunction * generator(){\n  sent = [yield 5, yield 6];\n};\nvar iterator = generator();\niterator.next();\niterator.next(\"foo\");\niterator.next(\"bar\");\nreturn sent[0] === \"foo\" && sent[1] === \"bar\";"
      },
      {
        "name": "%GeneratorPrototype%",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * generatorFn(){}\nvar ownProto = Object.getPrototypeOf(generatorFn());\nvar passed = ownProto === generatorFn.prototype;\n\nvar sharedProto = Object.getPrototypeOf(ownProto);\npassed &= sharedProto !== Object.prototype &&\n  sharedProto === Object.getPrototypeOf(function*(){}.prototype) &&\n  sharedProto.hasOwnProperty('next');\n\nreturn passed;"
      },
      {
        "name": "%GeneratorPrototype% prototype chain",
        "browsers": {
          "chrome": "45",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * generatorFn(){}\nvar g = generatorFn();\nvar ownProto = Object.getPrototypeOf(g);\nvar passed = ownProto === generatorFn.prototype;\n\nvar sharedProto = Object.getPrototypeOf(ownProto);\nvar iterProto = Object.getPrototypeOf(sharedProto);\n\npassed &= iterProto.hasOwnProperty(Symbol.iterator) &&\n  !sharedProto     .hasOwnProperty(Symbol.iterator) &&\n  !ownProto        .hasOwnProperty(Symbol.iterator) &&\n  g[Symbol.iterator]() === g;\n\nreturn passed;"
      },
      {
        "name": "%GeneratorPrototype%.constructor",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * g (){}\nvar iterator = new g.constructor(\"a\",\"b\",\"c\",\"yield a; yield b; yield c;\")(5,6,7);\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 7 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\n\npassed &= g.constructor === (function*(){}).constructor;\nreturn passed;"
      },
      {
        "name": "%GeneratorPrototype%.throw",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var passed = false;\nfunction * generator(){\n  try {\n    yield 5; yield 6;\n  } catch(e) {\n    passed = (e === \"foo\");\n  }\n};\nvar iterator = generator();\niterator.next();\niterator.throw(\"foo\");\nreturn passed;"
      },
      {
        "name": "%GeneratorPrototype%.return",
        "browsers": {
          "chrome": "50",
          "firefox": "38",
          "safari": "10",
          "edge": "13"
        },
        "code": "function * generator(){\n  yield 5; yield 6;\n};\nvar iterator = generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.return(\"quxquux\");\npassed    &= item.value === \"quxquux\" && item.done === true;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield operator precedence",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var passed;\nfunction * generator(){\n  passed = yield 0 ? true : false;\n};\nvar iterator = generator();\niterator.next();\niterator.next(true);\nreturn passed;"
      },
      {
        "name": "yield *, arrays",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * [5, 6];\n}());\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield *, sparse arrays",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * [,,];\n}());\nvar item = iterator.next();\nvar passed = item.value === undefined && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield *, strings",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * \"56\";\n}());\nvar item = iterator.next();\nvar passed = item.value === \"5\" && item.done === false;\nitem = iterator.next();\npassed    &= item.value === \"6\" && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield *, astral plane strings",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * \"𠮷𠮶\";\n}());\nvar item = iterator.next();\nvar passed = item.value === \"𠮷\" && item.done === false;\nitem = iterator.next();\npassed    &= item.value === \"𠮶\" && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield *, generator instances",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * (function*(){ yield 5; yield 6; yield 7; }());\n}());\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 7 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield *, generic iterables",
        "browsers": {
          "chrome": "39",
          "firefox": "36",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * global.__createIterableObject([5, 6, 7]);\n}());\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 7 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield *, instances of iterables",
        "browsers": {
          "chrome": "39",
          "firefox": "36",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * Object.create(__createIterableObject([5, 6, 7]));\n}());\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 7 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "yield * on non-iterables is a runtime error",
        "browsers": {
          "chrome": "39",
          "firefox": "27",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterator = (function * generator() {\n  yield * [5];\n}());\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\niterator = (function * generator() {\n  yield * 5;\n}());\ntry {\n  iterator.next();\n} catch (e) {\n  return passed;\n}"
      },
      {
        "name": "yield *, iterator closing",
        "browsers": {
          "chrome": "50",
          "firefox": null,
          "safari": "10",
          "edge": "13"
        },
        "code": "var closed = '';\nvar iter = __createIterableObject([1, 2, 3], {\n  'return': function(){\n    closed += 'a';\n    return {done: true};\n  }\n});\nvar gen = (function* generator(){\n  try {\n    yield *iter;\n  } finally {\n    closed += 'b';\n  }\n})();\ngen.next();\ngen['return']();\nreturn closed === 'ab';"
      },
      {
        "name": "yield *, iterator closing via throw()",
        "browsers": {
          "chrome": "50",
          "firefox": null,
          "safari": "10",
          "edge": "13"
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'throw': undefined,\n  'return': function() {\n    closed = true;\n    return {done: true};\n  }\n});\nvar gen = (function*(){\n  try {\n    yield *iter;\n  } catch(e){}\n})();\ngen.next();\ngen['throw']();\nreturn closed;"
      },
      {
        "name": "shorthand generator methods",
        "browsers": {
          "chrome": "42",
          "firefox": "34",
          "safari": "10",
          "edge": "13"
        },
        "code": "var o = {\n  * generator() {\n    yield 5; yield 6;\n  },\n};\nvar iterator = o.generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "string-keyed shorthand generator methods",
        "browsers": {
          "chrome": "42",
          "firefox": "34",
          "safari": "10",
          "edge": "13"
        },
        "code": "var o = {\n  * \"foo bar\"() {\n    yield 5; yield 6;\n  },\n};\nvar iterator = o[\"foo bar\"]();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "computed shorthand generators",
        "browsers": {
          "chrome": "44",
          "firefox": "34",
          "safari": "10",
          "edge": "13"
        },
        "code": "var garply = \"generator\";\nvar o = {\n  * [garply] () {\n    yield 5; yield 6;\n  },\n};\nvar iterator = o.generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "shorthand generator methods, classes",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C {\n  * generator() {\n    yield 5; yield 6;\n  }\n};\nvar iterator = new C().generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "computed shorthand generators, classes",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var garply = \"generator\";\nclass C {\n  * [garply] () {\n    yield 5; yield 6;\n  }\n}\nvar iterator = new C().generator();\nvar item = iterator.next();\nvar passed = item.value === 5 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === 6 && item.done === false;\nitem = iterator.next();\npassed    &= item.value === undefined && item.done === true;\nreturn passed;"
      },
      {
        "name": "shorthand generators can't be constructors",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C {\n  * generator() {\n    yield 5; yield 6;\n  }\n};\ntry {\n  Function(\"class D { * constructor() { return {}; } }\");\n} catch(e) {\n  return true;\n}"
      }
    ]
  },
  {
    "name": "typed arrays",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects",
    "tests": [
      {
        "name": "Int8Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Int8Array(buffer);         view[0] = 0x80;\nreturn view[0] === -0x80;"
      },
      {
        "name": "Uint8Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Uint8Array(buffer);        view[0] = 0x100;\nreturn view[0] === 0;"
      },
      {
        "name": "Uint8ClampedArray",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "6",
          "edge": "12"
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Uint8ClampedArray(buffer); view[0] = 0x100;\nreturn view[0] === 0xFF;"
      },
      {
        "name": "Int16Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Int16Array(buffer);        view[0] = 0x8000;\nreturn view[0] === -0x8000;"
      },
      {
        "name": "Uint16Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Uint16Array(buffer);       view[0] = 0x10000;\nreturn view[0] === 0;"
      },
      {
        "name": "Int32Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Int32Array(buffer);        view[0] = 0x80000000;\nreturn view[0] === -0x80000000;"
      },
      {
        "name": "Uint32Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Uint32Array(buffer);       view[0] = 0x100000000;\nreturn view[0] === 0;"
      },
      {
        "name": "Float32Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Float32Array(buffer);       view[0] = 0.1;\nreturn view[0] === 0.10000000149011612;"
      },
      {
        "name": "Float64Array",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new Float64Array(buffer);       view[0] = 0.1;\nreturn view[0] === 0.1;"
      },
      {
        "name": "DataView (Int8)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setInt8 (0, 0x80);\nreturn view.getInt8(0) === -0x80;"
      },
      {
        "name": "DataView (Uint8)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setUint8(0, 0x100);\nreturn view.getUint8(0) === 0;"
      },
      {
        "name": "DataView (Int16)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setInt16(0, 0x8000);\nreturn view.getInt16(0) === -0x8000;"
      },
      {
        "name": "DataView (Uint16)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setUint16(0, 0x10000);\nreturn view.getUint16(0) === 0;"
      },
      {
        "name": "DataView (Int32)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setInt32(0, 0x80000000);\nreturn view.getInt32(0) === -0x80000000;"
      },
      {
        "name": "DataView (Uint32)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setUint32(0, 0x100000000);\nreturn view.getUint32(0) === 0;"
      },
      {
        "name": "DataView (Float32)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setFloat32(0, 0.1);\nreturn view.getFloat32(0) === 0.10000000149011612;"
      },
      {
        "name": "DataView (Float64)",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "51",
          "edge": null
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar view = new DataView(buffer);\nview.setFloat64(0, 0.1);\nreturn view.getFloat64(0) === 0.1;"
      },
      {
        "name": "ArrayBuffer[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "return typeof ArrayBuffer[Symbol.species] === 'function';"
      },
      {
        "name": "constructors require new",
        "browsers": {
          "chrome": "19",
          "firefox": "44",
          "safari": "10",
          "edge": "14"
        },
        "code": "var buffer = new ArrayBuffer(64);\nvar constructors = [\n  'ArrayBuffer',\n  'DataView',\n  'Int8Array',\n  'Uint8Array',\n  'Uint8ClampedArray',\n  'Int16Array',\n  'Uint16Array',\n  'Int32Array',\n  'Uint32Array',\n  'Float32Array',\n  'Float64Array'\n];\nreturn constructors.every(function (constructor) {\n  try {\n    if (constructor in global) {\n      global[constructor](constructor === \"ArrayBuffer\" ? 64 : buffer);\n    }\n    return false;\n  } catch(e) {\n    return true;\n  }\n});"
      },
      {
        "name": "constructors accept generic iterables",
        "browsers": {
          "chrome": "45",
          "firefox": null,
          "safari": "10",
          "edge": "14"
        },
        "code": "var constructors = [\n  'Int8Array',\n  'Uint8Array',\n  'Uint8ClampedArray',\n  'Int16Array',\n  'Uint16Array',\n  'Int32Array',\n  'Uint32Array',\n  'Float32Array',\n  'Float64Array'\n];\nfor(var i = 0; i < constructors.length; i++){\n  var arr = new global[constructors[i]](__createIterableObject([1, 2, 3]));\n  if(arr.length !== 3 || arr[0] !== 1 || arr[1] !== 2 || arr[2] !== 3)return false;\n}\nreturn true;"
      },
      {
        "name": "correct prototype chains",
        "browsers": {
          "chrome": "51",
          "firefox": "35",
          "safari": "10",
          "edge": "12"
        },
        "code": "var constructors = [\n  'Int8Array',\n  'Uint8Array',\n  'Uint8ClampedArray',\n  'Int16Array',\n  'Uint16Array',\n  'Int32Array',\n  'Uint32Array',\n  'Float32Array',\n  'Float64Array'\n];\nvar constructor = Object.getPrototypeOf(Int8Array);\nvar prototype = Object.getPrototypeOf(Int8Array.prototype);\nif(constructor === Function.prototype || prototype === Object.prototype)return false;\nfor(var i = 0; i < constructors.length; i+=1) {\n  if (!(constructors[i] in global\n      && Object.getPrototypeOf(global[constructors[i]]) === constructor\n      && Object.getPrototypeOf(global[constructors[i]].prototype) === prototype\n      && Object.getOwnPropertyNames(global[constructors[i]].prototype).sort() + ''\n        === \"BYTES_PER_ELEMENT,constructor\")) {\n    return false;\n  }\n}\nreturn true;"
      },
      {
        "name": "%TypedArray%.from",
        "browsers": {
          "chrome": "45",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.from === \"function\" &&\ntypeof Uint8Array.from === \"function\" &&\ntypeof Uint8ClampedArray.from === \"function\" &&\ntypeof Int16Array.from === \"function\" &&\ntypeof Uint16Array.from === \"function\" &&\ntypeof Int32Array.from === \"function\" &&\ntypeof Uint32Array.from === \"function\" &&\ntypeof Float32Array.from === \"function\" &&\ntypeof Float64Array.from === \"function\";"
      },
      {
        "name": "%TypedArray%.of",
        "browsers": {
          "chrome": "45",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.of === \"function\" &&\ntypeof Uint8Array.of === \"function\" &&\ntypeof Uint8ClampedArray.of === \"function\" &&\ntypeof Int16Array.of === \"function\" &&\ntypeof Uint16Array.of === \"function\" &&\ntypeof Int32Array.of === \"function\" &&\ntypeof Uint32Array.of === \"function\" &&\ntypeof Float32Array.of === \"function\" &&\ntypeof Float64Array.of === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.subarray",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "6",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.subarray === \"function\" &&\ntypeof Uint8Array.prototype.subarray === \"function\" &&\ntypeof Uint8ClampedArray.prototype.subarray === \"function\" &&\ntypeof Int16Array.prototype.subarray === \"function\" &&\ntypeof Uint16Array.prototype.subarray === \"function\" &&\ntypeof Int32Array.prototype.subarray === \"function\" &&\ntypeof Uint32Array.prototype.subarray === \"function\" &&\ntypeof Float32Array.prototype.subarray === \"function\" &&\ntypeof Float64Array.prototype.subarray === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.join",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.join === \"function\" &&\ntypeof Uint8Array.prototype.join === \"function\" &&\ntypeof Uint8ClampedArray.prototype.join === \"function\" &&\ntypeof Int16Array.prototype.join === \"function\" &&\ntypeof Uint16Array.prototype.join === \"function\" &&\ntypeof Int32Array.prototype.join === \"function\" &&\ntypeof Uint32Array.prototype.join === \"function\" &&\ntypeof Float32Array.prototype.join === \"function\" &&\ntypeof Float64Array.prototype.join === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.indexOf",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.indexOf === \"function\" &&\ntypeof Uint8Array.prototype.indexOf === \"function\" &&\ntypeof Uint8ClampedArray.prototype.indexOf === \"function\" &&\ntypeof Int16Array.prototype.indexOf === \"function\" &&\ntypeof Uint16Array.prototype.indexOf === \"function\" &&\ntypeof Int32Array.prototype.indexOf === \"function\" &&\ntypeof Uint32Array.prototype.indexOf === \"function\" &&\ntypeof Float32Array.prototype.indexOf === \"function\" &&\ntypeof Float64Array.prototype.indexOf === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.lastIndexOf",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.lastIndexOf === \"function\" &&\ntypeof Uint8Array.prototype.lastIndexOf === \"function\" &&\ntypeof Uint8ClampedArray.prototype.lastIndexOf === \"function\" &&\ntypeof Int16Array.prototype.lastIndexOf === \"function\" &&\ntypeof Uint16Array.prototype.lastIndexOf === \"function\" &&\ntypeof Int32Array.prototype.lastIndexOf === \"function\" &&\ntypeof Uint32Array.prototype.lastIndexOf === \"function\" &&\ntypeof Float32Array.prototype.lastIndexOf === \"function\" &&\ntypeof Float64Array.prototype.lastIndexOf === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.slice",
        "browsers": {
          "chrome": "45",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.slice === \"function\" &&\ntypeof Uint8Array.prototype.slice === \"function\" &&\ntypeof Uint8ClampedArray.prototype.slice === \"function\" &&\ntypeof Int16Array.prototype.slice === \"function\" &&\ntypeof Uint16Array.prototype.slice === \"function\" &&\ntypeof Int32Array.prototype.slice === \"function\" &&\ntypeof Uint32Array.prototype.slice === \"function\" &&\ntypeof Float32Array.prototype.slice === \"function\" &&\ntypeof Float64Array.prototype.slice === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.every",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.every === \"function\" &&\ntypeof Uint8Array.prototype.every === \"function\" &&\ntypeof Uint8ClampedArray.prototype.every === \"function\" &&\ntypeof Int16Array.prototype.every === \"function\" &&\ntypeof Uint16Array.prototype.every === \"function\" &&\ntypeof Int32Array.prototype.every === \"function\" &&\ntypeof Uint32Array.prototype.every === \"function\" &&\ntypeof Float32Array.prototype.every === \"function\" &&\ntypeof Float64Array.prototype.every === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.filter",
        "browsers": {
          "chrome": "45",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.filter === \"function\" &&\ntypeof Uint8Array.prototype.filter === \"function\" &&\ntypeof Uint8ClampedArray.prototype.filter === \"function\" &&\ntypeof Int16Array.prototype.filter === \"function\" &&\ntypeof Uint16Array.prototype.filter === \"function\" &&\ntypeof Int32Array.prototype.filter === \"function\" &&\ntypeof Uint32Array.prototype.filter === \"function\" &&\ntypeof Float32Array.prototype.filter === \"function\" &&\ntypeof Float64Array.prototype.filter === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.forEach",
        "browsers": {
          "chrome": "45",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.forEach === \"function\" &&\ntypeof Uint8Array.prototype.forEach === \"function\" &&\ntypeof Uint8ClampedArray.prototype.forEach === \"function\" &&\ntypeof Int16Array.prototype.forEach === \"function\" &&\ntypeof Uint16Array.prototype.forEach === \"function\" &&\ntypeof Int32Array.prototype.forEach === \"function\" &&\ntypeof Uint32Array.prototype.forEach === \"function\" &&\ntypeof Float32Array.prototype.forEach === \"function\" &&\ntypeof Float64Array.prototype.forEach === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.map",
        "browsers": {
          "chrome": "45",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.map === \"function\" &&\ntypeof Uint8Array.prototype.map === \"function\" &&\ntypeof Uint8ClampedArray.prototype.map === \"function\" &&\ntypeof Int16Array.prototype.map === \"function\" &&\ntypeof Uint16Array.prototype.map === \"function\" &&\ntypeof Int32Array.prototype.map === \"function\" &&\ntypeof Uint32Array.prototype.map === \"function\" &&\ntypeof Float32Array.prototype.map === \"function\" &&\ntypeof Float64Array.prototype.map === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.reduce",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.reduce === \"function\" &&\ntypeof Uint8Array.prototype.reduce === \"function\" &&\ntypeof Uint8ClampedArray.prototype.reduce === \"function\" &&\ntypeof Int16Array.prototype.reduce === \"function\" &&\ntypeof Uint16Array.prototype.reduce === \"function\" &&\ntypeof Int32Array.prototype.reduce === \"function\" &&\ntypeof Uint32Array.prototype.reduce === \"function\" &&\ntypeof Float32Array.prototype.reduce === \"function\" &&\ntypeof Float64Array.prototype.reduce === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.reduceRight",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.reduceRight === \"function\" &&\ntypeof Uint8Array.prototype.reduceRight === \"function\" &&\ntypeof Uint8ClampedArray.prototype.reduceRight === \"function\" &&\ntypeof Int16Array.prototype.reduceRight === \"function\" &&\ntypeof Uint16Array.prototype.reduceRight === \"function\" &&\ntypeof Int32Array.prototype.reduceRight === \"function\" &&\ntypeof Uint32Array.prototype.reduceRight === \"function\" &&\ntypeof Float32Array.prototype.reduceRight === \"function\" &&\ntypeof Float64Array.prototype.reduceRight === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.reverse",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.reverse === \"function\" &&\ntypeof Uint8Array.prototype.reverse === \"function\" &&\ntypeof Uint8ClampedArray.prototype.reverse === \"function\" &&\ntypeof Int16Array.prototype.reverse === \"function\" &&\ntypeof Uint16Array.prototype.reverse === \"function\" &&\ntypeof Int32Array.prototype.reverse === \"function\" &&\ntypeof Uint32Array.prototype.reverse === \"function\" &&\ntypeof Float32Array.prototype.reverse === \"function\" &&\ntypeof Float64Array.prototype.reverse === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.some",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.some === \"function\" &&\ntypeof Uint8Array.prototype.some === \"function\" &&\ntypeof Uint8ClampedArray.prototype.some === \"function\" &&\ntypeof Int16Array.prototype.some === \"function\" &&\ntypeof Uint16Array.prototype.some === \"function\" &&\ntypeof Int32Array.prototype.some === \"function\" &&\ntypeof Uint32Array.prototype.some === \"function\" &&\ntypeof Float32Array.prototype.some === \"function\" &&\ntypeof Float64Array.prototype.some === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.sort",
        "browsers": {
          "chrome": "45",
          "firefox": "46",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.sort === \"function\" &&\ntypeof Uint8Array.prototype.sort === \"function\" &&\ntypeof Uint8ClampedArray.prototype.sort === \"function\" &&\ntypeof Int16Array.prototype.sort === \"function\" &&\ntypeof Uint16Array.prototype.sort === \"function\" &&\ntypeof Int32Array.prototype.sort === \"function\" &&\ntypeof Uint32Array.prototype.sort === \"function\" &&\ntypeof Float32Array.prototype.sort === \"function\" &&\ntypeof Float64Array.prototype.sort === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.copyWithin",
        "browsers": {
          "chrome": "45",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.copyWithin === \"function\" &&\ntypeof Uint8Array.prototype.copyWithin === \"function\" &&\ntypeof Uint8ClampedArray.prototype.copyWithin === \"function\" &&\ntypeof Int16Array.prototype.copyWithin === \"function\" &&\ntypeof Uint16Array.prototype.copyWithin === \"function\" &&\ntypeof Int32Array.prototype.copyWithin === \"function\" &&\ntypeof Uint32Array.prototype.copyWithin === \"function\" &&\ntypeof Float32Array.prototype.copyWithin === \"function\" &&\ntypeof Float64Array.prototype.copyWithin === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.find",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.find === \"function\" &&\ntypeof Uint8Array.prototype.find === \"function\" &&\ntypeof Uint8ClampedArray.prototype.find === \"function\" &&\ntypeof Int16Array.prototype.find === \"function\" &&\ntypeof Uint16Array.prototype.find === \"function\" &&\ntypeof Int32Array.prototype.find === \"function\" &&\ntypeof Uint32Array.prototype.find === \"function\" &&\ntypeof Float32Array.prototype.find === \"function\" &&\ntypeof Float64Array.prototype.find === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.findIndex",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.findIndex === \"function\" &&\ntypeof Uint8Array.prototype.findIndex === \"function\" &&\ntypeof Uint8ClampedArray.prototype.findIndex === \"function\" &&\ntypeof Int16Array.prototype.findIndex === \"function\" &&\ntypeof Uint16Array.prototype.findIndex === \"function\" &&\ntypeof Int32Array.prototype.findIndex === \"function\" &&\ntypeof Uint32Array.prototype.findIndex === \"function\" &&\ntypeof Float32Array.prototype.findIndex === \"function\" &&\ntypeof Float64Array.prototype.findIndex === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.fill",
        "browsers": {
          "chrome": "45",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.fill === \"function\" &&\ntypeof Uint8Array.prototype.fill === \"function\" &&\ntypeof Uint8ClampedArray.prototype.fill === \"function\" &&\ntypeof Int16Array.prototype.fill === \"function\" &&\ntypeof Uint16Array.prototype.fill === \"function\" &&\ntypeof Int32Array.prototype.fill === \"function\" &&\ntypeof Uint32Array.prototype.fill === \"function\" &&\ntypeof Float32Array.prototype.fill === \"function\" &&\ntypeof Float64Array.prototype.fill === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.keys",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.keys === \"function\" &&\ntypeof Uint8Array.prototype.keys === \"function\" &&\ntypeof Uint8ClampedArray.prototype.keys === \"function\" &&\ntypeof Int16Array.prototype.keys === \"function\" &&\ntypeof Uint16Array.prototype.keys === \"function\" &&\ntypeof Int32Array.prototype.keys === \"function\" &&\ntypeof Uint32Array.prototype.keys === \"function\" &&\ntypeof Float32Array.prototype.keys === \"function\" &&\ntypeof Float64Array.prototype.keys === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.values",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.values === \"function\" &&\ntypeof Uint8Array.prototype.values === \"function\" &&\ntypeof Uint8ClampedArray.prototype.values === \"function\" &&\ntypeof Int16Array.prototype.values === \"function\" &&\ntypeof Uint16Array.prototype.values === \"function\" &&\ntypeof Int32Array.prototype.values === \"function\" &&\ntypeof Uint32Array.prototype.values === \"function\" &&\ntypeof Float32Array.prototype.values === \"function\" &&\ntypeof Float64Array.prototype.values === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype.entries",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype.entries === \"function\" &&\ntypeof Uint8Array.prototype.entries === \"function\" &&\ntypeof Uint8ClampedArray.prototype.entries === \"function\" &&\ntypeof Int16Array.prototype.entries === \"function\" &&\ntypeof Uint16Array.prototype.entries === \"function\" &&\ntypeof Int32Array.prototype.entries === \"function\" &&\ntypeof Uint32Array.prototype.entries === \"function\" &&\ntypeof Float32Array.prototype.entries === \"function\" &&\ntypeof Float64Array.prototype.entries === \"function\";"
      },
      {
        "name": "%TypedArray%.prototype[Symbol.iterator]",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof Int8Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Uint8Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Uint8ClampedArray.prototype[Symbol.iterator] === \"function\" &&\ntypeof Int16Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Uint16Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Int32Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Uint32Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Float32Array.prototype[Symbol.iterator] === \"function\" &&\ntypeof Float64Array.prototype[Symbol.iterator] === \"function\";"
      },
      {
        "name": "%TypedArray%[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "return typeof Int8Array[Symbol.species] === \"function\" &&\ntypeof Uint8Array[Symbol.species] === \"function\" &&\ntypeof Uint8ClampedArray[Symbol.species] === \"function\" &&\ntypeof Int16Array[Symbol.species] === \"function\" &&\ntypeof Uint16Array[Symbol.species] === \"function\" &&\ntypeof Int32Array[Symbol.species] === \"function\" &&\ntypeof Uint32Array[Symbol.species] === \"function\" &&\ntypeof Float32Array[Symbol.species] === \"function\" &&\ntypeof Float64Array[Symbol.species] === \"function\";"
      }
    ]
  },
  {
    "name": "Map",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": null
        },
        "code": "var key = {};\nvar map = new Map();\n\nmap.set(key, 123);\n\nreturn map.has(key) && map.get(key) === 123;"
      },
      {
        "name": "constructor arguments",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "9",
          "edge": "12"
        },
        "code": "var key1 = {};\nvar key2 = {};\nvar map = new Map([[key1, 123], [key2, 456]]);\n\nreturn map.has(key1) && map.get(key1) === 123 &&\n       map.has(key2) && map.get(key2) === 456;"
      },
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "38",
          "firefox": "42",
          "safari": "9",
          "edge": null
        },
        "code": "new Map();\ntry {\n  Map();\n  return false;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "constructor accepts null",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "7.1",
          "edge": null
        },
        "code": "new Map(null);\nreturn true;"
      },
      {
        "name": "constructor invokes set",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "9",
          "edge": "12"
        },
        "code": "var passed = false;\nvar _set = Map.prototype.set;\n\nMap.prototype.set = function(k, v) {\n  passed = true;\n};\n\nnew Map([ [1, 2] ]);\nMap.prototype.set = _set;\n\nreturn passed;"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\ntry {\n  new Map(iter);\n} catch(e){}\nreturn closed;"
      },
      {
        "name": "Map.prototype.set returns this",
        "browsers": {
          "chrome": "38",
          "firefox": "33",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var map = new Map();\nreturn map.set(0, 0) === map;"
      },
      {
        "name": "-0 key converts to +0",
        "browsers": {
          "chrome": "39",
          "firefox": "29",
          "safari": "9",
          "edge": "12"
        },
        "code": "var map = new Map();\nmap.set(-0, \"foo\");\nvar k;\nmap.forEach(function (value, key) {\n  k = 1 / key;\n});\nreturn k === Infinity && map.get(+0) == \"foo\";"
      },
      {
        "name": "Map.prototype.size",
        "browsers": {
          "chrome": "38",
          "firefox": "19",
          "safari": "7.1",
          "edge": null
        },
        "code": "var key = {};\nvar map = new Map();\n\nmap.set(key, 123);\n\nreturn map.size === 1;"
      },
      {
        "name": "Map.prototype.delete",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof Map.prototype.delete === \"function\";"
      },
      {
        "name": "Map.prototype.clear",
        "browsers": {
          "chrome": "38",
          "firefox": "19",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof Map.prototype.clear === \"function\";"
      },
      {
        "name": "Map.prototype.forEach",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof Map.prototype.forEach === \"function\";"
      },
      {
        "name": "Map.prototype.keys",
        "browsers": {
          "chrome": "38",
          "firefox": "20",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Map.prototype.keys === \"function\";"
      },
      {
        "name": "Map.prototype.values",
        "browsers": {
          "chrome": "38",
          "firefox": "20",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Map.prototype.values === \"function\";"
      },
      {
        "name": "Map.prototype.entries",
        "browsers": {
          "chrome": "38",
          "firefox": "20",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Map.prototype.entries === \"function\";"
      },
      {
        "name": "Map.prototype[Symbol.iterator]",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Map.prototype[Symbol.iterator] === \"function\";"
      },
      {
        "name": "Map.prototype isn't an instance",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": null
        },
        "code": "new Map();\nvar obj = {};\ntry {\n  Map.prototype.has(obj);\n}\ncatch(e) {\n  return true;\n}"
      },
      {
        "name": "Map iterator prototype chain",
        "browsers": {
          "chrome": "45",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "// Iterator instance\nvar iterator = new Map()[Symbol.iterator]();\n// %MapIteratorPrototype%\nvar proto1 = Object.getPrototypeOf(iterator);\n// %IteratorPrototype%\nvar proto2 = Object.getPrototypeOf(proto1);\n\nreturn proto2.hasOwnProperty(Symbol.iterator) &&\n  !proto1    .hasOwnProperty(Symbol.iterator) &&\n  !iterator  .hasOwnProperty(Symbol.iterator) &&\n  iterator[Symbol.iterator]() === iterator;"
      },
      {
        "name": "Map[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "41",
          "safari": "10",
          "edge": "13"
        },
        "code": "var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);\nreturn 'get' in prop && Map[Symbol.species] === Map;"
      }
    ]
  },
  {
    "name": "Set",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": null
        },
        "code": "var obj = {};\nvar set = new Set();\n\nset.add(123);\nset.add(123);\n\nreturn set.has(123);"
      },
      {
        "name": "constructor arguments",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "9",
          "edge": "12"
        },
        "code": "var obj1 = {};\nvar obj2 = {};\nvar set = new Set([obj1, obj2]);\n\nreturn set.has(obj1) && set.has(obj2);"
      },
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "38",
          "firefox": "42",
          "safari": "9",
          "edge": null
        },
        "code": "new Set();\ntry {\n  Set();\n  return false;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "constructor accepts null",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "7.1",
          "edge": null
        },
        "code": "new Set(null);\nreturn true;"
      },
      {
        "name": "constructor invokes add",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "9",
          "edge": "12"
        },
        "code": "var passed = false;\nvar _add = Set.prototype.add;\n\nSet.prototype.add = function(v) {\n  passed = true;\n};\n\nnew Set([1]);\nSet.prototype.add = _add;\n\nreturn passed;"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\nvar add = Set.prototype.add;\nSet.prototype.add = function(){ throw 0 };\ntry {\n  new Set(iter);\n} catch(e){}\nSet.prototype.add = add;\nreturn closed;"
      },
      {
        "name": "Set.prototype.add returns this",
        "browsers": {
          "chrome": "38",
          "firefox": "33",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var set = new Set();\nreturn set.add(0) === set;"
      },
      {
        "name": "-0 key converts to +0",
        "browsers": {
          "chrome": "39",
          "firefox": "29",
          "safari": "9",
          "edge": "12"
        },
        "code": "var set = new Set();\nset.add(-0);\nvar k;\nset.forEach(function (value) {\n  k = 1 / value;\n});\nreturn k === Infinity && set.has(+0);"
      },
      {
        "name": "Set.prototype.size",
        "browsers": {
          "chrome": "38",
          "firefox": "19",
          "safari": "7.1",
          "edge": null
        },
        "code": "var obj = {};\nvar set = new Set();\n\nset.add(123);\nset.add(123);\nset.add(456);\n\nreturn set.size === 2;"
      },
      {
        "name": "Set.prototype.delete",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof Set.prototype.delete === \"function\";"
      },
      {
        "name": "Set.prototype.clear",
        "browsers": {
          "chrome": "38",
          "firefox": "19",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof Set.prototype.clear === \"function\";"
      },
      {
        "name": "Set.prototype.forEach",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof Set.prototype.forEach === \"function\";"
      },
      {
        "name": "Set.prototype.keys",
        "browsers": {
          "chrome": "38",
          "firefox": "24",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Set.prototype.keys === \"function\";"
      },
      {
        "name": "Set.prototype.values",
        "browsers": {
          "chrome": "38",
          "firefox": "24",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Set.prototype.values === \"function\";"
      },
      {
        "name": "Set.prototype.entries",
        "browsers": {
          "chrome": "38",
          "firefox": "24",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Set.prototype.entries === \"function\";"
      },
      {
        "name": "Set.prototype[Symbol.iterator]",
        "browsers": {
          "chrome": "51",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Set.prototype[Symbol.iterator] === \"function\";"
      },
      {
        "name": "Set.prototype isn't an instance",
        "browsers": {
          "chrome": "38",
          "firefox": "13",
          "safari": "7.1",
          "edge": null
        },
        "code": "new Set();\nvar obj = {};\ntry {\n  Set.prototype.has(obj);\n}\ncatch(e) {\n  return true;\n}"
      },
      {
        "name": "Set iterator prototype chain",
        "browsers": {
          "chrome": "45",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "// Iterator instance\nvar iterator = new Set()[Symbol.iterator]();\n// %SetIteratorPrototype%\nvar proto1 = Object.getPrototypeOf(iterator);\n// %IteratorPrototype%\nvar proto2 = Object.getPrototypeOf(proto1);\n\nreturn proto2.hasOwnProperty(Symbol.iterator) &&\n  !proto1    .hasOwnProperty(Symbol.iterator) &&\n  !iterator  .hasOwnProperty(Symbol.iterator) &&\n  iterator[Symbol.iterator]() === iterator;"
      },
      {
        "name": "Set[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "41",
          "safari": "10",
          "edge": "13"
        },
        "code": "var prop = Object.getOwnPropertyDescriptor(Set, Symbol.species);\nreturn 'get' in prop && Set[Symbol.species] === Set;"
      }
    ]
  },
  {
    "name": "WeakMap",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "36",
          "firefox": "6",
          "safari": "7.1",
          "edge": null
        },
        "code": "var key = {};\nvar weakmap = new WeakMap();\n\nweakmap.set(key, 123);\n\nreturn weakmap.has(key) && weakmap.get(key) === 123;"
      },
      {
        "name": "constructor arguments",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var key1 = {};\nvar key2 = {};\nvar weakmap = new WeakMap([[key1, 123], [key2, 456]]);\n\nreturn weakmap.has(key1) && weakmap.get(key1) === 123 &&\n       weakmap.has(key2) && weakmap.get(key2) === 456;"
      },
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "36",
          "firefox": "42",
          "safari": "7.1",
          "edge": null
        },
        "code": "new WeakMap();\ntry {\n  WeakMap();\n  return false;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "constructor accepts null",
        "browsers": {
          "chrome": "36",
          "firefox": "6",
          "safari": "7.1",
          "edge": null
        },
        "code": "new WeakMap(null);\nreturn true;"
      },
      {
        "name": "constructor invokes set",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "9",
          "edge": "12"
        },
        "code": "var passed = false;\nvar _set = WeakMap.prototype.set;\n\nWeakMap.prototype.set = function(k, v) {\n  passed = true;\n};\n\nnew WeakMap([ [{ }, 42] ]);\nWeakMap.prototype.set = _set;\n\nreturn passed;"
      },
      {
        "name": "frozen objects as keys",
        "browsers": {
          "chrome": "36",
          "firefox": "6",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var f = Object.freeze({});\nvar m = new WeakMap;\nm.set(f, 42);\nreturn m.get(f) === 42;"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\ntry {\n  new WeakMap(iter);\n} catch(e){}\nreturn closed;"
      },
      {
        "name": "WeakMap.prototype.set returns this",
        "browsers": {
          "chrome": "38",
          "firefox": "33",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var weakmap = new WeakMap();\nvar key = {};\nreturn weakmap.set(key, 0) === weakmap;"
      },
      {
        "name": "WeakMap.prototype.delete",
        "browsers": {
          "chrome": "36",
          "firefox": "6",
          "safari": "7.1",
          "edge": null
        },
        "code": "return typeof WeakMap.prototype.delete === \"function\";"
      },
      {
        "name": "no WeakMap.prototype.clear method",
        "browsers": {
          "chrome": "43",
          "firefox": "6",
          "safari": "9",
          "edge": "12"
        },
        "code": "if (!(\"clear\" in WeakMap.prototype)) {\n  return true;\n}\nvar m = new WeakMap();\nvar key = {};\nm.set(key, 2);\nm.clear();\nreturn m.has(key);"
      },
      {
        "name": ".has, .get and .delete methods accept primitives",
        "browsers": {
          "chrome": "41",
          "firefox": "38",
          "safari": "9",
          "edge": null
        },
        "code": "var m = new WeakMap;\nreturn m.has(1) === false\n  && m.get(1) === undefined\n  && m.delete(1) === false;"
      },
      {
        "name": "WeakMap.prototype isn't an instance",
        "browsers": {
          "chrome": "36",
          "firefox": "40",
          "safari": "7.1",
          "edge": null
        },
        "code": "new WeakMap();\nvar obj = {};\ntry {\n  WeakMap.prototype.has(obj);\n}\ncatch(e) {\n  return true;\n}"
      }
    ]
  },
  {
    "name": "WeakSet",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "36",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var obj1 = {};\nvar weakset = new WeakSet();\n\nweakset.add(obj1);\nweakset.add(obj1);\n\nreturn weakset.has(obj1);"
      },
      {
        "name": "constructor arguments",
        "browsers": {
          "chrome": "38",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var obj1 = {}, obj2 = {};\nvar weakset = new WeakSet([obj1, obj2]);\n\nreturn weakset.has(obj1) && weakset.has(obj2);"
      },
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "36",
          "firefox": "37",
          "safari": "9",
          "edge": "12"
        },
        "code": "new WeakSet();\ntry {\n  WeakSet();\n  return false;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "constructor accepts null",
        "browsers": {
          "chrome": "36",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "new WeakSet(null);\nreturn true;"
      },
      {
        "name": "constructor invokes add",
        "browsers": {
          "chrome": "38",
          "firefox": "37",
          "safari": "9",
          "edge": "12"
        },
        "code": "var passed = false;\nvar _add = WeakSet.prototype.add;\n\nWeakSet.prototype.add = function(v) {\n  passed = true;\n};\n\nnew WeakSet([ { } ]);\nWeakSet.prototype.add = _add;\n\nreturn passed;"
      },
      {
        "name": "iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\ntry {\n  new WeakSet(iter);\n} catch(e){}\nreturn closed;"
      },
      {
        "name": "WeakSet.prototype.add returns this",
        "browsers": {
          "chrome": "38",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var weakset = new WeakSet();\nvar obj = {};\nreturn weakset.add(obj) === weakset;"
      },
      {
        "name": "WeakSet.prototype.delete",
        "browsers": {
          "chrome": "36",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof WeakSet.prototype.delete === \"function\";"
      },
      {
        "name": "no WeakSet.prototype.clear method",
        "browsers": {
          "chrome": "43",
          "firefox": "46",
          "safari": "9",
          "edge": "12"
        },
        "code": "if (!(\"clear\" in WeakSet.prototype)) {\n  return true;\n}\nvar s = new WeakSet();\nvar key = {};\ns.add(key);\ns.clear();\nreturn s.has(key);"
      },
      {
        "name": ".has and .delete methods accept primitives",
        "browsers": {
          "chrome": "41",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var s = new WeakSet;\nreturn s.has(1) === false\n  && s.delete(1) === false;"
      },
      {
        "name": "WeakSet.prototype isn't an instance",
        "browsers": {
          "chrome": "36",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "new WeakSet();\nvar obj = {};\ntry {\n  WeakSet.prototype.has(obj);\n}\ncatch(e) {\n  return true;\n}"
      }
    ]
  },
  {
    "name": "Proxy",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "new Proxy({}, {});\ntry {\n  Proxy({}, {});\n  return false;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "no \"prototype\" property",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "new Proxy({}, {});\nreturn !Proxy.hasOwnProperty('prototype');"
      },
      {
        "name": "\"get\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = { };\nvar proxy = new Proxy(proxied, {\n  get: function (t, k, r) {\n    return t === proxied && k === \"foo\" && r === proxy && 5;\n  }\n});\nreturn proxy.foo === 5;"
      },
      {
        "name": "\"get\" handler, instances of proxies",
        "browsers": {
          "chrome": "49",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = { };\nvar proxy = Object.create(new Proxy(proxied, {\n  get: function (t, k, r) {\n    return t === proxied && k === \"foo\" && r === proxy && 5;\n  }\n}));\nreturn proxy.foo === 5;"
      },
      {
        "name": "\"get\" handler invariants",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nvar proxied = { };\nvar proxy = new Proxy(proxied, {\n  get: function () {\n    passed = true;\n    return 4;\n  }\n});\n// The value reported for a property must be the same as the value of the corresponding\n// target object property if the target object property is a non-writable,\n// non-configurable own data property.\nObject.defineProperty(proxied, \"foo\", { value: 5, enumerable: true });\ntry {\n  proxy.foo;\n  return false;\n}\ncatch(e) {}\n// The value reported for a property must be undefined if the corresponding target\n// object property is a non-configurable own accessor property that has undefined\n// as its [[Get]] attribute.\nObject.defineProperty(proxied, \"bar\",\n  { set: function(){}, enumerable: true });\ntry {\n  proxy.bar;\n  return false;\n}\ncatch(e) {}\nreturn passed;"
      },
      {
        "name": "\"set\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = { };\nvar passed = false;\nvar proxy = new Proxy(proxied, {\n  set: function (t, k, v, r) {\n    passed = t === proxied && k + v === \"foobar\" && r === proxy;\n  }\n});\nproxy.foo = \"bar\";\nreturn passed;"
      },
      {
        "name": "\"set\" handler, instances of proxies",
        "browsers": {
          "chrome": "49",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = { };\nvar passed = false;\nvar proxy = Object.create(new Proxy(proxied, {\n  set: function (t, k, v, r) {\n    passed = t === proxied && k + v === \"foobar\" && r === proxy;\n  }\n}));\nproxy.foo = \"bar\";\nreturn passed;"
      },
      {
        "name": "\"set\" handler invariants",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// Cannot change the value of a property to be different from the value of\n// the corresponding target object if the corresponding target object\n// property is a non-writable, non-configurable own data property.\nvar proxied = {};\nvar proxy = new Proxy(proxied, {\n  set: function () {\n    passed = true;\n    return true;\n  }\n});\nObject.defineProperty(proxied, \"foo\", { value: 2, enumerable: true });\nproxy.foo = 2;\ntry {\n  proxy.foo = 4;\n  return false;\n} catch(e) {}\n// Cannot set the value of a property if the corresponding target\n// object property is a non-configurable own accessor property\n// that has undefined as its [[Set]] attribute.\nObject.defineProperty(proxied, \"bar\",\n  { get: function(){}, enumerable: true });\ntry {\n  proxy.bar = 2;\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"has\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\n\"foo\" in new Proxy(proxied, {\n  has: function (t, k) {\n    passed = t === proxied && k === \"foo\";\n  }\n});\nreturn passed;"
      },
      {
        "name": "\"has\" handler, instances of proxies",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\n\"foo\" in Object.create(new Proxy(proxied, {\n  has: function (t, k) {\n    passed = t === proxied && k === \"foo\";\n  }\n}));\nreturn passed;"
      },
      {
        "name": "\"has\" handler invariants",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// A property cannot be reported as non-existent, if it exists as a\n// non-configurable own property of the target object.\nvar proxied = {};\nvar proxy = new Proxy(proxied, {\n  has: function () {\n    passed = true;\n    return false;\n  }\n});\nObject.defineProperty(proxied, \"foo\", { value: 2, writable: true, enumerable: true });\ntry {\n  'foo' in proxy;\n  return false;\n} catch(e) {}\n// A property cannot be reported as non-existent, if it exists as an\n// own property of the target object and the target object is not extensible.\nproxied.bar = 2;\nObject.preventExtensions(proxied);\ntry {\n  'bar' in proxy;\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"deleteProperty\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\ndelete new Proxy(proxied, {\n  deleteProperty: function (t, k) {\n    passed = t === proxied && k === \"foo\";\n  }\n}).foo;\nreturn passed;"
      },
      {
        "name": "\"deleteProperty\" handler invariant",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// A property cannot be reported as deleted, if it exists as a non-configurable\n// own property of the target object.\nvar proxied = {};\nObject.defineProperty(proxied, \"foo\", { value: 2, writable: true, enumerable: true });\ntry {\n  delete new Proxy(proxied, {\n    deleteProperty: function () {\n      passed = true;\n      return true;\n    }\n  }).foo;\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"getOwnPropertyDescriptor\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "30",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar fakeDesc = { value: \"foo\", configurable: true };\nvar returnedDesc = Object.getOwnPropertyDescriptor(\n  new Proxy(proxied, {\n    getOwnPropertyDescriptor: function (t, k) {\n      return t === proxied && k === \"foo\" && fakeDesc;\n    }\n  }),\n  \"foo\"\n);\nreturn (returnedDesc.value     === fakeDesc.value\n  && returnedDesc.configurable === fakeDesc.configurable\n  && returnedDesc.writable     === false\n  && returnedDesc.enumerable   === false);"
      },
      {
        "name": "\"getOwnPropertyDescriptor\" handler invariants",
        "browsers": {
          "chrome": "49",
          "firefox": "32",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// A property cannot be reported as non-existent, if it exists as a non-configurable\n// own property of the target object.\nvar proxied = {};\nvar proxy = new Proxy(proxied, {\n  getOwnPropertyDescriptor: function () {\n    passed = true;\n    return undefined;\n  }\n});\nObject.defineProperty(proxied, \"foo\", { value: 2, writable: true, enumerable: true });\ntry {\n  Object.getOwnPropertyDescriptor(proxy, \"foo\");\n  return false;\n} catch(e) {}\n// A property cannot be reported as non-existent, if it exists as an own property\n// of the target object and the target object is not extensible.\nproxied.bar = 3;\nObject.preventExtensions(proxied);\ntry {\n  Object.getOwnPropertyDescriptor(proxy, \"bar\");\n  return false;\n} catch(e) {}\n// A property cannot be reported as existent, if it does not exists as an own property\n// of the target object and the target object is not extensible.\ntry {\n  Object.getOwnPropertyDescriptor(new Proxy(proxied, {\n    getOwnPropertyDescriptor: function() {\n      return { value: 2, configurable: true, writable: true, enumerable: true };\n    }}), \"baz\");\n  return false;\n} catch(e) {}\n// A property cannot be reported as non-configurable, if it does not exists as an own\n// property of the target object or if it exists as a configurable own property of\n// the target object.\ntry {\n  Object.getOwnPropertyDescriptor(new Proxy({}, {\n    getOwnPropertyDescriptor: function() {\n      return { value: 2, configurable: false, writable: true, enumerable: true };\n    }}), \"baz\");\n  return false;\n} catch(e) {}\ntry {\n  Object.getOwnPropertyDescriptor(new Proxy({baz:1}, {\n    getOwnPropertyDescriptor: function() {\n      return { value: 1, configurable: false, writable: true, enumerable: true };\n    }}), \"baz\");\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"defineProperty\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\nObject.defineProperty(\n  new Proxy(proxied, {\n    defineProperty: function (t, k, d) {\n      passed = t === proxied && k === \"foo\" && d.value === 5;\n      return true;\n    }\n  }),\n  \"foo\",\n  { value: 5, configurable: true }\n);\nreturn passed;"
      },
      {
        "name": "\"defineProperty\" handler invariants",
        "browsers": {
          "chrome": "49",
          "firefox": "32",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// A property cannot be added, if the target object is not extensible.\nvar proxied = Object.preventExtensions({});\nvar proxy = new Proxy(proxied, {\n  defineProperty: function() {\n    passed = true;\n    return true;\n  }\n});\ntry {\n  Object.defineProperty(proxy, \"foo\", { value: 2 });\n  return false;\n} catch(e) {}\n// A property cannot be non-configurable, unless there exists a corresponding\n// non-configurable own property of the target object.\ntry {\n  Object.defineProperty(\n    new Proxy({ bar: true }, {\n      defineProperty: function () {\n        return true;\n      }\n    }),\n    \"bar\",\n    { value: 5, configurable: false, writable: true, enumerable: true }\n  );\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"getPrototypeOf\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "49",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar fakeProto = {};\nvar proxy = new Proxy(proxied, {\n  getPrototypeOf: function (t) {\n    return t === proxied && fakeProto;\n  }\n});\nreturn Object.getPrototypeOf(proxy) === fakeProto;"
      },
      {
        "name": "\"getPrototypeOf\" handler invariant",
        "browsers": {
          "chrome": "49",
          "firefox": "49",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// If the target object is not extensible, [[GetPrototypeOf]] applied to the proxy object\n// must return the same value as [[GetPrototypeOf]] applied to the proxy object's target object.\ntry {\n  Object.getPrototypeOf(new Proxy(Object.preventExtensions({}), {\n    getPrototypeOf: function () {\n      passed = true;\n      return {};\n    }\n  }));\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"setPrototypeOf\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "49",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar newProto = {};\nvar passed = false;\nObject.setPrototypeOf(\n  new Proxy(proxied, {\n    setPrototypeOf: function (t, p) {\n      passed = t === proxied && p === newProto;\n      return true;\n    }\n  }),\n  newProto\n);\nreturn passed;"
      },
      {
        "name": "\"setPrototypeOf\" handler invariant",
        "browsers": {
          "chrome": "49",
          "firefox": "49",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\nObject.setPrototypeOf({},{});\n// If the target object is not extensible, the argument value must be the\n// same as the result of [[GetPrototypeOf]] applied to target object.\ntry {\n  Object.setPrototypeOf(\n    new Proxy(Object.preventExtensions({}), {\n      setPrototypeOf: function () {\n        passed = true;\n        return true;\n      }\n    }),{});\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"isExtensible\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "31",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\nObject.isExtensible(\n  new Proxy(proxied, {\n    isExtensible: function (t) {\n      passed = t === proxied; return true;\n    }\n  })\n);\nreturn passed;"
      },
      {
        "name": "\"isExtensible\" handler invariant",
        "browsers": {
          "chrome": "49",
          "firefox": "31",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// [[IsExtensible]] applied to the proxy object must return the same value\n// as [[IsExtensible]] applied to the proxy object's target object with the same argument.\ntry {\n  Object.isExtensible(new Proxy({}, {\n    isExtensible: function (t) {\n      passed = true;\n      return false;\n    }\n  }));\n  return false;\n} catch(e) {}\ntry {\n  Object.isExtensible(new Proxy(Object.preventExtensions({}), {\n    isExtensible: function (t) {\n      return true;\n    }\n  }));\n  return false;\n} catch(e) {}\nreturn true;"
      },
      {
        "name": "\"preventExtensions\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\nObject.preventExtensions(\n  new Proxy(proxied, {\n    preventExtensions: function (t) {\n      passed = t === proxied;\n      return Object.preventExtensions(proxied);\n    }\n  })\n);\nreturn passed;"
      },
      {
        "name": "\"preventExtensions\" handler invariant",
        "browsers": {
          "chrome": "49",
          "firefox": "22",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// [[PreventExtensions]] applied to the proxy object only returns true\n// if [[IsExtensible]] applied to the proxy object's target object is false.\ntry {\n  Object.preventExtensions(new Proxy({}, {\n    preventExtensions: function () {\n      passed = true;\n      return true;\n    }\n  }));\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"ownKeys\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "33",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = {};\nvar passed = false;\nObject.keys(\n  new Proxy(proxied, {\n    ownKeys: function (t) {\n      passed = t === proxied; return [];\n    }\n  })\n);\nreturn passed;"
      },
      {
        "name": "\"ownKeys\" handler invariant",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// The Type of each result List element is either String or Symbol.\ntry {\n  Object.keys(new Proxy({}, {\n    ownKeys: function () {\n      passed = true;\n      return [2];\n    }}));\n  return false;\n} catch(e) {}\n// The result List must contain the keys of all non-configurable own properties of the target object.\nvar proxied = {};\nObject.defineProperty(proxied, \"foo\", { value: 2, writable: true, enumerable: true });\ntry {\n  Object.keys(new Proxy(proxied, {\n    ownKeys: function () {\n      return [];\n    }}));\n  return false;\n} catch(e) {}\n// If the target object is not extensible, then the result List must contain all the keys\n// of the own properties of the target object and no other values.\ntry {\n  Object.keys(new Proxy(Object.preventExtensions({b:1}), {\n    ownKeys: function () {\n      return ['a'];\n    }}));\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"apply\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = function(){};\nvar passed = false;\nvar host = {\n  method: new Proxy(proxied, {\n    apply: function (t, thisArg, args) {\n      passed = t === proxied && thisArg === host && args + \"\" === \"foo,bar\";\n    }\n  })\n};\nhost.method(\"foo\", \"bar\");\nreturn passed;"
      },
      {
        "name": "\"apply\" handler invariant",
        "browsers": {
          "chrome": "50",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy(function(){}, {\n    apply: function () { passed = true; }\n})();\n// A Proxy exotic object only has a [[Call]] internal method if the\n// initial value of its [[ProxyTarget]] internal slot is an object\n// that has a [[Call]] internal method.\ntry {\n  new Proxy({}, {\n    apply: function () {}\n  })();\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "\"construct\" handler",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "var proxied = function(){};\nvar passed = false;\nnew new Proxy(proxied, {\n  construct: function (t, args) {\n    passed = t === proxied && args + \"\" === \"foo,bar\";\n    return {};\n  }\n})(\"foo\",\"bar\");\nreturn passed;"
      },
      {
        "name": "\"construct\" handler invariants",
        "browsers": {
          "chrome": "49",
          "firefox": "31",
          "safari": "10",
          "edge": "12"
        },
        "code": "var passed = false;\nnew Proxy({},{});\n// A Proxy exotic object only has a [[Construct]] internal method if the\n// initial value of its [[ProxyTarget]] internal slot is an object\n// that has a [[Construct]] internal method.\ntry {\n  new new Proxy({}, {\n    construct: function (t, args) {\n      return {};\n    }\n  })();\n  return false;\n} catch(e) {}\n// The result of [[Construct]] must be an Object.\ntry {\n  new new Proxy(function(){}, {\n    construct: function (t, args) {\n      passed = true;\n      return 5;\n    }\n  })();\n  return false;\n} catch(e) {}\nreturn passed;"
      },
      {
        "name": "Proxy.revocable",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = Proxy.revocable({}, { get: function() { return 5; } });\nvar passed = (obj.proxy.foo === 5);\nobj.revoke();\ntry {\n  obj.proxy.foo;\n} catch(e) {\n  passed &= e instanceof TypeError;\n}\nreturn passed;"
      },
      {
        "name": "Array.isArray support",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Array.isArray(new Proxy([], {}));"
      },
      {
        "name": "JSON.stringify support",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "return JSON.stringify(new Proxy(['foo'], {})) === '[\"foo\"]';"
      }
    ]
  },
  {
    "name": "Reflect",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-reflection",
    "tests": [
      {
        "name": "Reflect.get",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Reflect.get({ qux: 987 }, \"qux\") === 987;"
      },
      {
        "name": "Reflect.set",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = {};\nReflect.set(obj, \"quux\", 654);\nreturn obj.quux === 654;"
      },
      {
        "name": "Reflect.has",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Reflect.has({ qux: 987 }, \"qux\");"
      },
      {
        "name": "Reflect.deleteProperty",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = { bar: 456 };\nReflect.deleteProperty(obj, \"bar\");\nreturn !(\"bar\" in obj);"
      },
      {
        "name": "Reflect.getOwnPropertyDescriptor",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = { baz: 789 };\nvar desc = Reflect.getOwnPropertyDescriptor(obj, \"baz\");\nreturn desc.value === 789 &&\n  desc.configurable && desc.writable && desc.enumerable;"
      },
      {
        "name": "Reflect.defineProperty",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = {};\nReflect.defineProperty(obj, \"foo\", { value: 123 });\nreturn obj.foo === 123 &&\n  Reflect.defineProperty(Object.freeze({}), \"foo\", { value: 123 }) === false;"
      },
      {
        "name": "Reflect.getPrototypeOf",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Reflect.getPrototypeOf([]) === Array.prototype;"
      },
      {
        "name": "Reflect.setPrototypeOf",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = {};\nReflect.setPrototypeOf(obj, Array.prototype);\nreturn obj instanceof Array;"
      },
      {
        "name": "Reflect.isExtensible",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Reflect.isExtensible({}) &&\n  !Reflect.isExtensible(Object.preventExtensions({}));"
      },
      {
        "name": "Reflect.preventExtensions",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = {};\nReflect.preventExtensions(obj);\nreturn !Object.isExtensible(obj);"
      },
      {
        "name": "Reflect.ownKeys, string keys",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = Object.create({ C: true });\nobj.A = true;\nObject.defineProperty(obj, 'B', { value: true, enumerable: false });\n\nreturn Reflect.ownKeys(obj).sort() + '' === \"A,B\";"
      },
      {
        "name": "Reflect.ownKeys, symbol keys",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var s1 = Symbol(), s2 = Symbol(), s3 = Symbol();\nvar proto = {};\nproto[s1] = true;\nvar obj = Object.create(proto);\nobj[s2] = true;\nObject.defineProperty(obj, s3, { value: true, enumerable: false });\n\nvar keys = Reflect.ownKeys(obj);\nreturn keys.indexOf(s2) >-1 && keys.indexOf(s3) >-1 && keys.length === 2;"
      },
      {
        "name": "Reflect.apply",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Reflect.apply(Array.prototype.push, [1,2], [3,4,5]) === 5;"
      },
      {
        "name": "Reflect.construct",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "return Reflect.construct(function(a, b, c) {\n  this.qux = a + b + c;\n}, [\"foo\", \"bar\", \"baz\"]).qux === \"foobarbaz\";"
      },
      {
        "name": "Reflect.construct sets new.target meta-property",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "13"
        },
        "code": "return Reflect.construct(function(a, b, c) {\n  if (new.target === Object) {\n    this.qux = a + b + c;\n  }\n}, [\"foo\", \"bar\", \"baz\"], Object).qux === \"foobarbaz\";"
      },
      {
        "name": "Reflect.construct creates instances from third argument",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": "13"
        },
        "code": "function F(){}\nvar obj = Reflect.construct(function(){ this.y = 1; }, [], F);\nreturn obj.y === 1 && obj instanceof F;"
      },
      {
        "name": "Reflect.construct, Array subclassing",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function F(){}\nvar obj = Reflect.construct(Array, [], F);\nobj[2] = 'foo';\nreturn obj.length === 3 && obj instanceof F;"
      },
      {
        "name": "Reflect.construct, RegExp subclassing",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function F(){}\nvar obj = Reflect.construct(RegExp, [\"baz\",\"g\"], F);\nreturn RegExp.prototype.exec.call(obj, \"foobarbaz\")[0] === \"baz\"\n  && obj.lastIndex === 9 && obj instanceof F;"
      },
      {
        "name": "Reflect.construct, Function subclassing",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function F(){}\nvar obj = Reflect.construct(Function, [\"return 2\"], F);\nreturn obj() === 2 && obj instanceof F;"
      },
      {
        "name": "Reflect.construct, Promise subclassing",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "13"
        },
        "code": "function F(){}\nvar p1 = Reflect.construct(Promise,[function(resolve, reject) { resolve(\"foo\"); }], F);\nvar p2 = Reflect.construct(Promise,[function(resolve, reject) { reject(\"quux\"); }], F);\nvar score = +(p1 instanceof F && p2 instanceof F);\n\nfunction thenFn(result)  { score += (result === \"foo\");  check(); }\nfunction catchFn(result) { score += (result === \"quux\"); check(); }\nfunction shouldNotRun(result)  { score = -Infinity;   }\n\np1.then = p2.then = Promise.prototype.then;\np1.catch = p2.catch = Promise.prototype.catch;\n\np1.then(thenFn, shouldNotRun);\np2.then(shouldNotRun, catchFn);\np1.catch(shouldNotRun);\np2.catch(catchFn);\n\nfunction check() {\n  if (score === 4) asyncTestPassed();\n}"
      }
    ]
  },
  {
    "name": "Promise",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "33",
          "firefox": "29",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var p1 = new Promise(function(resolve, reject) { resolve(\"foo\"); });\nvar p2 = new Promise(function(resolve, reject) { reject(\"quux\"); });\nvar score = 0;\n\nfunction thenFn(result)  { score += (result === \"foo\");  check(); }\nfunction catchFn(result) { score += (result === \"quux\"); check(); }\nfunction shouldNotRun(result)  { score = -Infinity;   }\n\np1.then(thenFn, shouldNotRun);\np2.then(shouldNotRun, catchFn);\np1.catch(shouldNotRun);\np2.catch(catchFn);\n\np1.then(function() {\n  // Promise.prototype.then() should return a new Promise\n  score += p1.then() !== p1;\n  check();\n});\n\nfunction check() {\n  if (score === 4) asyncTestPassed();\n}"
      },
      {
        "name": "constructor requires new",
        "browsers": {
          "chrome": "33",
          "firefox": "30",
          "safari": "10",
          "edge": "12"
        },
        "code": "new Promise(function(){});\ntry {\n  Promise(function(){});\n  return false;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "Promise.prototype isn't an instance",
        "browsers": {
          "chrome": "33",
          "firefox": "29",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "new Promise(function(){});\ntry {\n  Promise.prototype.then(function(){});\n} catch (e) {\n  return true;\n}"
      },
      {
        "name": "Promise.all",
        "browsers": {
          "chrome": "33",
          "firefox": "29",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "var fulfills = Promise.all([\n  new Promise(function(resolve)   { setTimeout(resolve,2000,\"foo\"); }),\n  new Promise(function(resolve)   { setTimeout(resolve,1000,\"bar\"); }),\n]);\nvar rejects = Promise.all([\n  new Promise(function(_, reject) { setTimeout(reject, 2000,\"baz\"); }),\n  new Promise(function(_, reject) { setTimeout(reject, 1000,\"qux\"); }),\n]);\nvar score = 0;\nfulfills.then(function(result) { score += (result + \"\" === \"foo,bar\"); check(); });\nrejects.catch(function(result) { score += (result === \"qux\"); check(); });\n\nfunction check() {\n  if (score === 2) asyncTestPassed();\n}"
      },
      {
        "name": "Promise.all, generic iterables",
        "browsers": {
          "chrome": "43",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var fulfills = Promise.all(global.__createIterableObject([\n  new Promise(function(resolve)   { setTimeout(resolve,2000,\"foo\"); }),\n  new Promise(function(resolve)   { setTimeout(resolve,1000,\"bar\"); }),\n]));\nvar rejects = Promise.all(global.__createIterableObject([\n  new Promise(function(_, reject) { setTimeout(reject, 2000,\"baz\"); }),\n  new Promise(function(_, reject) { setTimeout(reject, 1000,\"qux\"); }),\n]));\nvar score = 0;\nfulfills.then(function(result) { score += (result + \"\" === \"foo,bar\"); check(); });\nrejects.catch(function(result) { score += (result === \"qux\"); check(); });\n\nfunction check() {\n  if (score === 2) asyncTestPassed();\n}"
      },
      {
        "name": "Promise.race",
        "browsers": {
          "chrome": "33",
          "firefox": "29",
          "safari": "10",
          "edge": "12"
        },
        "code": "var fulfills = Promise.race([\n  new Promise(function(resolve)   { setTimeout(resolve,1000,\"foo\"); }),\n  new Promise(function(_, reject) { setTimeout(reject, 2000,\"bar\"); }),\n]);\nvar rejects = Promise.race([\n  new Promise(function(_, reject) { setTimeout(reject, 1000,\"baz\"); }),\n  new Promise(function(resolve)   { setTimeout(resolve,2000,\"qux\"); }),\n]);\nvar score = 0;\nfulfills.then(function(result) { score += (result === \"foo\"); check(); });\nrejects.catch(function(result) { score += (result === \"baz\"); check(); });\n\nfunction check() {\n  if (score === 2) asyncTestPassed();\n}"
      },
      {
        "name": "Promise.race, generic iterables",
        "browsers": {
          "chrome": "43",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var fulfills = Promise.race(global.__createIterableObject([\n  new Promise(function(resolve)   { setTimeout(resolve,1000,\"foo\"); }),\n  new Promise(function(_, reject) { setTimeout(reject, 2000,\"bar\"); }),\n]));\nvar rejects = Promise.race(global.__createIterableObject([\n  new Promise(function(_, reject) { setTimeout(reject, 1000,\"baz\"); }),\n  new Promise(function(resolve)   { setTimeout(resolve,2000,\"qux\"); }),\n]));\nvar score = 0;\nfulfills.then(function(result) { score += (result === \"foo\"); check(); });\nrejects.catch(function(result) { score += (result === \"baz\"); check(); });\n\nfunction check() {\n  if (score === 2) asyncTestPassed();\n}"
      },
      {
        "name": "Promise[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var prop = Object.getOwnPropertyDescriptor(Promise, Symbol.species);\nreturn 'get' in prop && Promise[Symbol.species] === Promise;"
      }
    ]
  },
  {
    "name": "Symbol",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var object = {};\nvar symbol = Symbol();\nvar value = {};\nobject[symbol] = value;\nreturn object[symbol] === value;"
      },
      {
        "name": "typeof support",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Symbol() === \"symbol\";"
      },
      {
        "name": "symbol keys are hidden to pre-ES6 code",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var object = {};\nvar symbol = Symbol();\nobject[symbol] = 1;\n\nfor (var x in object){}\nvar passed = !x;\n\nif (Object.keys && Object.getOwnPropertyNames) {\n  passed &= Object.keys(object).length === 0\n    && Object.getOwnPropertyNames(object).length === 0;\n}\n\nreturn passed;"
      },
      {
        "name": "Object.defineProperty support",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var object = {};\nvar symbol = Symbol();\nvar value = {};\n\nif (Object.defineProperty) {\n  Object.defineProperty(object, symbol, { value: value });\n  return object[symbol] === value;\n}\n\nreturn passed;"
      },
      {
        "name": "symbols inherit from Symbol.prototype",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var symbol = Symbol();\nvar passed = symbol.foo === undefined;\nSymbol.prototype.foo = 2;\npassed &= symbol.foo === 2;\ndelete Symbol.prototype.foo;\nreturn passed;"
      },
      {
        "name": "cannot coerce to string or number",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var symbol = Symbol();\n\ntry {\n  symbol + \"\";\n  return false;\n}\ncatch(e) {}\n\ntry {\n  symbol + 0;\n  return false;\n} catch(e) {}\n\nreturn true;"
      },
      {
        "name": "can convert with String()",
        "browsers": {
          "chrome": "39",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return String(Symbol(\"foo\")) === \"Symbol(foo)\";"
      },
      {
        "name": "new Symbol() throws",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var symbol = Symbol();\ntry {\n  new Symbol();\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "Object(symbol)",
        "browsers": {
          "chrome": "48",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var symbol = Symbol();\nvar symbolObject = Object(symbol);\n\nreturn typeof symbolObject === \"object\" &&\n  symbolObject instanceof Symbol &&\n  symbolObject == symbol &&\n  symbolObject !== symbol &&\n  symbolObject.valueOf() === symbol;"
      },
      {
        "name": "JSON.stringify ignores symbol primitives",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "10",
          "edge": "13"
        },
        "code": "var object = { foo: Symbol() };\nobject[Symbol()] = 1;\nvar array = [Symbol()];\nreturn JSON.stringify(object) === '{}' && JSON.stringify(array) === '[null]' && JSON.stringify(Symbol()) === undefined;"
      },
      {
        "name": "JSON.stringify ignores symbol objects",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "9",
          "edge": "13"
        },
        "code": "var testSymbolObject = function (sym) {\n  var object = { foo: sym };\n  try {\n    // some browsers throw a TypeError when setting symbol object keys.\n    // this isn't part of this test, so, ignore it if so.\n    object[sym] = 1;\n  } catch (e) {} // some browsers throw a TypeError when setting symbol object keys.\n  var array = [sym];\n  return JSON.stringify(object) === '{\"foo\":{}}' && JSON.stringify(array) === '[{}]' && JSON.stringify(sym) === '{}';\n};\nvar objSym = Object(Symbol());\nvar symNoToJSON = Object(Symbol());\nObject.defineProperty(symNoToJSON, 'toJSON', { enumerable: false, value: null }); // ensure it overrides the prototype, but is not callable\nreturn testSymbolObject(objSym) && testSymbolObject(symNoToJSON);"
      },
      {
        "name": "global symbol registry",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var symbol = Symbol.for('foo');\nreturn Symbol.for('foo') === symbol &&\n   Symbol.keyFor(symbol) === 'foo';"
      }
    ]
  },
  {
    "name": "well-known symbols",
    "category": "built-ins",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols",
    "tests": [
      {
        "name": "Symbol.hasInstance",
        "browsers": {
          "chrome": "51",
          "firefox": "50",
          "safari": "10",
          "edge": null
        },
        "code": "var passed = false;\nvar obj = { foo: true };\nvar C = function(){};\nObject.defineProperty(C, Symbol.hasInstance, {\n  value: function(inst) { passed = inst.foo; return false; }\n});\nobj instanceof C;\nreturn passed;"
      },
      {
        "name": "Symbol.isConcatSpreadable",
        "browsers": {
          "chrome": "48",
          "firefox": "48",
          "safari": "10",
          "edge": null
        },
        "code": "var a = [], b = [];\nb[Symbol.isConcatSpreadable] = false;\na = a.concat(b);\nreturn a[0] === b;"
      },
      {
        "name": "Symbol.iterator, existence",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return \"iterator\" in Symbol;"
      },
      {
        "name": "Symbol.iterator, arguments object",
        "browsers": {
          "chrome": "38",
          "firefox": "46",
          "safari": "9",
          "edge": "12"
        },
        "code": "return (function() {\n  return typeof arguments[Symbol.iterator] === 'function'\n    && Object.hasOwnProperty.call(arguments, Symbol.iterator);\n}());"
      },
      {
        "name": "Symbol.species, existence",
        "browsers": {
          "chrome": "51",
          "firefox": "41",
          "safari": "10",
          "edge": "13"
        },
        "code": "return \"species\" in Symbol;"
      },
      {
        "name": "Symbol.species, Array.prototype.concat",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = [];\nobj.constructor = {};\nobj.constructor[Symbol.species] = function() {\n    return { foo: 1 };\n};\nreturn Array.prototype.concat.call(obj, []).foo === 1;"
      },
      {
        "name": "Symbol.species, Array.prototype.filter",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = [];\nobj.constructor = {};\nobj.constructor[Symbol.species] = function() {\n    return { foo: 1 };\n};\nreturn Array.prototype.filter.call(obj, Boolean).foo === 1;"
      },
      {
        "name": "Symbol.species, Array.prototype.map",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = [];\nobj.constructor = {};\nobj.constructor[Symbol.species] = function() {\n    return { foo: 1 };\n};\nreturn Array.prototype.map.call(obj, Boolean).foo === 1;"
      },
      {
        "name": "Symbol.species, Array.prototype.slice",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = [];\nobj.constructor = {};\nobj.constructor[Symbol.species] = function() {\n    return { foo: 1 };\n};\nreturn Array.prototype.slice.call(obj, 0).foo === 1;"
      },
      {
        "name": "Symbol.species, Array.prototype.splice",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = [];\nobj.constructor = {};\nobj.constructor[Symbol.species] = function() {\n    return { foo: 1 };\n};\nreturn Array.prototype.splice.call(obj, 0).foo === 1;"
      },
      {
        "name": "Symbol.species, RegExp.prototype[Symbol.split]",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "var passed = false;\nvar obj = { constructor: {} };\nobj[Symbol.split] = RegExp.prototype[Symbol.split];\nobj.constructor[Symbol.species] = function() {\n  passed = true;\n  return /./;\n};\n\"\".split(obj);\nreturn passed;"
      },
      {
        "name": "Symbol.species, Promise.prototype.then",
        "browsers": {
          "chrome": "51",
          "firefox": "45",
          "safari": "10",
          "edge": "14"
        },
        "code": "var promise      = new Promise(function(resolve){ resolve(42); });\nvar FakePromise1 = promise.constructor = function(exec){ exec(function(){}, function(){}); };\nvar FakePromise2 = function(exec){ exec(function(){}, function(){}); };\nObject.defineProperty(FakePromise1, Symbol.species, {value: FakePromise2});\nreturn promise.then(function(){}) instanceof FakePromise2;"
      },
      {
        "name": "Symbol.replace",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "var O = {};\nO[Symbol.replace] = function(){\n  return 42;\n};\nreturn ''.replace(O) === 42;"
      },
      {
        "name": "Symbol.search",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "var O = {};\nO[Symbol.search] = function(){\n  return 42;\n};\nreturn ''.search(O) === 42;"
      },
      {
        "name": "Symbol.split",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "var O = {};\nO[Symbol.split] = function(){\n  return 42;\n};\nreturn ''.split(O) === 42;"
      },
      {
        "name": "Symbol.match",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "var O = {};\nO[Symbol.match] = function(){\n  return 42;\n};\nreturn ''.match(O) === 42;"
      },
      {
        "name": "Symbol.match, RegExp constructor",
        "browsers": {
          "chrome": "50",
          "firefox": "40",
          "safari": "10",
          "edge": null
        },
        "code": "var re = /./;\nre[Symbol.match] = false;\nvar foo = {constructor: RegExp};\nfoo[Symbol.match] = true;\nreturn RegExp(re) !== re && RegExp(foo) === foo;"
      },
      {
        "name": "Symbol.match, String.prototype.startsWith",
        "browsers": {
          "chrome": "51",
          "firefox": "40",
          "safari": "10",
          "edge": null
        },
        "code": "var re = /./;\ntry {\n  '/./'.startsWith(re);\n} catch(e){\n  re[Symbol.match] = false;\n  return '/./'.startsWith(re);\n}"
      },
      {
        "name": "Symbol.match, String.prototype.endsWith",
        "browsers": {
          "chrome": "51",
          "firefox": "40",
          "safari": "10",
          "edge": null
        },
        "code": "var re = /./;\ntry {\n  '/./'.endsWith(re);\n} catch(e){\n  re[Symbol.match] = false;\n  return '/./'.endsWith(re);\n}"
      },
      {
        "name": "Symbol.match, String.prototype.includes",
        "browsers": {
          "chrome": "51",
          "firefox": "40",
          "safari": "10",
          "edge": null
        },
        "code": "var re = /./;\ntry {\n  '/./'.includes(re);\n} catch(e){\n  re[Symbol.match] = false;\n  return '/./'.includes(re);\n}"
      },
      {
        "name": "Symbol.toPrimitive",
        "browsers": {
          "chrome": "47",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "var a = {}, b = {}, c = {};\nvar passed = 0;\na[Symbol.toPrimitive] = function(hint) { passed += hint === \"number\";  return 0; };\nb[Symbol.toPrimitive] = function(hint) { passed += hint === \"string\";  return 0; };\nc[Symbol.toPrimitive] = function(hint) { passed += hint === \"default\"; return 0; };\n\na >= 0;\nb in {};\nc == 0;\nreturn passed === 3;"
      },
      {
        "name": "Symbol.toStringTag",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": null
        },
        "code": "var a = {};\na[Symbol.toStringTag] = \"foo\";\nreturn (a + \"\") === \"[object foo]\";"
      },
      {
        "name": "Symbol.toStringTag affects existing built-ins",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": null
        },
        "code": "var s = Symbol.toStringTag;\nvar passed = true;\n[\n  [Array.prototype, []],\n  [String.prototype, ''],\n  [arguments, arguments],\n  [Function.prototype, function(){}],\n  [Error.prototype, new Error()],\n  [Boolean.prototype, true],\n  [Number.prototype, 2],\n  [Date.prototype, new Date()],\n  [RegExp.prototype, /./]\n].forEach(function(pair){\n  pair[0][s] = \"foo\";\n  passed &= (Object.prototype.toString.call(pair[1]) === \"[object foo]\");\n  delete pair[0][s];\n});\nreturn passed;"
      },
      {
        "name": "Symbol.toStringTag, new built-ins",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": null
        },
        "code": "var passed = true;\nvar s = Symbol.toStringTag;\n[\n  [String, \"String Iterator\"],\n  [Array, \"Array Iterator\"],\n  [Map, \"Map Iterator\"],\n  [Set, \"Set Iterator\"]\n].forEach(function(pair){\n  var iterProto = Object.getPrototypeOf(new pair[0]()[Symbol.iterator]());\n  passed = passed\n    && iterProto.hasOwnProperty(s)\n    && iterProto[s] === pair[1];\n});\npassed = passed\n  && Object.getPrototypeOf(function*(){})[s] === \"GeneratorFunction\"\n  && Object.getPrototypeOf(function*(){}())[s] === \"Generator\"\n  && Map.prototype[s] === \"Map\"\n  && Set.prototype[s] === \"Set\"\n  && ArrayBuffer.prototype[s] === \"ArrayBuffer\"\n  && DataView.prototype[s] === \"DataView\"\n  && Promise.prototype[s] === \"Promise\"\n  && Symbol.prototype[s] === \"Symbol\"\n  && typeof Object.getOwnPropertyDescriptor(\n    Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get === \"function\";\n  return passed;"
      },
      {
        "name": "Symbol.toStringTag, misc. built-ins",
        "browsers": {
          "chrome": "49",
          "firefox": "51",
          "safari": "10",
          "edge": null
        },
        "code": "var s = Symbol.toStringTag;\nreturn Math[s] === \"Math\"\n  && JSON[s] === \"JSON\";"
      },
      {
        "name": "Symbol.unscopables",
        "browsers": {
          "chrome": "38",
          "firefox": "48",
          "safari": "9",
          "edge": "12"
        },
        "code": "var a = { foo: 1, bar: 2 };\na[Symbol.unscopables] = { bar: true };\nwith (a) {\n  return foo === 1 && typeof bar === \"undefined\";\n}"
      }
    ]
  },
  {
    "name": "Object static methods",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor",
    "tests": [
      {
        "name": "Object.assign",
        "browsers": {
          "chrome": "45",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "var o = Object.assign({a:true}, {b:true}, {c:true});\nreturn \"a\" in o && \"b\" in o && \"c\" in o;"
      },
      {
        "name": "Object.is",
        "browsers": {
          "chrome": "19",
          "firefox": "22",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Object.is === 'function' &&\n  Object.is(NaN, NaN) &&\n !Object.is(-0, 0);"
      },
      {
        "name": "Object.getOwnPropertySymbols",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var o = {};\nvar sym = Symbol(), sym2 = Symbol(), sym3 = Symbol();\no[sym]  = true;\no[sym2] = true;\no[sym3] = true;\nvar result = Object.getOwnPropertySymbols(o);\nreturn result[0] === sym\n  && result[1] === sym2\n  && result[2] === sym3;"
      },
      {
        "name": "Object.setPrototypeOf",
        "browsers": {
          "chrome": "34",
          "firefox": "31",
          "safari": "9",
          "edge": null
        },
        "code": "return Object.setPrototypeOf({}, Array.prototype) instanceof Array;"
      }
    ]
  },
  {
    "name": "function \"name\" property",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname",
    "tests": [
      {
        "name": "function statements",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": "12"
        },
        "code": "function foo(){};\nreturn foo.name === 'foo' &&\n  (function(){}).name === '';"
      },
      {
        "name": "function expressions",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": "12"
        },
        "code": "return (function foo(){}).name === 'foo' &&\n  (function(){}).name === '';"
      },
      {
        "name": "new Function",
        "browsers": {
          "chrome": "48",
          "firefox": "2",
          "safari": "51",
          "edge": "12"
        },
        "code": "return (new Function).name === \"anonymous\";"
      },
      {
        "name": "bound functions",
        "browsers": {
          "chrome": "45",
          "firefox": "47",
          "safari": "10",
          "edge": "12"
        },
        "code": "function foo() {};\nreturn foo.bind({}).name === \"bound foo\" &&\n  (function(){}).bind({}).name === \"bound \";"
      },
      {
        "name": "variables (function)",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "10",
          "edge": null
        },
        "code": "var foo = function() {};\nvar bar = function baz() {};\nreturn foo.name === \"foo\" && bar.name === \"baz\";"
      },
      {
        "name": "object methods (function)",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "10",
          "edge": "13"
        },
        "code": "var o = { foo: function(){}, bar: function baz(){}};\no.qux = function(){};\nreturn o.foo.name === \"foo\" &&\n       o.bar.name === \"baz\" &&\n       o.qux.name === \"\";"
      },
      {
        "name": "accessor properties",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": "12"
        },
        "code": "var o = { get foo(){}, set foo(x){} };\nvar descriptor = Object.getOwnPropertyDescriptor(o, \"foo\");\nreturn descriptor.get.name === \"get foo\" &&\n       descriptor.set.name === \"set foo\";"
      },
      {
        "name": "shorthand methods",
        "browsers": {
          "chrome": "42",
          "firefox": "34",
          "safari": "9",
          "edge": "13"
        },
        "code": "var o = { foo(){} };\nreturn o.foo.name === \"foo\";"
      },
      {
        "name": "shorthand methods (no lexical binding)",
        "browsers": {
          "chrome": "42",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "var f = \"foo\";\nreturn ({f() { return f; }}).f() === \"foo\";"
      },
      {
        "name": "symbol-keyed methods",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "10",
          "edge": "12"
        },
        "code": "var sym1 = Symbol(\"foo\");\nvar sym2 = Symbol();\nvar o = {\n  [sym1]: function(){},\n  [sym2]: function(){}\n};\n\nreturn o[sym1].name === \"[foo]\" &&\n       o[sym2].name === \"\";"
      },
      {
        "name": "class statements",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class foo {};\nclass bar { static name() {} };\nreturn foo.name === \"foo\" &&\n  typeof bar.name === \"function\";"
      },
      {
        "name": "class expressions",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "return class foo {}.name === \"foo\" &&\n  typeof class bar { static name() {} }.name === \"function\";"
      },
      {
        "name": "variables (class)",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "10",
          "edge": "13"
        },
        "code": "var foo = class {};\nvar bar = class baz {};\nvar qux = class { static name() {} };\nreturn foo.name === \"foo\" &&\n       bar.name === \"baz\" &&\n       typeof qux.name === \"function\";"
      },
      {
        "name": "object methods (class)",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "10",
          "edge": "13"
        },
        "code": "var o = { foo: class {}, bar: class baz {}};\no.qux = class {};\nreturn o.foo.name === \"foo\" &&\n       o.bar.name === \"baz\" &&\n       o.qux.name === \"\";"
      },
      {
        "name": "class prototype methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C { foo(){} };\nreturn (new C).foo.name === \"foo\";"
      },
      {
        "name": "class static methods",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C { static foo(){} };\nreturn C.foo.name === \"foo\";"
      },
      {
        "name": "isn't writable, is configurable",
        "browsers": {
          "chrome": "43",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "var descriptor = Object.getOwnPropertyDescriptor(function f(){},\"name\");\nreturn descriptor.enumerable   === false &&\n       descriptor.writable     === false &&\n       descriptor.configurable === true;"
      }
    ]
  },
  {
    "name": "String static methods",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-constructor",
    "tests": [
      {
        "name": "String.raw",
        "browsers": {
          "chrome": "41",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.raw === 'function';"
      },
      {
        "name": "String.fromCodePoint",
        "browsers": {
          "chrome": "41",
          "firefox": "29",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.fromCodePoint === 'function';"
      }
    ]
  },
  {
    "name": "String.prototype methods",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object",
    "tests": [
      {
        "name": "String.prototype.codePointAt",
        "browsers": {
          "chrome": "41",
          "firefox": "29",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.prototype.codePointAt === 'function';"
      },
      {
        "name": "String.prototype.normalize",
        "browsers": {
          "chrome": "34",
          "firefox": "31",
          "safari": "10",
          "edge": "12"
        },
        "code": "return typeof String.prototype.normalize === \"function\"\n  && \"c\\u0327\\u0301\".normalize(\"NFC\") === \"\\u1e09\"\n  && \"\\u1e09\".normalize(\"NFD\") === \"c\\u0327\\u0301\";"
      },
      {
        "name": "String.prototype.repeat",
        "browsers": {
          "chrome": "41",
          "firefox": "24",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.prototype.repeat === 'function'\n  && \"foo\".repeat(3) === \"foofoofoo\";"
      },
      {
        "name": "String.prototype.startsWith",
        "browsers": {
          "chrome": "41",
          "firefox": "17",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.prototype.startsWith === 'function'\n  && \"foobar\".startsWith(\"foo\");"
      },
      {
        "name": "String.prototype.startsWith throws on RegExp",
        "browsers": {
          "chrome": "41",
          "firefox": "29",
          "safari": "9",
          "edge": "12"
        },
        "code": "try {\n  \"a\".startsWith(/./);\n} catch(e) {\n  return typeof String.prototype.startsWith === 'function';\n}"
      },
      {
        "name": "String.prototype.endsWith",
        "browsers": {
          "chrome": "41",
          "firefox": "17",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.prototype.endsWith === 'function'\n  && \"foobar\".endsWith(\"bar\");"
      },
      {
        "name": "String.prototype.endsWith throws on RegExp",
        "browsers": {
          "chrome": "41",
          "firefox": "29",
          "safari": "9",
          "edge": "12"
        },
        "code": "try {\n  \"a\".endsWith(/./);\n} catch(e) {\n  return typeof String.prototype.endsWith === 'function';\n}"
      },
      {
        "name": "String.prototype.includes",
        "browsers": {
          "chrome": "41",
          "firefox": "40",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.prototype.includes === 'function'\n  && \"foobar\".includes(\"oba\");"
      },
      {
        "name": "String.prototype[Symbol.iterator]",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof String.prototype[Symbol.iterator] === 'function';"
      },
      {
        "name": "String iterator prototype chain",
        "browsers": {
          "chrome": "45",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "// Iterator instance\nvar iterator = ''[Symbol.iterator]();\n// %StringIteratorPrototype%\nvar proto1 = Object.getPrototypeOf(iterator);\n// %IteratorPrototype%\nvar proto2 = Object.getPrototypeOf(proto1);\n\nreturn proto2.hasOwnProperty(Symbol.iterator) &&\n  !proto1    .hasOwnProperty(Symbol.iterator) &&\n  !iterator  .hasOwnProperty(Symbol.iterator) &&\n  iterator[Symbol.iterator]() === iterator;"
      }
    ]
  },
  {
    "name": "RegExp.prototype properties",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype",
    "tests": [
      {
        "name": "RegExp.prototype.flags",
        "browsers": {
          "chrome": "49",
          "firefox": "37",
          "safari": "9",
          "edge": null
        },
        "code": "return /./igm.flags === \"gim\" && /./.flags === \"\";"
      },
      {
        "name": "RegExp.prototype[Symbol.match]",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "return typeof RegExp.prototype[Symbol.match] === 'function';"
      },
      {
        "name": "RegExp.prototype[Symbol.replace]",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "return typeof RegExp.prototype[Symbol.replace] === 'function';"
      },
      {
        "name": "RegExp.prototype[Symbol.split]",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "return typeof RegExp.prototype[Symbol.split] === 'function';"
      },
      {
        "name": "RegExp.prototype[Symbol.search]",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "return typeof RegExp.prototype[Symbol.search] === 'function';"
      },
      {
        "name": "RegExp[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": "13"
        },
        "code": "var prop = Object.getOwnPropertyDescriptor(RegExp, Symbol.species);\nreturn 'get' in prop && RegExp[Symbol.species] === RegExp;"
      }
    ]
  },
  {
    "name": "Array static methods",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor",
    "tests": [
      {
        "name": "Array.from, array-like objects",
        "browsers": {
          "chrome": "45",
          "firefox": "32",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Array.from({ 0: \"foo\", 1: \"bar\", length: 2 }) + '' === \"foo,bar\";"
      },
      {
        "name": "Array.from, generator instances",
        "browsers": {
          "chrome": "45",
          "firefox": "32",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterable = (function*(){ yield 1; yield 2; yield 3; }());\nreturn Array.from(iterable) + '' === \"1,2,3\";"
      },
      {
        "name": "Array.from, generic iterables",
        "browsers": {
          "chrome": "45",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([1, 2, 3]);\nreturn Array.from(iterable) + '' === \"1,2,3\";"
      },
      {
        "name": "Array.from, instances of generic iterables",
        "browsers": {
          "chrome": "45",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([1, 2, 3]);\nreturn Array.from(Object.create(iterable)) + '' === \"1,2,3\";"
      },
      {
        "name": "Array.from map function, array-like objects",
        "browsers": {
          "chrome": "45",
          "firefox": "32",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Array.from({ 0: \"foo\", 1: \"bar\", length: 2 }, function(e, i) {\n  return e + this.baz + i;\n}, { baz: \"d\" }) + '' === \"food0,bard1\";"
      },
      {
        "name": "Array.from map function, generator instances",
        "browsers": {
          "chrome": "45",
          "firefox": "32",
          "safari": "10",
          "edge": "13"
        },
        "code": "var iterable = (function*(){ yield \"foo\"; yield \"bar\"; yield \"bal\"; }());\nreturn Array.from(iterable, function(e, i) {\n  return e + this.baz + i;\n}, { baz: \"d\" }) + '' === \"food0,bard1,bald2\";"
      },
      {
        "name": "Array.from map function, generic iterables",
        "browsers": {
          "chrome": "45",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([\"foo\", \"bar\", \"bal\"]);\nreturn Array.from(iterable, function(e, i) {\n  return e + this.baz + i;\n}, { baz: \"d\" }) + '' === \"food0,bard1,bald2\";"
      },
      {
        "name": "Array.from map function, instances of iterables",
        "browsers": {
          "chrome": "45",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "var iterable = global.__createIterableObject([\"foo\", \"bar\", \"bal\"]);\nreturn Array.from(Object.create(iterable), function(e, i) {\n  return e + this.baz + i;\n}, { baz: \"d\" }) + '' === \"food0,bard1,bald2\";"
      },
      {
        "name": "Array.from, iterator closing",
        "browsers": {
          "chrome": "51",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "var closed = false;\nvar iter = global.__createIterableObject([1, 2, 3], {\n  'return': function(){ closed = true; return {}; }\n});\ntry {\n  Array.from(iter, function() { throw 42 });\n} catch(e){}\nreturn closed;"
      },
      {
        "name": "Array.of",
        "browsers": {
          "chrome": "45",
          "firefox": "25",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Array.of === 'function' &&\n  Array.of(2)[0] === 2;"
      },
      {
        "name": "Array[Symbol.species]",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "var prop = Object.getOwnPropertyDescriptor(Array, Symbol.species);\nreturn 'get' in prop && Array[Symbol.species] === Array;"
      }
    ]
  },
  {
    "name": "Array.prototype methods",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object",
    "tests": [
      {
        "name": "Array.prototype.copyWithin",
        "browsers": {
          "chrome": "45",
          "firefox": "32",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.copyWithin === 'function';"
      },
      {
        "name": "Array.prototype.find",
        "browsers": {
          "chrome": "45",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.find === 'function';"
      },
      {
        "name": "Array.prototype.findIndex",
        "browsers": {
          "chrome": "45",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.findIndex === 'function';"
      },
      {
        "name": "Array.prototype.fill",
        "browsers": {
          "chrome": "45",
          "firefox": "31",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.fill === 'function';"
      },
      {
        "name": "Array.prototype.keys",
        "browsers": {
          "chrome": "38",
          "firefox": "28",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.keys === 'function';"
      },
      {
        "name": "Array.prototype.values",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.values === 'function';"
      },
      {
        "name": "Array.prototype.entries",
        "browsers": {
          "chrome": "38",
          "firefox": "28",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Array.prototype.entries === 'function';"
      },
      {
        "name": "Array.prototype[Symbol.iterator]",
        "browsers": {
          "chrome": "38",
          "firefox": "36",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Array.prototype[Symbol.iterator] === 'function';"
      },
      {
        "name": "Array iterator prototype chain",
        "browsers": {
          "chrome": "51",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "// Iterator instance\nvar iterator = [][Symbol.iterator]();\n// %ArrayIteratorPrototype%\nvar proto1 = Object.getPrototypeOf(iterator);\n// %IteratorPrototype%\nvar proto2 = Object.getPrototypeOf(proto1);\n\nreturn proto2.hasOwnProperty(Symbol.iterator) &&\n  !proto1    .hasOwnProperty(Symbol.iterator) &&\n  !iterator  .hasOwnProperty(Symbol.iterator) &&\n  iterator[Symbol.iterator]() === iterator;"
      },
      {
        "name": "Array.prototype[Symbol.unscopables]",
        "browsers": {
          "chrome": "38",
          "firefox": "48",
          "safari": "9",
          "edge": "12"
        },
        "code": "var unscopables = Array.prototype[Symbol.unscopables];\nif (!unscopables) {\n  return false;\n}\nvar ns = \"find,findIndex,fill,copyWithin,entries,keys,values\".split(\",\");\nfor (var i = 0; i < ns.length; i++) {\n  if (Array.prototype[ns[i]] && !unscopables[ns[i]]) return false;\n}\nreturn true;"
      }
    ]
  },
  {
    "name": "Number properties",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number",
    "tests": [
      {
        "name": "Number.isFinite",
        "browsers": {
          "chrome": "19",
          "firefox": "16",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.isFinite === 'function';"
      },
      {
        "name": "Number.isInteger",
        "browsers": {
          "chrome": "34",
          "firefox": "16",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.isInteger === 'function';"
      },
      {
        "name": "Number.isSafeInteger",
        "browsers": {
          "chrome": "34",
          "firefox": "32",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.isSafeInteger === 'function';"
      },
      {
        "name": "Number.isNaN",
        "browsers": {
          "chrome": "19",
          "firefox": "15",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.isNaN === 'function';"
      },
      {
        "name": "Number.EPSILON",
        "browsers": {
          "chrome": "34",
          "firefox": "25",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.EPSILON === 'number';"
      },
      {
        "name": "Number.MIN_SAFE_INTEGER",
        "browsers": {
          "chrome": "34",
          "firefox": "31",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.MIN_SAFE_INTEGER === 'number';"
      },
      {
        "name": "Number.MAX_SAFE_INTEGER",
        "browsers": {
          "chrome": "34",
          "firefox": "31",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Number.MAX_SAFE_INTEGER === 'number';"
      }
    ]
  },
  {
    "name": "Math methods",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-math",
    "tests": [
      {
        "name": "Math.clz32",
        "browsers": {
          "chrome": "38",
          "firefox": "31",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Math.clz32 === \"function\";"
      },
      {
        "name": "Math.imul",
        "browsers": {
          "chrome": "30",
          "firefox": "23",
          "safari": "7",
          "edge": "12"
        },
        "code": "return typeof Math.imul === \"function\";"
      },
      {
        "name": "Math.sign",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "9",
          "edge": "12"
        },
        "code": "return typeof Math.sign === \"function\";"
      },
      {
        "name": "Math.log10",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.log10 === \"function\";"
      },
      {
        "name": "Math.log2",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.log2 === \"function\";"
      },
      {
        "name": "Math.log1p",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.log1p === \"function\";"
      },
      {
        "name": "Math.expm1",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.expm1 === \"function\";"
      },
      {
        "name": "Math.cosh",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.cosh === \"function\";"
      },
      {
        "name": "Math.sinh",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.sinh === \"function\";"
      },
      {
        "name": "Math.tanh",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.tanh === \"function\";"
      },
      {
        "name": "Math.acosh",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.acosh === \"function\";"
      },
      {
        "name": "Math.asinh",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.asinh === \"function\";"
      },
      {
        "name": "Math.atanh",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.atanh === \"function\";"
      },
      {
        "name": "Math.trunc",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.trunc === \"function\";"
      },
      {
        "name": "Math.fround",
        "browsers": {
          "chrome": "38",
          "firefox": "26",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.fround === \"function\";"
      },
      {
        "name": "Math.cbrt",
        "browsers": {
          "chrome": "38",
          "firefox": "25",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return typeof Math.cbrt === \"function\";"
      },
      {
        "name": "Math.hypot",
        "browsers": {
          "chrome": "38",
          "firefox": "27",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "return Math.hypot() === 0 &&\n  Math.hypot(1) === 1 &&\n  Math.hypot(9, 12, 20) === 25 &&\n  Math.hypot(27, 36, 60, 100) === 125;"
      }
    ]
  },
  {
    "name": "Date.prototype[Symbol.toPrimitive]",
    "category": "built-in extensions",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-date.prototype-@@toprimitive",
    "tests": [
      {
        "name": "Date.prototype[Symbol.toPrimitive]",
        "category": "built-in extensions",
        "significance": "tiny",
        "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-date.prototype-@@toprimitive",
        "browsers": {
          "chrome": "47",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "var tp = Date.prototype[Symbol.toPrimitive];\nreturn tp.call(Object(2), \"number\") === 2\n  && tp.call(Object(2), \"string\") === \"2\"\n  && tp.call(Object(2), \"default\") === \"2\";"
      }
    ]
  },
  {
    "name": "Array is subclassable",
    "category": "subclassing",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor",
    "tests": [
      {
        "name": "length property (accessing)",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nvar len1 = c.length;\nc[2] = 'foo';\nvar len2 = c.length;\nreturn len1 === 0 && len2 === 3;"
      },
      {
        "name": "length property (setting)",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nc[2] = 'foo';\nc.length = 1;\nreturn c.length === 1 && !(2 in c);"
      },
      {
        "name": "correct prototype chain",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nreturn c instanceof C && c instanceof Array && Object.getPrototypeOf(C) === Array;"
      },
      {
        "name": "Array.isArray support",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class C extends Array {}\nreturn Array.isArray(new C());"
      },
      {
        "name": "Array.prototype.concat",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nreturn c.concat(1) instanceof C;"
      },
      {
        "name": "Array.prototype.filter",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nreturn c.filter(Boolean) instanceof C;"
      },
      {
        "name": "Array.prototype.map",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nreturn c.map(Boolean) instanceof C;"
      },
      {
        "name": "Array.prototype.slice",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nc.push(2,4,6);\nreturn c.slice(1,2) instanceof C;"
      },
      {
        "name": "Array.prototype.splice",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nvar c = new C();\nc.push(2,4,6);\nreturn c.splice(1,2) instanceof C;"
      },
      {
        "name": "Array.from",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nreturn C.from({ length: 0 }) instanceof C;"
      },
      {
        "name": "Array.of",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Array {}\nreturn C.of(0) instanceof C;"
      }
    ]
  },
  {
    "name": "RegExp is subclassable",
    "category": "subclassing",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class R extends RegExp {}\nvar r = new R(\"baz\",\"g\");\nreturn r.global && r.source === \"baz\";"
      },
      {
        "name": "correct prototype chain",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class R extends RegExp {}\nvar r = new R(\"baz\",\"g\");\nreturn r instanceof R && r instanceof RegExp && Object.getPrototypeOf(R) === RegExp;"
      },
      {
        "name": "RegExp.prototype.exec",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class R extends RegExp {}\nvar r = new R(\"baz\",\"g\");\nreturn r.exec(\"foobarbaz\")[0] === \"baz\" && r.lastIndex === 9;"
      },
      {
        "name": "RegExp.prototype.test",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "9",
          "edge": "13"
        },
        "code": "class R extends RegExp {}\nvar r = new R(\"baz\");\nreturn r.test(\"foobarbaz\");"
      }
    ]
  },
  {
    "name": "Function is subclassable",
    "category": "subclassing",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor",
    "tests": [
      {
        "name": "can be called",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Function {}\nvar c = new C(\"return 'foo';\");\nreturn c() === 'foo';"
      },
      {
        "name": "correct prototype chain",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Function {}\nvar c = new C(\"return 'foo';\");\nreturn c instanceof C && c instanceof Function && Object.getPrototypeOf(C) === Function;"
      },
      {
        "name": "can be used with \"new\"",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Function {}\nvar c = new C(\"this.bar = 2;\");\nc.prototype.baz = 3;\nreturn new c().bar === 2 && new c().baz === 3;"
      },
      {
        "name": "Function.prototype.call",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Function {}\nvar c = new C(\"x\", \"return this.bar + x;\");\nreturn c.call({bar:1}, 2) === 3;"
      },
      {
        "name": "Function.prototype.apply",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Function {}\nvar c = new C(\"x\", \"return this.bar + x;\");\nreturn c.apply({bar:1}, [2]) === 3;"
      },
      {
        "name": "Function.prototype.bind",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Function {}\nvar c = new C(\"x\", \"y\", \"return this.bar + x + y;\").bind({bar:1}, 2);\nreturn c(6) === 9 && c instanceof C;"
      }
    ]
  },
  {
    "name": "Promise is subclassable",
    "category": "subclassing",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class P extends Promise {}\nvar p1 = new P(function(resolve, reject) { resolve(\"foo\"); });\nvar p2 = new P(function(resolve, reject) { reject(\"quux\"); });\nvar score = +(p1 instanceof P);\n\nfunction thenFn(result)  { score += (result === \"foo\");  check(); }\nfunction catchFn(result) { score += (result === \"quux\"); check(); }\nfunction shouldNotRun(result)  { score = -Infinity;   }\n\np1.then(thenFn, shouldNotRun);\np2.then(shouldNotRun, catchFn);\np1.catch(shouldNotRun);\np2.catch(catchFn);\n\np1.then(function() {\n  // P.prototype.then() should return a new P\n  score += p1.then() instanceof P && p1.then() !== p1;\n  check();\n});\n\nfunction check() {\n  if (score === 5) asyncTestPassed();\n}"
      },
      {
        "name": "correct prototype chain",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Promise {}\nvar c = new C(function(resolve, reject) { resolve(\"foo\"); });\nreturn c instanceof C && c instanceof Promise && Object.getPrototypeOf(C) === Promise;"
      },
      {
        "name": "Promise.all",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class P extends Promise {}\nvar fulfills = P.all([\n  new Promise(function(resolve)   { setTimeout(resolve,2000,\"foo\"); }),\n  new Promise(function(resolve)   { setTimeout(resolve,1000,\"bar\"); }),\n]);\nvar rejects = P.all([\n  new Promise(function(_, reject) { setTimeout(reject, 2000,\"baz\"); }),\n  new Promise(function(_, reject) { setTimeout(reject, 1000,\"qux\"); }),\n]);\nvar score = +(fulfills instanceof P);\nfulfills.then(function(result) { score += (result + \"\" === \"foo,bar\"); check(); });\nrejects.catch(function(result) { score += (result === \"qux\"); check(); });\n\nfunction check() {\n  if (score === 3) asyncTestPassed();\n}"
      },
      {
        "name": "Promise.race",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class P extends Promise {}\nvar fulfills = P.race([\n  new Promise(function(resolve)   { setTimeout(resolve,1000,\"foo\"); }),\n  new Promise(function(_, reject) { setTimeout(reject, 2000,\"bar\"); }),\n]);\nvar rejects = P.race([\n  new Promise(function(_, reject) { setTimeout(reject, 1000,\"baz\"); }),\n  new Promise(function(resolve)   { setTimeout(resolve,2000,\"qux\"); }),\n]);\nvar score = +(fulfills instanceof P);\nfulfills.then(function(result) { score += (result === \"foo\"); check(); });\nrejects.catch(function(result) { score += (result === \"baz\"); check(); });\n\nfunction check() {\n  if (score === 3) asyncTestPassed();\n}"
      }
    ]
  },
  {
    "name": "miscellaneous subclassables",
    "category": "subclassing",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor",
    "tests": [
      {
        "name": "Boolean is subclassable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Boolean {}\nvar c = new C(true);\nreturn c instanceof Boolean\n  && c instanceof C\n  && c == true;"
      },
      {
        "name": "Number is subclassable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Number {}\nvar c = new C(6);\nreturn c instanceof Number\n  && c instanceof C\n  && +c === 6;"
      },
      {
        "name": "String is subclassable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends String {}\nvar c = new C(\"golly\");\nreturn c instanceof String\n  && c instanceof C\n  && c + '' === \"golly\"\n  && c[0] === \"g\"\n  && c.length === 5;"
      },
      {
        "name": "Error is subclassable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "class C extends Error {}\nvar c = new C();\nreturn c instanceof Error\n  && c instanceof C\n  && Object.prototype.toString.call(c) === \"[object Error]\";"
      },
      {
        "name": "Map is subclassable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var key = {};\nclass M extends Map {}\nvar map = new M();\n\nmap.set(key, 123);\n\nreturn map instanceof M && map.has(key) && map.get(key) === 123;"
      },
      {
        "name": "Set is subclassable",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "var obj = {};\nclass S extends Set {}\nvar set = new S();\n\nset.add(123);\nset.add(123);\n\nreturn set instanceof S && set.has(123);"
      }
    ]
  },
  {
    "name": "prototype of bound functions",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-boundfunctioncreate",
    "tests": [
      {
        "name": "basic functions",
        "browsers": {
          "chrome": "46",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function correctProtoBound(proto) {\n  var f = function(){};\n  if (Object.setPrototypeOf) {\n    Object.setPrototypeOf(f, proto);\n  }\n  else {\n    f.__proto__ = proto;\n  }\n  var boundF = Function.prototype.bind.call(f, null);\n  return Object.getPrototypeOf(boundF) === proto;\n}\nreturn correctProtoBound(Function.prototype)\n  && correctProtoBound({})\n  && correctProtoBound(null);"
      },
      {
        "name": "generator functions",
        "browsers": {
          "chrome": "46",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function correctProtoBound(proto) {\n  var f = function*(){};\n  if (Object.setPrototypeOf) {\n    Object.setPrototypeOf(f, proto);\n  }\n  else {\n    f.__proto__ = proto;\n  }\n  var boundF = Function.prototype.bind.call(f, null);\n  return Object.getPrototypeOf(boundF) === proto;\n}\nreturn correctProtoBound(Function.prototype)\n  && correctProtoBound({})\n  && correctProtoBound(null);"
      },
      {
        "name": "arrow functions",
        "browsers": {
          "chrome": "46",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function correctProtoBound(proto) {\n  var f = ()=>5;\n  if (Object.setPrototypeOf) {\n    Object.setPrototypeOf(f, proto);\n  }\n  else {\n    f.__proto__ = proto;\n  }\n  var boundF = Function.prototype.bind.call(f, null);\n  return Object.getPrototypeOf(boundF) === proto;\n}\nreturn correctProtoBound(Function.prototype)\n  && correctProtoBound({})\n  && correctProtoBound(null);"
      },
      {
        "name": "classes",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function correctProtoBound(proto) {\n  class C {}\n  if (Object.setPrototypeOf) {\n    Object.setPrototypeOf(C, proto);\n  }\n  else {\n    C.__proto__ = proto;\n  }\n  var boundF = Function.prototype.bind.call(C, null);\n  return Object.getPrototypeOf(boundF) === proto;\n}\nreturn correctProtoBound(Function.prototype)\n  && correctProtoBound({})\n  && correctProtoBound(null);"
      },
      {
        "name": "subclasses",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "function correctProtoBound(superclass) {\n  class C extends superclass {\n    constructor() {\n      return Object.create(null);\n    }\n  }\n  var boundF = Function.prototype.bind.call(C, null);\n  return Object.getPrototypeOf(boundF) === Object.getPrototypeOf(C);\n}\nreturn correctProtoBound(function(){})\n  && correctProtoBound(Array)\n  && correctProtoBound(null);"
      }
    ]
  },
  {
    "name": "Proxy, internal 'get' calls",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "ToPrimitive",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "// ToPrimitive -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({toString:Function()}, { get: function(o, k) { get.push(k); return o[k]; }});\np + 3;\nreturn get[0] === Symbol.toPrimitive && get.slice(1) + '' === \"valueOf,toString\";"
      },
      {
        "name": "CreateListFromArrayLike",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// CreateListFromArrayLike -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({length:2, 0:0, 1:0}, { get: function(o, k) { get.push(k); return o[k]; }});\nFunction.prototype.apply({}, p);\nreturn get + '' === \"length,0,1\";"
      },
      {
        "name": "instanceof operator",
        "browsers": {
          "chrome": "51",
          "firefox": "50",
          "safari": "10",
          "edge": null
        },
        "code": "// InstanceofOperator -> GetMethod -> GetV -> [[Get]]\n// InstanceofOperator -> OrdinaryHasInstance -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});\n({}) instanceof p;\nreturn get[0] === Symbol.hasInstance && get.slice(1) + '' === \"prototype\";"
      },
      {
        "name": "HasBinding",
        "browsers": {
          "chrome": "49",
          "firefox": "48",
          "safari": "10",
          "edge": "14"
        },
        "code": "// HasBinding -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({foo:1}, { get: function(o, k) { get.push(k); return o[k]; }});\np[Symbol.unscopables] = p;\nwith(p) {\n  typeof foo;\n}\nreturn get[0] === Symbol.unscopables && get.slice(1) + '' === \"foo\";"
      },
      {
        "name": "CreateDynamicFunction",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "// CreateDynamicFunction -> GetPrototypeFromConstructor -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy(Function, { get: function(o, k) { get.push(k); return o[k]; }});\nnew p;\nreturn get + '' === \"prototype\";"
      },
      {
        "name": "ClassDefinitionEvaluation",
        "browsers": {
          "chrome": "49",
          "firefox": "45",
          "safari": "10",
          "edge": "13"
        },
        "code": "// ClassDefinitionEvaluation -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});\nclass C extends p {}\nreturn get + '' === \"prototype\";"
      },
      {
        "name": "IteratorComplete, IteratorValue",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": "12"
        },
        "code": "// IteratorComplete -> Get -> [[Get]]\n// IteratorValue -> Get -> [[Get]]\nvar get = [];\nvar iterable = {};\niterable[Symbol.iterator] = function() {\n  return {\n    next: function() {\n      return new Proxy({ value: 2, done: false }, { get: function(o, k) { get.push(k); return o[k]; }});\n    }\n  };\n}\nvar i = 0;\nfor(var e of iterable) {\n  if (++i >= 2) break;\n}\nreturn get + '' === \"done,value,done,value\";"
      },
      {
        "name": "ToPropertyDescriptor",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "13"
        },
        "code": "// ToPropertyDescriptor -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({\n    enumerable: true, configurable: true, value: true,\n    writable: true, get: Function(), set: Function()\n  }, { get: function(o, k) { get.push(k); return o[k]; }});\ntry {\n  // This will throw, since it will have true for both \"get\" and \"value\",\n  // but not before performing a Get on every property.\n  Object.defineProperty({}, \"foo\", p);\n} catch(e) {\n  return get + '' === \"enumerable,configurable,value,writable,get,set\";\n}"
      },
      {
        "name": "Object.assign",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Object.assign -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({foo:1, bar:2}, { get: function(o, k) { get.push(k); return o[k]; }});\nObject.assign({}, p);\nreturn get + '' === \"foo,bar\";"
      },
      {
        "name": "Object.defineProperties",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Object.defineProperties -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({foo:{}, bar:{}}, { get: function(o, k) { get.push(k); return o[k]; }});\nObject.defineProperties({}, p);\nreturn get + '' === \"foo,bar\";"
      },
      {
        "name": "Function.prototype.bind",
        "browsers": {
          "chrome": "49",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Function.prototype.bind -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});\nFunction.prototype.bind.call(p);\nreturn get + '' === \"length,name\";"
      },
      {
        "name": "Error.prototype.toString",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Error.prototype.toString -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});\nError.prototype.toString.call(p);\nreturn get + '' === \"name,message\";"
      },
      {
        "name": "String.raw",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "// String.raw -> Get -> [[Get]]\nvar get = [];\nvar raw = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});\nvar p = new Proxy({raw: raw}, { get: function(o, k) { get.push(k); return o[k]; }});\nString.raw(p);\nreturn get + '' === \"raw,length,0,1\";"
      },
      {
        "name": "RegExp constructor",
        "browsers": {
          "chrome": "50",
          "firefox": "40",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp -> Get -> [[Get]]\nvar get = [];\nvar re = { constructor: null };\nre[Symbol.match] = true;\nvar p = new Proxy(re, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp(p);\nreturn get[0] === Symbol.match && get.slice(1) + '' === \"constructor,source,flags\";"
      },
      {
        "name": "RegExp.prototype.flags",
        "browsers": {
          "chrome": "49",
          "firefox": "37",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype.flags -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});\nObject.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);\nreturn get + '' === \"global,ignoreCase,multiline,unicode,sticky\";"
      },
      {
        "name": "RegExp.prototype.test",
        "browsers": {
          "chrome": "51",
          "firefox": "46",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype.test -> RegExpExec -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp.prototype.test.call(p);\nreturn get + '' === \"exec\";"
      },
      {
        "name": "RegExp.prototype.toString",
        "browsers": {
          "chrome": "50",
          "firefox": "39",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype.toString -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp.prototype.toString.call(p);\nreturn get + '' === \"source,flags\";"
      },
      {
        "name": "RegExp.prototype[Symbol.match]",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype[Symbol.match] -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp.prototype[Symbol.match].call(p);\np.global = true;\nRegExp.prototype[Symbol.match].call(p);\nreturn get + '' === \"global,exec,global,unicode,exec\";"
      },
      {
        "name": "RegExp.prototype[Symbol.replace]",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype[Symbol.replace] -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp.prototype[Symbol.replace].call(p);\np.global = true;\nRegExp.prototype[Symbol.replace].call(p);\nreturn get + '' === \"global,exec,global,unicode,exec\";"
      },
      {
        "name": "RegExp.prototype[Symbol.search]",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype[Symbol.search] -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp.prototype[Symbol.search].call(p);\nreturn get + '' === \"lastIndex,exec\";"
      },
      {
        "name": "RegExp.prototype[Symbol.split]",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// RegExp.prototype[Symbol.split] -> Get -> [[Get]]\nvar get = [];\nvar constructor = Function();\nconstructor[Symbol.species] = Object;\nvar p = new Proxy({ constructor: constructor, flags: '', exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});\nRegExp.prototype[Symbol.split].call(p, \"\");\nreturn get + '' === \"constructor,flags,exec\";"
      },
      {
        "name": "Array.from",
        "browsers": {
          "chrome": "49",
          "firefox": "36",
          "safari": "10",
          "edge": "13"
        },
        "code": "// Array.from -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});\nArray.from(p);\nreturn get[0] === Symbol.iterator && get.slice(1) + '' === \"length,0,1\";"
      },
      {
        "name": "Array.prototype.concat",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": null
        },
        "code": "// Array.prototype.concat -> Get -> [[Get]]\nvar get = [];\nvar arr = [1];\narr.constructor = undefined;\nvar p = new Proxy(arr, { get: function(o, k) { get.push(k); return o[k]; }});\nArray.prototype.concat.call(p,p);\nreturn get[0] === \"constructor\"\n  && get[1] === Symbol.isConcatSpreadable\n  && get[2] === \"length\"\n  && get[3] === \"0\"\n  && get[4] === get[1] && get[5] === get[2] && get[6] === get[3]\n  && get.length === 7;"
      },
      {
        "name": "Array.prototype iteration methods",
        "browsers": {
          "chrome": "51",
          "firefox": "32",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype methods -> Get -> [[Get]]\nvar methods = ['copyWithin', 'every', 'fill', 'filter', 'find', 'findIndex', 'forEach',\n  'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some'];\nvar get;\nvar p = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});\nfor(var i = 0; i < methods.length; i+=1) {\n  get = [];\n  Array.prototype[methods[i]].call(p, Function());\n  if (get + '' !== (\n    methods[i] === 'fill' ? \"length\" :\n    methods[i] === 'every' ? \"length,0\" :\n    methods[i] === 'lastIndexOf' || methods[i] === 'reduceRight' ? \"length,1,0\" :\n    \"length,0,1\"\n  )) {\n    return false;\n  }\n}\nreturn true;"
      },
      {
        "name": "Array.prototype.pop",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.pop -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});\nArray.prototype.pop.call(p);\nreturn get + '' === \"length,3\";"
      },
      {
        "name": "Array.prototype.reverse",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.reverse -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy([0,,2,,4,,], { get: function(o, k) { get.push(k); return o[k]; }});\nArray.prototype.reverse.call(p);\nreturn get + '' === \"length,0,4,2\";"
      },
      {
        "name": "Array.prototype.shift",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.shift -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});\nArray.prototype.shift.call(p);\nreturn get + '' === \"length,0,1,2,3\";"
      },
      {
        "name": "Array.prototype.splice",
        "browsers": {
          "chrome": "51",
          "firefox": "48",
          "safari": "10",
          "edge": "13"
        },
        "code": "// Array.prototype.splice -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});\nArray.prototype.splice.call(p,1,1);\nArray.prototype.splice.call(p,1,0,1);\nreturn get + '' === \"length,constructor,1,2,3,length,constructor,2,1\";"
      },
      {
        "name": "Array.prototype.toString",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.toString -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({ join:Function() }, { get: function(o, k) { get.push(k); return o[k]; }});\nArray.prototype.toString.call(p);\nreturn get + '' === \"join\";"
      },
      {
        "name": "JSON.stringify",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// JSON.stringify -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});\nJSON.stringify(p);\nreturn get + '' === \"toJSON\";"
      },
      {
        "name": "Promise resolve functions",
        "browsers": {
          "chrome": "49",
          "firefox": "29",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Promise resolve functions -> Get -> [[Get]]\nvar get = [];\nvar p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});\nnew Promise(function(resolve){ resolve(p); });\nreturn get + '' === \"then\";"
      },
      {
        "name": "String.prototype.match",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// String.prototype.match -> Get -> [[Get]]\nvar get = [];\nvar proxied = {};\nproxied[Symbol.toPrimitive] = Function();\nvar p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});\n\"\".match(p);\nreturn get[0] === Symbol.match && get[1] === Symbol.toPrimitive && get.length === 2;"
      },
      {
        "name": "String.prototype.replace",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// String.prototype.replace functions -> Get -> [[Get]]\nvar get = [];\nvar proxied = {};\nproxied[Symbol.toPrimitive] = Function();\nvar p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});\n\"\".replace(p);\nreturn get[0] === Symbol.replace && get[1] === Symbol.toPrimitive && get.length === 2;"
      },
      {
        "name": "String.prototype.search",
        "browsers": {
          "chrome": "51",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// String.prototype.search functions -> Get -> [[Get]]\nvar get = [];\nvar proxied = {};\nproxied[Symbol.toPrimitive] = Function();\nvar p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});\n\"\".search(p);\nreturn get[0] === Symbol.search && get[1] === Symbol.toPrimitive && get.length === 2;"
      },
      {
        "name": "String.prototype.split",
        "browsers": {
          "chrome": "50",
          "firefox": "49",
          "safari": "10",
          "edge": null
        },
        "code": "// String.prototype.split functions -> Get -> [[Get]]\nvar get = [];\nvar proxied = {};\nproxied[Symbol.toPrimitive] = Function();\nvar p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});\n\"\".split(p);\nreturn get[0] === Symbol.split && get[1] === Symbol.toPrimitive && get.length === 2;"
      },
      {
        "name": "Date.prototype.toJSON",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": null
        },
        "code": "// Date.prototype.toJSON -> ToPrimitive -> Get -> [[Get]]\n// Date.prototype.toJSON -> Invoke -> GetMethod -> GetV -> [[Get]]\nvar get = [];\nvar p = new Proxy({toString:Function(),toISOString:Function()}, { get: function(o, k) { get.push(k); return o[k]; }});\nDate.prototype.toJSON.call(p);\nreturn get[0] === Symbol.toPrimitive && get.slice(1) + '' === \"valueOf,toString,toISOString\";"
      }
    ]
  },
  {
    "name": "Proxy, internal 'set' calls",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "Object.assign",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Object.assign -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\nObject.assign(p, { foo: 1, bar: 2 });\nreturn set + '' === \"foo,bar\";"
      },
      {
        "name": "Array.from",
        "browsers": {
          "chrome": "49",
          "firefox": "32",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.from -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\nArray.from.call(function(){ return p; }, {length:2, 0:1, 1:2});\nreturn set + '' === \"length\";"
      },
      {
        "name": "Array.of",
        "browsers": {
          "chrome": "49",
          "firefox": "25",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.from -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\nArray.of.call(function(){ return p; }, 1, 2, 3);\nreturn set + '' === \"length\";"
      },
      {
        "name": "Array.prototype.copyWithin",
        "browsers": {
          "chrome": "49",
          "firefox": "40",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.copyWithin -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([1,2,3,4,5,6], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.copyWithin(0, 3);\nreturn set + '' === \"0,1,2\";"
      },
      {
        "name": "Array.prototype.fill",
        "browsers": {
          "chrome": "49",
          "firefox": "40",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.fill -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([1,2,3,4,5,6], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.fill(0, 3);\nreturn set + '' === \"3,4,5\";"
      },
      {
        "name": "Array.prototype.pop",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.pop -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.pop();\nreturn set + '' === \"length\";"
      },
      {
        "name": "Array.prototype.push",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.push -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.push(0,0,0);\nreturn set + '' === \"0,1,2,length\";"
      },
      {
        "name": "Array.prototype.reverse",
        "browsers": {
          "chrome": "49",
          "firefox": "40",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.reverse -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([0,0,0,,], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.reverse();\nreturn set + '' === \"3,1,2\";"
      },
      {
        "name": "Array.prototype.shift",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.shift -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([0,0,,0], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.shift();\nreturn set + '' === \"0,2,length\";"
      },
      {
        "name": "Array.prototype.splice",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.splice -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([1,2,3], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.splice(1,0,0);\nreturn set + '' === \"3,2,1,length\";"
      },
      {
        "name": "Array.prototype.unshift",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.unshift -> Set -> [[Set]]\nvar set = [];\nvar p = new Proxy([0,0,,0], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});\np.unshift(0,1);\nreturn set + '' === \"5,3,2,0,1,length\";"
      }
    ]
  },
  {
    "name": "Proxy, internal 'defineProperty' calls",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "[[Set]]",
        "browsers": {
          "chrome": "49",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "// [[Set]] -> [[DefineOwnProperty]]\nvar def = [];\nvar p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});\np.foo = 2; p.bar = 4;\nreturn def + '' === \"foo,bar\";"
      },
      {
        "name": "SetIntegrityLevel",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// SetIntegrityLevel -> DefinePropertyOrThrow -> [[DefineOwnProperty]]\nvar def = [];\nvar p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});\nObject.freeze(p);\nreturn def + '' === \"foo,bar\";"
      }
    ]
  },
  {
    "name": "Proxy, internal 'deleteProperty' calls",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "Array.prototype.copyWithin",
        "browsers": {
          "chrome": "49",
          "firefox": "40",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.copyWithin -> DeletePropertyOrThrow -> [[Delete]]\nvar del = [];\nvar p = new Proxy([0,0,0,,,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});\np.copyWithin(0,3);\nreturn del + '' === \"0,1,2\";"
      },
      {
        "name": "Array.prototype.pop",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.pop -> DeletePropertyOrThrow -> [[Delete]]\nvar del = [];\nvar p = new Proxy([0,0,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});\np.pop();\nreturn del + '' === \"2\";"
      },
      {
        "name": "Array.prototype.reverse",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.reverse -> DeletePropertyOrThrow -> [[Delete]]\nvar del = [];\nvar p = new Proxy([0,,2,,4,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});\np.reverse();\nreturn del + '' === \"0,4,2\";"
      },
      {
        "name": "Array.prototype.shift",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.shift -> DeletePropertyOrThrow -> [[Delete]]\nvar del = [];\nvar p = new Proxy([0,,0,,0,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});\np.shift();\nreturn del + '' === \"0,2,5\";"
      },
      {
        "name": "Array.prototype.splice",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.splice -> DeletePropertyOrThrow -> [[Delete]]\nvar del = [];\nvar p = new Proxy([0,0,0,0,,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});\np.splice(2,2,0);\nreturn del + '' === \"3,5\";"
      },
      {
        "name": "Array.prototype.unshift",
        "browsers": {
          "chrome": "49",
          "firefox": "18",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Array.prototype.unshift -> DeletePropertyOrThrow -> [[Delete]]\nvar del = [];\nvar p = new Proxy([0,0,,0,,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});\np.unshift(0);\nreturn del + '' === \"5,3\";"
      }
    ]
  },
  {
    "name": "Proxy, internal 'getOwnPropertyDescriptor' calls",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "[[Set]]",
        "browsers": {
          "chrome": "49",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "// [[Set]] -> [[GetOwnProperty]]\nvar gopd = [];\nvar p = new Proxy({},\n  { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});\np.foo = 1; p.bar = 1;\nreturn gopd + '' === \"foo,bar\";"
      },
      {
        "name": "Object.assign",
        "browsers": {
          "chrome": "49",
          "firefox": "34",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Object.assign -> [[GetOwnProperty]]\nvar gopd = [];\nvar p = new Proxy({foo:1, bar:2},\n  { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});\nObject.assign({}, p);\nreturn gopd + '' === \"foo,bar\";"
      },
      {
        "name": "Object.prototype.hasOwnProperty",
        "browsers": {
          "chrome": "49",
          "firefox": "33",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Object.prototype.hasOwnProperty -> HasOwnProperty -> [[GetOwnProperty]]\nvar gopd = [];\nvar p = new Proxy({foo:1, bar:2},\n  { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});\np.hasOwnProperty('garply');\nreturn gopd + '' === \"garply\";"
      },
      {
        "name": "Function.prototype.bind",
        "browsers": {
          "chrome": "49",
          "firefox": "38",
          "safari": "10",
          "edge": "12"
        },
        "code": "// Function.prototype.bind -> HasOwnProperty -> [[GetOwnProperty]]\nvar gopd = [];\nvar p = new Proxy(Function(),\n  { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});\np.bind();\nreturn gopd + '' === \"length\";"
      }
    ]
  },
  {
    "name": "Proxy, internal 'ownKeys' calls",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots",
    "tests": [
      {
        "name": "SetIntegrityLevel",
        "browsers": {
          "chrome": "49",
          "firefox": "33",
          "safari": "10",
          "edge": "12"
        },
        "code": "// SetIntegrityLevel -> [[OwnPropertyKeys]]\nvar ownKeysCalled = 0;\nvar p = new Proxy({}, { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});\nObject.freeze(p);\nreturn ownKeysCalled === 1;"
      },
      {
        "name": "TestIntegrityLevel",
        "browsers": {
          "chrome": "49",
          "firefox": "33",
          "safari": "10",
          "edge": "12"
        },
        "code": "// TestIntegrityLevel -> [[OwnPropertyKeys]]\nvar ownKeysCalled = 0;\nvar p = new Proxy(Object.preventExtensions({}), { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});\nObject.isFrozen(p);\nreturn ownKeysCalled === 1;"
      },
      {
        "name": "SerializeJSONObject",
        "browsers": {
          "chrome": "49",
          "firefox": "33",
          "safari": "10",
          "edge": "13"
        },
        "code": "// SerializeJSONObject -> EnumerableOwnNames -> [[OwnPropertyKeys]]\nvar ownKeysCalled = 0;\nvar p = new Proxy({}, { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});\nJSON.stringify({a:p,b:p});\nreturn ownKeysCalled === 2;"
      }
    ]
  },
  {
    "name": "Object static methods accept primitives",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor",
    "tests": [
      {
        "name": "Object.getPrototypeOf",
        "browsers": {
          "chrome": "44",
          "firefox": "3.5",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.getPrototypeOf('a').constructor === String;"
      },
      {
        "name": "Object.getOwnPropertyDescriptor",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.getOwnPropertyDescriptor('a', 'foo') === undefined;"
      },
      {
        "name": "Object.getOwnPropertyNames",
        "browsers": {
          "chrome": "40",
          "firefox": "33",
          "safari": "9",
          "edge": "12"
        },
        "code": "var s = Object.getOwnPropertyNames('a');\nreturn s.length === 2 &&\n  ((s[0] === 'length' && s[1] === '0') || (s[0] === '0' && s[1] === 'length'));"
      },
      {
        "name": "Object.seal",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.seal('a') === 'a';"
      },
      {
        "name": "Object.freeze",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.freeze('a') === 'a';"
      },
      {
        "name": "Object.preventExtensions",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.preventExtensions('a') === 'a';"
      },
      {
        "name": "Object.isSealed",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.isSealed('a') === true;"
      },
      {
        "name": "Object.isFrozen",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.isFrozen('a') === true;"
      },
      {
        "name": "Object.isExtensible",
        "browsers": {
          "chrome": "44",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "return Object.isExtensible('a') === false;"
      },
      {
        "name": "Object.keys",
        "browsers": {
          "chrome": "40",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "var s = Object.keys('a');\nreturn s.length === 1 && s[0] === '0';"
      }
    ]
  },
  {
    "name": "own property order",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys",
    "tests": [
      {
        "name": "Object.keys",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "var obj = {\n  // Non-negative integer names appear first in value order\n  2: true,\n  0: true,\n  1: true,\n  // Other string names appear in source order\n  ' ': true,\n  // Non-negative integers are sorted above other names\n  9: true,\n  D: true,\n  B: true,\n  // Negative integers are treated as other names\n  '-1': true,\n};\n// Other string names are added in order of creation\nobj.A = true;\n// Non-negative integer names, conversely, ignore order of creation\nobj[3] = true;\n// Having a total of 20+ properties doesn't affect property order\n\"EFGHIJKLMNOPQRSTUVWXYZ\".split('').forEach(function(key){\n  obj[key] = true;\n});\n// Object.defineProperty doesn't affect the above rules\nObject.defineProperty(obj, 'C', { value: true, enumerable: true });\nObject.defineProperty(obj, '4', { value: true, enumerable: true });\n// Deleting and reinserting a property doesn't preserve its position\ndelete obj[2];\nobj[2] = true;\n\nvar forInOrder = '';\nfor(var key in obj)forInOrder += key;\n\nreturn Object.keys(obj).join('') === forInOrder;"
      },
      {
        "name": "Object.getOwnPropertyNames",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "7.1",
          "edge": null
        },
        "code": "var obj = {\n  2: true,\n  0: true,\n  1: true,\n  ' ': true,\n  9: true,\n  D: true,\n  B: true,\n  '-1': true\n};\nobj.A = true;\nobj[3] = true;\n\"EFGHIJKLMNOPQRSTUVWXYZ\".split('').forEach(function(key){\n  obj[key] = true;\n});\nObject.defineProperty(obj, 'C', { value: true, enumerable: true });\nObject.defineProperty(obj, '4', { value: true, enumerable: true });\ndelete obj[2];\nobj[2] = true;\n\nreturn Object.getOwnPropertyNames(obj).join('') === \"012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC\";"
      },
      {
        "name": "Object.assign",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "9",
          "edge": null
        },
        "code": "var result = '';\nvar target = {};\n\n\"012349 DBACEFGHIJKLMNOPQRST\".split('').concat(-1).forEach(function(key){\n  Object.defineProperty(target, key, {\n    set: function(){\n      result += key;\n    }\n  })\n});\n\nvar obj = {2: 2, 0: 0, 1: 1, ' ': ' ', 9: 9, D: 'D', B: 'B', '-1': '-1'};\nObject.defineProperty(obj, 'A', {value: 'A',  enumerable: true});\nObject.defineProperty(obj, '3', {value: '3',  enumerable: true});\nObject.defineProperty(obj, 'C', {value: 'C',  enumerable: true});\nObject.defineProperty(obj, '4', {value: '4',  enumerable: true});\ndelete obj[2];\nobj[2] = true;\n\n\"EFGHIJKLMNOPQRST\".split('').forEach(function(key){\n  obj[key] = key;\n});\n\nObject.assign(target, obj);\n\nreturn result === \"012349 DB-1ACEFGHIJKLMNOPQRST\";"
      },
      {
        "name": "JSON.stringify",
        "browsers": {
          "chrome": "19",
          "firefox": "44",
          "safari": "7",
          "edge": null
        },
        "code": "var obj = {\n  2: true,\n  0: true,\n  1: true,\n  ' ': true,\n  9: true,\n  D: true,\n  B: true,\n  '-1': true\n};\nobj.A = true;\nobj[3] = true;\n\"EFGHIJKLMNOPQRSTUVWXYZ\".split('').forEach(function(key){\n  obj[key] = true;\n});\nObject.defineProperty(obj, 'C', { value: true, enumerable: true });\nObject.defineProperty(obj, '4', { value: true, enumerable: true });\ndelete obj[2];\nobj[2] = true;\n\nreturn JSON.stringify(obj) ===\n  '{\"0\":true,\"1\":true,\"2\":true,\"3\":true,\"4\":true,\"9\":true,\" \":true,\"D\":true,\"B\":true,\"-1\":true,\"A\":true,\"E\":true,\"F\":true,\"G\":true,\"H\":true,\"I\":true,\"J\":true,\"K\":true,\"L\":true,\"M\":true,\"N\":true,\"O\":true,\"P\":true,\"Q\":true,\"R\":true,\"S\":true,\"T\":true,\"U\":true,\"V\":true,\"W\":true,\"X\":true,\"Y\":true,\"Z\":true,\"C\":true}';"
      },
      {
        "name": "JSON.parse",
        "browsers": {
          "chrome": "19",
          "firefox": "3.5",
          "safari": "51",
          "edge": null
        },
        "code": "var result = '';\nJSON.parse(\n  '{\"0\":true,\"1\":true,\"2\":true,\"3\":true,\"4\":true,\"9\":true,\" \":true,\"D\":true,\"B\":true,\"-1\":true,\"E\":true,\"F\":true,\"G\":true,\"H\":true,\"I\":true,\"J\":true,\"K\":true,\"L\":true,\"A\":true,\"C\":true}',\n  function reviver(k,v) {\n    result += k;\n    return v;\n  }\n);\nreturn result === \"012349 DB-1EFGHIJKLAC\";"
      },
      {
        "name": "Reflect.ownKeys, string key order",
        "browsers": {
          "chrome": "49",
          "firefox": "44",
          "safari": "10",
          "edge": "12"
        },
        "code": "var obj = {\n  2: true,\n  0: true,\n  1: true,\n  ' ': true,\n  9: true,\n  D: true,\n  B: true,\n  '-1': true\n};\nobj.A = true;\nobj[3] = true;\n\"EFGHIJKLMNOPQRSTUVWXYZ\".split('').forEach(function(key){\n  obj[key] = true;\n});\nObject.defineProperty(obj, 'C', { value: true, enumerable: true });\nObject.defineProperty(obj, '4', { value: true, enumerable: true });\ndelete obj[2];\nobj[2] = true;\n\nreturn Reflect.ownKeys(obj).join('') === \"012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC\";"
      },
      {
        "name": "Reflect.ownKeys, symbol key order",
        "browsers": {
          "chrome": "49",
          "firefox": "42",
          "safari": "10",
          "edge": "12"
        },
        "code": "var sym1 = Symbol(), sym2 = Symbol(), sym3 = Symbol();\nvar obj = {\n  1: true,\n  A: true,\n};\nobj.B = true;\nobj[sym1] = true;\nobj[2] = true;\nobj[sym2] = true;\nObject.defineProperty(obj, 'C', { value: true, enumerable: true });\nObject.defineProperty(obj, sym3,{ value: true, enumerable: true });\nObject.defineProperty(obj, 'D', { value: true, enumerable: true });\n\nvar result = Reflect.ownKeys(obj);\nvar l = result.length;\nreturn result[l-3] === sym1 && result[l-2] === sym2 && result[l-1] === sym3;"
      }
    ]
  },
  {
    "name": "miscellaneous",
    "category": "misc",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions",
    "tests": [
      {
        "name": "no escaped reserved words as identifiers",
        "browsers": {
          "chrome": "49",
          "firefox": "10",
          "safari": "9",
          "edge": null
        },
        "code": "var \\u0061;\ntry {\n  eval('var v\\\\u0061r');\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "duplicate property names in strict mode",
        "browsers": {
          "chrome": "42",
          "firefox": "34",
          "safari": "9",
          "edge": "12"
        },
        "code": "'use strict';\nreturn this === undefined && ({ a:1, a:1 }).a === 1;"
      },
      {
        "name": "no semicolon needed after do-while",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "do {} while (false) return true;"
      },
      {
        "name": "no assignments allowed in for-in head in strict mode",
        "browsers": {
          "chrome": "45",
          "firefox": null,
          "safari": "9",
          "edge": null
        },
        "code": "'use strict';\ntry {\n  eval('for (var i = 0 in {}) {}');\n}\ncatch(e) {\n  return true;\n}"
      },
      {
        "name": "accessors aren't constructors",
        "browsers": {
          "chrome": "42",
          "firefox": "41",
          "safari": "10",
          "edge": "12"
        },
        "code": "var f = (Object.getOwnPropertyDescriptor({get a(){}}, 'a')).get;\ntry {\n  new f;\n} catch(e) {\n  return true;\n}"
      },
      {
        "name": "Invalid Date",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return new Date(NaN) + \"\" === \"Invalid Date\";"
      },
      {
        "name": "RegExp constructor can alter flags",
        "browsers": {
          "chrome": "49",
          "firefox": "39",
          "safari": "10",
          "edge": "12"
        },
        "code": "return new RegExp(/./im, \"g\").global === true;"
      },
      {
        "name": "RegExp.prototype.toString generic and uses \"flags\" property",
        "browsers": {
          "chrome": "50",
          "firefox": "39",
          "safari": "10",
          "edge": null
        },
        "code": "return RegExp.prototype.toString.call({source: 'foo', flags: 'bar'}) === '/foo/bar';"
      },
      {
        "name": "built-in prototypes are not instances",
        "browsers": {
          "chrome": "50",
          "firefox": null,
          "safari": "10",
          "edge": null
        },
        "code": "try {\n  RegExp.prototype.exec(); return false;\n} catch(e) {}\ntry {\n  Date.prototype.valueOf(); return false;\n} catch(e) {}\n\nif (![Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].every(function (E) {\n    return Object.prototype.toString.call(E.prototype) === '[object Object]';\n})) {\n  return false;\n}\n\nreturn true;"
      },
      {
        "name": "function 'length' is configurable",
        "browsers": {
          "chrome": "43",
          "firefox": "37",
          "safari": "10",
          "edge": "12"
        },
        "code": "var fn = function(a, b) {};\n\nvar desc = Object.getOwnPropertyDescriptor(fn, \"length\");\nif (desc.configurable) {\n  Object.defineProperty(fn, \"length\", { value: 1 });\n  return fn.length === 1;\n}\n\nreturn false;"
      }
    ]
  },
  {
    "name": "non-strict function semantics",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-labelled-function-declarations",
    "tests": [
      {
        "name": "hoisted block-level function declaration",
        "browsers": {
          "chrome": "49",
          "firefox": "3.5",
          "safari": "10",
          "edge": null
        },
        "code": "// Note: only available outside of strict mode.\nif (!this) return false;\nvar passed = f() === 1;\nfunction f() { return 1; }\n\npassed &= typeof g === 'undefined';\n{ function g() { return 1; } }\npassed &= g() === 1;\n\npassed &= h() === 2;\n{ function h() { return 1; } }\nfunction h() { return 2; }\npassed &= h() === 1;\n\nreturn passed;"
      },
      {
        "name": "labeled function statements",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "// Note: only available outside of strict mode.\nif (!this) return false;\n\nlabel: function foo() { return 2; }\nreturn foo() === 2;"
      },
      {
        "name": "function statements in if-statement clauses",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "// Note: only available outside of strict mode.\nif (!this) return false;\n\nif(true) function foo() { return 2; }\nif(false) {} else function bar() { return 3; }\nif(true) function baz() { return 4; } else {}\nif(false) function qux() { return 5; } else function qux() { return 6; }\nreturn foo() === 2 && bar() === 3 && baz() === 4 && qux() === 6;"
      }
    ]
  },
  {
    "name": "__proto__ in object literals",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-__proto__-property-names-in-object-initializers",
    "tests": [
      {
        "name": "basic support",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return { __proto__ : [] } instanceof Array\n  && !({ __proto__ : null } instanceof Object);"
      },
      {
        "name": "multiple __proto__ is an error",
        "browsers": {
          "chrome": "42",
          "firefox": "35",
          "safari": "9",
          "edge": "12"
        },
        "code": "try {\n  eval(\"({ __proto__ : [], __proto__: {} })\");\n}\ncatch(e) {\n  return true;\n}"
      },
      {
        "name": "not a computed property",
        "browsers": {
          "chrome": "44",
          "firefox": "34",
          "safari": "7.1",
          "edge": "12"
        },
        "code": "if (!({ __proto__ : [] } instanceof Array)) {\n  return false;\n}\nvar a = \"__proto__\";\nreturn !({ [a] : [] } instanceof Array);"
      },
      {
        "name": "not a shorthand property",
        "browsers": {
          "chrome": "42",
          "firefox": "35",
          "safari": "9",
          "edge": "13"
        },
        "code": "if (!({ __proto__ : [] } instanceof Array)) {\n  return false;\n}\nvar __proto__ = [];\nreturn !({ __proto__ } instanceof Array);"
      },
      {
        "name": "not a shorthand method",
        "browsers": {
          "chrome": "42",
          "firefox": "35",
          "safari": "9",
          "edge": "13"
        },
        "code": "if (!({ __proto__ : [] } instanceof Array)) {\n  return false;\n}\nreturn !({ __proto__(){} } instanceof Function);"
      }
    ]
  },
  {
    "name": "Object.prototype.__proto__",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.__proto__",
    "tests": [
      {
        "name": "get prototype",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "var A = function(){};\nreturn (new A()).__proto__ === A.prototype;"
      },
      {
        "name": "set prototype",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "var o = {};\no.__proto__ = Array.prototype;\nreturn o instanceof Array;"
      },
      {
        "name": "absent from Object.create(null)",
        "browsers": {
          "chrome": "30",
          "firefox": "4",
          "safari": "6",
          "edge": null
        },
        "code": "var o = Object.create(null), p = {};\no.__proto__ = p;\nreturn Object.getPrototypeOf(o) !== p;"
      },
      {
        "name": "present in hasOwnProperty()",
        "browsers": {
          "chrome": "30",
          "firefox": "4",
          "safari": "6",
          "edge": null
        },
        "code": "return Object.prototype.hasOwnProperty('__proto__');"
      },
      {
        "name": "correct property descriptor",
        "browsers": {
          "chrome": "30",
          "firefox": "17",
          "safari": "6",
          "edge": null
        },
        "code": "var desc = Object.getOwnPropertyDescriptor(Object.prototype,\"__proto__\");\nvar A = function(){};\n\nreturn (desc\n  && \"get\" in desc\n  && \"set\" in desc\n  && desc.configurable\n  && !desc.enumerable);"
      },
      {
        "name": "present in Object.getOwnPropertyNames()",
        "browsers": {
          "chrome": "30",
          "firefox": "7",
          "safari": "6",
          "edge": null
        },
        "code": "return Object.getOwnPropertyNames(Object.prototype).indexOf('__proto__') > -1;"
      }
    ]
  },
  {
    "name": "String.prototype HTML methods",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.anchor",
    "tests": [
      {
        "name": "existence",
        "browsers": {
          "chrome": "19",
          "firefox": "3",
          "safari": "51",
          "edge": null
        },
        "code": "var i, names = [\"anchor\", \"big\", \"bold\", \"fixed\", \"fontcolor\", \"fontsize\",\n  \"italics\", \"link\", \"small\", \"strike\", \"sub\", \"sup\"];\nfor (i = 0; i < names.length; i++) {\n  if (typeof String.prototype[names[i]] !== 'function') {\n    return false;\n  }\n}\nreturn true;"
      },
      {
        "name": "tags' names are lowercase",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": "12"
        },
        "code": "var i, names = [\"anchor\", \"big\", \"bold\", \"fixed\", \"fontcolor\", \"fontsize\",\n  \"italics\", \"link\", \"small\", \"strike\", \"sub\", \"sup\"];\nfor (i = 0; i < names.length; i++) {\n  if (\"\"[names[i]]().toLowerCase() !== \"\"[names[i]]()) {\n    return false;\n  }\n}\nreturn true;"
      },
      {
        "name": "quotes in arguments are escaped",
        "browsers": {
          "chrome": "19",
          "firefox": "17",
          "safari": "6",
          "edge": "12"
        },
        "code": "var i, names = [\"anchor\", \"fontcolor\", \"fontsize\", \"link\"];\nfor (i = 0; i < names.length; i++) {\n  if (\"\"[names[i]]('\"') !== \"\"[names[i]]('&' + 'quot;')) {\n    return false;\n  }\n}\nreturn true;"
      }
    ]
  },
  {
    "name": "RegExp.prototype.compile",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.compile",
    "tests": [
      {
        "name": "basic functionality",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "if (typeof RegExp.prototype.compile !== 'function')\n  return false\nvar rx = /a/;\nrx.compile('b');\nreturn rx.test('b');"
      },
      {
        "name": "returns this",
        "browsers": {
          "chrome": null,
          "firefox": "2",
          "safari": "10",
          "edge": null
        },
        "code": "var rx = /a/;\nreturn rx.compile('b') === rx;"
      }
    ]
  },
  {
    "name": "RegExp syntax extensions",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns",
    "tests": [
      {
        "name": "hyphens in character sets",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return /[\\w-_]/.exec(\"-\")[0] === \"-\";"
      },
      {
        "name": "invalid character escapes",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return /\\z/.exec(\"\\\\z\")[0] === \"z\"\n  && /[\\z]/.exec(\"[\\\\z]\")[0] === \"z\";"
      },
      {
        "name": "invalid control-character escapes",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return /\\c2/.exec(\"\\\\c2\")[0] === \"\\\\c2\";"
      },
      {
        "name": "invalid Unicode escapes",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "return /\\u1/.exec(\"u1\")[0] === \"u1\"\n  && /[\\u1]/.exec(\"u\")[0] === \"u\";"
      },
      {
        "name": "invalid hexadecimal escapes",
        "browsers": {
          "chrome": "19",
          "firefox": "4",
          "safari": "51",
          "edge": null
        },
        "code": "return /\\x1/.exec(\"x1\")[0] === \"x1\"\n  && /[\\x1]/.exec(\"x\")[0] === \"x\";"
      },
      {
        "name": "incomplete patterns and quantifiers",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return /x{1/.exec(\"x{1\")[0] === \"x{1\"\n  && /x]1/.exec(\"x]1\")[0] === \"x]1\";"
      },
      {
        "name": "octal escape sequences",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return /\\041/.exec(\"!\")[0] === \"!\"\n  && /[\\041]/.exec(\"!\")[0] === \"!\";"
      },
      {
        "name": "invalid backreferences become octal escapes",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": null
        },
        "code": "return /\\41/.exec(\"!\")[0] === \"!\"\n  && /[\\41]/.exec(\"!\")[0] === \"!\";"
      }
    ]
  },
  {
    "name": "HTML-style comments",
    "category": "annex b",
    "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments",
    "tests": [
      {
        "name": "HTML-style comments",
        "category": "annex b",
        "significance": "tiny",
        "link": "http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments",
        "browsers": {
          "chrome": "19",
          "firefox": "2",
          "safari": "51",
          "edge": "14"
        },
        "code": "--> A comment\n<!-- Another comment\nvar a = 3; <!-- Another comment\nreturn a === 3;"
      }
    ]
  }
];
window.targetBrowsers = ["chrome","firefox","safari","edge"];
window.browserVersions = {"chrome":["19","21","30","31","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55"],"firefox":["2","3","3.5","3.6","4","6","7","10","13","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52"],"safari":["51","6","7","7.1","9","10"],"edge":["12","13","14"]};