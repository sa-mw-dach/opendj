Architecture Overview
=====================

```
+----------+        +--------------+     +---------------+
||        ||        ||            ||     ||             ||
|| Dancer ||        || Maintainer ||     || Party Owner ||
||        ||        ||            ||     ||             ||
+----+-----+        +------+-------+     +-------+-------+
     |                     |                     |
+------+-------+    +--------+--------+   +--------+---------+
|              |    |                 |   |                  |
|  Dancer UI   |    |  Maintainer UI  |   |  Party Owner UI  |
|              |    |                 |   |                  |
+-------+---+--+    +--------+--------+   +------------------+
      |   |                |
      |   +-----------+    |
      |               |    |
   +--+------+    +---+----+-----------+   +--------------+
   |         |    |                    |   |              |
   |  Track  |    |  Playlist Service  +---+   Thelxiope  |
   |         |    |                    |   |              |
   +-----+---+    +---+-------------+--+   +--------+-----+
         |            |             |               |
         |        +---------------------------------+
         |        |   |             |
    +----+--------+---+---+     +---+----------------+
    |                     |     |                    |
    |  Provider Boundary  |     |  Backend Boundary  |
    |                     |     |                    |
    +----------+----------+     +---------+----------+
               |                          |
         +-----+------+             +-----+-----+
         ||          ||             ||         ||
         || Provider ||             || Backend ||
         ||          ||             ||         ||
         +------------+             +-----------+
```


* Dancer UI
* Maintainer UI
* Party Owner UI
* Track Service
  * Retrieve Track Metadata
  * Search Track by Metadata
* Playlist service
  * Add/Remove Track
  * Vote Track Up/Down
* Thelxiope
  * Maintains player state in playlist, reconciles reality with desired state
* Provider
  * Interface to provider implementation, e.g. Spotify
* Backend Boundary
  * Interface to player device, e.g. on RasPi
