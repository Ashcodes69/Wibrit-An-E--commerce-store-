# 🛍️ Winrit - An E-commerce Store Built with Next.js & MongoDB

Welcome to **Winrit**, a powerful and modern full-stack e-commerce website built using:

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Node.js API Routes (built-in with Next.js)
- **Database**: MongoDB Atlas (Mongoose)
- **Authentication**: JWT-based login system
- **Security**: AES encryption for user data
- **UI Enhancements**: Toasts, loading bars, responsive design

---

## 🌐 Live Demo

🔗 [https://winrit.vercel.app](https://winrit.vercel.app)

---

## 📸 Screenshots

> Screenshots go here (update paths after uploading to repo)

### 🖥️ Homepage

![Homepage Screenshot](./screenshots/homepage.png)

### 📱 Responsive View

![Mobile View Screenshot](./screenshots/mobile-view.png)

> You can also add videos/gifs of user interaction

### 🎥 Demo Video (Optional)

[![Watch Demo](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/maxresdefault.jpg)](https://youtube.com/watch?v=YOUTUBE_VIDEO_ID)

---

## 🚀 Features

- Browse products by category (T-Shirts, Hoodies, Mugs, etc.)
- Dynamic pricing based on size/variant
- Cart management with quantity control
- Buy Now & Checkout functionality
- Auto-filled user data from JWT
- Protected routes (only logged-in users can place orders)
- Orders saved with real-time MongoDB backend
- Admin dashboard (if any)

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Languages:** TypeScript, JavaScript
- **Styling:** Tailwind CSS
- **Icons & UI:** React Icons, Toastify, Top Loading Bar
- **Auth:** JSON Web Token (JWT)
- **Encryption:** CryptoJS (AES)
- **Database:** MongoDB with Mongoose
- **Deployment:** Vercel + MongoDB Atlas

---

## 🧪 Getting Started Locally

### 1. Clone the repo

````bash
git clone https://github.com/your-username/winrit.git
cd winrit

2. Install dependencies

npm install

3. Set up environment variables

Create a .env.local file in the root:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_HOST=http://localhost:3000
AES_SECREAT=your_AES_secret
JWT_SECRET=your_JWT_secret

4. Run the app

npm run dev
Open http://localhost:3000

📦 Deployment

- Hosted on Vercel.

- Uses MongoDB Atlas for cloud database.

-- To deploy your own:

1. Push code to GitHub

2. Connect GitHub repo to Vercel

3. Add .env values in Vercel Project Settings > Environment Variables

4. Deploy!

🧾 License
This project is open-source for learning and personal use. If you'd like to use it commercially, please contact me.
email:ns730106@gmail.com

🙋‍♂️ Author
Made with ❤️ by Ashish kumar


---

### 🔧 How to Add Screenshots

1. Create a `screenshots/` folder in your repo.
2. Add your `.png` or `.jpg` files there.
3. Reference them in README like this:

```md
![Homepage Screenshot](./screenshots/homepage.png)
````
