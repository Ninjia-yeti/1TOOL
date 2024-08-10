import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';
import { PhoneNumberListItem } from './phone-number-list-item';
import { ErrorAlert } from '../errorAlert';

export async function PhoneNumberList() {

    const supabase = getSupabaseServerComponentClient();

    const { data, error } = await supabase.from('contact_phone_numbers').select('*');

    if (error) {
        return <ErrorAlert error='An error occured while fetching contact informatioin' />
    }

    return data.map((a, idx) => (
        <div key={idx}>
            <PhoneNumberListItem
                phoneNumber={
                    {
                        number: a.number ?? '',
                        type: a.type ?? ''
                    }
                }
            />
        </div>
    ))
}