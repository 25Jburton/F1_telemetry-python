import React, { useState } from 'react';
import WeatherBlock from './WeatherBlock';

const Tab = ({ label, onClick, active }) => (
  <button className={active ? 'active-tab m-3 btn btn-primary btn-lg' : 'm-3 btn btn-secondary btn-md'} onClick={onClick}>
    {label}
  </button>
);

const TabPanel = ({ children }) => (
  <div className="tab-panel mb-5">
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
      <div className="tab-content">
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

const TabBlock = ({sessionValue}) => {
  return (
    <Tabs>
      <TabPanel label="Laps">
        <p>getSessionLaps</p>
        <p>getSessionPositions</p>
      </TabPanel>
      <TabPanel label="Pit Stops">
        <p>getSessionPitStops</p>
      </TabPanel>
      <TabPanel label="Radio / Race Control">
        <p>getSessionTeamRadio</p>
        <p>getSessionRaceControl</p>
      </TabPanel>
      <TabPanel label="Weather">
        <WeatherBlock sessionValue={sessionValue}/>
      </TabPanel>
    </Tabs>
  );
};

export default TabBlock;