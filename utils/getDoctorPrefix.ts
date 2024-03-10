import { DataModel } from "@/convex/_generated/dataModel";
type getDoctorPrefixProps = {
    gender?:"male"|"female"
    clerk_user?: DataModel["users"]["document"]["clerk_user"]
}
export const getDoctorPrefix = ({clerk_user,gender}:getDoctorPrefixProps) => {
    let prefix = ""
    if (gender === "male") {
        prefix = "Dcr."
    } else if (gender === "female") {
        prefix = "Miss."
    }
    return prefix + clerk_user?.first_name + " " + clerk_user?.last_name
}