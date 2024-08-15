drop policy "Enable insert for authenticated users only" on "public"."contact_periods_of_stay";

drop policy "delete" on "public"."contact_periods_of_stay";

drop policy "select" on "public"."contact_periods_of_stay";

drop policy "update" on "public"."contact_periods_of_stay";

drop policy "authenticated" on "public"."contact_phone_numbers";

create policy "authenticted"
on "public"."contact_periods_of_stay"
as permissive
for all
to public
using (true);


create policy "authenticated"
on "public"."contact_phone_numbers"
as permissive
for all
to authenticated
using (true);



