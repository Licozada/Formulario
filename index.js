import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = [];

function menuView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">MENU</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastrarProduto">Cadastrar Produto</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}

function cadastroProdutoView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Produtos</h1>
                    <form method="POST" action="/cadastrarProduto" class="border p-3 row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="produto" class="form-label">Nome do Produto</label>
                            <input type="text" class="form-control" id="produto" name="produto" placeholder="Nome do produto" required>
                        </div>
                        <div class="col-md-4">
                            <label for="categoria" class="form-label">Categoria</label>
                            <input type="text" class="form-control" id="categoria" name="categoria" placeholder="Categoria" required>
                        </div>
                        <div class="col-md-4">
                            <label for="preco" class="form-label">Preço</label>
                            <input type="number" step="0.01" class="form-control" id="preco" name="preco" placeholder="Preço" required>
                        </div>
                        <div class="col-md-6">
                            <label for="quantidade" class="form-label">Quantidade</label>
                            <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Quantidade em estoque" required>
                        </div>
                        <div class="col-md-6">
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
    // Recuperar os dados do formulário enviados para o servidor
    const produto = req.body.produto;
    const categoria = req.body.categoria;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const fornecedor = req.body.fornecedor;

    const novoProduto = { produto, categoria, preco, quantidade, fornecedor };
    listaProdutos.push(novoProduto);

    resp.write(`
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background-color: #f8f9fa; }
                    .container { max-width: 900px; margin-top: 40px; }
                    h2 { color: #007bff; }
                    table { margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 class="text-center">Lista de Produtos Cadastrados</h2>
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

    // Usando um loop for para gerar as linhas da tabela
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
                        <a class="btn btn-primary m-2" href="/cadastrarProduto">Cadastrar Outro Produto</a>
                        <a class="btn btn-secondary m-2" href="/">Voltar para o Menu</a>
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
