alter table "public"."contact_periods_of_stay" drop column "grantedDurationOfStatus: z.boolean()";

alter table "public"."contact_periods_of_stay" add column "grantedDurationOfStatus" boolean not null;


