import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { AddressListItem } from './address-list-item';
import { ErrorAlert } from '../errorAlert';
import { loadUserWorkspace } from '~/home/(user)/_lib/server/load-user-workspace';

export async function AddressList() {

    const supabase = getSupabaseServerComponentClient();
    const { user } = await loadUserWorkspace();
    const { data, error } = await supabase.from('contact_addresses').select('*').eq("user", user.id);
    if (error) {
        return <ErrorAlert error='An error occured while fetching contact informatioin' />
    }

    return data.map((a, idx) => (
        <div key={idx}>
            <AddressListItem
                address={a}
            />
        </div>
    ))
}