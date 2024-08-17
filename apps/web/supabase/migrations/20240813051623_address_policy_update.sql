drop policy "insert" on "public"."contact_addresses";

create policy "Enable insert for authenticated users only"
on "public"."contact_addresses"
as permissive
for insert
to authenticated
with check (true);



