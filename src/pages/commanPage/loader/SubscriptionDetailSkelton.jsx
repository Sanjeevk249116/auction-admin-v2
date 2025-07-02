import React from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

function SubscriptionDetailSkelton() {
  const isDastop = useMediaQuery({ query: "(max-width: 1630px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1330px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 950px)" });
  const isSmallTablet = useMediaQuery({ query: "(max-width: 700px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  return (
    <div>
      <div className="valign-wrapper mt-1 mb-2">
        <span className="valign-wrapper" style={{ gap: "25px" }}>
          <Skeleton width={100} />
          <Skeleton width={200} />
        </span>
      </div>
      <div className={`${isDastop ? "" : "container"}`}>
        <div className="flex justify-center ">
          <b className={`valign-wrapper font-16px mb-1 `}>
          <Skeleton width={50} />
          <Skeleton width={200} />
          <Skeleton width={`40%`} />
          </b>
        </div>
        <div
          className={`cover ${
            isMobile ? "p-1" : isSmallTablet ? "p-2" : "grid-2"
          } white mt-1 mb-3`}
        >
          <span className={`${isTablet ? "p-1" : "p-2"}`}>
          <Skeleton width={300} />
            <div className="valign-wrapper space-between ml-3 mt-1">
              <b className="cover font-25px" style={{ padding: "5px 15px" }}>
              <Skeleton width={200} />
              </b>
              <button
                className="button-style white-text  pointer"
                style={{ padding: "10px 15px" }}
              >
                <Skeleton width={250} />
              </button>
            </div>
          </span>
          <div
            className="valign-wrapper pin-top"
            style={{ width: !isLaptop && "80%" }}
          >
            {!isSmallTablet && (
              <p
                style={{
                  height: "100%",
                  width: "2px",
                  border: "1px solid #eaeaf1",
                }}
              ></p>
            )}
            <p
              className={`ml-3 fontstyle font-16px bold ${
                isTablet ? "p-1" : "p-2"
              }`}
            >
              <Skeleton width={400} count={6} />
            </p>
          </div>
        </div>
        <div className={`cover white ${isLaptop ? "p-2" : "p-3"}`}>
        <Skeleton width={100} />
        <Skeleton width={400} />
          <div
            className={`flex mt-2 ${
              isLaptop && "justify-center gap-2"
            } flex-wrap`}
          >
            <div
              className="p-1 border-1px border-radius-12  z-depth-2 pin-top"
              style={{ zIndex: "1", width: "300px", height: "140px" }}
            >
              <p
                className=" font-20px  white-text mb-1"
                style={{
                  padding: "5px 25px",
                  borderRadius: "8px",
                  width: "130px",
                }}
              >
                <Skeleton width={200} />
              </p>
              <span className="font-30px  bold">
              <Skeleton width={250} />
              </span>
              <Skeleton width={300} />
              <Skeleton width={300} />
            </div>
            <div
              className={`${isLaptop ? "ml-2" : "ml-5"}`}
              style={{ flex: !isTablet && 0.9, width: "312px" }}
            >
               <Skeleton width={200} />
               <Skeleton width={300}  count={6}/>
            </div>
            <div
              className={`flex column space-between ${
                isTablet ? "gap-2 valign-wrap" : "flex"
              }`}
              style={{
                width: isMobile
                  ? "70%"
                  : isSmallTablet
                  ? "50%"
                  : isTablet
                  ? "30%"
                  : "365px",
              }}
            >
              <p
                className="p-1 border-radius-12"
               
              >
                 <Skeleton width={`40%`} />
              </p>
              <Skeleton width={300} height={60}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetailSkelton;
