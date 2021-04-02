# Cadastro de Carros

**RF**

Deve ser possível cadastrar um carro.


**NR**

Não deve ser possível cadastrar um carro sem placa
Não deve ser possível cadastrar um carro com placa ja cadastrada
Não deve ser possível alterar uma placa de um carro já cadastrado
O carro deve ser cadastrado, por padrão, com disponibilidade
Somente usuários administradores poderam cadastrar ou alterar cadastro de um carro.

# Listagem de Carros.

**RF**

Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN** 

O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro.

**RF**

Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Somente usuários administradores poderam cadastrar ou alterar cadastro de um carro.


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Somente usuários administradores podem fazer a operação.


# Aluguel de carro.

**RF**
Deve ser possível cadastrar um aluguel.
Deve ser possível listar todos os carros disponíveis.

**RNF**

**RN**
O cadastro do aluguel deve ter duração minima de 24 horas.
Somente usuários autenticados podem alugar um carro.
Não deve ser possível cadastrar um novo aluguel para um usuário que já tenha um aluguel ativo.
Não deve ser possível cadastrar um novo aluguel para um aluguel que já tenha um aluguel ativo.