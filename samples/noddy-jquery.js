function $(selector, context) {
    // If passed a function
    if (typeof selector === 'function') {
        if (document.readyState === 'complete')
            // DOM content already loaded, fire once the current script block has finished
            window.setTimeout(selector);
        else
            // Listen for the content loaded event
            document.addEventListener('DOMContentLoaded', selector);

        return;
    }

    // Assume typeof selector === 'string'
    if (selector.indexOf('<') === 0) {
        // We'be been passed an HTML string, parse it as DOM content
        var outer = document.createElement('div');
        outer.innerHTML = selector;
        return outer.children.length === 1 ? outer.children[0] : outer.children;
    }

    // We have a selector, optionally apply the context
    var result = (context || document).querySelectorAll(selector);
    return result || result.length === 1 ? result[0] : result;
}