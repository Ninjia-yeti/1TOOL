create policy "delete_policy"
on "public"."contact_phone_numbers"
as permissive
for delete
to public
using (true);


-- CREATE TRIGGER accounts_teardown AFTER DELETE ON public.accounts FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:3000/api/db/webhook', 'POST', '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}', '{}', '5000');

-- CREATE TRIGGER invitations_insert AFTER INSERT ON public.invitations FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:3000/api/db/webhook', 'POST', '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}', '{}', '5000');

-- CREATE TRIGGER subscriptions_delete AFTER DELETE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:3000/api/db/webhook', 'POST', '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}', '{}', '5000');


