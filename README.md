## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

###Optimized Steps Taken

####While using [gruntjs](http://gruntjs.com/) utils:

css/*.css:
  *1.Added "google-font-open-sans.css". From google font file referenced in index.html. One less server callfor a render-blocking resource.
  *2.Used grunt-cssmin to minified:
  ```
  style.css -> style.min.css
  google-font-open-sands.css -> google-font-open-sands.min.css
  print.css -> print.min.css
    *Less bytes to transmits = Less transmission time.
  ```
  *3.Used: grunt-concat to combien:
  ```
  style.min.css + google-font-open-sands.min.css -> app.min.css
  ```
js/perfmatters.js:
  1.Used grunt-cssmin to minify:

#####css/*.css:
  * Added "google-font-open-sans.css". From google font file referenced in index.html. One less server call for a render-blocking resource.
  * Used grunt-cssmin to minified:

  ```
    style.css -> style.min.css
    google-font-open-sands.css -> google-font-open-sands.min.css
    print.css -> print.min.css

    Less bytes to transmits = Less transmission time.
  ```
  * Used: grunt-concat to combine:

  ```
    style.min.css + google-font-open-sands.min.css -> app.min.css
  ```

#####js/perfmatters.js:
  * Used grunt-cssmin to minify:

  ```
    perfmatters.js -> perfmatters.min.js
  ```

#####index.html:
  * Moved render blocking resource.

  ```
    * Moved Google Analytics script to the end of the page.
    * Moved perfmatters.min.js to the end of the page.
    * Made resource call for "print.min.css" Async.
  ```

  * Minified resources.
  ```
    1.Combiened all essential style sheets into one (style.css + google font resource =  app.min.css).
      * Less calls for render blocking resources leads to faster loads.
    2.Used grunt htmlmin to minify:
      index.html -> index.min.html
      *Less bytes to transmits = Less transmission time -> Faster loads.
  ```

######img/*:
  * Used grunt imagemin to minify.

  ```
    cam_be_like.jpg
    mobilewebdev.jpg
    profilepic.jpg
    views/images/pizza.png

    *Issue with views/images/pizzeria.jpg. Minification provided by google pagespeed. grunt imagemin call would invoke "EPIPE error". Working to find reason. Too large, maybe?
  ```

#####views/js/main.js:
  * Used getElementsByClassName instead of querySelectorAll, to search for 'mover' DOM elements.
  * Saved a referenced to 'movers', instead of searching for them in every frame.
  * Reduced sine calculations from 200 to 5 unique values.

###How to build Optimized Project

To build:
 ```
 $> npm install
 $> grunt build

 ```
 To run(locally):
 ```
 $> cd build/
 $> python -m SimpleHTTPServer
 ```

Link to deployed Portfolio:

https://jmenera-portfoptmzd.firebaseapp.com/