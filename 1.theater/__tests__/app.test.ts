import { htmlStatement, statement } from "../app";
import { invoiceData, playData } from "../data";
describe("theater", function () {
  test("normal", function () {
    const result = statement(invoiceData[0], playData);
    const expected = `Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
    expect(result).toEqual(expected);
  });
  test("htmlNormal", function () {
    const result = htmlStatement(invoiceData[0], playData);
    const expected = `<h1>Statement for BigCo</h1>
<table>
<tr><th>Play</th><th>Seats</th><th>Cost</th></tr><tr><td>Hamlet</td><td>$650.00</td><td>55</td></tr>
<tr><td>As You Like It</td><td>$580.00</td><td>35</td></tr>
<tr><td>Othello</td><td>$500.00</td><td>40</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>
`;
    expect(result).toEqual(expected);
  });
});
