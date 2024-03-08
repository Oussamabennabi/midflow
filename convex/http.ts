import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { ClerkUser } from "./users";

function ensureEnvironmentVariable(name: string): string {
    const value = "whsec_eIdLQ6iWXuZJ5o7wkJNBQ4OD1AVTamjj"

    if (value === undefined) {
        throw new Error(`missing environment variable ${name}`);
    }
    return value;
}

const webhookSecret = ensureEnvironmentVariable("CLERK_WEBHOOK_SECRET");

const handleClerkWebhook = httpAction(async (ctx, request) => {

    const event = await validateRequest(request);
    if (!event) {
        return new Response("Error occured", {
            status: 400,
        });
    }

    switch (event.type) {
        case "user.created": // intentional fallthrough
        case "user.updated": {
            const existingUser = await ctx.runQuery(internal.users.getUser, {
                subject: event.data.id,
            });
            if (existingUser && event.type === "user.created") {
                console.warn("Overwriting user", event.data.id, "with", event.data);
            }
            const u = event.data
            const data:ClerkUser["clerk_user"] = {
                email_addresses:u.email_addresses.map(e=>({email_address:e.email_address})),
                first_name:u.first_name,
                last_name:u.last_name,
                has_image:u.has_image,
                image_url:u.image_url,
                id:u.id,
                phone_numbers:u.phone_numbers.map(p=>(p.phone_number)),
            }
            console.log("creating/updating user", event.data.id);
            await ctx.runMutation(internal.users.updateOrCreateUser, {
                user:data
            });
            break;
        }
        case "user.deleted": {
            // Clerk docs say this is required, but the types say optional?
            const id = event.data.id!;
            await ctx.runMutation(internal.users.deleteUser, { id });
            break;
        }
        default: {
            console.log("ignored Clerk webhook event", event.type);
        }
    }
    return new Response(null, {
        status: 200,
    });
});

const http = httpRouter();
http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: handleClerkWebhook,
});

async function validateRequest(
    req: Request
): Promise<WebhookEvent | undefined> {
    const payloadString = await req.text();

    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };

    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
        evt = wh.verify(payloadString, svixHeaders) as Event;

    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        return;
    }

    return evt as unknown as WebhookEvent;
}

export default http;