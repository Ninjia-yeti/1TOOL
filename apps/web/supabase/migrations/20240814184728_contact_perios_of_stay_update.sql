drop policy "authenticted" on "public"."contact_periods_of_stay";

alter table "public"."contact_periods_of_stay" drop column "grantedDurationOfStatus";

alter table "public"."contact_periods_of_stay" add column "cityOfEntry" text not null;

alter table "public"."contact_periods_of_stay" add column "grantedDurationOfStatus: z.boolean()" boolean not null;

alter table "public"."contact_periods_of_stay" add column "portOfEntry" text not null;

alter table "public"."contact_periods_of_stay" add column "stateOfEntry" text not null;

alter table "public"."contact_periods_of_stay" alter column "user" set not null;


