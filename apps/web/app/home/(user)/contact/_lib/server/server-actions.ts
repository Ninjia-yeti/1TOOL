'use server';

import { redirect } from 'next/navigation';
import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';
import { requireUser } from '@kit/supabase/require-user';


import {
  PersonalContactPhoneSchema,
  PersonalContactPhoneDeleteSchema,
  PersonalContactPhoneEditSchema,
  PersonalContactAddressSchema,
  PersonalContactTripsAbroadSchema,
  PersonalContactProceedingSchema,
  PersonalContactPetitionSchema,
  PersonalContactFamily_FatherSchema,
  IdSchema,
  PersonalContactStaySchema
} from '../schema/personal-contact-schema';


export const createPersonalContactPhone = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      const { error } = await client.from('contact_phone_numbers')
        .insert(
          {
            number: payload.number,
            type: payload.type,
            user: userId
          }
        );
      if (error) {
        throw new Error(`Failed to save number`);
      }
    }
    catch (error) {
      throw new Error(`Failed to save number error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneSchema,
  },
);
export const editPersonalContactPhone = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_phone_numbers')
        .update({
          number: payload.number,
          type: payload.type
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit number`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit number error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneEditSchema,
  },
);

export const deletePersonalContactPhone = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { data, error } = await client.from('contact_phone_numbers')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete number`);
      }
    } catch (error) {
      throw new Error(`Failed to delete number error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneDeleteSchema
  }
)

export const createPersonalContactAddress = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_addresses')
        .insert(
          {
            ...payload,
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save address error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactAddressSchema,
  },
);

export const editPersonalContactAddress = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_addresses')
        .update({
          ...payload
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit address`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit address error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactAddressSchema.merge(IdSchema),
  },
);

export const deletePersonalContactAddress = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_addresses')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete address`);
      }
    } catch (error) {
      throw new Error(`Failed to delete address error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneDeleteSchema
  }
)

export const createPersonalContactStay = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_periods_of_stay')
        .insert(
          {
            ...payload,
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save stau data error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactStaySchema,
  },
);


export const editPersonalContactStay = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_periods_of_stay')
        .update({
          ...payload
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit stay info`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit stay info error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactStaySchema.merge(IdSchema),
  },
);

export const deletePersonalContactStay = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_periods_of_stay')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete stay info`);
      }
    } catch (error) {
      throw new Error(`Failed to delete stay info error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: IdSchema
  }
)


export const createPersonalContactTripsAbroad = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_trips_abroads')
        .insert(
          {
            ...payload,
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save trips error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactTripsAbroadSchema,
  },
);

export const editPersonalContactTripsAbroad = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_trips_abroads')
        .update({
          ...payload
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit trip info`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit trip info error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactTripsAbroadSchema.merge(IdSchema),
  },
);

export const deletePersonalContactTripsAbroad = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_trips_abroads')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete trip info`);
      }
    } catch (error) {
      throw new Error(`Failed to delete trip info error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: IdSchema
  }
)


export const createPersonalContactProceeding = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_proceedings')
        .insert(
          {
            ...payload,
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save proceeding error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactProceedingSchema,
  },
)


export const editPersonalContactProceeding = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_proceedings')
        .update({
          ...payload
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit proceeding info`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit proceeding info error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactProceedingSchema.merge(IdSchema),
  },
);

export const deletePersonalContactProceeding = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_proceedings')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete proceeding info`);
      }
    } catch (error) {
      throw new Error(`Failed to delete proceeding info error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: IdSchema
  }
)


export const createPersonalContactPetition = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_petitions')
        .insert(
          {
            ...payload,
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save petition error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPetitionSchema
  },
)


export const editPersonalContactPetition = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_petitions')
        .update({
          ...payload
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit petition info`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit petition info error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPetitionSchema.merge(IdSchema),
  },
);

export const deletePersonalContacPetition = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_petitions')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete petition info`);
      }
    } catch (error) {
      throw new Error(`Failed to delete petition info error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: IdSchema
  }
)
export const createPersonalContactFamily_Father = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_family_father')
        .insert(
          {
            ...payload,
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save family error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactFamily_FatherSchema
  },
)


export const editPersonalContactFamily_Father = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_family_father')
        .update({
          ...payload
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit family info`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit family info error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactFamily_FatherSchema.merge(IdSchema),
  },
);

export const deletePersonalContacFamily_Father = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_family_father')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete family info`);
      }
    } catch (error) {
      throw new Error(`Failed to delete family info error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: IdSchema
  }
)
