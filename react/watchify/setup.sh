#!/bin/sh

###############################################################################
## Environment Valiable
###############################################################################



###############################################################################
## Watchify Environment
###############################################################################
#http://mae.chab.in/archives/2765

#React
#babel
#watchify (Browserify)
#babelify (for ES6 and jsx)
#http-server
# or
#watchify-server

###############################################################################
# Run
###############################################################################
# npm run watch
# npm run build
# npm run web
# open index.html
# http://localhost:8080/


###############################################################################
## Setup
###############################################################################
npm init

npm install -g eslint
 
npm i -S react react-dom
npm i -D watchify
npm i -D babelify
npm i -D exorcist
npm i -D browserify
npm i -D envify
npm i -D uglify-js

npm i -D babel-core babel-loader webpack
npm i -D babel-preset-es2015 babel-preset-react
#npm i -D webpack-dev-server

# webserver
npm i -D http-server
#npm i -D watchify-server

# .babelrc
touch .babelrc
cat <<EOF > .babelrc
{
  "presets": ["react", "es2015"]
}
EOF

# rewrite package.json
cp -r package.json package.json.bk

WATCH="watchify -t babelify ./main.js -o ./bundle.js"
BUILD="NODE_ENV=production browserify ./main.js -t babelify -t envify > ./bundle.js"
LINT="eslint src/*.js"
WEB="http-server -o"

cat package.json |
jq --arg WATCH "$WATCH" --arg BUILD "$BUILD" --arg WEB "$WEB" --arg LINT "$LINT" 'to_entries |
    map(if .key == "scripts"
        then . + {"value":
                    {
                      "watch": $WATCH,
                      "build": $BUILD,
                      "web": $WEB,
                      "lint": $LINT
                    }
                 }
        else .
        end
    ) | from_entries' |
jq 'del(.main) | del(.keywords) | del(.author) | del(.license)' >> tmp.json

rm -rf package.json
mv tmp.json package.json
rm -rf tmp.json











