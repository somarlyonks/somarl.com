# Helper

## mongoDB

v4.0.2 community

### default file locations

- config: `/etc/mongod.conf`
- log: `/var/log/mongodb/mongod.log`
- data: `/var/lib/mongodb`

### troubleshoot

- Failed to start mongod.service: Unit mongod.service not found.

  run `sudo systemctl enable mongod`

- mongodb shutting down with code:62

  upgrade existing data files @[ref](https://docs.mongodb.com/manual/release-notes/3.6/#upgrade-procedures)

- warning about `/sys/kernel/mm/transparent_hugepage/defrag`

  disable THP @[ref](https://docs.mongodb.com/manual/tutorial/transparent-huge-pages/)
