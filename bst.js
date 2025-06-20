import { mergeSort } from "./mergeSort.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
export class Tree {
  constructor(array) {
    this.array = [];
    let set = new Set([]);
    array.forEach((i) => {
      set.add(i);
    });
    set.forEach((i) => {
      this.array.push(i);
    });
    this.array = mergeSort(this.array);
    this.root = null;
  }
  #bbst(array, left, right) {
    if (left > right) {
      return null;
    }
    let mid = parseInt((left + right) / 2);
    let root = new Node(array[mid]);
    root.left = this.#bbst(array, left, mid - 1);
    root.right = this.#bbst(array, mid + 1, right);
    return root;
  }
  buildTree(array = this.array) {
    this.root = this.#bbst(array, 0, array.length - 1);
    return this.root.data;
  }
  prettyPrint(root = this.root, prefix = "", isLeft = true) {
    if (root === null) {
      return;
    }
    if (root.right !== null) {
      this.prettyPrint(
        root.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.data}`);
    if (root.left !== null) {
      this.prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value, root = this.root) {
    if (root == null) {
      return;
    }
    if (root.data > value) {
      if (root.left != null && root.right == null) {
        if (root.data < value) {
          root.right = new Node(value);
          return;
        }
      } else if (root.right != null && root.left == null) {
        if (root.data > value) {
          root.left = new Node(value);
          return;
        }
      } else if (root.left == null && root.left == null) {
        if (root.data > value) {
          root.left = new Node(value);
        } else if (root.data < value) {
          root.right = new Node(value);
        }
        return;
      }
      this.insert(value, root.left);
      return;
    } else if (root.data < value) {
      if (root.left != null && root.right == null) {
        if (root.data < value) {
          root.right = new Node(value);
          return;
        }
      } else if (root.right != null && root.left == null) {
        if (root.data > value) {
          root.left = new Node(value);
          return;
        }
      } else if (root.left == null && root.left == null) {
        if (root.data > value) {
          root.left = new Node(value);
        } else if (root.data < value) {
          root.right = new Node(value);
        }
        return;
      }
      this.insert(value, root.right);
      return;
    }
  }
  minNode(root) {
    while (root.left != null) {
      root = root.left;
    }
    return root;
  }
  maxNode(root) {
    while (root.right != null) {
      root = root.right;
    }
    return root;
  }
  deleteItem(value, root = this.root) {
    if (root == null) {
      return null;
    } else if (root.data > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left == null && root.right == null) {
        root = null;
      } else if (root.left == null) {
        root = root.right;
      } else if (root.right == null) {
        root = root.left;
      } else {
        temp = this.minNode(root.right);
        root.data = temp.data;
        root.right = this.deleteItem(temp.data, root.right);
      }
    }
    return root;
  }
  find(value, root = this.root) {
    if (root == null) {
      return null;
    }
    if (root.data == value) {
      return root;
    } else if (root.data > value) {
      return this.find(value, root.left);
    } else if (root.data < value) {
      return this.find(value, root.right);
    }
  }
  levelOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    let queue = [this.root];
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback is required");
    if (!root) return;
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }
  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback is required");
    if (!root) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }
  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback is required");
    if (!root) return;
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }
  #heightOfNode(root) {
    if (root == null) return -1;
    return (
      Math.max(this.#heightOfNode(root.right), this.#heightOfNode(root.left)) +
      1
    );
  }
  height(value) {
    let node = this.find(value);
    return this.#heightOfNode(node);
  }
  depth(value) {
    let root = this.root;
    let d = 0;
    while (root.data != value && root != null) {
      if (root.data > value) {
        d += 1;
        root = root.left;
      } else if (root.data < value) {
        d += 1;
        root = root.right;
      }
    }
    if (root == null) return null;
    return d;
  }
  isBalanced(root = this.root) {
    if (!root) return true;
    let leftHeight = this.#heightOfNode(root.left);
    let rightHeight = this.#heightOfNode(root.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }
  rebalance() {
    let nodes = [];
    let queue = [this.root];
    while (queue.length > 0) {
      let current = queue.shift();
      nodes.push(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    nodes = mergeSort(nodes);
    this.buildTree(nodes);
  }
}
