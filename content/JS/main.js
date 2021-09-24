window.addEventListener('load', () => {




    const MyDom =
    {
        header: document.querySelector('.header'),
        /// header element to show 
        Area: document.querySelector('.area'),
        SlectCat: document.querySelector('.searchDropdownBox'),
        Menu: document.querySelector('.Menu'),
        //
        Sign: document.querySelector('.sign-here'),
        /// side bar and it's container
        SideBarContainer: document.querySelector('.side-menu'),
        SideBar: document.querySelector('.side-menu'),
        SideBarBtn: document.querySelector('.navbar-aside'),
        ////
        Info: document.querySelector('.info'),
        ///slides
        slides: document.querySelectorAll('.slide'),
        /// use event delegation on the parent of Panels
        Region_language_currency: document.querySelector('.pref'),
        ///panels classes
        lag: document.querySelector('.language '),
        cur: document.querySelector('.currency'),
        Region: document.querySelector('.country '),
        RegionCountryBtn: document.querySelector('.right-body-btn'),
        CountryList: document.querySelector('.country-list'),
        //footer panels to show
        LanguagePanelOnHover: document.querySelector('.hove_on'),
        LanguagePanelOnClick: document.querySelector('.click-on'),
        ClientRegion: document.querySelector('.Region'),
        //section scrool
        Sections: document.querySelectorAll('section'),
        ///
        cancelBtn: document.querySelectorAll('.cancel'),
        ProductList: document.querySelectorAll('.product-list'),
        SliderProductList: document.querySelectorAll('.product-list-slide'),

        slideBtnRigth: document.querySelectorAll('.btn-right'),

    }



    //my modules
    const ActiveBar = function (el) {
        return function () {
            if (el.classList.contains('hide')) return el.classList.remove('hide')
            return el.classList.add('hide')
        }
    }
    //slides 
    let currentSlide = 0;
    let MaxSlides = MyDom.slides.length;

    //slider fucntion if slider index is 1 then 100 *(0-1) =-100% on the x

    let GotoSlides = (slide) => {
        MyDom.slides.forEach((el, i) => el.style.transform = `translateX(${100 * (i - slide)}%)`)
    }

    GotoSlides(0)
    const nextSlide = () => {
        if (currentSlide === MaxSlides - 1) currentSlide = 0;
        else {
            currentSlide++
            GotoSlides(currentSlide)
        }

    }
    window.setInterval(() => nextSlide(), 10000)




    //AddEventlis
    MyDom.Sign.addEventListener('click', ActiveBar(MyDom.Info))
    MyDom.Menu.addEventListener('click', ActiveBar(MyDom.SlectCat))
    MyDom.SideBarBtn.addEventListener('click', ShowMenu)
    MyDom.lag.addEventListener('mouseover', ActiveBar(MyDom.LanguagePanelOnHover))
    MyDom.lag.addEventListener('click', ActiveBar(MyDom.LanguagePanelOnClick))
    MyDom.Region.addEventListener('click', ActiveBar(MyDom.ClientRegion))
    MyDom.RegionCountryBtn.addEventListener('click', ActiveBar(MyDom.CountryList))
    ///cancel btn

    MyDom.cancelBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.tool').classList.add('hide')
            e.preventDefault()
        })
    })

    //event delegation
    MyDom.Region_language_currency.addEventListener('click', (e) => {
        e.preventDefault()
    })
    //







    ///Api scroll
    const RevelSections = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return
        entry.target.classList.remove('section--hidden')
        observer.unobserve(entry.target)

    }
    const SectionObserver = new IntersectionObserver(RevelSections, {
        root: null,
        threshold: .25,

    })

    MyDom.Sections.forEach((section) => {
        SectionObserver.observe(section);
        section.classList.add('section--hidden')
    })


    function ShowMenu() {
        MyDom.SideBar.classList.remove('hide');

        setTimeout(() => {
            MyDom.SideBar.firstElementChild.style.left = '0%';
            document.querySelector('body').style.height = '100vh';
            document.querySelector('body').style.overflow = 'hidden';
        }, 200)
    }
    document.querySelector('.fas.fa-times').addEventListener('click', () => {
        MyDom.SideBar.classList.add('hide');
        MyDom.SideBar.firstElementChild.style.left = '-100%';
        document.querySelector('body').style.height = 'auto';
        document.querySelector('body').style.overflow = 'auto';
    })


    ///scroll to top 
    document.querySelector('.backtop').addEventListener('click', () => {
        MyDom.header.scrollIntoView({ behavior: 'smooth' })
    })
    MyDom.ProductList.forEach((list, i) => {
        list.style.gridTemplateColumns = `repeat(${list.childElementCount},1fr)`;

    })




    //Product list slider
    let SliderParent = Array.from(MyDom.SliderProductList)

    function ProductSlider(SliderParent) {
        let [w1, w2, w3] = SliderParent;
        MyDom.slideBtnRigth[0].addEventListener('click', slide(w1))
        MyDom.slideBtnRigth[1].addEventListener('click', slide(w2))
        MyDom.slideBtnRigth[2].addEventListener('click', slide(w3))
    }
    ProductSlider(SliderParent)


    function slide(el) {


        let mov = 0;
        return function () {
            let ElWidth = el.getBoundingClientRect();
            let per = (el.scrollWidth / el.firstElementChild.childElementCount) / 2
            mov += per;
            el.firstElementChild.style.left = `-${mov}px`
            console.log(ElWidth, el.firstElementChild.getBoundingClientRect(), mov)
            if ((mov * 2) >= ElWidth.right) {
                mov = 0;
                el.style.left = `${0}px`
            }
        }
    }

    /* function slide(el) {
        w = el.scrollWidth;
        mov = parseInt((w / el.childElementCount));
       
        return function () {
             console.log(mov)
            el.style.left = `-${mov}px`
            mov = mov + 10;
            if (mov >= w) {
                mov = w;
            }
        }
    } */


})