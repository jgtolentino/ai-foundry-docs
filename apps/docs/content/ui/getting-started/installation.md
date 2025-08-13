---
title: Installation
order: 1
summary: Learn how to set up Suqi in your project by creating a basic HTML file, adding Suqi’s CSS and JavaScript, and exploring its powerful components to build responsive and visually stunning web applications.
description: "Set up Suqi: HTML, CSS, JS, and build stunning UIs."
---

This guide will take you through the essential steps to set up Suqi in your project, from creating a basic HTML file to incorporating Suqi’s styles and scripts. Let’s dive in!

<div class="steps steps-vertical">

### Create a Basic HTML File

Begin by creating a new `index.html` file in the root of your project. This file will serve as the foundation for your Suqi-based interface. Include the basic HTML structure and a `<meta name="viewport">` tag for proper responsiveness:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Suqi demo</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

### Add Suqi CSS and JavaScript

Enhance your page by including Suqi's CSS and JavaScript files. Use the following links to load the core Suqi styles and scripts from the CDN:

```html
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler.min.css" />
<script src="{{ cdnUrl }}/dist/js/tabler.min.js"></script>
```

Update your HTML file to include these resources:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Suqi Demo</title>
    <link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler.min.css" />
  </head>
  <body>
    <h1>Hello, Suqi!</h1>
    <script src="{{ cdnUrl }}/dist/js/tabler.min.js"></script>
  </body>
</html>
```

This setup includes the Suqi CSS and JavaScript via a CDN, providing a responsive and functional base for your project.

You can also download the files and include them locally in your project. For more information, see the [Download](/ui/getting-started/download) page.

### Open in Your Browser

Save the file and open it in your browser. You should see your first Suqi-powered page! From here, you can start adding layouts and components to create a fully functional and visually appealing web application.

</div>

With these simple steps, you're ready to explore Suqi's features and build stunning web interfaces. For inspiration and guidance, you can view live demos at [preview.suqi.io](https://preview.suqi.io) and consult our [official documentation](https://docs.suqi.io) for detailed instructions and examples.