export const searchDFS = ({ data, cond, childPathKey = "files" }) => {
    let final = null;
    let parentPath = [];
    let parent = null;
    let next = null;
    let prev = null;
  
    const recursiveFind = tree => {
      tree.forEach((item, index) => {
        if (cond(item, index)) {
          final = item;
  
          if (parentPath) {
            parentPath.forEach(p => {
              // check if parent has the `current item`
              if (p && p[childPathKey].includes(item)) {
                parent = p;
                // set next & previous indexes
                next = p[childPathKey][index + 1];
                prev = p[childPathKey][index - 1];
              } else {
                parent = tree;
                // if parent is null then check the root of the tree
                next = tree[index + 1];
                prev = tree[index - 1];
              }
            });
          }
          return;
        }
        if (item[childPathKey]) {
          // push parent stack
          parentPath.push(item);
          recursiveFind(item[childPathKey]);
        }
      });
    };
  
    recursiveFind(data);
    return {
      parent,
      item: final,
      nextSibling: next,
      previousSibling: prev
    };
};