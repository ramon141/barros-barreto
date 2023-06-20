# Barros Barreto Monitoramento - Front End
O projeto de monitoramento urinario do Hospital Universitário João de Barros Barreto é baseado em uma aplicação web, cujo objetivo é garantir um monitoramento preciso sobre o volume urinário de um paciente no pós-operatório.

A aplicação consiste em uma plataforma web para monitorar o paciente a partir de um esp-32 configurado com uma balança para estimar o valor do volume de diurese do paciente, esses dados da balança passam para o site onde ocorre o processamento de informções do paciente, do módulo, do médico e do volume urinario.

# Como iniciar o aplicativo?

Para utilizar e instalar esse aplicativo é pré-requisito possuir o `node` e o `nvm`. Abaixo estarão os passos necessários para a execução da página web localmente.

## Adicionando as variáveis de ambiente
Para definir a URL da API é necessário criar um arquivo com o nome `.env` na raiz do repositório. Os arquivos do repositório serão como na imagem abaixo:

![Listagem dos arquivos](https://imgur.com/SMLYQ6U.png)


Dentro arquivo `.env` deverá conter a(s) seguinte(s) variável(is), abaixo de cada variável estará listada os possíveis valores e em quais casos os valores são utilizados.

+ VITE_API_BASE_URL: Link da API de dados do Canaã Educação
+ + Ambiente de produção - https://canaa-monitoramento-de-urina.onrender.com

+ PORT: Porta que o servidor de produção irá iniciar

O arquivo `.env` ficará:

![Monstrando .env](https://imgur.com/LjVwqeK.png)

## Instalar as dependencias do Node:

Para iniciar a aplicação, necessita baixar as dependêndicas do node com os seguintes comandos:

## Instalar dependências

Por padrão, as dependências foram instaladas quando este aplicativo foi gerado.
Sempre que as dependências em `package.json` forem alteradas, execute o seguinte comando:

```sh
npm install
```
Para forçar a instalação das dependências use:

```sh
npm install --legacy-peer-deps
```
Para instalar apenas dependências resolvidas em `package-lock.json`:

```sh
npm ci
```

## Execute o aplicativo

```sh
npm start
```
De preferência para desenvolver use o comando:

```shell
npm run dev
```

Você também pode executar `node .` para pular a etapa de construção.

Abra http://127.0.0.1:3000 em seu navegador.

## Recriar o projeto

Para construir o projeto de forma incremental:

```sh
npm run build
```

Para forçar uma compilação completa limpando os artefatos em cache:

```sh
npm run rebuild
```

## Corrige problemas de estilo e formatação de código

```sh
npm run lint
```

Para corrigir automaticamente esses problemas:

```sh
npm run lint:fix
```

## Outros comandos úteis:

- `npm run migrate`: Migra esquemas de banco de dados para modelos
- `npm run openapi-spec`: Gera a especificação OpenAPI em um arquivo
- `npm run docker:build`: Construa uma imagem do Docker para esta aplicação
- `npm run docker:run`: Executa esta aplicação dentro de um container Docker

### Possíveis bugs
O `ts-node-dev` não está funcionando corretamente dentro do container docker, logo quando realizar uma alteração no código é necessário atualizar a página para que a atualização seja refletida no navegador.
