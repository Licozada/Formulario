import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = [];

function menuView(req, resp) {
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #e0f7fa;
                        font-family: Arial, sans-serif;
                    }
                    .navbar {
                        background-color: #0288d1;
                    }
                    .navbar-brand, .nav-link {
                        color: #ffffff !important;
                    }
                    .navbar-brand:hover, .nav-link:hover {
                        color: #b3e5fc !important;
                    }
                    .container-menu {
                        text-align: center;
                        margin-top: 50px;
                    }
                    .btn-menu {
                        margin: 10px;
                        padding: 15px 30px;
                        background-color: #0288d1;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        font-size: 18px;
                        text-decoration: none;
                    }
                    .btn-menu:hover {
                        background-color: #0277bd;
                    }
                </style>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Menu Principal</a>
                    </div>
                </nav>
                <div class="container-menu">
                    <a class="btn-menu" href="/cadastrarProduto">Cadastrar Produto</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}

function cadastroProdutoView(req, resp) {
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #e0f7fa;
                    }
                    .container {
                        max-width: 700px;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        margin-top: 50px;
                    }
                    h1 {
                        color: #0288d1;
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .form-label {
                        font-weight: 600;
                        color: #0277bd;
                    }
                    .btn-primary {
                        background-color: #0288d1;
                        border: none;
                        width: 100%;
                    }
                    .btn-primary:hover {
                        background-color: #0277bd;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Cadastro de Produtos</h1>
                    <form method="POST" action="/cadastrarProduto" class="row g-3" novalidate>
                        <div class="col-md-6">
                            <label for="produto" class="form-label">Nome do Produto</label>
                            <input type="text" class="form-control" id="produto" name="produto" placeholder="Nome do produto" required>
                        </div>
                        <div class="col-md-6">
                            <label for="categoria" class="form-label">Categoria</label>
                            <input type="text" class="form-control" id="categoria" name="categoria" placeholder="Categoria" required>
                        </div>
                        <div class="col-md-6">
                            <label for="preco" class="form-label">Preço</label>
                            <input type="number" step="0.01" class="form-control" id="preco" name="preco" placeholder="Preço" required>
                        </div>
                        <div class="col-md-6">
                            <label for="quantidade" class="form-label">Quantidade</label>
                            <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Quantidade em estoque" required>
                        </div>
                        <div class="col-md-12">
                            <label for="fornecedor" class="form-label">Fornecedor</label>
                            <input type="text" class="form-control" id="fornecedor" name="fornecedor" placeholder="Fornecedor" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}

function cadastrarProduto(req, resp) {
    const produto = req.body.produto;
    const categoria = req.body.categoria;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const fornecedor = req.body.fornecedor;

    const novoProduto = { produto, categoria, preco, quantidade, fornecedor };
    listaProdutos.push(novoProduto);

    resp.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background-color: #e0f7fa; }
                    .container {
                        max-width: 900px;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        margin-top: 50px;
                    }
                    h2 {
                        color: #0288d1;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    table {
                        margin-top: 20px;
                    }
                    .table-primary {
                        background-color: #0288d1;
                        color: #fff;
                    }
                    .btn-primary {
                        background-color: #0288d1;
                        border: none;
                    }
                    .btn-primary:hover {
                        background-color: #0277bd;
                    }
                    .btn-secondary {
                        background-color: #6c757d;
                        border: none;
                    }
                    .btn-secondary:hover {
                        background-color: #5a6268;
                    }
                    .text-center a {
                        margin: 10px;
                        padding: 10px 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Lista de Produtos Cadastrados</h2>
                    <table class="table table-bordered table-hover mt-4">
                        <thead class="table-primary">
                            <tr>
                                <th scope="col">Nome do Produto</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Fornecedor</th>
                            </tr>
                        </thead>
                        <tbody>
    `);

    for (var i = 0; i < listaProdutos.length; i++) {
        resp.write(`
            <tr>
                <td>${listaProdutos[i].produto}</td>
                <td>${listaProdutos[i].categoria}</td>
                <td>R$ ${listaProdutos[i].preco}</td>
                <td>${listaProdutos[i].quantidade}</td>
                <td>${listaProdutos[i].fornecedor}</td>
            </tr>
        `);
    }

    resp.write(`
                        </tbody>
                    </table>
                    <div class="text-center">
                        <a class="btn btn-primary" href="/cadastrarProduto">Cadastrar Outro Produto</a>
                        <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                    </div>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);

    resp.end();
}

app.get('/', menuView);
app.get('/cadastrarProduto', cadastroProdutoView);
app.post('/cadastrarProduto', cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
