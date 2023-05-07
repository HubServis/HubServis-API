A fazeres
- [x] relacionamento entre permissions e roles
- [x] criar serviços de session
- [x] criar middleware

- [x] Criar verificações quando for criar um usuário
- [] Retornar token quando registrar um usuário

- [] Criar permissões para usuário padrões, admin. Criar também verificações para alterações de permissões e roles para deixar apenas admin com acesso a isso mexer nas permissions e roles.

- [] arrumar todas as rotas que recebem token ou userId
- [] criar middleware de authentication
- [] Terminar rota de criação de negócio, atualmente ela recebe um usuário fixo.

- [] Estruturar o banco para ficar em modelo cascata, se o usuário for excluido tudo relacionado a ele também será.

## Rotas prontas para documentar
- [] Register
- [] Find Users

## Anotações
- Token expira em 4 horas

## OBS
- As únicas funções que não seguem o conceito de repository, é as funções dentro do arquivo de `middleware/permissions.ts`