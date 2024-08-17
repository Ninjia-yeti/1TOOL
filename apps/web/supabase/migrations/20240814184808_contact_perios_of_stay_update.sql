create policy "authenticated"
on "public"."contact_periods_of_stay"
as permissive
for all
to authenticated
using (true);



