
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kit/ui/tabs";
import { ContactPhoneNumber } from './phone-number';


const contactList = [
  {
    label: 'Phone Numbers',
    component: <ContactPhoneNumber />,
  },
  {
    label: 'Addresses',
    component: null,
  },
  {
    label: 'Periods of Stay',
    component: null,
  },
  {
    label: 'Trips Abroad',
    component: null,
  },
  {
    label: 'Proceedings',
    component: null,
  },
  {
    label: 'Family',
    component: null,
  },
  {
    label: 'Work & School',
    component: null,
  },
  {
    label: 'Imigration',
    component: null,
  },

]

export function PersonalContactContainer() {


  return (
    <>
      <Tabs defaultValue={contactList[0]?.label}>
        <TabsList>
          {
            contactList.map((a, idx) => (
              <TabsTrigger key={idx} value={a.label} children={a.label} />
            ))
          }
        </TabsList>
        {
          contactList.map((a, idx) => (
            <TabsContent className="pt-2" key={idx} value={a.label} >{a.component}</TabsContent>
          ))
        }
      </Tabs>
    </>
  );
}


