"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _PaymentPage = _interopRequireDefault(
  require("../components/PaymentPage.vue")
);

var _Home = _interopRequireDefault(require("../components/Home.vue"));

var _BuyMore = _interopRequireDefault(require("../components/BuyMore.vue"));

var _ReturnPolicy = _interopRequireDefault(
  require("../components/ReturnPolicy.vue")
);

var _CountryDetails = _interopRequireDefault(
  require("../components/CountryDetails.vue")
);

var _Email = _interopRequireDefault(require("../components/emails/Email.vue"));

var _Video = _interopRequireDefault(require("../components/Video.vue"));

var _ReadMore = _interopRequireDefault(require("../components/ReadMore.vue"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_vue["default"].use(_vueRouter["default"]);

var routes = [
  {
    path: "/shop",
    name: "Payment Page",
    component: _PaymentPage["default"]
  },
  {
    path: "/",
    name: "Home",
    component: _Home["default"]
  },
  {
    path: "/shop/buy-more",
    name: "Buy More",
    component: _BuyMore["default"]
  },
  {
    path: "/shop/return-policy",
    name: "Return Policy",
    component: _ReturnPolicy["default"]
  },
  {
    path: "/shop/country-details",
    name: "Country Details",
    component: _CountryDetails["default"]
  },
  {
    path: "/link/:url",
    name: "Email",
    component: _Email["default"]
  },
  {
    path: "/video",
    name: "Video",
    component: _Video["default"]
  },
  {
    path: "/info",
    name: "ReadMore",
    component: _ReadMore["default"]
  }
];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;
