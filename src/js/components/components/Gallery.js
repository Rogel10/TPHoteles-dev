import { createCustomElement, closeSection } from '../../helpers/helpers.js';
import { TimelineMax } from "gsap";
import { BackSection } from '../layout/BackSection.js';
import imgGallery from '../../../media/icons/878052.svg';
import { TweenMax, Expo } from 'gsap';

export default class Gallery {

    constructor(){
        this.props = {
            mainContainer: null,
            tl: new TimelineMax({pause: true}),
            // btnPrev: document.querySelector('.prev-image'),
            // btnNext: document.querySelector('.next-image'),
            cont: 0,
            data: [
                {
                    img: imgGallery,
                    title: 'TITULO DE LA IMAGEN 1',
                    description: 'DESCRIPCION DE LA IMAGEN 1'
                },
                {
                    img: imgGallery,
                    title: 'TITULO DE LA IMAGEN 2',
                    description: 'DESCRIPCION DE LA IMAGEN 2'
                },
                {
                    img: imgGallery,
                    title: 'TITULO DE LA IMAGEN 3',
                    description: 'DESCRIPCION DE LA IMAGEN 3'
                },
                {
                    img: imgGallery,
                    title: 'TITULO DE LA IMAGEN 4',
                    description: 'DESCRIPCION DE LA IMAGEN 4'
                },
                {
                    img: imgGallery,
                    title: 'TITULO DE LA IMAGEN 5',
                    description: 'DESCRIPCION DE LA IMAGEN 5'
                }
            ]
        }
    }

    init(params){

        this.props.mainContainer = document.querySelector(`.${params.className}`);
        this.createElements();
    }

    createElements(){

        let color = 'transparent';
        let topBar = BackSection(color, 'Galeria');

        const galleryMobile = `
            <div class="gallery-mobile">
                <div class="prev-image"></div>
                <ul class="gallery-content"></ul>
                <div class="next-image"></div>    
            </div>
        `;

        const galleryDesktop = `
            <div class="gallery-desktop">
            <div class="main-gallery-content">    
                <div class="gallery-content__image"><img src="${imgGallery}" alt=""></div>
                <div class="gallery-content__title"> TITULO DE LA IMAGEN</div>
                <div class="gallery-content__description">DESCRIPCION DE LA IMAGEN</div>
            </div>
            <div class="content-thumbnails">
                <ul class="list-thumbnails">
                    <li class="thumbnails__item"><img src="${imgGallery}" alt=""></li>
                    <li class="thumbnails__item"><img src="${imgGallery}" alt=""></li>
                    <li class="thumbnails__item"><img src="${imgGallery}" alt=""></li>
                    <li class="thumbnails__item"><img src="${imgGallery}" alt=""></li>
                    
                </ul>
            </div>            
        </div>`;

        const container = createCustomElement('section', {
            class: 'page-gallery'
        }, [topBar, galleryMobile, galleryDesktop]);

        // inyecta todo el contenido al main container
        this.props.mainContainer.appendChild(container);

        //animaciones
        TweenMax.to(this.props.mainContainer, 0.8, {
            left: 0,
            display: 'block',
            ease: Expo.easeInOut
        });
        // this.props.tl.to(this.props.mainContainer, .3, {
        //     opacity: 1,
        //     right: 0,
        //     display: 'block',
        //     ease: Power1.easeOut
        // });
        

        this.props.ulGallery = document.querySelector('.gallery-content');     
        let items = '';
        this.props.data.forEach(item => {
            items += `<li class="gallery-content__item">
                <div class="gallery-content__image"><img src="${item.img}" alt=""></div>
                <div class="gallery-content__title">${item.title}</div>
                <div class="gallery-content__description">${item.description}</div>
            </li>`
        });

        this.props.ulGallery.innerHTML = items;
        this.props.ulGallery.firstChild.classList.add('item-active');
        this.props.liGalleryItem = [...document.querySelectorAll('.gallery-content__item')];
        
        // console.log('length: ',this.props.liGalleryItem.length, this.props.liGalleryItem);
        this.props.heightItem = this.props.liGalleryItem[0].getBoundingClientRect().height;
        // console.log('this.props.heightItem: ',this.props.heightItem);
        this.props.btnPrev = document.querySelector('.prev-image');
        this.props.btnNext = document.querySelector('.next-image');
        
        this.props.btnPrev.style.display = 'none';
        this.props.tl.play();

        // funcion que maneja los ventos del DOM
        this.onkeypressEvents();

    }

    onkeypressEvents() {

        this.props.btnNext.addEventListener('click', (e) => {
            
            (this.props.cont >= (this.props.liGalleryItem.length -1)) 
            ? this.props.cont = (this.props.liGalleryItem.length -1)
            : this.props.cont++;
        
            this.props.btnPrev.style.display = (this.props.cont > 0) ? 'flex' : 'none'; 
            this.props.btnNext.style.display = (this.props.cont === (this.props.liGalleryItem.length -1)) 
            ? 'none' 
            : 'flex';

            // quita y pone clase active
            this.props.liGalleryItem.map(item => item.classList.remove('item-active'));
            this.props.liGalleryItem[this.props.cont].classList.add('item-active');
            // this.props.ulGallery.style.transform = `translateY(-${this.props.heightItem*this.props.cont}%)`;  
            this.props.ulGallery.style.transform = `translateY(-${100*this.props.cont}%)`;  

            // this.focusItem(this.props.cont, this.props.liGalleryItem[this.props.cont]);
        });

        this.props.btnPrev.addEventListener('click', (e) => {
            
            (this.props.cont <= 0) ? this.props.cont = 0 : this.props.cont--;
            this.props.btnPrev.style.display = (this.props.cont === 0) ? 'none' : 'flex'; 
            this.props.btnNext.style.display = (this.props.cont < this.props.liGalleryItem.length -1)
             ? 'flex' 
             : 'none'; 


            console.log('cont para arriba: ',this.props.cont);
            
            // quita y pone clase active
            this.props.liGalleryItem.map(item => item.classList.remove('item-active'));
            this.props.liGalleryItem[this.props.cont].classList.add('item-active');
            this.props.ulGallery.style.transform = `translateY(-${100*this.props.cont}%)`; 
            // this.props.ulGallery.style.transform = `translateY(-${this.props.heightItem*this.props.cont}%)`; 
        
        });

        document.querySelector('.back-section__back').addEventListener('click', () => {
            TweenMax.to(this.props.mainContainer, 0.5, {
                left: '-100%',
                ease: Expo.easeInOut,
                onComplete: this.onExit()
            });
            // this.props.tl.to(this.props.mainContainer, .5, {
            //     right: '20%',
            //     opacity: 0,
            //     ease: Back.easeOut.config(1.7),
            //     onComplete: this.onExit()
            // });
        })

    }

    onExit() {
        let el = document.querySelector('.page-gallery');
        closeSection(el, this.props.mainContainer);
    }

}