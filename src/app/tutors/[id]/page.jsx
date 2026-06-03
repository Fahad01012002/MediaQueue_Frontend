
import { getTutorDetails } from "@/app/lib/data";
import TutorCard from "@/app/components/TutorCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const tutor = await getTutorDetails(id);

    if (!tutor) {
        return {
            title: "Tutor Not Found",
            description: "The requested tutor could not be found",
        };
    }

    return {
        title: `${tutor.name} | Tutor Details`,
        description: `Learn from ${tutor.name} - ${tutor.subject} expert with ${tutor.experience} years of experience`,
        openGraph: {
            title: tutor.name,
            description: tutor.bio?.substring(0, 160),
            images: tutor.image ? [tutor.image] : [],
        },
    };
}

const TutorsDetailsPage = async ({ params }) => {

    const { id } = await params;
    const tutor = await getTutorDetails(id);

    if (!tutor) {
        return (
            <div className="not-found">
                <h1>Tutor Not Found</h1>
                <p>Sorry, the tutor you're looking for doesn't exist.</p>
            </div>
        );
    }

    return <TutorCard tutor={tutor} />;
};

export default TutorsDetailsPage;