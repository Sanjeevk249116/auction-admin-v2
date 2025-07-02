import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
} from "../helper/helpers";

export const globalContext = createContext();

function ContextProvider({ children }) {
  const [checkCatalogueSameData, setCheckCatalogueSameData] = useState(false);
  const [selectcheckboxItem, setSelectcheckboxItem] = useState({
    sellerCheckbox: false,
    auctionCheckbox: false,
    platformCheckbox: false,
    propertyCheckbox: false,
    termsCheckbox: false,
    onlineAuctionCheckbox: false,
  });

  const [liveRoomConnectionStatus, setLiveRoomConnectionStatus] =
    useState(true);
  const [homePageButton, setHomePageButton] = useState(1);
  const [catelogueInformation, setCatelogueInformation] = useState({
    sellerInformation: {
      companyName: "",
      companyAddress: "",
    },
    sellerTermsAndCondition: "",
    onlineAuctionCondition: "",
    auctionSupportServices: "",
    auctionInformation: [],
    companyDetails: "",
    membershipDetails: "",
    registerOffice: "",
    branchOffice: "",
    auctionProperty: [],
    contactOfficialData: [],
    lotsImages: [],
    imageName: "",
  });

  const [reverseCatalogueInformation, setReverseCatalogueInformation] =
    useState({
      buyerDetails: {
        buyerName: "",
        buyerAddress: "",
      },
      supportService: {
        registerAddress: "",
        branchAddress: "",
      },
      procurementOfHiring: {
        serviceInformation: "",
        declaration: "",
      },
      auctionInformation: [],
      contactDetails: {
        buyerContactDetails: "",
        cerclexContactDetails: "",
      },
      productList: [],
      termsAndCondition: "",
      generalTermsAndCondition: "",
      lotsImages: [],
      imageName: [],
      contactOfficialData: [],
      serviceName: "",
      auctionTypeStyle: "",
      description: "",
    });

  const { catelogueDetails } = useSelector(
    (state) => state.catelogueInformation
  );
  const { catalogueEditData } = useSelector((state) => state.catelogueData);
  const { singleAuctionData } = useSelector((state) => state.singleAuction);

  useEffect(() => {
    if (
      singleAuctionData?.auctionType === "forwardAuction" &&
      catelogueDetails
    ) {
      setCatelogueInformation({
        ...catelogueInformation,
        sellerInformation: {
          companyName:
            catalogueEditData?.catalogueData?.sellerCompanyName || "",
          companyAddress:
            catalogueEditData?.catalogueData?.sellerCompanyAddress || "",
        },
        auctionSupportServices:
          catalogueEditData?.catalogueData?.auctionInformation || "",
        auctionInformation: [
          { id: 1, label: "Auction ID", value: catelogueDetails?.auctionId },
          {
            id: 2,
            label: "Inspection of Auction Property",
            value: `${handleDateSetUp(
              catelogueDetails?.inspectionSchedule?.endDate
            )}, ${convertTo12HourFormat(
              catelogueDetails?.inspectionSchedule?.startingTime
            )} -  ${convertTo12HourFormat(
              catelogueDetails?.inspectionSchedule?.endingTime
            )}`,
          },
          {
            id: 3,
            label: "Venue of Inspection",
            value: catelogueDetails?.inspectionSchedule?.inspectionLocation,
          },
          {
            id: 4,
            label: "Last Date and Time to receive EMD",
            value: `${handleDateSetUp(
              catelogueDetails?.EMDSchedule?.lastDate
            )}, ${convertTo12HourFormat(
              catelogueDetails?.EMDSchedule?.lastTime
            )}`,
          },
          {
            id: 5,
            label: "Online Auction Date and Time",
            value: `${handleDateSetUp(
              singleAuctionData?.auctionSchedule?.startDate
            )}, ${convertTo12HourFormat(
              singleAuctionData?.auctionSchedule?.startingTime
            )} - ${convertTo12HourFormat(
              singleAuctionData?.auctionSchedule?.endingTime
            )}`,
          },
          {
            id: 6,
            label: "Auction Type",
            value: `${catelogueDetails?.auctionType === "forwardAuction"
              ? "Forward Auction"
              : "Reverse Auction"
              }`,
          },
          {
            id: 7,
            label: "Bid Validity",
            value: `${catelogueDetails?.bidValidity} Working Days`,
          },
          {
            id: 8,
            label: "Contract Validity",
            value: `${catelogueDetails?.contractValidity} Working Days`,
          },
        ],
        companyDetails:
          catalogueEditData?.catalogueData?.platformInformation?.companyName ||
          "",
        membershipDetails: "",
        registerOffice:
          catalogueEditData?.catalogueData?.platformInformation
            ?.registerAddress || "",
        branchOffice:
          catalogueEditData?.catalogueData?.platformInformation
            ?.barnchAddress || "",
        auctionProperty: catelogueDetails?.offers,
        contactOfficialData:
          catalogueEditData?.catalogueData?.cerclexContactDetails || [],
        lotsImages: [],
        imageName: "",
        sellerTermsAndCondition:
          catalogueEditData?.catalogueData?.sellerTermsAndConditions || "",
        onlineAuctionCondition: `
    I. DEFINITIONS
    
    1. SELLER: Seller referred in this catalog, is the Company selling the material.
    
    2. SERVICE PROVIDER: Cerclex Pvt. Ltd (hereinafter referred to as “Cerclex”) is
    an e-commerce service provider appointed by the Seller to facilitate virtual auction by the Seller. Cerclex will only facilitate online auction and is considered as third party not particularly interested in the item/s being sold on behalf of Seller.
    
    3. BIDDER / BUYER: Any person - as an individual OR a proprietor OR a partner OR an authorized representative of any company OR any legal entity and who is paying the requisite EMD and registered at Cerclex and who makes or places a bid for and purchases the auction property either in part or in full is considered as a Bidder. One individual can represent as a bidder on his own behalf and on behalf of other companies, provided, he registers himself in those capacities separately i.e., for each representation he should pay separate Earnest Money Deposit. Successful Bidder is that Bidder in whose name confirmation of sale is issued by the Seller. The Bidder understands that Cerclex  is only a facilitator and does not own the goods / services being auctioned. The Bidder will deal directly with the Seller for the payments, deliveries, qualities of the goods / services being auctioned and will adhere to all the terms & conditions as laid down by the Seller.
    
    4. TIMING OF ONLINE BID: Time wherever mentioned in any document relating to the bidding event including the auction catalog refers to Indian Standard Time (IST) i.e., UTC + 05.30 hrs. All the timings of the Online Bid shall be based on the time indicated by the Server hosting the Auction Engine. It shall be the endeavor of Cerclex to ensure that the Server Time reflects as closely as possible the Indian Standard Time (IST) i.e., UTC + 05.30 hrs. However, in the event of any deviations between the Server Time and the Indian Standard Time, the functioning of the Auction Engine (Start, operation, closure) would be guided by the Server Time. Bidders are advised to refresh the page by clicking link provided at the top right side of the Auction room to check the exact Server Time that is displayed there.
    
    II. GENERAL TERMS & CONDITIONS
    1. Subject to the reserve price, if any, fixed by the Seller and subject to the terms and conditions set out herein, sale shall be made to the successful Bidder on “AS IS WHERE IS BASIS” and “NO COMPLAINT BASIS.” The Seller does not undertake any responsibility to procure any permission/license etc. in respect of the auction property offered for sale.
    
    2. Seller reserves the right to modify and amend the terms & conditions and announce the same at any time before the auction concludes. Announcements during the auction on the website including announcement of any additional conditions or correction in the catalogue and/or additions or deletions of items being offered for sale are being done with the consent and knowledge of the Seller, and it is binding on the Bidder. Bidders are advised in their own interest not to leave the auction room till the entire auction is closed.
    
    3. Participation and bidding in this Auction shall be treated as conclusive evidence of the fact that the Bidder has inspected the Auction Property and the documents pertaining to it and is satisfied in all respects regarding quantity, quality, condition of the Auction property, taxes, and other extraneous factors and the Principle of Caveat Emptor (let the buyer beware) will apply. It shall also imply that the Bidder has carefully gone through and understood the terms and conditions of Auction including the amendments if any, prevailing at the time of Auction. Seller/Cerclex will not entertain any complaints or objections once Bid is placed. Final decision regarding participation shall rest with the Seller.
    
    4. Seller/Cerclex does not give warranty or guarantee of the quality, quantity, measurement, condition Chemical composition of each individual item/s or lot/s that form the auction property and about its “End Use” or fitness for a particular purpose.
    
    5. The highest Bidder does not get any right to demand acceptance of his offer. SELLER reserves the right to accept/ reject/ cancel any bid, withdraw any portion of the Auction Property at any stage from Auction even after acceptance of bid/ issue of delivery order or release order/ deposit of full value by successful Bidder without assigning any reason thereof. In the event of such rejection/ cancellation/withdrawal, SELLER, shall refund the value of Auction Property, if paid for, to the successful Bidder. SELLER shall not be responsible for any damages/losses whatsoever to the successful Bidder on account of such withdrawal.
    
    6. EMD amount will not carry interest.
    
    7. In the event of failure on the part of the successful Bidder to fulfill his contractual obligations, Seller / Cerclex reserves the right to debar such Bidder from participating in any future auction conducted by Cerclex on behalf of Seller.
    
    8. GST introduced by Government of India:
    A. Bidders participating in Cerclex Auctions should verify with the selling companies
    about the tax structure and ascertain themselves of the new tax rates and other statutes in
    place.
    B. Any differential with the old structure shall be clarified by the Bidders directly with the Seller and Cerclex will not be responsible for any form of misunderstanding or dispute arising out of such differences. Cerclex is only an E-Commerce Service Provider and has minimal knowledge arising out of any changes in statutes that are promulgated by the Government from time to time.
    
    9. Wherever applicable, the below conditions will be applicable for Online Closed Bid event.
    a) The Online Closed bid event will take place as per the schedule.
    b) The bidders are free to revise their bids any number of times during this period. The latest bid will overwrite and supersede all the previous bids. Only the latest bid will be considered.
    c) Time extension will not be permitted.
    d) For the purpose of deciding the successful bidder, only the highest bid placed in the Closed Bid event, or the Online Auction will be considered.
    e) Auto bid facility is not available for the closed bid event.
    f) Bidders will be able to see only the bids placed by them.
    10. Wherever applicable, the below conditions will apply for Group Bidding methodology.
    a) For some lots, wherever applicable, Group Bidding methodology is being used in this event.
    b) Under this methodology, the Bidders will have to place a consolidated bid for all the lots under the specified group.
    c) Bidding for individual lots under the specified group will not be permitted.
    d) The bid placed by the Bidder will be distributed amongst all the lots under the specified group based on its start price / highest bid & increment and the total bid value will be calculated based on the UOM of the respective Item / Lot.
    e) All the lots under the specified group will be awarded to the single highest approved Bidder at the discretion of the seller.
    f) Post approval, the entire EMD of that group will be transferred to the Seller.
    g) The approved Bidder must lift all the lots under the specified group without any objection.
    h) Failure to lift the lots under the specified group will result in forfeiture of EMD.
    
    11. Success Fee:
    Wherever applicable, Success Fee on the basic sale value plus GST shall be paid to Cerclex by H1 / approved / successful Bidder(s) on confirmation of the bids by the Seller. This is for various services rendered to the Buyer(s) like coordination, Fintech, Consulting & Logistic requirements, if any.
    
    12. Event Fee:
    • Wherever mentioned in the catalogue, the Event Fee is inclusive of GST and is applicable for the individual lot / item.
    • Post approval, variations in lifted quantities will not be considered for any pro-rata reduction or increase in the Event Fee.
    • After approval & allocation of lots, if any Bidder backs out for any reason, the Event Fee will also be forfeited long with the EMD.
    • For all unsuccessful bidders, the Event Fee will be refunded back to their Smart Pay along with the EMD.
    
    
    III. DISCLAIMER
    
    1. Cerclex runs its business on the basis of a robust Web Site. Cerclex is outsourcing server space from a third-party hosting company and hence shall ensure smooth running in all good faith and intention. However, Cerclex will not be held responsible for any failure of power, Network, server, hosting server, Internet connectivity, ISP or otherwise at Bidder's end or at Cerclex directly or indirectly affecting online method of Bidding.
    
    2. Cerclex takes no responsibility for the quality, quantity, documentation details of Buyers/Sellers. Both the Buyers & Sellers agree to defend, indemnify and hold Cerclex harmless, from any loss, damage, cost and expenses caused by any reason during this transaction. In no event shall Cerclex be liable for any loss for the transactors by business, revenues, profit, costs direct and incidental, consequential or punitive damages of any claim. Both the parties agree to have discussed all the related matters regarding this transaction and have understood in full that Cerclex has provided a source of supply and has nothing to do any further, especially with regards to quality, warranty, guarantees, delivery schedules, payments, rejections, transportation, legal laws and regulations to be followed from time to time etc. Since Cerclex does not possess a knowledge base of the commodities under transaction both the parties agree that the matter contained in the materials as a part or as a whole does not violate any applicable law. Cerclex is only an e-commerce service provider and is not and cannot be a party to or control in any manner any transactions between the Seller and Bidder. Cerclex shall neither be responsible nor liable to mediate or resolve any disputes or disagreements between the Seller and Bidder.
    
    3. The Seller/Bidder agrees to limit the liability of Cerclex to them for any and all claims, losses, costs, damages of any nature whatsoever or claim expenses from any cause or causes, including attorneys’ fees and costs, so that the total aggregate liability of Cerclex to the Seller/Bidder shall not exceed its total fee receivable from the Seller/Bidder. It is intended that this limitation apply to any and all liability or cause of action, however alleged or arising, unless otherwise prohibited by law.
    
    4. Wherever images of the auction property are displayed, Bidders may note that Cerclex does not represent or warrant that the images are accurate, complete, reliable, current or error-free even though care has been taken to present them. They are only indicative in nature. Hence bidders are advised to physically inspect the auction property before placing bids.
    
    
    IV. PARTICIPATION
    1. The prospective Bidders must register online with Cerclex using their e-mail ID, phone number & GST number and upload self-attested copies of their PAN Card, valid GST registration certificate. The Prospective Bidders, who have uploaded the prescribed documents once, need not upload the same again.
    
    2. For EMD Payment through eWallet
    a. The prospective Bidders will then be required to register their Bank Account by providing the details such as Account number, Name of Bank, Name of Branch, IFSC Code etc. and upload a scanned copy of a cancelled cheque in JPG, PNG, GIF OR PDF format. The file size for the cancelled cheque shall not exceed 2MB. The name appearing in the cheque leaf shall match the name of the prospective Bidder. Prospective Bidders can register multiple Bank accounts. For every account they must upload the scanned copy of the cancelled cheque as explained above. Cerclex will verify the account details provided with the details in the scanned copy of the cancelled cheque and activate the Bank account registration. Bank account registration will not be activated by Cerclex if the account details provided does not match with the details in the scanned copy of the cancelled cheque uploaded. PROSPECTIVE BIDDERS WILL BE ABLE TO REMIT EMD ONLY AFTER THEIR BANK ACCOUNT REGISTRATION IS ACTIVATED BY CERCLEX. Prospective Bidders who register multiple bank accounts must choose one account as their Primary Bank Account. EMD remitted by unsuccessful Bidders will be refunded to their Primary Bank Account only. Registration of Bank account is compulsory and is a one-time activity.
    b. The prospective Bidders after completing the bank registration processes as above must log into auction.cerclex.com and choose register.
    c. Once the registration is done and ID is created, a Virtual Account Number (unique to each Bidder) will be generated.
    d. The Bidders can then add the amount to the Virtual Account Number, which will be credited to their eWallet account.
    e. Upon successful transfer of money to the eWallet, the Bidder can select the appropriate
    auction and then the lots for which they intend to place the bids. Once the auction and lots are chosen, they will have the option to pay EMD.
    f. If once EWallet is used for paying EMD for any lot in a particular auction, then the EMD for other
    lots in that auction need also to be paid through EWallet mode only. (Bidders will not be able to
    choose any other mode of payment other than EWallet for that particular auction. Also, if Bidders
    use any other mode of payment initially, then they will not be able to use EWallet to make EMD
    payment for other Lots for that auction).
    g. Bidders/Seller may note that any payments made online towards EMD/Security Deposit or other purposes received by Cerclex on behalf of Seller shall be handled in good faith and intention. However, Cerclex shall not be responsible for non-receipt or delayed receipt of EMD into its account leading to non-activation of User ID for placing bids. Cerclex shall either refund the EMD to the successful Bidder or transfer the same to the Seller to be retained by them in the form of EMD/Security Deposit to secure the performance of the agreement between the Seller and the Bidder.
    h. eWallet Usage Charges:
    1) Smart Pay usage charges would be applicable for the auctions depending upon the number of lots selected.
    2) These charges would be in addition to the EMD being paid for participation.
    3) These charges are non-refundable.
    4) Smart Pay Usage Charges are applied for rendering the services including balance topup,
    wallet usage, handling charges, etc.
    
    3. For EMD submission & Payment at Seller
    If EMD is payable by way of physical DD/PO:
    o Demand Draft/Pay order issued by any Scheduled Bank / Nationalized Bank / Scheduled Cooperative
    Bank in favor of the Seller Company Name payable at Seller location.
    If EMD is payable by way of NEFT / RTGS to the Seller’s Account:
    o Refer to the NEFT/RTGS details of the Seller in Seller Terms / Special Terms page.
    
    4. On completion of the registration process and payment of prescribed EMD as outlined above,
    Seller/Cerclex will activate the User – Identity to enter into the virtual auction room of
    the website www.auction.cerclex.com
    Prospective Bidders may please note the following:
    a. Failure to register online and upload the prescribed documents will lead to non-activation of the User ID even if the prescribed EMD has been remitted.
    b. For any auction, a Bidder acting as an individual or as proprietor of various firms registered under different user ID and having the same PAN will be allowed to participate under one user ID only, unless otherwise permitted by the Seller in writing.
    c. If payment is made for any PCB / CPCB Lots, Cerclex will activate the User ID for that
    lot/s only after successful verification of necessary PCB documents which are to be uploaded by the Bidder before the prescribed date & time.
    
    5. Refund of EMD:
    a. For EMDs remitted through EWallet, the unsuccessful Bidders EMD will be credited back to their EWallet account only.
    b. Bidders will have the option of withdrawing the money from their EWallet balance only after 48 hours (during bank working days & hours) of transferring the funds to their EWallet.
    c. This period of 48 hours may get extended due to any unforeseen circumstances Cerclex cannot be held liable for any such extensions due to extraneous factors including claims for interest payments.
    d. EMD withdrawal request made by the Bidders will be refunded to their Primary Bank Account registered with Cerclex only.
    e. EMD on Hold (remitted by successful Bidder or as specified by Seller) will be processed on receipt of Bid Approval by the Seller and the Seller shall then process applicable refund of the EMD to the successful Bidder in accordance with the agreement between the Seller and Bidder.
    f. In case the Seller does not communicate their decision on the bids received on or before the Bid Validity Date, Cerclex will be entitled to refund the EMD, if the EMD has been submitted through Smart Pay.
    g. The unsuccessful Bidders have to collect the EMD from the Seller, if it has been submitted to the Seller.
    
    6. Password and Security - After intending Bidders register with Cerclex on the website, they will be allotted a unique user identification (User ID) by Cerclex, and they will be prompted to set a password. This is the login password. The login password is a string of characters (combination of alpha, numeric & special characters) used to authenticate the identity and provide access to various resources on the website. The length of the login password has to be a minimum of eight characters and has to be a combination of alpha and numeric characters. Special characters can also be included to strengthen the login password. However, the following special characters ~, ., /, ?, <, >, : , ; , \ ' , \ " , +, =, _, -, ^ are not allowed and will be ignored. Bidders are solely responsible for all use and for maintaining and protecting the confidentiality of their User ID and password.
    
    7. Forgot Password - In Case Bidders forget the login password, the only way they can change their login password is by clicking on the “Lost Password” link on the homepage of the website. Bidders will receive a verification code on their registered e-mail address and their registered mobile phone. Using the verification code Bidders can change their login password. The e-mail carrying the verification code will also contain a link. Bidders can also change their login password by clicking on the link that will directly take them to the change password page. Bidders are advised to check their spam / junk mail to check for the e-mail carrying the verification code. Cerclex will not be responsible for non-receipt of SMS/e-mail carrying the verification code. Bidders are advised in their own interest to login and check to ensure that their credentials are valid before the auction starts to avoid complications in the last minute. Bidders reporting loss of access to their registered mobile phone & their registered e-mail may please note that their request for resetting their login password will be done only after receipt of a written request along with the full set of documents. Resetting of login password will be done after verification of the documents submitted and will take at least two working days. Bidders SHOULD NOT disclose their PASSWORD to anyone and safeguard its secrecy. Bidders are advised to change the Password.
    
    8. Transaction Password - To have an additional layer of security, Bidders have to authenticate their entry into the virtual auction room using their transaction password. Only then will they be able to place their bids. Bidders can set their transaction password and have to confirm the same with the OTP that will be sent to their registered mobile number, and their registered e-mail ID. Transaction password is session specific.
    
    9. Multiple Log in from same IP Address – Bidders participating in the auctions may please note that multiple logins from the same IP Address will not be permitted.
    
    
    V. CONDITIONS APPLICABLE TO “ONLINE” AUCTION METHOD OF BIDDING
    1. Validity: The Online auction Bidders must keep their bids valid till the bid validity period from the date of closing of e-Auction excluding the date of closing. In case the bid validity day falls on a holiday or remains closed for the Seller, such Bids will be deemed to be automatically extended to be valid up to the next working day of Seller.
    
    2. Time Extension:
    a. If any valid bid is received within the last 3 minutes (“Time Extension” as mentioned in the Bidding Room will be in force & 3 Minutes is an example) of closing time, the time will be extended automatically by 3 minutes. Bidders are advised to look for the number of extensions left in the virtual auction room in cases where the number of time extensions are restricted.
    b. Seller / Cerclex reserves the right to extend the closing time of the lot(s) / the auction as required. Bidders are advised to refresh the page by clicking link provided at the top right side of the auction room to check the lot(s) / auction closing time. Bidders are advised in their own interest not to leave the auction room till the entire auction is closed.
    
    3. Training: Cerclex will provide training (online) if required by the Bidders at a mutually
    convenient date and time before the Auction. 
    
    4. By default, the system will not permit the Bidders to increase/decrease (FA/RA) bids beyond a maximum of five times the prescribed bid increment/decrement. However, this limitation can change and hence Bidders are advised to contact Cerclex to ascertain about this feature before placing bids.
    
    5. By default, the system will set up the next bid value (current highest/lowest bid value plus or minus the prescribed minimum increment/decrement). Bidders can use the + or – symbol in the bid box to increase/decrease the bid values. The Bidders can override this feature to place their bids manually as well. All bid values in figures will be displayed with a comma separator as per International Standards and all bid values in words will be displayed as per Indian system for numbers.
    
    6. Bids: All bids placed are legally valid bids and are to be considered as bids from the Bidder himself. Once the bid is placed, the Bidders cannot reduce or withdraw the bid for whatever reason. If done so, the Seller will forfeit the EMD. The highest and the latest bid on the Auction shall supersede all the previous bids of the Bidder. Bidders may please note that in the event of a manual bid amount matching that of an auto bid, the manual bid will prevail and be considered. The Bidder with the highest offer/bid does not get any right to demand acceptance of his Bid.
    
    7. For deciding the successful Bidder, only the highest bid placed in the Closed Bid event, or the Online Auction will be considered. In the event of a tie (highest offer received in the online closed bid matching the highest bid received in the e-auction), Seller will decide the successful Bidder. No complaints in this regard will be entertained.
    
    8. Auto Bid: Auto Bid facility is provided for Bidders intending to place a maximum value for a lot/lots.
    
    9. Auto Bid: Auto bid is not a confirmed bid. It is only the maximum ceiling amount set by the Bidder to enable the auction engine to place bids on his behalf, whenever he is out bided, up to the ceiling set by him.
    
    10. Auto Bid: Once an auto bid is set, the auction engine will consider the ceiling amount for the next possible Bid only, depending on the highest bid prevailing at that point of time and the increment / decrement amount prescribed for that particular lot. However, Auto Bid cannot be set for amounts less than two increments / decrements to the highest/lowest bid prevailing at that point of time.
    
    11. Auto Bid: Bidders may please note that in the event of a manual bid amount matching that of auto bid, the manual bid will prevail and be considered.
    
    12. Bidders may please note that the virtual auction room will normally refresh automatically in every 10 seconds. It can also be refreshed manually by clicking on the link provided therein. In case of any difficulty to refresh the window, Bidders are advised to clear browsing history, download history, cookies and other site and plugin data, cached images and files etc. from their browser. Bidders may also contact Cerclex officials whose contact details are provided herein.
    
    
    VI. CONTRACT VALIDITY
    1. The contract is valid till the contract validity period.
    
    
    VII. PAYMENT
    1. All payments towards the sale of material shall be made in the form of Demand Draft/Pay order issued by any Scheduled / Nationalized Bank / Scheduled Co-operative Banks in favor of the Seller or by RTGS/NEFT as may be advised by Seller from time to time. If the successful Bidders are required to remit the sale proceeds by RTGS/NEFT, Seller / Cerclex will provide the Bank account details of Seller.
    
    2. On receipt of sale confirmation, Successful Bidder/s shall deposit 100% value of the material for the respective lot/s inclusive of the applicable taxes, if any, (calculated as per the bid/s placed and approved by the Seller) before collecting the sale order OR as may be directed by the Seller (please refer to other conditions wherever applicable). EMD/Security Deposit collected will be refunded in full by the Seller to the successful Bidder after the lifting of the material and completion of the contract.
    
    3. Unless otherwise specified elsewhere in this catalogue, Bids placed/Rates offered are for the basic price only and are exclusive of all applicable taxes like GST, IT, TCS etc. Taxes will be in addition to the basic price and will be added at rates applicable at the time of delivery.
    
    4. In the event of a default or delay in making the payment or not complying with any of the terms mentioned herein by the Successful Bidder, the contract will stand terminated automatically and the security deposit will stand forfeited.
    
    
    VIII. DELIVERY
    1. On receipt of full Sale Value along with applicable Taxes/TCS & other charges by the Seller, the Seller will issue final Sale/ Delivery / Release Order to the Buyer thereby enabling him to lift the materials within the period as may be prescribed by Seller from time to time.
    
    2. Lifting of materials will be allowed only as per Seller’s instructions. Successful Bidders are advised to contact the concerned officials of Seller for exact timings in order to ensure that the material clearance is as per their instructions. Neat and clean maintenance of the stockyard from where the material is lifted is the responsibility of the successful Bidder. In the event of non-adherence to the above by the successful Bidder, Seller will reserve its rights to impose penalties/forfeiture of EMD. Weight recorded at the Seller’s premises shall prevail.
    
    3. In case the Seller is unable to deliver the goods within the specified time due to unforeseen administrative reasons, then the Seller shall grant suitable extension of delivery period to the Buyer without any penalties till the expiry of such extended period. In such eventuality, however, the Buyer shall not be entitled to claim any compensation for such delay.
    
    4. If the goods sold or portion thereof remain un-cleared in the premises of the Seller beyond the stipulated period, the sales proceeds of the un-lifted assets shall be forfeited and the un-lifted portion of the assets may be removed at the risk and cost of the Buyer and the Buyer will have no claim whatsoever on the goods remaining uncleared and the amount paid to Seller will stand forfeited. Seller shall have right to dispose of such goods in any manner they like. The Buyer shall have no right whatsoever for any compensation on this account.
    
    5. While taking delivery of the material, it will be at the discretion of the Seller or its authorized representative to direct the manner / order in which the materials or lots shall be removed. No segregation of the items of any lot is allowed inside the Seller’s premises.
    
    6. Breaking/ cutting may be allowed to the extent necessary for facilitating loading into vehicles as per the discretion of the Seller. No gas cutting equipment or any equipment which is likely to cause damage, will be allowed in the premises. Only safe oxy-acetylene gas cutting equipment will be allowed with permission of Seller. The decision of the Seller or his authorized representative shall be final in this regard.
    
    7. The Buyer shall arrange for all tools and tackles, forklifts and hoists or cranes or labour at their own expense. The Buyer will make his own arrangement for dismantling, removal, lifting, loading and transporting of the material from the Seller’s premises and he will not claim any sort of assistance or charges whatsoever from the Seller.
    
    8. It will be the successful buyer’s responsibility to weigh the empty truck at the weighbridge and produce the weight certificate so that the weight of the empty truck will be deducted from the weight of the fully loaded truck.
    
    9. Should the original buyer wish to take delivery of the surplus material through a representative, he must authorize the latter by a letter of authority or continuing authority, which shall be presented to the Seller. The Seller may in his entire discretion decline to act on any such authority and it shall be for the buyer to satisfy the Seller that the authority is genuine. Delivery to such authorized person will constitute valid delivery and no claim shall lie against the Seller on any account thereafter.
    
    10. Once the goods / materials are taken out of the factory gate, the buyer will be solely responsible for all sorts of claims like shortage, missing parts, damage, incident, accident, loss of material etc.
    
    11. Resale will not be recognized. The buyer shall not be entitled to resell any lot or part of a lot while goods are still lying within the premises of the Seller, and no delivery would be affected by the Seller to any person other than the Buyer whose names are mentioned in the sale order/Delivery order.
    
    12. Buyer and his men are subject to the security rule of the Seller in force while in the Seller’s premises. The buyer/s, their workmen agents or representatives shall not commit any nuisance, theft or indulge in any antisocial activities in the Seller’s premises and the buyer shall be liable for the good conduct, safety & discipline of his workmen. In case of any such activity, delivery will be suspended and strict action as per law will be taken including forfeiture of EMD.
    
    13. While taking delivery of the material, the Buyers shall be responsible for any damage that may be done to premises / fittings of the SELLER in the course of removing the lot or lots purchased by them. The SELLER may at its option arrange to make good such damages and the buyer shall pay for the same on demand. If such payment is not made on demand, the SELLER may forfeit the EMD/Security Deposit or may stop delivery of the material till payment is made.
    
    14. SELLER will not at any time be responsible for any injuries caused due to an accident within its premises either to the Buyer or his representative / labour etc., and the Buyer will make proper arrangements for any claim arising out of the employment under any statute. It is the responsibility of the Buyer to provide necessary safety appliances (like hand gloves / safety shoes etc.,) to the labourers, who are engaged for loading the materials.
    
    15. If any accident or damage to the property / life etc. arises by reason of any act of negligence / omission / default or non-compliance with any of the Terms & Conditions or statutory regulations or rules and regulations applicable within the Seller’s premises, on the part of the Buyer / his representative or employees, resulting in death or injury to any persons or damages to the property of the SELLER or any third party, then in such an event the Buyer will have to pay compensation to such person including the employees of the SELLER for such accident or injury / death or damage caused to their employees or to any of the Seller’s employees or to others or to the Seller’s property. The Buyer shall in such event, keep the SELLER fully indemnified from any demand, claims or proceedings thereof.
    
    16. The Buyer shall be responsible for ensuring compliances with all Central and State laws as well as the rules, regulations, bye- laws/notifications and orders of the local authorities and statutory bodies as may be in force from time to time. Buyers must comply with all statutory obligations like Labor License, Workman Compensation policy, ESIC, PF etc., whichever is applicable.
    
    
    IX. DISPUTES / ARBITRATION
    1. In case of any dispute arising out of or relating to the terms of the sale order the matter shall be referred to one arbitrator appointed by Seller. The arbitrator shall act in accordance with the provisions of Arbitration and Conciliation Act, 1996. The venue of arbitration shall be at the location of the Seller.
    
    2. Disputes between Seller & Bidder, if any shall be within the jurisdiction of the courts at the location of the Seller.
    
    3. In the event of any dispute with regard to not taking possession / non-availability of inspected Auction Property etc. and forfeiture of 'EMD', Cerclex will not be held responsible for the loss /forfeiture.
    
    
        `,
      });
    } else if (catelogueDetails) {
      setReverseCatalogueInformation({
        ...reverseCatalogueInformation,
        auctionInformation: [
          { id: 1, label: "Auction ID", value: catelogueDetails?.auctionId },
          {
            id: 4,
            label: "Last Date and Time to receive EMD",
            value: `${handleDateSetUp(
              catelogueDetails?.EMDSchedule?.lastDate
            )}, ${convertTo12HourFormat(
              catelogueDetails?.EMDSchedule?.lastTime
            )}`,
          },
          {
            id: 5,
            label: "Online Auction Date and Time",
            value: `${handleDateSetUp(
              singleAuctionData?.auctionSchedule?.startDate
            )}, ${convertTo12HourFormat(
              singleAuctionData?.auctionSchedule?.startingTime
            )} - ${convertTo12HourFormat(
              singleAuctionData?.auctionSchedule?.endingTime
            )}`,
          },
          {
            id: 6,
            label: "Auction Type",
            value: `${auctionTypeStyle(singleAuctionData?.auctionType)}`,
          },
          {
            id: 7,
            label: "Bid Validity",
            value: `${catelogueDetails?.bidValidity} Working Days`,
          },
          {
            id: 8,
            label: "Contract Validity",
            value: `${catelogueDetails?.contractValidity} Working Days`,
          },
        ],
        contactDetails: {
          buyerContactDetails: 
`WXHC+8M4 Infinite Cercle Private Limited,
Eachanari, Madukkarai, Tamil Nadu 641021, India.
Email: auction@cerclex.com
Website: cerclex.com
CIN No.: U72900TN1995PTC136584`,
          cerclexContactDetails: catalogueEditData?.catalogueData?.industryAddress || catelogueDetails?.industry?.location?.address,
        },
        productList: catelogueDetails?.offers,
        procurementOfHiring: {
          serviceInformation: catalogueEditData?.catalogueData?.auctionInformation || "",
          declaration: `All the signed and stamped documents have to be sent to ${catelogueDetails?.industry?.organizationName}.`,
        },
        contactOfficialData:
          catalogueEditData?.catalogueData?.cerclexContactDetails || [],
        serviceName: singleAuctionData?.serviceName,
        auctionTypeStyle: singleAuctionData?.auctionType,
        description: singleAuctionData?.description || "",
        buyerDetails: {
          buyerName: catalogueEditData?.catalogueData?.industryName
            || catelogueDetails?.industry?.organizationName,
          buyerAddress: catalogueEditData?.catalogueData?.industryAddress || catelogueDetails?.industry?.location?.address,
        },
        supportService: {
          registerAddress: catalogueEditData?.catalogueData?.platformInformation
            ?.registerAddress || "",
          branchAddress: catalogueEditData?.catalogueData?.platformInformation?.barnchAddress || "",
        },
        termsAndCondition: catalogueEditData?.catalogueData?.industryTermsAndConditions || `
Validity for placing order: Valid up to 24.05.2025

Order Fulfillment Date: As per ${catelogueDetails?.industry?.organizationName}  instruction

Special Clause: Subject Matter-Level function Compensation Benchmarking.travel and accommodation is inclusive in the offered price

Payment Term: 100% payment will be made within 15 days after completion of the work

Contract Validity:  One Time


DEFINITIONS

COMPANY/ LTD BRAND NAME: Company or ${catelogueDetails?.industry?.organizationName} referred in this catalog is ${catelogueDetails?.industry?.organizationName}.

SERVICE PROVIDER: CercleX Pvt. Ltd. (hereinafter referred to as “CercleX”) is an e-commerce service provider appointed by ${catelogueDetails?.industry?.organizationName} to facilitate virtual auction by the Company. CercleX will only facilitate online Reverse auctions and are considered as third party. 

BIDDER/TRANSPORTER/PARTICIPANT: Any person - as an individual OR a proprietor OR a partner OR an authorized representative of any company OR any legal entity and registered at ${catelogueDetails?.industry?.organizationName}. And who makes or places a bid for the outbound transportation, either in part or in full is considered as a bidder. Successful Bidder is that Bidder in whose name Job work Order is issued by the Company.

TIMING OF ONLINE BID: Time, wherever mentioned in any document relating to the bidding event, including the auction catalog, refers to Indian Standard Time (IST) i.e. UTC + 05.30 hrs. All the timings of the Online Bid shall be based on the time indicated by the Server hosting the Auction Engine. It shall be the endeavor of CercleX to ensure that the Server Time reflects as closely as possible the Indian Standard Time (IST) i.e. UTC + 05.30 hrs. However, in the event of any deviations between the Server Time and the Indian Standard Time, the functioning of the Auction Engine (Start, operation, closure) would be guided by the Server Time. Bidders are advised to refresh the Auction room to check the exact Server Time that is displayed there.

`,
        generalTermsAndCondition: catalogueEditData?.catalogueData?.termsAndConditionOfOnlineAuction || `
1) Subject to the reserve price, if any, fixed by the COMPANY and subject to the terms and conditions set out herein, Work Order shall be awarded to the Lowest Bidder as per the discretion of ${catelogueDetails?.industry?.organizationName}.

2) ${catelogueDetails?.industry?.organizationName}./CercleX reserves the right to modify and amend the terms & conditions and announce the same at any time before the auction concludes. Announcements during the auction on the website including announcement of any additional conditions OR correction in the catalogue and/or additions or deletions of items being listed for procurement of Transport Contract are being done with the consent and knowledge of the Company, and it is binding on the bidder.

3) Participation and bidding in this Auction shall be treated as conclusive evidence of the fact that the bidder has carefully gone through the List of destinations, price schedule etc. and fully understood ${catelogueDetails?.industry?.organizationName}.’s requirements. It shall also imply that the bidders have understood the terms and conditions of Auction including the amendments, if any, prevailing at the time of Auction. ${catelogueDetails?.industry?.organizationName}./CercleX will not entertain any complaints or objections once Bid is placed.

4) The L-1 bidder does not get any right to demand acceptance of his offer. ${catelogueDetails?.industry?.organizationName}. reserves the right to accept/ reject/ cancel any bid, withdraw any of the item/s listed at any stage from Auction even after acceptance of bid/ issue of work order without assigning any reason thereof. In the event of such rejection/ cancellation/ withdrawal, ${catelogueDetails?.industry?.organizationName}. shall not be responsible for any damage/ loss whatsoever to the successful bidder on account of such withdrawal.

5) In the event of failure on the part of the successful bidder to fulfill his contractual obligations, ${catelogueDetails?.industry?.organizationName}. / CercleX reserve the right to forfeit EMD & debar such bidder from participating in any future auction conducted by CercleX on behalf of Company.

6) ${catelogueDetails?.industry?.organizationName}. does not guarantee any consistency in supplies and transportation requirements during the contract period.


DISCLAIMER

1) CercleX runs its business on the basis of a robust Web Site. However, CercleX is outsourcing server space from a third-party hosting company and hence shall ensure the smooth running in all good faith and intention.  However, CercleX will not be held responsible for any failure of power, Network, server, hosting server, Internet connectivity, ISP or otherwise at Bidders end or at CercleX directly or indirectly affecting online method of Bidding.

2) CercleX takes no responsibility of the quality, quantity, documentation details of ${catelogueDetails?.industry?.organizationName}./bidders. Both ${catelogueDetails?.industry?.organizationName}.& bidders agree to defend, indemnify, and hold CercleX harmless from any loss, damage, cost and expenses caused by any reason during this transaction. In no event shall CercleX be liable for any loss for the transactors by business, revenues, profit, costs direct and incidental, consequential, or punitive damages of any claim. Both the parties agree to have discussed all the related matter regarding this transaction and have understood in full that CercleX has provided a source to obtain rates online for Transport services and has nothing to do any further especially with regards to quality, warranty, guarantees, delivery schedules, payments, rejections, transportation, legal laws, and regulations to be followed from time to time etc. Since CercleX does not possess the knowledge base of the transaction, both the parties agree that the matter contained in the materials as a part or as a whole does not violate any applicable law. CercleX Pvt. Ltd. is only an e-commerce service provider and is not and cannot be a party to or control in any manner any transactions between the Company and Bidders. CercleX Pvt. Ltd. shall be neither responsible nor liable to mediate or resolve any disputes or disagreements between the Company and Bidders.

3) The Company/ Bidders agree to limit the liability of CercleX Pvt. Ltd. to them for any and all claims, losses, costs, damages of any nature whatsoever or claims expenses from any cause or causes, including attorneys’ fees and costs, so that the total aggregate liability of CercleX Pvt. Ltd. to the Company/Bidder shall not exceed its total fee receivable from the Company/Bidder. It is intended that this limitation apply to any and all liability or cause of action however alleged or arising, unless otherwise prohibited by law.


PARTICIPATION

1. The prospective bidders who have been qualified by ${catelogueDetails?.industry?.organizationName}. will be eligible to participate.

2. CercleX will activate the User – Identity of such registered bidders to enter into website www.auction.cerclex.com

3. Bidders SHOULD NOT disclose their PASSWORD to anyone and safeguard its secrecy. Bidders are advised to change the Password.

4. Bidders shall commit to provide the services (being bid for) at the price entered by them in the online bid AND at the terms and conditions specified herein by the ${catelogueDetails?.industry?.organizationName}. All Bids entered shall be legally binding on the Bidders. Bidders are strongly advised to exercise due diligence while placing bids to ${catelogueDetails?.industry?.organizationName}. Failure to honour the bids placed during the online Bid shall render the bidders liable for any penal action as deemed fit by ${catelogueDetails?.industry?.organizationName}. or its Service provider.

5. In the event of winning an allotment in the bidding event, the bidder shall commit to fulfil outlined obligations under the contract.  After winning an allotment, the bidder has to necessarily provide the satisfactory services for a minimum 6-month period on the agreed rates, else security deposit may be forfeited.

6. The bidder shall bid on the terms specified by ${catelogueDetails?.industry?.organizationName}. and place their bids online. Clarifications required if any may be obtained from ${catelogueDetails?.industry?.organizationName}. The Bidder shall not stipulate any conditions on his/her own unless the terms of the Client (in the ${catelogueDetails?.industry?.organizationName}.Terms and Conditions) expressly permit such conditions being stipulated by the Bidder. ${catelogueDetails?.industry?.organizationName}. retains the right of rejecting the bids after the e-auction/bidding.

7. Company or CercleX shall not be responsible for any delays in initiating the online bidding event or postponement/cancellation of the online bid proceedings due to any problem with the hardware/ software/ infrastructural facilities or any other shortcomings.

8. Time Extension: If any market-leading bid (bid lower than the lowest at the point in time) is received within the last 3 minutes (“Time Extension” as mentioned in the Bidding Room will be in force & 3 Minutes is an example) of closing time, the time will be extended automatically by 3 minutes. 

9. Training: CercleX will provide training (online) if required by the bidders at a mutually convenient date and time before the Auction.

10. Bids: All bids placed are legally valid bids and are to be considered as bids from the bidder himself. Once the bid is placed, the Bidders cannot increase or withdraw the bid for whatever reason. The latest bid on the Auction shall supersede all the previous bids of the bidder. Bidders may please note that in the event of a manual bid amount matching that of an auto bid, the manual bid will prevail and be considered. The bidder with the lowest offer/ bid does not get any right to demand acceptance of his Bid.

11. Password and Security:  After intending bidders register with CercleX on the website, they will be allotted a unique user identification (User ID) by CercleX, and they will be prompted to enter a password.  This is the log in password. The log in password is a string of characters (combination of alpha, numeric & special characters) used to authenticate the identity and provide access to various resources on the website. The length of the log in password has to be a minimum of eight characters and has to be a combination of alpha and numeric characters. Special characters can also be included to strengthen the log in password. However the following special characters like, ~, ., /, ?, <, >, : , ; , \ ' , \ " , +, =, _, -, ^ are not allowed and will be ignored. Bidders are solely responsible for all use and for maintaining and protecting the confidentiality of their User ID and password.

Forgot Password:  In case Bidders forget the log in password, the only way they can change their log in password is by clicking on the “Lost Password” link on the home page of the website. Bidders will receive a verification code on their registered e-mail address and their registered mobile phone. Using the verification code Bidders can change their log in password. The e-mail carrying the verification code will also contain a link. Bidders can also change their log in password by clicking on the link that will directly take them to the change password page. Bidders are advised to check their spam / junk mail to check for the e-mail carrying the verification code. CercleX will not be responsible for non-receipt of SMS/e-mail carrying the verification code. Bidders are advised in their own interest to log in and check to ensure that their credentials are valid before the auction starts to avoid complications in the last minute. Bidders reporting loss of access to their registered mobile phone & their registered e-mail may please note that their request for resetting their log in password will be done only after receipt of a written request along with the full set of documents. Resetting of log in password will be done after verification of the documents submitted and will take at least two working days. 
Bidders SHOULD NOT disclose their PASSWORD to anyone and safeguard its secrecy. Bidders are advised to change the Password.

Transaction Password: In order to have an additional layer of security, Bidders have to authenticate their entry into the virtual auction room using their transaction password. Only then they will be able to place their bids. Bidders can set their transaction password and have to confirm the same with the OTP that will be sent to their registered mobile number and their registered e-mail ID. Transaction password is session specific.
	
RIGHT of ${catelogueDetails?.industry?.organizationName}.
${catelogueDetails?.industry?.organizationName}. reserves the right to partially or totally accept or reject any/all bids placed in the Online Bidding Event without assigning any reason whatsoever. ${catelogueDetails?.industry?.organizationName}. also retains the right to allot the requirement to more than one bidder or consolidate the requirements among one or more bidders.


DEFINITION OF KEY TERMS

1) Online bidding Event - Online Bidding/Negotiation Event (e-Auction/Open Request for Quotation/ Sealed Bid) refers to those negotiations conducted through the Internet with the bidders (from one or more locations) simultaneously bidding, to be selected for providing the service/s in the online bid. In other words, the venue for the online bid is on an Internet website/ platform. Any other URL if assigned by CercleX would constitute venue for the purpose of the online bidding event.

2) Timing of Online Bid - Time, wherever mentioned in any document relating to the bidding event including the auction catalogue, refers to n Standard Time (IST) i.e. UTC + 05.30 hrs. All the timings of the Online Bid shall be based on the time indicated by the Server hosting the Auction Engine. It shall be the endeavour of CercleX to ensure that the Server Time reflects as closely as possible the n Standard Time (IST) i.e. UTC + 05.30 hrs. However, in the event of any deviations between the Server Time and the n Standard Time, the functioning of the Auction Engine (Start, operation, closure) would be guided by the Server Time. Bidders are advised to refresh the Auction room to check the exact Server Time that is displayed there.

3) Start Time - Start time refers to the time of commencement of the conduct of the online bid. It signals the commencement of the Price Discovery process through competitive bidding.
 
4) Auto Extension of the on-line bid timing - In the event of bids in the last few minutes of the scheduled bid time, the Bid Timings are automatically extended for a specified period from each such bid. Such Auto Extension shall continue until no bids are placed for the specified period (Engine remains inactive for the specified period). The Inactivity Time for Auto Extension purpose is normally 3 minutes.  CercleX however has the right to change the same. The Inactivity Time applicable for the particular Online Bid shall be visible to the bidders under the Bidding Rules module on the engine.

5) End of the on-line bidding event - End of the Online Bidding Event refers to the termination of the online bid proceedings signalling an end to the price discovery process.

6) Disputes / Arbitration – An authorized official of ${catelogueDetails?.industry?.organizationName}. or any other person appointed by the Company shall decide any dispute arising between the successful bidder and Company. The decision of the Arbitrator shall be final and binding on both the parties. Disputes between Company & bidder if any shall be within the jurisdiction of - Kolkata courts only.
 
Confidentiality (NDA)

1. All information provided in this document, the submitted proposal, or in subsequent contracts and correspondence, is strictly confidential. 

2. Any information regarding ${catelogueDetails?.industry?.organizationName}. may not be communicated to a third party without prior approval of ${catelogueDetails?.industry?.organizationName}.

Sd/-

${catelogueDetails?.industry?.organizationName}.

        `
      });
    }
  }, [
    catelogueDetails,
    checkCatalogueSameData,
    singleAuctionData,
    catalogueEditData,
  ]);

  return (
    <globalContext.Provider
      value={{
        selectcheckboxItem,
        setSelectcheckboxItem,
        catelogueInformation,
        setCatelogueInformation,
        liveRoomConnectionStatus,
        setLiveRoomConnectionStatus,
        homePageButton,
        setHomePageButton,
        checkCatalogueSameData,
        setCheckCatalogueSameData,
        reverseCatalogueInformation,
        setReverseCatalogueInformation,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default ContextProvider;
