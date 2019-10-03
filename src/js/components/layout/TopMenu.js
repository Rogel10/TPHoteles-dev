import * as UI from '../../helpers/ElementsDOM.js';

export default class TopMenu {

    constructor(){
        this.props = {}
    }


    init(){
        this.render();
    }

    render(){

        let html = `
                <nav class="menu-topbar">
                    <div class="menu-topbar__toggle"></div>
                    <a href="/" ><div class="menu-topbar__logo"></div></a>
                    <!-- <a href="/guia-de-canales.html"><div class="menu-topbar__guide"></div></a> -->
                    <div class="menu-topbar__guide"></div>
                </nav>
            `;

        UI.mainHeader.innerHTML = html;
    }


}