const MyDom={
    filter_container:document.querySelector('.filters-sm '),
    filter_btn:document.querySelector('.filter-btn'),
    slides:document.querySelectorAll('.box-top-slide'),
    header:document.querySelector('header')
}

MyDom.filter_btn.addEventListener('click',(e)=>
{
    e.preventDefault();
    MyDom.filter_container.classList.add('show');
    document.body.style.overflow='hidden'
    setTimeout(()=>
    {
    document.querySelector('.filters-sm-content').classList.add('pop');
    },100)
    
})

MyDom.filter_container.addEventListener('click',(e)=>
{
    if(e.target.className ==='btn btn-close')
    {
        document.querySelector('.filters-sm-content').classList.remove('pop');
       
      setTimeout(()=>
      {
         MyDom.filter_container.classList.remove('show'); 
         document.body.style.overflow='auto'
      },500)
    } 
   let li=e.target.closest('.cat-list-item');
     li.style.height='auto'
    li.firstElementChild.lastElementChild.className='fas fa-chevron-up'

    setTimeout(()=>
    {
        li.style.height='44px'
        li.firstElementChild.lastElementChild.className='fas fa-chevron-down'
    },5000)
})



/////
let MaxSlides,currentSlide;
MaxSlides=MyDom.slides.length;
currentSlide=0;
let GotoSlides = (slide) => {
    MyDom.slides.forEach((el, i) => el.style.transform = `translateY(${100 * (i - slide)}%)`)
}
GotoSlides(0)


const nextSlide = () => {
    if (currentSlide === MaxSlides - 1) currentSlide = -1
    else {
        currentSlide++
        GotoSlides(currentSlide)
    }

}


setInterval(() => {
      nextSlide()    
}, 2000);





document.querySelector('.up').addEventListener('click', function(e){
    e.preventDefault()
    MyDom.header.scrollIntoView({ behavior: 'smooth' })
})