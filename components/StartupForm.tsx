'use client'
/*
import React, {useState, useActionState} from 'react'
import {Input }  from '@/components/ui/input'
import {Textarea }  from '@/components/ui/textarea'
import {Button }  from '@/components/ui/button'
import {Send} from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import {formSchema} from '@/lib/validation'
import { z } from "zod";
import { useToast } from '@/hooks/use-toast'
import { useRouter } from "next/navigation";
//import { createPitch } from "@/lib/actions";




const StartupForm = () =>{
    // for check Errors
    const [errors, setErrors] = useState<Record<string,string>>({});

    //for markdown pitch field 
    const [ pitch, setPitch ] = useState("")

    // use toast for appropriate Pop UP  Error message
    const { toast }= useToast();

    // for re direct on details page
    const router = useRouter();


    // for button 
    //const isPending = false;

    // TOOO:: HANDLE THE SUBBMITION && STATE
    const handleFormSubmit = async (prevState: any, formData: FormData) => { // function handle after submition
        try{
            //get all value 
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,

            };
            // get all value and compare them formSchema with validation

            await formSchema.parseAsync(formValues)
            //console.log(formValues)


            // const result = await createIdea(prevState, formData, pitch);
            
            // console.log(result)
            // if(result.status=='SUCCESS'){
            //     toast({
            //         title: "SUCCESS",
            //         description: 'Your Startup pitch has been Succsefully Created',,
            //     });
            //     router.push('/startup/${result._id}')

            // }
            // return result;

        }   catch(error){ // if error Acourred then
                if(error instanceof z.ZodError){
                    const fieldErrors = error.flatten().fieldErrors;

                    setErrors(fieldErrors as unknown as Record<string, string >);
                    
                    //Toast for manage Error masage

                    toast({
                        title: "Error",
                        description: "Please check Your input and try again",
                        variant: "destructive"
                    });

                    return { ...prevState, error: 'Validation failed', status: 'ERROR'};
                }

                toast({
                    title: "Error",
                    description: 'An unexpected error has occureed',
                    variant: "destructive"
                });

                return{
                    ...prevState,
                    error: 'An unexpected error has occureed',
                    status: "ERROR"
                };
        }
    }; 
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status : 'INITIAL', });

    return (
        <div>
            <form action={ formAction}

                // Your form submission logic here
         className='startup-form'>

                <div>
                    <label htmlFor='title' className='startup-form_label'>Title</label>

                    <Input
                        id= 'title'
                        name='title'
                        className='startup-form_input'
                        required
                        placeholder='Startup Title'
                        />

                    {errors.title && <p className='startup-form_error'>{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor='description' className='startup-form_label'>DESCRIPTION</label>

                    <Textarea
                         id= 'description'
                        name='discription'
                        className='startup-form_textarea'
                        required
                        placeholder='Startup Description'
                        />

                    {errors.description && <p className='startup-form_error'>{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor='category' className='startup-form_label'>category</label>

                    <Input
                        id= 'category'
                        name='category'
                        className='startup-form_input'
                        required
                        placeholder='Startup Category ( Tech, Health, E-Commers, Education.....)'
                        />

                    {errors.category && <p className='startup-form_error'>{errors.category}</p>}
                </div>
                <div>
                    <label htmlFor='link' className='startup-form_label'>Image url</label>

                    <Input
                        id= 'link'
                        name='link'
                        className='startup-form_input'
                        required
                        placeholder='Startup Image URL'
                        />

                    {errors.link && <p className='startup-form_error'>{errors.link}</p>}
                </div>

                <div data-color-mode='light'>
                    <label htmlFor='pitch' className='startup-form_label'>Pitch</label>
                    <MDEditor
                        value= {pitch}
                        onChange={(value) => setPitch(value as string)}
                        id= "pitch"
                        preview="edit"
                        height={300}
                        style={{borderRadius: 20, overflow: 'hidden'}}
                        textareaProps={{
                            placeholder:
                                "Brifly describe your idea and what problems it solves"
                        }}
                        previewOption={{
                            disallowedElement: ['style'],
                        }}
                         />
                    

                    {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
                </div>
                    
                    <Button type='submit' className='startup-form_btn text-white'
                    disabled={isPending}>
                        {isPending? 'Submitting....' : "Submit your pitch"}
                        <Send className="size-6 ml-2"/>

                    </Button>
            </form>
        </div>
    );
};

export default StartupForm;  */



// TOOO :: COPY PASTE

"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);   //create pitch

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);    //display pitch
      }

      return result;

      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;