"use client"

import { updateContact } from "@/lib/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "./ui/Button";
import type { Contact } from "@prisma/client";

const UpdateForm = ({contact} : {contact: Contact}) => {

    const updateContactWithId = updateContact.bind(null, contact.id)
    const [state, formAction] = useFormState(updateContactWithId, null);

  return (
    <div>
        <form action={formAction}>
            <div className="mb-5">
                <label htmlFor="name" className='block text-sm font-medium text-gray-900'>Full Name</label>
                <input
                    type="text"
                    name='name'
                    id='name'
                    placeholder='fullname...'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    defaultValue={contact?.name}
                />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className='block text-sm font-medium text-gray-900'>phone number</label>
                <input
                    type="text"
                    name='phone'
                    id='phone'
                    placeholder='phone number'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    defaultValue={contact?.phone}
                />
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
                </div>
                <div id="message-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.message}</p>
                </div>
            </div>
            <SubmitButton label="Update" />
        </form>
    </div>
  )
}

export default UpdateForm