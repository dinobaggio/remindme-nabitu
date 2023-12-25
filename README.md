# RemindMe - How to run application

### Minimum Requirement:
```bash
#php
"php": "^8.1",
"composer": "^2.5",
# nodejs
"npm": "^8.19",
"node.js": "^16.20",
```

### Adjust credentials for email with what you have
```bash
cp src/.env.example src/.env
# MAIL_MAILER=smtp
# MAIL_HOST=sandbox.smtp.mailtrap.io
# MAIL_PORT=2525
# MAIL_USERNAME=c92b75a26d22ba
# MAIL_PASSWORD=ce7b82ccc7343e
```

### Run Command:

```bash
sh build.sh # build app and up docker compose
sh migrate.sh # and then migrate database. make sure the docker container database is fully running
sh worker.sh # run worker for excecute job mail notif
# access application on localhost:80
```

# RemindMe - Laravel Challenge

Welcome to Nabitu take home challenge!

In this repository you will find API specification & scaffolding code for the web app named `RemindMe`.

`RemindMe` is a simple web app that allows users to create reminder for their schedules. It will send email notification to the user when the reminder is due.

You can check the API specification for this web app in [`rest_api.md`](./docs/rest_api.md).

## Your Mission

1. Build the web app based on specification written in `README.md` and [`rest_api.md`](./docs/rest_api.md). **Treat it as an MVP**. For the backend you must use **[Laravel Framework](https://laravel.com/)**. For the frontend you can use any framework you like or even just vanilla HTML, CSS, & Javascript. You can use [Laravel Blade](https://laravel.com/docs/10.x/blade) as well but make sure it completely uses the REST API.
2. Dockerize your system & make sure it can run with full functionality using [Docker Compose](https://docs.docker.com/compose/) in Linux-like environment. We will test your system in Ubuntu or MacOS during review.
3. Write automated testing for your backend. At the very minimum you must implement unit testing (not feature testing). If you can write automated testing for your frontend as well, that would be great.
4. Implement CI pipeline for your system. We recommend using [Github Actions](https://github.com/features/actions), but you can use any CI tool you like.

## Evaluation

We will evaluate your submission based on these criteria:

1. The quality of your web app experience from end-user perspective.
2. The correctness of your implementation according to the specification docs.
3. Your choice of tradeoffs during development based on both business & technical perspective.
4. Readability, maintainability, & testability of your code.
5. The quality of your workflow when using Github to develop the web app. This includes the quality of your commit messages, pull requests, & branch naming.

## Submission

1. Fork this repository & do your work in your own forked repository.
2. Submit your CV in PDF along with the URL of your forked repository to [this page](https://ghazlabs.com/nabitu/senior-backend-engineer-laravel.html).
3. We will review your submission & get back to you as soon as possible.

> **Note:**
>
> If you have any questions regarding this challenge, please don't hesitate to open an issue in this repository.