module.exports ={
  "development": {
    "username": "hernadar", //hernadar
    "password": "192611Dh$",//Local es 192611Dh Onlink 192611Dh$
    "database": "brokertosi",
    "port": 3306,
    "host": "onlink.com.ar",//db4free.net
    "dialect": "mysql",
    "ssl": true,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
