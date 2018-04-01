// @flow

type vDOMNode = {
    tagName: string,
    children: Array<vDOMNode>,
    properties: {}
}

type VirtualDOM = {
    h: (...any[]) => vDOMNode,
    diff: (lhs: vDOMNode, rhs: vDOMNode) => any,
    patch: (el: HTMLElement|vDOMNode, node: vDOMNode) => void,
    create: (vDOMNode) => HTMLElement
}

type Action = {
    type: string,
    payload: {
        dom?: Map<HTMLElement, vDOMNode[]>
    }
}

type AmaraDOM = () => (action: Action) => void;

// $FlowFixMe
import parser from 'vdom-parser';

const setPrev = (node) => (node._prev = null, node);
const isPrev = (node) => '_prev' in node;

/**
 * Provides the ability to create DOM dynamically based on CSS selectors.
 *
 * @export
 * @name AmaraDOM
 * @param {VirtualDOM} From https://github.com/Matt-Esch/virtual-dom
 * @returns {AmaraDOM}
 */
export default function AmaraPluginDOM({h, diff, patch, create}: VirtualDOM): AmaraDOM {

    return function createHandler() {

        const prevTargetDOM: WeakMap<Node, vDOMNode> = new WeakMap();

        function applyDOMToTarget(results: Array<vDOMNode>, target: HTMLElement) {
            let first = false,
                prevDOM = prevTargetDOM.get(target);
            const currDOM = h('amara:content', [].concat(...results));
            if (!prevDOM) {
                first = true;
                prevDOM = parser(target);
                currDOM.children.unshift(...prevDOM.children.map(setPrev));
            } else {
                currDOM.children.unshift(...prevDOM.children.filter(isPrev))
            }
            currDOM.tagName = prevDOM.tagName;
            currDOM.properties = prevDOM.properties;
            prevTargetDOM.set(target, currDOM);
            const difference = diff(prevDOM, currDOM);
            if (Object.keys(difference).length > 1) {
                patch(target, difference);
            } else if (first) {
                target.innerHTML = create(currDOM).innerHTML;
            }
        }

        return function handler(action: Action) {
            switch(action.type) {
            case 'core:apply-target-results':
                action.payload.dom && action.payload.dom.forEach(applyDOMToTarget);
                break;
            }
        };

    };

}
