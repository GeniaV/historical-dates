import React, { createContext, ReactNode, useContext, useState } from "react";
import { segments, pageTitle } from "../staticData";

interface Event {
  year: number;
  description: string;
}

interface Category {
  name: string;
  dateRange: string;
  events: Event[];
}

interface TimelineContextType {
  pageTitle: string;
  segments: Record<number, Category>;
  currentSegmentId: number;
  currentEventIndex: number;
  setCurrentSegmentId: (id: number) => void;
  setCurrentEventIndex: (index: number) => void;
  currentCategory: Category;
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSegmentId, setCurrentSegmentId] = useState(1);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const currentCategory = segments[currentSegmentId];

  return (
    <TimelineContext.Provider
      value={{
        pageTitle,
        segments,
        currentSegmentId,
        currentEventIndex,
        setCurrentSegmentId,
        setCurrentEventIndex,
        currentCategory,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) throw new Error;
  return context;
};
