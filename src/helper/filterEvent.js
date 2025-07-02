import { useState, useEffect } from "react";
import { convertTo12HourFormat } from "./helpers";

function useFilteredEvents(initialAllEventData, searchData) {
  const [allEvent, setAllEvent] = useState(initialAllEventData);

  useEffect(() => {
    const searchLower = searchData?.toLowerCase()?.trim();
    if (!searchLower) {
      setAllEvent([...initialAllEventData]);
    } else {
      const filteredDetails = initialAllEventData?.filter((item) =>
        [
          "auctionId",
          "status",
          "seller",
          "auctionSchedule",
          "description",
          "auctionType",
        ].some((field) =>
          field === "auctionSchedule"
            ? ["startDate", "endDate", "startingTime", "endingTime"].some(
                (subField) => {
                  const fieldValue = item[field]?.[subField];
                  if (
                    subField === "startingTime" ||
                    subField === "endingTime"
                  ) {
                    return convertTo12HourFormat(fieldValue)
                      ?.toLowerCase()
                      ?.includes(searchLower);
                  }
                  return fieldValue?.toLowerCase()?.includes(searchLower);
                }
              )
            : item[field]?.toLowerCase()?.includes(searchLower)
        )
      );
      setAllEvent(filteredDetails);
    }
  }, [searchData, initialAllEventData]);

  return allEvent;
}

export default useFilteredEvents;
