# Rewards Demo

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [APIs](#apis)

## Tech Stack

- **Next.js 15**
- **Tailwind CSS v4**
- **MongoDB**

## Getting Started

### Prerequisites

This instruction is focused on Docker deployment on NestJS and MongoDB. Since Next.js have problems with Docker, it is deployed on [Vercel](https://vercel.com) instead.

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/LLczff/rewards-demo.git

cd rewards-demo
```

### 2. Create environmental file

This application require certain environment variables to be set. Create a `.env` file in the root of your project and add the following:

```bash
MONGO_INITDB_USERNAME = '<your_database_user>'
MONGO_INITDB_PASSWORD = '<your_database_password>'
MONGO_INITDB_DATABASE = '<your_database_name>'

# we need to create the connection string for Mongoose
MONGO_URI = 'mongodb://<your_database_user>:<your_database_password>@rewards-demo-mongodb:27017/?authSource=<your_database_name>'

BACKEND_PORT = 8000

BASE_API_URL = 'http://rewards-demo-api:8000'
```

### 3. Build and Run

Make sure you have Docker running, then execute the following command to build and start the application:

```bash
docker compose up -d
```

### 4. Access the application

Once the application is running, you should be able to access the frontend via `localhost:3000` and call backend API as port specified in the `.env` file.

MongoDB port is not expose outside container, you can change the port mapping config in [compose](docker-compose.yml) file in order to connect directly to database.

> [!NOTE]
> Next.js is the only container that run in development mode, it would take up some times to start and page transition due to their SSR behavior.

## APIs

These are the list of APIs available in backend:

1. `GET /user/random` - retreive random user

2. `GET /user/[id]` - get user by ID

3. `GET /user/[id]/coin` - get user's coin transactions

4. `GET /deal` - search deal, you can put parameter options to filter

5. `GET /deal/popular` - get popular deal

6. `GET /deal/latest` - get latest deal

7. `GET /deal/[id]` - get deal by ID

8. `POST /transaction` - save transaction when user redeem a deal
