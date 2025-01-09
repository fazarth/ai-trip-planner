import React, {useEffect, useState,} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger, 
} from '@/components/ui/dialog';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData,setFormData] = useState([]);
  const [openDialog,setOpenDialog] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })  
  }

  useEffect(() => {
    console.log(formData);
  },[formData])

  const login = useGoogleLogin ({
    onSuccess:(codeResp)=> console.log(codeResp),
    onError:(error)=>console.log(error)
  })

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
  })
}

  const OnGenerateTrip=async()=>{

    const user = localStorage.getItem('user');
    if(!user){
      setOpenDialog(true)
    }

    if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData?.traveller)
      {
        toast("Please fill all the fields", {type: 'error'})
        return
      }
      const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{budget}', formData?.budget)
      .replace('{traveler}', formData?.traveller)

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      console.log(result?.response?.text());
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based n your preferences.</p>
        <div className='mt-20 flex flex-col gap-9'>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
                <GooglePlacesAutocomplete
                apiKey = {import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {setPlace(v); handleInputChange('location', v)},
                }}
                />
            </div>
            <div>
              <h2 className='text-xl my-3 font-medium'>How many days are you planning trip?</h2>
              <Input placeholder={'Ex.3'} type="number" 
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
              />
            </div>
            <div>
              <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item,index)=>(
                  <div key={index} onClick={()=>handleInputChange('budget', item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${formData?.budget==item.title&&'shadow-lg border-black'}
                  `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelList.map((item,index)=>(
                  <div key={index} onClick={()=>handleInputChange('traveller', item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.traveller==item.people&&'shadow-lg border-black'}
                  `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
        </div>
        <div className='mt-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                  <img src="/logo.svg"/>
                  <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
                  <p>Sign in to the App with Google Authentication Security</p>
                <Button onClick={login} className="w-full mt-5 gap-4 items-center">
                <FcGoogle className='h-1 w-7'/>
                 Sign in with Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateTrip