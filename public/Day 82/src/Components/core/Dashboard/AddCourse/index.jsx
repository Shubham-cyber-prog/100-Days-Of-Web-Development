import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className=' mx-auto w-11/12 max-w-[1000px] py-10'>
    <div className='flex w-full items-start gap-x-6'>
        <div className='flex flex-1 flex-col'>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Add Course</h1>
            <RenderSteps/>
        </div>
      
    </div>
</div>
  )
}

export default AddCourse