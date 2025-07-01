# **HushHub Anonymous Message**

## **App Description**

**HushHub Anonymous Message** is a full-stack web application that enables users to send and receive anonymous messages securely and privately. Built with a Laravel 12 backend for API handling and authentication, and a reactive Vue 3 frontend powered by Vite and Tailwind CSS for a lightning-fast user experience.

Designed with privacy and simplicity in mind, it uses **JWT-based authentication** for secure, stateless API communication. The frontend delivers a seamless Single Page Application (SPA) experience with Vue 3, Pinia, and Vue Router — fully responsive, modern, and optimized.

---

## **Tech Stack Breakdown**

### Backend — Laravel API Stack

* **Laravel 12** — API backend, authentication, routing, and database logic.
* **JWT Authentication (`tymon/jwt-auth`)** — Stateless token-based authentication.
* **Laravel Tinker** — Interactive REPL for backend operations.
* **Laravel Pail** — Real-time backend logs for debugging.
* **PHPUnit** — Backend unit and feature testing.
* **FakerPHP** — Dummy data generation for testing and seeding.

**Language:** PHP ^8.2
**Framework:** Laravel ^12.0
**Package Manager:** Composer

---

### Frontend — Vite + Vue Stack

* **Vue 3** — Reactive, component-based UI framework.
* **Pinia** — Lightweight state management.
* **Vue Router** — Client-side routing.
* **Vite** — Next-gen frontend tooling with lightning-fast builds.
* **Tailwind CSS 4** — Modern, utility-first CSS framework.
* **Axios** — HTTP client for API calls.
* **Day.js** — Lightweight date/time manipulation.
* **Concurrently** — Run multiple processes (backend, frontend, logs) together.

**Language:** JavaScript (ESM)
**Framework:** Vue 3
**Build Tool:** Vite
**Package Manager:** NPM

---

## Authentication & Security

* **JWT (JSON Web Tokens)** — Stateless, secure API communication between frontend and backend.

---

## Architecture Overview

* **Backend:** RESTful API (Laravel 12 + JWT)
* **Frontend:** SPA (Vue 3 + Vite + Tailwind CSS)
* **State Management:** Pinia
* **Routing:** Vue Router (Client-side) + Laravel (API)
* **API Communication:** Axios (JSON-based REST)
* **Authentication:** JWT
* **Dev Environment:** Concurrently + Laravel Pail

---

## **Setup Guide with JWT**

### Requirements

* **PHP >= 8.2**
* **Composer**
* **Node.js & NPM**
* **MySQL / PostgreSQL / SQLite**
* *(Optional)* Laravel globally installed

---

### Project Setup

#### 1. **Clone the Repository**

```bash
git clone https://github.com/nocturnalDev11/HushHub-Anonymous-Message.git
cd HushHub-Anonymous-Message
```

#### 2. **Install PHP Dependencies**

```bash
composer install
```

#### 3. **Install Node Dependencies (Frontend)**

```bash
npm install
npm run dev   # Or use npm run build for production
```

#### 4. **Copy .env File**

```bash
cp .env.example .env
```

#### 5. **Generate App Key**

```bash
php artisan key:generate
```

#### 6. **Generate JWT Secret**

```bash
php artisan jwt:secret
```

#### 7. **Database Setup**

* Create a database.
* Configure the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

#### 8. **Run Migrations**

```bash
php artisan migrate
# Optionally, run with seeders:
php artisan migrate --seed
```

#### 9. **(Optional) Create Storage Link**

```bash
php artisan storage:link
```

---

### **Running the Project Locally**

```bash
composer run dev
```

Access it via: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Authentication

This app uses **JWT (JSON Web Tokens)** for authentication.

* Upon login or registration, a token is issued.
* Include this token in your API request headers:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Troubleshooting

* **JWT Issues:** Run:

```bash
php artisan jwt:secret
```

* **Permission Errors:** Run:

```bash
chmod -R 775 storage bootstrap/cache
```

* **Cache Issues:** Clear caches:

```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## Deployment

* Build frontend for production:

```bash
npm run build
```

* Run database migrations on production.
* Set correct file and folder permissions.

---

## Credits

* Built with Laravel ❤️
* JWT powered by `tymon/jwt-auth`
* Frontend powered by Vue 3, Vite, and Tailwind CSS

---

## Support

Feel free to open issues, submit pull requests, or contribute. Happy coding!

---

## Author

> **Lutz** — Full-stack Developer
> [GitHub](https://github.com/nocturnalDev11)

---

## **TL;DR**

**HushHub Anonymous Message** is a modern anonymous messaging app powered by Laravel 12 with JWT authentication, and a Vue 3 + Vite + Tailwind CSS frontend. Scalable. Fast. Secure. Private.