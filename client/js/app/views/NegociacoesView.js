"use strict";

System.register(["./View.js", "../helpers/DateHelper.js", "../controllers/NegociacaoController.js"], function (_export, _context) {
  "use strict";

  var View, DateHelper, currentInstance, NegociacoesView;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  return {
    setters: [function (_ViewJs) {
      View = _ViewJs.View;
    }, function (_helpersDateHelperJs) {
      DateHelper = _helpersDateHelperJs.DateHelper;
    }, function (_controllersNegociacaoControllerJs) {
      currentInstance = _controllersNegociacaoControllerJs.currentInstance;
    }],
    execute: function () {
      _export("NegociacoesView", NegociacoesView = /*#__PURE__*/function (_View) {
        _inherits(NegociacoesView, _View);

        var _super = _createSuper(NegociacoesView);

        function NegociacoesView(elemento) {
          _classCallCheck(this, NegociacoesView);

          return _super.call(this, elemento);
        }

        _createClass(NegociacoesView, [{
          key: "template",
          value: function template(model) {
            return "\n      <table class=\"table table-hover table-bordered\">\n\n        <thead>\n          <tr>\n            <th>DATA</th>\n            <th>QUANTIDADE</th>\n            <th>VALOR</th>\n            <th>VOLUME</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          ".concat(model.negociacoes.map(function (n) {
              return "\n\n            <tr>\n              <td>".concat(DateHelper.dataParaTexto(n.data), "</td>\n              <td>").concat(n.quantidade, "</td>\n              <td>").concat(n.valor, "</td>\n              <td>").concat(n.volume, "</td>\n            </tr>\n\n          ");
            }).join(""), "\n        </tbody>\n\n        <tfoot>\n          <td colspan=\"3\"></td>\n          <td>\n           ").concat(model.negociacoes.reduce(function (total, n) {
              return total + n.volume;
            }, 0.0), "\n          </td>\n        </tfoot>\n      </table>");
          }
        }]);

        return NegociacoesView;
      }(View));
    }
  };
});
//# sourceMappingURL=NegociacoesView.js.map