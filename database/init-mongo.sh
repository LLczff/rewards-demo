#!/bin/bash
set -e

# Create database and user
mongosh <<EOF
use ${MONGO_INITDB_DATABASE}
db.createUser({
    user: "${MONGO_INITDB_USERNAME}",
    pwd: "${MONGO_INITDB_PASSWORD}",
    roles: [{
        role: "readWrite",
        db: "${MONGO_INITDB_DATABASE}"
    }]
})
EOF

# Import initial data
mongoimport --db ${MONGO_INITDB_DATABASE} --collection users --file /docker-entrypoint-initdb.d/data/user.json --jsonArray
mongoimport --db ${MONGO_INITDB_DATABASE} --collection categories --file /docker-entrypoint-initdb.d/data/category.json --jsonArray
mongoimport --db ${MONGO_INITDB_DATABASE} --collection places --file /docker-entrypoint-initdb.d/data/place.json --jsonArray
mongoimport --db ${MONGO_INITDB_DATABASE} --collection deals --file /docker-entrypoint-initdb.d/data/deal.json --jsonArray
mongoimport --db ${MONGO_INITDB_DATABASE} --collection transactions --file /docker-entrypoint-initdb.d/data/transaction.json --jsonArray