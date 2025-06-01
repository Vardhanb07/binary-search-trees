class Node {
    constructor(data, left, right) {
        this.data = data
        this.left = left
        this.right = right
    }
}
class Tree {
    constructor(array, root = 0) {
        array.sort()
        let sortedSet = new Set([])
        array.forEach(i => {
            sortedSet.add(i)
        })
        array.splice(0,array.length)
        sortedSet.forEach(i => {
            array.push(i)
        })
        this.array = array
        this.root = root
    }
}