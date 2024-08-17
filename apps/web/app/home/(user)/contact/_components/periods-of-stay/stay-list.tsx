import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { StayListItem } from './stay-list-item';
import { ErrorAlert } from '../errorAlert';
import { loadUserWorkspace } from '~/home/(user)/_lib/server/load-user-workspace';

export async function StayList() {

    const supabase = getSupabaseServerComponentClient();
    const { user } = await loadUserWorkspace();
    const { data, error } = await supabase.from('contact_periods_of_stay')
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
                        <StayListItem
                            stay={a}
                        />
                    </div>
                </div>
            ))}
        </div>
    )


}