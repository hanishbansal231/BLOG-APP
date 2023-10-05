# Blog App

### Setup instruction

1. Clone the project

```
   git clone https://github.com/hanishbansal231/BLOG-APP.git
```

2. Move into the directory

```
    cd .\client\
```

3. install dependencies

```
   npm i 
```

4. Run the server

```
   npm start
```

### Setup instructions for tailwind

[Tailwind official instruction document](https://tailwindcss.com/docs/installation)

1. Install tailwindcss

```
   npm install -D tailwindcss 
```

2. Create tailwind config file

```
   npx tailwindcss init
```

3. Add file extensions to tailwind config file in the contents property

```
   "./index.html","./src/**/*.{html,js,jsx}"
```

4. Add the tailwind directives at the top of the `index.css` file

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Adding plugins and dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons axios react-hot-toast 
```

