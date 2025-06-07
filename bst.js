import { mergeSort } from "./mergeSort.js"
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}
export class Tree {
    constructor(array, root) {
        this.array = []
        let set = new Set([])
        array.forEach(i => {
            set.add(i)
        })
        set.forEach(i => {
            this.array.push(i)
        })
        this.array = mergeSort(this.array)
        let mid = parseInt((0 + this.array.length)/2)
        this.root = null
    }
    #bbst(array, left, right) {
        if(left > right) {
            return null
        }
        let mid = parseInt((left + right)/2)
        let root = new Node(array[mid])
        root.left = this.#bbst(array, left , mid - 1)
        root.right = this.#bbst(array, mid + 1, right)
        return root
    }
    buildTree(array = this.array) {
        this.root = this.#bbst(array, 0, array.length - 1)
        return this.root.data
    }
    prettyPrint(root = this.root, prefix = '', isLeft = true) {
        if (root === null) {
            return;
        }
        if (root.right !== null) {
            this.prettyPrint(root.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${root.data}`);
        if (root.left !== null) {
            this.prettyPrint(root.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

}