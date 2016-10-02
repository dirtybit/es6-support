const fs = require("fs");
const path = require("path");

const es6Data = require("../data/data-es6");

const targetBrowsers = [
    "chrome",
    "firefox",
    "safari",
    "edge"
];

const ignoredBrowsers = [
    "safaritp"
];

const SRC_PATH = path.join(__dirname, "../");

function isTargetBrowser(bInfo) {
    var b = es6Data.browsers[bInfo];

    return b && targetBrowsers.some((tb) => bInfo.startsWith(tb)) && ignoredBrowsers.indexOf(bInfo) === -1;
}

function getFunctionCode(fn) {
    var fnCode = fn.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1],
        indent = /(?:^|\n)([\t ]+)[^\n]+/.exec(fnCode);

    if (indent) {
        fnCode = fnCode.replace(new RegExp("\n" + indent[1], "g"), "\n");
    }

    return fnCode.trim();
}

function getBrowserVersion(bInfo) {
    if (!isTargetBrowser(bInfo)) {
        return null;
    }

    if (bInfo.startsWith("safari")) {
        var versionText = bInfo.match(/safari(.*)/)[1];

        if (versionText === "71_8") {
            return "7.1";
        } else {
            return versionText;
        }
    } else if (bInfo.startsWith("firefox")) {
        var versionText = bInfo.match(/firefox(.*)/)[1];

        return versionText.replace("_", ".");
    } else {
        var m = bInfo.match(/[a-z]+([0-9]*)/i)[1];

        if (m) {
            return m;
        } else if (bInfo.startsWith("chrome")) {
            return "19";
        } else {
            return null;
        }
    }
}

function findInResults(browser, results) {
    for (var browserInfo in results) {
        let version = getBrowserVersion(browserInfo);
        if (browserInfo.startsWith(browser) && results[browserInfo] === true && version) {
            return version;
        }
    }

    return null;
}

function getFeatureTests(feature) {
    var tests = feature.subtests || [feature];

    return tests.map(function (test) {
        var results = test.res;
        var codeFn = test.exec;
        var browsers = {};

        delete test.res;
        delete test.exec;

        targetBrowsers.forEach(function (browser) {
            browsers[browser] = findInResults(browser, results);
        });

        test.browsers = browsers;
        test.code = getFunctionCode(codeFn);

        return test;
    })
}

const features = es6Data.tests.map(function (feature) {
    return {
        name: feature.name,
        category: feature.category,
        link: feature.link,
        tests: getFeatureTests(feature)
    };
});

const browserVersions = {};

targetBrowsers.forEach((b) => browserVersions[b] = new Set());

for (let browser in es6Data.browsers) {
    var targetBrowser = targetBrowsers.find((tb) => browser.startsWith(tb)),
        version = getBrowserVersion(browser);

    if (targetBrowser && version) {
        browserVersions[targetBrowser].add(version);
    }
}

for (let browser in browserVersions) {
    browserVersions[browser] = Array.from(browserVersions[browser]);
}

var featureScript = `window.ES6_FEATURE_LIST = ${JSON.stringify(features, null, "  ")};
window.targetBrowsers = ${JSON.stringify(targetBrowsers)};
window.browserVersions = ${JSON.stringify(browserVersions)};`;

fs.writeFile(path.join(SRC_PATH, "es6-features.js"), featureScript, "utf8");
