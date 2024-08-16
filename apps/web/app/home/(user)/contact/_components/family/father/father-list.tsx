import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { PetitionItem } from './father-list-item';
import { ErrorAlert } from '../../errorAlert';
import { loadUserWorkspace } from '~/home/(user)/_lib/server/load-user-workspace';

export async function PetitionList() {

    const supabase = getSupabaseServerComponentClient();
    const { user } = await loadUserWorkspace();
    const { data, error } = await supabase.from('contact_petitions')
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
                        <PetitionItem
                            petition={a}
                        />
                    </div>
                </div>
            ))}
        </div>
    )


}