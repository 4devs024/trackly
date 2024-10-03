import { createContext, useContext, useState } from "react";


const PanelControlContext = createContext();

export const usePanelControlContext = () => useContext(PanelControlContext);



export const PanelControlProvider = ({children}) => {

    // This is used to give the toggle effect to the side navbar
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    // This is used to make result bar visible or invisible
    const [showResultBar, setShowResultBar] = useState(false); 
    // This is used to give the toggle effect to the result bar
    const [isResultOpen, setIsResultOpen] = useState(true);
    // This is used to make navbar tabs visible or invisible
    const [isTopNavVisible, setIsTopNavVisible] = useState(true); 
    // This is used to load the bus schedule layer on top of result content bar
    const [isScheduleAsked, setIsScheduleAsked] = useState(false);

    // This function is used to give the toggle effect to the result bar
    const toggleResultSidebar = () => {
        setIsResultOpen(!isResultOpen);
    };

    // This function is used to give the toggle effect to the side nav bar
    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    }

    // This is used to control the visibility of result bar
    const setResultBarVisibility = (val) => {
        setShowResultBar(val);
    }

    // This function is used to control the bus schedule and TopNav tabs visibility
    const setScheduleVisibility = (val) => {
        setIsScheduleAsked(val);
        setIsTopNavVisible(!val);
    }



    return(
        <PanelControlContext.Provider value={{
            isResultOpen,
            setIsResultOpen,
            isSideNavOpen,
            setIsSideNavOpen,
            toggleResultSidebar,
            toggleSideNav,
            showResultBar,
            setShowResultBar,
            setResultBarVisibility,
            isTopNavVisible,
            setIsTopNavVisible,
            isScheduleAsked,
            setIsScheduleAsked,
            setScheduleVisibility
        }}>
            {children}
        </PanelControlContext.Provider>
    )

}