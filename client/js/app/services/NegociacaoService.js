"use strict";

System.register(["./HttpService.js", "./ConnectionFactory.js", "../dao/NegociacaoDao.js", "../models/Negociacao.js"], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, NegociacaoService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_HttpServiceJs) {
      HttpService = _HttpServiceJs.HttpService;
    }, function (_ConnectionFactoryJs) {
      ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
    }, function (_daoNegociacaoDaoJs) {
      NegociacaoDao = _daoNegociacaoDaoJs.NegociacaoDao;
    }, function (_modelsNegociacaoJs) {
      Negociacao = _modelsNegociacaoJs.Negociacao;
    }],
    execute: function () {
      _export("NegociacaoService", NegociacaoService = /*#__PURE__*/function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: "obterNegociacoesDaSemana",
          value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
              _this._http.get("negociacoes/semana").then(function (negociacoes) {
                resolve(negociacoes.map(function (objeto) {
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              })["catch"](function (erro) {
                console.log(erro);
                reject("Não foi possivel adiocinar as negociações da semana");
              });
            });
          }
        }, {
          key: "obterNegociacoesDaSemanaAnterior",
          value: function obterNegociacoesDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              _this2._http.get("negociacoes/anterior").then(function (negociacoes) {
                resolve(negociacoes.map(function (objeto) {
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              })["catch"](function (erro) {
                console.log(erro);
                reject("Não foi possivel adiocinar as negociações da semana anterior");
              });
            });
          }
        }, {
          key: "obterNegociacoesDaSemanaRetrasada",
          value: function obterNegociacoesDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              _this3._http.get("negociacoes/retrasada").then(function (negociacoes) {
                resolve(negociacoes.map(function (objeto) {
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              })["catch"](function (erro) {
                console.log(erro);
                reject("Não foi possivel adiocinar as negociações da semana retrasada");
              });
            });
          }
        }, {
          key: "obterNegociacoes",
          value: function obterNegociacoes() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
              Promise.all([_this4.obterNegociacoesDaSemana(), _this4.obterNegociacoesDaSemanaAnterior(), _this4.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
                var negociacoes = periodos.reduce(function (dados, periodo) {
                  return dados.concat(periodo);
                }, []).map(function (dado) {
                  return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                });
                resolve(negociacoes);
              })["catch"](function (erro) {
                return reject(erro);
              });
            });
          }
        }, {
          key: "cadastra",
          value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.adiciona(negociacao);
            }).then(function () {
              return "Negociação adicionada com sucesso";
            })["catch"](function (erro) {
              console.log(erro);
              throw new Error("Não foi possível adicionar a negociação");
            });
          }
        }, {
          key: "lista",
          value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.listaTodos();
            })["catch"](function (erro) {
              console.log(erro);
              throw new Error("Não foi possível adicionar as negociações");
            });
          }
        }, {
          key: "apaga",
          value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.apagaTodos();
            }).then(function () {
              return "Negociações apagadas com sucesso";
            })["catch"](function (erro) {
              console.log(erro);
              throw new Error("não foi possível apagar as negociações");
            });
          }
        }, {
          key: "importa",
          value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return !listaAtual.some(function (negociacaoExistente) {
                  return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                });
              });
            })["catch"](function (erro) {
              console.log(erro);
              throw new Error("Não foi possível buscar negociações para importar");
            });
          }
        }]);

        return NegociacaoService;
      }());
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map