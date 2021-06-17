### From P.112

### [イニシャルソースコード](https://github.com/jinyongnan810/refactoring/commit/41f283574bbac4c8e98adb0255d0e8fa43eaabe3)

### [スコープ外の変数がない場合](https://github.com/jinyongnan810/refactoring/commit/7fcedbc19a0a6a40cdada2a58be63afc67887449)

### [ローカル変数を利用している場合](https://github.com/jinyongnan810/refactoring/commit/738e182312e2ae000cf3620ff6dd87166626d0cc)

- JS の closure つかって、変数パスしないこともできるが、共通的な方式を辿って変数を渡すことにする

### ローカル変数の再代入

- [statement のスライド](https://github.com/jinyongnan810/refactoring/commit/929b9886a96538d1fefeac928dfe7545d7fb9d24)
- [変数ごと抽出、抽出した関数の中で、ほかの箇所で利用している変数を返却する](https://github.com/jinyongnan810/refactoring/commit/a6b2f5b76408ef26b284b335c0c06ba3f22a6de9)
- [抽出関数でコーディング規約による名称変更](https://github.com/jinyongnan810/refactoring/commit/a47d854bdcd9cc1bf6489bb7b5b11e2b6121d06e)

---

### 勉強になったのところ

- 小さいステップのリファクタリングを行う、そうできない場合、リファクタリングの思考を変える必要ある
- 関数抽出の時、変数のスコープを重視するべし
