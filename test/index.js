//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app =  require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');
const userSchema = require('../src/schemas/userSchema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

describe('Testes da aplicaçao',  () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
        });
    });

    it('deveria criar o usuario raupp', function (done) {
        chai.request(app)
        .post('/user')
        .send({nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });

    it('criando usuário menor de idade', function (done) {
        chai.request(app)
        .post('/user')
        .send({ nome: "joao", email: "joao@hotmail.com", idade: 17 })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.body.message).to.be.equal('User is younger than 18.');
            expect(res).to.have.status(403);
            done();
        });
    });

    it('usuário 1', function (done) {
        chai.request(app)
        .post('/user')
        .send({ nome: "gabriel", email: "gabrielrblgbi@gmail.com", idade: 21 })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    
    it('usuário 2', function (done) {
        chai.request(app)
        .post('/user')
        .send({ nome: "fabio", email: "fabio@gmail.com", idade: 40 })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    
    it('usuário 3', function (done) {
        chai.request(app)
        .post('/user')
        .send({ nome: "matheus", email: "matheus@live.com", idade: 19 })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    
    it('usuário 4', function (done) {
        chai.request(app)
        .post('/user')
        .send({ nome: "melissa", email: "melissa@gmail.com", idade: 28 })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    
    it('usuário 5', function (done) {
        chai.request(app)
        .post('/user')
        .send({ nome: "roberto", email: "roberto@outlook.com", idade: 24 })
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });

    it('o usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
        .get('/user/naoExiste')
        .end(function (err, res) {
            expect(res.body.message).to.be.equal('User not found');
            expect(res).to.have.status(404);
            expect(res.body.user).to.eql({});
            done();
        });
    });

    it('o usuario raupp existe e é valido', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.user).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('o usuario raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body.user).to.eql({});
            done();
        });
    });

    it('deveria ser uma lista com pelomenos 5 usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
        });
    });
})