// // import { DocumentData } from "firebase/firestore";
// import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
// // import { ChatGptIcon } from "../../lib/icons";

// // type Props = {
// //   message: DocumentData
// //   last: boolean
// //   chatRef: MutableRefObject<HTMLDivElement | null>
// // }

// const Message = ({ message, last, chatRef }: any) => {
//   const isChatGpt = message.user === true

//   const textBoxRef = useRef<null | HTMLDivElement>(null)
//   // const [_message, setMessage] = useState('')

//   // useEffect(() => {
//   //   if (!last) return

//   //   // let text = message.text;
//   //   let text = message.text.split(' ')

//   //   // function typeWriter() {
//   //   //   let i = 0;
//   //   //   let message = _message;

//   //   //   function typing() {
//   //   //     if (i < text.length) {
//   //   //       setMessage((message += text.charAt(i)));
//   //   //       i++;
//   //   //       setTimeout(typing, 100);
//   //   //     }
//   //   //   }

//   //   //   typing();
//   //   // }

//   //   function typeWriter() {
//   //     let i = 0
//   //     let message = _message

//   //     function typing() {
//   //       if (i < text.length) {
//   //         setMessage((message += text[i] += ' '))
//   //         i++
//   //         setTimeout(typing, 120)
//   //       }
//   //     }

//   //     typing()
//   //   }

//   //   typeWriter()
//   // }, [last])

//   // useEffect(() => {
//   //   if (!last) return
//   //   if (textBoxRef.current) {
//   //     if (chatRef.current) {
//   //       chatRef.current.scrollTo(0, Number(chatRef.current.scrollHeight))
//   //     }
//   //   }
//   // }, [_message, last])

//   return (
//     <div ref={textBoxRef} className={`py-7 text-white ${isChatGpt && 'bg-[#434654]'}`}>
//       <div className='flex px-3 sm:px-10 space-x-5 max-w-[700px] mx-auto'>
//         {isChatGpt ? (
//           <span className=''>
//             <img alt='Logo' src='assets/media/logos/demo7.svg' className='h-40px'></img>
//           </span>
//         ) : (
//           <>
//             <img className='h-8 w-8' src={'assets/media/avatars/300-1.jpg'} alt={'avatar'} />
//           </>
//         )}

//         {!last && (
//           <div className='overflow-hidden'>
//             {/* {message.text.split('\n').map((text: string, index: number) =>
//               text ? ( */}
//             <p  className='pb-3 text-sm message h-auto'>
//               pppp
//             </p>
//             {/* ) : (
//                 <></>
//               )
//             )} */}
//           </div>
//         )}

//         {last && (
//           <div className='overflow-hidden'>
//             <p  className='pb-3 text-sm message'>
//                   chat
//                   {/* {_message.split('\n').length === index + 1 && ( */}
//                     <span className='h-5 blink w-5 bg-gray-400 translate-y-[3px]'></span>
//                   {/* )} */}
//                 </p>
//             {/* {_message.split('\n').map((text: string, index: number) =>
//               text ? (
//                 <p key={index} className='pb-3 text-sm message'>
//                   {text}

//                   {_message.split('\n').length === index + 1 && (
//                     <span className='h-5 blink w-5 bg-gray-400 translate-y-[3px]'></span>
//                   )}
//                 </p>
//               ) : (
//                 <></>
//               )
//             )} */}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Message

import { MdComputer, MdPerson } from 'react-icons/md'
import Markdown from './Markdown'
const Message = (props: any) => {
  const { id, createdAt, text, ai = false, selected } = props.message

  return (
    <>
      {ai ? (
        <>
          <div className=' mb-5 w-99'>
            <div className='card-header pt-2'>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-50px me-5'>
                  <img src='assets/media/logos/ai.webp' className='' alt='' />
                </div>
                <div className='flex-grow-1'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-4 fw-bold'>
                    Chat Bot
                  </a>
                  <span className='text-gray-500 fw-semibold d-block'>Yestarday at 5:06 PM</span>
                </div>
              </div>
            </div>
            <div className='card- mt-2 p-5 rounded bg-light-info text-gray-900 fw-semibold text-start'>
              <div className='fs-6 fw-normal text-gray-700 mb-5'>
                There are two main approaches you can take to writing amazing blog post headlines.
                You can either decide on your final headline before outstanding you write the most
                of the rest of your creative post
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='d-flex justify-content-end my-10 me-3'>
            <div className='d-flex flex-column align-items-end'>
              <div className='d-flex align-items-center mb-2'>
                <div className='me-3'>
                  <span className='text-muted fs-7 mb-1'>5 mins</span>
                  <a href='#' className='fs-5 fw-bold text-gray-900 text-hover-primary ms-1'>
                    You
                  </a>
                </div>
                <div className='symbol symbol-50px  '>
                  <img alt='Pic' src='assets/media/avatars/300-1.jpg' />
                </div>
              </div>
              <div
                className='p-5 rounded bg-light-primary text-gray-900 fw-semibold mw-lg-700px text-end'
                data-kt-element='message-text'
              >
                Hey there, we’re just writing to let you know that you’ve been subscribed to a
                repository on GitHub.{' '}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Message

// Message.propTypes = {
//   message: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     createdAt: PropTypes.number.isRequired,
//     text: PropTypes.string,
//     ai: PropTypes.bool,
//     selected: PropTypes.string,
//   }).isRequired,
// };
