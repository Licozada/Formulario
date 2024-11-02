import express from 'express';

const app = express();
const porta = 3000;
 const host = '0.0.0.0';

 function cadastrarproduto(req,resp){

resposta.send(`
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <div class="container text-center">
        <h1>Cadastro de Produtos</h1>
        <form class="row g-3" novalidate>
            <div class="col-md-4">
                <label for="produto" class="form-label">Produto</label>
                <input type="text" class="form-control" id="produto" name="produto" placeholder="Digite o nome do produto" required>
            </div>
            <div class="col-md-4">
                <label for="codigo" class="form-label">Código do Produto</label>
                <input type="text" class="form-control" id="codigo" name="codigo" placeholder="Digite o código do produto" required>
            </div>
            <div class="col-md-4">
                <label for="descricao" class="form-label">Descrição</label>
                <input type="text" class="form-control" id="descricao" name="descricao" placeholder="Descrição do produto">
            </div>
            <div class="col-md-4">
                <label for="quantidade" class="form-label">Quantidade</label>
                <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Digite a quantidade em estoque" required>
            </div>
            <div class="col-md-4">
                <label for="preco" class="form-label">Preço</label>
                <input type="number" step="0.01" class="form-control" id="preco" name="preco" placeholder="Digite o preço do produto" required>
            </div>
            <div class="col-md-4">
                <label for="dataValidade" class="form-label">Data de Validade</label>
                <input type="date" class="form-control" id="dataValidade" name="dataValidade">
            </div>
            <div class="col-md-6">
                <label for="categoria" class="form-label">Categoria</label>
                <input type="text" class="form-control" id="categoria" name="categoria" placeholder="Digite a categoria do produto">
            </div>
            <div class="col-md-6">
                <label for="fornecedor" class="form-label">Fornecedor</label>
                <input type="text" class="form-control" id="fornecedor" name="fornecedor" placeholder="Nome do fornecedor">
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
            </div>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>


    `);

  }
  app.get('/cadastrarproduto', cadastrarproduto);

app.listen(porta, host, () => {
    console.log(`servidor iniciado e em execução no endereço  http://${host}:${porta}`);
});
