const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  let currentNode = rootNode;

  if(!currentNode){
    return undefined;
  }

  while(currentNode.left !== null){
    currentNode = currentNode.left
  }

  return currentNode.val;
}

function findMaxBST (rootNode) {
  let currentNode = rootNode;

  if(!currentNode){
    return undefined;
  }

  while(currentNode.right !== null){
    currentNode = currentNode.right
  }

  return currentNode.val;
}

function findMinBT (rootNode) {
  let currentNode = rootNode;

  if(currentNode === null){
    return Number.POSITIVE_INFINITY;
  }

  let leftMin = findMinBT(currentNode.left);

  let rightMin = findMinBT(currentNode.right);

  return Math.min(rootNode.val, leftMin, rightMin);

}

function findMaxBT (rootNode) {
  let currentNode = rootNode;

  if(currentNode === null){
    return Number.NEGATIVE_INFINITY;
  }

  let leftMax = findMaxBT(currentNode.left);

  let rightMax = findMaxBT(currentNode.right);

  return Math.max(rootNode.val, leftMax, rightMax);

}

function getHeight (rootNode) {
  let currentNode = rootNode;

  if(currentNode === null){
    return -1;
  }

  if(currentNode.left === null && currentNode.right === null){
    return 0;
  }

  let leftHeight = getHeight(currentNode.left);
  let rightNode = getHeight(currentNode.right);

  return 1 + Math.max(leftHeight, rightNode);
}

function balancedTree(rootNode) {
  balancedTree.isBalanced = true;  // Initialize balance as true at the start

  function checkHeight(node) {
      if (!node) return -1;  // Return -1 for null nodes

      // Recursively find the height of left and right subtrees
      let leftHeight = checkHeight(node.left);
      let rightHeight = checkHeight(node.right);

      // Check if current subtree is balanced
      if (Math.abs(leftHeight - rightHeight) > 1) {
          balancedTree.isBalanced = false;  // Set the balance flag to false if imbalance is found
      }

      // Return the height of the current node
      return 1 + Math.max(leftHeight, rightHeight);
  }

  checkHeight(rootNode);  // Start the recursive height check from the root
  return balancedTree.isBalanced;  // Return the overall balance status
}

function countNodes (rootNode) {
  let currentNode = rootNode;

  if(currentNode === null){
    return 0;
  }

  let leftSide = countNodes(currentNode.left);
  let rightSide = countNodes(currentNode.right);

  return 1 + leftSide + rightSide;
  

}

function getParentNode(currentNode, target, parent = null) {
  if (currentNode === null) {
      return undefined;  // Target not found in this branch
  }

  if (currentNode.val === target) {
      return parent;  // Return the parent node if the target is found
  }

  // Recurse on the left child, passing the current node as the new parent
  let leftResult = getParentNode(currentNode.left, target, currentNode);
  if (leftResult) return leftResult;  // If the target is found in the left subtree, return the result

  // Recurse on the right child, passing the current node as the new parent
  return getParentNode(currentNode.right, target, currentNode);
}

function inOrderPredecessor(rootNode, target) {
  let lastVisited = null; // Tracks the last visited node during traversal

  function traverse(node) {
      if (node === null) {
          return null;
      }

      // Traverse left subtree
      let left = traverse(node.left);
      if (left !== null) {
          return left;  // If a predecessor is found in the left subtree, return it immediately
      }

      // Check if the current node is the target
      if (lastVisited !== null && node.val === target) {
          return lastVisited.val;  // Return the value of the last visited node if it's the predecessor
      }

      // Update the lastVisited to current node before moving to the right subtree
      lastVisited = node;

      // Traverse right subtree
      return traverse(node.right);
  }

  return traverse(rootNode);
}

function deleteNodeBST(root, target) {
  let parentNode = null;
  let currentNode = root;

  // Step 1: Find the target node and its parent
  while (currentNode !== null && currentNode.val !== target) {
      parentNode = currentNode;
      if (target < currentNode.val) {
          currentNode = currentNode.left;
      } else {
          currentNode = currentNode.right;
      }
  }

  // If the target node isn't found
  if (currentNode === null) {
      return undefined;  // Target not found, return the unchanged root
  }

  // Step 2: Delete the node based on the number of children
  // Case 1: Node with no children (leaf node)
  if (currentNode.left === null && currentNode.right === null) {
      if (parentNode === null) {
          return null;  // Deleting the root node which is the only node in the tree
      }
      if (parentNode.left === currentNode) {
          parentNode.left = null;
      } else {
          parentNode.right = null;
      }
  }
  // Case 2: Node with two children
  else if (currentNode.left !== null && currentNode.right !== null) {
      // Find the in-order predecessor (largest in the left subtree)
      let predecessor = currentNode.left;
      let predecessorParent = currentNode;
      while (predecessor.right !== null) {
          predecessorParent = predecessor;
          predecessor = predecessor.right;
      }
      // Replace current node's value with predecessor's value
      currentNode.val = predecessor.val;
      // Delete the predecessor node
      if (predecessorParent.left === predecessor) {
          predecessorParent.left = predecessor.left;
      } else {
          predecessorParent.right = predecessor.left;  // predecessor.right is null
      }
  }
  // Case 3: Node with one child
  else {
      let childNode = (currentNode.left !== null) ? currentNode.left : currentNode.right;
      if (parentNode === null) {
          return childNode;  // Root node is being deleted
      }
      if (parentNode.left === currentNode) {
          parentNode.left = childNode;
      } else {
          parentNode.right = childNode;
      }
  }

  return root;  // Return the modified tree root
}


module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}