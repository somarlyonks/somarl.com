# Helper

## ArangoDB

### dev setup

[@ref](https://www.arangodb.com/docs/stable/cookbook/administration-authentication.html)

```bash
arangosh --server.endpoint tcp://127.0.0.1:8529 --server.database "_system"
require("org/arangodb/users").save("sy", "sy");
require("org/arangodb/users").grantDatabase("sy", "*", "rw");
```

### create collection

`npm run create-collection -- -c collectionname`
