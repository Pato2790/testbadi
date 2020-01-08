# testbadi

## Common Dependencies

- [Git].
- [NodeJS v10 & npm v6][node] (npm v6 comes installed with NodeJS v10).
- [Docker].

[docker]: https://www.docker.com/
[node]: https://nodejs.org/en/
[git]: https://git-scm.com/

## Development Dependencies

- **Linux**: Latest
  [**Docker CE**](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- **Mac**: Latest
  [**Docker EDGE**](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- Latest [**Docker-Compose**](https://docs.docker.com/v17.09/compose/install/)

## Get Started (dev environment)

- Start APP frontend at localhost ([http://localhost:3000](http://localhost:3000)):
- Start APP backend at localhost ([http://localhost:5000](http://localhost:5000)):
- Start phpmyadmin at localhost ([http://localhost:8000](http://localhost:8000)):

```bash
docker-compose up app
```

if you want to see the server logs or access to the data base with phpmyadmin

```bash
docker-compose up app backend mysql phpmyadmin
```

## Setup

This project not required a setup
