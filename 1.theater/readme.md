### [Starter コード](https://github.com/jinyongnan810/refactoring/commit/0df33e535d47bc479a904ed3caa258feec0d62e1)

- コンパイラへの影響はほぼないが、人間にとってコードが綺麗な方が修正しやすい
- リファクタリング原動力 1：現在のコードの出力形式を増やしたい場合、コード全体をコピペが必要になり、コピペが災いの元になる。
- リファクタリング原動力 2：演劇の種類を増やしたい場合、上記のコピペのためコピペ先も修正が必要

### リファクタリング第一歩

- テストを準備し、以降のリファクタリングでバグが生れないようにする

---

### 関数の分割(関数の構造化、関数の抽出)

- 最初の Refactoring はコードを構造化し、プログラムが何を行っているか容易に解読できるようにする

#### [金額計算(Switch 部分)ロジックの抽出](https://github.com/jinyongnan810/refactoring/commit/506d24ed6c25bf272af4a8dbe51ec77cf57f3920)

- 関数を抽出する際には、変数のスコープを見定める必要がある

##### [変数名の変更](https://github.com/jinyongnan810/refactoring/commit/f823ac0bda8dfccffbcfc4fe655c374f71fcef1f)

- 抽出された関数がより分かりやすくするように、変数名を変えてロジックを明確にする
- 返答値名称を`result`に変更し、引数の`pref`を`aPerformance`という型の名称に変更する

##### 変数の削除

- 目的：一時変数を削除し、ローカルスコープの変数量を減らす
- Step 1:[間に合わせによる一時変数の置き換え](https://github.com/jinyongnan810/refactoring/commit/d78fe96d421913474b24f2b53af18eca7db2f9f6#diff-dd9e87fcdc315898d854026f42e7454b873ba7446e84c7b01f534e38229ef7ae)
- [間違えを fix](https://github.com/jinyongnan810/refactoring/commit/4cdda5376fe08f4f3ccd31b2c96f998d37eeaa02#diff-dd9e87fcdc315898d854026f42e7454b873ba7446e84c7b01f534e38229ef7ae)
- Step 2:[変数のインライン化](https://github.com/jinyongnan810/refactoring/commit/8b29d090a2fb481bd408f9fe8de73cb23aecadba) (thisAmount の削除もあったが、個人的に過剰だと思ってスキップ)

#### ポイント計算ロジックの抽出

- [ロジックそのまま抽出、抽出中身の変数名を分かりやすくする](https://github.com/jinyongnan810/refactoring/commit/3844195d4dc232c7acb1f8cbfc48a22067bb30ee)

#### [金額フォーマットロジックの抽出](https://github.com/jinyongnan810/refactoring/commit/8ef4740efaf028006aff2362d617931a2de0f31a#diff-dd9e87fcdc315898d854026f42e7454b873ba7446e84c7b01f534e38229ef7ae)

- 関数名を一目で分かるように`usd`と名づける

#### ポイント集計変数の削除

- Step1&2: [`ループの分離`と`ステートメントのスライド`](https://github.com/jinyongnan810/refactoring/commit/9c42ffe3c614b3f78a6f1f30d5e1a4c920c32bfa#diff-dd9e87fcdc315898d854026f42e7454b873ba7446e84c7b01f534e38229ef7ae)
- Step3&4: [`関数の抽出`と`変数のインライン化`](https://github.com/jinyongnan810/refactoring/commit/44a36348a46f08608c6628c5a4ec896dd88cd747)
- ループ分離でパフォーマンスへの影響は実際のところ要検討

#### [金額修正変数の削除](https://github.com/jinyongnan810/refactoring/commit/19fd25df7e31c6bcbb742244673b31685e9095aa#diff-dd9e87fcdc315898d854026f42e7454b873ba7446e84c7b01f534e38229ef7ae)

- 上記と同じように、金額集計ロジックを抽出

#### 今までの疑問点

- P21 の修正になると、金額が 2 回計算されて、コードをよくする主旨と矛盾する

---

### フェーズの分割

#### [計算ロジックと出力ロジックを分割する](https://github.com/jinyongnan810/refactoring/commit/da00e21bcff62b5c0d7d1f7704d674a92ad4d050)

- まずは出力ロジック用の関数だけ分ける

#### 出力ロジック用のデータ構造を作成する

- [まずは空のオブジェクトからスタート](https://github.com/jinyongnan810/refactoring/commit/8d47abec6dcd3f6ffbc0767649e4aab2b805c13a)
- [customer 情報を出力ロジック用のデータに入れる](https://github.com/jinyongnan810/refactoring/commit/edc1ac5397f1406f1f75dbec427c2406d7cbffe2)
- [performance 情報と play 情報を出力ロジック用のデータに入れる](https://github.com/jinyongnan810/refactoring/commit/61798e93c3075b718b6985d822a79c9c6534f066)
- [金額とポイント計算を performance 情報に入れ、総計を出力ロジック用のデータに入れる](https://github.com/jinyongnan810/refactoring/commit/3e8977f76d580448e3ace4ec17c957e135c797ba)
- [パイプラインによるループの置き換え](https://github.com/jinyongnan810/refactoring/commit/cab3f389969dffd82192603651e75863a335fa25)

#### 計算ロジックを抽出

- [statement 関数から計算ロジック関数を抽出する](https://github.com/jinyongnan810/refactoring/commit/90e6f0334deb6722eb4f0b0ca37c9a669f2b0a54)

#### [ファイルを分離する](https://github.com/jinyongnan810/refactoring/commit/7095d5736b02ad306aabd42ab5235f8da8aebb80)

#### [新規出力方式(HTML)を追加する](https://github.com/jinyongnan810/refactoring/commit/2e304fe867df0dd0e483a628360888d6a5c5313c)

---

### 型による計算処理の再編成

#### [簡易計算クラスを作成](https://github.com/jinyongnan810/refactoring/commit/403c674dffd8ac5575fe041aa18a1ccd9d8c9052)

#### 計算ロジックをクラス内に移動
