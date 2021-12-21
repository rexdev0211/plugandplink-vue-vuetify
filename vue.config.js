module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(40000000)
      .maxAssetSize(40000000)
  }
  // pages: {
  //   index: {
  //     // entry for the page
  //     entry: "src/main.js",
  //     // the source template
  //     template: "public/index.html",
  //     // output as dist/index.html
  //     // filename: 'index.html',
  //     // when using title option,
  //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "index",
  //     // chunks to include on this page, by default includes
  //     // extracted common chunks and vendor chunks.
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   },
  //   model: {
  //     // entry for the page
  //     entry: "src/model/main.js",
  //     // the source template
  //     template: "public/index.html",
  //     // output as dist/index.html
  //     // filename: 'index.html',
  //     // when using title option,
  //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "model",
  //     // chunks to include on this page, by default includes
  //     // extracted common chunks and vendor chunks.
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   }
  // }
};
