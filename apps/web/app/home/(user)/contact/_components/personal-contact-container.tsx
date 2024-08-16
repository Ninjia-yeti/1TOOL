
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kit/ui/tabs";
import { ContactPhoneNumber } from './phone-number';
import { ContactAddress } from "./address";
import { ContactStay } from "./periods-of-stay";
import { ContactTripsAbroad } from "./trips-abroad";
import { ContactProceeding } from "./proceeding";
import { ContactPetition } from "./petition";

const contactList = [
  {
    label: 'Phone Numbers',
    component: <ContactPhoneNumber />,
  },
  {
    label: 'Addresses',
    component: <ContactAddress />,
  },
  {
    label: 'Periods of Stay',
    component: <ContactStay />,
  },
  {
    label: 'Trips Abroad',
    component: <ContactTripsAbroad />,
  },
  {
    label: 'Proceedings',
    component: <ContactProceeding />,
  },
  {
    label: 'Petition',
    component: <ContactPetition />,
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


