const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:root@localhost/cmpt276project'
//    connectionString: process.env.DATABASE_URL
});
const session = require('express-session');