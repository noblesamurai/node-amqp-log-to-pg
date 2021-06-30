# amqp-log-to-pg
> Logs from an amqp queue to a postgres db.

## Purpose
Log from an arbitrary amqp queue to a postgres database.  Records are assumed
to be in JSON format.  They are insert into the specified postgres table as
`jsonb`.

## Usage

There are two possible ways to use it. You can run the module directly from node, or you can `require()` it and pass in
some config and get lifecycle management using the exported methods.

If you run it directly, the module would look for the listed environment variables.  If you `require()` it, you must pass
the config in as an object.

Once started up, it listens on the specified queue and writes the json
payload it receives to the db (one row per payload).

### Config

Set the env vars (if using the repo directly).
- `AMQP_URL` - e.g. `amqp://myhost/blah`
- `AMQP_EXCHANGE` - amqp exchange name
- `AMQP_CONSUME` - name of queue to consume from (auto-created)
- `AMQP_ROUTING_KEY` - routing key to bind to the queue at startup)
- `DATABASE_URL` - destination db to write to
- `DATABASE_TABLE_NAME` - e.g. `my_logs`

or else:

```js
const config = {
  db: 'postgres://...',
  amqp: {
    url: 'amqp://...',
    exchange: 'exchange-name',
    queue: {
      name: 'queue-name',
      routingKey: 'will-bind-queue-to-this'
    })
  }),
  tableName: 'your_table_name'
}
```


### By checking out the repo

It's set up to run out of the box on heroku.  You can check out the repo and push it to heroku.
`Procfile` is set to run `node src/index`.  But you can easily run it using docker or whatever.
(Make sure you set the env vars for this way of running.)

NB: If you are running on heroku, see [here for SSL settings you
need](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js).
### As a module

```
$ npm install amqp-log-to-pg
```
```js
(async => {
  const { init, consume, shutdown } = require('amqp-log-to-pg');
  const config = { /* see above for config format */ };

  await init(config); // connects to db, connects to rabbitmq, run unrun migrations
  consume(); // starts operation
  /*...*/m
  await shtudown(); // close connections to db + rabbitmq
})();
```

## License

The BSD License

Copyright (c) 2017, Tim Allen

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Tim Allen nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

