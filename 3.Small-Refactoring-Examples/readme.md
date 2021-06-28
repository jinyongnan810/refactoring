# 関数のインライン化(p.123)

- [最初の状態](https://github.com/jinyongnan810/refactoring/commit/7bc45fafed5bcbe39e1c88af40aef0f52060c10b)
- [インライン化後](https://github.com/jinyongnan810/refactoring/commit/f2527190bb797c05e89c41db97b4a043522f39c5)

# 変数の抽出(p.125)

- [最初の状態](https://github.com/jinyongnan810/refactoring/commit/a238dbc7cc7fe5e0f5ad3aa69a586199a1358a88)
- [変数の抽出](https://github.com/jinyongnan810/refactoring/commit/90ea4a3e975b2612049d35edb023c0b0b45bbb02)

# 変数のインライン化(p.129)

- 名前が式以上のことを語らない場合、変数のインライン化を考慮する

```ts
let basePrice = anOrder.basePrice;
return basePrice > 1000;
->
return anOrder.basePrice > 1000;
```

# 変数のカプセル化(p.138)

- [最初の状態](https://github.com/jinyongnan810/refactoring/commit/7e10fb8e37dedec1c2770eba44e6d6794b08e256)
- [カプセル化](https://github.com/jinyongnan810/refactoring/commit/230df4bf528e5dc3f4984880afc5ac900784eb5b)

# パラメータオブジェクトの導入(p.146)

- [最初の状態](https://github.com/jinyongnan810/refactoring/commit/eef4985100a09e5852b951ac90fb51b7bcb07445)
- Value Object の作成
