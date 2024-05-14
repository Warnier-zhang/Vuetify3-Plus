// 参考 Quasar
const nodes = [];

function createGlobalNode(id) {
    const el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    nodes.push(el);
    return el;
}

function removeGlobalNode(el) {
    const nodeIndex = nodes.indexOf(el)
    nodes.splice(nodeIndex, 1);
    el.remove()
}

export {
    createGlobalNode,
    removeGlobalNode,
};
