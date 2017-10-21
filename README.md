# Start-Here

This is a simple boilerplate for setting up my projects.

## How to start

You'll need NodeJS and Gulp to fire up a localhost server that will automatically restart every change you make on the files. Browser-Sync helps doing this magic.

## Folders and files structure

- assets
  - images, font files and assets in general
- scripts
  - js files
- styles
  - less files
- src
  - where the compiled files will be
- .gitignore
- gulpfile.js
- index.html
- package.json
- README.md


## Gulp tasks

On the gulpfile you'll find the folders and files on the *appFiles* object. Any new folder or major change in the structure you have to put there.

- **gulp clean** - Remove the files on the src folder.
- **gulp css** - Compile .less files, concat in *style.css* and send to the src folder.
- **gulp js** - Concat js files in *script.js* and send to the src folder.
- **gulp reload** - auto reload the browser
- **gulp serve** - Run the css and js tasks, fire up a server with browsersync on the root directory. Auto restart on changes in the css and js files.
- **gulp** - Run the serve task by default.


> *My workflow is in development and might have some changes in the future*
