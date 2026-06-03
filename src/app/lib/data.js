export const getTutor = async (token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
    const data = await res.json();
    return data;
}

export const getTutorDetails = async (id , token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}` , {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export const getStudentTutorDetails = async (id , token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/user/${id}` , {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export const getStudentBookingsDetails = async (id , token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}` , {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}