'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTutorsCollection = async (tutor) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tutor)
    })

    const text = await res.text();

    const data = JSON.parse(text);

    if (data.insertedId) {
        revalidatePath('/tutors');
        return {
            success: true,
            data
        }
    }
    else {
        return {
            success: false,
            data
        }
    }
}

export const createMyTutorsCollection = async (tutorDetails) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tutorDetails)
    });

    const text = await res.text();

    const data = JSON.parse(text);

    if (data.insertedId) {
        return {
            success: true,
            data
        }
    }
    else {
        return {
            success: false,
            data
        }
    }
}

export const createStudentBookings = async (bookingData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });

    const text = await res.text();

    const data = JSON.parse(text);

    if (data.insertedId) {
        return {
            success: true,
            data
        }
    }
    else {
        return {
            success: false,
            data
        }
    }
}

export const updateSlot = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
        revalidatePath(`/tutors/${id}`);
        return { success: true, data };
    }
    else {
        return { success: false, data };
    }
}

export const updateMyTutors = async (id, editingTutor) => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/user/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingTutor)
        }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
        revalidatePath('/my-tutors');
        return {
            success: true,
            data
        };
    } else {

        return {
            success: false,
            data
        };
    }
};

export const updateStudentBookingStatus = async (id) => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/user/${id}` , {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ status: 'Cancelled' })
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
        revalidatePath('/my-tutors');
        return {
            success: true,
            data
        };
    } else {

        return {
            success: false,
            data
        };
    }
}

export const deleteMyTutor = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
        revalidatePath('/my-tutors');
        return { success: true, data }
    }
    else {
        return { success: false, data }
    }
}