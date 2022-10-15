const _ = require("lodash");
let months = function months(){ let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
console.log(_.chunk(months, 4))

const oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(_.tail(oddNum, 9));

const Num = [4, 9, 4, 11, 7];
console.log(_.union(Num));


const key = [
    ["horror", "The Shining"],
    ["drama", "Titanic"],
    ["thriller", "Shutter Island"],
    ["fantasy", "Pans Labyrinth"],
  ];

  console.log(_.fromPairs(key));

}
module.exports.months = months
