export function classTest(cls) { return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*") }

export let rmClass = function(node, cls) {
    let current = node.className
    let match = classTest(cls).exec(current)
    if (match) {
        let after = current.slice(match.index + match[0].length)
        node.className = current.slice(0, match.index) + (after ? match[1] + after : "")
    }
}
export function removeChildren(e) {
    for (let count = e.childNodes.length; count > 0; --count)
        e.removeChild(e.firstChild)
    return e
}

export function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e)
}

export function elt(tag, content, className, style) {
    let e = document.createElement(tag)
    if (className) e.className = className
    if (style) e.style.cssText = style
    if (typeof content == "string" || typeof content == "number") e.appendChild(document.createTextNode(content))
    else if (content)
        for (let i = 0; i < content.length; ++i) e.appendChild(content[i])
    return e
}
export function eltP(tag, content, className, style) {
    let e = elt(tag, content, className, style)
    e.setAttribute("role", "presentation")
    return e
}
export let on = function(emitter, type, f) {
    if (emitter.addEventListener) {
        emitter.addEventListener(type, f, false)
    } else if (emitter.attachEvent) {
        emitter.attachEvent("on" + type, f)
    } else {
        let map = emitter._handlers || (emitter._handlers = {})
        map[type] = (map[type] || noHandlers).concat(f)
    }
}
export function off(emitter, type, f) {
    if (emitter.removeEventListener) {
        emitter.removeEventListener(type, f, false)
    } else if (emitter.detachEvent) {
        emitter.detachEvent("on" + type, f)
    } else {
        let map = emitter._handlers,
            arr = map && map[type]
        if (arr) {
            let index = indexOf(arr, f)
            if (index > -1)
                map[type] = arr.slice(0, index).concat(arr.slice(index + 1))
        }
    }
}

export function getEleRelativePos(element, relative = null) {
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null && current !== relative) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;　
        current = current.offsetParent;
    }　
    return { left: actualLeft, top: actualTop };
}
export function getElementTop(element) {
    var current = element.offsetParent;　
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }　
    return actualTop;
}