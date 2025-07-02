import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { NoItemsLeftInTable } from "../../../../../helper/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailOfcatalogue } from "../../../../../redux/action/catelogue";

function CatelogueAcceptedBy() {
  const { id } = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { allCatalogueDetails } = useSelector(
    (state) => state.catelogueData
  );
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  useEffect(() => {
    dispatch(getAllDetailOfcatalogue(id));
  }, [dispatch, id]);

  return (
    <div className="mt-1">
      <span className={`valign-wrapper gap-1`}>
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>

        <h4>Catalogue Accepted list</h4>
      </span>
      <div className={`${!isTablet && "table-container-style"} mt-1 full-width`}>
        <table
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Organization</th>

            </tr>
          </thead>
          <tbody>
            {allCatalogueDetails?.tradersConfirmed?.map((item, index) => (

              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.organizationName || "..."}</td>
              </tr>
            ))}

          </tbody>
        </table>
        {allCatalogueDetails?.tradersConfirmed?.length === 0 && <NoItemsLeftInTable />}
      </div>
    </div>
  );
}

export default CatelogueAcceptedBy;
