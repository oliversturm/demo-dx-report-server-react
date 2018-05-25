I had to patch a few things in `node_modules` to make this work without ejecting the create-react-app project. Here's what I did:

* In `react-scripts/config/webpack.config.dev.js` and `webpack.config.prod.js` (same path), I included these lines in the `resolve.alias` block:

```
cldr$: 'cldrjs',
cldr: 'cldrjs/dist/cldr',
globalize: 'globalize/dist/globalize'
```

These lines allow webpack to include globalize and cldr correctly. Currently, create-react-app does not have a way of doing this. Reported https://github.com/facebook/create-react-app/issues/4508, but no reaction.

* The next problem I encountered was that the two files `devexpress-reporting/html/report-designer.html` and `web-document-viewer.html` (same path) can't be included correctly by webpack, because they require `html-loader`. So I added this block to the two webpack configs (see above), right before the block for the `file-loader`.

```
{
  test: [/\.html$/],
  include: [
    path.resolve(paths.appNodeModules, 'devexpress-reporting/html')
  ],
  loader: require.resolve('html-loader')
},
```
