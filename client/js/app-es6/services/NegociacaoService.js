import { HttpService } from "./HttpService.js";
import { ConnectionFactory } from "./ConnectionFactory.js";
import { NegociacaoDao } from "../dao/NegociacaoDao.js";
import { Negociacao } from "../models/Negociacao.js";

export class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/semana")
        .then((negociacoes) => {
          resolve(
            negociacoes.map(
              (objeto) =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch((erro) => {
          console.log(erro);
          reject("Não foi possivel adiocinar as negociações da semana");
        });
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/anterior")
        .then((negociacoes) => {
          resolve(
            negociacoes.map(
              (objeto) =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch((erro) => {
          console.log(erro);
          reject(
            "Não foi possivel adiocinar as negociações da semana anterior"
          );
        });
    });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/retrasada")
        .then((negociacoes) => {
          resolve(
            negociacoes.map(
              (objeto) =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch((erro) => {
          console.log(erro);
          reject(
            "Não foi possivel adiocinar as negociações da semana retrasada"
          );
        });
    });
  }

  obterNegociacoes() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada(),
      ])
        .then((periodos) => {
          let negociacoes = periodos
            .reduce((dados, periodo) => dados.concat(periodo), [])
            .map(
              (dado) =>
                new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)
            );

          resolve(negociacoes);
        })
        .catch((erro) => reject(erro));
    });
  }

  cadastra(negociacao) {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegociacaoDao(connection))
      .then((dao) => dao.adiciona(negociacao))
      .then(() => "Negociação adicionada com sucesso")
      .catch((erro) => {
        console.log(erro);
        throw new Error("Não foi possível adicionar a negociação");
      });
  }

  lista() {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegociacaoDao(connection))
      .then((dao) => dao.listaTodos())
      .catch((erro) => {
        console.log(erro);
        throw new Error("Não foi possível adicionar as negociações");
      });
  }

  apaga() {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegociacaoDao(connection))
      .then((dao) => dao.apagaTodos())
      .then(() => "Negociações apagadas com sucesso")
      .catch((erro) => {
        console.log(erro);
        throw new Error("não foi possível apagar as negociações");
      });
  }

  importa(listaAtual) {
    return this.obterNegociacoes()
      .then((negociacoes) =>
        negociacoes.filter(
          (negociacao) =>
            !listaAtual.some(
              (negociacaoExistente) =>
                JSON.stringify(negociacao) ==
                JSON.stringify(negociacaoExistente)
            )
        )
      )
      .catch((erro) => {
        console.log(erro);
        throw new Error("Não foi possível buscar negociações para importar");
      });
  }
}
