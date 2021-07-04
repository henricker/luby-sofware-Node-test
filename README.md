# Teste da Luby Software

## CRUD de usuários
- Inicialmente vamos ver os endpoints do CRUD de usuários.
- Deixei as rotas do crud de usuários como livres para facilitar os testes no insomnia ou postmam, a API deixa você você criar, deletar, atualizar e ver os dados do usuário.

Abaixo segue os endpoints do CRUD de usuários:
``` json
endpoints: [
  {
    "name": "criar usuário",
    "method": "POST",
    "endpoint": "http://localhost:3333/user",
    "requestBody": {
        "username": "username",
        "name": "name",
        "email": "email",
        "bio": "bio",
        "state": "state",
        "city": "city",
        "avatar": "avatar_url"
      }
  },
  {
    "name": "buscar todos os usuários",
    "method": "GET",
    "endpoint": "http://localhost:3333/user",
    "responseBody": {
      "data": [
      {
        "id": "id",
        "name": "name",
        "bio": "bio",
        "username": "username",
        "email": "email",
        "avatar": "avatar_url",
        "followers": "quantidade de seguidores",
        "followings": "quantidade de pessoas que está seguindo",
        "repositories": "quantidade de repositórios",
        "location": {
          "state": "state",
          "city": "city"
        }
      },
    ],
    "count": "quantidade de dados retornados"
    }
  },

  {
    "name": "atualizar usuário",
    "method": "PUT",
    "endpoint": "http://localhost:3333/user/:id",
    "requestBody": {
      "username": "username",
      "name": "name",
      "email": "email",
      "bio": "bio",
      "state": "state",
      "city": "city",
      "avatar": "avatar_url"
    }
  },
  
  {
    "name": "buscar usuário por id",
    "method": "GET",
    "endpoint": "http://localhost:4000/user/:id",
    "responseBody": {
      "data": {
        "id": "id",
        "name": "name",
        "bio": "bio",
        "username": "username",
        "email": "email",
        "avatar": "avatar_url",
        "followers": "quantidade de seguidores",
        "followings": "quantidade de pessoas que está seguindo",
        "repositories": "quantidade de repositórios",
        "location": {
          "state": "state",
          "city": "city"
        }
      },
      "count": 1
    }
  },

  {
    "name": "deletar usuário",
    "method": "DELETE",
    "endpoint": "http://localhost:3333/user/:id",
  }
]
```
## Autenticação
- Na API resolvi ir um pouco além e utilizar o Json Web Token (JWT) para autenticar o usuário, basta realizar uma requisição para o endpoint abaixo como exemplo:
```json
{
  "auth": {
    "name": "autenticação",
    "method": "POST",
    "endpoint": "http://localhost:3333/user/auth",
    "requestBody": {
      "username": "henricker"
    }
  }
}
```
- Como resposta da autenticação, caso esteja tudo válido será devolvido a seguinte resposta:
```json
{
  "data": {
    "user": {
      "id": 17,
      "name": "Henrique Vieira",
      "bio": "programador java e Nodejs",
      "username": "henricker",
      "email": "henricker@gmail.com",
      "avatar": "https://avatars.githubusercontent.com/u/69400902?v=4",
      "followers": 1,
      "followings": 1,
      "repositories": 5,
      "location": {
        "state": "CE",
        "city": "Boa Viagem"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTYyNTQyMTE3NywiZXhwIjoxNjI1NDI0Nzc3fQ.8Z3m_2No0i3F2BwwcZRXWjyTebe1L0uePU4uwve_aZ8"
  },
  "count": 1
}
```
- Veja que os dados de usuário retornados condizem com o que é requerido ao iniciar o login nas telas de exemplo do teste

<div>
<img src="./documentationImages/login.png" width="200" height="auto" style="margin-right: 37%;">
<img src="./documentationImages/auth.png" width="200" height="auto">
<div>

- Agora com o token de usuário em mãos podemos realizar as seguintes operações:
  - follow/unfollow outro usuário;
  - Criar, atualizar, deletar repositórios;
  - Dar star/unstar nos repositórios


## Endpoints que requerem autenticação do usuário

- Para realizar essas operações antes de enviar a requisição, é necessário incluir o token nos headers (Bearer token);

Operações de follow e unfollow
```json
{
  
  "follow": {
    "name": "Seguir usuário",
    "method": "POST",
    "endpoint": "http://localhost:3333/user/follow/:idOtherUser",
    "responseBody": {
      "data": {
      "follower": "follower_id",
      "followed": "followed_id",
      "updatedAt": "updated_date",
      "createdAt": "created_date"
    },
    "count": 1
    }
  },

  "unfollow": {
    "name": "Parar de seguir usuário",
    "method": "DELETE",
    "endpoint": "http://localhost:3333/user/unfollow/:idOtherUser",
    "responseBody": {
      "message": "Unfollow realizado com sucesso"
    }
  }

}
```

Operações de star/unstar em repositórios
```json
{
  
  "star": {
    "name": "Dar estrela (star) no repositório",
    "method": "POST",
    "endpoint": "http://localhost:3333/repository/like/:idRepository",
    "responseBody": {
      "data": {
        "id": "idStar",
        "user_id": "user_id",
        "repository_id": 1,
        "updatedAt": "updated_date",
        "createdAt": "created_date"
      },
    "count": 1
    }
  },

  "unstar": {
    "name": "remover estrela (unstar) no repositório",
    "method": "DELETE",
    "endpoint": "http://localhost:3333/repository/unlike/idRepository",
    "responseBody": {
       "message": "unlike realizado com sucesso"
    }
  }

}
```

Operações de repositório (Criar, atualizar e remover)
```json
{
  /*
    Nesse caso de criação, pelo que entendi no teste
    o slug deve ser a concatenação do nome de usuário com o nome do repositório, por isso o slug não é enviado nessa requisição
  */
  "create": {
    "name": "criar repositório",
    "method": "POST",
    "endpoint": "http://localhost:3333/user/repository",
    "requestBody": {
      "name": "nameRepository",
      "description": "description",
      "publicRepo": true //true of false
    },
    "responseBody": {
       "data": {
          "id": "id_repository",
          "description": "description",
          "name": "name_repository",
          "public": true,
          "slug": "username-name-repository",
          "user_id": "user_id"
        },
      "count": 1
    }
  },

  /*
    Nos endpoints de deletar e atualizar eu verifico se o repositório é pertencente ao usuário que está logado via token, caso não seja eu retorno uma mensagem de erro.
  */

  "update": {
    "name": "Atualizar repositório",
    "method": "PUT",
    "endpoint": "http://localhost:3333/user/repository",
    "requestBody": {
      "name": "nameRepository",
      "description": "description",
      "publicRepo": true //true ou false
    },
    "responseBody": {
      "message": "Repositório atualizado com sucesso"
    }
  },


  "delete": {
    "name": "Apagar repositório",
    "method": "DELETE",
    "endpoint": "http://localhost:3333/user/repository/:idRepository",
  }
}

```

## Endpoints que não requerem autenticação do usuário
