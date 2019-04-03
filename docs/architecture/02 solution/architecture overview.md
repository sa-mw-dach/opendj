Architecture Overview
=====================

```
+----------+        +--------------+     +---------------+
||        ||        ||            ||     ||             ||
|| Dancer ||        || Maintainer ||     || Party Owner ||
||        ||        ||            ||     ||             ||
+----+-----+        +------+-------+     +-------+-------+
     |                     |                     |
+----+---------+    +------+----------+   +------+-----------+
|              |    |                 |   |                  |
|  Dancer UI   |    |  Maintainer UI  |   |  Party Owner UI  |
|              |    |                 |   |                  |
+-----+---+----+    +------+----------+   +------------------+
      |   |                |
      |   +-----------+    |
      |               |    |
   +--+------+    +---+----+-----------+   +----------------+      +-----------------+
   |         |    |                    |   |                |      |                 |
   |  Track  |    |  Playlist Service  +---+   PlaybackCtl  +------+  Event Service  |
   |         |    |                    |   |                |      |                 |
   +-----+---+    +---+-------------+--+   +--------+-------+      +-----------------+
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
  * Add/Remove Track to Playlist
  * Vote Track Up/Down
  * Create/Delete Playlist (for Event)
* Playback Control
  * Maintains player state in playlist, reconciles reality with desired state
* Event service
  * CRUD Event
* Provider
  * Interface to provider implementation, e.g. Spotify
* Backend Boundary
  * Interface to player device, e.g. on RasPi (if required)
