A fazeres
- [x] relacionamento entre permissions e roles
- [x] criar serviços de session
- [x] criar middleware

- [x] Criar verificações quando for criar um usuário
- [x] Retornar token quando registrar um usuário

- [x] Criar permissões para usuário padrões. Criar também verificações para alterações de permissões e roles para deixar apenas admin com acesso a isso mexer nas permissions e roles.

- [] Criar uma utils para geração e verificação de token, depois substituir em todo o app

- [] Deixar todas as rotas criadas recebendo os devidos dados do diagrama do BD

- [] criar middleware de authentication
- [] arrumar todas as rotas que recebem token ou userId
- [] Terminar rota de criação de negócio, atualmente ela recebe um usuário fixo.

- [] Estruturar o banco para ficar em modelo cascata, se o usuário for excluido tudo relacionado a ele também será.

## Rotas prontas para documentar
- [] Register
- [] Find Users

## Anotações
- Token expira em 4 horas

### env's
- SECRET_JWT

## OBS
- As únicas funções que não seguem o conceito de repository, é as funções dentro do arquivo de `middleware/permissions.ts`