import AllAuctionTable from "../pages/auctionList/tables/AllAuctionTable";
import CompleteAuctionTable from "../pages/auctionList/tables/CompleteAuctionTable";
import PcbOffer from "../pages/auctionList/tables/PcbOffer";
import TodayAuction from "../pages/auctionList/tables/TodayAuction";
import UpcommingAuction from "../pages/auctionList/tables/UpcommingAuction";
import CoordinatorAllAuction from "../pages/coordinator/table/CoordinatorAllAuction";
import CoordinatorAuctionToday from "../pages/coordinator/table/CoordinatorAuctionToday";
import CoordinatorCompletedAuction from "../pages/coordinator/table/CoordinatorCompletedAuction";
import CoordinatorUpcomingAuction from "../pages/coordinator/table/CoordinatorUpcomingAuction";
import AllEventTable from "../pages/singleOrganization/seller/tables/AllEventTable";
import CompleteAuctionTables from "../pages/singleOrganization/seller/tables/CompleteAuctionTables";
import TodayAuctionTable from "../pages/singleOrganization/seller/tables/TodayAuctionTable";
import UpcommingAuctionTable from "../pages/singleOrganization/seller/tables/UpcommingAuctionTable";
import RefundHistory from "../pages/transcation/tables/RefundHistory";
import TranscationHistory from "../pages/transcation/tables/TranscationHistory";
import WithdrawRequest from "../pages/transcation/tables/WithdrawRequest";

export const sellerAuctionTable = {
  1: AllEventTable,
  2: TodayAuctionTable,
  3: UpcommingAuctionTable,
  4: CompleteAuctionTables,
};

export const dashboardAuctionTable = {
  1: AllAuctionTable,
  2: TodayAuction,
  3: UpcommingAuction,
  4: PcbOffer,
  5: CompleteAuctionTable,
};

export const coordinatorAuction = {
  1: CoordinatorAllAuction,
  2: CoordinatorAuctionToday,
  3: CoordinatorUpcomingAuction,
  4: CoordinatorCompletedAuction,
};


export const transactionRecordTable = {
  1: WithdrawRequest,
  2: TranscationHistory,
  3: RefundHistory,
};
