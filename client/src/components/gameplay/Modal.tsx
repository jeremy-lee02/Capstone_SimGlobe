import React from 'react'

interface Props{
    isVisible: boolean
    onClose: any
    children: any
}

function Modal(props : Props) {
    if (props.isVisible === false) return null;
    const handleClose = (e : any) => {
        if (e.target.id === 'wrapper') props.onClose();
    }
  return (
    <div className=' fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id='wrapper' onClick={handleClose}>
        
        <div className='  flex flex-col '>
            <button className='text-white text-xl place-self-end' onClick={()=> props.onClose()}>{'[X]'}</button>
            <div className=' bg-gray-900 p-4 rounded-lg'>
                {props.children}
            </div>
        </div>
    </div>
  )
}

export default Modal