/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let map = {};
  for (let i = 0; i < transactions.length; i++) {
    if (!map[transactions[i].category]) {
      let solVal = { category: transactions[i].category, totalSpent: transactions[i].price };
      map[transactions[i].category] = solVal;
      } else {
      let lastVal = map[transactions[i].category];
      lastVal.totalSpent = lastVal.totalSpent + transactions[i].price;
      map[transactions[i].category] = lastVal;
    }
  }
  let sol = Object.values(map);
  return sol;
}

module.exports = calculateTotalSpentByCategory;
