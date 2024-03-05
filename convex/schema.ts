import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
function getList() {
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
export default defineSchema({
    doctors: defineTable({
        specialty: getList(),
        full_name: v.string(),
        location: v.any(),
        image: v.optional(v.string()),
        bio: v.string(),
        phone_numbers: v.array(v.string()),
        starting_consultaion_price: v.number(),
        // days_of_work:v.array(),
        years_of_experiance: v.number()

    }),
    patients: defineTable({
        full_name: v.string(),
        location: v.any(),
        image: v.optional(v.string()),
        bio: v.string(),
        phone_numbers: v.array(v.string()),

    }),
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
    }).index("reviews_by_doctor_id",["doctor_id"])
})

// services types

// jn7dsrc3tvkb2dq7g11wz0w3jx6mpx1h patient
// j57f2rgjfd1wxjmvphw29bx3s96mpedr