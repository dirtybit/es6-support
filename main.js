(function (global) {
    const ES6_FEATURES = global.ES6_FEATURE_LIST;
    const targetBrowsers = global.targetBrowsers;
    const browserVersions = global.browserVersions;

    var targetVersions = {};

    var featureTable = document.getElementById("feature-table"),
        popupOverlay = document.getElementById("version-popup-overlay"),
        versionPopup = document.getElementById("version-popup");

    function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    function isSupported(browser, version) {
        if (!version) {
            return false;
        }

        return !targetVersions[browser] || (parseInt(targetVersions[browser]) >= parseInt(version));
    }

    function createTestEntry(featureTest) {
        var testRow = document.createElement("tr"),
            testName = document.createElement("td"),
            sampleCode = document.createElement("code");

        sampleCode.textContent = featureTest.code;
        testName.textContent = featureTest.name;

        testName.appendChild(sampleCode);
        testRow.appendChild(testName);

        targetBrowsers.forEach(function (browser) {
            var cell = document.createElement("td"),
                supportedVersionElement = document.createElement("span");

            if (isSupported(browser, featureTest.browsers[browser])) {
                cell.classList.add("supports");
                supportedVersionElement.innerHTML = featureTest.browsers[browser];
            }

            cell.appendChild(supportedVersionElement);
            testRow.appendChild(cell);
        });

        return testRow;
    }

    function createFeatureSummary(feature) {
        var row = document.createElement("tr"),
            featureName = document.createElement("td"),
            specLink = document.createElement("a"),
            numTests = feature.tests.length;

        specLink.href = feature.link;
        specLink.textContent = "[*]";

        featureName.textContent = feature.name + " ";
        featureName.appendChild(specLink);

        row.appendChild(featureName);

        targetBrowsers.forEach(function (browser) {
            var numSupported,
                cell = document.createElement("td");


            numSupported = feature.tests.reduce(function (prev, featureTest) {
                if (isSupported(browser, featureTest.browsers[browser])) {
                    return prev + 1;
                }

                return prev;
            }, 0);

            cell.textContent = `${numSupported}/${numTests}`;

            if (numSupported === numTests) {
                cell.classList.add("full-support");
            } else if (numSupported === 0) {
                cell.classList.add("no-support");
            } else {
                cell.classList.add("partial-support");
            }

            row.appendChild(cell);
        });

        return row;
    }

    function createFeatureEntry(feature) {
        var featureGroup = document.createElement("tbody");

        feature.tests.forEach(function (featureTest) {
            var testEntry = createTestEntry(featureTest);

            featureGroup.appendChild(testEntry);
        });

        return featureGroup;
    }

    function populateHeader() {
        function createHeader(title, dataset) {
            var cellHeader = document.createElement("th");

            cellHeader.textContent = capitalize(title);

            for (let name in dataset) {
                cellHeader.dataset[name] = dataset[name];
            }

            return cellHeader;
        }

        var header = document.createElement("thead"),
            headerRow = document.createElement("tr");

        header.appendChild(headerRow);
        headerRow.appendChild(createHeader("Feature"));


        targetBrowsers.forEach(function (targetBrowser) {
            let title = targetBrowser,
                selectedVersion = targetVersions[targetBrowser];

            if (selectedVersion) {
                title += ` ${selectedVersion}`;
            }

            headerRow.appendChild(createHeader(title, { browser: targetBrowser }));
        });

        featureTable.appendChild(header);
    }

    function populateFeatureTable() {
        featureTable.innerHTML = "";

        populateHeader();

        ES6_FEATURES.forEach(function (feature, index) {
            var summary = createFeatureSummary(feature),
                featureGroup = createFeatureEntry(feature);

            summary.dataset.index = index;
            featureGroup.dataset.groupIndex = index;

            featureTable.appendChild(summary);
            featureTable.appendChild(featureGroup);
        });

        featureTable.querySelector("thead").addEventListener("click", function (ev) {
            var elem = ev.target.closest("th");

            if (!elem.dataset.browser) {
                return;
            }

            showSelectBrowserVersionPopup(elem.dataset.browser);
        });
    }

    featureTable.addEventListener("click", function (ev) {
        var row = ev.target.closest("tr");

        if (!row || !("index" in row.dataset)) {
            return;
        }

        var targetGroup = featureTable.querySelector(`tbody[data-group-index="${row.dataset.index}"`);

        targetGroup.classList.toggle("expanded");
    });

    function showSelectBrowserVersionPopup(browser) {
        var options = document.querySelector("#version-popup > div");

        options.innerHTML = "";
        document.querySelector("#version-popup h2 > span").textContent = capitalize(browser);
        versionPopup.dataset.browser = browser;

        browserVersions[browser].forEach((version) => {
            var label = document.createElement("label"),
                input = document.createElement("input");


            label.setAttribute("for", `version_${version}`);
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", "version");
            input.setAttribute("id", `version_${version}`);
            input.setAttribute("value", version);

            if (targetVersions[browser] === version) {
                input.setAttribute("checked", "checked");
            }

            label.appendChild(input);
            label.innerHTML += capitalize(version);

            options.appendChild(label);

            document.getElementById(`version_${version}`).addEventListener("change", function () {
                delete targetVersions[browser];

                if (this.checked) {
                    targetVersions[browser] = this.value;
                }

                populateFeatureTable();

                popupOverlay.classList.add("hidden");
            });
        });

        popupOverlay.classList.remove("hidden");
    }

    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.add("hidden");
    });

    populateFeatureTable();

})(window);