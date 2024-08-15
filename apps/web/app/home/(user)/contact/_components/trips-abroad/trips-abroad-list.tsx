import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { TripsAbroadListItem } from './trips-abroad-list-item';
import { ErrorAlert } from '../errorAlert';
import { loadUserWorkspace } from '~/home/(user)/_lib/server/load-user-workspace';

export async function TripsAbroadList() {

    const supabase = getSupabaseServerComponentClient();
    const { user } = await loadUserWorkspace();
    const { data, error } = await supabase.from('contact_trips_abroads')
        .select('*')
        .eq("user", user.id)
        .order('id', { ascending: true });
    if (error) {
        return <ErrorAlert error='An error occured while fetching contact informatioin' />
    }

    return (
        <div className='grid grid-cols-2 gap-4'>
            {data.map((a, idx) => (
                <div key={idx}>
                    <div>
                        <TripsAbroadListItem
                            trip={a}
                        />
                    </div>
                </div>
            ))}
        </div>
    )


}