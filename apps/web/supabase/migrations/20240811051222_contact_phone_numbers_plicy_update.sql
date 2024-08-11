drop policy "Enable read access for all users" on "public"."contact_phone_numbers";

drop policy "delete_policy" on "public"."contact_phone_numbers";

create policy "Enable read"
on "public"."contact_phone_numbers"
as permissive
for select
to authenticated
using (true);


create policy "Enable update"
on "public"."contact_phone_numbers"
as permissive
for update
to authenticated
using (true);


create policy "delete_policy"
on "public"."contact_phone_numbers"
as permissive
for delete
to authenticated
using (true);



