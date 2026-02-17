# Action For Ukraine - Email Your Representative

A privacy-focused, open-source tool to help citizens easily contact their elected representatives (MPs, Députés, MEPs) to advocate for stronger support for Ukraine.

![Action For Ukraine Screenshot](/assets/logo.png)

## 🎯 Mission

To empower individuals to make their voices heard. We believe that direct communication with elected officials is one of the most effective ways to influence policy. This tool removes the friction of finding contact details and drafting emails, making it easier for everyone to take action.

## ✨ Features

* **Find Your Representative**:
  * 🇬🇧 **UK**: Search by Postcode, Name, or Constituency (using [postcodes.io](https://postcodes.io)).
  * 🇫🇷 **France**: Search by Department or Name.
  * 🇪🇺 **EU**: Search by Member State or Name.
* **Smart Templates**: detailed, professional, and impactful email templates covering key issues (Military Aid, Sanctions, Victory Strategy).
* **Privacy First**: No database. No tracking. Your personal data (name, postcode) is processed entirely in your browser and is *never* sent to our servers.
* **Direct Email**: Opens your default email client (Outlook, Mail, Gmail, etc.) with the message pre-filled. We don't send emails on your behalf, ensuring they come directly from *you*.

## 🛠️ Tech Stack

* **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Deployment**: Static site (Vercel/Netlify compatible)

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/action4ukr.git
    cd action4ukr
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🤝 Contributing

Contributions are welcome! Whether it's fixing a bug, adding a new email template, or improving the translation.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 🔒 Security

* **CSP**: Content Security Policy enforced.
* **No Analytics**: We do not use Google Analytics or any third-party trackers.
* **Open Source**: The code is transparent and auditable.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
