import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
function getSpecialtyList() {
    return v.union(
        v.literal("Allergy and immunology"),
        v.literal("Anesthesiology"),
        v.literal("Dermatology"),
        v.literal("Diagnostic radiology"),
        v.literal("Emergency medicine"),
        v.literal("Family medicine"),
        v.literal("Internal medicine"),
        v.literal("Medical genetics"),
        v.literal("Neurology"),
        v.literal("Nuclear medicine"),
        v.literal("Obstetrics and gynecology"),
        v.literal("Ophthalmology"),
        v.literal("Pathology"),
        v.literal("Pediatrics"),
        v.literal("Physical medicine and rehabilitation"),
        v.literal("Preventive medicine"),
        v.literal("Psychiatry"),
        v.literal("Radiation oncology"),
        v.literal("Surgery"),
        v.literal("Urology"),
    )
}
function getWorkingDays() {
    return v.union(
        v.literal(1),
        v.literal(2),
        v.literal(3),
        v.literal(4),
        v.literal(5),
        v.literal(6),
        v.literal(7),
    )
}


export default defineSchema({
    users: defineTable({
        clerk_user: v.object({
            email_addresses: v.array(v.object({
                email_address: v.string()
            })),
            first_name: v.string(),
            last_name: v.string(),
            has_image: v.boolean(),
            image_url: v.string(),
            id: v.string(),
            phone_numbers: v.array(v.string())
        }),
        role: v.union(v.literal("Doctor"),
            v.literal("Patient"),
            v.literal("Admin"),
            v.literal("Pharmasist")),
    }).index("by_clerk_id", ["clerk_user.id"]),
    doctors: defineTable({
        user_id: v.id("users"),
        image: v.optional(v.string()),
        bio: v.string(),

        specialty: getSpecialtyList(),
        location: v.any(),
        starting_consultaion_price: v.number(),
        working_days: v.array(getWorkingDays()),
        years_of_experiance: v.number(),
        phone_numbers: v.array(v.string()),
        // phone number will be added thoughout clerk
    }).index("by_user_id", ["user_id"]),
    hospitals: defineTable({
        location: v.any(),
        posterImageUrl: v.string(),
        name: v.string(),
        description: v.string(),
        doctors: v.array(v.id("doctors"))
    }),
    appontments: defineTable({
        doctor_id: v.id("doctors"),
        status: v.union(
            v.literal("cancelled"),
            v.literal("complete"),
            v.literal("scheduled"),
        ),
        patient_id: v.id("patients"),
        date: v.string(),
        time: v.string()
    }),
    doctor_reviews: defineTable({
        patient: v.object({
            id: v.id("patients"),
            image: v.optional(v.string()),
            full_name: v.string(),
        }),
        doctor_id: v.id("doctors"),
        content: v.string(),
        stars: v.number(),
    }).index("reviews_by_doctor_id", ["doctor_id"]),

    chats: defineTable({
        patient: v.id("users"),
        doctor: v.id("doctors"),
    }).index("by_patient_doctor", ["doctor", "patient"]),

    messages: defineTable({
        chat_id: v.id("chats"),
        sender_id: v.union(v.id("users"), v.id("doctors")),
        body: v.string(),
    }).index("by_chat_id",["chat_id"]),

    likes: defineTable({
        liker: v.union(v.id("doctors"), v.id("users")),
        messageId: v.id("messages"),
    }).index("byMessageId", ["messageId"]),

})

// services types

// jn7dsrc3tvkb2dq7g11wz0w3jx6mpx1h patient
// j57f2rgjfd1wxjmvphw29bx3s96mpedr