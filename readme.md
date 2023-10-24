## **DOCUMENTAÇÃO**
Antes de rodar esse projeto, recomendo baixar o front-end dele também. Pois pelo front-end vc conseguirá rodar os dois ambientes juntos simultaneamentes e sem o risco da famosa frase: 

_"Háh precisava do back rodando também para tesatr o front"_

**OBS:** _No front-end do projeto HubServis contém todo o guia de como rodar tanto o ambiente front-end quanto o back-end juntos_

---
#### *Urgente*

#### *Assim que der*
- [] Sistema de imagens para users, business, professionals, services e products
- [] Estruturar o banco para ficar em cascata, se o usuário for excluido tudo relacionado a ele também deve ser excluido.

## Rotas prontas para documentar
- [] Register
- [] Login
- [] Find All Users
- [] Create Business
- [] Find All Business
- [] *Create Service
- [] Find All Service

## Anotações gerais
- Token expira em 4 horas
- jwt dev key: 81dc9bdb52d04dc20036dbd8313ed055

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
 
 ### Categorias
  - As categorias podem ser privadas ou publicas, se for privada ela pertencerá a um negocio (business); Já se ela for publica não terá que pertencer a um negocio (business), apenas a um owner (usuario que a criou)

  #### **Listagem de categorias**
  A listagem de categorias pode ser feita de diversas formas, pois contamos com um sistema de filtragem aonde vc pode escolher oq quer listar. 
  
  **OBS**: Esses filtros são passados por `query params` e só aceitamos 1 por vez, caso informe mais que 1 será retornado o padrão.

  Veja abaixo as opções disponiveis:
   - O padrão da rota retorna apenas as categorias publicas.
   - `showPrivateOnly` - retorna apenas as categorias privadas.
   - `showAll` - retorna todas as categorias.

### Serviços em Destaque
- Atualmente listamos o serviços em destaque baseado na sua avaliação, quanto mais alta, mais chances de vc aparecer na home de destaques. 
- Futuramente será implementado um algoritmo para melhor diversificação dos destaques.

As opções da rota de destaques `/service/highlight` são:
- `averageRating`
   - usado para definir o número minimo de avaliação que um serviço deve ter para entrar nos destaques.
   - recebe um numero de 1 á 5. Mas por padrão é 4.
- `limit` 
   - usado para definir o limite de serviços retornados
   - por padrão é 8.


