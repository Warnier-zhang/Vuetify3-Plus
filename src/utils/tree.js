const buildTree = (nodes, config) => {
    let idField = config.idField || 'id';
    let parentField = config.parentField || 'pid';
    let childrenField = config.childrenField || 'children';

    let isBuilded = true;
    for (let i = 0; i < nodes.length; i++) {
        if (typeof nodes[i][parentField] !== 'undefined' && nodes[i][parentField] !== null) {
            isBuilded = false;
        }
    }
    if (!isBuilded) {
        for (let i = 0; i < nodes.length; i++) {
            if (typeof nodes[i][parentField] !== 'undefined' && nodes[i][parentField] !== null) {
                if (isLeaf(nodes[i], nodes, config)) {
                    let parentNode = null;
                    for (let j = 0; j < nodes.length; j++) {
                        if (nodes[i][parentField] === nodes[j][idField]) {
                            parentNode = nodes[j];
                            break;
                        }
                    }
                    if (parentNode !== null) {
                        if (!parentNode[childrenField]) {
                            parentNode[childrenField] = [];
                        }
                        parentNode[childrenField].push(nodes[i]);
                        nodes.splice(i, 1);
                        i--;
                    } else {
                        nodes[i][parentField] = null;
                    }
                }
            }
        }
        buildTree(nodes, config);
    }
};

const isLeaf = (node, nodes, config) => {
    let idField = config.idField || 'id';
    let parentField = config.parentField || 'pid';

    let leaf = true;
    for (let i = 0; i < nodes.length; i++) {
        if (node[idField] === nodes[i][parentField] && node[idField] !== nodes[i][idField]) {
            leaf = false;
            break;
        }
    }
    return leaf;
};

const filterTree = (tree, ids, config) => {
    let idField = config.idField || 'id';
    let childrenField = config.childrenField || 'children';

    let nodes = [];
    for (let i = 0; i < tree.length; i++) {
        if (ids.indexOf(tree[i][idField]) !== -1) {
            nodes.push(tree[i]);
        } else {
            if (tree[i][childrenField] && Array.isArray(tree[i][childrenField]) && tree[i][childrenField].length > 0) {
                nodes = nodes.concat(filterTree(tree[i][childrenField], ids, config));
            }
        }
    }
    return nodes;
};

export {
    buildTree,
    filterTree
};