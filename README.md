# Conecta Canaã Educação - Front End
O projeto Canaã dos Carajás é baseado em microsserviços, e cada um destes possui uma funcionalidade bem definida:

O Canaã Educação é um sistema para o gerenciamento de embarque e desembarque de estudantes da cidade de Canaã dos Carajás. A aplicação busca permitir que estudantes portando seu QR Code, com a informação de matrícula do estudante, tenham acesso a embarcar em um ônibus e automaticamente crie um registro, que poderá ser utilizado pelo administrador para elaborar relatórios periódicos. O estudante, caso universitário, terá a opção de realizar o reconhecimento facial que executará nos ônibus utilizando um Raspberry pi.

Todos os sistemas se conversam por meio de APIs intermediárias, em educação existem duas:
- canaa-educacao-dados-api [Ver mais](https://repositorio.lprad.ufpa.br/yure_sa19/canaa-educacao-dados-api)
- canaa-educacao-treinamento-api [Ver mais](https://repositorio.lprad.ufpa.br/rocha/canaa-educacao-treinamento-api)

A arquitetura e relações entre os diferentes serviços se baseia na imagem abaixo, em azul o projeto atual:
![](https://i.imgur.com/vQDrHTG.jpeg)

# Como iniciar o aplicativo?

Para utilizar e instalar esse aplicativo é pré-requisito possuir o `docker` e o `docker-compose`, que pode ser obtido aqui: [Docker Download](https://docs.docker.com/desktop/windows/install/) e [Docker Compose Download](https://docs.docker.com/compose/install/). Abaixo estarão os passos necessários para a execução da página web localmente.

## Adicionando as variáveis de ambiente
Para definir a URL da API é necessário criar um arquivo com o nome `.env` na raiz do repositório. Os arquivos do repositório serão como na imagem abaixo:

![Listagem dos arquivos](https://i.imgur.com/EhBSrHh.png)


Dentro arquivo `.env` deverá conter a(s) seguinte(s) variável(is), abaixo de cada variável estará listada os possíveis valores e em quais casos os valores são utilizados.

+ VITE_API_BASE_URL: Link da API de dados do Canaã Educação
+ + Ambiente de produção - https://ceapi.unifesspa.edu.br/
+ + Obs: Ainda não há nenhuma API de desenvolvimento, utiliza a API de produção com cuidado, ou preferencialmente, execute a API localmente.

+ PORT: Porta que o servidor de produção irá iniciar

O arquivo `.env` ficará:

![Monstrando .env](https://i.imgur.com/PbF9a8Y.png)

## Instalar a imagem docker
Para certificar que o Docker está instalado corretamente em seu computador execute o comando `docker run hello-world` no seu terminal/cmd. O resutado esperado é:

![Sucesso no Docker](https://i.imgur.com/rTUcUm4.png)

Garanta que o Docker compose também está instalado corretamente, para isto execute o comando `docker-compose --version`, o resultado esperado é:

![Docker-compose instalado](https://i.imgur.com/Mwu0qKD.png)

Caso tenha ocorrido tudo certo, acesse a pasta do projeto utilizando o terminal/cmd e execute o comando `docker-compose up --build`. O resultado esperado é:

![Imagem docker](https://i.imgur.com/8DSPonW.png)

Para sair deste container você pode pressionar Ctrl+C (ou command+C ser for MAC), pressione mais de uma vez, se necessário. Ou utilizando o comando `docker stop canaa-educacao-web-dev`.

### Iniciando a imagem pela 2ª vez
Para executar o ambiente depois de fazer as configurações necessárias basta:
+ Entrar na pasta do projeto pelo terminal
+ Executar o comando `docker start -i canaa-educacao-web-dev`, o mesmo resultado da primeira execução irá ocorrer.
+ Alternativamente você pode executar o comando `docker-compose up`.

### Possíveis bugs
O `ts-node-dev` não está funcionando corretamente dentro do container docker, logo quando realizar uma alteração no código é necessário atualizar a página para que a atualização seja refletida no navegador.
