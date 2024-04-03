import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {PreviousTrip,CurrentTrip}from "./DropDownMenu";
 
export function ModalTabs({isOpen, setIsOpen}) {
  const data = [
    {
      label: "Current Trip",
      value: "curent-Trip",
      desc:<CurrentTrip isOpen={isOpen} setIsOpen={setIsOpen}/>
    },
    {
      label: "Previous Trips",
      value: "Previous-Trips",
      desc:<PreviousTrip isOpen={isOpen} setIsOpen={setIsOpen}/>
    },
  ];
 
  return (
    <div className="w-full">
    <Tabs className="  shadow-md" value="curent-Trip" orientation="vertical">
      <TabsHeader >
        {data.map(({ label, value }) => (
          <Tab className="bg-cyan-500 shadow-cyan-500/50 rounded-md p-1 m-2 text-nowrap font-semibold active:bg-sky-300 shadow-md hover:bg-sky-300" key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="shadow-lg ">
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
  );
}
export default ModalTabs