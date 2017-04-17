# What's?

* 画像やcss、javascriptといったファイルへのリクエストをサーバ側で中継する場合、どのようにレスポンスする必要があるかを検証したコード  
* javascriptからファイルを非同期リクエストする際に、任意のヘッダをセットしたい場合のコード  

## Installation

```
npm install
AZURE_STORAGE_CONNECTION_STRING="XXX" node app.js
```

## URL

* Hello World  
  http://localhost:3000/
* Get test page  
  http://localhost:3000/static/
  * Get azure blob  
    http://localhost:3000/azure/test.png
  * Get image content  
    http://localhost:3000/assets/test.png
  * Get css content  
    http://localhost:3000/assets/style.css
  * Get javascript content  
    http://localhost:3000/assets/test.js
  * Get html content  
    http://localhost:3000/assets/iframe.html

## Ref

* [Set custom header for the request made from <img/> tag](http://stackoverflow.com/questions/27000152/set-custom-header-for-the-request-made-from-img-tag)
* [Node.js から BLOB ストレージを使用する方法](https://docs.microsoft.com/ja-jp/azure/storage/storage-nodejs-how-to-use-blob-storage)
* [Azure Blob Storage and Node: Downloading Blobs](http://willi.am/blog/2014/07/03/azure-blob-storage-and-node-downloading-blobs/)
* [node.js　html、CSS、画像ファイルなどの読み込みについて](https://teratail.com/questions/23633)
* [Writing image to servlet response with best performance](http://stackoverflow.com/questions/2979758/writing-image-to-servlet-response-with-best-performance)
