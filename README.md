# NeoCMS

NeoCMS is a modern, minimalist CMS built with **Next.js**, **Prisma**, **Auth.js**, **Tailwind CSS**, and **Framer Motion**.

🎯 **Live example:** [pixelgon.cz](https://pixelgon.cz)  
🔐 The admin interface is inaccesible.

---

## ✨ Technologies

- **Next.js (App Router)** – fullstack React framework
- **Prisma** – ORM for PostgreSQL
- **Auth.js** – GitHub OAuth authentication
- **Tailwind CSS** – utility-first CSS framework
- **Framer Motion** – animations
- **PostgreSQL** – relational database
- **Docker + Docker Compose** – deployment

---

## 🚀 Docker Installation

1. **Create a `.env` file in the project root:**

```env
NODE_ENV="production"
ADMIN_EMAIL="pixelgon@pixelgon.cz"

# GitHub OAuth
GITHUB_ID=""
GITHUB_SECRET=""

# Database (adjust as needed)
DATABASE_URL="postgresql://user:password@db:5432/NeoCMS"

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GA_MEASUREMENT_ID=""

# Email (for notifications)
SMTP_USER="noreply@pixelgon.cz"
SMTP_PASS=""

# Application URLs
BASE_URL="https://pixelgon.cz"
NEXTAUTH_URL="https://pixelgon.cz"
```

2. **Build the Docker image:**

```bash
docker compose build
```

3. **Run the service:**

```bash
docker compose up -d
```

---

## 🛠 How to Use NeoCMS?

- Access the **admin panel** at: `/pxlgn`
- Log in using a **GitHub account** with the email specified in `ADMIN_EMAIL`.

---

## 📁 Project Data Structure

Each project includes:
- Title
- Slug
- Description
- Background image
- Cover image
- Rich-text body (WYSIWYG editor)
- Tags
- Visibility (published/unpublished)

---

## 📸 Uploads

- Uploaded images are saved in the `uploads/images` folder.
- Ensure this folder has write permissions in production.

---

## 💡 Development Tips

- To run in development mode:

```bash
pnpm dev
```

---

## 📄 License

This project is licensed under the MIT License.  
Use at your own risk 😉

---

Made with ❤️ by [pixelgon.cz](https://pixelgon.cz)