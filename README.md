## coolChat

#### A simple real-time chat application made with React, websockets, graphQL (Apollo), and postgreSQL.


Initial setup for running a locally-hosted version of this app:
(these instructions assume a Linux environement is being used, for similar commands for mac, see this link: https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)

-clone the repo to a local directory

-Have postgres installed:
```bash
$sudo apt install postgresql postgresql-contrib
```

By default, Postgres uses a concept called "roles" to handle in authentication and authorization. These are, in some ways, similar to regular Unix-style accounts, but Postgres does not distinguish between users and groups and instead prefers the more flexible term "role".

Upon installation, Postgres is set up to use ident authentication, meaning that it associates Postgres roles with a matching Unix/Linux system account. If a role exists within Postgres, a Unix/Linux username with the same name is able to sign in as that role.

The installation procedure created a user account called postgres that is associated with the default Postgres role. In order to use Postgres, you can log into that account.

-create a user called student with password 12345 with superuser privileges:
```bash
$sudo createuser --interactive
```

-create a database called coolchat
```bash
$sudo createdb coolchat
```

-use the following command to create tables (detailed in chatDb.sql) within the coolchat db: 
```bash
$sudo psql coolchat -f chatDb.sql
```

-you should now be able to enter the coolchat db and find the users and messages relations
```
$sudo -u postgres psql coolchat
```

#### That's it for local db setup, you should now be ready to install dependencies and boot up the app


```
npm install
npm start
npm run dev
```

The app should open at localhost:8080

The graphQL playground can be accessed at localhost:8080/graphql

some useful gql queries to try within the playground:
```
mutation {
  createUser(username: "christian", password: "12345"){
    username
  }
}
```

if no method is provided, the command is assumed to be a query:
```
{
  users
}
```

```
mutation{
  login(username: "christian", password: "12345") {
    error
    username
    success
    token
  }
}
```

```
{
  messages {
    username
    message
    created_at
  }
}
```
