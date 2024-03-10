import { Id } from "@/convex/_generated/dataModel";

export const isUser = (uid: any): uid is Id<"users"> => {
    return uid.kind === "users";
};

export const isDoctor = (uid: any): uid is Id<"doctors"> => {
    return uid.kind === "doctors";
};