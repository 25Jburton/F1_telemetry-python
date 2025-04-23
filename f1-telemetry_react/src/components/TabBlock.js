import React, { useState } from 'react';
import WeatherBlock from './WeatherBlock';
import RadioBlock from './RadioBlock';
import PitBlock from './PitBlock'
import LapBlock from './LapBlock'

const Tab = ({ label, onClick, active }) => (
  <button className={active ? 'active-tab m-3 btn btn-primary btn-lg' : 'm-3 btn btn-secondary btn-md'} onClick={onClick}>
    {label}
  </button>
);

const TabPanel = ({ children }) => (
  <div className="tab-panel">
    {children}
  </div>
);

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className="tabs">
      <div className="tab-list row">
        {children.map((child) => (
          <Tab
            key={child.props.label}
            label={child.props.label}
            onClick={() => handleClick(child.props.label)}
            active={activeTab === child.props.label}
          />
        ))}
      </div>
      <div className="tab-content w-100">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <TabPanel key={child.props.label}>{child.props.children}</TabPanel>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const TabBlock = ({sessionValue, driverValue}) => {
  return (
    <Tabs>
      <TabPanel label="Laps">
        <LapBlock sessionValue={sessionValue} driverValue={driverValue} />
      </TabPanel>
      <TabPanel label="Pit Stops">
        <PitBlock sessionValue={sessionValue} driverValue={driverValue} />
      </TabPanel>
      <TabPanel label="Radio / Race Control">
        <RadioBlock sessionValue={sessionValue} driverValue={driverValue} />
      </TabPanel>
      <TabPanel label="Weather">
        <WeatherBlock sessionValue={sessionValue}/>
      </TabPanel>
    </Tabs>
  );
};

export default TabBlock;