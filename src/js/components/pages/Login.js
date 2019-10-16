import { TimelineMax } from "gsap";
import API from '../../api/Api.js';
import * as UI from '../../helpers/ElementsDOM.js';
import { getSizeWindow } from '../../helpers/helpers.js';
import Logo from '../../../media/general-logo-hotel@3x.png';
// import {TPH} from '../../api/config.js';


export default class Login {

    constructor() {

        this.props = {
            
            contentInputs: document.querySelector('.login-form'),
            listInputs: [...document.querySelectorAll('.login-form__nip')],
            cont : 0,
            nip: '',
            tl: new TimelineMax(),
            tlModal : new TimelineMax()
        }

    }

    init(){

        console.log('en login ........')
        const app = new API();
        app.getServiceLogin().then(obj => {
            this.responseLoginData(obj);
        });
    }

    responseLoginData(data) {

        // data del webservice ....
        // console.log(data);
        data.urlBack = '/media/main-background.jpg';
        data.urlLogo = '/media/general-logo-hotel@3x.png';
        localStorage.setItem('urlBackground', data.urlBack);
        localStorage.setItem('urlLogo', data.urlLogo);
        // localStorage.setItem('session', 'qwertyuiop1234567');
        // sessionStorage.setItem('token', 'qwertyuiop1234567');

        UI.mainContainerLogin.style.cssText = `
            background: url(${data.urlBack}) no-repeat top;
            background-size: cover;
        `;
        UI.mainLogo.src = Logo;

        
        // this.props.listInputs[0].focus();
        this.listenerInputs(0);
        this.animations();
        this.onkeyPress();
    }
    
    animations() {
        this.props.tl.to('.page-login', .5 ,{opacity: 1, ease: Power2.easeOut}, .2)
        .to('.page-login-content-animation', 1.5, { opacity: 1, ease: Power2.easeOut});
    }


    listenerInputs() {
    
        // regresa segun el clic en el input
        UI.contentInputs.addEventListener('click', (e) => {
            this.props.cont = this.props.listInputs.indexOf(e.target);
        });
        
        // se ejecuta consecutivamente segun el contador
        UI.listInputs[this.props.cont].addEventListener('keyup', (e) => {
            this.nextInput(e.srcElement.value);
        });

        // se sigue el flujo segun el contador
        // this.props.listInputs[this.props.cont].addEventListener('keyup', (e) => {
            // if( e.code === "Backspace" ){ this.prevInput();}
            // console.log(' ---> keyUp ***');
            // e.stopPropagation();

        // });
    }


    nextInput(_value) {
        
        this.props.cont++; //input focus
        this.props.cont = (this.props.cont >= 6) ? 5 : this.props.cont++;
        UI.listInputs[this.props.cont].focus();
        this.props.nip = this.props.nip + _value;

        if( this.props.nip.length === 6 ) {
            location.replace("/");
            // setTimeout("location.href='/'", 1000);
        } else {
            this.listenerInputs(this.props.cont);
        }

    }

    prevInput() {

        // this.props.cont--;
        // this.props.cont = (this.props.cont < 0 ) ? 0 : this.props.cont--;
        // //* console.log('va a borrar  : ',this.props.cont, this.props.listInputs[this.props.cont].value);
        // this.props.listInputs[this.props.cont].focus();
        // this.props.listInputs[this.props.cont].value = '';
        // this.props.nip = this.props.nip+'';
        // console.log('nip - borrado: ',this.props.nip);
        // //* this.props.listInputs[this.props.cont+1].setAttribute("disabled", "disabled");

    }

    getSizeModal() {
        
        let size = getSizeWindow(window.innerWidth);
        const gnuTablet = 768,
        gnuScreenOne = 1024,
        gnuScreenTwo = 1440;

        console.log('SIZE => ',size);

        if(size < gnuTablet ) {
            // < 320
            // return { w:'272px', h:'592px'}
            return {w: '85%', h: '88.8%'}
        } else if (size >= gnuTablet && size < gnuScreenOne) {
            // >= 768 && <= 1024
            // console.log('1 >= 768 && <= 1024');
            return {h:'423px', w:'632px'};
            // return {w:'82.3%', h:'41.3%'}
        } else if (size >= gnuScreenOne && size <= gnuScreenTwo) {
            // >= 1024 && <= 1440
            console.log('2 >= 1024 && <= 1440');
            return {h:'555px', w:'832px'};
        } else {
            // > 1440
            return {h:'555px', w:'832px'};
        }
    }

    onkeyPress() {

        document.querySelector('.login-help').addEventListener('click', () => {

            const data = this.getSizeModal();
            this.props.tlModal.to('.modal-code', 0.5, {
                display: 'flex',
                opacity: 1,
                height: data.h,
                width: data.w,
                // ease: Elastic.easeOut.config(1, 0.3)
                // ease: Power0.easeOut
                ease: Elastic.easeOut.config(1.2, 0.75)
            });

        });

        document.querySelector('.modal-code-close').addEventListener('click', (e) => {

            this.props.tlModal.to('.modal-code', .5, {autoAlpha: 0});
            setTimeout(() => {
                this.props.tlModal.set('.modal-code', {clearProps: 'width, height, opacity, display, visibility'});
            }, 700);

        });

    }
}