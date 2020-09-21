"use strict";

function fetchZones() {
  return fetch("https://yolki.gooditworks.now.sh/api/ecwid/zones")
    .then(response => response.json())
    .catch(console.error);
}

function nearestWorkDay(date) {
  var newDate = new Date(date.getTime());

  if (date.getDay() === 0) {
    newDate.setDate(date.getDate() + 1);
  }

  if (date.getDay() === 6) {
    newDate.setDate(date.getDate() + 2);
  }

  return newDate;
}

function isShippingDayDisabled(date) {
  if (date.getDate() === 31) {
    return true;
  }

  // for Moscow region shipping enabled always
  if (this._region === "77" || this._region === "50") {
    return false;
  }

  // for other regions shipping in weekend disabled
  return date.getDay() === 0 || date.getDay() === 6;
}

function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}

var CstmzCities = function a(zones) {
  var b = this;
  _classCallCheck(this, a),
    (this._zones = []),
    (this._cities = []),
    (this._region = ""),
    (this._citySelected = null),
    (this._pickupSelected = !1),
    (this._getAllZones = function() {
      // var a = Ecwid.getStoreConfiguration();
      // b._zones = a.shippingAndTaxSettings.zones;
      b._zones = zones;
    }),
    (this._saveCurrentRegion = function() {
      var a = document.querySelector(
        ".ec-form__cell--state .form-control__select",
      );
      null !== a &&
        ((b._region = a.value),
        a.addEventListener("change", function(a) {
          "" === a.target.value
            ? b._dropCityField()
            : ((b._region = a.target.value), b._getCurrentCities());
        }),
        "" === a.value ? b._dropCityField() : b._getCurrentCities());
    }),
    (this._dropCityField = function() {
      var a = document.querySelector(".ec-form__cell--cstmz_city select");
      null !== a && ((a.value = ""), a.dispatchEvent(new Event("change")));
    }),
    (this._hideOrShowCityField = function(a) {
      var b = document.querySelector(".ec-form__cell--cstmz_city");
      b.style.display = a;
    }),
    (this._getCurrentCities = function() {
      var deliveryIntervalSelect = document.querySelector(
        ".ec-form__row--cstmz_delivery_interval",
      );
      if (b._region === "50" || b._region === "77") {
        deliveryIntervalSelect.style.display = "block";
      } else {
        deliveryIntervalSelect.style.display = "none";
      }

      (b._cities = []),
        b._zones.map(function(a) {
          var c = a.stateOrProvinceCodes;
          c.map(function(c) {
            c === "RU-" + b._region && b._cities.push(a.name);
          });
        }),
        b._setExtraField();
    }),
    (this._setExtraField = function() {
      (ec.order = ec.order || {}),
        (ec.order.extraFields = ec.order.extraFields || {}),
        (ec.order.extraFields.cstmz_city = {
          title: "\u0413\u043E\u0440\u043E\u0434",
          type: "select",
          selectOptions: b._cities,
          required: !0,
          checkoutDisplaySection: "shipping_address",
        }),
        Ecwid.refreshConfig(),
        b._dropCityField(),
        b._fillInDefaultField();
      var a = 5,
        c = setTimeout(function() {
          var d = document.querySelector(".ec-form__cell--cstmz_city select");
          null !== d &&
            (b._hideOrShowCityField("block"),
            b._fillInDefaultField(),
            d.removeEventListener("change", b._fillInDefaultField),
            d.addEventListener("change", b._fillInDefaultField),
            clearInterval(c)),
            --a,
            0 > a && clearInterval(c);
        }, 1e3);
    }),
    (this._writeDateTimeToCompany = function() {
      var a = document.querySelector(
          ".ec-form__cell--cstmz_delivery_interval select",
        ),
        c = document.querySelector(".ec-form__cell--cstmz_delivery_date input"),
        d = document.querySelector(".ec-form__cell--company-name input");
      if (null !== a && null !== c && null !== d) {
        (d.value = c.value + " " + a.value),
          d.dispatchEvent(new Event("input")),
          a.removeEventListener("change", b._writeDateTimeToCompany),
          a.addEventListener("change", b._writeDateTimeToCompany);
        try {
          "31.12.2018" === c.value &&
          "\u0441 19:00 \u0434\u043E 24:00" === a.value
            ? b._disableContinue()
            : b._enableContinue();
        } catch (a) {
          b._enableContinue();
        }
      }
    }),
    (this._disableContinue = function() {
      var a = document.querySelector(
          ".ec-cart-step--address.ec-cart-step--current",
        ),
        b = document.querySelector(
          ".ec-cart-step--address.ec-cart-step--current .ec-form__row--continue",
        ),
        c = document.querySelector(".cstmz-message_error");
      null !== c && c.parentNode.removeChild(c);
      var d = document.createElement("div");
      (d.className = "cstmz-message_error"),
        (d.innerHTML =
          "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0432 \u044D\u0442\u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0440\u0430\u043D\u044C\u0448\u0435"),
        a.appendChild(d),
        (b.style.display = "none");
    }),
    (this._enableContinue = function() {
      var a = document.querySelector(
          ".ec-cart-step--address.ec-cart-step--current",
        ),
        b = document.querySelector(
          ".ec-cart-step--address.ec-cart-step--current .ec-form__row--continue",
        ),
        c = document.querySelector(".cstmz-message_error");
      null !== c && c.parentNode.removeChild(c), (b.style.display = "flex");
    }),
    (this._fillInDefaultField = function() {
      var a = document.querySelector(".ec-form__cell--cstmz_city select"),
        c = document.querySelector(".ec-form__cell--city input"),
        d = document.querySelector(
          ".ec-form__row--cstmz_delivery_date .form-control",
        );
      if (null !== d && null === d.querySelector(".form-control__loader")) {
        var e = document.createElement("div");
        (e.className = "form-control__loader"), d.appendChild(e);
      }
      null !== a &&
        null !== c &&
        ((b._citySelected = a.value),
        (c.value = a.value),
        c.dispatchEvent(new Event("input")),
        null !== d && d.classList.add("form-control--loading"),
        b._getNumberOfDays(d));
    }),
    (this._getMinDate = function(a) {
      if (!isNaN(b._days)) {
        var c = new Date(
          new Date().getTime() + 1e3 * (60 * (60 * (24 * b._days))),
        );
        if (b._region !== "50" && b._region !== "77") {
          c = nearestWorkDay(c);
        }
        b._setDateExtraField(c);
        var d = c.getDate(),
          e = c.getMonth() + 1,
          f = c.getFullYear();
        10 > e && (e = "0" + e),
          setTimeout(function() {
            null !== a &&
              (a.parentNode.classList.remove("csmtz-disabled"),
              (a.querySelector("input").value = d + "." + e + "." + f),
              a.querySelector("input").dispatchEvent(new Event("input")),
              b._writeDateTimeToCompany());
          }, 500);
      } else
        setTimeout(function() {
          null !== a &&
            ((a.querySelector("input").value = ""),
            a.parentNode.classList.add("csmtz-disabled"),
            a.querySelector("input").dispatchEvent(new Event("input")),
            b._writeDateTimeToCompany());
        }, 500);
    }),
    (this._getNumberOfDays = function(a) {
      var c =
          "https://yolki.gooditworks.now.sh/api/ecwid/transit_time?city=" +
          b._citySelected,
        d = new XMLHttpRequest();
      (d.onreadystatechange = function() {
        200 === d.status &&
          4 === d.readyState &&
          ((this._days = parseInt(d.responseText)),
          this._getMinDate(a),
          null !== a && a.classList.remove("form-control--loading"));
      }.bind(b)),
        d.open("GET", c),
        d.send();
    }),
    (this._setDateExtraField = function(a) {
      (ec.order = ec.order || {}),
        (ec.order.extraFields = ec.order.extraFields || {}),
        (ec.order.extraFields.cstmz_delivery_date = {
          title:
            "\u0414\u0430\u0442\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438",
          type: "text",
          required: !1,
          checkoutDisplaySection: "shipping_address",
        }),
        (ec.order.extraFields.cstmz_delivery_interval = {
          title:
            "\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438",
          type: "select",
          value: "\u0441 9:00 \u0434\u043E 14:00",
          required: !1,
          checkoutDisplaySection: "shipping_address",
          selectOptions: [
            "\u0441 9:00 \u0434\u043E 14:00",
            "\u0441 14:00 \u0434\u043E 19:00",
            "\u0441 19:00 \u0434\u043E 24:00",
          ],
        }),
        Ecwid.refreshConfig(),
        setTimeout(function() {
          flatpickr.localize(flatpickr.l10ns.ru);
          var c = document.querySelector(
            ".ec-form__row--cstmz_delivery_date input",
          );
          null !== c &&
            c.flatpickr({
              defaultDate: a,
              minDate: a,
              dateFormat: "j.m.Y",
              locale: "ru",
              disable: [isShippingDayDisabled.bind(b)],
              onChange: function e(a, d) {
                (c.value = d),
                  c.dispatchEvent(new Event("input")),
                  b._writeDateTimeToCompany();
              },
            });
        }, 1e3);
    }),
    (this._hideMethods = function() {
      return null !== b._citySelected || b._pickupSelected
        ? void (
            !b._pickupSelected &&
            Ecwid.Cart.get(function(a) {
              var c = !1,
                d = a.shippingMethod,
                e = b._citySelected;
              -1 < d.indexOf("\u043A\u0443\u043F\u043E\u043D") && (e = d),
                [].slice
                  .apply(
                    document.querySelectorAll(
                      ".ec-cart-step--delivery .ec-radiogroup__item",
                    ),
                  )
                  .map(function(a) {
                    var b = a
                      .querySelector(".ec-radiogroup__title")
                      .textContent.toLowerCase();
                    -1 < b.indexOf(e.toLowerCase())
                      ? !c && (a.click(), (c = !0))
                      : (a.style.display = "none");
                  });
            })
          )
        : (Ecwid.openPage("checkout/address"), !1);
    }),
    (this._listenToTabs = function() {
      [].slice
        .apply(document.querySelectorAll(".ec-tabs__tab"))
        .map(function(a, c) {
          var d = a.className.indexOf("ec-tabs__tab--active");
          -1 < d &&
            (0 === c ? (b._pickupSelected = !1) : (b._pickupSelected = !0)),
            a.addEventListener("click", function() {
              0 === c
                ? ((b._pickupSelected = !1),
                  setTimeout(b._saveCurrentRegion, 500))
                : (b._pickupSelected = !0);
            });
        });
    }),
    (this._loadAssets = function() {
      var a = document.createElement("script");
      (a.type = "text/javascript"),
        (a.src =
          "https://djqizrxa6f10j.cloudfront.net/apps/customizations/libs/flatpickr/flatpickr.js"),
        document.querySelector("body").appendChild(a);
      var b = document.createElement("link");
      (b.rel = "stylesheet"),
        (b.href =
          "https://djqizrxa6f10j.cloudfront.net/apps/customizations/libs/flatpickr/flatpickr.css"),
        document.querySelector("head").appendChild(b);
    }),
    (this._handlePaymentMethods = function() {
      if (null === b._citySelected && !b._pickupSelected)
        return Ecwid.openPage("checkout/address"), !1;
      var a = [
          "\u043C\u043E\u0441\u043A\u0432\u0430 +10\u043A\u043C \u043E\u0442 \u043C\u043A\u0430\u0434",
          "\u043C\u043E\u0441\u043A\u0432\u0430 \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u043C\u043A\u0430\u0434",
          "\u043C\u043E\u0441\u043A\u0432\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u043C\u043A\u0430\u0434",
        ],
        c = 5,
        d = setInterval(function() {
          var e = document.querySelectorAll(
            ".ec-cart-step--payment label.ec-radiogroup__item",
          ).length;
          if (0 < e) {
            var f = !1;
            [].slice
              .apply(
                document.querySelectorAll(
                  ".ec-cart-step--payment label.ec-radiogroup__item",
                ),
              )
              .map(function(c) {
                -1 <
                c.textContent
                  .toLowerCase()
                  .indexOf(
                    "\u043F\u0440\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0435",
                  )
                  ? 0 > a.indexOf((b._citySelected || "").toLowerCase()) &&
                    (c.style.display = "none")
                  : !f && (c.click(), (f = !0));
              }),
              clearInterval(d);
          }
          0 < c ? --c : clearInterval(d);
        }, 300);
    });
};

var CstmzShippingAddressMods = function a(zones) {
  var b = this;
  _classCallCheck(this, a),
    (this._getConfig = function() {
      // var a = Ecwid.getStoreConfiguration();
      // b._zones = a.shippingAndTaxSettings.zones;
      b._zones = zones;
    }),
    (this._fields = [
      {
        id: "cstmz_kvartira",
        name: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430",
        short: "\u041A\u0432",
      },
      {
        id: "cstmz_padik",
        name: "\u041F\u043E\u0434\u044A\u0435\u0437\u0434",
        short: "\u041F",
      },
      { id: "cstmz_etazh", name: "\u042D\u0442\u0430\u0436", short: "\u042D" },
      {
        id: "cstmz_domofon",
        name:
          "\u041A\u043E\u0434 \u0434\u043E\u043C\u043E\u0444\u043E\u043D\u0430",
        short: "\u0414\u0444",
      },
    ]),
    (this._addExtraFields = function() {
      (ec.order = ec.order || {}),
        (ec.order.extraFields = ec.order.extraFields || {}),
        b._fields.forEach(function(a) {
          ec.order.extraFields[a.id] = {
            title: a.name,
            type: "text",
            checkoutDisplaySection: "shipping_address",
          };
        }),
        (ec.storefront.checkout_show_address_line_2 = !0),
        Ecwid.refreshConfig();
    }),
    (this._listenToExtraFields = function() {
      b._saveExtraFields(),
        b._fields.forEach(function(a) {
          var c = document.querySelector(".ec-form__row--" + a.id);
          null !== c &&
            c
              .querySelector("input")
              .addEventListener("input", b._saveExtraFields);
        });
    }),
    (this._saveExtraFields = function() {
      var a = "";
      b._fields.forEach(function(b) {
        var c = document.querySelector(".ec-form__row--" + b.id);
        if (null !== c) {
          var d = c.querySelector("input").value;
          "" !== d && (a = "");
        }
      });
      var c = document.querySelector(".form-control--type-address-line2 input");
      null !== c && ((c.value = a), c.dispatchEvent(new Event("input")));
    }),
    (this._loadAssets = function() {
      var a = document.createElement("script");
      (a.type = "text/javascript"),
        (a.src =
          "https://djqizrxa6f10j.cloudfront.net/apps/customizations/libs/flatpickr/flatpickr.js"),
        document.querySelector("body").appendChild(a);
      var b = document.createElement("script");
      (b.type = "text/javascript"),
        (b.src =
          "https://djqizrxa6f10j.cloudfront.net/apps/customizations/libs/flatpickr/ru_translation.js"),
        document.querySelector("body").appendChild(b);
      var c = document.createElement("link");
      (c.rel = "stylesheet"),
        (c.href =
          "https://djqizrxa6f10j.cloudfront.net/apps/customizations/libs/flatpickr/flatpickr.css"),
        document.querySelector("head").appendChild(c);
    });
};

fetchZones().then(zones => {
  Ecwid.OnAPILoaded.add(function() {
    var a = new CstmzCities(zones);
    a._getAllZones(),
      a._setDateExtraField(new Date()),
      Ecwid.OnPageLoaded.add(function(b) {
        switch (b.type) {
          case "CHECKOUT_ADDRESS":
            setTimeout(a._saveCurrentRegion, 500),
              setTimeout(a._listenToTabs, 500);
            break;
          case "CHECKOUT_DELIVERY":
            setTimeout(a._hideMethods, 500);
            break;
          case "CHECKOUT_PAYMENT_DETAILS":
            setTimeout(a._handlePaymentMethods, 100);
        }
      });
  });

  Ecwid.OnAPILoaded.add(function() {
    var a = new CstmzShippingAddressMods(zones);
    a._addExtraFields(),
      a._loadAssets(),
      Ecwid.OnPageLoaded.add(function(b) {
        switch (b.type) {
          case "CHECKOUT_ADDRESS":
            setTimeout(a._listenToExtraFields, 800);
            break;
          case "CHECKOUT_DELIVERY":
            break;
          case "CHECKOUT_PAYMENT_DETAILS":
            addGaToPay();
            break;
        }
      });
  });
});

function getRefQueryParam(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function addGaToPay() {
  var submitButton = document.querySelector(".ec-form button");

  var utm_source = getRefQueryParam("utm_source");
  var utm_campaign = getRefQueryParam("utm_campaign");

  if (submitButton && window._guaTracker && utm_source && utm_campaign) {
    var label = utm_source + "_" + utm_campaign + "_Payment";

    submitButton.addEventListener("click", function() {
      window._guaTracker("send", "event", "UX", "click", label);
    });
  }
}
