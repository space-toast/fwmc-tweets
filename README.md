# FUWAMOCO Tweets 🐾
Tracking Tweets by Hololive's FUWAMOCO

## Overview
This project is designed to track and display tweets from Hololive EN's FUWAMOCO. Users can search for tweets by keyword or select from a dropdown list that includes collections of events that happen on Twitter, such as Rawr N' Responses.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js and npm: You can download and install them from [here](https://nodejs.org/en/download/)
- Docker: You can download and install from [here](https://www.docker.com/get-started/)
- A clone of this repository on your local machine. You can clone it using the following command:

```bash
git clone https://github.com/space-toast/fwmc-tweets.git
```

### Installing
1. Navigate to the REST API server and install dependencies
```bash
cd fwmc-tweets
cd server
npm install
```

2. Do the same for the React app
```bash
cd web
npm install
```

### Running Locally
To run the app locally for development

1. User docker-compose to stand up a development db
```bash
docker-compose up db
```

2. Start the REST API server
```bash
cd server
npm start
```

3. Start the React app
```
cd web
npm run dev
```

### Building
To build the app, use docker-compose
```bash
docker-compose up -d --build
```

## Future development

- Add deployment pipeline via GitHub Actions
- Automate saving all Tweets daily
- Tweets pagination
- UI improvements