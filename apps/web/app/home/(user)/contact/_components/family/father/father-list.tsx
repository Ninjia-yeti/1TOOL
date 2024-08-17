import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { FatherItem } from './father-list-item';
import { ErrorAlert } from '../../errorAlert';
import { loadUserWorkspace } from '~/home/(user)/_lib/server/load-user-workspace';

export async function FatherList() {

    const supabase = getSupabaseServerComponentClient();
    const { user } = await loadUserWorkspace();
    const { data, error } = await supabase.from('contact_family_father')
        .select('*')
        .eq("user", user.id)
        .order('id', { ascending: true });
    if (error) {
        return <ErrorAlert error='An error occured while fetching contact informatioin' />
    }

    return (
        <div className='w-full'>
            {data.map((a, idx) => (
                <div key={idx}>
                    <div>
                        <FatherItem
                            father={a}
                        />
                    </div>
                </div>
            ))}
        </div>
    )


}