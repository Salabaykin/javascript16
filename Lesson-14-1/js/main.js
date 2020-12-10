'use strict';

const DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.createElem = function() {
        if (selector.indexOf('.') !== -1) {
            const elem = document.createElement('div');
            elem.textContent = 'Пример текста';
            elem.style.cssText = `height: ${height};width: ${width};background: ${bg};font-size: ${fontSize};`;
            elem.classList.add(selector.slice(1));
            document.body.append(elem);
        } else if (selector.indexOf('#') !== -1) {
            const elem = document.createElement('p');
            elem.textContent = 'Пример текста';
            elem.style.cssText = `height: ${height};width: ${width};background: ${bg};font-size: ${fontSize};`;
            elem.id = selector.slice(1);
            document.body.append(elem);
        }
    }
};

const domElement = new DomElement('#class-name', '100px', '100px', 'green', '18px');
domElement.createElem();