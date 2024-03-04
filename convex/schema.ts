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
        // userId
        full_name: v.string(),
        location: v.any(),
        poster_image: v.string(),
        bio: v.string(),
        rating: v.number(),
        phone_numbers: v.array(v.string()),
        starting_consultaion_price: v.number(),
        // days of work,
        years_of_experiance: v.number()

    }),
    hospitals: defineTable({
        location: v.any(),
        posterImageUrl: v.string(),
        name: v.string(),
        description: v.string(),
        doctors: v.array(v.id("doctors"))
        //! does hospital ever close??? 
    }),
    appontments: defineTable({
        doctor_id: v.id("doctors"),
        status: v.union(
            v.literal("cancelled"),
            v.literal("complete"),
            v.literal("scheduled"),
        ),
        patient_id: v.string(),
        date: v.string(),
        time: v.string()
    })
})

// services types