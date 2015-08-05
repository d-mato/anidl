# anidl

未完成

## What's this ?

Anitubeの動画をワンクリックでダウンロード出来るChromeプラグイン

### 処理の流れのメモ

- 動画リンクで右クリック
- 「ダウンロード」を選択
- background.jsでapiを叩いて動画のurlを取得、ダウンロードを開始する
- app.jsにメッセージ？を送ってポップアップ画面を更新
- ダウンロードが終わったらbackground.jsが再びapp.jsにメッセージを送って画面更新して終わり
