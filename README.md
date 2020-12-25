# nodejs-get-dependencies

Node.js アプリが依存しているパッケージの一覧を取得するライブラリ

## 開発環境構築

1. ```git clone``` で 本リポジトリを clone する  
2. nodejs-get-dependencies をビルド (```npm install``` & ```tsc```)  


## テスト

1. nodejs-get-dependencies をビルド  
3. dist/jsonfile/ に package.json と package-lock.json を配置 
4. ```node dist/test.js```  を実行  

## デバッグ

ChromeDevTools でデバッグする方法  
1. Chrome のアドレスバーに chrome://inspect を入力  
2. Devicesメニューから Open dedicated DevTools for Node をクリック  
3. ターミナルで ```$ node --inspect-brk dist/test.js``` を実行
