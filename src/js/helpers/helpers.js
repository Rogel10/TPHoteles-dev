// import VodDetail from '../pages/VodDetail';
import * as UI from './ElementsDOM.js'

//Agrega atributos a un elemento
export const addAtributes = (element, objAttr) => {
    for(let attr in objAttr) {
        element.setAttribute(attr, objAttr[attr])
    }
}

//www.megapeliculasrip.com

// Crear elemento personalizado
/**
 * 
 * @param {div} tagName 
 * @param {style} objAttr 
 * @param {p,div, a} children 
 */
export const createCustomElement = (tagName, objAttr, children) => {

    // Crear elemento
    const element = document.createElement(tagName);
    // agrega hijos al padre
    if(children){
        children.forEach(child => {
            child instanceof HTMLElement
            ? element.appendChild(child)
            : element.innerHTML += child; 
        });
    }
    //agrega los atributos
    addAtributes(element, objAttr);
    return element;
}


// funcion que se dedica a abrir secciones con javascript
/**
 * 
 * @param {*} _section 
 * @param {*} _params 
 */

export const openSection = (_section, _params) => {

    const container = document.querySelector('.page-home');
    const el = document.createElement('div');

    el.classList.add(_params.className);
    container.appendChild(el);
    _section.init(_params.className);
    // document.body.style.overflowY = 'hidden';

}

// export const closeSection = (_element, _container, _animation, _isChild = false) => {
export const closeSection = (_element, _container, _isChild = false) => {
    
    const container = document.querySelector('.page-home');

    setTimeout(() => {
        // _animation.set(`.${_container.className}`, {clearProps: 'right, opacity, overflow-y, display'});
        // _animation.set(`.${_element.className}`, {clearProps: 'top, opacity'});
        _container.removeChild(_element);
        
        if(!_isChild.child)
            document.body.removeAttribute('style');

        container.removeChild(container.lastChild);
        
    },300);
    
}

export const removeAllChilds = (_container) => {
    
    setTimeout(() => {
        if (_container.hasChildNodes() ){
            while ( _container.childNodes.length >= 1 ){
                _container.removeChild( _container.firstChild );
            }
        }
    }, 400);
    
}


export const getSizeWindow = (widthWindow) => {
    
    var gnuMobil = 320,
    gnuTablet = 768,
    gnuScreenOne = 1024,
    gnuScreenTwo = 1440;
    
    if (widthWindow < gnuTablet) {
        return gnuMobil;
    } else if (widthWindow >= gnuTablet && widthWindow <= gnuScreenOne) {
        return gnuTablet;
    } else if (widthWindow >= gnuScreenOne && widthWindow <= gnuScreenTwo) {
        return gnuScreenOne;
    }  else {
        return gnuScreenTwo;
    }

}
