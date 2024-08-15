alter table "public"."contact_proceedings" alter column "current" set data type boolean using "current"::boolean;

alter table "public"."contact_proceedings" alter column "deportation" set data type boolean using "deportation"::boolean;

alter table "public"."contact_proceedings" alter column "exclusion" set data type boolean using "exclusion"::boolean;

alter table "public"."contact_proceedings" alter column "hearing" set data type boolean using "hearing"::boolean;

alter table "public"."contact_proceedings" alter column "otherJudicial" set data type boolean using "otherJudicial"::boolean;

alter table "public"."contact_proceedings" alter column "removal" set data type boolean using "removal"::boolean;

alter table "public"."contact_proceedings" alter column "rescission" set data type boolean using "rescission"::boolean;


