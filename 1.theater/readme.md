### [Starter コード](https://github.com/jinyongnan810/refactoring/commit/0df33e535d47bc479a904ed3caa258feec0d62e1)

- コンパイラへの影響はほぼないが、人間にとってコードが綺麗な方が修正しやすい
- リファクタリング原動力 1：現在のコードの出力形式を増やしたい場合、コード全体をコピペが必要になり、コピペが災いの元になる。
- リファクタリング原動力 2：演劇の種類を増やしたい場合、上記のコピペのためコピペ先も修正が必要

### リファクタリング第一歩

- テストを準備し、以降のリファクタリングでバグが生れないようにする

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

#### 金額フォーマットロジックの抽出

- 関数名を一目で分かるように`usd`と名づける
