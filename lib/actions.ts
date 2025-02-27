"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
    name: z.string().min(4),
    phone: z.string().min(11)
})

export const saveContact = async (prevState: any, formData: FormData) => {

    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors
        }
    };

    try {
        await prisma.contact.create({
            data: {
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
            }
        })
    } catch (error) {
        return {message: "Fail to create contact"}
    }

    revalidatePath("/contacts");
    redirect("/contacts");
}

export const updateContact = async (id: string, prevState: any, formData: FormData) => {

    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors
        }
    };

    try {
        await prisma.contact.update({
            data: {
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
            },
            where: { id }
        })
    } catch (error) {
        return {message: "Fail to update contact"}
    }

    revalidatePath("/contacts");
    redirect("/contacts");
}

export const deleteContact = async (id: string) => {

    try {
        await prisma.contact.delete({
            where: { id }
        })
    } catch (error) {
        return {message: "Fail to delete contact"}
    }

    revalidatePath("/contacts");
}