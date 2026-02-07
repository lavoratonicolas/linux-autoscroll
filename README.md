# 🐧 Linux Autoscroll (Wayland & X11)

> **Bring the classic Windows-style middle-click autoscroll to Linux browsers.**

![License](https://img.shields.io/github/license/lavoratonicolas/linux-autoscroll)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

If you've switched from Windows to Linux, you probably miss one specific feature: clicking the scroll wheel to navigate pages smoothly. Chromium browsers on Linux (Wayland/X11) often lack this native functionality.

**Linux Autoscroll** fixes this by injecting a lightweight, high-performance script that emulates this behavior perfectly.

## ✨ Features

* **Universal Support:** Works on any website, including modern SPAs (Single Page Applications).
* **Smart Detection:** 🧠 Intelligently ignores clicks on links, buttons, inputs, and interactive elements so you can still use the middle click to open tabs.
* **Wayland Native:** Optimized for GNOME/KDE on Wayland (and X11).
* **Configurable Speed:** Includes a popup menu to adjust scroll sensitivity/inertia.
* **Visual Feedback:** Displays a clean, Windows-style visual indicator.
* **Dark/Light Mode:** The settings menu adapts to your system theme.

## 🚀 Installation

Since this extension is not yet on the Chrome Web Store, you can install it manually in developer mode:

1.  **Clone or Download** this repository:
    ```bash
    git clone [https://github.com/lavoratonicolas/linux-autoscroll.git](https://github.com/lavoratonicolas/linux-autoscroll.git)
    ```
2.  Open your browser (Chrome, Brave, Edge).
3.  Go to `chrome://extensions/`.
4.  Enable **Developer mode** (top right corner toggle).
5.  Click **Load unpacked**.
6.  Select the folder where you cloned/downloaded this repository.

## 🎮 How to Use

1.  **Activate:** Click the **Middle Mouse Button (Scroll Wheel)** on any empty space of a webpage.
2.  **Scroll:** Move your mouse up, down, left, or right. The further you move from the center, the faster it scrolls.
3.  **Deactivate:** Click any mouse button to stop.

> **Note:** Due to browser security restrictions, extensions cannot run on internal pages like `chrome://settings` or the "New Tab" page.

## ⚙️ Configuration

Click the extension icon in your browser toolbar to open the settings:

* **Scroll Sensitivity:** Adjust the slider to make the scroll faster or slower.
    * *Lower value = Faster response.*
    * *Higher value = Slower, more precise control.*
* **Github Link:** Quick access to this repository.

## 🛠️ Tech Stack

* JavaScript (Chrome Extension API)
* HTML5 / CSS3 (CSS Variables for theming)
* Manifest V3

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/lavoratonicolas/linux-autoscroll/issues).

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Copyright (c) 2026 lavo