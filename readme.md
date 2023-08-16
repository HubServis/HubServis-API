A fazeres
- [x] relacionamento entre permissions e roles
- [x] criar serviços de session
- [x] criar middleware

- [x] Criar verificações quando for criar um usuário
- [x] Retornar token quando registrar um usuário

- [x] Criar permissões para usuário padrões. Criar também verificações para alterações de permissões e roles para deixar apenas admin com acesso a isso mexer nas permissions e roles.

- [x] Criar uma utils para geração e verificação de token, depois substituir em todo o app

- [x] Deixar todas as rotas criadas recebendo os devidos dados do diagrama do BD
- [x] Criar rotas e sistema de profissionais o quanto antes
- [] Criar lista de usuários para teste

- [x] criar middleware de authentication
- [x] arrumar todas as rotas que recebem token ou userId
- [x] Terminar rota de criação de negócio, atualmente ela recebe um usuário fixo.

- [] Estruturar o banco para ficar em modelo cascata, se o usuário for excluido tudo relacionado a ele também deve ser excluido.

## Rotas prontas para documentar
- [] Register
- [] Login
- [] Find All Users
- [] Create Business
- [] Find All Business
- [] *Create Service
- [] Find All Service

## Anotações
- Token expira em 4 horas
- dev jwt key: 81dc9bdb52d04dc20036dbd8313ed055

- Logica agendamento, verificações:
data e hora é valida?
usuário é valido?
negocio é valido?
profissional é valido? Ele trabalha no mesmo negócio do serviço?

### env's
- SECRET_JWT

## OBS
- As únicas funções que não seguem o conceito de repository, é as funções dentro do arquivo de `middleware/permissions.ts`