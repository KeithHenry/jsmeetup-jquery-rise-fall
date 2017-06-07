function createElement(tag, content, children) {
    var ele = document.createElement(tag);

    // Examine content, if we have a string then just add it
    if (typeof content === 'string')
        ele.appendChild(document.createTextNode(content));
    else if (content) {
        // Special sub property to add children
        if (typeof content.text === 'string') {
            ele.appendChild(document.createTextNode(content.text));
            delete content.text;
        }

        // Special handling for style as object
        if (typeof content.style === 'object') {
            for (var rule in content.style)
                ele.style[rule] = content.style[rule]

            delete content.style;
        }

        // Add attributes in the element with setAttribute
        for (var attr in ele) {
            if (typeof content[attr] === 'function') {
                ele.addEventListener(attr, content[attr]);
                delete content[attr];
            }
            else if (content[attr]) {
                ele.setAttribute(attr, content[attr]);
                delete content[attr];
            }
        }

        // Set everything else as properties
        for (var prop in content)
            ele[prop] = content[prop];
    }

    if (!children)
        return ele;

    // If the children is just text
    if (typeof children === 'string') {
        ele.appendChild(document.createTextNode(children));
        return ele;
    }

    // If array of children add each
    if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (typeof child === 'string')
                child = document.createTextNode(child);

            ele.appendChild(child);
        }
    } else
        ele.appendChild(children);

    return ele;
}

// Then helper methods for different tags
function div(content, children) { return createElement('div', content, children); }
function span(content, children) { return createElement('span', content, children); }
function button(content, children) { return createElement('button', content, children); }