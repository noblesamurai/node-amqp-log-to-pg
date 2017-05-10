# Amqp-log-to-pg [![Build Status](https://secure.travis-ci.org/noblesamurai/amqp-log-to-pg.png?branch=master)](http://travis-ci.org/noblesamurai/amqp-log-to-pg) [![NPM version](https://badge-me.herokuapp.com/api/npm/amqp-log-to-pg.png)](http://badges.enytc.com/for/npm/amqp-log-to-pg)

> Logs from an amqp queue to a postgres db.

## Purpose
Log from an arbitrary amqp queue to a postgres database.  Records are assumed
to be in JSON format.  They are insert into the specified postgres table as
`jsonb`.

## Usage
Set the env vars accordingly:
- `AMQP_URL`
- `AMQP_EXCHANGE`
- `AMQP_CONSUME` - name of queue to consume from (auto-created)
- `AMQP_ROUTING_KEY` - routing key to bind to the queue at startup)
- `DATABASE_URL` - destination db to write to
- `DATABASE_TABLE_NAME`

## Execution
`node index.js` (with env vars above set)

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

