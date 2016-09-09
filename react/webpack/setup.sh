#!/bin/sh

###############################################################################
## Environment Valiable
###############################################################################



###############################################################################
## Webpack Environment
###############################################################################
#http://sa-inu.hatenablog.com/entry/2016/06/05/231250

#React
#babel
#webpack (instead of Browserify)

###############################################################################
# Run
###############################################################################
# $ webpack-dev-server --progress --colors --hot
# npm run pack
# http://localhost:8080/


###############################################################################
## Setup
###############################################################################
#mkdir todo
#cd todo
npm init

npm i -S react react-dom
npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react webpack
#npm install webpack-dev-server -g
npm i -D webpack-dev-server

mkdir components
mkdir components/layouts
mkdir components/memos

touch webpack.config.js
touch index.html
touch main.js
touch components/app.jsx
touch components/layouts/header.jsx
touch components/layouts/footer.jsx
touch components/memos/memo_box.jsx

cat <<EOF > index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Todo</title>
  </head>
  <body>
    <!-- この中にコンポーネントを追加してく -->
    <div id='root' class='wrapper'></div>
    <!-- webpackによってパッケージ化されたjsを読み込む -->
    <script src="bundle.js"></script>
  </body>
</html>
EOF


cat <<EOF > main.js
import App  from './components/app.jsx'
EOF


cat <<EOF > components/app.jsx
import React     from 'react'
import ReactDOM  from 'react-dom'
import Header    from './layouts/header.jsx'
import Footer    from './layouts/footer.jsx'
import MemoBox   from './memos/memo_box.jsx'


export default class App extends React.Component {
  render() {
    return (
      <div className='contents'>
        <Header />
        <MemoBox />
        <Footer />
      </div>
    );
  };
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
EOF


cat <<EOF > components/layouts/header.jsx
import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <h1>Todo</h1>
      </header>
    );
  }
}
EOF


cat <<EOF > components/layouts/footer.jsx
import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className='footer'>
        <p class='copyright'>
         copyrighter
        </p>
      </footer>
    );
  }
}
EOF

cat <<EOF > components/memos/memo_box.jsx
import React from 'react';
import ReactDOM from 'react-dom';

export default class MemoBox extends React.Component {
  render() {
    return (
      <div className='memo_box'>
        Memo Box component
      </div>
    );
  }
}
EOF


cat <<EOF > webpack.config.js
module.exports = {
  entry: './main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
EOF


# rewrite package.json
cp -r package.json package.json.bk

PACK="webpack-dev-server --progress --colors --hot"
LINT="eslint src/*.js"

cat package.json |
jq --arg WATCH "$PACK" --arg LINT "$LINT" 'to_entries |
    map(if .key == "scripts"
        then . + {"value":
                    {
                      "pack": $PACK,
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
