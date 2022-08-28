# OHMYTASK

This project is a total reconstruction of a project already done, in the previous project I used `JavaScript`, `PHP8`, `SASS` and `MySQL`.
The current project uses `REACT` on the Frontend, separate from a Backend made in `Node JS`. As for Database, it is a `MongoDB`.
The purpose of the project is to create a system that allows you to create projects and tasks, where you can add collaborators registered in the system to your project.

## Structure

FrontEnd
---------
***


    ├─ public/            "public files, like images"
    ├─ src/               "source packages"
    │  ├─ api/            "Connection with api url - using Axios"
    │  ├─ components/     "It refers to JSX components that constructs Page components"
    │  ├─ context/        "Contains the provider context for the app"
    │  ├─ helpers/        "functions to help with some little helpfulls"
    │  ├─ hooks/          "hooks that works with providers for better import"
    │  ├─ layouts/        "Construct layouts for public and protected view"
    │  ├─ pages/          "Constructor pages for each page view"
    │  ├─ styles/         "Styles for the app - SASS"
    │  ├─ App.jsx         "App constructor file"
    │  └─ main.jsx        "main file"
    └─ index.html         "index file"


Backend
---------
***
