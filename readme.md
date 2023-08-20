A fazeres
- [] Criar sistema de categorias (privadas e publicas) e criar o CRUD para esse sistema
- [] Criar CRUD para:
   - [] BUSINESS
   - [] PROFESSIONAL
   - [] SERVICES
   - [] PRODUCTS
- [] Criar lista de usuários para teste
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

- Para os agendamentos é importante lembrar que quando o profissional já tem um serviço agendado para o mesmo horario do novo agendamento, será definido como "Disponivel do momento" que no caso será o profissional disponivel no momento do serviço.

- Logica agendamento, verificações:
data e hora é valida?
usuário é valido?
negocio é valido?
profissional é valido? Ele trabalha no mesmo negócio do serviço?

### env's
- SECRET_JWT

## OBS
- As únicas funções que não seguem o conceito de repository, é as funções dentro do arquivo de `middleware/permissions.ts`

---

# PRÉ DOCUMENTAÇÃO
 ### Change Status Appointment
 - opções do status
    - 1 -> Concluido
    - 2 -> Pendente (Default)
    - 3 -> Cancelado
 - Agendamento deve pertencer ao seu criador ou dono do negocio para ser alterado o seu status