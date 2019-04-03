System Context
==============

```
+----------+     +--------------+
|          |     |              |
|  Dancer  |     |  Maintainer  |
|          |     |              |
+-----+----+     +------+-------+
      |                 |
      +------+    +-----+
             |    |
           +-+----+-+     +---------------+
           |        |     |               |
           | OpenDJ +-----+  Party Owner  |
           |        |     |               |
           +-+----+-+     +---------------+
             |    |
         +---+    +----+
         |             |
+--------+---+      +--+--------+
|            |      |           |
|  Provider  |      |  Backend  |
|            |      |           |
+------------+      +-----------+
```




Actors
------

* Dancer (Human) - a person influencing the track selection. There may be multiple dancers. The dancers connect to OpenDJ via internet.
* Maintainer (Human) - a person choosing the final track selection based on user input. There may be multiple dancers. The maintainers connect to OpenDJ via internet.
* Party Owner (Human) - a person responsible for an event where music is being played. There may be multiple party owners.
* Provider (Service) - a music streaming service such as iTunes, Spotify, Amazon Music, ... that is the actual music content source. There may be multiple Providers. OpenDJ connects to a Provider via Internet.
* Backend Device (Service) - an endpoint attached to a speaker where music is playing. There may be multiple backends. Whether the Backend Device is actually attached to the system or only an identifier within the Provider (and therefore not part of the system context) is a decision to be taken later.
