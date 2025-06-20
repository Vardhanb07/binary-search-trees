import { Tree } from "./bst.js";
function generateRandomArray(size = 10, max = 100) {
  const arr = [];
  while (arr.length < size) {
    const rand = Math.floor(Math.random() * max);
    if (!arr.includes(rand)) arr.push(rand);
  }
  return arr;
}
let numbers = generateRandomArray()
const tree = new Tree(numbers)
tree.buildTree()
console.log(tree.isBalanced())
tree.prettyPrint()
numbers = generateRandomArray()
numbers.forEach(e => {
    tree.insert(e)
})
tree.prettyPrint()
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
tree.prettyPrint()
tree.preOrder((e) => {console.log(e.data)})
console.log('\n')
tree.inOrder((e) => {console.log(e.data)})
console.log('\n')
tree.postOrder((e) => {console.log(e.data)})
console.log('\n')
tree.levelOrder((e) => {console.log(e.data)})