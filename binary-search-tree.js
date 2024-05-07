// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here
// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
  
    constructor() {
      this.root = null;
    }
  
    insert(val, currentNode=this.root) {
      if (this.root === null) {
        this.root = new TreeNode(val);  // Set the root directly if the tree is empty
        return;  // Exit the function
      }
  
      // If the current node is null, it means we've found the insertion point in the recursion
      if (currentNode === null) {
        return new TreeNode(val);
      }
  
      if (val < currentNode.val) {
        // If the value is less than the current node's value, go left
        currentNode.left = this.insert(val, currentNode.left);
      } else if (val > currentNode.val) {
        // If the value is greater than the current node's value, go right
        currentNode.right = this.insert(val, currentNode.right);
      }
  
      // If the value already exists, return null or handle as needed
      return currentNode;  // This line helps in maintaining the link to the parent node
    }
  
    search(val, currentNode = this.root) {
      if((currentNode === null)){
        return false;
      }
  
      if(currentNode.val === val){
        return true;
      }
  
      if(currentNode.val > val){
        return this.search(val, currentNode.left);
      }
  
      if(currentNode.val < val){
        return this.search(val, currentNode.right);
      }
  
      
    }
  
  
    preOrderTraversal(currentNode = this.root) {
      if(currentNode === null){
        return
      }
  
      console.log(currentNode.val)
  
      
      this.preOrderTraversal(currentNode.left);
      this.preOrderTraversal(currentNode.right);  // Traverse the right subtree.
  
    }
  
  
    inOrderTraversal(currentNode = this.root) {
      if(currentNode === null){
        return
      }
  
      this.inOrderTraversal(currentNode.left);
  
      console.log(currentNode.val);
  
      this.inOrderTraversal(currentNode.right);
    }
  
  
    postOrderTraversal(currentNode = this.root) {
      if (currentNode === null) {
          return;  // If the node is null, simply return.
      }
  
      // First, recurse on the left subtree
      this.postOrderTraversal(currentNode.left);
  
      // Then, recurse on the right subtree
      this.postOrderTraversal(currentNode.right);
  
      console.log(currentNode.val);
  }
  
      // Breadth First Traversal - Iterative
      breadthFirstTraversal() {
        if (!this.root) return; // Empty tree
    
        const queue = [this.root]; // Initialize queue with root
    
        while (queue.length > 0) {
          const current = queue.shift(); // Dequeue the front node
          console.log(current.val); // Print the value
    
          if (current.left) queue.push(current.left); // Enqueue left child
          if (current.right) queue.push(current.right); // Enqueue right child
        }
      }
  
    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      if (!this.root) return; // Empty tree
    
      const stack = [this.root]; // Initialize stack with root
    
      while (stack.length > 0) {
        const current = stack.pop(); // Pop the top node
        console.log(current.val); // Print the value
    
        // Push right child before left child to ensure left child is processed first
        if (current.right) stack.push(current.right); // Push right child (LIFO)
        if (current.left) stack.push(current.left); // Push left child (LIFO)
      }
    }
    
  }
  
  module.exports = { BinarySearchTree, TreeNode };