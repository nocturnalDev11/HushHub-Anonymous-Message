## 🚀 Setup Guide with JWT 

### Requirements

* PHP >= \[check your Laravel version requirement]
* Composer
* Node.js & NPM
* MySQL / PostgreSQL / SQLite
* Laravel ^\[version] installed globally (optional)

---

## Project Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/nocturnalDev11/HushHub-Anonymous-Message.git
cd HushHub-Anonymous-Message
```

---

### 2. **Install PHP Dependencies**

```bash
composer install
```

---

### 3. **Install Node Dependencies (Frontend)**

```bash
npm install
npm run dev   # or npm run build for production
```

---

### 4. **Copy .env File**

```bash
cp .env.example .env
```

---

### 5. **Generate App Key**

```bash
php artisan key:generate
```

---

### 6. **Generate JWT Secret**

```bash
php artisan jwt:secret
```

---

### 7. **Database Setup**

* Create a database.
* Configure `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

---

### 8. **Run Migrations**

```bash
php artisan migrate
# Optional with seeders:
php artisan migrate --seed
```

---

### 9. **(Optional) Create Storage Link**

```bash
php artisan storage:link
```

---

### 🔥 **Running the Project**

```bash
php artisan serve
```

Access: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Authentication

This project uses **JWT (JSON Web Tokens)** for authentication.

* After registering/login, you'll receive a token.
* Use this token in headers for protected routes:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Troubleshooting

* **JWT Issues:** Run `php artisan jwt:secret` again.
* **Permissions:** If file permission errors occur:

```bash
chmod -R 775 storage bootstrap/cache
```

* **Cache Problems:** Clear caches:

```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## Deployment

* Use `npm run build` for production assets.
* Run migrations on production DB.
* Set correct permissions.

---

## Credits

* Built with Laravel ❤️
* JWT powered by `tymon/jwt-auth`

---

## Support

Feel free to open issues or submit pull requests. Happy coding!

---

## 🚀 Author

> Lutz – Full-stack Developer

---
