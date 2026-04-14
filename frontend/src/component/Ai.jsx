import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

const Ai = () => {

     let {showSearch , setShowSearch} = useContext(shopDataContext)
     const navigate = useNavigate();
      let [activeAi,setActiveAi] = useState(false) 
      let openingSound = new Audio(open)

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-IN";
        window.speechSynthesis.speak(utterance);
     };

   const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new speechRecognition()
    if(!recognition){
        console.log("not supported")
    }

    recognition.onresult = (e) => {
        console.log(e) ;
         const transcript = e.results[0][0].transcript.trim();
          if(transcript.toLowerCase().includes("search") && 
             transcript.toLowerCase().includes("open") && !showSearch){
            speak("opening search")
            setShowSearch(true) 
            navigate("/collection")
         }
        else if(transcript.toLowerCase().includes("search") &&
                transcript.toLowerCase().includes("close") && showSearch){
            speak("closing search")
            setShowSearch(false) 
            
        }
        else if(transcript.toLowerCase().includes("collection") || 
                transcript.toLowerCase().includes("collections") || 
                transcript.toLowerCase().includes("product") || 
                transcript.toLowerCase().includes("products")){
            speak("opening collection page")
            navigate("/collection")
       }
        else if(transcript.toLowerCase().includes("about") ||
                 transcript.toLowerCase().includes("aboutpage") ){
            speak("opening about page")
            navigate("/about")
            setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("home") ||
                 transcript.toLowerCase().includes("homepage") ){
            speak("opening home page")
            navigate("/")
            setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("cart")  ||
                 transcript.toLowerCase().includes("kaat")  ||
                transcript.toLowerCase().includes("caat")){
            speak("opening your cart")
            navigate("/cart")
            setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("contact")){
            speak("opening contact page")
            navigate("/contact")
            setShowSearch(false) 
        }
        
        else if(transcript.toLowerCase().includes("order") ||
                transcript.toLowerCase().includes("myorders") || 
                transcript.toLowerCase().includes("orders") ||
                transcript.toLowerCase().includes("my order")){
            speak("opening your orders page")
            navigate("/order")
            setShowSearch(false) 
        }
        else{
            toast.error("Try Again")
        }

      }
    recognition.onend=()=>{
        setActiveAi(false)
    }
    

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] cursor-pointer'
      onClick={() => { recognition.start(); openingSound.play(); setActiveAi(true) }}>

      {/* Outer ring — pulses when active */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500
        ${activeAi
          ? 'scale-125 opacity-100 bg-[#00d2fc]/20 blur-[6px]'
          : 'scale-100 opacity-0'}`}/>

      {/* Rotating dashed ring */}
      <div className={`absolute -inset-[6px] rounded-full border-2 border-dashed
        transition-all duration-500
        ${activeAi
          ? 'border-[#00d2fc]/70 animate-spin [animation-duration:3s]'
          : 'border-white/10'}`}/>

      {/* Solid ring */}
      <div className={`absolute -inset-[3px] rounded-full border transition-all duration-300
        ${activeAi ? 'border-[#00d2fc]/60' : 'border-white/15'}`}/>

      {/* Circular image container */}
      <div className={`relative w-[72px] h-[72px] rounded-full overflow-hidden
        transition-all duration-300 ease-out
        ${activeAi
          ? 'scale-110 shadow-[0_0_24px_6px_rgba(0,210,252,0.55)]'
          : 'scale-100 shadow-[0_0_12px_2px_rgba(0,0,0,0.6)] hover:shadow-[0_0_18px_4px_rgba(0,210,252,0.3)] hover:scale-105'}`}>

        {/* Gradient border effect inside */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#00d2fc]/30 to-transparent z-10 pointer-events-none'/>

        <img
          src={ai} alt="AI Assistant"
          className='w-full h-full object-cover rounded-full'
        />
      </div>

      {/* Active label */}
      {activeAi && (
        <div className='absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap
        bg-[#00d2fc]/15 border border-[#00d2fc]/30 backdrop-blur-sm
        text-[#00d2fc] text-[10px] font-semibold tracking-wide
        px-2.5 py-0.5 rounded-full'>
          Listening...
        </div>
      )}

    </div>
  )
}

export default Ai
