import Stripe from "stripe";
import { headers } from "next/headers";
import { createSupbaseAdmin } from "@/lib/supabase";
import { buffer } from "node:stream/consumers";
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SK_KEY!);
export async function POST(req: any) {
	
	const rawBody = await buffer(req.body);

	try {
		const sig = headers().get("stripe-signature");
		let event;
		try {
			event = stripe.webhooks.constructEvent(
				rawBody,
				sig!,
				endpointSecret
			);
			

		} catch (err: any) {
			return Response.json({ error: `Webhook Error ${err?.message!} ` });
		}
		switch (event.type) {
			case "customer.subscription.deleted":
				const deleteSubscription = event.data.object;

				
				await onCacnelSubscription(
					deleteSubscription.status === "active",
					deleteSubscription.id,
					deleteSubscription
				);
				break;
			case "customer.updated":
				const customer = event.data.object;
				const subscription = await stripe.subscriptions.list({
					customer: customer.id,
				});
				if (subscription.data.length) {
					const sub = subscription.data[0];

					
					await onSuccessSubscription(

						sub.id,
						customer.id,
						sub.status === "active",
						customer.email!,
						sub
					);
				}
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		return Response.json({});
	} catch (e) {
		return Response.json({ error: `Webhook Error}` });
	}
}

const onSuccessSubscription = async (
	subscription_id: string,
	customer_id: string,
	status: boolean,
	email: string,
	sub:any
) => {

	const supabase = await createSupbaseAdmin();
	const { data } = await supabase
		.from("profiles")
		.update({
			stripe_subscriptoin_id: subscription_id,
			stripe_customer_id: customer_id,
			subscription_status: status,
			stripe_sechma:JSON.stringify(sub)
		})
		.eq("email", email)
		.select("id")  
		.single();

		await supabase
		.from("subscriptions")
		.insert({
			stripe_subscriptoin_id:subscription_id,
			user_id: data?.id,
			plan_id: sub?.plan?.product,
			payment_status:'success',
			updated_at:new Date().toISOString(),
			stripe_sechma:JSON.stringify(sub),
			
		}).select()     
		
	await supabase.auth.admin.updateUserById(data?.id!, {
		user_metadata: { stripe_customer_id: null },
	});
};
   
const onCacnelSubscription = async (
	status: boolean,
	subscription_id: string,
	deleteSubscription:any
) => {
	const supabase = await createSupbaseAdmin();
	const { data, error } = await supabase
		.from("profiles")
		.update({
			stripe_subscriptoin_id: null,
			stripe_customer_id: null,
			subscription_status: status,
			stripe_sechma:JSON.stringify(deleteSubscription),
		})
		.eq("stripe_subscriptoin_id", subscription_id)
		.select("id")
		.single();


		await supabase
		.from("subscriptions")
		.update({
			payment_status:'canceled',
			updated_at:new Date().toISOString(),
			stripe_sechma:JSON.stringify(deleteSubscription),
		})
		.eq("stripe_subscriptoin_id", subscription_id)
		.select("id")
		.single();
	

	await supabase.auth.admin.updateUserById(data?.id!, {
		user_metadata: { stripe_customer_id: null },
	});
};




