import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText';
// import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
// import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from "../Components/core/AboutPage/Quote"
import FoundingStory from "../assets/Images/FoundingStory.png"
// import StatsComponent from '../Components/core/AboutPage/Stats'
import LearningGrid from '../Components/core/AboutPage/LearningGrid'
import ContactFormSection from '../Components/core/AboutPage/ContactFormSection'


const About = () => {
  return (
    <div className='mx-auto text-white'>
      {/* section 1 */}
      <section className='bg-richblack-700'>
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white'>
            <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                Driving Innovation in Online Education for a 
                <HighlightText text={"Brighter Future"}/>

            </header>
            <div className='sm:h-[70px] lg:h-[150px]'></div>
            <div className='absolute bottom-0 left-[85%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                {/* <img src={BannerImage1} /> */}
                <img src={BannerImage2} alt='' />
                {/* <img src={BannerImage3} /> */}
            </div>
        </div>
      </section>

      {/* section 2 */}

      <section className='border-b border-richblack-700'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
          <div className='h-[100px] '></div>
            <Quote/>
        </div>
      </section>


      {/* section 3 */}

      <section>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            {/* foudning story wala div */}
            <div className='flex flex-col items-center gap-10 lg:flex-row justify-between '>
                {/* founding story left box */}
                <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                    <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>Our Founding Story</h1>

                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                   
                </div>
               
                <div>
                    <img className=''  src={FoundingStory} alt='Loading' />
                </div>
            </div>

         
            <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
           
            </div>
        </div>
      </section>  

     
      
      {/* section 5 */}
      <section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <LearningGrid />
        <ContactFormSection />
      </section>

    

    </div>
  )
}

export default About
