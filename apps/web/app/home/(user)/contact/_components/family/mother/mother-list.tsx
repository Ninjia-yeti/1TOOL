import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { MotherItem } from './mother-list-item';
import { ErrorAlert } from '../../errorAlert';
import { loadUserWorkspace } from '~/home/(user)/_lib/server/load-user-workspace';

export async function MotherList() {

    const supabase = getSupabaseServerComponentClient();
    const { user } = await loadUserWorkspace();
    const { data, error } = await supabase.from('contact_family_mother')
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
                        <MotherItem
                            mother={a}
                        />
                    </div>
                </div>
            ))}
        </div>
    )


}